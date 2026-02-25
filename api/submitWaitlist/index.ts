import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { CosmosClient } from '@azure/cosmos';

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!);
const database = client.database('a2s-waitlist');
const container = database.container('entries');

function generateReferralCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'A2S-';
    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: '',
        };
        return;
    }

    try {
        const data = req.body;

        if (!data?.email || !data?.fullName) {
            context.res = {
                status: 400,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: { error: 'Email and full name are required.' },
            };
            return;
        }

        // Check if email already exists
        const { resources: existing } = await container.items
            .query({ query: 'SELECT c.referralCode, c.position FROM c WHERE c.email = @email', parameters: [{ name: '@email', value: data.email }] })
            .fetchAll();

        if (existing.length > 0) {
            context.res = {
                status: 409,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: { error: 'Email already registered.', referralCode: existing[0].referralCode, position: existing[0].position },
            };
            return;
        }

        // If referredBy code provided, find and credit the referrer
        let referrerBoosted = false;
        if (data.referredBy) {
            const { resources: referrer } = await container.items
                .query({ 
                    query: 'SELECT c.id, c.email, c.position, c.referralCount FROM c WHERE c.referralCode = @code', 
                    parameters: [{ name: '@code', value: data.referredBy.toUpperCase() }] 
                })
                .fetchAll();
            
            if (referrer.length > 0) {
                const ref = referrer[0];
                // Move referrer up by 2 positions (decrease position number = higher in queue)
                const newPosition = Math.max(1, (ref.position || 1) - 2);
                const newReferralCount = (ref.referralCount || 0) + 1;
                
                await container.item(ref.id, ref.email).patch([
                    { op: 'replace', path: '/position', value: newPosition },
                    { op: 'replace', path: '/referralCount', value: newReferralCount },
                ]);
                referrerBoosted = true;
            }
        }

        const referralCode = generateReferralCode();

        // Get current count for queue position
        const { resources: countResult } = await container.items
            .query('SELECT VALUE COUNT(1) FROM c')
            .fetchAll();
        const position = (countResult[0] || 0) + 1;

        const entry = {
            id: referralCode,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone || null,
            country: data.country || null,
            city: data.city || null,
            userType: data.userType || null,
            furnishTimeline: data.furnishTimeline || null,
            budgetRange: data.budgetRange || null,
            roomInterest: data.roomInterest || null,
            aestheticPreference: data.aestheticPreference || null,
            currentPlatforms: data.currentPlatforms || [],
            painPoint: data.painPoint || null,
            referralSource: data.referralSource || null,
            referralCode,
            referredBy: data.referredBy?.toUpperCase() || null,
            referralCount: 0,
            betaInterest: data.betaInterest || false,
            notifyLaunch: data.notifyLaunch !== false,
            position,
            createdAt: new Date().toISOString(),
        };

        await container.items.create(entry);

        context.res = {
            status: 201,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            body: { referralCode, position, message: 'Successfully joined the waitlist!' },
        };
    } catch (error: any) {
        context.log.error('Waitlist submission error:', error);
        context.res = {
            status: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: { error: 'Something went wrong. Please try again.' },
        };
    }
};

export default httpTrigger;

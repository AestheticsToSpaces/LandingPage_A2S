export interface WaitlistFormData {
    // Step 1 — Contact
    fullName: string;
    email: string;
    phone?: string;
    country?: string;
    city?: string;
    // Step 2 — Your Home
    userType?: string;
    furnishTimeline?: string;
    budgetRange?: string;
    roomInterest?: string;
    // Step 3 — Preferences
    aestheticPreference?: string;
    currentPlatforms?: string[];
    painPoint?: string;
    referralSource?: string;
    referredBy?: string;
    betaInterest?: boolean;
    notifyLaunch?: boolean;
}

export interface WaitlistResult {
    referralCode: string;
    position: number;
    message: string;
}

const FUNCTION_URL = import.meta.env.VITE_AZURE_FUNCTION_URL || '';

export async function submitToWaitlist(data: WaitlistFormData): Promise<WaitlistResult> {
    if (!FUNCTION_URL) {
        // Simulate for local dev if no Azure Function is configured
        await new Promise((r) => setTimeout(r, 1200));
        const mockCode = 'A2S-' + Math.random().toString(36).toUpperCase().slice(2, 8);
        return { referralCode: mockCode, position: Math.floor(Math.random() * 200) + 50, message: 'Demo mode — configure VITE_AZURE_FUNCTION_URL for real storage.' };
    }

    const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok && res.status !== 409) {
        throw new Error(json.error || 'Submission failed. Please try again.');
    }

    // 409 = already registered — still return referral code
    return json as WaitlistResult;
}

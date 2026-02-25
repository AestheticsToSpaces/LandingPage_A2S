// Cosmos DB REST API client for browser
const COSMOS_ENDPOINT = import.meta.env.VITE_COSMOS_ENDPOINT || '';
const COSMOS_KEY = import.meta.env.VITE_COSMOS_KEY || '';
const DATABASE_ID = 'a2s-waitlist';
const CONTAINER_ID = 'entries';

// Generate authorization token for Cosmos DB REST API
async function generateAuthToken(verb: string, resourceType: string, resourceId: string, date: string): Promise<string> {
  const key = atob(COSMOS_KEY);
  const text = `${verb.toLowerCase()}\n${resourceType.toLowerCase()}\n${resourceId}\n${date.toLowerCase()}\n\n`;
  
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const textData = encoder.encode(text);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, textData);
  const base64Sig = btoa(String.fromCharCode(...new Uint8Array(signature)));
  
  return encodeURIComponent(`type=master&ver=1.0&sig=${base64Sig}`);
}

// Generate unique ID
function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Generate referral code
function generateReferralCode(name: string): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const namePrefix = name.split(' ')[0].substring(0, 4).toUpperCase().replace(/[^A-Z]/g, '');
  let code = namePrefix || 'A2S';
  while (code.length < 9) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code.substring(0, 9);
}

export interface WaitlistEntry {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  country?: string;
  city?: string;
  userType?: string;
  timeline?: string;
  budget?: string;
  roomType?: string;
  aesthetic?: string;
  platforms?: string[];
  painPoint?: string;
  referralSource?: string;
  betaInterest?: boolean;
  notifyLaunch?: boolean;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  queuePosition: number;
  createdAt: string;
}

// Check if Cosmos DB is configured
export function isCosmosConfigured(): boolean {
  return !!(COSMOS_ENDPOINT && COSMOS_KEY);
}

// Get total count of entries
async function getTotalCount(): Promise<number> {
  if (!isCosmosConfigured()) return 0;
  
  const date = new Date().toUTCString();
  const resourceId = `dbs/${DATABASE_ID}/colls/${CONTAINER_ID}`;
  const token = await generateAuthToken('POST', 'docs', resourceId, date);
  
  const response = await fetch(`${COSMOS_ENDPOINT}dbs/${DATABASE_ID}/colls/${CONTAINER_ID}/docs`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'x-ms-date': date,
      'x-ms-version': '2018-12-31',
      'Content-Type': 'application/query+json',
      'x-ms-documentdb-isquery': 'true',
      'x-ms-documentdb-query-enablecrosspartition': 'true',
    },
    body: JSON.stringify({
      query: 'SELECT VALUE COUNT(1) FROM c',
    }),
  });
  
  if (!response.ok) {
    console.error('Count query failed:', await response.text());
    return 0;
  }
  
  const data = await response.json();
  return data.Documents?.[0] || 0;
}

// Check if email already exists
async function checkEmailExists(email: string): Promise<WaitlistEntry | null> {
  if (!isCosmosConfigured()) return null;
  
  const date = new Date().toUTCString();
  const resourceId = `dbs/${DATABASE_ID}/colls/${CONTAINER_ID}`;
  const token = await generateAuthToken('POST', 'docs', resourceId, date);
  
  const response = await fetch(`${COSMOS_ENDPOINT}dbs/${DATABASE_ID}/colls/${CONTAINER_ID}/docs`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'x-ms-date': date,
      'x-ms-version': '2018-12-31',
      'Content-Type': 'application/query+json',
      'x-ms-documentdb-isquery': 'true',
      'x-ms-documentdb-query-enablecrosspartition': 'true',
    },
    body: JSON.stringify({
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email }],
    }),
  });
  
  if (!response.ok) {
    console.error('Email check failed:', await response.text());
    return null;
  }
  
  const data = await response.json();
  return data.Documents?.[0] || null;
}

// Create new entry
async function createEntry(entry: WaitlistEntry): Promise<WaitlistEntry | null> {
  if (!isCosmosConfigured()) return null;
  
  const date = new Date().toUTCString();
  const resourceId = `dbs/${DATABASE_ID}/colls/${CONTAINER_ID}`;
  const token = await generateAuthToken('POST', 'docs', resourceId, date);
  
  const response = await fetch(`${COSMOS_ENDPOINT}dbs/${DATABASE_ID}/colls/${CONTAINER_ID}/docs`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'x-ms-date': date,
      'x-ms-version': '2018-12-31',
      'Content-Type': 'application/json',
      'x-ms-documentdb-partitionkey': JSON.stringify([entry.email]),
    },
    body: JSON.stringify(entry),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Create entry failed:', errorText);
    throw new Error(`Failed to create entry: ${response.status}`);
  }
  
  return await response.json();
}

// Update referrer's position when someone uses their code
async function creditReferrer(referralCode: string): Promise<void> {
  if (!isCosmosConfigured() || !referralCode) return;
  
  const date = new Date().toUTCString();
  const resourceId = `dbs/${DATABASE_ID}/colls/${CONTAINER_ID}`;
  const token = await generateAuthToken('POST', 'docs', resourceId, date);
  
  // Find referrer by code
  const response = await fetch(`${COSMOS_ENDPOINT}dbs/${DATABASE_ID}/colls/${CONTAINER_ID}/docs`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'x-ms-date': date,
      'x-ms-version': '2018-12-31',
      'Content-Type': 'application/query+json',
      'x-ms-documentdb-isquery': 'true',
      'x-ms-documentdb-query-enablecrosspartition': 'true',
    },
    body: JSON.stringify({
      query: 'SELECT * FROM c WHERE c.referralCode = @code',
      parameters: [{ name: '@code', value: referralCode.toUpperCase() }],
    }),
  });
  
  if (!response.ok) return;
  
  const data = await response.json();
  const referrer = data.Documents?.[0];
  
  if (referrer) {
    // Update referrer - move up 2 spots and increment count
    const updateDate = new Date().toUTCString();
    const updateResourceId = `dbs/${DATABASE_ID}/colls/${CONTAINER_ID}/docs/${referrer.id}`;
    const updateToken = await generateAuthToken('PUT', 'docs', updateResourceId, updateDate);
    
    referrer.queuePosition = Math.max(1, referrer.queuePosition - 2);
    referrer.referralCount = (referrer.referralCount || 0) + 1;
    
    await fetch(`${COSMOS_ENDPOINT}${updateResourceId}`, {
      method: 'PUT',
      headers: {
        'Authorization': updateToken,
        'x-ms-date': updateDate,
        'x-ms-version': '2018-12-31',
        'Content-Type': 'application/json',
        'x-ms-documentdb-partitionkey': JSON.stringify([referrer.email]),
      },
      body: JSON.stringify(referrer),
    });
  }
}

// Main function to submit to waitlist
export async function submitToWaitlist(formData: {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  userType?: string;
  furnishTimeline?: string;
  budgetRange?: string;
  roomInterest?: string;
  aestheticPreference?: string;
  currentPlatforms?: string[];
  painPoint?: string;
  referralSource?: string;
  referredBy?: string;
  betaInterest?: boolean;
  notifyLaunch?: boolean;
}): Promise<{ referralCode: string; position: number; isExisting?: boolean }> {
  
  if (!isCosmosConfigured()) {
    throw new Error('Database not configured');
  }
  
  // Check if email already registered
  const existing = await checkEmailExists(formData.email);
  if (existing) {
    return {
      referralCode: existing.referralCode,
      position: existing.queuePosition,
      isExisting: true,
    };
  }
  
  // Get current count for queue position
  const totalCount = await getTotalCount();
  const queuePosition = totalCount + 1;
  
  // Credit referrer if code provided
  if (formData.referredBy) {
    await creditReferrer(formData.referredBy);
  }
  
  // Create new entry
  const entry: WaitlistEntry = {
    id: generateId(),
    email: formData.email,
    fullName: formData.fullName,
    phone: formData.phone,
    country: formData.country,
    city: formData.city,
    userType: formData.userType,
    timeline: formData.furnishTimeline,
    budget: formData.budgetRange,
    roomType: formData.roomInterest,
    aesthetic: formData.aestheticPreference,
    platforms: formData.currentPlatforms,
    painPoint: formData.painPoint,
    referralSource: formData.referralSource,
    betaInterest: formData.betaInterest || false,
    notifyLaunch: formData.notifyLaunch !== false,
    referralCode: generateReferralCode(formData.fullName),
    referredBy: formData.referredBy?.toUpperCase(),
    referralCount: 0,
    queuePosition,
    createdAt: new Date().toISOString(),
  };
  
  await createEntry(entry);
  
  return {
    referralCode: entry.referralCode,
    position: entry.queuePosition,
  };
}

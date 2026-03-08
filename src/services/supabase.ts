import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
}

// Generate referral code from name
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
  id?: string;
  email: string;
  full_name: string;
  phone?: string;
  country?: string;
  city?: string;
  user_type?: string;
  timeline?: string;
  budget?: string;
  room_type?: string;
  aesthetic?: string;
  platforms?: string[];
  pain_point?: string;
  referral_source?: string;
  beta_interest?: boolean;
  notify_launch?: boolean;
  referral_code: string;
  referred_by?: string;
  referral_count: number;
  queue_position: number;
  created_at?: string;
}

// Submit to waitlist
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
  
  if (!supabase) {
    throw new Error('Database not configured. Please check your .env file.');
  }

  // Check if email already exists
  const { data: existing } = await supabase
    .from('waitlist')
    .select('referral_code, queue_position')
    .eq('email', formData.email.toLowerCase())
    .single();

  if (existing) {
    return {
      referralCode: existing.referral_code,
      position: existing.queue_position,
      isExisting: true,
    };
  }

  // Get current count for queue position
  const { count } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  const queuePosition = (count || 0) + 1;

  // Credit referrer if code provided
  if (formData.referredBy) {
    const { data: referrer } = await supabase
      .from('waitlist')
      .select('id, queue_position, referral_count')
      .eq('referral_code', formData.referredBy.toUpperCase())
      .single();

    if (referrer) {
      await supabase
        .from('waitlist')
        .update({
          queue_position: Math.max(1, referrer.queue_position - 2),
          referral_count: (referrer.referral_count || 0) + 1,
        })
        .eq('id', referrer.id);
    }
  }

  // Create new entry
  const referralCode = generateReferralCode(formData.fullName);
  
  const { error } = await supabase.from('waitlist').insert({
    email: formData.email.toLowerCase(),
    full_name: formData.fullName,
    phone: formData.phone || null,
    country: formData.country || null,
    city: formData.city || null,
    user_type: formData.userType || null,
    timeline: formData.furnishTimeline || null,
    budget: formData.budgetRange || null,
    room_type: formData.roomInterest || null,
    aesthetic: formData.aestheticPreference || null,
    platforms: formData.currentPlatforms || [],
    pain_point: formData.painPoint || null,
    referral_source: formData.referralSource || null,
    beta_interest: formData.betaInterest || false,
    notify_launch: formData.notifyLaunch !== false,
    referral_code: referralCode,
    referred_by: formData.referredBy?.toUpperCase() || null,
    referral_count: 0,
    queue_position: queuePosition,
  });

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error('Failed to join waitlist. Please try again.');
  }

  // Send welcome email (don't await to not block the UI)
  sendWelcomeEmail(formData.email, formData.fullName.split(' ')[0], referralCode)
    .catch(err => console.error('Failed to send welcome email:', err));

  return {
    referralCode,
    position: queuePosition,
  };
}

// Send welcome email via Supabase Edge Function
export async function sendWelcomeEmail(
  email: string,
  firstName: string,
  referralCode: string
): Promise<void> {
  if (!supabase) {
    throw new Error('Database not configured');
  }

  const { error } = await supabase.functions.invoke('send-welcome-mail', {
    body: { email, firstName, referralCode },
  });

  if (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

// Check if email already exists in waitlist
export async function checkEmailExists(email: string): Promise<{ exists: boolean; referralCode?: string; position?: number }> {
  if (!supabase || !email) {
    return { exists: false };
  }

  const { data } = await supabase
    .from('waitlist')
    .select('referral_code, queue_position')
    .eq('email', email.toLowerCase().trim())
    .single();

  if (data) {
    return {
      exists: true,
      referralCode: data.referral_code,
      position: data.queue_position,
    };
  }

  return { exists: false };
}

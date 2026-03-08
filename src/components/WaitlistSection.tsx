import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight, ArrowLeft, Check, Sparkles, Copy, Share2, Users, Trophy,
  Loader2, ChevronDown, Download
} from 'lucide-react';
import { submitToWaitlist, isSupabaseConfigured, checkEmailExists } from '@/services/supabase';
import { WaitlistFormData } from '@/lib/waitlist';

/* ──────────────────────────────────────────────
   Constants
────────────────────────────────────────────── */
const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'UAE', 'Singapore', 'Germany', 'France', 'Japan', 'Other',
];

const STEPS = ['Contact', 'Your Home', 'Preferences'];

/* ──────────────────────────────────────────────
   Step 1 — Contact Info
────────────────────────────────────────────── */
function Step1({ form, setForm, emailStatus, setEmailStatus }: { 
  form: WaitlistFormData; 
  setForm: (f: WaitlistFormData) => void;
  emailStatus: { checking: boolean; exists: boolean; referralCode?: string; position?: number };
  setEmailStatus: (s: { checking: boolean; exists: boolean; referralCode?: string; position?: number }) => void;
}) {
  const emailCheckTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Auto-detect country via IP geolocation
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => { if (data.country_name && !form.country) setForm({ ...form, country: data.country_name }); })
      .catch(() => { });
  }, []);

  // Real-time email check with debounce
  const handleEmailChange = (email: string) => {
    setForm({ ...form, email });
    
    // Clear previous timeout
    if (emailCheckTimeout.current) {
      clearTimeout(emailCheckTimeout.current);
    }

    // Reset status if email is invalid or empty
    if (!email || !email.includes('@') || email.length < 5) {
      setEmailStatus({ checking: false, exists: false });
      return;
    }

    // Debounce the check
    setEmailStatus({ ...emailStatus, checking: true });
    emailCheckTimeout.current = setTimeout(async () => {
      try {
        const result = await checkEmailExists(email);
        setEmailStatus({ 
          checking: false, 
          exists: result.exists, 
          referralCode: result.referralCode,
          position: result.position 
        });
      } catch {
        setEmailStatus({ checking: false, exists: false });
      }
    }, 500);
  };

  const field = 'px-4 py-3 w-full rounded-xl bg-background border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-body text-muted-foreground mb-1.5">Full name *</label>
          <input className={field} placeholder="Sai Srinidhi" required value={form.fullName || ''} onChange={e => setForm({ ...form, fullName: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-body text-muted-foreground mb-1.5">Email address *</label>
          <input type="email" className={`${field} ${emailStatus.exists ? 'border-amber-500 focus:ring-amber-500/30' : ''}`} placeholder="Sai Srinidhi@example.com" required value={form.email || ''} onChange={e => handleEmailChange(e.target.value)} />
          {emailStatus.checking && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" /> Checking...
            </p>
          )}
          {emailStatus.exists && !emailStatus.checking && (
            <p className="text-xs text-amber-600 mt-1">
              ⚠️ This email is already on the waitlist. You're #{(emailStatus.position || 0) + 1000} in queue!
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-body text-muted-foreground mb-1.5">Phone <span className="text-muted-foreground/60">(optional)</span></label>
          <input className={field} placeholder="+91 98765 43210" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-body text-muted-foreground mb-1.5">Country</label>
          <div className="relative">
            <select className={`${field} appearance-none pr-10`} value={form.country || ''} onChange={e => setForm({ ...form, country: e.target.value })}>
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-xs font-body text-muted-foreground mb-1.5">City</label>
        <input className={field} placeholder="Mumbai, Bengaluru, Delhi…" value={form.city || ''} onChange={e => setForm({ ...form, city: e.target.value })} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Step 2 — Your Home
────────────────────────────────────────────── */
function Step2({ form, setForm }: { form: WaitlistFormData; setForm: (f: WaitlistFormData) => void }) {
  const pill = (label: string, key: keyof WaitlistFormData, val: string) => {
    const active = (form[key] as string) === val;
    return (
      <button type="button" onClick={() => setForm({ ...form, [key]: val })}
        className={`px-4 py-2 rounded-full text-xs font-body border transition-all duration-200 ${active ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}>
        {label}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-body text-muted-foreground mb-3">I am a…</p>
        <div className="flex flex-wrap gap-2">
          {['Homeowner', 'Renter', 'Renovating', 'Planning to buy', 'Just exploring'].map(v => pill(v, 'userType', v))}
        </div>
      </div>
      <div>
        <p className="text-xs font-body text-muted-foreground mb-3">When are you planning to furnish / redesign?</p>
        <div className="flex flex-wrap gap-2">
          {['Within 1 month', '1–3 months', '3–6 months', '6–12 months', 'Just browsing'].map(v => pill(v, 'furnishTimeline', v))}
        </div>
      </div>
      <div>
        <p className="text-xs font-body text-muted-foreground mb-3">Budget range</p>
        <div className="flex flex-wrap gap-2">
          {['Under ₹5K', 'Under ₹50K', 'Under ₹1L', '₹1–2L', '₹2–5L', '₹5–10L', '₹10–25L', '₹25L+'].map(v => pill(v, 'budgetRange', v))}
        </div>
      </div>
      <div>
        <p className="text-xs font-body text-muted-foreground mb-3">Room I'm most interested in</p>
        <div className="flex flex-wrap gap-2">
          {['Living Room', 'Bedroom', 'Kitchen', 'Dining Room', 'Home Office', 'Entire Home'].map(v => pill(v, 'roomInterest', v))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Step 3 — Preferences
────────────────────────────────────────────── */
function Step3({ form, setForm }: { form: WaitlistFormData; setForm: (f: WaitlistFormData) => void }) {
  const pill = (label: string, key: keyof WaitlistFormData, val: string) => {
    const active = (form[key] as string) === val;
    return (
      <button type="button" onClick={() => setForm({ ...form, [key]: val })}
        className={`px-4 py-2 rounded-full text-xs font-body border transition-all duration-200 ${active ? 'bg-copper/90 text-white border-copper' : 'border-border text-muted-foreground hover:border-copper/50 hover:text-foreground'}`}>
        {label}
      </button>
    );
  };

  const multiPill = (label: string, val: string) => {
    const active = (form.currentPlatforms || []).includes(val);
    return (
      <button type="button" onClick={() => {
        const prev = form.currentPlatforms || [];
        setForm({ ...form, currentPlatforms: active ? prev.filter(p => p !== val) : [...prev, val] });
      }} className={`px-4 py-2 rounded-full text-xs font-body border transition-all duration-200 ${active ? 'bg-primary/10 text-primary border-primary/50' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
        {label}
      </button>
    );
  };

  const field = 'px-4 py-3 w-full rounded-xl bg-background border border-border text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all';

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-body text-muted-foreground mb-3">My aesthetic style</p>
        <div className="flex flex-wrap gap-2">
          {['Minimal', 'Scandinavian', 'Indian Contemporary', 'Mid-Century Modern', 'Luxury', 'Boho', 'Industrial'].map(v => pill(v, 'aestheticPreference', v))}
        </div>
      </div>
      <div>
        <p className="text-xs font-body text-muted-foreground mb-3">Platforms I currently use <span className="text-muted-foreground/60">(select all that apply)</span></p>
        <div className="flex flex-wrap gap-2">
          {['Amazon', 'Pepperfry', 'Urban Ladder', 'IKEA', 'Flipkart', 'Instagram', 'Local stores'].map(v => multiPill(v, v))}
        </div>
      </div>
      <div>
        <p className="text-xs font-body text-muted-foreground mb-3">My biggest pain point</p>
        <div className="flex flex-wrap gap-2">
          {['Finding matching styles', 'Price comparison', 'Design advice', 'Quality uncertainty', 'Delivery & setup'].map(v => pill(v, 'painPoint', v))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-body text-muted-foreground mb-1.5">How did you hear about us?</label>
          <div className="relative">
            <select className={`${field} appearance-none pr-10`} value={form.referralSource || ''} onChange={e => setForm({ ...form, referralSource: e.target.value })}>
              <option value="">Select one</option>
              {['Instagram', 'LinkedIn', 'Twitter/X', 'WhatsApp', 'Friend / Referral', 'LinkedIn Article', 'Google Search', 'Other'].map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-body text-muted-foreground mb-1.5">Referral code <span className="text-muted-foreground/60">(optional)</span></label>
          <input className={field} placeholder="A2S-XXXXXX" value={form.referredBy || ''} onChange={e => setForm({ ...form, referredBy: e.target.value.toUpperCase() })} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.betaInterest ? 'bg-primary border-primary' : 'border-border'}`}
            onClick={() => setForm({ ...form, betaInterest: !form.betaInterest })}>
            {form.betaInterest && <Check size={12} className="text-white" />}
          </div>
          <span className="text-xs font-body text-foreground">I'm interested in beta testing</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.notifyLaunch !== false ? 'bg-primary border-primary' : 'border-border'}`}
            onClick={() => setForm({ ...form, notifyLaunch: form.notifyLaunch === false ? true : false })}>
            {form.notifyLaunch !== false && <Check size={12} className="text-white" />}
          </div>
          <span className="text-xs font-body text-foreground">Notify me when launched</span>
        </label>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Success Card
────────────────────────────────────────────── */
function SuccessCard({ referralCode, position, userName, isExisting }: { referralCode: string; position: number; userName: string; isExisting?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const firstName = userName.split(' ')[0];
  const shareUrl = `${window.location.origin}?ref=${referralCode}`;
  
  // Display position with +1000 offset
  const displayPosition = position + 1000;

  // Generate share card image as blob
  const generateShareImage = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#0d9488',
        scale: 2,
        useCORS: true,
      });
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
      });
    } catch (err) {
      console.error('Failed to generate image:', err);
      return null;
    }
  };

  // Download share card image
  const downloadShareCard = async () => {
    setDownloading(true);
    try {
      const blob = await generateShareImage();
      if (blob) {
        const link = document.createElement('a');
        link.download = `A2S-Waitlist-${firstName}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }
    } finally {
      setDownloading(false);
    }
  };

  // Share with image using Web Share API
  const shareWithImage = async (text: string, platform: string) => {
    setDownloading(true);
    try {
      const blob = await generateShareImage();
      
      // Check if Web Share API with files is supported
      if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'share.png', { type: 'image/png' })] })) {
        const file = new File([blob], `A2S-Waitlist-${firstName}.png`, { type: 'image/png' });
        
        // Include title, text, and url for maximum compatibility
        await navigator.share({
          title: 'Join A2S Waitlist',
          text: text,
          url: shareUrl,
          files: [file],
        });
      } else {
        // Fallback: Copy text to clipboard, download image, then open share link
        await navigator.clipboard.writeText(text);
        
        if (blob) {
          const link = document.createElement('a');
          link.download = `A2S-Waitlist-${firstName}.png`;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        }
        
        // Alert user that text is copied
        alert('Image downloaded and message copied to clipboard! Paste the message when sharing.');
        
        // Open the platform-specific share URL after a brief delay
        setTimeout(() => {
          if (platform === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
          } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
          }
        }, 500);
      }
    } catch (err) {
      // User cancelled or error - fallback to direct link
      if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
      }
    } finally {
      setDownloading(false);
    }
  };

  // Platform-specific share messages with name
  const whatsappText = `Thought you'd find this interesting.

A2S (Aesthetics To Spaces) is India's first AI-powered home design platform — launching March 2026. It lets you design entire rooms with AI assistance, compare prices across all major platforms, and get curated recommendations within your budget.

I've secured early access. If you're planning to furnish or redesign anytime soon, this might be worth a look.

Use my referral code to join: ${referralCode}
${shareUrl}

— ${firstName}`;

  const twitterText = `Joining @A2SIndia — AI-powered home design platform launching March 2026. Cross-platform price comparison and intelligent design recommendations.

Referral code: ${referralCode}`;

  const linkedinText = `Excited to share that I've joined the early access waitlist for A2S (Aesthetics To Spaces).

A2S is building India's first AI-powered home design infrastructure — enabling cross-platform price intelligence, room-specific product discovery, and AI design consultation.

Launching March 2026. If you're in the home design, real estate, or interior design space, this is worth exploring.

Referral code: ${referralCode}
${shareUrl}`;

  // Direct share without image
  const shareWithoutImage = (text: string, platform: string) => {
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyMessage = (platform: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsg(platform);
    setTimeout(() => setCopiedMsg(null), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
      className="text-center">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Check size={30} className="text-primary" />
      </div>
      <h3 className="font-display text-2xl font-bold text-foreground mb-1">
        {isExisting ? `Welcome back, ${firstName}! 👋` : `${firstName}, you're on the list! 🎉`}
      </h3>
      <p className="font-body text-muted-foreground text-sm mb-6">
        {isExisting 
          ? <>You've already joined! You're <span className="font-semibold text-primary">#{displayPosition.toLocaleString('en-IN')}</span> in the queue.</>
          : <>You're <span className="font-semibold text-primary">#{displayPosition.toLocaleString('en-IN')}</span> in the queue. Share your code to move up!</>
        }
      </p>

      {/* Queue position badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-6">
        <Trophy size={14} className="text-copper" />
        <span className="font-body text-xs text-foreground">Queue position <strong>#{displayPosition.toLocaleString('en-IN')}</strong></span>
      </div>

      {/* Shareable Card for Download */}
      <div className="mb-6">
        <div 
          ref={shareCardRef}
          className="mx-auto max-w-sm rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)' }}
        >
          <div className="p-6 text-center text-white">
            <div className="text-sm font-medium opacity-90 mb-1">AESTHETICS TO SPACES</div>
            <div className="text-xs opacity-70 tracking-wider mb-6">INDIA'S DESIGN EXECUTION INFRASTRUCTURE</div>
            
            <div className="bg-white/15 backdrop-blur rounded-xl p-5 mb-4">
              <div className="text-lg font-bold mb-1">{firstName}</div>
              <div className="text-xs opacity-80 mb-4">is on the early access list</div>
              <div className="text-4xl font-bold mb-1">#{displayPosition.toLocaleString('en-IN')}</div>
              <div className="text-xs opacity-70">Queue Position</div>
            </div>
            
            <div className="bg-white/20 rounded-lg px-4 py-3 mb-4">
              <div className="text-[10px] opacity-70 uppercase tracking-wider mb-1">Referral Code</div>
              <div className="text-xl font-bold tracking-widest">{referralCode}</div>
            </div>
            
            <div className="text-[10px] opacity-70">
              aestheticstospaces.tech • Launching March 2026
            </div>
          </div>
        </div>
        
        <button
          onClick={downloadShareCard}
          disabled={downloading}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-display text-foreground hover:bg-accent transition-colors disabled:opacity-50"
        >
          {downloading ? (
            <><Loader2 size={14} className="animate-spin" /> Generating...</>
          ) : (
            <><Download size={14} /> Download Card to Share</>
          )}
        </button>
      </div>

      {/* Quick Copy Section */}
      <div className="glass-card rounded-2xl p-5 mb-6 max-w-sm mx-auto">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">Your Code</p>
            <p className="font-display text-lg font-bold text-primary tracking-widest">{referralCode}</p>
          </div>
          <button onClick={copy} className="px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors" title="Copy code">
            {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} className="text-primary" />}
          </button>
        </div>
        <p className="font-body text-[11px] text-muted-foreground">Each person who uses your code moves you 2 spots forward</p>
      </div>

      {/* Referral Milestones */}
      <div className="glass-card rounded-2xl p-5 mb-6 max-w-sm mx-auto">
        <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mb-3 text-center">Referral Rewards</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">3</span>
            </div>
            <div className="flex-1">
              <p className="font-body text-xs text-foreground">Early feature preview</p>
              <p className="font-body text-[10px] text-muted-foreground">+6 spots bonus</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center">
              {/* TODO: Check referral count */}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">5</span>
            </div>
            <div className="flex-1">
              <p className="font-body text-xs text-foreground font-semibold">Priority Access</p>
              <p className="font-body text-[10px] text-muted-foreground">Skip the queue entirely</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center">
              {/* TODO: Check referral count */}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">10</span>
            </div>
            <div className="flex-1">
              <p className="font-body text-xs text-foreground">Founding Member Badge</p>
              <p className="font-body text-[10px] text-muted-foreground">+ Priority Access</p>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center">
              {/* TODO: Check referral count */}
            </div>
          </div>
        </div>
      </div>

      {/* Social share */}
      <div className="flex flex-col items-center gap-4">
        <p className="font-body text-xs text-muted-foreground flex items-center gap-1.5">
          <Share2 size={12} /> Share your spot:
        </p>
        
        {/* Share with image */}
        <div className="w-full">
          <p className="font-body text-[10px] text-muted-foreground mb-2 text-center">With your card:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => shareWithImage(whatsappText, 'whatsapp')}
              className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-[10px] font-display font-semibold hover:opacity-90 transition-opacity">
              WhatsApp
            </button>
            <button onClick={() => shareWithImage(twitterText, 'twitter')}
              className="px-3 py-1.5 rounded-lg bg-foreground text-background text-[10px] font-display font-semibold hover:opacity-80 transition-opacity">
              Twitter/X
            </button>
          </div>
        </div>
        
        {/* Share without image */}
        <div className="w-full">
          <p className="font-body text-[10px] text-muted-foreground mb-2 text-center">Text only:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => shareWithoutImage(whatsappText, 'whatsapp')}
              className="px-3 py-1.5 rounded-lg border border-[#25D366] text-[#25D366] text-[10px] font-display font-semibold hover:bg-[#25D366]/10 transition-colors">
              WhatsApp
            </button>
            <button onClick={() => shareWithoutImage(twitterText, 'twitter')}
              className="px-3 py-1.5 rounded-lg border border-foreground text-foreground text-[10px] font-display font-semibold hover:bg-foreground/10 transition-colors">
              Twitter/X
            </button>
            <button onClick={() => copyMessage('linkedin', linkedinText)}
              className="px-3 py-1.5 rounded-lg border border-[#0A66C2] text-[#0A66C2] text-[10px] font-display font-semibold hover:bg-[#0A66C2]/10 transition-colors">
              {copiedMsg === 'linkedin' ? 'Copied!' : 'LinkedIn'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Main WaitlistSection
────────────────────────────────────────────── */
export default function WaitlistSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<WaitlistFormData>({ notifyLaunch: true } as WaitlistFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ referralCode: string; position: number; isExisting?: boolean } | null>(null);
  const [emailStatus, setEmailStatus] = useState<{ checking: boolean; exists: boolean; referralCode?: string; position?: number }>({ checking: false, exists: false });

  const canNext = () => {
    if (step === 0) return !!(form.fullName?.trim() && form.email?.trim());
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If email already exists and user tries to submit, show their existing info
    if (step === 0 && emailStatus.exists && emailStatus.referralCode) {
      setResult({ 
        referralCode: emailStatus.referralCode, 
        position: emailStatus.position || 1,
        isExisting: true 
      });
      return;
    }
    
    if (step < 2) { setStep(s => s + 1); return; }
    setLoading(true);
    setError('');
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Database not configured. Please check your .env file.');
      }
      const res = await submitToWaitlist(form);
      setResult({ referralCode: res.referralCode, position: res.position, isExisting: res.isExisting });
      
      // Track signup event in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'waitlist_signup', {
          event_category: 'conversion',
          event_label: res.isExisting ? 'returning_user' : 'new_signup',
          referral_source: form.referredBy || 'direct',
          position: res.position
        });
      }
    } catch (err: any) {
      console.error('Waitlist submission error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="max-w-2xl mx-auto">

          {!result ? (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Be First to{' '}
                  <span className="text-gradient-teal">Experience A2S</span>
                </h2>
                <p className="font-body text-muted-foreground mb-4">
                  Join our early access list. Launching March 2026.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles size={14} className="text-copper" />
                  <span className="font-body text-xs text-muted-foreground">
                    28,000+ products ready · AI assistant included · Free early access
                  </span>
                </div>
              </div>

              {/* Step progress */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-display font-bold transition-all duration-300 ${i < step ? 'bg-primary text-primary-foreground' :
                        i === step ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                          'bg-muted text-muted-foreground'
                      }`}>
                      {i < step ? <Check size={12} /> : i + 1}
                    </div>
                    <span className={`text-xs font-body hidden sm:block ${i === step ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
                    {i < STEPS.length - 1 && <div className={`w-8 h-px mx-1 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                    {step === 0 && <Step1 form={form} setForm={setForm} emailStatus={emailStatus} setEmailStatus={setEmailStatus} />}
                    {step === 1 && <Step2 form={form} setForm={setForm} />}
                    {step === 2 && <Step3 form={form} setForm={setForm} />}
                  </motion.div>
                </AnimatePresence>

                {error && (
                  <p className="mt-4 text-sm text-red-500 font-body text-center">{error}</p>
                )}

                <div className="flex items-center justify-between mt-8 gap-3">
                  {step > 0 ? (
                    <button type="button" onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-muted-foreground font-display text-sm hover:bg-muted transition-all">
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : <div />}

                  <button type="submit" disabled={!canNext() || loading}
                    className="group flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-teal-light transition-all duration-300 bg-glow-teal disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                    ) : step < 2 ? (
                      <>Continue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                    ) : (
                      <>Join the Waitlist <Users size={16} /></>
                    )}
                  </button>
                </div>

                <p className="text-center font-body text-[11px] text-muted-foreground mt-4">
                  Step {step + 1} of 3 · {step === 2 ? 'Your data is secure and never shared.' : 'Takes about 60 seconds'}
                </p>
              </form>
            </>
          ) : (
            <SuccessCard referralCode={result.referralCode} position={result.position} userName={form.fullName || 'Friend'} isExisting={result.isExisting} />
          )}
        </motion.div>
      </div>
    </section>
  );
}

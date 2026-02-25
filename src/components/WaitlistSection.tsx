import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight, ArrowLeft, Check, Sparkles, Copy, Share2, Users, Trophy,
  Loader2, ChevronDown
} from 'lucide-react';
import { submitToWaitlist, isSupabaseConfigured } from '@/services/supabase';
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
function Step1({ form, setForm }: { form: WaitlistFormData; setForm: (f: WaitlistFormData) => void }) {
  useEffect(() => {
    // Auto-detect country via IP geolocation
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => { if (data.country_name && !form.country) setForm({ ...form, country: data.country_name }); })
      .catch(() => { });
  }, []);

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
          <input type="email" className={field} placeholder="Sai Srinidhi@example.com" required value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
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
function SuccessCard({ referralCode, position, userName }: { referralCode: string; position: number; userName: string }) {
  const [copied, setCopied] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState<string | null>(null);
  const firstName = userName.split(' ')[0];
  const shareUrl = `${window.location.origin}?ref=${referralCode}`;

  // Platform-specific share messages
  const whatsappText = `Hey! 👋 Found something actually useful —
There's this new platform called A2S launching next month. It helps you design any room with AI — picks furniture, compares prices across Amazon, Pepperfry, IKEA all in one place. No more 12 tabs open 😭
I'm on the early waitlist. Use my code and we both move up 👇
🔑 ${referralCode}
🔗 ${shareUrl}
Launching March 2026 — joining is free rn`;

  const twitterText = `we have 751 million internet users in India
and people are still opening 12 tabs to buy a sofa
@A2SIndia is fixing that — AI design assistant + cross-platform price intelligence, launching March 2026
I'm on the waitlist. join with my code ${referralCode} →`;

  const linkedinText = `India's home design market is worth ₹5.2 Lakh Crore — and it's still almost entirely manual.

The average homeowner visits 12+ platforms before buying a single piece of furniture. There's no price transparency, no design intelligence, and no single source of truth.

A2S (Aesthetics To Spaces) is launching in March 2026 to fix exactly that — a room-specific catalog, cross-platform price comparison, and an AI design consultant that works within your budget.

I've joined their early waitlist. If you're in home design, real estate, or just renovating soon — worth getting early access.

🔑 Referral code: ${referralCode}
🔗 ${shareUrl}

#A2S #PropTech #IndiaStartups #HomeDesign #AIDesign`;

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
      <h3 className="font-display text-2xl font-bold text-foreground mb-1">You're on the list! 🎉</h3>
      <p className="font-body text-muted-foreground text-sm mb-6">You're <span className="font-semibold text-primary">#{position}</span> in the queue. Share your code to move up!</p>

      {/* Queue position badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-6">
        <Trophy size={14} className="text-copper" />
        <span className="font-body text-xs text-foreground">Queue position <strong>#{position}</strong></span>
      </div>

      {/* Referral code box */}
      <div className="glass-card rounded-2xl p-6 mb-6 max-w-sm mx-auto">
        <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-3">Your Referral Code</p>
        <div className="flex items-center justify-between gap-3 bg-accent rounded-xl px-4 py-3">
          <span className="font-display text-xl font-bold text-primary tracking-widest">{referralCode}</span>
          <button onClick={copy} className="p-2 rounded-lg hover:bg-primary/10 transition-colors" title="Copy code">
            {copied ? <Check size={16} className="text-primary" /> : <Copy size={16} className="text-muted-foreground" />}
          </button>
        </div>
        <p className="font-body text-[11px] text-muted-foreground mt-3">Each person who uses your code moves you 2 spots forward</p>
      </div>

      {/* Social share */}
      <div className="flex flex-col items-center gap-4">
        <p className="font-body text-xs text-muted-foreground flex items-center gap-1.5">
          <Share2 size={12} /> Share to move up the queue:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <a href={`https://wa.me/?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-display font-semibold hover:opacity-90 transition-opacity">
            WhatsApp
          </a>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-foreground text-background text-xs font-display font-semibold hover:opacity-80 transition-opacity">
            Twitter/X
          </a>
          <button onClick={() => copyMessage('linkedin', linkedinText)}
            className="px-4 py-2 rounded-lg bg-[#0A66C2] text-white text-xs font-display font-semibold hover:opacity-90 transition-opacity">
            {copiedMsg === 'linkedin' ? 'Copied!' : 'Copy for LinkedIn'}
          </button>
        </div>
        <p className="font-body text-[10px] text-muted-foreground/70">Tip: For LinkedIn, paste the copied message in your post</p>
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
  const [result, setResult] = useState<{ referralCode: string; position: number } | null>(null);

  const canNext = () => {
    if (step === 0) return !!(form.fullName?.trim() && form.email?.trim());
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { setStep(s => s + 1); return; }
    setLoading(true);
    setError('');
    try {
      if (!isSupabaseConfigured()) {
        throw new Error('Database not configured. Please check your .env file.');
      }
      const res = await submitToWaitlist(form);
      setResult({ referralCode: res.referralCode, position: res.position });
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
                    {step === 0 && <Step1 form={form} setForm={setForm} />}
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
            <SuccessCard referralCode={result.referralCode} position={result.position} userName={form.fullName || 'Friend'} />
          )}
        </motion.div>
      </div>
    </section>
  );
}

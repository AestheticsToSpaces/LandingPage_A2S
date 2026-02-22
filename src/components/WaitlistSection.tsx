import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export default function WaitlistSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Be the First to{' '}
            <span className="text-gradient-teal">Experience A2S</span>
          </h2>
          <p className="font-body text-muted-foreground mb-4">
            Join our early access list. Launching 2nd week of March 2026.
          </p>
          <div className="flex items-center justify-center gap-2 mb-10">
            <Sparkles size={14} className="text-copper" />
            <span className="font-body text-xs text-muted-foreground">
              28,000+ products ready · AI assistant included · Free early access
            </span>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-4 rounded-xl bg-card border border-border text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-sm"
              />
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold hover:bg-teal-light transition-all duration-300 bg-glow-teal whitespace-nowrap"
              >
                Join Waitlist
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-primary font-display text-lg"
            >
              <Check size={24} />
              You're on the list! We'll be in touch soon.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

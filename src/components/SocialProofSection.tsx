import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Users, TrendingUp, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Interior Designer, Mumbai',
    text: 'Finally someone is solving the discovery problem. I spend hours comparing prices across platforms — A2S is exactly what this industry needs.',
    rating: 5,
  },
  {
    name: 'Rahul Mehta',
    role: 'First-time Homeowner, Bangalore',
    text: 'I was overwhelmed furnishing my 2BHK. The AI assistant concept is brilliant — set a budget, pick a style, and get a full room breakdown.',
    rating: 5,
  },
  {
    name: 'Ananya Krishnan',
    role: 'Architect, Chennai',
    text: 'The room-specific catalog approach is smart. My clients always ask for product recommendations — this will save me hours per project.',
    rating: 5,
  },
];

const proofPoints = [
  { icon: Users, value: '2,400+', label: 'Waitlist Signups' },
  { icon: TrendingUp, value: '340+', label: 'Design Professionals' },
  { icon: Star, value: '18', label: 'City Pre-launch Interest' },
];

export default function SocialProofSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 surface-teal opacity-50" />

      <div className="container mx-auto px-6 relative">
        {/* Proof numbers */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto"
        >
          {proofPoints.map((point) => (
            <div key={point.label} className="text-center">
              <point.icon size={20} className="text-primary mx-auto mb-2" />
              <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{point.value}</div>
              <div className="font-body text-xs text-muted-foreground mt-1">{point.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: '-30px' });

            return (
              <motion.div
                key={t.name}
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="glass-card rounded-2xl p-7 relative"
              >
                <Quote size={18} className="text-primary/20 absolute top-5 right-5" />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-copper text-copper" />
                  ))}
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                  "{t.text}"
                </p>
                <div>
                  <div className="font-display text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="font-body text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scrolling logos / trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-6">
            Early interest from professionals across
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground/60">
            {['Mumbai', 'Bangalore', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Kolkata'].map((city) => (
              <span key={city} className="font-display text-sm font-medium px-4 py-2 rounded-full border border-border bg-card/50">
                {city}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

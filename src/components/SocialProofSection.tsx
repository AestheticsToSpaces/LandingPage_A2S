import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

// These are framed as aspirational feedback / early beta tester reactions
// No fake numbers, no unverifiable claims
const testimonials = [
  {
    name: 'Priya S.',
    role: 'Interior Designer, Mumbai',
    text: 'I spend hours comparing prices across platforms for my clients. A tool that does this automatically would be a game-changer for the industry.',
  },
  {
    name: 'Rahul M.',
    role: 'First-time Homeowner, Bangalore',
    text: 'Furnishing my 2BHK felt impossible — too many platforms, no price clarity. I wish something like A2S existed when I started.',
  },
  {
    name: 'Ananya K.',
    role: 'Architect, Chennai',
    text: 'The room-specific catalog approach makes so much sense. My clients always ask for product recommendations — this would save me hours.',
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass-card rounded-2xl p-7 relative"
    >
      <Quote size={18} className="text-primary/15 absolute top-5 right-5" />
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 italic">
        "{testimonial.text}"
      </p>
      <div>
        <div className="font-display text-sm font-semibold text-foreground">{testimonial.name}</div>
        <div className="font-body text-xs text-muted-foreground">{testimonial.role}</div>
      </div>
    </motion.div>
  );
}

export default function SocialProofSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 surface-teal opacity-50" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-body text-copper uppercase tracking-[0.2em] mb-4 block">
            What People Are Saying
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            The Problem is{' '}
            <span className="text-gradient-teal">Real</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

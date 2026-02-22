import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import heroBg from '@/assets/hero-bg.jpg';

export default function VisionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="vision" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-8" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs font-body text-copper uppercase tracking-[0.2em] mb-4 block">
            Our Vision
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
            We Start with{' '}
            <span className="text-gradient-teal">Intelligence</span>.
            <br />
            We End with{' '}
            <span className="text-gradient-copper">Execution</span>.
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
            A2S isn't a mood board. It isn't a marketplace. It's design infrastructure 
            — built to capture how India's next 100 million homeowners discover, compare, 
            and source everything for their homes.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed">
            From a single prompt, our AI assistant maps your budget, style, and room to 
            real products across brands and platforms — with full price transparency.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '₹5.2L Cr', label: 'Total Addressable Market', accent: 'teal' },
  { value: '80%', label: 'Unorganized Market', accent: 'copper' },
  { value: '751M+', label: 'Internet Users in India', accent: 'teal' },
  { value: '12+', label: 'Platforms Visited per Purchase', accent: 'copper' },
];

export default function MarketSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="market" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body text-copper uppercase tracking-[0.2em] mb-4 block">
            The Opportunity
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            A Massive Market,{' '}
            <span className="text-gradient-teal">Waiting to be Organized</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            India's home design market is deeply fragmented and almost entirely manual. A2S changes that.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: '-30px' });

            return (
              <motion.div
                key={stat.label}
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <div className={`font-display text-3xl md:text-4xl font-bold mb-3 ${
                  stat.accent === 'teal' ? 'text-gradient-teal' : 'text-gradient-copper'
                }`}>
                  {stat.value}
                </div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider leading-relaxed">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

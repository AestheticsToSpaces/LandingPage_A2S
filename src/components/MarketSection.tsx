import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, AlertTriangle, Search, Users } from 'lucide-react';

const problems = [
  {
    icon: Search,
    stat: '12+',
    statLabel: 'platforms visited',
    title: 'Discovery is Broken',
    desc: 'The average homeowner visits 12+ platforms before making a single furniture purchase. No price transparency, no cross-platform comparison.',
    source: 'IMARC Group, 2024',
  },
  {
    icon: AlertTriangle,
    stat: '80%',
    statLabel: 'unorganized',
    title: 'Market is Fragmented',
    desc: 'Top 5 organized players hold only 16% market share. 80% remains unorganized — local contractors, carpenters, scattered retailers.',
    source: 'Mordor Intelligence',
  },
  {
    icon: Users,
    stat: '₹1.5–2L',
    statLabel: 'just for one room',
    title: 'Design is Expensive',
    desc: 'Interior designers charge ₹1.5–2 Lakhs just for living room design. Full home interiors cost ₹8–25 Lakhs for premium segments.',
    source: 'Industry Average',
  },
  {
    icon: TrendingUp,
    stat: '₹5.2L Cr',
    statLabel: 'total market',
    title: 'But the Market is Massive',
    desc: 'India\'s combined interior design and furniture market exceeds ₹5.2 Lakh Crore, growing at 8%+ CAGR. Online furniture alone projected to hit ₹50,000 Cr by 2033.',
    source: 'IMARC Group, Mordor Intelligence',
  },
];

function ProblemCard({ problem, index }: { problem: typeof problems[0]; index: number }) {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass-card rounded-2xl p-8 relative overflow-hidden group"
    >
      <div className="flex items-start gap-5">
        <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
          <problem.icon size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span className={`font-display text-2xl font-bold ${
              index === 3 ? 'text-gradient-teal' : 'text-gradient-copper'
            }`}>
              {problem.stat}
            </span>
            <span className="font-body text-xs text-muted-foreground">{problem.statLabel}</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">{problem.desc}</p>
          <span className="font-body text-[10px] text-muted-foreground/60 uppercase tracking-wider">
            Source: {problem.source}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MarketSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="market" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body text-copper uppercase tracking-[0.2em] mb-4 block">
            Why Now
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Problem{' '}
            <span className="text-gradient-teal">A2S Solves</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            India's home design market is massive, growing, and deeply underserved by technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} problem={problem} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

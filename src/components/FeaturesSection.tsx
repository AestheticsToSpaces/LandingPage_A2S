import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, LayoutGrid, IndianRupee, Palette, Search, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: LayoutGrid,
    title: 'Room-Specific Catalogs',
    desc: 'Browse curated product collections organized by room type — living room, bedroom, kitchen, and more.',
  },
  {
    icon: IndianRupee,
    title: 'Cross-Platform Price Intel',
    desc: 'Compare prices across brands and platforms instantly. Never overpay for furniture again.',
  },
  {
    icon: Brain,
    title: 'AI Design Assistant',
    desc: 'Describe your dream room and get a complete product shortlist with one prompt.',
  },
  {
    icon: Palette,
    title: 'Aesthetic-Aware Filters',
    desc: 'Filter by style — Scandinavian, Mid-Century, Indian Contemporary, Minimalist, and more.',
  },
  {
    icon: Search,
    title: 'Smart Discovery',
    desc: 'No more scrolling 12+ platforms. Find exactly what fits your space, style, and budget.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted & Transparent',
    desc: 'Verified products, real reviews, and transparent pricing from organized retailers.',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-500 hover:bg-glow-teal"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
        <feature.icon size={22} className="text-primary" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground mb-3">
        {feature.title}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        {feature.desc}
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="product" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body text-copper uppercase tracking-[0.2em] mb-4 block">
            What We Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Design Infrastructure,{' '}
            <span className="text-gradient-teal">Not Just Inspiration</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            A2S captures how India's next 100 million homeowners furnish their spaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

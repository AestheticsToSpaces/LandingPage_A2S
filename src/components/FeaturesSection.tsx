import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, LayoutGrid, IndianRupee, Palette, Search, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: LayoutGrid,
    title: 'Room-Specific Catalogs',
    desc: 'Browse curated product collections organized by room type — living room, bedroom, kitchen, and more.',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    icon: IndianRupee,
    title: 'Cross-Platform Price Intel',
    desc: 'Compare prices across brands and platforms instantly. Never overpay for furniture again.',
    className: 'md:col-span-1 md:row-span-2',
  },
  {
    icon: Brain,
    title: 'AI Design Assistant',
    desc: 'Describe your dream room and get a complete product shortlist with one prompt.',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Palette,
    title: 'Aesthetic-Aware Filters',
    desc: 'Filter by style — Scandinavian, Mid-Century, Indian Contemporary, Minimalist, and more.',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Search,
    title: 'Smart Discovery',
    desc: 'No more scrolling 12+ platforms. Find exactly what fits your space, style, and budget.',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted & Transparent',
    desc: 'Verified products, real reviews, and transparent pricing from organized retailers.',
    className: 'md:col-span-1 md:row-span-1',
  },
];

// Animated mini-demos for each feature
function RoomCatalogDemo() {
  return (
    <div className="relative h-20 mb-4 overflow-hidden rounded-lg bg-accent/30">
      {['Living', 'Bed', 'Kitchen'].map((room, i) => (
        <motion.div
          key={room}
          className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-card border border-border shadow-sm text-xs font-body"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 12 + i * 70, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3 }}
          style={{ top: 8 + i * 20 }}
        >
          <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-copper' : 'bg-gold'}`} />
          {room}
        </motion.div>
      ))}
    </div>
  );
}

function PriceCompareDemo() {
  return (
    <div className="relative h-20 mb-4 overflow-hidden rounded-lg bg-accent/30 p-3">
      <div className="flex gap-2 h-full items-end">
        {[65, 85, 45, 72, 55].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-primary/20 relative overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: 1 + i * 0.12, repeat: Infinity, repeatType: 'reverse', repeatDelay: 4 }}
          >
            {i === 2 && (
              <motion.div
                className="absolute inset-0 bg-primary rounded-t"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.4, repeat: Infinity, repeatType: 'reverse', repeatDelay: 4 }}
              />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="absolute bottom-2 right-3 text-[10px] font-display font-bold text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, repeatDelay: 2 }}
      >
        Best: ₹8,499
      </motion.div>
    </div>
  );
}

function AIAssistantDemo() {
  const text = 'Modern living room, ₹2L budget...';
  return (
    <div className="relative h-20 mb-4 overflow-hidden rounded-lg bg-accent/30 p-3">
      <div className="bg-card rounded-md border border-border px-3 py-2 text-xs font-body text-muted-foreground overflow-hidden">
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block overflow-hidden whitespace-nowrap"
        >
          {text}
        </motion.span>
        <motion.span
          className="inline-block w-0.5 h-3 bg-primary ml-0.5"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </div>
      <motion.div
        className="mt-1.5 flex gap-1.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 0] }}
        transition={{ duration: 5, delay: 2.5, repeat: Infinity, repeatDelay: 1 }}
      >
        {['Sofa', 'Table', 'Lamp'].map((item) => (
          <span key={item} className="px-2 py-0.5 rounded bg-primary/10 text-[10px] font-body text-primary">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function AestheticFilterDemo() {
  const styles = ['Minimal', 'Scandi', 'Boho', 'MCM'];
  return (
    <div className="relative h-20 mb-4 overflow-hidden rounded-lg bg-accent/30 p-3 flex flex-wrap gap-1.5 content-start">
      {styles.map((s, i) => (
        <motion.div
          key={s}
          className="px-2.5 py-1 rounded-full text-[10px] font-body border"
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.4, 1, 0.4],
            borderColor: ['hsl(210 15% 88%)', 'hsl(28 50% 48%)', 'hsl(210 15% 88%)'],
            color: ['hsl(210 10% 45%)', 'hsl(28 50% 48%)', 'hsl(210 10% 45%)'],
          }}
          transition={{
            duration: 3,
            delay: i * 0.8,
            repeat: Infinity,
            repeatDelay: styles.length * 0.8,
          }}
        >
          {s}
        </motion.div>
      ))}
    </div>
  );
}

function SmartSearchDemo() {
  return (
    <div className="relative h-20 mb-4 overflow-hidden rounded-lg bg-accent/30 p-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-5 rounded bg-muted"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.3, 0.1, 0.1] }}
            transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
      </div>
      <motion.div
        className="absolute top-3 left-3 right-3 flex gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <motion.div
          className="w-12 h-12 rounded-lg bg-card border-2 border-primary shadow-md"
          layoutId="search-result"
        />
        <div className="flex-1 space-y-1 py-1">
          <div className="h-2 bg-primary/20 rounded w-3/4" />
          <div className="h-1.5 bg-muted rounded w-1/2" />
          <div className="h-1.5 bg-primary/10 rounded w-1/3" />
        </div>
      </motion.div>
    </div>
  );
}

function TrustedDemo() {
  return (
    <div className="relative h-20 mb-4 overflow-hidden rounded-lg bg-accent/30 p-3 flex items-center justify-center gap-3">
      {[
        { label: '✓', color: 'bg-primary' },
        { label: '★', color: 'bg-copper' },
        { label: '₹', color: 'bg-primary' },
      ].map((item, i) => (
        <motion.div
          key={i}
          className={`w-10 h-10 rounded-full ${item.color} text-primary-foreground flex items-center justify-center text-sm font-bold`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: [0, 1, 1], rotate: [-180, 0, 0] }}
          transition={{ duration: 1.5, delay: 1 + i * 0.3, repeat: Infinity, repeatDelay: 4 }}
        >
          {item.label}
        </motion.div>
      ))}
    </div>
  );
}

const featureDemos = [
  RoomCatalogDemo,
  PriceCompareDemo,
  AIAssistantDemo,
  AestheticFilterDemo,
  SmartSearchDemo,
  TrustedDemo,
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const DemoComponent = featureDemos[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group glass-card rounded-2xl p-6 hover:border-primary/20 transition-all duration-500 flex flex-col justify-between ${feature.className}`}
    >
      <div>
        {inView && <DemoComponent />}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <feature.icon size={18} className="text-primary" />
          </div>
          <h3 className="font-display text-base font-semibold text-foreground">
            {feature.title}
          </h3>
        </div>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="product" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px]" />

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
            Aesthetics To Spaces captures how India's next 100 million homeowners furnish their spaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

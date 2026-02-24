import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowDown, Layers, TrendingDown, ExternalLink, Star } from 'lucide-react';

import sofaImg from '@/assets/products/sofa.jpg';
import coffeeTableImg from '@/assets/products/coffee-table.jpg';
import lampImg from '@/assets/products/lamp.jpg';
import rugImg from '@/assets/products/rug.jpg';
import tvUnitImg from '@/assets/products/tv-unit.jpg';

interface PriceEntry {
  platform: string;
  price: string;
  priceNum: number;
  best?: boolean;
}

interface BreakdownProduct {
  name: string;
  category: string;
  img: string;
  prices: PriceEntry[];
}

const breakdownProducts: BreakdownProduct[] = [
  {
    name: '3-Seater L-Shape Sofa',
    category: 'Seating',
    img: sofaImg,
    prices: [
      { platform: 'Pepperfry', price: '₹28,999', priceNum: 28999, best: true },
      { platform: 'Urban Ladder', price: '₹32,499', priceNum: 32499 },
      { platform: 'Amazon', price: '₹31,200', priceNum: 31200 },
    ],
  },
  {
    name: 'Solid Wood Coffee Table',
    category: 'Table',
    img: coffeeTableImg,
    prices: [
      { platform: 'Amazon', price: '₹8,499', priceNum: 8499, best: true },
      { platform: 'Flipkart', price: '₹9,199', priceNum: 9199 },
      { platform: 'Pepperfry', price: '₹9,899', priceNum: 9899 },
    ],
  },
  {
    name: 'Floor Lamp – Brass Finish',
    category: 'Lighting',
    img: lampImg,
    prices: [
      { platform: 'IKEA', price: '₹4,299', priceNum: 4299, best: true },
      { platform: 'HomeTown', price: '₹5,100', priceNum: 5100 },
      { platform: 'Pepperfry', price: '₹4,899', priceNum: 4899 },
    ],
  },
  {
    name: 'Handwoven Area Rug 5×7',
    category: 'Decor',
    img: rugImg,
    prices: [
      { platform: 'Jaypore', price: '₹6,799', priceNum: 6799, best: true },
      { platform: 'FabIndia', price: '₹7,999', priceNum: 7999 },
      { platform: 'Amazon', price: '₹8,499', priceNum: 8499 },
    ],
  },
  {
    name: 'TV Console Unit – Walnut',
    category: 'Storage',
    img: tvUnitImg,
    prices: [
      { platform: 'WoodenStreet', price: '₹12,499', priceNum: 12499, best: true },
      { platform: 'Pepperfry', price: '₹14,299', priceNum: 14299 },
      { platform: 'Urban Ladder', price: '₹13,999', priceNum: 13999 },
    ],
  },
];

function ProductBreakdownCard({ product, index }: { product: BreakdownProduct; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [autoExpanded, setAutoExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAutoExpanded(true);
      setExpanded(true);
    }, 1500 + index * 600);
    const collapseTimer = setTimeout(() => {
      setAutoExpanded(false);
      setExpanded(false);
    }, 4000 + index * 600);
    return () => {
      clearTimeout(timer);
      clearTimeout(collapseTimer);
    };
  }, [index]);

  const bestPrice = product.prices.find((p) => p.best);
  const maxPrice = Math.max(...product.prices.map((p) => p.priceNum));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      className="glass-card rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-3 p-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden border border-border shrink-0">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-display font-semibold text-foreground truncate">{product.name}</div>
          <div className="text-[10px] font-body text-muted-foreground">{product.category}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs font-display font-bold text-primary">{bestPrice?.price}</div>
          <div className="text-[9px] font-body text-muted-foreground">{bestPrice?.platform}</div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ArrowDown size={12} className="text-muted-foreground" />
        </motion.div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-3 pb-3 space-y-1.5">
              <div className="text-[10px] font-body text-muted-foreground uppercase tracking-wider mb-1">
                Price comparison across platforms
              </div>
              {product.prices.map((entry, i) => (
                <motion.div
                  key={entry.platform}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                    entry.best ? 'bg-primary/5 border border-primary/15' : 'bg-muted/30'
                  }`}
                >
                  <div className="flex-1 font-body text-foreground">
                    {entry.platform}
                    {entry.best && (
                      <span className="ml-1.5 text-[9px] text-primary font-semibold">BEST</span>
                    )}
                  </div>
                  {/* Price bar */}
                  <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${entry.best ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(entry.priceNum / maxPrice) * 100}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                  <span className={`font-display font-semibold ${entry.best ? 'text-primary' : 'text-muted-foreground'}`}>
                    {entry.price}
                  </span>
                </motion.div>
              ))}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BreakdownDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const totalBest = breakdownProducts.reduce(
    (sum, p) => sum + (p.prices.find((x) => x.best)?.priceNum || 0),
    0
  );
  const totalMax = breakdownProducts.reduce(
    (sum, p) => sum + Math.max(...p.prices.map((x) => x.priceNum)),
    0
  );
  const savings = totalMax - totalBest;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-body text-copper uppercase tracking-[0.2em] mb-4 block">
            Deep Dive
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How the{' '}
            <span className="text-gradient-copper">Breakdown Works</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-sm">
            Every product is compared across platforms in real-time. Click any item to see the full price landscape.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Room label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-4 px-1"
          >
            <Layers size={14} className="text-primary" />
            <span className="text-xs font-display font-semibold text-foreground">Living Room · Scandinavian · ₹2L Budget</span>
            <span className="ml-auto flex items-center gap-1 text-[10px] font-body text-primary">
              <TrendingDown size={10} />
              Save ₹{savings.toLocaleString('en-IN')} with best prices
            </span>
          </motion.div>

          {/* Product cards */}
          {inView && (
            <div className="space-y-2">
              {breakdownProducts.map((product, i) => (
                <ProductBreakdownCard key={product.name} product={product} index={i} />
              ))}
            </div>
          )}

          {/* Total */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
            className="mt-4 glass-card rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-display font-semibold text-foreground">Room Total (Best Prices)</div>
              <div className="text-[10px] font-body text-muted-foreground mt-0.5">
                {breakdownProducts.length} products · Prices compared across {3} platforms each
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-display font-bold text-gradient-teal">
                ₹{totalBest.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] font-body text-muted-foreground line-through">
                ₹{totalMax.toLocaleString('en-IN')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

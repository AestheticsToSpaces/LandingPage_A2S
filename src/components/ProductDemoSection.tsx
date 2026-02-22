import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Bed, Sofa, ChefHat, IndianRupee, Palette, Wand2, ArrowRight, Star } from 'lucide-react';

// Product images
import sofaImg from '@/assets/products/sofa.jpg';
import coffeeTableImg from '@/assets/products/coffee-table.jpg';
import lampImg from '@/assets/products/lamp.jpg';
import rugImg from '@/assets/products/rug.jpg';
import tvUnitImg from '@/assets/products/tv-unit.jpg';
import bedImg from '@/assets/products/bed.jpg';
import mattressImg from '@/assets/products/mattress.jpg';
import nightstandImg from '@/assets/products/nightstand.jpg';
import wardrobeImg from '@/assets/products/wardrobe.jpg';
import kitchenCabinetImg from '@/assets/products/kitchen-cabinet.jpg';
import countertopImg from '@/assets/products/countertop.jpg';
import chimneyImg from '@/assets/products/chimney.jpg';

const rooms = [
  { id: 'living', label: 'Living Room', icon: Sofa },
  { id: 'bedroom', label: 'Bedroom', icon: Bed },
  { id: 'kitchen', label: 'Kitchen', icon: ChefHat },
];

const aesthetics = ['Minimalist', 'Mid-Century', 'Indian Contemporary', 'Scandinavian'];
const budgets = ['₹50K – ₹1.5L', '₹1.5L – ₹3L', '₹3L – ₹5L', '₹5L+'];

interface Product {
  name: string;
  category: string;
  price: string;
  platform: string;
  altPrice?: string;
  altPlatform?: string;
  rating: number;
  image: string;
}

const demoProducts: Record<string, Product[]> = {
  living: [
    { name: '3-Seater L-Shape Sofa', category: 'Seating', price: '₹28,999', platform: 'Pepperfry', altPrice: '₹32,499', altPlatform: 'Urban Ladder', rating: 4.3, image: sofaImg },
    { name: 'Solid Wood Coffee Table', category: 'Table', price: '₹8,499', platform: 'Amazon', altPrice: '₹9,199', altPlatform: 'Flipkart', rating: 4.5, image: coffeeTableImg },
    { name: 'Floor Lamp – Brass Finish', category: 'Lighting', price: '₹4,299', platform: 'IKEA', altPrice: '₹5,100', altPlatform: 'HomeTown', rating: 4.1, image: lampImg },
    { name: 'Handwoven Area Rug 5x7', category: 'Decor', price: '₹6,799', platform: 'Jaypore', altPrice: '₹7,999', altPlatform: 'FabIndia', rating: 4.6, image: rugImg },
    { name: 'TV Console Unit – Walnut', category: 'Storage', price: '₹12,499', platform: 'WoodenStreet', altPrice: '₹14,299', altPlatform: 'Pepperfry', rating: 4.4, image: tvUnitImg },
  ],
  bedroom: [
    { name: 'King Size Bed – Sheesham', category: 'Bed', price: '₹24,999', platform: 'WoodenStreet', altPrice: '₹27,499', altPlatform: 'Urban Ladder', rating: 4.5, image: bedImg },
    { name: 'Memory Foam Mattress', category: 'Mattress', price: '₹15,999', platform: 'Wakefit', altPrice: '₹18,499', altPlatform: 'Sleepyhead', rating: 4.7, image: mattressImg },
    { name: 'Bedside Table Set of 2', category: 'Table', price: '₹5,999', platform: 'Amazon', altPrice: '₹6,499', altPlatform: 'Flipkart', rating: 4.2, image: nightstandImg },
    { name: '3-Door Wardrobe', category: 'Storage', price: '₹18,999', platform: 'Godrej Interio', altPrice: '₹21,999', altPlatform: 'HomeTown', rating: 4.3, image: wardrobeImg },
  ],
  kitchen: [
    { name: 'Modular Cabinet Set', category: 'Cabinets', price: '₹45,999', platform: 'HomeLane', altPrice: '₹52,000', altPlatform: 'LivSpace', rating: 4.4, image: kitchenCabinetImg },
    { name: 'Granite Countertop Slab', category: 'Surface', price: '₹8,999', platform: 'BuildBazaar', altPrice: '₹10,499', altPlatform: 'Local Vendor', rating: 4.1, image: countertopImg },
    { name: 'Chimney – 60cm Auto Clean', category: 'Appliance', price: '₹12,499', platform: 'Amazon', altPrice: '₹13,999', altPlatform: 'Flipkart', rating: 4.6, image: chimneyImg },
  ],
};

export default function ProductDemoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedRoom, setSelectedRoom] = useState('living');
  const [selectedAesthetic, setSelectedAesthetic] = useState('Minimalist');
  const [selectedBudget, setSelectedBudget] = useState('₹1.5L – ₹3L');
  const [showResults, setShowResults] = useState(false);

  const products = demoProducts[selectedRoom] || demoProducts.living;
  const totalMin = products.reduce((sum, p) => sum + parseInt(p.price.replace(/[₹,]/g, '')), 0);

  return (
    <section id="demo" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body text-copper uppercase tracking-[0.2em] mb-4 block">
            Product Demo
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            See the{' '}
            <span className="text-gradient-teal">Breakdown in Action</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Pick a room, set your preferences, and watch A2S decompose it into a complete product list with cross-platform pricing.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Configurator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 mb-6"
          >
            <div className="mb-6">
              <label className="font-display text-sm font-semibold text-foreground mb-3 block">Select Room</label>
              <div className="flex flex-wrap gap-3">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => { setSelectedRoom(room.id); setShowResults(false); }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm transition-all duration-300 ${
                      selectedRoom === room.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    <room.icon size={16} />
                    {room.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="font-display text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Palette size={15} className="text-copper" /> Aesthetic
              </label>
              <div className="flex flex-wrap gap-2">
                {aesthetics.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setSelectedAesthetic(a); setShowResults(false); }}
                    className={`px-4 py-2 rounded-lg font-body text-xs transition-all duration-200 ${
                      selectedAesthetic === a
                        ? 'bg-copper text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="font-display text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <IndianRupee size={15} className="text-primary" /> Budget Range
              </label>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    onClick={() => { setSelectedBudget(b); setShowResults(false); }}
                    className={`px-4 py-2 rounded-lg font-body text-xs transition-all duration-200 ${
                      selectedBudget === b
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowResults(true)}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-teal-light transition-all duration-300 bg-glow-teal"
            >
              <Wand2 size={16} />
              Generate Room Breakdown
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {rooms.find(r => r.id === selectedRoom)?.label} · {selectedAesthetic}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        {products.length} products found · Budget: {selectedBudget}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg font-bold text-gradient-teal">
                        ₹{totalMin.toLocaleString('en-IN')}
                      </div>
                      <p className="font-body text-xs text-muted-foreground">Best price total</p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {products.map((product, i) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="p-4 md:p-5 flex items-center gap-4 hover:bg-accent/30 transition-colors group"
                    >
                      {/* Product image */}
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-sm font-semibold text-foreground">{product.name}</div>
                        <div className="font-body text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-muted text-xs">{product.category}</span>
                          <span className="flex items-center gap-0.5">
                            <Star size={10} className="fill-copper text-copper" /> {product.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display text-sm font-bold text-primary">{product.price}</div>
                        <div className="font-body text-xs text-muted-foreground">{product.platform}</div>
                      </div>
                      <div className="text-right shrink-0 hidden sm:block">
                        <div className="font-body text-xs text-muted-foreground line-through">{product.altPrice}</div>
                        <div className="font-body text-xs text-muted-foreground">{product.altPlatform}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-5 bg-accent/20 text-center">
                  <p className="font-body text-xs text-muted-foreground">
                    🔒 Full breakdown with direct purchase links available at launch
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

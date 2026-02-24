import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Wand2, ChevronRight, Check, Sparkles } from 'lucide-react';

import sofaImg from '@/assets/products/sofa.jpg';
import coffeeTableImg from '@/assets/products/coffee-table.jpg';
import lampImg from '@/assets/products/lamp.jpg';
import rugImg from '@/assets/products/rug.jpg';
import tvUnitImg from '@/assets/products/tv-unit.jpg';

const promptText = 'Design a modern living room under ₹2 lakhs, Scandinavian style';

const steps = [
  { id: 'prompt', label: 'You Describe' },
  { id: 'analyze', label: 'AI Analyzes' },
  { id: 'curate', label: 'Products Curated' },
  { id: 'result', label: 'Room Ready' },
];

const products = [
  { name: '3-Seater L-Shape Sofa', price: '₹28,999', platform: 'Pepperfry', img: sofaImg },
  { name: 'Solid Wood Coffee Table', price: '₹8,499', platform: 'Amazon', img: coffeeTableImg },
  { name: 'Floor Lamp – Brass', price: '₹4,299', platform: 'IKEA', img: lampImg },
  { name: 'Handwoven Area Rug', price: '₹6,799', platform: 'Jaypore', img: rugImg },
  { name: 'TV Console – Walnut', price: '₹12,499', platform: 'WoodenStreet', img: tvUnitImg },
];

const analysisTags = [
  'Room: Living Room',
  'Style: Scandinavian',
  'Budget: ₹2,00,000',
  'Seating ✓',
  'Tables ✓',
  'Lighting ✓',
  'Decor ✓',
  'Storage ✓',
];

export default function PromptToRoomDemo() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play the demo when in view
  useEffect(() => {
    if (!inView || isPlaying) return;
    setIsPlaying(true);
    setActiveStep(0);
    setTypedChars(0);
  }, [inView]);

  // Typing animation for step 0
  useEffect(() => {
    if (activeStep !== 0 || !isPlaying) return;
    if (typedChars < promptText.length) {
      const timer = setTimeout(() => setTypedChars((c) => c + 1), 40);
      return () => clearTimeout(timer);
    }
    // Move to next step after typing completes
    const timer = setTimeout(() => setActiveStep(1), 800);
    return () => clearTimeout(timer);
  }, [activeStep, typedChars, isPlaying]);

  // Auto-advance steps 1 → 2 → 3
  useEffect(() => {
    if (!isPlaying || activeStep === 0) return;
    if (activeStep < 3) {
      const delay = activeStep === 1 ? 2500 : 2000;
      const timer = setTimeout(() => setActiveStep((s) => s + 1), delay);
      return () => clearTimeout(timer);
    }
    // Loop after showing results
    const timer = setTimeout(() => {
      setActiveStep(0);
      setTypedChars(0);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeStep, isPlaying]);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-body text-copper uppercase tracking-[0.2em] mb-4 block">
            Live Walkthrough
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            From Prompt to{' '}
            <span className="text-gradient-teal">Complete Room</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-sm">
            Watch how a single sentence becomes a fully sourced room with real products and prices.
          </p>
        </motion.div>

        {/* Step progress bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-[12%] right-[12%] h-0.5 bg-border" />
            <motion.div
              className="absolute top-5 left-[12%] h-0.5 bg-primary origin-left"
              animate={{ width: `${(activeStep / 3) * 76}%` }}
              transition={{ duration: 0.6 }}
            />
            {steps.map((step, i) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-display font-bold border-2 transition-colors duration-300 ${
                    i <= activeStep
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-card border-border text-muted-foreground'
                  }`}
                  animate={i === activeStep ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {i < activeStep ? <Check size={14} /> : i + 1}
                </motion.div>
                <span className={`text-[11px] font-body ${i <= activeStep ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo viewport */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl overflow-hidden min-h-[320px] relative">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/30">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-copper/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
              <span className="ml-3 text-[10px] font-body text-muted-foreground">a2s.design — AI Room Designer</span>
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {/* Step 0: Typing prompt */}
                {activeStep === 0 && (
                  <motion.div
                    key="prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Wand2 size={16} className="text-primary" />
                      <span className="text-xs font-display font-semibold text-foreground">Describe your dream room</span>
                    </div>
                    <div className="bg-accent/30 rounded-xl p-4 border border-border min-h-[60px]">
                      <span className="font-body text-sm text-foreground">
                        {promptText.slice(0, typedChars)}
                      </span>
                      <motion.span
                        className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="px-3 py-1.5 rounded-lg bg-muted text-[11px] font-body text-muted-foreground">Scandinavian</div>
                      <div className="px-3 py-1.5 rounded-lg bg-muted text-[11px] font-body text-muted-foreground">₹2L Budget</div>
                      <div className="px-3 py-1.5 rounded-lg bg-muted text-[11px] font-body text-muted-foreground">Living Room</div>
                    </div>
                  </motion.div>
                )}

                {/* Step 1: AI Analyzing */}
                {activeStep === 1 && (
                  <motion.div
                    key="analyze"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                        <Sparkles size={16} className="text-copper" />
                      </motion.div>
                      <span className="text-xs font-display font-semibold text-foreground">AI is analyzing your prompt...</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysisTags.map((tag, i) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.2, duration: 0.3 }}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-body ${
                            tag.includes('✓')
                              ? 'bg-primary/10 text-primary border border-primary/20'
                              : 'bg-accent text-accent-foreground border border-border'
                          }`}
                        >
                          {tag}
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      className="mt-5 h-1.5 rounded-full bg-muted overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                      />
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 2: Products appearing */}
                {activeStep === 2 && (
                  <motion.div
                    key="curate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles size={16} className="text-primary" />
                      <span className="text-xs font-display font-semibold text-foreground">Curating products across platforms...</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {products.map((p, i) => (
                        <motion.div
                          key={p.name}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: i * 0.25, duration: 0.4 }}
                          className="rounded-lg overflow-hidden border border-border bg-card"
                        >
                          <div className="aspect-square overflow-hidden">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-1.5">
                            <div className="text-[9px] font-body text-foreground truncate">{p.name.split(' ').slice(0, 2).join(' ')}</div>
                            <div className="text-[9px] font-display font-bold text-primary">{p.price}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Final result */}
                {activeStep === 3 && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-primary" />
                        <span className="text-xs font-display font-semibold text-foreground">Your room is ready!</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-display font-bold text-gradient-teal">₹60,996</div>
                        <div className="text-[10px] font-body text-muted-foreground">Best price total</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {products.map((p, i) => (
                        <motion.div
                          key={p.name}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-border shrink-0">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-display font-semibold text-foreground truncate">{p.name}</div>
                            <div className="text-[10px] font-body text-muted-foreground">{p.platform}</div>
                          </div>
                          <div className="text-xs font-display font-bold text-primary shrink-0">{p.price}</div>
                          <ChevronRight size={12} className="text-muted-foreground shrink-0" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

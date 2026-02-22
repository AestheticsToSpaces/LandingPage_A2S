import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Home, SlidersHorizontal, Wand2, ShoppingCart } from 'lucide-react';

const steps = [
  {
    icon: Home,
    num: '01',
    title: 'Select Your Room',
    desc: 'Choose the room you want to design — living room, bedroom, kitchen, or any space.',
  },
  {
    icon: SlidersHorizontal,
    num: '02',
    title: 'Set Budget & Style',
    desc: 'Pick your budget range and preferred aesthetic. We handle the rest.',
  },
  {
    icon: Wand2,
    num: '03',
    title: 'AI Builds Your Room',
    desc: 'Our AI curates a complete product list — decomposed by category, matched to your taste.',
  },
  {
    icon: ShoppingCart,
    num: '04',
    title: 'Compare & Source',
    desc: 'See every product across platforms with real-time pricing. Buy with confidence.',
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="relative py-32">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-copper/5 blur-[100px]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-body text-copper uppercase tracking-[0.2em] mb-4 block">
            How It Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            From Prompt to{' '}
            <span className="text-gradient-copper">Perfect Room</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const stepRef = useRef(null);
            const stepInView = useInView(stepRef, { once: true, margin: '-50px' });

            return (
              <motion.div
                key={step.num}
                ref={stepRef}
                initial={{ opacity: 0, y: 40 }}
                animate={stepInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative text-center group"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}

                <div className="relative mx-auto w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-500">
                  <step.icon size={28} className="text-primary" />
                  <span className="absolute -top-2 -right-2 text-xs font-display font-bold text-copper bg-background border border-border rounded-full w-7 h-7 flex items-center justify-center">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-[250px] mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: 'Is Aesthetics To Spaces free to use?',
        a: 'Yes — early access is completely free. Our core discovery and price comparison tools will always have a free tier. We may introduce optional premium features (AI room planning, curated design packages) in the future.',
    },
    {
        q: 'When does it launch?',
        a: 'We are targeting the 2nd week of March 2026 for our official launch. Waitlist members will get access 1 week early, before the public.',
    },
    {
        q: 'How does the AI Design Assistant work?',
        a: 'You describe your room in plain language — style, budget, dimensions (optional) — and our AI curates a complete product shortlist from 28,000+ verified items, sorted by price, rating, and aesthetic match.',
    },
    {
        q: 'Which platforms do you compare prices across?',
        a: 'At launch: Amazon, Pepperfry, Urban Ladder, IKEA India, Flipkart, and select direct-to-consumer brands. We add new platforms every sprint based on user demand.',
    },
    {
        q: 'How does the referral program work?',
        a: 'Every waitlist member gets a unique referral code. Each person who joins using your code moves you 2 spots forward in the queue. You can see your live position and refer friends via WhatsApp, Twitter/X, or LinkedIn.',
    },
    {
        q: 'Do you sell furniture directly?',
        a: 'No — we are a discovery and price intelligence layer, not a retailer. We surface the best options and link you directly to the retailer to complete the purchase. This keeps pricing honest and selection wide.',
    },
    {
        q: 'Is my data safe?',
        a: 'Yes. Waitlist data is stored securely. We do not sell your data to any third party. You can request deletion at any time by emailing aestheticstospaces2@gmail.com.',
    },
    {
        q: 'How do I qualify for beta testing?',
        a: 'Check "Interested in beta testing" in the waitlist form. We will hand-pick beta households based on diverse room types, budgets, and cities to ensure we test across real use cases. We\'ll email you if selected.',
    },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-30px' });

    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="glass-card rounded-2xl overflow-hidden">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-accent/30 transition-colors duration-200"
                aria-expanded={open}
            >
                <span className="font-display text-sm font-semibold text-foreground">{q}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                    <ChevronDown size={18} className="text-muted-foreground" />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                        <div className="px-6 pb-6 font-body text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="faq" className="relative py-32">
            {/* Schema.org FAQ structured data for SEO */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: faqs.map(f => ({
                        '@type': 'Question',
                        name: f.q,
                        acceptedAnswer: { '@type': 'Answer', text: f.a },
                    })),
                })
            }} />

            <div className="container mx-auto px-6">
                <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }} className="text-center mb-16">
                    <span className="text-xs font-body text-copper uppercase tracking-[0.2em] mb-4 block">FAQ</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Common{' '}
                        <span className="text-gradient-teal">Questions</span>
                    </h2>
                    <p className="font-body text-muted-foreground max-w-md mx-auto">
                        Everything you need to know before joining the waitlist.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

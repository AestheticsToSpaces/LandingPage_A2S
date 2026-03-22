import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Target, Heart, Zap, Users } from 'lucide-react';
import logo from '@/assets/logo.webp';

const values = [
  {
    icon: Target,
    title: 'Design for Everyone',
    desc: 'Premium home design shouldn\'t cost lakhs. We\'re democratizing interior design with AI-powered tools accessible to every Indian household.',
  },
  {
    icon: Zap,
    title: 'Simplify Discovery',
    desc: 'No more visiting 12+ platforms. One unified catalog, transparent pricing, and intelligent recommendations — all in one place.',
  },
  {
    icon: Heart,
    title: 'Honesty First',
    desc: 'We don\'t sell furniture. We show you the best options from trusted retailers, with real prices and no hidden commissions.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'Built with input from homeowners, renters, and design enthusiasts across India. Your feedback shapes our roadmap.',
  },
];

export default function About() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Aesthetics To Spaces" className="w-20 h-20 rounded-2xl object-cover" loading="lazy" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="text-gradient-teal">Aesthetics To Spaces</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              India's AI-powered home design infrastructure. We're building the future of how
              Indians discover, compare, and design their perfect living spaces.
            </p>
          </div>

          {/* Mission */}
          <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-copper" />
              <span className="font-body text-xs text-copper uppercase tracking-wider">Our Mission</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Making Beautiful Homes Accessible to All
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              The Indian home design market is worth over ₹5.2 Lakh Crore, yet it remains frustratingly
              fragmented. Homeowners visit 12+ platforms to compare prices, spend lakhs on interior designers,
              and still struggle to find furniture that matches their style and budget.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              <strong className="text-foreground">A2S changes that.</strong> We aggregate 28,000+ products across
              major platforms like Amazon, Pepperfry, Urban Ladder, IKEA, and Flipkart. Our AI understands your
              style, budget, and space — then curates the perfect product shortlist in seconds. No design fees.
              No middlemen. Just honest discovery.
            </p>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* What we're building */}
          <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              What We're Building
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-display text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">Room-Specific Catalogs</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Browse products organized by room type, not random categories. Living room, bedroom, kitchen,
                    home office — each with curated selections.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-display text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">Cross-Platform Price Intelligence</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    See the same product listed across Amazon, Pepperfry, Urban Ladder, and more. Compare prices
                    instantly and always get the best deal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-display text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">AI Design Assistant</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Describe your dream room in plain language. Our AI curates a complete product list matching
                    your style, budget, and space requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Join the Journey
            </h2>
            <p className="font-body text-muted-foreground mb-6 max-w-lg mx-auto">
              We're launching on March 29, 2026. Join the waitlist to get early access and help shape
              the future of home design in India.
            </p>
            <Link
              to="/#waitlist"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-base hover:bg-teal-light transition-all duration-300 bg-glow-teal"
            >
              Join the Waitlist
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Contact */}
          <div className="mt-16 text-center">
            <p className="font-body text-sm text-muted-foreground">
              Have questions? Reach out at{' '}
              <a href="mailto:aestheticstospaces2@gmail.com" className="text-primary hover:underline">
                aestheticstospaces2@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

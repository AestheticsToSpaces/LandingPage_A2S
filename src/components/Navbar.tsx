import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

const navItems = [
  { label: 'Product', href: '#product' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Demo', href: '#demo' },
  { label: 'Market', href: '#market' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3 shadow-sm' : 'py-5'
        }`}
    >
      <div className="container mx-auto flex items-center justify-between pl-2 pr-6">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="A2S Logo" className="h-10 w-10 rounded-lg object-cover" />
          <span className="font-display text-xl font-bold text-foreground">
            Aesthetics To Spaces
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#waitlist"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-display text-sm font-medium hover:bg-teal-light transition-colors duration-300 bg-glow-teal"
          >
            Join Waitlist
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 font-body text-sm"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground text-center font-display text-sm font-medium"
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

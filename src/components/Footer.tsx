import logo from '@/assets/logo.jpeg';
import { Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const social = [
  { icon: Twitter, href: 'https://x.com/A2S_India', label: 'Twitter/X' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/aesthetics-to-spaces/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/aestheticstospaces?igsh=MWsyanlkcjdkYjBlcA==', label: 'Instagram' },
];

type FooterLink = { label: string; href: string; isRoute?: boolean };

const links: Record<string, FooterLink[]> = {
  Product: [
    { label: 'Features', href: '#product' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Demo', href: '#demo' },
    { label: 'Market', href: '#market' },
    { label: 'FAQ', href: '#faq' },
  ],
  Company: [
    { label: 'About A2S', href: '/about', isRoute: true },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy', isRoute: true },
    { label: 'Terms of Service', href: '/terms', isRoute: true },
    { label: 'Cookie Policy', href: '/cookies', isRoute: true },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Aesthetics To Spaces Logo" className="h-10 w-10 rounded-lg object-cover" />
              <span className="font-display text-base font-bold text-foreground">Aesthetics To Spaces</span>
            </a>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs">
              India's AI-powered home design infrastructure. Discover, compare, and design your perfect space.
            </p>
            <a href="mailto:hello@mail.aestheticstospaces.tech"
              className="inline-flex items-center gap-2 font-body text-sm text-primary hover:text-primary/80 transition-colors">
              <Mail size={14} />
              hello@mail.aestheticstospaces.tech
            </a>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {social.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-accent transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-3">
                {items.map(({ label, href, isRoute }) => (
                  <li key={label}>
                    {isRoute ? (
                      <Link to={href}
                        className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                        {label}
                      </Link>
                    ) : (
                      <a href={href}
                        className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 Aesthetics To Spaces. India's Design Execution Infrastructure. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <span className="font-body text-xs text-muted-foreground">Made with ♥ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import logo from '@/assets/logo.jpeg';

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="A2S Logo" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-display text-sm font-semibold text-foreground">
              A2S — Aesthetics To Spaces
            </span>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            © 2026 A2S. India's Design Execution Infrastructure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

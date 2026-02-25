import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';

export default function Cookies() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Cookie size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Cookie Policy
              </h1>
              <p className="font-body text-sm text-muted-foreground">
                Last updated: February 2026
              </p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <div className="glass-card rounded-2xl p-8 space-y-8">
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  What Are Cookies?
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Cookies are small text files stored on your device when you visit a website.
                  They help websites remember your preferences and improve your browsing experience.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  How We Use Cookies
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  Aesthetics To Spaces uses cookies for:
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-accent/50">
                    <h3 className="font-display text-base font-semibold text-foreground mb-2">
                      Essential Cookies
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      Required for the website to function. These cannot be disabled.
                      They handle things like session management and security.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/50">
                    <h3 className="font-display text-base font-semibold text-foreground mb-2">
                      Functional Cookies
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      Remember your preferences like language, region, and display settings.
                      Also used to store your referral code if you came via a referral link.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-accent/50">
                    <h3 className="font-display text-base font-semibold text-foreground mb-2">
                      Analytics Cookies
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      Help us understand how visitors interact with our website. We may use
                      privacy-focused analytics to improve our platform. Data is anonymized
                      and not linked to your personal information.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Third-Party Cookies
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  When you click through to third-party retailer websites (Amazon, Pepperfry, etc.),
                  those sites may set their own cookies. We have no control over third-party cookies.
                  Please review the cookie policies of each retailer you visit.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Managing Cookies
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  You can control cookies through your browser settings:
                </p>
                <ul className="font-body text-muted-foreground space-y-2 list-disc list-inside">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                  <li><strong>Edge:</strong> Settings → Privacy & Security → Cookies</li>
                </ul>
                <p className="font-body text-muted-foreground leading-relaxed mt-4">
                  Note: Disabling cookies may affect the functionality of our website.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Local Storage
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  In addition to cookies, we may use browser local storage to save your preferences
                  and form progress. This data stays on your device and is not transmitted to our servers
                  unless you explicitly submit a form.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Updates to This Policy
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We may update this Cookie Policy periodically. Any changes will be posted on this page
                  with an updated revision date.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  For questions about our use of cookies, contact us at:{' '}
                  <a href="mailto:aestheticstospaces2@gmail.com" className="text-primary hover:underline">
                    aestheticstospaces2@gmail.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export default function Terms() {
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
              <FileText size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Terms of Service
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
                  1. Acceptance of Terms
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  By accessing or using Aesthetics To Spaces ("A2S", "we", "our", or "the platform"),
                  you agree to be bound by these Terms of Service. If you do not agree to these terms,
                  please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  2. Description of Service
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  Aesthetics To Spaces is an AI-powered home design discovery platform that provides:
                </p>
                <ul className="font-body text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Room-specific furniture and decor catalogs</li>
                  <li>Cross-platform price comparison and intelligence</li>
                  <li>AI-powered design recommendations</li>
                  <li>Product discovery from multiple retailers</li>
                </ul>
                <p className="font-body text-muted-foreground leading-relaxed mt-4">
                  <strong>Important:</strong> A2S is a discovery and comparison platform. We do not sell
                  furniture directly. All purchases are made through third-party retailers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  3. Waitlist & Early Access
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  By joining our waitlist, you understand that:
                </p>
                <ul className="font-body text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Your position in the queue is determined by signup time and referral activity</li>
                  <li>Referral bonuses (2 spots per referral) are applied automatically</li>
                  <li>Early access is not guaranteed and depends on launch capacity</li>
                  <li>We may contact you via email for launch updates and beta testing opportunities</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  4. User Responsibilities
                </h2>
                <ul className="font-body text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Provide accurate and complete information when signing up</li>
                  <li>Not use the platform for any unlawful purpose</li>
                  <li>Not attempt to manipulate waitlist positions through fraudulent means</li>
                  <li>Not scrape, copy, or redistribute our content without permission</li>
                  <li>Respect intellectual property rights of A2S and third-party retailers</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  5. Intellectual Property
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  All content on A2S, including but not limited to text, graphics, logos, icons,
                  images, and software, is the property of Aesthetics To Spaces or its content suppliers
                  and is protected by Indian and international copyright laws. Product images and
                  information belong to their respective retailers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  6. Third-Party Links & Purchases
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  A2S contains links to third-party retailer websites (Amazon, Pepperfry, Urban Ladder,
                  IKEA, Flipkart, etc.). We are not responsible for the content, privacy practices,
                  or transactions on these external sites. All purchases, returns, warranties, and
                  customer service are handled directly by the respective retailers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  7. Disclaimer of Warranties
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  A2S is provided "as is" without warranties of any kind. We do not guarantee the
                  accuracy of pricing information (which may change in real-time), product availability,
                  or the quality of products sold by third-party retailers. AI recommendations are
                  suggestions only and may not suit all preferences or spaces.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, A2S shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages arising from your use of
                  the platform or purchases made through third-party retailers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  9. Changes to Terms
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be posted on
                  this page with an updated revision date. Continued use of the platform after changes
                  constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  10. Governing Law
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  These terms are governed by and construed in accordance with the laws of India.
                  Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  11. Contact
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  For questions about these terms, contact us at:{' '}
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

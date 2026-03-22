import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Privacy() {
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
              <Shield size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Privacy Policy
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
                  1. Information We Collect
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  When you join our waitlist or use Aesthetics To Spaces, we collect:
                </p>
                <ul className="font-body text-muted-foreground space-y-2 list-disc list-inside">
                  <li><strong>Contact Information:</strong> Name, email address, phone number (optional), city, and country</li>
                  <li><strong>Preference Data:</strong> Home type, budget range, design preferences, and room interests</li>
                  <li><strong>Usage Data:</strong> How you interact with our platform, referral activity</li>
                  <li><strong>Device Information:</strong> Browser type, IP address (for country detection)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  2. How We Use Your Information
                </h2>
                <ul className="font-body text-muted-foreground space-y-2 list-disc list-inside">
                  <li>To manage your waitlist position and notify you about launch updates</li>
                  <li>To personalize your experience and product recommendations</li>
                  <li>To process referrals and track queue positions</li>
                  <li>To improve our platform based on aggregated, anonymized usage patterns</li>
                  <li>To communicate important updates about A2S</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  3. Data Storage & Security
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Your data is securely stored in Microsoft Azure Cosmos DB with enterprise-grade encryption.
                  We implement industry-standard security measures including HTTPS encryption, secure API endpoints,
                  and access controls. We do not store payment information as we do not process transactions directly.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  4. Data Sharing
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  <strong>We do not sell your personal data.</strong> We may share data only in these limited cases:
                </p>
                <ul className="font-body text-muted-foreground space-y-2 list-disc list-inside">
                  <li><strong>Service Providers:</strong> Cloud hosting (Microsoft Azure) for data storage</li>
                  <li><strong>Legal Requirements:</strong> If required by law or to protect our rights</li>
                  <li><strong>Business Transfer:</strong> In case of merger or acquisition (with prior notice)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  5. Your Rights
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="font-body text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Export your data in a portable format</li>
                </ul>
                <p className="font-body text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, email us at{' '}
                  <a href="mailto:aestheticstospaces2@gmail.com" className="text-primary hover:underline">
                    aestheticstospaces2@gmail.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  6. Data Retention
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We retain your waitlist data until you request deletion or until 2 years after our platform
                  launch, whichever comes first. Active user data is retained as long as you maintain an account.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  7. Contact Us
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  For privacy-related questions or concerns, contact us at:{' '}
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

import { Link } from 'react-router-dom'

const LAST_UPDATED = 'April 9, 2026'

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-12">
      <div className="max-w-3xl mx-auto">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
        >
          ← Back to app
        </Link>

        <div className="card p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Last updated: {LAST_UPDATED}</p>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Please read these Terms of Service ("Terms") carefully before using Frontend Dev Roadmap.
            By accessing or using our service, you agree to be bound by these Terms.
          </p>

          <Section title="1. Acceptance of Terms">
            <p>
              By creating an account or using the Frontend Dev Roadmap platform, you agree to these
              Terms and our{' '}
              <Link to="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Privacy Policy
              </Link>
              . If you do not agree, please do not use our service.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              Frontend Dev Roadmap is an interactive study platform that helps frontend developers
              track their learning progress across topics from Junior to Staff level. The service
              includes progress tracking, bookmarks, a daily planner, interview prep tools, and a
              public profile feature.
            </p>
          </Section>

          <Section title="3. Account Registration">
            <ul className="list-disc pl-5 space-y-1">
              <li>You must provide a valid email address to create an account.</li>
              <li>You are responsible for maintaining the confidentiality of your password.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
              <li>One person may not maintain more than one active account.</li>
            </ul>
          </Section>

          <Section title="4. Acceptable Use">
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Use the service for any unlawful purpose.</li>
              <li>Attempt to gain unauthorized access to any part of the service.</li>
              <li>Interfere with or disrupt the service or servers.</li>
              <li>Upload or transmit malicious code.</li>
              <li>Scrape, crawl, or use automated tools to access the service without permission.</li>
              <li>Impersonate another person or entity.</li>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              All content on Frontend Dev Roadmap — including text, graphics, logos, and software —
              is owned by us or our content suppliers and is protected by applicable intellectual
              property laws. You may not reproduce, distribute, or create derivative works without
              our express written permission.
            </p>
            <p className="mt-2">
              Your personal progress data (notes, bookmarks, completion status) remains yours. You
              grant us a license to store and display it solely to provide the service.
            </p>
          </Section>

          <Section title="6. User-Generated Content">
            <p>
              If you use features that allow you to submit content (e.g., public profiles), you
              grant us a non-exclusive, worldwide, royalty-free license to display that content as
              part of the service. You are solely responsible for the content you submit and must
              ensure it does not violate any third-party rights or applicable laws.
            </p>
          </Section>

          <Section title="7. Subscription & Payments">
            <p>
              Some features of the service may require a paid subscription. Pricing and terms for
              paid plans will be clearly stated at the time of purchase. All fees are non-refundable
              unless otherwise stated or required by law.
            </p>
            <p className="mt-2">
              We reserve the right to change pricing with 30 days notice to active subscribers.
            </p>
          </Section>

          <Section title="8. Termination">
            <p>
              We reserve the right to suspend or terminate your account at our sole discretion if you
              violate these Terms, without notice or liability. You may delete your account at any time
              by contacting us at{' '}
              <a href="mailto:frontendroadmapdev@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                frontendroadmapdev@gmail.com
              </a>.
            </p>
          </Section>

          <Section title="9. Disclaimers">
            <p>
              The service is provided "as is" without warranties of any kind, express or implied.
              We do not warrant that the service will be uninterrupted, error-free, or that any
              defects will be corrected. The educational content is for informational purposes only
              and does not guarantee employment or any specific outcome.
            </p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect,
              incidental, special, or consequential damages arising from your use of the service,
              even if we have been advised of the possibility of such damages. Our total liability
              shall not exceed the amount you paid us in the 12 months preceding the claim.
            </p>
          </Section>

          <Section title="11. Governing Law">
            <p>
              These Terms are governed by applicable law. Any disputes shall be resolved through
              binding arbitration or in the courts of the jurisdiction where we are established,
              and you consent to exclusive jurisdiction therein.
            </p>
          </Section>

          <Section title="12. Changes to Terms">
            <p>
              We may update these Terms at any time. We will post the updated Terms with a new date.
              Continued use of the service after changes take effect constitutes acceptance of the
              new Terms. For material changes, we will notify you by email.
            </p>
          </Section>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
            Questions? Contact us at{' '}
            <a href="mailto:frontendroadmapdev@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              frontendroadmapdev@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{title}</h2>
      <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

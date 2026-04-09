import { Link } from 'react-router-dom'

const LAST_UPDATED = 'April 9, 2026'

export function PrivacyPolicy() {
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
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Last updated: {LAST_UPDATED}</p>
          </div>

          <Section title="1. Who We Are">
            <p>
              Frontend Dev Roadmap ("we", "our", or "us") is a study platform that helps frontend
              developers track their learning journey from Junior to Staff level. Our website is
              accessible at this domain.
            </p>
            <p className="mt-2">
              For any privacy-related questions, contact us at{' '}
              <a href="mailto:frontendroadmapdev@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                frontendroadmapdev@gmail.com
              </a>
            </p>
          </Section>

          <Section title="2. What Data We Collect">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account data:</strong> email address and display name when you register.</li>
              <li><strong>Progress data:</strong> your topic completion status, notes, bookmarks, and planner entries.</li>
              <li><strong>Usage data:</strong> pages visited, features used, and session duration (via analytics — see Section 5).</li>
              <li><strong>Technical data:</strong> IP address, browser type, and device type collected automatically by our hosting provider.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Data">
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and sync your learning progress across devices.</li>
              <li>To send transactional emails (account confirmation, password reset).</li>
              <li>To improve the platform based on aggregate usage patterns.</li>
              <li>To communicate important service updates.</li>
            </ul>
            <p className="mt-2">We do <strong>not</strong> sell your personal data to third parties.</p>
          </Section>

          <Section title="4. Data Storage & Security">
            <p>
              Your data is stored securely using{' '}
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Supabase
              </a>
              , which provides encrypted storage and row-level security. Passwords are hashed and
              never stored in plain text. We use HTTPS for all data in transit.
            </p>
          </Section>

          <Section title="5. Cookies & Analytics">
            <p>
              We use cookies and similar technologies for the following purposes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Strictly necessary:</strong> session management and authentication (cannot be disabled).</li>
              <li><strong>Analytics:</strong> Google Analytics 4 to understand how users interact with the platform. This collects anonymized usage data. You can opt out via our cookie consent banner or by using the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </li>
              <li><strong>Preferences:</strong> dark/light mode preference stored in your browser's local storage.</li>
            </ul>
          </Section>

          <Section title="6. Your Rights (GDPR / CCPA)">
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Object to or restrict processing of your data.</li>
              <li>Export your data in a portable format.</li>
              <li>Withdraw consent at any time (where processing is based on consent).</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:frontendroadmapdev@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                frontendroadmapdev@gmail.com
              </a>. We will respond within 30 days.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your account data for as long as your account is active. If you delete your
              account, we will delete your personal data within 30 days, except where we are required
              to retain it by law.
            </p>
          </Section>

          <Section title="8. Third-Party Services">
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Supabase</strong> — database, authentication, and storage.</li>
              <li><strong>Google Analytics 4</strong> — usage analytics (only if you consent).</li>
              <li><strong>Google Fonts</strong> — font delivery (may log your IP).</li>
            </ul>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              Our service is not directed to children under 13. We do not knowingly collect personal
              data from children. If you believe we have collected data from a child, please contact us
              immediately.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this policy from time to time. We will notify you of significant changes
              by posting the new policy on this page with an updated date. Continued use of the service
              after changes constitutes acceptance.
            </p>
          </Section>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
            Questions? Email us at{' '}
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

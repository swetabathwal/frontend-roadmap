import { useState } from 'react'
import { Link } from 'react-router-dom'

export function ContactPage() {
  const [copied, setCopied] = useState(false)
  const SUPPORT_EMAIL = 'frontendroadmapdev@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(SUPPORT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-8"
        >
          ← Back to app
        </Link>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Contact & Support</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              We're here to help. Reach out for support, feedback, or to report a bug.
            </p>
          </div>

          {/* Support Email */}
          <div className="card p-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Support Email</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              For account issues, billing questions, or general help — email us directly.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="btn-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Send Email
              </a>
              <button
                onClick={copyEmail}
                className="btn-secondary text-sm"
              >
                {copied ? 'Copied!' : 'Copy address'}
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
              {SUPPORT_EMAIL} — we aim to respond within 48 hours
            </p>
          </div>

          {/* Bug Report */}
          <div className="card p-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Report a Bug</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Found something broken? Please include:
            </p>
            <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1 mb-4">
              <li>What you were trying to do</li>
              <li>What happened instead</li>
              <li>Your browser and device (e.g. Chrome on Windows)</li>
              <li>A screenshot if possible</li>
            </ul>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Bug Report&body=What I was doing:%0D%0A%0D%0AWhat happened:%0D%0A%0D%0ABrowser/device:%0D%0A`}
              className="btn-secondary inline-flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/>
              </svg>
              Report a Bug via Email
            </a>
          </div>

          {/* Feature Request */}
          <div className="card p-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Feature Request</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Have an idea to make the platform better? We'd love to hear it.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Feature Request&body=Feature idea:%0D%0A%0D%0AWhy it would be useful:`}
              className="btn-secondary inline-flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              Suggest a Feature
            </a>
          </div>

          <p className="text-xs text-center text-slate-400 dark:text-slate-500">
            By contacting us you agree to our{' '}
            <Link to="/privacy" className="hover:underline text-indigo-500">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

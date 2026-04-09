import { useState, useEffect } from 'react'

const STORAGE_KEY = 'cookie_consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
    // Enable GA4 tracking
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
    // Keep GA4 denied
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      })
    }
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-2xl mx-auto bg-slate-800 dark:bg-slate-700 text-white rounded-xl shadow-2xl border border-slate-600 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold mb-0.5">We use cookies</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            We use essential cookies for authentication and optional analytics cookies to improve the
            platform. See our{' '}
            <a href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </a>{' '}
            for details.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-500 text-slate-300 hover:bg-slate-600 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}

/** Returns the current consent status: 'accepted' | 'declined' | null */
export function getCookieConsent() {
  return localStorage.getItem(STORAGE_KEY)
}

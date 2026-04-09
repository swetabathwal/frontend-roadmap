import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export function ForgotPasswordPage({ onBack }) {
  const { resetPassword } = useAuth()
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <span className="text-5xl" aria-hidden="true">📬</span>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">Check your email</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            We sent a password reset link to <strong>{email}</strong>.
            Click the link in the email to set a new password.
          </p>
          <button
            onClick={onBack}
            className="mt-6 btn-primary mx-auto justify-center"
          >
            Back to Sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <span className="text-5xl" aria-hidden="true">📚</span>
          <h1 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">
            Frontend Dev Roadmap
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Reset your password
          </p>
        </div>

        <div className="card p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Forgot password?</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Enter your email and we'll send you a reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send reset link'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            <button
              onClick={onBack}
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              ← Back to Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

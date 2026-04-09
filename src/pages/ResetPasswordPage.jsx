import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export function ResetPasswordPage() {
  const { updatePassword } = useAuth()
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [done, setDone]           = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 6)  { setError('Password must be at least 6 characters.'); return }
    setError('')
    setLoading(true)
    try {
      await updatePassword(password)
      setDone(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <span className="text-5xl" aria-hidden="true">✅</span>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">
            Password updated
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Your password has been changed successfully. You're now signed in.
          </p>
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
            Set a new password
          </p>
        </div>

        <div className="card p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Choose a new password</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                New password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="input"
                placeholder="Min. 6 characters"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Confirm new password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="input"
                placeholder="••••••••"
                autoComplete="new-password"
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
              {loading ? 'Updating…' : 'Update password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

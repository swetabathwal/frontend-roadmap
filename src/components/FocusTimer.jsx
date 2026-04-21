import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

/**
 * FocusTimer — a floating Pomodoro-style timer that helps the user
 * stay focused while studying. It runs a 25-min Focus session,
 * then a 5-min Break, then repeats. Opening the timer also toggles
 * `body.focus-mode` so non-study chrome is visually dimmed.
 *
 * Controlled by the parent (App) via `open` / `onClose`.
 */

const FOCUS_MIN = 25
const BREAK_MIN = 5

function format(total) {
  const m = Math.floor(total / 60).toString().padStart(2, '0')
  const s = (total % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export function FocusTimer({ open, onClose }) {
  const [mode, setMode]       = useState('focus')  // 'focus' | 'break'
  const [remaining, setRem]   = useState(FOCUS_MIN * 60)
  const [running, setRunning] = useState(false)
  const [sessions, setSess]   = useState(0)
  const tickRef   = useRef(null)
  const endRef    = useRef(null)

  const total   = (mode === 'focus' ? FOCUS_MIN : BREAK_MIN) * 60
  const pct     = Math.round(((total - remaining) / total) * 100)
  const ringLen = 2 * Math.PI * 44

  // Toggle body.focus-mode whenever the widget is open & running
  useEffect(() => {
    const on = open && running && mode === 'focus'
    document.body.classList.toggle('focus-mode', on)
    return () => document.body.classList.remove('focus-mode')
  }, [open, running, mode])

  // Keep latest session-end handler in a ref so the interval can call it
  // without being recreated every render.
  endRef.current = () => {
    if (mode === 'focus') {
      setSess((n) => n + 1)
      toast.success('Focus session complete! Take a 5-minute break.', { duration: 4000 })
      setMode('break')
      setRem(BREAK_MIN * 60)
    } else {
      toast.info('Break over — ready for another focus session?', { duration: 4000 })
      setMode('focus')
      setRem(FOCUS_MIN * 60)
    }
    setRunning(false)
  }

  // Countdown tick
  useEffect(() => {
    if (!running) return
    tickRef.current = setInterval(() => {
      setRem((r) => {
        if (r <= 1) {
          clearInterval(tickRef.current)
          endRef.current?.()
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(tickRef.current)
  }, [running])

  function toggleRun() { setRunning((r) => !r) }
  function reset() {
    setRunning(false)
    setRem((mode === 'focus' ? FOCUS_MIN : BREAK_MIN) * 60)
  }
  function switchMode(next) {
    setRunning(false)
    setMode(next)
    setRem((next === 'focus' ? FOCUS_MIN : BREAK_MIN) * 60)
  }

  if (!open) return null

  const accent = mode === 'focus' ? '#6366F1' : '#10B981'
  const label  = mode === 'focus' ? 'Focus' : 'Break'

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-72 card p-4 shadow-2xl animate-fade-in-up border-2"
      style={{ borderColor: `${accent}55` }}
      role="dialog"
      aria-label="Focus timer"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-700/60">
          <button
            onClick={() => switchMode('focus')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              mode === 'focus'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Focus
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              mode === 'break'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Break
          </button>
        </div>
        <button
          onClick={onClose}
          aria-label="Close focus timer"
          className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-lg leading-none px-1"
        >
          ×
        </button>
      </div>

      {/* Circular progress */}
      <div className="flex items-center justify-center my-2">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" fill="none"
              className="text-slate-200 dark:text-slate-700" />
            <circle
              cx="50" cy="50" r="44" stroke={accent} strokeWidth="6" fill="none" strokeLinecap="round"
              strokeDasharray={ringLen}
              strokeDashoffset={ringLen - (ringLen * pct) / 100}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold tabular-nums text-slate-900 dark:text-white">
              {format(remaining)}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: accent }}>
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={toggleRun}
          className="flex-1 px-3 py-2 rounded-lg text-white text-sm font-semibold transition-transform active:scale-95 ripple"
          style={{ background: accent }}
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="px-3 py-2 rounded-lg text-sm font-semibold btn-secondary"
          title="Reset timer"
        >
          Reset
        </button>
      </div>

      <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-3">
        Sessions today: <span className="font-bold text-slate-700 dark:text-slate-200">{sessions}</span>
        {running && mode === 'focus' && <> · distractions dimmed</>}
      </p>
    </div>
  )
}

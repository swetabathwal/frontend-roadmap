import { useState, useMemo, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'

// ─── constants ────────────────────────────────────────────────────────────────

const PRIORITIES = [
  { value: 'high',   label: 'High',   dot: 'bg-rose-500',    color: 'text-rose-500',    bg: 'bg-rose-100 dark:bg-rose-900/30',    border: 'border-rose-200 dark:border-rose-800'    },
  { value: 'medium', label: 'Med',    dot: 'bg-amber-400',   color: 'text-amber-500',   bg: 'bg-amber-100 dark:bg-amber-900/30',  border: 'border-amber-200 dark:border-amber-800'  },
  { value: 'low',    label: 'Low',    dot: 'bg-emerald-500', color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30', border: 'border-emerald-200 dark:border-emerald-800' },
]

const CATEGORIES = [
  { value: 'study',    label: 'Study',    emoji: '📚' },
  { value: 'practice', label: 'Practice', emoji: '💻' },
  { value: 'project',  label: 'Project',  emoji: '🚀' },
  { value: 'review',   label: 'Review',   emoji: '🔄' },
  { value: 'other',    label: 'Other',    emoji: '📌' },
]

const TIME_OPTIONS = [
  { value: null, label: '—'    },
  { value: 15,   label: '15m'  },
  { value: 30,   label: '30m'  },
  { value: 60,   label: '1h'   },
  { value: 90,   label: '1.5h' },
  { value: 120,  label: '2h'   },
]

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

// ─── helpers ──────────────────────────────────────────────────────────────────

// Use local date so tasks added at night don't land on yesterday (UTC issue)
function localDateStr(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function todayStr() { return localDateStr() }

function getWeekDays() {
  const now = new Date()
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return localDateStr(d)
  })
}

function calcStreak(tasks) {
  const completedDays = new Set(tasks.filter((t) => t.done).map((t) => t.date))
  const cur = new Date()
  if (!completedDays.has(localDateStr(cur))) cur.setDate(cur.getDate() - 1)
  let streak = 0
  while (completedDays.has(localDateStr(cur))) {
    streak++
    cur.setDate(cur.getDate() - 1)
  }
  return streak
}

function getPriority(task)  { return task.priority ?? 'medium' }
function getCategory(task)  { return task.category ?? 'study'  }
function getPriorityMeta(p) { return PRIORITIES.find((x) => x.value === p) ?? PRIORITIES[1] }
function getCategoryMeta(c) { return CATEGORIES.find((x) => x.value === c) ?? CATEGORIES[0] }

function formatTime(minutes) {
  if (!minutes) return null
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (!h) return `${m}m`
  return m ? `${h}h ${m}m` : `${h}h`
}

function sortByPriority(list) {
  return [...list].sort((a, b) => (PRIORITY_ORDER[getPriority(a)] ?? 1) - (PRIORITY_ORDER[getPriority(b)] ?? 1))
}

// ─── AddTaskModal ─────────────────────────────────────────────────────────────

function AddTaskModal({ open, onClose, onAdd }) {
  const [text,             setText]             = useState('')
  const [priority,         setPriority]         = useState('medium')
  const [category,         setCategory]         = useState('study')
  const [estimatedMinutes, setEstimatedMinutes] = useState(null)
  const [date,             setDate]             = useState(todayStr())
  const inputRef = useRef(null)

  // Focus input when modal opens; reset fields on close
  useEffect(() => {
    if (open) {
      setText('')
      setPriority('medium')
      setCategory('study')
      setEstimatedMinutes(null)
      setDate(todayStr())
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd({ text: text.trim(), priority, category, estimatedMinutes, date })
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-label="Add new task"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-md mx-4 mb-0 sm:mb-0 bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 animate-fade-in-up">
        {/* Handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 sm:pt-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">New Task</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-4">
          {/* Task text */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
              Task
            </label>
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Study React hooks for 1 hour"
              className="input"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
              Priority
            </label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    priority === p.value
                      ? `${p.bg} ${p.color} ${p.border} shadow-sm`
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${p.dot}`} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  className={`flex items-center gap-1 text-xs font-medium py-1.5 px-3 rounded-xl border transition-all ${
                    category === c.value
                      ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time estimate + Date (side by side) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
                Est. Time
              </label>
              <div className="flex flex-wrap gap-1.5">
                {TIME_OPTIONS.map((t) => (
                  <button
                    key={String(t.value)}
                    type="button"
                    onClick={() => setEstimatedMinutes(t.value)}
                    className={`text-xs py-1 px-2 rounded-lg border transition-all ${
                      estimatedMinutes === t.value
                        ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input text-xs"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1 justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon name="plus" size={15} />
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── PlannerTask ──────────────────────────────────────────────────────────────

function PlannerTask({ task, onToggle, onRemove }) {
  const pm      = getPriorityMeta(getPriority(task))
  const cm      = getCategoryMeta(getCategory(task))
  const timeStr = formatTime(task.estimatedMinutes)

  return (
    <div className="card px-4 py-3 flex items-start gap-3 group hover:shadow-md transition-shadow">
      <button
        onClick={() => onToggle(task.id)}
        role="checkbox"
        aria-checked={task.done}
        aria-label={`Mark "${task.text}" as ${task.done ? 'incomplete' : 'done'}`}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
          task.done
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
        }`}
      >
        {task.done && <Icon name="check" size={12} className="text-white animate-check-pop" />}
      </button>

      <div className="flex-1 min-w-0">
        <span className={`text-sm block leading-snug ${
          task.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'
        }`}>
          {task.text}
        </span>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-md border ${pm.bg} ${pm.color} ${pm.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${pm.dot}`} />
            {pm.label}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">{cm.emoji} {cm.label}</span>
          {timeStr && <span className="text-xs text-slate-400 dark:text-slate-500">⏱ {timeStr}</span>}
        </div>
      </div>

      <button
        onClick={() => onRemove(task.id)}
        className="text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-md transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0 mt-0.5"
        aria-label={`Delete task: ${task.text}`}
      >
        <Icon name="trash" size={14} />
      </button>
    </div>
  )
}

// ─── StatsBar ─────────────────────────────────────────────────────────────────

function StatsBar({ tasks }) {
  const ts        = todayStr()
  const todayAll  = tasks.filter((t) => t.date === ts)
  const todayDone = todayAll.filter((t) => t.done).length
  const streak    = calcStreak(tasks)
  const weekDays  = getWeekDays()
  const weekAll   = tasks.filter((t) => weekDays.includes(t.date))
  const weekDone  = weekAll.filter((t) => t.done).length

  const stats = [
    {
      label: 'Today',
      value: `${todayDone}/${todayAll.length}`,
      sub: 'tasks done',
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      label: 'Streak',
      value: `${streak}d`,
      sub: streak > 1 ? 'days in a row' : streak === 1 ? '1 day' : 'start today!',
      color: streak > 0 ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500',
    },
    {
      label: 'This Week',
      value: weekAll.length > 0 ? `${Math.round((weekDone / weekAll.length) * 100)}%` : '—',
      sub: `${weekDone}/${weekAll.length} done`,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {stats.map(({ label, value, sub, color }) => (
        <div key={label} className="card p-3 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
          <p className={`text-xl font-extrabold ${color}`}>{value}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">{sub}</p>
        </div>
      ))}
    </div>
  )
}

// ─── TodayTab ─────────────────────────────────────────────────────────────────

function TodayTab({ tasks, onToggle, onRemove, onClearDone }) {
  const ts         = todayStr()
  const todayTasks = useMemo(() => sortByPriority(tasks.filter((t) => t.date === ts)), [tasks, ts])
  const pending    = todayTasks.filter((t) => !t.done)
  const done       = todayTasks.filter((t) => t.done)
  const pct        = todayTasks.length > 0 ? done.length / todayTasks.length : 0

  if (todayTasks.length === 0) {
    return (
      <div className="card p-12 text-center animate-fade-in">
        <div className="text-4xl mb-3">📋</div>
        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">No tasks for today yet.</p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Hit the + Add Task button to get started!</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Daily Progress</span>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {done.length}/{todayTasks.length} done
          </span>
        </div>
        <div className="progress-bar h-3">
          <div
            className={`progress-fill ${pct === 1 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
            style={{ width: `${pct * 100}%` }}
          />
        </div>
        {pct === 1 && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5 text-center animate-pop">
            All done — great work today! 🎉
          </p>
        )}
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="space-y-2 mb-5">
          {pending.map((t) => (
            <PlannerTask key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />
          ))}
        </div>
      )}

      {/* Done */}
      {done.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
              Completed ({done.length})
            </span>
            <button
              onClick={onClearDone}
              className="text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-2 opacity-70">
            {done.map((t) => (
              <PlannerTask key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── WeekCell ─────────────────────────────────────────────────────────────────

function WeekCell({ dateStr, tasks, isToday, isSelected, onClick }) {
  const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const date       = new Date(dateStr + 'T00:00:00')
  const dayIdx     = (date.getDay() + 6) % 7
  const done       = tasks.filter((t) => t.done).length
  const total      = tasks.length
  const completion = total > 0 ? done / total : 0

  return (
    <button
      onClick={onClick}
      className={`card p-2 sm:p-3 flex flex-col items-center gap-1 cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-indigo-500 shadow-md' : 'hover:shadow-md'
      } ${isToday ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800' : ''}`}
    >
      <span className={`text-xs font-semibold ${isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>
        {DAY_NAMES[dayIdx]}
      </span>
      <span className={`text-base sm:text-lg font-bold ${isToday ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>
        {date.getDate()}
      </span>
      {total > 0 ? (
        <div className="w-full">
          <div className="h-1 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${completion * 100}%` }} />
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 block text-center">{done}/{total}</span>
        </div>
      ) : (
        <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
      )}
    </button>
  )
}

// ─── WeekTab ──────────────────────────────────────────────────────────────────

function WeekTab({ tasks, onToggle, onRemove }) {
  const weekDays  = useMemo(() => getWeekDays(), [])
  const ts        = todayStr()
  const [selected, setSelected] = useState(ts)

  const tasksByDay = useMemo(() => {
    const map = {}
    for (const d of weekDays) map[d] = sortByPriority(tasks.filter((t) => t.date === d))
    return map
  }, [tasks, weekDays])

  const dayTasks = tasksByDay[selected] ?? []

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-7 gap-1.5 mb-5">
        {weekDays.map((d) => (
          <WeekCell
            key={d}
            dateStr={d}
            tasks={tasksByDay[d]}
            isToday={d === ts}
            isSelected={d === selected}
            onClick={() => setSelected(d)}
          />
        ))}
      </div>
      <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-3">
        {selected === ts
          ? 'Today'
          : new Date(selected + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        <span className="font-normal text-slate-400 dark:text-slate-500 ml-1">
          — {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''}
        </span>
      </h3>
      {dayTasks.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-slate-400 dark:text-slate-500 text-sm">No tasks for this day.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {dayTasks.map((t) => <PlannerTask key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />)}
        </div>
      )}
    </div>
  )
}

// ─── AllTab ───────────────────────────────────────────────────────────────────

function AllTab({ tasks, onToggle, onRemove }) {
  const ts      = todayStr()
  const grouped = useMemo(() => {
    const map = {}
    for (const t of tasks) {
      if (!map[t.date]) map[t.date] = []
      map[t.date].push(t)
    }
    return Object.entries(map)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, list]) => ({ date, tasks: sortByPriority(list) }))
  }, [tasks])

  if (grouped.length === 0) {
    return (
      <div className="card p-12 text-center animate-fade-in">
        <div className="text-4xl mb-3">🗂️</div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">No tasks yet. Start planning!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {grouped.map(({ date, tasks: list }) => {
        const done    = list.filter((t) => t.done).length
        const isToday = date === ts
        return (
          <section key={date}>
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-xs font-bold uppercase tracking-wide ${isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {isToday
                  ? 'Today'
                  : new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">{done}/{list.length}</span>
            </div>
            <div className="space-y-2">
              {list.map((t) => <PlannerTask key={t.id} task={t} onToggle={onToggle} onRemove={onRemove} />)}
            </div>
          </section>
        )
      })}
    </div>
  )
}

// ─── PlannerView ──────────────────────────────────────────────────────────────

const TABS = [
  { id: 'today', label: 'Today', icon: 'calendar' },
  { id: 'week',  label: 'Week',  icon: 'chart'    },
  { id: 'all',   label: 'All',   icon: 'list'     },
]

export function PlannerView() {
  const { state, update } = useApp()
  const [tab,       setTab]       = useState('today')
  const [showModal, setShowModal] = useState(false)
  const tasks = state.plannerTasks ?? []
  const ts    = todayStr()

  const addTask = ({ text, priority, category, estimatedMinutes, date }) =>
    update((s) => ({
      ...s,
      plannerTasks: [
        ...(s.plannerTasks ?? []),
        { id: Date.now(), text, done: false, date: date ?? ts, priority, category, estimatedMinutes },
      ],
    }))

  const toggleTask = (id) =>
    update((s) => ({
      ...s,
      plannerTasks: s.plannerTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    }))

  const removeTask = (id) =>
    update((s) => ({ ...s, plannerTasks: s.plannerTasks.filter((t) => t.id !== id) }))

  const clearDoneToday = () =>
    update((s) => ({
      ...s,
      plannerTasks: s.plannerTasks.filter((t) => !(t.date === ts && t.done)),
    }))

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">Daily Planner</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary ripple"
          aria-label="Add new task"
        >
          <Icon name="plus" size={16} />
          Add Task
        </button>
      </div>

      <StatsBar tasks={tasks} />

      {/* Tab bar */}
      <div className="flex gap-1 mb-5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
              tab === id
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Icon name={icon} size={14} />
            {label}
          </button>
        ))}
      </div>

      {tab === 'today' && <TodayTab tasks={tasks} onToggle={toggleTask} onRemove={removeTask} onClearDone={clearDoneToday} />}
      {tab === 'week'  && <WeekTab  tasks={tasks} onToggle={toggleTask} onRemove={removeTask} />}
      {tab === 'all'   && <AllTab   tasks={tasks} onToggle={toggleTask} onRemove={removeTask} />}

      <AddTaskModal open={showModal} onClose={() => setShowModal(false)} onAdd={addTask} />
    </div>
  )
}

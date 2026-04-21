import { useNavigate } from 'react-router-dom'
import { LEVELS } from '../data/levels'
import { CATEGORIES } from '../data/categories'
import { useAuth } from '../context/AuthContext'
import { ExportButton, ImportButton } from '../components/ExportImport'
import { ProgressBar } from '../components/ProgressBar'
import { DailyQuote } from '../components/DailyQuote'
import { useLevelStats, useGlobalStats, useCategoryStats } from '../hooks/useTopicStats'

function LevelCard({ level, index }) {
  const navigate = useNavigate()
  const { total, done, pct } = useLevelStats(level.id)

  return (
    <button
      onClick={() => navigate(`/level/${level.id}`)}
      className="card p-6 text-left hover-glow relative overflow-hidden group animate-fade-in-up"
      style={{ animationDelay: `${120 + index * 80}ms` }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl animate-gradient-x"
        style={{ backgroundImage: `linear-gradient(90deg, ${level.color}, ${level.color}80, ${level.color})` }}
      />
      {/* Ambient accent blob */}
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ background: level.color }}
      />
      <span className="text-4xl block mb-3 transition-transform group-hover:scale-110 group-hover:-rotate-3 duration-300">
        {level.icon}
      </span>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">{level.label}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{level.subtitle}</p>
      <p className="text-xs font-semibold mb-4" style={{ color: level.color }}>{level.desc}</p>
      <ProgressBar pct={pct} color={level.color} height="8px" />
      <div className="flex justify-between mt-2 text-sm">
        <span className="text-slate-500 dark:text-slate-400">{done}/{total} topics</span>
        <span className="font-bold tabular-nums" style={{ color: level.color }}>{pct}%</span>
      </div>
    </button>
  )
}

function CategoryOverview() {
  const navigate = useNavigate()
  const catStats = useCategoryStats()

  return (
    <section aria-label="Category overview" className="focus-dim">
      <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">Categories Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {CATEGORIES.map((cat, i) => {
          const stats   = catStats[cat.id] ?? { total: 0, done: 0, pct: 0 }
          const started = stats.done > 0
          const done    = stats.pct === 100
          return (
            <button
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="card p-3 text-left hover:border-indigo-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-in-up"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span
                  className={`text-base w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200 ${
                    done ? 'animate-pulse-soft' : ''
                  }`}
                  style={started ? { background: '#6366F120' } : undefined}
                >
                  {cat.icon}
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{cat.name}</span>
              </div>
              <ProgressBar pct={stats.pct} color={started ? '#6366F1' : '#94A3B8'} height="5px" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 tabular-nums">
                {stats.done}/{stats.total} &middot; {stats.pct}%
              </p>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function greeting() {
  const h = new Date().getHours()
  if (h < 5)  return 'Burning the midnight oil'
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  if (h < 21) return 'Good evening'
  return 'Good night'
}

export function Dashboard() {
  const { user } = useAuth()
  const { total, done, pct } = useGlobalStats()

  const progressColor = pct > 66 ? '#22C55E' : pct > 33 ? '#F59E0B' : '#6366F1'
  const message =
    pct === 0 ? 'Start your journey — check off your first topic!'
    : pct < 25 ? 'Great start! Keep the momentum going.'
    : pct < 50 ? "You're building strong foundations!"
    : pct < 75 ? "Over halfway — you're crushing it!"
    : pct < 100 ? "Almost there — the finish line is in sight!"
    : "You're fully prepared — go ace that interview!"

  const displayName =
    user?.user_metadata?.display_name?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    'Learner'

  return (
    <div className="space-y-8">
      {/* Hero with greeting + global progress */}
      <section
        className="card p-6 sm:p-8 relative overflow-hidden hero-gradient hero-mesh animate-fade-in"
        aria-label="Overall progress"
      >
        <div className="relative">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-300 animate-fade-in-down">
                {greeting()}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 animate-fade-in-up">
                Welcome back, {displayName}
                <span className="inline-block ml-1 animate-float" aria-hidden="true">👋</span>
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 animate-fade-in-up delay-75">
                {done} of {total} topics completed &middot; {message}
              </p>
            </div>
            <div className="flex gap-2 animate-fade-in delay-150">
              <ExportButton />
              <ImportButton />
            </div>
          </div>

          <div className="relative">
            <ProgressBar pct={pct} color={progressColor} height="14px" />
            <span
              className="absolute -top-6 text-2xl font-extrabold tabular-nums animate-pop"
              style={{ left: `calc(${Math.max(2, Math.min(pct, 98))}% - 18px)`, color: progressColor }}
            >
              {pct}%
            </span>
          </div>
        </div>
      </section>

      {/* Motivation */}
      <DailyQuote />

      {/* Level cards */}
      <section aria-label="Learning levels" className="focus-dim">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">Choose Your Level</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEVELS.map((lv, i) => <LevelCard key={lv.id} level={lv} index={i} />)}
        </div>
      </section>

      <CategoryOverview />
    </div>
  )
}

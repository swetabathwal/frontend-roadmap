import { useNavigate } from 'react-router-dom'
import { LEVELS } from '../data/levels'
import { CATEGORIES } from '../data/categories'
import { useApp } from '../context/AppContext'
import { ExportButton, ImportButton } from '../components/ExportImport'
import { ProgressBar } from '../components/ProgressBar'
import { useLevelStats, useGlobalStats, useCategoryStats } from '../hooks/useTopicStats'

function LevelCard({ level }) {
  const navigate = useNavigate()
  const { total, done, pct } = useLevelStats(level.id)

  return (
    <button
      onClick={() => navigate(`/level/${level.id}`)}
      className="card p-6 text-left hover:-translate-y-1 hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" style={{ background: level.color }} />
      <span className="text-4xl block mb-3">{level.icon}</span>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">{level.label}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{level.subtitle}</p>
      <p className="text-xs font-semibold mb-4" style={{ color: level.color }}>{level.desc}</p>
      <ProgressBar pct={pct} color={level.color} height="8px" />
      <div className="flex justify-between mt-2 text-sm">
        <span className="text-slate-500 dark:text-slate-400">{done}/{total} topics</span>
        <span className="font-bold" style={{ color: level.color }}>{pct}%</span>
      </div>
    </button>
  )
}

function CategoryOverview() {
  const navigate = useNavigate()
  const catStats = useCategoryStats()

  return (
    <section aria-label="Category overview">
      <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">Categories Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => {
          const stats = catStats[cat.id] ?? { total: 0, done: 0, pct: 0 }
          const started = stats.done > 0
          return (
            <button
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="card p-3 text-left hover:border-indigo-500 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span
                  className="text-base w-7 h-7 flex items-center justify-center rounded-lg transition-colors duration-200"
                  style={started ? { background: '#6366F120' } : undefined}
                >
                  {cat.icon}
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{cat.name}</span>
              </div>
              <ProgressBar pct={stats.pct} color={started ? '#6366F1' : '#94A3B8'} height="5px" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {stats.done}/{stats.total} · {stats.pct}%
              </p>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export function Dashboard() {
  const { total, done, pct } = useGlobalStats()

  const progressColor = pct > 66 ? '#22C55E' : pct > 33 ? '#F59E0B' : '#6366F1'
  const message =
    pct === 0 ? 'Start your journey — check off your first topic!'
    : pct < 25 ? 'Great start! Keep the momentum going.'
    : pct < 50 ? "You're building strong foundations!"
    : pct < 75 ? "Over halfway — you're crushing it!"
    : pct < 100 ? "Almost there — the finish line is in sight!"
    : "You're fully prepared — go ace that interview! 🎉"

  return (
    <div className="space-y-8">
      {/* Global progress */}
      <section className="card p-6" aria-label="Overall progress">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Your Progress</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {done} of {total} topics completed
            </p>
          </div>
          <div className="flex gap-2">
            <ExportButton />
            <ImportButton />
          </div>
        </div>
        <ProgressBar pct={pct} color={progressColor} height="14px" />
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
          <span className="text-xl font-extrabold" style={{ color: progressColor }}>{pct}%</span>
        </div>
      </section>

      {/* Level cards */}
      <section aria-label="Learning levels">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">Choose Your Level</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEVELS.map((lv) => <LevelCard key={lv.id} level={lv} />)}
        </div>
      </section>

      <CategoryOverview />
    </div>
  )
}

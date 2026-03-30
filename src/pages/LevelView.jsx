import { useMemo } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { LEVELS } from '../data/levels'
import { CATEGORIES } from '../data/categories'
import { TOPICS } from '../data/topics'
import { useApp } from '../context/AppContext'
import { CategorySection } from '../components/CategorySection'
import { ProgressBar } from '../components/ProgressBar'
import { Icon } from '../components/Icon'
import { useLevelStats } from '../hooks/useTopicStats'

export function LevelView() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const { state, update } = useApp()

  const level = LEVELS.find((l) => l.id === levelId)

  // Invalid levelId → back to dashboard
  if (!level) return <Navigate to="/" replace />

  const rawTopics = TOPICS[level.id] ?? []
  const { total, done, pct } = useLevelStats(level.id)

  const filtered = useMemo(() => {
    const q = state.searchQuery.toLowerCase()
    return rawTopics
      .map((cat) => ({
        ...cat,
        topics: cat.topics.filter((t) => {
          if (state.activeCategory !== 'all' && cat.cat !== state.activeCategory) return false
          if (q && !t.t.toLowerCase().includes(q) && !t.d.toLowerCase().includes(q)) return false
          return true
        }),
      }))
      .filter((c) => c.topics.length > 0)
  }, [rawTopics, state.activeCategory, state.searchQuery])

  const handleBack = () => {
    update({ searchQuery: '', activeCategory: 'all' })
    navigate('/')
  }

  return (
    <div>
      {/* Back */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 text-indigo-500 hover:text-indigo-600 font-semibold text-sm mb-5 transition-colors"
      >
        <Icon name="arrowLeft" size={16} />
        Back to Dashboard
      </button>

      {/* Level header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-5xl">{level.icon}</span>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{level.label} Developer</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{level.subtitle} · {level.desc}</p>
        </div>
      </div>

      {/* Level progress */}
      <div className="card p-4 mb-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-500 dark:text-slate-400">{done}/{total} completed</span>
          <span className="font-bold" style={{ color: level.color }}>{pct}%</span>
        </div>
        <ProgressBar pct={pct} color={level.color} height="10px" />
      </div>

      {/* Search + filter */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[180px]">
          <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search topics…"
            value={state.searchQuery}
            onChange={(e) => update({ searchQuery: e.target.value })}
            className="input pl-9"
            aria-label="Search topics"
          />
        </div>

        <select
          value={state.activeCategory}
          onChange={(e) => update({ activeCategory: e.target.value })}
          className="input w-auto cursor-pointer"
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
          ))}
        </select>
      </div>

      {/* Topics */}
      {filtered.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-16">
          No topics match your search. Try adjusting the filters.
        </p>
      ) : (
        filtered.map((cat) => (
          <CategorySection key={cat.cat} cat={cat} levelId={level.id} />
        ))
      )}
    </div>
  )
}

import { useMemo } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { LEVELS } from '../data/levels'
import { CATEGORIES } from '../data/categories'
import { TOPICS } from '../data/topics'
import { useApp } from '../context/AppContext'
import { TopicCard } from '../components/TopicCard'
import { ProgressBar } from '../components/ProgressBar'
import { Icon } from '../components/Icon'
import { useCategoryStats } from '../hooks/useTopicStats'

export function CategoryView() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { state, update } = useApp()
  const catStats = useCategoryStats()

  const category = CATEGORIES.find((c) => c.id === categoryId)
  if (!category) return <Navigate to="/" replace />

  const stats = catStats[categoryId] ?? { total: 0, done: 0, pct: 0 }

  const levelGroups = useMemo(() => {
    const q = state.searchQuery.toLowerCase()
    return LEVELS.flatMap((level) => {
      const catGroup = (TOPICS[level.id] ?? []).find((c) => c.cat === categoryId)
      if (!catGroup) return []
      const topics = q
        ? catGroup.topics.filter(
            (t) => t.t.toLowerCase().includes(q) || t.d.toLowerCase().includes(q),
          )
        : catGroup.topics
      return topics.length ? [{ level, topics }] : []
    })
  }, [categoryId, state.searchQuery])

  const handleBack = () => {
    update({ searchQuery: '' })
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

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-5xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{category.name}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">All levels · {stats.total} topics</p>
        </div>
      </div>

      {/* Progress */}
      <div className="card p-4 mb-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-500 dark:text-slate-400">{stats.done}/{stats.total} completed</span>
          <span className="font-bold text-indigo-500">{stats.pct}%</span>
        </div>
        <ProgressBar pct={stats.pct} color="#6366F1" height="10px" />
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search topics…"
          value={state.searchQuery}
          onChange={(e) => update({ searchQuery: e.target.value })}
          className="input pl-9 w-full"
          aria-label="Search topics"
        />
      </div>

      {/* Topics grouped by level */}
      {levelGroups.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-16">
          No topics match your search. Try adjusting the query.
        </p>
      ) : (
        <div className="space-y-6">
          {levelGroups.map(({ level, topics }) => (
            <section key={level.id} aria-label={`${level.label} topics`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{level.icon}</span>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">{level.label}</h2>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: level.color, background: `${level.color}20` }}
                >
                  {level.desc}
                </span>
              </div>
              <div>
                {topics.map((topic) => (
                  <TopicCard key={topic.slug} topic={topic} catId={categoryId} levelId={level.id} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

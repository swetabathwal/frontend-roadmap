import { useState } from 'react'
import { CATEGORIES } from '../data/categories'
import { useApp } from '../context/AppContext'
import { TopicCard } from './TopicCard'

/**
 * @param {{ cat: {cat:string, topics:any[]}, levelId: string }} props
 */
export function CategorySection({ cat, levelId }) {
  const { state } = useApp()
  const [collapsed, setCollapsed] = useState(false)
  const catInfo = CATEGORIES.find((c) => c.id === cat.cat) ?? { name: cat.cat, icon: '📁' }

  const done = cat.topics.filter((t) => state.checked[`${levelId}::${cat.cat}::${t.slug}`]).length

  return (
    <section className="mb-4" aria-labelledby={`cat-${cat.cat}`}>
      <button
        id={`cat-${cat.cat}`}
        onClick={() => setCollapsed((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 card rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
        aria-expanded={!collapsed}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">{catInfo.icon}</span>
          <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{catInfo.name}</span>
          <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-400 px-2 py-0.5 rounded-full">
            {done}/{cat.topics.length}
          </span>
        </div>
        <span
          className="text-slate-400 text-xs transition-transform duration-200"
          style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {!collapsed && (
        <div className="mt-1.5">
          {cat.topics.map((topic) => (
            <TopicCard key={topic.t} topic={topic} catId={cat.cat} levelId={levelId} />
          ))}
        </div>
      )}
    </section>
  )
}

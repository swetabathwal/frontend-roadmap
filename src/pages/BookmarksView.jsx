import { LEVELS } from '../data/levels'
import { CATEGORIES } from '../data/categories'
import { TOPICS } from '../data/topics'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'

export function BookmarksView() {
  const { state, update } = useApp()
  const bookmarked = Object.entries(state.bookmarks).filter(([, v]) => v)

  const toggleChecked = (key) =>
    update((s) => ({ ...s, checked: { ...s.checked, [key]: !s.checked[key] } }))

  const removeBookmark = (key) =>
    update((s) => ({ ...s, bookmarks: { ...s.bookmarks, [key]: false } }))

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">⭐ Bookmarked Topics</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
        {bookmarked.length} topic{bookmarked.length === 1 ? '' : 's'} saved
      </p>

      {bookmarked.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No bookmarks yet. Click the{' '}
            <Icon name="bookmark" size={14} className="inline text-slate-400" />{' '}
            icon on any topic to save it here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarked.map(([key]) => {
            const [lvId, catId, slug] = key.split('::')
            const lv        = LEVELS.find((l) => l.id === lvId)
            const catInfo   = CATEGORIES.find((c) => c.id === catId)
            const topicData = TOPICS[lvId]?.find((c) => c.cat === catId)?.topics.find((t) => t.slug === slug)
            const label     = topicData?.t ?? slug
            const isChecked = !!state.checked[key]

            return (
              <div key={key} className="card px-4 py-3 flex items-center gap-3">
                {/* Accessible checkbox — real <input> visually styled */}
                <label
                  className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
                  }`}
                  aria-label={`Mark "${label}" as ${isChecked ? 'incomplete' : 'complete'}`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleChecked(key)}
                    className="sr-only"
                  />
                  {isChecked && <Icon name="check" size={13} className="text-white" />}
                </label>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${isChecked ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                    {label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {lv?.icon} {lv?.label} · {catInfo?.icon} {catInfo?.name}
                  </p>
                  {topicData?.d && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{topicData.d}</p>
                  )}
                </div>

                {topicData?.r && (
                  <a
                    href={topicData.r}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 hover:text-indigo-600 p-1.5 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                    aria-label={`Open resource for ${label}`}
                  >
                    <Icon name="external" size={15} />
                  </a>
                )}

                <button
                  onClick={() => removeBookmark(key)}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-md transition-colors"
                  aria-label={`Remove bookmark for ${label}`}
                >
                  <Icon name="x" size={15} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

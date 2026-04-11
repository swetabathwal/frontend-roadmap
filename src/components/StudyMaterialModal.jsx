import { Icon } from './Icon'

/**
 * Study Material Modal — opens when user clicks a topic title.
 * Displays structured study content derived from the topic's data.
 *
 * Props:
 *   topic    - { slug, t, d, r }
 *   levelId  - string
 *   catId    - string
 *   onClose  - () => void
 *   onStartQuiz - () => void (optional shortcut to open quiz)
 */
export function StudyMaterialModal({ topic, levelId, catId, onClose, onStartQuiz }) {
  // Parse the topic description (comma/semicolon separated keywords) into bullets
  const concepts = topic.d
    ? topic.d
        .split(/[,;]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  // Build a short level label
  const levelLabel = {
    junior: 'Junior (0–1 yr)',
    mid: 'Mid-level (1–3 yr)',
    senior: 'Senior (3–6 yr)',
    staff: 'Staff / Principal (6+ yr)',
  }[levelId] ?? levelId

  const categoryLabel = catId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg card shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="note" size={18} className="text-indigo-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight">
                {topic.t}
              </h2>
              <div className="flex gap-2 mt-1 flex-wrap">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                  {levelLabel}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {categoryLabel}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 flex-shrink-0"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* What to learn */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
              What to learn
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {topic.d}
            </p>
          </div>

          {/* Key concepts */}
          {concepts.length > 1 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                Key concepts
              </h3>
              <ul className="space-y-1.5">
                {concepts.map((concept, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{concept}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Study tips */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
              How to study this topic
            </h3>
            <ol className="space-y-2">
              {[
                'Read the official documentation or recommended resource below.',
                'Code along with examples — don\'t just read, type it out.',
                'Build a small experiment or mini-project using this concept.',
                'Explain it in your own words (rubber duck debugging helps!).',
                'Take the knowledge check quiz when you feel ready.',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ol>
          </div>

          {/* Resource link */}
          {topic.r && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                Recommended resource
              </h3>
              <a
                href={topic.r}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 hover:border-indigo-400 transition-colors group"
              >
                <Icon name="external" size={16} className="text-indigo-500 flex-shrink-0" />
                <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline truncate">
                  {topic.r.replace(/^https?:\/\//, '').split('/')[0]}
                </span>
                <span className="text-xs text-slate-400 truncate hidden sm:block">
                  {topic.r.replace(/^https?:\/\/[^/]+/, '') || '/'}
                </span>
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex gap-3 flex-shrink-0">
          <button onClick={onClose} className="btn-secondary flex-1 text-sm">
            Close
          </button>
          {onStartQuiz && (
            <button
              onClick={() => { onClose(); onStartQuiz() }}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="brain" size={15} />
              Take Knowledge Check
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

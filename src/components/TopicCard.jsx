import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Icon } from './Icon'
import { InterviewModal } from './InterviewModal'

/**
 * @param {{ topic: {t:string, d:string, r:string}, catId: string, levelId: string }} props
 */
export function TopicCard({ topic, catId, levelId }) {
  const { state, update } = useApp()
  const key = `${levelId}::${catId}::${topic.slug}`
  const isChecked   = !!state.checked[key]
  const isBookmarked = !!state.bookmarks[key]
  const note        = state.notes[key] ?? ''
  const [showNote, setShowNote] = useState(false)
  const [showInterview, setShowInterview] = useState(false)

  const toggle     = () => update((s) => ({ ...s, checked:   { ...s.checked,   [key]: !isChecked   } }))
  const toggleBm   = () => update((s) => ({ ...s, bookmarks: { ...s.bookmarks, [key]: !isBookmarked } }))
  const setNote    = (v) => update((s) => ({ ...s, notes:    { ...s.notes,     [key]: v            } }))

  return (
    <div
      className={`card px-4 py-3 mb-2 transition-opacity ${isChecked ? 'opacity-60' : 'opacity-100'}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={toggle}
          role="checkbox"
          aria-checked={isChecked}
          aria-label={`Mark "${topic.t}" as ${isChecked ? 'incomplete' : 'complete'}`}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
            isChecked
              ? 'bg-emerald-500 border-emerald-500'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
          }`}
        >
          {isChecked && <Icon name="check" size={13} className="text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-semibold ${
              isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'
            }`}
          >
            {topic.t}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{topic.d}</p>

          {showNote && (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your notes here…"
              className="input mt-2 resize-y min-h-[60px] text-xs"
              aria-label={`Notes for ${topic.t}`}
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setShowNote((v) => !v)}
            title={showNote ? 'Hide notes' : 'Add notes'}
            className={`p-1.5 rounded-md transition-colors ${
              note
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/30'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Icon name="note" size={15} />
          </button>

          <button
            onClick={toggleBm}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            className={`p-1.5 rounded-md transition-colors ${
              isBookmarked
                ? 'text-amber-500'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Icon name={isBookmarked ? 'bookmarkFill' : 'bookmark'} size={15} />
          </button>

          {topic.r && (
            <a
              href={topic.r}
              target="_blank"
              rel="noopener noreferrer"
              title="Open resource"
              className="p-1.5 rounded-md text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
              aria-label={`Resource for ${topic.t}`}
            >
              <Icon name="external" size={15} />
            </a>
          )}

          <button
            onClick={() => setShowInterview(true)}
            title="Mock Interview"
            className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
            aria-label={`Start mock interview for ${topic.t}`}
          >
            <Icon name="brain" size={15} />
          </button>
        </div>
      </div>

      {showInterview && (
        <InterviewModal
          topicKey={key}
          topicTitle={topic.t}
          seniority={levelId}
          onClose={() => setShowInterview(false)}
        />
      )}
    </div>
  )
}

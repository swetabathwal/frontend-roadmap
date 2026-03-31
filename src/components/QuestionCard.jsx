import { useState, useRef, useEffect } from 'react'
import { Icon } from './Icon'
import { useInterview } from '../context/InterviewContext'

// ─── Category styling ─────────────────────────────────────────────────────────

const CATEGORY_STYLES = {
  JavaScript:      'bg-amber-100   text-amber-800   dark:bg-amber-900/40  dark:text-amber-300',
  TypeScript:      'bg-blue-100    text-blue-800    dark:bg-blue-900/40   dark:text-blue-300',
  React:           'bg-cyan-100    text-cyan-800    dark:bg-cyan-900/40   dark:text-cyan-300',
  CSS:             'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
  HTML:            'bg-orange-100  text-orange-800  dark:bg-orange-900/40 dark:text-orange-300',
  'System Design': 'bg-violet-100  text-violet-800  dark:bg-violet-900/40 dark:text-violet-300',
  Performance:     'bg-green-100   text-green-800   dark:bg-green-900/40  dark:text-green-300',
  Testing:         'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  Behavioral:      'bg-rose-100    text-rose-800    dark:bg-rose-900/40   dark:text-rose-300',
  General:         'bg-slate-100   text-slate-700   dark:bg-slate-700     dark:text-slate-300',
}

function categoryStyle(cat) {
  return CATEGORY_STYLES[cat] ?? CATEGORY_STYLES.General
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * @param {{ question: import('../schemas/interviewSchema').InterviewQuestion }} props
 */
export function QuestionCard({ question }) {
  const { updateAnswer, markReviewed } = useInterview()

  const [showAnswer, setShowAnswer] = useState(false)
  const [isEditing, setIsEditing]   = useState(false)
  const [draft, setDraft]           = useState('')
  const textareaRef                 = useRef(null)

  // The displayed answer: prefer user's edit, fall back to AI answer
  const displayAnswer = question.userEditedAnswer ?? question.aiGeneratedAnswer
  const isEdited      = question.userEditedAnswer !== null && question.userEditedAnswer !== question.aiGeneratedAnswer
  const isReviewed    = question.status === 'reviewed'

  function startEdit() {
    setDraft(displayAnswer)
    setIsEditing(true)
    setShowAnswer(true)
  }

  function cancelEdit() {
    setIsEditing(false)
    setDraft('')
  }

  function saveEdit() {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== displayAnswer) {
      updateAnswer(question.id, trimmed)
    }
    setIsEditing(false)
    setDraft('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') { cancelEdit(); return }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) saveEdit()
  }

  // Auto-resize and focus textarea when edit mode opens
  useEffect(() => {
    if (!isEditing || !textareaRef.current) return
    const el = textareaRef.current
    el.focus()
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [isEditing])

  function handleTextareaInput(e) {
    setDraft(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <div
      className={`card overflow-hidden transition-all duration-200 ${
        isReviewed ? 'border-emerald-300 dark:border-emerald-700' : ''
      }`}
    >
      {/* ── Card header ── */}
      <div className="px-4 pt-4 pb-3 flex items-start gap-3">
        {/* Reviewed toggle */}
        <button
          onClick={() => markReviewed(question.id, question.status)}
          title={isReviewed ? 'Mark as unreviewed' : 'Mark as reviewed'}
          aria-label={isReviewed ? 'Mark as unreviewed' : 'Mark as reviewed'}
          className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            isReviewed
              ? 'bg-emerald-500 border-emerald-500 hover:bg-emerald-600'
              : 'border-slate-300 dark:border-slate-600 hover:border-emerald-400'
          }`}
        >
          {isReviewed && <Icon name="check" size={11} className="text-white" />}
        </button>

        {/* Question text + badges */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${categoryStyle(question.category)}`}>
              {question.category}
            </span>
            {isEdited && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Icon name="pencil" size={10} />
                Edited
              </span>
            )}
            {isReviewed && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <Icon name="check" size={10} />
                Reviewed
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">
            {question.questionText}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex-shrink-0 flex items-center gap-1">
          <button
            onClick={startEdit}
            title="Edit answer"
            aria-label="Edit answer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
          >
            <Icon name="pencil" size={14} />
          </button>
          <button
            onClick={() => setShowAnswer((v) => !v)}
            title={showAnswer ? 'Hide answer' : 'Show answer'}
            aria-label={showAnswer ? 'Hide answer' : 'Show answer'}
            aria-expanded={showAnswer}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
          >
            <Icon name={showAnswer ? 'eyeOff' : 'eye'} size={14} />
          </button>
        </div>
      </div>

      {/* ── Answer panel ── */}
      {showAnswer && (
        <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-4">
          {isEditing ? (
            /* Edit mode */
            <div className="space-y-3">
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder="Write your own answer…"
                className="input w-full resize-none min-h-[120px] text-sm leading-relaxed"
                aria-label="Edit answer"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Ctrl+Enter to save · Esc to cancel
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={cancelEdit}
                    className="btn-secondary text-sm py-1.5 px-3"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEdit}
                    disabled={!draft.trim()}
                    className="btn-primary text-sm py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="check" size={13} />
                    Save
                  </button>
                </div>
              </div>
              {isEdited && (
                <button
                  onClick={() => {
                    updateAnswer(question.id, question.aiGeneratedAnswer)
                    cancelEdit()
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-2"
                >
                  Reset to AI answer
                </button>
              )}
            </div>
          ) : (
            /* Read mode */
            <div className="space-y-2">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {displayAnswer}
              </p>
              {isEdited && (
                <button
                  onClick={() => updateAnswer(question.id, question.aiGeneratedAnswer)}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-2"
                >
                  Reset to AI answer
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

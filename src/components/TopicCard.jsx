import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Icon } from './Icon'
import { InterviewModal } from './InterviewModal'
import { QuizModal } from './QuizModal'
import { StudyMaterialModal } from './StudyMaterialModal'

/**
 * @param {{ topic: {slug:string, t:string, d:string, r:string}, catId: string, levelId: string }} props
 */
export function TopicCard({ topic, catId, levelId }) {
  const { state, update } = useApp()
  const key = `${levelId}::${catId}::${topic.slug}`
  const isChecked    = !!state.checked[key]
  const isBookmarked = !!state.bookmarks[key]
  const note         = state.notes[key] ?? ''

  const [showNote,      setShowNote]      = useState(false)
  const [showInterview, setShowInterview] = useState(false)
  const [showQuiz,      setShowQuiz]      = useState(false)
  const [showStudy,     setShowStudy]     = useState(false)

  // How many quiz attempts have been made for this topic
  const quizAttempt = state.quizAttempts?.[key] ?? 0

  const toggleBm = () => update((s) => ({ ...s, bookmarks: { ...s.bookmarks, [key]: !isBookmarked } }))
  const setNote  = (v) => update((s) => ({ ...s, notes:    { ...s.notes,     [key]: v            } }))

  /**
   * Clicking the checkbox:
   * - If already checked → uncheck immediately (no quiz needed to uncheck)
   * - If not checked → open quiz to verify understanding before marking complete
   */
  function handleCheckboxClick() {
    if (isChecked) {
      // Uncheck directly
      update((s) => ({ ...s, checked: { ...s.checked, [key]: false } }))
    } else {
      setShowQuiz(true)
    }
  }

  /** Called when the quiz is passed — mark topic as complete */
  function handleQuizPass() {
    update((s) => ({
      ...s,
      checked: { ...s.checked, [key]: true },
    }))
    setShowQuiz(false)
  }

  /**
   * Called when quiz is closed.
   * If reason is 'retry', increment the attempt counter so next quiz uses new questions.
   */
  function handleQuizClose(reason) {
    if (reason === 'retry') {
      update((s) => ({
        ...s,
        quizAttempts: { ...s.quizAttempts, [key]: (s.quizAttempts?.[key] ?? 0) + 1 },
      }))
      // Keep quiz open so the new attempt renders immediately
    } else {
      setShowQuiz(false)
    }
  }

  return (
    <div
      className={`card px-4 py-3 mb-2 transition-opacity ${isChecked ? 'opacity-60' : 'opacity-100'}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox — opens quiz for unchecked topics */}
        <button
          onClick={handleCheckboxClick}
          role="checkbox"
          aria-checked={isChecked}
          aria-label={`Mark "${topic.t}" as ${isChecked ? 'incomplete' : 'complete'}`}
          title={isChecked ? 'Mark as incomplete' : 'Mark as complete (requires knowledge check)'}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
            isChecked
              ? 'bg-emerald-500 border-emerald-500'
              : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
          }`}
        >
          {isChecked && <Icon name="check" size={13} className="text-white" />}
        </button>

        {/* Content — clicking title opens study material */}
        <div className="flex-1 min-w-0">
          <button
            onClick={() => setShowStudy(true)}
            className="text-left w-full group"
            title="View study material"
          >
            <p
              className={`text-sm font-semibold transition-colors ${
                isChecked
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
              }`}
            >
              {topic.t}
            </p>
          </button>
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

      {/* Quiz Modal — triggered by checkbox click on unchecked topic */}
      {showQuiz && (
        <QuizModal
          topicTitle={topic.t}
          topicSlug={topic.slug}
          attempt={quizAttempt}
          onPass={handleQuizPass}
          onClose={handleQuizClose}
        />
      )}

      {/* Study Material Modal — triggered by clicking topic title */}
      {showStudy && (
        <StudyMaterialModal
          topic={topic}
          levelId={levelId}
          catId={catId}
          onClose={() => setShowStudy(false)}
          onStartQuiz={!isChecked ? () => setShowQuiz(true) : undefined}
        />
      )}

      {/* Mock Interview Modal */}
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

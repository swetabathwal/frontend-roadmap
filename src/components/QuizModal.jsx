import { useState, useEffect } from 'react'
import { Icon } from './Icon'
import { getQuizQuestions, hasQuizQuestions } from '../data/quizQuestions'

const PASS_THRESHOLD = 0.8 // 80%

/**
 * Quiz modal shown when a user tries to mark a topic as complete.
 * User must score ≥80% to actually mark it complete.
 *
 * Props:
 *   topicTitle  - string
 *   topicSlug   - string
 *   attempt     - number (0-indexed, passed from parent, increments on retry)
 *   onPass      - () => void   called when quiz is passed
 *   onClose     - () => void   called on cancel or after failure close
 */
export function QuizModal({ topicTitle, topicSlug, attempt, onPass, onClose }) {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers]     = useState({}) // { [qIndex]: optionIndex }
  const [current, setCurrent]     = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore]         = useState(0)
  const [noQuestions, setNoQuestions] = useState(false)

  useEffect(() => {
    if (!hasQuizQuestions(topicSlug)) {
      setNoQuestions(true)
      return
    }
    const qs = getQuizQuestions(topicSlug, attempt, 10)
    setQuestions(qs)
    setAnswers({})
    setCurrent(0)
    setSubmitted(false)
    setScore(0)
  }, [topicSlug, attempt])

  // If no questions available, ask user to self-certify
  if (noQuestions) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative w-full max-w-md card p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
              <Icon name="brain" size={20} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Mark as Complete
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{topicTitle}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Questions for this topic are coming soon. Please confirm you have studied this topic by reviewing the material and resources before marking it complete.
          </p>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-secondary flex-1 text-sm">
              Cancel
            </button>
            <button
              onClick={onPass}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              I have studied this topic
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) return null

  const q = questions[current]
  const totalQ = questions.length
  const answered = Object.keys(answers).length
  const passed = submitted && score / totalQ >= PASS_THRESHOLD

  function selectAnswer(optionIdx) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [current]: optionIdx }))
  }

  function handleSubmit() {
    if (answered < totalQ) return
    let correct = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++
    })
    setScore(correct)
    setSubmitted(true)
    setCurrent(0) // show from first question in review
  }

  function handleRetry() {
    // parent increments attempt so different questions are shown
    onClose('retry')
  }

  const progressPct = Math.round((answered / totalQ) * 100)
  const scorePercent = submitted ? Math.round((score / totalQ) * 100) : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={submitted ? undefined : onClose} />
      <div className="relative w-full max-w-2xl card shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <Icon name="brain" size={18} className="text-indigo-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Knowledge Check
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                {topicTitle}
              </p>
            </div>
          </div>
          {!submitted && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <Icon name="x" size={16} />
            </button>
          )}
        </div>

        {/* Anti-cheat notice */}
        {!submitted && (
          <div className="mx-4 mt-3 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg flex-shrink-0">
            <p className="text-xs text-amber-700 dark:text-amber-400">
              <strong>Honesty matters:</strong> Don't copy-paste answers. This quiz helps you confirm real understanding, not just browser search skills. Answer from memory — it's for your own growth.
            </p>
          </div>
        )}

        {/* Progress bar (pre-submit) */}
        {!submitted && (
          <div className="px-4 pt-3 flex-shrink-0">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Question {current + 1} of {totalQ}</span>
              <span>{answered}/{totalQ} answered</span>
            </div>
            <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Results header (post-submit) */}
        {submitted && (
          <div className={`mx-4 mt-3 p-4 rounded-xl flex-shrink-0 ${passed
            ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700'
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                passed ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {scorePercent}%
              </div>
              <div>
                <p className={`font-bold text-sm ${passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                  {passed ? '🎉 Passed! Topic marked as complete.' : `Not quite — ${score}/${totalQ} correct (need ${Math.round(PASS_THRESHOLD * totalQ)}/10)`}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {passed
                    ? 'Great work! You can review your answers below.'
                    : 'Review the answers below, then try again with new questions.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Question navigator (dots) */}
        <div className="flex gap-1.5 px-4 pt-3 flex-wrap flex-shrink-0">
          {questions.map((q, i) => {
            let color = 'bg-slate-200 dark:bg-slate-700'
            if (submitted) {
              color = answers[i] === q.correct
                ? 'bg-emerald-500'
                : 'bg-red-400'
            } else if (answers[i] !== undefined) {
              color = 'bg-indigo-400'
            }
            return (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-6 h-6 rounded-md text-xs font-medium transition-colors ${color} ${
                  current === i ? 'ring-2 ring-indigo-500 ring-offset-1' : ''
                } ${submitted ? 'text-white' : answers[i] !== undefined ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>

        {/* Question body */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3 leading-relaxed">
            {current + 1}. {q.q}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, i) => {
              let style = 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer'
              if (!submitted && answers[current] === i) {
                style = 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
              }
              if (submitted) {
                if (i === q.correct) {
                  style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 cursor-default'
                } else if (answers[current] === i && i !== q.correct) {
                  style = 'border-red-400 bg-red-50 dark:bg-red-900/20 cursor-default'
                } else {
                  style = 'border-slate-200 dark:border-slate-700 opacity-50 cursor-default'
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  disabled={submitted}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border-2 transition-all text-sm flex items-center gap-2.5 ${style}`}
                >
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    submitted && i === q.correct
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : submitted && answers[current] === i && i !== q.correct
                        ? 'border-red-400 bg-red-400 text-white'
                        : !submitted && answers[current] === i
                          ? 'border-indigo-500 bg-indigo-500 text-white'
                          : 'border-slate-300 dark:border-slate-600 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-slate-700 dark:text-slate-200 leading-snug">{opt}</span>
                  {submitted && i === q.correct && (
                    <Icon name="check" size={14} className="text-emerald-500 ml-auto flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
          {!submitted ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                className="btn-secondary text-sm px-3 disabled:opacity-40"
              >
                ← Prev
              </button>
              <div className="flex-1" />
              <button
                onClick={() => setCurrent((c) => Math.min(totalQ - 1, c + 1))}
                disabled={current === totalQ - 1}
                className="btn-secondary text-sm px-3 disabled:opacity-40"
              >
                Next →
              </button>
              <button
                onClick={handleSubmit}
                disabled={answered < totalQ}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 px-5 rounded-lg transition-colors"
              >
                Submit ({answered}/{totalQ})
              </button>
            </div>
          ) : passed ? (
            <div className="flex gap-3">
              <button
                onClick={onPass}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Mark Complete & Close
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={onClose} className="btn-secondary flex-1 text-sm">
                Close
              </button>
              <button
                onClick={handleRetry}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Try Again (New Questions)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

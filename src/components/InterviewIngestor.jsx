import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { supabase } from '../supabase/client'
import { useInterview } from '../context/InterviewContext'
import { Icon } from './Icon'
import { QuestionCard } from './QuestionCard'
import {
  ExtractedQuestionsSchema,
  formatInterviewZodError,
  normaliseCategory,
} from '../schemas/interviewSchema'

// ─── Processing stages (simulated progress) ───────────────────────────────────
// Each stage fills the bar to `targetPct` over `durationMs`.
// The last stage holds at 90% until the real API response arrives.

const STAGES = [
  { label: 'Reading your interview post…',     targetPct: 28,  durationMs: 2200 },
  { label: 'Extracting specific questions…',   targetPct: 58,  durationMs: 2500 },
  { label: 'Generating senior-level answers…', targetPct: 88,  durationMs: 3500 },
]

function useProcessingAnimation(isProcessing) {
  const [stageIdx, setStageIdx]   = useState(0)
  const [barPct,   setBarPct]     = useState(0)
  const timersRef                 = useRef([])

  useEffect(() => {
    if (!isProcessing) {
      // Reset for next run
      setStageIdx(0)
      setBarPct(0)
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
      return
    }

    // Kick off stage transitions
    let elapsed = 0
    STAGES.forEach((stage, i) => {
      const t = setTimeout(() => {
        setStageIdx(i)
        setBarPct(stage.targetPct)
      }, elapsed)
      timersRef.current.push(t)
      elapsed += stage.durationMs
    })

    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [isProcessing])

  return { stageIdx, barPct }
}

// ─── Small helper: generate a client-side UUID ────────────────────────────────

function newId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36)
}

// ─── Component ────────────────────────────────────────────────────────────────

export function InterviewIngestor() {
  const { addExperience } = useInterview()

  const [companyName,   setCompanyName]   = useState('')
  const [rawText,       setRawText]       = useState('')
  const [isProcessing,  setIsProcessing]  = useState(false)

  // Results of the last synthesis
  const [lastExperience, setLastExperience] = useState(null)  // InterviewExperience | null
  const [showForm,        setShowForm]       = useState(true)

  const { stageIdx, barPct } = useProcessingAnimation(isProcessing)

  async function handleSynthesize() {
    if (!rawText.trim())       { toast.warning('Paste an interview experience first.'); return }
    if (!companyName.trim())   { toast.warning('Enter a company name.'); return }
    if (rawText.length < 100)  { toast.warning('The post looks too short — paste more context.'); return }

    setIsProcessing(true)

    try {
      const { data, error } = await supabase.functions.invoke('process-interview', {
        body: {
          rawText:     rawText.trim(),
          companyName: companyName.trim(),
        },
      })

      if (error) throw new Error(error.message)
      if (data?.error) throw new Error(data.error)

      // ── Zod validation ──
      const parseResult = ExtractedQuestionsSchema.safeParse(data?.questions)
      if (!parseResult.success) {
        throw new Error(`AI response was malformed: ${formatInterviewZodError(parseResult.error)}`)
      }

      const extracted = parseResult.data
      if (extracted.length === 0) {
        toast.info('No specific questions were found in that post. Try a more detailed experience.')
        setIsProcessing(false)
        return
      }

      // ── Build the experience object ──
      const experience = {
        id:          newId(),
        companyName: companyName.trim(),
        rawText:     rawText.trim(),
        createdAt:   new Date().toISOString(),
        questions:   extracted.map((q) => ({
          id:                newId(),
          questionText:      q.question,
          category:          normaliseCategory(q.category),
          aiGeneratedAnswer: q.answer,
          userEditedAnswer:  null,
          status:            'unreviewed',
        })),
      }

      // Snap progress bar to 100% before revealing results
      await new Promise((r) => setTimeout(r, 300))

      await addExperience(experience)
      setLastExperience(experience)
      setShowForm(false)

      toast.success(
        `${extracted.length} question${extracted.length !== 1 ? 's' : ''} extracted from ${companyName.trim()} interview`,
      )
    } catch (err) {
      toast.error(err.message ?? 'Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  function handleNewAnalysis() {
    setLastExperience(null)
    setShowForm(true)
    setCompanyName('')
    setRawText('')
  }

  // ── Processing overlay ──────────────────────────────────────────────────────
  if (isProcessing) {
    const stage = STAGES[stageIdx]
    return (
      <div className="card p-8 flex flex-col items-center gap-6">
        {/* Animated icon */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
          <Icon
            name="sparkles"
            size={28}
            className="text-indigo-500 dark:text-indigo-400 animate-pulse"
          />
        </div>

        {/* Stage label */}
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Synthesizing interview…
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 transition-all duration-500">
            {stage.label}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-sm space-y-2">
          <div className="progress-bar">
            <div
              className="progress-fill bg-indigo-500"
              style={{ width: `${barPct}%`, transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }}
            />
          </div>
          {/* Stage dots */}
          <div className="flex justify-between px-0.5">
            {STAGES.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-1.5 text-xs transition-colors duration-300 ${
                  i <= stageIdx
                    ? 'text-indigo-500 dark:text-indigo-400 font-medium'
                    : 'text-slate-400 dark:text-slate-600'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    i < stageIdx
                      ? 'bg-indigo-500'
                      : i === stageIdx
                      ? 'bg-indigo-500 animate-pulse'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
                {i === 0 ? 'Reading' : i === 1 ? 'Extracting' : 'Answering'}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-600">
          This usually takes 5–15 seconds…
        </p>
      </div>
    )
  }

  // ── Results view (after synthesis) ─────────────────────────────────────────
  if (!showForm && lastExperience) {
    return (
      <div className="space-y-4">
        {/* Results header */}
        <div className="card px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
              <Icon name="sparkles" size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {lastExperience.companyName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lastExperience.questions.length} questions extracted · Saved to your library
              </p>
            </div>
          </div>
          <button onClick={handleNewAnalysis} className="btn-secondary text-sm py-1.5">
            <Icon name="plus" size={14} />
            New Analysis
          </button>
        </div>

        {/* Category summary pills */}
        <CategorySummary questions={lastExperience.questions} />

        {/* Question cards */}
        <div className="space-y-3">
          {lastExperience.questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      </div>
    )
  }

  // ── Input form ──────────────────────────────────────────────────────────────
  return (
    <div className="card p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
          <Icon name="sparkles" size={20} className="text-indigo-500 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Synthesize an Interview Experience
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Paste a raw post from LinkedIn or Glassdoor. The AI will extract questions and
            generate senior-level answers you can study and edit.
          </p>
        </div>
      </div>

      {/* Company name */}
      <div className="space-y-1.5">
        <label htmlFor="company-name" className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
          Company
        </label>
        <input
          id="company-name"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g. Google, Meta, Stripe…"
          className="input"
          maxLength={80}
        />
      </div>

      {/* Raw text */}
      <div className="space-y-1.5">
        <label htmlFor="raw-experience" className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
          Interview Experience Post
        </label>
        <textarea
          id="raw-experience"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder={
            'Paste the full post here…\n\nExample:\n"I interviewed at Google for a Senior Frontend role. ' +
            'Round 1 was a technical screen — they asked me to explain the difference between ' +
            'useMemo and useCallback, then asked about the virtual DOM. Round 2 was system design…"'
          }
          rows={10}
          className="input resize-y min-h-[200px] leading-relaxed"
          aria-label="Interview experience post"
        />
        <p className="text-xs text-slate-400 dark:text-slate-500 text-right">
          {rawText.length.toLocaleString()} / 20,000 characters
        </p>
      </div>

      {/* Submit */}
      <button
        onClick={handleSynthesize}
        disabled={!rawText.trim() || !companyName.trim()}
        className="btn-primary w-full justify-center py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="sparkles" size={16} />
        Synthesize Interview
      </button>
    </div>
  )
}

// ─── Category summary ─────────────────────────────────────────────────────────

const CAT_PILL_STYLES = {
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

function CategorySummary({ questions }) {
  const counts = questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] ?? 0) + 1
    return acc
  }, {})

  const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a)

  return (
    <div className="flex flex-wrap gap-2">
      {sorted.map(([cat, count]) => (
        <span
          key={cat}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            CAT_PILL_STYLES[cat] ?? CAT_PILL_STYLES.General
          }`}
        >
          {cat}
          <span className="opacity-70 font-bold">{count}</span>
        </span>
      ))}
    </div>
  )
}

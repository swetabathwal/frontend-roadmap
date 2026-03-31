import { useState } from 'react'
import { useInterview } from '../context/InterviewContext'
import { InterviewIngestor } from '../components/InterviewIngestor'
import { QuestionCard } from '../components/QuestionCard'
import { Icon } from '../components/Icon'

// ─── Single past experience row ───────────────────────────────────────────────

function ExperienceRow({ experience, onDelete }) {
  const [expanded, setExpanded] = useState(false)

  const total    = experience.questions.length
  const reviewed = experience.questions.filter((q) => q.status === 'reviewed').length
  const pct      = total > 0 ? Math.round((reviewed / total) * 100) : 0

  const dateStr = new Date(experience.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  })

  // Category counts for the mini-summary
  const catCounts = experience.questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] ?? 0) + 1
    return acc
  }, {})
  const topCats = Object.entries(catCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)

  return (
    <div className="card overflow-hidden">
      {/* ── Row header ── */}
      <button
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {/* Company icon */}
        <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
          <Icon name="brain" size={17} className="text-indigo-500 dark:text-indigo-400" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {experience.companyName}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">{dateStr}</span>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {topCats.map(([cat, count]) => (
              <span
                key={cat}
                className="text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
              >
                {cat} ({count})
              </span>
            ))}
            {Object.keys(catCounts).length > 4 && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">
                +{Object.keys(catCounts).length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Progress + chevron */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {reviewed}/{total} reviewed
            </span>
            <div className="w-24 progress-bar">
              <div
                className="progress-fill bg-emerald-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <Icon
            name={expanded ? 'chevronUp' : 'chevronDown'}
            size={16}
            className="text-slate-400 dark:text-slate-500"
          />
        </div>
      </button>

      {/* ── Expanded questions ── */}
      {expanded && (
        <div className="border-t border-slate-100 dark:border-slate-700 px-5 py-4 space-y-3">
          {/* Progress bar (mobile) */}
          <div className="flex sm:hidden items-center justify-between mb-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {reviewed}/{total} reviewed
            </span>
            <div className="w-28 progress-bar">
              <div className="progress-fill bg-emerald-500" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {experience.questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}

          {/* Delete */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onDelete(experience.id)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors py-1 px-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Icon name="trash" size={13} />
              Delete this experience
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function InterviewListView() {
  const { state, ready, deleteExperience } = useInterview()
  const experiences = state.experiences ?? []

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl" aria-hidden="true">🧠</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Interview Intelligence
          </h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Paste raw interview posts. Get structured questions with senior-level answers you can
          study, edit, and mark as reviewed.
        </p>
      </div>

      {/* Ingestor — always visible at top */}
      <InterviewIngestor />

      {/* Past experiences */}
      {!ready ? (
        <LoadingSkeleton />
      ) : experiences.length > 0 ? (
        <section aria-label="Past interview experiences">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Saved Experiences
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {experiences.length} total · {experiences.reduce((s, e) => s + e.questions.length, 0)} questions
            </span>
          </div>

          <div className="space-y-3">
            {experiences.map((exp) => (
              <ExperienceRow
                key={exp.id}
                experience={exp}
                onDelete={deleteExperience}
              />
            ))}
          </div>
        </section>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="card p-12 text-center">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
        <Icon name="brain" size={24} className="text-slate-400 dark:text-slate-500" />
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
        No saved experiences yet
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500">
        Paste your first interview post above and hit Synthesize.
      </p>
    </div>
  )
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="space-y-3" aria-label="Loading saved experiences">
      {[1, 2].map((i) => (
        <div key={i} className="card px-5 py-4 flex items-center gap-4 animate-pulse">
          <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
            <div className="h-2.5 bg-slate-100 dark:bg-slate-700/60 rounded w-1/2" />
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1.5">
            <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded w-20" />
            <div className="h-2 bg-slate-100 dark:bg-slate-700/60 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

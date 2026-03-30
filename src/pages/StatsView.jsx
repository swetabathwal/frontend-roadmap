import { useState } from 'react'
import { toast } from 'sonner'
import { LEVELS } from '../data/levels'
import { CATEGORIES } from '../data/categories'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { ProgressBar } from '../components/ProgressBar'
import { Icon } from '../components/Icon'
import { useLevelStats, useGlobalStats, useCategoryStats } from '../hooks/useTopicStats'
import { supabase } from '../supabase/client'
import { buildPublicSnapshot } from '../utils/buildPublicSnapshot'

function StatCard({ label, value, color = 'text-indigo-500' }) {
  return (
    <div className="card p-4 text-center">
      <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
    </div>
  )
}

function LevelStatRow({ level }) {
  const { total, done, pct } = useLevelStats(level.id)
  return (
    <div className="card p-4 flex items-center gap-4">
      <span className="text-3xl">{level.icon}</span>
      <div className="flex-1">
        <div className="flex justify-between mb-1.5">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{level.label}</span>
          <span className="text-sm font-bold" style={{ color: level.color }}>{pct}%</span>
        </div>
        <ProgressBar pct={pct} color={level.color} height="8px" />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{done}/{total} topics</p>
      </div>
    </div>
  )
}

function ShareSection({ state }) {
  const { user } = useAuth()
  const [generating, setGenerating] = useState(false)
  const [profileUrl, setProfileUrl] = useState(null)

  async function handleGenerate() {
    if (!user) return
    setGenerating(true)

    try {
      // Check if this user already has a profile (to reuse the same slug / stable URL)
      const { data: existing } = await supabase
        .from('public_profiles')
        .select('slug')
        .eq('user_id', user.id)
        .maybeSingle()

      const displayName = user.user_metadata?.display_name || user.email
      const snapshot    = buildPublicSnapshot(state, user.id, displayName, existing?.slug)

      const { error } = await supabase
        .from('public_profiles')
        .upsert(snapshot, { onConflict: 'user_id' })

      if (error) throw error

      const url = `${window.location.origin}/profile/${snapshot.slug}`
      setProfileUrl(url)
      await navigator.clipboard.writeText(url).catch(() => {})
      toast.success('Public profile link copied to clipboard!')
    } catch (err) {
      toast.error(`Could not generate profile: ${err.message}`)
    } finally {
      setGenerating(false)
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(profileUrl).catch(() => {})
    toast.success('Link copied!')
  }

  const linkedInUrl = profileUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`
    : null

  return (
    <section aria-label="Share your progress" className="card p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
          <Icon name="share" size={17} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Share Your Progress</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Generate a public profile link to share your roadmap progress on LinkedIn or with your network.
            Your notes (up to 300 chars each) will be included.
          </p>
        </div>
      </div>

      {!profileUrl ? (
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold transition-colors"
        >
          {generating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Icon name="link" size={15} />
              Generate Public Profile Link
            </>
          )}
        </button>
      ) : (
        <div className="space-y-3">
          {/* URL display */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2.5">
            <Icon name="link" size={14} className="text-slate-400 flex-shrink-0" />
            <span className="flex-1 text-xs text-slate-600 dark:text-slate-300 font-mono truncate">
              {profileUrl}
            </span>
            <button
              onClick={copyLink}
              className="flex-shrink-0 text-xs text-indigo-500 hover:text-indigo-600 font-semibold"
            >
              Copy
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-wrap">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#0958a8] text-white text-sm font-semibold transition-colors"
            >
              <Icon name="linkedin" size={15} />
              Share on LinkedIn
            </a>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-colors disabled:opacity-60"
            >
              <Icon name="share" size={15} />
              {generating ? 'Updating…' : 'Re-generate'}
            </button>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-600">
            Anyone with the link can view your profile — no login required.
            Re-generate to refresh the snapshot with your latest progress.
          </p>
        </div>
      )}
    </section>
  )
}

export function StatsView() {
  const { state } = useApp()
  const { total, done } = useGlobalStats()
  const catStats = useCategoryStats()
  const noteCount = Object.values(state.notes).filter((n) => n?.trim()).length
  const bmCount = Object.values(state.bookmarks).filter(Boolean).length

  const sortedCats = [...CATEGORIES]
    .map((c) => ({ ...c, ...(catStats[c.id] ?? { total: 0, done: 0, pct: 0 }) }))
    .sort((a, b) => b.pct - a.pct)

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">📊 Statistics</h1>

      <section aria-label="Summary statistics">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatCard label="Total Topics"  value={total}        color="text-indigo-500" />
          <StatCard label="Completed"     value={done}         color="text-emerald-500" />
          <StatCard label="Remaining"     value={total - done} color="text-amber-500" />
          <StatCard label="Notes Written" value={noteCount}    color="text-violet-500" />
          <StatCard label="Bookmarked"    value={bmCount}      color="text-amber-500" />
        </div>
      </section>

      <section aria-label="Progress by level">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">Progress by Level</h2>
        <div className="space-y-3">
          {LEVELS.map((lv) => <LevelStatRow key={lv.id} level={lv} />)}
        </div>
      </section>

      <section aria-label="Progress by category">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">Progress by Category</h2>
        <div className="space-y-2">
          {sortedCats.map((cat) => (
            <div key={cat.id} className="card p-3 flex items-center gap-3">
              <span className="text-xl w-7 text-center">{cat.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{cat.name}</span>
                  <span className="text-sm font-bold text-indigo-500">{cat.pct}%</span>
                </div>
                <ProgressBar pct={cat.pct} color="#6366F1" height="6px" />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 text-right min-w-[45px]">
                {cat.done}/{cat.total}
              </span>
            </div>
          ))}
        </div>
      </section>

      <ShareSection state={state} />
    </div>
  )
}

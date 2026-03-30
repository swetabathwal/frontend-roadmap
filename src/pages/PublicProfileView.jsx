import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { LEVELS } from '../data/levels'
import { Icon } from '../components/Icon'
import { ProgressBar } from '../components/ProgressBar'

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(() => {})
}

export function PublicProfileView() {
  const { slug } = useParams()
  const [profile, setProfile] = useState(null)
  const [status, setStatus]   = useState('loading') // loading | found | notfound | error

  useEffect(() => {
    supabase
      .from('public_profiles')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { setStatus(error?.code === 'PGRST116' ? 'notfound' : 'error'); return }
        setProfile(data)
        setStatus('found')
      })
  }, [slug])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (status === 'notfound') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-5xl">🔍</p>
        <h1 className="text-xl font-bold text-slate-800">Profile not found</h1>
        <p className="text-sm text-slate-500">This link may have expired or never existed.</p>
        <Link to="/" className="text-sm text-indigo-500 hover:underline">Create your own →</Link>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-sm text-red-500">Failed to load profile. Please try again.</p>
      </div>
    )
  }

  const profileUrl  = window.location.href
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`
  const levelStats  = profile.level_stats ?? {}

  // Group completed topics by level for the topic list
  const byLevel = {}
  ;(profile.completed_list ?? []).forEach((item) => {
    if (!byLevel[item.levelId]) byLevel[item.levelId] = []
    byLevel[item.levelId].push(item)
  })

  const generatedDate = new Date(profile.generated_at).toLocaleDateString([], {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <span className="text-sm font-bold text-slate-700">Frontend Dev Roadmap</span>
          </div>
          <Link
            to="/"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            Track my own progress →
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {(profile.display_name ?? '?').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 truncate">
                  {profile.display_name ?? 'Anonymous'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Icon name="verified" size={12} />
                  Verified Progress
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">Frontend Developer · Roadmap Progress</p>
              <p className="text-xs text-slate-400 mt-1">Updated {generatedDate}</p>
            </div>
          </div>

          {/* Global stats row */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-2xl font-extrabold text-indigo-600">{profile.completion_pct}%</p>
              <p className="text-xs text-slate-500 mt-0.5">Completion</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-2xl font-extrabold text-emerald-600">{profile.completed_topics}</p>
              <p className="text-xs text-slate-500 mt-0.5">Topics Done</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-2xl font-extrabold text-violet-600">{profile.notes_count}</p>
              <p className="text-xs text-slate-500 mt-0.5">Notes Written</p>
            </div>
          </div>

          {/* Share buttons */}
          <div className="mt-5 flex gap-2 flex-wrap">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] hover:bg-[#0958a8] text-white text-sm font-semibold transition-colors"
            >
              <Icon name="linkedin" size={15} />
              Share on LinkedIn
            </a>
            <button
              onClick={() => copyToClipboard(profileUrl)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
            >
              <Icon name="copy" size={15} />
              Copy link
            </button>
          </div>
        </div>

        {/* Progress by level */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Progress by Level</h2>
          <div className="space-y-2">
            {LEVELS.map((lv) => {
              const s = levelStats[lv.id] ?? { done: 0, total: 0, pct: 0 }
              return (
                <div key={lv.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
                  <span className="text-2xl">{lv.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-semibold text-slate-800">{lv.label}</span>
                      <span className="text-sm font-bold" style={{ color: lv.color }}>{s.pct}%</span>
                    </div>
                    <ProgressBar pct={s.pct} color={lv.color} height="7px" />
                    <p className="text-xs text-slate-400 mt-1">{s.done} / {s.total} topics</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Completed topics */}
        {profile.completed_topics > 0 && (
          <section>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
              Completed Topics ({profile.completed_topics})
            </h2>
            <div className="space-y-4">
              {LEVELS.filter((lv) => byLevel[lv.id]?.length).map((lv) => (
                <div key={lv.id}>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {lv.icon} {lv.label}
                  </p>
                  <div className="space-y-1.5">
                    {byLevel[lv.id].map((item, i) => (
                      <div key={i} className="bg-white rounded-xl border border-slate-200 px-4 py-3">
                        <div className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon name="check" size={10} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800">{item.topicTitle}</p>
                            <p className="text-xs text-slate-400">{item.catName}</p>
                            {item.note && (
                              <p className="text-xs text-slate-500 mt-1.5 italic leading-relaxed border-l-2 border-indigo-200 pl-2">
                                {item.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center pt-4 pb-8">
          <p className="text-xs text-slate-400">
            Generated by{' '}
            <Link to="/" className="text-indigo-500 hover:underline">
              Frontend Dev Roadmap
            </Link>
            {' '}· Track your own learning journey
          </p>
        </footer>
      </main>
    </div>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '../supabase/client'
import { useApp } from '../context/AppContext'
import { Icon } from './Icon'
import { LEVELS } from '../data/levels'
import type { InterviewMessage, InterviewSession } from '../types/interview'

interface Props {
  topicKey: string
  topicTitle: string
  /** levelId from the roadmap data: junior | mid | senior | staff */
  seniority: string
  onClose: () => void
}

// Derived from LEVELS — single source of truth for level labels
const SENIORITY_LABEL = Object.fromEntries(LEVELS.map((l) => [l.id, l.label]))

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i}>{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </>
  )
}

function AiText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i, arr) => (
        <span key={i}>
          <BoldText text={line} />
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </>
  )
}

interface AppCtx {
  state: Record<string, any>
  update: (fn: (s: Record<string, any>) => Record<string, any>) => void
}

export function InterviewModal({ topicKey, topicTitle, seniority, onClose }: Props) {
  const { state, update } = useApp() as unknown as AppCtx
  const sessions: InterviewSession[] = state.interviewHistory?.[topicKey] ?? []

  const [activeTab, setActiveTab]   = useState<'chat' | 'history'>('chat')
  const [messages, setMessages]     = useState<InterviewMessage[]>([])
  const [input, setInput]           = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError]           = useState<string | null>(null)

  const bottomRef   = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const initialized = useRef(false)

  // Stable session metadata — computed once at mount
  const sessionId  = useRef(uid()).current
  const startedAt  = useRef(Date.now()).current

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isFetching])

  const fetchReply = useCallback(async (history: InterviewMessage[]) => {
    setIsFetching(true)
    setError(null)
    try {
      const { data, error: fnErr } = await supabase.functions.invoke('mock-interview', {
        body: {
          topicTitle,
          userSeniority: seniority,
          messages: history.map((m) => ({ role: m.role, text: m.text })),
        },
      })

      if (fnErr) throw new Error(fnErr.message)
      if (data?.error) throw new Error(data.error)

      const reply = data?.reply as string
      if (!reply) throw new Error('Empty response from AI')

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: 'ai', text: reply, timestamp: Date.now() },
      ])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsFetching(false)
    }
  }, [topicTitle, seniority])

  // Kick off Q1 on mount; guard against StrictMode double-fire
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    fetchReply([])
  }, [fetchReply])

  // Focus textarea after the initial AI response loads
  useEffect(() => {
    const t = setTimeout(() => textareaRef.current?.focus(), 800)
    return () => clearTimeout(t)
  }, [])

  // Save the session to history and close.
  // useCallback so the Escape handler always sees the latest messages.
  const handleClose = useCallback(() => {
    const cleanMessages = messages.filter((m) => !m.pending)
    if (cleanMessages.length > 1) {
      const finalSession: InterviewSession = {
        id: sessionId, topicKey, topicTitle, seniority, startedAt,
        messages: cleanMessages,
      }
      update((s: any) => ({
        ...s,
        interviewHistory: {
          ...s.interviewHistory,
          [topicKey]: [...(s.interviewHistory?.[topicKey] ?? []), finalSession],
        },
      }))
    }
    onClose()
  }, [messages, update, topicKey, topicTitle, seniority, sessionId, startedAt, onClose])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [handleClose])

  function sendMessage() {
    const text = input.trim()
    if (!text || isFetching) return

    const userMsg: InterviewMessage = { id: uid(), role: 'user', text, timestamp: Date.now() }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    fetchReply(nextMessages)   // called outside setState updater — no StrictMode double-fire
    setInput('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const fmt = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const fmtDate = (ts: number) =>
    new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })

  const seniorityLabel = SENIORITY_LABEL[seniority] ?? seniority

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Mock interview — ${topicTitle}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full sm:max-w-lg flex flex-col bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92dvh] sm:max-h-[82vh]">

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
            <Icon name="brain" size={16} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Mock Interview</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {topicTitle} · <span className="text-indigo-500">{seniorityLabel}</span>
            </p>
          </div>

          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {(['chat', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab}
                {tab === 'history' && sessions.length > 0 && (
                  <span className="ml-1 text-indigo-500">({sessions.length})</span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">

              {messages.length === 0 && isFetching && (
                <div className="flex justify-center items-center h-20">
                  <span className="text-xs text-slate-400 animate-pulse">Preparing your questions…</span>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="brain" size={12} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                  )}
                  <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm'
                      }`}
                    >
                      {msg.role === 'ai' ? <AiText text={msg.text} /> : msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 px-1">{fmt(msg.timestamp)}</span>
                  </div>
                </div>
              ))}

              {isFetching && messages.length > 0 && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="brain" size={12} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="px-3 py-2 rounded-2xl rounded-bl-sm bg-slate-100 dark:bg-slate-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <Icon name="x" size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-red-700 dark:text-red-400">Request failed</p>
                    <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">{error}</p>
                  </div>
                  <button
                    onClick={() => { setError(null); fetchReply(messages) }}
                    className="text-xs text-red-600 dark:text-red-400 underline hover:no-underline flex-shrink-0"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="px-4 pb-4 pt-2 flex-shrink-0 border-t border-slate-100 dark:border-slate-800">
              <div className={`flex gap-2 items-end bg-slate-100 dark:bg-slate-800 rounded-2xl px-3 py-2 transition-opacity ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isFetching ? 'Waiting for interviewer…' : 'Type your answer… (Enter to send, Shift+Enter for new line)'}
                  rows={2}
                  disabled={isFetching}
                  className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 resize-none outline-none max-h-32 leading-relaxed disabled:cursor-not-allowed"
                  aria-label="Your answer"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isFetching}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  aria-label="Send answer"
                >
                  <Icon name="send" size={14} className="text-white translate-x-0.5" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-600 text-center mt-2">
                Powered by Claude · Session saved when you close
              </p>
            </div>
          </>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="brain" size={32} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">No previous sessions yet.</p>
                <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">
                  Complete a session and close to save it here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {[...sessions].reverse().map((s, i) => (
                  <div key={s.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Session {sessions.length - i}
                        {s.seniority && (
                          <span className="ml-2 font-normal text-indigo-500">
                            {SENIORITY_LABEL[s.seniority] ?? s.seniority}
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-slate-400">{fmtDate(s.startedAt)}</span>
                    </div>
                    <div className="px-3 py-2 space-y-2 max-h-56 overflow-y-auto">
                      {s.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`px-2.5 py-1.5 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {msg.role === 'ai' ? <AiText text={msg.text} /> : msg.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

/**
 * InterviewContext — isolated from AppContext to prevent "God Object" growth.
 *
 * State shape (also persisted to localStorage under INTERVIEW_LS_KEY):
 *   { experiences: InterviewExperience[] }
 *
 * Sync strategy:
 *   addExperience  → immediate Supabase write (two-table insert)
 *   updateAnswer   → localStorage immediate + 1.5 s debounced Supabase patch
 *   markReviewed   → localStorage immediate + immediate Supabase patch (toggle)
 *   deleteExperience → localStorage immediate + immediate Supabase delete
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../supabase/client'

const INTERVIEW_LS_KEY = 'fdp_interview_v1'

const DEFAULT_STATE = { experiences: [] }

// ─── localStorage helpers ─────────────────────────────────────────────────────

function loadLocal() {
  try {
    const raw = localStorage.getItem(INTERVIEW_LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveLocal(state) {
  try {
    localStorage.setItem(INTERVIEW_LS_KEY, JSON.stringify(state))
  } catch {
    // Storage unavailable — silently ignore
  }
}

// ─── Supabase helpers ─────────────────────────────────────────────────────────

async function fetchExperiences(userId) {
  try {
    const { data, error } = await supabase
      .from('interview_experiences')
      .select('*, interview_questions(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error || !data) return null

    return data.map((exp) => ({
      id:          exp.id,
      companyName: exp.company_name,
      rawText:     exp.raw_text,
      createdAt:   exp.created_at,
      questions:   (exp.interview_questions ?? []).map((q) => ({
        id:                q.id,
        questionText:      q.question_text,
        category:          q.category,
        aiGeneratedAnswer: q.ai_generated_answer,
        userEditedAnswer:  q.user_edited_answer ?? null,
        status:            q.status,
      })),
    }))
  } catch {
    return null
  }
}

async function insertExperience(userId, experience) {
  try {
    const { error: expErr } = await supabase
      .from('interview_experiences')
      .insert({
        id:           experience.id,
        user_id:      userId,
        company_name: experience.companyName,
        raw_text:     experience.rawText,
        created_at:   experience.createdAt,
      })
    if (expErr) throw expErr

    if (experience.questions.length > 0) {
      const { error: qErr } = await supabase
        .from('interview_questions')
        .insert(
          experience.questions.map((q) => ({
            id:                  q.id,
            experience_id:       experience.id,
            question_text:       q.questionText,
            category:            q.category,
            ai_generated_answer: q.aiGeneratedAnswer,
            user_edited_answer:  q.userEditedAnswer,
            status:              q.status,
          })),
        )
      if (qErr) throw qErr
    }
    return true
  } catch (err) {
    console.error('[InterviewContext] insertExperience failed — data saved locally only:', err)
    return false
  }
}

async function patchQuestion(questionId, patch) {
  try {
    await supabase
      .from('interview_questions')
      .update(patch)
      .eq('id', questionId)
  } catch (err) {
    console.error('[InterviewContext] patchQuestion failed:', err)
  }
}

async function insertQuestions(experienceId, questions) {
  if (!questions.length) return
  try {
    await supabase
      .from('interview_questions')
      .insert(
        questions.map((q) => ({
          id:                  q.id,
          experience_id:       experienceId,
          question_text:       q.questionText,
          category:            q.category,
          ai_generated_answer: q.aiGeneratedAnswer,
          user_edited_answer:  q.userEditedAnswer,
          status:              q.status,
        })),
      )
  } catch (err) {
    console.error('[InterviewContext] insertQuestions failed:', err)
  }
}

async function removeExperience(experienceId) {
  try {
    // interview_questions cascade-deletes via FK
    await supabase
      .from('interview_experiences')
      .delete()
      .eq('id', experienceId)
  } catch (err) {
    console.error('[InterviewContext] removeExperience failed:', err)
  }
}

/**
 * Merges cloud experiences with local ones.
 * If a cloud experience has 0 questions but local has questions for the same id,
 * the local questions are used (the cloud insert likely failed silently).
 * Returns { merged, toResync } where toResync is a list of experiences
 * whose questions need to be re-inserted into Supabase.
 */
function mergeWithLocal(cloudData, localData) {
  const localById = new Map(
    (localData?.experiences ?? []).map((exp) => [exp.id, exp]),
  )

  const toResync = []
  const merged = cloudData.map((cloudExp) => {
    if (cloudExp.questions.length > 0) return cloudExp
    const localExp = localById.get(cloudExp.id)
    if (localExp?.questions?.length > 0) {
      toResync.push({ id: cloudExp.id, questions: localExp.questions })
      return { ...cloudExp, questions: localExp.questions }
    }
    return cloudExp
  })

  return { merged, toResync }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export const InterviewContext = createContext(null)

export function InterviewProvider({ children, userId }) {
  const [state, setState] = useState(() => loadLocal() ?? DEFAULT_STATE)
  const [ready, setReady] = useState(!userId)

  // Per-question debounce timers for answer edits
  const answerTimers = useRef({})

  // When userId appears, load cloud data and merge over localStorage
  useEffect(() => {
    if (!userId) return
    setReady(false)
    fetchExperiences(userId).then((cloudData) => {
      if (cloudData === null) {
        // Fetch failed (network / auth error) — keep whatever is in localStorage
        setReady(true)
        return
      }

      if (cloudData.length > 0) {
        // Cloud has experiences — merge with local to recover any questions
        // that failed to sync (cloud experience rows exist but questions rows are missing)
        const local = loadLocal()
        const { merged, toResync } = mergeWithLocal(cloudData, local)
        const next = { experiences: merged }
        setState(next)
        saveLocal(next)
        // Re-insert any questions that made it locally but not to Supabase
        toResync.forEach(({ id, questions }) => insertQuestions(id, questions))
      } else {
        // Cloud returned empty — check if we have local experiences that failed to sync
        const local = loadLocal()
        const localExperiences = local?.experiences ?? []
        if (localExperiences.length > 0) {
          // Re-insert any local-only experiences back into Supabase
          localExperiences.forEach((exp) => insertExperience(userId, exp))
          // Keep local state; don't wipe it
        }
      }

      setReady(true)
    })
  }, [userId])

  // ─── Actions ───────────────────────────────────────────────────────────────

  /** Prepend a new fully-formed experience (with questions) to state. */
  const addExperience = useCallback(
    async (experience) => {
      setState((prev) => {
        const next = { ...prev, experiences: [experience, ...prev.experiences] }
        saveLocal(next)
        return next
      })
      if (userId) {
        await insertExperience(userId, experience)
      }
    },
    [userId],
  )

  /** Update the user-edited answer for a single question. Debounced Supabase save. */
  const updateAnswer = useCallback(
    (questionId, answer) => {
      setState((prev) => {
        const next = {
          ...prev,
          experiences: prev.experiences.map((exp) => ({
            ...exp,
            questions: exp.questions.map((q) =>
              q.id === questionId ? { ...q, userEditedAnswer: answer } : q,
            ),
          })),
        }
        saveLocal(next)
        return next
      })

      if (userId) {
        clearTimeout(answerTimers.current[questionId])
        answerTimers.current[questionId] = setTimeout(
          () => patchQuestion(questionId, { user_edited_answer: answer }),
          1500,
        )
      }
    },
    [userId],
  )

  /**
   * Toggle reviewed/unreviewed for a question.
   * We accept currentStatus from the caller so we can compute the new value
   * before setState and pass it directly to Supabase (no double-setState).
   */
  const markReviewed = useCallback(
    (questionId, currentStatus) => {
      const newStatus = currentStatus === 'reviewed' ? 'unreviewed' : 'reviewed'
      setState((prev) => {
        const next = {
          ...prev,
          experiences: prev.experiences.map((exp) => ({
            ...exp,
            questions: exp.questions.map((q) =>
              q.id === questionId ? { ...q, status: newStatus } : q,
            ),
          })),
        }
        saveLocal(next)
        return next
      })
      if (userId) {
        patchQuestion(questionId, { status: newStatus })
      }
    },
    [userId],
  )

  /** Delete an entire experience and all its questions. */
  const deleteExperience = useCallback(
    (experienceId) => {
      setState((prev) => {
        const next = {
          ...prev,
          experiences: prev.experiences.filter((e) => e.id !== experienceId),
        }
        saveLocal(next)
        return next
      })
      if (userId) {
        removeExperience(experienceId)
      }
    },
    [userId],
  )

  const value = useMemo(
    () => ({ state, ready, addExperience, updateAnswer, markReviewed, deleteExperience }),
    [state, ready, addExperience, updateAnswer, markReviewed, deleteExperience],
  )

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>
}

/** Convenience hook — throws if used outside provider. */
export function useInterview() {
  const ctx = useContext(InterviewContext)
  if (!ctx) throw new Error('useInterview must be used inside InterviewProvider')
  return ctx
}

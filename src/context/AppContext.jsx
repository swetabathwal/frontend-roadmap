import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../supabase/client'
import { DEFAULT_STATE, loadState, saveState } from '../utils/storage'
import { migrateProgressKeys } from '../utils/migrateKeys'

export const AppContext = createContext(null)

async function loadUserData(uid) {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('checked, notes, bookmarks, planner_tasks, dark')
      .eq('user_id', uid)
      .single()
    if (error || !data) return null
    return {
      checked:      data.checked,
      notes:        data.notes,
      bookmarks:    data.bookmarks,
      plannerTasks: data.planner_tasks,
      dark:         data.dark,
    }
  } catch {
    return null
  }
}

async function saveUserData(uid, state) {
  try {
    await supabase.from('user_progress').upsert({
      user_id:       uid,
      checked:       state.checked,
      notes:         state.notes,
      bookmarks:     state.bookmarks,
      planner_tasks: state.plannerTasks,
      dark:          state.dark,
      updated_at:    new Date().toISOString(),
    })
  } catch {
    // Silently fail — localStorage still holds the data
  }
}

export function AppProvider({ children, userId }) {
  const [state, setState] = useState(() => {
    const loaded = loadState()
    // Run key migration on whatever is in localStorage.
    // If keys are already slug-based this is a no-op; if they're title-based
    // they are converted. The migrated state is persisted back immediately.
    const raw      = { ...DEFAULT_STATE, ...(loaded ?? {}) }
    const migrated = migrateProgressKeys(raw)
    if (loaded) saveState(migrated) // persist migrated keys right away
    return migrated
  })

  // ready = false while we wait for Supabase to load the user's data
  const [ready, setReady] = useState(!userId)
  const saveTimer = useRef(null)

  // When userId appears (user logs in), load their data from Supabase
  useEffect(() => {
    if (!userId) return
    setReady(false)
    loadUserData(userId).then((data) => {
      if (data) {
        // Migrate cloud data too — handles accounts that had progress before
        // this refactor and whose Supabase rows still contain title-based keys.
        // Preserve interviewHistory from localStorage — it's local-only and
        // would be wiped if we spread Supabase data over the current state.
        const localInterviewHistory = loadState()?.interviewHistory ?? {}
        const migrated = migrateProgressKeys({
          ...DEFAULT_STATE,
          ...data,
          interviewHistory: localInterviewHistory,
        })
        setState(migrated)
        saveState(migrated)
        // Persist migrated keys back to Supabase so they don't migrate again
        saveUserData(userId, migrated)
      }
      setReady(true)
    })
  }, [userId])

  const update = useCallback((fnOrPatch) => {
    setState((prev) => {
      const next = typeof fnOrPatch === 'function' ? fnOrPatch(prev) : { ...prev, ...fnOrPatch }
      saveState(next) // immediate localStorage save
      if (userId) {
        // debounced Supabase save (1.5 s)
        clearTimeout(saveTimer.current)
        saveTimer.current = setTimeout(() => saveUserData(userId, next), 1500)
      }
      return next
    })
  }, [userId])

  const toggleDark = useCallback(() => update((s) => ({ ...s, dark: !s.dark })), [update])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.dark)
  }, [state.dark])

  const value = useMemo(
    () => ({ state, update, toggleDark, ready }),
    [state, update, toggleDark, ready],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/** Convenience hook — throws if used outside provider */
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

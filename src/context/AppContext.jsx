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
    const raw      = { ...DEFAULT_STATE, ...(loaded ?? {}) }
    const migrated = migrateProgressKeys(raw)
    if (loaded) saveState(migrated)
    return migrated
  })

  const [ready, setReady] = useState(!userId)
  const saveTimer = useRef(null)

  useEffect(() => {
    if (!userId) return
    setReady(false)
    loadUserData(userId).then((data) => {
      if (data) {
        const localInterviewHistory = loadState()?.interviewHistory ?? {}
        const migrated = migrateProgressKeys({
          ...DEFAULT_STATE,
          ...data,
          interviewHistory: localInterviewHistory,
        })
        setState(migrated)
        saveState(migrated)
        saveUserData(userId, migrated)
      }
      setReady(true)
    })
  }, [userId])

  const update = useCallback((fnOrPatch) => {
    setState((prev) => {
      const next = typeof fnOrPatch === 'function' ? fnOrPatch(prev) : { ...prev, ...fnOrPatch }
      saveState(next)
      if (userId) {
        clearTimeout(saveTimer.current)
        saveTimer.current = setTimeout(() => saveUserData(userId, next), 1500)
      }
      return next
    })
  }, [userId])

  const toggleDark = useCallback(() => update((s) => ({ ...s, dark: !s.dark })), [update])

  // Clean up pending save timer on unmount
  useEffect(() => () => clearTimeout(saveTimer.current), [])

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

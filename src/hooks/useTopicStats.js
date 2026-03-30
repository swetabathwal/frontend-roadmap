import { useMemo } from 'react'
import { LEVELS } from '../data/levels'
import { TOPICS } from '../data/topics'
import { useApp } from '../context/AppContext'

/** Returns completed/total counts for a single level */
export function useLevelStats(levelId) {
  const { state } = useApp()
  return useMemo(() => {
    const cats = TOPICS[levelId] ?? []
    let total = 0
    let done = 0
    cats.forEach((cat) =>
      cat.topics.forEach((t) => {
        total++
        if (state.checked[`${levelId}::${cat.cat}::${t.slug}`]) done++
      })
    )
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 }
  }, [state.checked, levelId])
}

/** Returns global stats across all levels */
export function useGlobalStats() {
  const { state } = useApp()
  return useMemo(() => {
    let total = 0
    let done = 0
    LEVELS.forEach(({ id }) => {
      const cats = TOPICS[id] ?? []
      cats.forEach((cat) =>
        cat.topics.forEach((t) => {
          total++
          if (state.checked[`${id}::${cat.cat}::${t.t}`]) done++
        })
      )
    })
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 }
  }, [state.checked])
}

/** Returns stats per category across all levels */
export function useCategoryStats() {
  const { state } = useApp()
  return useMemo(() => {
    const map = {}
    LEVELS.forEach(({ id }) => {
      const cats = TOPICS[id] ?? []
      cats.forEach((cat) => {
        if (!map[cat.cat]) map[cat.cat] = { total: 0, done: 0 }
        cat.topics.forEach((t) => {
          map[cat.cat].total++
          if (state.checked[`${id}::${cat.cat}::${t.t}`]) map[cat.cat].done++
        })
      })
    })
    return Object.fromEntries(
      Object.entries(map).map(([k, v]) => [k, { ...v, pct: v.total ? Math.round((v.done / v.total) * 100) : 0 }])
    )
  }, [state.checked])
}

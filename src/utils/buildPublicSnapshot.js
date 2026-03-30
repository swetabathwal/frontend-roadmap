import { LEVELS } from '../data/levels'
import { TOPICS } from '../data/topics'
import { CATEGORIES } from '../data/categories'

const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.name]))

function randomSlug() {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6)
}

/**
 * Builds the snapshot object that gets upserted to `public_profiles`.
 * Pure function — no side effects, no Supabase calls.
 *
 * @param {object}  state        AppContext state
 * @param {string}  userId       Supabase user UUID
 * @param {string}  displayName  User's display name or email
 * @param {string}  [existingSlug] If the user already has a profile, pass the
 *                               existing slug so the public URL stays stable.
 */
export function buildPublicSnapshot(state, userId, displayName, existingSlug) {
  let totalTopics = 0
  let completedTopics = 0
  const levelStats = {}
  const completedList = []

  LEVELS.forEach(({ id: levelId }) => {
    const cats = TOPICS[levelId] ?? []
    let levelTotal = 0
    let levelDone = 0

    cats.forEach((cat) => {
      cat.topics.forEach((topic) => {
        totalTopics++
        levelTotal++
        const key = `${levelId}::${cat.cat}::${topic.slug}`
        if (state.checked[key]) {
          completedTopics++
          levelDone++
          const rawNote = state.notes[key]?.trim() ?? null
          completedList.push({
            levelId,
            catId:      cat.cat,
            catName:    CAT_MAP[cat.cat] ?? cat.cat,
            topicTitle: topic.t,
            // Cap note length to avoid bloating the row
            note: rawNote ? rawNote.slice(0, 300) : null,
          })
        }
      })
    })

    levelStats[levelId] = {
      done:  levelDone,
      total: levelTotal,
      pct:   levelTotal ? Math.round((levelDone / levelTotal) * 100) : 0,
    }
  })

  const completionPct = totalTopics
    ? Math.round((completedTopics / totalTopics) * 100)
    : 0

  return {
    slug:             existingSlug ?? randomSlug(),
    user_id:          userId,
    display_name:     displayName,
    generated_at:     new Date().toISOString(),
    total_topics:     totalTopics,
    completed_topics: completedTopics,
    completion_pct:   completionPct,
    level_stats:      levelStats,
    completed_list:   completedList,
    notes_count:      completedList.filter((t) => t.note).length,
  }
}

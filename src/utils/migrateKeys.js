import { LEVELS } from '../data/levels'
import { TOPICS } from '../data/topics'

/**
 * Builds a complete Map of every known old title-based key → new slug-based key.
 *
 * Old format: "levelId::catId::Topic Title"
 * New format: "levelId::catId::slug"
 *
 * Built once and reused across migrateProgressKeys calls.
 */
function buildKeyMap() {
  const map = new Map()
  LEVELS.forEach(({ id: levelId }) => {
    const cats = TOPICS[levelId] ?? []
    cats.forEach((cat) => {
      cat.topics.forEach((topic) => {
        const oldKey = `${levelId}::${cat.cat}::${topic.t}`
        const newKey = `${levelId}::${cat.cat}::${topic.slug}`
        map.set(oldKey, newKey)
      })
    })
  })
  return map
}

const KEY_MAP = buildKeyMap()

/**
 * Rewrites every key in a flat record using KEY_MAP.
 *
 * - Old-format keys  → converted to slug-format key
 * - Already-slug keys → KEY_MAP.get() returns undefined → key kept as-is
 * - Unknown keys      → kept as-is (safe for future additions)
 *
 * This function is idempotent: running it twice produces the same result.
 */
function migrateRecord(record) {
  if (!record || typeof record !== 'object') return {}
  const result = {}
  for (const [key, value] of Object.entries(record)) {
    const newKey = KEY_MAP.get(key) ?? key
    result[newKey] = value
  }
  return result
}

/**
 * Runs key migration over the three progress maps in app state.
 * All other state fields are passed through unchanged.
 *
 * Safe to call on every app load — no-ops when keys are already slug-based.
 *
 * @param {object} state  Raw state (from localStorage or Supabase)
 * @returns {object}      State with migrated keys
 */
export function migrateProgressKeys(state) {
  return {
    ...state,
    checked:   migrateRecord(state.checked),
    notes:     migrateRecord(state.notes),
    bookmarks: migrateRecord(state.bookmarks),
  }
}

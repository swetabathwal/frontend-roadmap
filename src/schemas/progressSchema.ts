import { z } from 'zod'

/**
 * Composite key used throughout the app: "levelId::categoryId::topicTitle"
 * e.g. "junior::javascript::Variables & Scoping"
 */
const CompositeKeyRecord = z.record(z.string(), z.unknown())

/**
 * A single task in the Daily Planner.
 */
export const PlannerTaskSchema = z.object({
  id:   z.number({ invalid_type_error: 'Task id must be a number' }),
  text: z.string({ invalid_type_error: 'Task text must be a string' }).min(1, 'Task text cannot be empty'),
  done: z.boolean({ invalid_type_error: 'Task done must be a boolean' }),
  date: z
    .string({ invalid_type_error: 'Task date must be a string' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Task date must be in YYYY-MM-DD format'),
})

export type PlannerTask = z.infer<typeof PlannerTaskSchema>

/**
 * Full user progress schema.
 *
 * All fields are optional so that:
 *  - Partial exports (e.g. only `checked`) are accepted.
 *  - Old exports with removed fields (like `view`, `activeLevel`) are silently
 *    stripped rather than rejected.
 *
 * Unknown keys are stripped by default (z.object strips).
 */
export const ProgressSchema = z.object({
  checked: z
    .record(z.string(), z.boolean({ invalid_type_error: 'checked values must be booleans' }))
    .optional()
    .describe('Map of completed topic keys'),

  notes: z
    .record(z.string(), z.string({ invalid_type_error: 'notes values must be strings' }))
    .optional()
    .describe('Map of user notes per topic'),

  bookmarks: z
    .record(z.string(), z.boolean({ invalid_type_error: 'bookmarks values must be booleans' }))
    .optional()
    .describe('Map of bookmarked topic keys'),

  dark: z
    .boolean({ invalid_type_error: '"dark" must be true or false' })
    .optional()
    .describe('Dark mode preference'),

  activeCategory: z
    .string({ invalid_type_error: '"activeCategory" must be a string' })
    .optional()
    .describe('Currently selected category filter'),

  searchQuery: z
    .string({ invalid_type_error: '"searchQuery" must be a string' })
    .optional()
    .describe('Current search string'),

  plannerTasks: z
    .array(PlannerTaskSchema, { invalid_type_error: '"plannerTasks" must be an array' })
    .optional()
    .describe('Daily planner task list'),
})

export type ProgressData = z.infer<typeof ProgressSchema>

/**
 * Converts a ZodError into a short, human-readable string.
 * Shows up to 3 issues to avoid overwhelming the toast.
 */
export function formatZodError(error: z.ZodError): string {
  return error.errors
    .slice(0, 3)
    .map((issue) => {
      const path = issue.path.length ? issue.path.join('.') : 'root'
      return `${path}: ${issue.message}`
    })
    .join(' · ')
}

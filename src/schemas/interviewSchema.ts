import { z } from 'zod'

// ─── AI response validation ───────────────────────────────────────────────────
// Validates the JSON array returned by the process-interview edge function.
// Unknown fields are stripped (default z.object behavior).

export const INTERVIEW_CATEGORIES = [
  'JavaScript',
  'TypeScript',
  'React',
  'CSS',
  'HTML',
  'System Design',
  'Performance',
  'Testing',
  'Behavioral',
  'General',
] as const

export type InterviewCategory = (typeof INTERVIEW_CATEGORIES)[number]

/**
 * A single question extracted + answered by the AI.
 * Category is a loose string so the AI's near-miss values (e.g. "ReactJS")
 * survive Zod and get normalised on the frontend instead of hard-crashing.
 */
export const ExtractedQuestionSchema = z.object({
  question: z
    .string({ invalid_type_error: '"question" must be a string' })
    .min(5,    'Question is too short')
    .max(1000, 'Question exceeds 1000 characters'),
  category: z
    .string({ invalid_type_error: '"category" must be a string' })
    .min(1, 'Category cannot be empty')
    .max(50, 'Category name too long'),
  answer: z
    .string({ invalid_type_error: '"answer" must be a string' })
    .min(10,   'Answer is too short')
    .max(6000, 'Answer exceeds 6000 characters'),
})

export type ExtractedQuestion = z.infer<typeof ExtractedQuestionSchema>

export const ExtractedQuestionsSchema = z
  .array(ExtractedQuestionSchema, { invalid_type_error: 'AI response must be a JSON array' })
  .max(30, 'Too many questions returned (max 30)')

export type ExtractedQuestions = z.infer<typeof ExtractedQuestionsSchema>

// ─── Local state shapes ───────────────────────────────────────────────────────

export interface InterviewQuestion {
  id:                 string
  questionText:       string
  category:           string
  aiGeneratedAnswer:  string
  userEditedAnswer:   string | null
  status:             'reviewed' | 'unreviewed'
}

export interface InterviewExperience {
  id:          string
  companyName: string
  rawText:     string
  createdAt:   string
  questions:   InterviewQuestion[]
}

// ─── Normalise AI category to known values ────────────────────────────────────

const CATEGORY_ALIASES: Record<string, InterviewCategory> = {
  js:            'JavaScript',
  javascript:    'JavaScript',
  ts:            'TypeScript',
  typescript:    'TypeScript',
  reactjs:       'React',
  'react.js':    'React',
  scss:          'CSS',
  sass:          'CSS',
  'system design': 'System Design',
  'soft skills': 'Behavioral',
  hr:            'Behavioral',
  culture:       'Behavioral',
  'problem solving': 'General',
  algorithm:     'General',
  dsa:           'General',
}

export function normaliseCategory(raw: string): string {
  const lower = raw.toLowerCase().trim()
  return CATEGORY_ALIASES[lower] ?? raw
}

// ─── Error formatter (same pattern as progressSchema.ts) ─────────────────────

export function formatInterviewZodError(error: z.ZodError): string {
  return error.errors
    .slice(0, 3)
    .map((issue) => {
      const path = issue.path.length ? issue.path.join('.') : 'root'
      return `${path}: ${issue.message}`
    })
    .join(' · ')
}

export type MessageRole = 'user' | 'ai'

export interface InterviewMessage {
  id: string
  role: MessageRole
  text: string
  timestamp: number
  /** True while waiting for the AI reply — stripped before saving to history */
  pending?: boolean
}

export interface InterviewSession {
  id: string
  topicKey: string
  topicTitle: string
  seniority: string
  startedAt: number
  messages: InterviewMessage[]
}

/** Map of topicKey → array of sessions (most recent last) */
export type InterviewHistory = Record<string, InterviewSession[]>

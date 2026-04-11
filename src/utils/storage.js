const LS_KEY = 'fdp_state_v2'

export function loadState() {
  try {
    const serialized = localStorage.getItem(LS_KEY)
    return serialized ? JSON.parse(serialized) : null
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  } catch {
    // Storage unavailable
  }
}

export const DEFAULT_STATE = {
  checked: {},
  notes: {},
  bookmarks: {},
  dark: false,
  activeCategory: 'all',
  searchQuery: '',
  plannerTasks: [],
  interviewHistory: {},
  quizAttempts: {}, // { [topicKey]: number } — attempt count per topic
}

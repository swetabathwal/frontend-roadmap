import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const SENIORITY_DESC: Record<string, string> = {
  junior: 'Junior frontend developer (0–1 years) — focus on fundamentals and core syntax',
  mid:    'Mid-level frontend developer (1–3 years) — focus on depth, patterns, and independence',
  senior: 'Senior frontend developer (3–6 years) — focus on architecture, trade-offs, and performance',
  staff:  'Staff/Lead frontend developer (6+ years) — focus on system design, org impact, and strategy',
}

// Codes that indicate a transient/quota failure — try next provider
const RETRYABLE = new Set([429, 403, 500])

interface ChatMessage {
  role: 'user' | 'ai'
  text: string
}

interface ProviderResult {
  ok:     boolean
  status?: number
  reply?: string
  error?: string
}

// ─── Provider implementations ────────────────────────────────────────────────

async function callGemini(
  apiKey: string,
  system: string,
  chatMessages: ChatMessage[],
  isFirst: boolean,
): Promise<ProviderResult> {
  const contents = isFirst
    ? [{ role: 'user', parts: [{ text: 'Please begin the interview.' }] }]
    : chatMessages.map((m) => ({
        role:  m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }))

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents,
      }),
    },
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } }
    return { ok: false, status: res.status, error: err?.error?.message ?? `Gemini ${res.status}` }
  }

  const data = await res.json() as { candidates?: { content: { parts: { text: string }[] } }[] }
  return { ok: true, reply: data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '' }
}

async function callGroq(
  apiKey: string,
  system: string,
  chatMessages: ChatMessage[],
  isFirst: boolean,
): Promise<ProviderResult> {
  const messages = [
    { role: 'system', content: system },
    ...(isFirst
      ? [{ role: 'user', content: 'Please begin the interview.' }]
      : chatMessages.map((m) => ({
          role:    m.role === 'ai' ? 'assistant' : 'user',
          content: m.text,
        }))),
  ]

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'content-type':  'application/json',
    },
    body: JSON.stringify({
      model:      'llama-3.3-70b-versatile',
      messages,
      max_tokens: 1024,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } }
    return { ok: false, status: res.status, error: err?.error?.message ?? `Groq ${res.status}` }
  }

  const data = await res.json() as { choices?: { message: { content: string } }[] }
  return { ok: true, reply: data?.choices?.[0]?.message?.content ?? '' }
}

// ─── Provider registry ────────────────────────────────────────────────────────

interface Provider {
  name:   string
  envKey: string
  call:   (key: string, system: string, msgs: ChatMessage[], isFirst: boolean) => Promise<ProviderResult>
}

const PROVIDERS: Provider[] = [
  {
    name:   'Gemini Key 1',
    envKey: 'GEMINI_API_KEY_1',
    call:   (key, sys, msgs, isFirst) => callGemini(key, sys, msgs, isFirst),
  },
  {
    name:   'Gemini Key 2',
    envKey: 'GEMINI_API_KEY_2',
    call:   (key, sys, msgs, isFirst) => callGemini(key, sys, msgs, isFirst),
  },
  {
    name:   'Groq',
    envKey: 'GROQ_API_KEY',
    call:   (key, sys, msgs, isFirst) => callGroq(key, sys, msgs, isFirst),
  },
]

// ─── Main handler ─────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'Unauthorized' }, 401)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    )
    const { data: { user }, error: authErr } = await supabase.auth.getUser()
    if (authErr || !user) return json({ error: 'Unauthorized' }, 401)

    const { topicTitle, userSeniority, messages = [] } = await req.json() as {
      topicTitle:    string
      userSeniority: string
      messages:      ChatMessage[]
    }

    if (!topicTitle?.trim()) return json({ error: 'topicTitle is required' }, 400)

    const seniorityDesc = SENIORITY_DESC[userSeniority] ?? `${userSeniority} frontend developer`

    const system = `You are an expert technical interviewer conducting a mock interview for a frontend developer.

Topic: "${topicTitle}"
Candidate level: ${seniorityDesc}

Rules you must follow:
1. Ask exactly 3 technical questions about "${topicTitle}", one at a time.
2. Calibrate difficulty and depth for the stated seniority level.
3. After each candidate answer, provide concise feedback (2–4 sentences):
   - What they got right
   - What was missing or could be stronger
   - One key insight or concept to remember
4. After the 3rd answer+feedback, close with an **Overall Summary** (3–5 sentences) covering their overall performance and top areas to study.
5. Be encouraging but honest. Ask practical, real-world questions only.

Formatting:
- Each question: **Question N/3:** [question text]
- Each feedback block: **Feedback:** [feedback text]
- Final summary: **Overall Summary:** [summary text]

Do not ask multiple questions at once. Wait for the candidate to answer before moving on.`

    const isFirst = messages.length === 0

    for (const provider of PROVIDERS) {
      const apiKey = Deno.env.get(provider.envKey)
      if (!apiKey) {
        console.warn(`[mock-interview] ${provider.name}: secret ${provider.envKey} not set — skipping`)
        continue
      }

      const result = await provider.call(apiKey, system, messages, isFirst)

      if (result.ok) {
        console.log(`[mock-interview] ${provider.name}: success`)
        return json({ reply: result.reply })
      }

      if (result.status && RETRYABLE.has(result.status)) {
        console.warn(`[mock-interview] ${provider.name}: ${result.status} — ${result.error} — trying next provider`)
        continue
      }

      // Non-retryable error (e.g. 400 bad request) — log and still try next
      console.error(`[mock-interview] ${provider.name}: non-retryable ${result.status} — ${result.error} — trying next provider`)
    }

    return json(
      { error: 'All AI providers are currently unavailable. Please try again in a moment.' },
      503,
    )

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected server error'
    console.error('[mock-interview]', message)
    return json({ error: message }, 500)
  }
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
}

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const RETRYABLE = new Set([429, 403, 500, 503])

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExtractedQuestion {
  question: string
  category: string
  answer:   string
}

interface ProviderResult {
  ok:      boolean
  status?: number
  text?:   string
  error?:  string
}

// ─── System prompt ────────────────────────────────────────────────────────────

function buildSystemPrompt(): string {
  return `You are a senior frontend developer and technical interview coach.

Your task: analyze a raw "interview experience" post (from LinkedIn, Glassdoor, etc.) and extract specific questions that were asked.

CRITICAL: Your entire response must be ONLY a valid JSON array — no markdown fences, no explanation, no text before or after the JSON.

For each extracted question, write a comprehensive senior-level answer (150–250 words) covering key concepts, trade-offs, and practical examples.

Output format (strict JSON array):
[
  {
    "question": "Exact question as asked during the interview",
    "category": "One of: JavaScript, TypeScript, React, CSS, HTML, System Design, Performance, Testing, Behavioral, General",
    "answer": "A detailed, senior-level answer demonstrating deep expertise"
  }
]

Rules:
1. Extract ONLY specific questions mentioned in the post — do not invent questions.
2. Include both technical AND behavioral questions.
3. Use "Behavioral" for culture-fit / soft-skill questions.
4. Use "General" for anything that doesn't fit another category.
5. Return [] (empty array) if no clear questions can be identified.
6. Maximum 20 questions.
7. Answers must be practical, demonstrate real-world depth, and address trade-offs.`
}

// ─── JSON extraction helper ───────────────────────────────────────────────────
// AI occasionally wraps output in markdown fences even when told not to.

function extractJsonText(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenced) return fenced[1].trim()
  // Find the first '[' and last ']' as a fallback
  const start = raw.indexOf('[')
  const end   = raw.lastIndexOf(']')
  if (start !== -1 && end !== -1 && end > start) return raw.slice(start, end + 1)
  return raw.trim()
}

// ─── Provider implementations ─────────────────────────────────────────────────

async function callGemini(
  apiKey: string,
  system: string,
  rawText: string,
): Promise<ProviderResult> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: rawText }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      }),
    },
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } }
    return { ok: false, status: res.status, error: err?.error?.message ?? `Gemini ${res.status}` }
  }

  const data = await res.json() as { candidates?: { content: { parts: { text: string }[] } }[] }
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  return { ok: true, text }
}

async function callGroq(
  apiKey: string,
  system: string,
  rawText: string,
): Promise<ProviderResult> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'content-type':  'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system',    content: system },
        { role: 'user',      content: rawText },
      ],
      max_tokens:  4096,
      temperature: 0.3,
      response_format: { type: 'json_object' },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } }
    return { ok: false, status: res.status, error: err?.error?.message ?? `Groq ${res.status}` }
  }

  const data = await res.json() as { choices?: { message: { content: string } }[] }
  // Groq json_object mode wraps arrays — unwrap if needed
  const raw = data?.choices?.[0]?.message?.content ?? ''
  let text = raw
  try {
    const parsed = JSON.parse(raw)
    // If Groq returned { questions: [...] } or { data: [...] }, unwrap it
    if (parsed && !Array.isArray(parsed)) {
      const firstArrayKey = Object.values(parsed).find(Array.isArray)
      if (firstArrayKey) text = JSON.stringify(firstArrayKey)
    }
  } catch { /* leave text as-is */ }
  return { ok: true, text }
}

// ─── Provider registry ────────────────────────────────────────────────────────

interface Provider {
  name:   string
  envKey: string
  call:   (key: string, system: string, rawText: string) => Promise<ProviderResult>
}

const PROVIDERS: Provider[] = [
  {
    name:   'Gemini Key 1',
    envKey: 'GEMINI_API_KEY_1',
    call:   (key, sys, text) => callGemini(key, sys, text),
  },
  {
    name:   'Gemini Key 2',
    envKey: 'GEMINI_API_KEY_2',
    call:   (key, sys, text) => callGemini(key, sys, text),
  },
  {
    name:   'Groq',
    envKey: 'GROQ_API_KEY',
    call:   (key, sys, text) => callGroq(key, sys, text),
  },
]

// ─── Main handler ─────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })
  if (req.method !== 'POST')    return json({ error: 'Method not allowed' }, 405)

  try {
    // Auth check — same pattern as mock-interview
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'Unauthorized' }, 401)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    )
    const { data: { user }, error: authErr } = await supabase.auth.getUser()
    if (authErr || !user) return json({ error: 'Unauthorized' }, 401)

    // Parse body
    const { rawText, companyName } = await req.json() as {
      rawText:     string
      companyName: string
    }

    if (!rawText?.trim())     return json({ error: 'rawText is required' }, 400)
    if (!companyName?.trim()) return json({ error: 'companyName is required' }, 400)
    if (rawText.length > 20000) return json({ error: 'rawText exceeds 20,000 character limit' }, 400)

    const system = buildSystemPrompt()

    // Try each provider in order
    for (const provider of PROVIDERS) {
      const apiKey = Deno.env.get(provider.envKey)
      if (!apiKey) {
        console.warn(`[process-interview] ${provider.name}: secret ${provider.envKey} not set — skipping`)
        continue
      }

      const result = await provider.call(apiKey, system, rawText)

      if (!result.ok) {
        const shouldRetry = result.status && RETRYABLE.has(result.status)
        console.warn(`[process-interview] ${provider.name}: ${result.status} — ${result.error} — ${shouldRetry ? 'trying next' : 'trying next anyway'}`)
        continue
      }

      // Parse the AI response
      const jsonText = extractJsonText(result.text ?? '')
      let questions: ExtractedQuestion[]

      try {
        const parsed = JSON.parse(jsonText)
        if (!Array.isArray(parsed)) throw new Error('Response is not a JSON array')
        // Basic shape validation — filter out malformed items
        questions = parsed.filter(
          (item): item is ExtractedQuestion =>
            item &&
            typeof item.question === 'string' && item.question.trim().length > 0 &&
            typeof item.category === 'string' && item.category.trim().length > 0 &&
            typeof item.answer   === 'string' && item.answer.trim().length   > 0,
        )
      } catch (parseErr) {
        console.error(`[process-interview] ${provider.name}: JSON parse failed —`, parseErr)
        continue // try next provider
      }

      console.log(`[process-interview] ${provider.name}: success — ${questions.length} questions extracted`)
      return json({ questions })
    }

    return json(
      { error: 'All AI providers are currently unavailable. Please try again in a moment.' },
      503,
    )

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected server error'
    console.error('[process-interview]', message)
    return json({ error: message }, 500)
  }
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
}

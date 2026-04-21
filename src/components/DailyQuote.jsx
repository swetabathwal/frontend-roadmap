const QUOTES = [
  { q: 'The expert in anything was once a beginner.',          a: 'Helen Hayes' },
  { q: 'Small progress each day adds up to big results.',      a: 'Unknown' },
  { q: 'Code is like humor. When you have to explain it, it is bad.', a: 'Cory House' },
  { q: 'First, solve the problem. Then, write the code.',      a: 'John Johnson' },
  { q: 'Simplicity is the soul of efficiency.',                a: 'Austin Freeman' },
  { q: 'Learning never exhausts the mind.',                    a: 'Leonardo da Vinci' },
  { q: 'The best way to predict the future is to implement it.', a: 'David Heinemeier Hansson' },
  { q: 'Consistency beats intensity, every single time.',      a: 'Unknown' },
  { q: 'You do not have to be great to start, but you have to start to be great.', a: 'Zig Ziglar' },
  { q: 'The only way to do great work is to love what you do.', a: 'Steve Jobs' },
  { q: 'Debugging is twice as hard as writing the code in the first place.', a: 'Brian Kernighan' },
  { q: 'Readability counts.',                                  a: 'Tim Peters' },
]

function todayIndex() {
  const d = new Date()
  const seed = d.getFullYear() * 1000 + d.getMonth() * 40 + d.getDate()
  return seed % QUOTES.length
}

export function DailyQuote() {
  const { q, a } = QUOTES[todayIndex()]
  return (
    <div className="card p-4 flex items-start gap-3 animate-fade-in-up delay-150 focus-dim">
      <div
        aria-hidden="true"
        className="text-3xl leading-none select-none text-indigo-400 dark:text-indigo-500 font-serif"
      >
        &ldquo;
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">{q}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">&mdash; {a}</p>
      </div>
    </div>
  )
}

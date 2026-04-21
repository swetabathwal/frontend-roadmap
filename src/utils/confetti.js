/**
 * Fire a short burst of confetti anchored near the given DOM element.
 * Pure DOM — no dependency. Safe no-op if document is unavailable (SSR).
 */
const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#0EA5E9', '#A855F7']

export function burstConfetti(anchorEl, count = 28) {
  if (typeof document === 'undefined') return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

  const rect = anchorEl?.getBoundingClientRect?.()
  const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
  const originY = rect ? rect.top  + rect.height / 2 : 80

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span')
    piece.className = 'confetti-piece'
    const angle    = (Math.random() * Math.PI) - Math.PI / 2  // upward-ish spread
    const distance = 120 + Math.random() * 220
    const dx       = Math.cos(angle) * distance
    const rotation = (Math.random() * 720 - 360) + 'deg'
    piece.style.left  = `${originX}px`
    piece.style.top   = `${originY}px`
    piece.style.background = COLORS[i % COLORS.length]
    piece.style.setProperty('--dx',  `${dx}px`)
    piece.style.setProperty('--rot', rotation)
    piece.style.animationDelay = `${Math.random() * 120}ms`
    piece.style.animationDuration = `${1.3 + Math.random() * 0.9}s`
    document.body.appendChild(piece)
    setTimeout(() => piece.remove(), 2600)
  }
}

const PATHS = {
  check: (
    <path d="M20 6L9 17l-5-5" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  bookmark: (
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" fill="none" strokeWidth="2" />
  ),
  bookmarkFill: (
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" fill="currentColor" strokeWidth="2" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="5" stroke="currentColor" fill="none" strokeWidth="2" />
      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  moon: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" fill="none" strokeWidth="2" />,
  search: (
    <>
      <circle cx="11" cy="11" r="8" stroke="currentColor" fill="none" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  download: (
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  upload: (
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  note: (
    <>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" fill="none" strokeWidth="2" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  external: (
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chart: (
    <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" stroke="currentColor" fill="none" strokeWidth="2" rx="1" />
      <rect x="14" y="3" width="7" height="7" stroke="currentColor" fill="none" strokeWidth="2" rx="1" />
      <rect x="3" y="14" width="7" height="7" stroke="currentColor" fill="none" strokeWidth="2" rx="1" />
      <rect x="14" y="14" width="7" height="7" stroke="currentColor" fill="none" strokeWidth="2" rx="1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" fill="none" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" />
    </>
  ),
  arrowLeft: (
    <path d="M19 12H5m7-7l-7 7 7 7" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  trash: (
    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" fill="none" strokeWidth="2" />
  ),
  plus: <path d="M12 5v14m-7-7h14" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />,
  x: <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />,
  list: (
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
  ),
  logout: (
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  send: (
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  mic: (
    <>
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" fill="none" strokeWidth="2" />
      <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  share: (
    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  verified: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" fill="none" strokeWidth="2" />
      <circle cx="4" cy="4" r="2" stroke="currentColor" fill="none" strokeWidth="2" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" fill="none" strokeWidth="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" fill="none" strokeWidth="2" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7v0A2.5 2.5 0 012 9.5v5A2.5 2.5 0 004.5 17v0A2.5 2.5 0 007 19.5v0A2.5 2.5 0 009.5 22h5a2.5 2.5 0 002.5-2.5v0a2.5 2.5 0 002.5-2.5v0A2.5 2.5 0 0022 14.5v-5A2.5 2.5 0 0019.5 7v0A2.5 2.5 0 0017 4.5v0A2.5 2.5 0 0014.5 2h-5z" stroke="currentColor" fill="none" strokeWidth="2" />
      <path d="M12 6v12M6 12h12" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8L19 3z" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 17l.6 1.4L7 19l-1.4.6L5 21l-.6-1.4L3 19l1.4-.6L5 17z" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" fill="none" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" strokeWidth="2" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.73 10.73a3 3 0 004.24 4.24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  pencil: (
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chevronDown: (
    <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chevronUp: (
    <path d="M18 15l-6-6-6 6" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
}

/**
 * @param {{ name: keyof typeof PATHS, size?: number, className?: string }} props
 */
export function Icon({ name, size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}

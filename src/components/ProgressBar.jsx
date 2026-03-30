/**
 * Reusable animated progress bar.
 * @param {{ pct: number, color?: string, height?: string, className?: string }} props
 */
export function ProgressBar({ pct, color = '#6366F1', height = '8px', className = '' }) {
  return (
    <div
      className={`progress-bar ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="progress-fill"
        style={{ width: `${pct}%`, background: color, height }}
      />
    </div>
  )
}

import { PR_BADGE_STYLES } from './constants'

interface PRBadgeProps {
  pr: number
}

export function PRBadge({ pr }: PRBadgeProps) {
  const prNumber = String(pr).padStart(3, '0')

  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-mono"
      style={{
        backgroundColor: PR_BADGE_STYLES.bg,
        color: PR_BADGE_STYLES.text,
      }}
    >
      #PR-{prNumber}
    </span>
  )
}

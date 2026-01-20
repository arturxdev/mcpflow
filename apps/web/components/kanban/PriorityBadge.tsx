import { Priority } from '@repo/core'
import { PRIORITY_STYLES } from './constants'

interface PriorityBadgeProps {
  priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const styles = PRIORITY_STYLES[priority]

  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-medium capitalize"
      style={{
        backgroundColor: styles.bg,
        color: styles.text,
      }}
    >
      {priority}
    </span>
  )
}

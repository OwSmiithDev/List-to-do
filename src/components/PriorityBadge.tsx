import type { Priority } from '../types'
import { PRIORITY_CONFIG } from '../types'

interface Props {
  priority: Priority
  size?: 'sm' | 'md'
}

export function PriorityBadge({ priority, size = 'md' }: Props) {
  const { label, badgeClass } = PRIORITY_CONFIG[priority]
  const textSize = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'

  return (
    <span className={`${textSize} ${badgeClass} font-medium rounded-full whitespace-nowrap`}>
      {label}
    </span>
  )
}

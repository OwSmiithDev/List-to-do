const AVATAR_COLORS = [
  'bg-violet-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-amber-500',
  'bg-rose-500',
]

function getColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

interface Props {
  name: string
  size?: 'sm' | 'md'
}

export function Avatar({ name, size = 'md' }: Props) {
  if (!name) return null
  const color = getColor(name)
  const initials = getInitials(name)
  const dim = size === 'sm' ? 'w-6 h-6 text-[10px]' : 'w-7 h-7 text-xs'

  return (
    <div
      title={name}
      aria-label={name}
      className={`${dim} ${color} rounded-full flex items-center justify-center font-semibold text-white shrink-0 select-none`}
    >
      {initials}
    </div>
  )
}

import { getTierColor, getTierBg } from '../utils/riskEngine'

export default function RiskBadge({ tier, size = 'md', pulse = false }) {
  const color = getTierColor(tier)
  const bg = getTierBg(tier)

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-full
        ${sizes[size]}
        ${pulse && tier === 'Extreme' ? 'pulse-extreme' : ''}
      `}
      style={{
        color,
        backgroundColor: bg,
        border: `1px solid ${color}30`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {tier}
    </span>
  )
}

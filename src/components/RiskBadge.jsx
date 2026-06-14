import { getTierColor, getTierBg } from '../utils/riskEngine'

export default function RiskBadge({ tier, size = 'md', pulse = false }) {
  const color = getTierColor(tier)
  const bg = getTierBg(tier)

  const sizes = {
    sm: 'px-2 py-0.5 text-[9px] gap-1',
    md: 'px-2.5 py-1 text-[10px] gap-1.5',
    lg: 'px-3.5 py-1.5 text-[11px] gap-1.5',
  }

  return (
    <span
      className={`
        inline-flex items-center font-bold uppercase tracking-[0.1em] rounded-full
        transition-all duration-200 flex-shrink-0
        ${sizes[size]}
        ${pulse && tier === 'Extreme' ? 'pulse-extreme' : ''}
      `}
      style={{
        color,
        backgroundColor: bg,
        border: `1px solid ${color}25`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      {tier}
    </span>
  )
}

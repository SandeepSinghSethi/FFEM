import { useEffect, useState } from 'react'
import { getTierColor } from '../utils/riskEngine'
import RiskBadge from './RiskBadge'
import { Droplets, Mountain, TrendingUp, Clock } from 'lucide-react'

export default function RiskScoreCard({ district }) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const target = district.riskScore
    const duration = 1500
    const startTime = performance.now()

    function animate(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedScore(eased * target)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [district.riskScore])

  const tierColor = getTierColor(district.tier)
  const circumference = 2 * Math.PI * 50
  const dashOffset = circumference - (animatedScore * circumference)

  const pills = [
    { icon: Droplets, label: 'Rainfall', value: `${district.rainfallMm} mm`, color: '#60a5fa' },
    { icon: Mountain, label: 'Slope', value: `${district.slopeDeg}°`, color: '#f59e0b' },
    { icon: TrendingUp, label: 'Elevation', value: `${district.elevationM} m`, color: '#a78bfa' },
  ]

  return (
    <div className="glass-surface p-5 sm:p-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-2">
            Risk Assessment
          </h3>
          <div className="flex items-center gap-2.5">
            <RiskBadge tier={district.tier} size="lg" pulse />
            <div className="flex items-center gap-1 text-white/30 text-[11px]">
              <Clock className="w-3 h-3" />
              <span>{district.forecastWindowHours}h window</span>
            </div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5ed29c]/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5ed29c] ticker-live" />
          <span className="text-[9px] font-bold text-[#5ed29c] uppercase tracking-[0.15em]">
            Live
          </span>
        </div>
      </div>

      {/* Score ring + pills */}
      <div className="flex items-center gap-5">
        <div className="relative w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] flex-shrink-0">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 120 120"
            className="-rotate-90"
          >
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="7"
            />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke={tierColor}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="score-ring"
              style={{ filter: `drop-shadow(0 0 8px ${tierColor}30)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-2xl sm:text-3xl font-black"
              style={{ color: tierColor }}
            >
              {animatedScore.toFixed(2)}
            </span>
            <span className="text-[9px] text-white/30 uppercase tracking-[0.15em] mt-0.5">Score</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {pills.map(pill => (
            <div
              key={pill.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.025] border border-white/[0.04] transition-colors duration-200 hover:bg-white/[0.04]"
            >
              <pill.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: pill.color }} />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] text-white/30 uppercase tracking-[0.12em] block leading-tight">
                  {pill.label}
                </span>
                <span className="text-[13px] font-semibold text-white">{pill.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

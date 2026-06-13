import { useEffect, useState } from 'react'
import { getTierColor } from '../utils/riskEngine'
import RiskBadge from './RiskBadge'
import { Droplets, Mountain, TrendingUp, Clock } from 'lucide-react'

export default function RiskScoreCard({ district }) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    let start = 0
    const target = district.riskScore
    const duration = 1500
    const startTime = performance.now()

    function animate(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
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
    <div className="glass-surface p-6 animate-fade-in-up">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-1">
            Risk Assessment
          </h3>
          <div className="flex items-center gap-3">
            <RiskBadge tier={district.tier} size="lg" pulse />
            <div className="flex items-center gap-1 text-white/40 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{district.forecastWindowHours}h window</span>
            </div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#5ed29c] ticker-live" />
          <span className="text-[10px] font-semibold text-[#5ed29c] uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      {/* Score ring */}
      <div className="flex items-center gap-6 my-6">
        <div className="relative w-[120px] h-[120px] flex-shrink-0">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="-rotate-90"
          >
            {/* Background ring */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="8"
            />
            {/* Score ring */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke={tierColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="score-ring"
              style={{ filter: `drop-shadow(0 0 6px ${tierColor}40)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-3xl font-black"
              style={{ color: tierColor }}
            >
              {animatedScore.toFixed(2)}
            </span>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Score</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {pills.map(pill => (
            <div
              key={pill.label}
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]"
            >
              <pill.icon className="w-4 h-4 flex-shrink-0" style={{ color: pill.color }} />
              <div className="flex-1">
                <span className="text-[10px] text-white/40 uppercase tracking-wider block">
                  {pill.label}
                </span>
                <span className="text-sm font-semibold text-white">{pill.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

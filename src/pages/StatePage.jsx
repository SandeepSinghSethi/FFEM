import { useParams, useNavigate } from 'react-router-dom'
import { stateById } from '../data/states'
import { getDistrictsByState } from '../data/districts'
import Breadcrumb from '../components/Breadcrumb'
import RiskBadge from '../components/RiskBadge'
import ForecastBar from '../components/ForecastBar'
import { getTierColor } from '../utils/riskEngine'
import { ArrowRight, Users, Droplets, Mountain, TrendingUp } from 'lucide-react'

export default function StatePage() {
  const { stateId } = useParams()
  const navigate = useNavigate()
  const state = stateById[stateId]
  const stateDistricts = getDistrictsByState(stateId)

  if (!state) {
    return (
      <div className="page-wrapper flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
            <Mountain className="w-7 h-7 text-white/20" />
          </div>
          <h2 className="text-xl font-bold text-white/60 mb-2">State Not Found</h2>
          <p className="text-sm text-white/35 max-w-sm">
            The requested state could not be found in the monitoring system.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <div className="page-container">
        <Breadcrumb
          items={[
            { label: 'National', to: '/map' },
            { label: state.name },
          ]}
        />

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 animate-fade-in-up animate-delay-100">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-white">{state.name}</h1>
              <RiskBadge tier={state.highestTier} size="lg" pulse={state.highestTier === 'Extreme'} />
            </div>
            <p className="text-sm text-white/45 leading-relaxed">
              {state.districtCount} districts monitored · {state.peopleAtRisk.toLocaleString()} people at risk
            </p>
          </div>

          {/* Summary pills */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {state.extremeCount > 0 && (
              <div className="stat-pill" style={{ borderColor: 'rgba(255,68,68,0.2)', background: 'rgba(255,68,68,0.06)' }}>
                <span className="w-2 h-2 rounded-full bg-[#ff4444] pulse-extreme" />
                <span className="text-[#ff4444] font-bold">{state.extremeCount} Extreme</span>
              </div>
            )}
            {state.highCount > 0 && (
              <div className="stat-pill" style={{ borderColor: 'rgba(255,140,0,0.2)', background: 'rgba(255,140,0,0.06)' }}>
                <span className="w-2 h-2 rounded-full bg-[#ff8c00]" />
                <span className="text-[#ff8c00] font-bold">{state.highCount} High</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Section label ── */}
        <div className="section-label animate-fade-in-up animate-delay-200">
          <span>District Overview</span>
        </div>

        {/* ── District cards ── */}
        <div className="space-y-3">
          {stateDistricts.map((district, i) => (
            <button
              key={district.id}
              onClick={() => navigate(`/district/${district.id}`)}
              className="w-full glass-surface p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#5ed29c]/20 transition-all duration-300 group animate-fade-in-up text-left"
              style={{ animationDelay: `${250 + i * 80}ms` }}
              id={`district-card-${district.id}`}
            >
              {/* Left section */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Score */}
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: getTierColor(district.tier) + '12' }}
                >
                  <span
                    className="text-lg sm:text-xl font-black"
                    style={{ color: getTierColor(district.tier) }}
                  >
                    {district.riskScore}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">{district.name}</h3>
                    <RiskBadge tier={district.tier} size="sm" pulse={district.tier === 'Extreme'} />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-white/35">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-blue-400/50" />
                      {district.rainfallMm} mm
                    </span>
                    <span className="flex items-center gap-1">
                      <Mountain className="w-3 h-3 text-amber-400/50" />
                      {district.slopeDeg}°
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-purple-400/50" />
                      {district.elevationM} m
                    </span>
                  </div>
                </div>
              </div>

              {/* Forecast chart */}
              <div className="w-full sm:w-44 md:w-52 flex-shrink-0">
                <div className="text-[9px] text-white/25 uppercase tracking-[0.12em] font-semibold mb-1">
                  6h Forecast
                </div>
                <ForecastBar forecast={district.forecast} tier={district.tier} />
              </div>

              {/* Arrow */}
              <ArrowRight className="w-4 h-4 text-white/15 group-hover:text-[#5ed29c] group-hover:translate-x-0.5 transition-all duration-300 hidden sm:block flex-shrink-0" />
            </button>
          ))}
        </div>

        <div className="footer-line">
          FlashFlood Matrix · {state.name}
        </div>
      </div>
    </div>
  )
}

import { useParams, useNavigate } from 'react-router-dom'
import { stateById } from '../data/states'
import { getDistrictsByState } from '../data/districts'
import Breadcrumb from '../components/Breadcrumb'
import RiskBadge from '../components/RiskBadge'
import ForecastBar from '../components/ForecastBar'
import { getTierColor } from '../utils/riskEngine'
import { ArrowRight, Users, TrendingUp } from 'lucide-react'

export default function StatePage() {
  const { stateId } = useParams()
  const navigate = useNavigate()
  const state = stateById[stateId]
  const stateDistricts = getDistrictsByState(stateId)

  if (!state) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white/60 mb-2">State Not Found</h2>
          <p className="text-sm text-white/40">The requested state could not be found in the monitoring system.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
        <Breadcrumb
          items={[
            { label: 'National', to: '/map' },
            { label: state.name },
          ]}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-black text-white">{state.name}</h1>
              <RiskBadge tier={state.highestTier} size="lg" pulse={state.highestTier === 'Extreme'} />
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              {state.districtCount} districts monitored · {state.peopleAtRisk.toLocaleString()} people at risk
            </p>
          </div>

          {/* Summary pills */}
          <div className="flex items-center gap-3">
            {state.extremeCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff4444]/10 border border-[#ff4444]/20">
                <span className="w-2 h-2 rounded-full bg-[#ff4444] pulse-extreme" />
                <span className="text-xs font-bold text-[#ff4444]">
                  {state.extremeCount} Extreme
                </span>
              </div>
            )}
            {state.highCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff8c00]/10 border border-[#ff8c00]/20">
                <span className="w-2 h-2 rounded-full bg-[#ff8c00]" />
                <span className="text-xs font-bold text-[#ff8c00]">
                  {state.highCount} High
                </span>
              </div>
            )}
          </div>
        </div>

        {/* District cards */}
        <div className="space-y-4">
          {stateDistricts.map((district, i) => (
            <button
              key={district.id}
              onClick={() => navigate(`/district/${district.id}`)}
              className="w-full glass-surface p-7 flex flex-col md:flex-row md:items-center gap-5 hover:border-[#5ed29c]/20 transition-all group animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
              id={`district-card-${district.id}`}
            >
              {/* Left section */}
              <div className="flex items-center gap-5 flex-1 min-w-0">
                {/* Score */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: getTierColor(district.tier) + '15' }}
                >
                  <span
                    className="text-xl font-black"
                    style={{ color: getTierColor(district.tier) }}
                  >
                    {district.riskScore}
                  </span>
                </div>

                <div className="text-left min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-lg font-bold text-white truncate">{district.name}</h3>
                    <RiskBadge tier={district.tier} size="sm" pulse={district.tier === 'Extreme'} />
                  </div>
                  <div className="flex items-center gap-5 text-xs text-white/40">
                    <span>Rainfall: {district.rainfallMm} mm</span>
                    <span>Slope: {district.slopeDeg}°</span>
                    <span>Elevation: {district.elevationM} m</span>
                  </div>
                </div>
              </div>

              {/* Forecast chart */}
              <div className="w-full md:w-52 flex-shrink-0">
                <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1.5">
                  6h Forecast
                </div>
                <ForecastBar forecast={district.forecast} tier={district.tier} />
              </div>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-[#5ed29c] transition-colors hidden md:block flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

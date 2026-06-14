import { MapPin, Navigation, ArrowUpRight, Clock, ChevronRight } from 'lucide-react'
import { getTierColor } from '../utils/riskEngine'

export default function EvacuationMatrix({ zones, selectedZone, onSelectZone, tier }) {
  const tierColor = getTierColor(tier)

  return (
    <div className="glass-surface p-5 sm:p-6 animate-fade-in-up animate-delay-200">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em]">
          Evacuation Matrix
        </h3>
        <span className="text-[10px] text-white/20 font-mono px-2 py-0.5 rounded bg-white/[0.03]">
          {zones.length} routes
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-2.5 px-3 text-[10px] text-white/25 uppercase tracking-[0.12em] font-bold">
                Flood Zone
              </th>
              <th className="text-left py-2.5 px-3 text-[10px] text-white/25 uppercase tracking-[0.12em] font-bold">
                Safe Zone
              </th>
              <th className="text-right py-2.5 px-3 text-[10px] text-white/25 uppercase tracking-[0.12em] font-bold">
                Dist.
              </th>
              <th className="text-right py-2.5 px-3 text-[10px] text-white/25 uppercase tracking-[0.12em] font-bold">
                Elev.
              </th>
              <th className="text-right py-2.5 px-3 text-[10px] text-white/25 uppercase tracking-[0.12em] font-bold">
                ETA
              </th>
              <th className="w-6"></th>
            </tr>
          </thead>
          <tbody>
            {zones.map(zone => {
              const isSelected = selectedZone?.floodZoneId === zone.floodZoneId
              return (
                <tr
                  key={zone.floodZoneId}
                  onClick={() => onSelectZone(zone)}
                  className={`table-row-hover border-b border-white/[0.03] transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#5ed29c]/[0.06] border-l-2 border-l-[#5ed29c]'
                      : 'border-l-2 border-l-transparent'
                  }`}
                  id={`evac-row-${zone.floodZoneId}`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tierColor }} />
                      <span className="text-white/80 font-medium text-[13px]">{zone.floodZoneName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-3.5 h-3.5 text-[#5ed29c] flex-shrink-0" />
                      <span className="text-white/60 text-[13px]">{zone.safeZoneName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-white/50 text-[13px]">
                    {zone.distanceKm} km
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-0.5 font-mono text-[#5ed29c] text-[13px]">
                      <ArrowUpRight className="w-3 h-3" />
                      {zone.elevationGainM}m
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-1 font-mono text-white/50 text-[13px]">
                      <Clock className="w-3 h-3" />
                      {zone.etaMinutes}m
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-all duration-200 ${
                        isSelected ? 'text-[#5ed29c] translate-x-0.5' : 'text-white/15'
                      }`}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

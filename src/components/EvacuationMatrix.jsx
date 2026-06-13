import { useState } from 'react'
import { MapPin, Navigation, ArrowUpRight, Clock, ChevronRight } from 'lucide-react'
import { getTierColor } from '../utils/riskEngine'

export default function EvacuationMatrix({ zones, selectedZone, onSelectZone, tier }) {
  const tierColor = getTierColor(tier)

  return (
    <div className="glass-surface p-6 animate-fade-in-up animate-delay-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">
          Evacuation Matrix
        </h3>
        <span className="text-[10px] text-white/30 font-mono">
          {zones.length} routes available
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-2 px-3 text-[10px] text-white/30 uppercase tracking-wider font-semibold">
                Flood Zone
              </th>
              <th className="text-left py-2 px-3 text-[10px] text-white/30 uppercase tracking-wider font-semibold">
                Safe Zone
              </th>
              <th className="text-right py-2 px-3 text-[10px] text-white/30 uppercase tracking-wider font-semibold">
                Dist.
              </th>
              <th className="text-right py-2 px-3 text-[10px] text-white/30 uppercase tracking-wider font-semibold">
                Elev.
              </th>
              <th className="text-right py-2 px-3 text-[10px] text-white/30 uppercase tracking-wider font-semibold">
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
                  className={`table-row-hover border-b border-white/[0.03] transition-all ${
                    isSelected
                      ? 'bg-[#5ed29c]/[0.08] border-l-2 border-l-[#5ed29c]'
                      : 'border-l-2 border-l-transparent'
                  }`}
                  id={`evac-row-${zone.floodZoneId}`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tierColor }} />
                      <span className="text-white/90 font-medium">{zone.floodZoneName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-3.5 h-3.5 text-[#5ed29c] flex-shrink-0" />
                      <span className="text-white/70">{zone.safeZoneName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-white/60">
                    {zone.distanceKm} km
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-0.5 font-mono text-[#5ed29c]">
                      <ArrowUpRight className="w-3 h-3" />
                      {zone.elevationGainM} m
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-1 font-mono text-white/60">
                      <Clock className="w-3 h-3" />
                      {zone.etaMinutes} min
                    </span>
                  </td>
                  <td className="py-3 pr-2">
                    <ChevronRight
                      className={`w-4 h-4 transition-colors ${
                        isSelected ? 'text-[#5ed29c]' : 'text-white/20'
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

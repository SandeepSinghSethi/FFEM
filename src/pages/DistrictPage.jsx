import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { districtById } from '../data/districts'
import { getImpact } from '../data/impact'
import { getEvacuationZones } from '../data/evacuationZones'
import Breadcrumb from '../components/Breadcrumb'
import RiskScoreCard from '../components/RiskScoreCard'
import ImpactPanel from '../components/ImpactPanel'
import EvacuationMatrix from '../components/EvacuationMatrix'
import RouteMap from '../components/RouteMap'
import AlertSimulator from '../components/AlertSimulator'
import RiskBadge from '../components/RiskBadge'
import { Mountain, Calendar } from 'lucide-react'

export default function DistrictPage() {
  const { districtId } = useParams()
  const district = districtById[districtId]
  const impact = getImpact(districtId)
  const zones = getEvacuationZones(districtId)
  const [selectedZone, setSelectedZone] = useState(null)

  // Auto-select first zone
  useEffect(() => {
    if (zones.length > 0) {
      setSelectedZone(zones[0])
    }
  }, [districtId])

  if (!district) {
    return (
      <div className="page-wrapper flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
            <Mountain className="w-7 h-7 text-white/20" />
          </div>
          <h2 className="text-xl font-bold text-white/60 mb-2">District Not Found</h2>
          <p className="text-sm text-white/35 max-w-sm mx-auto">
            The requested district could not be found in the monitoring system.
          </p>
        </div>
      </div>
    )
  }

  const stateId = district.stateId

  return (
    <div className="page-wrapper">
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-10">
        <Breadcrumb
          items={[
            { label: 'National', to: '/map' },
            { label: district.stateName, to: `/state/${stateId}` },
            { label: district.name },
          ]}
        />

        {/* ── Page header ── */}
        <div className="mb-10 animate-fade-in-up animate-delay-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {district.name}
            </h1>
            <RiskBadge tier={district.tier} size="lg" pulse={district.tier === 'Extreme'} />
          </div>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span>District Dashboard</span>
            <span className="text-white/15">·</span>
            <span>{district.stateName}</span>
            <span className="text-white/15">·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            TOP ROW — Risk Score + Impact side by side
            ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <RiskScoreCard district={district} />
          <ImpactPanel impact={impact} />
        </div>

        {/* ══════════════════════════════════════════════
            MAP — Full Width
            ══════════════════════════════════════════════ */}
        <div className="mb-6">
          <RouteMap
            zones={zones}
            selectedZone={selectedZone}
            districtCenter={district.center}
            tier={district.tier}
          />
        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM ROW — Evacuation Matrix + Alert Simulator
            ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <EvacuationMatrix
              zones={zones}
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
              tier={district.tier}
            />
          </div>
          <div className="lg:col-span-4">
            <AlertSimulator district={district} />
          </div>
        </div>

        <div className="footer-line">
          FlashFlood Matrix · {district.name}, {district.stateName}
        </div>
      </div>
    </div>
  )
}

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
      <div className="pt-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white/60 mb-2">District Not Found</h2>
          <p className="text-sm text-white/40">
            The requested district could not be found in the monitoring system.
          </p>
        </div>
      </div>
    )
  }

  // Find stateId for breadcrumb
  const stateId = district.stateId

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
        <Breadcrumb
          items={[
            { label: 'National', to: '/map' },
            { label: district.stateName, to: `/state/${stateId}` },
            { label: district.name },
          ]}
        />

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2">
            {district.name}
          </h1>
          <p className="text-sm text-white/50 leading-relaxed">
            District Dashboard · {district.stateName} · Updated {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* ── 3-column layout (desktop) → stacked (mobile) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar — Score + Impact */}
          <div className="lg:col-span-4 space-y-6">
            <RiskScoreCard district={district} />
            <ImpactPanel impact={impact} />
            <AlertSimulator district={district} />
          </div>

          {/* Center + Right — Map + Evacuation */}
          <div className="lg:col-span-8 space-y-6">
            <RouteMap
              zones={zones}
              selectedZone={selectedZone}
              districtCenter={district.center}
              tier={district.tier}
            />
            <EvacuationMatrix
              zones={zones}
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
              tier={district.tier}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

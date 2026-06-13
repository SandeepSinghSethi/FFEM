import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, GeoJSON, Tooltip as LeafletTooltip } from 'react-leaflet'
import indiaStatesGeo from '../data/indiaStatesGeo'
import states, { getStateTier, getStateData } from '../data/states'
import districts from '../data/districts'
import Breadcrumb from '../components/Breadcrumb'
import RiskBadge from '../components/RiskBadge'
import { getTierColor, getTierBg } from '../utils/riskEngine'
import { Users, AlertTriangle, ArrowRight, MapPin } from 'lucide-react'

export default function NationalHeatmap() {
  const navigate = useNavigate()
  const [hoveredState, setHoveredState] = useState(null)

  const tierColour = {
    Extreme: '#ff4444',
    High: '#ff8c00',
    Moderate: '#ffd700',
    Low: '#22c55e',
  }

  // Choropleth style
  const style = (feature) => {
    const tier = getStateTier(feature.properties.name)
    const isMonitored = feature.properties.monitored
    const isHovered = hoveredState === feature.properties.name

    return {
      fillColor: tier ? tierColour[tier] : '#1a2a24',
      weight: isHovered ? 2 : 0.8,
      color: isHovered ? '#5ed29c' : (isMonitored ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'),
      fillOpacity: tier ? (isHovered ? 0.7 : 0.5) : 0.15,
      dashArray: isMonitored ? '' : '3',
    }
  }

  const onEachFeature = (feature, layer) => {
    const stateData = getStateData(feature.properties.name)

    layer.on({
      mouseover: (e) => {
        setHoveredState(feature.properties.name)
        e.target.setStyle({
          weight: 2,
          color: '#5ed29c',
          fillOpacity: 0.7,
        })
        e.target.bringToFront()
      },
      mouseout: (e) => {
        setHoveredState(null)
        e.target.setStyle(style(feature))
      },
      click: () => {
        if (stateData) {
          navigate(`/state/${stateData.id}`)
        }
      },
    })
  }

  // Summary stats
  const totalExtremeDistricts = states.reduce((sum, s) => sum + s.extremeCount, 0)
  const totalPeople = states.reduce((sum, s) => sum + s.peopleAtRisk, 0)

  return (
    <div className="pt-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
        <Breadcrumb items={[{ label: 'National Heatmap' }]} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-3xl font-black text-white mb-3">
              National Risk Heatmap
            </h1>
            <p className="text-sm text-white/50 max-w-lg leading-relaxed">
              India choropleth colored by highest district risk tier per state.
              Click a monitored state to view district-level data.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#ff4444]/10 border border-[#ff4444]/20">
              <AlertTriangle className="w-4 h-4 text-[#ff4444]" />
              <span className="text-xs font-bold text-[#ff4444]">
                {totalExtremeDistricts} Extreme
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <Users className="w-4 h-4 text-white/50" />
              <span className="text-xs font-semibold text-white/70">
                {totalPeople.toLocaleString()} at risk
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 glass-surface overflow-hidden">
            <div className="h-[500px] md:h-[600px]">
              <MapContainer
                center={[22.5, 82]}
                zoom={5}
                className="h-full w-full"
                zoomControl={true}
                minZoom={4}
                maxZoom={8}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
                <GeoJSON
                  key="india-states"
                  data={indiaStatesGeo}
                  style={style}
                  onEachFeature={onEachFeature}
                />
              </MapContainer>
            </div>

            {/* Legend */}
            <div className="px-6 py-3 border-t border-white/[0.06] flex items-center gap-6 text-xs text-white/40">
              {['Extreme', 'High', 'Moderate', 'Low'].map(tier => (
                <div key={tier} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: tierColour[tier], opacity: 0.6 }}
                  />
                  {tier}
                </div>
              ))}
              <div className="flex items-center gap-1.5 ml-4">
                <span className="w-3 h-3 rounded-sm bg-[#1a2a24] border border-white/10" />
                Not Monitored
              </div>
            </div>
          </div>

          {/* State list sidebar */}
          <div className="glass-surface p-7 h-fit">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-5">
              Monitored States
            </h3>
            <div className="space-y-3">
              {states.map(state => (
                <button
                  key={state.id}
                  onClick={() => navigate(`/state/${state.id}`)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-[#5ed29c]/20 transition-all group"
                  id={`state-link-${state.id}`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-white/30 group-hover:text-[#5ed29c] transition-colors flex-shrink-0" />
                    <div className="text-left">
                      <span className="text-sm font-semibold text-white block">{state.name}</span>
                      <span className="text-[11px] text-white/40 mt-0.5 block">
                        {state.districtCount} districts · {state.peopleAtRisk.toLocaleString()} at risk
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0 ml-3">
                    <RiskBadge tier={state.highestTier} size="sm" />
                    <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#5ed29c] transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

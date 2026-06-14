import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import indiaStatesGeo from '../data/indiaStatesGeo'
import states, { getStateTier, getStateData } from '../data/states'
import Breadcrumb from '../components/Breadcrumb'
import RiskBadge from '../components/RiskBadge'
import { getTierColor } from '../utils/riskEngine'
import { Users, AlertTriangle, ArrowRight, MapPin, Activity } from 'lucide-react'

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
      color: isHovered ? '#5ed29c' : (isMonitored ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)'),
      fillOpacity: tier ? (isHovered ? 0.65 : 0.45) : 0.12,
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
          fillOpacity: 0.65,
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
    <div className="page-wrapper">
      <div className="page-container">
        <Breadcrumb items={[{ label: 'National Heatmap' }]} />

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 animate-fade-in-up animate-delay-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2.5">
              National Risk Heatmap
            </h1>
            <p className="text-sm text-white/45 max-w-lg leading-relaxed">
              India choropleth colored by highest district risk tier per state.
              Click a monitored state to view district-level data.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="stat-pill" style={{ borderColor: 'rgba(255,68,68,0.2)', background: 'rgba(255,68,68,0.06)' }}>
              <AlertTriangle className="w-3.5 h-3.5 text-[#ff4444]" />
              <span className="text-[#ff4444] font-bold">{totalExtremeDistricts} Extreme</span>
            </div>
            <div className="stat-pill">
              <Users className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white/60">{totalPeople.toLocaleString()} at risk</span>
            </div>
          </div>
        </div>

        {/* ── Map + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-in-up animate-delay-200">
          {/* Map */}
          <div className="lg:col-span-8 glass-surface overflow-hidden">
            <div className="h-[420px] sm:h-[500px] lg:h-[580px]">
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
            <div className="px-5 py-3 border-t border-white/[0.05] flex flex-wrap items-center gap-4 sm:gap-5 text-[11px] text-white/35">
              {['Extreme', 'High', 'Moderate', 'Low'].map(tier => (
                <div key={tier} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-[3px]"
                    style={{ backgroundColor: tierColour[tier], opacity: 0.7 }}
                  />
                  {tier}
                </div>
              ))}
              <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
                <span className="w-2.5 h-2.5 rounded-[3px] bg-[#1a2a24] border border-white/10" />
                Not Monitored
              </div>
            </div>
          </div>

          {/* State list sidebar */}
          <div className="lg:col-span-4 glass-surface p-5 sm:p-6 h-fit max-h-[640px] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em]">
                Monitored States
              </h3>
              <span className="text-[10px] text-white/20 font-mono">{states.length} total</span>
            </div>
            <div className="space-y-2.5">
              {states.map((state, i) => (
                <button
                  key={state.id}
                  onClick={() => navigate(`/state/${state.id}`)}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white/[0.015] border border-white/[0.05] hover:bg-white/[0.04] hover:border-[#5ed29c]/20 transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${300 + i * 80}ms` }}
                  id={`state-link-${state.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/[0.03]">
                      <MapPin className="w-3.5 h-3.5 text-white/25 group-hover:text-[#5ed29c] transition-colors duration-300" />
                    </div>
                    <div className="text-left min-w-0">
                      <span className="text-[13px] font-semibold text-white block truncate">
                        {state.name}
                      </span>
                      <span className="text-[10px] text-white/30 mt-0.5 block">
                        {state.districtCount} districts · {state.peopleAtRisk.toLocaleString()} at risk
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <RiskBadge tier={state.highestTier} size="sm" />
                    <ArrowRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#5ed29c] group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-line">
          FlashFlood Matrix · National Overview
        </div>
      </div>
    </div>
  )
}

import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { getTierColor } from '../utils/riskEngine'
import { Layers } from 'lucide-react'
import { useState } from 'react'

// Custom marker icons using SVG
function createIcon(color, size = 28) {
  return L.divIcon({
    html: `<svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="12" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="2"/>
      <circle cx="14" cy="14" r="5" fill="${color}"/>
    </svg>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

// Component to fly to bounds when zone changes
function FlyToZone({ zone, center }) {
  const map = useMap()
  useEffect(() => {
    if (zone) {
      const bounds = L.latLngBounds([zone.floodCoords, zone.safeCoords])
      map.flyToBounds(bounds, { padding: [60, 60], duration: 0.8 })
    } else if (center) {
      map.flyTo(center, 12, { duration: 0.5 })
    }
  }, [zone, center, map])
  return null
}

export default function RouteMap({ zones, selectedZone, districtCenter, tier }) {
  const [tileLayer, setTileLayer] = useState('dark')
  const floodIcon = useMemo(() => createIcon(getTierColor(tier || 'Extreme')), [tier])
  const safeIcon = useMemo(() => createIcon('#22c55e'), [])

  const tiles = {
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri',
    },
    street: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    },
  }

  const currentTile = tiles[tileLayer]

  return (
    <div className="glass-surface overflow-hidden animate-fade-in-up animate-delay-300 relative">
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">
          Route Map
        </h3>
        {/* Layer toggle */}
        <div className="flex items-center gap-1 bg-white/[0.05] rounded-lg p-0.5">
          {Object.keys(tiles).map(key => (
            <button
              key={key}
              onClick={() => setTileLayer(key)}
              className={`px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all ${
                tileLayer === key
                  ? 'bg-[#5ed29c]/20 text-[#5ed29c]'
                  : 'text-white/40 hover:text-white/60'
              }`}
              id={`layer-toggle-${key}`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[350px] md:h-[400px]">
        <MapContainer
          center={districtCenter || [30.2869, 79.0127]}
          zoom={12}
          className="h-full w-full"
          zoomControl={true}
          attributionControl={true}
        >
          <TileLayer
            key={tileLayer}
            url={currentTile.url}
            attribution={currentTile.attribution}
            maxZoom={18}
          />

          <FlyToZone zone={selectedZone} center={districtCenter} />

          {/* Render all zones */}
          {zones.map(zone => (
            <Marker
              key={`flood-${zone.floodZoneId}`}
              position={zone.floodCoords}
              icon={floodIcon}
            >
              <Popup>
                <div className="text-sm">
                  <strong className="text-red-600">⚠ {zone.floodZoneName}</strong>
                  <br />
                  <span className="text-gray-500">Flood Zone</span>
                </div>
              </Popup>
            </Marker>
          ))}

          {zones.map(zone => (
            <Marker
              key={`safe-${zone.safeZoneId}`}
              position={zone.safeCoords}
              icon={safeIcon}
            >
              <Popup>
                <div className="text-sm">
                  <strong className="text-green-600">✓ {zone.safeZoneName}</strong>
                  <br />
                  <span className="text-gray-500">Safe Zone — +{zone.elevationGainM}m elevation</span>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Selected route polyline */}
          {selectedZone && selectedZone.route && (
            <Polyline
              positions={selectedZone.route}
              pathOptions={{
                color: '#5ed29c',
                weight: 4,
                opacity: 0.9,
                dashArray: '8, 4',
              }}
            />
          )}
        </MapContainer>
      </div>

      {/* Route info bar */}
      {selectedZone && (
        <div className="px-6 py-3 border-t border-white/[0.06] flex items-center gap-4 text-xs text-white/50">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getTierColor(tier) }} />
            {selectedZone.floodZoneName}
          </span>
          <span className="text-white/20">→</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            {selectedZone.safeZoneName}
          </span>
          <span className="ml-auto font-mono text-[#5ed29c]">
            {selectedZone.distanceKm} km · +{selectedZone.elevationGainM}m · {selectedZone.etaMinutes} min
          </span>
        </div>
      )}
    </div>
  )
}

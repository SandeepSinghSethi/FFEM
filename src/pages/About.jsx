import Breadcrumb from '../components/Breadcrumb'
import { BookOpen, Database, AlertTriangle, Code, ExternalLink } from 'lucide-react'

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
        <Breadcrumb items={[
          { label: 'National', to: '/map' },
          { label: 'Methodology' },
        ]} />

        <h1 className="text-3xl font-black text-white mb-2">Methodology</h1>
        <p className="text-sm text-white/50 mb-10">
          Score formula, data sources, and technical limitations.
        </p>

        {/* Score Formula */}
        <section className="glass-surface p-8 mb-6 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-[#5ed29c]" />
            <h2 className="text-lg font-bold text-white">Risk Score Formula</h2>
          </div>

          <div className="bg-[#070b0a] rounded-xl p-5 font-mono text-sm text-white/80 leading-relaxed border border-white/[0.05] overflow-x-auto">
            <pre>{`RiskScore = (RainfallIntensity × RainfallDuration) × TerrainFactor × DrainageFactor

TerrainFactor  = 1 / (slope_deg + 0.1)       // lower terrain = higher factor
DrainageFactor = basin_area_km² / drainage_capacity

Thresholds:
  > 0.75    →  Extreme   (immediate evacuation)
  0.5–0.75  →  High      (standby)
  0.25–0.5  →  Moderate  (watch)
  < 0.25    →  Low       (safe)`}</pre>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#ffd700]/[0.05] border border-[#ffd700]/10">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ffd700] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-white/60 leading-relaxed">
                <strong className="text-[#ffd700]">Important:</strong> This is a simplified proxy model,
                not a certified hydrological model. Full validation would involve collaboration with
                IIRS Dehradun and integration of soil saturation, land cover, and river discharge data.
                The decision layer — evacuation matrix, routing, impact quantification — is already built
                and ready for a more accurate risk input.
              </p>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="glass-surface p-8 mb-6 animate-fade-in-up animate-delay-100">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-[#5ed29c]" />
            <h2 className="text-lg font-bold text-white">Data Sources</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-2 px-3 text-[10px] text-white/30 uppercase tracking-wider">Dataset</th>
                  <th className="text-left py-2 px-3 text-[10px] text-white/30 uppercase tracking-wider">Source</th>
                  <th className="text-left py-2 px-3 text-[10px] text-white/30 uppercase tracking-wider">Format</th>
                  <th className="text-left py-2 px-3 text-[10px] text-white/30 uppercase tracking-wider">Refresh</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Rainfall intensity', 'OpenWeather API', 'JSON', 'Hourly'],
                  ['Elevation (DEM)', 'NASA SRTM 30m', 'GeoTIFF → JSON', 'Static'],
                  ['Drainage basins', 'HydroSHEDS', 'GeoJSON', 'Static'],
                  ['Road network', 'OpenStreetMap', 'GeoJSON', 'Weekly'],
                  ['Population grid', 'WorldPop 2020', 'Raster → JSON', 'Static'],
                  ['Flood history', 'NDMA India', 'CSV', 'Annual'],
                  ['India boundaries', 'Datameet / GADM', 'GeoJSON', 'Static'],
                ].map(([dataset, source, format, refresh]) => (
                  <tr key={dataset} className="border-b border-white/[0.03]">
                    <td className="py-2 px-3 text-white/70 font-medium">{dataset}</td>
                    <td className="py-2 px-3 text-white/50">{source}</td>
                    <td className="py-2 px-3 text-white/40 font-mono text-xs">{format}</td>
                    <td className="py-2 px-3 text-white/40">{refresh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-white/40 mt-4">
            All datasets except OpenWeather are pre-processed and bundled as static JSON.
            The app ships with a full mock dataset so it runs offline without any API key.
          </p>
        </section>

        {/* Limitations */}
        <section className="glass-surface p-8 mb-6 animate-fade-in-up animate-delay-200">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[#5ed29c]" />
            <h2 className="text-lg font-bold text-white">Known Limitations</h2>
          </div>

          <ul className="space-y-3">
            {[
              'No real-time river discharge data integration',
              'Full hydrological modelling requires soil saturation, land cover, and runoff coefficients',
              'No actual SMS delivery pipeline — alert simulator is UI-only',
              'Population figures are approximations from WorldPop 2020',
              'Road routing uses pre-computed paths, not real-time OSRM queries',
              'GeoJSON boundaries are simplified for performance (<500 KB)',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="glass-surface p-8 animate-fade-in-up animate-delay-300">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-[#5ed29c]" />
            <h2 className="text-lg font-bold text-white">Technology Stack</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'React 18', desc: 'Frontend framework' },
              { name: 'Vite', desc: 'Build tool' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'Leaflet.js', desc: 'Maps' },
              { name: 'Recharts', desc: 'Charts' },
              { name: 'HLS.js', desc: 'Video streaming' },
              { name: 'React Router', desc: 'Routing' },
              { name: 'Lucide', desc: 'Icons' },
            ].map(tech => (
              <div
                key={tech.name}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
              >
                <span className="text-sm font-bold text-white">{tech.name}</span>
                <span className="text-[10px] text-white/30 block mt-0.5">{tech.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 mb-8 text-center text-xs text-white/20">
          FlashFlood Matrix · Built for hackathon demonstration · 2026
        </div>
      </div>
    </div>
  )
}

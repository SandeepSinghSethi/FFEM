import Breadcrumb from '../components/Breadcrumb'
import { BookOpen, Database, AlertTriangle, Code, Layers } from 'lucide-react'

export default function About() {
  return (
    <div className="page-wrapper">
      <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-12 pb-16">
        <Breadcrumb items={[
          { label: 'National', to: '/map' },
          { label: 'Methodology' },
        ]} />

        {/* ══════════════════════════════════════════════
            PAGE HEADER
            ══════════════════════════════════════════════ */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5">
            Methodology
          </h1>
          <p className="text-[15px] sm:text-[16px] text-white/40 max-w-[560px] mx-auto leading-[1.8]">
            The science behind FlashFlood Matrix — score formula, data pipelines,
            technical architecture, and known limitations.
          </p>
        </div>

        {/* ══════════════════════════════════════════════
            RISK SCORE FORMULA
            ══════════════════════════════════════════════ */}
        <section className="glass-surface p-8 sm:p-10 lg:p-12 mb-8 animate-fade-in-up animate-delay-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#5ed29c]/[0.08] flex items-center justify-center flex-shrink-0">
              <Code className="w-6 h-6 text-[#5ed29c]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Risk Score Formula</h2>
              <p className="text-[13px] text-white/30 mt-1">Core algorithm powering all risk assessments</p>
            </div>
          </div>

          <div className="bg-[#050908] rounded-2xl p-6 sm:p-8 font-mono text-[12px] sm:text-[14px] text-white/60 leading-[1.9] border border-white/[0.04] overflow-x-auto mb-8">
            <pre className="whitespace-pre-wrap">{`RiskScore = (RainfallIntensity × RainfallDuration)
           × TerrainFactor × DrainageFactor

TerrainFactor  = 1 / (slope_deg + 0.1)
DrainageFactor = basin_area_km² / drainage_capacity

Thresholds:
  > 0.75    →  Extreme   (immediate evacuation)
  0.5–0.75  →  High      (standby)
  0.25–0.5  →  Moderate  (watch)
  < 0.25    →  Low       (safe)`}</pre>
          </div>

          <div className="p-6 rounded-2xl bg-[#ffd700]/[0.03] border border-[#ffd700]/[0.08]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#ffd700]/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-[#ffd700]" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#ffd700] mb-2">Important Disclaimer</p>
                <p className="text-[14px] text-white/45 leading-[1.75]">
                  This is a simplified proxy model, not a certified hydrological model. Full validation
                  would involve collaboration with IIRS Dehradun and integration of soil saturation,
                  land cover, and river discharge data. The decision layer — evacuation matrix, routing,
                  impact quantification — is already built and ready for a more accurate risk input.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            DATA SOURCES
            ══════════════════════════════════════════════ */}
        <section className="glass-surface p-8 sm:p-10 lg:p-12 mb-8 animate-fade-in-up animate-delay-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#5ed29c]/[0.08] flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-[#5ed29c]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Data Sources</h2>
              <p className="text-[13px] text-white/30 mt-1">7 datasets powering the platform</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { dataset: 'Rainfall Intensity', source: 'OpenWeather API', format: 'JSON', refresh: 'Hourly', color: '#5ed29c' },
              { dataset: 'Elevation (DEM)', source: 'NASA SRTM 30m', format: 'GeoTIFF → JSON', refresh: 'Static', color: null },
              { dataset: 'Drainage Basins', source: 'HydroSHEDS', format: 'GeoJSON', refresh: 'Static', color: null },
              { dataset: 'Road Network', source: 'OpenStreetMap', format: 'GeoJSON', refresh: 'Weekly', color: '#4ecdc4' },
              { dataset: 'Population Grid', source: 'WorldPop 2020', format: 'Raster → JSON', refresh: 'Static', color: null },
              { dataset: 'Flood History', source: 'NDMA India', format: 'CSV', refresh: 'Annual', color: '#ffd700' },
              { dataset: 'India Boundaries', source: 'Datameet / GADM', format: 'GeoJSON', refresh: 'Static', color: null },
            ].map((row) => (
              <div
                key={row.dataset}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.025] hover:border-white/[0.07] transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-[15px] font-semibold text-white/65 block">{row.dataset}</span>
                  <span className="text-[13px] text-white/30 mt-0.5 block">{row.source}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-[11px] font-mono text-white/20 bg-white/[0.025] px-3 py-1.5 rounded-lg">
                    {row.format}
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg"
                    style={{
                      color: row.color || 'rgba(255,255,255,0.25)',
                      backgroundColor: row.color ? `${row.color}0D` : 'rgba(255,255,255,0.025)',
                    }}
                  >
                    {row.refresh}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-white/25 mt-8 leading-relaxed text-center">
            All datasets except OpenWeather are pre-processed and bundled as static JSON.
            The app runs fully offline without any API key.
          </p>
        </section>

        {/* ══════════════════════════════════════════════
            KNOWN LIMITATIONS
            ══════════════════════════════════════════════ */}
        <section className="glass-surface p-8 sm:p-10 lg:p-12 mb-8 animate-fade-in-up animate-delay-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#5ed29c]/[0.08] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-[#5ed29c]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Known Limitations</h2>
              <p className="text-[13px] text-white/30 mt-1">Areas for future improvement</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'No real-time river discharge data integration',
              'Needs soil saturation & land cover coefficients',
              'Alert simulator is UI-only — no SMS pipeline',
              'Population data from WorldPop 2020 estimates',
              'Pre-computed paths, not real-time OSRM queries',
              'Simplified GeoJSON boundaries (<500 KB)',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.025] transition-all duration-200"
              >
                <span className="w-7 h-7 rounded-lg bg-[#5ed29c]/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[11px] font-bold text-[#5ed29c]/60">{i + 1}</span>
                </span>
                <span className="text-[14px] text-white/40 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            TECHNOLOGY STACK
            ══════════════════════════════════════════════ */}
        <section className="glass-surface p-8 sm:p-10 lg:p-12 animate-fade-in-up animate-delay-400">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#5ed29c]/[0.08] flex items-center justify-center flex-shrink-0">
              <Layers className="w-6 h-6 text-[#5ed29c]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Technology Stack</h2>
              <p className="text-[13px] text-white/30 mt-1">Modern frontend architecture</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {[
              { name: 'React 18', desc: 'Frontend framework', emoji: '⚛️' },
              { name: 'Vite', desc: 'Build tool', emoji: '⚡' },
              { name: 'Tailwind CSS', desc: 'Styling', emoji: '🎨' },
              { name: 'Leaflet.js', desc: 'Maps', emoji: '🗺️' },
              { name: 'Recharts', desc: 'Charts', emoji: '📊' },
              { name: 'HLS.js', desc: 'Video streaming', emoji: '📹' },
              { name: 'React Router', desc: 'Routing', emoji: '🔗' },
              { name: 'Lucide', desc: 'Icons', emoji: '✨' },
            ].map(tech => (
              <div
                key={tech.name}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-[#5ed29c]/15 hover:bg-white/[0.03] transition-all duration-300 text-center"
              >
                <span className="text-2xl mb-3 block">{tech.emoji}</span>
                <span className="text-[14px] sm:text-[15px] font-bold text-white block">{tech.name}</span>
                <span className="text-[11px] sm:text-[12px] text-white/25 block mt-1.5">{tech.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="footer-line">
          FlashFlood Matrix · Built for hackathon demonstration · 2026
        </div>
      </div>
    </div>
  )
}

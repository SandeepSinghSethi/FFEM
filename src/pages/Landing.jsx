import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, MapPin, Activity, BarChart3, Globe, Waves, Zap, ChevronDown } from 'lucide-react'
import Hls from 'hls.js'

export default function Landing() {
  const videoRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // HLS video setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const hlsUrl = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false })
      hls.loadSource(hlsUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
        setVideoLoaded(true)
      })
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {})
        setVideoLoaded(true)
      })
    }
  }, [])

  const features = [
    {
      icon: Shield,
      title: 'Terrain-Aware Risk Scoring',
      desc: 'Multi-factor risk engine accounting for slope gradient, elevation profile, and drainage basin capacity — not just rainfall intensity.',
      accent: '#5ed29c',
    },
    {
      icon: MapPin,
      title: 'Smart Evacuation Routing',
      desc: 'Graph-based pathfinding to the nearest safe zone with real-time distance, elevation gain, and estimated arrival calculations.',
      accent: '#4ecdc4',
    },
  ]

  const stats = [
    { value: '5', label: 'States Monitored', icon: Globe },
    { value: '15', label: 'Districts Tracked', icon: Activity },
    { value: '75+', label: 'Evacuation Routes', icon: Waves },
    { value: '<3h', label: 'Forecast Window', icon: BarChart3 },
  ]

  return (
    <div className="relative overflow-hidden bg-[#070b0a]">

      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ opacity: videoLoaded ? 0.3 : 0, transition: 'opacity 2s ease' }}
          muted loop playsInline autoPlay
        />
        <div
          className="absolute inset-0 transition-opacity duration-[2500ms]"
          style={{
            opacity: videoLoaded ? 0 : 1,
            background: 'radial-gradient(ellipse at 50% 40%, rgba(94,210,156,0.05) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 0%, #070b0a 70%)' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, #070b0a50 0%, transparent 12%, transparent 75%, #070b0a 100%)' }} />

      {/* ── Grid Lines ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none hidden lg:block opacity-[0.03]">
        {[20, 40, 60, 80].map(p => (
          <div key={p} className="absolute top-0 bottom-0 w-px bg-white" style={{ left: `${p}%` }} />
        ))}
      </div>

      {/* ── Central Glow ── */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-none">
        <div className="w-[700px] h-[500px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #5ed29c 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 sm:px-10">
        <div className="w-full max-w-[900px] mx-auto">

          {/* ── Glass Chip ── */}
          <div className="liquid-glass inline-flex items-center gap-2.5 px-5 py-2.5 mb-8 animate-fade-in-up">
            <Zap className="w-3.5 h-3.5 text-[#5ed29c]" />
            <span className="text-[11px] sm:text-[12px] font-semibold text-white/60">
              Powered by <em className="font-instrument not-italic text-[#5ed29c]">Terrain Intelligence</em>
            </span>
            <span className="hidden sm:inline text-[9px] font-bold text-[#5ed29c]/50 tracking-[0.2em] uppercase">2026</span>
          </div>

          {/* ── Eyebrow ── */}
          <p className="font-jakarta font-bold text-[10px] sm:text-[11px] text-[#5ed29c]/70 uppercase tracking-[0.35em] mb-8 animate-fade-in-up animate-delay-100">
            Decision Support for Disaster Response
          </p>

          {/* ── Headline ── */}
          <h1
            className="font-black uppercase leading-[0.85] mb-10 animate-fade-in-up animate-delay-200"
            style={{ fontSize: 'clamp(3.2rem, 10vw, 7rem)', letterSpacing: '-0.03em' }}
          >
            EVACUATE<br />
            SMARTER<span className="text-[#5ed29c]">.</span>
          </h1>

          {/* ── Description ── */}
          <p className="text-[15px] sm:text-[17px] text-white/40 max-w-[620px] mx-auto leading-[1.85] mb-14 animate-fade-in-up animate-delay-300">
            An AI-assisted disaster response platform that converts live rainfall forecasts,
            terrain elevation models, and graph-based routing into actionable flash-flood risk
            scores and evacuation decisions — <span className="text-white/65 font-medium">before the water rises.</span>
          </p>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 animate-fade-in-up animate-delay-400">
            <Link
              to="/map"
              className="inline-flex items-center gap-3 px-10 sm:px-12 py-4 rounded-2xl bg-[#5ed29c] text-[#070b0a] font-bold uppercase tracking-wider text-[13px] sm:text-[14px] hover:bg-[#4ecdc4] transition-all duration-300 group glow-btn hover:shadow-[0_4px_40px_rgba(94,210,156,0.3)]"
              id="hero-cta"
            >
              View Live Heatmap
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 px-10 sm:px-12 py-4 rounded-2xl border border-white/[0.1] text-white/50 font-semibold text-[13px] sm:text-[14px] hover:border-[#5ed29c]/25 hover:text-[#5ed29c] hover:bg-[#5ed29c]/[0.04] transition-all duration-300"
            >
              Methodology
            </Link>
          </div>

          {/* ── Scroll Indicator ── */}
          <div className="animate-fade-in-up animate-delay-800">
            <ChevronDown className="w-5 h-5 text-white/15 mx-auto animate-bounce" />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES + STATS SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 sm:py-32" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(7,11,10,0.5) 10%, #070b0a 25%)' }}>
        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-14">

          {/* ── Section Divider ── */}
          <div className="flex items-center gap-6 mb-16 animate-fade-in-up animate-delay-500">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }} />
            <span className="text-[10px] sm:text-[11px] font-bold text-white/20 uppercase tracking-[0.3em]">
              Core Capabilities
            </span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }} />
          </div>

          {/* ── Feature Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 mb-20 animate-fade-in-up animate-delay-500">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className="liquid-glass px-8 py-9 sm:px-10 sm:py-11 hover-lift group"
                style={{ animationDelay: `${550 + i * 120}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
                  style={{ backgroundColor: `${feat.accent}0D` }}
                >
                  <feat.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" style={{ color: feat.accent }} />
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
                  {feat.title}
                </h4>

                <p className="text-[14px] sm:text-[15px] text-white/35 leading-[1.8]">
                  {feat.desc}
                </p>

                <div
                  className="mt-8 h-[2px] w-12 rounded-full opacity-20 group-hover:w-20 group-hover:opacity-50 transition-all duration-500"
                  style={{ backgroundColor: feat.accent }}
                />
              </div>
            ))}
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8 animate-fade-in-up animate-delay-700">
            {stats.map(stat => (
              <div key={stat.label} className="glass-surface px-6 py-8 sm:px-8 sm:py-10 flex flex-col items-center text-center hover-lift">
                <stat.icon className="w-5 h-5 text-[#5ed29c]/25 mb-5" />
                <span className="text-4xl sm:text-5xl font-black text-[#5ed29c] leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/20 uppercase tracking-[0.18em] font-semibold mt-4">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Footer ── */}
          <div className="footer-line animate-fade-in-up animate-delay-800">
            FlashFlood Matrix · Built for India · 2026
          </div>
        </div>
      </section>
    </div>
  )
}

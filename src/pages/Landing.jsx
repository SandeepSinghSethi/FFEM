import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, MapPin, Activity, BarChart3, Globe, Waves } from 'lucide-react'
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
      desc: 'Multi-factor risk engine that accounts for slope gradient, elevation profile, and drainage basin capacity — not just rainfall intensity.',
      accent: '#5ed29c',
    },
    {
      icon: MapPin,
      title: 'Smart Evacuation Routing',
      desc: 'Graph-based pathfinding to the nearest safe zone with real-time distance, elevation gain, and estimated arrival time calculations.',
      accent: '#4ecdc4',
    },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ opacity: videoLoaded ? 0.45 : 0, transition: 'opacity 1.5s ease' }}
          muted
          loop
          playsInline
          autoPlay
        />
        <div
          className="absolute inset-0 transition-opacity duration-[2000ms]"
          style={{
            opacity: videoLoaded ? 0 : 1,
            background: 'radial-gradient(ellipse at 50% 30%, rgba(94,210,156,0.1) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* ── Overlays ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(90deg, #070b0a 0%, #070b0ae6 35%, #070b0a80 55%, transparent 75%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to top, #070b0a 0%, #070b0ae6 15%, transparent 45%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, #070b0a80 0%, transparent 25%)',
        }}
      />

      {/* ── Grid Lines (desktop only) ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none hidden lg:block">
        <div className="absolute top-0 bottom-0 left-[25%] w-px bg-white/[0.04]" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-white/[0.04]" />
        <div className="absolute top-0 bottom-0 left-[75%] w-px bg-white/[0.04]" />
      </div>

      {/* ── Central Glow ── */}
      <div className="absolute top-0 left-0 right-0 z-[2] pointer-events-none flex justify-center overflow-hidden">
        <svg width="900" height="450" viewBox="0 0 900 450" className="mt-[-80px] opacity-30">
          <defs>
            <filter id="glow-blur"><feGaussianBlur stdDeviation="30" /></filter>
            <radialGradient id="glow-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5ed29c" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#0d3d2e" stopOpacity="0.12" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="450" cy="225" rx="400" ry="120" fill="url(#glow-gradient)" filter="url(#glow-blur)" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════ */}
      <section className="relative z-10 min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full px-8 sm:px-10 lg:px-14 pt-28 pb-10 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">

          {/* ── Liquid Glass Card ── */}
          <div className="liquid-glass inline-block max-w-xs px-7 py-5 mb-10 animate-fade-in-up">
            <span className="text-[#5ed29c] text-[11px] font-bold tracking-[0.15em] uppercase">
              [ 2026 ]
            </span>
            <h4 className="text-base font-bold text-white mt-2 leading-snug">
              Powered by{' '}
              <em className="font-instrument not-italic text-white/90">
                Terrain Intelligence
              </em>
            </h4>
            <p className="text-xs text-white/40 mt-2.5 leading-relaxed">
              AI-driven risk scoring with elevation-aware evacuation routing.
            </p>
          </div>

          {/* ── Eyebrow ── */}
          <p className="font-jakarta font-bold text-xs text-[#5ed29c] uppercase tracking-[0.2em] mb-5 animate-fade-in-up animate-delay-100">
            Decision Support for Disaster Response
          </p>

          {/* ── Main Headline ── */}
          <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black uppercase tracking-tight leading-[0.92] mb-8 animate-fade-in-up animate-delay-200">
            EVACUATE
            <br />
            SMARTER<span className="text-[#5ed29c]">.</span>
          </h1>

          {/* ── Description ── */}
          <p className="text-base text-white/60 max-w-lg leading-relaxed mb-10 animate-fade-in-up animate-delay-300">
            An AI-assisted disaster response platform that converts live rainfall forecasts,
            terrain elevation models, and graph-based routing into actionable flash-flood risk
            scores and evacuation decisions — before the water rises.
          </p>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up animate-delay-400">
            <Link
              to="/map"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#5ed29c] text-[#070b0a] font-bold uppercase tracking-wide text-sm hover:bg-[#4ecdc4] transition-all group glow-btn"
              id="hero-cta"
            >
              View Live Heatmap
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.12] text-white/60 font-semibold text-sm hover:border-[#5ed29c]/40 hover:text-[#5ed29c] transition-all"
            >
              Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURES + STATS
          ══════════════════════════════════════════════ */}
      <section className="relative z-10 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto w-full px-8 sm:px-10 lg:px-14">

          {/* ── Section label ── */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in-up animate-delay-500">
            <div className="w-8 h-px bg-[#5ed29c]/40" />
            <span className="text-[11px] font-bold text-white/25 uppercase tracking-[0.2em]">
              Core Capabilities
            </span>
            <div className="flex-1 h-px bg-white/[0.04]" />
          </div>

          {/* ── Feature Cards — 2 large cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up animate-delay-500">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className="liquid-glass px-8 py-8 sm:px-10 sm:py-9 hover-lift group"
                style={{ animationDelay: `${550 + i * 120}ms` }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors"
                  style={{ backgroundColor: `${feat.accent}12` }}
                >
                  <feat.icon
                    className="w-6 h-6 group-hover:scale-110 transition-transform"
                    style={{ color: feat.accent }}
                  />
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-white mb-3 leading-snug">
                  {feat.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-white/40 leading-relaxed">
                  {feat.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-6 h-px w-12 rounded-full opacity-30 group-hover:w-20 group-hover:opacity-60 transition-all duration-500"
                  style={{ backgroundColor: feat.accent }}
                />
              </div>
            ))}
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-16 animate-fade-in-up animate-delay-700">
            {[
              { value: '5', label: 'States Monitored', icon: Globe },
              { value: '15', label: 'Districts Tracked', icon: Activity },
              { value: '75+', label: 'Evacuation Routes', icon: Waves },
              { value: '<3h', label: 'Forecast Window', icon: BarChart3 },
            ].map(stat => (
              <div
                key={stat.label}
                className="glass-surface px-6 py-6 sm:px-7 sm:py-7 flex flex-col items-center text-center"
              >
                <stat.icon className="w-4 h-4 text-[#5ed29c]/40 mb-3" />
                <span className="text-3xl sm:text-4xl font-black text-[#5ed29c] leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/30 uppercase tracking-[0.15em] font-semibold mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Footer line ── */}
          <div className="mt-16 pt-6 border-t border-white/[0.04] text-center animate-fade-in-up animate-delay-800">
            <p className="text-[11px] text-white/15 uppercase tracking-[0.15em]">
              FlashFlood Matrix · Built for India · 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Droplets, AlertTriangle, Info, Map } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const navLinks = [
    { to: '/map', label: 'HEATMAP', icon: Map },
    { to: '/about', label: 'METHODOLOGY', icon: Info },
  ]

  const showBg = !isLanding || scrolled

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: showBg
            ? 'rgba(7, 11, 10, 0.88)'
            : 'transparent',
          backdropFilter: showBg ? 'blur(20px) saturate(1.3)' : 'none',
          WebkitBackdropFilter: showBg ? 'blur(20px) saturate(1.3)' : 'none',
          borderBottom: showBg ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-[#5ed29c]/[0.1] flex items-center justify-center group-hover:bg-[#5ed29c]/[0.15] transition-all duration-300">
                  <Droplets
                    className="w-5 h-5 text-[#5ed29c] transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-extrabold tracking-tight text-white leading-none">
                  FLASHFLOOD
                </span>
                <span className="text-[9px] font-bold tracking-[0.3em] text-[#5ed29c]/70 leading-none mt-1">
                  MATRIX
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                    location.pathname === link.to
                      ? 'text-[#5ed29c] bg-[#5ed29c]/[0.08]'
                      : 'text-white/55 hover:text-white/90 hover:bg-white/[0.04]'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}

              <div className="w-px h-7 bg-white/[0.08] mx-3" />

              <Link
                to="/map"
                className="flex items-center gap-2.5 px-7 py-2.5 rounded-xl bg-[#5ed29c] text-[#070b0a] text-[13px] font-bold uppercase tracking-wider hover:bg-[#4ecdc4] transition-all duration-300 hover:shadow-[0_0_24px_rgba(94,210,156,0.25)]"
              >
                <span className="w-2 h-2 rounded-full bg-[#070b0a]/30 animate-pulse" />
                Live Monitor
                <AlertTriangle className="w-4 h-4" />
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/80 hover:text-[#5ed29c] hover:border-[#5ed29c]/20 transition-all duration-300"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(7, 11, 10, 0.97)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 text-xl font-bold tracking-wide transition-all duration-500 ${
                location.pathname === link.to
                  ? 'text-[#5ed29c]'
                  : 'text-white/60 hover:text-[#5ed29c]'
              }`}
              style={{
                transitionDelay: mobileOpen ? `${100 + i * 80}ms` : '0ms',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
              }}
              onClick={() => setMobileOpen(false)}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
          <Link
            to="/map"
            className="mt-2 flex items-center gap-3 px-10 py-4 rounded-xl bg-[#5ed29c] text-[#070b0a] font-bold uppercase tracking-wider text-base transition-all duration-500"
            style={{
              transitionDelay: mobileOpen ? '260ms' : '0ms',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
            }}
            onClick={() => setMobileOpen(false)}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#070b0a]/30 animate-pulse" />
            Live Monitor
            <AlertTriangle className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </>
  )
}

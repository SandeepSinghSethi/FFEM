import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Droplets, AlertTriangle, Info, Map } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  const navLinks = [
    { to: '/map', label: 'HEATMAP', icon: Map },
    { to: '/about', label: 'METHODOLOGY', icon: Info },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLanding
            ? 'bg-transparent'
            : 'bg-[#070b0a]/90 backdrop-blur-md border-b border-white/[0.06]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Droplets
                  className="w-7 h-7 text-[#5ed29c] transition-transform group-hover:scale-110"
                  strokeWidth={2.5}
                />
                <div className="absolute inset-0 bg-[#5ed29c]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight text-white leading-none">
                  FLASHFLOOD
                </span>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#5ed29c] leading-none">
                  MATRIX
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-[#5ed29c] ${
                    location.pathname === link.to
                      ? 'text-[#5ed29c]'
                      : 'text-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/map"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#5ed29c] text-[#070b0a] text-sm font-bold uppercase tracking-wide hover:bg-[#4ecdc4] transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Live Monitor
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/80 hover:text-[#5ed29c] transition-colors"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#070b0a]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-2xl font-bold tracking-wide text-white/80 hover:text-[#5ed29c] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/map"
            className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full bg-[#5ed29c] text-[#070b0a] font-bold uppercase tracking-wide"
            onClick={() => setMobileOpen(false)}
          >
            <AlertTriangle className="w-5 h-5" />
            Live Monitor
          </Link>
        </div>
      )}
    </>
  )
}

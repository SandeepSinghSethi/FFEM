import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb({ items }) {
  const location = useLocation()

  return (
    <nav
      className="flex items-center gap-1.5 text-sm mb-8 animate-fade-in-up"
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        className="flex items-center gap-1 text-white/40 hover:text-[#5ed29c] transition-colors duration-200"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>
      <ChevronRight className="w-3.5 h-3.5 text-white/20" />
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/20" />}
          {item.to ? (
            <Link
              to={item.to}
              className="text-white/45 hover:text-[#5ed29c] transition-colors duration-200 font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white/80 font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

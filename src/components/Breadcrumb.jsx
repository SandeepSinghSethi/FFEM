import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-white/50 mb-6" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/30" />}
          {item.to ? (
            <Link
              to={item.to}
              className="hover:text-[#5ed29c] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white/80 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

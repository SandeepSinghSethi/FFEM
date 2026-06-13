import { Users, Home, Building2, GraduationCap } from 'lucide-react'

export default function ImpactPanel({ impact }) {
  const cards = [
    {
      icon: Users,
      label: 'People at Risk',
      value: impact.peopleAffected.toLocaleString(),
      color: '#ff6b6b',
      bg: 'rgba(255, 107, 107, 0.08)',
    },
    {
      icon: Home,
      label: 'Villages',
      value: impact.villagesAffected,
      color: '#ffa94d',
      bg: 'rgba(255, 169, 77, 0.08)',
    },
    {
      icon: Building2,
      label: 'Hospitals',
      value: impact.hospitalsAtRisk,
      color: '#74c0fc',
      bg: 'rgba(116, 192, 252, 0.08)',
    },
    {
      icon: GraduationCap,
      label: 'Schools',
      value: impact.schoolsAtRisk,
      color: '#b197fc',
      bg: 'rgba(177, 151, 252, 0.08)',
    },
  ]

  return (
    <div className="glass-surface p-6 animate-fade-in-up animate-delay-100">
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
        Impact Assessment
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {cards.map(card => (
          <div
            key={card.label}
            className="rounded-xl p-4 border border-white/[0.05] hover-lift"
            style={{ backgroundColor: card.bg }}
          >
            <card.icon className="w-5 h-5 mb-2" style={{ color: card.color }} />
            <div className="text-2xl font-black text-white">{card.value}</div>
            <div className="text-[11px] text-white/40 uppercase tracking-wider mt-1">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { Users, Home, Building2, GraduationCap } from 'lucide-react'

export default function ImpactPanel({ impact }) {
  const cards = [
    {
      icon: Users,
      label: 'People at Risk',
      value: impact.peopleAffected.toLocaleString(),
      color: '#ff6b6b',
      bg: 'rgba(255, 107, 107, 0.06)',
      borderColor: 'rgba(255, 107, 107, 0.1)',
    },
    {
      icon: Home,
      label: 'Villages',
      value: impact.villagesAffected,
      color: '#ffa94d',
      bg: 'rgba(255, 169, 77, 0.06)',
      borderColor: 'rgba(255, 169, 77, 0.1)',
    },
    {
      icon: Building2,
      label: 'Hospitals',
      value: impact.hospitalsAtRisk,
      color: '#74c0fc',
      bg: 'rgba(116, 192, 252, 0.06)',
      borderColor: 'rgba(116, 192, 252, 0.1)',
    },
    {
      icon: GraduationCap,
      label: 'Schools',
      value: impact.schoolsAtRisk,
      color: '#b197fc',
      bg: 'rgba(177, 151, 252, 0.06)',
      borderColor: 'rgba(177, 151, 252, 0.1)',
    },
  ]

  return (
    <div className="glass-surface p-5 sm:p-6 animate-fade-in-up animate-delay-100">
      <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-4">
        Impact Assessment
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {cards.map(card => (
          <div
            key={card.label}
            className="rounded-xl p-4 border hover-lift transition-all duration-300"
            style={{ backgroundColor: card.bg, borderColor: card.borderColor }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: `${card.color}10` }}
            >
              <card.icon className="w-4 h-4" style={{ color: card.color }} />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white leading-none">{card.value}</div>
            <div className="text-[10px] text-white/35 uppercase tracking-[0.12em] mt-1.5 font-semibold">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

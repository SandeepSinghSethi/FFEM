import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { getTierColor } from '../utils/riskEngine'

export default function ForecastBar({ forecast, tier }) {
  const data = forecast.map((score, i) => ({
    hour: `${i}h`,
    score,
    label: `Hour ${i}`,
  }))

  const color = getTierColor(tier)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value
      let t = 'Low'
      if (val > 0.75) t = 'Extreme'
      else if (val > 0.5) t = 'High'
      else if (val > 0.25) t = 'Moderate'

      return (
        <div className="bg-[#0d1412] border border-white/[0.08] rounded-lg px-3 py-2 shadow-xl backdrop-blur-sm">
          <p className="text-[10px] text-white/40 mb-0.5">{payload[0].payload.label}</p>
          <p className="text-[13px] font-bold" style={{ color: getTierColor(t) }}>
            {val.toFixed(2)} — {t}
          </p>
        </div>
      )
    }
    return null
  }

  // Use a unique gradient ID per tier+instance to avoid conflicts
  const gradientId = `forecast-grad-${tier}-${Math.random().toString(36).substr(2, 5)}`

  return (
    <div className="h-[72px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="hour"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.25)' }}
          />
          <YAxis hide domain={[0, 1]} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Area
            type="monotone"
            dataKey="score"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 3, fill: color, stroke: '#0d1412', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

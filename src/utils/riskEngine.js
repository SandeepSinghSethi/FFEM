// FlashFlood Matrix — Risk scoring engine (client-side JS port)
// Mirrors the Python formula from the TRD

/**
 * Compute flash-flood risk score.
 * @param {number} rainfallMm - Rainfall intensity in mm
 * @param {number} slopeDeg - Terrain slope in degrees
 * @param {number} basinAreaKm2 - Drainage basin area in km²
 * @param {number} drainageCap - Drainage capacity
 * @returns {{ score: number, tier: string }}
 */
export function computeRisk(rainfallMm, slopeDeg, basinAreaKm2, drainageCap) {
  const rainfallFactor = Math.min(rainfallMm / 50.0, 2.0)
  const terrainFactor = 1.0 / (slopeDeg + 0.1)
  const drainageFactor = basinAreaKm2 / Math.max(drainageCap, 1)

  const raw = rainfallFactor * terrainFactor * drainageFactor
  const score = Math.min(raw / 10.0, 1.0)

  let tier
  if (score > 0.75) tier = 'Extreme'
  else if (score > 0.5) tier = 'High'
  else if (score > 0.25) tier = 'Moderate'
  else tier = 'Low'

  return { score: Math.round(score * 100) / 100, tier }
}

/**
 * Get tier color for CSS styling
 */
export function getTierColor(tier) {
  const colors = {
    Extreme: '#ff4444',
    High: '#ff8c00',
    Moderate: '#ffd700',
    Low: '#22c55e',
  }
  return colors[tier] || '#666'
}

/**
 * Get tier background with opacity
 */
export function getTierBg(tier) {
  const colors = {
    Extreme: 'rgba(255, 68, 68, 0.15)',
    High: 'rgba(255, 140, 0, 0.15)',
    Moderate: 'rgba(255, 215, 0, 0.15)',
    Low: 'rgba(34, 197, 94, 0.15)',
  }
  return colors[tier] || 'rgba(102, 102, 102, 0.15)'
}

/**
 * Generate SMS alert text
 */
export function generateAlert({ location, riskTier, safeZoneName, forecastWindowHours }) {
  const alertText = `FLASH FLOOD ALERT
Location: ${location}
Risk: ${riskTier.toUpperCase()}  Window: ${forecastWindowHours} hours
→ Move to ${safeZoneName} immediately.
NDMA | FlashFlood Matrix`

  const smsSummary = `FLOOD ALERT ${location.split(',')[0]} ${riskTier.toUpperCase()}. Evacuate to ${safeZoneName} now. -FlashFlood Matrix`

  return { alertText, smsSummary }
}

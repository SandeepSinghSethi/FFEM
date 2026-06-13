// FlashFlood Matrix — State-level mock data
// 5 states with pre-computed risk summaries

const states = [
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    code: 'UK',
    center: [30.0668, 79.0193],
    zoom: 8,
    districtCount: 3,
    extremeCount: 2,
    highCount: 1,
    peopleAtRisk: 34200,
    highestTier: 'Extreme',
  },
  {
    id: 'assam',
    name: 'Assam',
    code: 'AS',
    center: [26.2006, 92.9376],
    zoom: 7,
    districtCount: 3,
    extremeCount: 1,
    highCount: 1,
    peopleAtRisk: 28500,
    highestTier: 'Extreme',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    code: 'KL',
    center: [10.8505, 76.2711],
    zoom: 8,
    districtCount: 3,
    extremeCount: 1,
    highCount: 1,
    peopleAtRisk: 19800,
    highestTier: 'Extreme',
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    code: 'HP',
    center: [31.1048, 77.1734],
    zoom: 8,
    districtCount: 3,
    extremeCount: 0,
    highCount: 2,
    peopleAtRisk: 12600,
    highestTier: 'High',
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    code: 'WB',
    center: [22.9868, 87.855],
    zoom: 7,
    districtCount: 3,
    extremeCount: 0,
    highCount: 1,
    peopleAtRisk: 15400,
    highestTier: 'High',
  },
]

export default states

// Quick lookup by id
export const stateById = Object.fromEntries(states.map(s => [s.id, s]))

// Quick lookup for GeoJSON matching (by name)
export function getStateTier(stateName) {
  const s = states.find(
    st =>
      st.name.toLowerCase() === stateName.toLowerCase() ||
      stateName.toLowerCase().includes(st.name.toLowerCase())
  )
  return s ? s.highestTier : null
}

export function getStateData(stateName) {
  return states.find(
    st =>
      st.name.toLowerCase() === stateName.toLowerCase() ||
      stateName.toLowerCase().includes(st.name.toLowerCase())
  ) || null
}

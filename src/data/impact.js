// FlashFlood Matrix — Impact data per district

const impactData = {
  // Uttarakhand
  rudraprayag: { peopleAffected: 12400, villagesAffected: 8, hospitalsAtRisk: 2, schoolsAtRisk: 5 },
  chamoli:     { peopleAffected: 14800, villagesAffected: 11, hospitalsAtRisk: 3, schoolsAtRisk: 7 },
  pithoragarh: { peopleAffected: 7000, villagesAffected: 5, hospitalsAtRisk: 1, schoolsAtRisk: 3 },

  // Assam
  nagaon:  { peopleAffected: 18500, villagesAffected: 14, hospitalsAtRisk: 4, schoolsAtRisk: 9 },
  dhemaji: { peopleAffected: 8200, villagesAffected: 6, hospitalsAtRisk: 1, schoolsAtRisk: 4 },
  barpeta: { peopleAffected: 5800, villagesAffected: 4, hospitalsAtRisk: 1, schoolsAtRisk: 2 },

  // Kerala
  wayanad:  { peopleAffected: 11200, villagesAffected: 7, hospitalsAtRisk: 2, schoolsAtRisk: 5 },
  idukki:   { peopleAffected: 6500, villagesAffected: 5, hospitalsAtRisk: 1, schoolsAtRisk: 3 },
  thrissur: { peopleAffected: 3800, villagesAffected: 3, hospitalsAtRisk: 1, schoolsAtRisk: 2 },

  // Himachal Pradesh
  kullu:  { peopleAffected: 7400, villagesAffected: 6, hospitalsAtRisk: 2, schoolsAtRisk: 4 },
  mandi:  { peopleAffected: 4200, villagesAffected: 3, hospitalsAtRisk: 1, schoolsAtRisk: 2 },
  shimla: { peopleAffected: 1800, villagesAffected: 1, hospitalsAtRisk: 0, schoolsAtRisk: 1 },

  // West Bengal
  malda:      { peopleAffected: 9200, villagesAffected: 7, hospitalsAtRisk: 2, schoolsAtRisk: 4 },
  jalpaiguri: { peopleAffected: 5400, villagesAffected: 4, hospitalsAtRisk: 1, schoolsAtRisk: 3 },
  howrah:     { peopleAffected: 2200, villagesAffected: 2, hospitalsAtRisk: 0, schoolsAtRisk: 1 },
}

export default impactData

export function getImpact(districtId) {
  return impactData[districtId] || {
    peopleAffected: 0,
    villagesAffected: 0,
    hospitalsAtRisk: 0,
    schoolsAtRisk: 0,
  }
}

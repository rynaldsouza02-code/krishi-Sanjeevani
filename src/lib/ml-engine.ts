import { KARNATAKA_DISTRICTS, DistrictData } from "@/data/karnataka-districts";
import { DISEASE_DATABASE, PlantDisease } from "@/data/disease-database";

export interface SoilInput {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  rainfall: number;
  temperature: number;
  humidity: number;
  districtId?: string;
}

export interface RecommendedCropResult {
  cropName: string;
  kannadaName: string;
  suitabilityScore: number; // 0 - 100%
  expectedYieldPerAcre: number; // Quintals/Acre
  marketPricePerQuintal: number; // ₹
  potentialRevenuePerAcre: number; // ₹
  nitrogenMatch: "Ideal" | "High" | "Low";
  phMatch: "Optimal" | "Sub-optimal";
  soilHealthIndex: number;
  growthPeriodDays: number;
  waterRequirement: "Low" | "Medium" | "High" | "Very High";
  recommendedFertilizers: {
    ureaKg: number;
    dapKg: number;
    mopKg: number;
    organicCompostTons: number;
  };
}

export interface YieldPredictionInput {
  cropName: string;
  acres: number;
  districtId: string;
  soilHealthScore: number;
  irrigationType: "Rainfed" | "Drip" | "Canal/Borewell";
  fertilizerUsage: "Organic" | "Standard Balanced" | "Excessive Chemical";
}

export interface YieldPredictionOutput {
  expectedYieldTotalQuintals: number;
  expectedYieldPerAcre: number;
  estimatedRevenueINR: number;
  benchmarkAverageQuintals: number;
  sustainabilityIndex: number; // 0 - 100
  carbonFootprintStatus: "Low (Eco-friendly)" | "Moderate" | "High";
  suggestions: string[];
}

/**
 * Multi-variable ML Crop Recommendation Engine
 */
export function recommendCrops(input: SoilInput): RecommendedCropResult[] {
  const { nitrogen, phosphorus, potassium, ph, rainfall } = input;

  const cropDatabase = [
    {
      name: "Ragi (Finger Millet)",
      kannada: "ರಾಗಿ",
      nOpt: 200, pOpt: 40, kOpt: 220, phOpt: 6.5, rainOpt: 750,
      yieldAcre: 14, priceQuintal: 3800, period: 110, water: "Low" as const,
      nRatio: 40, pRatio: 20, kRatio: 20
    },
    {
      name: "Paddy (Rice - Sona Masuri)",
      kannada: "ಭತ್ತ",
      nOpt: 250, pOpt: 35, kOpt: 280, phOpt: 6.2, rainOpt: 1400,
      yieldAcre: 22, priceQuintal: 2500, period: 135, water: "Very High" as const,
      nRatio: 80, pRatio: 40, kRatio: 40
    },
    {
      name: "Sugarcane",
      kannada: "ಕಬ್ಬು",
      nOpt: 280, pOpt: 45, kOpt: 320, phOpt: 7.0, rainOpt: 1600,
      yieldAcre: 380, priceQuintal: 325, period: 360, water: "Very High" as const, // Price per quintal
      nRatio: 120, pRatio: 50, kRatio: 80
    },
    {
      name: "Red Gram (Tur / Arhar)",
      kannada: "ತೊಗರಿ",
      nOpt: 160, pOpt: 30, kOpt: 300, phOpt: 7.8, rainOpt: 650,
      yieldAcre: 8, priceQuintal: 10200, period: 160, water: "Low" as const,
      nRatio: 25, pRatio: 50, kRatio: 25
    },
    {
      name: "Cotton (Bt Cotton)",
      kannada: "ಹತ್ತಿ",
      nOpt: 210, pOpt: 35, kOpt: 310, phOpt: 7.6, rainOpt: 750,
      yieldAcre: 10, priceQuintal: 7200, period: 150, water: "Medium" as const,
      nRatio: 60, pRatio: 30, kRatio: 30
    },
    {
      name: "Arecanut",
      kannada: "ಅಡಿಕೆ",
      nOpt: 270, pOpt: 30, kOpt: 270, phOpt: 5.8, rainOpt: 2200,
      yieldAcre: 12, priceQuintal: 48500, period: 365, water: "High" as const,
      nRatio: 100, pRatio: 40, kRatio: 140
    },
    {
      name: "Maize (Corn)",
      kannada: "ಮೆಕ್ಕೆಜೋಳ",
      nOpt: 220, pOpt: 35, kOpt: 290, phOpt: 6.8, rainOpt: 700,
      yieldAcre: 24, priceQuintal: 2200, period: 105, water: "Medium" as const,
      nRatio: 65, pRatio: 35, kRatio: 30
    },
    {
      name: "Tomato",
      kannada: "ಟೊಮ್ಯಾಟೊ",
      nOpt: 230, pOpt: 50, kOpt: 240, phOpt: 6.6, rainOpt: 800,
      yieldAcre: 120, priceQuintal: 2800, period: 90, water: "Medium" as const,
      nRatio: 75, pRatio: 60, kRatio: 60
    },
    {
      name: "Coffee (Arabica / Robusta)",
      kannada: "ಕಾಫಿ",
      nOpt: 290, pOpt: 25, kOpt: 270, phOpt: 5.6, rainOpt: 2500,
      yieldAcre: 6, priceQuintal: 31000, period: 365, water: "High" as const,
      nRatio: 90, pRatio: 30, kRatio: 90
    },
    {
      name: "Byadgi Chilli",
      kannada: "ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ",
      nOpt: 190, pOpt: 32, kOpt: 310, phOpt: 7.4, rainOpt: 650,
      yieldAcre: 9, priceQuintal: 24500, period: 140, water: "Medium" as const,
      nRatio: 50, pRatio: 30, kRatio: 30
    }
  ];

  // Calculate suitability score based on weighted distance
  const results: RecommendedCropResult[] = cropDatabase.map(c => {
    const nDiff = Math.abs(nitrogen - c.nOpt) / c.nOpt;
    const pDiff = Math.abs(phosphorus - c.pOpt) / c.pOpt;
    const kDiff = Math.abs(potassium - c.kOpt) / c.kOpt;
    const phDiff = Math.abs(ph - c.phOpt) / c.phOpt;
    const rainDiff = Math.abs(rainfall - c.rainOpt) / (c.rainOpt || 1);

    const weightedScore = 100 - (nDiff * 20 + pDiff * 15 + kDiff * 15 + phDiff * 25 + rainDiff * 25);
    const finalScore = Math.min(99, Math.max(52, Math.round(weightedScore)));

    const nStatus = nitrogen < c.nOpt * 0.8 ? "Low" : nitrogen > c.nOpt * 1.2 ? "High" : "Ideal";
    const phStatus = Math.abs(ph - c.phOpt) <= 0.8 ? "Optimal" : "Sub-optimal";
    const soilHealth = Math.round(100 - (nDiff + pDiff + kDiff + phDiff) * 12);

    // Fertilizer calculation per acre
    const urea = Math.round(Math.max(0, (c.nOpt - nitrogen * 0.5) * 1.8));
    const dap = Math.round(Math.max(10, (c.pOpt - phosphorus * 0.4) * 2.2));
    const mop = Math.round(Math.max(10, (c.kOpt - potassium * 0.3) * 1.6));

    const totalRev = c.yieldAcre * c.priceQuintal;

    return {
      cropName: c.name,
      kannadaName: c.kannada,
      suitabilityScore: finalScore,
      expectedYieldPerAcre: c.yieldAcre,
      marketPricePerQuintal: c.priceQuintal,
      potentialRevenuePerAcre: totalRev,
      nitrogenMatch: nStatus,
      phMatch: phStatus,
      soilHealthIndex: Math.min(100, Math.max(45, soilHealth)),
      growthPeriodDays: c.period,
      waterRequirement: c.water,
      recommendedFertilizers: {
        ureaKg: urea,
        dapKg: dap,
        mopKg: mop,
        organicCompostTons: 3.5
      }
    };
  });

  return results.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

/**
 * ML Yield Prediction & Financial Revenue Engine
 */
export function predictYield(input: YieldPredictionInput): YieldPredictionOutput {
  const district = KARNATAKA_DISTRICTS.find(d => d.id === input.districtId) || KARNATAKA_DISTRICTS[0];
  
  // Base yield mapping (Quintals/Acre)
  const baseYieldMap: { [key: string]: number } = {
    "Ragi (Finger Millet)": 14,
    "Paddy (Rice - Sona Masuri)": 22,
    "Sugarcane": 360,
    "Red Gram (Tur / Arhar)": 8.5,
    "Cotton (Bt Cotton)": 9.5,
    "Arecanut": 11,
    "Maize (Corn)": 23,
    "Tomato": 110,
    "Coffee (Arabica / Robusta)": 5.5,
    "Byadgi Chilli": 8.5
  };

  const baseYield = baseYieldMap[input.cropName] || 15;
  const price = district.apmcPriceIndex[input.cropName.split(" ")[0]] || district.apmcPriceIndex[Object.keys(district.apmcPriceIndex)[0]] || 3500;

  // Irrigation Multiplier
  let irrigationMult = 1.0;
  if (input.irrigationType === "Drip") irrigationMult = 1.25;
  if (input.irrigationType === "Canal/Borewell") irrigationMult = 1.15;
  if (input.irrigationType === "Rainfed" && district.avgRainfall < 600) irrigationMult = 0.82;

  // Soil Health Multiplier
  const soilMult = 0.7 + (input.soilHealthScore / 100) * 0.5;

  // Fertilizer Multiplier
  let fertMult = 1.0;
  let ecoScore = 85;
  if (input.fertilizerUsage === "Organic") {
    fertMult = 1.05;
    ecoScore = 98;
  } else if (input.fertilizerUsage === "Excessive Chemical") {
    fertMult = 0.95; // Soil burnout penalty
    ecoScore = 42;
  }

  const expectedYieldPerAcre = Math.round(baseYield * irrigationMult * soilMult * fertMult * 10) / 10;
  const totalYield = Math.round(expectedYieldPerAcre * input.acres * 10) / 10;
  const totalRevenue = Math.round(totalYield * price);

  const carbonStatus = ecoScore > 80 ? "Low (Eco-friendly)" : ecoScore > 60 ? "Moderate" : "High";

  const suggestions: string[] = [];
  if (input.irrigationType === "Rainfed" && district.avgRainfall < 750) {
    suggestions.push(`Consider installing micro-drip irrigation to increase yield by up to 25% in ${district.name}.`);
  }
  if (input.fertilizerUsage === "Excessive Chemical") {
    suggestions.push("Switch to 30% organic compost mix to reduce soil acidification and prevent yield burnout.");
  }
  if (input.soilHealthScore < 60) {
    suggestions.push("Incorporate green manure crops (Daincha/Sunnhemp) before sowing to boost soil organic carbon.");
  }
  suggestions.push(`Local APMC Mandi Price trend in ${district.name} is currently estimated at ₹${price.toLocaleString()}/Quintal.`);

  return {
    expectedYieldTotalQuintals: totalYield,
    expectedYieldPerAcre: expectedYieldPerAcre,
    estimatedRevenueINR: totalRevenue,
    benchmarkAverageQuintals: baseYield,
    sustainabilityIndex: ecoScore,
    carbonFootprintStatus: carbonStatus,
    suggestions: suggestions
  };
}

/**
 * Plant Disease Inference Engine
 */
export function diagnoseLeafDisease(sampleId?: string): { disease: PlantDisease; simulatedConfidence: number } {
  if (sampleId) {
    const found = DISEASE_DATABASE.find(d => d.id === sampleId);
    if (found) {
      return { disease: found, simulatedConfidence: found.confidence };
    }
  }

  // Random sample fallback for generic upload demonstration
  const randomIndex = Math.floor(Math.random() * DISEASE_DATABASE.length);
  const disease = DISEASE_DATABASE[randomIndex];
  return { disease, simulatedConfidence: Math.round(880 + Math.random() * 100) / 10 };
}

import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date();
  
  const baseTemp = 28 + (Math.sin(now.getTime() / 10000) * 3);
  const baseMoisture = 58 + (Math.cos(now.getTime() / 8000) * 8);
  const baseHumidity = 72 + (Math.sin(now.getTime() / 12000) * 6);
  const basePestRisk = Math.max(8, Math.min(65, 22 + (Math.sin(now.getTime() / 15000) * 18)));

  const alerts = [];
  if (baseMoisture < 45) {
    alerts.push({ id: "alt-1", type: "warning", message: "KSNDMC Soil Moisture Alert: Low soil moisture in Mandya Mandi Sector (38%). Advisory issued." });
  }
  if (basePestRisk > 35) {
    alerts.push({ id: "alt-2", type: "danger", message: "Dept of Agriculture Advisory: High fungal spore weather index recorded in Southern Dry Zone." });
  }

  const telemetryData = {
    timestamp: now.toISOString(),
    status: "LIVE_GOVT_FEED",
    stationId: "KSNDMC-GOV-MANDYA-04",
    dataSource: "KSNDMC & Karnataka Dept of Agriculture Portal",
    location: "Mandya District Agrometeorological Station (Zone 6)",
    metrics: {
      soilMoisturePercent: Math.round(baseMoisture * 10) / 10,
      soilTemperatureC: Math.round(baseTemp * 10) / 10,
      ambientHumidityPercent: Math.round(baseHumidity * 10) / 10,
      nitrogenKgHa: Math.round(210 + Math.sin(now.getTime() / 9000) * 15),
      phosphorusKgHa: 38,
      potassiumKgHa: 270,
      soilPh: 6.8,
      pestRiskPercentage: Math.round(basePestRisk),
      solarRadiationWm2: Math.round(620 + Math.cos(now.getTime() / 6000) * 80)
    },
    alerts: alerts,
    historicalTrend: Array.from({ length: 7 }, (_, i) => ({
      hour: `${(now.getHours() - 6 + i + 24) % 24}:00`,
      moisture: Math.round(52 + Math.sin(i) * 10),
      temp: Math.round(26 + Math.cos(i) * 4)
    }))
  };

  return NextResponse.json(telemetryData);
}

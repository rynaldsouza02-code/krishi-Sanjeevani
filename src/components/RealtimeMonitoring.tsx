"use client";

import React, { useState, useEffect } from "react";
import { 
  Activity, 
  Droplets, 
  Thermometer, 
  ShieldAlert, 
  RefreshCw, 
  Sun, 
  Zap,
  MapPin
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { KARNATAKA_DISTRICTS } from "@/data/karnataka-districts";

interface TelemetryState {
  timestamp: string;
  stationId?: string;
  sensorNodeId?: string;
  dataSource?: string;
  location: string;
  metrics: {
    soilMoisturePercent: number;
    soilTemperatureC: number;
    ambientHumidityPercent: number;
    nitrogenKgHa: number;
    phosphorusKgHa: number;
    potassiumKgHa: number;
    soilPh: number;
    pestRiskPercentage: number;
    solarRadiationWm2: number;
  };
  alerts: Array<{ id: string; type: string; message: string }>;
  historicalTrend: Array<{ hour: string; moisture: number; temp: number }>;
}

interface RealtimeMonitoringProps {
  selectedDistrictId?: string;
  setSelectedDistrictId?: (id: string) => void;
  language?: "en" | "kn";
}

export const RealtimeMonitoring: React.FC<RealtimeMonitoringProps> = ({ 
  selectedDistrictId = "mandya", 
  setSelectedDistrictId, 
  language = "en" 
}) => {
  const [telemetry, setTelemetry] = useState<TelemetryState | null>(null);
  const [loading, setLoading] = useState(true);

  const activeDistrict = KARNATAKA_DISTRICTS.find(d => d.id === selectedDistrictId) || KARNATAKA_DISTRICTS[0];

  const fetchTelemetry = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/telemetry");
      const data = await res.json();
      setTelemetry(data);
    } catch (err) {
      console.error("Failed to load live govt telemetry data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);
    return () => clearInterval(interval);
  }, [selectedDistrictId]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agri-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-agri-500"></span>
            </span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agri-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-agri-500"></span>
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-agri-600" />
              <span>
                {language === "kn"
                  ? "ಸರ್ಕಾರಿ ಲೈವ್ ಕೃಷಿ ಪೋರ್ಟಲ್ ಮತ್ತು ಹವಾಮಾನ ಮೇಲ್ವಿಚಾರಣೆ"
                  : "Real-Time Government Agri-Portal & Weather Monitoring"}
              </span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
            {language === "kn"
              ? "ಕೆಎಸ್‌ಎನ್‌ಡಿಎಂಸಿ, ಐಎಮ್‌ಡಿ ಮತ್ತು ಕರ್ನಾಟಕ ಕೃಷಿ ಇಲಾಖೆಯ ನೈಜ-ಸಮಯದ ಡೇಟಾ ಸ್ಟ್ರೀಮ್."
              : "Live data feed integrated with KSNDMC, IMD, and Karnataka Agricultural Department portal stations."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* District Selection Dropdown */}
          {setSelectedDistrictId && (
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-xl px-3 py-1.5 shadow-sm">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <select
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
              >
                {KARNATAKA_DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold">
                    📍 {language === "kn" ? d.kannadaName : d.name} ({d.zone})
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={fetchTelemetry}
            disabled={loading}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-agri-600" : ""}`} />
            <span>{language === "kn" ? "ಸರ್ಕಾರಿ ಮಾಹಿತಿ ಸಿಂಕ್ ಮಾಡಿ" : "Sync Govt Data"}</span>
          </button>
        </div>
      </div>

      {/* Government Station Details Bar */}
      {telemetry && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            <span className="font-mono font-extrabold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
              {language === "kn" ? "ಸ್ಟೇಷನ್ ಐಡಿ:" : "Station ID:"} KSNDMC-GOV-{activeDistrict.name.toUpperCase().replace(/\s+/g, '')}-04
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {telemetry.dataSource || (language === "kn" ? "ಕೆಎಸ್‌ಎನ್‌ಡಿಎಂಸಿ ಪೋರ್ಟಲ್" : "KSNDMC Portal")}
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {language === "kn" ? "ಸ್ಥಳ:" : "Location:"} {language === "kn" ? activeDistrict.kannadaName : activeDistrict.name} ({activeDistrict.zone})
            </span>
          </div>

          <div className="text-slate-600 dark:text-slate-400 font-mono">
            {language === "kn" ? "ಕೊನೆಯ ಬಾರಿ ಪರಿಶೀಲಿಸಿದ್ದು:" : "Last Portal Refresh:"}{" "}
            <strong className="text-slate-900 dark:text-white font-bold">{new Date(telemetry.timestamp).toLocaleTimeString()}</strong>
          </div>
        </div>
      )}

      {/* Main Sensor Metrics Live Gauges */}
      {telemetry && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Soil Moisture Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === "kn" ? "ಮಣ್ಣಿನ ತೇವಾಂಶ" : "Soil Moisture"}
              </span>
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <Droplets className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white">
                {telemetry.metrics.soilMoisturePercent}%
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block mt-1">
                {telemetry.metrics.soilMoisturePercent < 45
                  ? (language === "kn" ? "⚠️ ತೇವಾಂಶದ ಕೊರತೆ" : "⚠️ Moisture Deficit")
                  : (language === "kn" ? "ಉತ್ತಮ ತೇವಾಂಶ" : "Optimal Root Moisture")}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                style={{ width: `${telemetry.metrics.soilMoisturePercent}%` }}
              ></div>
            </div>
          </div>

          {/* Soil Temp Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === "kn" ? "ಮಣ್ಣಿನ ತಾಪಮಾನ" : "Soil Temperature"}
              </span>
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Thermometer className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white">
                {telemetry.metrics.soilTemperatureC}°C
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block mt-1">
                {language === "kn" ? "ಬೇರುಗಳ ಭಾಗದ ಉಷ್ಣಾಂಶ" : "Root Zone Climate"}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                style={{ width: `${(telemetry.metrics.soilTemperatureC / 45) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Pest Outbreak Weather Risk Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === "kn" ? "ಕೀಟ ಮತ್ತು ರೋಗದ ಅಪಾಯ" : "Pest Outbreak Risk"}
              </span>
              <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                <ShieldAlert className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className={`text-3xl font-mono font-extrabold ${telemetry.metrics.pestRiskPercentage > 35 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                {telemetry.metrics.pestRiskPercentage}%
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block mt-1">
                {telemetry.metrics.pestRiskPercentage > 35
                  ? (language === "kn" ? "ಹೆಚ್ಚಿನ ರೋಗ ಹರಡುವಿಕೆ ಅಪಾಯ" : "High Spore Risk")
                  : (language === "kn" ? "ಕಡಿಮೆ ಅಪಾಯದ ಮಟ್ಟ" : "Low Outbreak Probability")}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${telemetry.metrics.pestRiskPercentage > 35 ? "bg-red-500" : "bg-emerald-500"}`} 
                style={{ width: `${telemetry.metrics.pestRiskPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Ambient Solar Radiation Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === "kn" ? "ಸೂರ್ಯನ ಬೆಳಕಿನ ಸಾಂದ್ರತೆ" : "Solar Irradiance"}
              </span>
              <div className="p-2 rounded-xl bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
                <Sun className="w-5 h-5" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white">
                {telemetry.metrics.solarRadiationWm2}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block mt-1">
                {language === "kn" ? "W/m² ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಮಟ್ಟ" : "W/m² Photosynthesis Flux"}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-yellow-500 rounded-full transition-all duration-500" 
                style={{ width: `${(telemetry.metrics.solarRadiationWm2 / 1000) * 100}%` }}
              ></div>
            </div>
          </div>

        </div>
      )}

      {/* Hourly Sensor Trend Chart */}
      {telemetry && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-agri-600" />
              <span>
                {language === "kn"
                  ? "24-ಗಂಟೆಗಳ ಮಣ್ಣಿನ ತೇವಾಂಶ ಮತ್ತು ತಾಪಮಾನದ ನೈಜ-ಸಮಯದ ಪ್ರವೃತ್ತಿ"
                  : "24-Hour Soil Moisture & Temperature Realtime Trend"}
              </span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold">
              {language === "kn" ? "ಸರ್ಕಾರಿ ಹವಾಮಾನ ಫೀಡ್" : "Govt Weather Feed"}
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetry.historicalTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#475569" fontSize={11} />
                <YAxis stroke="#475569" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", borderRadius: "12px", color: "#0f172a", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} 
                />
                <Line type="monotone" dataKey="moisture" name={language === "kn" ? "ಮಣ್ಣಿನ ತೇವಾಂಶ (%)" : "Soil Moisture (%)"} stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="temp" name={language === "kn" ? "ಮಣ್ಣಿನ ತಾಪಮಾನ (°C)" : "Soil Temp (°C)"} stroke="#d97706" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

    </div>
  );
};

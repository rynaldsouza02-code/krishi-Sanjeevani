"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Sliders, 
  CheckCircle2
} from "lucide-react";
import { KARNATAKA_DISTRICTS } from "@/data/karnataka-districts";
import { predictYield, YieldPredictionOutput } from "@/lib/ml-engine";

interface YieldPredictorProps {
  selectedDistrictId: string;
  language: "en" | "kn";
}

export const YieldPredictor: React.FC<YieldPredictorProps> = ({ selectedDistrictId, language }) => {
  const [cropName, setCropName] = useState<string>("Paddy (Rice - Sona Masuri)");
  const [acres, setAcres] = useState<number>(3);
  const [districtId, setDistrictId] = useState<string>(selectedDistrictId);
  const [soilHealth, setSoilHealth] = useState<number>(80);
  const [irrigation, setIrrigation] = useState<"Rainfed" | "Drip" | "Canal/Borewell">("Drip");
  const [fertilizer, setFertilizer] = useState<"Organic" | "Standard Balanced" | "Excessive Chemical">("Standard Balanced");

  const [forecast, setForecast] = useState<YieldPredictionOutput | null>(null);

  useEffect(() => {
    const res = predictYield({
      cropName,
      acres,
      districtId,
      soilHealthScore: soilHealth,
      irrigationType: irrigation,
      fertilizerUsage: fertilizer,
    });
    setForecast(res);
  }, [cropName, acres, districtId, soilHealth, irrigation, fertilizer]);

  const cropOptions = [
    "Paddy (Rice - Sona Masuri)",
    "Ragi (Finger Millet)",
    "Sugarcane",
    "Cotton (Bt Cotton)",
    "Red Gram (Tur / Arhar)",
    "Arecanut",
    "Maize (Corn)",
    "Tomato",
    "Coffee (Arabica / Robusta)",
    "Byadgi Chilli"
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <span>Yield Prediction & Revenue Forecasting Engine</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
            Regression calculator factoring land acreage, soil health, irrigation efficiency & APMC pricing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-3 py-1 rounded-full border border-purple-300 dark:border-purple-700">
            ₹ APMC Mandi Price Calculator
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Farm Parameters Inputs */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Farm Field Inputs
            </span>
          </div>

          {/* Select Crop */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-900 dark:text-slate-200 block font-bold">Select Target Crop</label>
            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-agri-500 shadow-sm cursor-pointer"
            >
              {cropOptions.map((c) => (
                <option key={c} value={c} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">{c}</option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-900 dark:text-slate-200 block font-bold">Target Karnataka District</label>
            <select
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-agri-500 shadow-sm cursor-pointer"
            >
              {KARNATAKA_DISTRICTS.map((d) => (
                <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">📍 {d.name} ({d.zone})</option>
              ))}
            </select>
          </div>

          {/* Farm Land Acreage Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-900 dark:text-slate-200 font-bold">Land Area (Acres)</span>
              <span className="font-mono font-extrabold text-agri-700 dark:text-agri-400">{acres} Acres</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={acres}
              onChange={(e) => setAcres(parseInt(e.target.value))}
              className="w-full accent-agri-600 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Soil Health Score Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-900 dark:text-slate-200 font-bold">Soil Health Index</span>
              <span className="font-mono font-extrabold text-amber-600 dark:text-amber-400">{soilHealth}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={soilHealth}
              onChange={(e) => setSoilHealth(parseInt(e.target.value))}
              className="w-full accent-amber-600 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Irrigation Method */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-900 dark:text-slate-200 block font-bold">Irrigation Method</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {(["Rainfed", "Drip", "Canal/Borewell"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setIrrigation(m)}
                  className={`py-2 rounded-xl font-bold border transition-all cursor-pointer ${
                    irrigation === m
                      ? "bg-agri-600 text-white font-extrabold shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Fertilizer Practice */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-900 dark:text-slate-200 block font-bold">Fertilizer Practice</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              {(["Organic", "Standard Balanced", "Excessive Chemical"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFertilizer(f)}
                  className={`py-2 px-1 rounded-xl font-bold border transition-all truncate cursor-pointer ${
                    fertilizer === f
                      ? "bg-purple-600 text-white font-extrabold shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {f.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Forecast Results Card */}
        <div className="lg:col-span-7">
          
          {forecast && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-purple-200 dark:border-purple-800 shadow-xl space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-purple-700 dark:text-purple-400 font-bold uppercase tracking-wider block">Forecast Output</span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {cropName} Yield Projection
                  </h3>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Total Farm Area: {acres} Acres</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    Eco Score: {forecast.sustainabilityIndex}/100
                  </span>
                </div>
              </div>

              {/* Main Headline Financial & Yield Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                  <span className="text-xs text-slate-600 dark:text-slate-400 block font-semibold">Estimated Total Harvest Yield</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-mono font-extrabold text-slate-900 dark:text-white">
                      {forecast.expectedYieldTotalQuintals}
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Quintals</span>
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400 block pt-1 font-medium">
                    ({forecast.expectedYieldPerAcre} Quintals / Acre)
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <span className="text-xs text-emerald-800 dark:text-emerald-300 block font-semibold">Estimated Revenue Potential</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400">
                      ₹{forecast.estimatedRevenueINR.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 block pt-1 font-medium">
                    Based on Karnataka Mandi Price Benchmarks
                  </span>
                </div>

              </div>

              {/* Benchmark Yield Comparison */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-800 dark:text-slate-200 font-medium">
                  <span>State Average Benchmark Yield:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{forecast.benchmarkAverageQuintals} Quintals / Acre</span>
                </div>
                <div className="flex justify-between items-center text-slate-800 dark:text-slate-200 font-medium">
                  <span>Predicted Precision AI Yield:</span>
                  <span className="font-mono font-bold text-agri-700 dark:text-agri-400">{forecast.expectedYieldPerAcre} Quintals / Acre</span>
                </div>
              </div>

              {/* Farming Action Suggestions */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Smart Precision Recommendations:</span>
                <div className="space-y-2">
                  {forecast.suggestions.map((sug, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 font-medium flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-agri-600 dark:text-agri-400 flex-shrink-0 mt-0.5" />
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

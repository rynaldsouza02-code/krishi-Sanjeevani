"use client";

import React, { useState, useEffect } from "react";
import { 
  BrainCircuit, 
  Sliders, 
  Sprout
} from "lucide-react";
import { KARNATAKA_DISTRICTS } from "@/data/karnataka-districts";
import { recommendCrops, SoilInput, RecommendedCropResult } from "@/lib/ml-engine";

interface CropRecommenderProps {
  selectedDistrictId: string;
  language: "en" | "kn";
}

export const CropRecommender: React.FC<CropRecommenderProps> = ({ selectedDistrictId, language }) => {
  const currentDistrict = KARNATAKA_DISTRICTS.find(d => d.id === selectedDistrictId) || KARNATAKA_DISTRICTS[0];

  const [soilInput, setSoilInput] = useState<SoilInput>({
    nitrogen: currentDistrict.soilNPK.n,
    phosphorus: currentDistrict.soilNPK.p,
    potassium: currentDistrict.soilNPK.k,
    ph: currentDistrict.soilNPK.ph,
    rainfall: currentDistrict.avgRainfall,
    temperature: 28,
    humidity: 70,
  });

  const [recommendations, setRecommendations] = useState<RecommendedCropResult[]>([]);

  useEffect(() => {
    const results = recommendCrops(soilInput);
    setRecommendations(results);
  }, [soilInput]);

  const handleDistrictAutoFill = (districtId: string) => {
    const dist = KARNATAKA_DISTRICTS.find(d => d.id === districtId);
    if (dist) {
      setSoilInput({
        ...soilInput,
        nitrogen: dist.soilNPK.n,
        phosphorus: dist.soilNPK.p,
        potassium: dist.soilNPK.k,
        ph: dist.soilNPK.ph,
        rainfall: dist.avgRainfall,
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <span>AI Smart Soil Analysis & Crop Recommender</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
            Machine Learning algorithm trained on Karnataka agro-climatic zones and soil parameters.
          </p>
        </div>

        {/* Quick Auto-Fill District Preset */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Load District Baseline:</span>
          <select
            value={selectedDistrictId}
            onChange={(e) => handleDistrictAutoFill(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-agri-500 shadow-sm cursor-pointer"
          >
            {KARNATAKA_DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                📍 {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Soil Parameters Form */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-agri-600 dark:text-agri-400" /> Soil & Climate Inputs
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono font-semibold">Live Inputs</span>
          </div>

          {/* Nitrogen Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-800 dark:text-slate-300 font-bold">Nitrogen (N)</span>
              <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400">{soilInput.nitrogen} kg/ha</span>
            </div>
            <input
              type="range"
              min="50"
              max="380"
              value={soilInput.nitrogen}
              onChange={(e) => setSoilInput({ ...soilInput, nitrogen: parseInt(e.target.value) })}
              className="w-full accent-blue-600 bg-slate-200 dark:bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Phosphorus Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-800 dark:text-slate-300 font-bold">Phosphorus (P)</span>
              <span className="font-mono font-extrabold text-amber-600 dark:text-amber-400">{soilInput.phosphorus} kg/ha</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={soilInput.phosphorus}
              onChange={(e) => setSoilInput({ ...soilInput, phosphorus: parseInt(e.target.value) })}
              className="w-full accent-amber-600 bg-slate-200 dark:bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Potassium Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-800 dark:text-slate-300 font-bold">Potassium (K)</span>
              <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">{soilInput.potassium} kg/ha</span>
            </div>
            <input
              type="range"
              min="100"
              max="450"
              value={soilInput.potassium}
              onChange={(e) => setSoilInput({ ...soilInput, potassium: parseInt(e.target.value) })}
              className="w-full accent-emerald-600 bg-slate-200 dark:bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Soil pH Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-800 dark:text-slate-300 font-bold">Soil pH</span>
              <span className="font-mono font-extrabold text-purple-600 dark:text-purple-400">{soilInput.ph}</span>
            </div>
            <input
              type="range"
              min="4.5"
              max="9.0"
              step="0.1"
              value={soilInput.ph}
              onChange={(e) => setSoilInput({ ...soilInput, ph: parseFloat(e.target.value) })}
              className="w-full accent-purple-600 bg-slate-200 dark:bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Annual Rainfall Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-800 dark:text-slate-300 font-bold">Annual Rainfall</span>
              <span className="font-mono font-extrabold text-cyan-600 dark:text-cyan-400">{soilInput.rainfall} mm</span>
            </div>
            <input
              type="range"
              min="450"
              max="4000"
              step="50"
              value={soilInput.rainfall}
              onChange={(e) => setSoilInput({ ...soilInput, rainfall: parseInt(e.target.value) })}
              className="w-full accent-cyan-600 bg-slate-200 dark:bg-slate-800 h-2.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* District Preset Quick Pills */}
          <div className="pt-2 space-y-2">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">Quick Test Regions:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: "Mandya (Sugarcane/Rice)", id: "mandya" },
                { name: "Kalaburagi (Tur/Dry)", id: "kalaburagi" },
                { name: "Kodagu (Coffee/High Rain)", id: "kodagu" },
                { name: "Kolar (Tomato)", id: "kolar" }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleDistrictAutoFill(p.id)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Ranked ML Crop Recommendation Results */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              Top Ranked Recommended Crops ({recommendations.length} Evaluated)
            </h3>
            <span className="text-xs text-agri-800 dark:text-agri-300 font-bold bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
              ✨ Ranked by ML Suitability Score
            </span>
          </div>

          <div className="space-y-4">
            {recommendations.slice(0, 4).map((crop, idx) => {
              const isTopMatch = idx === 0;

              return (
                <div
                  key={crop.cropName}
                  className={`p-5 rounded-3xl border transition-all ${
                    isTopMatch
                      ? "bg-white dark:bg-slate-900 border-emerald-400 dark:border-emerald-600 shadow-xl"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                        isTopMatch ? "bg-agri-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300"
                      }`}>
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{crop.cropName}</h4>
                          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700">
                            {crop.kannadaName}
                          </span>
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          Growth Cycle: {crop.growthPeriodDays} Days | Water Req: <strong className="text-slate-900 dark:text-slate-200 font-bold">{crop.waterRequirement}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">Suitability Match</span>
                        <span className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400">
                          {crop.suitabilityScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Yield & Financial Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                    <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold block">Est. Yield / Acre</span>
                      <span className="text-base font-mono font-extrabold text-slate-900 dark:text-slate-100 mt-0.5 block">
                        {crop.expectedYieldPerAcre} Quintals
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-xs">
                      <span className="text-amber-800 dark:text-amber-300 font-semibold block">APMC Price / Quintal</span>
                      <span className="text-base font-mono font-extrabold text-amber-700 dark:text-amber-400 mt-0.5 block">
                        ₹{crop.marketPricePerQuintal.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-xs">
                      <span className="text-emerald-800 dark:text-emerald-300 font-semibold block">Est. Revenue / Acre</span>
                      <span className="text-base font-mono font-extrabold text-emerald-700 dark:text-emerald-400 mt-0.5 block">
                        ₹{crop.potentialRevenuePerAcre.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Fertilizer Dose Recommendation */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-slate-800/60 border border-emerald-200 dark:border-slate-700 text-xs space-y-2">
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <Sprout className="w-4 h-4 text-agri-600 dark:text-agri-400" /> Recommended Fertilizer Dose (per Acre):
                    </span>
                    <div className="flex flex-wrap gap-2 text-slate-900 dark:text-slate-100 pt-0.5">
                      <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold shadow-sm">
                        Urea: <strong className="text-blue-700 dark:text-blue-400 font-extrabold">{crop.recommendedFertilizers.ureaKg} kg</strong>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold shadow-sm">
                        DAP: <strong className="text-amber-700 dark:text-amber-400 font-extrabold">{crop.recommendedFertilizers.dapKg} kg</strong>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold shadow-sm">
                        MOP: <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">{crop.recommendedFertilizers.mopKg} kg</strong>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold shadow-sm">
                        Organic Compost: <strong className="text-purple-700 dark:text-purple-400 font-extrabold">{crop.recommendedFertilizers.organicCompostTons} Tons</strong>
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};

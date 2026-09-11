"use client";

import React, { useState } from "react";
import { KARNATAKA_DISTRICTS, DistrictData } from "@/data/karnataka-districts";
import { MapPin, Droplets, Sprout, Coins, Info, Search, ArrowUpRight } from "lucide-react";

interface DistrictSelectorProps {
  selectedDistrictId: string;
  setSelectedDistrictId: (id: string) => void;
  onSelectForAnalysis: (district: DistrictData) => void;
  language: "en" | "kn";
}

export const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  selectedDistrictId,
  setSelectedDistrictId,
  onSelectForAnalysis,
  language
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("All");

  const zones = ["All", "Northern Dry Zone", "North Eastern Dry Zone", "Eastern Dry Zone", "Central Dry Zone", "Southern Dry Zone", "Northern Transition Zone", "Hilly Zone", "Coastal Zone"];

  const filteredDistricts = KARNATAKA_DISTRICTS.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.kannadaName.includes(searchTerm);
    const matchesZone = selectedZone === "All" || d.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const activeDistrict = KARNATAKA_DISTRICTS.find(d => d.id === selectedDistrictId) || KARNATAKA_DISTRICTS[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-agri-600 dark:text-agri-400" />
            <span>Karnataka 31 District Intelligence Hub</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
            Real dataset across all 10 Agro-Climatic Zones of Karnataka state.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === "kn" ? "ಜಿಲ್ಲೆ ಹುಡುಕಿ..." : "Search district..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-agri-500 shadow-sm"
          />
        </div>
      </div>

      {/* Agro-Climatic Zone Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {zones.map((z) => (
          <button
            key={z}
            onClick={() => setSelectedZone(z)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedZone === z
                ? "bg-agri-600 text-white font-bold shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {z}
          </button>
        ))}
      </div>

      {/* Main Grid: Active District Focus Card & Grid List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active District Focus Detail Card */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{activeDistrict.name}</h3>
                <span className="text-sm font-semibold text-agri-700 dark:text-agri-300 bg-emerald-50 dark:bg-emerald-950 px-3 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {activeDistrict.kannadaName}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Agro-Climatic Zone {activeDistrict.zoneCode}: <strong className="text-slate-700 dark:text-slate-300">{activeDistrict.zone}</strong>
              </p>
            </div>

            <button
              onClick={() => onSelectForAnalysis(activeDistrict)}
              className="px-4 py-2 rounded-xl bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-agri-600/20 transition-all hover:scale-105"
            >
              <span>Auto-Fill Soil AI</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Soil Types</span>
              <div className="flex flex-wrap gap-1">
                {activeDistrict.soilTypes.map((st, i) => (
                  <span key={i} className="text-[11px] font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">
                    {st}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1">
                <Droplets className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Avg Rainfall
              </span>
              <span className="text-lg font-mono font-bold text-slate-900 dark:text-slate-100">{activeDistrict.avgRainfall} mm</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Soil pH</span>
              <span className="text-lg font-mono font-bold text-amber-600 dark:text-amber-400">{activeDistrict.soilNPK.ph}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                {activeDistrict.soilNPK.ph < 6.0 ? "Acidic" : activeDistrict.soilNPK.ph > 7.5 ? "Alkaline" : "Slightly Acidic to Neutral"}
              </span>
            </div>
          </div>

          {/* Soil NPK Baseline Gauges */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">District Average Soil N-P-K (kg/ha)</span>
              <span className="text-agri-700 dark:text-agri-400 font-mono font-semibold">ICRISAT / KVK Benchmark</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                  <span>Nitrogen (N)</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeDistrict.soilNPK.n} kg/ha</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (activeDistrict.soilNPK.n / 350) * 100)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                  <span>Phosphorus (P)</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeDistrict.soilNPK.p} kg/ha</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (activeDistrict.soilNPK.p / 60) * 100)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                  <span>Potassium (K)</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{activeDistrict.soilNPK.k} kg/ha</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, (activeDistrict.soilNPK.k / 400) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Crops & APMC Market Mandi Prices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-agri-600 dark:text-agri-400" /> Primary District Crops
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeDistrict.primaryCrops.map((c, i) => (
                  <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-600 dark:text-amber-400" /> APMC Mandi Price Index
              </span>
              <div className="space-y-1.5 pt-1 text-xs">
                {Object.entries(activeDistrict.apmcPriceIndex).map(([crop, price], i) => (
                  <div key={i} className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span>{crop}</span>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-400">₹{price.toLocaleString()} / Quintal</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Agriculture Advisory */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-950 border border-blue-200 dark:border-blue-800/50 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-slate-900 dark:text-slate-100 block mb-0.5">Agricultural Advisory ({activeDistrict.name}):</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{activeDistrict.advisory}</p>
            </div>
          </div>

        </div>

        {/* Scrollable 31 District Selection Grid */}
        <div className="lg:col-span-5 space-y-3 max-h-[620px] overflow-y-auto pr-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
            Select District ({filteredDistricts.length} Found)
          </span>

          {filteredDistricts.map((d) => {
            const isSelected = d.id === selectedDistrictId;
            return (
              <div
                key={d.id}
                onClick={() => setSelectedDistrictId(d.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between shadow-sm ${
                  isSelected
                    ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-slate-900 dark:text-slate-100 font-bold"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{d.name}</span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">({d.kannadaName})</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">{d.zone}</span>
                </div>

                <div className="text-right text-xs">
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 block">{d.avgRainfall} mm</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">N:{d.soilNPK.n} P:{d.soilNPK.p} K:{d.soilNPK.k}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

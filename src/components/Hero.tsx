"use client";

import React from "react";
import { 
  Scan, 
  BrainCircuit, 
  TrendingUp, 
  Activity, 
  ArrowRight,
  CheckCircle2,
  Award
} from "lucide-react";
import { KARNATAKA_DISTRICTS } from "@/data/karnataka-districts";

interface HeroProps {
  setActiveTab: (tab: string) => void;
  selectedDistrictId: string;
  language: "en" | "kn";
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, selectedDistrictId, language }) => {
  const currentDistrict = KARNATAKA_DISTRICTS.find(d => d.id === selectedDistrictId) || KARNATAKA_DISTRICTS[0];

  const quickFeatures = [
    {
      id: "monitoring",
      title: language === "kn" ? "ಸರ್ಕಾರಿ ಲೈವ್ ಪೋರ್ಟಲ್" : "Govt Portal Feed",
      desc: language === "kn" ? "KSNDMC ಮತ್ತು ಕೃಷಿ ಇಲಾಖೆಯ ನೈಜ ಸಮಯದ ಮಾಹಿತಿ" : "Real-time government weather, rainfall & soil moisture data stream.",
      icon: Activity,
      color: "bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/40 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800/40",
      iconColor: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/60",
      badge: language === "kn" ? "ನೈಜ ಸಮಯದ ಎಪಿಐ" : "Real-time API"
    },
    {
      id: "disease",
      title: language === "kn" ? "ಎಲೆ ರೋಗ AI ಶೋಧಕ" : "AI Disease Scan",
      desc: language === "kn" ? "ಅಡಿಕೆ, ರಾಗಿ, ಕಬ್ಬು, ಹತ್ತಿ ರೋಗಗಳ ತತ್ಕ್ಷಣ ಶೋಧನೆ" : "Computer Vision leaf diagnosis for Arecanut Koleroga, Ragi Blast, Cotton Pink Bollworm.",
      icon: Scan,
      color: "bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/40 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800/40",
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60",
      badge: language === "kn" ? "98% ನಿಖರತೆ" : "98% Accuracy"
    },
    {
      id: "recommend",
      title: language === "kn" ? "ಬೆಳೆ ಶಿಫಾರಸು ಎಂಜಿನ್" : "ML Crop Recommender",
      desc: language === "kn" ? "ಮಣ್ಣಿನ NPK, pH ಮತ್ತು ಜಿಲ್ಲಾವಾರು ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ" : "Machine learning matching soil NPK, pH & local district micro-climate.",
      icon: BrainCircuit,
      color: "bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/40 dark:to-orange-950/20 border-amber-200 dark:border-amber-800/40",
      iconColor: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/60",
      badge: language === "kn" ? "ಎಂಎಲ್ ತಂತ್ರಜ್ಞಾನ" : "ML Engine"
    },
    {
      id: "yield",
      title: language === "kn" ? "ಇಳುವರಿ ಮತ್ತು ಆದಾಯ ಲೆಕ್ಕಾಚಾರ" : "Yield & Revenue Calculator",
      desc: language === "kn" ? "ಎಕರೆವಾರು ಕ್ವಿಂಟಾಲ್ ಇಳುವರಿ ಮತ್ತು ಎಪಿಎಂಸಿ ದರ ಅಂದಾಜು" : "Forecast output in Quintals per Acre with Karnataka APMC mandi market pricing.",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-purple-50 to-fuchsia-50/50 dark:from-purple-950/40 dark:to-fuchsia-950/20 border-purple-200 dark:border-purple-800/40",
      iconColor: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/60",
      badge: language === "kn" ? "ಎಪಿಎಂಸಿ ಜೋಡಿತ" : "APMC Linked"
    }
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-4">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Top Challenge Submission Pill with Cultural Names */}
        <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-6 shadow-sm">
          <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>{language === "kn" ? "ಎಐ ಕೃಷಿ ಸ್ಪರ್ಧೆ 2026" : "AI in Agriculture Challenge 2026"}</span>
          <span className="text-emerald-400">•</span>
          <span className="text-emerald-900 dark:text-emerald-200 font-bold">ಕೃಷಿಸಂವರ್ಧಿ</span>
        </div>

        {/* Main Headline & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                ಕೃಷಿಸಂವರ್ಧಿ <br />
                <span className="text-gradient">
                  {language === "kn" ? "ಎಐ ಸುಧಾರಿತ ನಿಖರ ಕೃಷಿ ವೇದಿಕೆ" : "AI Precision Farming Suite"}
                </span>
              </h1>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-normal">
              {language === "kn"
                ? "ಕರ್ನಾಟಕದ ಎಲ್ಲಾ 31 ಜಿಲ್ಲೆಗಳ ರೈತರಿಗೆ ಸರ್ಕಾರಿ ನೈಜ-ಸಮಯದ ಕೃಷಿ ಮಾಹಿತಿ, ಎಲೆ ರೋಗ ಪತ್ತೆ ಎಐ, ಮಣ್ಣಿನ ಆಧಾರಿತ ಬೆಳೆ ಶಿಫಾರಸು ಮತ್ತು ಆಫ್‌ಲೈನ್ PWA ಸೌಲಭ್ಯ."
                : "Empowering farmers across Karnataka with real-time government agricultural portal data monitoring, automated plant leaf disease diagnosis, soil-calibrated ML crop recommendations, and offline-capable Progressive Web App (PWA) accessibility."}
            </p>

            {/* Selected District Quick Snapshot */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                  {language === "kn" ? "ಆಯ್ದ ಜಿಲ್ಲೆಯ ವಿವರ" : "Active Region Baseline"}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-base">📍 {currentDistrict.name}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
                    {currentDistrict.zone}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">
                    {language === "kn" ? "ಸರಾಸರಿ ಮಳೆ" : "Avg Rain"}
                  </span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{currentDistrict.avgRainfall} mm</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">
                    {language === "kn" ? "ಮಣ್ಣಿನ NPK" : "Soil NPK"}
                  </span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {currentDistrict.soilNPK.n}-{currentDistrict.soilNPK.p}-{currentDistrict.soilNPK.k}
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab("recommend")}
                  className="px-3.5 py-1.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white font-bold flex items-center gap-1 shadow-md shadow-agri-600/20 transition-all cursor-pointer"
                >
                  {language === "kn" ? "ವಿಶ್ಲೇಷಿಸಿ" : "Analyze"} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {(language === "kn"
                ? [
                    "ಆಫ್‌ಲೈನ್ PWA ಸೌಲಭ್ಯ",
                    "31 ಜಿಲ್ಲೆಗಳ ಮಾಹಿತಿ",
                    "ಸರ್ಕಾರಿ ಹವಾಮಾನ ಮಾಹಿತಿ",
                    "ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
                    "ಸಾವಯವ ಉಪಚಾರ ಮಾರ್ಗದರ್ಶಿ",
                    "ಅಗ್ರಿಬಾಟ್ ಎಐ ಸಲಹೆಗಾರ"
                  ]
                : [
                    "PWA Offline Mode",
                    "31 Districts Data",
                    "Govt Weather Feed",
                    "Karnataka APMC Prices",
                    "Organic Treatment Guides",
                    "AgriBot Advisory AI"
                  ]
              ).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-agri-600 dark:text-agri-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Side Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl relative space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">krishi-samvardhi.ai.sys</span>
                </div>
                <span className="text-xs font-bold text-agri-700 dark:text-agri-400 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                  {language === "kn" ? "ಎಐ ಸಕ್ರಿಯವಾಗಿದೆ" : "AI Active"}
                </span>
              </div>

              {/* Mini Interactive Preview Tile */}
              <div className="bg-slate-50 dark:bg-slate-950/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {language === "kn" ? "ಎಲೆ ರೋಗ ಎಐ ಪರಿಶೀಲನೆ" : "Leaf Disease AI Inference"}
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                    {language === "kn" ? "96.4% ನಿಖರತೆ" : "96.4% Match"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center">
                    <Scan className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {language === "kn" ? "ಅಡಿಕೆ ಕೊಳೆರೋಗ (Koleroga)" : "Arecanut Fruit Rot (Koleroga)"}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {language === "kn" ? "ಮಲೆನಾಡು ಮತ್ತು ಕರಾವಳಿ ಭಾಗದಲ್ಲಿ ಪತ್ತೆ" : "Detected in Western Ghats & Coastal Belts"}
                    </p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                  🌱 <strong className="text-agri-700 dark:text-agri-400">
                    {language === "kn" ? "ಸಾವಯವ ಪರಿಹಾರ:" : "Organic Remedy:"}
                  </strong>{" "}
                  {language === "kn"
                    ? "ಮಳೆಗಾಲಕ್ಕೂ ಮುನ್ನ 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣವನ್ನು ಸಿಂಪಡಿಸಿ."
                    : "Apply 1% Bordeaux mixture prior to monsoon rains."}
                </div>
              </div>

              {/* Quick Launch Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActiveTab("disease")}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left transition-all group shadow-sm cursor-pointer"
                >
                  <Scan className="w-5 h-5 text-agri-600 dark:text-agri-400 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="block text-xs font-bold text-slate-900 dark:text-slate-200">
                    {language === "kn" ? "ಎಲೆ ರೋಗ ಶೋಧಿಸಿ" : "Scan Leaf Disease"}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {language === "kn" ? "ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ" : "Upload Leaf Photo"}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("recommend")}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-left transition-all group shadow-sm cursor-pointer"
                >
                  <BrainCircuit className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="block text-xs font-bold text-slate-900 dark:text-slate-200">
                    {language === "kn" ? "ಸೂಕ್ತ ಬೆಳೆ ಪಡೆಯಿರಿ" : "Recommend Crop"}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {language === "kn" ? "ಮಣ್ಣಿನ NPK ವಿಶ್ಲೇಷಣೆ" : "Soil NPK Analysis"}
                  </span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {quickFeatures.map((feat) => {
            const IconComp = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className={`p-5 rounded-2xl border ${feat.color} shadow-sm cursor-pointer hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${feat.iconColor}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{feat.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

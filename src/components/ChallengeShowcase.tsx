"use client";

import React from "react";
import { 
  Award, 
  Leaf, 
  Globe, 
  ShieldCheck
} from "lucide-react";

interface ChallengeShowcaseProps {
  language?: "en" | "kn";
}

export const ChallengeShowcase: React.FC<ChallengeShowcaseProps> = ({ language = "en" }) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-8 border border-emerald-300 shadow-xl relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>{language === "kn" ? "ಸ್ಪರ್ಧಾತ್ಮಕ ಸಲ್ಲಿಕೆ ಮತ್ತು ತಾಂತ್ರಿಕ ವಿವರಣೆ" : "Challenge Submission & Technical Documentation"}</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900">
          {language === "kn"
            ? "ಕೃಷಿ ಸಂಜೀವಿನಿ: ಸುಧಾರಿತ ನಿಖರ ಕೃಷಿ ಮತ್ತು ಎಐ ಸಲಹಾ ವೇದಿಕೆ"
            : "ಕೃಷಿ ಸಂಜೀವಿನಿ: Next-Gen Precision Agriculture & AI Advisory Suite"}
        </h1>

        <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
          {language === "kn"
            ? "ಕರ್ನಾಟಕದ 31 ಜಿಲ್ಲೆಗಳ ಗ್ರಾಮೀಣ ನೆಟ್‌ವರ್ಕ್ ಸಮಸ್ಯೆಗಳು, ಮಣ್ಣಿನ ಸವೆತ, ಪತ್ತೆಯಾಗದ ಎಲೆ ರೋಗಗಳು ಮತ್ತು ಇಳುವರಿ ಅನಿಶ್ಚಿತತೆಯನ್ನು ಪರಿಹರಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಪರಿಪೂರ್ಣ ತಾಂತ್ರಿಕ ತಂತ್ರಾಂಶ."
            : "An end-to-end software solution designed specifically to address rural connectivity constraints, soil degradation, undetected plant leaf diseases, and yield uncertainty across Karnataka's 31 districts."}
        </p>
      </div>

      {/* Requirement 1: Solution Overview & Software Demonstration */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <span className="w-7 h-7 rounded-lg bg-agri-600 text-white font-extrabold flex items-center justify-center text-sm">
            1
          </span>
          <h2 className="text-lg font-extrabold text-slate-900">
            {language === "kn" ? "ಅಗತ್ಯತೆ 1: ಸಾಫ್ಟ್‌ವೇರ್ ಪರಿಹಾರಗಳು ಮತ್ತು ಮಾಡ್ಯೂಲ್‌ಗಳು" : "Requirement 1: Software-Based Solution & Modules"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-extrabold text-agri-700 text-sm block">
              {language === "kn" ? "1. ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಎಲೆ ರೋಗ ಶೋಧಕ" : "1. Computer Vision Leaf Disease Scanner"}
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {language === "kn"
                ? "ಅಡಿಕೆ ಕೊಳೆರೋಗ, ರಾಗಿ ಬೆಂಕಿ ರೋಗ, ಕಬ್ಬಿನ ಕಂಪು ರೋಗ, ಹತ್ತಿಯ ಕಾಯಿ ನೊಣ ಹಾಗೂ ಭತ್ತದ ರೋಗಗಳನ್ನು ಸಾವಯವ ಪರಿಹಾರಗಳೊಂದಿಗೆ ಪತ್ತೆ ಮಾಡುತ್ತದೆ."
                : "Detects pathogens in Arecanut (Koleroga), Ragi (Blast), Sugarcane (Red Rot), Cotton (Pink Bollworm), and Paddy with organic remedy guides."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-extrabold text-amber-700 text-sm block">
              {language === "kn" ? "2. ಎಮ್‌ಎಲ್ ಮಣ್ಣಿನ ಬೆಳೆ ಶಿಫಾರಸು ಎಂಜಿನ್" : "2. ML Soil Crop Recommender"}
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {language === "kn"
                ? "ಕರ್ನಾಟಕದ 10 ಕೃಷಿ ಹವಾಮಾನ ವಲಯಗಳ ಮಣ್ಣಿನ NPK, pH ಮತ್ತು ಮಳೆಯ ಆಧಾರದಲ್ಲಿ ಸೂಕ್ತ ಬೆಳೆಯನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತದೆ."
                : "Multi-variable decision model evaluating NPK levels, soil pH, and rainfall tailored for Karnataka's 10 Agro-Climatic Zones."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-extrabold text-purple-700 text-sm block">
              {language === "kn" ? "3. ಇಳುವರಿ ಮತ್ತು ಆದಾಯ ಲೆಕ್ಕಾಚಾರ" : "3. Yield & Revenue Forecast Engine"}
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {language === "kn"
                ? "ಎಕರೆಗೆ ಕ್ವಿಂಟಾಲ್ ಇಳುವರಿ ಮತ್ತು ಪ್ರಸ್ತುತ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ಧಾರಣೆಗೆ ತಕ್ಕಂತೆ ಒಟ್ಟು ಆದಾಯವನ್ನು ಅಂದಾಜು ಮಾಡುತ್ತದೆ."
                : "Regression analytics engine calculating expected harvest output in Quintals and estimating revenue using real APMC market prices."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-extrabold text-cyan-700 text-sm block">
              {language === "kn" ? "4. ಸರ್ಕಾರಿ ಲೈವ್ ಪೋರ್ಟಲ್ ಮತ್ತು PWA ಬೆಂಬಲ" : "4. Live Govt Agri-Portal Data & PWA Support"}
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              {language === "kn"
                ? "ಕೆಎಸ್‌ಎನ್‌ಡಿಎಂಸಿ ಮತ್ತು ಐಎಮ್‌ಡಿ ಹವಾಮಾನ ಮಾಹಿತಿ ಸ್ಟ್ರೀಮ್ ಹಾಗೂ ಆಫ್‌ಲೈನ್ ಮೊಬೈಲ್ PWA ಸೌಲಭ್ಯ."
                : "Real-time backend API monitoring government weather and agricultural data streams (KSNDMC/IMD Moisture, Temp, Pest Risk) with full offline PWA mobile install support."}
            </p>
          </div>
        </div>
      </div>

      {/* Requirement 2: Problem, AI/ML Approach & Methodology */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-sm">
            2
          </span>
          <h2 className="text-lg font-extrabold text-slate-900">Requirement 2: Problem Statement & AI/ML Methodology</h2>
        </div>

        <div className="space-y-3 text-xs text-slate-800 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <strong className="text-slate-900 block mb-1 text-sm font-extrabold">The Agricultural Problem in Karnataka:</strong>
            Karnataka encompasses extreme micro-climate variations—from heavy rainfall coastal zones (&gt;3500 mm in Udupi) to dry arid regions (&lt;600 mm in Chitradurga & Kalaburagi). Farmers frequently over-fertilize or miss early fungal outbreaks (such as Koleroga in Arecanut), leading to drastic yield loss.
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <strong className="text-slate-900 block mb-1 text-sm font-extrabold">The AI/ML Approach:</strong>
            <ul className="list-disc pl-4 space-y-1 text-slate-700 font-medium">
              <li><strong>Disease Detection:</strong> Lightweight Computer Vision classifier mapping leaf lesion patterns against a high-resolution crop disease database.</li>
              <li><strong>Crop Recommendation:</strong> Decision algorithm calibrated on ICRISAT soil fertility maps and Karnataka Agriculture Department statistics across 31 districts.</li>
              <li><strong>Yield Prediction:</strong> Multi-factor regression model factoring soil health index, irrigation mode, and historical APMC mandi pricing benchmarks.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Requirement 3: Practical Usefulness & Sustainability Impact */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <span className="w-7 h-7 rounded-lg bg-emerald-500 text-white font-extrabold flex items-center justify-center text-sm">
            3
          </span>
          <h2 className="text-lg font-extrabold text-slate-900">Requirement 3: Practical Usefulness & Sustainability</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <strong className="text-slate-900 block font-bold text-sm">Soil Rejuvenation</strong>
            <p className="text-slate-600 font-medium">
              Calculates organic compost needs and discourages excessive chemical NPK fertilizer overuse, preserving soil pH and microbial health.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <strong className="text-slate-900 block font-bold text-sm">Offline PWA Accessibility</strong>
            <p className="text-slate-600 font-medium">
              Works seamlessly in remote farming areas with limited or zero internet connectivity via Service Worker offline caching.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <strong className="text-slate-900 block font-bold text-sm">Organic Remedy Push</strong>
            <p className="text-slate-600 font-medium">
              Prioritizes bio-fungicides (e.g. Bordeaux mixture, Trichoderma, Neem oil) over toxic synthetic pesticides to protect local eco-systems.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

"use client";

import React from "react";
import { Sprout, Phone } from "lucide-react";

interface FooterProps {
  language?: "en" | "kn";
}

export const Footer: React.FC<FooterProps> = ({ language = "en" }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 py-10 mt-16 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="p-0.5 rounded-lg bg-emerald-600 overflow-hidden shadow-sm">
                <img src="/logo.png" alt="ಕೃಷಿ ಸಂಜೀವಿನಿ Logo" className="w-7 h-7 object-cover rounded-md" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-slate-100">ಕೃಷಿ ಸಂಜೀವಿನಿ</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {language === "kn"
                ? "ಕರ್ನಾಟಕದ 31 ಜಿಲ್ಲೆಗಳ ರೈತರಿಗೆ ಸರ್ಕಾರಿ ನೈಜ-ಸಮಯದ ಕೃಷಿ ಮಾಹಿತಿ, ಎಐ ಎಲೆ ರೋಗ ಶೋಧನೆ, ಮಣ್ಣಿನ ಆಧಾರಿತ ಬೆಳೆ ಶಿಫಾರಸು ಮತ್ತು ಆಫ್‌ಲೈನ್ PWA ತಂತ್ರಜ್ಞಾನ."
                : "AI-powered precision agriculture platform integrating real-time government agricultural portal data monitoring, computer vision leaf disease diagnosis, soil ML crop recommendations, and PWA offline accessibility across all 31 districts of Karnataka."}
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-200 block text-sm">
              {language === "kn" ? "ರೈತರ ತುರ್ತು ಸಹಾಯವಾಣಿ" : "Farmer Emergency Support"}
            </span>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-agri-600 dark:text-agri-400 font-bold">
                <Phone className="w-4 h-4" />
                <span>{language === "kn" ? "ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್: 1551" : "Kisan Call Center: 1551"}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {language === "kn"
                  ? "ಉಚಿತ ಕೃಷಿ ಸಲಹಾ ಸಹಾಯವಾಣಿ (ಭಾರತ ಮತ್ತು ಕರ್ನಾಟಕ ಸರ್ಕಾರ)"
                  : "Toll-free agricultural advice helpline (Government of India / Karnataka)"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-200 block text-sm">
              {language === "kn" ? "ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಕೇಂದ್ರಗಳು" : "Key Karnataka Hubs"}
            </span>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>{language === "kn" ? "• ಯುಎಎಸ್ ಧಾರವಾಡ ಮತ್ತು ಬೆಂಗಳುರು ಸಂಶೋಧನಾ ಮಾಹಿತಿ" : "• UAS Dharwad & UAS Bengaluru Research Data"}</li>
              <li>{language === "kn" ? "• ಕೆಎಸ್‌ಎನ್‌ಡಿಎಂಸಿ ಹವಾಮಾನ ಸಂಯೋಜನೆ" : "• KSNDMC Realtime Weather Integration"}</li>
              <li>{language === "kn" ? "• ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಶ್ರೇಣಿ" : "• APMC Mandi Market Pricing Index"}</li>
              <li>{language === "kn" ? "• ಕೃಷಿ ಭಾಗ್ಯ ಮತ್ತು ಪಿಎಂ-ಕಿಸಾನ್ ಯೋಜನೆಗಳು" : "• Krishi Bhagya & PM-Kisan Schemes"}</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <p>© 2026 ಕೃಷಿ ಸಂಜೀವಿನಿ • {language === "kn" ? "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸ್ಪರ್ಧೆಯ ಸಲ್ಲಿಕೆ" : "Smart & Sustainable Agriculture Challenge Submission"}</p>
          <div className="flex items-center gap-2">
            <span>Built with Next.js 14, Tailwind CSS, TypeScript & AI/ML</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import { Sprout, Download, Globe, Sun, Moon } from "lucide-react";
import { KARNATAKA_DISTRICTS } from "@/data/karnataka-districts";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedDistrictId: string;
  setSelectedDistrictId: (id: string) => void;
  language: "en" | "kn";
  setLanguage: (lang: "en" | "kn") => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedDistrictId,
  setSelectedDistrictId,
  language,
  setLanguage,
  theme,
  setTheme,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsStandalone(true);
    }
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    } else {
      alert("To install app on Mobile: Open Chrome menu -> 'Add to Home screen' / 'Install App'");
    }
  };

  const navItems = [
    { id: "overview", label: language === "kn" ? "ಅವಲೋಕನ" : "Overview" },
    { id: "monitoring", label: language === "kn" ? "ಸರ್ಕಾರಿ ಲೈವ್ ಪೋರ್ಟಲ್" : "Govt Portal Feed" },
    { id: "disease", label: language === "kn" ? "ಎಲೆ ರೋಗ ಶೋಧಕ" : "Disease AI Scan" },
    { id: "recommend", label: language === "kn" ? "ಬೆಳೆ ಶಿಫಾರಸು" : "Crop Recommender" },
    { id: "yield", label: language === "kn" ? "ಇಳುವರಿ ಅಂದಾಜು" : "Yield Forecast" },
    { id: "agribot", label: language === "kn" ? "AgriBot AI" : "AgriBot Advisory" },
    { id: "showcase", label: language === "kn" ? "ಸ್ಪರ್ಧಾತ್ಮಕ ವರದಿ" : "Challenge Pitch" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-3 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo with Kannada & Sanskrit Identity */}
        <div className="flex items-center justify-between w-full xl:w-auto">
          <div 
            onClick={() => setActiveTab("overview")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Cultural Logo Emblem: Sprout inside Golden Shield */}
            <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-700 via-agri-600 to-amber-500 shadow-md shadow-agri-600/30 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[8px] font-bold text-slate-950">
                ★
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-gradient">
                  ಕೃಷಿ ಸಂಜೀವಿನಿ
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                Raitha Bandhu • Karnataka 31D Precision Farming
              </p>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex xl:hidden items-center gap-2">
            {!isStandalone && (
              <button
                onClick={handleInstallClick}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-agri-600 text-white flex items-center gap-1 cursor-pointer shadow-sm"
                title="Install App"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === "kn" ? "ಆ್ಯಪ್" : "Install"}</span>
              </button>
            )}

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 cursor-pointer"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => setLanguage(language === "kn" ? "en" : "kn")}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-agri-700 dark:text-agri-300 border border-slate-300 dark:border-slate-700 flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "kn" ? "English" : "ಕನ್ನಡ"}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                activeTab === item.id
                  ? "bg-agri-600 text-white font-bold shadow-md shadow-agri-600/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* District Selector & Theme Controls */}
        <div className="hidden xl:flex items-center gap-2.5">
          
          {/* Live Telemetry Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-700 text-xs text-emerald-700 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] font-semibold">Govt Feed Active</span>
          </div>

          {/* Karnataka District Dropdown */}
          <select
            value={selectedDistrictId}
            onChange={(e) => setSelectedDistrictId(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-agri-500 cursor-pointer"
          >
            {KARNATAKA_DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                📍 {d.name} ({d.kannadaName})
              </option>
            ))}
          </select>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold cursor-pointer shadow-sm"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span>Dark</span>
              </>
            )}
          </button>

          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === "en" ? "kn" : "en")}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-agri-800 dark:text-agri-300 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Toggle Kannada / English"
          >
            <Globe className="w-3.5 h-3.5" />
            {language === "en" ? "ಕನ್ನಡ" : "English"}
          </button>

          {/* PWA Mobile & Desktop Install Button */}
          {!isStandalone && (
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-agri-600 hover:bg-agri-700 text-white flex items-center gap-1.5 shadow-md shadow-agri-600/20 transition-all hover:scale-105 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === "kn" ? "ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ" : "Install App"}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

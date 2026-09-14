"use client";

import React, { useState, useEffect } from "react";
import { 
  Download, 
  Globe, 
  Sun, 
  Moon, 
  Home, 
  Activity, 
  Scan, 
  Sprout, 
  Bot, 
  TrendingUp, 
  Award,
  MapPin
} from "lucide-react";
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
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    if (window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone) {
      setIsStandalone(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult?.outcome === "accepted") {
          setDeferredPrompt(null);
          setIsStandalone(true);
        }
      });
    } else {
      alert("To install app on Mobile: Open Chrome menu -> 'Add to Home screen' / 'Install App'");
    }
  };

  const navItems = [
    { id: "overview", label: language === "kn" ? "ಅವಲೋಕನ" : "Overview", icon: Home },
    { id: "monitoring", label: language === "kn" ? "ಲೈವ್ ಪೋರ್ಟಲ್" : "Govt Feed", icon: Activity },
    { id: "disease", label: language === "kn" ? "ಎಲೆ ರೋಗ" : "Disease AI", icon: Scan },
    { id: "recommend", label: language === "kn" ? "ಬೆಳೆ ಶಿಫಾರಸು" : "Crop Rec", icon: Sprout },
    { id: "yield", label: language === "kn" ? "ಇಳುವರಿ" : "Yield", icon: TrendingUp },
    { id: "agribot", label: language === "kn" ? "AgriBot AI" : "AgriBot", icon: Bot },
    { id: "showcase", label: language === "kn" ? "ವರದಿ" : "Pitch", icon: Award },
  ];

  // Mobile Bottom Nav Items (Top 5 primary actions)
  const mobileBottomNavItems = [
    { id: "overview", label: language === "kn" ? "ಅವಲೋಕನ" : "Home", icon: Home },
    { id: "disease", label: language === "kn" ? "ಎಲೆ ರೋಗ" : "Scan Leaf", icon: Scan },
    { id: "recommend", label: language === "kn" ? "ಬೆಳೆ" : "Crops", icon: Sprout },
    { id: "yield", label: language === "kn" ? "ಇಳುವರಿ" : "Yield", icon: TrendingUp },
    { id: "agribot", label: language === "kn" ? "AgriBot" : "AgriBot", icon: Bot },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 sm:px-4 lg:px-8 py-2.5 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-3">
          
          {/* Top Row: Brand Logo + Mobile Top Actions */}
          <div className="flex items-center justify-between w-full xl:w-auto">
            <div 
              onClick={() => setActiveTab("overview")}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="relative p-0.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 shadow-md shadow-agri-600/30 group-hover:scale-105 transition-transform overflow-hidden flex-shrink-0">
                <img src="/logo.png" alt="ಕೃಷಿಸಂವರ್ಧಿ Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-cover rounded-lg" />
              </div>
              
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg lg:text-xl tracking-tight text-gradient">
                    ಕೃಷಿಸಂವರ್ಧಿ
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-semibold truncate max-w-[200px] sm:max-w-none">
                  Raitha Bandhu • Karnataka 31D Precision Farming
                </p>
              </div>
            </div>

            {/* Mobile / Tablet Quick Controls */}
            <div className="flex xl:hidden items-center gap-1.5">
              
              {/* Mobile District Selector */}
              <div className="relative">
                <select
                  value={selectedDistrictId}
                  onChange={(e) => setSelectedDistrictId(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-[11px] font-bold border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer max-w-[110px] sm:max-w-[140px] truncate"
                >
                  {KARNATAKA_DISTRICTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      📍 {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {!isStandalone && (
                <button
                  onClick={handleInstallClick}
                  className="px-2 py-1 text-xs font-bold rounded-lg bg-agri-600 text-white flex items-center gap-1 cursor-pointer shadow-sm min-h-[32px]"
                  title="Install App"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === "kn" ? "ಆ್ಯಪ್" : "Install"}</span>
                </button>
              )}

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              <button
                onClick={() => setLanguage(language === "kn" ? "en" : "kn")}
                className="px-2 py-1 text-[11px] font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-agri-700 dark:text-agri-300 border border-slate-300 dark:border-slate-700 flex items-center gap-1 cursor-pointer min-h-[32px]"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === "kn" ? "EN" : "ಕನ್ನಡ"}</span>
              </button>
            </div>
          </div>

          {/* Desktop & Tablet Tab Navigation */}
          <nav className="w-full overflow-x-auto scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-1 sm:gap-1.5 sm:flex-wrap sm:justify-center min-w-max sm:min-w-0 py-0.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                    activeTab === item.id
                      ? "bg-agri-600 text-white font-bold shadow-md shadow-agri-600/20"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 opacity-90" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            </div>
          </nav>

          {/* Desktop District Selector & Controls */}
          <div className="hidden xl:flex items-center gap-2.5">
            
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
                <span>{language === "kn" ? "ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್" : "Install App"}</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Sticky Bottom Tab Bar for App UX */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 sm:hidden shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {mobileBottomNavItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[54px] ${
                  isActive
                    ? "text-agri-600 dark:text-agri-400 font-extrabold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? "bg-emerald-100 dark:bg-emerald-950/80 scale-110" : ""} transition-transform`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5 font-medium leading-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DistrictSelector } from "@/components/DistrictSelector";
import { RealtimeMonitoring } from "@/components/RealtimeMonitoring";
import { DiseaseDetector } from "@/components/DiseaseDetector";
import { CropRecommender } from "@/components/CropRecommender";
import { YieldPredictor } from "@/components/YieldPredictor";
import { AgriBot } from "@/components/AgriBot";
import { ChallengeShowcase } from "@/components/ChallengeShowcase";
import { Footer } from "@/components/Footer";
import { KARNATAKA_DISTRICTS, DistrictData } from "@/data/karnataka-districts";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("mandya");
  const [language, setLanguage] = useState<"en" | "kn">("en");
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("agri-theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("light"); // Default to light theme
    }

    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("agri-theme", theme);
  }, [theme, mounted]);

  const handleSelectDistrictForAnalysis = (district: DistrictData) => {
    setSelectedDistrictId(district.id);
    setActiveTab("recommend");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-agri-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-agri-700 font-mono font-bold">Loading ಕೃಷಿಸಂವರ್ಧಿ (Krishi Samvardhi) Suite...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Offline Mode Indicator Banner */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs font-extrabold flex items-center justify-center gap-2 shadow-md z-50">
          <span>⚡</span>
          <span>
            {language === "kn"
              ? "ಆಫ್‌ಲೈನ್ ಸಕ್ರಿಯವಾಗಿದೆ — ಬೆಳೆ ಶಿಫಾರಸು, ಎಲೆ ರೋಗ ಸೂಚಿ ಮತ್ತು ಇಳುವರಿ ಅಂದಾಜು ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಕೆಲಸ ಮಾಡುತ್ತವೆ."
              : "Offline Mode Active — Crop Recommender, Disease Catalog & Yield Estimator work completely offline."}
          </span>
        </div>
      )}

      {/* Navbar Header with Working Theme & Tab Buttons */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedDistrictId={selectedDistrictId}
        setSelectedDistrictId={setSelectedDistrictId}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Tabbed Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 pb-24 sm:pb-12 space-y-12">
        
        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-12">
            <Hero
              setActiveTab={setActiveTab}
              selectedDistrictId={selectedDistrictId}
              language={language}
            />

            <section className="pt-4">
              <DistrictSelector
                selectedDistrictId={selectedDistrictId}
                setSelectedDistrictId={setSelectedDistrictId}
                onSelectForAnalysis={handleSelectDistrictForAnalysis}
                language={language}
              />
            </section>
          </div>
        )}

        {/* Tab 2: Live Govt Agri-Portal & Weather Data Monitoring */}
        {activeTab === "monitoring" && (
          <RealtimeMonitoring
            selectedDistrictId={selectedDistrictId}
            setSelectedDistrictId={setSelectedDistrictId}
            language={language}
          />
        )}

        {/* Tab 3: AI Leaf Disease Scanner */}
        {activeTab === "disease" && (
          <DiseaseDetector language={language} />
        )}

        {/* Tab 4: ML Crop Recommendation Engine */}
        {activeTab === "recommend" && (
          <CropRecommender
            selectedDistrictId={selectedDistrictId}
            language={language}
          />
        )}

        {/* Tab 5: Yield & Revenue Forecast Calculator */}
        {activeTab === "yield" && (
          <YieldPredictor
            selectedDistrictId={selectedDistrictId}
            language={language}
          />
        )}

        {/* Tab 6: AgriBot AI Advisory Chatbot */}
        {activeTab === "agribot" && (
          <AgriBot language={language} />
        )}

        {/* Tab 7: Challenge Pitch / Technical Documentation */}
        {activeTab === "showcase" && (
          <ChallengeShowcase language={language} />
        )}

      </main>

      {/* Footer */}
      <Footer language={language} />

    </div>
  );
}

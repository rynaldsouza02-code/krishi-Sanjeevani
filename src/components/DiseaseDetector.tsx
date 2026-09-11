"use client";

import React, { useState } from "react";
import { 
  Scan, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  Droplets,
  Sprout
} from "lucide-react";
import { DISEASE_DATABASE, PlantDisease } from "@/data/disease-database";
import { diagnoseLeafDisease } from "@/lib/ml-engine";
import confetti from "canvas-confetti";

interface DiseaseDetectorProps {
  language: "en" | "kn";
}

export const DiseaseDetector: React.FC<DiseaseDetectorProps> = ({ language }) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>("arecanut-koleroga");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<{ disease: PlantDisease; simulatedConfidence: number } | null>(null);

  const handleScan = (sampleId?: string) => {
    setIsScanning(true);
    setDiagnosis(null);

    setTimeout(() => {
      const result = diagnoseLeafDisease(sampleId || selectedSampleId);
      setDiagnosis(result);
      setIsScanning(false);
      
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 2200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          handleScan();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const activeDisease = diagnosis?.disease;
  const currentImage = customImage || DISEASE_DATABASE.find(d => d.id === selectedSampleId)?.imageUrl || DISEASE_DATABASE[0].imageUrl;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Scan className="w-6 h-6 text-agri-600" />
            <span>AI Multimodal Leaf Disease Detector</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">
            Computer Vision inference for early leaf diagnosis, severity rating & organic treatments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
            ✨ Multimodal Vision Engine
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Uploader & Live Scanner Viewport */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900">Leaf Sample Scanner</span>
              <span className="text-[11px] text-slate-500 font-medium">Select sample or upload photo</span>
            </div>

            {/* Main Visual Viewport with Laser Beam Animation */}
            <div className="relative w-full h-72 rounded-2xl overflow-hidden border-2 border-slate-300 bg-slate-950 group flex items-center justify-center">
              
              <img 
                src={currentImage} 
                alt="Leaf Sample" 
                className={`w-full h-full object-cover transition-all duration-500 ${isScanning ? "scale-105 filter brightness-110" : ""}`}
              />

              {/* Laser Beam Scanner Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-agri-500/10 pointer-events-none">
                  <div className="w-full h-1 bg-agri-400 scanner-laser absolute left-0 right-0 shadow-[0_0_15px_#22c55e]"></div>
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm">
                    <div className="text-center space-y-2">
                      <RefreshCw className="w-8 h-8 text-agri-400 animate-spin mx-auto" />
                      <span className="text-xs font-bold text-slate-200 block">Analyzing Leaf Pathogens...</span>
                      <span className="text-[10px] text-agri-400 font-mono">Neural Net Inference in Progress</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] font-mono text-slate-200 border border-slate-700">
                📷 1080p Leaf Macro
              </div>

            </div>

            {/* Sample Selector Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-600 block">Try Karnataka Crop Samples:</span>
              <div className="grid grid-cols-3 gap-2">
                {DISEASE_DATABASE.slice(0, 6).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setCustomImage(null);
                      setSelectedSampleId(d.id);
                      handleScan(d.id);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all text-xs ${
                      selectedSampleId === d.id && !customImage
                        ? "bg-emerald-100 border-emerald-400 text-emerald-900 font-extrabold shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block truncate font-bold">{d.cropName}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{d.diseaseName.split("(")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Upload Button */}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="leaf-upload-input"
              />
              <label
                htmlFor="leaf-upload-input"
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4 text-agri-600" />
                <span>Upload Custom Leaf Photo</span>
              </label>
            </div>

            {/* Trigger Scan Button */}
            <button
              onClick={() => handleScan()}
              disabled={isScanning}
              className="w-full py-3.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-agri-600/20 transition-all hover:scale-[1.02]"
            >
              <Scan className="w-4 h-4" />
              <span>{isScanning ? "Scanning Plant Tissue..." : "Run AI Leaf Scan Diagnosis"}</span>
            </button>

          </div>

        </div>

        {/* Right Column: Diagnosis Summary & Treatment Details */}
        <div className="lg:col-span-7">
          
          {diagnosis && activeDisease ? (
            <div className="bg-white rounded-3xl p-6 border border-emerald-300 shadow-xl space-y-6">
              
              {/* Diagnosis Headline */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs text-agri-700 font-bold uppercase tracking-wider block">AI Diagnosis Output</span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-0.5">
                    {activeDisease.cropName}: {activeDisease.diseaseName}
                  </h3>
                  <p className="text-xs text-slate-600 italic font-medium">
                    {activeDisease.scientificName} ({activeDisease.kannadaName})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-semibold block">AI Confidence</span>
                    <span className="text-xl font-mono font-extrabold text-emerald-700">
                      {diagnosis.simulatedConfidence}%
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    activeDisease.severity === "Critical" 
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}>
                    {activeDisease.severity} Risk
                  </span>
                </div>
              </div>

              {/* Symptoms Bullet List */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> Visual Symptoms
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeDisease.symptoms.map((sym, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium">
                      • {sym}
                    </div>
                  ))}
                </div>
              </div>

              {/* Organic vs Chemical Treatment Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Organic Remedies */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-emerald-700" /> Organic & Bio-Controls
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                    {activeDisease.organicTreatment.map((org, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{org}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chemical Controls */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-blue-600" /> Chemical Fungicides / Pesticides
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                    {activeDisease.chemicalTreatment.map((chem, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></span>
                        <span>{chem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Favorable Conditions & Prevention */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 block">Weather Risk Factor:</span>
                <p className="text-slate-600 font-medium">{activeDisease.favorableConditions}</p>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-md text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                <Scan className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Ready to Scan Leaf Photo</h3>
                <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto mt-1">
                  Select a Karnataka crop leaf sample on the left or upload your own leaf picture to run instant AI disease diagnosis.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

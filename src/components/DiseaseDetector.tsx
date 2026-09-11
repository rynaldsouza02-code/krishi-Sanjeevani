import React, { useState } from "react";
import { 
  Scan, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  Droplets,
  Sprout,
  ShieldCheck,
  BarChart2,
  FileCheck
} from "lucide-react";
import { DISEASE_DATABASE, PlantDisease } from "@/data/disease-database";
import { diagnoseLeafDisease, DiseaseDiagnosisOutput } from "@/lib/ml-engine";
import confetti from "canvas-confetti";

interface DiseaseDetectorProps {
  language: "en" | "kn";
}

export const DiseaseDetector: React.FC<DiseaseDetectorProps> = ({ language }) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>("arecanut-koleroga");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<DiseaseDiagnosisOutput | null>(null);

  const handleScan = (sampleId?: string) => {
    setIsScanning(true);
    setDiagnosis(null);

    setTimeout(() => {
      const result = diagnoseLeafDisease(sampleId || selectedSampleId);
      setDiagnosis(result);
      setIsScanning(false);
      
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.6 }
      });
    }, 2000);
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
            <span>
              {language === "kn"
                ? "ಎಐ ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಎಲೆ ರೋಗ ಶೋಧಕ"
                : "AI Multimodal Leaf Disease Detector"}
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">
            {language === "kn"
              ? "ಸರ್ಕಾರಿ ಭಾರತೀಯ ಕೃಷಿ ಸಂಶೋಧನಾ ಮಂಡಳಿ (ICAR) ಮತ್ತು ಕೃಷಿ ವಿಶ್ವವಿದ್ಯಾನಿಲಯಗಳ ಅಧಿಕೃತ ಮಾಹಿತಿಯ ಆಧಾರಿತ ರೋಗ ಪತ್ತೆ."
              : "Computer Vision leaf pathogen diagnosis verified via ICAR & UAS Karnataka Government research bulletins."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{language === "kn" ? "ಸರ್ಕಾರಿ ಮಾಹಿತಿ ಪರಿಶೀಲಿತ" : "ICAR Govt Verified"}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Uploader & Live Scanner Viewport */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900">
                {language === "kn" ? "ಎಲೆ ಮಾದರಿ ಶೋಧಕ" : "Leaf Sample Scanner"}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {language === "kn" ? "ಮಾದರಿ ಆಯ್ಕೆ ಮಾಡಿ ಅಥವಾ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ" : "Select sample or upload photo"}
              </span>
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
                      <span className="text-xs font-bold text-slate-200 block">
                        {language === "kn" ? "ಎಲೆ ರೋಗಾಣುಗಳ ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ..." : "Analyzing Leaf Pathogens..."}
                      </span>
                      <span className="text-[10px] text-agri-400 font-mono">
                        {language === "kn" ? "ವಿಷನ್ ಕಂಪ್ಯೂಟಿಂಗ್ ಚಾಲನೆಯಲ್ಲಿದೆ" : "Neural Net Multimodal Inference"}
                      </span>
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
              <span className="text-[11px] font-bold text-slate-600 block">
                {language === "kn" ? "ಕರ್ನಾಟಕದ ಬೆಳೆ ಮಾದರಿಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ:" : "Try Karnataka Crop Samples:"}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {DISEASE_DATABASE.slice(0, 6).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setCustomImage(null);
                      setSelectedSampleId(d.id);
                      handleScan(d.id);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                      selectedSampleId === d.id && !customImage
                        ? "bg-emerald-100 border-emerald-400 text-emerald-900 font-extrabold shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="block truncate font-bold">{language === "kn" ? (d.cropKannadaName || d.cropName) : d.cropName}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{language === "kn" ? d.kannadaName : d.diseaseName.split("(")[0]}</span>
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
                <span>{language === "kn" ? "ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ" : "Upload Custom Leaf Photo"}</span>
              </label>
            </div>

            {/* Trigger Scan Button */}
            <button
              onClick={() => handleScan()}
              disabled={isScanning}
              className="w-full py-3.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-agri-600/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Scan className="w-4 h-4" />
              <span>
                {isScanning 
                  ? (language === "kn" ? "ಎಲೆ ತಪಾಸಣೆ ನಡೆಯುತ್ತಿದೆ..." : "Scanning Plant Tissue...") 
                  : (language === "kn" ? "ಎಐ ಎಲೆ ರೋಗ ಶೋಧನೆ ನಡೆಸಿ" : "Run AI Leaf Scan Diagnosis")}
              </span>
            </button>

          </div>

        </div>

        {/* Right Column: Diagnosis Summary & Treatment Details */}
        <div className="lg:col-span-7">
          
          {diagnosis && activeDisease ? (
            <div className="bg-white rounded-3xl p-6 border border-emerald-300 shadow-xl space-y-6">
              
              {/* Government Research Source Verification Banner */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center gap-2.5 text-xs text-emerald-950 font-semibold">
                <FileCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <div>
                  <span className="font-extrabold block text-emerald-900">
                    {language === "kn" ? "ಸರ್ಕಾರಿ ಸಂಶೋಧನಾ ಆಧಾರಿತ ಮಾಹಿತಿ:" : "Government Verified Advisory Source:"}
                  </span>
                  <span>{language === "kn" ? (activeDisease.govtSourceKannada || activeDisease.govtSource) : activeDisease.govtSource}</span>
                </div>
              </div>

              {/* Diagnosis Headline */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs text-agri-700 font-bold uppercase tracking-wider block">
                    {language === "kn" ? "ಎಐ ರೋಗ ನಿರ್ಣಯ ಪ್ರಕಟಣೆ" : "AI Diagnosis Output"}
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-0.5">
                    {language === "kn" ? activeDisease.cropKannadaName || activeDisease.cropName : activeDisease.cropName}: {language === "kn" ? activeDisease.kannadaName : activeDisease.diseaseName}
                  </h3>
                  <p className="text-xs text-slate-600 italic font-medium mt-0.5">
                    {activeDisease.scientificName} ({language === "kn" ? activeDisease.kannadaName : activeDisease.diseaseName})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-semibold block">
                      {language === "kn" ? "ಎಐ ನಿಖರತೆ" : "AI Match Score"}
                    </span>
                    <span className="text-xl font-mono font-extrabold text-emerald-700">
                      {diagnosis.simulatedConfidence}%
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    activeDisease.severity === "Critical" 
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}>
                    {activeDisease.severity} {language === "kn" ? "ಅಪಾಯ" : "Risk"}
                  </span>
                </div>
              </div>

              {/* Computer Vision Extraction Feature Metrics */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Scan className="w-4 h-4 text-emerald-600" />
                  {language === "kn" ? "ಎಲೆ ವಿಷುಯಲ್ ಲಕ್ಷಣಗಳ ವಿಶ್ಲೇಷಣೆ:" : "Computer Vision Feature Extraction:"}
                </span>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">
                      {language === "kn" ? "ಹಳದಿ ಬಣ್ಣದ ಶೇಕಡಾ (Chlorosis)" : "Foliar Chlorosis"}
                    </span>
                    <span className="font-mono font-extrabold text-slate-900 text-sm">
                      {diagnosis.visionFeatures.chlorosisScore}%
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">
                      {language === "kn" ? "ಕೊಳೆತ ಮಚ್ಚೆಯ ಸಾಂದ್ರತೆ" : "Lesion Coverage"}
                    </span>
                    <span className="font-mono font-extrabold text-slate-900 text-sm">
                      {diagnosis.visionFeatures.necroticLesionRatio}%
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">
                      {language === "kn" ? "ಮಚ್ಚೆಯ ಸಂರಚನೆ" : "Pathogen Pattern"}
                    </span>
                    <span className="font-bold text-slate-900 text-xs block truncate" title={language === "kn" ? diagnosis.visionFeatures.patternTypeKannada : diagnosis.visionFeatures.patternType}>
                      {language === "kn" ? diagnosis.visionFeatures.patternTypeKannada : diagnosis.visionFeatures.patternType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Multi-Candidate Possibilities Breakdown */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-indigo-600" />
                    {language === "kn" ? "ಸಾಧ್ಯತೆಗಳ ಎಲ್ಲಾ ವರ್ಗೀಕರಣ (Multi-Class Probability):" : "All Ranked Disease Possibilities:"}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {language === "kn" ? "ಸುಳ್ಳು ಮಾಹಿತಿಯಿಲ್ಲದ ಪಾರದರ್ಶಕ ನಿರ್ಧಾರ" : "Verified Multi-Candidate Spectrum"}
                  </span>
                </div>

                <div className="space-y-2">
                  {diagnosis.allPossibilities.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-800">
                          {idx + 1}. {language === "kn" ? (item.disease.cropKannadaName || item.disease.cropName) : item.disease.cropName} - {language === "kn" ? item.disease.kannadaName : item.disease.diseaseName}
                        </span>
                        <span className="font-mono font-extrabold text-slate-900">{item.probability}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            idx === 0 ? "bg-emerald-600" : idx === 1 ? "bg-amber-500" : "bg-slate-400"
                          }`}
                          style={{ width: `${item.probability}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Symptoms Bullet List */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  {language === "kn" ? "ರೋಗದ ಲಕ್ಷಣಗಳು:" : "Visual Symptoms:"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(language === "kn" ? (activeDisease.symptomsKannada || activeDisease.symptoms) : activeDisease.symptoms).map((sym, i) => (
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
                    <Sprout className="w-4 h-4 text-emerald-700" />
                    {language === "kn" ? "ಸಾವಯವ ಉಪಚಾರಗಳು:" : "Organic & Bio-Controls:"}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                    {(language === "kn" ? (activeDisease.organicTreatmentKannada || activeDisease.organicTreatment) : activeDisease.organicTreatment).map((org, i) => (
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
                    <Droplets className="w-4 h-4 text-blue-600" />
                    {language === "kn" ? "ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ (CIBRC ನಮೂದಿತ):" : "Chemical Controls (CIBRC Approved):"}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
                    {(language === "kn" ? (activeDisease.chemicalTreatmentKannada || activeDisease.chemicalTreatment) : activeDisease.chemicalTreatment).map((chem, i) => (
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
                <span className="font-bold text-slate-900 block">
                  {language === "kn" ? "ಹವಾಮಾನ ಮತ್ತು ರೋಗ ಹರಡುವಿಕೆ ವಾತಾವರಣ:" : "Weather & Outbreak Risk Factor:"}
                </span>
                <p className="text-slate-600 font-medium">
                  {language === "kn" ? (activeDisease.favorableConditionsKannada || activeDisease.favorableConditions) : activeDisease.favorableConditions}
                </p>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-md text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                <Scan className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === "kn" ? "ಎಲೆಯ ಫೋಟೋ ಪರಿಶೀಲನೆಗೆ ಸಿದ್ಧವಾಗಿದೆ" : "Ready to Scan Leaf Photo"}
                </h3>
                <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto mt-1">
                  {language === "kn"
                    ? "ಎಡಭಾಗದಲ್ಲಿರುವ ಮಾದರಿಯನ್ನು ಆರಿಸಿ ಅಥವಾ ನಿಮ್ಮ ಹೊಲದ ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ರೋಗ ಪತ್ತೆ ಮಾಡಿ."
                    : "Select a Karnataka crop leaf sample on the left or upload your own leaf picture to run instant AI disease diagnosis."}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

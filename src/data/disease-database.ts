export interface PlantDisease {
  id: string;
  cropName: string;
  cropKannadaName: string;
  diseaseName: string;
  kannadaName: string;
  scientificName: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
  imageUrl: string;
  govtSource: string;
  govtSourceKannada: string;
  symptoms: string[];
  symptomsKannada: string[];
  organicTreatment: string[];
  organicTreatmentKannada: string[];
  chemicalTreatment: string[];
  chemicalTreatmentKannada: string[];
  prevention: string[];
  preventionKannada: string[];
  favorableConditions: string;
  favorableConditionsKannada: string;
}

export const DISEASE_DATABASE: PlantDisease[] = [
  {
    id: "arecanut-koleroga",
    cropName: "Arecanut",
    cropKannadaName: "ಅಡಿಕೆ",
    diseaseName: "Fruit Rot (Koleroga / Mahali)",
    kannadaName: "ಅಡಿಕೆ ಕೊಳೆ ರೋಗ (ಮಹಳಿ)",
    scientificName: "Phytophthora meadii",
    severity: "Critical",
    confidence: 96.4,
    imageUrl: "https://images.unsplash.com/photo-1599598425947-020645547488?w=800&q=80",
    govtSource: "ICAR-CPCRI Regional Station Advisory Bulletin (Vittal, Mangaluru)",
    govtSourceKannada: "ಐಸಿಎಎಆರ್ - ಸಿಪಿಸಿಆರ್ಐ ಪ್ರಾದೇಶಿಕ ಕೃಷಿ ಸಂಶೋಧನಾ ಕೇಂದ್ರ (ವಿಟ್ಲ/ಮಂಗಳೂರು)",
    symptoms: [
      "Water-soaked dark lesions appearing on immature nuts",
      "Rotting and premature dropping of nuts from canopy",
      "White felt-like fungal mycelium growth on fallen nuts",
      "Foul odor surrounding fallen nuts in the plantation"
    ],
    symptomsKannada: [
      "ಎಳೆಯ ಅಡಿಕೆ ಕಾಯಿಗಳ ಮೇಲೆ ನೀರು ಹಣೆದಂತಹ ಕಪ್ಪು ಮಚ್ಚೆಗಳು",
      "ಮರದಿಂದ ಹಸಿರು ಅಡಿಕೆ ಕಾಯಿಗಳು ಅಕಾಲಿಕವಾಗಿ ಉದುರುವುದು",
      "ಉದುರಿದ ಕಾಯಿಗಳ ಮೇಲೆ ಬಿಳಿ ಬಣ್ಣದ ಶಿಲೀಂಧ್ರದ ಬೆಳವಣಿಗೆ",
      "ತೋಟದಲ್ಲಿ ಕೊಳೆತ ದುರ್ವಾಸನೆ ಹರಡುವುದು"
    ],
    organicTreatment: [
      "Spray 1% Bordeaux mixture (10g Copper Sulfate + 10g Quicklime per liter)",
      "Apply Trichoderma viride bio-fungicide paste around tree collar",
      "Clean palm crowns thoroughly prior to heavy monsoon onset"
    ],
    organicTreatmentKannada: [
      "1% ಬೋರ್ಡೋ ಮಿಶ್ರಣವನ್ನು ಸಿಂಪಡಿಸಿ (10 ಗ್ರಾಂ ಮೈಲುತುತ್ತ + 10 ಗ್ರಾಂ ಸುಣ್ಣ/ಲೀಟರ್ ನೀರು)",
      "ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಮರದ ಬುಡಕ್ಕೆ ಹಾಕಿ",
      "ಮಳೆಗಾಲಕ್ಕೂ ಮುನ್ನ ಅಡಿಕೆ ಮರದ ಮಂಡೆಯನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ"
    ],
    chemicalTreatment: [
      "Metalaxyl 8% + Mancozeb 64% WP @ 2 g/L prophylactic spray",
      "Fosetyl-Al 80% WP @ 2.5 g/L spray during rainfall breaks"
    ],
    chemicalTreatmentKannada: [
      "ಮೆಟಲಾಕ್ಸಿಲ್ 8% + ಮ್ಯಾಂಕೋಜೆಬ್ 64% @ 2 ಗ್ರಾಂ/ಲೀಟರ್ ನೀರಿಗೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ",
      "ಫೊಸೆಟೈಲ್-ಎಎಲ್ 80% @ 2.5 ಗ್ರಾಂ/ಲೀಟರ್ ಮಳೆ ಬಿಡುವಿನ ವೇಳೆಯಲ್ಲಿ ಸಿಂಪಡಿಸಿ"
    ],
    prevention: [
      "Tie polythene covers over arecanut bunches before monsoon rains",
      "Ensure proper drainage in gardens to avoid stagnant water",
      "Collect and burn all fallen infected nuts"
    ],
    preventionKannada: [
      "ಮಳೆಗಾಲಕ್ಕೂ ಮುನ್ನ ಅಡಿಕೆ ಗೊನೆಗಳಿಗೆ ಪಾಲಿಥಿನ್ ಚೀಲ ತೊಡಿಸಿ",
      "ತೋಟದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಉತ್ತಮ ಬಚಾವಿ ಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಮಾಡಿ",
      "ಉದುರಿದ ಕೊಳೆತ ಕಾಯಿಗಳನ್ನು ಆಯ್ದು ಸುಟ್ಟು ಹಾಕಿ"
    ],
    favorableConditions: "Continuous heavy monsoon rainfall with high relative humidity (>90%) and temps 20-25°C.",
    favorableConditionsKannada: "ಸತತ ಭಾರಿ ಮಳೆ, ಶೇಕಡಾ 90ಕ್ಕೂ ಹೆಚ್ಚು ಗಾಳಿಯ ತೇವಾಂಶ ಮತ್ತು 20-25°C ಉಷ್ಣಾಂಶ."
  },
  {
    id: "ragi-blast",
    cropName: "Ragi (Finger Millet)",
    cropKannadaName: "ರಾಗಿ",
    diseaseName: "Blast Disease",
    kannadaName: "ರಾಗಿ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
    scientificName: "Magnaporthe oryzae",
    severity: "High",
    confidence: 94.8,
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    govtSource: "UAS Bengaluru / UAS Dharwad Package of Practices (Ragi Tech Manual)",
    govtSourceKannada: "ಕೃಷಿ ವಿಶ್ವವಿದ್ಯಾನಿಲಯ ಬೆಂಗಳೂರು/ಧಾರವಾಡ ಸುಧಾರಿತ ಕೃಷಿ ಕೈಪಿಡಿ",
    symptoms: [
      "Spindle-shaped elliptical spots with grayish center and brown margins on leaves",
      "Neck breaking at the base of the earhead",
      "Chaffy grains and premature earhead drying"
    ],
    symptomsKannada: [
      "ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಅಂಚಿನ ಬೂದು ಬಣ್ಣದ ಕದಿರಿನಂತ ಮಚ್ಚೆಗಳು",
      "ತೆನೆಯ ಕತ್ತಿನ ಭಾಗ ಕಪ್ಪಗಾಗಿ ಮುರಿದು ಬೀಳುವುದು",
      "ಕಾಳು ಕಟ್ಟದೆ ತೆನೆಗಳು ಬೊಳ್ಳಾಗುವುದು"
    ],
    organicTreatment: [
      "Foliar spray of 5% Neem Seed Kernel Extract (NSKE)",
      "Seed treatment with Pseudomonas fluorescens @ 10g/kg seed"
    ],
    organicTreatmentKannada: [
      "5% ಬೇವಿನ ಬೀಜದ ಕಷಾಯ (NSKE) ಸಿಂಪಡಿಸಿ",
      "ಬೀಜೋಪಚಾರಕ್ಕೆ ಸೂಡೋಮೊನಾಸ್ ಫ್ಲೋರೆಸೆನ್ಸ್ 10 ಗ್ರಾಂ/ಕೆಜಿ ಬೀಜಕ್ಕೆ ಬಳಸಿ"
    ],
    chemicalTreatment: [
      "Tricyclazole 75% WP @ 0.6 g/L at seedling/foliar stage",
      "Carbendazim 50% WP @ 1 g/L at 50% earhead emergence"
    ],
    chemicalTreatmentKannada: [
      "ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ 75% ಡಬ್ಲ್ಯೂಪಿ @ 0.6 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ",
      "ಕಾರ್ಬೆಂಡಾಜಿಮ್ 50% ಡಬ್ಲ್ಯೂಪಿ @ 1 ಗ್ರಾಂ/ಲೀಟರ್ ತೆನೆ ಬರುವ ಹಂತದಲ್ಲಿ ಸಿಂಪಡಿಸಿ"
    ],
    prevention: [
      "Use recommended resistant varieties: GPU-28, ML-365, or KMR-204",
      "Avoid excessive Nitrogenous fertilizer application",
      "Maintain optimum plant spacing"
    ],
    preventionKannada: [
      "ರೋಗ ನಿರೋಧಕ ತಳಿಗಳಾದ ಜಿಪಿಯು-28, ಎಂಎಲ್-365 ಅಥವಾ ಕೆಎಂಆರ್-204 ಬಳಸಿ",
      "ಅತಿಯಾದ ಸಾರಜನಕ (ಯುರಿಯಾ) ರಸಗೊಬ್ಬರ ಬಳಕೆಯನ್ನು ತಡೆಯಿರಿ",
      "ಸೂಕ್ತ ಸಾಲಿನ ಅಂತರ ಕಾಯ್ದುಕೊಳ್ಳಿ"
    ],
    favorableConditions: "Cloudy humid weather with dew formation and temperatures around 20°C - 28°C.",
    favorableConditionsKannada: "ಮೋಡಕವಿದ ವಾತಾವರಣ, ಇಬ್ಬನಿ ಮತ್ತು 20-28°C ಉಷ್ಣಾಂಶ."
  },
  {
    id: "sugarcane-red-rot",
    cropName: "Sugarcane",
    cropKannadaName: "ಕಬ್ಬು",
    diseaseName: "Red Rot",
    kannadaName: "ಕಬ್ಬಿನ ಕೆಂಪು ಕೊಳೆ ರೋಗ",
    scientificName: "Colletotrichum falcatum",
    severity: "Critical",
    confidence: 98.1,
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
    govtSource: "ICAR-Sugarcane Breeding Institute & Mandya Sugarcane Research Station",
    govtSourceKannada: "ಐಸಿಎಆರ್ ಕಬ್ಬು ತಳಿ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ ಮತ್ತು ಮಂಡ್ಯ ಕಬ್ಬು ಸಂಶೋಧನಾ ಕೇಂದ್ರ",
    symptoms: [
      "Yellowing and drying of third and fourth leaves from crown",
      "Reddening of internal pith tissues with distinct white transverse bands",
      "Stalk shrinks, wilts, and emits an alcoholic/acidic smell when split open"
    ],
    symptomsKannada: [
      "ಸುಳಿಯ 3 ಮತ್ತು 4 ನೇ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಒಣಗುವುದು",
      "ಕಬ್ಬಿನ ಜಲ್ಲೆಯನ್ನು ಸೀಳಿದಾಗ ಒಳಗಿನ ತಿರುಳು ಕೆಂಪಗಾಗಿ ಬಿಳಿ ಅಡ್ಡ ಗೆರೆಗಳು ಕಾಣುವುದು",
      "ಜಲ್ಲೆ ಬಾಗಿ ಒಣಗುವುದು ಮತ್ತು ಮದ್ಯದ ಸುವಾಸನೆ ಬೀರುವುದು"
    ],
    organicTreatment: [
      "Soil application of Trichoderma harzianum blended with FYM",
      "Setts soaking in moist hot air treatment (50°C for 2 hours)"
    ],
    organicTreatmentKannada: [
      "ಸಾವಯವ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಟ್ರೈಕೋಡರ್ಮಾ ಹಾರ್ಜಿಯಾನಮ್ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ",
      "ಕಬ್ಬಿನ ಬತ್ತಿಗಳನ್ನು 50°C ಬಿಸಿ ನೀರಿನಲ್ಲಿ 2 ಗಂಟೆ ಉಪಚರಿಸಿ"
    ],
    chemicalTreatment: [
      "Carbendazim 50% WP @ 1 g/L setts soaking before planting",
      "Thiophanate-methyl 70% WP @ 1.5 g/L soil drenching"
    ],
    chemicalTreatmentKannada: [
      "ಕಾರ್ಬೆಂಡಾಜಿಮ್ 50% @ 1 ಗ್ರಾಂ/ಲೀಟರ್‌ ನೀರಿನಲ್ಲಿ ಬತ್ತಿಗಳನ್ನು ನೆನೆಸಿ ನೆಡಿ",
      "ಥಿಯೋಫನೇಟ್ ಮಿಥೈಲ್ 70% @ 1.5 ಗ್ರಾಂ/ಲೀಟರ್ ಮಣ್ಣಿಗೆ ಸುರಿಯಿರಿ"
    ],
    prevention: [
      "Plant disease-resistant varieties like Co-0238, Co-86032, or Co-62175",
      "Do not practice rattooning in infected cane fields",
      "Maintain deep crop rotation with pulses or paddy"
    ],
    preventionKannada: [
      "ರೋಗ ನಿರೋಧಕ ಕೋ-0238 ಅಥವಾ ಕೋ-86032 ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ",
      "ರೋಗಪೀಡಿತ ಜಮೀನಿನಲ್ಲಿ ಕೂಳೆ ಕಬ್ಬು ಕಾಯ್ದುಕೊಳ್ಳಬೇಡಿ",
      "ದ್ವಿದಳ ಧಾನ್ಯ ಅಥವಾ ಭತ್ತದೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ"
    ],
    favorableConditions: "Waterlogged soils, high atmospheric humidity, and temps between 28°C - 32°C.",
    favorableConditionsKannada: "ಜಮೀನಿನಲ್ಲಿ ನೀರು ನಿಲ್ಲುವುದು, ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ಮತ್ತು 28-32°C ಉಷ್ಣಾಂಶ."
  },
  {
    id: "cotton-pink-bollworm",
    cropName: "Cotton",
    cropKannadaName: "ಹತ್ತಿ",
    diseaseName: "Pink Bollworm Damage",
    kannadaName: "ಹತ್ತಿ ಗುಲಾಬಿ ಕಾಯಿ ಹುಳು",
    scientificName: "Pectinophora gossypiella",
    severity: "High",
    confidence: 92.5,
    imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80",
    govtSource: "ICAR-Central Institute for Cotton Research (CICR) Advisory",
    govtSourceKannada: "ಐಸಿಎಆರ್ ಕೇಂದ್ರೀಯ ಹತ್ತಿ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ (ಸಿಐಸಿಆರ್)",
    symptoms: [
      "Rosetted (unopened, webbed) pinkish flowers",
      "Small entry holes plugged with excreta on green bolls",
      "Stained lint and damaged seeds inside mature bolls"
    ],
    symptomsKannada: [
      "ಹೂವುಗಳು ಅರಳದೆ ರೋಸೆಟ್ ಆಕಾರದಲ್ಲಿ ಮುದುಡಿಕೊಳ್ಳುವುದು",
      "ಹಸಿರು ಕಾಯಿಗಳ ಮೇಲೆ ಹುಳು ತೂತ ಮಾಡಿದ ಸಣ್ಣ ರಂಧ್ರಗಳು",
      "ಕಾಯಿಯ ಒಳಗಿನ ಹತ್ತಿ ಮತ್ತು ಬೀಜಗಳು ಹಾನಿಗೊಳಗಾಗುವುದು"
    ],
    organicTreatment: [
      "Install Pheromone traps @ 5-8 traps/acre for adult moth monitoring",
      "Release Trichogramma bacterae egg parasitoids @ 60,000/acre weekly",
      "Spray Neem Oil 1500 ppm @ 5 ml/liter"
    ],
    organicTreatmentKannada: [
      "ಎಕರೆಗೆ 5-8 ಲಿಂಗಾಕರ್ಷಕ ಬಲೆಗಳನ್ನು (ಫೆರಮೋನ್) ಅಳವಡಿಸಿ",
      "ಎಕರೆಗೆ 60,000 ಟ್ರೈಕೋ ಗ್ರಾಮಾ ಪರಾವಲಂಬಿ ಕೀಟಗಳನ್ನು ಬಿಡಿ",
      "ಬೇವಿನ ಎಣ್ಣೆ 1500 ppm @ 5 ಮಿಲಿ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ"
    ],
    chemicalTreatment: [
      "Profenofos 50% EC @ 2 ml/L at flowering stage",
      "Emamectin Benzoate 5% SG @ 0.4 g/L for boll protection"
    ],
    chemicalTreatmentKannada: [
      "ಪ್ರೋಫೆನೋಫಾಸ್ 50% ಇಸಿ @ 2 ಮಿಲಿ/ಲೀಟರ್ ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಸಿಂಪಡಿಸಿ",
      "ಎಮಾಮೆಕ್ಟಿನ್ ಬೆಂಜೋಯೇಟ್ 5% ಎಸ್ಜಿ @ 0.4 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ"
    ],
    prevention: [
      "Observe strict 45-day pink bollworm-free crop window",
      "Destroy crop residues & cotton stalks immediately after harvest",
      "Avoid extending cotton crop beyond 160 days"
    ],
    preventionKannada: [
      "ಸುಗ್ಗಿ ಮುಗಿದ ತಕ್ಷಣ ಹತ್ತಿ ಕಡ್ಡಿಗಳನ್ನು ನಾಶಪಡಿಸಿ",
      "ಹತ್ತಿ ಬೆಳೆಯನ್ನು 160 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಅವಧಿಗೆ ಮುಂದುವರಿಸಬೇಡಿ",
      "ಸುಧಾರಿತ ಬಿಟಿ ಹತ್ತಿ ತಳಿಗಳನ್ನು ಬಳಸಿ"
    ],
    favorableConditions: "Warm weather during boll development with relative humidity around 65-80%.",
    favorableConditionsKannada: "ಕಾಯಿ ಕಟ್ಟು ಹಂತದ ಬೆಚ್ಚಗಿನ ವಾತಾವರಣ ಮತ್ತು 65-80% ಆರ್ದ್ರತೆ."
  },
  {
    id: "paddy-bacterial-blight",
    cropName: "Paddy (Rice)",
    cropKannadaName: "ಭತ್ತ",
    diseaseName: "Bacterial Leaf Blight",
    kannadaName: "ಭತ್ತದ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಎಲೆ ಮಚ್ಚೆ ರೋಗ",
    scientificName: "Xanthomonas oryzae",
    severity: "High",
    confidence: 95.2,
    imageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&q=80",
    govtSource: "ICAR-Indian Institute of Rice Research (IIRR) Bulletins",
    govtSourceKannada: "ಐಸಿಎಆರ್ ಭಾರತೀಯ ಭತ್ತ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ (IIRR)",
    symptoms: [
      "Water-soaked yellow-green stripes along leaf margins turning straw-colored",
      "Milky bacterial ooze drops drying into amber beads on leaves",
      "Kresek phase: Complete seedling wilting and leaf drying"
    ],
    symptomsKannada: [
      "ಎಲೆಯ ಅಂಚುಗಳಲ್ಲಿ ನೀರು ಹಣೆದ ಹಳದಿ-ಹಸಿರು ಪಟ್ಟಿಗಳು ಕಾಣಿಸಿಕೊಂಡು ಒಣಗುವುದು",
      "ಎಲೆಗಳ ಮೇಲೆ ಹಾಲಿನಂತಹ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಹನಿಗಳು ಒಣಗಿ ಅಂಟಿಕೊಳ್ಳುವುದು",
      "ನಾಟಿ ಸಸಿಗಳು ಸಂಪೂರ್ಣವಾಗಿ ಒಣಗಿ ಬಾಡುವುದು (ಕ್ರೆಸೆಕ್ ಹಂತ)"
    ],
    organicTreatment: [
      "Spray Fresh Cow Dung slurry (20% extract) mixed with Asafoetida",
      "Soil application of Bio-agent Pseudomonas fluorescens @ 2.5 kg/ha"
    ],
    organicTreatmentKannada: [
      "20% ತಾಜಾ ಸಗಣಿ ತಿಳಿನೀರು + ಇಂಗು ಮಿಶ್ರಣ ಸಿಂಪಡಿಸಿ",
      "ಸೂಡೋಮೊನಾಸ್ ಫ್ಲೋರೆಸೆನ್ಸ್ ಜೈವಿಕ ಅಂಶವನ್ನು 2.5 ಕೆಜಿ/ಹೆಕ್ಟೇರ್‌ಗೆ ಮಣ್ಣಿಗೆ ಹಾಕಿ"
    ],
    chemicalTreatment: [
      "Streptocycline (0.15 g/L) + Copper Oxychloride 50% WP (2 g/L)",
      "Foliar application of Kasugamycin 3% SL (2 ml/L)"
    ],
    chemicalTreatmentKannada: [
      "ಸ್ಟ್ರೆಪ್ಟೋಸೈಕ್ಲಿನ್ (0.15 ಗ್ರಾಂ) + ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (2 ಗ್ರಾಂ)/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ",
      "ಕಸುಗಾಮೈಸಿನ್ 3% ಎಸ್ಎಲ್ @ 2 ಮಿಲಿ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ"
    ],
    prevention: [
      "Grow resistant varieties like BPT-5204, Jaya, or Gangavati Sona",
      "Avoid flood irrigation from infected field to healthy fields",
      "Drain water from field for 3-4 days if early symptoms appear"
    ],
    preventionKannada: [
      "ರೋಗ ನಿರೋಧಕ ಬಿಪಿಟಿ-5204, ಗಂಗಾವತಿ ಸೋನಾ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ",
      "ರೋಗಪೀಡಿತ ಮಡಿಯಿಂದ ಇತರೆ ಮಡಿಗಳಿಗೆ ನೀರು ಹರಿಯದಂತೆ ತಡೆಯಿರಿ",
      "ರೋಗ ಕಂಡ ತಕ್ಷಣ 3-4 ದಿನ ಜಮೀನಿನ ನೀರನ್ನು ಬಸಿಯಿರಿ"
    ],
    favorableConditions: "Strong winds, heavy rain, temperatures 25°C-34°C, high Nitrogen fertilization.",
    favorableConditionsKannada: "ಬಿರುಗಾಳಿ, ಭಾರಿ ಮಳೆ, 25-34°C ಉಷ್ಣಾಂಶ ಮತ್ತು ಅತಿಯಾದ ಯುರಿಯಾ ಬಳಕೆ."
  },
  {
    id: "tomato-early-blight",
    cropName: "Tomato",
    cropKannadaName: "ಟೊಮ್ಯಾಟೊ",
    diseaseName: "Early Blight",
    kannadaName: "ಟೊಮ್ಯಾಟೊ ಬೇಗನೆ ಬರುವ ಮಚ್ಚೆ ರೋಗ",
    scientificName: "Alternaria solani",
    severity: "Medium",
    confidence: 93.7,
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&q=80",
    govtSource: "IIHR Hesaraghatta & UAS Bengaluru Advisory Bulletin",
    govtSourceKannada: "ಭಾರತೀಯ ತೋಟಗಾರಿಕಾ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ (IIHR ಹೆಸರುಘಟ್ಟ)",
    symptoms: [
      "Concentric ring 'target board' dark brown lesions on older leaves",
      "Yellowing of surrounding tissue around leaf spots leading to defoliation",
      "Sunken dark leathery spots at stem-end of ripe tomato fruits"
    ],
    symptomsKannada: [
      "ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ವರ್ತುಲಾಕಾರದ ಕಂದು ಬಣ್ಣದ ಮಚ್ಚೆಗಳು (ಟಾರ್ಗೆಟ್ ಬೋರ್ಡ್)",
      "ಮಚ್ಚೆಗಳ ಸುತ್ತ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಎಲೆಗಳು ಉದುರುವುದು",
      "ಕಾಯಿಗಳ ಮೇಲ್ಭಾಗದಲ್ಲಿ ತಗ್ಗಿದ ಕಪ್ಪು ಚರ್ಮದಂತಹ ಮಚ್ಚೆಗಳು"
    ],
    organicTreatment: [
      "Spray baking soda solution (5g/L water + organic liquid soap)",
      "Mulch soil around plants with straw to prevent fungal splashback"
    ],
    organicTreatmentKannada: [
      "ಅಡುಗೆ ಸೋಡಾ ದ್ರಾವಣ ಸಿಂಪಡಿಸಿ (5 ಗ್ರಾಂ/ಲೀಟರ್ ನೀರು + ಸಾವಯವ ಸಾಬೂನು)",
      "ಗಿಡಗಳ ಬುಡಕ್ಕೆ ಒಣ ಹುಲ್ಲಿನ ಮಲ್ಚಿಂಗ್ ಮಾಡಿ"
    ],
    chemicalTreatment: [
      "Mancozeb 75% WP @ 2.5 g/L spray at first sign of spots",
      "Azoxystrobin 23% SC @ 1 ml/L for systemic protection"
    ],
    chemicalTreatmentKannada: [
      "ಮ್ಯಾಂಕೋಜೆಬ್ 75% @ 2.5 ಗ್ರಾಂ/ಲೀಟರ್‌ ಸಿಂಪಡಿಸಿ",
      "ಅಜಾಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ 23% @ 1 ಮಿಲಿ/ಲೀಟರ್ ನೀರಿಗೆ ಸಿಂಪಡಿಸಿ"
    ],
    prevention: [
      "Stake tomato vines to keep foliage off ground",
      "Practice 3-year crop rotation",
      "Drip irrigate at plant base rather than overhead spraying"
    ],
    preventionKannada: [
      "ಟೊಮ್ಯಾಟೊ ಗಿಡಗಳಿಗೆ ಕೋಲು ಕಟ್ಟಿ ಎಲೆಗಳು ನೆಲಕ್ಕೆ ತಗದಂತೆ ನೋಡಿ",
      "ಹನಿ ನೀರಾವರಿ ಪದ್ಧತಿ ಬಳಸಿ"
    ],
    favorableConditions: "Warm humid weather with alternating rain and dry periods (24°C - 29°C).",
    favorableConditionsKannada: "ಬೆಚ್ಚಗಿನ ತೇವಾಂಶದ ವಾತಾವರಣ ಮತ್ತು 24-29°C ಉಷ್ಣಾಂಶ."
  }
];

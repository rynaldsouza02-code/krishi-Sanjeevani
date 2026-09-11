export interface PlantDisease {
  id: string;
  cropName: string;
  diseaseName: string;
  kannadaName: string;
  scientificName: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
  imageUrl: string;
  symptoms: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  prevention: string[];
  favorableConditions: string;
}

export const DISEASE_DATABASE: PlantDisease[] = [
  {
    id: "arecanut-koleroga",
    cropName: "Arecanut",
    diseaseName: "Fruit Rot (Koleroga / Mahali)",
    kannadaName: "ಅಡಿಕೆ ಕೊಳೆ ರೋಗ (ಮಹಳಿ)",
    scientificName: "Phytophthora meadii",
    severity: "Critical",
    confidence: 96.4,
    imageUrl: "https://images.unsplash.com/photo-1599598425947-020645547488?w=800&q=80",
    symptoms: [
      "Water-soaked dark lesions appearing on nuts",
      "Rotting and premature dropping of immature nuts from canopy",
      "White felt-like fungal mycelium growth on infected fallen nuts",
      "Foul odor surrounding fallen nuts"
    ],
    organicTreatment: [
      "Spray 1% Bordeaux mixture (10g Copper Sulfate + 10g Lime per liter)",
      "Apply Trichoderma viride bio-fungicide paste around tree collar",
      "Clean palm crown before heavy monsoon rains"
    ],
    chemicalTreatment: [
      "Prophylactic spray of Metalaxyl 8% + Mancozeb 64% (2g/L)",
      "Apply Fosetyl-Al (2.5g/L) during persistent rainfall breaks"
    ],
    prevention: [
      "Tie polythene covers over arecanut bunches before monsoon onset",
      "Ensure proper drainage in gardens to avoid stagnant water",
      "Collect and burn all fallen infected nuts"
    ],
    favorableConditions: "High relative humidity (>90%) with continuous heavy monsoon rainfall (June - August)."
  },
  {
    id: "ragi-blast",
    cropName: "Ragi (Finger Millet)",
    diseaseName: "Blast Disease",
    kannadaName: "ರಾಗಿ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
    scientificName: "Magnaporthe oryzae",
    severity: "High",
    confidence: 94.8,
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    symptoms: [
      "Spindle-shaped elliptical spots with grayish center and brown margins on leaves",
      "Neck breaking at the base of the finger millet earhead",
      "Chaffy grains and premature earhead drying"
    ],
    organicTreatment: [
      "Foliar spray of 5% Neem Seed Kernel Extract (NSKE)",
      "Seed treatment with Pseudomonas fluorescens @ 10g/kg seed"
    ],
    chemicalTreatment: [
      "Spray Tricyclazole 75% WP @ 0.6 g/liter at leaf stage",
      "Spray Carbendazim 50% WP @ 1 g/liter at earhead emergence"
    ],
    prevention: [
      "Use resistant varieties such as GPU-28, ML-365, or KMR-204",
      "Avoid excessive Nitrogenous fertilizer application",
      "Maintain optimum plant spacing"
    ],
    favorableConditions: "Cloudy humid weather with dew formation and temperatures around 20°C - 28°C."
  },
  {
    id: "sugarcane-red-rot",
    cropName: "Sugarcane",
    diseaseName: "Red Rot",
    kannadaName: "ಕಬ್ಬಿನ ಕೆಂಪು ಕೊಳೆ ರೋಗ",
    scientificName: "Colletotrichum falcatum",
    severity: "Critical",
    confidence: 98.1,
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
    symptoms: [
      "Yellowing and drying of third and fourth leaves from crown",
      "Reddening of internal pith tissues with distinct white transverse bands",
      "Stalk shrinks, wilts, and emits an alcoholic/acidic smell when split open"
    ],
    organicTreatment: [
      "Soil application of Trichoderma harzianum blended with FYM (Farm Yard Manure)",
      "Setts soaking in warm water treatment (50°C for 2 hours)"
    ],
    chemicalTreatment: [
      "Setts treatment with Carbendazim 50% WP (1g/L) for 15 minutes before planting",
      "Drench soil with Thiophanate-methyl 70% WP (1.5g/L)"
    ],
    prevention: [
      "Plant disease-resistant varieties like Co-0238 or Co-86032",
      "Do not practice rattooning in infected cane fields",
      "Maintain deep crop rotation with pulses or paddy"
    ],
    favorableConditions: "Waterlogged soils, high atmospheric humidity, and temps between 28°C - 32°C."
  },
  {
    id: "cotton-pink-bollworm",
    cropName: "Cotton",
    diseaseName: "Pink Bollworm Damage",
    kannadaName: "ಹತ್ತಿ ಗುಲಾಬಿ ಕಾಯಿ ಹುಳು",
    scientificName: "Pectinophora gossypiella",
    severity: "High",
    confidence: 92.5,
    imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80",
    symptoms: [
      "Rosetted (unopened, webbed) pinkish flowers",
      "Small entry holes plugged with excreta on green bolls",
      "Stained lint and damaged seeds inside mature bolls"
    ],
    organicTreatment: [
      "Install Pheromone traps @ 5-8 traps/acre for adult moth monitoring",
      "Release Trichogramma bactrae egg parasitoids @ 60,000/acre weekly",
      "Spray Neem Oil 1500 ppm @ 5 ml/liter"
    ],
    chemicalTreatment: [
      "Spray Profenofos 50% EC @ 2 ml/liter at flowering stage",
      "Spray Emamectin Benzoate 5% SG @ 0.4 g/liter for boll protection"
    ],
    prevention: [
      "Observe strict 45-day pink bollworm-free crop window",
      "Destroy crop residues & cotton stalks immediately after harvest",
      "Avoid extending cotton crop beyond 160 days"
    ],
    favorableConditions: "Warm weather during boll development with relative humidity around 65-80%."
  },
  {
    id: "paddy-bacterial-blight",
    cropName: "Paddy (Rice)",
    diseaseName: "Bacterial Leaf Blight",
    kannadaName: "ಭತ್ತದ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಎಲೆ ಮಚ್ಚೆ ರೋಗ",
    scientificName: "Xanthomonas oryzae",
    severity: "High",
    confidence: 95.2,
    imageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&q=80",
    symptoms: [
      "Water-soaked yellow-green stripes along leaf margins turning straw-colored",
      "Milky bacterial ooze drops drying into amber beads on young leaves",
      "Krebsek phase: Complete seedling wilting and leaf drying"
    ],
    organicTreatment: [
      "Spray Fresh Cow Dung slurry (20% extract) mixed with Asafoetida",
      "Soil application of Bio-agent Pseudomonas fluorescens @ 2.5 kg/ha"
    ],
    chemicalTreatment: [
      "Spray Streptocycline (0.15 g/L) + Copper Oxychloride 50% WP (2 g/L)",
      "Foliar application of Kasugamycin 3% SL (2 ml/L)"
    ],
    prevention: [
      "Grow resistant varieties like BPT-5204 or Jaya",
      "Avoid flood irrigation from infected field to healthy fields",
      "Drain water from field for 3-4 days if early symptoms appear"
    ],
    favorableConditions: "Strong winds, heavy rain, temperatures 25°C-34°C, high Nitrogen fertilization."
  },
  {
    id: "tomato-early-blight",
    cropName: "Tomato",
    diseaseName: "Early Blight",
    kannadaName: "ಟೊಮ್ಯಾಟೊ ಬೇಗನೆ ಬರುವ ಮಚ್ಚೆ ರೋಗ",
    scientificName: "Alternaria solani",
    severity: "Medium",
    confidence: 93.7,
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&q=80",
    symptoms: [
      "Concentric ring 'target board' dark brown lesions on older leaves",
      "Yellowing of surrounding tissue around leaf spots leading to defoliation",
      "Sunken dark leathery spots at stem-end of ripe tomato fruits"
    ],
    organicTreatment: [
      "Spray baking soda solution (5g/L water + few drops organic liquid soap)",
      "Mulch soil around plants with straw to prevent fungal spore splashback"
    ],
    chemicalTreatment: [
      "Spray Mancozeb 75% WP @ 2.5 g/liter at first sign of spots",
      "Spray Azoxystrobin 23% SC @ 1 ml/liter for systemic cure"
    ],
    prevention: [
      "Stake tomato vines to keep foliage off ground",
      "Practice 3-year crop rotation (avoid Solanaceous crops)",
      "Drip irrigate at plant base rather than overhead spraying"
    ],
    favorableConditions: "Warm humid weather with alternating rain and dry dry periods (24°C - 29°C)."
  }
];

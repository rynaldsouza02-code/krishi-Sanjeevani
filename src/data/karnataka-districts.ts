export interface DistrictData {
  id: string;
  name: string;
  kannadaName: string;
  zone: string;
  zoneCode: number;
  soilTypes: string[];
  avgRainfall: number; // in mm
  soilNPK: {
    n: number; // Nitrogen kg/ha
    p: number; // Phosphorus kg/ha
    k: number; // Potassium kg/ha
    ph: number;
  };
  primaryCrops: string[];
  apmcPriceIndex: { [key: string]: number }; // Crop -> Price in ₹/Quintal
  advisory: string;
}

export const KARNATAKA_DISTRICTS: DistrictData[] = [
  {
    id: "bagalkot",
    name: "Bagalkot",
    kannadaName: "ಬಾಗಲಕೋಟೆ",
    zone: "Northern Dry Zone",
    zoneCode: 3,
    soilTypes: ["Deep Black Soil", "Red Sandy Soil"],
    avgRainfall: 560,
    soilNPK: { n: 180, p: 22, k: 310, ph: 7.8 },
    primaryCrops: ["Sugarcane", "Maize", "Cotton", "Sunflower", "Pomegranate"],
    apmcPriceIndex: { "Sugarcane": 3150, "Maize": 2200, "Cotton": 7100, "Pomegranate": 9500 },
    advisory: "Promote drip irrigation for sugarcane. Monitor pink bollworm in cotton during Kharif."
  },
  {
    id: "ballari",
    name: "Ballari",
    kannadaName: "ಬಳ್ಳಾರಿ",
    zone: "Northern Dry Zone",
    zoneCode: 3,
    soilTypes: ["Deep Black Soil", "Red Soil"],
    avgRainfall: 630,
    soilNPK: { n: 165, p: 28, k: 290, ph: 8.1 },
    primaryCrops: ["Rice", "Paddy", "Chilli", "Cotton", "Maize", "Groundnut"],
    apmcPriceIndex: { "Paddy": 2350, "Chilli": 16500, "Cotton": 7250, "Maize": 2150 },
    advisory: "High salinity in canal areas. Incorporate gypsum and bio-fertilizers to manage alkaline pH."
  },
  {
    id: "belagavi",
    name: "Belagavi",
    kannadaName: "ಬೆಳಗಾವಿ",
    zone: "Northern Transition Zone",
    zoneCode: 8,
    soilTypes: ["Medium Black Soil", "Red Loamy Soil", "Laterite Soil"],
    avgRainfall: 880,
    soilNPK: { n: 210, p: 35, k: 340, ph: 7.2 },
    primaryCrops: ["Sugarcane", "Maize", "Soybean", "Paddy", "Tobacco"],
    apmcPriceIndex: { "Sugarcane": 3300, "Soybean": 4800, "Maize": 2250, "Paddy": 2400 },
    advisory: "Major sugarcane belt. Use trash composting to maintain organic matter and conserve moisture."
  },
  {
    id: "bengaluru-rural",
    name: "Bengaluru Rural",
    kannadaName: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
    zone: "Eastern Dry Zone",
    zoneCode: 5,
    soilTypes: ["Red Sandy Loam", "Red Clay Loam"],
    avgRainfall: 820,
    soilNPK: { n: 230, p: 42, k: 220, ph: 6.5 },
    primaryCrops: ["Ragi (Finger Millet)", "Maize", "Grapes", "Vegetables", "Flowers"],
    apmcPriceIndex: { "Ragi": 3800, "Grapes": 6500, "Tomato": 2800, "Maize": 2300 },
    advisory: "Ideal for peri-urban horticulture & protected greenhouse farming. High market proximity."
  },
  {
    id: "bengaluru-urban",
    name: "Bengaluru Urban",
    kannadaName: "ಬೆಂಗಳೂರು ನಗರ",
    zone: "Eastern Dry Zone",
    zoneCode: 5,
    soilTypes: ["Red Loamy Soil"],
    avgRainfall: 850,
    soilNPK: { n: 220, p: 40, k: 210, ph: 6.6 },
    primaryCrops: ["Ragi", "Vegetables", "Flowers", "Polyhouse Crops"],
    apmcPriceIndex: { "Ragi": 3850, "Tomato": 3000, "Capsicum": 4500 },
    advisory: "Adopt hydroponics and roof-top micro-farming to tap high city demand."
  },
  {
    id: "bidar",
    name: "Bidar",
    kannadaName: "ಬೀದರ್",
    zone: "North Eastern Transition Zone",
    zoneCode: 1,
    soilTypes: ["Laterite Soil", "Deep Black Soil"],
    avgRainfall: 840,
    soilNPK: { n: 190, p: 30, k: 300, ph: 7.4 },
    primaryCrops: ["Blackgram (Urad)", "Greengram (Moong)", "Soybean", "Sugarcane", "Jowar"],
    apmcPriceIndex: { "Blackgram": 7800, "Soybean": 4900, "Jowar": 3100 },
    advisory: "Pulse bowl of Karnataka. Practice inter-cropping with Jowar to suppress weeds and enhance soil Nitrogen."
  },
  {
    id: "chamarajanagar",
    name: "Chamarajanagar",
    kannadaName: "ಚಾಮರಾಜನಗರ",
    zone: "Southern Dry Zone",
    zoneCode: 6,
    soilTypes: ["Red Sandy Soil", "Black Soil"],
    avgRainfall: 740,
    soilNPK: { n: 200, p: 26, k: 240, ph: 6.9 },
    primaryCrops: ["Turmeric", "Banana", "Ragi", "Sugarcane", "Groundnut"],
    apmcPriceIndex: { "Turmeric": 13500, "Banana": 2200, "Ragi": 3750 },
    advisory: "High value organic Turmeric hub. Ensure good drainage to prevent rhizome rot."
  },
  {
    id: "chikkaballapur",
    name: "Chikkaballapur",
    kannadaName: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
    zone: "Eastern Dry Zone",
    zoneCode: 5,
    soilTypes: ["Red Sandy Loam"],
    avgRainfall: 710,
    soilNPK: { n: 210, p: 48, k: 230, ph: 6.4 },
    primaryCrops: ["Tomato", "Silk (Sericulture)", "Ragi", "Groundnut", "Grapes"],
    apmcPriceIndex: { "Tomato": 2900, "Ragi": 3800, "Silk Cocoon": 48000 },
    advisory: "Major Tomato market hub. Implement micro-irrigation and IPM against early blight."
  },
  {
    id: "chikkamagaluru",
    name: "Chikkamagaluru",
    kannadaName: "ಚಿಕ್ಕಮಗಳೂರು",
    zone: "Hilly Zone",
    zoneCode: 9,
    soilTypes: ["Red Clay Loam", "Laterite Soil"],
    avgRainfall: 1920,
    soilNPK: { n: 280, p: 25, k: 260, ph: 5.8 },
    primaryCrops: ["Coffee", "Arecanut", "Pepper", "Cardamom", "Paddy"],
    apmcPriceIndex: { "Coffee Arabica": 32000, "Arecanut": 48000, "Black Pepper": 58000 },
    advisory: "Coffee & Spice capital. Apply agricultural lime to regulate acidic soil pH."
  },
  {
    id: "chitradurga",
    name: "Chitradurga",
    kannadaName: "ಚಿತ್ರದುರ್ಗ",
    zone: "Central Dry Zone",
    zoneCode: 4,
    soilTypes: ["Red Sandy Soil", "Deep Black Soil"],
    avgRainfall: 570,
    soilNPK: { n: 175, p: 20, k: 270, ph: 7.9 },
    primaryCrops: ["Groundnut", "Onion", "Pomegranate", "Arecanut", "Maize"],
    apmcPriceIndex: { "Groundnut": 6600, "Onion": 2400, "Pomegranate": 9200 },
    advisory: "Drought-prone area. Utilize farm ponds (Krishi Hondas) and drip irrigation for horticulture."
  },
  {
    id: "dakshina-kannada",
    name: "Dakshina Kannada",
    kannadaName: "ದಕ್ಷಿಣ ಕನ್ನಡ",
    zone: "Coastal Zone",
    zoneCode: 10,
    soilTypes: ["Coastal Alluvial", "Laterite Soil"],
    avgRainfall: 3800,
    soilNPK: { n: 290, p: 28, k: 210, ph: 5.4 },
    primaryCrops: ["Paddy", "Arecanut", "Coconut", "Cashew", "Rubber"],
    apmcPriceIndex: { "Paddy": 2400, "Arecanut": 49500, "Cashew": 11500, "Coconut": 3200 },
    advisory: "Heavy monsoon region. Manage Koleroga (Fruit Rot) in Arecanut with Bordeaux mixture sprays."
  },
  {
    id: "davanagere",
    name: "Davanagere",
    kannadaName: "ದಾವಣಗೆರೆ",
    zone: "Central Dry Zone",
    zoneCode: 4,
    soilTypes: ["Medium Black Soil", "Red Loam"],
    avgRainfall: 680,
    soilNPK: { n: 210, p: 32, k: 290, ph: 7.3 },
    primaryCrops: ["Paddy", "Maize", "Sugarcane", "Arecanut", "Cotton"],
    apmcPriceIndex: { "Paddy": 2380, "Maize": 2220, "Arecanut": 48500 },
    advisory: "Bhadra canal command zone. Rotate Paddy with legume pulse crops to break pest cycles."
  },
  {
    id: "dharwad",
    name: "Dharwad",
    kannadaName: "ಧಾರವಾಡ",
    zone: "Northern Transition Zone",
    zoneCode: 8,
    soilTypes: ["Deep Black Soil", "Red Loam"],
    avgRainfall: 770,
    soilNPK: { n: 220, p: 36, k: 310, ph: 7.5 },
    primaryCrops: ["Cotton", "Bengal Gram (Chana)", "Jowar", "Soybean", "Wheat", "Mango"],
    apmcPriceIndex: { "Cotton": 7300, "Bengal Gram": 5900, "Jowar": 3200 },
    advisory: "Agricultural research hub (UASD). Promising region for organic cotton and pulse seed production."
  },
  {
    id: "gadag",
    name: "Gadag",
    kannadaName: "ಗದಗ",
    zone: "Northern Dry Zone",
    zoneCode: 3,
    soilTypes: ["Deep Black Soil"],
    avgRainfall: 610,
    soilNPK: { n: 170, p: 24, k: 320, ph: 8.0 },
    primaryCrops: ["Groundnut", "Onion", "Chilli (Byadgi)", "Bengal Gram", "Wheat"],
    apmcPriceIndex: { "Byadgi Chilli": 24000, "Onion": 2500, "Groundnut": 6700 },
    advisory: "World-famous Byadgi chilli region. Soil testing recommended for balanced Potassium application."
  },
  {
    id: "hassan",
    name: "Hassan",
    kannadaName: "ಹಾಸನ",
    zone: "Southern Transition Zone",
    zoneCode: 7,
    soilTypes: ["Red Loamy Soil", "Laterite Soil"],
    avgRainfall: 1040,
    soilNPK: { n: 240, p: 34, k: 250, ph: 6.2 },
    primaryCrops: ["Potato", "Coffee", "Paddy", "Ragi", "Coconut", "Pepper"],
    apmcPriceIndex: { "Potato": 2100, "Coffee Robusta": 26000, "Ragi": 3800 },
    advisory: "Major Potato producer. Monitor for late blight during rainy periods with copper oxychloride."
  },
  {
    id: "haveri",
    name: "Haveri",
    kannadaName: "ಹಾವೇರಿ",
    zone: "Northern Transition Zone",
    zoneCode: 8,
    soilTypes: ["Medium Black Soil", "Red Loam"],
    avgRainfall: 750,
    soilNPK: { n: 205, p: 33, k: 300, ph: 7.4 },
    primaryCrops: ["Maize", "Byadgi Red Chilli", "Cotton", "Groundnut", "Paddy"],
    apmcPriceIndex: { "Maize": 2210, "Byadgi Chilli": 25500, "Cotton": 7200 },
    advisory: "Highest Maize production area in Karnataka. Watch for Fall Armyworm outbreaks."
  },
  {
    id: "kalaburagi",
    name: "Kalaburagi",
    kannadaName: "ಕಲಬುರಗಿ",
    zone: "North Eastern Dry Zone",
    zoneCode: 2,
    soilTypes: ["Deep Black Soil"],
    avgRainfall: 750,
    soilNPK: { n: 160, p: 26, k: 350, ph: 8.2 },
    primaryCrops: ["Pigeon Pea (Red Gram / Tur)", "Jowar", "Bajra", "Sunflower", "Cotton"],
    apmcPriceIndex: { "Tur (Red Gram)": 10200, "Jowar": 3300, "Sunflower": 5100 },
    advisory: "Red Gram Capital of Karnataka. GI-tagged Kalaburagi Red Gram requires moisture conservation."
  },
  {
    id: "kodagu",
    name: "Kodagu",
    kannadaName: "ಕೊಡಗು",
    zone: "Hilly Zone",
    zoneCode: 9,
    soilTypes: ["Forest Brown Soil", "Laterite Soil"],
    avgRainfall: 2700,
    soilNPK: { n: 310, p: 22, k: 280, ph: 5.5 },
    primaryCrops: ["Coffee", "Black Pepper", "Paddy", "Coorg Mandarin Orange", "Cardamom"],
    apmcPriceIndex: { "Coffee Arabica": 33500, "Black Pepper": 60000, "Coorg Orange": 4500 },
    advisory: "Shade-grown coffee hub. Maintain tree canopy for biodiversity & moisture retention."
  },
  {
    id: "kolar",
    name: "Kolar",
    kannadaName: "ಕೋಲಾರ",
    zone: "Eastern Dry Zone",
    zoneCode: 5,
    soilTypes: ["Red Loam", "Red Sandy Soil"],
    avgRainfall: 740,
    soilNPK: { n: 215, p: 45, k: 225, ph: 6.7 },
    primaryCrops: ["Tomato", "Mango", "Ragi", "Silk Cocoon", "Groundnut"],
    apmcPriceIndex: { "Tomato": 2950, "Mango Totapuri": 2200, "Ragi": 3800 },
    advisory: "Second largest APMC market in Asia. Implement drip fertigation and mulching for Tomatoes."
  },
  {
    id: "koppal",
    name: "Koppal",
    kannadaName: "ಕೊಪ್ಪಳ",
    zone: "Northern Dry Zone",
    zoneCode: 3,
    soilTypes: ["Red Sandy Soil", "Black Soil"],
    avgRainfall: 590,
    soilNPK: { n: 175, p: 25, k: 280, ph: 7.9 },
    primaryCrops: ["Paddy", "Maize", "Pomegranate", "Guava", "Bajra"],
    apmcPriceIndex: { "Paddy": 2360, "Pomegranate": 9800, "Maize": 2180 },
    advisory: "Tungabhadra canal irrigation zone. Monitor bacterial blight in Pomegranate orchards."
  },
  {
    id: "mandya",
    name: "Mandya",
    kannadaName: "ಮಂಡ್ಯ",
    zone: "Southern Dry Zone",
    zoneCode: 6,
    soilTypes: ["Red Loam", "Clay Loam"],
    avgRainfall: 700,
    soilNPK: { n: 250, p: 38, k: 270, ph: 6.8 },
    primaryCrops: ["Sugarcane", "Paddy", "Ragi", "Coconut", "Banana"],
    apmcPriceIndex: { "Sugarcane": 3350, "Paddy": 2420, "Ragi": 3850 },
    advisory: "Sugar bowl of Karnataka. Adopt Sustainable Sugarcane Initiative (SSI) for higher yields."
  },
  {
    id: "mysuru",
    name: "Mysuru",
    kannadaName: "ಮೈಸೂರು",
    zone: "Southern Dry Zone",
    zoneCode: 6,
    soilTypes: ["Red Loam", "Red Sandy Soil"],
    avgRainfall: 780,
    soilNPK: { n: 240, p: 35, k: 260, ph: 6.7 },
    primaryCrops: ["Paddy", "Ragi", "Tobacco", "Pulses", "Sugarcane", "Cotton"],
    apmcPriceIndex: { "Paddy": 2410, "Ragi": 3800, "Tobacco": 21000 },
    advisory: "KRS canal command region. Promote crop diversification towards organic pulses & Ragi."
  },
  {
    id: "raichur",
    name: "Raichur",
    kannadaName: "ರಾಯಚೂರು",
    zone: "North Eastern Dry Zone",
    zoneCode: 2,
    soilTypes: ["Deep Black Soil", "Red Sandy Soil"],
    avgRainfall: 620,
    soilNPK: { n: 170, p: 27, k: 330, ph: 8.1 },
    primaryCrops: ["Paddy (Rice)", "Cotton", "Groundnut", "Sunflower", "Jowar"],
    apmcPriceIndex: { "Paddy Sona Masuri": 2650, "Cotton": 7350, "Groundnut": 6800 },
    advisory: "Rice bowl of North Karnataka (Sona Masuri). Efficient water use needed in canal tail-ends."
  },
  {
    id: "ramanagara",
    name: "Ramanagara",
    kannadaName: "ರಾಮನಗರ",
    zone: "Eastern Dry Zone",
    zoneCode: 5,
    soilTypes: ["Red Sandy Loam"],
    avgRainfall: 810,
    soilNPK: { n: 220, p: 42, k: 215, ph: 6.5 },
    primaryCrops: ["Silk (Sericulture)", "Ragi", "Mango", "Coconut", "Banana"],
    apmcPriceIndex: { "Silk Cocoon": 49500, "Ragi": 3820, "Mango": 3500 },
    advisory: "Silk City of India. Ensure disease-free mulberry leaf cultivation for silkworm health."
  },
  {
    id: "shivamogga",
    name: "Shivamogga",
    kannadaName: "ಶಿವಮೊಗ್ಗ",
    zone: "Southern Transition Zone",
    zoneCode: 7,
    soilTypes: ["Red Loam", "Laterite Soil"],
    avgRainfall: 1810,
    soilNPK: { n: 270, p: 30, k: 250, ph: 5.9 },
    primaryCrops: ["Paddy", "Arecanut", "Maize", "Ginger", "Pepper"],
    apmcPriceIndex: { "Arecanut": 49000, "Paddy": 2400, "Ginger": 8500 },
    advisory: "Gateway of Malnad. Manage Arecanut Yellow Leaf Disease through micronutrient management."
  },
  {
    id: "tumakuru",
    name: "Tumakuru",
    kannadaName: "ತುಮಕೂರು",
    zone: "Central Dry Zone",
    zoneCode: 4,
    soilTypes: ["Red Sandy Soil", "Red Loam"],
    avgRainfall: 690,
    soilNPK: { n: 190, p: 30, k: 230, ph: 6.8 },
    primaryCrops: ["Coconut", "Ragi", "Groundnut", "Arecanut", "Tamarind"],
    apmcPriceIndex: { "Coconut": 3400, "Ragi": 3800, "Groundnut": 6650 },
    advisory: "Kalpataru Land (Coconut hub). Treat Rugose Spiralling Whitefly with neem oil spray."
  },
  {
    id: "udupi",
    name: "Udupi",
    kannadaName: "ಉಡುಪಿ",
    zone: "Coastal Zone",
    zoneCode: 10,
    soilTypes: ["Coastal Alluvial", "Laterite Soil"],
    avgRainfall: 4100,
    soilNPK: { n: 295, p: 26, k: 200, ph: 5.2 },
    primaryCrops: ["Paddy", "Coconut", "Arecanut", "Cashew", "Pulses"],
    apmcPriceIndex: { "Paddy": 2420, "Coconut": 3300, "Cashew": 11800 },
    advisory: "High coastal rainfall. Use salt-tolerant paddy varieties (e.g. MO-4) in brackish estuarine zones."
  },
  {
    id: "uttara-kannada",
    name: "Uttara Kannada",
    kannadaName: "ಉತ್ತರ ಕನ್ನಡ",
    zone: "Coastal & Hilly Zone",
    zoneCode: 10,
    soilTypes: ["Laterite Soil", "Coastal Alluvial"],
    avgRainfall: 2800,
    soilNPK: { n: 285, p: 24, k: 220, ph: 5.4 },
    primaryCrops: ["Paddy", "Arecanut", "Spices (Cardamom, Pepper)", "Cashew", "Coconut"],
    apmcPriceIndex: { "Arecanut": 48500, "Pepper": 59000, "Paddy": 2400 },
    advisory: "Forest and spice rich district. Promote organic certification for high export value spices."
  },
  {
    id: "vijayanagara",
    name: "Vijayanagara",
    kannadaName: "ವಿಜಯನಗರ",
    zone: "Northern Dry Zone",
    zoneCode: 3,
    soilTypes: ["Medium Black Soil", "Red Sandy Soil"],
    avgRainfall: 640,
    soilNPK: { n: 180, p: 26, k: 290, ph: 7.9 },
    primaryCrops: ["Paddy", "Sugarcane", "Maize", "Banana", "Cotton"],
    apmcPriceIndex: { "Paddy": 2370, "Sugarcane": 3200, "Banana": 2300 },
    advisory: "Historic canal irrigated zone. Practice crop rotation with leguminous pulses."
  },
  {
    id: "yadgir",
    name: "Yadgir",
    kannadaName: "ಯಾದಗಿರಿ",
    zone: "North Eastern Dry Zone",
    zoneCode: 2,
    soilTypes: ["Deep Black Soil"],
    avgRainfall: 720,
    soilNPK: { n: 165, p: 25, k: 340, ph: 8.3 },
    primaryCrops: ["Paddy", "Red Gram (Tur)", "Jowar", "Cotton", "Groundnut"],
    apmcPriceIndex: { "Paddy": 2390, "Red Gram": 10100, "Jowar": 3250 },
    advisory: "Krishna & Bhima river basin. Ensure canal drainage to prevent waterlogging in clay black soil."
  }
];

import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ 
    status: "AgriBot Gemini LLM Engine is active", 
    endpoint: "/api/agribot",
    supportedLanguages: ["en", "kn"] 
  });
}

export async function POST(req: NextRequest) {
  try {
    const { message, language } = await req.json();

    const userText = (message || "").trim();
    if (!userText) {
      return NextResponse.json({
        reply: language === "kn" 
          ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ." 
          : "Please type your agricultural query.",
        recommendedActions: []
      });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // -------------------------------------------------------------
    // OPTION A: Live Gemini LLM API Call (if GEMINI_API_KEY is set)
    // -------------------------------------------------------------
    if (apiKey) {
      try {
        const systemPrompt = `You are AgriBot, an expert AI Agricultural Specialist and Precision Farming Advisor for Karnataka farmers.
You provide precise, accurate, encouraging, and actionable agricultural answers.
Respond directly in the requested language (${language === "kn" ? "Kannada (ಕನ್ನಡ)" : "English"}).
Always include practical steps, organic/chemical solutions if disease-related, recommended seed varieties, fertilizer dosage, or government schemes when relevant.
Keep responses clear, concise, structured, and farmer-friendly. Avoid meta talk.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nUser Question: ${userText}` }]
                }
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 600
              }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (generatedText) {
            return NextResponse.json({
              reply: generatedText,
              language: language || "en",
              engine: "Gemini 1.5 Flash LLM",
              timestamp: new Date().toISOString(),
              recommendedActions: generateRecommendedActions(userText, language)
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to local Knowledge Engine:", geminiErr);
      }
    }

    // -------------------------------------------------------------
    // OPTION B: High-Precision Bilingual Agricultural Knowledge Engine
    // -------------------------------------------------------------
    const lowerText = userText.toLowerCase();

    let reply = "";
    let actions: string[] = [];

    // 1. Arecanut / Koleroga / Mahali (ಅಡಿಕೆ)
    if (matchKeywords(lowerText, ["arecanut", "koleroga", "mahali", "ಅಡಿಕೆ", "ಮಹಳಿ", "ಕೊಳೆ ರೋಗ"])) {
      reply = language === "kn"
        ? "🌱 **ಅಡಿಕೆ ಕೊಳೆ ರೋಗ (ಮಹಳಿ) ನಿರ್ವಹಣೆ:**\n1. **ಮುನ್ನೆಚ್ಚರಿಕೆ:** ಮಳೆಗಾಲಕ್ಕೂ ಮೊದಲು 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣವನ್ನು ಅಡಿಕೆ ಗೊನೆಗಳಿಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಸಿಂಪಡಿಸಿ.\n2. **ರಕ್ಷಣೆ:** ಮಳೆ ನಡುವೆ 45 ದಿನಗಳ ನಂತರ 2ನೇ ಬಾರಿ ಸಿಂಪಡಿಸಿ ಅಥವಾ ಡೈಥೇನ್ M-45 (2g/L) ಬಳಸಿ.\n3. **ಶುಚಿತ್ವ:** ತೋಟದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಚರಂಡಿ ಮಾಡಿ ಮತ್ತು ಬಿದ್ದ ಕೊಳೆತ ಅಡಿಕೆಗಳನ್ನು ನಾಶಪಡಿಸಿ."
        : "🌱 **Arecanut Fruit Rot (Koleroga / Mahali) Protocol:**\n1. **Preventive Spray:** Apply 1% Bordeaux mixture spray on bunches prior to monsoon onset.\n2. **Follow-up:** Repeat spray after 45 days during a rain break or use Mancozeb 75 WP (2g/L).\n3. **Sanitation:** Clear field drainage channels and destroy fallen rotten nuts to stop fungal spores.";
      actions = ["Disease Detector Scan", "Bordeaux Mixture Prep Guide", "Shivamogga Areca Mandi Rates"];
    }

    // 2. Ragi / Finger Millet / Blast (ರಾಗಿ)
    else if (matchKeywords(lowerText, ["ragi", "finger millet", "blast", "ರಾಗಿ", "ಬೆಂಕಿ ರೋಗ"])) {
      reply = language === "kn"
        ? "🌾 **ರಾಗಿ ಬೆಳೆ ಮತ್ತು ಬೆಂಕಿ ರೋಗ ಸಲಹೆ:**\n1. **ತಳಿಗಳು:** ರೋಗ ನಿರೋಧಕ KMR-204, GPU-28, ಅಥವಾ ML-365 ತಳಿಗಳನ್ನು ಬಳಸಿ.\n2. **ಬೆಂಕಿ ರೋಗ ಚಿಕಿತ್ಸೆ:** ಎಲೆ ಬೆಂಕಿ ರೋಗ ಕಂಡುಬಂದರೆ ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ 75 WP (0.6g/L ನೀರು) ಸಿಂಪಡಿಸಿ.\n3. **ಗೊಬ್ಬರ:** ಎಕರೆಗೆ 50kg N, 40kg P, 25kg K ನೀಡಬೇಕು."
        : "🌾 **Ragi (Finger Millet) & Blast Disease Management:**\n1. **Varieties:** Sow blast-resistant seeds like GPU-28, KMR-204, or ML-365.\n2. **Blast Control:** Spray Tricyclazole 75 WP @ 0.6g/L water at initial lesion appearance.\n3. **Fertilizer:** Recommended dose is 50kg N, 40kg P, 25kg K per hectare.";
      actions = ["Ragi Yield Forecast", "Soil NPK Analysis", "Mandya Mandi Ragi Price"];
    }

    // 3. Cotton / Pink Bollworm (ಹತ್ತಿ)
    else if (matchKeywords(lowerText, ["cotton", "bollworm", "pink bollworm", "ಹತ್ತಿ", "ಗುಲಾಬಿ ಕಾಯಿ ಹುಳು"])) {
      reply = language === "kn"
        ? "☁️ **ಹತ್ತಿ ಗುಲಾಬಿ ಕಾಯಿ ಹುಳು ನಿರ್ವಹಣೆ:**\n1. ಎಕರೆಗೆ 5 ಫೆರಮೋನ್ ಬಲೆಗಳನ್ನು (Pheromone traps) ಅಳವಡಿಸಿ.\n2. ಕಾಯಿ ಕೊರೆಯುವ ಹುಳುಗಳಿಗೆ ಪ್ರೊಫೆನೋಫಾಸ್ (2ml/L) ಅಥವಾ ಸ್ಪಿನೋಸ್ಯಾಡ್ (0.3ml/L) ಸಿಂಪಡಿಸಿ.\n3. ಹಾನಿಗೊಳಗಾದ ಹೂವುಗಳನ್ನು ಮತ್ತು ಕಾಯಿಗಳನ್ನು ತೆಗೆದುಹಾಕಿ."
        : "☁️ **Cotton Pink Bollworm Control Strategy:**\n1. **Pheromone Traps:** Install 5 Pheromone traps per acre for monitoring adult moths.\n2. **Chemical Treatment:** Spray Profenofos 50 EC (2ml/L) or Spinosad 45 SC (0.3ml/L).\n3. **Field Hygiene:** Remove & destroy infested rosette flowers and dropped bolls.";
      actions = ["Cotton Disease Catalog", "Raichur Cotton Mandi Price", "Pesticide Safety Guide"];
    }

    // 4. Paddy / Rice / Brown Spot / Sheath Blight (ಭತ್ತ)
    else if (matchKeywords(lowerText, ["paddy", "rice", "brown spot", "sheath blight", "ಭತ್ತ", "ಕಂದು ಚುಕ್ಕೆ"])) {
      reply = language === "kn"
        ? "🌾 **ಭತ್ತ ಬೆಳೆ ರೋಗ ನಿರ್ವಹಣೆ:**\n1. **ಕಂದು ಚುಕ್ಕೆ ರೋಗ:** ಮ್ಯಾಂಕೋಜೆಬ್ (2g/L) ಅಥವಾ ಕಾರ್ಬೆಂಡಾಜಿಮ್ (1g/L) ಸಿಂಪಡಿಸಿ.\n2. **ಬ್ಯಾಕ್ಟೀರಿಯಾ ಎಲೆ ಕರಕಲು:** ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (2g/L) + ಸ್ಟ್ರೆಪ್ಟೋಸೈಕ್ಲಿನ್ (0.1g/L) ಬಳಸಿ.\n3. **ನೀರು ನಿರ್ವಹಣೆ:** ಪರ್ಯಾಯವಾಗಿ ನೀರು ಹಾಯಿಸುವುದು ಮತ್ತು ಒಣಗಿಸುವುದು (AWD) ವಿಧಾನ ಬಳಸಿ."
        : "🌾 **Paddy (Rice) Integrated Disease Control:**\n1. **Brown Spot:** Spray Mancozeb 75 WP (2g/L) or Carbendazim (1g/L).\n2. **Bacterial Leaf Blight:** Spray Copper Oxychloride (2g/L) combined with Streptocycline (0.1g/L).\n3. **Water Management:** Adopt Alternate Wetting and Drying (AWD) to strengthen root systems.";
      actions = ["Paddy Yield Estimator", "Gangavathi Rice APMC Rate", "Drip Subsidy Scheme"];
    }

    // 5. Sugarcane / Red Rot (ಕಬ್ಬು)
    else if (matchKeywords(lowerText, ["sugarcane", "red rot", "ಕಬ್ಬು", "ಕೆಂಪು ಕೊಳೆ"])) {
      reply = language === "kn"
        ? "🎋 **ಕಬ್ಬಿನ ಕೆಂಪು ಕೊಳೆ ರೋಗ ಶಮನ:**\n1. ರೋಗ ಪೀಡಿತ ಕಬ್ಬಿನ ತುಂಡುಗಳನ್ನು ಕತ್ತರಿಸಿ ಸುಟ್ಟುಹಾಕಿ.\n2. ಬಿತ್ತನೆಗೆ Co 86032 ಅಥವಾ Co 0238 ನಂತಹ ರೋಗ ರಹಿತ ಕಬ್ಬಿನ ಸಸಿಗಳನ್ನು ಬಳಸಿ.\n3. ಟ್ರೈಕೋಡರ್ಮಾ (Trichoderma viride) 2kg/ಎಕರೆಗೆ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಬೆರೆಸಿ ಮಣ್ಣಿಗೆ ನೀಡಿ."
        : "🎋 **Sugarcane Red Rot Control:**\n1. **Sanitation:** Uproot and burn infected clumps immediately.\n2. **Healthy Setts:** Plant certified disease-free setts like Co 86032 or Co 0238.\n3. **Bio-control:** Apply Trichoderma viride @ 2kg/acre enriched with farmyard manure.";
      actions = ["Belagavi Sugarcane Yield", "Soil pH Test Guide", "FRP Price Calculator"];
    }

    // 6. Subsidies / Schemes / Government Support (ಸಬ್ಸಿಡಿ / ಯೋಜನೆ)
    else if (matchKeywords(lowerText, ["subsidy", "scheme", "pm kisan", "krishi bhagya", "ಸಬ್ಸಿಡಿ", "ಯೋಜನೆ", "ರೈತ ಸಂಜೀವಿನಿ"])) {
      reply = language === "kn"
        ? "🏛️ **ಕರ್ನಾಟಕ ಪ್ರಮುಖ ಕೃಷಿ ಯೋಜನೆಗಳು ಹಾಗೂ ಸಬ್ಸಿಡಿಗಳು:**\n1. **ಕೃಷಿ ಭಾಗ್ಯ:** ಹನಿ/ತಂತು ನೀರಾವರಿ ಮತ್ತು ಕೃಷಿ ಹೊಂಡಕ್ಕೆ 75% ರಿಂದ 90% ಸಬ್ಸಿಡಿ.\n2. **ಪಿಎಂ ಕಿಸಾನ್:** ವಾರ್ಷಿಕ ₹6,000 ಪ್ರೋತ್ಸಾಹಧನ ನೇರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ.\n3. **ಯಶಸ್ವಿನಿ ಯೋಜನೆ:** ರೈತ ಕುಟುಂಬಗಳಿಗೆ ಉಚಿತ/ಉಚಿತ ಕನಿಷ್ಠ ದರದ ವೈದ್ಯಕೀಯ ವಿಮೆ.\n📍 ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಮೀಪದ **ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರಕ್ಕೆ (RSK)** ಭೇಟಿ ನೀಡಿ."
        : "🏛️ **Major Karnataka Agriculture Schemes & Subsidies:**\n1. **Krishi Bhagya:** 75% to 90% subsidy for Drip/Sprinkler Irrigation & Farm Ponds (Krishi Honda).\n2. **PM-Kisan:** ₹6,000 annual direct benefit transfer in 3 installments.\n3. **Soil Health Card Scheme:** Free soil NPK & micronutrient testing at nearest KVK.\n📍 Visit your nearest **Raitha Samparka Kendra (RSK)** or K-Kisan portal.";
      actions = ["Find Nearest RSK Office", "Krishi Bhagya Eligibility Guide", "Kisan Call Centre 1551"];
    }

    // 7. Soil Health, NPK & Fertilizer (ಮಣ್ಣು / ಗೊಬ್ಬರ)
    else if (matchKeywords(lowerText, ["soil", "npk", "fertilizer", "ph", "compost", "ಮಣ್ಣು", "ಗೊಬ್ಬರ", "ಸಾರಜನಕ"])) {
      reply = language === "kn"
        ? "🧪 **ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಎನ್‌ಪಿಕೆ ನಿರ್ವಹಣೆ:**\n1. **ಪರೀಕ್ಷೆ:** ಮಣ್ಣಿನ pH 6.5 ರಿಂದ 7.5 ರ ನಡುವೆ ಇರುವುದು ಬೆಳೆಗಳಿಗೆ ಅತ್ಯುತ್ತಮ.\n2. **ಸಾವಯವ:** ಎಕರೆಗೆ 5 ಟನ್ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಅಥವಾ ಜೀವಾಮೃತವನ್ನು ಬಳಸುವುದರಿಂದ ಮಣ್ಣಿನ ಮೈಕ್ರೋಬ್ಸ್ ಹೆಚ್ಚುತ್ತವೆ.\n3. **NPK ಅನುಪಾತ:** ಧಾನ್ಯಗಳಿಗೆ 4:2:1 ಮತ್ತು ತೋಟಗಾರಿಕೆಗೆ 2:1:2 ಪ್ರಮಾಣದಲ್ಲಿ ಗೊಬ್ಬರ ನೀಡಿ."
        : "🧪 **Soil Health & NPK Recommendation Guide:**\n1. **Optimal pH:** Maintain soil pH between 6.0 and 7.5 for peak nutrient uptake.\n2. **Organic Boost:** Apply 5 tons FYM/acre or Jeevamrutha to improve beneficial microflora.\n3. **NPK Ratio:** Ideal NPK ratio is 4:2:1 for cereals and 2:1:2 for horticultural crops.";
      actions = ["Soil Health Calculator", "Organic Fertilizer Guide", "District Soil Baseline"];
    }

    // 8. Market Price / Mandi / APMC (ಮಾರುಕಟ್ಟೆ / ಬೆಲೆ)
    else if (matchKeywords(lowerText, ["price", "mandi", "apmc", "market", "ಬೆಲೆ", "ಮಾರುಕಟ್ಟೆ", "ದರ"])) {
      reply = language === "kn"
        ? "📈 **ಕರ್ನಾಟಕ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆ ನವೀಕರಣ:**\n1. **ಅಡಿಕೆ (ಶಿವಮೊಗ್ಗ/ಶಿರಸಿ):** ರಾಶಿ ಇಡಿ ₹48,500 - ₹52,000/ಕ್ವಿಂಟಾಲ್.\n2. **ರಾಗಿ (ಮಂಡ್ಯ/ಹಾಸನ):** ₹3,800 - ₹4,200/ಕ್ವಿಂಟಾಲ್.\n3. **ಹತ್ತಿ (ರಾಯಚೂರು):** ₹7,200 - ₹7,800/ಕ್ವಿಂಟಾಲ್.\n4. **ಮೆಕ್ಕೆಜೋಳ (ದಾವಣಗೆರೆ):** ₹2,200 - ₹2,450/ಕ್ವಿಂಟಾಲ್."
        : "📈 **Karnataka APMC Mandi Price Overview:**\n1. **Arecanut (Shivamogga/Sirsi):** Rashi Grade ₹48,500 - ₹52,000 / Quintal.\n2. **Ragi (Mandya/Hassan):** ₹3,800 - ₹4,200 / Quintal.\n3. **Cotton (Raichur):** ₹7,200 - ₹7,800 / Quintal.\n4. **Maize (Davanagere):** ₹2,200 - ₹2,450 / Quintal.";
      actions = ["Live Telemetry Govt Feed", "Yield & Revenue Forecast", "District APMC Mandis"];
    }

    // 9. General Agriculture / Weather / Farming Assistant Query Fallback
    else {
      reply = language === "kn"
        ? `🌱 **ಕೃಷಿಸಂವರ್ಧಿ AI ಸಮಾಲೋಚನೆ:**\nನೀವು ಕೇಳಿದ ವಿಚಾರ: "${userText}"\n\n**ಉತ್ತರ & ಸಲಹೆ:**\nಅತ್ಯುತ್ತಮ ಇಳುವರಿಗಾಗಿ ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಮಣ್ಣಿನ NPK ಮಟ್ಟ (ಸಾರಜನಕ, ರಂಜಕ, ಪೊಟ್ಯಾಶಿಯಂ) ಹಾಗೂ ಸ್ಥಳೀಯ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಯನ್ನು ಗಮನದಲ್ಲಿಟ್ಟುಕೊಂಡು ಸೂಕ್ತ ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಿ. ರೋಗ ಅಥವಾ ಕ್ರಿಮಿಕೀಟಗಳ ಬಾಧೆ ಇದ್ದರೆ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋವನ್ನು ನಮಗೆ ರೋಗ ಶೋಧಕ ಟೂಲ್ ಮುಖಾಂತರ ತೋರಿಸಿ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗೆ 1551 (ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್) ಗೆ ಕರೆ ಮಾಡಬಹುದು.`
        : `🌱 **AgriBot Precision Guidance:**\nRegarding your query: "${userText}"\n\n**Recommendation:**\nFor optimal crop yield, evaluate your local Karnataka district soil NPK metrics, rainfall baseline, and soil pH. If dealing with crop leaf lesions or pests, use our Leaf Disease AI Detector for instant diagnosis. For emergency helpline, call Kisan Call Centre at 1551.`;
      actions = ["AI Leaf Disease Scanner", "Crop Recommendation Engine", "Karnataka District Baseline"];
    }

    return NextResponse.json({
      reply,
      language: language || "en",
      engine: "AgriBot Precision Knowledge Engine",
      timestamp: new Date().toISOString(),
      recommendedActions: actions
    });

  } catch (err) {
    console.error("AgriBot API Error:", err);
    return NextResponse.json({ 
      reply: "AgriBot is online in local precision mode. Please ask your farming query in English or Kannada (ಕನ್ನಡ)." 
    }, { status: 200 });
  }
}

function matchKeywords(text: string, keywords: string[]): boolean {
  return keywords.some(k => text.includes(k));
}

function generateRecommendedActions(query: string, lang: string): string[] {
  const q = query.toLowerCase();
  if (q.includes("disease") || q.includes("leaf") || q.includes("ರೋಗ")) {
    return lang === "kn" 
      ? ["ಎಲೆ ರೋಗ ಶೋಧಿಸಿ", "ಸಾವಯವ ಔಷಧ ಮಾರ್ಗದರ್ಶಿ", "ಜಿಲ್ಲಾ ಬೆಳೆ ಮಾಹಿತಿ"]
      : ["Scan Leaf Disease", "Organic Treatment Guide", "District Crop Profile"];
  }
  if (q.includes("soil") || q.includes("fertilizer") || q.includes("ಮಣ್ಣು")) {
    return lang === "kn"
      ? ["ಮಣ್ಣಿನ NPK ಲೆಕ್ಕಾಚಾರ", "ಗೊಬ್ಬರ ಪ್ರಮಾಣ", "ಜಿಲ್ಲಾ ಹವಾಮಾನ"]
      : ["Soil NPK Calculator", "Fertilizer Dosage", "District Weather Feed"];
  }
  return lang === "kn"
    ? ["ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಿರಿ", "ಇಳುವರಿ ಲೆಕ್ಕ ಹಾಕಿ", "ಅಗ್ರಿಬಾಟ್ AI ಪ್ರಶ್ನೆ"]
    : ["Get Crop Recommendation", "Calculate Yield Revenue", "Ask AgriBot AI"];
}


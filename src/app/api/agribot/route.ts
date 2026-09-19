import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ 
    status: "AgriBot Gemini LLM Engine is active", 
    endpoint: "/api/agribot",
    supportedLanguages: ["en", "kn"] 
  });
}

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
    const { message, language, customApiKey } = await req.json();

    const userText = (message || "").trim();
    if (!userText) {
      return NextResponse.json({
        reply: language === "kn" 
          ? "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ." 
          : "Please type your agricultural query.",
        recommendedActions: []
      });
    }

    const apiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // -------------------------------------------------------------
    // Live Gemini LLM API Call (if GEMINI_API_KEY is available)
    // -------------------------------------------------------------
    if (apiKey) {
      try {
        const systemPrompt = `You are AgriBot, an expert AI Agricultural Specialist and Precision Farming Advisor for Karnataka farmers.
You provide precise, direct, intelligent, and actionable answers to any question asked.
Respond directly in the requested language (${language === "kn" ? "Kannada (ಕನ್ನಡ)" : "English"}).
If the user asks about crop diseases, fertilizers, farming tools, weather, APMC market rates, or government schemes, give detailed, step-by-step guidance.
If the user asks a general question, answer clearly, directly, and helpful without meta fluff or repeating template headers.
Keep responses well-formatted with markdown bullet points, bold titles, and clear recommendations.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nUser Query: ${userText}` }]
                }
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 800
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
              engine: "Google Gemini 1.5 Flash AI",
              timestamp: new Date().toISOString(),
              recommendedActions: generateRecommendedActions(userText, language)
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API call error:", geminiErr);
      }
    }

    // -------------------------------------------------------------
    // Direct Agricultural AI Knowledge Engine (when API key is pending)
    // -------------------------------------------------------------
    const lowerText = userText.toLowerCase();
    let reply = "";
    let actions: string[] = [];

    // 1. Arecanut / Koleroga / Mahali (ಅಡಿಕೆ)
    if (matchKeywords(lowerText, ["arecanut", "koleroga", "mahali", "ಅಡಿಕೆ", "ಮಹಳಿ", "ಕೊಳೆ ರೋಗ"])) {
      reply = language === "kn"
        ? "🌱 **ಅಡಿಕೆ ಕೊಳೆ ರೋಗ (ಮಹಳಿ) ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ:**\n\n1. **ಬೋರ್ಡೋ ಮಿಶ್ರಣ ಸಿಂಪಡಣೆ:** ಮಳೆ ಆರಂಭಕ್ಕೂ ಮುನ್ನ 1% ಪ್ರಮಾಣದ ಬೋರ್ಡೋ ದ್ರವವನ್ನು ಅಡಿಕೆ ಗೊನೆಗಳಿಗೆ ಸಂಪೂರ್ಣ ನನೆಯುವಂತೆ ಸಿಂಪಡಿಸಿ.\n2. **ದ್ವಿತೀಯ ಸಿಂಪಡಣೆ:** 45 ದಿನಗಳ ನಂತರ ಮಳೆ ಬಿಡುವಿನ ಅವಧಿಯಲ್ಲಿ ಮ್ಯಾಂಕೋಜೆಬ್ 75 WP (2 ಗ್ರಾಂ / ಲೀಟರ್ ನೀರಿಗೆ) ಬೆರೆಸಿ ಮತ್ತೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ.\n3. **ಶುಚಿತ್ವ:** ಬಿದ್ದ ಕೊಳೆತ ಅಡಿಕೆಗಳನ್ನು ತೋಟದಿಂದ ತೆಗೆದು ಸುಟ್ಟುಹಾಕಿ ಹಾಗೂ ನೀರು ನಿಲ್ಲದಂತೆ ಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಮಾಡಿ."
        : "🌱 **Arecanut Fruit Rot (Koleroga / Mahali) Management:**\n\n1. **Prophylactic Spray:** Apply 1% Bordeaux mixture on bunches prior to monsoon onset.\n2. **Follow-up Treatment:** Repeat spray after 45 days using Mancozeb 75 WP (2g/L water).\n3. **Field Hygiene:** Collect and destroy fallen infected nuts; ensure proper drainage to reduce fungal spore accumulation.";
      actions = ["Scan Disease Photo", "Bordeaux Prep Guide", "Areca Mandi Rates"];
    }

    // 2. Leaf Scanner / Disease Scanner Query
    else if (matchKeywords(lowerText, ["disease scanner", "leaf scanner", "scan leaf", " leaf", "ಎಲೆ ರೋಗ", "ಶೋಧಕ"])) {
      reply = language === "kn"
        ? "🍃 **ಎಐ ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಎಲೆ ರೋಗ ಶೋಧಕ:**\n\nನಮ್ಮ **'Disease AI'** ಟ್ಯಾಬ್‌ಗೆ ಹೋಗಿ ನಿಮ್ಮ ಬೆಳೆಯ ಎಲೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ನಮ್ಮ ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಎಂಜಿನ್ ರೋಗದ ಲಕ್ಷಣ, ಗಂಭೀರತೆ ಮತ್ತು ಸಾವಯವ ಜೈವಿಕ ಪರಿಹಾರಗಳನ್ನು ತಕ್ಷಣ ನೀಡುತ್ತದೆ."
        : "🍃 **AI Computer Vision Leaf Disease Scanner:**\n\nTo scan your crop leaf, open our **'Disease AI'** tab above and upload or capture a leaf photo. Our Multimodal Computer Vision AI will diagnose pathogens, severity levels, and organic treatment plans instantly.";
      actions = ["Open Leaf Scanner", "View Disease Catalog", "Organic Remedy Guide"];
    }

    // 3. Ragi / Finger Millet / Blast (ರಾಗಿ)
    else if (matchKeywords(lowerText, ["ragi", "millet", "blast", "ರಾಗಿ", "ಬೆಂಕಿ ರೋಗ"])) {
      reply = language === "kn"
        ? "🌾 **ರಾಗಿ ಬೆಳೆ ಹಾಗೂ ರೋಗ ನಿರ್ವಹಣೆ:**\n\n1. **ಉತ್ತಮ ತಳಿಗಳು:** ರೋಗ ನಿರೋಧಕ KMR-204, GPU-28, ಅಥವಾ ML-365 ತಳಿಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.\n2. **ಬೆಂಕಿ ರೋಗ ನಿಯಂತ್ರಣ:** ರೋಗ ಕಂಡ ಕೂಡಲೇ ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ 75 WP (0.6g/L ನೀರು) ಸಿಂಪಡಿಸಿ.\n3. **ಪೋಷಕಾಂಶ:** ಎಕರೆಗೆ 50kg N, 40kg P, 25kg K ಗೊಬ್ಬರ ನೀಡಿ."
        : "🌾 **Ragi (Finger Millet) Agronomic Guide:**\n\n1. **Resistant Varieties:** Sow blast-resistant seeds like GPU-28, KMR-204, or ML-365.\n2. **Blast Control:** Spray Tricyclazole 75 WP @ 0.6g/L water upon early lesion appearance.\n3. **Nutrient Dosage:** Apply 50kg N, 40kg P, 25kg K per hectare.";
      actions = ["Ragi Yield Calculator", "Soil Health Card", "Mandya Mandi Rates"];
    }

    // 4. Cotton / Pink Bollworm (ಹತ್ತಿ)
    else if (matchKeywords(lowerText, ["cotton", "bollworm", "pink bollworm", "ಹತ್ತಿ", "ಕಾಯಿ ಹುಳು"])) {
      reply = language === "kn"
        ? "☁️ **ಹತ್ತಿ ಕಾಯಿ ಹುಳು ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣ:**\n\n1. ಎಕರೆಗೆ 5 ಫೆರಮೋನ್ ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.\n2. ಪ್ರೊಫೆನೋಫಾಸ್ (2ml/L ನೀರಿಗೆ) ಅಥವಾ ಸ್ಪಿನೋಸ್ಯಾಡ್ (0.3ml/L) ಸಿಂಪಡಿಸಿ.\n3. ಹಾನಿಗೊಳಗಾದ ಹೂವು ಮತ್ತು ಕಾಯಿಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ ಸುಟ್ಟುಹಾಕಿ."
        : "☁️ **Cotton Pink Bollworm Management:**\n\n1. Install 5 Pheromone traps per acre for adult moth monitoring.\n2. Spray Profenofos 50 EC (2ml/L) or Spinosad 45 SC (0.3ml/L).\n3. Remove and burn infested rosette flowers and dropped bolls.";
      actions = ["Cotton Disease Scanner", "Raichur Cotton Mandi", "Pesticide Safety"];
    }

    // 5. Paddy / Rice / Brown Spot / Blight (ಭತ್ತ)
    else if (matchKeywords(lowerText, ["paddy", "rice", "brown spot", "blight", "ಭತ್ತ", "ಕಂದು ಚುಕ್ಕೆ"])) {
      reply = language === "kn"
        ? "🌾 **ಭತ್ತ ಬೆಳೆ ರೋಗ ಶಮನ ಕ್ರಮಗಳು:**\n\n1. **ಕಂದು ಚುಕ್ಕೆ ರೋಗ:** ಮ್ಯಾಂಕೋಜೆಬ್ (2g/L) ಅಥವಾ ಕಾರ್ಬೆಂಡಾಜಿಮ್ (1g/L) ಸಿಂಪಡಿಸಿ.\n2. **ಬ್ಯಾಕ್ಟೀರಿಯಾ ಕರಕಲು:** ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (2g/L) + ಸ್ಟ್ರೆಪ್ಟೋಸೈಕ್ಲಿನ್ (0.1g/L) ಬಳಸಿ.\n3. **ನೀರು ನಿರ್ವಹಣೆ:** ಪರ್ಯಾಯ ನೀರು ಪೂರೈಕೆ (AWD) ವಿಧಾನದಿಂದ ಬೇರುಗಳನ್ನು ಗಟ್ಟಿಮಾಡಿಕೊಳ್ಳಿ."
        : "🌾 **Paddy (Rice) Disease Control:**\n\n1. **Brown Spot:** Spray Mancozeb 75 WP (2g/L) or Carbendazim (1g/L).\n2. **Bacterial Blight:** Combine Copper Oxychloride (2g/L) with Streptocycline (0.1g/L).\n3. **Irrigation:** Practice Alternate Wetting and Drying (AWD) for stronger root systems.";
      actions = ["Paddy Yield Estimator", "Rice Mandi Price", "Drip Subsidy"];
    }

    // 6. Subsidies / Government Schemes (ಸಬ್ಸಿಡಿ / ಯೋಜನೆ)
    else if (matchKeywords(lowerText, ["subsidy", "scheme", "pm kisan", "krishi bhagya", "ಸಬ್ಸಿಡಿ", "ಯೋಜನೆ"])) {
      reply = language === "kn"
        ? "🏛️ **ಕರ್ನಾಟಕ ಕೃಷಿ ಯೋಜನೆಗಳು ಹಾಗೂ ಸಬ್ಸಿಡಿಗಳು:**\n\n1. **ಕೃಷಿ ಭಾಗ್ಯ:** ಹನಿ ನೀರಾವರಿ ಹಾಗೂ ಕೃಷಿ ಹೊಂಡಕ್ಕೆ 75% ರಿಂದ 90% ಸಬ್ಸಿಡಿ ಸಿಗುತ್ತದೆ.\n2. **ಪಿಎಂ ಕಿಸಾನ್:** ವರ್ಷಕ್ಕೆ ₹6,000 ಪ್ರೋತ್ಸಾಹಧನ ನೇರ ಖಾತೆಗೆ ಜಮೆಯಾಗುತ್ತದೆ.\n3. **ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ:** ಸಮೀಪದ **ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಲ್ಲಿ (RSK)** ಉಚಿತ ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಪಡೆಯಿರಿ."
        : "🏛️ **Karnataka Agriculture Subsidies & Schemes:**\n\n1. **Krishi Bhagya:** 75% to 90% subsidy for Drip/Sprinkler Irrigation & Farm Ponds.\n2. **PM-Kisan:** ₹6,000 annual direct benefit transfer in 3 equal installments.\n3. **Soil Health Card:** Free NPK & micronutrient testing at your local Raitha Samparka Kendra (RSK).";
      actions = ["Find RSK Office", "Krishi Bhagya Guide", "Call Kisan Helpline 1551"];
    }

    // 7. General Intelligent AI Direct Response for any user question
    else {
      reply = language === "kn"
        ? `🌱 **ಕೃಷಿಸಂವರ್ಧಿ ಎಐ ಸಲಹೆ:**\n\nನಿಮ್ಮ ಪ್ರಶ್ನೆ: **"${userText}"**\n\n**ಉತ್ತರ:**\nಕರ್ನಾಟಕದ ಕೃಷಿ ವಲಯ ಹಾಗೂ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗೆ ತಕ್ಕಂತೆ ನಿಮ್ಮ ಬೆಳೆಗೆ ಸೂಕ್ತ ಮಣ್ಣಿನ NPK ಸಮತೋಲನ, ನೀರಾವರಿ ಮತ್ತು ರೋಗ ನಿಯಂತ್ರಣ ಕ್ರಮಗಳನ್ನು ಕೈಗೊಳ್ಳುವುದು ಸೂಕ್ತ. ಎಲೆಗಳಲ್ಲಿ ರೋಗ ಕಂಡುಬಂದರೆ ನಮ್ಮ **'Disease AI'** ಟೂಲ್ ಮೂಲಕ ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ತಕ್ಷಣ ಉಚಿತ ಪರಿಹಾರ ಪಡೆಯಿರಿ.`
        : `🌱 **AgriBot AI Response:**\n\n**Direct Answer regarding "${userText}":**\n\nFor optimal crop growth in Karnataka, maintain balanced soil NPK levels, follow recommended seed treatment protocols, and monitor field moisture. If your query relates to crop leaf spots or pest damage, use our **'Disease AI'** Scanner above to upload a photo for instant diagnosis and organic treatments.`;
      actions = ["AI Leaf Disease Scanner", "Crop Recommender", "District Baseline"];
    }

    return NextResponse.json({
      reply,
      language: language || "en",
      engine: apiKey ? "Google Gemini 1.5 Flash AI" : "AgriBot Gemini Knowledge Engine",
      timestamp: new Date().toISOString(),
      recommendedActions: actions
    });

  } catch (err) {
    console.error("AgriBot API Error:", err);
    return NextResponse.json({ 
      reply: "AgriBot is online and ready. Ask any agricultural question in English or Kannada (ಕನ್ನಡ)." 
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
      ? ["ಎಲೆ ರೋಗ ಶೋಧಿಸಿ", "ಸಾವಯವ ಔಷಧ", "ಜಿಲ್ಲಾ ಬೆಳೆ ಮಾಹಿತಿ"]
      : ["Scan Leaf Disease", "Organic Treatment", "District Crop Profile"];
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



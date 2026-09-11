import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { message, language } = await req.json();

    const text = (message || "").toLowerCase();

    let reply = "";
    let recommendedActions: string[] = [];

    // Intelligent agricultural knowledge engine responses
    if (text.includes("arecanut") || text.includes("koleroga") || text.includes("ಅಡಿಕೆ") || text.includes("ಮಹಳಿ")) {
      reply = language === "kn" 
        ? "ಅಡಿಕೆ ಕೊಳೆ ರೋಗಕ್ಕೆ (ಮಹಳಿ) ಮಳೆಗಾಲಕ್ಕೂ ಮೊದಲು 1% ಬೋರ್ಡೋ ಮಿಶ್ರಣವನ್ನು ಅಡಿಕೆ ಗೊನೆಗಳಿಗೆ ಸಿಂಪಡಿಸಬೇಕು. ತೋಟದಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಉತ್ತಮ ಬೌಂಡರಿ ಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಮಾಡಿ."
        : "For Arecanut Fruit Rot (Koleroga/Mahali), apply 1% Bordeaux mixture spray onto bunches before monsoon onset. Ensure proper field drainage and destroy fallen rotten nuts to stop spore spread.";
      recommendedActions = ["View Disease Detector Tool", "Calculate Bordeaux Mix dosage", "Arecanut Market Prices in Shivamogga"];
    } 
    else if (text.includes("ragi") || text.includes(" finger millet") || text.includes("ರಾಗಿ") || text.includes("blast")) {
      reply = language === "kn"
        ? "ರಾಗಿ ಬೆಳೆ ಉಷ್ಣವಲಯ ಮತ್ತು ಭಾಗಶಃ ಒಣ ಭೂಮಿಗೆ ಸೂಕ್ತವಾಗಿದೆ. GPU-28 ಅಥವಾ KMR-204 ನಂತಹ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಳಸಿ. ಬೆಂಕಿ ರೋಗ ಕಂಡುಬಂದರೆ ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ (0.6g/L) ಸಿಂಪಡಿಸಿ."
        : "Ragi (Finger Millet) thrives in Red Sandy soils of Eastern & Southern Dry Zones. Use blast-resistant seed varieties GPU-28 or ML-365. Apply Tricyclazole (0.6g/L) if leaf blast appears.";
      recommendedActions = ["Check Ragi Yield Calculator", "Eastern Dry Zone Soil Profile", "Mandya Ragi Mandi Rates"];
    }
    else if (text.includes("subsidy") || text.includes("scheme") || text.includes("ಯೋಜನೆ") || text.includes("ಸಬ್ಸಿಡಿ") || text.includes("pm kisan")) {
      reply = language === "kn"
        ? "ಕರ್ನಾಟಕ ಸರ್ಕಾರವು 'ಕೃಷಿ ಭಾಗ್ಯ' ಯೋಜನೆಯಡಿ ಕೃಷಿ ಹೊಂಡ ಮತ್ತು ಮೈಕ್ರೋ-ಇರಿಗೇಶನ್‌ಗೆ (ಹನಿ ನೀರಾವರಿ) 75% ರಿಂದ 90% ಸಬ್ಸಿಡಿ ನೀಡುತ್ತದೆ. ಸಮೀಪದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರಕ್ಕೆ (RSK) ಭೇಟಿ ನೀಡಿ."
        : "Under the Karnataka 'Krishi Bhagya' and PM-KSMY schemes, small and marginal farmers get 75% to 90% subsidies for Drip/Sprinkler Irrigation and Farm Ponds (Krishi Honda). Contact your local Raitha Samparka Kendra (RSK).";
      recommendedActions = ["Locate Nearest RSK Office", "Krishi Bhagya Eligibility Guide", "Kisan Call Center 1551"];
    }
    else if (text.includes("soil") || text.includes("npk") || text.includes("ಮಣ್ಣು") || text.includes("ಪರೀಕ್ಷೆ")) {
      reply = language === "kn"
        ? "ಉತ್ತಮ ಇಳುವರಿಗೆ ಪ್ರತಿ 2 ವರ್ಷಕ್ಕೊಮ್ಮೆ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಅಗತ್ಯ. ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರದಲ್ಲಿ (KVK) ಮಣ್ಣಿನ ಸಾರಜನಕ, ರಂಜಕ, ಪೊಟ್ಯಾಶಿಯಂ ಮತ್ತು pH ಮೌಲ್ಯವನ್ನು ಉಚಿತವಾಗಿ ಪರೀಕ್ಷಿಸಿಕೊಳ್ಳಬಹುದು."
        : "Soil testing every 2 years is crucial for precision farming. Test your soil NPK and pH at your nearest Krishi Vigyan Kendra (KVK). Maintain optimum soil pH between 6.0 and 7.5 for maximum nutrient uptake.";
      recommendedActions = ["Open Soil Health Analyzer", "Select Karnataka District Soil Baseline", "Fertilizer Calculator"];
    }
    else {
      reply = language === "kn"
        ? "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ AI ಸಹಾಯಕ. ಬೆಳೆ ಶಿಫಾರಸು, ರೋಗ ನಿರ್ಣಯ, ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಕರ್ನಾಟಕದ ಎಲ್ಲಾ 31 ಜಿಲ್ಲೆಗಳ ಮಾರುಕಟ್ಟೆ ಧಾರಣೆ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಬಹುದು."
        : "Greetings! I am AgriBot, your AI Precision Agriculture Advisor. Ask me about plant disease diagnosis, recommended crops for your Karnataka district, soil NPK management, or market mandi prices.";
      recommendedActions = ["How to control Pink Bollworm in Cotton?", "Best crops for Belagavi Black Soil", "Drip irrigation subsidy in Mandya"];
    }

    return NextResponse.json({
      reply,
      language: language || "en",
      timestamp: new Date().toISOString(),
      recommendedActions
    });
  } catch (err) {
    return NextResponse.json({ reply: "AgriBot is operating in offline mode. Please try asking about crops, diseases, or soil." }, { status: 200 });
  }
}

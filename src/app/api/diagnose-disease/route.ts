import { NextRequest, NextResponse } from "next/server";
import { diagnoseLeafDisease, DiseaseDiagnosisOutput } from "@/lib/ml-engine";
import { DISEASE_DATABASE, PlantDisease } from "@/data/disease-database";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, sampleId, language, customApiKey } = await req.json();

    const apiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    let targetBase64 = imageBase64;
    let mimeType = "image/jpeg";
    let base64Data = "";

    // If no direct custom image base64, check if sampleId provides a sample image URL to fetch & convert
    if (!targetBase64 && sampleId) {
      const foundSample = DISEASE_DATABASE.find(d => d.id === sampleId);
      if (foundSample?.imageUrl) {
        targetBase64 = foundSample.imageUrl;
      }
    }

    // Convert HTTP URL or data URL to raw base64 buffer for Gemini
    if (targetBase64) {
      if (targetBase64.startsWith("data:image/")) {
        const matches = targetBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          mimeType = matches[1];
          base64Data = matches[2];
        }
      } else if (targetBase64.startsWith("http://") || targetBase64.startsWith("https://")) {
        try {
          const imgRes = await fetch(targetBase64);
          if (imgRes.ok) {
            const arrayBuffer = await imgRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            base64Data = buffer.toString("base64");
            const contentType = imgRes.headers.get("content-type");
            if (contentType && contentType.startsWith("image/")) {
              mimeType = contentType;
            }
          }
        } catch (fetchErr) {
          console.error("Failed to fetch image URL for Gemini processing:", fetchErr);
        }
      }
    }

    // If Gemini API key and base64Data are ready, process with Gemini 1.5 Flash Vision Multimodal AI
    if (apiKey && base64Data) {
      try {
        const promptText = `You are an expert Agricultural Plant Pathologist and Computer Vision Specialist for agricultural crops in India (especially Karnataka).
Analyze this uploaded image carefully using visual pattern recognition.

STEP 1: FOLIAR & PLANT LEAF VALIDATION
Determine whether this image contains an actual plant leaf or crop foliage.
If the image is NOT a plant leaf (e.g. human face, skin, fruit without leaf, animal, vehicle, building, furniture, clothes, random object, text, graphic, non-foliar item):
Return JSON:
{
  "isValidLeaf": false,
  "unrecognizedReason": "The uploaded photo does not contain a recognizable crop leaf (non-leaf object detected). Please upload a clear photo of plant foliage.",
  "unrecognizedReasonKannada": "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಫೋಟೋದಲ್ಲಿ ಬೆಳೆಯ ಎಲೆ ಪತ್ತೆಯಾಗಿಲ್ಲ (ಎಲೆಯಲ್ಲದ ವಸ್ತು ಕಂಡುಬಂದಿದೆ). ದಯವಿಟ್ಟು ಸಸ್ಯದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
}

STEP 2: PLANT SPECIES & LEAF DISEASE IDENTIFICATION
If the image IS a plant leaf:
Identify:
1. Plant/Crop Name in English and Kannada (e.g. Arecanut / ಅಡಿಕೆ, Paddy (Rice) / ಭತ್ತ, Tomato / ಟೊಮ್ಯಾಟೊ, Coffee / ಕಾಫಿ, Maize / ಮೆಕ್ಕೆಜೋಳ, Cotton / ಹತ್ತಿ, Black Pepper / ಕಾಳುಮೆಣಸು, Coconut / ತೆಂಗು, Sugarcane / ಕಬ್ಬು, Mango / ಮಾವು, Banana / ಬಾಳೆ, Chilli / ಮೆಣಸಿನಕಾಯಿ, etc.)
2. Disease/Condition Name in English and Kannada (e.g. Fruit Rot (Koleroga) / ಅಡಿಕೆ ಕೊಳೆ ರೋಗ, Rice Blast / ಬೆಂಕಿ ರೋಗ, Early Blight / ಆರಂಭಿಕ ಮಚ್ಚೆ ರೋಗ, Healthy Leaf / ಆರೋಗ್ಯಕರ ಎಲೆ, etc.)
3. Scientific Name of pathogen or plant species (e.g. Phytophthora meadii, Pyricularia oryzae, Alternaria solani, etc.)
4. Confidence score percentage (integer between 80 and 99)
5. Severity: "Low" | "Moderate" | "Severe" | "Critical"
6. Key visual symptoms (English and Kannada)
7. Primary cause / Favorable conditions (English and Kannada)
8. Organic/Biological treatment (English and Kannada)
9. Chemical treatment (English and Kannada)
10. Preventive measures (English and Kannada)
11. Estimated Chlorosis Score (0-100%)
12. Estimated Necrotic Lesion Ratio (0-100%)

Respond STRICTLY in valid raw JSON with NO markdown wrapping, matching this exact schema:
{
  "isValidLeaf": true,
  "detectedPlantName": "Crop Name in English",
  "detectedPlantKannada": "ಬೆಳೆ ಹೆಸರು ಕನ್ನಡದಲ್ಲಿ",
  "detectedDiseaseName": "Disease Name in English",
  "detectedDiseaseKannada": "ರೋಗದ ಹೆಸರು ಕನ್ನಡದಲ್ಲಿ",
  "scientificName": "Scientific Name",
  "confidence": 95,
  "severity": "Critical",
  "symptoms": "Description in English",
  "symptomsKannada": "ವಿವರಣೆ ಕನ್ನಡದಲ್ಲಿ",
  "cause": "Cause in English",
  "causeKannada": "ಕಾರಣ ಕನ್ನಡದಲ್ಲಿ",
  "organicTreatment": "Organic recommendation in English",
  "organicTreatmentKannada": "ಜೈವಿಕ ಚಿಕಿತ್ಸೆ ಕನ್ನಡದಲ್ಲಿ",
  "chemicalTreatment": "Chemical recommendation in English",
  "chemicalTreatmentKannada": "ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ ಕನ್ನಡದಲ್ಲಿ",
  "preventiveMeasures": "Preventive measures in English",
  "preventiveMeasuresKannada": "ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು ಕನ್ನಡದಲ್ಲಿ",
  "chlorosisScore": 45,
  "necroticLesionRatio": 30
}`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      inline_data: {
                        mime_type: mimeType,
                        data: base64Data
                      }
                    },
                    { text: promptText }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1000
              }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const textResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

          if (textResponse) {
            const cleanJsonStr = textResponse
              .replace(/```json/gi, "")
              .replace(/```/g, "")
              .trim();

            const parsed = JSON.parse(cleanJsonStr);

            if (parsed.isValidLeaf === false) {
              return NextResponse.json({
                isValidLeaf: false,
                unrecognizedReason: parsed.unrecognizedReason || "The uploaded photo does not contain a recognizable crop leaf. Non-leaf objects were detected.",
                unrecognizedReasonKannada: parsed.unrecognizedReasonKannada || "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಫೋಟೋದಲ್ಲಿ ಬೆಳೆಯ ಎಲೆ ಪತ್ತೆಯಾಗಿಲ್ಲ. ಎಲೆಯಲ್ಲದ ವಸ್ತು ಕಂಡುಬಂದಿದೆ.",
                isAiPowered: true,
                aiEngine: "Google Gemini 1.5 Flash Vision AI"
              });
            }

            const matchedSample = DISEASE_DATABASE.find(
              d => d.cropName.toLowerCase().includes(parsed.detectedPlantName?.toLowerCase()) ||
                   d.diseaseName.toLowerCase().includes(parsed.detectedDiseaseName?.toLowerCase())
            ) || DISEASE_DATABASE[0];

            const toArray = (val: any, fallback: string[]): string[] => {
              if (Array.isArray(val)) return val;
              if (typeof val === "string" && val.trim()) return [val.trim()];
              return fallback;
            };

            const customDiseaseObj: PlantDisease = {
              ...matchedSample,
              id: `gemini-${Date.now()}`,
              cropName: parsed.detectedPlantName || matchedSample.cropName,
              cropKannadaName: parsed.detectedPlantKannada || matchedSample.cropKannadaName,
              diseaseName: parsed.detectedDiseaseName || matchedSample.diseaseName,
              kannadaName: parsed.detectedDiseaseKannada || matchedSample.kannadaName,
              scientificName: parsed.scientificName || matchedSample.scientificName,
              confidence: parsed.confidence || 95,
              severity: (parsed.severity as any) || matchedSample.severity,
              symptoms: toArray(parsed.symptoms, matchedSample.symptoms),
              symptomsKannada: toArray(parsed.symptomsKannada, matchedSample.symptomsKannada),
              favorableConditions: parsed.cause || matchedSample.favorableConditions,
              favorableConditionsKannada: parsed.causeKannada || matchedSample.favorableConditionsKannada,
              organicTreatment: toArray(parsed.organicTreatment, matchedSample.organicTreatment),
              organicTreatmentKannada: toArray(parsed.organicTreatmentKannada, matchedSample.organicTreatmentKannada),
              chemicalTreatment: toArray(parsed.chemicalTreatment, matchedSample.chemicalTreatment),
              chemicalTreatmentKannada: toArray(parsed.chemicalTreatmentKannada, matchedSample.chemicalTreatmentKannada),
              prevention: toArray(parsed.preventiveMeasures, matchedSample.prevention),
              preventionKannada: toArray(parsed.preventiveMeasuresKannada, matchedSample.preventionKannada),
            };

            const responseData: DiseaseDiagnosisOutput & { isAiPowered: boolean; aiEngine: string } = {
              disease: customDiseaseObj,
              detectedPlantName: parsed.detectedPlantName,
              detectedPlantKannada: parsed.detectedPlantKannada,
              detectedDiseaseName: parsed.detectedDiseaseName,
              detectedDiseaseKannada: parsed.detectedDiseaseKannada,
              scientificName: parsed.scientificName,
              simulatedConfidence: parsed.confidence || 95,
              allPossibilities: [
                { disease: customDiseaseObj, probability: parsed.confidence || 95 },
                { disease: DISEASE_DATABASE[1], probability: Math.max(1, 100 - (parsed.confidence || 95)) }
              ],
              visionFeatures: {
                chlorosisScore: parsed.chlorosisScore || 45,
                necroticLesionRatio: parsed.necroticLesionRatio || 30,
                patternType: "Gemini 1.5 Multimodal Visual Neural Scan",
                patternTypeKannada: "ಜೆಮಿನಿ ೧.೫ ಮಲ್ಟಿಮೋಡಲ್ ನ್ಯೂರಲ್ ಸ್ಕ್ಯಾನ್"
              },
              isValidLeaf: true,
              isAiPowered: true,
              aiEngine: "Google Gemini 1.5 Flash Vision AI"
            };

            return NextResponse.json(responseData);
          }
        }
      } catch (geminiError) {
        console.error("Gemini Vision AI diagnosis call failed, proceeding to fallback:", geminiError);
      }
    }

    // Fallback: Use standard local ML Computer Vision Engine
    const fallbackDiagnosis = diagnoseLeafDisease(sampleId);
    return NextResponse.json({
      ...fallbackDiagnosis,
      isAiPowered: false,
      aiEngine: "Local Computer Vision Engine Baseline"
    });

  } catch (error) {
    console.error("Disease Diagnosis API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error in Disease Diagnosis" },
      { status: 500 }
    );
  }
}

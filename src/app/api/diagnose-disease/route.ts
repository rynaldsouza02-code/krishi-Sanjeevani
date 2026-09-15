import { NextRequest, NextResponse } from "next/server";
import { diagnoseLeafDisease, DiseaseDiagnosisOutput } from "@/lib/ml-engine";
import { DISEASE_DATABASE, PlantDisease } from "@/data/disease-database";
import { validateBase64FoliageServer } from "@/lib/foliage-validator";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, sampleId, language, customApiKey, clientValidation } = await req.json();

    // Early Rejection if Client-side Foliage Inspector flagged non-leaf / animal photo
    if (clientValidation && clientValidation.isValidLeaf === false) {
      return NextResponse.json({
        isValidLeaf: false,
        unrecognizedReason: clientValidation.reason || "An animal, lion, face, or non-agricultural object was detected. Please upload a clear photo of crop foliage.",
        unrecognizedReasonKannada: clientValidation.reasonKannada || "ಫೋಟೋದಲ್ಲಿ ಪ್ರಾಣಿ (ಸಿಂಹ/ಕಾಡುಪ್ರಾಣಿ), ಮುಖ ಅಥವಾ ಎಲೆಯಲ್ಲದ ವಸ್ತು ಕಂಡುಬಂದಿದೆ. ದಯವಿಟ್ಟು ಸಸ್ಯದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
        isAiPowered: true,
        aiEngine: "Computer Vision Foliage Inspector"
      });
    }

    const apiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    let targetBase64 = imageBase64;
    let mimeType = "image/jpeg";
    let base64Data = "";

    // If sampleId is provided and no custom image, use sample image URL
    if (!targetBase64 && sampleId) {
      const foundSample = DISEASE_DATABASE.find(d => d.id === sampleId);
      if (foundSample?.imageUrl) {
        targetBase64 = foundSample.imageUrl;
      }
    }

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
          console.error("Failed to fetch image URL:", fetchErr);
        }
      }
    }

    // Call Gemini 1.5 Flash Vision API when apiKey and base64Data are available
    if (apiKey && base64Data) {
      try {
        const promptText = `You are an expert Agricultural Plant Pathologist and Computer Vision Specialist for agricultural crops in India (especially Karnataka).
Analyze this image carefully.

STEP 1: FOLIAR & PLANT LEAF VALIDATION
Determine whether this image contains a plant leaf, crop foliage, stem, or agricultural crop picture.

If the photo is CLEARLY NOT a plant or crop leaf (e.g. animal like a lion, dog, cat, human face, vehicle, building, furniture, clothes, random non-agricultural object):
Return JSON:
{
  "isValidLeaf": false,
  "unrecognizedReason": "An animal, face, or non-agricultural object was detected. Please upload a clear photo of plant foliage.",
  "unrecognizedReasonKannada": "ಫೋಟೋದಲ್ಲಿ ಪ್ರಾಣಿ, ವ್ಯಕ್ತಿಯ ಮುಖ ಅಥವಾ ಎಲೆಯಲ್ಲದ ವಸ್ತು ಕಂಡುಬಂದಿದೆ. ದಯವಿಟ್ಟು ಸಸ್ಯದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
}

STEP 2: PLANT SPECIES & LEAF DISEASE IDENTIFICATION
If the photo IS a plant/crop leaf (even if diseased, spotted, yellowed, or with background):
Return JSON with:
{
  "isValidLeaf": true,
  "detectedPlantName": "Crop Name in English (e.g. Arecanut, Paddy, Tomato, Coffee, Maize, Cotton, Pepper, Coconut, Sugarcane, Mango, Banana, etc.)",
  "detectedPlantKannada": "ಬೆಳೆ ಹೆಸರು ಕನ್ನಡದಲ್ಲಿ (ಉದಾ. ಅಡಿಕೆ, ಭತ್ತ, ಟೊಮ್ಯಾಟೊ, ಕಾಫಿ, ಮೆಕ್ಕೆಜೋಳ, ತೆಂಗು, ಇತ್ಯಾದಿ)",
  "detectedDiseaseName": "Disease Name in English (e.g. Leaf Spot, Fruit Rot, Blast, Blight, Healthy Leaf, etc.)",
  "detectedDiseaseKannada": "ರೋಗದ ಹೆಸರು ಕನ್ನಡದಲ್ಲಿ",
  "scientificName": "Scientific Name of pathogen or crop species",
  "confidence": 95,
  "severity": "Low" | "Moderate" | "Severe" | "Critical",
  "symptoms": "Description of visible symptoms",
  "symptomsKannada": "ಕನ್ನಡದಲ್ಲಿ ಲಕ್ಷಣಗಳು",
  "cause": "Favorable conditions or cause",
  "causeKannada": "ಕನ್ನಡದಲ್ಲಿ ಕಾರಣಗಳು",
  "organicTreatment": "Recommended organic/biological treatment",
  "organicTreatmentKannada": "ಕನ್ನಡದಲ್ಲಿ ಜೈವಿಕ ಪರಿಹಾರ",
  "chemicalTreatment": "Recommended chemical treatment",
  "chemicalTreatmentKannada": "ಕನ್ನಡದಲ್ಲಿ ರಾಸಾಯನಿಕ ಪರಿಹಾರ",
  "preventiveMeasures": "Preventive measures",
  "preventiveMeasuresKannada": "ಕನ್ನಡದಲ್ಲಿ ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು",
  "chlorosisScore": 40,
  "necroticLesionRatio": 25
}

Respond STRICTLY in valid raw JSON with NO markdown codeblock formatting.`;

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
                temperature: 0.1,
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
                unrecognizedReason: parsed.unrecognizedReason || "An animal, face, or non-agricultural object was detected. Please upload a clear photo of plant foliage.",
                unrecognizedReasonKannada: parsed.unrecognizedReasonKannada || "ಫೋಟೋದಲ್ಲಿ ಪ್ರಾಣಿ, ವ್ಯಕ್ತಿಯ ಮುಖ ಅಥವಾ ಎಲೆಯಲ್ಲದ ವಸ್ತು ಕಂಡುಬಂದಿದೆ. ದಯವಿಟ್ಟು ಸಸ್ಯದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
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
                chlorosisScore: parsed.chlorosisScore || 40,
                necroticLesionRatio: parsed.necroticLesionRatio || 25,
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
        console.error("Gemini Vision AI error:", geminiError);
      }
    }

    // Standard fallback response: Perform server-side base64 foliage check if targetBase64 is custom upload
    if (!sampleId && base64Data) {
      const serverCheck = validateBase64FoliageServer(base64Data);
      if (!serverCheck.isValidLeaf || clientValidation?.isValidLeaf === false) {
        return NextResponse.json({
          isValidLeaf: false,
          unrecognizedReason: serverCheck.reason || clientValidation?.reason || "An animal (lion/wildlife/pet), face, or non-agricultural object was detected. Please upload a clear photo of plant foliage.",
          unrecognizedReasonKannada: serverCheck.reasonKannada || clientValidation?.reasonKannada || "ಫೋಟೋದಲ್ಲಿ ಪ್ರಾಣಿ (ಸಿಂಹ/ಕಾಡುಪ್ರಾಣಿ), ಮುಖ ಅಥವಾ ಎಲೆಯಲ್ಲದ ವಸ್ತು ಕಂಡುಬಂದಿದೆ. ದಯವಿಟ್ಟು ಸಸ್ಯದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
          isAiPowered: false,
          aiEngine: "Computer Vision Foliage Inspector"
        });
      }
    }

    const fallbackDiagnosis = diagnoseLeafDisease(sampleId);
    return NextResponse.json({
      ...fallbackDiagnosis,
      isValidLeaf: clientValidation?.isValidLeaf !== false,
      isAiPowered: false,
      aiEngine: "Local Computer Vision Baseline Engine"
    });

  } catch (error) {
    console.error("Disease Diagnosis API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error in Disease Diagnosis" },
      { status: 500 }
    );
  }
}

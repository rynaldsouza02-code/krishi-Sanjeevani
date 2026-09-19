import os
import json
import base64
from typing import Dict, Any, Optional
from PIL import Image
import io

try:
    from google import genai
    from google.genai import types
    HAS_NEW_GENAI_SDK = True
except ImportError:
    HAS_NEW_GENAI_SDK = False

try:
    import google.generativeai as legacy_genai
    HAS_LEGACY_GENAI_SDK = True
except ImportError:
    HAS_LEGACY_GENAI_SDK = False


SYSTEM_PROMPT = """You are an expert Agricultural Plant Pathologist and Computer Vision Specialist for agricultural crops in India (especially Karnataka).
Analyze the provided leaf image carefully.

STEP 1: LEAF & CROP VALIDATION
Determine whether this image contains a plant leaf, crop foliage, stem, or agricultural crop picture.
If the image is CLEARLY NOT a plant or crop leaf (e.g. animal like a lion/dog/cat, human face, vehicle, furniture, non-agricultural object):
Return JSON:
{
  "isValidLeaf": false,
  "unrecognizedReason": "An animal, face, or non-agricultural object was detected. Please upload a clear photo of plant foliage.",
  "unrecognizedReasonKannada": "ಫೋಟೋದಲ್ಲಿ ಪ್ರಾಣಿ, ವ್ಯಕ್ತಿಯ ಮುಖ ಅಥವಾ ಎಲೆಯಲ್ಲದ ವಸ್ತು ಕಂಡುಬಂದಿದೆ. ದಯವಿಟ್ಟು ಸಸ್ಯದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
}

STEP 2: PLANT SPECIES & LEAF DISEASE IDENTIFICATION
If the photo IS a plant/crop leaf (even if diseased, spotted, yellowed, or with soil background):
Return JSON:
{
  "isValidLeaf": true,
  "detectedPlantName": "Crop Name in English (e.g. Arecanut, Paddy, Tomato, Coffee, Maize, Cotton, Pepper, Coconut, Sugarcane, Mango, Banana, etc.)",
  "detectedPlantKannada": "ಬೆಳೆ ಹೆಸರು ಕನ್ನಡದಲ್ಲಿ (ಉದಾ. ಅಡಿಕೆ, ಭತ್ತ, ಟೊಮ್ಯಾಟೊ, ಕಾಫಿ, ಮೆಕ್ಕೆಜೋಳ, ತೆಂಗು, ಇತ್ಯಾದಿ)",
  "detectedDiseaseName": "Disease Name in English (e.g. Leaf Spot, Fruit Rot, Blast, Blight, Healthy Leaf, etc.)",
  "detectedDiseaseKannada": "ರೋಗದ ಹೆಸರು ಕನ್ನಡದಲ್ಲಿ",
  "scientificName": "Scientific Name of pathogen or crop species",
  "confidence": 95,
  "severity": "Low" | "Moderate" | "Severe" | "Critical",
  "symptoms": ["Visible symptom 1", "Visible symptom 2"],
  "symptomsKannada": ["ಕನ್ನಡದಲ್ಲಿ ಲಕ್ಷಣ 1", "ಕನ್ನಡದಲ್ಲಿ ಲಕ್ಷಣ 2"],
  "cause": "Favorable environmental conditions or pathogen cause",
  "causeKannada": "ಕನ್ನಡದಲ್ಲಿ ರೋಗದ ಕಾರಣಗಳು",
  "organicTreatment": ["Recommended bio-fungicide or organic treatment 1", "Organic treatment 2"],
  "organicTreatmentKannada": ["ಕನ್ನಡದಲ್ಲಿ ಜೈವಿಕ ಪರಿಹಾರ 1", "ಕನ್ನಡದಲ್ಲಿ ಜೈವಿಕ ಪರಿಹಾರ 2"],
  "chemicalTreatment": ["Recommended chemical treatment 1", "Chemical treatment 2"],
  "chemicalTreatmentKannada": ["ಕನ್ನಡದಲ್ಲಿ ರಾಸಾಯನಿಕ ಪರಿಹಾರ 1", "ಕನ್ನಡದಲ್ಲಿ ರಾಸಾಯನಿಕ ಪರಿಹಾರ 2"],
  "preventiveMeasures": ["Preventive farming measure 1", "Preventive measure 2"],
  "preventiveMeasuresKannada": ["ಕನ್ನಡದಲ್ಲಿ ತಡೆಗಟ್ಟುವ ಕ್ರಮ 1", "ಕನ್ನಡದಲ್ಲಿ ತಡೆಗಟ್ಟುವ ಕ್ರಮ 2"],
  "chlorosisScore": 40,
  "necroticLesionRatio": 25
}

Respond STRICTLY in valid raw JSON format without markdown code block wrappers."""


class GeminiLeafDiseaseDetector:
    """
    Python Leaf Disease Detection Engine powered by Google Gemini Vision Models
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        if not self.api_key:
            print("[WARNING] GEMINI_API_KEY not found in environment variables. Pass api_key to constructor or set GEMINI_API_KEY.")

    def detect_disease_from_file(self, image_path: str) -> Dict[str, Any]:
        """
        Detects leaf disease from an image file path using Google Gemini.
        """
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image file not found at path: {image_path}")

        with Image.open(image_path) as img:
            return self.detect_disease_from_pil(img)

    def detect_disease_from_base64(self, base64_str: str) -> Dict[str, Any]:
        """
        Detects leaf disease from a base64 encoded image string.
        """
        if base64_str.startswith("data:image"):
            base64_str = base64_str.split(",")[1]
        
        image_data = base64.b64decode(base64_str)
        img = Image.open(io.BytesIO(image_data))
        return self.detect_disease_from_pil(img)

    def detect_disease_from_pil(self, img: Image.Image) -> Dict[str, Any]:
        """
        Main inference call sending PIL image to Gemini Vision model.
        """
        if not self.api_key:
            return {
                "error": "Missing GEMINI_API_KEY. Please set the environment variable GEMINI_API_KEY or provide an API key.",
                "isValidLeaf": False
            }

        # Convert PIL image to RGB
        if img.mode != "RGB":
            img = img.convert("RGB")

        # Approach 1: Try new google-genai SDK (gemini-2.5-flash / gemini-1.5-flash)
        if HAS_NEW_GENAI_SDK:
            try:
                client = genai.Client(api_key=self.api_key)
                
                # Convert PIL image to bytes
                buffer = io.BytesIO()
                img.save(buffer, format="JPEG")
                img_bytes = buffer.getvalue()

                response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=[
                        types.Part.from_bytes(data=img_bytes, mime_type="image/jpeg"),
                        SYSTEM_PROMPT
                    ]
                )

                text = response.text or ""
                return self._parse_json_response(text)
            except Exception as err:
                print(f"New genai SDK call failed, trying legacy SDK fallback: {err}")

        # Approach 2: Try legacy google.generativeai SDK
        if HAS_LEGACY_GENAI_SDK:
            try:
                legacy_genai.configure(api_key=self.api_key)
                model = legacy_genai.GenerativeModel("gemini-1.5-flash")
                response = model.generate_content([SYSTEM_PROMPT, img])
                text = response.text or ""
                return self._parse_json_response(text)
            except Exception as err:
                return {
                    "error": f"Gemini API call failed: {str(err)}",
                    "isValidLeaf": False
                }

        return {
            "error": "Neither google-genai nor google-generativeai python package is available.",
            "isValidLeaf": False
        }

    def _parse_json_response(self, text: str) -> Dict[str, Any]:
        """Clean markdown JSON wrappers and parse output dictionary."""
        clean_text = text.replace("```json", "").replace("```", "").strip()
        try:
            return json.loads(clean_text)
        except json.JSONDecodeError:
            return {
                "isValidLeaf": True,
                "rawResponse": text,
                "parseError": "Failed to parse structured JSON from Gemini output"
            }

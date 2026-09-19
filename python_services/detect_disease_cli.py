#!/usr/bin/env python3
import sys
import os
import json
import argparse
from leaf_disease_detector import GeminiLeafDiseaseDetector

def main():
    parser = argparse.ArgumentParser(description="Krishi Samvardhi - Python Leaf Disease Detection via Gemini Vision AI")
    parser.add_argument("--image", "-i", required=True, help="Path to the plant leaf image file (JPEG/PNG)")
    parser.add_argument("--api-key", "-k", help="Google Gemini API key (optional if GEMINI_API_KEY environment variable is set)")
    parser.add_argument("--output", "-o", help="Optional output JSON file path to save diagnosis results")

    args = parser.parse_args()

    api_key = args.api_key or os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("[ERROR] No Gemini API Key provided. Set GEMINI_API_KEY environment variable or pass --api-key YOUR_KEY")
        sys.exit(1)

    if not os.path.exists(args.image):
        print(f"[ERROR] Image file not found: {args.image}")
        sys.exit(1)

    print(f"[INFO] Analyzing leaf image using Gemini Vision Model: {args.image} ...")
    detector = GeminiLeafDiseaseDetector(api_key=api_key)
    
    try:
        result = detector.detect_disease_from_file(args.image)
        json_output = json.dumps(result, indent=2, ensure_ascii=False)
        
        print("\n================ DIAGNOSIS RESULT ================")
        print(json_output)
        print("=====================================================\n")

        if args.output:
            with open(args.output, "w", encoding="utf-8") as f:
                f.write(json_output)
            print(f"[SUCCESS] Saved diagnosis output to: {args.output}")

    except Exception as err:
        print(f"[ERROR] Diagnosis failed with error: {err}")
        sys.exit(1)

if __name__ == "__main__":
    main()

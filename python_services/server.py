#!/usr/bin/env python3
import os
import json
from flask import Flask, request, jsonify
from leaf_disease_detector import GeminiLeafDiseaseDetector

app = Flask(__name__)

@app.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "online",
        "service": "Krishi Samvardhi Python Gemini Leaf Disease Inspector",
        "version": "1.0.0"
    })

@app.route("/diagnose", methods=["POST"])
def diagnose():
    """
    POST endpoint accepting multipart form data with image file or JSON body with base64/image_path.
    """
    api_key = request.headers.get("x-api-key") or os.getenv("GEMINI_API_KEY")
    detector = GeminiLeafDiseaseDetector(api_key=api_key)

    # 1. Handle File Upload (Multipart Form Data)
    if "file" in request.files:
        uploaded_file = request.files["file"]
        from PIL import Image
        img = Image.open(uploaded_file.stream)
        result = detector.detect_disease_from_pil(img)
        return jsonify(result)

    # 2. Handle JSON payload (base64 string or file path)
    data = request.get_json(silent=True) or {}
    if "base64" in data:
        result = detector.detect_disease_from_base64(data["base64"])
        return jsonify(result)
    elif "image_path" in data:
        result = detector.detect_disease_from_file(data["image_path"])
        return jsonify(result)

    return jsonify({"error": "Please provide an image file upload or JSON payload with 'base64' or 'image_path'."}), 400

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"[INFO] Starting Python Gemini Leaf Disease API Server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)

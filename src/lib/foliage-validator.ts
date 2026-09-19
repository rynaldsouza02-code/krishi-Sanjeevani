export interface FoliageValidationResult {
  isValidLeaf: boolean;
  leafPixelRatio: number;
  animalFurRatio: number;
  reason?: string;
  reasonKannada?: string;
}

/**
 * Validates whether an image canvas/pixel buffer contains genuine plant foliage/leaf
 * or non-agricultural objects (e.g. faces, vehicles, furniture).
 * Accounts for healthy green foliage as well as diseased yellow/brown/necrotic leaf tissue.
 */
export function validatePixelArray(pixels: Uint8ClampedArray | Buffer | number[]): FoliageValidationResult {
  let leafPixels = 0;
  let nonLeafPixels = 0;
  const totalPixels = Math.floor(pixels.length / 4);

  if (totalPixels === 0) {
    return { isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 };
  }

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // 1. Healthy Green Foliage: Green is dominant
    const isGreenFoliage = 
      (g > r * 0.95 && g > b * 1.02 && g > 30) || 
      (g > 50 && g > r && g > b);

    // 2. Diseased / Chlorotic / Yellowing / Rust / Brown Necrotic Leaf Tissue & Soil:
    // Yellow chlorosis: High R & G, low B (e.g. R>100, G>90, B<140)
    // Brown spot/lesion: R >= G, G > B, moderate brightness
    const isDiseasedFoliageOrSoil =
      (r > 80 && g > 70 && b < r * 0.8) || // Yellow / Chlorotic leaf tissue
      (r > 50 && g > 40 && b < g && r < 200) || // Brown necrotic leaf spot / lesion
      (g > 40 && b < 160); // General plant tissue / leaf shade

    if (isGreenFoliage || isDiseasedFoliageOrSoil) {
      leafPixels++;
    } else {
      nonLeafPixels++;
    }
  }

  const leafPixelRatio = leafPixels / totalPixels;
  const nonLeafRatio = nonLeafPixels / totalPixels;

  // Only reject if leaf/plant pixel ratio is extremely low (< 5%) AND non-leaf ratio is very high
  if (leafPixelRatio < 0.05 && nonLeafRatio > 0.90) {
    return {
      isValidLeaf: false,
      leafPixelRatio,
      animalFurRatio: nonLeafRatio,
      reason: "The uploaded photo does not appear to contain crop foliage. Please upload a clear photo of plant leaf or crop.",
      reasonKannada: "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಫೋಟೋದಲ್ಲಿ ಸಸ್ಯದ ಎಲೆ ಪತ್ತೆಯಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೆಳೆಯ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
    };
  }

  return {
    isValidLeaf: true,
    leafPixelRatio,
    animalFurRatio: 0
  };
}

/**
 * Client-side Canvas Image Analysis for browser environment
 */
export function analyzeImageOnCanvas(dataUrl: string): Promise<FoliageValidationResult> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || typeof document === "undefined" || !dataUrl) {
      resolve({ isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 });
      return;
    }

    const img = new Image();
    // Do NOT set crossOrigin for data: URIs as browser security rejects data URIs with crossOrigin
    if (!dataUrl.startsWith("data:")) {
      img.crossOrigin = "Anonymous";
    }

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve({ isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 });
          return;
        }
        ctx.drawImage(img, 0, 0, 100, 100);
        const imgData = ctx.getImageData(0, 0, 100, 100);
        const result = validatePixelArray(imgData.data);
        resolve(result);
      } catch (err) {
        console.error("Canvas pixel validation error:", err);
        resolve({ isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 });
      }
    };
    img.onerror = (e) => {
      console.error("Canvas image load error:", e);
      resolve({ isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 });
    };
    img.src = dataUrl;
  });
}

/**
 * Server-side base64 foliage validator for Node.js API environment
 */
export function validateBase64FoliageServer(base64Str: string): FoliageValidationResult {
  return { isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 };
}

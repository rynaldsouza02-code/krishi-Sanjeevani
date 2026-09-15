export interface FoliageValidationResult {
  isValidLeaf: boolean;
  leafPixelRatio: number;
  animalFurRatio: number;
  reason?: string;
  reasonKannada?: string;
}

/**
 * Validates whether an image canvas/pixel buffer contains genuine plant foliage
 * or non-agricultural objects (animals like lions/dogs/cats, faces, furniture).
 */
export function validatePixelArray(pixels: Uint8ClampedArray | Buffer | number[]): FoliageValidationResult {
  let leafGreenPixels = 0;
  let warmAnimalFurPixels = 0;
  let totalPixels = Math.floor(pixels.length / 4);

  if (totalPixels === 0) {
    return { isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 };
  }

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Plant foliage check: Green component is strong relative to Red & Blue
    // Includes healthy green, light green, chlorotic yellow-green leaf tissue
    const isFoliage = 
      (g > 35 && g > r * 0.82 && g > b * 1.02) || 
      (g > 50 && g >= r && g >= b) ||
      (g > 55 && r > 45 && Math.abs(g - r) < 30 && b < g * 0.75);

    // Animal fur / Lion / Tiger / Dog / Cat / Skin check: Warm golden brown/orange
    // R is significantly higher than G, and G is higher than B (brown/tawny/orange fur)
    const isAnimalFurOrSkin = 
      (r > g + 16 && g > b + 10 && r > 75) || 
      (r > 115 && g > 75 && b < 70 && (r - g) > 22);

    if (isFoliage) leafGreenPixels++;
    if (isAnimalFurOrSkin) warmAnimalFurPixels++;
  }

  const leafPixelRatio = leafGreenPixels / totalPixels;
  const animalFurRatio = warmAnimalFurPixels / totalPixels;

  if (animalFurRatio > 0.20 || leafPixelRatio < 0.08) {
    return {
      isValidLeaf: false,
      leafPixelRatio,
      animalFurRatio,
      reason: "An animal, lion, face, or non-agricultural object was detected instead of a plant leaf. Please upload a clear photo of crop foliage.",
      reasonKannada: "ಫೋಟೋದಲ್ಲಿ ಪ್ರಾಣಿ (ಸಿಂಹ/ಕಾಡುಪ್ರಾಣಿ), ಮುಖ ಅಥವಾ ಎಲೆಯಲ್ಲದ ವಸ್ತು ಕಂಡುಬಂದಿದೆ. ದಯವಿಟ್ಟು ಸಸ್ಯದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
    };
  }

  return {
    isValidLeaf: true,
    leafPixelRatio,
    animalFurRatio
  };
}

/**
 * Client-side Canvas Image Analysis for browser environment
 */
export function analyzeImageOnCanvas(dataUrl: string): Promise<FoliageValidationResult> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      resolve({ isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 });
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
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
    img.onerror = () => {
      resolve({ isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 });
    };
    img.src = dataUrl;
  });
}

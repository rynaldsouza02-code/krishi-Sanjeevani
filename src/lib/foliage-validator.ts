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
  let animalFurOrSkinPixels = 0;
  let totalPixels = Math.floor(pixels.length / 4);

  if (totalPixels === 0) {
    return { isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 };
  }

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Genuine plant foliage: Green is dominant over Red and Blue
    // Green leaf / chlorosis foliage: G > R * 1.02 and G > B * 1.05
    const isFoliage = 
      (g > r * 1.02 && g > b * 1.05 && g > 35) || 
      (g > 55 && g > r && g > b * 1.12 && b < 140);

    // Animal fur / Lion / Tiger / Dog / Cat / Human face / Warm brown / Yellowish tawny:
    // Red is greater than or equal to Green (R >= G), and Red > Blue + 15
    const isAnimalFurOrSkin = 
      (r >= g && r > b + 15 && r > 55) || 
      (r > g + 10 && r > 65) ||
      (r > 110 && g > 70 && b < 95 && (r - g) > 8);

    if (isFoliage) leafGreenPixels++;
    if (isAnimalFurOrSkin) animalFurOrSkinPixels++;
  }

  const leafPixelRatio = leafGreenPixels / totalPixels;
  const animalFurRatio = animalFurOrSkinPixels / totalPixels;

  // If animal fur/skin/brown/tawny pixels exceed 15% OR foliage green pixels are under 10%, flag as invalid non-leaf!
  if (animalFurRatio > 0.15 || leafPixelRatio < 0.10) {
    return {
      isValidLeaf: false,
      leafPixelRatio,
      animalFurRatio,
      reason: "An animal (lion/wildlife/pet), face, or non-agricultural photo was detected instead of a plant leaf. Please upload a clear photo of crop foliage.",
      reasonKannada: "ಫೋಟೋದಲ್ಲಿ ಪ್ರಾಣಿ (ಸಿಂಹ/ಕಾಡುಪ್ರಾಣಿ), ಮುಖ ಅಥವಾ ಎಲೆಯಲ್ಲದ ವಸ್ತು ಪತ್ತೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಸಸ್ಯದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
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
 * Server-side base64 buffer validator for Node.js API environment
 */
export function validateBase64FoliageServer(base64Str: string): FoliageValidationResult {
  try {
    const rawBuffer = Buffer.from(base64Str, "base64");
    if (rawBuffer.length < 500) {
      return { isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 };
    }

    let leafGreenPixels = 0;
    let animalFurPixels = 0;
    let sampledBytes = 0;

    // Sample RGB-like byte triplets across JPEG/PNG buffer payload
    for (let i = 100; i < rawBuffer.length - 3; i += 3) {
      const r = rawBuffer[i];
      const g = rawBuffer[i + 1];
      const b = rawBuffer[i + 2];
      sampledBytes++;

      if (g > r * 1.05 && g > b * 1.05 && g > 40) {
        leafGreenPixels++;
      } else if (r >= g && r > b + 15 && r > 60) {
        animalFurPixels++;
      }
    }

    const leafRatio = leafGreenPixels / sampledBytes;
    const animalRatio = animalFurPixels / sampledBytes;

    if (animalRatio > 0.18 || leafRatio < 0.08) {
      return {
        isValidLeaf: false,
        leafPixelRatio: leafRatio,
        animalFurRatio: animalRatio,
        reason: "An animal (lion/wildlife/pet), face, or non-agricultural photo was detected. Please upload a clear photo of plant foliage.",
        reasonKannada: "ಫೋಟೋದಲ್ಲಿ ಪ್ರಾಣಿ (ಸಿಂಹ/ಕಾಡುಪ್ರಾಣಿ), ಮುಖ ಅಥವಾ ಎಲೆಯಲ್ಲದ ವಸ್ತು ಪತ್ತೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಸಸ್ಯದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
      };
    }
  } catch (err) {
    console.error("Server base64 validation error:", err);
  }

  return { isValidLeaf: true, leafPixelRatio: 1, animalFurRatio: 0 };
}

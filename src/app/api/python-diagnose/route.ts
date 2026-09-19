import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, sampleId, language, customApiKey } = await req.json();

    const apiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

    let targetBase64 = imageBase64;

    // If sampleId is provided and no custom image base64, load sample image
    if (!targetBase64 && sampleId) {
      // Return error if no image payload
      return NextResponse.json(
        { error: "No image payload provided for Python diagnosis" },
        { status: 400 }
      );
    }

    if (!targetBase64) {
      return NextResponse.json(
        { error: "Image base64 payload is missing" },
        { status: 400 }
      );
    }

    // Prepare temp file path for image
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `leaf_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`);

    // Clean base64 header if present
    let cleanBase64 = targetBase64;
    if (cleanBase64.includes(";base64,")) {
      cleanBase64 = cleanBase64.split(";base64,")[1];
    }

    const imageBuffer = Buffer.from(cleanBase64, "base64");
    fs.writeFileSync(tempFilePath, imageBuffer);

    // Path to Python CLI script
    const cliScriptPath = path.join(process.cwd(), "python_services", "detect_disease_cli.py");

    // Execute python_services/detect_disease_cli.py via Python CLI child process
    const pythonResult = await new Promise<string>((resolve, reject) => {
      const args = ["-i", tempFilePath];
      if (apiKey) {
        args.push("-k", apiKey);
      }

      // Try 'python' command
      const pyProcess = spawn("python", [cliScriptPath, ...args], {
        env: { ...process.env, PYTHONIOENCODING: "utf-8" }
      });

      let stdoutData = "";
      let stderrData = "";

      pyProcess.stdout.on("data", (chunk) => {
        stdoutData += chunk.toString("utf-8");
      });

      pyProcess.stderr.on("data", (chunk) => {
        stderrData += chunk.toString("utf-8");
      });

      pyProcess.on("close", (code) => {
        // Clean up temp image file
        try {
          if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
          }
        } catch (e) {
          console.error("Temp file cleanup error:", e);
        }

        if (code === 0) {
          resolve(stdoutData);
        } else {
          reject(new Error(`Python process exited with code ${code}: ${stderrData || stdoutData}`));
        }
      });

      pyProcess.on("error", (err) => {
        try {
          if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
        } catch (e) {}
        reject(err);
      });
    });

    // Extract JSON string between markers or parse stdoutData
    let jsonStr = pythonResult;
    if (pythonResult.includes("DIAGNOSIS RESULT")) {
      const parts = pythonResult.split("================ DIAGNOSIS RESULT ================");
      if (parts[1]) {
        jsonStr = parts[1].split("=====================================================")[0].trim();
      }
    }

    const parsedJson = JSON.parse(jsonStr);

    return NextResponse.json({
      ...parsedJson,
      isAiPowered: true,
      aiEngine: "Python 3.14 + Google Gemini Vision Engine"
    });

  } catch (err: any) {
    console.error("Python Leaf Diagnosis Route Error:", err);
    return NextResponse.json(
      {
        error: err?.message || "Python Gemini diagnosis failed",
        isAiPowered: false
      },
      { status: 500 }
    );
  }
}

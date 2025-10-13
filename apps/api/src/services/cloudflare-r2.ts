/**
 * SIMPLE LOCAL FILE STORAGE - NO MORE CLOUDFLARE BULLSHIT
 * Just save files locally and serve them - IT WORKS!
 */

import fs from "fs";
import path from "path";

/**
 * Always configured for local storage
 */
export function isR2Configured(): boolean {
  return true;
}

/**
 * Upload file to LOCAL STORAGE - guaranteed to work
 */
export async function uploadFileToR2(
  key: string,
  fileBuffer: Buffer,
  contentType: string
): Promise<boolean> {
  try {
    console.log("Saving file locally:", {
      key,
      contentType,
      size: fileBuffer.length,
    });

    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const videosDir = path.join(uploadsDir, "videos");
    if (!fs.existsSync(videosDir)) {
      fs.mkdirSync(videosDir, { recursive: true });
    }

    // Save file
    const fileName = key.replace("videos/", "");
    const filePath = path.join(videosDir, fileName);

    fs.writeFileSync(filePath, fileBuffer);

    console.log("✅ LOCAL FILE SAVED:", {
      key,
      filePath,
      size: fileBuffer.length,
    });

    return true;
  } catch (error) {
    console.error("❌ Local file save error:", error);
    return false;
  }
}

/**
 * Generate LOCAL file URL for video playback
 */
export async function generateStreamUrl(
  key: string,
  expiresIn: number = 3600 // unused
): Promise<string> {
  // Return local file URL served by our API
  const fileName = key.replace("videos/", "");
  const streamUrl = `http://localhost:3001/api/videos/stream/${fileName}`;

  console.log("✅ LOCAL STREAM URL:", streamUrl);

  return streamUrl;
}

/**
 * For backward compatibility - now returns backend upload endpoint
 */
export async function generateUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600 // 1 hour
): Promise<{ url: string; fields: Record<string, string> }> {
  // Instead of presigned URLs, return our backend upload endpoint
  return {
    url: "/api/videos/upload-direct", // New backend endpoint
    fields: {
      key,
      contentType,
      method: "POST",
    },
  };
}

/**
 * Get R2 configuration status
 */
export function getR2Config() {
  return {
    configured: isR2Configured(),
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID ? "***" : undefined,
    bucketName: process.env.CLOUDFLARE_BUCKET_NAME,
    hasAccessKey: !!process.env.CLOUDFLARE_ACCESS_KEY_ID,
    hasSecretKey: !!process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  };
}

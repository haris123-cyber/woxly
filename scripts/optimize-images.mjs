/**
 * Image optimization script for WOXLY Store
 * Compresses large PNG/JPG images to reduce page weight
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdir, stat, rename, writeFile, unlink } from "fs/promises";
import { join, extname, basename, dirname } from "path";

const IMAGE_DIRS = [
  "public/images",
  "public/images/banners",
  "public/images/products",
  "public/images/categories",
];

const CONFIG = {
  jpeg: { quality: 82, progressive: true, mozjpeg: true },
  png: { quality: 82, compressionLevel: 9 },
  maxWidth: 1920,
  maxHeight: 1080,
};

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const supportedExts = [".jpg", ".jpeg", ".png"];
  if (!supportedExts.includes(ext)) return;

  const { size: originalSize } = await stat(filePath);
  const pipeline = sharp(filePath).rotate();
  const metadata = await pipeline.metadata();
  
  if ((metadata.width || 0) > CONFIG.maxWidth || (metadata.height || 0) > CONFIG.maxHeight) {
    pipeline.resize(CONFIG.maxWidth, CONFIG.maxHeight, { fit: "inside", withoutEnlargement: true });
  }

  let outputBuffer;
  if (ext === ".png") {
    outputBuffer = await pipeline.png(CONFIG.png).toBuffer();
  } else {
    outputBuffer = await pipeline.jpeg(CONFIG.jpeg).toBuffer();
  }

  if (outputBuffer.length < originalSize * 0.9) {
    const tmpPath = filePath + ".tmp";
    await writeFile(tmpPath, outputBuffer);
    await unlink(filePath);
    await rename(tmpPath, filePath);
    const savings = ((originalSize - outputBuffer.length) / originalSize * 100).toFixed(1);
    console.log(`✓ ${basename(filePath)}: ${(originalSize / 1024).toFixed(0)}KB → ${(outputBuffer.length / 1024).toFixed(0)}KB (${savings}% saved)`);
  } else {
    console.log(`- ${basename(filePath)}: already optimized`);
  }
}

async function processDir(dirPath) {
  let files;
  try {
    files = await readdir(dirPath);
  } catch {
    return;
  }
  for (const file of files) {
    const fullPath = join(dirPath, file);
    try {
      await optimizeImage(fullPath);
    } catch(e) {
      console.error(`⚠ Failed: ${basename(fullPath)} — ${e.message}`);
    }
  }
}

console.log("🖼️  Optimizing images...\n");
for (const dir of IMAGE_DIRS) {
  await processDir(dir);
}
console.log("\n✅ Done!");

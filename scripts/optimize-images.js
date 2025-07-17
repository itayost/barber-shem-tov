// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    console.log(`📁 Creating directory: ${dir}`);
    await fs.mkdir(dir, { recursive: true });
  }
}

async function optimizeImages(dir) {
  try {
    // בדוק אם התיקייה קיימת
    await fs.access(dir);
  } catch (error) {
    console.log(`⚠️  Directory ${dir} doesn't exist. Skipping optimization.`);
    return;
  }

  const files = await fs.readdir(dir, { withFileTypes: true });
  let optimizedCount = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await optimizeImages(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file.name)) {
      const name = path.parse(file.name).name;

      try {
        // Skip if already optimized
        const webpPath = path.join(dir, `${name}.webp`);
        const avifPath = path.join(dir, `${name}.avif`);

        const webpExists = await fs
          .access(webpPath)
          .then(() => true)
          .catch(() => false);
        const avifExists = await fs
          .access(avifPath)
          .then(() => true)
          .catch(() => false);

        if (!webpExists) {
          await sharp(fullPath).webp({ quality: 85 }).toFile(webpPath);
          console.log(`✅ Created WebP: ${name}.webp`);
        }

        if (!avifExists) {
          await sharp(fullPath).avif({ quality: 80 }).toFile(avifPath);
          console.log(`✅ Created AVIF: ${name}.avif`);
        }

        optimizedCount++;
      } catch (error) {
        console.error(`❌ Error optimizing ${file.name}:`, error.message);
      }
    }
  }

  return optimizedCount;
}

// Run optimization
async function run() {
  console.log('🖼️  Starting image optimization...\n');

  const dirs = [
    './public/images',
    './public/hero-images',
    './public/gallery',
    // הוסף עוד תיקיות אם יש
  ];

  let totalOptimized = 0;

  for (const dir of dirs) {
    const count = await optimizeImages(dir);
    if (count) totalOptimized += count;
  }

  if (totalOptimized > 0) {
    console.log(`\n🎉 Optimization complete! Processed ${totalOptimized} images.`);
  } else {
    console.log('\n📌 No images to optimize or all already optimized.');
  }
}

run().catch(console.error);

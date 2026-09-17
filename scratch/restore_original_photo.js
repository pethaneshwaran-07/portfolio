const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function restoreOriginalPhotoCutout() {
  const inputPath = 'C:/Users/nithi/.gemini/antigravity/brain/81405e94-6c09-44cd-a498-eaca3c7c657e/.user_uploaded/media_1789580258686.png';
  const outputDir = path.join(__dirname, '../public/images');

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Clean studio background removal only — NO color/shirt changes whatsoever
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const minVal = Math.min(r, g, b);
      const maxVal = Math.max(r, g, b);
      const diff = maxVal - minVal;

      // Studio White Background Removal
      if (r > 205 && g > 205 && b > 205 && diff < 25) {
        const avg = (r + g + b) / 3;
        if (avg > 235) {
          data[idx + 3] = 0; // Fully transparent
        } else if (avg > 205) {
          const factor = (235 - avg) / 30;
          data[idx + 3] = Math.max(0, Math.min(255, Math.floor(factor * 255)));
        }
      }
    }
  }

  const processedBuffer = await sharp(data, {
    raw: { width, height, channels }
  })
  .png()
  .toBuffer();

  const targetPath1 = path.join(outputDir, 'harish-portrait.png');
  const targetPath2 = path.join(outputDir, 'portrait.png');

  fs.writeFileSync(targetPath1, processedBuffer);
  fs.writeFileSync(targetPath2, processedBuffer);

  console.log('Restored original exact photo cutout (unmodified shirt/clothing):');
  console.log('- ' + targetPath1);
  console.log('- ' + targetPath2);
}

restoreOriginalPhotoCutout().catch(err => {
  console.error(err);
  process.exit(1);
});

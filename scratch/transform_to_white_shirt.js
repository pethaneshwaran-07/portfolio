const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processCrispWhiteShirtPortrait() {
  const inputPath = 'C:/Users/nithi/.gemini/antigravity/brain/81405e94-6c09-44cd-a498-eaca3c7c657e/.user_uploaded/media_1789580258686.png';
  const outputDir = path.join(__dirname, '../public/images');

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      let r = data[idx];
      let g = data[idx + 1];
      let b = data[idx + 2];

      const minVal = Math.min(r, g, b);
      const maxVal = Math.max(r, g, b);
      const diff = maxVal - minVal;

      // 1. Studio White Background Removal
      if (r > 205 && g > 205 && b > 205 && diff < 25) {
        const avg = (r + g + b) / 3;
        if (avg > 235) {
          data[idx + 3] = 0; // Fully transparent
          continue;
        } else if (avg > 205) {
          const factor = (235 - avg) / 30;
          data[idx + 3] = Math.max(0, Math.min(255, Math.floor(factor * 255)));
          continue;
        }
      }

      // Standard skin detection in RGB space:
      // (R > 95) && (G > 40) && (B > 20) && (R - G > 15) && (R > B)
      const isSkinPixel = (r > 95) && (g > 40) && (b > 20) && (r - g > 12) && (r > b);
      const isHairOrDarkShadow = (r < 70 && g < 70 && b < 70);

      // Shirt recoloring (only for fabric pixels on the torso/shoulders below upper neck)
      if (y > height * 0.45 && !isSkinPixel && !isHairOrDarkShadow && data[idx + 3] > 0) {
        // Calculate original shirt pixel lightness
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Executive white shirt brightness mapping
        const whiteLum = Math.min(252, Math.max(215, Math.floor(205 + lum * 55)));

        data[idx]     = Math.min(255, whiteLum - 2); // R
        data[idx + 1] = Math.min(255, whiteLum - 1); // G
        data[idx + 2] = Math.min(255, whiteLum);     // B
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

  console.log('Crisp executive white shirt portrait updated successfully.');
}

processCrispWhiteShirtPortrait().catch(err => {
  console.error(err);
  process.exit(1);
});

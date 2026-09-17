const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createRealClientCutout() {
  const inputPath = 'C:/Users/nithi/.gemini/antigravity/brain/81405e94-6c09-44cd-a498-eaca3c7c657e/.user_uploaded/media_1789580258686.png';
  const outputDir = path.join(__dirname, '../public/images');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Clean background removal for pure studio white background
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const minVal = Math.min(r, g, b);
      const maxVal = Math.max(r, g, b);
      const diff = maxVal - minVal;

      // Detect background white / off-white pixels
      if (r > 200 && g > 200 && b > 200 && diff < 25) {
        const avg = (r + g + b) / 3;
        if (avg > 235) {
          data[idx + 3] = 0; // Fully transparent
        } else if (avg > 200) {
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

  const webpBuffer = await sharp(data, {
    raw: { width, height, channels }
  })
  .webp({ quality: 95 })
  .toBuffer();

  const targetPng1 = path.join(outputDir, 'harish-portrait.png');
  const targetWebp1 = path.join(outputDir, 'harish-portrait.webp');
  const targetPng2 = path.join(outputDir, 'portrait.png');

  fs.writeFileSync(targetPng1, processedBuffer);
  fs.writeFileSync(targetWebp1, webpBuffer);
  fs.writeFileSync(targetPng2, processedBuffer);

  console.log('Real client transparent cutout created successfully:');
  console.log('- ' + targetPng1);
  console.log('- ' + targetWebp1);
}

createRealClientCutout().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

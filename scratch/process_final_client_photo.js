const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processFinalClientPhoto() {
  const inputPath = 'C:/Users/nithi/.gemini/antigravity/brain/81405e94-6c09-44cd-a498-eaca3c7c657e/.user_uploaded/media_1789657272117.jpg';
  const outputDir = path.join(__dirname, '../public/images');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. Process and save high quality webp and png versions
  const imageBuffer = fs.readFileSync(inputPath);

  const pngBuffer = await sharp(imageBuffer)
    .png()
    .toBuffer();

  const webpBuffer = await sharp(imageBuffer)
    .webp({ quality: 98 })
    .toBuffer();

  const targetPng1 = path.join(outputDir, 'harish-portrait.png');
  const targetWebp1 = path.join(outputDir, 'harish-portrait.webp');
  const targetJpg1 = path.join(outputDir, 'harish-portrait.jpg');
  const targetPng2 = path.join(outputDir, 'portrait.png');

  fs.writeFileSync(targetPng1, pngBuffer);
  fs.writeFileSync(targetWebp1, webpBuffer);
  fs.writeFileSync(targetJpg1, imageBuffer);
  fs.writeFileSync(targetPng2, pngBuffer);

  console.log('Final client portrait saved across all image targets:');
  console.log('- ' + targetPng1);
  console.log('- ' + targetWebp1);
}

processFinalClientPhoto().catch(err => {
  console.error('Error processing final portrait:', err);
  process.exit(1);
});

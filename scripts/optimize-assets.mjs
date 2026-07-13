import sharp from 'sharp';

const HERO_IN = 'assets/images/hero/foto-02.png';
const HERO_OUT = 'assets/images/hero/foto-02.webp';
const LOGO_IN = 'assets/images/logo/logo.jpg';
const LOGO_TRANSPARENT = 'assets/images/logo/logo-fundo-transparente.png';
const LOGO_MARK_PNG = 'assets/images/logo/logo-marca-transparente.png';
const LOGO_MARK_WEBP = 'assets/images/logo/logo-marca-transparente.webp';

const vivencias = [
  ['assets/images/vivencia/foto-01.jpg', 'assets/images/vivencia/foto-01.webp'],
  ['assets/images/vivencia/20260620_213548.jpg', 'assets/images/vivencia/20260620_213548.webp'],
];

// 1. Hero: resize 1600w, WebP q72 (alvo < 400 KB, ideal ~250 KB)
await sharp(HERO_IN)
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 72 })
  .toFile(HERO_OUT);

// 2. Vivências: resize 1200w, WebP q72
for (const [inp, out] of vivencias) {
  await sharp(inp)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(out);
}

// 3. Favicons a partir do logo.jpg (mantém fundo para compatibilidade)
await sharp(LOGO_IN).resize(32, 32).png().toFile('assets/favicon/favicon-32.png');
await sharp(LOGO_IN).resize(180, 180).png().toFile('assets/favicon/apple-touch-180.png');

// 4. Brand logo transparente para header (WebP otimizado)
await sharp(LOGO_TRANSPARENT).resize(96, 96).webp({ quality: 85 }).toFile('assets/images/logo/logo-brand.webp');

// 5. Extrai o xadrez gravado no símbolo oficial e cria versões com alpha.
// O fundo é composto apenas por cinzas muito claros e neutros; o dourado é preservado pela saturação.
const { data: logoPixels, info: logoInfo } = await sharp(LOGO_TRANSPARENT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let index = 0; index < logoPixels.length; index += 4) {
  const red = logoPixels[index];
  const green = logoPixels[index + 1];
  const blue = logoPixels[index + 2];
  const brightness = (red + green + blue) / 3;
  const spread = Math.max(red, green, blue) - Math.min(red, green, blue);

  if (brightness >= 205 && spread <= 22) {
    const matte = Math.max(0, Math.min(1, (spread - 5) / 17));
    logoPixels[index + 3] = Math.round(255 * matte);
  }
}

const extractedLogo = sharp(logoPixels, {
  raw: {
    width: logoInfo.width,
    height: logoInfo.height,
    channels: 4,
  },
}).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 });

await extractedLogo
  .clone()
  .resize({ width: 768, withoutEnlargement: true })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(LOGO_MARK_PNG);

await extractedLogo
  .clone()
  .resize({ width: 320, withoutEnlargement: true })
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile(LOGO_MARK_WEBP);

console.log('Otimização concluída.');

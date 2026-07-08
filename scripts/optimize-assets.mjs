import sharp from 'sharp';

const HERO_IN = 'assets/images/hero/foto-02.png';
const HERO_OUT = 'assets/images/hero/foto-02.webp';
const LOGO_IN = 'assets/images/logo/logo.jpg';

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

// 3. Favicons a partir do logo.jpg
await sharp(LOGO_IN).resize(32, 32).png().toFile('assets/favicon/favicon-32.png');
await sharp(LOGO_IN).resize(180, 180).png().toFile('assets/favicon/apple-touch-180.png');

console.log('Otimização concluída.');

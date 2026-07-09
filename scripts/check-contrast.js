#!/usr/bin/env node

// WCAG 2.1 Contrast Ratio Calculator
function luminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function contrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;

  const lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Pares a verificar conforme spec
const pairs = [
  { bg: '#0D2F1E', fg: '#FFFFFF', name: 'forest-deep → white (texto principal)' },
  { bg: '#0D2F1E', fg: '#F4EFE6', name: 'forest-deep → cream (fg-soft)' },
  { bg: '#0D2F1E', fg: '#FFA500', name: 'forest-deep → gold (accent)' },
  { bg: '#102d1d', fg: '#F4EFE6', name: 'card → cream' },
  { bg: '#102d1d', fg: '#D4A24E', name: 'card → gold-soft (accent-soft)' },
  { bg: '#FFA500', fg: '#0D2F1E', name: 'gold → forest-deep (texto do botão primary)' },
];

console.log('=== WCAG 2.1 Contrast Ratios ===\n');
console.log('WCAG AA: texto normal ≥ 4.5:1 | texto grande (≥18.66px bold ou ≥24px) ≥ 3:1\n');

pairs.forEach(pair => {
  const ratio = contrastRatio(pair.bg, pair.fg);
  const formatted = ratio.toFixed(2);
  const passesNormal = ratio >= 4.5 ? '✓' : '✗';
  const passesLarge = ratio >= 3.0 ? '✓' : '✗';
  console.log(`${pair.name}`);
  console.log(`  Ratio: ${formatted}:1 ${passesNormal} (normal) | ${passesLarge} (large)`);
  console.log('');
});

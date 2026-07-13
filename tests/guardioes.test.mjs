import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import sharp from 'sharp';

const guardians = [
  ['txi-ruas', 'Txi Ruas'],
  ['stephane', 'Stephane'],
  ['caio-rumeya', 'Caio Rumëya'],
  ['mateus-vinicius', 'Mateus Vinicius'],
  ['mel-torres', 'Mel Torres'],
  ['thomaz-felipe', 'Thomaz Felipe'],
];

const source = (slug) => `assets/images/guardioes/originais/${slug}.png`;
const published = (slug) => `assets/images/guardioes/${slug}.webp`;

test('publica seis artes WebP completas e menores que os PNGs', async () => {
  for (const [slug] of guardians) {
    await access(source(slug));
    await access(published(slug));

    const metadata = await sharp(published(slug)).metadata();
    assert.equal(metadata.format, 'webp');
    assert.equal(metadata.width, 1080);
    assert.equal(metadata.height, 1350);

    const [pngStat, webpStat] = await Promise.all([stat(source(slug)), stat(published(slug))]);
    assert.ok(webpStat.size < pngStat.size, `${slug}.webp deve ser menor que o PNG`);
  }
});

test('renderiza seis cards sem placeholder e com fallback de link', async () => {
  const html = await readFile('index.html', 'utf8');
  const cards = html.match(/class="guardian-card"/g) ?? [];
  assert.equal(cards.length, 6);
  assert.doesNotMatch(html, /Apresentação em preparação/);

  for (const [slug, name] of guardians) {
    assert.match(html, new RegExp(`href="assets/images/guardioes/${slug}\\.webp"`));
    assert.match(html, new RegExp(`data-guardian-name="${name}"`));
    assert.match(html, new RegExp(`aria-label="Ver apresentação de ${name}"`));
  }
});

test('oferece preview responsivo e reduz movimento', async () => {
  const css = await readFile('css/styles.css', 'utf8');
  assert.match(css, /\.guardian-card__preview/);
  assert.match(css, /:hover/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 639px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test('aprimora os links com diálogo e restaura o foco', async () => {
  const [html, js] = await Promise.all([
    readFile('index.html', 'utf8'),
    readFile('js/ui.js', 'utf8'),
  ]);
  assert.match(html, /<dialog[^>]+id="guardian-dialog"/);
  assert.match(html, /id="guardian-dialog-image"/);
  assert.match(js, /showModal\(\)/);
  assert.match(js, /guardianDialog\.close\(\)/);
  assert.match(js, /lastGuardianTrigger\?\.focus\(\)/);
});

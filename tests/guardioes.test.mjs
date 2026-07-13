import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import sharp from 'sharp';

const guardians = [
  ['txi-ruas', 'Txi Ruas', 'TXI RUAS. Artista, terapeuta integrativo e buscador dos caminhos da consciência. Pai de Jaya. Iniciado pelo cacique Tuï Shane Huya, da Aldeia Më Nï Uitï, carrega o chamado de guardião das medicinas com reverência e propósito. Fundador do Instituto Libélula, conduz vivências através do som, da respiração consciente e práticas integrativas, honrando os saberes ancestrais e o cuidado com o ser humano em sua totalidade.'],
  ['stephane', 'Stephane', 'STHEPHANE. Filha da natureza, criada entre rezas, benzedeiras e o cheiro de ervas que curava. Em busca de cura e reconexão com o próprio ser, encontrou nas medicinas da floresta um chamado ancestral. Hoje, como guardiã, caminha ao lado de quem busca se lembrar de quem é. Fundadora do Sagrado Aroma. Mãe do Lucas.'],
  ['caio-rumeya', 'Caio Rumëya', 'CAIO RUMËYA. Encontrou no tambor e no rezo muito mais do que ritmo: propósito! Batucador apaixonado, carrega a energia do batuque como ferramenta de conexão e presença no espaço sagrado. Disposto a servir com amor e com o coração aberto para quem chega em busca de cura e reconexão.'],
  ['mateus-vinicius', 'Mateus Vinicius', 'MATEUS VINICIUS. Empresário de dia, guardião de alma. Consagrado desde 2018, encontrou nas medicinas da floresta o desvio que mudou tudo. Desde então escolhe, toda vez, o caminho do serviço. No espaço sagrado, seu papel é um só: estar presente para os irmãos que buscam se encontrar nessa jornada.'],
  ['mel-torres', 'Mel Torres', 'MEL TORRES. Crescida em alto mar, aprendeu cedo que o horizonte é sempre maior do que parece. Começou seu desenvolvimento espiritual em 2012. Hoje, é médica veterinária, professora, voluntária, estudante de teatro e conta com o poder dos oráculos como guia. Como professora, constrói. Como guardiã, desconstrói. Em ambos: união e fé inabalável no merecimento da libertação e da paz de todos.'],
  ['thomaz-felipe', 'Thomaz Felipe', 'THOMAZ FELIPE. Há 8 anos as medicinas da floresta abriram uma porta. E desde então ele não parou de caminhar. Tecnologia, cinema, efeitos especiais, Vipassana: cada experiência uma peça de um mesmo processo de autodescoberta. Guardião por chamado, está aqui para acolher quem busca o que ele mesmo ainda busca: entender os mistérios da própria jornada.'],
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
  const cards = html.match(/class="[^"]*\bguardian-card\b[^"]*"/g) ?? [];
  assert.equal(cards.length, 6);
  cards.forEach((card) => assert.match(card, /\breveal\b/));
  assert.doesNotMatch(html, /Apresentação em preparação/);

  for (const [slug, name, description] of guardians) {
    assert.match(html, new RegExp(`href="assets/images/guardioes/${slug}\\.webp"`));
    assert.match(html, new RegExp(`data-guardian-name="${name}"`));
    assert.match(html, new RegExp(`aria-label="Ver apresentação de ${name}"`));
    assert.match(html, new RegExp(`aria-describedby="guardian-description-${slug}"`));
    assert.match(html, new RegExp(`id="guardian-description-${slug}"`));
    assert.match(html, new RegExp(`alt="Arte de apresentação de ${name}"`));
    assert.ok(html.includes(description), `${slug} deve preservar a transcrição autoral da arte`);
  }

  assert.match(html, /id="guardian-dialog-image"[^>]+loading="lazy"[^>]+decoding="async"/);
});

test('oferece preview responsivo e reduz movimento', async () => {
  const css = await readFile('css/styles.css', 'utf8');
  assert.match(css, /\.guardian-card__preview/);
  assert.match(css, /:hover/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /nth-child\(odd\)/);
  assert.match(css, /nth-child\(even\)/);
  assert.match(css, /@media \(max-width: 639px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.guardian-card__trigger\s*\{[^}]*transition:\s*transform var\(--t-fast\);/s);
  assert.match(css, /\.guardian-card__description\s*\{/);
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

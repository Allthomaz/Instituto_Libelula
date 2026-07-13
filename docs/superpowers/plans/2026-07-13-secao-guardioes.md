# Seção Guardiões Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o acordeão de Guardiões por seis cards acessíveis que revelam as artes autorais no hover/foco e abrem a arte completa em diálogo no clique/toque.

**Architecture:** A seção permanece em `index.html` e usa links reais para garantir progressive enhancement sem JavaScript. `css/styles.css` controla a grade, o preview sobreposto e o diálogo; `js/ui.js` aprimora os links com `dialog.showModal()`. Um teste Node estrutural protege assets, marcação, estados responsivos e hooks de interação sem introduzir framework.

**Tech Stack:** HTML5 semântico, CSS responsivo, JavaScript vanilla, `<dialog>` nativo, Node.js test runner, Sharp, WebP.

## Global Constraints

- **Zero condicionamento:** nenhuma copy pode prometer, antecipar ou induzir o que uma pessoa sentirá em uma vivência com Ayahuasca.
- Stack vanilla HTML/CSS/JS; não introduzir framework ou backend.
- Hover nunca é a única forma de acessar conteúdo; foco, clique, toque, teclado e link sem JavaScript devem permanecer equivalentes.
- As seis artes `1080 × 1350` devem ser preservadas sem recorte e publicadas em WebP otimizado.
- A sétima guardiã não aparece como placeholder nesta entrega.
- Animações usam apenas `transform` e `opacity` e respeitam `prefers-reduced-motion`.
- Imagens usam `loading="lazy"`, `decoding="async"`, largura e altura declaradas.
- Rodar `pnpm optimize` porque este incremento inclui processamento de assets.
- Rodar `pnpm check:contrast` porque este incremento altera a interface visual.
- Não alterar o card de ritual, a agenda, o Caminho de acompanhamento, backend, pagamentos ou deploy.

---

## File Map

- `assets/images/guardioes/originais/*.png`: fontes editoriais copiadas dos arquivos `3.png` a `8.png`.
- `assets/images/guardioes/*.webp`: versões publicadas e otimizadas das seis artes.
- `scripts/optimize-assets.mjs`: lista e processa as artes sem recorte.
- `tests/guardioes.test.mjs`: valida assets, estrutura HTML, acessibilidade, CSS e hooks do diálogo.
- `package.json`: expõe `pnpm test` com o test runner nativo do Node.
- `index.html`: substitui o acordeão pela introdução, grade, seis cards e diálogo compartilhado.
- `css/styles.css`: define card compacto, preview ampliado, breakpoints, diálogo e movimento reduzido.
- `js/ui.js`: transforma os links em abertura de diálogo quando a API estiver disponível.

---

### Task 1: Pipeline e assets dos seis guardiões

**Files:**
- Create: `assets/images/guardioes/originais/txi-ruas.png`
- Create: `assets/images/guardioes/originais/stephane.png`
- Create: `assets/images/guardioes/originais/caio-rumeya.png`
- Create: `assets/images/guardioes/originais/mateus-vinicius.png`
- Create: `assets/images/guardioes/originais/mel-torres.png`
- Create: `assets/images/guardioes/originais/thomaz-felipe.png`
- Create: `assets/images/guardioes/txi-ruas.webp`
- Create: `assets/images/guardioes/stephane.webp`
- Create: `assets/images/guardioes/caio-rumeya.webp`
- Create: `assets/images/guardioes/mateus-vinicius.webp`
- Create: `assets/images/guardioes/mel-torres.webp`
- Create: `assets/images/guardioes/thomaz-felipe.webp`
- Create: `tests/guardioes.test.mjs`
- Modify: `scripts/optimize-assets.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `/home/flow/TM-System/Meu-Saber/Instituto-Libelula/raw/guardiões/{3,4,5,6,7,8}.png`.
- Produces: seis WebPs `1080 × 1350` com slugs estáveis usados por HTML e testes.

- [ ] **Step 1: Adicionar o script de teste e o teste de assets**

Em `package.json`, adicionar aos scripts:

```json
"test": "node --test"
```

Criar `tests/guardioes.test.mjs`:

```js
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
```

- [ ] **Step 2: Rodar o teste de assets e confirmar RED**

Run:

```bash
pnpm test -- --test-name-pattern="publica seis artes"
```

Expected: FAIL com `ENOENT` para `assets/images/guardioes/originais/txi-ruas.png`.

- [ ] **Step 3: Copiar as seis fontes com nomes estáveis**

Criar `assets/images/guardioes/originais/` e copiar exatamente:

```text
3.png -> txi-ruas.png
4.png -> stephane.png
5.png -> caio-rumeya.png
6.png -> mateus-vinicius.png
7.png -> mel-torres.png
8.png -> thomaz-felipe.png
```

- [ ] **Step 4: Estender o otimizador e gerar os WebPs**

Adicionar após `vivencias` em `scripts/optimize-assets.mjs`:

```js
const guardians = [
  ['assets/images/guardioes/originais/txi-ruas.png', 'assets/images/guardioes/txi-ruas.webp'],
  ['assets/images/guardioes/originais/stephane.png', 'assets/images/guardioes/stephane.webp'],
  ['assets/images/guardioes/originais/caio-rumeya.png', 'assets/images/guardioes/caio-rumeya.webp'],
  ['assets/images/guardioes/originais/mateus-vinicius.png', 'assets/images/guardioes/mateus-vinicius.webp'],
  ['assets/images/guardioes/originais/mel-torres.png', 'assets/images/guardioes/mel-torres.webp'],
  ['assets/images/guardioes/originais/thomaz-felipe.png', 'assets/images/guardioes/thomaz-felipe.webp'],
];
```

Adicionar após o loop de `vivencias`:

```js
// 3. Guardiões: preservar a composição 4:5 e converter sem redimensionar.
for (const [inp, out] of guardians) {
  await sharp(inp)
    .webp({ quality: 82, smartSubsample: true })
    .toFile(out);
}
```

Renumerar apenas os comentários seguintes e executar:

```bash
pnpm optimize
```

Expected: saída `Otimização concluída.` e seis arquivos WebP em `assets/images/guardioes/`.

- [ ] **Step 5: Rodar o teste de assets e confirmar GREEN**

Run:

```bash
pnpm test -- --test-name-pattern="publica seis artes"
```

Expected: 1 teste PASS, 0 FAIL.

- [ ] **Step 6: Commit isolado dos assets e pipeline**

```bash
git add package.json tests/guardioes.test.mjs scripts/optimize-assets.mjs assets/images/guardioes
git commit -m "feat(guardioes): preparar artes otimizadas"
```

---

### Task 2: Grade semântica e preview visual

**Files:**
- Modify: `index.html:484-498`
- Modify: `css/styles.css:594-609`
- Test: `tests/guardioes.test.mjs`

**Interfaces:**
- Consumes: slugs e WebPs produzidos pela Task 1.
- Produces: `.guardians-grid`, seis `.guardian-card`, links `.guardian-card__trigger` e `#guardian-dialog` consumidos por `js/ui.js`.

- [ ] **Step 1: Rodar os testes estruturais e confirmar RED**

Run:

```bash
pnpm test -- --test-name-pattern="renderiza seis cards|oferece preview"
```

Expected: 2 testes FAIL porque a página ainda contém apenas o acordeão.

- [ ] **Step 2: Substituir o acordeão pela introdução, grade e diálogo**

Em `index.html`, preservar o `<section id="guardioes">` e substituir seu conteúdo interno por:

```html
<div class="container guardians">
  <div class="guardians__heading">
    <div>
      <p class="eyebrow reveal">Quem sustenta o espaço</p>
      <h2 id="guardioes-title" class="section__title reveal">Conheça nossos guardiões</h2>
    </div>
    <p class="guardians__intro reveal">Cada pessoa reúne uma trajetória própria e uma responsabilidade na construção das vivências.</p>
  </div>

  <details class="guardians__role acc reveal">
    <summary class="acc__summary">Entenda a função dos guardiões <span class="acc__icon" aria-hidden="true">▸</span></summary>
    <div class="acc__body">
      <p>Nossos facilitadores e guardiões são responsáveis por manter o campo de segurança e a egrégora do Instituto. Têm anos de estudo, prática e vivência com as medicinas e técnicas que utilizamos.</p>
      <p>O papel do Guardião não é “curar” você. É criar o espaço seguro, o suporte necessário e o olhar atento para que você realize seu próprio processo de cuidado e autotransformação.</p>
    </div>
  </details>

  <ul class="guardians-grid" aria-label="Guardiões do Instituto Libélula">
    <li class="guardian-card reveal">
      <a class="guardian-card__trigger"
         href="assets/images/guardioes/txi-ruas.webp"
         data-guardian-art="assets/images/guardioes/txi-ruas.webp"
         data-guardian-name="Txi Ruas"
         aria-label="Ver apresentação de Txi Ruas">
        <span class="guardian-card__ornament" aria-hidden="true">✦</span>
        <span class="guardian-card__name">Txi Ruas</span>
        <span class="guardian-card__role">Fundador e facilitador</span>
        <span class="guardian-card__hint" aria-hidden="true">Passe o mouse ou toque para conhecer</span>
        <img class="guardian-card__preview" src="assets/images/guardioes/txi-ruas.webp" alt="" width="1080" height="1350" loading="lazy" decoding="async">
      </a>
    </li>
    <li class="guardian-card reveal">
      <a class="guardian-card__trigger"
         href="assets/images/guardioes/stephane.webp"
         data-guardian-art="assets/images/guardioes/stephane.webp"
         data-guardian-name="Stephane"
         aria-label="Ver apresentação de Stephane">
        <span class="guardian-card__ornament" aria-hidden="true">✦</span>
        <span class="guardian-card__name">Stephane</span>
        <span class="guardian-card__role">Guardiã e fundadora do Sagrado Aroma</span>
        <span class="guardian-card__hint" aria-hidden="true">Passe o mouse ou toque para conhecer</span>
        <img class="guardian-card__preview" src="assets/images/guardioes/stephane.webp" alt="" width="1080" height="1350" loading="lazy" decoding="async">
      </a>
    </li>
    <li class="guardian-card reveal">
      <a class="guardian-card__trigger"
         href="assets/images/guardioes/caio-rumeya.webp"
         data-guardian-art="assets/images/guardioes/caio-rumeya.webp"
         data-guardian-name="Caio Rumëya"
         aria-label="Ver apresentação de Caio Rumëya">
        <span class="guardian-card__ornament" aria-hidden="true">✦</span>
        <span class="guardian-card__name">Caio Rumëya</span>
        <span class="guardian-card__role">Guardião e batuqueiro</span>
        <span class="guardian-card__hint" aria-hidden="true">Passe o mouse ou toque para conhecer</span>
        <img class="guardian-card__preview" src="assets/images/guardioes/caio-rumeya.webp" alt="" width="1080" height="1350" loading="lazy" decoding="async">
      </a>
    </li>
    <li class="guardian-card reveal">
      <a class="guardian-card__trigger"
         href="assets/images/guardioes/mateus-vinicius.webp"
         data-guardian-art="assets/images/guardioes/mateus-vinicius.webp"
         data-guardian-name="Mateus Vinicius"
         aria-label="Ver apresentação de Mateus Vinicius">
        <span class="guardian-card__ornament" aria-hidden="true">✦</span>
        <span class="guardian-card__name">Mateus Vinicius</span>
        <span class="guardian-card__role">Guardião</span>
        <span class="guardian-card__hint" aria-hidden="true">Passe o mouse ou toque para conhecer</span>
        <img class="guardian-card__preview" src="assets/images/guardioes/mateus-vinicius.webp" alt="" width="1080" height="1350" loading="lazy" decoding="async">
      </a>
    </li>
    <li class="guardian-card reveal">
      <a class="guardian-card__trigger"
         href="assets/images/guardioes/mel-torres.webp"
         data-guardian-art="assets/images/guardioes/mel-torres.webp"
         data-guardian-name="Mel Torres"
         aria-label="Ver apresentação de Mel Torres">
        <span class="guardian-card__ornament" aria-hidden="true">✦</span>
        <span class="guardian-card__name">Mel Torres</span>
        <span class="guardian-card__role">Guardiã</span>
        <span class="guardian-card__hint" aria-hidden="true">Passe o mouse ou toque para conhecer</span>
        <img class="guardian-card__preview" src="assets/images/guardioes/mel-torres.webp" alt="" width="1080" height="1350" loading="lazy" decoding="async">
      </a>
    </li>
    <li class="guardian-card reveal">
      <a class="guardian-card__trigger"
         href="assets/images/guardioes/thomaz-felipe.webp"
         data-guardian-art="assets/images/guardioes/thomaz-felipe.webp"
         data-guardian-name="Thomaz Felipe"
         aria-label="Ver apresentação de Thomaz Felipe">
        <span class="guardian-card__ornament" aria-hidden="true">✦</span>
        <span class="guardian-card__name">Thomaz Felipe</span>
        <span class="guardian-card__role">Guardião</span>
        <span class="guardian-card__hint" aria-hidden="true">Passe o mouse ou toque para conhecer</span>
        <img class="guardian-card__preview" src="assets/images/guardioes/thomaz-felipe.webp" alt="" width="1080" height="1350" loading="lazy" decoding="async">
      </a>
    </li>
  </ul>
</div>

<dialog class="guardian-dialog" id="guardian-dialog" aria-labelledby="guardian-dialog-title">
  <div class="guardian-dialog__surface">
    <button class="guardian-dialog__close" type="button" aria-label="Fechar apresentação">×</button>
    <h3 class="guardian-dialog__title" id="guardian-dialog-title"></h3>
    <img class="guardian-dialog__image" id="guardian-dialog-image" alt="" width="1080" height="1350">
  </div>
</dialog>
```

- [ ] **Step 3: Implementar a grade, o preview e o diálogo em CSS**

Adicionar antes de `/* Accordion */` em `css/styles.css`:

```css
/* Guardiões: cards compactos com arte completa revelada sob demanda */
.guardians { position: relative; }
.guardians__heading {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(20rem, 1fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: end;
}
.guardians__heading .section__title { margin-bottom: 0; }
.guardians__intro { max-width: 56ch; color: var(--fg-soft); }
.guardians__role { max-width: 54rem; margin-top: 2rem; }
.guardians-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: clamp(2.5rem, 5vw, 4rem);
  list-style: none;
  overflow: visible;
}
.guardian-card { position: relative; min-width: 0; }
.guardian-card__trigger {
  position: relative;
  min-height: 17rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  isolation: isolate;
  background:
    radial-gradient(circle at 75% 20%, #d4a24e1c, transparent 32%),
    linear-gradient(145deg, #173d28, #0b2819);
  border: 1px solid #d4a24e4a;
  border-radius: var(--radius-lg);
  box-shadow: 0 22px 60px #061a1038;
  transition: transform var(--t-fast), border-color var(--t-fast), box-shadow var(--t-fast);
}
.guardian-card__trigger::before {
  content: '';
  position: absolute;
  inset: 0.65rem;
  z-index: -1;
  border: 1px solid #ffffff0b;
  border-radius: calc(var(--radius-lg) - 5px);
}
.guardian-card__trigger:hover,
.guardian-card__trigger:focus-visible {
  z-index: 4;
  transform: translateY(-4px);
  border-color: var(--accent-soft);
  box-shadow: 0 28px 70px #061a1066;
}
.guardian-card__ornament { margin-bottom: auto; color: var(--accent); font-size: 1.25rem; }
.guardian-card__name { font-family: var(--font-display); font-size: clamp(1.7rem, 1.3rem + 1vw, 2.35rem); line-height: 1.05; }
.guardian-card__role { margin-top: 0.45rem; color: var(--accent-soft); }
.guardian-card__hint { margin-top: 1.25rem; color: var(--fg-soft); font-size: 0.76rem; letter-spacing: 0.05em; }
.guardian-card__preview {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 6;
  width: min(30rem, calc(100vw - 3rem));
  max-width: none;
  aspect-ratio: 4 / 5;
  object-fit: contain;
  border: 1px solid var(--accent-soft);
  border-radius: var(--radius-lg);
  box-shadow: 0 32px 90px #06150de8;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0.94);
  transform-origin: center;
  transition: opacity var(--t-med), transform var(--t-med);
}
@media (hover: hover) and (pointer: fine) {
  .guardian-card__trigger:hover .guardian-card__preview,
  .guardian-card__trigger:focus-visible .guardian-card__preview {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  .guardian-card:nth-child(3n + 1) .guardian-card__preview { left: 0; transform: translate(0, -50%) scale(0.94); transform-origin: left center; }
  .guardian-card:nth-child(3n + 1) .guardian-card__trigger:is(:hover, :focus-visible) .guardian-card__preview { transform: translate(0, -50%) scale(1); }
  .guardian-card:nth-child(3n) .guardian-card__preview { left: 100%; transform: translate(-100%, -50%) scale(0.94); transform-origin: right center; }
  .guardian-card:nth-child(3n) .guardian-card__trigger:is(:hover, :focus-visible) .guardian-card__preview { transform: translate(-100%, -50%) scale(1); }
}
.guardian-dialog {
  width: min(94vw, 42rem);
  max-width: none;
  max-height: 94vh;
  padding: 0;
  overflow: visible;
  color: var(--fg);
  background: transparent;
  border: 0;
}
.guardian-dialog::backdrop { background: #06150de6; backdrop-filter: blur(8px); }
.guardian-dialog__surface { position: relative; display: grid; place-items: center; }
.guardian-dialog__title { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.guardian-dialog__image { width: auto; max-width: 100%; max-height: 90vh; object-fit: contain; border: 1px solid var(--accent-soft); border-radius: var(--radius-lg); }
.guardian-dialog__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  width: 2.75rem;
  height: 2.75rem;
  display: grid;
  place-items: center;
  color: var(--forest-deep);
  background: var(--cream);
  border: 0;
  border-radius: 50%;
  font-size: 1.75rem;
  line-height: 1;
}
@media (max-width: 900px) {
  .guardians__heading { grid-template-columns: 1fr; gap: 1.25rem; }
  .guardians-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 639px) {
  .guardians-grid { grid-template-columns: 1fr; }
  .guardian-card__trigger { min-height: 13rem; }
  .guardian-card__hint { font-size: 0.72rem; }
}
@media (prefers-reduced-motion: reduce) {
  .guardian-card__trigger,
  .guardian-card__preview { transition: none; }
}
```

- [ ] **Step 4: Rodar os testes estruturais e confirmar GREEN**

Run:

```bash
pnpm test -- --test-name-pattern="renderiza seis cards|oferece preview"
```

Expected: 2 testes PASS, 0 FAIL.

- [ ] **Step 5: Commit isolado da interface estática**

```bash
git add index.html css/styles.css tests/guardioes.test.mjs
git commit -m "feat(guardioes): criar grade com preview acessivel"
```

---

### Task 3: Progressive enhancement do diálogo e validação final

**Files:**
- Modify: `js/ui.js:33-42`
- Test: `tests/guardioes.test.mjs`

**Interfaces:**
- Consumes: `[data-guardian-art]`, `[data-guardian-name]`, `#guardian-dialog`, `#guardian-dialog-title` e `#guardian-dialog-image` da Task 2.
- Produces: abertura/fechamento do diálogo com restauração de foco; se `showModal` não existir, mantém a navegação normal do link.

- [ ] **Step 1: Rodar o teste do diálogo e confirmar RED**

Run:

```bash
pnpm test -- --test-name-pattern="aprimora os links"
```

Expected: FAIL porque `js/ui.js` ainda não contém `showModal()`.

- [ ] **Step 2: Adicionar o comportamento do diálogo**

Antes do fechamento da IIFE em `js/ui.js`, adicionar:

```js
  // 4. Guardiões: links funcionam sem JS; com suporte, abrem a arte em diálogo.
  const guardianDialog = document.getElementById('guardian-dialog');
  const guardianDialogImage = document.getElementById('guardian-dialog-image');
  const guardianDialogTitle = document.getElementById('guardian-dialog-title');
  const guardianDialogClose = guardianDialog?.querySelector('.guardian-dialog__close');
  const guardianTriggers = document.querySelectorAll('[data-guardian-art]');
  let lastGuardianTrigger = null;

  if (guardianDialog && guardianDialogImage && guardianDialogTitle && typeof guardianDialog.showModal === 'function') {
    guardianTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        lastGuardianTrigger = trigger;
        const name = trigger.dataset.guardianName;
        guardianDialogImage.src = trigger.dataset.guardianArt;
        guardianDialogImage.alt = `Apresentação de ${name}`;
        guardianDialogTitle.textContent = `Apresentação de ${name}`;
        guardianDialog.showModal();
        guardianDialogClose?.focus();
      });
    });

    guardianDialogClose?.addEventListener('click', () => guardianDialog.close());
    guardianDialog.addEventListener('click', (event) => {
      if (event.target === guardianDialog) guardianDialog.close();
    });
    guardianDialog.addEventListener('close', () => {
      guardianDialogImage.removeAttribute('src');
      lastGuardianTrigger?.focus();
    });
  }
```

- [ ] **Step 3: Rodar todos os testes e confirmar GREEN**

Run:

```bash
pnpm test
```

Expected: 4 testes PASS, 0 FAIL.

- [ ] **Step 4: Validar contraste**

Run:

```bash
pnpm check:contrast
```

Expected: exit 0 e todos os pares reportados como `PASS`.

- [ ] **Step 5: Validar sintaxe e tamanho dos assets publicados**

Run:

```bash
node --check js/ui.js
```

Expected: exit 0, sem saída.

Run:

```bash
du -h assets/images/guardioes/*.webp
```

Expected: seis arquivos listados, todos menores que seus PNGs conforme o teste automatizado.

- [ ] **Step 6: Revisar manualmente sem e com JavaScript**

Run:

```bash
python3 -m http.server 4173
```

Verificar em 375 px, 768 px e 1440 px:

1. seis cards, na ordem aprovada, sem overflow horizontal;
2. hover e foco revelam a arte completa em desktop sem sair da viewport;
3. clique/toque abre o diálogo, `Escape`, botão e backdrop fecham;
4. o foco retorna ao card acionador;
5. com JavaScript bloqueado, o link abre o WebP diretamente;
6. com movimento reduzido, não há zoom ou transição essencial;
7. a copy pública não antecipa o que uma pessoa sentirá na Ayahuasca.

- [ ] **Step 7: Commit isolado do comportamento validado**

```bash
git add js/ui.js tests/guardioes.test.mjs
git commit -m "feat(guardioes): abrir apresentacoes em dialogo"
```

---

## Final Verification

Executar novamente, nesta ordem:

```bash
pnpm test
pnpm check:contrast
node --check js/ui.js
git diff --check
git status --short
```

Resultados exigidos:

- 4 testes PASS, 0 FAIL;
- contraste com exit 0;
- JavaScript sintaticamente válido;
- nenhum erro de whitespace;
- somente mudanças da feature e alterações preexistentes do usuário no status;
- nenhum deploy realizado.

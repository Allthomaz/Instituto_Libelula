# LP Instituto Libélula (MVP) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar a landing page temporária do Instituto Libélula (8 seções, vanilla HTML/CSS/JS, design "Templo da Floresta") e publicar na Vercel.

**Architecture:** Site estático sem build. `index.html` + `css/` + `js/` + assets WebP. Accordeons nativos `<details>`. JS mínimo (`ui.js`) para smooth-scroll, reveal-on-scroll, nav mobile e animação da libélula. Otimização de imagens one-shot via `sharp` (pnpm). Spec de referência: `docs/superpowers/specs/2026-07-08-lp-instituto-libelula-design.md`. Implementar seguindo a skill `frontend-design`, usando `docs/hero-referencia.png` + `docs/identidade-visual.md` + briefing como referência.

**Tech Stack:** HTML5 semântico, CSS (custom properties, clamp, grid/flex, @keyframes), JS vanilla (IntersectionObserver), Google Fonts (Cormorant Garamond + DM Sans), `sharp` para assets, Vercel para deploy. `pnpm` como gerenciador.

**Repo destino:** `https://github.com/Allthomaz/Instituto_Libelula.git` (hoje só tem README placeholder).

**Nota sobre "testes":** é uma LP estática sem framework de teste. Os "testes" aqui são **checks de verificação concretos**: grep de travessões, validação HTML, contraste, screenshot em 375px/768px, Lighthouse. Cada task tem seu check.

**Nota sobre commits:** o repo ainda não está conectado ao dir local. A Task 0 faz o setup do git. Commits acontecem ao longo; o push final é na Task 11. Antes do Task 0, o usuário precisa configurar git user e auth (documentado na Task 0).

---

## File Structure

| Arquivo | Responsabilidade |
|---------|------------------|
| `index.html` | Estrutura semântica de todas as 8 seções + head (meta, fonts, favicon) |
| `css/tokens.css` | Custom properties (paleta, fontes, espaçamento, breakpoints), reset, tipografia base |
| `css/styles.css` | Componentes e seções (header, hero, accordeon, cards, footer) + animações |
| `js/ui.js` | Smooth-scroll, IntersectionObserver (reveal), nav mobile, accordeon close-others |
| `scripts/optimize-assets.mjs` | Script one-shot: gera WebP das fotos + favicon/png de logo.jpg (via sharp) |
| `assets/images/hero/foto-02.webp` | Background da hero (LCP, preload) |
| `assets/images/vivencia/*.webp` | Fotos de vivência (lazy) |
| `assets/favicon/favicon-32.png`, `apple-touch-180.png` | Favicons de logo.jpg |
| `package.json` | Apenas `sharp` como devDep (tooling) |
| `.gitignore` | `node_modules/`, `*.original`, OS files |
| `vercel.json` | Headers de cache para assets |
| `README.md` | Substitui o placeholder do repo |
| `docs/superpowers/specs/*` e `docs/superpowers/plans/*` | Spec e este plano |

---

## Task 0: Setup do git, conexão ao repo e base do projeto

**Files:**
- Create: `.gitignore`, `package.json`, `README.md`
- Connect: repo `Allthomaz/Instituto_Libelula`

- [ ] **Step 0.1: Configurar git user (se ainda não configurado)**

Pergunte ao usuário o nome e e-mail, ou use os defaults do GitHub. Rodar:

```bash
git config --global user.name "Allthomaz"
git config --global user.email "<email-do-usuario-no-github>"
```

Verificar: `git config --global user.name` retorna o nome.

- [ ] **Step 0.2: Configurar autenticação para push**

`gh` não está instalado. Duas opções (o usuário escolhe):

Opção A (recomendada): instalar `gh` e logar.
```bash
# Pop!_OS/Ubuntu:
sudo apt install gh -y
gh auth login   # seguir o fluxo (HTTPS, browser)
```

Opção B: usar HTTPS com Personal Access Token (colar o token na URL de push ou no credential helper).

Verificar (opção A): `gh auth status` mostra "Logged in to github.com".

- [ ] **Step 0.3: Iniciar git e conectar o remote**

```bash
cd /home/flow/TM-System/Condado/LP-Instituto-Libelula
git init -b main
git remote add origin https://github.com/Allthomaz/Instituto_Libelula.git
git fetch origin
```

Verificar: `git remote -v` mostra o remote; `git log origin/main --oneline` mostra "Initial commit".

- [ ] **Step 0.4: Criar `.gitignore`**

```gitignore
# deps
node_modules/

# arquivos originais pesados (mantemos no repo só os WebP otimizados? decidir: manter ambos)
# descomente se quiser ignorar os PNG/JPG brutos após gerar WebP:
# assets/images/hero/foto-02.png
# assets/images/vivencia/*.jpg

# OS / editor
.DS_Store
Thumbs.db
*.swp
.vscode/
```

- [ ] **Step 0.5: Criar `package.json` via pnpm**

```bash
pnpm init
```

Editar o `package.json` gerado para ficar assim:

```json
{
  "name": "lp-instituto-libelula",
  "version": "0.1.0",
  "private": true,
  "description": "Landing page do Instituto Libélula",
  "scripts": {
    "optimize": "node scripts/optimize-assets.mjs"
  },
  "devDependencies": {}
}
```

- [ ] **Step 0.6: Criar o README real (substitui o placeholder do repo)**

Substituir o conteúdo de `README.md` (que hoje descreve só o plano) por um README de projeto:

```markdown
# Instituto Libélula — Landing Page

Landing page do Instituto Libélula (espaço de rituais com Ayahuasca, Piedade/SP).

## Stack
Vanilla HTML/CSS/JS (sem build). Deploy: Vercel.

## Desenvolvimento
Abrir `index.html` no navegador. Não há build step.

## Otimizar imagens (one-shot)
\`\`\`bash
pnpm install
pnpm optimize
\`\`\`

## Documentação
- Spec: \`docs/superpowers/specs/2026-07-08-lp-instituto-libelula-design.md\`
- Plano: \`docs/superpowers/plans/2026-07-08-lp-instituto-libelula.md\`
- Identidade visual: \`docs/identidade-visual.md\`
```

- [ ] **Step 0.7: Instalar sharp como devDep**

```bash
pnpm add -D sharp
```

Verificar: `node -e "require('sharp'); console.log('sharp OK')"` imprime "sharp OK".

- [ ] **Step 0.8: Commit inicial (sem push ainda)**

```bash
git add .gitignore package.json pnpm-lock.yaml README.md docs/
git commit -m "chore: setup do projeto (gitignore, pnpm, sharp, docs)"
```

---

## Task 1: Otimização de assets (WebP + favicon)

**Files:**
- Create: `scripts/optimize-assets.mjs`
- Generate: `assets/images/hero/foto-02.webp`, `assets/images/vivencia/*.webp`, `assets/favicon/favicon-32.png`, `assets/favicon/apple-touch-180.png`

- [ ] **Step 1.1: Criar `scripts/optimize-assets.mjs`**

```javascript
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
```

- [ ] **Step 1.2: Rodar o script**

```bash
pnpm optimize
```

- [ ] **Step 1.3: Verificar tamanhos (check)**

```bash
du -h assets/images/hero/foto-02.webp assets/images/vivencia/*.webp assets/favicon/*.png
```

Esperado: `foto-02.webp` < 400 KB (ideal ~250 KB). Se maior, baixar `quality` para 65 em `optimize-assets.mjs` e rodar de novo.

- [ ] **Step 1.4: Commit**

```bash
git add scripts/optimize-assets.mjs assets/images/hero/foto-02.webp assets/images/vivencia/*.webp assets/favicon/*.png
git commit -m "perf: assets otimizados em WebP + favicons (hero 4.4MB -> ~250KB)"
```

---

## Task 2: `css/tokens.css` (design tokens, reset, tipografia)

**Files:**
- Create: `css/tokens.css`

- [ ] **Step 2.1: Criar `css/tokens.css`**

```css
/* ==========================================================================
   Tokens — "Templo da Floresta"
   ========================================================================== */
:root {
  /* Paleta */
  --forest-deep: #0D2F1E;
  --forest: #1A4D2E;
  --forest-soft: #14382566; /* overlays */
  --gold: #FFA500;
  --gold-soft: #D4A24E;
  --earth: #8B4513;
  --metal: #708090;
  --cream: #F4EFE6;
  --white: #FFFFFF;

  /* Semânticos */
  --bg: var(--forest-deep);
  --bg-section: var(--forest);
  --fg: var(--white);
  --fg-soft: var(--cream);
  --accent: var(--gold);
  --accent-soft: var(--gold-soft);
  --card: #102d1d;
  --border: #ffffff14;

  /* Tipografia */
  --font-display: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --font-body: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;

  /* Escala fluida */
  --fs-h1: clamp(2.75rem, 1.5rem + 5vw, 5.5rem);
  --fs-h2: clamp(1.75rem, 1.2rem + 2vw, 3rem);
  --fs-h3: clamp(1.25rem, 1rem + 1vw, 1.75rem);
  --fs-body: clamp(1rem, 0.95rem + 0.2vw, 1.125rem);
  --fs-lead: clamp(1.125rem, 1rem + 0.5vw, 1.5rem);

  /* Espaçamento */
  --space-section: clamp(4rem, 3rem + 5vw, 8rem);
  --container: 1200px;
  --radius: 10px;
  --radius-lg: 18px;

  /* Transições */
  --t-fast: 200ms ease;
  --t-med: 400ms ease;
}

/* Reset enxuto */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
img, svg { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; }
h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 600; line-height: 1.1; }

/* Container */
.container { width: 100%; max-width: var(--container); margin: 0 auto; padding: 0 1.25rem; }

/* Título com gradiente dourado -> verde */
.text-gradient {
  background: linear-gradient(100deg, var(--gold-soft) 0%, var(--gold) 35%, var(--forest) 90%);
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
}

/* Grain overlay sutil (textura sagrada) */
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 9998; pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Acessibilidade: focus visível dourado */
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }

/* Skip link */
.skip-link {
  position: absolute; top: -100%; left: 50%; transform: translateX(-50%);
  background: var(--accent); color: var(--forest-deep);
  padding: 0.6rem 1.25rem; border-radius: 0 0 8px 8px; z-index: 10000; font-weight: 600;
}
.skip-link:focus { top: 0; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 2.2: Commit**

```bash
git add css/tokens.css
git commit -m "feat(tokens): design tokens, reset, tipografia fluida, grain overlay"
```

---

## Task 3: `index.html` head + Header/Nav

**Files:**
- Create: `index.html` (começa aqui, cresce nas próximas tasks)

- [ ] **Step 3.1: Criar `index.html` com head completo e header**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Instituto Libélula · Espaço de rituais e autoconhecimento | Piedade/SP</title>
  <meta name="description" content="Instituto Libélula: espaço de cura, autoconhecimento e reconexão em Piedade/SP. Medicinas da floresta, soundhealing e respiração em rituais laicos e universalistas.">
  <meta name="theme-color" content="#0D2F1E">
  <meta property="og:title" content="Instituto Libélula">
  <meta property="og:description" content="Medicina do som, da respiração e da floresta a serviço da saúde mental.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="assets/images/hero/foto-02.webp">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">

  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32.png">
  <link rel="apple-touch-icon" href="assets/favicon/apple-touch-180.png">

  <link rel="preload" as="image" href="assets/images/hero/foto-02.webp" fetchpriority="high">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Pular para o conteúdo</a>

  <header class="site-header" id="topo">
    <div class="container site-header__inner">
      <a href="#topo" class="brand" aria-label="Instituto Libélula, início">
        <img src="assets/images/logo/logo.jpg" alt="" width="44" height="44" class="brand__logo">
        <span class="brand__name">Instituto Libélula</span>
      </a>

      <nav class="nav" aria-label="Navegação principal">
        <a href="#sobre" class="nav__link">Sobre</a>
        <a href="#pilares" class="nav__link">Vivências</a>
        <a href="#medicinas" class="nav__link">Medicinas</a>
        <a href="#rituais" class="nav__link">Rituais</a>
        <a href="#contato" class="nav__link">Contato</a>
      </nav>

      <a href="https://wa.me/5511933977438" class="btn btn--primary nav__cta"
         target="_blank" rel="noopener noreferrer">Fale Conosco</a>

      <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav-mobile">
        <span></span><span></span><span></span>
      </button>
    </div>

    <nav class="nav-mobile" id="nav-mobile" aria-label="Navegação mobile" hidden>
      <a href="#sobre" class="nav-mobile__link">Sobre</a>
      <a href="#pilares" class="nav-mobile__link">Vivências</a>
      <a href="#medicinas" class="nav-mobile__link">Medicinas</a>
      <a href="#rituais" class="nav-mobile__link">Rituais</a>
      <a href="#contato" class="nav-mobile__link">Contato</a>
    </nav>
  </header>

  <main id="main">
    <!-- HERO entra na Task 4 -->
  </main>

  <script src="js/ui.js" defer></script>
</body>
</html>
```

- [ ] **Step 3.2: Commit**

```bash
git add index.html
git commit -m "feat(html): head SEO/OG, fontes, favicon, header + nav (desktop e mobile)"
```

---

## Task 4: Hero (HTML + CSS)

**Files:**
- Modify: `index.html` (insere a `<section class="hero">` dentro de `<main>`)
- Create: `css/styles.css` (começa aqui)

- [ ] **Step 4.1: Inserir a hero no `index.html`**

Substituir o comentário `<!-- HERO entra na Task 4 -->` por:

```html
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="hero__overlay" aria-hidden="true"></div>

      <!-- Libélula SVG (momento memorável) -->
      <svg class="libelula" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
          <ellipse cx="30" cy="20" rx="1.6" ry="9"/>
          <path d="M30 14 C 22 4, 14 6, 16 14 C 14 16, 8 18, 30 16"/>
          <path d="M30 14 C 38 4, 46 6, 44 14 C 46 16, 52 18, 30 16"/>
          <path d="M30 24 C 24 32, 18 30, 20 24"/>
          <path d="M30 24 C 36 32, 42 30, 40 24"/>
        </g>
      </svg>

      <div class="container hero__content">
        <h1 id="hero-title" class="hero__title text-gradient">Instituto Libélula</h1>
        <p class="hero__subtitle">Medicina do som, da respiração e da floresta a serviço da saúde mental.</p>

        <div class="hero__ctas">
          <a href="#sobre" class="btn btn--primary">Conheça o Instituto</a>
          <a href="https://wa.me/5511933977438" class="btn btn--ghost" target="_blank" rel="noopener noreferrer">Agendar Conversa</a>
        </div>
      </div>

      <ul class="pillars-strip" aria-label="Nossos três pilares">
        <li class="pillars-strip__item">
          <span class="pillars-strip__icon" aria-hidden="true">🌿</span>
          <span class="pillars-strip__label">Medicinas da Floresta</span>
        </li>
        <li class="pillars-strip__item">
          <span class="pillars-strip__icon" aria-hidden="true">🎵</span>
          <span class="pillars-strip__label">Terapias Integrativas</span>
        </li>
        <li class="pillars-strip__item">
          <span class="pillars-strip__icon" aria-hidden="true">🌙</span>
          <span class="pillars-strip__label">Caminho de Acompanhamento</span>
        </li>
      </ul>

      <aside class="contact-card" aria-label="Contato do facilitador">
        <p class="contact-card__name">Thiago Biral</p>
        <p class="contact-card__role">Txi Ruas, Facilitador das Vivências</p>
        <p class="contact-card__links">
          <a href="mailto:suportetxibiral@gmail.com">suportetxibiral@gmail.com</a>
          <a href="https://wa.me/5511933977438" target="_blank" rel="noopener noreferrer">WhatsApp +55 11 93397-7438</a>
        </p>
      </aside>
    </section>
```

- [ ] **Step 4.2: Criar `css/styles.css` com botões + header + hero**

```css
/* Botões */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 48px; padding: 0.75rem 1.5rem; border-radius: var(--radius);
  font-weight: 500; transition: transform var(--t-fast), background var(--t-fast), box-shadow var(--t-fast);
}
.btn--primary { background: var(--accent); color: var(--forest-deep); }
.btn--primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px #ffa50033; }
.btn--ghost { background: transparent; color: var(--fg); border: 1.5px solid var(--accent-soft); }
.btn--ghost:hover { transform: translateY(-2px); border-color: var(--accent); }

/* Header */
.site-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: #0d2f1eb3; backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}
.site-header__inner { display: flex; align-items: center; gap: 1.5rem; height: 72px; }
.brand { display: flex; align-items: center; gap: 0.6rem; }
.brand__logo { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.brand__name { font-family: var(--font-display); font-size: 1.25rem; font-weight: 600; }
.nav { display: flex; gap: 1.75rem; margin-left: auto; }
.nav__link { font-size: 0.95rem; color: var(--fg-soft); position: relative; padding: 0.25rem 0; }
.nav__link::after {
  content: ''; position: absolute; left: 0; bottom: -2px; height: 1.5px; width: 0;
  background: var(--accent); transition: width var(--t-fast);
}
.nav__link:hover { color: var(--fg); }
.nav__link:hover::after { width: 100%; }
.nav__cta { margin-left: 0.5rem; }
.nav-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: 0; padding: 8px; }
.nav-toggle span { width: 24px; height: 2px; background: var(--fg); }

/* Hero */
.hero {
  position: relative; min-height: 100svh; display: flex; align-items: center;
  padding: 7rem 0 6rem; overflow: hidden;
}
.hero__bg {
  position: absolute; inset: 0; z-index: -2;
  background: url('../assets/images/hero/foto-02.webp') center/cover no-repeat;
}
.hero__overlay {
  position: absolute; inset: 0; z-index: -1;
  background: linear-gradient(100deg, rgba(13,47,30,.82) 0%, rgba(13,47,30,.55) 55%, rgba(13,47,30,.35) 100%);
}
.hero__content { max-width: 640px; }
.hero__title { font-size: var(--fs-h1); font-weight: 700; letter-spacing: -0.01em; }
.hero__subtitle { font-size: var(--fs-lead); color: var(--fg-soft); margin-top: 1rem; max-width: 30ch; }
.hero__ctas { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; }

/* Strip dos pilares */
.pillars-strip {
  position: absolute; left: 1.25rem; bottom: 2rem; z-index: 2;
  display: flex; flex-wrap: wrap; gap: 2rem; list-style: none;
}
.pillars-strip__item { display: flex; align-items: center; gap: 0.5rem; }
.pillars-strip__icon { font-size: 1.4rem; }
.pillars-strip__label { font-size: 0.9rem; color: var(--fg-soft); }

/* Caixa de contato */
.contact-card {
  position: absolute; right: 1.25rem; bottom: 2rem; z-index: 2;
  background: #0d2f1ee6; border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem; max-width: 280px;
}
.contact-card__name { font-family: var(--font-display); font-size: 1.3rem; }
.contact-card__role { color: var(--accent-soft); font-size: 0.9rem; margin-top: 0.15rem; }
.contact-card__links { display: flex; flex-direction: column; gap: 0.35rem; margin-top: 0.75rem; font-size: 0.85rem; }
.contact-card__links a:hover { color: var(--accent); }

/* Libélula */
.libelula {
  position: absolute; width: 56px; color: var(--gold); z-index: 1; opacity: 0.85;
  offset-path: path('M -40 220 C 200 80, 520 320, 760 140 S 1100 260, 1320 120');
  animation: voar 22s linear infinite;
}
@keyframes voar { to { offset-distance: 100%; } }

/* Mobile: header colapsa, hero empilha */
@media (max-width: 860px) {
  .nav, .nav__cta { display: none; }
  .nav-toggle { display: flex; margin-left: auto; }
  .pillars-strip { position: static; padding: 0 1.25rem; margin-top: 2.5rem; }
  .contact-card { position: static; margin: 2rem 1.25rem 0; max-width: none; }
  .hero { padding-top: 6rem; }
}
```

- [ ] **Step 4.3: Check visual (abrir no navegador)**

Abrir `index.html` no navegador. Esperado: hero com bg da floresta + overlay, título gradiente à esquerda, CTAs, strip de pilares embaixo, caixa de contato à direita, libélula voando.

- [ ] **Step 4.4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat(hero): seção hero completa, libélula SVG animada, nav mobile"
```

---

## Task 5: Stagger de load + reveal on scroll (CSS)

**Files:**
- Modify: `css/styles.css` (acrescentar animações de load e reveal)

- [ ] **Step 5.1: Acrescentar animações no fim de `css/styles.css`**

```css
/* Stagger de load da hero */
.hero__content > * { opacity: 0; animation: fadeUp 0.7s ease forwards; }
.hero__content > *:nth-child(1) { animation-delay: 0.15s; }
.hero__content > *:nth-child(2) { animation-delay: 0.35s; }
.hero__content > *:nth-child(3) { animation-delay: 0.55s; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

/* Reveal on scroll (controlado por .is-visible adicionado via IntersectionObserver) */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.is-visible { opacity: 1; transform: translateY(0); }

/* reduced motion: desliga stagger, reveal e libélula */
@media (prefers-reduced-motion: reduce) {
  .hero__content > * { opacity: 1; animation: none; }
  .reveal { opacity: 1; transform: none; transition: none; }
  .libelula { display: none; }
}
```

- [ ] **Step 5.2: Check (reload)**

Recarregar a página. Esperado: elementos da hero sobem com fade em cascata. Quem tem `prefers-reduced-motion` ligado vê tudo estático, sem libélula.

- [ ] **Step 5.3: Commit**

```bash
git add css/styles.css
git commit -m "feat(anim): stagger no load da hero + reveal on scroll + reduced-motion"
```

---

## Task 6: Seções Sobre + Os 3 Pilares

**Files:**
- Modify: `index.html` (inserir após a `</section>` da hero, dentro de `<main>`)

- [ ] **Step 6.1: Inserir Sobre e Pilares no `index.html`**

```html
    <section id="sobre" class="section section--alt" aria-labelledby="sobre-title">
      <div class="container">
        <h2 id="sobre-title" class="section__title reveal">Sobre o Instituto Libélula</h2>
        <p class="lead reveal">
          O Instituto Libélula é um espaço de cura, autoconhecimento e reconexão. Nossa proposta é
          universalista: compreendemos que a busca pelo sagrado e pelo bem-estar não depende de dogmas,
          mas da experiência direta do indivíduo com sua própria essência. Atuamos com ferramentas
          ancestrais e contemporâneas em um ambiente seguro, pautado pelo acolhimento, pela ética e pelo
          respeito à diversidade. Aqui, cada jornada é única.
        </p>
      </div>
    </section>

    <section id="pilares" class="section" aria-labelledby="pilares-title">
      <div class="container">
        <h2 id="pilares-title" class="section__title reveal">Os três pilares</h2>
        <div class="pillars">
          <article class="pillar reveal">
            <span class="pillar__icon" aria-hidden="true">🌿</span>
            <h3 class="pillar__title">Medicinas da Floresta</h3>
            <p class="pillar__text">O ritual sagrado, o coração da vivência: Ayahuasca, Rapé e Sananga.</p>
          </article>
          <article class="pillar reveal">
            <span class="pillar__icon" aria-hidden="true">🎵</span>
            <h3 class="pillar__title">Terapias Integrativas</h3>
            <p class="pillar__text">Ferramentas de acesso que preparam o corpo e o campo: soundhealing e respiração.</p>
          </article>
          <article class="pillar reveal">
            <span class="pillar__icon" aria-hidden="true">🌙</span>
            <h3 class="pillar__title">Caminho de Acompanhamento</h3>
            <p class="pillar__text">A jornada contínua que não acaba no ritual, começa: integração, astrologia, comunidade.</p>
          </article>
        </div>
      </div>
    </section>
```

- [ ] **Step 6.2: Acrescentar CSS de seção/pilares em `css/styles.css`**

```css
.section { padding: var(--space-section) 0; }
.section--alt { background: var(--bg-section); }
.section__title { font-size: var(--fs-h2); margin-bottom: 1.5rem; }
.lead { font-size: var(--fs-lead); color: var(--fg-soft); max-width: 65ch; }

.pillars { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.pillar {
  background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 2rem; transition: transform var(--t-fast), box-shadow var(--t-fast);
}
.pillar:hover { transform: translateY(-4px); box-shadow: 0 16px 40px #00000040; }
.pillar__icon { font-size: 2rem; }
.pillar__title { font-size: var(--fs-h3); margin: 0.75rem 0 0.5rem; }
.pillar__text { color: var(--fg-soft); }
```

- [ ] **Step 6.3: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat(secoes): sobre o instituto + os tres pilares"
```

---

## Task 7: Accordeons (Medicinas + Terapias + Guardiões) com textos mescla

**Files:**
- Modify: `index.html` (inserir as três seções de accordeon)
- Modify: `css/styles.css` (estilos do accordeon)

> **Atenção (regra de ouro):** os textos abaixo são a redação mescla (base descritiva + benefícios suavizados, sem travessões, preservando o Zero Condicionamento). **Devem ser aprovados pelo Thiago/usuário antes de ir ao ar.**

- [ ] **Step 7.1: Inserir as três seções no `index.html`**

```html
    <section id="medicinas" class="section section--alt" aria-labelledby="medicinas-title">
      <div class="container">
        <h2 id="medicinas-title" class="section__title reveal">Medicinas da Floresta</h2>
        <p class="reveal intro-acc">Toque em cada medicina para conhecer. Cada vivência é única: não dizemos o que você vai sentir.</p>

        <div class="accordion reveal">
          <details class="acc">
            <summary class="acc__summary">Ayahuasca <span class="acc__icon" aria-hidden="true">▸</span></summary>
            <div class="acc__body">
              <p><strong>Ayahuasca: a medicina da expansão.</strong></p>
              <p>A Ayahuasca é uma medicina ancestral, utilizada por povos indígenas da Amazônia há séculos. Preparada a partir de duas plantas, é servida em rituais sagrados como ferramenta de autoconhecimento, cura e conexão. No Instituto Libélula, a consagramos com respeito, intenção e cuidado.</p>
              <p>Atua como uma ponte para o mundo interior. Seu trabalho mais profundo costuma aparecer na clareza que chega depois, e não em "ver coisas":</p>
              <ul>
                <li><strong>Reprocessamento emocional:</strong> pode auxiliar a acessar e ressignificar memórias, crenças e emoções estagnadas.</li>
                <li><strong>Liberação pelo corpo:</strong> o corpo às vezes guarda o que a mente já esqueceu; a medicina pode ajudar a liberar tensões (por tremores, bocejos, choro ou purga).</li>
                <li><strong>Clareza de propósito:</strong> ao silenciar o ruído externo, pode afiar a intuição e organizar pensamentos.</li>
              </ul>
              <p class="acc__nota">Cada vivência é única. É por isso que não dizemos o que você vai sentir. A jornada é sua.</p>
            </div>
          </details>

          <details class="acc">
            <summary class="acc__summary">Rapé <span class="acc__icon" aria-hidden="true">▸</span></summary>
            <div class="acc__body">
              <p><strong>Rapé: a medicina do aterramento e do silêncio mental.</strong></p>
              <p>O Rapé é um pó sagrado de origem indígena, preparado a partir de plantas medicinais e cinzas de árvores. No Instituto, é utilizado como ferramenta de limpeza e foco.</p>
              <p>É a medicina da presença absoluta, um ancoradouro quando a mente tenta fugir para o passado ou para o futuro:</p>
              <ul>
                <li><strong>Aterramento imediato:</strong> ajuda a trazer a energia vital de volta ao corpo e ao chão, cortando padrões de pensamento repetitivos.</li>
                <li><strong>Foco e centramento:</strong> ao limpar o campo mental, gera um estado de alerta relaxado, desperto e consciente do corpo e da respiração.</li>
                <li><strong>Desobstrução:</strong> atua na limpeza das vias respiratórias e alivia tensões na cabeça, pescoço e ombros.</li>
              </ul>
              <p class="acc__nota">Cada vivência é única. Não dizemos o que você vai sentir. A jornada é sua.</p>
            </div>
          </details>

          <details class="acc">
            <summary class="acc__summary">Sananga <span class="acc__icon" aria-hidden="true">▸</span></summary>
            <div class="acc__body">
              <p><strong>Sananga: a medicina do fogo frio e da resiliência.</strong></p>
              <p>A Sananga é uma medicina tradicional das tribos amazônicas, aplicada como gotas nos olhos. É reconhecida pela limpeza profunda, física e energética.</p>
              <p>Ela ensina o corpo a relaxar diante do desconforto. O ardor dos primeiros minutos cede lugar a um relaxamento profundo:</p>
              <ul>
                <li><strong>Reset do sistema nervoso:</strong> após o pico, ativa o sistema parassimpático, como se o corpo inteiro "suspirasse".</li>
                <li><strong>Desbloqueio emocional:</strong> os olhos são janelas emocionais; o estímulo costuma ajudar a liberar lágrimas contidas e tristezas represadas.</li>
                <li><strong>Clareza visual e mental:</strong> além do cuidado tradicional com os olhos, promove a "visão clara", dissolvendo a confusão mental.</li>
              </ul>
              <p class="acc__nota">Cada vivência é única. Não dizemos o que você vai sentir. A jornada é sua.</p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="terapias" class="section" aria-labelledby="terapias-title">
      <div class="container">
        <h2 id="terapias-title" class="section__title reveal">Terapias Integrativas</h2>
        <div class="accordion reveal">
          <details class="acc">
            <summary class="acc__summary">Soundhealing <span class="acc__icon" aria-hidden="true">▸</span></summary>
            <div class="acc__body">
              <p><strong>Soundhealing: a afinação do corpo.</strong></p>
              <p>O Soundhealing é uma jornada de imersão sonora que utiliza frequências de instrumentos ancestrais (taças, gongos, tambores, didgeridoo) para induzir relaxamento e harmonia.</p>
              <p>O som viaja pela água e pelos ossos do corpo. É o alicerce do relaxamento e prepara o terreno interno de forma calma e segura:</p>
              <ul>
                <li><strong>Sincronização de ondas cerebrais:</strong> as frequências guiam o cérebro do estado de alerta para o relaxamento profundo e a meditação.</li>
                <li><strong>Alívio do estresse:</strong> a vibração física massageia o sistema nervoso e reduz o cortisol.</li>
                <li><strong>Ancoragem:</strong> durante o pico da força, o som contínuo serve como corda de segurança, um ponto de retorno para a mente.</li>
              </ul>
              <p>Imagine o corpo como um instrumento que, com o tempo e o estresse, vai se desafinando. O Soundhealing é um momento para se deitar, fechar os olhos e permitir que os sons ajudem o corpo a se reorganizar. Não é preciso acreditar em nada, nem fazer esforço.</p>
              <p class="acc__nota">Cada experiência é única. É menos sobre entender e mais sobre sentir.</p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <section id="guardioes" class="section section--alt" aria-labelledby="guardioes-title">
      <div class="container">
        <h2 id="guardioes-title" class="section__title reveal">Guardiões dos Rituais</h2>
        <div class="accordion reveal">
          <details class="acc">
            <summary class="acc__summary">A função dos Guardiões <span class="acc__icon" aria-hidden="true">▸</span></summary>
            <div class="acc__body">
              <p>Nossos facilitadores e guardiões são responsáveis por manter o campo de segurança e a egrégora do Instituto. Têm anos de estudo, prática e vivência com as medicinas e técnicas que utilizamos.</p>
              <p>O papel do Guardião não é "curar" você. É criar o espaço seguro, o suporte necessário e o olhar atento para que você mesmo realize a sua cura e o seu processo de autotransformação.</p>
            </div>
          </details>
        </div>
      </div>
    </section>
```

- [ ] **Step 7.2: Acrescentar CSS do accordeon em `css/styles.css`**

```css
.intro-acc { color: var(--fg-soft); margin-bottom: 1.5rem; max-width: 60ch; }
.accordion { display: flex; flex-direction: column; gap: 0.75rem; }
.acc { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.acc__summary {
  list-style: none; cursor: pointer; padding: 1.1rem 1.4rem;
  font-family: var(--font-display); font-size: 1.3rem; display: flex; justify-content: space-between; align-items: center;
}
.acc__summary::-webkit-details-marker { display: none; }
.acc__icon { color: var(--accent); transition: transform var(--t-fast); }
.acc[open] .acc__icon { transform: rotate(90deg); }
.acc__body { padding: 0 1.4rem 1.4rem; color: var(--fg-soft); display: flex; flex-direction: column; gap: 0.75rem; }
.acc__body ul { padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; }
.acc__body strong { color: var(--fg); }
.acc__nota { color: var(--accent-soft); font-style: italic; }
```

- [ ] **Step 7.3: Check de travessões (regra de ouro)**

```bash
grep -rn '—' index.html
```

Esperado: nenhuma ocorrência. (Os hífens duplos `--` em "fogo frio" não existem; revisar se o grep acusar algo.)

- [ ] **Step 7.4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat(conteudo): accordeons de medicinas, terapias e guardioes com textos mescla"
```

---

## Task 8: Rituais + Valores + Contato + Footer

**Files:**
- Modify: `index.html` (inserir antes de `</main>` e adicionar `<footer>`)

- [ ] **Step 8.1: Inserir Rituais/Valores, Contato e Footer no `index.html`**

Antes de `</main>`, inserir:

```html
    <section id="rituais" class="section" aria-labelledby="rituais-title">
      <div class="container">
        <h2 id="rituais-title" class="section__title reveal">Próximos rituais e valores</h2>
        <div class="info-grid">
          <div class="info-card reveal">
            <h3 class="info-card__title">Quando</h3>
            <p>25 de julho (dia fora do tempo). Depois, todo primeiro sábado do mês.</p>
          </div>
          <div class="info-card reveal">
            <h3 class="info-card__title">Valores</h3>
            <p>R$ 180 antecipado · R$ 210 no dia. 30 vagas. Pagamento por Pix.</p>
            <p class="info-card__nota">Pagamento online (Mercado Pago) em breve.</p>
          </div>
          <div class="info-card reveal">
            <h3 class="info-card__title">Onde</h3>
            <p>Chácara Aurora Austral, Piedade/SP.</p>
          </div>
        </div>
        <p class="reveal"><a href="https://wa.me/5511933977438" class="btn btn--primary" target="_blank" rel="noopener noreferrer">Reservar uma vaga</a></p>
      </div>
    </section>

    <section id="contato" class="section section--alt" aria-labelledby="contato-title">
      <div class="container contato">
        <div class="reveal">
          <h2 id="contato-title" class="section__title">Contato</h2>
          <p class="lead">Fale com Thiago Biral, Txi Ruas, facilitador das vivências.</p>
          <ul class="contato__list">
            <li><a href="https://wa.me/5511933977438" target="_blank" rel="noopener noreferrer">WhatsApp: +55 11 93397-7438</a></li>
            <li><a href="mailto:suportetxibiral@gmail.com">suportetxibiral@gmail.com</a></li>
          </ul>
          <p class="contato__comunidades">Também fazemos parte de comunidades no WhatsApp. Chame no contato acima para participar.</p>
        </div>
        <a href="https://wa.me/5511933977438" class="btn btn--primary contato__cta reveal" target="_blank" rel="noopener noreferrer">Agendar Conversa</a>
      </div>
    </section>
```

Antes de `</body>` (depois de `</main>`), inserir o footer:

```html
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p class="site-footer__brand">Instituto Libélula</p>
      <p class="site-footer__copy">Piedade/SP · Rituais laicos e universalistas. Cada jornada é única.</p>
    </div>
  </footer>
```

- [ ] **Step 8.2: Acrescentar CSS dessas seções em `css/styles.css`**

```css
.info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
.info-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.75rem; }
.info-card__title { font-size: var(--fs-h3); margin-bottom: 0.5rem; color: var(--accent-soft); }
.info-card p + p { margin-top: 0.5rem; }
.info-card__nota { font-size: 0.85rem; color: var(--fg-soft); }

.contato { display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
.contato__list { list-style: none; margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
.contato__list a:hover { color: var(--accent); }
.contato__comunidades { color: var(--fg-soft); margin-top: 1rem; max-width: 50ch; }

.site-footer { border-top: 1px solid var(--border); padding: 2rem 0; }
.site-footer__inner { display: flex; flex-direction: column; gap: 0.25rem; }
.site-footer__brand { font-family: var(--font-display); font-size: 1.2rem; }
.site-footer__copy { color: var(--fg-soft); font-size: 0.9rem; }
```

- [ ] **Step 8.3: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat(secoes): rituais/valores, contato e footer"
```

---

## Task 9: `js/ui.js` (interações)

**Files:**
- Create: `js/ui.js`

- [ ] **Step 9.1: Criar `js/ui.js`**

```javascript
(() => {
  'use strict';

  // 1. Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // 2. Nav mobile
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  if (toggle && mobile) {
    const closeMenu = () => { mobile.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const open = mobile.hidden;
      mobile.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });
    mobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  }

  // 3. Accordeon: fechar os outros ao abrir um (opcional, UX)
  document.querySelectorAll('.accordion').forEach((group) => {
    const items = group.querySelectorAll('details');
    items.forEach((d) => {
      d.addEventListener('toggle', () => {
        if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
      });
    });
  });

  // 4. Smooth-scroll para âncoras (fallback além do scroll-behavior)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) { ev.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });
})();
```

- [ ] **Step 9.2: Check (interações)**

Recarregar. Esperado: ao rolar, as seções com `.reveal` surgem com fade. Menu mobile abre/fecha ao clicar no hambúrguer. Accordeons: abrir um fecha os outros do mesmo grupo.

- [ ] **Step 9.3: Commit**

```bash
git add js/ui.js
git commit -m "feat(js): reveal on scroll, nav mobile, accordeon close-others, smooth-scroll"
```

---

## Task 10: A11y, responsividade e performance (verificações finais)

- [ ] **Step 10.1: Validar HTML**

Colar o `index.html` em https://validator.w3.org/ (ou rodar `npx html-validator-cli` se preferir). Esperado: sem erros.

- [ ] **Step 10.2: Responsividade 375px e 768px**

No DevTools, testar 375px (iPhone SE) e 768px (iPad). Esperado: sem overflow horizontal, nav vira hambúrguer, hero empilha, caixa de contato e strip abaixo do conteúdo.

- [ ] **Step 10.3: Contraste WCAG AA**

Verificar (WebAIM Contrast Checker ou DevTools): `--white`/`--cream` sobre `--forest-deep` ≥ 4.5:1. Ajustar se preciso.

- [ ] **Step 10.4: Tab order e focus**

Teclar Tab do topo. Esperado: skip-link aparece primeiro; todos os links/botões/accordeons recebem o outline dourado.

- [ ] **Step 10.5: Lighthouse**

Rodar Lighthouse (Chrome DevTools) em mobile. Metas: Performance ≥ 90, Acessibilidade ≥ 95, SEO ≥ 95. Se Performance < 90, revisar tamanho do `foto-02.webp` (Task 1) e o `preload`.

- [ ] **Step 10.6: Check final de travessões e invariante**

```bash
grep -rn '—' index.html css/ js/
```
Esperado: nenhuma ocorrência. Confirmar que toda copy de medicinas preserva o espírito de "não dizemos o que você vai sentir".

- [ ] **Step 10.7: Commit (se houve ajustes)**

```bash
git add -A
git commit -m "polish: ajustes de a11y, responsividade e performance"
```

---

## Task 11: Deploy na Vercel + push final

- [x] **Step 11.1: Criar `vercel.json`**

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

- [x] **Step 11.2: Push para o repo (mesclando o README placeholder)**

```bash
git add vercel.json
git commit -m "chore: vercel.json com cache de assets"
git pull origin main --allow-unrelated-histories --no-edit -X ours
git push -u origin main
```

O `-X ours` mantém nosso README quando houver conflito com o placeholder do repo. Verificar: `git log --oneline -5` e o repo no GitHub mostra os arquivos.

- [x] **Step 11.3: Deploy Vercel**

Opção A (CLI): `npx vercel` na raiz, seguir o fluxo (linkar/importar projeto, output dir = `.`, build command vazio).
Opção B (dashboard): em https://vercel.com/new, importar o repo `Allthomaz/Instituto_Libelula`, framework "Other", deploy.

Verificar: URL `*.vercel.app` abre a LP. Hero carrega rápido (LCP), libélula voa, accordeons funcionam, responsivo.

- [x] **Step 11.4: Atualizar status no README/CLAUDE.md**

Marcar o MVP como publicado (atualizar a seção Status do `README.md` e do `CLAUDE.md` do projeto).

---

## Self-Review (feito após escrever o plano)

1. **Spec coverage:** cada seção da spec (8 seções MVP, identidade, animações, accordeons clicáveis, a11y, performance, v2/Mercado Pago) tem task correspondente. Zero Condicionamento e regra de travessões verificados em tasks 7 e 10. Guardiões incluído (Task 7). Logo/favicon (Task 1). CTAs/WhatsApp (Tasks 3, 4, 8).
2. **Placeholder scan:** sem "TBD"/"TODO". Os textos das medicinas estão completos (redação mescla real), com gate explícito de aprovação do Thiago (não é placeholder, é conteúdo sujeito a aprovação).
3. **Type/consistência:** nomes de classes (`hero__content`, `acc__summary`, `reveal`, `is-visible`, `pillars-strip`) consistentes entre HTML, CSS e JS. IDs de seção (`#sobre`, `#medicinas`, etc.) batem com os `href` da nav. WhatsApp `5511933977438` consistente em todos os CTAs.

Sem correções inline necessárias.

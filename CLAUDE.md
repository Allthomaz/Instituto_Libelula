# LP Instituto Libélula — Condado

> **Bridge Meu-Saber ↔ Condado.** Antes de codar, ler:
> - Briefing: `~/TM-System/Meu-Saber/Instituto-Libelula/output/landing-page-instituto.md` (matéria-prima + textos autorais do Thiago)
> - Spec deste repo: `docs/spec.md` · Identidade: `docs/identidade-visual.md`

## O que é
Landing page **temporária** do Instituto Libélula (espaço de rituais com Ayahuasca, Piedade/SP). Presença online + página de informações (o que o Thiago pediu na reunião 06/07 20h30). **Não é o site completo** — esse vem depois, com captação.

## Stack
- **Vanilla HTML/CSS/JS** — sem framework, sem build. Padrão `../LP-Equilibre/`.
- **Deploy:** Vercel.
- **Sem backend / sem pagamento online** (CNPJ não aberto → Pix manual).

## 🥇 Invariante de produto (NÃO NEGOCIÁVEL)
**ZERO CONDICIONAMENTO** — nenhuma copy pode induzir/criar expectativa sobre o que o participante vai sentir na Ayahuasca. Os textos autorais do Thiago (no briefing) já respeitam (*"não dizemos o que você vai sentir. A jornada é sua."*). **Toda nova copy passa por este crivo.** Ver `docs/spec.md`.

## Narrativa (os 3 pilares)
1. 🌿 **Medicinas da Floresta** — Ayahuasca, Rapé, Sananga.
2. 🎵 **Terapias Integrativas** — Soundhealing + Respiração.
3. 🌙 **Caminho de Acompanhamento** — Integração, Astrologia, Comunidade terapêutica, CNV.

## Estrutura
- `index.html` — hero + 8 seções; **medicinas/terapias = `<details>` expansíveis**.
- `css/tokens.css` (paleta/reset/tipografia) + `css/styles.css` (componentes/seções/animações).
- `js/ui.js` — reveal on scroll, nav mobile, accordeon close-others, smooth-scroll.
- `scripts/optimize-assets.mjs` (WebP+favicons via sharp) + `scripts/check-contrast.js` (WCAG).
- `assets/images/{hero,logo,vivencia,pilares}/` — imagens.
- `docs/` — spec, identidade visual, planos, referências.

## Estado
🟢 **LP implementada e no GitHub** (`main` · repo `Allthomaz/Instituto_Libelula`). 8 seções vanilla HTML/CSS/JS, assets WebP otimizados (hero 4.4MB→116KB), a11y WCAG AA, sem build. **Deploy Vercel pendente** (importar o repo em vercel.com/new). Spec: `docs/superpowers/specs/` · Plano: `docs/superpowers/plans/`.

## Contato do Thiago (caixa da hero + seção Contato)
`suportetxibiral@gmail.com` · WhatsApp **+55 11 93397-7438** · *"Thiago Biral / Txi Ruas — Facilitador das Vivências"*.

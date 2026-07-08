# Design — LP Instituto Libélula (MVP)

> **Data:** 2026-07-08 · **Status:** aprovado em brainstorming, aguardando criação do repo · **Skill de implementação:** `frontend-design` (com as referências deste projeto).
>
> **Relacionados:** `docs/spec.md` · `docs/identidade-visual.md` · `docs/hero-referencia.png` · briefing em `~/TM-System/Meu-Saber/Instituto-Libelula/output/landing-page-instituto.md`

---

## 1. Contexto

Landing page **temporária e simples** do Instituto Libélula (espaço de rituais com Ayahuasca, Piedade/SP). Presença online + página de informações. **Não é o site completo** (esse vem depois, com captação e Mercado Pago). Stack: vanilla HTML/CSS/JS, sem build, deploy Vercel, sem backend. Padrão `../LP-Equilibre/`.

---

## 2. Invariante e regras de copy (NÃO NEGOCIÁVEIS)

1. **Zero Condicionamento:** nenhuma copy induz ou cria expectativa sobre o que o participante vai sentir na Ayahuasca. Todo texto termina/respeita o espírito de *"não dizemos o que você vai sentir. A jornada é sua."*
2. **Zero travessões (`—`):** nenhum em-dash em nenhuma copy. É um marcador que denuncia texto gerado por IA. Usar `:`, `,`, `.` ou `·` no lugar.
3. **Fidelidade ao Thiago:** os textos-base são autorais do Thiago (no briefing). Toda redação/mescla parte deles, sem inventar afirmações novas.

---

## 3. Decisões fechadas (brainstorming 2026-07-08)

| # | Decisão | Resolução |
|---|---------|-----------|
| 1 | Subtítulo da hero | *"Medicina do som, da respiração e da floresta a serviço da saúde mental."* (sem tagline) |
| 2 | Textos das medicinas | Mescla: base descritiva + pontos de benefício, sem prometer ao indivíduo, sem travessões, mantém o statement de Zero Condicionamento. Redigidos na implementação com gate de aprovação |
| 3 | CTAs da hero | *"Conheça o Instituto"* (→ `#sobre`) + *"Agendar Conversa"* (→ WhatsApp). Header *"Fale Conosco"* (→ WhatsApp) |
| 4 | Taxonomia | 2 grupos por pilar. Strip da hero = 3 pilares. Medicinas = Ayahuasca/Rapé/Sananga. Terapias = Soundhealing |
| 5 | Logo/favicon | `logo.jpg` no header (~80px alt, otimizado) + favicon 32×32 e apple-touch 180×180 derivados dele |
| 6 | Pagamento | **MVP sem pagamento** (Pix manual). Mercado Pago Checkout Pro (redirecionamento, link estático, sem backend/CNPJ) fica para a **v2** |
| 7 | Abordagem | **B: MVP enriquecido** (microanimações, gradiente, hovers ricos) |
| 8 | Fonte display | **Cormorant Garamond** |
| 9 | Momento memorável | **Libélula SVG voando** sobre o altar da floresta (refinada, não kitsch) |

Fonte do corpo: **DM Sans** (substitui o Inter do `identidade-visual.md`, que é AI-tell).

---

## 4. Identidade visual: "Templo da Floresta" (místico-refinado, dark)

Híbrido de *Luxury/Refined* (sagrado, dourado, introspectivo) com alma *Organic* (floresta).

### Paleta (tokens, mantidos do `identidade-visual.md`)
```css
:root {
  --forest-deep: #0D2F1E;  /* fundo principal */
  --forest:      #1A4D2E;  /* fundo de seções */
  --gold:        #FFA500;  /* CTA primário, fogo */
  --gold-soft:   #D4A24E;  /* gradiente do título */
  --earth:       #8B4513;  /* bordas / madeira */
  --metal:       #708090;  /* detalhes (instrumentos) */
  --cream:       #F4EFE6;  /* texto suave / cartões */
  --white:       #FFFFFF;  /* texto principal */
}
```

### Tipografia
- **Display:** `'Cormorant Garamond', Georgia, serif` (título "Instituto Libélula", títulos de seção). Gradiente dourado→verde no título principal.
- **Body:** `'DM Sans', 'Helvetica Neue', sans-serif` (texto, menu, botões).
- Carregamento: Google Fonts com `preconnect` + `display=swap`.
- Tamanhos fluidos com `clamp()`.

### Momento memorável
**Libélula dourada SVG voando** sobre o altar da floresta na hero. Silhueta fina (`stroke`, não preenchida), voo lento num path suave, balanço sutil das asas, opacidade moderada, 1 exemplar. Respeita `prefers-reduced-motion` (fica estática ou oculta).

### Background (anti-flat)
Foto da floresta + overlay gradiente escuro (`rgba(13,47,30,.55)`) para legibilidade + grain overlay sutil nas seções (textura "analógica/sagrada"). Nunca cor sólida.

### Animações (abordagem B, sempre com `prefers-reduced-motion`)
- **Load da hero:** stagger fade-up (logo → título → subtítulo → CTAs → strip → caixa de contato).
- **Scroll:** reveal via IntersectionObserver (`.reveal` → `.visible`).
- **Hover:** hover-lift nos cards/pilares; underline dourado que "desenha" nos links de nav.
- **Transições:** 200-300ms, animando só `transform` e `opacity`.

---

## 5. Estrutura do MVP (8 seções)

> Accordeon nativo `<details><summary>` em todas as seções de conteúdo expansível: clica no botão (summary) → expande o descritivo. Ícone `▸` vira `▾` ao abrir, transição suave.

### 5.1 Hero
- **Fundo:** `foto-02.png` (altar na floresta) otimizada em WebP + overlay escuro. **Sem pessoas.**
- **Header fixo:** logo libélula (esq) · nav `Início · Sobre · Vivências · Medicinas · Contato` (centro) · botão *"Fale Conosco"* (dir, → WhatsApp).
- **Meio:** título **"Instituto Libélula"** (Cormorant, gradiente dourado→verde) · subtítulo *"Medicina do som, da respiração e da floresta a serviço da saúde mental."* · CTAs *"Conheça o Instituto"* (dourado, → `#sobre`) + *"Agendar Conversa"* (verde, → WhatsApp).
- **Baixo:** strip dos 3 pilares (`🌿 Medicinas da Floresta · 🎵 Terapias Integrativas · 🌙 Caminho de Acompanhamento`) · **caixa de contato** Thiago no canto inferior direito.
- **Libélula SVG voando.**
- **Caixa de contato:** *Thiago Biral / Txi Ruas, Facilitador das Vivências* · `suportetxibiral@gmail.com` · WhatsApp **+55 11 93397-7438**.

### 5.2 Sobre
Texto "Sobre o Instituto Libélula" (universalista) do Thiago (briefing, linha 127).

### 5.3 Os 3 Pilares
1 linha cada, síntese narrativa (ver `docs/spec.md`).

### 5.4 Medicinas da Floresta (accordeon)
- ▸ **Ayahuasca**
- ▸ **Rapé**
- ▸ **Sananga**

### 5.5 Terapias Integrativas (accordeon)
- ▸ **Soundhealing**

### 5.6 Guardiões dos Rituais (accordeon)
- ▸ **A função dos Guardiões** (texto do Thiago: mantêm o campo de segurança e a egrégora; *"O papel do Guardião não é 'curar' você, mas criar o espaço seguro..."*).

### 5.7 Próximos rituais + Valores
- **Rituais:** 25/07 (dia fora do tempo) · depois 1º sábado do mês.
- **Valores:** R$180 antecipado / R$210 no dia · 30 vagas · Pix manual.
- **Nota de copy:** *"Pagamento online (Mercado Pago) em breve."* (sinaliza a v2 sem prometer data).

### 5.8 Contato
Thiago (WhatsApp + e-mail) + comunidades WhatsApp.

---

## 6. Conteúdo: princípio da mescla (decisão #2)

Para Ayahuasca, Rapé, Sananga e Soundhealing:
- **Base:** versão descritiva do briefing (linhas 133-143), mais sóbria e segura.
- **Acréscimo:** 2 a 3 pontos de benefício da versão "expansão/reprocessamento" (linhas 87-112), **reescritos em linguagem de possibilidade** ("pode auxiliar", "muitas vezes", "costuma") e **sem travessões**.
- **Sempre** encerrar respeitando o Zero Condicionamento (statement literal na Ayahuasca; tom de "cada experiência é única" nas demais).

### Exemplo (Ayahuasca, para ilustrar o princípio)
> **Ayahuasca: a medicina da expansão**
>
> A Ayahuasca é uma medicina ancestral, utilizada por povos indígenas da Amazônia há séculos. Preparada a partir de duas plantas, é servida em rituais sagrados como ferramenta de autoconhecimento, cura e conexão. No Instituto Libélula, a consagramos com respeito, intenção e cuidado.
>
> Atua como uma ponte para o mundo interior. Seu trabalho mais profundo costuma aparecer na clareza que chega depois, e não em "ver coisas":
> - **Reprocessamento emocional:** pode auxiliar a acessar e ressignificar memórias, crenças e emoções estagnadas.
> - **Liberação pelo corpo:** o corpo às vezes guarda o que a mente já esqueceu; a medicina pode ajudar a liberar tensões (por tremores, bocejos, choro ou purga).
> - **Clareza de propósito:** ao silenciar o ruído externo, pode afiar a intuição e organizar pensamentos.
>
> Cada vivência é única. É por isso que não dizemos o que você vai sentir. A jornada é sua.

Rapé, Sananga e Soundhealing seguem o mesmo molde. **Os textos finais são redigidos na implementação e aprovados pelo Thiago/usuário** antes de ir ao ar.

---

## 7. Arquitetura técnica

### Stack e arquivos (vanilla, padrão LP-Equilibre)
```
index.html
css/tokens.css          # paleta, fontes, espaçamento, breakpoint vars
css/styles.css          # componentes e seções
js/ui.js                # smooth-scroll, IntersectionObserver, nav mobile, animação da libélula
assets/images/          # WebP otimizados (hero, vivencia)
assets/favicon/         # favicon-32.png, apple-touch-180.png (de logo.jpg)
vercel.json
.gitignore
README.md               # atualizar status
```

### Accordeon
`<details><summary>` nativo (acessível, funciona sem JS). JS mínimo opcional para "fechar os outros ao abrir um" e animar a altura. Ícone `▸/▾`.

### Performance (crítico: assets hoje somam 7.8 MB)
- `foto-02.png` (4.4 MB, 2688×1152) → WebP ~1600px wide + compressão (~250 KB). `preload` (é o LCP).
- Fotos de vivência (1.4-2 MB cada) → WebP + `loading="lazy"`.
- Fontes: Google Fonts com `preconnect` + `display=swap` (self-host como otimização de v2).
- Meta: LCP < 2.5s, sem CLS.

### Acessibilidade (WCAG AA)
- Skip-link `#main`, landmarks (`<header> <nav> <main> <section> <footer>`).
- `:focus-visible` dourado em todo interativo; `alt` nas imagens; `aria-label` em ícones/botões.
- Contraste: cream/white sobre `--forest-deep` (verificar ≥ 4.5:1).
- `prefers-reduced-motion`: desliga libélula, stagger e reveal.

### JS (`js/ui.js`)
Smooth-scroll para âncoras da nav; IntersectionObserver para `.reveal`; toggle do menu mobile; driver da animação da libélula (CSS animation preferencial). Sem dependências.

---

## 8. Fora de escopo (v2)
- Mercado Pago Checkout Pro (redirecionamento, link estático, conta PF do Thiago, sem backend).
- Respiração (detalhe) · Primeira vez (acolhimento) · Preceito (preparação) · Pós-ritual (integração) · Quem somos (Thiago/Beaventurada, Naiana, Cynthia) · Onde (Chácara Aurora Austral) · A Jornada.
- Agendamento automático · Login · CMS · domínio próprio (fica em `*.vercel.app`).

---

## 9. Definition of Done
- [ ] Renderiza sem erros de console.
- [ ] Responsivo em 375px e 768px, sem overflow horizontal.
- [ ] Landmarks semânticos + skip-link.
- [ ] Todos os interativos com `:hover` e `:focus-visible`.
- [ ] Tokens CSS definidos; fonte primária NÃO é Inter/Roboto/Arial.
- [ ] Background com profundidade (foto + overlay + grain), nunca sólido.
- [ ] Libélula SVG como momento memorável.
- [ ] `prefers-reduced-motion` respeitado.
- [ ] Contraste WCAG AA.
- [ ] Hero WebP ~250 KB com `preload`; LCP < 2.5s.
- [ ] **Zero travessões** em toda a copy; **Zero Condicionamento** preservado.
- [ ] Accordeons clicáveis expandem o descritivo de Ayahuasca, Rapé, Sananga, Soundhealing e Função dos Guardiões.
- [ ] Deploy na Vercel.

---

## 10. Notas de execução
- **Implementar com a skill `frontend-design`**, usando como referência: `docs/hero-referencia.png` (layout), `docs/identidade-visual.md` (paleta/hero spec) e o briefing (textos). Considerar os templates da skill (`assets/templates/standalone.html`) como ponto de partida.
- **Não commitar** até o usuário criar o repositório que receberá este trabalho.
- Após esta spec: gerar o **plano de implementação** (skill `writing-plans`), aprovado antes de codar.

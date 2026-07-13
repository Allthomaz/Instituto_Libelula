# Plano de implementação da seção Guardiões

> Data: 2026-07-13 · Status: aguardando validação da spec
>
> Spec: `docs/superpowers/specs/2026-07-13-secao-guardioes-design.md`

## Objetivo

Substituir o acordeão atual de Guardiões por uma grade acessível de retratos e histórias. A primeira versão será entregue com placeholders estruturais e poderá receber fotos e descrições reais de forma incremental.

## Arquivos previstos

| Arquivo | Mudança |
|---|---|
| `index.html` | Introdução, grade, cards e diálogo de apresentação |
| `css/styles.css` | Layout, placeholder, hover, foco, diálogo e responsividade |
| `js/ui.js` | Abrir, preencher e fechar a apresentação ampliada; restaurar foco |
| `scripts/optimize-assets.mjs` | Processar fotos reais quando forem recebidas |
| `assets/images/guardioes/originais/` | Fotografias enviadas pelo Instituto |
| `assets/images/guardioes/` | WebP publicados |
| `docs/conteudo-guardioes.md` | Fichas editoriais e status de aprovação |

## Etapa 1: validar decisões editoriais

- [x] Confirmar nome público: Giulia Morabito / Gil.
- [ ] Confirmar nome público e função de cada guardião.
- [x] Começar com quatro cards: Thiago, Melanie, Giulia e Caio.
- [ ] Definir se a frase pessoal fará parte da apresentação ampliada.
- [ ] Aprovar a spec visual antes de editar a LP.

## Etapa 2: preparar a estrutura sem conteúdo final

- [ ] Criar a nova seção semântica em `index.html`.
- [ ] Preservar o texto existente sobre a função dos guardiões em uma expansão secundária.
- [ ] Criar placeholders com nomes confirmados e estados editoriais claros.
- [ ] Adicionar diálogo nativo compartilhado para a apresentação ampliada.
- [ ] Garantir que a descrição curta permaneça disponível sem JavaScript.

## Etapa 3: implementar o comportamento visual

- [ ] Criar grade responsiva de quatro, duas e uma coluna.
- [ ] Criar corte de retrato `4 / 5` com `object-fit: cover`.
- [ ] Implementar preview em hover e foco no desktop.
- [ ] Implementar abertura por clique, teclado e toque.
- [ ] Implementar fechamento por botão, `Escape` e clique seguro no backdrop.
- [ ] Restaurar foco ao card acionador.
- [ ] Desativar zoom e transições em movimento reduzido.

## Etapa 4: validar a primeira versão

- [ ] Rodar `pnpm check:contrast`.
- [ ] Testar sem JavaScript.
- [ ] Testar teclado e ordem de foco.
- [ ] Inspecionar 375 px, 768 px e 1440 px.
- [ ] Confirmar ausência de overflow e mudança de layout.
- [ ] Abrir servidor local e entregar a URL para revisão visual.

Servidor local previsto:

```bash
python3 -m http.server 4173
```

URL:

```text
http://localhost:4173
```

## Etapa 5: incorporar conteúdo real progressivamente

- [ ] Receber fotos em `assets/images/guardioes/originais/`.
- [ ] Preencher ou revisar as fichas em `docs/conteudo-guardioes.md`.
- [ ] Rodar `pnpm optimize` somente após receber os assets.
- [ ] Substituir cada placeholder pela foto WebP correspondente.
- [ ] Revisar texto alternativo, corte e contraste de cada fotografia.
- [ ] Aprovar cada história com a pessoa apresentada.

## Definition of Done

- [ ] Spec visual validada.
- [ ] Placeholders representam corretamente o estado incompleto.
- [ ] Conteúdo equivalente em mouse, teclado e touch.
- [ ] Página continua funcional sem JavaScript.
- [ ] Contraste WCAG AA validado.
- [ ] Fotos reais, quando existentes, são leves e responsivas.
- [ ] Localhost revisado pelo usuário.
- [ ] Nenhum deploy realizado.

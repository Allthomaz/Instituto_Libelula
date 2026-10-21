# Execução e validação — participação

Plano: `docs/superpowers/plans/2026-09-28-voluntariado-doacoes.md`.

## Registro de execução

- Baseline: `pnpm test` passou, 4 testes, antes das alterações.
- Ruling: execução no checkout atual, conforme plano aprovado de execução direta e restrição de escrita em `.git`; não criar branch, worktree ou commits. Custo: as alterações ficam disponíveis localmente para revisão conjunta.
- Ruling: HTML/CSS estáticos serão verificados no navegador, conforme plano e orientação de não criar testes que espelhem implementação. Suíte existente continua sendo executada.
- Pre-flight: tarefa 1 fornece quatro WebP para tarefas 2/3; tarefa 2 fornece classes compartilhadas para tarefa 3; tarefa 4 usa as rotas de ambas. Interfaces coerentes.
- Task 1: complete. Duas artes geradas pela ferramenta nativa, inspecionadas e convertidas com sharp sem reprocessar o acervo.
- Ruling: menu opcional das páginas novas isolado em `js/participacao.js`, para evitar carregar áudio e lógica de guardiões. Custo: um arquivo pequeno adicional; HTML nativo continua funcional sem ele.
- Task 2: complete. Voluntariado e estilos compartilhados implementados; destinos, imagens e navegação verificados no navegador.
- Task 3: complete. Dana implementada com os dois caminhos de contato explícitos; nenhum fluxo de pagamento fictício.
- Task 4: complete. Integração à LP, revisão independente e verificações finais concluídas.
- Ruling: nenhuma integração de Git aplicada; alterações locais e servidor de prévia preservados, conforme escopo aprovado. Não houve deploy.

## Verificações finais

28/09/2026, Chromium via Playwright, servidor `http://localhost:4173`.

- LP e páginas novas em 1440, 768, 390 e 320 px: sem overflow horizontal nas 12 combinações.
- Teclado: menu aberto e fechado com Escape, foco devolvido ao controle; links e âncoras válidos.
- Novas páginas sem JavaScript: leitura, menu nativo e CTAs disponíveis.
- Imagens visíveis decodificadas com sucesso após rolagem; nenhum recurso local 404 nem erro JavaScript observado.
- Preferência de movimento reduzido aplicada durante a verificação; regras desativam as animações decorativas.
- Texto ampliado a 200% em 390 px: `scrollWidth = clientWidth = 390` nas duas páginas.
- Menu da LP em 700 × 360 px: topo 72 px, altura 288 px, com rolagem interna; permanece dentro da tela.
- `pnpm test`: 4/4 passaram na execução final.
- `pnpm check:contrast`: 12 pares passaram; menor contraste 5,70:1. Verificação de pares sólidos complementada por inspeção visual das áreas com imagem.
- `git diff --check`: passou.

### Problemas reproduzidos e corrigidos

1. Texto a 200% ultrapassava a tela em Voluntariado (`scrollWidth=403`, largura 390); largura mínima intrínseca de grid/links e palavras longas ampliavam colunas. Corrigido com `min-width: 0` nos itens e `overflow-wrap: anywhere`; mesma reprodução passou.
2. Menu da LP excedia tela de pouca altura (72 + 400,9 px em tela de 360 px). Corrigido com limite de altura e rolagem interna; reprodução passou com altura 288 px.
3. Revisão independente apontou paráfrase da frase sobre possibilidades de contribuição; restaurado texto autoral completo. Sem achados Critical/Important na revisão estática, sem pendências menores remanescentes.

### Evidências visuais

- [Voluntariado desktop](voluntariado-1440.png)
- [Voluntariado celular](voluntariado-390.png)
- [Doações desktop](doacoes-1440.png)
- [Doações celular](doacoes-390.png)

Capturas inspecionadas pelo implementador. Script de verificação desta sessão: `/tmp/libelula-check.cjs`; depende do Playwright já disponível em outro projeto local. Nenhuma dependência de produção foi adicionada.

### Assets

| Arquivo | Dimensões | Bytes |
| --- | --- | --- |
| voluntariado.webp | 1024 × 1536 | 170118 |
| voluntariado-mobile.webp | 720 × 1080 | 102092 |
| dana.webp | 1400 × 933 | 92584 |
| dana-mobile.webp | 720 × 480 | 35972 |

Prompts e proveniência: `assets/images/participacao/README.md`. Geração nativa imagegen; derivados locais em WebP. Nenhuma arte representa foto real do Instituto.

### Dependências externas remanescentes

- Google Forms: ainda sem URL; CTA final conversa sobre voluntariado no WhatsApp.
- Doação direta/anonimato: sem dados e fluxo verificados; CTAs solicitam dados ou iniciam conversa pelo WhatsApp, com rótulos explícitos.
- Fontes usam o Google Fonts existente na identidade; famílias de sistema funcionam como fallback.
- Revisão não inclui envio real de mensagem, recebimento de formulário, pagamento ou produção.

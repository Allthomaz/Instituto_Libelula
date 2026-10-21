# Voluntariado e Doações — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Entregar duas páginas editoriais memoráveis, funcionais e acessíveis, com artes originais e identidade do Instituto Libélula.

**Architecture:** Duas páginas estáticas na raiz, usando tokens e componentes atuais e uma folha de estilos compartilhada exclusiva para participação. Navegação e links de contato funcionam sem backend; interações JavaScript são melhorias opcionais. Imagens são locais, otimizadas e responsivas.

**Tech Stack:** HTML, CSS, JavaScript vanilla; sharp já instalado; navegador para inspeção funcional e visual.

**Spec:** `docs/superpowers/specs/2026-09-28-voluntariado-doacoes-design.md`.

## Global Constraints

- Zero condicionamento: nenhuma copy promete ou induz o que alguém sentirá em uma vivência com Ayahuasca.
- Reutilizar tokens, marca, Cormorant Garamond, DM Sans e Montserrat; nenhuma dependência de framework ou backend.
- Rotas `voluntariado.html` e `doacoes.html`; contato `https://wa.me/5511933977438`.
- Sem Forms verificado: contato “Conversar sobre voluntariado”; preservar texto original de formulário na spec.
- Sem destino de doação verificado: “Solicitar dados para doar” e “Quero conversar para fazer uma doação”; não prometer anonimato nem simular pagamento.
- Meta de até 250 KB por arte principal e até 600 KB de imagens inicialmente carregadas por página.
- Testar 390, 768 e 1440 px; verificar overflow em 320 px.
- Executar `pnpm check:contrast`. Processamento limitado aos novos assets; nenhum deploy nesta entrega.

## Review Focus

1. JavaScript ausente: links de navegação, leitura e contato continuam disponíveis — tarefa 2.
2. Formulário e doação direta indisponíveis: CTAs dizem exatamente o que abrem e não afirmam conclusão — tarefas 2 e 3.
3. Tela estreita e texto ampliado: título, botões e menu não se sobrepõem nem causam rolagem horizontal — tarefa 4.
4. Movimento reduzido: conteúdo aparece imediatamente e decoração permanece estática — tarefa 4.
5. Mudanças no menu compartilhado: a LP continua utilizável e as duas novas páginas são encontráveis — tarefa 4.

## Arquivos e responsabilidades

- Criar `voluntariado.html`: narrativa, metadados e ações de voluntariado.
- Criar `doacoes.html`: narrativa de Dana e ações de doação.
- Criar `css/participacao.css`: layout e variantes visuais das duas páginas, com seletores delimitados por `.participation-page`.
- Criar `assets/images/participacao/`: artes botânica e água em WebP, variantes móveis e registro `README.md` da origem e otimização.
- Modificar `index.html`: entrada “Participe”, links no menu móvel e rodapé.
- Modificar `css/styles.css`: somente ajustes delimitados para a entrada “Participe” da LP.
- Modificar `js/ui.js` apenas se a navegação acessível ou a redução de movimento exigir; não alterar áudio ou guardiões.
- Modificar `scripts/check-contrast.js`: pares efetivamente adicionados e código de saída não zero quando algum par falhar em AA normal.
- Criar `docs/validacao/2026-09-28-participacao.md`: evidência visual e funcional, tamanhos e dependências externas remanescentes.

### Tarefa 1: Artes originais prontas para uso

**Interfaces:** produz `voluntariado.webp`, `voluntariado-mobile.webp`, `dana.webp`, `dana-mobile.webp` em `assets/images/participacao/`; nomes estáveis consumidos pelas tarefas 2 e 3.

- [x] Ler a skill imagegen e gerar duas artes sem texto: botânica e conexões douradas; água escura e círculos dourados. Seguir a direção da spec, sem simular instalações reais.
- [x] Inspecionar as imagens geradas, conferir composição, ausência de texto e espaço para recorte no celular. Ajustar a geração somente se houver defeito concreto.
- [x] Inspecionar `scripts/optimize-assets.mjs` e usar sharp para derivados limitados aos novos assets. Registrar dimensões e pesos reais no README.
- [x] Confirmar que as quatro imagens abrem e que cada arte principal respeita a meta de 250 KB. Se geração estiver indisponível, produzir o fallback vetorial original previsto na spec e registrar a substituição.

### Tarefa 2: Página de Voluntariado e componentes compartilhados

**Interfaces:** consome arte da tarefa 1, tokens e botões existentes; produz `.participation-page`, `.participation-hero`, `.participation-section`, `.participation-actions`, variantes `.volunteer-page` e âncoras `#formas-de-colaborar`, `#como-funciona`, `#participar`.

- [x] Criar `voluntariado.html` e `css/participacao.css`, com head próprio, logo, header, skip link e navegação entre as três páginas. `aria-current="page"` identifica Voluntariado.
- [x] Implementar a sequência da spec: abertura assimétrica, construção coletiva, quatro formas de colaborar, três passos, participação e link para Doações. Distribuir os parágrafos autorais sem duplicação excessiva.
- [x] Usar `<picture>` para a arte, dimensões explícitas e prioridade somente para a imagem principal; estilos responsivos preservam ordem de leitura.
- [x] Implementar navegação disponível por padrão sem JS. Caso haja menu recolhido, só ativar o recolhimento após instalação dos handlers; Escape fecha e devolve foco ao controle.
- [x] Ligar CTAs de abertura a `#participar` e CTA final ao WhatsApp com mensagem de interesse em voluntariado. Sem inputs, armazenamento ou afirmação de inscrição recebida.
- [x] Abrir no navegador com e sem JavaScript; verificar cabeçalho, todos os destinos, teclado e mensagem de contato. Corrigir qualquer falha antes da tarefa seguinte.

### Tarefa 3: Página de Doações

**Interfaces:** consome componentes da tarefa 2 e arte Dana da tarefa 1; produz `.donation-page` e âncoras `#generosidade`, `#contribuir`.

- [x] Criar `doacoes.html` com metadados próprios e navegação indicando Doações como página atual.
- [x] Construir abertura, definição de Dana, três finalidades, livre contribuição e duas rotas de contato; preservar os parágrafos autorais da spec.
- [x] Diferenciar visualmente a página com círculos, reflexos e composição contemplativa, reutilizando tipografia, cores e controles compartilhados.
- [x] Implementar “Solicitar dados para doar” e “Quero conversar para fazer uma doação” como links WhatsApp com mensagens distintas. Não incluir valores sugeridos, QR fictício ou anonimato não verificado.
- [x] Verificar cada ação e a ausência de promessas de pagamento concluído; confirmar legibilidade sobre a arte e ligação para Voluntariado.

### Tarefa 4: Integração e validação final

**Interfaces:** consome as duas páginas concluídas; produz acesso a elas pela LP e relatório de validação.

- [x] Adicionar “Participe” ao menu desktop da LP como controle acessível contendo os dois links; preferir `<details>/<summary>` se dispensar script adicional. Adicionar links diretos no menu móvel e rodapé.
- [x] Acrescentar ao verificador de contraste `#0D2F1E` sobre `#F4EFE6` e outros pares novos usados; falhar com código não zero em contraste menor que 4.5:1. Executar `pnpm check:contrast` e registrar resultado.
- [x] Servir o projeto localmente e inspecionar as três páginas em 390, 768 e 1440 px. Capturar desktop e celular das duas páginas em `docs/validacao/` ou em pasta de artefatos indicada no relatório.
- [x] Verificar 320 px e zoom de texto de 200%; conferir que `scrollWidth` não excede `clientWidth`, botões não se sobrepõem e navegação permanece acessível.
- [x] Testar teclado, foco, Escape quando aplicável, ausência de JS e `prefers-reduced-motion: reduce`. Verificar links locais, âncoras, ausência de 404 e erros no console.
- [x] Inspecionar capturas e corrigir problemas reais de hierarquia, recorte, espaçamento ou contraste. Repetir somente as verificações afetadas pelas correções.
- [x] Executar `pnpm test` para regressões existentes e `git diff --check`; registrar limitações caso algum teste dependa de ambiente indisponível.
- [x] Escrever relatório com evidências, tamanhos das imagens e os dois fluxos provisórios de contato; entregar URLs locais e capturas, sem publicar.

## Revisão do plano

A tarefa 1 cobre artes e desempenho; tarefas 2 e 3 cobrem todos os blocos da spec e os estados sem integrações externas; tarefa 4 cobre acesso pela LP, contraste, responsividade, teclado e regressões. Não criar testes unitários que apenas espelhem markup: verificar os fluxos reais no navegador e os testes existentes. Git commits, quando possíveis no ambiente, devem incluir apenas arquivos desta entrega; a restrição de escrita de `.git` não impede implementar nem validar arquivos do site.

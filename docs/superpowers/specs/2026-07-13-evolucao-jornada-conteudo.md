# Design da evolução narrativa da LP

> Data: 2026-07-13 · Status: direção aprovada, textos finais sujeitos a revisão · Escopo: evolução da LP sem backend e sem deploy
>
> Relacionados: `docs/spec.md` · `docs/identidade-visual.md` · `docs/superpowers/specs/2026-07-13-secao-guardioes-design.md`

## 1. Objetivo

Evoluir a landing page de uma apresentação institucional básica para uma jornada informativa completa. A pessoa deve compreender quem é o Instituto, como começa o contato, como se organiza a participação, quem acompanha a vivência e quais orientações existem antes, durante e depois do ritual.

A evolução deve preservar a atmosfera `Templo da Floresta`, evitar excesso de accordions e manter a página leve, acessível e sem backend.

## 2. Diretriz editorial: condicionamento mínimo

O princípio de zero condicionamento não impede explicar efeitos possíveis ou aspectos necessários da vivência. Ele orienta a copy a não transformar possibilidades em um roteiro obrigatório.

Toda copy deve distinguir:

1. O que pode acontecer objetivamente.
2. Como o Instituto compreende simbolicamente uma prática.
3. O que varia entre pessoas e vivências.

Formulações adequadas incluem `pode`, `algumas pessoas`, `é utilizado como`, `no Instituto, compreendemos` e `a equipe pode orientar`.

Formulações como `garante`, `vai sentir`, `promove uma verdadeira`, `reprograma`, `cura ansiedade` e equivalentes exigem remoção ou contextualização.

## 3. Nova arquitetura da página

Ordem alvo após os incrementos:

1. Hero
2. Sobre o Instituto
3. Três pilares
4. Sua jornada com o Instituto
5. Primeira vez
6. Medicinas da Floresta
7. Terapias Integrativas
8. Antes, durante e depois
9. Quem cuida da vivência
10. Próximo ritual
11. Caminho de acompanhamento
12. Contato

`Tradição, prática e pesquisa` fica planejada para uma fase posterior, depois de revisão editorial e científica própria.

## 4. Feature 1: Sua jornada com o Instituto

### Função

Explicar que a participação começa por uma conversa e não por uma compra imediata.

### Conteúdo

1. Conversa inicial: dúvidas e informações sobre a vivência.
2. Anamnese e orientações: histórico e orientações individuais.
3. Confirmação: disponibilidade, valor e pagamento por Pix.
4. Preparação: preceito, horário, localização e informações práticas.

### Visual

- Desktop: linha horizontal com quatro marcos conectados.
- Mobile: linha vertical, preservando a ordem de leitura.
- Cada marco usa número, ícone linear, título e texto curto.
- A conexão entre etapas utiliza uma linha dourada discreta.
- A seção termina com CTA `Conversar com o Instituto`.

### WhatsApp

Mensagem inicial sugerida:

> Olá! Conheci o Instituto pela página e gostaria de saber mais sobre a próxima vivência e o processo de participação.

## 5. Feature 2: Primeira vez

### Função

Acolher dúvidas iniciais sem presumir medo, ansiedade ou uma reação emocional específica.

### Visual

- Layout em duas colunas.
- Coluna principal com título e texto autoral revisado.
- Card complementar com três compromissos:
  - Acolhimento sem pressão.
  - Orientação antes da vivência.
  - Acompanhamento durante o ritual.
- Mobile: texto antes do card.

### Copy-base

> É comum surgirem dúvidas ou apreensão antes da primeira vivência. Por isso, o primeiro passo é uma conversa. Nossa equipe apresenta o funcionamento do ritual, escuta cada pessoa e oferece as orientações necessárias para uma participação consciente.

## 6. Feature 3: Antes, durante e depois

### Antes

Dois grupos de orientação:

- Alimentação leve e hidratação.
- Abstinência conforme orientação recebida.
- Intenção sem obrigação.
- Recomendações individuais após conversa e anamnese.

### Durante

Três cards:

- Música: parte da condução e possível referência de atenção.
- Respiração: recurso de presença e centramento.
- Limpeza: manifestações físicas ou emocionais podem ocorrer ou não; a equipe acompanha sem impor interpretação única.

### Depois

- Recolhimento e descanso.
- Alimentação leve.
- Observação e registro.
- Integração e acompanhamento.

### Visual

- `Antes` e `Depois` aparecem como dois painéis complementares.
- Antes usa acentos de fogo e dourado.
- Depois usa verde e lua.
- Durante utiliza três cards menores entre os dois momentos.
- Em telas pequenas, a sequência é estritamente vertical.

### Nota obrigatória

> As orientações podem variar conforme a pessoa. As instruções recebidas durante a conversa e a anamnese prevalecem sobre estas recomendações gerais.

## 7. Feature 4: Quem cuida da vivência

Segue integralmente a spec `2026-07-13-secao-guardioes-design.md`.

Primeira versão:

- Thiago Biral / Txi Ruas.
- Melanie Torres.
- Giulia Morabito / Gil.
- Caio Oliveira.

Placeholders são aceitos até o recebimento das fotos e histórias aprovadas.

## 8. Feature 5: Próximo ritual

### Função

Concentrar as informações hoje espalhadas em três cards e deixar claro como a inscrição é confirmada.

### Visual

- Card largo de evento.
- Selo de data no canto: `25 JUL` enquanto essa for a agenda vigente.
- Área principal com nome da vivência e localidade.
- Grade curta com horário, duração, vagas, valores e conteúdo incluído.
- CTA `Iniciar minha inscrição`.

### Regra de conteúdo

Não inventar horário, duração, inclusões ou endereço. Campos ainda não confirmados devem ficar ausentes ou marcados apenas no ambiente de desenvolvimento.

Nota pública:

> A participação é confirmada após conversa inicial e orientações do Instituto.

## 9. Feature 6: Caminho de acompanhamento

### Função

Entregar a promessa do terceiro pilar, hoje apenas mencionada.

### Conteúdo inicial

- Integração.
- Desenvolvimento humano.
- Comunicação Não-Violenta.
- Comunidade.
- Astrologia somente quando seu papel estiver descrito e aprovado.

### Visual

- Trilha orgânica com módulos conectados, sem representar uma sequência obrigatória.
- Cada módulo tem título, síntese e estado de disponibilidade.
- Conteúdo detalhado pode usar expansão nativa, mas a síntese permanece visível.

## 10. Feature posterior: Tradição, prática e pesquisa

Esta feature não entra no primeiro ciclo de implementação.

Quando for desenvolvida, separará claramente:

- Tradição e visão do Instituto.
- Linguagem simbólica.
- Evidência científica disponível.
- Hipóteses e pesquisa emergente.

Não publicar no formato atual as afirmações de que Breathwork oxigena o cérebro, alcaliniza o sangue como benefício, que Renascimento recupera traumas do nascimento ou que as práticas reprogramam ansiedade e depressão.

## 11. CTAs

Taxonomia alvo:

| Local | Texto | Intenção |
|---|---|---|
| Header | Fale conosco | Contato geral |
| Hero | Conversar com o Instituto | Primeiro contato |
| Jornada | Começar uma conversa | Entender participação |
| Evento | Iniciar minha inscrição | Próxima vivência |
| Contato | Tirar dúvidas pelo WhatsApp | Suporte |

Cada CTA utiliza mensagem de WhatsApp predefinida coerente com sua intenção. Não há reserva automática.

## 12. Acessibilidade e responsividade

- Todas as linhas visuais preservam ordem semântica no HTML.
- Hover nunca é a única forma de acessar conteúdo.
- Seções recebem `scroll-margin-top` para o header fixo.
- Animações respeitam movimento reduzido.
- Cards mantêm foco visível e alvos de pelo menos 44 px.
- Contraste é testado em tokens e inspecionado sobre imagens e overlays.

## 13. Performance

- Imagens reais somente em WebP ou formato equivalente otimizado.
- Retratos e fotos de seção usam `loading="lazy"` e dimensões declaradas.
- Nenhum framework, biblioteca de carrossel ou pacote de animação.
- `pnpm optimize` só é executado quando houver novos assets.

## 14. Critérios de conclusão do ciclo

- Features implementadas em incrementos revisáveis.
- Cada incremento revisado no localhost antes do próximo.
- Copy diferencia informação, compreensão simbólica e variação individual.
- Fluxo de participação fica compreensível sem backend.
- Placeholders não se confundem com pessoas reais.
- Navegação, teclado, toque e movimento reduzido validados.
- Contraste aprovado.
- Nenhum deploy realizado sem pedido explícito.


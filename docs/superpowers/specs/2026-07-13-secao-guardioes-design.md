# Design da seção Guardiões

> Data: 2026-07-13 · Status: proposta para validação · Escopo: design e comportamento, sem implementação
>
> Relacionados: `docs/spec.md` · `docs/identidade-visual.md` · `docs/conteudo-guardioes.md`

## 1. Objetivo

Transformar a seção atual, que explica apenas a função dos guardiões, em uma apresentação humana da equipe. A seção deve ajudar quem considera participar de uma vivência a reconhecer as pessoas, conhecer suas trajetórias e compreender o papel de cada uma no Instituto.

O componente deve funcionar desde já com placeholders e aceitar as fotografias e histórias reais sem mudança estrutural posterior.

## 2. Princípios

- Pessoas reais e histórias reais. Nenhum retrato artificial será usado como substituto.
- O placeholder indica claramente que a fotografia e a apresentação estão em preparação.
- A biografia conecta trajetória pessoal, atuação profissional e função no Instituto.
- Relações pessoais, como namoro ou parentesco, só entram na apresentação pública quando forem relevantes e aprovadas pelas pessoas envolvidas.
- Formação, tempo de experiência e responsabilidades só são publicados quando confirmados.
- A seção informa quem oferece suporte, sem prometer segurança absoluta ou resultados para o participante.
- Hover é um refinamento. Todo conteúdo também deve ser acessível por toque, clique e teclado.

## 3. Posição na narrativa

A nova seção substituirá o acordeão atual `Guardiões dos Rituais` e permanecerá depois de Terapias Integrativas. Ela antecede agenda e valores para que a pessoa conheça parte da equipe antes do convite à inscrição.

Ordem sugerida da página:

1. Hero
2. Sobre
3. Pilares
4. Medicinas
5. Terapias
6. Guardiões
7. Agenda e valores
8. Contato

Quando a feature `Sua jornada com o Instituto` for implementada, ela deverá entrar antes de Guardiões.

## 4. Estrutura visual

### Introdução

- Eyebrow: `Quem sustenta o espaço`
- Título: `Conheça nossos guardiões`
- Texto curto: explica que cada pessoa reúne uma trajetória própria e uma responsabilidade na construção das vivências.
- Link secundário: `Entenda a função dos guardiões`, que expande o texto institucional já existente.

### Grade de retratos

- Desktop largo: quatro colunas.
- Tablet: duas colunas.
- Mobile: uma coluna ou carrossel visual sem dependência de gesto. A preferência inicial é uma coluna para preservar acessibilidade e leitura.
- Retratos verticais com proporção `4 / 5`.
- Nome e função permanecem visíveis na base do card.
- A grade aceita qualquer quantidade de pessoas sem exigir CSS específico por card.

### Aparência do card

- Fundo verde profundo e borda dourada discreta.
- Fotografia ocupa toda a área do retrato.
- Gradiente inferior preserva a leitura de nome e função.
- Hover ou foco amplia a fotografia entre 3% e 5% e revela uma síntese de duas ou três linhas.
- A animação usa apenas `transform` e `opacity` e respeita `prefers-reduced-motion`.

### Placeholder

Enquanto a fotografia não estiver disponível, o card apresenta:

- Fundo com gradiente de floresta.
- Inicial do primeiro nome ou símbolo linear de libélula.
- Nome, quando confirmado.
- Texto `Apresentação em preparação`.

O placeholder terá a mesma dimensão do retrato final para evitar mudança de layout quando a foto for adicionada.

## 5. Apresentação ampliada

### Desktop

1. Hover ou foco revela uma síntese no próprio card.
2. Clique abre uma apresentação ampliada em `dialog` nativo.
3. O diálogo mostra fotografia maior, nome, papel no Instituto, trajetória e uma frase pessoal opcional.

### Mobile

1. Toque no card abre a apresentação ampliada.
2. Não existe conteúdo exclusivo de hover.
3. O botão de fechar fica visível e o gesto de voltar não é substituído por interação personalizada.

### Acessibilidade

- Card acionável por teclado.
- Estado e ação comunicados por rótulo acessível.
- `dialog` recebe título associado e botão de fechar.
- `Escape` fecha o diálogo.
- O foco retorna ao card que abriu a apresentação.
- A imagem usa texto alternativo objetivo, por exemplo `Retrato de Melanie Torres`.
- Sem JavaScript, nome, função e descrição curta continuam disponíveis no documento.

## 6. Modelo de conteúdo por pessoa

Cada guardião terá os seguintes campos:

| Campo | Obrigatório | Uso |
|---|---|---|
| Nome público | Sim | Card e diálogo |
| Slug | Sim | Nome do arquivo da foto e identificador |
| Função no Instituto | Sim | Linha abaixo do nome |
| Trajetória curta | Sim | Prévia do card, até 180 caracteres |
| História completa | Sim | Apresentação ampliada, entre 60 e 140 palavras |
| Fotografia vertical | Não no placeholder | Retrato do card |
| Texto alternativo | Sim com fotografia | Acessibilidade |
| Frase pessoal | Não | Destaque no diálogo |
| Créditos da fotografia | Quando aplicável | Metadado editorial |

## 7. Organização dos arquivos

Fotografias originais recebidas:

```text
assets/images/guardioes/originais/
  thiago-biral.jpg
  melanie-torres.jpg
  giulia-morabito.jpg
  caio-oliveira.jpg
```

Arquivos publicados após otimização:

```text
assets/images/guardioes/
  thiago-biral.webp
  melanie-torres.webp
  giulia-morabito.webp
  caio-oliveira.webp
```

Requisitos recomendados para as fotos:

- Retrato vertical ou imagem que aceite corte vertical.
- Pelo menos 1200 px no lado maior.
- Preferência por luz natural e rosto identificável.
- Evitar texto, molduras ou elementos importantes nas bordas.
- A foto será convertida para WebP e entregue em tamanho responsivo.

As descrições serão reunidas em `docs/conteudo-guardioes.md`. Na implementação aprovada, a versão pública será inserida semanticamente no `index.html`.

## 8. Conteúdo inicialmente conhecido

- Thiago Biral / Txi Ruas: facilitador das vivências; trajetória anterior com cinema, detalhes a confirmar.
- Melanie Torres: guardiã; veterinária, função específica no ritual a confirmar.
- Giulia Morabito / Gil: guardiã; trajetória com dublagem, função específica a confirmar.
- Caio Oliveira: guardião; história e função específica a confirmar.

Não será publicada uma relação pessoal como função profissional. Essa informação pode aparecer na história apenas se houver intenção editorial e consentimento.

## 9. Estados do componente

- `placeholder`: sem foto ou sem história aprovada.
- `parcial`: fotografia e síntese disponíveis, história longa pendente.
- `completo`: fotografia, função, síntese e história aprovadas.

Cards parciais e completos podem coexistir. A ordem não deve comunicar hierarquia sem uma decisão explícita.

## 10. Critérios de aceite

- Seção compreensível com todos os cards em placeholder.
- Substituir um placeholder por foto não altera a estrutura HTML do card.
- Hover, foco, clique, toque e teclado oferecem acesso equivalente ao conteúdo.
- Funciona sem overflow em 375 px, 768 px e 1440 px.
- Imagens usam lazy loading, dimensões declaradas e WebP responsivo.
- Contraste passa em `pnpm check:contrast` e também é inspecionado sobre fotografia.
- Movimento reduzido desativa zoom e transições não essenciais.
- Nenhum conteúdo inventado é apresentado como história real.
- O diálogo fecha corretamente e devolve o foco ao acionador.

## 11. Fora deste incremento

- Cadastro dos guardiões por CMS.
- Upload de fotos pela própria LP.
- Carrossel automático.
- Depoimentos de participantes.
- Geração artificial de retratos.
- Deploy.

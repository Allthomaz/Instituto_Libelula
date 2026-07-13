# Design da seção Guardiões

> Data: 2026-07-13 · Status: aprovado para implementação · Escopo: design e comportamento da primeira versão com seis guardiões
>
> Relacionados: `docs/spec.md` · `docs/identidade-visual.md` · `docs/conteudo-guardioes.md`

## 1. Objetivo

Transformar a seção atual, que explica apenas a função dos guardiões, em uma apresentação humana da equipe. A seção deve ajudar quem considera participar de uma vivência a reconhecer as pessoas, conhecer suas trajetórias e compreender o papel de cada uma no Instituto.

A primeira versão usa as seis artes autorais recebidas, cada uma com retrato, nome e biografia. Uma sétima pessoa será acrescentada quando sua arte estiver disponível, sem placeholder público nesta entrega.

## 2. Princípios

- Pessoas reais e histórias reais. Nenhum retrato artificial será usado como substituto.
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

- Desktop largo: três colunas, formando duas linhas equilibradas com as seis artes.
- Tablet: duas colunas.
- Mobile: uma coluna, sem carrossel ou dependência de gesto.
- Retratos verticais com proporção `4 / 5`.
- No estado inicial, cada card mostra nome e função resumida sobre um painel verde-floresta.
- A grade aceita qualquer quantidade de pessoas sem exigir CSS específico por card.

### Aparência do card

- Fundo verde profundo, textura sutil feita em CSS e borda dourada discreta.
- Hover ou foco revela a arte completa em uma camada ampliada sobre a grade, sem alterar o fluxo do documento.
- A ampliação se ancora para dentro da viewport conforme a posição do card e recebe `z-index` suficiente para permanecer legível sobre os cards vizinhos.
- A animação usa apenas `transform` e `opacity` e respeita `prefers-reduced-motion`.
- O card inteiro comunica a ação `Ver apresentação de [nome]`.

## 5. Apresentação ampliada

### Desktop

1. Hover ou foco revela a arte completa ampliada sobre a grade.
2. Clique abre a mesma arte em um `dialog` nativo com dimensão adequada à viewport.
3. Sem JavaScript, o acionador continua sendo um link direto para a imagem publicada.

### Mobile

1. Toque no card abre a arte ampliada.
2. Não existe conteúdo exclusivo de hover; a biografia está contida na própria arte aberta.
3. O botão de fechar fica visível e o gesto de voltar não é substituído por interação personalizada.

### Acessibilidade

- Card acionável por teclado.
- Estado e ação comunicados por rótulo acessível.
- `dialog` recebe título associado e botão de fechar.
- `Escape` fecha o diálogo.
- O foco retorna ao card que abriu a apresentação.
- A imagem usa texto alternativo objetivo, por exemplo `Apresentação de Mel Torres`.
- Sem JavaScript, nome e função continuam disponíveis no documento e o link abre a arte completa.

## 6. Modelo de conteúdo por pessoa

Cada guardião terá os seguintes campos na marcação:

| Campo | Obrigatório | Uso |
|---|---|---|
| Nome público | Sim | Card e diálogo |
| Slug | Sim | Nome do arquivo da arte e identificador |
| Função no Instituto | Sim | Linha abaixo do nome |
| Arte vertical | Sim | Hover, foco, link sem JavaScript e diálogo |
| Texto alternativo | Sim com fotografia | Acessibilidade |
| Créditos da fotografia | Quando aplicável | Metadado editorial |

## 7. Organização dos arquivos

Artes originais recebidas:

```text
assets/images/guardioes/originais/
  txi-ruas.png
  stephane.png
  caio-rumeya.png
  mateus-vinicius.png
  mel-torres.png
  thomaz-felipe.png
```

Mapeamento das fontes: `3.png` → Txi Ruas; `4.png` → Stephane; `5.png` → Caio Rumëya; `6.png` → Mateus Vinicius; `7.png` → Mel Torres; `8.png` → Thomaz Felipe.

Arquivos publicados após otimização:

```text
assets/images/guardioes/
  txi-ruas.webp
  stephane.webp
  caio-rumeya.webp
  mateus-vinicius.webp
  mel-torres.webp
  thomaz-felipe.webp
```

Requisitos das artes publicadas:

- Preservar integralmente a composição vertical `1080 × 1350`, sem recorte.
- Converter para WebP mantendo o texto incorporado legível.
- Declarar largura, altura e `loading="lazy"` para evitar mudança de layout.
- O PNG original permanece como fonte editorial; a página carrega o WebP otimizado.

As descrições serão reunidas em `docs/conteudo-guardioes.md`. Na implementação aprovada, a versão pública será inserida semanticamente no `index.html`.

## 8. Conteúdo aprovado para os cards

- Txi Ruas: `Fundador e facilitador`.
- Stephane: `Guardiã e fundadora do Sagrado Aroma`.
- Caio Rumëya: `Guardião e batuqueiro`.
- Mateus Vinicius: `Guardião`.
- Mel Torres: `Guardiã`.
- Thomaz Felipe: `Guardião`.

As biografias completas permanecem nas artes recebidas. A LP não reescreve nem amplia essas histórias nesta entrega.

## 9. Estado do componente

- Os seis cards entram como `completo`, pois possuem nome, função resumida e arte autoral.
- A sétima pessoa não aparece até que sua arte seja recebida.
- A ordem segue os arquivos fornecidos: Txi Ruas, Stephane, Caio Rumëya, Mateus Vinicius, Mel Torres e Thomaz Felipe. Ela não comunica hierarquia.

## 10. Critérios de aceite

- Seção compreensível antes de qualquer interação, com nome e função dos seis guardiões.
- Hover, foco, clique, toque e teclado oferecem acesso equivalente ao conteúdo.
- Funciona sem overflow em 375 px, 768 px e 1440 px.
- Imagens usam lazy loading, dimensões declaradas e WebP otimizado.
- Contraste passa em `pnpm check:contrast` e também é inspecionado sobre fotografia.
- Movimento reduzido desativa zoom e transições não essenciais.
- Nenhum conteúdo inventado é apresentado como história real.
- O diálogo fecha corretamente e devolve o foco ao acionador.
- Sem JavaScript, cada card abre diretamente sua arte completa.

## 11. Fora deste incremento

- Cadastro dos guardiões por CMS.
- Upload de fotos pela própria LP.
- Carrossel automático.
- Depoimentos de participantes.
- Geração artificial de retratos.
- Deploy.

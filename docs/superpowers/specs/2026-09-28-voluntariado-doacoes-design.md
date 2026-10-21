# Voluntariado e Doações — direção editorial e imersiva

Data: 28/09/2026. Direção visual e especificação escrita aprovadas por Thomaz nesta conversa. Implementação local concluída; evidências em `docs/validacao/2026-09-28-participacao.md`.

## Objetivo e escopo

Criar duas páginas memoráveis do Instituto Libélula, reconhecíveis como parte da identidade “Templo da Floresta”. Voluntariado explica como oferecer tempo e habilidades; Doações apresenta Dana e os caminhos de contribuição. O visitante deve compreender a proposta e localizar sua próxima ação com facilidade, inclusive no celular.

Inclui páginas, navegação entre elas e a LP, artes originais, adaptação responsiva e verificação visual e funcional. A implementação continua em HTML/CSS/JS vanilla, sem backend. Publicação, domínio, GA4, novas terapias e reformulação de guardiões pertencem ao backlog anterior e não integram esta entrega visual. A tipografia Montserrat da hero principal já existe no código.

Fontes: copy enviada por Thomaz nesta conversa; `docs/identidade-visual.md`; `docs/spec.md`; reunião de 08/09/2026 no Meu-Saber; briefing em `../../Meu-Saber/Instituto-Libelula/output/deliverables/landing-page-instituto.md`.

## Direção de arte

- Paleta existente: verde profundo `#0D2F1E`, verde `#1A4D2E`, dourado suave `#D4A24E`, creme `#F4EFE6` e acento `#FFA500`.
- Marca em Montserrat; títulos editoriais em Cormorant Garamond; texto e controles em DM Sans. Reutilizar famílias e tokens existentes.
- Composição assimétrica no desktop, grandes títulos, pequenos índices de seção, linhas douradas delicadas e intervalos generosos entre blocos.
- Alternar floresta escura e uma seção creme por página para criar ritmo e legibilidade. O creme já é um token; o texto nessa superfície usa verde profundo.
- Cada página tem uma arte principal distinta, recortes orgânicos e detalhes botânicos. Evitar repetir o mesmo padrão de cartões em todas as seções.
- Movimento serve à leitura: entradas curtas, transições de estado e detalhes decorativos lentos. Respeitar redução de movimento e manter conteúdo visível sem JavaScript.
- A abertura não terá bloqueio de entrada, trilha automática ou vídeo pesado.

## Voluntariado — estrutura

Rota: `voluntariado.html`, coerente com a hospedagem estática e utilizável sem regras de redirecionamento.

1. **Abertura:** identificação “Voluntariado no Instituto Libélula”; título autoral “Doe seu tempo, compartilhe seus talentos e faça parte desta construção.” Tipografia ocupa aproximadamente metade da tela; arte botânica ocupa a outra metade. Primeiro CTA “Quero ser voluntário” leva à seção de participação.
2. **Construção coletiva:** primeiro parágrafo da copy em composição editorial, com uma frase em destaque e espaço de leitura. Evitar dividir cada frase em um componente.
3. **Formas de colaborar:** quatro linhas numeradas com pequenas ilustrações — organização dos espaços, acolhimento das vivências, comunicação e cuidado com a natureza. Manter explícita a existência de outras atividades. São possibilidades citadas pelo Instituto, não vagas abertas prometidas.
4. **Como funciona:** três passos — apresentar disponibilidade e habilidades; combinar participação conforme necessidades; receber contato quando houver oportunidade compatível. A copy autoral fornece as condições; nenhuma promessa de seleção, prazo ou benefício adicional.
5. **Participar:** convite final, explicação do próximo passo e CTA funcional conforme a disponibilidade do formulário.
6. **Continuidade:** link discreto à página de doações, apresentado como outra forma de colaborar.

### Texto autoral a preservar

O Instituto Libélula é sustentado por pessoas que acreditam no cuidado coletivo, no autoconhecimento e na transformação que nasce quando colocamos nossos talentos a serviço de um propósito.

Nosso programa de voluntariado recebe pessoas interessadas em colaborar com a organização dos espaços, o acolhimento das vivências, a comunicação, o cuidado com a natureza e outras atividades necessárias ao Instituto.

Cada participação é combinada de acordo com as necessidades do momento, a disponibilidade do voluntário e as habilidades que ele deseja compartilhar. Valorizamos relações responsáveis, respeitosas e construídas com clareza.

Ao se voluntariar, você se aproxima da comunidade, conhece os bastidores do nosso trabalho e contribui para que mais pessoas tenham acesso às experiências promovidas pelo Instituto Libélula.

Sentiu que pode caminhar conosco? Preencha o formulário e conte um pouco sobre você, sua disponibilidade e como gostaria de contribuir. Entraremos em contato quando houver uma oportunidade compatível com o seu perfil.

### Estado sem formulário

O Google Forms ainda não foi localizado. Não criar formulário que apenas simule envio nem armazenar dados no navegador. Na versão revisável, o fechamento informa “Para saber sobre as oportunidades de voluntariado, converse com o Instituto” e usa “Conversar sobre voluntariado”, apontando ao WhatsApp existente com mensagem pertinente. O parágrafo que solicita preenchimento fica preservado nesta especificação para ativação junto do link real, evitando instrução pública sem destino.

Com a URL real fornecida, publicar o parágrafo autoral completo e usar “Quero ser voluntário” também no CTA final. Mostrar que o formulário abre em outra página. O recebimento das respostas ocorre no Forms; o site não afirma ter recebido inscrição.

## Doações — estrutura

Rota: `doacoes.html`.

1. **Abertura:** identificação “Doações”; título “Dana — A prática da generosidade”; linha autoral “Quando alguém recebe algo valioso e deseja contribuir para que esse cuidado continue alcançando outras pessoas.” Arte de água e reflexos dourados com círculos que se expandem. CTA leva à seção de contribuição.
2. **Generosidade:** definição autoral de Dana apresentada com grande respiro e um detalhe visual circular. Tratar como linguagem institucional, sem acrescentar afirmações históricas ou religiosas.
3. **O que a contribuição sustenta:** composição com três itens — manutenção do espaço, atividades acessíveis e continuidade dos projetos — baseada exclusivamente no texto fornecido. Sem valores, percentuais de alocação, metas, depoimentos ou indicadores inventados.
4. **Livre contribuição:** destaque para “Cada pessoa contribui de acordo com suas possibilidades” e o parágrafo sobre ausência de valor mínimo, obrigação ou expectativa. Sem valores sugeridos ou pressão por urgência.
5. **Contribuir:** dois caminhos previstos pelo autor — contribuição direta e conversa prévia — com estado funcional explícito abaixo.
6. **Continuidade:** convite discreto para conhecer o voluntariado.

### Texto autoral a preservar

Dana é uma palavra de origem antiga que significa generosidade. Sua prática nasce do reconhecimento, da gratidão e do desejo de sustentar uma corrente de cuidado coletivo.

As doações recebidas pelo Instituto Libélula ajudam na manutenção do espaço, na realização de atividades acessíveis e na continuidade dos projetos dedicados ao autoconhecimento e ao bem-estar da comunidade.

Cada pessoa contribui de acordo com suas possibilidades. Não existe valor mínimo, obrigação ou expectativa. Toda doação, independentemente do tamanho, participa da construção deste propósito.

Ao oferecer Dana, você ajuda o Instituto Libélula a preservar o espaço, acolher novas pessoas e ampliar o acesso às vivências.

Se este trabalho tocou você e faz sentido colaborar, sua contribuição será recebida com gratidão.

### Estado sem dados de doação

O fluxo de doação direta ainda não tem destino verificado. Não gerar QR Code, chave Pix, checkout ou promessa de anonimato. Na versão revisável, a área de contribuição direta explica brevemente que os dados para doar podem ser solicitados ao Instituto e oferece “Solicitar dados para doar” pelo WhatsApp. O segundo caminho usa “Quero conversar para fazer uma doação”, também pelo WhatsApp, com mensagem distinta.

O rótulo autoral “Quero fazer uma doação anônima” fica registrado para quando existir um fluxo cuja condição de anonimato esteja esclarecida. Não direcionar silenciosamente esse rótulo para uma conversa que identifica o visitante. Nenhum botão atual afirma concluir uma doação.

## Imagens e elementos gráficos

Gerar duas artes conceituais usando a ferramenta de geração de imagens e a skill correspondente na fase de implementação. Voluntariado: botânica de floresta brasileira, luz quente e pequenas linhas douradas evocando conexões. Doações: água escura, reflexos dourados, círculos e um detalhe sutil de libélula. Composição editorial sofisticada, sem texto embutido.

As artes não retratam instalações, voluntários ou resultados reais. Fotografias existentes só serão usadas como fotografias do Instituto quando identificáveis no acervo. Textos permanecem HTML; a arte não deve ser necessária para compreender a ação.

Produzir derivados WebP em tamanhos adequados para desktop e celular, com dimensões declaradas. Meta: até 250 KB por arte principal e até 600 KB de imagens carregadas inicialmente por página. Uma imagem prioritária por página; imagens posteriores com carregamento adiado. Se o serviço de geração estiver indisponível, usar composição vetorial original de botânica e água, mantendo a mesma direção.

## Integração técnica

- Reutilizar `css/tokens.css`, componentes estáveis de `css/styles.css` e navegação/reveal de `js/ui.js` quando compatíveis.
- Criar `css/participacao.css` para estilos exclusivos e compartilhados pelas duas novas páginas. Seletores delimitados para impedir alteração involuntária da LP.
- Cabeçalho das novas páginas: marca, Instituto, Voluntariado, Doações e contato. Página ativa identificada com `aria-current="page"`.
- Na LP, adicionar uma entrada compacta “Participe” com links acessíveis às duas páginas; no celular e rodapé, links diretos. Evitar sobrecarregar a largura do menu atual.
- Caminhos relativos consistentes, títulos e descrições próprios, favicon e marca existentes. Não inventar domínio canônico.
- Contato conhecido: `https://wa.me/5511933977438`. Mensagens de interesse por assunto, sem dados pessoais preenchidos pelo site. A visita não envia mensagem automaticamente.
- Nenhuma coleta local, dependência de servidor, conta nova ou ferramenta de analytics.

## Responsividade, acessibilidade e interações

Testar pelo menos 390 px, 768 px e 1440 px, além de inspeção de overflow em 320 px. No celular, o título e o convite aparecem antes da arte; botões têm área confortável e textos não dependem de hover.

Um H1 por página; landmarks, ordem lógica de títulos, skip link, foco visível e navegação por teclado. O menu funciona sem JS com navegação visível; a versão recolhida depende de melhoria progressiva. Não reutilizar uma navegação que desapareça completamente quando JS falha.

Imagens decorativas recebem texto alternativo vazio; conteúdo significativo tem descrição objetiva. Contraste AA, foco e estados ativos verificáveis. A preferência de movimento reduzido remove animações decorativas e entradas. Conteúdo e CTAs funcionam sem animações.

## Critérios de entrega

1. As duas páginas existem, têm identidade consistente e composições distintas, sem links quebrados ou chamadas sem destino.
2. Copy autoral preservada, salvo as adaptações operacionais documentadas para formulário e doação ainda indisponíveis; nenhuma promessa sobre a experiência com Ayahuasca.
3. Navegação entre as três páginas funciona com mouse, teclado e celular; ações de contato têm mensagens pertinentes.
4. Imagens geradas são entregues como arquivos locais otimizados, com proveniência e tamanhos registrados no resumo da implementação.
5. Inspeção visual real no navegador, com capturas desktop/mobile; ausência de overflow, sobreposições, erros JS e recursos ausentes.
6. Executar `pnpm check:contrast`, acrescentando ao verificador as combinações novas efetivamente utilizadas. O verificador atual cobre pares fixos e não substitui a inspeção sobre imagens.
7. Usar `pnpm optimize` apenas se adequado aos novos assets; inspecionar o script para evitar reprocessar o acervo inteiro desnecessariamente. Pode-se usar transformação restrita aos novos arquivos.
8. Entregar links de prévia local e informar claramente as integrações substituídas temporariamente por contato. Deploy depende de pedido explícito.

## Revisão da especificação

Escopo limitado às duas páginas e seus pontos de acesso. Texto, estados sem integrações, responsabilidade das artes e comportamento móvel definidos. As dependências externas possuem alternativas funcionais explícitas; não há formulário fictício, pagamento implementado nem promessa de anonimato sem mecanismo correspondente.

# Plano da evolução narrativa da LP

> Data: 2026-07-13 · Status: pronto para execução incremental
>
> Spec: `docs/superpowers/specs/2026-07-13-evolucao-jornada-conteudo.md`

## Estratégia

Implementar um incremento por vez. Ao final de cada incremento, validar a página e disponibilizar o localhost para revisão. Ajustes aprovados permanecem como base do incremento seguinte.

## Incremento 1: Sua jornada com o Instituto

- [x] Adicionar seção semântica com quatro etapas.
- [x] Criar linha horizontal no desktop e vertical no mobile.
- [x] Criar ícones lineares reutilizando a linguagem visual atual.
- [x] Adicionar CTA com mensagem predefinida no WhatsApp.
- [x] Ajustar rótulos dos CTAs existentes conforme a nova taxonomia.
- [x] Adicionar `scroll-margin-top` às seções.
- [x] Validar contraste, 375 px, 768 px, 1440 px e movimento reduzido.
- [x] Abrir localhost para revisão.

## Incremento 2: Primeira vez

- [x] Adicionar bloco em duas colunas.
- [x] Inserir texto acolhedor revisado.
- [x] Criar card dos três compromissos.
- [x] Validar hierarquia e comprimento no mobile.
- [x] Disponibilizar no localhost para revisão.

## Incremento 3: Antes, durante e depois

- [x] Criar painéis Antes e Depois.
- [x] Criar cards Música, Respiração e Limpeza.
- [x] Inserir nota de orientação individual.
- [x] Revisar toda copy pelo critério de condicionamento mínimo.
- [x] Validar contraste e responsividade.
- [x] Disponibilizar no localhost para revisão.

## Incremento 4: Guardiões

- [ ] Executar o plano `2026-07-13-secao-guardioes.md`.
- [ ] Começar com quatro cards e placeholders.
- [ ] Integrar fotos e histórias disponíveis sem bloquear os demais cards.
- [ ] Validar diálogo, teclado, touch e retorno de foco.
- [ ] Revisar no localhost.

## Incremento 5: Próximo ritual

- [ ] Confirmar nome, horário, duração e inclusões da vivência.
- [ ] Substituir os três cards pelo card de evento.
- [ ] Implementar selo de data e informações confirmadas.
- [ ] Adicionar CTA de inscrição com mensagem contextual.
- [ ] Revisar no localhost.

## Incremento 6: Caminho de acompanhamento

- [ ] Confirmar serviços e estados de disponibilidade.
- [ ] Criar trilha visual não linear.
- [ ] Inserir Integração, Desenvolvimento Humano, CNV e Comunidade.
- [ ] Adicionar Astrologia apenas após confirmação de conteúdo.
- [ ] Revisar no localhost.

## Incremento 7: refinamentos gerais

- [ ] Atualizar navegação para as novas seções sem sobrecarregar o header.
- [ ] Adicionar fechamento por `Escape` e atualização de rótulo ao menu mobile.
- [ ] Revisar foco, landmarks e títulos.
- [ ] Revisar canonical, Open Graph e dados estruturados quando existir URL definitiva.
- [ ] Fazer revisão final de performance e contraste.
- [ ] Não fazer deploy sem pedido explícito.

## Comandos de validação

```bash
pnpm check:contrast
python3 -m http.server 4173
```

URL de revisão:

```text
http://localhost:4173
```

## Estado de aprovação

- [x] Diretriz de condicionamento mínimo aprovada.
- [x] Roadmap narrativo aprovado.
- [x] Nome público Giulia Morabito / Gil confirmado.
- [x] Primeira grade de Guardiões definida com quatro pessoas.
- [x] Incremento 1 implementado e validado tecnicamente.
- [ ] Incremento 1 revisado pelo usuário no localhost.

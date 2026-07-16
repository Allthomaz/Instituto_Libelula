# LP Instituto Libélula — Instruções para Agentes

## Contexto obrigatório

Leia integralmente `CLAUDE.md` e depois:

- `../../Meu-Saber/Instituto-Libelula/output/landing-page-instituto.md`
- `docs/spec.md`
- `docs/identidade-visual.md`
- `../../Meu-Saber/Instituto-Libelula/wiki/hot.md`
- `../../Meu-Saber/Instituto-Libelula/wiki/STATE.md`

## Invariante de conteúdo

**Zero condicionamento:** nenhuma copy pode prometer, antecipar ou induzir o que
uma pessoa sentirá em uma vivência com Ayahuasca. Preserve os textos autorais e a
distinção entre informação, acompanhamento e expectativa.

## Implementação e validação

- Stack vanilla HTML/CSS/JS; não introduza framework ou backend sem decisão nova.
- Preserve acessibilidade, semântica, progressive enhancement e desempenho dos
  assets.
- Reutilize tokens e componentes atuais antes de criar novas variações.
- Para mudanças visuais, valide contraste com:

```bash
pnpm check:contrast
```

- Use `pnpm optimize` somente quando a tarefa incluir processamento de assets.
- Não faça deploy nem configure pagamento/backend sem pedido explícito.

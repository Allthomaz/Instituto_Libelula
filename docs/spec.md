# Spec — LP Instituto Libélula

> Contrato da LP. **Implementar só após ler o briefing** (`Meu-Saber/Instituto-Libelula/output/landing-page-instituto.md`).

## 🥇 Invariante (NÃO NEGOCIÁVEL)
**Zero Condicionamento** — nenhuma copy induz/cria expectativa sobre o que o participante vai sentir na Ayahuasca. Textos autorais do Thiago (no briefing) já respeitam. **Toda nova copy passa por este crivo.**

## Promessa (hero)
> *"Um espaço de cura, autoconhecimento e reconexão."*

## Os 3 pilares (síntese narrativa — funde referência + ecossistema + temas do Thiago)

| Pilar | O que comunica | Inclui |
|-------|----------------|--------|
| 🌿 **Medicinas da Floresta** | o ritual sagrado — o coração da vivência | Ayahuasca, Rapé, Sananga |
| 🎵 **Terapias Integrativas** | ferramentas de acesso — preparam o corpo/campo | Soundhealing, Respiração |
| 🌙 **Caminho de Acompanhamento** | a jornada contínua — não acaba no ritual, começa | Integração, Astrologia, Comunidade terapêutica, CNV |

> **A história:** um espaço que entrega um **caminho completo** — pelas medicinas, pelas terapias e pelo acompanhamento contínuo. Do primeiro contato à integração na vida.

## Hero (replicar `docs/hero-referencia.png` com a NOSSA foto `assets/images/hero/foto-02.png`)

| Zona | Conteúdo |
|------|----------|
| **Fundo** | `foto-02.png` (altar na floresta) + overlay escura p/ legibilidade |
| **Topo** | logo libélula (esq) · nav `Início · Sobre · Vivências · Medicinas · Contato` (centro) · botão **"Fale Conosco"** (dir) |
| **Meio** | título **"Instituto Libélula"** (gradiente dourado→verde, serif) · subtítulo · 2 CTAs: **"Conheça o Instituto"** (dourado) / **"Agendar Conversa"** (verde) |
| **Baixo** | 3 pilares (ícone + label: Soundhealing · Respiração · Medicinas da Floresta) · **caixa de contato** no canto inferior direito |

**Caixa de contato:** *Thiago Biral / Txi Ruas — Facilitador das Vivências* · `suportetxibiral@gmail.com` · +55 11 93397-7438.

## Roadmap — MVP (temporária, ~7 seções)

| # | Seção | Conteúdo | Fonte (Meu-Saber) |
|---|-------|----------|-------------------|
| 1 | **Hero** | promessa + 3 pilares + CTA + caixa contato | este spec + `foto-referencia` |
| 2 | **Sobre** | "Sobre o Instituto Libélula" (universalista) | briefing (matéria-prima Thiago) |
| 3 | **Os 3 Pilares** | visão (1 linha cada) | síntese (este spec) |
| 4 | **Medicinas** `<details>` | Ayahuasca, Rapé, Sananga, Soundhealing | briefing (textos Thiago) |
| 5 | **Próximos rituais** | 25/07 (dia fora do tempo); 1º sábado/mês | `dec-calendario-primeiro-sabado` |
| 6 | **Valores** | R$180 antecipado / R$210 no dia · 30 vagas · Pix | `dec-valores-e-cobranca` |
| 7 | **Contato** | Thiago (WhatsApp/email) + comunidades WhatsApp + forms | `entity-thiago-biral` + `syn-ecossistema-instituto` |

## v2 (depois — quando tiver texto/foto)
- **Respiração** (detalhe) · **Primeira vez** (acolhimento) · **A Jornada** (Preceito → Ritual → Integração) · **Quem somos** (Thiago/Beaventurada, Naiana, guardiões, Cynthia) · **Onde** (Chácara Aurora Austral).

## Fora de escopo (temporária)
- ❌ Pagamento online · ❌ Agendamento automático · ❌ Login · ❌ Backend/CMS.
- Pix manual; confirmação por comprovante.

## Padrão de referência
`../LP-Equilibre/` (mesmo formato vanilla) — **sem** `calculator.js`/`leads.js` (não há backend).

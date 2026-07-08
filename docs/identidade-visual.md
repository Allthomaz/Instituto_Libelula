# Identidade Visual — "Templo da Floresta"

> Direção do Thiago: **templo da floresta** — sagrado, místico, introspectivo.
> ❌ Semente de Amor **descartada** como referência (a LP própria vai ser mais eficaz).

## Paleta (extraída de `assets/images/hero/foto-02.png` — altar na floresta)

```css
:root {
  /* Fundos */
  --forest-deep: #0D2F1E;   /* fundo principal */
  --forest:      #1A4D2E;   /* fundo de seções */
  /* Acentos */
  --gold:        #FFA500;   /* CTA primário, fogo */
  --gold-soft:   #D4A24E;   /* gradiente do título (dourado→verde) */
  --earth:       #8B4513;   /* bordas / madeira */
  --metal:       #708090;   /* detalhes (instrumentos) */
  /* Texto */
  --cream:       #F4EFE6;   /* texto suave / cartões */
  --white:       #FFFFFF;   /* texto principal */
}
```

## Tipografia

| Uso | Família | Observação |
|-----|---------|------------|
| **Display** (título "Instituto Libélula", títulos de seção) | serif — *Cormorant Garamond* ou *Playfair Display* | gradiente dourado→verde no título principal |
| **Body** (texto, menu, botões) | sans-serif — *Inter* ou *System UI* | contraste alto sobre fundo escuro |

## Hero — especificação (replica `docs/hero-referencia.png`)

```
┌─────────────────────────────────────────────────────────────┐
│ [🦋 libélula]      Início  Sobre  Vivências  Medicinas  Contato   [Fale Conosco] │
│                                                             │
│                                                             │
│              INSTITUTO LIBÉLULA  ← gradiente dourado→verde  │
│              Um espaço de cura, autoconhecimento            │
│              e reconexão.                                   │
│                                                             │
│              [Conheça o Instituto]  [Agendar Conversa]      │
│                                                             │
│   🎵              🌬️               🌿                      │
│ Soundhealing   Respiração    Medicinas da Floresta          │
│                                                             │
│                                        ┌─────────────────┐  │
│                                        │ Thiago Biral    │  │
│                                        │ Txi Ruas        │  │
│                                        │ Facilitador     │  │
│                                        │ ✉ 📱            │  │
│                                        └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
        bg: foto-02.png (altar na floresta) + overlay escura
```
**imagem hero fundo lado esquerdo e titulo lado diretiro seguindo o que esta escrito na hero de referencia**

**Detalhes:**
- **Overlay:** gradiente/preto `rgba(13,47,30,.55)` sobre a foto p/ legibilidade do texto branco.
- **Caixa de contato:** fundo `--forest-deep`/preto, canto inferior direito, texto creme.
- **CTAs:** primário = `--gold` (texto `--forest-deep`); secundário = `--forest` com borda `--gold-soft`.

## Imagens disponíveis

| Arquivo | Uso |
|---------|-----|
| `assets/images/hero/foto-02.png` | **background da hero** (altar na floresta, fogo + aurora verde, sem pessoas) |
| `assets/images/logo/logo.jpg` | **logo libélula** (header) |
| `assets/images/vivencia/20260620_213548.jpg` | Thiago (Beaventurada) + Naiana (soundhealing) — seção Quem somos (v2) |
| `assets/images/vivencia/foto-01.jpg` | foto de vivência (v2) |
| `docs/hero-referencia.png` | **referência estrutural** da hero (não vai pro ar — só guia) |

## Princípios
- **Sem pessoas na hero** (a `foto-02.png` é um espaço/altar — reforça "templo", não personaliza).
- Texto sempre com contraste alto sobre o fundo escuro da floresta.
- Acentos dourados = fogo/sagrado; verdes = floresta/vida.

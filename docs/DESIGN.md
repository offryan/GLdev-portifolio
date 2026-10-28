# DESIGN.md — gldev

Guia visual do portfólio (formato inspirado na coleção *awesome-design-md*), para manter novas páginas consistentes.

## Conceito

"Dados ganhando vida": um fundo escuro e profundo onde auroras coloridas se movem lentamente e uma
constelação de pontos conectados (uma rede de dados) reage ao cursor. O conteúdo surge conforme a rolagem,
como informação sendo revelada.

## Marca

- **Monograma:** "GL" desenhado em traço contínuo dentro de um quadrado arredondado com borda em gradiente.
- **Wordmark:** `gl` (negrito) + `dev` (regular, cor suave) + `.` em ciano — referência ao domínio gldev.com.
- Arquivos: `src/componentes/interface/Logo/Logo.tsx` e `public/favicon.svg`.

## Cores

| Token                | Valor      | Uso                                  |
| -------------------- | ---------- | ------------------------------------ |
| `--cor-fundo`        | `#05060d`  | Fundo geral                          |
| `--cor-texto`        | `#eef0ff`  | Texto principal                      |
| `--cor-texto-suave`  | `#a3a9c2`  | Parágrafos e descrições              |
| `--cor-violeta`      | `#8b5cf6`  | Acento primário                      |
| `--cor-ciano`        | `#22d3ee`  | Acento de destaque, links, rótulos   |
| `--cor-verde`        | `#34d399`  | Sucesso, status "atual"              |
| `--cor-rosa`         | `#f472b6`  | Avisos discretos (ex.: dados fictícios) |

Gradiente de assinatura: violeta → ciano → verde, usado em palavras de destaque, botões primários e bordas.

## Tipografia

- **Títulos:** Space Grotesk (700), espaçamento de letras negativo (-0.02em a -0.045em).
- **Texto:** Inter (400/600).
- **Rótulos técnicos e código:** JetBrains Mono, caixa alta com espaçamento largo em rótulos de seção.

## Superfícies

- Cartões em vidro: fundo `rgba(255,255,255,0.035)`, borda `rgba(255,255,255,0.09)`, `backdrop-filter: blur`.
- Raio padrão 18px; botões em pílula (999px).
- Hover: elevação de 2–4px, borda mais clara e luz radial seguindo o cursor.

## Movimento

- Curva padrão: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Entrada de blocos: opacidade + desfoque + deslocamento de 48px, uma vez por elemento.
- Parágrafos do "Sobre": palavras acendem conforme a rolagem.
- Linha do tempo: trilho preenchido de acordo com a rolagem.
- Respeita `prefers-reduced-motion`: animações são reduzidas e o fundo fica estático.

# gldev — Portfólio de George Lucas

Portfólio de **George Lucas**, analista de dados e especialista em automação, feito para o domínio **gldev.com**.

Cada projeto tem uma página própria onde quem visita pode **testar ou visualizar** o trabalho: demonstrações interativas, dashboards do Power BI ao vivo, sites incorporados, vídeos, galerias de imagens ou trechos de código.

## ✏️ Quero só mudar textos, projetos ou fotos

Você **não precisa entender de programação**. Todo o conteúdo do site fica em uma única pasta:

```
src/conteudo/
├── perfil.ts         → nome, cargo, resumo, números de destaque, contatos
├── habilidades.ts    → cartões da seção "Habilidades"
├── projetos.ts       → lista de projetos (e como cada um é visualizado)
├── experiencias.ts   → linha do tempo profissional
└── formacao.ts       → formação acadêmica e certificações
```

O passo a passo completo está em **[docs/COMO-EDITAR.md](docs/COMO-EDITAR.md)**.

## 🚀 Rodando no computador

Pré-requisito: [Node.js](https://nodejs.org) 20 ou mais recente.

```bash
npm install
```

```bash
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

| Comando             | O que faz                                     |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Abre o site em modo de desenvolvimento        |
| `npm run build`     | Verifica o código e gera a versão final em `dist/` |
| `npm run preview`   | Mostra localmente a versão final gerada       |

## 🗂️ Organização das pastas

```
├── docs/                    Guias (como editar, publicar e o design do site)
├── public/                  Arquivos servidos como estão
│   ├── documentos/          Currículo em PDF
│   ├── projetos/            Imagens dos projetos (capas e prints)
│   └── favicon.svg          Ícone da aba do navegador
└── src/
    ├── conteudo/            ✏️ TEXTOS DO SITE — edite aqui
    ├── tipos/               Formato de cada informação do conteúdo
    ├── paginas/             Páginas: inicial, projeto e "não encontrada"
    ├── secoes/              Blocos da página inicial (Abertura, Sobre, Projetos…)
    ├── componentes/
    │   ├── estrutura/       Menu, rodapé e barra de progresso
    │   ├── fundo/           Fundo animado (auroras + constelação)
    │   ├── interface/       Peças reutilizáveis: logo, botões, animações
    │   └── projetos/        Cartão do projeto e visualizador (janela do navegador)
    ├── demos/               Demonstrações interativas dos projetos
    ├── ganchos/             Comportamentos reutilizáveis (React hooks)
    ├── utilitarios/         Funções auxiliares
    ├── estilos/             Cores, fontes e estilos globais
    ├── App.tsx              Rotas do site
    └── main.tsx             Ponto de entrada
```

Cada componente fica em sua própria pasta, com o código (`.tsx`) e o estilo (`.module.css`) lado a lado.

## 🌐 Publicação

Veja **[docs/PUBLICACAO.md](docs/PUBLICACAO.md)** para colocar o site no ar com o domínio gldev.com.

## 🛠️ Tecnologias

React · TypeScript · Vite · Framer Motion · React Router · Lucide Icons

## 📄 Licença

© 2026 Ryan G. Santos. Todos os direitos reservados. O código está público apenas para portfólio e avaliação: não é permitido copiar, modificar, distribuir ou usar comercialmente sem autorização por escrito. Veja o arquivo [LICENSE](LICENSE).

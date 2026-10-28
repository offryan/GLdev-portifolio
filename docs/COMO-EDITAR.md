# Como editar o conteúdo do site

Todo o conteúdo fica na pasta `src/conteudo`. Abra o arquivo, altere **apenas o texto entre aspas** e salve.
Dá para fazer isso direto pelo GitHub: abra o arquivo, clique no ícone de lápis (✏️), edite e clique em **Commit changes**. Se o site estiver conectado à Vercel/Netlify, ele se atualiza sozinho em ~1 minuto.

> ⚠️ Cuidados: mantenha as aspas `'...'`, as vírgulas no fim das linhas e as chaves `{ }` / colchetes `[ ]`.
> Se o texto tiver um apóstrofo (ex.: `d'água`), use aspas duplas: `"d'água"`.

---

## 1. Dados pessoais — `perfil.ts`

| Campo               | O que é                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `nome`              | Nome grande no topo do site                                      |
| `cargo`             | Cargo exibido abaixo do nome                                     |
| `frasesRotativas`   | Frases que se alternam em "Eu crio …"                            |
| `resumo`            | Parágrafos da seção "Sobre" (cada item é um parágrafo)           |
| `numeros`           | Números de destaque que "contam" na tela                         |
| `contato.github`    | Link do GitHub — enquanto estiver vazio (`''`), o ícone não aparece |
| `contato.whatsapp`  | Número só com dígitos, com DDI e DDD (ex.: `'5521999999999'`)     |
| `curriculo`         | Caminho do PDF dentro de `public/documentos`                     |

Para trocar o currículo, substitua o arquivo `public/documentos/curriculo-george-lucas.pdf` mantendo o mesmo nome.

## 2. Projetos — `projetos.ts`

Para **adicionar** um projeto, copie um bloco `{ ... },` inteiro, cole no fim da lista e troque os textos.
A ordem da lista é a ordem em que aparecem no site.

```ts
{
  slug: 'meu-novo-projeto',            // endereço: gldev.com/projetos/meu-novo-projeto
  titulo: 'Meu Novo Projeto',
  categoria: 'Automação',              // vira um filtro na seção de projetos
  ano: '2026',
  resumo: 'Uma frase que aparece no cartão.',
  descricao: [
    'Primeiro parágrafo da página do projeto.',
    'Segundo parágrafo.',
  ],
  tecnologias: ['Python', 'Power BI'],
  resultados: [
    { valor: '-50%', rotulo: 'tempo gasto' },
  ],
  cores: ['#8b5cf6', '#22d3ee'],       // cores da arte do cartão
  capa: '/projetos/meu-novo-projeto/capa.png',   // opcional
  links: {
    repositorio: 'https://github.com/usuario/repo',  // opcional
    aoVivo: 'https://meuprojeto.com',                // opcional
  },
  visualizacao: { tipo: 'site', url: 'https://meuprojeto.com' },
},
```

### Formas de visualizar um projeto (`visualizacao`)

| Tipo       | Quando usar                                   | Exemplo |
| ---------- | --------------------------------------------- | ------- |
| `site`     | Projeto publicado na internet                 | `{ tipo: 'site', url: 'https://...' }` |
| `powerbi`  | Relatório do Power BI ("Publicar na Web")     | `{ tipo: 'powerbi', url: 'https://app.powerbi.com/view?r=...' }` |
| `video`    | Vídeo no YouTube mostrando o projeto          | `{ tipo: 'video', url: 'https://www.youtube.com/watch?v=...' }` |
| `galeria`  | Prints de telas (dashboards internos, apps)   | `{ tipo: 'galeria', imagens: [{ src: '/projetos/x/1.png', legenda: 'Tela inicial' }] }` |
| `codigo`   | Mostrar um trecho de código (SQL, Python…)    | `{ tipo: 'codigo', linguagem: 'Python', codigo: \`print('oi')\` }` |
| `demo`     | Demonstração interativa feita no próprio site | `{ tipo: 'demo', demo: 'painel-operacoes' }` |

**Dica para Power BI:** no Power BI Service, abra o relatório → *Arquivo* → *Inserir relatório* → *Publicar na Web (público)* e copie o link. Use somente com dados que possam ser públicos.

**Dica para dashboards com dados sigilosos:** prefira `galeria` com prints (borrando informações sensíveis) ou um `video`.

### Imagens

Coloque as imagens em `public/projetos/<slug-do-projeto>/` e use o caminho começando com `/projetos/...`.
Tamanho recomendado: 1600 × 1000 px (proporção 16:10), formato `.png`, `.jpg` ou `.webp`.

## 3. Habilidades — `habilidades.ts`

Cada cartão tem `titulo`, `descricao`, a lista `itens` e um `icone`, que pode ser:
`'dados'`, `'graficos'`, `'automacao'`, `'apps'` ou `'negocios'`.

## 4. Experiência — `experiencias.ts`

A mais recente primeiro. Use `atual: true` no emprego atual (o marcador fica verde e pulsante).

## 5. Formação e certificações — `formacao.ts`

Duas listas simples com `titulo`, `instituicao` e `ano`.

---

## Mudando cores

As cores do site ficam em `src/estilos/tokens.css`. Altere os valores hexadecimais (`#8b5cf6`, etc.).

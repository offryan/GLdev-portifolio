# Publicando o site em gldev.com.br

O site é estático: depois de `npm run build`, tudo fica na pasta `dist/`.
Os arquivos `vercel.json` e `public/_redirects` já estão configurados para que os endereços
`/projetos/...` funcionem ao recarregar a página.

## Vercel (já conectada ao repositório)

Toda alteração mesclada na `main` é publicada automaticamente.

### Ligando o domínio gldev.com.br

1. Na Vercel, abra o projeto **gldev** → **Settings → Domains**.
2. Adicione `gldev.com.br` e depois `www.gldev.com.br`. Quando a Vercel perguntar,
   deixe o `www` redirecionando para `gldev.com.br` (endereço principal, sem www).
3. A Vercel mostra os registros DNS necessários. Configure-os no **Registro.br**
   (https://registro.br → Painel → domínio `gldev.com.br` → **DNS**). Há duas formas:

   **Opção A — usar o DNS da Vercel (mais simples)**
   Em "Alterar servidores DNS", troque pelos servidores que a Vercel indicar
   (normalmente `ns1.vercel-dns.com` e `ns2.vercel-dns.com`).

   **Opção B — manter o DNS do Registro.br**
   Em "Configurar zona DNS" (modo avançado), crie:

   | Tipo  | Nome  | Valor                  |
   | ----- | ----- | ---------------------- |
   | A     | (vazio / @) | `76.76.21.21`    |
   | CNAME | `www` | `cname.vercel-dns.com` |

   Use sempre os valores exatos que aparecerem na tela da Vercel, se forem diferentes.

4. Aguarde a propagação (de alguns minutos a algumas horas). Quando a Vercel mostrar
   **Valid Configuration**, o site estará no ar com HTTPS automático.

### Depois que o domínio estiver no ar

- Teste a prévia dos links em https://www.linkedin.com/post-inspector/ colando `https://gldev.com.br`.
- Cadastre o site no Google Search Console (https://search.google.com/search-console)
  e envie o mapa do site: `https://gldev.com.br/sitemap.xml`.

## Trocando de domínio no futuro

Altere `url` em `src/conteudo/site.ts` e o endereço em `public/robots.txt`,
troque o texto do domínio em `scripts/gerar-imagens.ts` e rode `npm run imagens`.

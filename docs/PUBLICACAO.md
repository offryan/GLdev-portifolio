# Publicando o site em gldev.com

O site é estático: depois de `npm run build`, tudo fica na pasta `dist/`.
Os arquivos `vercel.json` e `public/_redirects` já estão configurados para que os endereços
`/projetos/...` funcionem ao recarregar a página.

## Opção recomendada: Vercel (gratuito)

1. Crie uma conta em https://vercel.com usando o GitHub.
2. Clique em **Add New → Project** e importe este repositório.
3. A Vercel detecta o Vite sozinha (comando `npm run build`, pasta `dist`). Clique em **Deploy**.
4. Em **Settings → Domains**, adicione `gldev.com` e `www.gldev.com`.
5. No site onde o domínio foi comprado, crie os registros DNS que a Vercel mostrar
   (normalmente um registro `A` para `76.76.21.21` e um `CNAME` de `www` para `cname.vercel-dns.com`).

A partir daí, toda alteração enviada ao GitHub é publicada automaticamente.

## Alternativa: Netlify

Mesma ideia: importe o repositório, comando de build `npm run build`, pasta de publicação `dist`.

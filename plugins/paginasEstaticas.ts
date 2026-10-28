import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';
import { perfil } from '../src/conteudo/perfil';
import { projetos } from '../src/conteudo/projetos';
import { site } from '../src/conteudo/site';

interface Meta {
  titulo: string;
  descricao: string;
  caminho: string;
  imagem: string;
  tipo: 'website' | 'article';
}

function escapar(texto: string) {
  return texto.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function tagsMeta({ titulo, descricao, caminho, imagem, tipo }: Meta) {
  const url = `${site.url}${caminho}`;
  const imagemAbsoluta = `${site.url}${imagem}`;
  return [
    `<title>${escapar(titulo)}</title>`,
    `<meta name="description" content="${escapar(descricao)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${tipo}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="gldev" />`,
    `<meta property="og:title" content="${escapar(titulo)}" />`,
    `<meta property="og:description" content="${escapar(descricao)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${imagemAbsoluta}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapar(titulo)}" />`,
    `<meta name="twitter:description" content="${escapar(descricao)}" />`,
    `<meta name="twitter:image" content="${imagemAbsoluta}" />`,
  ].join('\n    ');
}

/** Dados estruturados (schema.org) que ajudam o Google a entender quem é o George. */
function dadosEstruturados() {
  const pessoa = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: perfil.nomeCompleto,
    alternateName: perfil.nome,
    jobTitle: perfil.cargo,
    description: perfil.chamada,
    url: site.url,
    image: `${site.url}${site.imagemCompartilhamento}`,
    email: `mailto:${perfil.contato.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Rio de Janeiro', addressRegion: 'RJ', addressCountry: 'BR' },
    sameAs: [perfil.contato.linkedin, perfil.contato.github].filter(Boolean),
    knowsAbout: ['Power BI', 'DAX', 'Power Query', 'Python', 'SQL', 'Automação de processos (RPA)', 'Power Platform'],
  };
  return `<script type="application/ld+json">${JSON.stringify(pessoa)}</script>`;
}

const META_INICIAL: Meta = {
  titulo: site.titulo,
  descricao: site.descricao,
  caminho: '/',
  imagem: site.imagemCompartilhamento,
  tipo: 'website',
};

/**
 * Gera, no build, um HTML para cada projeto com título, descrição e imagem
 * próprios — assim o link de cada projeto aparece bonito ao ser compartilhado —
 * além do sitemap.xml.
 */
export function paginasEstaticas(): Plugin {
  let pastaSaida = 'dist';

  return {
    name: 'gldev-paginas-estaticas',
    configResolved(config) {
      pastaSaida = config.build.outDir;
    },
    transformIndexHtml(html) {
      return html.replace('<!-- meta -->', `${tagsMeta(META_INICIAL)}\n    ${dadosEstruturados()}`);
    },
    closeBundle() {
      const htmlBase = readFileSync(join(pastaSaida, 'index.html'), 'utf-8');
      const metaInicial = tagsMeta(META_INICIAL);

      for (const projeto of projetos) {
        const meta = tagsMeta({
          titulo: `${projeto.titulo} — George Lucas | gldev`,
          descricao: projeto.resumo,
          caminho: `/projetos/${projeto.slug}`,
          imagem: `/og/${projeto.slug}.jpg`,
          tipo: 'article',
        });
        const pasta = join(pastaSaida, 'projetos', projeto.slug);
        mkdirSync(pasta, { recursive: true });
        writeFileSync(join(pasta, 'index.html'), htmlBase.replace(metaInicial, meta));
      }

      const hoje = new Date().toISOString().slice(0, 10);
      const enderecos = ['/', ...projetos.map((p) => `/projetos/${p.slug}`)];
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...enderecos.map(
          (caminho) =>
            `  <url><loc>${site.url}${caminho === '/' ? '' : caminho}</loc><lastmod>${hoje}</lastmod><priority>${caminho === '/' ? '1.0' : '0.8'}</priority></url>`,
        ),
        '</urlset>',
        '',
      ].join('\n');
      writeFileSync(join(pastaSaida, 'sitemap.xml'), sitemap);
    },
  };
}

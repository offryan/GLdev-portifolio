/**
 * Gera as imagens de compartilhamento (Open Graph) e o ícone para iPhone.
 *
 * Rode sempre que mudar nome, cargo ou projetos:
 *   npm run imagens
 *
 * Requer o Playwright com Chromium instalado na máquina
 * (npx playwright install chromium).
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { perfil } from '../src/conteudo/perfil.ts';
import { projetos } from '../src/conteudo/projetos.ts';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright') as typeof import('playwright');

const raiz = join(import.meta.dirname, '..');

function fonte(pacote: string, arquivo: string) {
  const caminho = join(raiz, 'node_modules', '@fontsource-variable', pacote, 'files', arquivo);
  return `data:font/woff2;base64,${readFileSync(caminho).toString('base64')}`;
}

function imagem(caminhoPublico: string) {
  const conteudo = readFileSync(join(raiz, 'public', caminhoPublico));
  const tipo = caminhoPublico.split('.').pop() === 'webp' ? 'webp' : caminhoPublico.endsWith('.png') ? 'png' : 'jpeg';
  return `data:image/${tipo};base64,${conteudo.toString('base64')}`;
}

const ICONE_GL = `
<svg viewBox="0 0 64 64" width="56" height="56">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#8b5cf6"/><stop offset=".55" stop-color="#22d3ee"/><stop offset="1" stop-color="#34d399"/>
  </linearGradient></defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#0a0b16"/>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="none" stroke="url(#g)" stroke-width="3"/>
  <path d="M27 21h-6a6 6 0 0 0-6 6v10a6 6 0 0 0 6 6h6v-9h-5" fill="none" stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M35 21v22h13" fill="none" stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const estilos = `
@font-face { font-family: 'Space Grotesk'; src: url(${fonte('space-grotesk', 'space-grotesk-latin-wght-normal.woff2')}); font-weight: 300 700; }
@font-face { font-family: 'Inter'; src: url(${fonte('inter', 'inter-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: 'JetBrains Mono'; src: url(${fonte('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')}); font-weight: 100 800; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; font-family: 'Inter'; color: #eef0ff;
  background:
    radial-gradient(circle at 12% 18%, rgba(139,92,246,.55), transparent 42%),
    radial-gradient(circle at 92% 30%, rgba(34,211,238,.38), transparent 40%),
    radial-gradient(circle at 70% 105%, rgba(52,211,153,.35), transparent 45%),
    radial-gradient(circle at 30% 95%, rgba(244,114,182,.22), transparent 40%),
    #05060d; }
.grade { position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 48px 48px; -webkit-mask-image: radial-gradient(ellipse at 40% 40%, #000 30%, transparent 75%); }
.conteudo { position: absolute; inset: 0; padding: 64px 72px; display: flex; gap: 48px; }
.texto { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.marca { display: flex; align-items: center; gap: 14px; font-family: 'Space Grotesk'; font-size: 30px; font-weight: 700; letter-spacing: -.03em; }
.marca span { font-weight: 400; color: #a3a9c2; } .marca i { font-style: normal; color: #22d3ee; }
.rotulo { margin-top: auto; font-family: 'JetBrains Mono'; font-size: 20px; letter-spacing: .14em; text-transform: uppercase; color: #22d3ee; }
h1 { font-family: 'Space Grotesk'; font-weight: 700; letter-spacing: -.035em; line-height: 1.02; margin-top: 14px; }
.grad { background: linear-gradient(110deg, #c4b5fd, #67e8f9 50%, #6ee7b7); -webkit-background-clip: text; color: transparent; }
p.resumo { margin-top: 20px; font-size: 25px; line-height: 1.4; color: #b4bad2; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
.chips span { font-family: 'JetBrains Mono'; font-size: 17px; padding: 7px 14px; border-radius: 999px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.16); }
.lado { width: 400px; flex-shrink: 0; display: flex; align-items: center; }
.cartao { width: 100%; border-radius: 22px; background: rgba(10,11,22,.72); border: 1px solid rgba(255,255,255,.18); padding: 26px; box-shadow: 0 30px 80px -20px rgba(0,0,0,.7), 0 0 80px -20px rgba(139,92,246,.6); }
.cartao h2 { font-family: 'JetBrains Mono'; font-size: 15px; letter-spacing: .14em; text-transform: uppercase; color: #a3a9c2; margin-bottom: 18px; font-weight: 500; }
.no { display: flex; align-items: center; gap: 14px; font-family: 'Space Grotesk'; font-size: 21px; font-weight: 600; }
.no b { width: 30px; height: 30px; flex-shrink: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono'; font-size: 14px; color: #05060d; background: linear-gradient(135deg, #c4b5fd, #67e8f9); }
.linha { width: 2px; height: 16px; margin: 4px 0 4px 14px; background: linear-gradient(#8b5cf6, #22d3ee); }
.janela { width: 100%; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,.2); box-shadow: 0 30px 80px -20px rgba(0,0,0,.7), 0 0 90px -20px rgba(245,158,11,.5); transform: perspective(1200px) rotateY(-10deg); }
.barra { height: 30px; background: #12131f; display: flex; align-items: center; gap: 7px; padding: 0 12px; }
.barra i { width: 10px; height: 10px; border-radius: 50%; background: #ff5f57; } .barra i:nth-child(2) { background: #febc2e; } .barra i:nth-child(3) { background: #28c840; }
.janela img { display: block; width: 100%; }
.terminal { font-family: 'JetBrains Mono'; font-size: 17px; line-height: 2; color: #a3a9c2; }
.terminal .ok { color: #34d399; } .terminal .cmd { color: #eef0ff; }
.rodape { position: absolute; left: 0; right: 0; bottom: 0; height: 6px; background: linear-gradient(90deg, #8b5cf6, #22d3ee, #34d399); }
`;

function pagina(conteudo: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${estilos}</style></head>
<body><div class="grade"></div><div class="conteudo">${conteudo}</div><div class="rodape"></div></body></html>`;
}

const marca = `<div class="marca">${ICONE_GL}<div>gl<span>dev</span><i>.</i>com.br</div></div>`;

function htmlInicial() {
  const chips = ['Power BI', 'Python', 'SQL', 'Power Platform', 'Automação'].map((c) => `<span>${c}</span>`).join('');
  return pagina(`
    <div class="texto">
      ${marca}
      <div class="rotulo">Portfólio</div>
      <h1 style="font-size: 92px">${perfil.nome}</h1>
      <p class="resumo"><span class="grad" style="font-weight:600">${perfil.cargo}.</span> ${perfil.chamada}</p>
      <div class="chips">${chips}</div>
    </div>
    <div class="lado" style="position: relative"><img src="${imagem('certificacoes/pl-300.webp')}" style="position: absolute; top: 40px; right: -28px; width: 150px; transform: rotate(8deg); filter: drop-shadow(0 12px 24px rgba(0,0,0,.6)) drop-shadow(0 0 24px rgba(56,152,236,.6)); z-index: 2"><div class="cartao terminal">
      <div class="cmd">$ python gldev.py</div>
      <div>› API sincronizada</div>
      <div>› SLA em dias úteis</div>
      <div>› Siscomex + Oracle</div>
      <div>› KPIs no Power BI</div>
      <div class="ok">✓ -83% trabalho manual</div>
    </div></div>`);
}

function htmlProjeto(projeto: (typeof projetos)[number]) {
  const chips = projeto.tecnologias.slice(0, 4).map((c) => `<span>${c}</span>`).join('');
  const tamanhoTitulo = projeto.titulo.length > 32 ? 54 : 64;
  const lado = projeto.capa
    ? `<div class="janela"><div class="barra"><i></i><i></i><i></i></div><img src="${imagem(projeto.capa)}"></div>`
    : `<div class="cartao"><h2>Como funciona</h2>${projeto.fluxo
        .map((etapa, i) => `${i ? '<div class="linha"></div>' : ''}<div class="no"><b>${i + 1}</b>${etapa.titulo}</div>`)
        .join('')}</div>`;
  return pagina(`
    <div class="texto">
      ${marca}
      <div class="rotulo">${projeto.categoria}</div>
      <h1 style="font-size: ${tamanhoTitulo}px">${projeto.titulo}</h1>
      <p class="resumo">${projeto.resumo}</p>
      <div class="chips">${chips}</div>
    </div>
    <div class="lado" style="${projeto.capa ? 'width: 470px' : ''}">${lado}</div>`);
}

const navegador = await chromium.launch();
const aba = await navegador.newPage({ viewport: { width: 1200, height: 630 } });

async function salvar(html: string, destino: string) {
  await aba.setContent(html, { waitUntil: 'load' });
  await aba.evaluate(() => document.fonts.ready);
  await aba.screenshot({ path: join(raiz, 'public', destino), type: 'jpeg', quality: 88 });
  console.log(`✓ public/${destino}`);
}

await salvar(htmlInicial(), 'og/gldev.jpg');
for (const projeto of projetos) await salvar(htmlProjeto(projeto), `og/${projeto.slug}.jpg`);

// Ícone para a tela inicial do iPhone (180×180)
await aba.setViewportSize({ width: 180, height: 180 });
await aba.setContent(
  `<body style="margin:0;background:#0a0b16;display:flex;align-items:center;justify-content:center;height:180px">${ICONE_GL.replace('width="56" height="56"', 'width="150" height="150"')}</body>`,
);
await aba.screenshot({ path: join(raiz, 'public', 'apple-touch-icon.png') });
console.log('✓ public/apple-touch-icon.png');

await navegador.close();

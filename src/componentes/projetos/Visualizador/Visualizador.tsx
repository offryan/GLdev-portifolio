import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Suspense, useState } from 'react';
import { DEMOS } from '@/demos';
import type { Projeto, Visualizacao } from '@/tipos/conteudo';
import { JanelaNavegador } from '../JanelaNavegador/JanelaNavegador';
import styles from './Visualizador.module.css';

interface VisualizadorProps {
  projeto: Projeto;
}

/** Escolhe a forma de exibir o projeto conforme o tipo de visualização cadastrado. */
export function Visualizador({ projeto }: VisualizadorProps) {
  const { visualizacao } = projeto;
  const linkExterno = 'url' in visualizacao ? visualizacao.url : projeto.links.aoVivo;

  return (
    <JanelaNavegador endereco={enderecoExibido(projeto)} linkExterno={linkExterno}>
      <ConteudoVisualizacao visualizacao={visualizacao} titulo={projeto.titulo} />
    </JanelaNavegador>
  );
}

function enderecoExibido(projeto: Projeto) {
  const { visualizacao } = projeto;
  if ('url' in visualizacao) return visualizacao.url.replace(/^https?:\/\//, '');
  return `gldev.com/projetos/${projeto.slug}`;
}

function ConteudoVisualizacao({ visualizacao, titulo }: { visualizacao: Visualizacao; titulo: string }) {
  switch (visualizacao.tipo) {
    case 'site':
    case 'powerbi':
      return <Incorporado url={visualizacao.url} titulo={titulo} />;
    case 'video':
      return <Incorporado url={urlVideo(visualizacao.url)} titulo={titulo} />;
    case 'galeria':
      return <Galeria imagens={visualizacao.imagens} />;
    case 'codigo':
      return (
        <div className={styles.codigo}>
          <span className={styles.linguagem}>{visualizacao.linguagem}</span>
          <pre>
            <code>{visualizacao.codigo}</code>
          </pre>
        </div>
      );
    case 'demo': {
      const Demo = DEMOS[visualizacao.demo];
      return (
        <Suspense fallback={<div className={styles.carregando}>Carregando demonstração…</div>}>
          <Demo />
        </Suspense>
      );
    }
  }
}

/** Converte links do YouTube no formato que pode ser incorporado. */
function urlVideo(url: string) {
  const id = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
}

function Incorporado({ url, titulo }: { url: string; titulo: string }) {
  const [carregou, setCarregou] = useState(false);
  return (
    <div className={styles.incorporado}>
      {!carregou && <div className={styles.carregando}>Carregando…</div>}
      <iframe
        src={url}
        title={titulo}
        loading="lazy"
        allow="fullscreen; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
        onLoad={() => setCarregou(true)}
      />
    </div>
  );
}

function Galeria({ imagens }: { imagens: { src: string; legenda: string }[] }) {
  const [atual, setAtual] = useState(0);
  if (imagens.length === 0) return <div className={styles.carregando}>Nenhuma imagem cadastrada.</div>;

  const ir = (passo: number) => setAtual((i) => (i + passo + imagens.length) % imagens.length);
  const imagem = imagens[atual];

  return (
    <div className={styles.galeria}>
      <figure className={styles.imagemPrincipal}>
        <img src={imagem.src} alt={imagem.legenda} />
        <figcaption>{imagem.legenda}</figcaption>
        {imagens.length > 1 && (
          <>
            <button type="button" className={styles.anterior} onClick={() => ir(-1)} aria-label="Imagem anterior">
              <ChevronLeft />
            </button>
            <button type="button" className={styles.proxima} onClick={() => ir(1)} aria-label="Próxima imagem">
              <ChevronRight />
            </button>
          </>
        )}
      </figure>
      {imagens.length > 1 && (
        <div className={styles.miniaturas}>
          {imagens.map((img, indice) => (
            <button
              key={img.src}
              type="button"
              className={indice === atual ? styles.miniaturaAtiva : undefined}
              onClick={() => setAtual(indice)}
              aria-label={img.legenda}
            >
              <img src={img.src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

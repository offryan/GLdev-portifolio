import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { Projeto, Visualizacao } from '@/tipos/conteudo';
import { DETALHES_VISUALIZACAO, rotuloVisualizacao } from '@/utilitarios/visualizacao';
import { JanelaNavegador } from '../JanelaNavegador/JanelaNavegador';
import { Simulacao } from '../Simulacao/Simulacao';
import { VisualizadorCodigo } from '../VisualizadorCodigo/VisualizadorCodigo';
import styles from './Visualizador.module.css';

interface VisualizadorProps {
  projeto: Projeto;
}

/** Janela com abas, uma para cada forma de visualizar o projeto. */
export function Visualizador({ projeto }: VisualizadorProps) {
  const [abaAtiva, setAbaAtiva] = useState(0);
  const visualizacao = projeto.visualizacoes[abaAtiva];
  if (!visualizacao) return null;

  const linkExterno = 'url' in visualizacao ? visualizacao.url : undefined;
  const endereco = linkExterno
    ? linkExterno.replace(/^https?:\/\//, '')
    : `gldev.com/projetos/${projeto.slug}${'arquivo' in visualizacao ? `/${visualizacao.arquivo.split('/').pop()}` : ''}`;

  return (
    <div>
      {projeto.visualizacoes.length > 1 && (
        <div className={styles.abas} role="tablist" aria-label="Formas de visualizar o projeto">
          {projeto.visualizacoes.map((item, indice) => {
            const Icone = DETALHES_VISUALIZACAO[item.tipo].icone;
            const ativa = indice === abaAtiva;
            return (
              <button
                key={indice}
                type="button"
                role="tab"
                aria-selected={ativa}
                className={ativa ? styles.abaAtiva : undefined}
                onClick={() => setAbaAtiva(indice)}
              >
                {ativa && <motion.span layoutId="aba-visualizacao" className={styles.fundoAba} />}
                <span className={styles.rotuloAba}>
                  <Icone size={15} /> {rotuloVisualizacao(item)}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <JanelaNavegador endereco={endereco} linkExterno={linkExterno}>
        <ConteudoVisualizacao key={abaAtiva} visualizacao={visualizacao} titulo={projeto.titulo} />
      </JanelaNavegador>
    </div>
  );
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
      return <VisualizadorCodigo arquivo={visualizacao.arquivo} linguagem={visualizacao.linguagem} />;
    case 'simulacao':
      return <Simulacao titulo={titulo} etapas={visualizacao.etapas} />;
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
    <>
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
      <p className={styles.dica}>
        Não carregou?{' '}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Abrir em uma nova aba <ExternalLink size={13} />
        </a>
      </p>
    </>
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

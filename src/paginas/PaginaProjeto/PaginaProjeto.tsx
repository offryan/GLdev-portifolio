import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Botao } from '@/componentes/interface/Botao/Botao';
import { IconeGithub } from '@/componentes/interface/IconesMarcas/IconesMarcas';
import { Revelar } from '@/componentes/interface/Revelar/Revelar';
import { Visualizador } from '@/componentes/projetos/Visualizador/Visualizador';
import { projetos } from '@/conteudo/projetos';
import { DETALHES_VISUALIZACAO, rotuloVisualizacao } from '@/utilitarios/visualizacao';
import { PaginaNaoEncontrada } from '../PaginaNaoEncontrada/PaginaNaoEncontrada';
import styles from './PaginaProjeto.module.css';

const suave = [0.22, 1, 0.36, 1] as const;

export function PaginaProjeto() {
  const { slug } = useParams();
  const indice = projetos.findIndex((p) => p.slug === slug);
  const projeto = projetos[indice];

  useEffect(() => {
    if (projeto) document.title = `${projeto.titulo} — George Lucas | gldev`;
    return () => {
      document.title = 'George Lucas — Dados, BI e Automação | gldev';
    };
  }, [projeto]);

  if (!projeto) return <PaginaNaoEncontrada />;

  const anterior = projetos[(indice - 1 + projetos.length) % projetos.length];
  const proximo = projetos[(indice + 1) % projetos.length];
  const principal = projeto.visualizacoes[0];
  const Icone = DETALHES_VISUALIZACAO[principal.tipo].icone;

  return (
    <article className={styles.pagina}>
      <div className="container">
        <Link to="/#projetos" className={styles.voltar}>
          <ArrowLeft size={16} /> Todos os projetos
        </Link>

        <header className={styles.cabecalho}>
          <motion.div
            className={styles.meta}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: suave }}
          >
            <span className={styles.selo}>
              <Icone size={14} /> {rotuloVisualizacao(principal)}
            </span>
            <span>{projeto.categoria}</span>
            {projeto.ano && (
              <>
                <span>·</span>
                <span>{projeto.ano}</span>
              </>
            )}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.1, ease: suave }}
          >
            {projeto.titulo}
          </motion.h1>
          <motion.p
            className={styles.resumo}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: suave }}
          >
            {projeto.resumo}
          </motion.p>
        </header>

        <motion.div
          className={styles.visualizador}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: suave }}
        >
          <Visualizador projeto={projeto} />
        </motion.div>

        <div className={styles.detalhes}>
          <Revelar className={styles.descricao}>
            <h2>Sobre o projeto</h2>
            {projeto.descricao.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </Revelar>

          <Revelar atraso={0.15} className={styles.lateral}>
            <div className={styles.resultados}>
              {projeto.resultados.map((resultado) => (
                <div key={resultado.rotulo}>
                  <strong className="texto-gradiente">{resultado.valor}</strong>
                  <span>{resultado.rotulo}</span>
                </div>
              ))}
            </div>

            <h3>Tecnologias</h3>
            <ul className={styles.tecnologias}>
              {projeto.tecnologias.map((tecnologia) => (
                <li key={tecnologia}>{tecnologia}</li>
              ))}
            </ul>

            {(projeto.links.aoVivo || projeto.links.repositorio) && (
              <div className={styles.links}>
                {projeto.links.aoVivo && (
                  <Botao href={projeto.links.aoVivo} externo icone={<ExternalLink size={16} />}>
                    Abrir em nova aba
                  </Botao>
                )}
                {projeto.links.repositorio && (
                  <Botao href={projeto.links.repositorio} externo variante="secundario" icone={<IconeGithub tamanho={16} />}>
                    Ver no GitHub
                  </Botao>
                )}
              </div>
            )}
          </Revelar>
        </div>

        {projetos.length > 1 && (
          <nav className={styles.navegacao} aria-label="Outros projetos">
            <Link to={`/projetos/${anterior.slug}`}>
              <span>
                <ArrowLeft size={14} /> Anterior
              </span>
              <strong>{anterior.titulo}</strong>
            </Link>
            <Link to={`/projetos/${proximo.slug}`} className={styles.proximo}>
              <span>
                Próximo <ArrowRight size={14} />
              </span>
              <strong>{proximo.titulo}</strong>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}

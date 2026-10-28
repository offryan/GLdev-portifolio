import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Botao } from '@/componentes/interface/Botao/Botao';
import { IconeGithub } from '@/componentes/interface/IconesMarcas/IconesMarcas';
import { Revelar } from '@/componentes/interface/Revelar/Revelar';
import { DiagramaFluxo } from '@/componentes/projetos/DiagramaFluxo/DiagramaFluxo';
import { Visualizador } from '@/componentes/projetos/Visualizador/Visualizador';
import { projetos } from '@/conteudo/projetos';
import { useMetadados } from '@/ganchos/useMetadados';
import { DETALHES_VISUALIZACAO, rotuloVisualizacao } from '@/utilitarios/visualizacao';
import { PaginaNaoEncontrada } from '../PaginaNaoEncontrada/PaginaNaoEncontrada';
import styles from './PaginaProjeto.module.css';

const suave = [0.22, 1, 0.36, 1] as const;

export function PaginaProjeto() {
  const { slug } = useParams();
  const indice = projetos.findIndex((p) => p.slug === slug);
  const projeto = projetos[indice];

  useMetadados(projeto && { titulo: `${projeto.titulo} — George Lucas | gldev`, descricao: projeto.resumo });

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

        <section className={styles.estudo} aria-labelledby="titulo-estudo">
          <Revelar>
            <h2 id="titulo-estudo" className={styles.tituloEstudo}>
              Estudo de <span className="texto-gradiente">caso</span>
            </h2>
          </Revelar>

          <div className={styles.bloco}>
            <Revelar className={styles.rotuloBloco}>
              <span>01</span> O problema
            </Revelar>
            <Revelar atraso={0.1}>
              <p className={styles.problema}>{projeto.problema}</p>
            </Revelar>
          </div>

          <div className={styles.bloco}>
            <Revelar className={styles.rotuloBloco}>
              <span>02</span> A solução
            </Revelar>
            <div>
              <ol className={styles.passos}>
                {projeto.solucao.map((passo, indice) => (
                  <motion.li
                    key={passo}
                    initial={{ opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.7, delay: indice * 0.08, ease: suave }}
                  >
                    {passo}
                  </motion.li>
                ))}
              </ol>
              <h3 className={styles.subtitulo}>Como funciona</h3>
              <DiagramaFluxo etapas={projeto.fluxo} />
            </div>
          </div>

          <div className={styles.bloco}>
            <Revelar className={styles.rotuloBloco}>
              <span>03</span> O resultado
            </Revelar>
            <div>
              <Revelar>
                <p className={styles.impacto}>{projeto.impacto}</p>
              </Revelar>
              <Revelar atraso={0.1} className={styles.resultados}>
                {projeto.resultados.map((resultado) => (
                  <div key={resultado.rotulo}>
                    <strong className="texto-gradiente">{resultado.valor}</strong>
                    <span>{resultado.rotulo}</span>
                  </div>
                ))}
              </Revelar>
              <Revelar atraso={0.15}>
                <h3 className={styles.subtitulo}>Tecnologias</h3>
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
                      <Botao
                        href={projeto.links.repositorio}
                        externo
                        variante="secundario"
                        icone={<IconeGithub tamanho={16} />}
                      >
                        Ver no GitHub
                      </Botao>
                    )}
                  </div>
                )}
              </Revelar>
            </div>
          </div>
        </section>

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

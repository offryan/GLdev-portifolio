import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { CartaoProjeto } from '@/componentes/projetos/CartaoProjeto/CartaoProjeto';
import { TituloSecao } from '@/componentes/interface/TituloSecao/TituloSecao';
import { projetos } from '@/conteudo/projetos';
import styles from './Projetos.module.css';

const TODOS = 'Todos';

export function Projetos() {
  const [filtro, setFiltro] = useState(TODOS);
  const categorias = useMemo(() => [TODOS, ...new Set(projetos.map((p) => p.categoria))], []);
  const visiveis = filtro === TODOS ? projetos : projetos.filter((p) => p.categoria === filtro);

  return (
    <section id="projetos" className={styles.projetos}>
      <div className="container">
        <TituloSecao
          numero="03"
          rotulo="Projetos"
          titulo="Teste, explore,"
          destaque="visualize."
          subtitulo="Painéis ao vivo, simulações dos robôs e o código de cada projeto — clique e explore."
        />

        <div className={styles.filtros} role="tablist" aria-label="Filtrar projetos por categoria">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              role="tab"
              aria-selected={filtro === categoria}
              className={filtro === categoria ? styles.filtroAtivo : undefined}
              onClick={() => setFiltro(categoria)}
            >
              {filtro === categoria && <motion.span layoutId="filtro-ativo" className={styles.fundoFiltro} />}
              <span className={styles.rotuloFiltro}>{categoria}</span>
            </button>
          ))}
        </div>

        <motion.div layout className={styles.grade}>
          <AnimatePresence mode="popLayout">
            {visiveis.map((projeto) => (
              <motion.div
                key={projeto.slug}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <CartaoProjeto projeto={projeto} indice={projetos.indexOf(projeto)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

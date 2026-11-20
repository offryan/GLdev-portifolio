import { motion } from 'framer-motion';
import styles from './TerminalAnimado.module.css';

const LINHAS = [
  { texto: '$ python -m ingestao.ingerir', tipo: 'comando' },
  { texto: '› 90 arquivos checados no ONS', tipo: 'ok' },
  { texto: '› só baixa o que mudou (ETag)', tipo: 'ok' },
  { texto: '$ dbt build', tipo: 'comando' },
  { texto: '› 18,4 mi linhas na silver', tipo: 'ok' },
  { texto: '› 61 testes de qualidade ok', tipo: 'ok' },
  { texto: '› modelo estrela na gold', tipo: 'ok' },
  { texto: '✓ dashboard no GitHub Pages', tipo: 'sucesso' },
] as const;

const BARRAS = [72, 88, 80, 84, 78, 86, 90, 94];

/** Cartão decorativo do topo: um "terminal" executando um pipeline de dados. */
export function TerminalAnimado() {
  return (
    <div className={styles.janela}>
      <div className={styles.barraTitulo}>
        <span className={styles.bolinha} />
        <span className={styles.bolinha} />
        <span className={styles.bolinha} />
        <span className={styles.nomeArquivo}>~/gldev/energia-sin-pipeline</span>
      </div>

      <div className={styles.corpo}>
        {LINHAS.map((linha, indice) => (
          <motion.p
            key={linha.texto}
            className={`${styles.linha} ${styles[linha.tipo]}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + indice * 0.45, duration: 0.4 }}
          >
            {linha.texto}
            {linha.tipo === 'ok' && <span className={styles.check}>✓</span>}
          </motion.p>
        ))}
        <motion.span
          className={styles.cursor}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 + LINHAS.length * 0.45 }}
        />
      </div>

      <div className={styles.grafico}>
        <div className={styles.legenda}>
          <span>Pipeline diário</span>
          <strong>18,4 mi linhas</strong>
        </div>
        <div className={styles.barras}>
          {BARRAS.map((altura, indice) => (
            <motion.span
              key={indice}
              className={styles.barra}
              initial={{ height: 0 }}
              animate={{ height: `${altura}%` }}
              transition={{ delay: 2 + indice * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

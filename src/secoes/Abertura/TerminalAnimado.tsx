import { motion } from 'framer-motion';
import styles from './TerminalAnimado.module.css';

const LINHAS = [
  { texto: '$ python gldev.py --pipeline', tipo: 'comando' },
  { texto: '› conectando ao SAP Business One', tipo: 'ok' },
  { texto: '› 1.248.392 registros tratados', tipo: 'ok' },
  { texto: '› modelo star schema atualizado', tipo: 'ok' },
  { texto: '› dashboard publicado no Power BI', tipo: 'ok' },
  { texto: '✓ trabalho manual reduzido em 83%', tipo: 'sucesso' },
] as const;

const BARRAS = [38, 62, 45, 80, 56, 92, 70, 100];

/** Cartão decorativo do topo: um "terminal" executando um pipeline de dados. */
export function TerminalAnimado() {
  return (
    <div className={styles.janela}>
      <div className={styles.barraTitulo}>
        <span className={styles.bolinha} />
        <span className={styles.bolinha} />
        <span className={styles.bolinha} />
        <span className={styles.nomeArquivo}>~/gldev/pipeline.py</span>
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
          <span>Produtividade</span>
          <strong>+41%</strong>
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

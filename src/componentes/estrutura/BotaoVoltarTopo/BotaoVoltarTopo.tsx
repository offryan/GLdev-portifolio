import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { voltarAoTopo } from '@/utilitarios/navegacao';
import styles from './BotaoVoltarTopo.module.css';

const APARECER_APOS_PX = 600;
const RAIO = 22;

/** Botão flutuante que sobe ao topo da página; o anel em volta mostra o quanto já foi lido. */
export function BotaoVoltarTopo() {
  const [visivel, setVisivel] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > APARECER_APOS_PX);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.button
          type="button"
          className={styles.botao}
          onClick={voltarAoTopo}
          aria-label="Voltar ao topo da página"
          title="Voltar ao topo"
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.25 }}
        >
          <svg className={styles.anel} viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r={RAIO} className={styles.trilho} />
            <motion.circle cx="26" cy="26" r={RAIO} className={styles.progresso} style={{ pathLength: scrollYProgress }} />
          </svg>
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

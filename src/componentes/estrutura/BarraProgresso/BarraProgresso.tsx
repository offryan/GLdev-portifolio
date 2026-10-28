import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './BarraProgresso.module.css';

/** Linha no topo da tela que mostra o quanto da página já foi lida. */
export function BarraProgresso() {
  const { scrollYProgress } = useScroll();
  const escala = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className={styles.barra} style={{ scaleX: escala }} />;
}

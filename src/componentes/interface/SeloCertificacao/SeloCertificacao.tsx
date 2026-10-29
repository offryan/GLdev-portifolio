import { motion } from 'framer-motion';
import { certificacaoDestaque } from '@/conteudo/formacao';
import styles from './SeloCertificacao.module.css';

/** Selo da certificação em destaque, flutuando ao lado do terminal no topo do site. */
export function SeloCertificacao() {
  const { titulo, codigo, emissor, imagem, link } = certificacaoDestaque;
  const externo = Boolean(link);

  return (
    <motion.a
      href={link || '#formacao'}
      target={externo ? '_blank' : undefined}
      rel={externo ? 'noopener noreferrer' : undefined}
      className={styles.selo}
      aria-label={`${emissor} ${codigo}: ${titulo}`}
      title={`${titulo} (${codigo})`}
      initial={{ opacity: 0, scale: 0.4, rotate: 25 }}
      animate={{ opacity: 1, scale: 1, rotate: 8 }}
      transition={{ delay: 1.6, type: 'spring', stiffness: 180, damping: 14 }}
    >
      <span className={styles.brilho} aria-hidden="true" />
      <img src={imagem} alt="" width={337} height={348} />
      <span className={styles.rotulo}>
        <strong>{codigo}</strong> Certificado
      </span>
    </motion.a>
  );
}

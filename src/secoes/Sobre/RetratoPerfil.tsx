import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { perfil } from '@/conteudo/perfil';
import styles from './RetratoPerfil.module.css';

/**
 * Foto do George na seção "Sobre": surge de baixo para cima ao entrar na tela,
 * com moldura em gradiente, brilho de fundo e um leve movimento (parallax) na rolagem.
 */
export function RetratoPerfil() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const deslocamento = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div ref={ref} className={styles.envoltorio}>
      <span className={styles.brilho} aria-hidden="true" />

      <motion.figure
        className={styles.retrato}
        initial={{ clipPath: 'inset(100% 0% 0% 0% round 24px)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.moldura}>
          <motion.img
            src={perfil.foto.src}
            srcSet={`${perfil.foto.srcPequena} 480w, ${perfil.foto.src} 800w`}
            sizes="(max-width: 900px) 320px, 400px"
            alt={perfil.foto.descricao}
            width={800}
            height={1067}
            loading="lazy"
            decoding="async"
            style={{ y: deslocamento }}
          />
          <span className={styles.tom} aria-hidden="true" />
          <span className={`${styles.canto} ${styles.cantoA}`} aria-hidden="true" />
          <span className={`${styles.canto} ${styles.cantoB}`} aria-hidden="true" />
        </div>

        <figcaption className={styles.legenda}>
          <span className={styles.ponto} aria-hidden="true" />
          <span>
            <strong>{perfil.nomeCompleto}</strong>
            <small>{perfil.localizacao}</small>
          </span>
        </figcaption>
      </motion.figure>
    </div>
  );
}

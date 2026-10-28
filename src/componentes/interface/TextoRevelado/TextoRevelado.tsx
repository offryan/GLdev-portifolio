import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import styles from './TextoRevelado.module.css';

interface TextoReveladoProps {
  texto: string;
}

/** Texto que "acende" palavra por palavra conforme a página é rolada. */
export function TextoRevelado({ texto }: TextoReveladoProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] });
  const palavras = texto.split(' ');

  return (
    <p ref={ref} className={styles.texto}>
      {palavras.map((palavra, indice) => {
        const inicio = indice / palavras.length;
        const fim = inicio + 1 / palavras.length;
        return (
          <Palavra key={indice} progresso={scrollYProgress} faixa={[inicio, fim]}>
            {palavra}
          </Palavra>
        );
      })}
    </p>
  );
}

interface PalavraProps {
  children: string;
  progresso: MotionValue<number>;
  faixa: [number, number];
}

function Palavra({ children, progresso, faixa }: PalavraProps) {
  const opacidade = useTransform(progresso, faixa, [0.14, 1]);
  return (
    <span className={styles.palavra}>
      <motion.span style={{ opacity: opacidade }}>{children}</motion.span>{' '}
    </span>
  );
}

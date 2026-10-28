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

// A palavra "apagada" mantém contraste suficiente para leitura (texto grande, mínimo 3:1)
const COR_APAGADA = '#646985';
const COR_ACESA = '#eef0ff';

function Palavra({ children, progresso, faixa }: PalavraProps) {
  const cor = useTransform(progresso, faixa, [COR_APAGADA, COR_ACESA]);
  return (
    <span className={styles.palavra}>
      <motion.span style={{ color: cor }}>{children}</motion.span>{' '}
    </span>
  );
}

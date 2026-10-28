import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevelarProps {
  children: ReactNode;
  atraso?: number;
  direcao?: 'cima' | 'esquerda' | 'direita';
  className?: string;
}

const deslocamentos = {
  cima: { x: 0, y: 48 },
  esquerda: { x: -48, y: 0 },
  direita: { x: 48, y: 0 },
};

/** Faz o conteúdo surgir suavemente quando entra na tela. */
export function Revelar({ children, atraso = 0, direcao = 'cima', className }: RevelarProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)', ...deslocamentos[direcao] }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay: atraso, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

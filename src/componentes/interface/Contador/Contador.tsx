import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ContadorProps {
  valor: number;
  prefixo?: string;
  sufixo?: string;
}

/** Número que conta de 0 até o valor quando aparece na tela. */
export function Contador({ valor, prefixo = '', sufixo = '' }: ContadorProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const visivel = useInView(ref, { once: true });
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!visivel) return;
    const controle = animate(0, valor, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setAtual(Math.round(v)),
    });
    return () => controle.stop();
  }, [visivel, valor]);

  return (
    <span ref={ref}>
      {prefixo}
      {atual}
      {sufixo}
    </span>
  );
}

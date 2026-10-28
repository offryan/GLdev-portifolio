import { useEffect, useState } from 'react';

/** Informa qual seção está visível no momento (para destacar no menu). */
export function useSecaoAtiva(ids: readonly string[]) {
  const [ativa, setAtiva] = useState<string>('');

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) setAtiva(entrada.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const id of ids) {
      const elemento = document.getElementById(id);
      if (elemento) observador.observe(elemento);
    }
    return () => observador.disconnect();
  }, [ids]);

  return ativa;
}

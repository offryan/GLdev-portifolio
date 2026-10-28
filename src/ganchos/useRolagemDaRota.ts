import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { rolarAteSecao } from '@/utilitarios/navegacao';

/** Ao trocar de página, volta ao topo — ou vai até a seção indicada após o "#". */
export function useRolagemDaRota() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Aguarda a página ser desenhada antes de rolar
      const espera = window.setTimeout(() => rolarAteSecao(hash.slice(1)), 60);
      return () => window.clearTimeout(espera);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
}

import { useEffect } from 'react';
import { site } from '@/conteudo/site';

interface Metadados {
  titulo: string;
  descricao: string;
}

function definirDescricao(texto: string) {
  document.querySelector('meta[name="description"]')?.setAttribute('content', texto);
}

/** Atualiza o título da aba e a descrição da página enquanto ela estiver aberta. */
export function useMetadados(metadados: Metadados | undefined) {
  const titulo = metadados?.titulo;
  const descricao = metadados?.descricao;

  useEffect(() => {
    if (!titulo || !descricao) return;
    document.title = titulo;
    definirDescricao(descricao);
    return () => {
      document.title = site.titulo;
      definirDescricao(site.descricao);
    };
  }, [titulo, descricao]);
}

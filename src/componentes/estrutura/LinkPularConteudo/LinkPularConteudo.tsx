import type { MouseEvent } from 'react';
import styles from './LinkPularConteudo.module.css';

export const ID_CONTEUDO = 'conteudo';

/**
 * Primeiro item da página para quem navega pelo teclado ou leitor de tela:
 * fica invisível até receber o foco (Tab) e leva direto ao conteúdo, pulando o menu.
 */
export function LinkPularConteudo() {
  function pular(evento: MouseEvent<HTMLAnchorElement>) {
    evento.preventDefault();
    const conteudo = document.getElementById(ID_CONTEUDO);
    conteudo?.focus({ preventScroll: true });
    conteudo?.scrollIntoView({ block: 'start' });
  }

  return (
    <a href={`#${ID_CONTEUDO}`} className={styles.link} onClick={pular}>
      Pular para o conteúdo
    </a>
  );
}

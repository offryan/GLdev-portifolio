import { ExternalLink, Maximize2 } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import styles from './JanelaNavegador.module.css';

interface JanelaNavegadorProps {
  endereco: string;
  linkExterno?: string;
  children: ReactNode;
}

/** Moldura que imita uma janela de navegador ao redor da visualização do projeto. */
export function JanelaNavegador({ endereco, linkExterno, children }: JanelaNavegadorProps) {
  const refJanela = useRef<HTMLDivElement>(null);

  function telaCheia() {
    refJanela.current?.requestFullscreen?.().catch(() => undefined);
  }

  return (
    <div ref={refJanela} className={styles.janela}>
      <div className={styles.barra}>
        <div className={styles.bolinhas} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.endereco}>
          <span className={styles.cadeado} aria-hidden="true">●</span>
          {endereco}
        </div>
        <div className={styles.acoes}>
          {linkExterno && (
            <a href={linkExterno} target="_blank" rel="noopener noreferrer" aria-label="Abrir em nova aba" title="Abrir em nova aba">
              <ExternalLink size={16} />
            </a>
          )}
          <button type="button" onClick={telaCheia} aria-label="Tela cheia" title="Tela cheia">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
      <div className={styles.conteudo}>{children}</div>
    </div>
  );
}

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Botao.module.css';

interface BotaoProps {
  children: ReactNode;
  /** Endereço externo (https://...), âncora (#secao) ou arquivo. */
  href?: string;
  /** Rota interna do site (ex.: /projetos/meu-projeto). */
  para?: string;
  variante?: 'primario' | 'secundario' | 'fantasma';
  icone?: ReactNode;
  externo?: boolean;
  baixar?: boolean;
  onClick?: () => void;
}

export function Botao({
  children,
  href,
  para,
  variante = 'primario',
  icone,
  externo = false,
  baixar = false,
  onClick,
}: BotaoProps) {
  const classe = `${styles.botao} ${styles[variante]}`;
  const conteudo = (
    <>
      <span>{children}</span>
      {icone && <span className={styles.icone}>{icone}</span>}
    </>
  );

  if (para) {
    return (
      <Link to={para} className={classe} onClick={onClick}>
        {conteudo}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classe}
        onClick={onClick}
        download={baixar || undefined}
        target={externo ? '_blank' : undefined}
        rel={externo ? 'noopener noreferrer' : undefined}
      >
        {conteudo}
      </a>
    );
  }

  return (
    <button type="button" className={classe} onClick={onClick}>
      {conteudo}
    </button>
  );
}

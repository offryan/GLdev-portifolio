import { useId } from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  mostrarTexto?: boolean;
  tamanho?: number;
}

/** Marca "gldev": monograma GL dentro de um quadro com gradiente. */
export function Logo({ mostrarTexto = true, tamanho = 36 }: LogoProps) {
  const idGradiente = useId();

  return (
    <span className={styles.logo}>
      <svg
        className={styles.icone}
        width={tamanho}
        height={tamanho}
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={idGradiente} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8b5cf6" />
            <stop offset=".55" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="16" fill="#0a0b16" />
        <rect x="2" y="2" width="60" height="60" rx="16" fill="none" stroke={`url(#${idGradiente})`} strokeWidth="3" />
        <path
          d="M27 21h-6a6 6 0 0 0-6 6v10a6 6 0 0 0 6 6h6v-9h-5"
          fill="none"
          stroke={`url(#${idGradiente})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 21v22h13"
          fill="none"
          stroke={`url(#${idGradiente})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {mostrarTexto && (
        <span className={styles.texto}>
          gl<span className={styles.dev}>dev</span>
          <span className={styles.ponto}>.</span>
        </span>
      )}
    </span>
  );
}

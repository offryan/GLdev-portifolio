import { Logo } from '@/componentes/interface/Logo/Logo';
import { perfil } from '@/conteudo/perfil';
import styles from './Rodape.module.css';

export function Rodape() {
  return (
    <footer className={styles.rodape}>
      <div className={`container ${styles.conteudo}`}>
        <Logo tamanho={28} />
        <p>
          © {new Date().getFullYear()} {perfil.nomeCompleto}. Feito com dados, código e café.
        </p>
      </div>
    </footer>
  );
}

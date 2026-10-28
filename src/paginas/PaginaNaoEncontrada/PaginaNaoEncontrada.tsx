import { ArrowLeft } from 'lucide-react';
import { Botao } from '@/componentes/interface/Botao/Botao';
import styles from './PaginaNaoEncontrada.module.css';

export function PaginaNaoEncontrada() {
  return (
    <section className={styles.pagina}>
      <div className="container">
        <span className={`texto-gradiente ${styles.codigo}`}>404</span>
        <h1>Página não encontrada</h1>
        <p>O endereço pode ter mudado ou o projeto foi removido.</p>
        <Botao para="/" icone={<ArrowLeft size={18} />}>
          Voltar ao início
        </Botao>
      </div>
    </section>
  );
}

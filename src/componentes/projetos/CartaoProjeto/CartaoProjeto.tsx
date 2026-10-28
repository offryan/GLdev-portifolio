import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Projeto } from '@/tipos/conteudo';
import { DETALHES_VISUALIZACAO, rotuloVisualizacao } from '@/utilitarios/visualizacao';
import styles from './CartaoProjeto.module.css';

interface CartaoProjetoProps {
  projeto: Projeto;
  indice: number;
}

/** Inclina o cartão em 3D acompanhando o mouse. */
function inclinar(evento: MouseEvent<HTMLElement>) {
  const caixa = evento.currentTarget.getBoundingClientRect();
  const x = (evento.clientX - caixa.left) / caixa.width;
  const y = (evento.clientY - caixa.top) / caixa.height;
  evento.currentTarget.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
  evento.currentTarget.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
  evento.currentTarget.style.setProperty('--x', `${x * 100}%`);
  evento.currentTarget.style.setProperty('--y', `${y * 100}%`);
}

function endireitar(evento: MouseEvent<HTMLElement>) {
  evento.currentTarget.style.setProperty('--rx', '0deg');
  evento.currentTarget.style.setProperty('--ry', '0deg');
}

export function CartaoProjeto({ projeto, indice }: CartaoProjetoProps) {
  const principal = projeto.visualizacoes[0];
  const Icone = DETALHES_VISUALIZACAO[principal.tipo].icone;
  const cores = { '--cor-a': projeto.cores[0], '--cor-b': projeto.cores[1] } as CSSProperties;

  return (
    <Link
      to={`/projetos/${projeto.slug}`}
      className={styles.cartao}
      style={cores}
      onMouseMove={inclinar}
      onMouseLeave={endireitar}
    >
      <div className={styles.capa}>
        {projeto.capa ? (
          <img src={projeto.capa} alt="" loading="lazy" />
        ) : (
          <div className={styles.arte}>
            <span className={styles.numero}>{String(indice + 1).padStart(2, '0')}</span>
            <Icone className={styles.iconeArte} size={72} strokeWidth={1.2} />
          </div>
        )}
        <span className={styles.selo}>
          <Icone size={14} /> {rotuloVisualizacao(principal)}
        </span>
      </div>

      <div className={styles.corpo}>
        <div className={styles.meta}>
          <span>{projeto.categoria}</span>
          {projeto.ano && <span>{projeto.ano}</span>}
        </div>
        <h3>{projeto.titulo}</h3>
        <p>{projeto.resumo}</p>
        <ul className={styles.tecnologias}>
          {projeto.tecnologias.slice(0, 4).map((tecnologia) => (
            <li key={tecnologia}>{tecnologia}</li>
          ))}
        </ul>
        <span className={styles.abrir}>
          Visualizar projeto <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}

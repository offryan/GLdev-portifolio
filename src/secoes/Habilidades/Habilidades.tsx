import { BarChart3, Boxes, Briefcase, Database, Workflow, type LucideIcon } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Revelar } from '@/componentes/interface/Revelar/Revelar';
import { TituloSecao } from '@/componentes/interface/TituloSecao/TituloSecao';
import { habilidades } from '@/conteudo/habilidades';
import type { IconeHabilidade } from '@/tipos/conteudo';
import styles from './Habilidades.module.css';

const ICONES: Record<IconeHabilidade, LucideIcon> = {
  dados: Database,
  graficos: BarChart3,
  automacao: Workflow,
  apps: Boxes,
  negocios: Briefcase,
};

/** Atualiza a posição da luz que segue o mouse dentro do cartão. */
function moverLuz(evento: MouseEvent<HTMLElement>) {
  const caixa = evento.currentTarget.getBoundingClientRect();
  evento.currentTarget.style.setProperty('--x', `${evento.clientX - caixa.left}px`);
  evento.currentTarget.style.setProperty('--y', `${evento.clientY - caixa.top}px`);
}

export function Habilidades() {
  return (
    <section id="habilidades" className={styles.habilidades}>
      <div className="container">
        <TituloSecao
          numero="02"
          rotulo="Habilidades"
          titulo="Ferramentas do"
          destaque="dia a dia."
          subtitulo="Do banco de dados ao dashboard — e tudo o que pode ser automatizado no caminho."
        />

        <div className={styles.grade}>
          {habilidades.map((grupo, indice) => {
            const Icone = ICONES[grupo.icone];
            return (
              <Revelar key={grupo.titulo} atraso={(indice % 3) * 0.1} className={indice === 0 ? styles.largo : undefined}>
                <article className={styles.cartao} onMouseMove={moverLuz}>
                  <span className={styles.icone}>
                    <Icone size={22} />
                  </span>
                  <h3>{grupo.titulo}</h3>
                  <p>{grupo.descricao}</p>
                  <ul className={styles.itens}>
                    {grupo.itens.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </Revelar>
            );
          })}
        </div>
      </div>
    </section>
  );
}

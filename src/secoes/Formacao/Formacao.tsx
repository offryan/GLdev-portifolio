import { Award, GraduationCap } from 'lucide-react';
import type { ReactNode } from 'react';
import { Revelar } from '@/componentes/interface/Revelar/Revelar';
import { TituloSecao } from '@/componentes/interface/TituloSecao/TituloSecao';
import { certificacoes, formacao } from '@/conteudo/formacao';
import type { Formacao as ItemFormacao } from '@/tipos/conteudo';
import styles from './Formacao.module.css';

export function Formacao() {
  return (
    <section id="formacao" className={styles.formacao}>
      <div className="container">
        <TituloSecao numero="05" rotulo="Formação" titulo="Aprendizado" destaque="contínuo." />

        <div className={styles.colunas}>
          <Lista titulo="Formação acadêmica" icone={<GraduationCap size={20} />} itens={formacao} />
          <Lista titulo="Certificações" icone={<Award size={20} />} itens={certificacoes} atraso={0.15} />
        </div>
      </div>
    </section>
  );
}

interface ListaProps {
  titulo: string;
  icone: ReactNode;
  itens: ItemFormacao[];
  atraso?: number;
}

function Lista({ titulo, icone, itens, atraso = 0 }: ListaProps) {
  return (
    <Revelar atraso={atraso} className={styles.coluna}>
      <h3 className={styles.tituloColuna}>
        {icone} {titulo}
      </h3>
      <ul className={styles.lista}>
        {itens.map((item) => (
          <li key={item.titulo}>
            <div>
              <strong>{item.titulo}</strong>
              <span>{item.instituicao}</span>
            </div>
            <span className={styles.ano}>{item.ano}</span>
          </li>
        ))}
      </ul>
    </Revelar>
  );
}

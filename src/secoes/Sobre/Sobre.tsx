import { Contador } from '@/componentes/interface/Contador/Contador';
import { Revelar } from '@/componentes/interface/Revelar/Revelar';
import { TextoRevelado } from '@/componentes/interface/TextoRevelado/TextoRevelado';
import { TituloSecao } from '@/componentes/interface/TituloSecao/TituloSecao';
import { perfil } from '@/conteudo/perfil';
import styles from './Sobre.module.css';

export function Sobre() {
  return (
    <section id="sobre" className={styles.sobre}>
      <div className="container">
        <TituloSecao numero="01" rotulo="Sobre mim" titulo="Dados que viram" destaque="decisão." />

        <div className={styles.paragrafos}>
          {perfil.resumo.map((paragrafo) => (
            <TextoRevelado key={paragrafo} texto={paragrafo} />
          ))}
        </div>

        <div className={styles.numeros}>
          {perfil.numeros.map((numero, indice) => (
            <Revelar key={numero.rotulo} atraso={indice * 0.1}>
              <div className={styles.numero}>
                <strong className="texto-gradiente">
                  <Contador valor={numero.valor} prefixo={numero.prefixo} sufixo={numero.sufixo} />
                </strong>
                <span>{numero.rotulo}</span>
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Revelar } from '@/componentes/interface/Revelar/Revelar';
import { TituloSecao } from '@/componentes/interface/TituloSecao/TituloSecao';
import { experiencias } from '@/conteudo/experiencias';
import styles from './Experiencia.module.css';

export function Experiencia() {
  const refLinhaDoTempo = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: refLinhaDoTempo, offset: ['start 0.7', 'end 0.6'] });
  const progresso = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experiencia" className={styles.experiencia}>
      <div className="container">
        <TituloSecao numero="04" rotulo="Experiência" titulo="Trajetória com" destaque="resultado." />

        <ol ref={refLinhaDoTempo} className={styles.linhaDoTempo}>
          <span className={styles.trilho} aria-hidden="true">
            <motion.span className={styles.preenchimento} style={{ scaleY: progresso }} />
          </span>

          {experiencias.map((experiencia) => (
            <li key={experiencia.empresa + experiencia.cargo} className={styles.item}>
              <span className={`${styles.marcador} ${experiencia.atual ? styles.marcadorAtual : ''}`} />
              <Revelar direcao="direita">
                <div className={styles.cabecalho}>
                  <span className={styles.periodo}>{experiencia.periodo}</span>
                  <h3>{experiencia.cargo}</h3>
                  <p className={styles.empresa}>
                    {experiencia.empresa} · {experiencia.local}
                  </p>
                </div>
                <div className={styles.conquistas}>
                  {experiencia.conquistas.map((conquista) => (
                    <div key={conquista.titulo} className={styles.conquista}>
                      <h4>{conquista.titulo}</h4>
                      <p>{conquista.texto}</p>
                    </div>
                  ))}
                </div>
              </Revelar>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

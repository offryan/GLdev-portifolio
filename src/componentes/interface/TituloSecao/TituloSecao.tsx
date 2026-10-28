import { Revelar } from '@/componentes/interface/Revelar/Revelar';
import styles from './TituloSecao.module.css';

interface TituloSecaoProps {
  numero: string;
  rotulo: string;
  titulo: string;
  destaque?: string;
  subtitulo?: string;
}

export function TituloSecao({ numero, rotulo, titulo, destaque, subtitulo }: TituloSecaoProps) {
  return (
    <Revelar className={styles.cabecalho}>
      <span className={styles.rotulo}>
        <span className={styles.numero}>{numero}</span>
        <span className={styles.linha} />
        {rotulo}
      </span>
      <h2 className={styles.titulo}>
        {titulo} {destaque && <span className="texto-gradiente">{destaque}</span>}
      </h2>
      {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}
    </Revelar>
  );
}

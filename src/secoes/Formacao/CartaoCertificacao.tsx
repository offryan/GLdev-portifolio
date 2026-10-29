import { BadgeCheck, ExternalLink } from 'lucide-react';
import type { MouseEvent } from 'react';
import { Botao } from '@/componentes/interface/Botao/Botao';
import { Revelar } from '@/componentes/interface/Revelar/Revelar';
import { certificacaoDestaque } from '@/conteudo/formacao';
import styles from './CartaoCertificacao.module.css';

/** Inclina o selo em 3D acompanhando o mouse. */
function inclinar(evento: MouseEvent<HTMLElement>) {
  const caixa = evento.currentTarget.getBoundingClientRect();
  const x = (evento.clientX - caixa.left) / caixa.width - 0.5;
  const y = (evento.clientY - caixa.top) / caixa.height - 0.5;
  evento.currentTarget.style.setProperty('--rx', `${-y * 18}deg`);
  evento.currentTarget.style.setProperty('--ry', `${x * 22}deg`);
}

function endireitar(evento: MouseEvent<HTMLElement>) {
  evento.currentTarget.style.setProperty('--rx', '0deg');
  evento.currentTarget.style.setProperty('--ry', '0deg');
}

/** Cartão de destaque da certificação principal, com selo em 3D e brilho animado. */
export function CartaoCertificacao() {
  const { titulo, codigo, emissor, ano, imagem, descricao, competencias, link } = certificacaoDestaque;

  return (
    <Revelar className={styles.envoltorio}>
      <article className={styles.cartao} aria-labelledby="titulo-certificacao">
        <span className={styles.faixaLuz} aria-hidden="true" />

        <div className={styles.palco} onMouseMove={inclinar} onMouseLeave={endireitar}>
          <span className={styles.anel} aria-hidden="true" />
          <img src={imagem} alt={`Selo ${titulo}`} width={337} height={348} className={styles.selo} />
        </div>

        <div className={styles.texto}>
          <div className={styles.meta}>
            <span className={styles.codigo}>{codigo}</span>
            <span>
              {emissor} · {ano}
            </span>
          </div>
          <h3 id="titulo-certificacao">{titulo}</h3>
          <p>{descricao}</p>
          <ul className={styles.competencias} aria-label="Competências avaliadas">
            {competencias.map((competencia) => (
              <li key={competencia}>
                <BadgeCheck size={16} aria-hidden="true" /> {competencia}
              </li>
            ))}
          </ul>
          {link && (
            <div className={styles.acoes}>
              <Botao href={link} externo icone={<ExternalLink size={16} />}>
                Verificar credencial
              </Botao>
            </div>
          )}
        </div>
      </article>
    </Revelar>
  );
}

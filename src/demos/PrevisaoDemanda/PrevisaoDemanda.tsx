import { useMemo, useState } from 'react';
import base from '../comum/Demo.module.css';
import { HISTORICO, prever } from './modelo';
import styles from './PrevisaoDemanda.module.css';

const LARGURA = 640;
const ALTURA = 260;
const MARGEM = { topo: 16, direita: 12, base: 28, esquerda: 44 };
const formato = new Intl.NumberFormat('pt-BR');

export default function PrevisaoDemanda() {
  const [horizonte, setHorizonte] = useState(6);
  const [sazonalidade, setSazonalidade] = useState(true);
  const previsao = useMemo(() => prever(horizonte, sazonalidade), [horizonte, sazonalidade]);

  // Escalas fixas para 12 meses, assim o gráfico não "pula" ao mudar o horizonte
  const totalPontos = HISTORICO.length + 12;
  const valores = [...HISTORICO.map((p) => p.valor), ...prever(12, true).map((p) => p.maximo), ...prever(12, false).map((p) => p.maximo)];
  const maximo = Math.ceil(Math.max(...valores) / 1000) * 1000;
  const minimo = Math.floor(Math.min(...HISTORICO.map((p) => p.valor)) / 1000) * 1000 - 1000;

  const x = (indice: number) => MARGEM.esquerda + (indice / (totalPontos - 1)) * (LARGURA - MARGEM.esquerda - MARGEM.direita);
  const y = (valor: number) => MARGEM.topo + (1 - (valor - minimo) / (maximo - minimo)) * (ALTURA - MARGEM.topo - MARGEM.base);

  const ultimo = HISTORICO[HISTORICO.length - 1];
  const linhaHistorico = HISTORICO.map((p, i) => `${i ? 'L' : 'M'}${x(p.indice)},${y(p.valor)}`).join(' ');
  const linhaPrevisao = [ultimo, ...previsao].map((p, i) => `${i ? 'L' : 'M'}${x(p.indice)},${y(p.valor)}`).join(' ');
  const faixa =
    `M${x(ultimo.indice)},${y(ultimo.valor)} ` +
    previsao.map((p) => `L${x(p.indice)},${y(p.maximo)}`).join(' ') +
    ' ' +
    [...previsao].reverse().map((p) => `L${x(p.indice)},${y(p.minimo)}`).join(' ') +
    ' Z';

  const linhasGrade = Array.from({ length: 5 }, (_, i) => minimo + ((maximo - minimo) / 4) * i);
  const totalPrevisto = previsao.reduce((s, p) => s + p.valor, 0);
  const picoEquipe = Math.max(...previsao.map((p) => p.equipe));

  return (
    <div className={base.demo}>
      <div className={base.cabecalho}>
        <div>
          <h3>Previsão de Volume de Carga</h3>
          <p>Ajuste o horizonte e veja a projeção com intervalo de confiança de 90%.</p>
        </div>
        <span className={base.aviso}>dados fictícios</span>
      </div>

      <div className={base.controles}>
        <label className={styles.deslizante}>
          <span>
            Horizonte: <strong>{horizonte} meses</strong>
          </span>
          <input type="range" min={1} max={12} value={horizonte} onChange={(e) => setHorizonte(Number(e.target.value))} />
        </label>
        <div className={base.grupo} role="group" aria-label="Modelo">
          <button type="button" className={sazonalidade ? base.ativo : undefined} onClick={() => setSazonalidade(true)}>
            Tendência + sazonalidade
          </button>
          <button type="button" className={!sazonalidade ? base.ativo : undefined} onClick={() => setSazonalidade(false)}>
            Só tendência
          </button>
        </div>
      </div>

      <div className={base.indicadores}>
        <div className={base.indicador}>
          <span>Volume previsto</span>
          <strong>{formato.format(totalPrevisto)}</strong>
          <small>contêineres em {horizonte} meses</small>
        </div>
        <div className={base.indicador}>
          <span>Média mensal</span>
          <strong>{formato.format(Math.round(totalPrevisto / horizonte))}</strong>
          <small>contêineres/mês</small>
        </div>
        <div className={base.indicador}>
          <span>Pico de equipe</span>
          <strong>{picoEquipe} pessoas</strong>
          <small>para atender o mês mais cheio</small>
        </div>
        <div className={base.indicador}>
          <span>Último mês real</span>
          <strong>{formato.format(ultimo.valor)}</strong>
          <small>{ultimo.rotulo}</small>
        </div>
      </div>

      <div className={base.painel}>
        <div className={styles.topoGrafico}>
          <h4>Histórico e projeção</h4>
          <div className={base.legenda}>
            <span><i style={{ background: '#a78bfa' }} /> Real</span>
            <span><i style={{ background: '#34d399' }} /> Previsto</span>
            <span><i style={{ background: 'rgba(52,211,153,0.25)' }} /> Intervalo</span>
          </div>
        </div>

        <svg viewBox={`0 0 ${LARGURA} ${ALTURA}`} className={styles.grafico} role="img" aria-label="Gráfico de previsão de volume">
          {linhasGrade.map((valor) => (
            <g key={valor}>
              <line x1={MARGEM.esquerda} x2={LARGURA - MARGEM.direita} y1={y(valor)} y2={y(valor)} className={styles.grade} />
              <text x={MARGEM.esquerda - 8} y={y(valor) + 4} textAnchor="end" className={styles.eixo}>
                {(valor / 1000).toFixed(1)}k
              </text>
            </g>
          ))}
          {HISTORICO.filter((p) => p.indice % 6 === 0).map((p) => (
            <text key={p.indice} x={x(p.indice)} y={ALTURA - 8} textAnchor="middle" className={styles.eixo}>
              {p.rotulo}
            </text>
          ))}
          <line x1={x(ultimo.indice)} x2={x(ultimo.indice)} y1={MARGEM.topo} y2={ALTURA - MARGEM.base} className={styles.hoje} />
          <text x={x(ultimo.indice) + 6} y={MARGEM.topo + 10} className={styles.eixo}>hoje</text>

          <path d={faixa} className={styles.faixa} />
          <path d={linhaHistorico} className={styles.linhaReal} />
          <path d={linhaPrevisao} className={styles.linhaPrevista} />
          {previsao.map((p) => (
            <circle key={p.indice} cx={x(p.indice)} cy={y(p.valor)} r={3.5} className={styles.ponto}>
              <title>{`${p.rotulo}: ${formato.format(p.valor)} (${formato.format(p.minimo)} – ${formato.format(p.maximo)})`}</title>
            </circle>
          ))}
        </svg>
      </div>

      <div className={styles.tabela}>
        {previsao.map((p) => (
          <div key={p.indice} className={styles.celula}>
            <span>{p.rotulo}</span>
            <strong>{formato.format(p.valor)}</strong>
            <small>{p.equipe} pessoas</small>
          </div>
        ))}
      </div>
    </div>
  );
}

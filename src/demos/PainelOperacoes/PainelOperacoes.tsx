import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import base from '../comum/Demo.module.css';
import { MESES, PERIODOS, REGISTROS, TIPOS_CARGA, type IdPeriodo, type IdTipoCarga } from './dados';
import styles from './PainelOperacoes.module.css';

type Filtro = IdTipoCarga | 'todos';

const formatoNumero = new Intl.NumberFormat('pt-BR');
const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact', maximumFractionDigits: 1 });
const formatoDecimal = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });

export default function PainelOperacoes() {
  const [periodo, setPeriodo] = useState<IdPeriodo>('ano');
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [mesDestacado, setMesDestacado] = useState<number | null>(null);

  const [inicio, fim] = PERIODOS.find((p) => p.id === periodo)!.meses;
  const tiposVisiveis = TIPOS_CARGA.filter((t) => filtro === 'todos' || t.id === filtro);

  const registros = useMemo(
    () =>
      REGISTROS.filter(
        (r) => r.mes >= inicio && r.mes <= fim && (filtro === 'todos' || r.tipo === filtro),
      ),
    [inicio, fim, filtro],
  );

  const indicadores = useMemo(() => {
    const conteineres = registros.reduce((soma, r) => soma + r.conteineres, 0);
    const faturamento = registros.reduce((soma, r) => soma + r.faturamento, 0);
    const permanencia = registros.reduce((soma, r) => soma + r.permanencia * r.conteineres, 0) / conteineres;
    const produtividade = registros.reduce((soma, r) => soma + r.produtividade, 0) / registros.length;

    const doMes = (mes: number) => registros.filter((r) => r.mes === mes).reduce((s, r) => s + r.conteineres, 0);
    const variacaoVolume = (doMes(fim) / doMes(inicio) - 1) * 100;

    return { conteineres, faturamento, permanencia, produtividade, variacaoVolume };
  }, [registros, inicio, fim]);

  const meses = MESES.slice(inicio, fim + 1).map((nome, i) => {
    const mes = inicio + i;
    const partes = tiposVisiveis.map((tipo) => ({
      tipo,
      valor: registros.find((r) => r.mes === mes && r.tipo === tipo.id)?.conteineres ?? 0,
    }));
    return { mes, nome, partes, total: partes.reduce((s, p) => s + p.valor, 0) };
  });
  const maiorTotal = Math.max(...meses.map((m) => m.total));

  const participacao = tiposVisiveis.map((tipo) => ({
    tipo,
    valor: registros.filter((r) => r.tipo === tipo.id).reduce((s, r) => s + r.conteineres, 0),
  }));

  return (
    <div className={base.demo}>
      <div className={base.cabecalho}>
        <div>
          <h3>Painel de Operações — Terminal</h3>
          <p>Use os filtros para explorar os indicadores.</p>
        </div>
        <span className={base.aviso}>dados fictícios</span>
      </div>

      <div className={base.controles}>
        <div className={base.grupo} role="group" aria-label="Período">
          {PERIODOS.map((p) => (
            <button key={p.id} type="button" className={periodo === p.id ? base.ativo : undefined} onClick={() => setPeriodo(p.id)}>
              {p.nome}
            </button>
          ))}
        </div>
        <div className={base.grupo} role="group" aria-label="Tipo de carga">
          <button type="button" className={filtro === 'todos' ? base.ativo : undefined} onClick={() => setFiltro('todos')}>
            Todos
          </button>
          {TIPOS_CARGA.map((t) => (
            <button key={t.id} type="button" className={filtro === t.id ? base.ativo : undefined} onClick={() => setFiltro(t.id)}>
              {t.nome}
            </button>
          ))}
        </div>
      </div>

      <div className={base.indicadores}>
        <div className={base.indicador}>
          <span>Contêineres movimentados</span>
          <strong>{formatoNumero.format(indicadores.conteineres)}</strong>
          <small className={indicadores.variacaoVolume >= 0 ? base.positivo : base.negativo}>
            {indicadores.variacaoVolume >= 0 ? '▲' : '▼'} {formatoDecimal.format(Math.abs(indicadores.variacaoVolume))}% no período
          </small>
        </div>
        <div className={base.indicador}>
          <span>Faturamento</span>
          <strong>{formatoMoeda.format(indicadores.faturamento)}</strong>
          <small>receita de armazenagem</small>
        </div>
        <div className={base.indicador}>
          <span>Permanência média</span>
          <strong>{formatoDecimal.format(indicadores.permanencia)} dias</strong>
          <small>ponderada por volume</small>
        </div>
        <div className={base.indicador}>
          <span>Produtividade</span>
          <strong>{formatoDecimal.format(indicadores.produtividade)} mov/h</strong>
          <small>média dos guindastes</small>
        </div>
      </div>

      <div className={styles.graficos}>
        <div className={base.painel}>
          <h4>Volume mensal de contêineres</h4>
          <div className={styles.barras} onMouseLeave={() => setMesDestacado(null)}>
            {meses.map((m) => (
              <div
                key={m.mes}
                className={`${styles.coluna} ${mesDestacado !== null && mesDestacado !== m.mes ? styles.apagada : ''}`}
                onMouseEnter={() => setMesDestacado(m.mes)}
              >
                {mesDestacado === m.mes && <span className={styles.dica}>{formatoNumero.format(m.total)}</span>}
                <div className={styles.pilha}>
                  {m.partes.map((parte) => (
                    <motion.span
                      key={parte.tipo.id}
                      style={{ background: parte.tipo.cor }}
                      initial={false}
                      animate={{ height: `${(parte.valor / maiorTotal) * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                </div>
                <span className={styles.rotuloMes}>{m.nome}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={base.painel}>
          <h4>Participação por tipo</h4>
          <Rosca partes={participacao.map((p) => ({ cor: p.tipo.cor, valor: p.valor }))} />
          <div className={base.legenda} style={{ marginTop: 16, justifyContent: 'center' }}>
            {participacao.map((p) => (
              <span key={p.tipo.id}>
                <i style={{ background: p.tipo.cor }} />
                {p.tipo.nome} · {Math.round((p.valor / indicadores.conteineres) * 100)}%
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Rosca({ partes }: { partes: { cor: string; valor: number }[] }) {
  const total = partes.reduce((s, p) => s + p.valor, 0);
  const raio = 60;
  const circunferencia = 2 * Math.PI * raio;
  let acumulado = 0;

  return (
    <svg viewBox="0 0 160 160" className={styles.rosca} role="img" aria-label="Participação por tipo de carga">
      <circle cx="80" cy="80" r={raio} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="22" />
      {partes.map((parte) => {
        const fatia = (parte.valor / total) * circunferencia;
        const deslocamento = -acumulado;
        acumulado += fatia;
        return (
          <motion.circle
            key={parte.cor}
            cx="80"
            cy="80"
            r={raio}
            fill="none"
            stroke={parte.cor}
            strokeWidth="22"
            transform="rotate(-90 80 80)"
            initial={false}
            animate={{ strokeDasharray: `${fatia} ${circunferencia - fatia}`, strokeDashoffset: deslocamento }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}
      <text x="80" y="76" textAnchor="middle" className={styles.totalRosca}>
        {new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(total)}
      </text>
      <text x="80" y="96" textAnchor="middle" className={styles.rotuloRosca}>
        contêineres
      </text>
    </svg>
  );
}

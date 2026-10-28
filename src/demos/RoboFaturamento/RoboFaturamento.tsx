import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, Play, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import base from '../comum/Demo.module.css';
import { ETAPAS, TOTAL_MANUAL, TOTAL_ROBO } from './etapas';
import styles from './RoboFaturamento.module.css';

type Estado = 'parado' | 'executando' | 'concluido';

interface LinhaRegistro {
  hora: string;
  texto: string;
  sucesso?: boolean;
}

const DURACAO_ETAPA_MS = 1100;

function formatarDuracao(minutos: number) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return horas ? `${horas}h${String(resto).padStart(2, '0')}` : `${resto} min`;
}

export default function RoboFaturamento() {
  const [estado, setEstado] = useState<Estado>('parado');
  const [etapaAtual, setEtapaAtual] = useState(-1);
  const [registros, setRegistros] = useState<LinhaRegistro[]>([]);
  const refConsole = useRef<HTMLDivElement>(null);
  const temporizadores = useRef<number[]>([]);

  useEffect(() => () => temporizadores.current.forEach(window.clearTimeout), []);

  useEffect(() => {
    refConsole.current?.scrollTo({ top: refConsole.current.scrollHeight, behavior: 'smooth' });
  }, [registros]);

  function agendar(acao: () => void, atraso: number) {
    temporizadores.current.push(window.setTimeout(acao, atraso));
  }

  function executar() {
    reiniciar();
    setEstado('executando');
    let minutosSimulados = 0;

    ETAPAS.forEach((etapa, indice) => {
      const inicio = indice * DURACAO_ETAPA_MS;
      agendar(() => {
        setEtapaAtual(indice);
        setRegistros((r) => [...r, { hora: relogio(minutosSimulados), texto: etapa.registros[0] }]);
      }, inicio);
      agendar(() => {
        minutosSimulados += etapa.robo;
        setRegistros((r) => [...r, { hora: relogio(minutosSimulados), texto: etapa.registros[1], sucesso: true }]);
      }, inicio + DURACAO_ETAPA_MS * 0.75);
    });

    agendar(() => {
      setEtapaAtual(ETAPAS.length);
      setEstado('concluido');
    }, ETAPAS.length * DURACAO_ETAPA_MS);
  }

  function reiniciar() {
    temporizadores.current.forEach(window.clearTimeout);
    temporizadores.current = [];
    setEstado('parado');
    setEtapaAtual(-1);
    setRegistros([]);
  }

  const progresso = Math.max(0, Math.min(etapaAtual, ETAPAS.length)) / ETAPAS.length;
  const reducao = Math.round((1 - TOTAL_ROBO / TOTAL_MANUAL) * 100);

  return (
    <div className={base.demo}>
      <div className={base.cabecalho}>
        <div>
          <h3>Robô de Faturamento</h3>
          <p>Clique em executar e acompanhe o robô trabalhando.</p>
        </div>
        <span className={base.aviso}>simulação</span>
      </div>

      <div className={styles.layout}>
        <div className={base.painel}>
          <div className={styles.topoEtapas}>
            <h4>Etapas do processo</h4>
            {estado === 'parado' ? (
              <button type="button" className={base.botaoAcao} onClick={executar}>
                <Play size={16} /> Executar robô
              </button>
            ) : (
              <button type="button" className={base.botaoSecundario} onClick={reiniciar} disabled={estado === 'executando'}>
                <RotateCcw size={16} /> Reiniciar
              </button>
            )}
          </div>

          <div className={styles.progresso}>
            <motion.span animate={{ scaleX: progresso }} transition={{ duration: 0.5 }} />
          </div>

          <ol className={styles.etapas}>
            {ETAPAS.map((etapa, indice) => {
              const status = indice < etapaAtual ? 'feito' : indice === etapaAtual ? 'rodando' : 'aguardando';
              return (
                <li key={etapa.nome} className={styles[status]}>
                  <span className={styles.status}>
                    {status === 'feito' && <Check size={14} />}
                    {status === 'rodando' && <Loader2 size={14} className={styles.girando} />}
                    {status === 'aguardando' && indice + 1}
                  </span>
                  <span className={styles.nomeEtapa}>{etapa.nome}</span>
                  <span className={styles.tempo}>{etapa.robo} min</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className={styles.direita}>
          <div className={styles.console} ref={refConsole} aria-live="polite">
            {registros.length === 0 && <p className={styles.vazio}>$ aguardando execução…</p>}
            {registros.map((linha, indice) => (
              <motion.p
                key={indice}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className={linha.sucesso ? styles.sucesso : undefined}
              >
                <span className={styles.hora}>[{linha.hora}]</span> {linha.sucesso ? '✓' : '›'} {linha.texto}
              </motion.p>
            ))}
          </div>

          <AnimatePresence>
            {estado === 'concluido' && (
              <motion.div
                className={`${base.painel} ${styles.comparativo}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h4>Manual × Automatizado</h4>
                <Barra rotulo="Processo manual" minutos={TOTAL_MANUAL} proporcao={1} classe={styles.barraManual} />
                <Barra rotulo="Com o robô" minutos={TOTAL_ROBO} proporcao={TOTAL_ROBO / TOTAL_MANUAL} classe={styles.barraRobo} />
                <p className={styles.reducao}>
                  <strong className="texto-gradiente">-{reducao}%</strong> de trabalho manual
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Barra({ rotulo, minutos, proporcao, classe }: { rotulo: string; minutos: number; proporcao: number; classe: string }) {
  return (
    <div className={styles.linhaBarra}>
      <div className={styles.rotuloBarra}>
        <span>{rotulo}</span>
        <strong>{formatarDuracao(minutos)}</strong>
      </div>
      <div className={styles.trilhoBarra}>
        <motion.span
          className={classe}
          initial={{ width: 0 }}
          animate={{ width: `${proporcao * 100}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function relogio(minutos: number) {
  return `00:${String(minutos).padStart(2, '0')}`;
}

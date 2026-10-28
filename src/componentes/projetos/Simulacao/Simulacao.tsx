import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, Play, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { EtapaSimulacao } from '@/tipos/conteudo';
import styles from './Simulacao.module.css';

interface SimulacaoProps {
  titulo: string;
  etapas: EtapaSimulacao[];
}

interface LinhaRegistro {
  segundos: number;
  texto: string;
  sucesso?: boolean;
}

const DURACAO_ETAPA_MS = 1100;

/** Mostra o robô executando cada etapa do processo, com um console de log ao lado. */
export function Simulacao({ titulo, etapas }: SimulacaoProps) {
  const [etapaAtual, setEtapaAtual] = useState(-1);
  const [registros, setRegistros] = useState<LinhaRegistro[]>([]);
  const refConsole = useRef<HTMLDivElement>(null);
  const temporizadores = useRef<number[]>([]);

  const executando = etapaAtual >= 0 && etapaAtual < etapas.length;
  const concluido = etapaAtual === etapas.length;

  useEffect(() => () => temporizadores.current.forEach(window.clearTimeout), []);

  useEffect(() => {
    refConsole.current?.scrollTo({ top: refConsole.current.scrollHeight, behavior: 'smooth' });
  }, [registros]);

  function agendar(acao: () => void, atraso: number) {
    temporizadores.current.push(window.setTimeout(acao, atraso));
  }

  function executar() {
    reiniciar();
    etapas.forEach((etapa, indice) => {
      const inicio = indice * DURACAO_ETAPA_MS;
      agendar(() => {
        setEtapaAtual(indice);
        setRegistros((r) => [...r, { segundos: inicio / 1000, texto: etapa.inicio }]);
      }, inicio);
      agendar(() => {
        setRegistros((r) => [...r, { segundos: (inicio + DURACAO_ETAPA_MS * 0.75) / 1000, texto: etapa.fim, sucesso: true }]);
      }, inicio + DURACAO_ETAPA_MS * 0.75);
    });
    agendar(() => setEtapaAtual(etapas.length), etapas.length * DURACAO_ETAPA_MS);
  }

  function reiniciar() {
    temporizadores.current.forEach(window.clearTimeout);
    temporizadores.current = [];
    setEtapaAtual(-1);
    setRegistros([]);
  }

  return (
    <div className={styles.simulacao}>
      <div className={styles.cabecalho}>
        <div>
          <h2>{titulo}</h2>
          <p>Execute o robô e acompanhe cada etapa do processo.</p>
        </div>
        <span className={styles.aviso}>simulação ilustrativa</span>
      </div>

      <div className={styles.layout}>
        <div className={styles.painel}>
          <div className={styles.topoEtapas}>
            <h3>Etapas</h3>
            {etapaAtual === -1 ? (
              <button type="button" className={styles.botaoExecutar} onClick={executar}>
                <Play size={16} /> Executar robô
              </button>
            ) : (
              <button type="button" className={styles.botaoReiniciar} onClick={reiniciar} disabled={executando}>
                <RotateCcw size={16} /> Reiniciar
              </button>
            )}
          </div>

          <div className={styles.progresso}>
            <motion.span
              animate={{ scaleX: Math.max(0, etapaAtual) / etapas.length }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <ol className={styles.etapas}>
            {etapas.map((etapa, indice) => {
              const status = indice < etapaAtual ? 'feito' : indice === etapaAtual ? 'rodando' : 'aguardando';
              return (
                <li key={etapa.nome} className={styles[status]}>
                  <span className={styles.status}>
                    {status === 'feito' && <Check size={14} />}
                    {status === 'rodando' && <Loader2 size={14} className={styles.girando} />}
                    {status === 'aguardando' && indice + 1}
                  </span>
                  {etapa.nome}
                </li>
              );
            })}
          </ol>
        </div>

        <div className={styles.console} ref={refConsole} aria-live="polite">
          {registros.length === 0 && <p className={styles.vazio}>$ aguardando execução…</p>}
          {registros.map((linha, indice) => (
            <motion.p
              key={indice}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className={linha.sucesso ? styles.sucesso : undefined}
            >
              <span className={styles.hora}>[{linha.segundos.toFixed(1).padStart(4, '0')}s]</span>{' '}
              {linha.sucesso ? '✓' : '›'} {linha.texto}
            </motion.p>
          ))}
          <AnimatePresence>
            {concluido && (
              <motion.p className={styles.fim} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                ✓ Execução concluída sem intervenção manual
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

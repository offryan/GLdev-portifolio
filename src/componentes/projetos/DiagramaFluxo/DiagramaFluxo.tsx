import { motion } from 'framer-motion';
import {
  Bot,
  Cloud,
  Database,
  FileText,
  Globe,
  LayoutDashboard,
  ListChecks,
  Mail,
  Sheet,
  ShieldCheck,
  Webhook,
  type LucideIcon,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import type { EtapaFluxo, IconeFluxo } from '@/tipos/conteudo';
import styles from './DiagramaFluxo.module.css';

const ICONES: Record<IconeFluxo, LucideIcon> = {
  api: Webhook,
  banco: Database,
  planilha: Sheet,
  robo: Bot,
  email: Mail,
  painel: LayoutDashboard,
  regras: ListChecks,
  arquivo: FileText,
  navegador: Globe,
  certificado: ShieldCheck,
  nuvem: Cloud,
};

interface DiagramaFluxoProps {
  etapas: EtapaFluxo[];
}

/** Diagrama "como funciona": caixas ligadas por conectores com dados em movimento. */
export function DiagramaFluxo({ etapas }: DiagramaFluxoProps) {
  return (
    <ol className={styles.fluxo} aria-label="Fluxo de dados do projeto">
      {etapas.map((etapa, indice) => {
        const Icone = ICONES[etapa.icone];
        return (
          <motion.li
            key={etapa.titulo}
            className={styles.etapa}
            style={{ '--indice': indice, '--total': etapas.length } as CSSProperties}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: indice * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.caixa}>
              <span className={styles.icone}>
                <Icone size={20} aria-hidden="true" />
              </span>
              <strong>{etapa.titulo}</strong>
              <span className={styles.detalhe}>{etapa.detalhe}</span>
            </div>
            {indice < etapas.length - 1 && (
              <span className={styles.conector} aria-hidden="true">
                <i />
              </span>
            )}
          </motion.li>
        );
      })}
    </ol>
  );
}

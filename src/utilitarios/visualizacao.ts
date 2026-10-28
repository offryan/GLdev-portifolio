import { Bot, Code2, Images, MonitorPlay, PieChart, PlayCircle, type LucideIcon } from 'lucide-react';
import type { Visualizacao } from '@/tipos/conteudo';

/** Nome e ícone exibidos para cada forma de visualizar um projeto. */
export const DETALHES_VISUALIZACAO: Record<Visualizacao['tipo'], { rotulo: string; icone: LucideIcon }> = {
  site: { rotulo: 'Site ao vivo', icone: MonitorPlay },
  powerbi: { rotulo: 'Power BI ao vivo', icone: PieChart },
  video: { rotulo: 'Vídeo', icone: PlayCircle },
  galeria: { rotulo: 'Capturas de tela', icone: Images },
  codigo: { rotulo: 'Código', icone: Code2 },
  simulacao: { rotulo: 'Simulação', icone: Bot },
};

export function rotuloVisualizacao(visualizacao: Visualizacao) {
  return visualizacao.rotulo ?? DETALHES_VISUALIZACAO[visualizacao.tipo].rotulo;
}

import { Code2, Images, MonitorPlay, MousePointerClick, PieChart, PlayCircle, type LucideIcon } from 'lucide-react';
import type { Visualizacao } from '@/tipos/conteudo';

/** Nome e ícone exibidos para cada forma de visualizar um projeto. */
export const DETALHES_VISUALIZACAO: Record<Visualizacao['tipo'], { rotulo: string; icone: LucideIcon }> = {
  site: { rotulo: 'Site ao vivo', icone: MonitorPlay },
  powerbi: { rotulo: 'Power BI ao vivo', icone: PieChart },
  video: { rotulo: 'Vídeo', icone: PlayCircle },
  galeria: { rotulo: 'Galeria', icone: Images },
  codigo: { rotulo: 'Código', icone: Code2 },
  demo: { rotulo: 'Demo interativa', icone: MousePointerClick },
};

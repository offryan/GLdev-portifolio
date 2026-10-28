import type { GrupoHabilidades } from '@/tipos/conteudo';

/**
 * ✏️ HABILIDADES
 * Ícones disponíveis: 'dados' | 'graficos' | 'automacao' | 'apps' | 'negocios'
 */
export const habilidades: GrupoHabilidades[] = [
  {
    titulo: 'Dados & ETL',
    icone: 'dados',
    descricao: 'Da extração à modelagem: dados limpos, confiáveis e prontos para análise.',
    itens: ['SQL (MySQL, PostgreSQL, T-SQL)', 'Oracle', 'Star Schema', 'ETL / ELT', 'Pandas', 'Power Query'],
  },
  {
    titulo: 'BI & Visualização',
    icone: 'graficos',
    descricao: 'Dashboards gerenciais que contam a história por trás dos números.',
    itens: ['Power BI', 'DAX avançado', 'Linguagem M', 'PBIP / TMDL', 'Storytelling com dados', 'Excel / VBA'],
  },
  {
    titulo: 'Automação & Dev',
    icone: 'automacao',
    descricao: 'Robôs e integrações que eliminam o trabalho repetitivo.',
    itens: ['Python', 'NumPy', 'Selenium', 'Requests', 'RPA', 'API REST / JSON', 'OAuth2 / mTLS', 'Web Scraping', 'Git / GitLab'],
  },
  {
    titulo: 'Power Platform',
    icone: 'apps',
    descricao: 'Aplicativos e fluxos corporativos construídos com rapidez.',
    itens: ['Power Apps (Canvas)', 'Power Apps (Model-Driven)', 'Power Automate Cloud', 'Power Automate Desktop', 'SharePoint'],
  },
  {
    titulo: 'ERP & Negócios',
    icone: 'negocios',
    descricao: 'Visão de negócio para conectar tecnologia ao resultado.',
    itens: ['SAP Business One', 'Gestão de KPIs', 'Processos portuários e aduaneiros', 'Siscomex', 'Planejamento financeiro', 'Scrum', 'Kanban'],
  },
];

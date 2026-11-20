import type { GrupoHabilidades } from '@/tipos/conteudo';

/**
 * ✏️ HABILIDADES
 * Ícones disponíveis: 'engenharia' | 'dados' | 'graficos' | 'automacao' | 'apps' | 'negocios'
 */
export const habilidades: GrupoHabilidades[] = [
  {
    titulo: 'Engenharia de Dados',
    icone: 'engenharia',
    descricao: 'Pipelines confiáveis, do dado bruto ao modelo pronto para análise.',
    itens: [
      'Pipelines ELT',
      'Arquitetura medalhão (bronze, silver, gold)',
      'dbt',
      'DuckDB',
      'Modelagem dimensional (Kimball)',
      'Carga incremental e idempotente',
      'Testes de qualidade de dados',
      'GitHub Actions (CI/CD)',
      'Parquet / CSV',
    ],
  },
  {
    titulo: 'SQL & Bancos de Dados',
    icone: 'dados',
    descricao: 'Consultas, modelagem e integração com bancos relacionais.',
    itens: ['SQL (MySQL, PostgreSQL, T-SQL)', 'Oracle', 'Star Schema', 'Pandas', 'Power Query'],
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
    titulo: 'Processos & Negócio',
    icone: 'negocios',
    descricao: 'Processos redesenhados antes de serem automatizados.',
    itens: [
      'Lean Six Sigma (DMAIC)',
      'Mapeamento de processos',
      'SIPOC',
      'VSM',
      'BPMN',
      'Matriz esforço × impacto',
      'Gestão de KPIs',
      'SAP Business One',
      'Scrum',
      'Kanban',
    ],
  },
];

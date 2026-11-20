import type { Experiencia } from '@/tipos/conteudo';

/**
 * ✏️ EXPERIÊNCIA PROFISSIONAL
 * A mais recente primeiro. Use `atual: true` no emprego atual.
 */
export const experiencias: Experiencia[] = [
  {
    cargo: 'Analista de Performance e Processos',
    empresa: 'Taesa · COE, Inteligência do CSC',
    local: 'Rio de Janeiro, RJ',
    periodo: 'jul/2026 — atual',
    atual: true,
    conquistas: [
      {
        titulo: 'Automação de processos',
        texto: 'Desenvolvo e mantenho as automações do CSC com Python, SQL e Power Automate, eliminando tarefas manuais e dando agilidade às rotinas de backoffice.',
      },
      {
        titulo: 'Indicadores de performance',
        texto: 'Estruturo os indicadores do CSC de ponta a ponta, da modelagem dos dados em SQL e Power Query aos painéis em Power BI usados pela liderança.',
      },
      {
        titulo: 'Inteligência de dados',
        texto: 'Integro dados de sistemas corporativos em bases confiáveis que alimentam as automações, os indicadores e as análises da área.',
      },
      {
        titulo: 'Reestruturação de processos com Lean Six Sigma',
        texto: 'Mapeamento e redesenho dos processos de todas as áreas do CSC com DMAIC, SIPOC, VSM, Pareto e matriz de esforço × impacto, priorizando as próximas automações e indicadores.',
      },
    ],
  },
  {
    cargo: 'Analista de Planejamento Pleno',
    empresa: 'Rio Brasil Terminal',
    local: 'Rio de Janeiro, RJ',
    periodo: '2024 — jul/2026',
    conquistas: [
      {
        titulo: 'Inteligência de dados',
        texto: 'Estruturei ecossistemas de BI em Power BI integrando dados do SAP e de sistemas aduaneiros, com indicadores críticos para Gerência e Diretoria.',
      },
      {
        titulo: 'Automação com impacto',
        texto: 'Soluções em Python e Power Automate reduziram em 83% o trabalho manual em Operações Armazém e aceleraram o ciclo de faturamento.',
      },
      {
        titulo: 'Análise preditiva',
        texto: 'Modelos de previsão de demanda e volume de carga para planejar a operação do armazém conforme a sazonalidade.',
      },
      {
        titulo: 'Compliance',
        texto: 'Relatórios técnicos regulatórios automatizados que garantiram a conformidade das operações portuárias.',
      },
    ],
  },
  {
    cargo: 'Analista de BI e Automação de Processos',
    empresa: 'SITAWI Finanças do Bem',
    local: 'Rio de Janeiro, RJ',
    periodo: '2021 — 2024',
    conquistas: [
      {
        titulo: 'Arquitetura de dashboards',
        texto: 'Dashboards gerenciais em Power BI (DAX e M), SQL e Python, transformando dados brutos em inteligência para decisão.',
      },
      {
        titulo: 'Conciliação financeira',
        texto: 'Consultas SQL que automatizaram a conciliação, reduzindo o tempo de fechamento mensal e elevando a acurácia contábil.',
      },
      {
        titulo: 'Integrações via API',
        texto: 'Integrações REST/JSON conectando sistemas legados e terceiros em um único ecossistema de KPIs.',
      },
      {
        titulo: 'Processos com BPMN',
        texto: 'Fluxos automatizados em plataformas BPMN, eliminando gargalos e revelando melhorias nos processos internos.',
      },
    ],
  },
  {
    cargo: 'Assistente de Planejamento Administrativo Financeiro',
    empresa: 'Voa Hotéis',
    local: 'Rio de Janeiro, RJ',
    periodo: '2021',
    conquistas: [
      {
        titulo: 'Faturamento em tempo real',
        texto: 'Dashboards com SQL Server e Power BI dando à gestão uma visão imediata da saúde financeira das unidades.',
      },
      {
        titulo: 'Tendências e sazonalidade',
        texto: 'Análise de dados financeiros para identificar padrões sazonais e embasar ajustes estratégicos.',
      },
    ],
  },
];

/** Etapas do processo de faturamento (tempos ilustrativos, em minutos). */
export const ETAPAS = [
  {
    nome: 'Exportar relatório de armazenagem do SAP',
    manual: 35,
    robo: 6,
    registros: ['Conectando ao SAP Business One…', '1.284 linhas exportadas'],
  },
  {
    nome: 'Consolidar planilhas de movimentação',
    manual: 50,
    robo: 7,
    registros: ['Lendo 14 planilhas com Pandas…', 'Base unificada: 9.730 registros'],
  },
  {
    nome: 'Validar regras de cobrança',
    manual: 45,
    robo: 8,
    registros: ['Aplicando tabela de tarifas 2026…', '3 inconsistências sinalizadas para revisão'],
  },
  {
    nome: 'Calcular armazenagem por cliente',
    manual: 40,
    robo: 6,
    registros: ['Calculando períodos de permanência…', '212 clientes processados'],
  },
  {
    nome: 'Gerar faturas em PDF',
    manual: 30,
    robo: 6,
    registros: ['Renderizando documentos…', '212 faturas geradas'],
  },
  {
    nome: 'Enviar faturas e notificar o financeiro',
    manual: 20,
    robo: 4,
    registros: ['Disparando e-mails via Power Automate…', 'Resumo enviado ao Financeiro'],
  },
];

export const TOTAL_MANUAL = ETAPAS.reduce((soma, etapa) => soma + etapa.manual, 0);
export const TOTAL_ROBO = ETAPAS.reduce((soma, etapa) => soma + etapa.robo, 0);

import type { Projeto } from '@/tipos/conteudo';

/**
 * ✏️ PROJETOS
 *
 * Cada bloco { ... } é um projeto. Para adicionar um novo, copie um bloco
 * inteiro, cole no final da lista e troque os textos.
 *
 * - slug:  nome usado no endereço (gldev.com/projetos/<slug>). Sem espaços nem acentos.
 * - cores: duas cores (hexadecimal) usadas na arte do cartão.
 * - capa:  opcional. Imagem em public/projetos (ex.: '/projetos/meu-projeto/capa.png').
 * - visualizacao: como as pessoas vão ver/testar o projeto. Exemplos:
 *     { tipo: 'site',    url: 'https://meusite.com' }
 *     { tipo: 'powerbi', url: 'https://app.powerbi.com/view?r=...' }
 *     { tipo: 'video',   url: 'https://www.youtube.com/watch?v=...' }
 *     { tipo: 'galeria', imagens: [{ src: '/projetos/x/1.png', legenda: 'Tela inicial' }] }
 *     { tipo: 'codigo',  linguagem: 'SQL', codigo: `SELECT ...` }
 *     { tipo: 'demo',    demo: 'painel-operacoes' }
 *
 * Os projetos abaixo foram montados a partir das experiências do currículo
 * e usam dados fictícios nas demonstrações.
 */
export const projetos: Projeto[] = [
  {
    slug: 'painel-operacoes-portuarias',
    titulo: 'Painel de Operações Portuárias',
    categoria: 'Business Intelligence',
    ano: '2025',
    resumo: 'Dashboard gerencial que integra SAP e sistemas aduaneiros para acompanhar volume, permanência e faturamento do terminal.',
    descricao: [
      'A diretoria precisava de uma visão única da operação, mas os dados estavam divididos entre o ERP (SAP), sistemas aduaneiros e planilhas de cada área.',
      'Construí um modelo dimensional (Star Schema) alimentado por consultas SQL e tratado em Power Query, com medidas em DAX para os principais KPIs de produtividade.',
      'O resultado é um painel que responde em segundos perguntas que antes levavam dias de consolidação manual.',
    ],
    tecnologias: ['Power BI', 'DAX', 'Linguagem M', 'SQL', 'SAP B1'],
    resultados: [
      { valor: '1', rotulo: 'fonte única da verdade' },
      { valor: 'D-1', rotulo: 'atualização diária' },
      { valor: '12+', rotulo: 'KPIs operacionais' },
    ],
    cores: ['#8b5cf6', '#22d3ee'],
    links: {},
    visualizacao: { tipo: 'demo', demo: 'painel-operacoes' },
  },
  {
    slug: 'robo-faturamento-armazem',
    titulo: 'Robô de Faturamento do Armazém',
    categoria: 'Automação',
    ano: '2024',
    resumo: 'Automação em Python e Power Automate que reduziu em 83% o trabalho manual no ciclo de faturamento.',
    descricao: [
      'O faturamento do armazém dependia de baixar relatórios, cruzar planilhas e conferir valores um a um — um processo lento e sujeito a erros.',
      'Desenvolvi um robô que extrai os dados do ERP, valida as regras de negócio, gera os documentos e notifica os responsáveis automaticamente.',
      'Na demonstração ao lado você pode executar o robô e comparar o tempo manual com o automatizado.',
    ],
    tecnologias: ['Python', 'Pandas', 'Selenium', 'Power Automate', 'API REST'],
    resultados: [
      { valor: '-83%', rotulo: 'trabalho manual' },
      { valor: '0', rotulo: 'erros de digitação' },
      { valor: '4x', rotulo: 'ciclo mais rápido' },
    ],
    cores: ['#22d3ee', '#34d399'],
    links: {},
    visualizacao: { tipo: 'demo', demo: 'robo-faturamento' },
  },
  {
    slug: 'previsao-volume-carga',
    titulo: 'Previsão de Volume de Carga',
    categoria: 'Ciência de Dados',
    ano: '2025',
    resumo: 'Modelo preditivo que antecipa a demanda do armazém e ajuda a alocar equipes conforme a sazonalidade.',
    descricao: [
      'Picos sazonais de carga deixavam a operação reativa: faltava equipe em alguns meses e sobrava em outros.',
      'Com Python, criei um modelo que combina tendência e sazonalidade do histórico para projetar o volume dos próximos meses, com intervalo de confiança.',
      'Ajuste o horizonte de previsão na demonstração e veja como o modelo se comporta.',
    ],
    tecnologias: ['Python', 'Pandas', 'NumPy', 'Séries temporais', 'Power BI'],
    resultados: [
      { valor: '12', rotulo: 'meses projetados' },
      { valor: '±8%', rotulo: 'margem média' },
      { valor: '100%', rotulo: 'planejamento proativo' },
    ],
    cores: ['#f472b6', '#8b5cf6'],
    links: {},
    visualizacao: { tipo: 'demo', demo: 'previsao-demanda' },
  },
  {
    slug: 'conciliacao-financeira-sql',
    titulo: 'Conciliação Financeira em SQL',
    categoria: 'Engenharia de Dados',
    ano: '2023',
    resumo: 'Consultas que automatizam a conciliação entre extratos e lançamentos contábeis, acelerando o fechamento mensal.',
    descricao: [
      'O fechamento mensal exigia conferir manualmente milhares de lançamentos contra os extratos bancários.',
      'Escrevi consultas SQL que cruzam as fontes, classificam divergências e entregam ao time financeiro apenas o que precisa de atenção.',
      'Ao lado está uma versão simplificada da consulta principal.',
    ],
    tecnologias: ['SQL', 'T-SQL', 'PostgreSQL', 'Power BI'],
    resultados: [
      { valor: '-60%', rotulo: 'tempo de fechamento' },
      { valor: '99%', rotulo: 'acurácia dos lançamentos' },
      { valor: '1', rotulo: 'relatório de exceções' },
    ],
    cores: ['#34d399', '#3b82f6'],
    links: {},
    visualizacao: {
      tipo: 'codigo',
      linguagem: 'SQL',
      codigo: `-- Conciliação: extrato bancário x lançamentos contábeis
WITH extrato AS (
  SELECT data_movimento, documento, SUM(valor) AS valor_banco
  FROM financeiro.extrato_bancario
  WHERE data_movimento BETWEEN @inicio AND @fim
  GROUP BY data_movimento, documento
),
contabil AS (
  SELECT data_lancamento, documento, SUM(valor) AS valor_contabil
  FROM contabilidade.lancamentos
  WHERE data_lancamento BETWEEN @inicio AND @fim
  GROUP BY data_lancamento, documento
)
SELECT
  COALESCE(e.documento, c.documento)          AS documento,
  e.valor_banco,
  c.valor_contabil,
  COALESCE(e.valor_banco, 0)
    - COALESCE(c.valor_contabil, 0)           AS diferenca,
  CASE
    WHEN e.documento IS NULL THEN 'Sem extrato'
    WHEN c.documento IS NULL THEN 'Sem lançamento'
    WHEN ABS(e.valor_banco - c.valor_contabil) > 0.01 THEN 'Valor divergente'
    ELSE 'Conciliado'
  END                                          AS status
FROM extrato e
FULL OUTER JOIN contabil c
  ON c.documento = e.documento
WHERE e.documento IS NULL
   OR c.documento IS NULL
   OR ABS(e.valor_banco - c.valor_contabil) > 0.01
ORDER BY ABS(COALESCE(e.valor_banco, 0) - COALESCE(c.valor_contabil, 0)) DESC;`,
    },
  },
];

import type { Perfil } from '@/tipos/conteudo';

/**
 * ✏️ DADOS PESSOAIS
 * Altere os textos entre aspas. Campos vazios ('') são escondidos do site.
 */
export const perfil: Perfil = {
  nome: 'George Lucas',
  nomeCompleto: 'George Lucas da Silva Leite',
  cargo: 'Analista & Engenheiro de Dados',

  // Frases que se alternam no topo do site: "Eu crio ..."
  frasesRotativas: [
    'pipelines de dados',
    'modelos dimensionais com dbt',
    'dashboards em Power BI',
    'automações em Python',
    'decisões guiadas por dados',
  ],

  chamada:
    'Construo pipelines que levam o dado bruto até o dashboard: ingestão, modelagem, testes de qualidade e automação.',
  localizacao: 'Rio de Janeiro, RJ',
  disponivelParaProjetos: true,

  // Cada item vira um parágrafo da seção "Sobre"
  resumo: [
    'Sou analista e engenheiro de dados. Começo onde o dado nasce, em APIs, ERPs, bancos Oracle e arquivos públicos, e cuido do caminho inteiro até a decisão: ingestão incremental, modelagem dimensional, testes de qualidade e o dashboard no final.',
    'Hoje sou Analista de Performance e Processos no COE da Taesa, a área de inteligência do CSC, onde respondo por automações e indicadores e atuo na reestruturação dos processos de todas as áreas do CSC com Lean Six Sigma. Na engenharia, construo pipelines com Python, SQL, dbt e DuckDB, orquestrados com GitHub Actions; na análise, entrego painéis em Power BI e automações que reduzem o trabalho manual e dão à liderança visibilidade em cenários de alta complexidade.',
  ],

  // Números de destaque (contam até o valor quando aparecem na tela)
  numeros: [
    { valor: 83, sufixo: '%', rotulo: 'menos trabalho manual em Operações' },
    { valor: 5, sufixo: '+', rotulo: 'anos com dados, BI e automação' },
    { valor: 7, rotulo: 'projetos publicados no GitHub' },
    { valor: 18, sufixo: 'mi+', rotulo: 'linhas processadas por pipeline' },
  ],

  contato: {
    email: 'g.lucasdsl@gmail.com',
    linkedin: 'https://www.linkedin.com/in/george-lucas-b96141182/',
    github: 'https://github.com/glucas290',
    whatsapp: '', // ex.: '5521999999999' (somente números, com DDI e DDD)
  },

  // Arquivo dentro de public/documentos
  curriculo: '/documentos/curriculo-george-lucas.pdf',

  // Foto da seção "Contato" (arquivos em public/perfil, formato retrato 3:4)
  foto: {
    src: '/perfil/george-lucas-800.webp',
    srcPequena: '/perfil/george-lucas-480.webp',
    descricao: 'Retrato de George Lucas em estúdio, de camiseta branca e fundo azul',
  },
};

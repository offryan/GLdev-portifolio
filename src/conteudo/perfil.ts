import type { Perfil } from '@/tipos/conteudo';

/**
 * ✏️ DADOS PESSOAIS
 * Altere os textos entre aspas. Campos vazios ('') são escondidos do site.
 */
export const perfil: Perfil = {
  nome: 'George Lucas',
  nomeCompleto: 'George Lucas da Silva Leite',
  cargo: 'Analista de Dados & Especialista em Automação',

  // Frases que se alternam no topo do site: "Eu crio ..."
  frasesRotativas: [
    'dashboards em Power BI',
    'automações em Python',
    'apps com Power Platform',
    'decisões guiadas por dados',
  ],

  chamada: 'Transformo dados complexos em ativos estratégicos.',
  localizacao: 'Rio de Janeiro, RJ',
  disponivelParaProjetos: true,

  // Cada item vira um parágrafo da seção "Sobre"
  resumo: [
    'Sou analista de dados e especialista em automação. Minha missão é extrair dados de sistemas legados, ERPs e planilhas e convertê-los em inteligência acionável.',
    'Por meio de soluções em BI, Python e Power Platform, reduzo o trabalho manual, blindo operações contra erros humanos e entrego à diretoria a visibilidade necessária para cenários de alta complexidade.',
  ],

  // Números de destaque (contam até o valor quando aparecem na tela)
  numeros: [
    { valor: 83, sufixo: '%', rotulo: 'menos trabalho manual em Operações' },
    { valor: 5, sufixo: '+', rotulo: 'anos com dados, BI e automação' },
    { valor: 6, rotulo: 'projetos publicados no GitHub' },
    { valor: 4, rotulo: 'certificações e especializações' },
  ],

  contato: {
    email: 'g.lucasdsl@gmail.com',
    linkedin: 'https://www.linkedin.com/in/george-lucas-b96141182/',
    github: 'https://github.com/glucas290',
    whatsapp: '', // ex.: '5521999999999' (somente números, com DDI e DDD)
  },

  // Arquivo dentro de public/documentos
  curriculo: '/documentos/curriculo-george-lucas.pdf',

  // Foto da seção "Sobre" (arquivos em public/perfil, formato retrato 3:4)
  foto: {
    src: '/perfil/george-lucas-800.webp',
    srcPequena: '/perfil/george-lucas-480.webp',
    descricao: 'Retrato de George Lucas em estúdio, de camiseta preta e fundo escuro',
  },
};

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
    'Sou analista de dados e especialista em automação. Meu trabalho é pegar dados espalhados em ERPs, planilhas e sistemas legados e transformá-los em informação clara para quem precisa decidir.',
    'Otimizo fluxos operacionais e processos de BackOffice com BI, Python e Power Platform — reduzindo tarefas manuais, mitigando riscos e apoiando a diretoria em cenários de alta complexidade.',
  ],

  // Números de destaque (contam até o valor quando aparecem na tela)
  numeros: [
    { valor: 83, sufixo: '%', rotulo: 'menos trabalho manual em Operações' },
    { valor: 5, sufixo: '+', rotulo: 'anos com dados, BI e automação' },
    { valor: 3, rotulo: 'empresas impactadas' },
    { valor: 4, rotulo: 'certificações e especializações' },
  ],

  contato: {
    email: 'g.lucasdsl@gmail.com',
    linkedin: 'https://www.linkedin.com/in/george-lucas-b96141182/',
    github: '', // ex.: 'https://github.com/usuario'
    whatsapp: '', // ex.: '5521999999999' (somente números, com DDI e DDD)
  },

  // Arquivo dentro de public/documentos
  curriculo: '/documentos/curriculo-george-lucas.pdf',
};

import type { CertificacaoDestaque, Formacao } from '@/tipos/conteudo';

/** ✏️ FORMAÇÃO ACADÊMICA */
export const formacao: Formacao[] = [
  {
    titulo: 'MBA em Tecnologia para Negócios: AI, Data Science e Big Data',
    instituicao: 'PUC — Rio Grande do Sul',
    ano: '2023',
  },
  {
    titulo: 'Bacharel em Administração',
    instituicao: 'UniCarioca — Rio de Janeiro',
    ano: '2020',
  },
];

/**
 * ✏️ CERTIFICAÇÃO EM DESTAQUE
 * Aparece com o selo flutuando no topo do site e num cartão especial na seção Formação.
 * Para trocar o selo, substitua a imagem em public/certificacoes.
 */
export const certificacaoDestaque: CertificacaoDestaque = {
  titulo: 'Microsoft Certified: Power BI Data Analyst Associate',
  codigo: 'PL-300',
  emissor: 'Microsoft',
  ano: '2025',
  imagem: '/certificacoes/pl-300.webp',
  descricao:
    'Certificação oficial da Microsoft que comprova a capacidade de entregar soluções completas de BI no Power BI: da preparação e modelagem dos dados até a análise, a visualização e a publicação para toda a empresa.',
  competencias: ['Preparar os dados', 'Modelar os dados', 'Visualizar e analisar', 'Implantar e manter'],
  link: '', // ex.: 'https://learn.microsoft.com/api/credentials/share/pt-br/...'
};

/** ✏️ OUTRAS CERTIFICAÇÕES */
export const certificacoes: Formacao[] = [
  { titulo: 'Marketing Intelligence, Data Analytics e Agile Management', instituicao: 'PUC', ano: '2023' },
  { titulo: 'Power BI · SQL · Python · Excel (Macros VBA)', instituicao: 'Udemy', ano: '2023 — 2025' },
];

/**
 * Formato de cada informação exibida no site.
 * Os arquivos da pasta `src/conteudo` seguem estes modelos.
 */

export interface Numero {
  valor: number;
  prefixo?: string;
  sufixo?: string;
  rotulo: string;
}

export interface Perfil {
  nome: string;
  nomeCompleto: string;
  cargo: string;
  frasesRotativas: string[];
  chamada: string;
  localizacao: string;
  disponivelParaProjetos: boolean;
  resumo: string[];
  numeros: Numero[];
  contato: {
    email: string;
    linkedin: string;
    github: string;
    whatsapp: string;
  };
  curriculo: string;
}

export type IconeHabilidade = 'dados' | 'graficos' | 'automacao' | 'apps' | 'negocios';

export interface GrupoHabilidades {
  titulo: string;
  icone: IconeHabilidade;
  descricao: string;
  itens: string[];
}

export interface Experiencia {
  cargo: string;
  empresa: string;
  local: string;
  periodo: string;
  atual?: boolean;
  conquistas: { titulo: string; texto: string }[];
}

export interface Formacao {
  titulo: string;
  instituicao: string;
  ano: string;
}

/** Certificação exibida com selo, no topo do site e em destaque na seção Formação. */
export interface CertificacaoDestaque {
  titulo: string;
  codigo: string;
  emissor: string;
  ano: string;
  imagem: string;
  descricao: string;
  competencias: string[];
  /** Link público para verificar a credencial (ex.: Microsoft Learn). Vazio esconde o botão. */
  link: string;
}

export type LinguagemCodigo = 'Python' | 'SQL' | 'DAX' | 'Power Query (M)' | 'JavaScript' | 'Texto';

/** Um passo da simulação de um robô: o que ele faz e o que registra no log. */
export interface EtapaSimulacao {
  nome: string;
  inicio: string;
  fim: string;
}

/**
 * Formas de mostrar um projeto (cada uma vira uma aba na página do projeto):
 * - site:      um site publicado (abre dentro de uma janela)
 * - powerbi:   link "Publicar na Web" do Power BI
 * - video:     link do YouTube
 * - galeria:   lista de imagens (prints)
 * - codigo:    arquivo de código guardado em public/projetos
 * - simulacao: robô executando as etapas, passo a passo
 */
export type Visualizacao = { rotulo?: string } & (
  | { tipo: 'site'; url: string }
  | { tipo: 'powerbi'; url: string }
  | { tipo: 'video'; url: string }
  | { tipo: 'galeria'; imagens: { src: string; legenda: string }[] }
  | { tipo: 'codigo'; linguagem: LinguagemCodigo; arquivo: string }
  | { tipo: 'simulacao'; etapas: EtapaSimulacao[] }
);

/** Ícones disponíveis para as caixas do diagrama de fluxo. */
export type IconeFluxo =
  | 'api'
  | 'banco'
  | 'planilha'
  | 'robo'
  | 'email'
  | 'painel'
  | 'regras'
  | 'arquivo'
  | 'navegador'
  | 'certificado'
  | 'nuvem';

/** Uma caixa do diagrama "como funciona" na página do projeto. */
export interface EtapaFluxo {
  titulo: string;
  detalhe: string;
  icone: IconeFluxo;
}

export interface Projeto {
  slug: string;
  titulo: string;
  categoria: string;
  ano?: string;
  resumo: string;
  /** Estudo de caso: o problema, como foi resolvido e o que mudou. */
  problema: string;
  solucao: string[];
  impacto: string;
  fluxo: EtapaFluxo[];
  tecnologias: string[];
  resultados: { valor: string; rotulo: string }[];
  cores: [string, string];
  capa?: string;
  links: { repositorio?: string; aoVivo?: string };
  visualizacoes: Visualizacao[];
}

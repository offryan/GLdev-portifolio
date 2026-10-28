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

/** Demos interativas disponíveis (cada uma fica em `src/demos`). */
export type IdDemo = 'painel-operacoes' | 'robo-faturamento' | 'previsao-demanda';

/**
 * Como o projeto será visualizado na página dele:
 * - site:    um site publicado (abre dentro de uma janela)
 * - powerbi: link "Publicar na Web" do Power BI
 * - video:   link do YouTube
 * - galeria: lista de imagens (prints)
 * - codigo:  trecho de código para leitura
 * - demo:    demonstração interativa feita dentro do próprio portfólio
 */
export type Visualizacao =
  | { tipo: 'site'; url: string }
  | { tipo: 'powerbi'; url: string }
  | { tipo: 'video'; url: string }
  | { tipo: 'galeria'; imagens: { src: string; legenda: string }[] }
  | { tipo: 'codigo'; linguagem: string; codigo: string }
  | { tipo: 'demo'; demo: IdDemo };

export interface Projeto {
  slug: string;
  titulo: string;
  categoria: string;
  ano: string;
  resumo: string;
  descricao: string[];
  tecnologias: string[];
  resultados: { valor: string; rotulo: string }[];
  cores: [string, string];
  capa?: string;
  links: { repositorio?: string; aoVivo?: string };
  visualizacao: Visualizacao;
}

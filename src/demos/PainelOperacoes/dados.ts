/** Dados fictícios usados apenas na demonstração. */

export const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export const TIPOS_CARGA = [
  { id: 'importacao', nome: 'Importação', cor: '#8b5cf6', base: 4200, ticket: 1450, permanencia: 6.2 },
  { id: 'exportacao', nome: 'Exportação', cor: '#22d3ee', base: 3100, ticket: 980, permanencia: 3.1 },
  { id: 'cabotagem', nome: 'Cabotagem', cor: '#34d399', base: 1500, ticket: 720, permanencia: 4.4 },
] as const;

export type IdTipoCarga = (typeof TIPOS_CARGA)[number]['id'];

export const PERIODOS = [
  { id: 'ano', nome: 'Ano', meses: [0, 11] },
  { id: 's1', nome: '1º semestre', meses: [0, 5] },
  { id: 's2', nome: '2º semestre', meses: [6, 11] },
] as const;

export type IdPeriodo = (typeof PERIODOS)[number]['id'];

export interface Registro {
  mes: number;
  tipo: IdTipoCarga;
  conteineres: number;
  faturamento: number;
  permanencia: number;
  produtividade: number;
}

/** Variação "aleatória" porém sempre igual, para o painel não mudar a cada visita. */
function variacao(semente: number) {
  const x = Math.sin(semente * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export const REGISTROS: Registro[] = TIPOS_CARGA.flatMap((tipo, indiceTipo) =>
  MESES.map((_, mes) => {
    const sazonalidade = 1 + 0.18 * Math.sin(((mes - 2) / 12) * Math.PI * 2);
    const crescimento = 1 + mes * 0.012;
    const ruido = 0.92 + variacao(mes + indiceTipo * 31) * 0.16;
    const conteineres = Math.round(tipo.base * sazonalidade * crescimento * ruido);
    return {
      mes,
      tipo: tipo.id,
      conteineres,
      faturamento: conteineres * tipo.ticket,
      permanencia: tipo.permanencia * (1.08 - mes * 0.012) * (0.95 + variacao(mes * 7 + indiceTipo) * 0.1),
      produtividade: 26 + mes * 0.45 + variacao(mes * 3 + indiceTipo * 11) * 3,
    };
  }),
);

/**
 * Modelo de previsão simples: tendência linear + índice sazonal mensal.
 * O histórico é fictício e serve apenas para a demonstração.
 */

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const ANO_INICIAL = 2023;
const CAPACIDADE_POR_PESSOA = 420; // contêineres por colaborador/mês

export interface Ponto {
  indice: number;
  rotulo: string;
  valor: number;
}

export interface PontoPrevisto extends Ponto {
  minimo: number;
  maximo: number;
  equipe: number;
}

function rotuloMes(indice: number) {
  return `${MESES[indice % 12]}/${String(ANO_INICIAL + Math.floor(indice / 12)).slice(2)}`;
}

function ruido(semente: number) {
  const x = Math.sin(semente * 91.345) * 47453.5453;
  return x - Math.floor(x) - 0.5;
}

export const HISTORICO: Ponto[] = Array.from({ length: 36 }, (_, indice) => {
  const tendencia = 7200 + indice * 55;
  const sazonalidade = 1 + 0.16 * Math.sin(((indice % 12) - 2) * ((Math.PI * 2) / 12)) + (indice % 12 === 11 ? 0.12 : 0);
  return { indice, rotulo: rotuloMes(indice), valor: Math.round(tendencia * sazonalidade * (1 + ruido(indice) * 0.08)) };
});

/** Ajusta a reta de tendência pelo método dos mínimos quadrados. */
function ajustarTendencia(pontos: Ponto[]) {
  const n = pontos.length;
  const mediaX = pontos.reduce((s, p) => s + p.indice, 0) / n;
  const mediaY = pontos.reduce((s, p) => s + p.valor, 0) / n;
  const inclinacao =
    pontos.reduce((s, p) => s + (p.indice - mediaX) * (p.valor - mediaY), 0) /
    pontos.reduce((s, p) => s + (p.indice - mediaX) ** 2, 0);
  return (x: number) => mediaY + inclinacao * (x - mediaX);
}

export function prever(horizonte: number, usarSazonalidade: boolean): PontoPrevisto[] {
  const tendencia = ajustarTendencia(HISTORICO);

  const indicesSazonais = Array.from({ length: 12 }, (_, mes) => {
    if (!usarSazonalidade) return 1;
    const doMes = HISTORICO.filter((p) => p.indice % 12 === mes);
    return doMes.reduce((s, p) => s + p.valor / tendencia(p.indice), 0) / doMes.length;
  });

  const residuos = HISTORICO.map((p) => p.valor - tendencia(p.indice) * indicesSazonais[p.indice % 12]);
  const desvio = Math.sqrt(residuos.reduce((s, r) => s + r * r, 0) / residuos.length);

  return Array.from({ length: horizonte }, (_, passo) => {
    const indice = HISTORICO.length + passo;
    const valor = Math.round(tendencia(indice) * indicesSazonais[indice % 12]);
    const margem = 1.64 * desvio * Math.sqrt(1 + (passo + 1) / 12);
    return {
      indice,
      rotulo: rotuloMes(indice),
      valor,
      minimo: Math.round(valor - margem),
      maximo: Math.round(valor + margem),
      equipe: Math.ceil(valor / CAPACIDADE_POR_PESSOA),
    };
  });
}

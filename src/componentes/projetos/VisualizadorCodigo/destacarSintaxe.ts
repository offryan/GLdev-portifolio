import type { LinguagemCodigo } from '@/tipos/conteudo';

export type TipoTrecho = 'comentario' | 'texto' | 'palavra' | 'numero' | 'funcao' | 'simples';

export interface Trecho {
  tipo: TipoTrecho;
  conteudo: string;
}

const PALAVRAS: Record<LinguagemCodigo, string[]> = {
  Python: ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'raise', 'None', 'True', 'False', 'lambda', 'pass', 'continue', 'break', 'is', 'yield'],
  SQL: ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT', 'INNER', 'OUTER', 'FULL', 'ON', 'GROUP', 'BY', 'ORDER', 'AS', 'WITH', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'NULL', 'IS', 'NOT', 'IN', 'BETWEEN', 'DISTINCT', 'SUM', 'COUNT', 'MAX', 'MIN'],
  DAX: ['measure', 'column', 'table', 'VAR', 'RETURN', 'CALCULATE', 'DIVIDE', 'COUNTROWS', 'FILTER', 'ALL', 'SUM', 'IF', 'SELECTEDVALUE', 'MAX', 'MIN', 'BLANK', 'AND', 'OR', 'NOT', 'SWITCH', 'TRUE', 'FALSE', 'FORMAT', 'formatString', 'displayFolder', 'lineageTag'],
  'Power Query (M)': ['let', 'in', 'each', 'if', 'then', 'else', 'and', 'or', 'not', 'as', 'null', 'true', 'false', 'try', 'otherwise', 'type', 'optional', 'expression', 'lineageTag', 'queryGroup'],
  JavaScript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'import', 'from', 'export', 'new', 'class', 'true', 'false', 'null', 'undefined', 'async', 'await'],
  Texto: [],
};

const COMENTARIO: Record<LinguagemCodigo, string> = {
  Python: '#[^\\n]*',
  SQL: '--[^\\n]*',
  DAX: '//[^\\n]*',
  'Power Query (M)': '//[^\\n]*',
  JavaScript: '//[^\\n]*',
  Texto: '(?!)',
};

/** Divide o código em trechos coloridos (destaque simples, sem dependências). */
export function destacarSintaxe(codigo: string, linguagem: LinguagemCodigo): Trecho[] {
  if (linguagem === 'Texto') return [{ tipo: 'simples', conteudo: codigo }];

  const palavras = new Set(PALAVRAS[linguagem].map((p) => (linguagem === 'SQL' ? p.toUpperCase() : p)));
  const expressao = new RegExp(
    [
      `(${COMENTARIO[linguagem]})`,
      `("""[\\s\\S]*?"""|'''[\\s\\S]*?'''|"(?:\\\\.|[^"\\\\\\n])*"|'(?:\\\\.|[^'\\\\\\n])*')`,
      '(\\b\\d+(?:[.,]\\d+)?\\b)',
      '([A-Za-zÀ-ÿ_][\\w.À-ÿ]*)(?=\\s*\\()',
      '([A-Za-zÀ-ÿ_]\\w*)',
    ].join('|'),
    'g',
  );

  const trechos: Trecho[] = [];
  let ultimo = 0;
  for (const encontrado of codigo.matchAll(expressao)) {
    const inicio = encontrado.index ?? 0;
    if (inicio > ultimo) trechos.push({ tipo: 'simples', conteudo: codigo.slice(ultimo, inicio) });
    const [texto, comentario, string, numero, funcao, palavra] = encontrado;
    let tipo: TipoTrecho = 'simples';
    if (comentario) tipo = 'comentario';
    else if (string) tipo = 'texto';
    else if (numero) tipo = 'numero';
    else if (funcao) tipo = palavras.has(funcao) ? 'palavra' : 'funcao';
    else if (palavra) {
      const chave = linguagem === 'SQL' ? palavra.toUpperCase() : palavra;
      tipo = palavras.has(chave) ? 'palavra' : 'simples';
    }
    trechos.push({ tipo, conteudo: texto });
    ultimo = inicio + texto.length;
  }
  if (ultimo < codigo.length) trechos.push({ tipo: 'simples', conteudo: codigo.slice(ultimo) });
  return trechos;
}

import { Check, Copy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { LinguagemCodigo } from '@/tipos/conteudo';
import { destacarSintaxe } from './destacarSintaxe';
import styles from './VisualizadorCodigo.module.css';

interface VisualizadorCodigoProps {
  arquivo: string;
  linguagem: LinguagemCodigo;
}

/** Carrega um arquivo de código de public/projetos e exibe com números de linha e cores. */
export function VisualizadorCodigo({ arquivo, linguagem }: VisualizadorCodigoProps) {
  const [codigo, setCodigo] = useState<string | null>(null);
  const [erro, setErro] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    let ativo = true;
    setCodigo(null);
    setErro(false);
    fetch(arquivo)
      .then((resposta) => {
        if (!resposta.ok) throw new Error(String(resposta.status));
        return resposta.text();
      })
      .then((texto) => ativo && setCodigo(texto.replace(/\r\n/g, '\n').trimEnd()))
      .catch(() => ativo && setErro(true));
    return () => {
      ativo = false;
    };
  }, [arquivo]);

  const linhas = useMemo(() => (codigo ? codigo.split('\n').length : 0), [codigo]);
  const trechos = useMemo(() => (codigo ? destacarSintaxe(codigo, linguagem) : []), [codigo, linguagem]);

  async function copiar() {
    if (!codigo) return;
    await navigator.clipboard.writeText(codigo).catch(() => undefined);
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 2000);
  }

  if (erro) return <div className={styles.mensagem}>Não foi possível carregar {arquivo}.</div>;
  if (codigo === null) return <div className={styles.mensagem}>Carregando código…</div>;

  return (
    <div className={styles.codigo}>
      <div className={styles.barra}>
        <span className={styles.arquivo}>{arquivo.split('/').pop()}</span>
        <span className={styles.linguagem}>{linguagem}</span>
        <button type="button" onClick={copiar} className={styles.copiar}>
          {copiado ? <Check size={14} /> : <Copy size={14} />} {copiado ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <div className={styles.rolagem}>
        <div className={styles.numeros} aria-hidden="true">
          {Array.from({ length: linhas }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <pre>
          <code>
            {trechos.map((trecho, indice) =>
              trecho.tipo === 'simples' ? (
                trecho.conteudo
              ) : (
                <span key={indice} className={styles[trecho.tipo]}>
                  {trecho.conteudo}
                </span>
              ),
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

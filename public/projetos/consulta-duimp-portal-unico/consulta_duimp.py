"""
Consulta DUIMPs (Declaração Única de Importação) na API do Portal Único
Siscomex e gera um painel comparando os dados do sistema interno com os da
Receita: valor, situação, canal e importador.

Uso:
    python consulta_duimp.py --entrada exemplo_duimps.csv
"""
import argparse
import os
import time
from pathlib import Path

import pandas as pd
import requests
from dotenv import load_dotenv
from requests_pkcs12 import Pkcs12Adapter

AMBIENTE = "portalunico.siscomex.gov.br"
URL_AUTENTICACAO = f"https://{AMBIENTE}/portal/api/autenticar"
URL_ESTOQUE_POS_ACD = f"https://{AMBIENTE}/cct/api/ext/imp/estoque/pos-acd/"

COLUNAS_PORTAL = ["VALOR P.U. (R$)", "STATUS P.U.", "CANAL P.U.", "CLIENTE P.U."]

# Colunas que o sistema interno fornece, renomeadas para o painel.
RENOMEAR_ENTRADA = {
    "documento": "DUIMP",
    "sigla": "TIPO",
    "nome": "CLIENTE INTERNO",
    "valor": "VALOR INTERNO",
    "aberto": "ABERTURA AVERB.",
}


class PortalUnicoClient:
    """Cliente da API do Portal Único com autenticação por certificado digital (mTLS)."""

    def __init__(self, certificado: str, senha_certificado: str, perfil: str = "DEPOSIT"):
        self.perfil = perfil  # DEPOSIT (depositário) ou IMPEXP (importador/exportador)
        self.sessao = requests.Session()
        self.sessao.mount(
            f"https://{AMBIENTE}",
            Pkcs12Adapter(pkcs12_filename=certificado, pkcs12_password=senha_certificado),
        )
        self.autenticar()

    def autenticar(self) -> None:
        resposta = self.sessao.post(URL_AUTENTICACAO, headers={"Role-Type": self.perfil})
        resposta.raise_for_status()
        self.sessao.headers.update({
            "Authorization": resposta.headers["Set-Token"],
            "X-CSRF-Token": resposta.headers["X-CSRF-Token"],
            "Content-Type": "application/json",
        })

    def consultar(self, duimp: str) -> dict:
        resposta = self.sessao.get(URL_ESTOQUE_POS_ACD, params={"numeros": duimp})
        if resposta.status_code in (401, 403):
            # Token expirado: autentica de novo e repete uma vez.
            self.autenticar()
            resposta = self.sessao.get(URL_ESTOQUE_POS_ACD, params={"numeros": duimp})
        try:
            corpo = resposta.json()
        except ValueError:
            corpo = {"message": resposta.text[:200]}
        return {"status_code": resposta.status_code, "corpo": corpo}


def extrair_dados(resultado: dict) -> dict:
    """Converte a resposta da API nas colunas do painel."""
    if resultado["status_code"] != 200:
        mensagem = resultado["corpo"].get("message", "")
        return {"API STATUS": f"Falha - {resultado['status_code']} - {mensagem}"}
    try:
        duimp = resultado["corpo"]["lista"][0]
        return {
            "API STATUS": "Sucesso",
            "VALOR P.U. (R$)": duimp["valorTotalMercadoriaNoLocalDescarregamento"],
            "STATUS P.U.": duimp["situacao"],
            "CANAL P.U.": duimp["canal"],
            "CLIENTE P.U.": duimp["importador"]["nome"],
        }
    except (KeyError, IndexError):
        return {"API STATUS": "Falha - resposta sem dados da DUIMP"}


def consultar_demanda(df: pd.DataFrame, cliente: PortalUnicoClient, pausa: float = 1.0) -> pd.DataFrame:
    linhas = []
    for duimp in df["documento"].astype(str).str.strip():
        linhas.append(extrair_dados(cliente.consultar(duimp)))
        time.sleep(pausa)

    resultado = pd.DataFrame(linhas, index=df.index).reindex(columns=["API STATUS", *COLUNAS_PORTAL])
    return pd.concat([df, resultado], axis=1).rename(columns=RENOMEAR_ENTRADA)


def gerar_painel(df: pd.DataFrame) -> dict:
    """Estrutura usada pelo painel web: tabela HTML e listas para filtros."""
    return {
        "df_duimp": df.to_html(index=False, classes="df_duimp"),
        "duimp_list": sorted(df["DUIMP"].astype(str).str.strip().unique().tolist()),
        "cliente_list": sorted(df["CLIENTE INTERNO"].astype(str).str.strip().unique().tolist())
        if "CLIENTE INTERNO" in df else [],
    }


def main() -> None:
    load_dotenv()
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--entrada", type=Path, required=True, help="CSV com a coluna 'documento' (número da DUIMP)")
    parser.add_argument("--saida", type=Path, default=Path("saida/painel_duimp.html"))
    args = parser.parse_args()

    demanda = pd.read_csv(args.entrada, dtype=str).fillna("")
    cliente = PortalUnicoClient(
        certificado=os.environ["PUCOMEX_CERTIFICADO"],
        senha_certificado=os.environ["PUCOMEX_SENHA_CERTIFICADO"],
        perfil=os.getenv("PUCOMEX_PERFIL", "DEPOSIT"),
    )
    painel = consultar_demanda(demanda, cliente)
    print(painel)

    args.saida.parent.mkdir(parents=True, exist_ok=True)
    args.saida.write_text(gerar_painel(painel)["df_duimp"], encoding="utf-8")
    painel.to_csv(args.saida.with_suffix(".csv"), index=False, sep=";")
    print(f"Painel salvo em {args.saida}")


if __name__ == "__main__":
    main()

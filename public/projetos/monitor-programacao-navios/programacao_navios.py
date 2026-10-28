"""
Coleta a programação de navios publicada no site de um terminal portuário
e exporta o resultado para CSV e, opcionalmente, para uma lista do SharePoint.

Uso:
    python programacao_navios.py
    python programacao_navios.py --saida saida/navios.csv --sharepoint
"""
import argparse
import os
from io import StringIO
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

URL_PADRAO = "https://www.multiterminais.com.br/programacao-navios"
ID_FILTRO_STATUS = "CPH_Body_ddlStatusNavios"
COLUNAS_DESCARTADAS = ["Abertura Gate", "Deadline", "SRV", "Berço"]

# Nomes internos das colunas na lista do SharePoint.
# "Title" é o campo obrigatório de toda lista; "field_N" são os nomes que o
# SharePoint gera ao criar a lista a partir de uma planilha.
MAPA_COLUNAS_SHAREPOINT = {
    "Navio": "Title",
    "Viagem": "field_1",
    "Agência": "field_2",
    "Previsão Chegada": "field_5",
    "Previsão Atracação": "field_6",
    "Atracação Real": "field_7",
    "Previsão Saída": "field_8",
    "Saída Real": "field_9",
    "Status": "field_12",
}


def iniciar_navegador(headless: bool = True) -> webdriver.Chrome:
    options = webdriver.ChromeOptions()
    if headless:
        options.add_argument("--headless=new")
    return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)


def coletar_programacao(url: str, status: str, headless: bool = True, timeout: int = 15) -> pd.DataFrame:
    """Abre a página, aplica o filtro de status e devolve a tabela de navios."""
    navegador = iniciar_navegador(headless)
    try:
        navegador.get(url)
        espera = WebDriverWait(navegador, timeout)
        filtro = espera.until(EC.presence_of_element_located((By.ID, ID_FILTRO_STATUS)))
        tabela_antiga = navegador.find_element(By.TAG_NAME, "table")

        Select(filtro).select_by_value(status)

        # A troca do filtro recarrega a tabela: espera a antiga sair do DOM
        # em vez de usar um sleep fixo.
        try:
            espera.until(EC.staleness_of(tabela_antiga))
            espera.until(EC.presence_of_element_located((By.TAG_NAME, "table")))
        except TimeoutException:
            pass

        tabelas = pd.read_html(StringIO(navegador.page_source))
    finally:
        navegador.quit()

    if not tabelas:
        raise RuntimeError("Nenhuma tabela encontrada na página.")

    df = tabelas[0].fillna("")
    return df.drop(columns=COLUNAS_DESCARTADAS, errors="ignore")


def exportar_csv(df: pd.DataFrame, caminho: Path) -> None:
    caminho.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(caminho, index=False, encoding="utf-8", sep=";")
    print(f"Dados salvos em {caminho}")


def enviar_sharepoint(df: pd.DataFrame, site_url: str, usuario: str, senha: str, lista: str) -> None:
    """Substitui todo o conteúdo da lista pelos dados coletados."""
    from office365.runtime.auth.authentication_context import AuthenticationContext
    from office365.sharepoint.client_context import ClientContext

    autenticacao = AuthenticationContext(site_url)
    if not autenticacao.acquire_token_for_user(usuario, senha):
        raise RuntimeError("Falha na autenticação no SharePoint.")

    ctx = ClientContext(site_url, autenticacao)
    lista_sp = ctx.web.lists.get_by_title(lista)

    itens = lista_sp.get_items()
    ctx.load(itens)
    ctx.execute_query()
    for item in itens:
        item.delete_object()
    ctx.execute_query()

    df_envio = df.astype(str).rename(columns=MAPA_COLUNAS_SHAREPOINT)
    for _, linha in df_envio.iterrows():
        lista_sp.add_item(linha.to_dict())
    ctx.execute_query()
    print(f"{len(df_envio)} itens enviados para a lista '{lista}'.")


def main() -> None:
    load_dotenv()
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--url", default=os.getenv("PROGRAMACAO_URL", URL_PADRAO))
    parser.add_argument("--status", default="operados", help="valor do filtro de status no site")
    parser.add_argument("--saida", type=Path, default=Path("saida/dados_navios.csv"))
    parser.add_argument("--sharepoint", action="store_true", help="também envia os dados para o SharePoint")
    parser.add_argument("--com-janela", action="store_true", help="mostra o navegador durante a coleta")
    args = parser.parse_args()

    df = coletar_programacao(args.url, args.status, headless=not args.com_janela)
    print(f"{len(df)} navios coletados.")
    exportar_csv(df, args.saida)

    if args.sharepoint:
        enviar_sharepoint(
            df,
            site_url=os.environ["SHAREPOINT_SITE_URL"],
            usuario=os.environ["SHAREPOINT_USUARIO"],
            senha=os.environ["SHAREPOINT_SENHA"],
            lista=os.environ["SHAREPOINT_LISTA"],
        )


if __name__ == "__main__":
    main()

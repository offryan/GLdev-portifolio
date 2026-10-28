"""
Atualiza os indicadores de cargas em risco de perdimento.

Lê no SharePoint as cargas armazenadas (CE Mercante + dias em estoque),
decide pela regra de frequência quais devem ser consultadas hoje, consulta
Siscarga e Siscomex e grava o resultado de volta na lista. Ao final, envia
um e-mail de log com o resumo da execução.
"""
import os
import time
from datetime import datetime

import pandas as pd
import pytz
from dotenv import load_dotenv

from notificacao import enviar_log_execucao
from sharepoint_client import SharePointClient
from siscomex import RoboSiscomex, somente_digitos

NOME_ROTINA = "KPIs Perdimento Siscomex"
FUSO = pytz.timezone("America/Sao_Paulo")
PADRAO_CE_MERCANTE = r"^\d{15}$"


def agora() -> str:
    return datetime.now(FUSO).strftime("%d/%m/%Y %H:%M")


def dias_de_consulta(dias_estoque: float, regras: pd.DataFrame) -> str:
    """Devolve os dias da semana (1=seg ... 7=dom) em que a carga deve ser consultada.

    Quanto mais perto do prazo de perdimento, maior a frequência de consulta.
    """
    for _, regra in regras.iterrows():
        if regra["Dias_Inferior"] <= dias_estoque <= regra["Dias_Superior"]:
            return str(regra["Consultas_DiasSemana"])
    return ""


def selecionar_cargas_do_dia(cargas: pd.DataFrame, regras: pd.DataFrame, ids_ignorados: set[int]) -> pd.DataFrame:
    cargas = cargas[["Id", "CEMERCANTE", "NROGRUPO", "DIAS_ESTOQUE"]]
    validas = cargas["CEMERCANTE"].astype(str).str.match(PADRAO_CE_MERCANTE, na=False)
    cargas = cargas[validas & ~cargas["Id"].isin(ids_ignorados)].copy()

    cargas["Dias_Consulta"] = cargas["DIAS_ESTOQUE"].apply(lambda d: dias_de_consulta(d, regras))
    hoje = str(datetime.now(FUSO).isoweekday())
    return cargas[cargas["Dias_Consulta"].str.contains(hoje)]


def consultar_siscarga(robo: RoboSiscomex, ce: str) -> tuple[dict, str]:
    """Consulta CE e DI. Devolve os campos para o SharePoint e o número da DI."""
    dados_ce = robo.consultar_ce(ce)
    data_consulta_ce = agora()
    di = somente_digitos(dados_ce["documento"]) if dados_ce["documento"] else ""

    campos = {
        "SCMX_DOC_DESP": dados_ce["documento"],
        "SCMX_SITUACAOSCMX": dados_ce["situacao"],
        "SCMX_CARGA_BLOCK": "Sim" if dados_ce["bloqueio_datas"] else "Não",
        "SCMX_TIPO_BLOCK": str(dados_ce["bloqueio_tipos"]),
        "SCMX_BLOCK_JUSTI": str(dados_ce["bloqueio_justificativas"]),
        "SCMX_DATA_DESEMBARA": "",
        "SCMX_SITU_SEFAZ": "",
        "SCMX_ATT_DADOSCE": data_consulta_ce,
        "SCMX_ATT_DADOSDI": "",
        "SCMX_DESEMBARACO": "",
        "SCMX_ENTREGA_PERMITIDA": "",
        "SCMX_VMLE": "",
        "SCMX_PEND_ICMS": "",
        "SCMX_PEND_AFRRM": "",
        "SCMX_PEND_FRETEARMADOR": "",
        "SCMX_PEND_TUM": "",
    }

    if di:
        dados_di = robo.consultar_di(di)
        campos.update({
            "SCMX_DESEMBARACO": dados_di["desembaracada"],
            "SCMX_ENTREGA_PERMITIDA": dados_di["entrega"],
            "SCMX_VMLE": dados_di["vmle"],
            "SCMX_PEND_ICMS": dados_di["SCMX_PEND_ICMS"],
            "SCMX_PEND_AFRRM": dados_di["SCMX_PEND_AFRRM"],
            "SCMX_PEND_FRETEARMADOR": dados_di["SCMX_PEND_FRETEARMADOR"],
            "SCMX_PEND_TUM": dados_di["SCMX_PEND_TUM"],
            "SCMX_ATT_DADOSDI": agora(),
        })
        if dados_di["desembaracada"] != "Sim":
            di = ""

    return campos, di


def main() -> str:
    site_url = os.environ["SHAREPOINT_SITE_URL"]
    usuario = os.environ["SHAREPOINT_USUARIO"]
    senha = os.environ["SHAREPOINT_SENHA"]
    lista_cargas = os.environ["SHAREPOINT_LISTA_CARGAS"]
    lista_regras = os.environ["SHAREPOINT_LISTA_REGRAS"]
    pausa_siscomex_web = int(os.getenv("PAUSA_SISCOMEX_WEB_SEGUNDOS", "240"))
    ids_ignorados = {int(i) for i in os.getenv("IDS_IGNORADOS", "").split(",") if i.strip()}

    sp_cargas = SharePointClient(site_url, usuario, senha, lista_cargas)
    regras = SharePointClient(site_url, usuario, senha, lista_regras).ler_itens()
    regras = regras[["Dias_Inferior", "Dias_Superior", "Consultas_DiasSemana"]]
    cargas = selecionar_cargas_do_dia(sp_cargas.ler_itens(), regras, ids_ignorados)
    print(f"{len(cargas)} cargas para consultar hoje.")

    sucessos_siscarga = falhas_siscarga = 0
    dis_desembaracadas = []

    robo = RoboSiscomex()
    robo.iniciar_navegador()
    try:
        robo.logar_siscarga()
        relogar = False
        for _, carga in cargas.iterrows():
            item_id, ce = int(carga["Id"]), str(carga["CEMERCANTE"])
            try:
                if relogar:
                    # Sessão do Siscarga ou token do SharePoint podem expirar no meio da execução.
                    robo.logar_siscarga()
                    sp_cargas = SharePointClient(site_url, usuario, senha, lista_cargas)
                    relogar = False

                print(f"Consultando item {item_id} - CE {ce}")
                campos, di = consultar_siscarga(robo, ce)
                sp_cargas.editar_item(item_id, campos)
                if di:
                    dis_desembaracadas.append((item_id, di))
                sucessos_siscarga += 1
            except Exception as e:
                print(f"Erro ao processar item {item_id}: {e}")
                relogar = True
                falhas_siscarga += 1
    finally:
        robo.fechar()

    # Segunda etapa: UF de destino das DIs desembaraçadas, no Siscomex Web.
    # O Siscomex Web limita a frequência de consultas, por isso a pausa longa.
    sucessos_web = falhas_web = 0
    robo = RoboSiscomex()
    robo.iniciar_navegador()
    try:
        for item_id, di in dis_desembaracadas:
            try:
                robo.logar_siscomex_web()
                uf = robo.consultar_uf_destino_di(di)
                sp_cargas.editar_item(item_id, {"SCMX_UF_DESTINO": uf})
                sucessos_web += 1
                time.sleep(pausa_siscomex_web)
            except Exception as e:
                print(f"Não foi possível obter a UF da DI {di}: {e}")
                falhas_web += 1
    finally:
        robo.fechar()

    return (
        f"Sucessos Siscarga: {sucessos_siscarga} - Falhas Siscarga: {falhas_siscarga} - "
        f"Sucessos Siscomex Web: {sucessos_web} - Falhas Siscomex Web: {falhas_web}"
    )


if __name__ == "__main__":
    load_dotenv()
    try:
        detalhe, status = main(), "Sucesso"
    except Exception as e:
        detalhe, status = str(e), "Falha"
    print(f"{status}: {detalhe}")

    destinatarios = os.getenv("EMAIL_DESTINATARIOS_LOG")
    if destinatarios:
        enviar_log_execucao(destinatarios, NOME_ROTINA, status, detalhe)

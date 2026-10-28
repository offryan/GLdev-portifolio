"""
Regras de negócio para classificar as solicitações de vistoria e calcular o
prazo (SLA) de atendimento. Funções puras, sem dependência de sistemas externos.
"""
import re
import unicodedata
from datetime import date, datetime, time, timedelta

import pandas as pd
from workalendar.america import Brazil


class CalendarioRJ(Brazil):
    """Feriados nacionais mais os feriados do município do Rio de Janeiro."""

    include_corpus_christi = True
    FIXED_HOLIDAYS = Brazil.FIXED_HOLIDAYS + (
        (1, 20, "São Sebastião"),
        (4, 23, "São Jorge"),
        (11, 20, "Consciência Negra"),
    )


def normalizar(texto) -> str:
    """Maiúsculas e sem acentos, para comparar textos livres."""
    texto = str(texto).upper()
    return "".join(c for c in unicodedata.normalize("NFD", texto) if unicodedata.category(c) != "Mn")


def identificar_tipo_documento(valor) -> str:
    """Identifica o tipo de declaração a partir do texto digitado pelo solicitante."""
    if pd.isna(valor):
        return ""
    texto = str(valor).strip().lower()
    if "duimp" in texto or "br" in texto:
        return "DUIMP"
    if "due" in texto:
        return "DUE"
    if "dsi" in texto:
        return "DSI"
    # DSI sem prefixo: 10 dígitos no formato AA000NNNNN (ano + 000 + sequencial)
    if re.fullmatch(r"\d{2}000\d{5}", re.sub(r"\D", "", texto)):
        return "DSI"
    return "DI"


def formatar_declaracao(valor) -> str:
    """Normaliza o número da declaração conforme o tipo.

    DUIMP: 15 caracteres alfanuméricos · DUE: 14 · DI/DSI: 10 dígitos.
    """
    if pd.isna(valor):
        return ""
    texto = str(valor).strip().upper()
    tipo = identificar_tipo_documento(valor)
    if tipo == "DUIMP":
        limpo = "".join(filter(str.isalnum, texto.replace("DUIMP", "")))
        return limpo[-15:].zfill(15)
    if tipo == "DUE":
        limpo = "".join(filter(str.isalnum, texto.replace("DUE", "")))
        return limpo[-14:].zfill(14)
    return "".join(filter(str.isdigit, texto)).zfill(10)[-10:]


def definir_setor(tipo_documento: str, observacao) -> str:
    """Equipe da fiscalização responsável pela vistoria."""
    tipo = tipo_documento.upper().strip()
    obs = str(observacao).upper()
    if tipo in ("DI", "DUIMP"):
        return "DECEX" if "DECEX" in obs else "EQCAD"
    return {"DSI": "EQBAG", "DTA": "EQTAD", "DUE": "EXPORTAÇÃO"}.get(tipo, "")


# Palavras-chave na observação -> código do serviço. A ordem importa.
SERVICOS_POR_PALAVRA = [
    ("REFERENCIA", "DTR"),      # desova total por referência
    ("ADICAO", "DTA"),          # desova total por adição
    ("TOTAL", "DT"),            # desova total
    ("PARCIAL", "DP"),          # desova parcial
    ("ABERTURA", "AB"),         # abertura de unidade
    ("POSICIONAMENTO", "POS"),  # posicionamento para vistoria
]


def definir_servico(setor: str, observacao) -> str:
    if str(setor).strip().upper() == "DECEX":
        return "DTR"
    obs = normalizar(observacao)
    for palavra, servico in SERVICOS_POR_PALAVRA:
        if palavra in obs:
            return servico
    return ""


def regra_de_prazo(servico: str) -> tuple[int, time]:
    """(dias úteis, horário limite) para cada tipo de serviço."""
    if servico in ("AB", "POS"):
        return 2, time(11, 0)
    if servico == "DP":
        return 2, time(19, 0)
    return 3, time(16, 0)


def calcular_prazo(servico: str, data_criacao, calendario: Brazil) -> datetime | None:
    """Prazo de atendimento: N dias úteis após a solicitação, até o horário limite.

    Solicitações feitas em fim de semana ou feriado contam a partir do próximo dia útil.
    """
    if not servico or pd.isna(data_criacao):
        return None
    dias, horario = regra_de_prazo(servico)
    dia: date = pd.Timestamp(data_criacao).date()
    if not calendario.is_working_day(dia):
        dia = calendario.find_following_working_day(dia)
    adicionados = 0
    while adicionados < dias:
        dia += timedelta(days=1)
        if calendario.is_working_day(dia):
            adicionados += 1
    return datetime.combine(dia, horario)

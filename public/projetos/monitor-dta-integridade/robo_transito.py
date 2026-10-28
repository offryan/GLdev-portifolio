"""Robô Selenium para o módulo de Trânsito Aduaneiro do Siscomex."""
import time

from selenium import webdriver
from selenium.common.exceptions import NoAlertPresentException, TimeoutException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

URL_LOGIN = "https://www4c.receita.fazenda.gov.br/g33159/jsp/logon.jsp?ind=11"
URL_CHEGADA_VEICULO = (
    "https://www4c.receita.fazenda.gov.br/g36154/servlet/"
    "siscomex.transito.navegacao.NavChegadaVeiculo?senhaRede=CV-RC&transacao=CV_PP"
)
URL_CONSULTA_DECLARACAO = "https://www4c.receita.fazenda.gov.br/g36154/jsp/consFluxoDecl.jsp"

# Login com certificado digital
XPATH_OPCAO_CERTIFICADO = '//*[@id="cpfsenha"]/table[1]/tbody/tr[2]/td/table/tbody/tr[8]/td/select/option[1]'
XPATH_ENTRAR = '//*[@id="cpfsenha"]/table[1]/tbody/tr[2]/td/table/tbody/tr[4]/td[1]/table/tbody/tr[4]/td[2]/div/a/img'

# Registro de chegada do veículo
XPATH_CHEGADA_DOCUMENTO = "/html/body/table/tbody/tr[2]/td[3]/form/table/tbody/tr[1]/td[2]/input"
XPATH_CHEGADA_PLACA = "/html/body/table/tbody/tr[2]/td[3]/form/table/tbody/tr[2]/td[2]/input"
XPATH_CHEGADA_CONFIRMAR = "/html/body/table/tbody/tr[2]/td[3]/form/input[10]"
XPATH_CHEGADA_MENSAGEM = "/html/body/table[2]/tbody/tr[2]/td[2]/center/font"

# Consulta do fluxo da declaração
XPATH_CONSULTA_CAMPO = '//*[@id="casca"]/table/tbody/tr[2]/td[3]/form/input[4]'
XPATH_CONSULTA_BOTAO = '//*[@id="casca"]/table/tbody/tr[2]/td[3]/form/input[5]'
XPATH_LEGENDA_CHEGADA = "/html/body/fieldset[12]/legend"
XPATH_INTEGRIDADE_RESULTADO = "/html/body/fieldset[13]/table/tbody/tr[1]/td"
XPATH_INTEGRIDADE_DATA = "/html/body/fieldset[13]/table/tbody/tr[2]/td"
XPATH_INTEGRIDADE_RESPONSAVEL = "/html/body/fieldset[13]/table/tbody/tr[3]/td"
XPATH_RECINTO_ORIGEM = "/html/body/fieldset[2]/table/tbody/tr[2]/td"


class RoboTransito:
    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument("--start-maximized")
        options.add_argument("--disable-popup-blocking")
        options.add_argument("--disable-notifications")
        self.navegador = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    def fechar(self) -> None:
        self.navegador.quit()

    def _esperar(self, xpath: str, tempo: int = 10):
        return WebDriverWait(self.navegador, tempo).until(EC.presence_of_element_located((By.XPATH, xpath)))

    def _texto(self, xpath: str) -> str:
        return self.navegador.find_element(By.XPATH, xpath).text.strip()

    def _aceitar_alerta(self, tempo: int = 2) -> bool:
        try:
            WebDriverWait(self.navegador, tempo).until(EC.alert_is_present()).accept()
            return True
        except (TimeoutException, NoAlertPresentException):
            return False

    def logar_com_certificado(self) -> None:
        """Login com o certificado digital instalado no navegador."""
        self.navegador.get(URL_LOGIN)
        try:
            self._esperar(XPATH_OPCAO_CERTIFICADO).click()
            self.navegador.find_element(By.XPATH, XPATH_ENTRAR).click()
        except TimeoutException:
            pass  # sessão já autenticada

    def _consultar_declaracao(self, documento: str) -> bool:
        """Abre a consulta de fluxo da declaração. Retorna False se o site recusar o número."""
        self.navegador.get(URL_CONSULTA_DECLARACAO)
        campo = self._esperar(XPATH_CONSULTA_CAMPO)
        campo.clear()
        campo.send_keys(documento)
        self.navegador.find_element(By.XPATH, XPATH_CONSULTA_BOTAO).click()
        return not self._aceitar_alerta()

    def registrar_chegada(self, documento: str, placa: str) -> bool:
        """Registra a chegada do veículo. True se o site confirmou na hora."""
        try:
            self.navegador.get(URL_CHEGADA_VEICULO)
            self._esperar(XPATH_CHEGADA_DOCUMENTO).send_keys(documento)
            self.navegador.find_element(By.XPATH, XPATH_CHEGADA_PLACA).send_keys(placa)
            self.navegador.find_element(By.XPATH, XPATH_CHEGADA_CONFIRMAR).click()
            try:
                confirmado = "SUCESSO" in self._esperar(XPATH_CHEGADA_MENSAGEM, tempo=5).text.upper()
            except TimeoutException:
                confirmado = False
            self._aceitar_alerta()
            return confirmado
        except Exception as e:
            print(f"Erro ao registrar a chegada da placa {placa}: {e}")
            return False

    def chegada_consta_no_fluxo(self, documento: str) -> bool:
        """Confere no fluxo da declaração se a chegada do trânsito foi registrada."""
        try:
            if not self._consultar_declaracao(documento):
                return False
            legenda = self._esperar(XPATH_LEGENDA_CHEGADA, tempo=7).text.upper()
            return "CHEGADA DO TRANSITO" in legenda
        except Exception as e:
            print(f"Chegada não localizada para o documento {documento}: {e}")
            return False

    def consultar_integridade(self, documento: str) -> dict | None:
        """Retorna os dados da ocorrência de integridade, se houver."""
        try:
            if not self._consultar_declaracao(documento):
                return None
            resultado = self._esperar(XPATH_INTEGRIDADE_RESULTADO, tempo=5).text.strip()
        except TimeoutException:
            return None
        if "INTEGRIDADE" not in resultado.upper():
            return None
        time.sleep(1)
        return {
            "RESULTADO": resultado,
            "DATA": self._texto(XPATH_INTEGRIDADE_DATA),
            "NOME": self._texto(XPATH_INTEGRIDADE_RESPONSAVEL),
            "RECINTO ORIGEM": self._texto(XPATH_RECINTO_ORIGEM),
        }

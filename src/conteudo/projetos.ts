import type { Projeto } from '@/tipos/conteudo';

const REPOSITORIO = 'https://github.com/glucas290/GLdev/tree/main';
const PAINEL_POWER_BI =
  'https://app.powerbi.com/view?r=eyJrIjoiN2M0MDBjMjEtNjU4NS00NTZhLThkM2YtYjMyM2UzMmQ2ZjljIiwidCI6ImU2OWJmYmEwLTQwZjQtNDMwMi1hZjc4LTJjNTkxYTU3ZmFmYiJ9';

/**
 * ✏️ PROJETOS
 *
 * Cada bloco { ... } é um projeto. Para adicionar um novo, copie um bloco
 * inteiro, cole na lista e troque os textos. A ordem aqui é a ordem no site.
 *
 * - slug:  nome usado no endereço (gldev.com/projetos/<slug>). Sem espaços nem acentos.
 * - problema / solucao / impacto: os três blocos do estudo de caso.
 * - fluxo: caixas do diagrama "como funciona". Ícones: 'api', 'banco', 'planilha',
 *   'robo', 'email', 'painel', 'regras', 'arquivo', 'navegador', 'certificado', 'nuvem'.
 * - cores: duas cores (hexadecimal) usadas na arte do cartão.
 * - capa:  opcional. Imagem em public/projetos (ex.: '/projetos/meu-projeto/capa.png').
 * - visualizacoes: formas de ver/testar o projeto. Cada uma vira uma aba. Exemplos:
 *     { tipo: 'powerbi',   url: 'https://app.powerbi.com/view?r=...' }
 *     { tipo: 'site',      url: 'https://meusite.com' }
 *     { tipo: 'video',     url: 'https://www.youtube.com/watch?v=...' }
 *     { tipo: 'galeria',   imagens: [{ src: '/projetos/x/1.png', legenda: 'Tela inicial' }] }
 *     { tipo: 'codigo',    linguagem: 'Python', arquivo: '/projetos/x/script.py' }
 *     { tipo: 'simulacao', etapas: [{ nome: 'Etapa', inicio: 'Começando…', fim: 'Pronto' }] }
 *   Use `rotulo: 'Nome da aba'` para trocar o nome padrão da aba.
 *
 * Todos os projetos abaixo estão em github.com/glucas290/GLdev
 * (códigos anonimizados e dados fictícios, conforme o próprio repositório).
 */
export const projetos: Projeto[] = [
  {
    slug: 'kpi-diario-armazem',
    titulo: 'KPI Diário – Armazém',
    categoria: 'Business Intelligence',
    ano: '2026',
    resumo:
      'Painel Power BI com os KPIs de conferência aduaneira, entrega de carga solta e recebimento/desunitização de um terminal portuário.',
    problema:
      'A equipe operacional de um armazém alfandegado precisava acompanhar todos os dias três indicadores críticos, mas os dados estavam espalhados entre o sistema operacional do terminal (TOS, em Oracle) e planilhas de controle mantidas à mão no SharePoint — com cabeçalhos deslocados, contêineres digitados fora do padrão e linhas duplicadas.',
    solucao: [
      'Organizei o Power Query em camadas (parâmetros, funções, staging, dimensões e fatos) que limpam e padronizam as bases manuais antes de cruzá-las com o TOS.',
      'Transformei a regra de prazo em dias úteis — com hora de corte e feriados — numa única função M reutilizável, em vez de colunas DAX repetidas em várias tabelas.',
      'Montei um modelo estrela com quatro tabelas fato e metas parametrizadas em planilha, para a gestão mudar um prazo sem mexer no Power BI. O visual ganhou tema próprio com banners e ícones em SVG.',
    ],
    impacto:
      'A operação passou a ter uma visão diária e confiável dos três KPIs, com metas comparadas automaticamente e evolução mensal por serviço, tipo de atendimento e etapa. Esta versão foi reconstruída com bases fictícias para o portfólio.',
    fluxo: [
      { titulo: 'TOS (Oracle)', detalhe: 'Posicionamentos, agendamentos e movimentações', icone: 'banco' },
      { titulo: 'Planilhas SharePoint', detalhe: 'Controles das equipes e metas', icone: 'planilha' },
      { titulo: 'Power Query', detalhe: 'Limpeza, prazos em dias úteis e cruzamentos', icone: 'regras' },
      { titulo: 'Modelo estrela', detalhe: '4 fatos, calendário, clientes e metas', icone: 'arquivo' },
      { titulo: 'Painel Power BI', detalhe: 'KPIs diários publicados na web', icone: 'painel' },
    ],
    tecnologias: ['Power BI', 'Power Query (M)', 'DAX', 'TMDL / PBIP', 'Oracle', 'SharePoint'],
    resultados: [
      { valor: '3', rotulo: 'KPIs diários da operação' },
      { valor: '4', rotulo: 'páginas interativas' },
      { valor: '24 mil', rotulo: 'registros consolidados' },
    ],
    cores: ['#f59e0b', '#14b8a6'],
    capa: '/projetos/kpi-diario-armazem/01-visao-geral.webp',
    links: { aoVivo: PAINEL_POWER_BI, repositorio: `${REPOSITORIO}/kpi-armazem-portuario` },
    visualizacoes: [
      { tipo: 'powerbi', rotulo: 'Painel ao vivo', url: PAINEL_POWER_BI },
      {
        tipo: 'galeria',
        imagens: [
          { src: '/projetos/kpi-diario-armazem/01-visao-geral.webp', legenda: 'Visão geral dos três indicadores' },
          { src: '/projetos/kpi-diario-armazem/02-conferencia-aduaneira.webp', legenda: 'Conferência aduaneira' },
          { src: '/projetos/kpi-diario-armazem/03-entrega-carga-solta.webp', legenda: 'Entrega de carga solta' },
          { src: '/projetos/kpi-diario-armazem/04-recebimento-desunitizacao.webp', legenda: 'Recebimento e desunitização' },
        ],
      },
      { tipo: 'codigo', rotulo: 'Medidas DAX', linguagem: 'DAX', arquivo: '/projetos/kpi-diario-armazem/Medidas.tmdl' },
      { tipo: 'codigo', rotulo: 'Power Query (M)', linguagem: 'Power Query (M)', arquivo: '/projetos/kpi-diario-armazem/expressions.tmdl' },
    ],
  },
  {
    slug: 'pipeline-vistorias-aduaneiras',
    titulo: 'Pipeline de Vistorias Aduaneiras',
    categoria: 'Pipeline de dados',
    resumo:
      'Sincroniza solicitações de vistoria por API, calcula o SLA em dias úteis, enriquece com Siscomex e Oracle e sinaliza itens de risco.',
    problema:
      'As solicitações de vistoria da fiscalização chegavam em texto livre. A equipe classificava cada uma à mão, calculava o prazo de atendimento e ainda consultava o Siscomex e o sistema interno para descobrir quais contêineres separar e o que havia dentro de cada carga.',
    solucao: [
      'Busca as solicitações por API (OAuth2), classifica tipo de declaração, equipe e serviço pelo texto e calcula o prazo em dias úteis com os feriados do Rio de Janeiro.',
      'Detalha cada DI no Siscomex (CE Mercante, volumes, peso) e no Oracle (BL, navio, contêineres), criando uma linha por contêiner.',
      'Lê adições e itens de mercadoria, compara com uma lista de termos de risco mantida pela equipe e anexa uma planilha Excel a cada declaração.',
    ],
    impacto:
      'A equipe recebe numa lista do SharePoint tudo o que precisa para planejar as vistorias — classificação, prazo, contêineres e itens de risco — sem digitação nem consultas manuais.',
    fluxo: [
      { titulo: 'API de agendamento', detalhe: 'Solicitações via OAuth2', icone: 'api' },
      { titulo: 'Regras de negócio', detalhe: 'Classificação e SLA em dias úteis', icone: 'regras' },
      { titulo: 'Siscomex + Oracle', detalhe: 'DI, CE Mercante e contêineres', icone: 'robo' },
      { titulo: 'Termos de risco', detalhe: 'Adições e itens sinalizados', icone: 'certificado' },
      { titulo: 'Lista SharePoint', detalhe: 'Planejamento da equipe + anexos', icone: 'planilha' },
    ],
    tecnologias: ['Python', 'REST / OAuth2', 'Selenium', 'Oracle', 'pandas', 'workalendar', 'SharePoint'],
    resultados: [
      { valor: '3', rotulo: 'etapas encadeadas' },
      { valor: '6', rotulo: 'tipos de serviço classificados' },
      { valor: 'D+N', rotulo: 'SLA em dias úteis' },
    ],
    cores: ['#8b5cf6', '#22d3ee'],
    links: { repositorio: `${REPOSITORIO}/pipeline-vistorias-aduaneiras` },
    visualizacoes: [
      {
        tipo: 'simulacao',
        etapas: [
          { nome: 'Buscar solicitações na API de agendamento', inicio: 'Autenticando via OAuth2…', fim: 'Solicitações do período recebidas' },
          { nome: 'Classificar declaração, equipe e serviço', inicio: 'Lendo o texto livre das solicitações…', fim: 'DI, DUIMP, DSI e DUE identificadas' },
          { nome: 'Calcular o prazo (SLA) em dias úteis', inicio: 'Aplicando feriados nacionais e do RJ…', fim: 'Prazos de atendimento calculados' },
          { nome: 'Detalhar a DI no Siscomex e no Oracle', inicio: 'Consultando CE Mercante, volumes e peso…', fim: 'BL, navio e contêineres vinculados' },
          { nome: 'Verificar adições e itens de risco', inicio: 'Comparando itens com os termos de risco…', fim: 'Itens de risco sinalizados' },
          { nome: 'Atualizar a lista no SharePoint', inicio: 'Gravando itens e anexando planilhas…', fim: 'Lista pronta para a equipe' },
        ],
      },
      { tipo: 'codigo', rotulo: 'Regras de negócio', linguagem: 'Python', arquivo: '/projetos/pipeline-vistorias-aduaneiras/regras.py' },
    ],
  },
  {
    slug: 'monitor-dta-integridade',
    titulo: 'Monitor de DTA – Gate-in e Integridade',
    categoria: 'Automação (RPA)',
    resumo:
      'Registra no Siscomex a chegada dos veículos em trânsito aduaneiro e alerta a equipe sobre ocorrências de integridade.',
    problema:
      'Os registros de chegada dos caminhões em trânsito aduaneiro (DTA) eram feitos à mão, veículo a veículo, e atrasos geravam pendências no despacho. Ocorrências de integridade — lacre ou volumes violados — só eram descobertas quando alguém consultava a DTA, muitas vezes com o caminhão já no pátio.',
    solucao: [
      'O robô lê os agendamentos de DTA no Oracle e registra a chegada de cada veículo no Siscomex Trânsito assim que ele passa pelo gate-in.',
      'Se a tela não confirma na hora, ele verifica no fluxo da declaração antes de marcar a chegada como falha — uma validação em duas etapas.',
      'Em paralelo, consulta a integridade de cada DTA e envia um e-mail com status em cores. Históricos em CSV evitam reprocessar documentos.',
    ],
    impacto:
      'Chegadas registradas sem atraso e ocorrências de integridade comunicadas à equipe antes de virarem problema no pátio. O e-mail de log só é enviado quando há algo relevante.',
    fluxo: [
      { titulo: 'Agendamentos (Oracle)', detalhe: 'Veículos com gate-in', icone: 'banco' },
      { titulo: 'Siscomex Trânsito', detalhe: 'Registro da chegada', icone: 'robo' },
      { titulo: 'Validação', detalhe: 'Confere no fluxo da declaração', icone: 'regras' },
      { titulo: 'Integridade da DTA', detalhe: 'Lacres e volumes', icone: 'certificado' },
      { titulo: 'Alerta por e-mail', detalhe: 'Status de cada veículo', icone: 'email' },
    ],
    tecnologias: ['Python', 'Selenium', 'Oracle', 'pandas', 'Outlook'],
    resultados: [
      { valor: '2', rotulo: 'rotinas: chegada e integridade' },
      { valor: '2', rotulo: 'checagens por veículo' },
      { valor: 'CSV', rotulo: 'histórico sem reprocessar' },
    ],
    cores: ['#22d3ee', '#34d399'],
    links: { repositorio: `${REPOSITORIO}/verificador-integridade-dta` },
    visualizacoes: [
      {
        tipo: 'simulacao',
        etapas: [
          { nome: 'Buscar agendamentos de DTA no Oracle', inicio: 'Consultando veículos com gate-in…', fim: 'Veículos novos identificados' },
          { nome: 'Registrar a chegada no Siscomex Trânsito', inicio: 'Preenchendo documento e placa…', fim: 'Chegadas registradas' },
          { nome: 'Conferir o registro no fluxo da declaração', inicio: 'Validando chegadas não confirmadas…', fim: 'Status de cada veículo definido' },
          { nome: 'Consultar a integridade das DTAs', inicio: 'Verificando lacres e volumes…', fim: 'Ocorrências de integridade levantadas' },
          { nome: 'Avisar a equipe por e-mail', inicio: 'Montando tabela com status em cores…', fim: 'E-mail de alerta enviado' },
        ],
      },
      { tipo: 'codigo', rotulo: 'Robô do Siscomex', linguagem: 'Python', arquivo: '/projetos/monitor-dta-integridade/robo_transito.py' },
    ],
  },
  {
    slug: 'consulta-perdimento-siscomex',
    titulo: 'Consulta de Perdimento – Siscarga/Siscomex',
    categoria: 'Automação (RPA)',
    resumo:
      'Mantém atualizados os indicadores de cargas em risco de perdimento, consultando CE Mercante e DI com frequência inteligente.',
    problema:
      'Uma carga que passa do prazo de armazenagem sem ser desembaraçada pode ser declarada abandonada e perdida para a União. Com centenas de cargas e prazos diferentes, consultar o CE Mercante e a DI de cada uma no Siscarga e no Siscomex levava horas e era feito de forma irregular.',
    solucao: [
      'Uma lista de regras define, por faixa de dias em estoque, em quais dias da semana cada carga é consultada — quanto mais perto do prazo, mais frequente.',
      'O robô lê a situação do CE Mercante e da DI, detecta pendências de ICMS, AFRMM, frete do armador e TUM e grava os indicadores no SharePoint.',
      'Se a sessão do Siscarga ou o token do SharePoint expiram, ele reautentica e segue para o próximo item, sem perder a execução.',
    ],
    impacto:
      'Os indicadores de risco de perdimento ficam sempre atualizados, com prioridade para as cargas mais urgentes, e a equipe recebe um log com os sucessos e falhas de cada etapa.',
    fluxo: [
      { titulo: 'Cargas + regras', detalhe: 'Lista SharePoint', icone: 'planilha' },
      { titulo: 'Seleção do dia', detalhe: 'Frequência por dias em estoque', icone: 'regras' },
      { titulo: 'Siscarga / Siscomex', detalhe: 'CE Mercante e DI', icone: 'robo' },
      { titulo: 'Indicadores', detalhe: 'Pendências gravadas no SharePoint', icone: 'planilha' },
      { titulo: 'Log por e-mail', detalhe: 'Sucessos e falhas', icone: 'email' },
    ],
    tecnologias: ['Python', 'Selenium', 'pandas', 'SharePoint', 'Outlook'],
    resultados: [
      { valor: '4', rotulo: 'tipos de pendência detectados' },
      { valor: '2', rotulo: 'sistemas da Receita consultados' },
      { valor: 'Auto', rotulo: 'reautenticação de sessão' },
    ],
    cores: ['#f472b6', '#8b5cf6'],
    links: { repositorio: `${REPOSITORIO}/consulta-perdimento-siscomex` },
    visualizacoes: [
      {
        tipo: 'simulacao',
        etapas: [
          { nome: 'Selecionar as cargas do dia', inicio: 'Aplicando regras por dias em estoque…', fim: 'Cargas próximas do prazo priorizadas' },
          { nome: 'Consultar o CE Mercante no Siscarga', inicio: 'Lendo situação, bloqueios e nº da DI…', fim: 'CEs atualizados' },
          { nome: 'Consultar a entrega da DI', inicio: 'Verificando desembaraço e pendências…', fim: 'Pendências de ICMS, AFRMM, frete e TUM mapeadas' },
          { nome: 'Gravar os indicadores no SharePoint', inicio: 'Atualizando a lista de cargas…', fim: 'Indicadores de perdimento atualizados' },
          { nome: 'Enviar o log por e-mail', inicio: 'Resumindo sucessos e falhas…', fim: 'Log enviado à equipe' },
        ],
      },
      { tipo: 'codigo', rotulo: 'Orquestração', linguagem: 'Python', arquivo: '/projetos/consulta-perdimento-siscomex/main.py' },
    ],
  },
  {
    slug: 'consulta-duimp-portal-unico',
    titulo: 'Consulta de DUIMP – Portal Único',
    categoria: 'Integração via API',
    resumo:
      'Integração com a API oficial do Portal Único Siscomex, com certificado digital, para conferir DUIMPs contra o sistema interno.',
    problema:
      'Divergências entre o sistema do armazém e a Receita — cliente diferente, valor diferente, DUIMP parametrizada em canal vermelho — só eram percebidas no faturamento ou na liberação da carga.',
    solucao: [
      'A integração autentica uma única vez na API oficial do Portal Único com certificado digital A1 (mTLS) e reaproveita o token, renovando-o apenas quando expira.',
      'Para cada DUIMP da demanda, consulta o estoque pós-ACD e extrai valor, situação, canal e importador.',
      'O resultado é um painel em HTML e CSV com os dados internos e os da Receita lado a lado, mais o status de cada consulta.',
    ],
    impacto:
      'As divergências aparecem antes do faturamento e da liberação da carga, numa única tela de conferência — e o certificado e a senha saíram do código para variáveis de ambiente.',
    fluxo: [
      { titulo: 'DUIMPs da demanda', detalhe: 'Sistema interno / CSV', icone: 'arquivo' },
      { titulo: 'Certificado A1', detalhe: 'Autenticação mTLS', icone: 'certificado' },
      { titulo: 'API Portal Único', detalhe: 'Estoque pós-ACD', icone: 'api' },
      { titulo: 'Painel comparativo', detalhe: 'HTML + CSV lado a lado', icone: 'painel' },
    ],
    tecnologias: ['Python', 'API REST', 'mTLS', 'requests', 'pandas'],
    resultados: [
      { valor: '1', rotulo: 'autenticação por execução' },
      { valor: '4', rotulo: 'campos conferidos por DUIMP' },
      { valor: 'HTML', rotulo: 'painel de divergências' },
    ],
    cores: ['#34d399', '#3b82f6'],
    links: { repositorio: `${REPOSITORIO}/consulta-duimp-portal-unico` },
    visualizacoes: [
      {
        tipo: 'simulacao',
        etapas: [
          { nome: 'Ler a lista de DUIMPs da demanda', inicio: 'Carregando DUIMPs do sistema interno…', fim: 'Lista de DUIMPs pronta' },
          { nome: 'Autenticar com certificado digital', inicio: 'Conectando via mTLS ao Portal Único…', fim: 'Token obtido e reaproveitado' },
          { nome: 'Consultar o estoque pós-ACD', inicio: 'Consultando cada DUIMP na API…', fim: 'Valor, situação, canal e importador recebidos' },
          { nome: 'Gerar o painel comparativo', inicio: 'Cruzando dados internos e da Receita…', fim: 'Painel HTML e CSV gerados' },
        ],
      },
      { tipo: 'codigo', rotulo: 'Cliente da API', linguagem: 'Python', arquivo: '/projetos/consulta-duimp-portal-unico/consulta_duimp.py' },
    ],
  },
  {
    slug: 'monitor-programacao-navios',
    titulo: 'Monitor de Programação de Navios',
    categoria: 'Automação (RPA)',
    resumo:
      'Coleta a programação de navios publicada no site de um terminal e entrega os dados em CSV ou numa lista do SharePoint.',
    problema:
      'A equipe de planejamento acompanhava a chegada, atracação e saída de navios de um terminal vizinho consultando o site várias vezes ao dia e copiando os dados para planilhas.',
    solucao: [
      'O robô abre a página em modo headless, aplica o filtro de status e espera a tabela antiga sair da tela — sem pausas fixas, o que é mais rápido e confiável.',
      'Lê a tabela com pandas, descarta colunas desnecessárias e salva um CSV pronto para Excel e Power BI.',
      'Com a opção --sharepoint, regrava a lista que alimenta os painéis internos, mapeando cada coluna para o campo da lista.',
    ],
    impacto:
      'A programação de navios chega à equipe e aos painéis internos com um único comando, sem cópia manual.',
    fluxo: [
      { titulo: 'Site do terminal', detalhe: 'Programação de navios', icone: 'navegador' },
      { titulo: 'Selenium', detalhe: 'Filtro e espera da tabela', icone: 'robo' },
      { titulo: 'pandas', detalhe: 'Leitura e limpeza', icone: 'regras' },
      { titulo: 'CSV + SharePoint', detalhe: 'Pronto para Power BI', icone: 'planilha' },
    ],
    tecnologias: ['Python', 'Selenium', 'pandas', 'SharePoint'],
    resultados: [
      { valor: '1', rotulo: 'comando para coletar e publicar' },
      { valor: 'CSV', rotulo: 'pronto para Power BI' },
      { valor: '5', rotulo: 'opções de linha de comando' },
    ],
    cores: ['#3b82f6', '#8b5cf6'],
    links: { repositorio: `${REPOSITORIO}/monitor-programacao-navios` },
    visualizacoes: [
      {
        tipo: 'simulacao',
        etapas: [
          { nome: 'Abrir a página de programação', inicio: 'Iniciando Chrome em modo headless…', fim: 'Página carregada' },
          { nome: 'Aplicar o filtro de status', inicio: 'Selecionando navios operados…', fim: 'Tabela recarregada' },
          { nome: 'Ler a tabela de navios', inicio: 'Extraindo dados com pandas…', fim: 'Navios coletados' },
          { nome: 'Exportar CSV e SharePoint', inicio: 'Gravando arquivo e lista…', fim: 'Programação publicada para a equipe' },
        ],
      },
      { tipo: 'codigo', rotulo: 'Script completo', linguagem: 'Python', arquivo: '/projetos/monitor-programacao-navios/programacao_navios.py' },
    ],
  },
];

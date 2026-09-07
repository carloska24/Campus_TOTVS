import type { ILesson } from '../types/lesson';

export const LESSONS_DATABASE: ILesson[] = [
  {
    "id": "aula00",
    "module": "Nível 0: Arquitetura ERP",
    "title": "Aula 00: Arquitetura & Contexto Corporativo",
    "badge": "00_IntroducaoERP.prw",
    "description": "Compreenda a inicialização de ambiente (RpcSetEnv), leitura de variáveis globais de sessão (cEmpAnt, cFilAnt, dDataBase) e verificação do dicionário SX2.",
    "challenge": {
      "title": "Auditoria de Empresa, Filial e Dicionário SX2",
      "icon": "🏢",
      "badgeName": "Explorador de Arquitetura",
      "xp": 40,
      "difficulty": "Iniciante",
      "difficultyColor": "#38bdf8",
      "description": "Todo fonte executado no Protheus necessita de um ambiente corporativo ativo. Verifique se o ambiente está inicializado com Select('SX2') > 0. Obtenha a filial ativa através da função xFilial('SA1') e exiba o resultado da auditoria na tela.",
      "objectives": [
        "Inicializar o ambiente defensivamente caso cEmpAnt não esteja definido",
        "Obter a filial da tabela SA1 através da função xFilial('SA1')",
        "Verificar se o Dicionário SX2 está aberto usando Select('SX2') > 0",
        "Executar no Protheus Virtual e validar a exibição do contexto corporativo"
      ],
      "hint": "Utilize a função xFilial('SA1') para descobrir se a tabela é exclusiva da filial ou compartilhada em toda a empresa!",
      "solution": "// Leitura da filial de clientes:\nLocal cFilSA1 := xFilial('SA1')\nConOut('Filial SA1: ' + cFilSA1)"
    },
    "code": "#Include \"Totvs.ch\"\n\n/*/{Protheus.doc} User Function Aula00\n    Aula 00 - Introducao a Arquitetura ERP e Contexto Corporativo.\n    @type     Function\n    @author   Campus TOTVS / Pair Programming\n    @since    07/09/2026\n    @version  1.0\n/*/\nUser Function Aula00()\n    // Declaracao de Variaveis Locais no Topo\n    Local cEmpresa  := \"\"\n    Local cFilial   := \"\"\n    Local cFilSA1   := \"\"\n    Local lAmbOk    := .F.\n    Local cRelat    := \"\"\n\n    // Inicializacao defensiva de ambiente se necessario\n    If Select(\"SX2\") == 0 .Or. Type(\"cEmpAnt\") == \"U\" .Or. Empty(cEmpAnt)\n        If !RpcSetEnv(\"99\", \"01\")\n            RpcSetEnv(\"01\", \"01\")\n        EndIf\n    EndIf\n\n    // Leitura do Contexto Corporativo\n    cEmpresa := cEmpAnt\n    cFilial  := cFilAnt\n    lAmbOk   := (Select(\"SX2\") > 0)\n    cFilSA1  := xFilial(\"SA1\")\n\n    // Formatando Relatorio de Auditoria do Ambiente\n    cRelat := \"=== CAMPUS TOTVS - AUDITORIA DE AMBIENTE ERP ===\" + CRLF + CRLF\n    cRelat += \"Status do Ambiente : \" + Iif(lAmbOk, \"CONECTADO COM SUCESSO\", \"FALHA DE AMBIENTE\") + CRLF\n    cRelat += \"Empresa Ativa      : \" + cEmpresa + \" (Matriz)\" + CRLF\n    cRelat += \"Filial Ativa       : \" + cFilial + \" (Filial Operacional)\" + CRLF\n    cRelat += \"Filial Clientes SA1: \" + Iif(Empty(cFilSA1), \"[COMPARTILHADA]\", cFilSA1) + CRLF\n    cRelat += \"Data Base Protheus : \" + dToC(dDataBase) + CRLF + CRLF\n    cRelat += \"Camada Arquitetura : SmartClient -> AppServer -> DBAccess\" + CRLF\n\n    ApMsgInfo(cRelat, \"Campus TOTVS - Aula 00: Arquitetura ERP\")\n\nReturn Nil",
    "lineExplanations": {
      "1": {
        "title": "Diretiva #Include \"Totvs.ch\"",
        "desc": "Importa as constantes e rotinas nativas do ecossistema TOTVS Protheus, como CRLF, tipos primitivos e componentes de tela.",
        "audioHint": "Totvs ponto c-h é a biblioteca base. Ela disponibiliza variáveis globais e comandos de tela.",
        "tags": [
          "Pré-Processador",
          "Include"
        ]
      },
      "3": {
        "title": "Bloco de Documentação ProtheusDoc",
        "desc": "Padrão oficial da TOTVS documentando o objetivo educacional, autor, data e versão da rotina de introdução a arquitetura.",
        "audioHint": "O ProtheusDoc é lido pela IDE para gerar ajuda de código e documentação técnica oficial.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "10": {
        "title": "Ponto de Entrada (User Function Aula00)",
        "desc": "Declara a porta de entrada customizada da rotina executável no Protheus com o prefixo U_AULA00.",
        "audioHint": "User Function Aula zero zero é a porta de entrada executada no SmartClient ou WebApp.",
        "tags": [
          "User Function",
          "Escopo Global"
        ]
      },
      "12": {
        "title": "Variável de Empresa Ativa (Local cEmpresa)",
        "desc": "Armazena o código da empresa corporativa selecionada no login do ERP. Declarada no topo seguindo a regra Blocker do SonarQube.",
        "audioHint": "cEmpresa guarda o código de 2 dígitos da empresa ativa, como 01 ou 99.",
        "tags": [
          "Local",
          "cEmpresa",
          "SonarQube"
        ]
      },
      "13": {
        "title": "Variável de Filial Ativa (Local cFilial)",
        "desc": "Armazena o código da filial de trabalho ativa da thread atual. O prefixo 'c' indica tipo Character.",
        "audioHint": "cFilial guarda o código da filial operacional ativa no momento da execução.",
        "tags": [
          "Local",
          "cFilial",
          "Character"
        ]
      },
      "14": {
        "title": "Variável de Filial de Clientes (Local cFilSA1)",
        "desc": "Receberá a filial resolvida para a tabela SA1 considerando as regras de compartilhamento de tabelas do ERP.",
        "audioHint": "cFilSA1 guardará o retorno da função xFilial para a tabela de clientes.",
        "tags": [
          "Local",
          "xFilial",
          "SA1"
        ]
      },
      "15": {
        "title": "Flag de Validação do Dicionário (Local lAmbOk)",
        "desc": "Variável lógica booleana inicializada com .F. para confirmar se o Dicionário de Dados SX2 está carregado na memória.",
        "audioHint": "lAmbOk é uma flag booleana. Em ADVPL usamos ponto F ponto para falso.",
        "tags": [
          "Local",
          "Logical",
          "SX2"
        ]
      },
      "16": {
        "title": "Acumulador de Relatório (Local cRelat)",
        "desc": "String inicializada vazia para acumular o texto formatado do relatório de auditoria de arquitetura.",
        "audioHint": "cRelat acumula todo o texto das linhas de auditoria que serão exibidas na tela.",
        "tags": [
          "Local",
          "Acumulador",
          "String"
        ]
      },
      "19": {
        "title": "Verificação Defensiva de Ambiente (If Select('SX2') == 0...)",
        "desc": "Testa se a tabela SX2 está inacessível ou se a variável cEmpAnt não foi inicializada pela sessão.",
        "audioHint": "Esta linha protege a rotina caso seja disparada sem uma sessão de login prévia no Protheus.",
        "tags": [
          "Validação",
          "Sessão",
          "Fail Fast"
        ]
      },
      "20": {
        "title": "Tentativa de Inicialização Empresa 99 (RpcSetEnv)",
        "desc": "Invoca RpcSetEnv para alocar memória, carregar os dicionários SX e conectar na Empresa Matriz 99 Filial 01.",
        "audioHint": "RpcSetEnv prepara os dicionários de dados e tabelas corporativas para execução segura.",
        "tags": [
          "RpcSetEnv",
          "Empresa 99"
        ]
      },
      "21": {
        "title": "Fallback de Conexão na Empresa 01",
        "desc": "Caso a Empresa 99 de teste não exista no ambiente, tenta carregar defensivamente a Empresa 01 Filial 01.",
        "audioHint": "Garante fallback automático para ambientes onde a empresa 99 não foi criada.",
        "tags": [
          "Fallback",
          "Empresa 01"
        ]
      },
      "22": {
        "title": "Fechamento do Fallback (EndIf)",
        "desc": "Encerra o bloco de tratamento de fallback do RpcSetEnv.",
        "audioHint": "EndIf fecha o bloco condicional de tentativa de inicialização.",
        "tags": [
          "EndIf"
        ]
      },
      "23": {
        "title": "Fechamento da Verificação de Ambiente (EndIf)",
        "desc": "Encerra o bloco principal de proteção defensiva da sessão corporativa.",
        "audioHint": "EndIf finaliza a validação defensiva do ambiente ERP.",
        "tags": [
          "EndIf"
        ]
      },
      "26": {
        "title": "Leitura da Empresa Ativa (cEmpresa := cEmpAnt)",
        "desc": "Atribui à variável local o código da empresa mantido na variável de sistema cEmpAnt pelo AppServer.",
        "audioHint": "cEmpAnt é mantida pelo AppServer e identifica a empresa ativa na thread de execução.",
        "tags": [
          "cEmpAnt",
          "Empresa"
        ]
      },
      "27": {
        "title": "Leitura da Filial Ativa (cFilial := cFilAnt)",
        "desc": "Atribui à variável local o código da filial mantido na variável global cFilAnt da sessão do usuário.",
        "audioHint": "cFilAnt identifica a filial atual selecionada pelo operador no login.",
        "tags": [
          "cFilAnt",
          "Filial"
        ]
      },
      "28": {
        "title": "Auditoria de Abertura do Dicionário SX2",
        "desc": "A função Select('SX2') retorna o número da área de trabalho alocada. Se for maior que zero, o dicionário de tabelas está ativo.",
        "audioHint": "Select maior que zero comprova que a tabela física do dicionário está aberta na memória.",
        "tags": [
          "Select",
          "SX2"
        ]
      },
      "29": {
        "title": "Resolução de Filial com xFilial('SA1')",
        "desc": "A função nativa xFilial consulta o modo de compartilhamento da tabela SA1: retorna a filial se exclusiva ou vazio se compartilhada.",
        "audioHint": "X-Filial respeita as regras da empresa. Se a tabela for compartilhada, ela retorna vazio automaticamente.",
        "tags": [
          "xFilial",
          "SA1",
          "Compartilhamento"
        ]
      },
      "32": {
        "title": "Título do Relatório de Auditoria",
        "desc": "Inicia a montagem da string de saída com o cabeçalho formatado e quebra de linha CRLF.",
        "audioHint": "Inicia a formatação do relatório corporativo que será exibido para o usuário.",
        "tags": [
          "Relatório",
          "CRLF"
        ]
      },
      "33": {
        "title": "Exibição do Status de Conexão com Iif()",
        "desc": "Utiliza o operador ternário Iif para imprimir 'CONECTADO COM SUCESSO' se lAmbOk for verdadeiro.",
        "audioHint": "O Iif ternário avalia a flag e exibe o status de conectividade do ERP.",
        "tags": [
          "Iif",
          "Status"
        ]
      },
      "34": {
        "title": "Exibição da Empresa Ativa",
        "desc": "Concatena o código da empresa ativa cEmpresa no relatório de auditoria.",
        "audioHint": "Mostra o código e descrição da empresa em que o programa está operando.",
        "tags": [
          "Empresa",
          "Concatenação"
        ]
      },
      "35": {
        "title": "Exibição da Filial Ativa",
        "desc": "Concatena a filial de trabalho corrente cFilial para validação da thread.",
        "audioHint": "Exibe o código da filial ativa no relatório de conformidade.",
        "tags": [
          "Filial",
          "Relatório"
        ]
      },
      "36": {
        "title": "Diagnóstico de Compartilhamento de Clientes",
        "desc": "Informa se a tabela de clientes SA1 opera em modo compartilhado ou exclusivo para a filial corrente.",
        "audioHint": "Informa claramente se a base de clientes é compartilhada entre filiais ou exclusiva.",
        "tags": [
          "SA1",
          "Compartilhada"
        ]
      },
      "37": {
        "title": "Data de Trabalho do Protheus (dDataBase)",
        "desc": "Exibe a data de operação do ERP convertida com dToC. A variável dDataBase pode diferir da data do calendário do servidor.",
        "audioHint": "dDataBase é a data contábil e fiscal de trabalho ativa no Protheus, diferente do Date do relógio.",
        "tags": [
          "dDataBase",
          "dToC"
        ]
      },
      "38": {
        "title": "Arquitetura em 3 Camadas Identificada",
        "desc": "Exibe a trilha de processamento: camada visual SmartClient, camada de aplicação AppServer e banco via DBAccess.",
        "audioHint": "Comprova a integração entre as 3 camadas do Protheus funcionando em harmonia.",
        "tags": [
          "Arquitetura",
          "3 Camadas"
        ]
      },
      "40": {
        "title": "Exibição da Caixa Modal (ApMsgInfo)",
        "desc": "Dispara a caixa de mensagem modal informativa no SmartClient com todo o resumo auditado do ambiente.",
        "audioHint": "ApMsgInfo desenha a janela com os dados auditados e bloqueia a tela até o clique em OK.",
        "tags": [
          "ApMsgInfo",
          "Interface Gráfica"
        ]
      },
      "42": {
        "title": "Encerramento da Função (Return Nil)",
        "desc": "Encerra a User Function liberando as variáveis locais da pilha de memória do AppServer.",
        "audioHint": "Return Nil finaliza a execução com sucesso liberando a memória alocada.",
        "tags": [
          "Return",
          "Nil"
        ]
      }
    }
  },
  {
    "id": "aula01",
    "module": "Nível 1: Fundamentos",
    "title": "Aula 01: Tipos de Dados & Variáveis",
    "badge": "01_Variaveis.prw",
    "description": "Aprenda a declarar variáveis, tipos primitivos (C, N, D, L, A), escopos na memória e formatação com Transform e dToC.",
    "challenge": {
      "title": "Expanda o Relatório do Colaborador",
      "icon": "🎯",
      "badgeName": "Mestre das Variáveis",
      "xp": 50,
      "difficulty": "Iniciante",
      "difficultyColor": "#22c55e",
      "description": "Adicione uma variável Local cCargo com o cargo do colaborador (ex: 'Desenvolvedor ADVPL Pleno'). Exiba-a no relatório formatada com PadL() alinhada à esquerda em 30 caracteres, logo abaixo do nome.",
      "objectives": [
        "Declarar a variável Local cCargo := 'Desenvolvedor ADVPL Pleno' no topo da função",
        "Formatar o cargo com PadL(cCargo, 30) para padronizar o alinhamento",
        "Concatenar no cResumo logo após a linha do Nome",
        "Executar no Protheus Virtual e validar a exibição do cargo"
      ],
      "hint": "Regra de ouro: Todas as declarações de variáveis (Local) devem ficar no início imediato da função, antes de qualquer comando executável! PadL('Texto', 30) preenche com espaços até completar 30 posições.",
      "solution": "// 1. Declarar no início da User Function:\nLocal cCargo    := \"Desenvolvedor ADVPL Pleno\"\n\n// 2. Concatenar no cResumo:\ncResumo += \"Nome: \" + cNome + CRLF\ncResumo += \"Cargo: \" + PadL(cCargo, 30) + CRLF"
    },
    "code": "#Include \"Totvs.ch\"\n\n/*/{Protheus.doc} User Function Aula01\n    Aula 1 - Fundamentos: Tipos de Dados, Variaveis, Escopos e Manipulacao.\n    @type  Function\n    @author Antigravity / Pair Programming\n    @since 01/09/2026\n    @version 1.0\n/*/\nUser Function Aula01()\n    // Declaracao de Variaveis Locais (Boa Pratica)\n    Local cNome     := \"Joao Silva\"\n    Local nSalario  := 4500.75\n    Local dAdmissao := Date()\n    Local lAtivo    := .T.\n    Local aCursos   := {\"ADVPL Basico\", \"MVC Avancado\", \"APIs REST em TLPP\"}\n    Local cResumo   := \"\"\n    Local nI        := 0\n\n    // Formatando e montando o texto de apresentacao\n    cResumo := \"=== DADOS DO COLABORADOR ===\" + CRLF + CRLF\n    cResumo += \"Nome: \" + cNome + CRLF\n    cResumo += \"Salario: R$ \" + Transform(nSalario, \"@E 999,999.92\") + CRLF\n    cResumo += \"Data de Admissao: \" + dToC(dAdmissao) + CRLF\n    cResumo += \"Status Ativo: \" + Iif(lAtivo, \"SIM\", \"NAO\") + CRLF + CRLF\n    \n    cResumo += \"--- Cursos Matriculados (\" + cValToChar(Len(aCursos)) + \") ---\" + CRLF\n    For nI := 1 To Len(aCursos)\n        cResumo += cValToChar(nI) + \". \" + aCursos[nI] + CRLF\n    Next nI\n\n    // Exibindo a janela com os dados processados\n    ApMsgInfo(cResumo, \"Nivel 1 - Aula 01: Variaveis e Tipos de Dados\")\n\nReturn Nil",
    "lineExplanations": {
      "1": {
        "title": "Diretiva de Inclusão de Cabeçalho (#Include)",
        "desc": "Importa as constantes e comandos fundamentais da TOTVS, como CRLF e definições visuais. É obrigatório em quase todos os fontes ADVPL.",
        "audioHint": "Include Totvs ponto c-h importa as definições e constantes essenciais da linguagem ADVPL.",
        "tags": [
          "Pré-Processador",
          "Boas Práticas"
        ]
      },
      "3": {
        "title": "Bloco de Documentação ProtheusDoc",
        "desc": "Padrão oficial da TOTVS para documentar funções. Informa tipo, autor, data de criação e versão. A extensão ADVPL do VS Code lê este bloco para exibir tooltips de ajuda.",
        "audioHint": "ProtheusDoc documenta a função no padrão oficial exigido pela governança da TOTVS.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "10": {
        "title": "Declaração da Função de Usuário (User Function)",
        "desc": "Declara a porta de entrada da rotina customizada. No Protheus, ela é executada externamente com o prefixo U_ — por exemplo: U_AULA01.",
        "audioHint": "User Function Aula 01 é a porta de entrada da rotina, invocada com U underline Aula 01.",
        "tags": [
          "Escopo Global",
          "User Function"
        ]
      },
      "11": {
        "title": "Comentário: Declaração de Variáveis Locais",
        "desc": "Comentário que demarca o bloco de declaração no início imediato da função, em total conformidade com a regra Blocker do SonarQube TOTVS.",
        "audioHint": "Bloco inicial reservado para todas as declarações de variáveis no escopo local.",
        "tags": [
          "Comentário",
          "Boas Práticas"
        ]
      },
      "12": {
        "title": "Variável Tipo Character (Local cNome)",
        "desc": "Cria uma variável de texto no escopo Local. O escopo Local garante que ela só existirá enquanto a função estiver executando, liberando memória ao final automaticamente.",
        "audioHint": "Variável local cNome com o prefixo c para indicar texto na notação húngara.",
        "tags": [
          "Local",
          "Tipo Character (C)"
        ]
      },
      "13": {
        "title": "Variável Tipo Numérico (Local nSalario)",
        "desc": "Armazena números inteiros ou decimais. O operador dois-pontos-igual é a atribuição em ADVPL — equivale ao igual simples de outras linguagens.",
        "audioHint": "Variável local nSalario com o prefixo n numérico recebendo o valor inicial com decimais.",
        "tags": [
          "Local",
          "Tipo Numeric (N)"
        ]
      },
      "14": {
        "title": "Variável Tipo Data (Local dAdmissao)",
        "desc": "A função Date() retorna a data corrente do servidor. Variáveis de data têm o prefixo d e não podem ser concatenadas diretamente com texto — é preciso convertê-las com dToC primeiro.",
        "audioHint": "Variável local dAdmissao com o prefixo d recebendo a data atual da função Date.",
        "tags": [
          "Local",
          "Tipo Date (D)"
        ]
      },
      "15": {
        "title": "Variável Tipo Lógico / Booleano (Local lAtivo)",
        "desc": "Em ADVPL, os valores booleanos são ponto T ponto para verdadeiro e ponto F ponto para falso. O prefixo l indica Logical.",
        "audioHint": "Variável local lAtivo booleana recebendo ponto T ponto que significa verdadeiro.",
        "tags": [
          "Local",
          "Tipo Logical (L)"
        ]
      },
      "16": {
        "title": "Array Dinâmico (Local aCursos)",
        "desc": "Cria um vetor com 3 elementos de texto dentro das chaves. Em ADVPL, arrays começam no índice 1, diferente de linguagens como JavaScript e Python que começam em zero.",
        "audioHint": "Vetor local aCursos inicializado com 3 cursos em seus respectivos índices de 1 a 3.",
        "tags": [
          "Local",
          "Tipo Array (A)"
        ]
      },
      "17": {
        "title": "Variável Acumuladora (Local cResumo)",
        "desc": "Inicializa uma string vazia que será usada como acumulador de texto. A cada linha processada, o conteúdo será concatenado nela usando o operador mais-igual.",
        "audioHint": "Variável local cResumo inicializada como string vazia para acumular o texto do relatório.",
        "tags": [
          "Local",
          "Acumulador de Texto"
        ]
      },
      "18": {
        "title": "Contador de Loop (Local nI)",
        "desc": "Variável numérica usada como índice de controle do laço For/Next. Deve ser declarada no topo da função, antes de qualquer instrução executável.",
        "audioHint": "Contador nI numérico inicializado com zero para controle do laço de repetição.",
        "tags": [
          "Local",
          "Contador",
          "Loop"
        ]
      },
      "20": {
        "title": "Comentário: Montagem do Relatório",
        "desc": "Início da lógica executável após a declaração estrita de todas as variáveis no topo da rotina.",
        "audioHint": "Início das instruções de processamento e formatação de saída.",
        "tags": [
          "Comentário",
          "Processamento"
        ]
      },
      "21": {
        "title": "Título e Quebra de Linha (CRLF)",
        "desc": "CRLF é uma constante que insere uma nova linha no texto, equivalente a pressionar Enter. É definida pelo Include da TOTVS e aparece na maioria dos relatórios.",
        "audioHint": "Atribui o cabeçalho ao cResumo com duas quebras de linha CRLF.",
        "tags": [
          "Constante CRLF",
          "String"
        ]
      },
      "22": {
        "title": "Linha de Nome com Concatenação (+)",
        "desc": "O operador de adição (+) concatena strings em ADVPL. Aqui junta o rótulo fixo com o valor da variável cNome para formar a linha do relatório.",
        "audioHint": "Concatena o rótulo com o conteúdo da variável cNome e salta a linha.",
        "tags": [
          "Concatenação",
          "String"
        ]
      },
      "23": {
        "title": "Formatação Monetária com Transform()",
        "desc": "A função Transform com a máscara arroba E 999,999.92 formata o número no padrão brasileiro, com vírgula decimal e ponto de milhar.",
        "audioHint": "Transform formata o salário no padrão monetário brasileiro com vírgula decimal.",
        "tags": [
          "Transform",
          "Máscaras"
        ]
      },
      "24": {
        "title": "Conversão de Data para Texto (dToC)",
        "desc": "D-to-C converte uma variável do tipo Data para Character no formato Dia, Mês e Ano. É necessário para concatenar datas em strings de texto.",
        "audioHint": "dToC converte a data para formato texto dia, mês e ano para exibição.",
        "tags": [
          "Conversão de Tipos",
          "dToC"
        ]
      },
      "25": {
        "title": "Operador Condicional Ternário (Iif)",
        "desc": "I-I-F avalia uma condição e retorna o segundo argumento se verdadeiro ou o terceiro se falso — tudo em uma única linha, sem precisar de um bloco If completo.",
        "audioHint": "Operador ternário Iif avalia se lAtivo é verdadeiro retornando Sim ou Não.",
        "tags": [
          "Iif",
          "Lógica Inline"
        ]
      },
      "27": {
        "title": "Cabeçalho da Seção de Cursos (Len)",
        "desc": "Adiciona uma linha de subtítulo no relatório mostrando o total de cursos entre parênteses. Len retorna a quantidade de elementos no array aCursos.",
        "audioHint": "Len calcula o total de cursos e cValToChar converte o valor numérico em texto.",
        "tags": [
          "Len",
          "cValToChar"
        ]
      },
      "28": {
        "title": "Laço de Repetição For...To...Next",
        "desc": "Itera o contador nI de 1 até o total de cursos, acessando cada posição do vetor através de aCursos de nI. O Next incrementa automaticamente o contador.",
        "audioHint": "Laço For iterando de 1 até a quantidade de elementos retornada por Len de aCursos.",
        "tags": [
          "Loop",
          "For/Next"
        ]
      },
      "29": {
        "title": "Acesso a Elemento do Array por Índice",
        "desc": "A sintaxe aCursos de nI acessa o elemento na posição nI do array. Na primeira iteração nI vale 1, na segunda vale 2, e assim por diante.",
        "audioHint": "Concatena o índice numérico convertido e o nome do curso posicionado no array.",
        "tags": [
          "Array",
          "Indexação"
        ]
      },
      "30": {
        "title": "Incremento do Laço (Next nI)",
        "desc": "Incrementa o índice nI em 1 e retorna ao início do laço For até que nI ultrapasse o valor máximo definido.",
        "audioHint": "Next nI incrementa o índice e fecha o bloco do laço For.",
        "tags": [
          "Next",
          "Loop"
        ]
      },
      "32": {
        "title": "Comentário: Exibição da Interface",
        "desc": "Demarcação do acionamento visual que apresenta o relatório gerado ao usuário.",
        "audioHint": "Comentário indicando a exibição da tela informativa para o usuário.",
        "tags": [
          "Comentário"
        ]
      },
      "33": {
        "title": "Caixa de Diálogo Informativa (ApMsgInfo)",
        "desc": "Desenha a janela modal padrão do Protheus WebApp com ícone azul informativo e o botão OK. É a função mais simples de interface para exibir mensagens ao operador.",
        "audioHint": "ApMsgInfo desenha a caixa de mensagem com o texto acumulado em cResumo.",
        "tags": [
          "Interface Gráfica",
          "ApMsgInfo"
        ]
      },
      "35": {
        "title": "Retorno da Função (Return Nil)",
        "desc": "Encerra a execução da rotina retornando Nulo, liberando todas as variáveis locais da memória do AppServer automaticamente.",
        "audioHint": "Return Nil encerra a User Function com sucesso liberando a memória alocada.",
        "tags": [
          "Return",
          "Nil"
        ]
      }
    }
  },
  {
    "id": "aula02",
    "module": "Nível 1: Fundamentos",
    "title": "Aula 02: Condicionais, aAdd & Static Functions",
    "badge": "02_Logica.prw",
    "description": "Aprenda a estruturar regras com If/Else, Do Case, manipular arrays dinamicamente com aAdd e criar Static Functions.",
    "challenge": {
      "title": "Regras de Bonificação por Matriz",
      "icon": "⚡",
      "badgeName": "Estrategista de Fluxo",
      "xp": 75,
      "difficulty": "Iniciante",
      "difficultyColor": "#22c55e",
      "description": "Em vez de usar valores fixos no If/ElseIf, crie uma matriz aRegras com os limites e rótulos de cada faixa. Refatore a lógica para percorrer a matriz dinamicamente com loop For...Next.",
      "objectives": [
        "Criar uma matriz aRegras com os pares {Limite, Rótulo, Percentual}",
        "Iterar a matriz com For...Next buscando a faixa atingida",
        "Eliminar o encadeamento rígido de If/ElseIf redundantes",
        "Garantir o cálculo exato da bonificação para qualquer valor"
      ],
      "hint": "Ordene a matriz do maior valor para o menor: aRegras := { {9.0, 'Excelente', 0.20}, {7.0, 'Bom', 0.10} }. Dessa forma, a primeira condição satisfeita captura a maior faixa de desempenho!",
      "solution": "Local aRegras := { {9.0, \"Excelente\", 0.20}, {7.0, \"Bom\", 0.10}, {5.0, \"Regular\", 0.05} }\nLocal nI := 0\nLocal cStatus := \"Insuficiente\"\nFor nI := 1 To Len(aRegras)\n    If nNota >= aRegras[nI][1]\n        cStatus := aRegras[nI][2]\n        Exit\n    EndIf\nNext nI"
    },
    "code": "#Include \"Totvs.ch\"\n\n/*/{Protheus.doc} User Function Aula02\n    Aula 2 - Estruturas Condicionais, Arrays Dinamicos e Funcoes Estaticas Locais.\n    @type  Function\n    @author Antigravity / Pair Programming\n    @since 01/09/2026\n    @version 1.0\n/*/\nUser Function Aula02()\n    // Declaracao de Variaveis\n    Local nNota       := 8.5\n    Local cStatus     := \"\"\n    Local cFaixa      := \"\"\n    Local aRelatorio  := {}\n    Local cMensagem   := \"\"\n\n    // 1. Estrutura Condicional If / ElseIf / Else\n    If nNota >= 9.0\n        cStatus := \"Aprovado com Louvor (Top Performance)\"\n    ElseIf nNota >= 7.0\n        cStatus := \"Aprovado com Sucesso\"\n    ElseIf nNota >= 5.0\n        cStatus := \"Em Recuperacao\"\n    Else\n        cStatus := \"Reprovado\"\n    EndIf\n\n    // 2. Chamada de Funcao Local (Static Function)\n    cFaixa := CalcSenioridade(nNota)\n\n    // 3. Montagem de Array Dinamico com aAdd()\n    aAdd(aRelatorio, \"=== PAINEL DE DESEMPENHO DO DESENVOLVEDOR ===\")\n    aAdd(aRelatorio, \"\")\n    aAdd(aRelatorio, \"Nota da Avaliacao : \" + Transform(nNota, \"@E 99.9\"))\n    aAdd(aRelatorio, \"Resultado Final   : \" + cStatus)\n    aAdd(aRelatorio, \"Classificacao     : \" + cFaixa)\n    aAdd(aRelatorio, \"Total de Registros: \" + cValToChar(Len(aRelatorio) + 1))\n\n    // 4. Converte o array para texto formatado\n    cMensagem := VetorParaTexto(aRelatorio)\n\n    // 5. Exibe a tela de resultado no Protheus\n    ApMsgInfo(cMensagem, \"Nivel 1 - Aula 02: Condicionais e Static Functions\")\n\nReturn Nil\n\n/*/{Protheus.doc} CalcSenioridade\n    Static Function: Visivel apenas dentro deste arquivo .prw.\n    Utiliza Do Case para avaliar faixas de pontuacao.\n    @type  Static Function\n    @param nPontos, Numerico, Nota do aluno\n    @return cNivel, Caractere, Nivel correspondente\n/*/\nStatic Function CalcSenioridade(nPontos)\n    Local cNivel := \"\"\n\n    // Estrutura de Selecao Multipla Do Case\n    Do Case\n        Case nPontos >= 9.0\n            cNivel := \"Nivel Ouro (Senior Specialist)\"\n        Case nPontos >= 7.0\n            cNivel := \"Nivel Prata (Pleno Developer)\"\n        Case nPontos >= 5.0\n            cNivel := \"Nivel Bronze (Junior Developer)\"\n        Otherwise\n            cNivel := \"Nivel Inicial (Trainee)\"\n    EndCase\n\nReturn cNivel\n\n/*/{Protheus.doc} VetorParaTexto\n    Static Function para iterar o array e transformar em string com quebras CRLF.\n/*/\nStatic Function VetorParaTexto(aVetor)\n    Local cTexto := \"\"\n    Local nI     := 0\n\n    For nI := 1 To Len(aVetor)\n        cTexto += aVetor[nI] + CRLF\n    Next nI\n\nReturn cTexto",
    "lineExplanations": {
      "1": {
        "title": "Diretiva #Include — Biblioteca TOTVS",
        "desc": "Importa as constantes e funções da biblioteca padrão TOTVS. Sem ela, o compilador não reconhece CRLF, ApMsgInfo e outras funções nativas.",
        "audioHint": "Include Totvs ponto c-h importa as definições e constantes básicas do ambiente Protheus.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "3": {
        "title": "Documentação ProtheusDoc da Função",
        "desc": "Documenta a User Function com tipo, autor, data e versão no padrão oficial TOTVS. É obrigatório em fontes de produção e gerado automaticamente na TDN.",
        "audioHint": "ProtheusDoc oficial da User Function Aula 02 para controle de versão e governança.",
        "tags": [
          "ProtheusDoc"
        ]
      },
      "10": {
        "title": "Ponto de Entrada (User Function Aula02)",
        "desc": "Declara a função principal executável externamente via U_AULA02 pelo Protheus. O prefixo U_ é adicionado automaticamente pelo runtime ao chamar uma User Function.",
        "audioHint": "User Function Aula 02 é o ponto de entrada principal, acionada com U underline Aula 02.",
        "tags": [
          "User Function",
          "Escopo Global"
        ]
      },
      "11": {
        "title": "Comentário: Declaração de Variáveis",
        "desc": "Indica a seção de declaração das variáveis no início da rotina para cumprir o padrão SonarQube.",
        "audioHint": "Comentário indicando a seção de variáveis locais declaradas no topo.",
        "tags": [
          "Comentário"
        ]
      },
      "12": {
        "title": "Variável Numérica (Local nNota := 8.5)",
        "desc": "Cria a variável numérica local inicializada com 8.5. Este valor será avaliado pelas estruturas de decisão If/ElseIf para determinar o status.",
        "audioHint": "Variável local nNota com prefixo n recebendo a nota decimal de avaliação.",
        "tags": [
          "Local",
          "Tipo Numeric (N)"
        ]
      },
      "13": {
        "title": "Variável Character (Local cStatus := \"\")",
        "desc": "Receberá o texto descritivo do resultado da avaliação de nota. Inicializada como string vazia para evitar erro de tipo na concatenação.",
        "audioHint": "Variável local cStatus inicializada vazia para armazenar o resultado da aprovação.",
        "tags": [
          "Local",
          "Tipo Character (C)"
        ]
      },
      "14": {
        "title": "Variável Character (Local cFaixa := \"\")",
        "desc": "Receberá o resultado da Static Function CalcSenioridade, que classifica a nota em faixas de nível usando Do Case.",
        "audioHint": "Variável local cFaixa que receberá o nível calculado pela função estática.",
        "tags": [
          "Local",
          "Modularização"
        ]
      },
      "15": {
        "title": "Array Dinâmico (Local aRelatorio := {})",
        "desc": "Cria um vetor dinâmico vazio pronto para receber novos registros durante a execução através da função aAdd.",
        "audioHint": "Vetor local aRelatorio inicializado vazio com chaves para montagem dinâmica.",
        "tags": [
          "Array Dinâmico",
          "Memória"
        ]
      },
      "16": {
        "title": "Variável Character (Local cMensagem := \"\")",
        "desc": "String acumuladora que receberá a conversão do vetor em texto formatado para ser exibido na tela.",
        "audioHint": "Variável local cMensagem inicializada como texto vazio.",
        "tags": [
          "Local",
          "String"
        ]
      },
      "18": {
        "title": "Comentário: Estrutura Condicional If",
        "desc": "Demarca o início do bloco condicional encadeado para classificação por desempenho.",
        "audioHint": "Comentário indicando o início das regras condicionais com If e ElseIf.",
        "tags": [
          "Comentário",
          "Controle de Fluxo"
        ]
      },
      "19": {
        "title": "Condicional If: nNota >= 9.0",
        "desc": "Avalia se a nota do colaborador é maior ou igual a 9.0 para atribuir a faixa de excelência.",
        "audioHint": "Instrução If avalia se a nota é maior ou igual a nove ponto zero.",
        "tags": [
          "Controle de Fluxo",
          "If"
        ]
      },
      "20": {
        "title": "Atribuição: Aprovado com Louvor",
        "desc": "Instrução executada se a nota for maior ou igual a 9.0, definindo o status como Top Performance.",
        "audioHint": "Atribui a cStatus a mensagem de aprovado com louvor e alta performance.",
        "tags": [
          "Atribuição",
          "String"
        ]
      },
      "21": {
        "title": "Condicional Alternativa: ElseIf nNota >= 7.0",
        "desc": "Avaliada se a nota for menor que 9.0. Testa se a nota atinge o limite mínimo de aprovação de 7.0.",
        "audioHint": "ElseIf testa a faixa seguinte avaliando se a nota é pelo menos sete ponto zero.",
        "tags": [
          "ElseIf",
          "Controle de Fluxo"
        ]
      },
      "22": {
        "title": "Atribuição: Aprovado com Sucesso",
        "desc": "Instrução executada na faixa de nota entre 7.0 e 8.9, atribuindo aprovação com sucesso.",
        "audioHint": "Atribui a cStatus o texto aprovado com sucesso.",
        "tags": [
          "Atribuição"
        ]
      },
      "23": {
        "title": "Condicional Alternativa: ElseIf nNota >= 5.0",
        "desc": "Avaliada quando a nota for menor que 7.0. Testa se o colaborador atinge a faixa de recuperação de 5.0.",
        "audioHint": "ElseIf testa se a nota atinge pelo menos cinco ponto zero para recuperação.",
        "tags": [
          "ElseIf"
        ]
      },
      "24": {
        "title": "Atribuição: Em Recuperacao",
        "desc": "Atribui o status de recuperação quando a nota estiver entre 5.0 e 6.9.",
        "audioHint": "Atribui a cStatus o texto indicando situação em recuperação.",
        "tags": [
          "Atribuição"
        ]
      },
      "25": {
        "title": "Condicional Padrão: Else",
        "desc": "Cláusula padrão acionada quando nenhuma das condições anteriores for satisfeita (nota menor que 5.0).",
        "audioHint": "Else captura qualquer nota inferior a cinco ponto zero.",
        "tags": [
          "Else"
        ]
      },
      "26": {
        "title": "Atribuição: Reprovado",
        "desc": "Atribui o status de reprovação para pontuações abaixo de 5.0.",
        "audioHint": "Atribui a cStatus o resultado reprovado.",
        "tags": [
          "Atribuição"
        ]
      },
      "27": {
        "title": "Fechamento Condicional: EndIf",
        "desc": "Finaliza a estrutura condicional If / ElseIf / Else.",
        "audioHint": "EndIf encerra o bloco de decisões condicionais.",
        "tags": [
          "EndIf"
        ]
      },
      "29": {
        "title": "Comentário: Chamada de Função Local",
        "desc": "Indica a execução modularizada delegada a uma Static Function dentro do mesmo arquivo.",
        "audioHint": "Comentário sobre a chamada da função estática local.",
        "tags": [
          "Comentário"
        ]
      },
      "30": {
        "title": "Invocação: CalcSenioridade(nNota)",
        "desc": "Chama a função estática local passando a nota e recebe o texto de nível retornado por ela.",
        "audioHint": "Invoca a Static Function CalcSenioridade passando a nota e armazenando em cFaixa.",
        "tags": [
          "Chamada de Função",
          "Modularização"
        ]
      },
      "32": {
        "title": "Comentário: Montagem do Array com aAdd()",
        "desc": "Demarca o início do preenchimento progressivo do relatório utilizando aAdd.",
        "audioHint": "Comentário indicando a montagem do array dinâmico com aAdd.",
        "tags": [
          "Comentário"
        ]
      },
      "33": {
        "title": "Inserção do Cabeçalho (aAdd)",
        "desc": "Insere o título do painel de desempenho como primeiro elemento do vetor aRelatorio.",
        "audioHint": "aAdd insere a linha de cabeçalho do painel no vetor.",
        "tags": [
          "aAdd",
          "Array"
        ]
      },
      "34": {
        "title": "Inserção de Linha Vazia (aAdd)",
        "desc": "Insere um elemento vazio no vetor para criar espaçamento visual no relatório final.",
        "audioHint": "aAdd insere uma linha em branco para espaçamento no relatório.",
        "tags": [
          "aAdd",
          "Espaçamento"
        ]
      },
      "35": {
        "title": "Inserção da Nota Formatada (aAdd)",
        "desc": "Insere a linha contendo o rótulo e a nota formatada no padrão brasileiro com Transform arroba E 99.9.",
        "audioHint": "aAdd insere a nota avaliada formatada com Transform.",
        "tags": [
          "aAdd",
          "Transform"
        ]
      },
      "36": {
        "title": "Inserção do Resultado Final (aAdd)",
        "desc": "Insere no array a linha com o texto descritivo do status determinado pelo If/Else.",
        "audioHint": "aAdd insere a linha com o resultado final do colaborador.",
        "tags": [
          "aAdd"
        ]
      },
      "37": {
        "title": "Inserção da Classificação (aAdd)",
        "desc": "Insere no array a linha contendo o nível de senioridade retornado pela Static Function.",
        "audioHint": "aAdd insere a classificação de senioridade no vetor.",
        "tags": [
          "aAdd"
        ]
      },
      "38": {
        "title": "Totalizador de Registros com Len() (aAdd)",
        "desc": "Insere a última linha informando a quantidade total de registros calculada dinamicamente com Len().",
        "audioHint": "aAdd insere a contagem total de linhas do relatório usando Len.",
        "tags": [
          "aAdd",
          "Len"
        ]
      },
      "40": {
        "title": "Comentário: Conversão do Vetor",
        "desc": "Indica a chamada da função utilitária para transformar os elementos do vetor em texto.",
        "audioHint": "Comentário indicando a transformação do vetor em string.",
        "tags": [
          "Comentário"
        ]
      },
      "41": {
        "title": "Invocação: VetorParaTexto(aRelatorio)",
        "desc": "Chama a Static Function VetorParaTexto que concatena todos os itens do array com quebras CRLF.",
        "audioHint": "Chama VetorParaTexto convertendo o array em texto para cMensagem.",
        "tags": [
          "Chamada de Função"
        ]
      },
      "43": {
        "title": "Comentário: Exibição do Resultado",
        "desc": "Demarca a chamada da interface gráfica para apresentação do painel gerado.",
        "audioHint": "Comentário indicando a exibição da mensagem em tela.",
        "tags": [
          "Comentário"
        ]
      },
      "44": {
        "title": "Exibição do Painel (ApMsgInfo)",
        "desc": "Desenha a janela modal do Protheus WebApp com a mensagem formatada e o título da aula.",
        "audioHint": "ApMsgInfo desenha a caixa modal com o painel completo de desempenho.",
        "tags": [
          "ApMsgInfo",
          "Interface"
        ]
      },
      "46": {
        "title": "Encerramento da Função (Return Nil)",
        "desc": "Finaliza a User Function retornando Nulo e liberando as variáveis locais da memória do AppServer.",
        "audioHint": "Return Nil finaliza a execução da User Function principal.",
        "tags": [
          "Return",
          "Nil"
        ]
      },
      "48": {
        "title": "ProtheusDoc da Função CalcSenioridade",
        "desc": "Documentação no padrão TOTVS para a Static Function CalcSenioridade, especificando tipo, parâmetros e retorno.",
        "audioHint": "Bloco ProtheusDoc da função estática CalcSenioridade.",
        "tags": [
          "ProtheusDoc",
          "Static Function"
        ]
      },
      "55": {
        "title": "Declaração de Static Function CalcSenioridade",
        "desc": "Função estática com escopo restrito a este arquivo .prw, recebendo nPontos como parâmetro.",
        "audioHint": "Static Function CalcSenioridade recebe o parâmetro numérico nPontos.",
        "tags": [
          "Static Function",
          "Encapsulamento"
        ]
      },
      "56": {
        "title": "Variável de Retorno (Local cNivel := \"\")",
        "desc": "Variável local declarada no topo da função estática para armazenar a descrição do nível.",
        "audioHint": "Variável local cNivel declarada no topo para conter o resultado.",
        "tags": [
          "Local"
        ]
      },
      "58": {
        "title": "Comentário: Estrutura Do Case",
        "desc": "Demarcação do bloco de seleção múltipla por faixas de pontuação.",
        "audioHint": "Comentário sobre a seleção múltipla com Do Case.",
        "tags": [
          "Comentário"
        ]
      },
      "59": {
        "title": "Seleção Múltipla (Do Case)",
        "desc": "Abre a estrutura de chaveamento múltiplo Do Case para testar faixas consecutivas de pontuação.",
        "audioHint": "Do Case inicia a avaliação de múltiplos casos de teste.",
        "tags": [
          "Do Case"
        ]
      },
      "60": {
        "title": "Caso 1: Case nPontos >= 9.0",
        "desc": "Testa se os pontos atingem o patamar sênior de 9.0.",
        "audioHint": "Case avalia se os pontos são maiores ou iguais a nove ponto zero.",
        "tags": [
          "Case"
        ]
      },
      "61": {
        "title": "Atribuição: Nível Ouro (Senior Specialist)",
        "desc": "Define o nível como Sênior Especialista quando a nota atingir 9.0.",
        "audioHint": "Atribui o nível ouro de especialista sênior.",
        "tags": [
          "Atribuição"
        ]
      },
      "62": {
        "title": "Caso 2: Case nPontos >= 7.0",
        "desc": "Testa a faixa pleno a partir de 7.0 pontos.",
        "audioHint": "Case avalia se os pontos atingem pelo menos sete ponto zero.",
        "tags": [
          "Case"
        ]
      },
      "63": {
        "title": "Atribuição: Nível Prata (Pleno Developer)",
        "desc": "Define o nível como Pleno Desenvolvedor para notas entre 7.0 e 8.9.",
        "audioHint": "Atribui o nível prata de desenvolvedor pleno.",
        "tags": [
          "Atribuição"
        ]
      },
      "64": {
        "title": "Caso 3: Case nPontos >= 5.0",
        "desc": "Testa a faixa júnior a partir de 5.0 pontos.",
        "audioHint": "Case avalia se os pontos atingem pelo menos cinco ponto zero.",
        "tags": [
          "Case"
        ]
      },
      "65": {
        "title": "Atribuição: Nível Bronze (Junior Developer)",
        "desc": "Define o nível como Júnior Desenvolvedor para notas entre 5.0 e 6.9.",
        "audioHint": "Atribui o nível bronze de desenvolvedor júnior.",
        "tags": [
          "Atribuição"
        ]
      },
      "66": {
        "title": "Caso Alternativo: Otherwise",
        "desc": "Executado caso nenhuma das condições Case anteriores seja verdadeira (pontuação abaixo de 5.0).",
        "audioHint": "Otherwise captura qualquer pontuação abaixo de cinco ponto zero.",
        "tags": [
          "Otherwise"
        ]
      },
      "67": {
        "title": "Atribuição: Nível Inicial (Trainee)",
        "desc": "Define a classificação como Trainee para pontuações iniciais.",
        "audioHint": "Atribui o nível inicial de trainee.",
        "tags": [
          "Atribuição"
        ]
      },
      "68": {
        "title": "Fechamento da Seleção: EndCase",
        "desc": "Encerra o bloco de seleção múltipla Do Case.",
        "audioHint": "EndCase finaliza a estrutura de seleção múltipla.",
        "tags": [
          "EndCase"
        ]
      },
      "70": {
        "title": "Retorno do Nível (Return cNivel)",
        "desc": "Retorna o texto de nível calculado para a função chamadora.",
        "audioHint": "Return cNivel devolve a classificação calculada.",
        "tags": [
          "Return"
        ]
      },
      "72": {
        "title": "ProtheusDoc da Função VetorParaTexto",
        "desc": "Documentação oficial da Static Function utilitária de iteração e concatenação de vetores.",
        "audioHint": "Bloco ProtheusDoc da função estática VetorParaTexto.",
        "tags": [
          "ProtheusDoc"
        ]
      },
      "75": {
        "title": "Declaração de Static Function VetorParaTexto",
        "desc": "Função utilitária que recebe o array aVetor como argumento para transformá-lo em string.",
        "audioHint": "Static Function VetorParaTexto recebe o vetor como parâmetro.",
        "tags": [
          "Static Function"
        ]
      },
      "76": {
        "title": "Variável de Texto Acumulada (Local cTexto := \"\")",
        "desc": "Variável de retorno que receberá a concatenação de todas as linhas do array.",
        "audioHint": "Variável local cTexto inicializada como string vazia.",
        "tags": [
          "Local"
        ]
      },
      "77": {
        "title": "Contador de Loop Local (Local nI := 0)",
        "desc": "Índice numérico declarado no topo para controle do laço de iteração sobre o array.",
        "audioHint": "Contador nI numérico inicializado com zero no topo.",
        "tags": [
          "Local",
          "Contador"
        ]
      },
      "79": {
        "title": "Laço For: 1 To Len(aVetor)",
        "desc": "Itera por cada elemento do array passado por parâmetro do primeiro até o último.",
        "audioHint": "Laço For percorrendo o vetor do índice um até o total retornado por Len.",
        "tags": [
          "For",
          "Len"
        ]
      },
      "80": {
        "title": "Concatenação de Linha com CRLF",
        "desc": "Adiciona o elemento atual aVetor[nI] com uma quebra de linha CRLF na variável acumuladora cTexto.",
        "audioHint": "Concatena o elemento do array correspondente a nI com quebra CRLF.",
        "tags": [
          "Concatenação",
          "CRLF"
        ]
      },
      "81": {
        "title": "Incremento de Iteração (Next nI)",
        "desc": "Incrementa o índice e avança para a próxima posição do array.",
        "audioHint": "Next nI incrementa o índice do laço.",
        "tags": [
          "Next"
        ]
      },
      "83": {
        "title": "Retorno do Texto Formatado (Return cTexto)",
        "desc": "Retorna a string completa formatada para a função chamadora.",
        "audioHint": "Return cTexto devolve a string acumulada com todas as linhas do relatório.",
        "tags": [
          "Return"
        ]
      }
    }
  },
  {
    "id": "aula02b",
    "module": "Nível 1: Fundamentos",
    "title": "Aula 02B: Estruturas de Repetição (Loops)",
    "badge": "02B_Loops.prw",
    "description": "Domine os laços de repetição do ADVPL: While/EndDo, For/Next com Exit (break) e Loop (continue), e Do While pós-condicional.",
    "challenge": {
      "title": "Cálculo de Fatorial com Laço While",
      "icon": "🔄",
      "badgeName": "Domador de Loops",
      "xp": 75,
      "difficulty": "Praticante",
      "difficultyColor": "#eab308",
      "description": "Crie uma Static Function Fatorial(nNum) utilizando um laço While para calcular o fatorial de um número. Adicione uma trava de segurança que bloqueie números superiores a 12.",
      "objectives": [
        "Criar a Static Function Fatorial(nNum) com variáveis tipadas",
        "Implementar o loop While nNum > 1 multiplicando os fatores acumulados",
        "Adicionar decremento nNum-- para garantir a saída do loop",
        "Testar o cálculo para 5! (120) e validar a trava de números > 12"
      ],
      "hint": "Loops While exigem atenção rigorosa à condição de parada para evitar loops infinitos no AppServer! Lembre-se de decrementar a variável de controle antes do EndDo.",
      "solution": "Static Function Fatorial(nNum)\n    Local nResultado := 1\n    If nNum > 12\n        ApMsgStop(\"Numero muito alto para calculo de fatorial!\", \"Alerta\")\n        Return 0\n    EndIf\n    While nNum > 1\n        nResultado *= nNum\n        nNum--\n    EndDo\nReturn nResultado"
    },
    "code": "#Include \"Totvs.ch\"\n\n/*/{Protheus.doc} User Function Aula02B\n    Aula 2B - Estruturas de Repeticao (Loops) no ADVPL.\n    Dominio completo dos lacos de repeticao: While/EndDo,\n    For/Next com Exit e Loop (equivalentes a break e continue),\n    e diferenca pratica entre While pre-condicional e Do While.\n    @type     Function\n    @author   Antigravity / Pair Programming\n    @since    05/09/2026\n    @version  1.0\n/*/\nUser Function Aula02B()\n    Local cRelatorio  := \"\"\n    Local nContador   := 0\n    Local nFatorial   := 1\n    Local nNum        := 7\n    Local nSoma       := 0\n    Local nI          := 0\n\n    cRelatorio := \"=== AULA 02B: ESTRUTURAS DE REPETICAO (LOOPS) ===\" + CRLF + CRLF\n\n    // 1. While / EndDo — Laco Pre-Condicional\n    cRelatorio += \"--- 1. WHILE / ENDDO (Pre-Condicional) ---\" + CRLF\n    nContador  := 1\n    While nContador <= 5\n        cRelatorio += \"  Iteracao While: \" + cValToChar(nContador) + CRLF\n        nContador++\n    EndDo\n    cRelatorio += CRLF\n\n    // 2. For / Next com EXIT (equivalente ao break)\n    cRelatorio += \"--- 2. FOR / NEXT COM EXIT (Break) ---\" + CRLF\n    For nI := 1 To 10\n        If nI > 5 .And. (nI % 3 == 0)\n            cRelatorio += \"  Exit em nI = \" + cValToChar(nI) + \" (multiplo de 3 > 5)\" + CRLF\n            Exit\n        EndIf\n        cRelatorio += \"  Processando nI = \" + cValToChar(nI) + CRLF\n    Next nI\n    cRelatorio += CRLF\n\n    // 3. For / Next com LOOP (equivalente ao continue)\n    cRelatorio += \"--- 3. FOR / NEXT COM LOOP (Continue) ---\" + CRLF\n    cRelatorio += \"  Numeros IMPARES de 1 a 10: \"\n    For nI := 1 To 10\n        If nI % 2 == 0\n            Loop\n        EndIf\n        cRelatorio += cValToChar(nI) + \" \"\n    Next nI\n    cRelatorio += CRLF + CRLF\n\n    // 4. Calculo de Fatorial com While (acumulador)\n    cRelatorio += \"--- 4. FATORIAL COM WHILE (Acumulador) ---\" + CRLF\n    nFatorial  := 1\n    nContador  := nNum\n    While nContador > 0\n        nFatorial *= nContador\n        nContador--\n    EndDo\n    cRelatorio += \"  \" + cValToChar(nNum) + \"! = \" + cValToChar(nFatorial) + CRLF + CRLF\n\n    // 5. Do While / EndDo — Laco Pos-Condicional\n    cRelatorio += \"--- 5. DO WHILE (Pos-Condicional) ---\" + CRLF\n    nSoma     := 0\n    nContador := 1\n    Do While nContador <= 5\n        nSoma += nContador\n        cRelatorio += \"  Soma acumulada: \" + cValToChar(nSoma) + CRLF\n        nContador++\n    EndDo\n\n    ApMsgInfo(cRelatorio, \"Nivel 1 - Aula 02B: Estruturas de Repeticao\")\n\nReturn Nil",
    "lineExplanations": {
      "1": {
        "title": "Diretiva #Include — Biblioteca TOTVS",
        "desc": "Importa as constantes e funções da biblioteca padrão TOTVS. Sem ela, CRLF, cValToChar e ApMsgInfo não são reconhecidos pelo compilador ADVPL.",
        "audioHint": "Include Totvs ponto c-h importa as definições e constantes do Protheus.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "3": {
        "title": "ProtheusDoc — Documentação da Aula 02B",
        "desc": "Bloco de documentação oficial que descreve o objetivo da função e o domínio dos laços de repetição. O campo since indica a data de criação.",
        "audioHint": "ProtheusDoc oficial da função Aula 02 B.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "13": {
        "title": "Ponto de Entrada (User Function Aula02B)",
        "desc": "Declaração da porta de entrada principal da rotina executável com prefixo U_AULA02B.",
        "audioHint": "User Function Aula 02 B é a porta de entrada da rotina de loops.",
        "tags": [
          "User Function"
        ]
      },
      "14": {
        "title": "Acumulador de Texto (Local cRelatorio := \"\")",
        "desc": "String vazia declarada no topo da função que acumula todo o conteúdo do relatório.",
        "audioHint": "Variável local cRelatorio inicializada vazia para acumular as saídas.",
        "tags": [
          "Local",
          "Acumulador"
        ]
      },
      "15": {
        "title": "Contador de Iteração (Local nContador := 0)",
        "desc": "Variável numérica usada como contador nos laços While. Inicializada no topo seguindo a regra Blocker do CodeAnalysis.",
        "audioHint": "Variável local nContador inicializada com zero para os laços.",
        "tags": [
          "Local",
          "Contador"
        ]
      },
      "16": {
        "title": "Acumulador Fatorial (Local nFatorial := 1)",
        "desc": "Variável numérica que acumula o produto do fatorial, inicializada em 1.",
        "audioHint": "Variável local nFatorial iniciada em um para cálculo multiplicativo.",
        "tags": [
          "Local",
          "Fatorial"
        ]
      },
      "17": {
        "title": "Número Base do Fatorial (Local nNum := 7)",
        "desc": "Define o número inteiro cujo fatorial será calculado.",
        "audioHint": "Variável local nNum definida com o número sete para o cálculo.",
        "tags": [
          "Local",
          "Numeric"
        ]
      },
      "18": {
        "title": "Acumulador de Soma (Local nSoma := 0)",
        "desc": "Variável que acumulará a soma progressiva das iterações.",
        "audioHint": "Variável local nSoma inicializada com zero.",
        "tags": [
          "Local",
          "Soma"
        ]
      },
      "19": {
        "title": "Índice de Loop For/Next (Local nI := 0)",
        "desc": "Variável numérica de controle dos laços For/Next, declarada no topo.",
        "audioHint": "Variável local nI para controle dos laços For.",
        "tags": [
          "Local",
          "Índice"
        ]
      },
      "21": {
        "title": "Cabeçalho do Relatório com CRLF duplo",
        "desc": "Inicia a variável cRelatorio com o título principal e duas quebras de linha CRLF.",
        "audioHint": "Atribui o título do relatório em cRelatorio com quebras de linha.",
        "tags": [
          "CRLF",
          "Cabeçalho"
        ]
      },
      "23": {
        "title": "Comentário: Seção While Pré-Condicional",
        "desc": "Demarca a primeira seção de demonstração com laço While / EndDo.",
        "audioHint": "Comentário sobre a estrutura de repetição pré-condicional While.",
        "tags": [
          "Comentário"
        ]
      },
      "24": {
        "title": "Subtítulo da Seção 1 no Relatório",
        "desc": "Concatena o cabeçalho da seção While pré-condicional no relatório.",
        "audioHint": "Adiciona o subtítulo da primeira seção ao relatório.",
        "tags": [
          "Relatório"
        ]
      },
      "25": {
        "title": "Inicialização do Contador (nContador := 1)",
        "desc": "Define o valor inicial do contador antes de entrar no loop While.",
        "audioHint": "Inicializa nContador com o valor um.",
        "tags": [
          "Atribuição"
        ]
      },
      "26": {
        "title": "Laço Pré-Condicional (While nContador <= 5)",
        "desc": "Testa a condição antes de executar o bloco. Executa enquanto o contador for menor ou igual a 5.",
        "audioHint": "Laço While avaliando se nContador é menor ou igual a cinco.",
        "tags": [
          "While",
          "Loop"
        ]
      },
      "27": {
        "title": "Concatenação da Iteração Atual",
        "desc": "Adiciona o número da iteração atual convertido para texto com cValToChar.",
        "audioHint": "Concatena a iteração corrente convertida em texto no relatório.",
        "tags": [
          "cValToChar"
        ]
      },
      "28": {
        "title": "Incremento Unitário (nContador++)",
        "desc": "Incrementa o contador em 1 a cada iteração para evitar loop infinito no AppServer.",
        "audioHint": "nContador mais mais incrementa o contador.",
        "tags": [
          "Incremento"
        ]
      },
      "29": {
        "title": "Fechamento do Laço (EndDo)",
        "desc": "Finaliza o bloco do laço While e retorna a execução para a condição no topo.",
        "audioHint": "EndDo encerra o bloco do While e retorna para o teste da condição.",
        "tags": [
          "EndDo"
        ]
      },
      "30": {
        "title": "Espaçamento Visual (CRLF)",
        "desc": "Adiciona uma quebra de linha para separar a seção 1 da próxima demonstração.",
        "audioHint": "Insere uma quebra de linha de separação.",
        "tags": [
          "CRLF"
        ]
      },
      "32": {
        "title": "Comentário: Seção For / Next com Exit",
        "desc": "Demarca a demonstração de interrupção abrupta de loop com a instrução Exit.",
        "audioHint": "Comentário sobre o uso do comando Exit dentro do For Next.",
        "tags": [
          "Comentário"
        ]
      },
      "33": {
        "title": "Subtítulo da Seção 2 no Relatório",
        "desc": "Concatena o cabeçalho da seção de For com Exit no relatório.",
        "audioHint": "Adiciona o cabeçalho da seção dois de For com Exit.",
        "tags": [
          "Relatório"
        ]
      },
      "34": {
        "title": "Laço For: nI := 1 To 10",
        "desc": "Inicia o laço For com contador nI variando de 1 até 10.",
        "audioHint": "Laço For iterando de um até dez.",
        "tags": [
          "For"
        ]
      },
      "35": {
        "title": "Condição de Saída Antecipada (If com .And.)",
        "desc": "Testa se nI é maior que 5 e simultaneamente múltiplo de 3 usando o operador módulo percentual.",
        "audioHint": "Condicional If avalia se nI é maior que cinco e múltiplo de três.",
        "tags": [
          "If",
          ".And."
        ]
      },
      "36": {
        "title": "Mensagem de Interrupção por Exit",
        "desc": "Registra no relatório a mensagem indicando a saída antecipada do loop.",
        "audioHint": "Registra a saída antecipada pelo comando Exit.",
        "tags": [
          "Relatório"
        ]
      },
      "37": {
        "title": "Comando de Saída Antecipada (Exit)",
        "desc": "Interrompe imediatamente o loop For e salta a execução para a linha após o Next.",
        "audioHint": "Comando Exit encerra imediatamente o laço de repetição.",
        "tags": [
          "Exit",
          "Break"
        ]
      },
      "38": {
        "title": "Fechamento Condicional (EndIf)",
        "desc": "Encerra o bloco If da verificação de saída antecipada.",
        "audioHint": "EndIf fecha o bloco condicional de verificação.",
        "tags": [
          "EndIf"
        ]
      },
      "39": {
        "title": "Concatenação de Processamento Normal",
        "desc": "Adiciona a linha de processamento de nI quando a condição de saída não foi acionada.",
        "audioHint": "Concatena a linha de processamento normal de nI.",
        "tags": [
          "Relatório"
        ]
      },
      "40": {
        "title": "Incremento e Fim do Laço (Next nI)",
        "desc": "Incrementa o índice nI e avança para a próxima iteração do laço For.",
        "audioHint": "Next nI incrementa o índice e fecha o laço For.",
        "tags": [
          "Next"
        ]
      },
      "41": {
        "title": "Espaçamento Visual (CRLF)",
        "desc": "Adiciona uma quebra de linha de separação.",
        "audioHint": "Insere uma quebra de linha.",
        "tags": [
          "CRLF"
        ]
      },
      "43": {
        "title": "Comentário: Seção For / Next com Loop",
        "desc": "Demarca a demonstração da instrução Loop para pular iterações específicas.",
        "audioHint": "Comentário sobre a instrução Loop para salto de iteração.",
        "tags": [
          "Comentário"
        ]
      },
      "44": {
        "title": "Subtítulo da Seção 3 no Relatório",
        "desc": "Concatena o subtítulo da seção de números ímpares no relatório.",
        "audioHint": "Adiciona o cabeçalho da seção de pulo de iteração.",
        "tags": [
          "Relatório"
        ]
      },
      "45": {
        "title": "Texto Inicial de Números Ímpares",
        "desc": "Inicia a linha que exibirá os números ímpares filtrados.",
        "audioHint": "Inicia o texto de números ímpares.",
        "tags": [
          "Relatório"
        ]
      },
      "46": {
        "title": "Laço For: nI := 1 To 10",
        "desc": "Itera o contador nI de 1 até 10 para demonstrar o filtro com comando Loop.",
        "audioHint": "Laço For de um até dez.",
        "tags": [
          "For"
        ]
      },
      "47": {
        "title": "Teste de Número Par (nI % 2 == 0)",
        "desc": "Avalia se o resto da divisão por 2 é zero para identificar números pares.",
        "audioHint": "Testa se o número atual é par usando operador módulo.",
        "tags": [
          "If",
          "Módulo"
        ]
      },
      "48": {
        "title": "Comando de Salto de Iteração (Loop)",
        "desc": "Salta imediatamente para a próxima iteração do For sem executar o restante do bloco.",
        "audioHint": "Comando Loop pula o restante da iteração atual e avança para o Next.",
        "tags": [
          "Loop",
          "Continue"
        ]
      },
      "49": {
        "title": "Fechamento Condicional (EndIf)",
        "desc": "Encerra o bloco If da verificação de números pares.",
        "audioHint": "EndIf fecha o bloco condicional.",
        "tags": [
          "EndIf"
        ]
      },
      "50": {
        "title": "Concatenação do Número Ímpar",
        "desc": "Adiciona o número ímpar na mesma linha com um espaço separador.",
        "audioHint": "Concatena o número ímpar na linha do relatório.",
        "tags": [
          "cValToChar"
        ]
      },
      "51": {
        "title": "Incremento e Fim do Laço (Next nI)",
        "desc": "Incrementa o índice e finaliza a iteração do loop.",
        "audioHint": "Next nI avança para o próximo número.",
        "tags": [
          "Next"
        ]
      },
      "52": {
        "title": "Quebra Dupla de Linha (CRLF)",
        "desc": "Finaliza a linha de números ímpares com espaçamento duplo.",
        "audioHint": "Insere duas quebras de linha no relatório.",
        "tags": [
          "CRLF"
        ]
      },
      "54": {
        "title": "Comentário: Cálculo de Fatorial com While",
        "desc": "Demarca a implementação do cálculo de fatorial como acumulador multiplicativo.",
        "audioHint": "Comentário sobre o cálculo de fatorial com laço While.",
        "tags": [
          "Comentário"
        ]
      },
      "55": {
        "title": "Subtítulo da Seção 4 no Relatório",
        "desc": "Concatena o título da seção de fatorial no relatório.",
        "audioHint": "Adiciona o cabeçalho da seção de fatorial.",
        "tags": [
          "Relatório"
        ]
      },
      "56": {
        "title": "Inicialização do Fatorial (nFatorial := 1)",
        "desc": "Reinicializa a variável de fatorial para o elemento neutro da multiplicação.",
        "audioHint": "Define nFatorial com o valor um.",
        "tags": [
          "Atribuição"
        ]
      },
      "57": {
        "title": "Carga do Contador (nContador := nNum)",
        "desc": "Atribui ao contador o número base para decremento regressivo.",
        "audioHint": "Atribui nNum a nContador para contagem regressiva.",
        "tags": [
          "Atribuição"
        ]
      },
      "58": {
        "title": "Laço While Regressivo (nContador > 0)",
        "desc": "Executa enquanto o contador for maior que zero para multiplicar todos os fatores.",
        "audioHint": "Laço While executando enquanto o contador for maior que zero.",
        "tags": [
          "While"
        ]
      },
      "59": {
        "title": "Multiplicação Acumulativa (nFatorial *= nContador)",
        "desc": "Multiplica o acumulador atual pelo contador e reatribui o produto.",
        "audioHint": "nFatorial vezes igual a nContador acumula o produto dos fatores.",
        "tags": [
          "Operador *="
        ]
      },
      "60": {
        "title": "Decremento do Contador (nContador--)",
        "desc": "Decrementa o contador em 1 para processar o próximo fator decrescente.",
        "audioHint": "nContador menos menos decrementa o contador.",
        "tags": [
          "Decremento"
        ]
      },
      "61": {
        "title": "Fechamento do Laço (EndDo)",
        "desc": "Finaliza o bloco While do fatorial.",
        "audioHint": "EndDo encerra o bloco While de fatorial.",
        "tags": [
          "EndDo"
        ]
      },
      "62": {
        "title": "Exibição do Resultado do Fatorial",
        "desc": "Concatena o resultado final do fatorial formatado com símbolo de exclamação.",
        "audioHint": "Concatena o valor do fatorial calculado no relatório.",
        "tags": [
          "Relatório"
        ]
      },
      "64": {
        "title": "Comentário: Seção Do While Pós-Condicional",
        "desc": "Demarca a demonstração do laço Do While pós-condicional no ADVPL.",
        "audioHint": "Comentário sobre a estrutura pós-condicional Do While.",
        "tags": [
          "Comentário"
        ]
      },
      "65": {
        "title": "Subtítulo da Seção 5 no Relatório",
        "desc": "Concatena o subtítulo da demonstração de Do While no relatório.",
        "audioHint": "Adiciona o subtítulo da seção de Do While.",
        "tags": [
          "Relatório"
        ]
      },
      "66": {
        "title": "Inicialização do Acumulador de Soma (nSoma := 0)",
        "desc": "Zera a variável nSoma para iniciar a contagem progressiva.",
        "audioHint": "Zera a variável nSoma.",
        "tags": [
          "Atribuição"
        ]
      },
      "67": {
        "title": "Inicialização do Contador (nContador := 1)",
        "desc": "Define o contador com valor inicial 1 para o Do While.",
        "audioHint": "Define nContador com o valor um.",
        "tags": [
          "Atribuição"
        ]
      },
      "68": {
        "title": "Laço Do While: Condição Pós-Execução",
        "desc": "Inicia o laço executando o bloco e avaliando a permanência enquanto nContador <= 5.",
        "audioHint": "Do While iniciando laço com validação pós-condicional.",
        "tags": [
          "Do While"
        ]
      },
      "69": {
        "title": "Soma Acumulada (nSoma += nContador)",
        "desc": "Adiciona o contador atual à variável de soma acumulada.",
        "audioHint": "nSoma mais igual a nContador adiciona o valor atual à soma.",
        "tags": [
          "Operador +="
        ]
      },
      "70": {
        "title": "Concatenação da Soma Parcial",
        "desc": "Registra no relatório o progresso da soma acumulada.",
        "audioHint": "Registra o valor acumulado parcial no relatório.",
        "tags": [
          "Relatório"
        ]
      },
      "71": {
        "title": "Incremento Unitário (nContador++)",
        "desc": "Incrementa o contador da soma em 1.",
        "audioHint": "nContador mais mais incrementa o contador.",
        "tags": [
          "Incremento"
        ]
      },
      "72": {
        "title": "Fechamento do Laço (EndDo)",
        "desc": "Finaliza o bloco Do While após a validação da condição.",
        "audioHint": "EndDo encerra o laço Do While.",
        "tags": [
          "EndDo"
        ]
      },
      "74": {
        "title": "Exibição do Relatório de Loops (ApMsgInfo)",
        "desc": "Desenha a janela modal com todo o relatório das 5 seções de estruturas de repetição.",
        "audioHint": "ApMsgInfo exibe o relatório formatado das cinco seções de loops.",
        "tags": [
          "ApMsgInfo",
          "Interface"
        ]
      },
      "76": {
        "title": "Encerramento da Função (Return Nil)",
        "desc": "Finaliza a User Function liberando todas as variáveis da memória do AppServer.",
        "audioHint": "Return Nil encerra a User Function com sucesso.",
        "tags": [
          "Return",
          "Nil"
        ]
      }
    }
  },
  {
    "id": "aula03",
    "module": "Nível 1: Fundamentos",
    "title": "Aula 03: Matrizes Multidimensionais & Strings",
    "badge": "03_MatrizesEStrings.prw",
    "description": "Aprenda a construir matrizes bidimensionais, formatar textos com Capital, PadR, AllTrim, StrZero e gerar relatórios em memória.",
    "challenge": {
      "title": "Desconto e Totalizador no aHeader/aCols",
      "icon": "📊",
      "badgeName": "Arquiteto de Matrizes",
      "xp": 100,
      "difficulty": "Intermediário",
      "difficultyColor": "#eab308",
      "description": "Adicione uma coluna de desconto de 5% para cada item da matriz multidimensional. Calcule o valor com desconto e exiba ao final o Total Bruto e o Total com Desconto.",
      "objectives": [
        "Adicionar a definição da coluna 'Desconto (%)' no aHeader com aAdd()",
        "Inserir o percentual de desconto no sub-array aCols de cada linha",
        "Calcular o valor líquido: nQtd * nPreco * (1 - nDesc/100)",
        "Exibir o rodapé com comparativo de Total Bruto vs Total Líquido"
      ],
      "hint": "No padrão Protheus (MsNewGetDados/MsGetDados), cada linha de aCols precisa ter exatamente o mesmo número de elementos descritos no aHeader mais a coluna de deleção lógica!",
      "solution": "// Adiciona coluna no aHeader:\naAdd(aHeader, {\"Desconto (%)\", \"DESC\", \"@E 99.99\", 5, 2, \"\", \"\", \"N\", \"\", \"\"})\n// Adiciona desconto em cada item do aCols:\naAdd(aLinha, 5.00) // 5% de desconto fixo"
    },
    "code": "#Include \"Totvs.ch\"\n\n/*/{Protheus.doc} User Function Aula03\n    Aula 3 - Matrizes Multidimensionais, Manipulacao de Strings e Calculos em Loop.\n    @type  Function\n    @author Antigravity / Pair Programming\n    @since 01/09/2026\n    @version 1.0\n/*/\nUser Function Aula03()\n    // Declaracao de Variaveis\n    Local aItens     := {}\n    Local cRelatorio := \"\"\n    Local nTotalGeral:= 0\n    Local nI         := 0\n    Local nSubTotal  := 0\n\n    // 1. Montagem de Matriz Multidimensional (Tabela em Memoria)\n    // Estrutura: { Codigo, Descricao, Quantidade, Valor Unitario }\n    aAdd(aItens, {\"PRD001\", \"teclado mecanico rgb pro\", 2, 250.00})\n    aAdd(aItens, {\"PRD002\", \"mouse sem fio ergonomico \", 3, 120.50})\n    aAdd(aItens, {\"PRD003\", \"monitor ultrawide 29 pol \", 1, 1450.00})\n    aAdd(aItens, {\"PRD004\", \"headset gamer surround   \", 2, 320.00})\n\n    // 2. Cabecalho do Relatorio Formatado\n    cRelatorio := \"=== PEDIDO DE VENDAS - LISTA DE ITENS ===\" + CRLF + CRLF\n    cRelatorio += PadR(\"CODIGO\", 8) + \" | \" \n    cRelatorio += PadR(\"DESCRICAO\", 26) + \" | \" \n    cRelatorio += \"QTD | \" \n    cRelatorio += \"VLR TOTAL\" + CRLF\n    cRelatorio += Replicate(\"-\", 62) + CRLF\n\n    // 3. Processamento e Calculos em Loop (For...Next)\n    For nI := 1 To Len(aItens)\n        // Calcula o subtotal do item (Quantidade * Preco)\n        nSubTotal := aItens[nI][3] * aItens[nI][4]\n        nTotalGeral += nSubTotal\n\n        // Monta a linha com funcoes de formatacao de texto\n        cRelatorio += PadR(aItens[nI][1], 8) + \" | \"\n        cRelatorio += PadR(Capital(AllTrim(aItens[nI][2])), 26) + \" | \"\n        cRelatorio += StrZero(aItens[nI][3], 3) + \" | \"\n        cRelatorio += Transform(nSubTotal, \"@E 999,999.92\") + CRLF\n    Next nI\n\n    // 4. Rodape com o Total Geral Formatado\n    cRelatorio += Replicate(\"-\", 62) + CRLF\n    cRelatorio += \"TOTAL GERAL DO PEDIDO: R$ \" + Transform(nTotalGeral, \"@E 999,999.92\") + CRLF\n    cRelatorio += \"QUANTIDADE DE ITENS  : \" + cValToChar(Len(aItens)) + \" PRODUTOS\"\n\n    // 5. Exibe a tela de resultado no Protheus WebApp\n    ApMsgInfo(cRelatorio, \"Nivel 1 - Aula 03: Matrizes e Manipulacao de Strings\")\n\nReturn Nil",
    "lineExplanations": {
      "1": {
        "title": "Diretiva #Include — Biblioteca TOTVS",
        "desc": "Importa as constantes e funções da biblioteca padrão TOTVS. Sem ela, CRLF, PadR, Replicate e ApMsgInfo não são reconhecidos pelo compilador ADVPL.",
        "audioHint": "Include Totvs ponto c-h importa as definições e constantes do Protheus.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "3": {
        "title": "ProtheusDoc — Documentação da Aula 03",
        "desc": "Bloco de documentação oficial que descreve o objetivo da função: manipulação de matrizes multidimensionais e strings no ADVPL.",
        "audioHint": "ProtheusDoc oficial da User Function Aula 03.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "10": {
        "title": "Ponto de Entrada (User Function Aula03)",
        "desc": "Declara a rotina principal executável via U_AULA03. Toda a lógica de construção da tabela em memória e geração do relatório está encapsulada aqui.",
        "audioHint": "User Function Aula 03 é o ponto de entrada da rotina.",
        "tags": [
          "User Function",
          "Aula03"
        ]
      },
      "11": {
        "title": "Comentário: Declaração de Variáveis",
        "desc": "Demarcação do bloco obrigatório de variáveis locais no topo da função.",
        "audioHint": "Comentário indicando a declaração das variáveis locais no topo.",
        "tags": [
          "Comentário"
        ]
      },
      "12": {
        "title": "Matriz de Itens (Local aItens := {})",
        "desc": "Cria o array bidimensional vazio que representará a tabela de produtos em memória com 4 colunas.",
        "audioHint": "Vetor local aItens inicializado vazio para a matriz multidimensional.",
        "tags": [
          "Local",
          "Matriz Bidimensional",
          "Array (A)"
        ]
      },
      "13": {
        "title": "Acumulador de Texto (Local cRelatorio := \"\")",
        "desc": "String vazia que acumulará o texto completo do relatório formatado.",
        "audioHint": "Variável local cRelatorio inicializada vazia para acumular as linhas formatadas.",
        "tags": [
          "Local",
          "Acumulador"
        ]
      },
      "14": {
        "title": "Totalizador Geral (Local nTotalGeral := 0)",
        "desc": "Variável numérica acumuladora que somará os subtotais de todos os itens do pedido.",
        "audioHint": "Variável local nTotalGeral numérica inicializada com zero.",
        "tags": [
          "Local",
          "Acumulador",
          "Numeric (N)"
        ]
      },
      "15": {
        "title": "Índice de Controle do Loop (Local nI := 0)",
        "desc": "Variável numérica de controle do laço For/Next que percorrerá cada linha da matriz.",
        "audioHint": "Contador nI numérico para controle do laço.",
        "tags": [
          "Local",
          "Índice",
          "For/Next"
        ]
      },
      "16": {
        "title": "Subtotal por Item (Local nSubTotal := 0)",
        "desc": "Variável numérica que receberá o produto da quantidade pelo preço unitário de cada item.",
        "audioHint": "Variável local nSubTotal inicializada com zero.",
        "tags": [
          "Local",
          "Subtotal"
        ]
      },
      "18": {
        "title": "Comentário: Montagem da Matriz em Memória",
        "desc": "Demarca a seção de inserção das linhas de dados na matriz multidimensional.",
        "audioHint": "Comentário indicando a criação da tabela de dados em memória.",
        "tags": [
          "Comentário"
        ]
      },
      "19": {
        "title": "Comentário: Estrutura das Colunas",
        "desc": "Documenta a composição das 4 colunas de cada linha: Código, Descrição, Quantidade e Preço Unitário.",
        "audioHint": "Comentário detalhando a estrutura de colunas do sub-array.",
        "tags": [
          "Comentário"
        ]
      },
      "20": {
        "title": "Inserção Item 1 (aAdd PRD001)",
        "desc": "Insere o sub-array do primeiro produto: teclado mecânico rgb pro, quantidade 2 e preço unitário 250.",
        "audioHint": "aAdd insere o primeiro item PRD001 na matriz.",
        "tags": [
          "aAdd",
          "Matriz"
        ]
      },
      "21": {
        "title": "Inserção Item 2 (aAdd PRD002)",
        "desc": "Insere o segundo produto: mouse sem fio ergonômico, quantidade 3 e preço unitário 120.50.",
        "audioHint": "aAdd insere o segundo item PRD002 na matriz.",
        "tags": [
          "aAdd"
        ]
      },
      "22": {
        "title": "Inserção Item 3 (aAdd PRD003)",
        "desc": "Insere o terceiro produto: monitor ultrawide 29 polegadas, quantidade 1 e preço unitário 1450.",
        "audioHint": "aAdd insere o terceiro item PRD003 na matriz.",
        "tags": [
          "aAdd"
        ]
      },
      "23": {
        "title": "Inserção Item 4 (aAdd PRD004)",
        "desc": "Insere o quarto produto: headset gamer surround, quantidade 2 e preço unitário 320.",
        "audioHint": "aAdd insere o quarto item PRD004 na matriz.",
        "tags": [
          "aAdd"
        ]
      },
      "25": {
        "title": "Comentário: Cabeçalho do Relatório",
        "desc": "Demarca a construção do cabeçalho alinhado e da régua de separação do relatório.",
        "audioHint": "Comentário sobre o cabeçalho formatado do relatório.",
        "tags": [
          "Comentário"
        ]
      },
      "26": {
        "title": "Título Principal com CRLF duplo",
        "desc": "Atribui o título do pedido de vendas ao cRelatorio com duas quebras de linha.",
        "audioHint": "Atribui o título do pedido de vendas com quebras duplas.",
        "tags": [
          "CRLF",
          "Cabeçalho"
        ]
      },
      "27": {
        "title": "Coluna de Código Alinhada com PadR",
        "desc": "Alinha a coluna CODIGO à esquerda em 8 posições completadas com espaços.",
        "audioHint": "PadR alinha o cabeçalho da coluna código em oito posições.",
        "tags": [
          "PadR",
          "Alinhamento"
        ]
      },
      "28": {
        "title": "Coluna de Descrição Alinhada com PadR",
        "desc": "Alinha o rótulo DESCRICAO à esquerda em 26 posições preenchidas com espaços.",
        "audioHint": "PadR alinha a coluna de descrição em vinte e seis posições.",
        "tags": [
          "PadR"
        ]
      },
      "29": {
        "title": "Coluna de Quantidade (QTD)",
        "desc": "Concatena o rótulo da coluna de quantidade de itens.",
        "audioHint": "Concatena o rótulo da coluna de quantidade.",
        "tags": [
          "Concatenação"
        ]
      },
      "30": {
        "title": "Coluna de Valor Total e Quebra de Linha",
        "desc": "Concatena o cabeçalho VLR TOTAL e fecha a linha de títulos com CRLF.",
        "audioHint": "Concatena o título de valor total e quebra a linha.",
        "tags": [
          "CRLF"
        ]
      },
      "31": {
        "title": "Régua Separadora com Replicate",
        "desc": "Repete o caractere traço 62 vezes para criar a régua divisória sob o cabeçalho.",
        "audioHint": "Replicate gera a régua horizontal de sessenta e dois caracteres.",
        "tags": [
          "Replicate"
        ]
      },
      "33": {
        "title": "Comentário: Loop de Processamento",
        "desc": "Demarca o início do cálculo e montagem das linhas do pedido de vendas.",
        "audioHint": "Comentário sobre o laço de processamento e cálculos.",
        "tags": [
          "Comentário"
        ]
      },
      "34": {
        "title": "Laço For: 1 To Len(aItens)",
        "desc": "Percorre cada linha da matriz de produtos do primeiro item até o total retornado por Len.",
        "audioHint": "Laço For iterando por todos os itens da matriz de um até Len.",
        "tags": [
          "For",
          "Len"
        ]
      },
      "35": {
        "title": "Comentário: Cálculo do Subtotal",
        "desc": "Explica a fórmula matemática aplicada para cada item do pedido.",
        "audioHint": "Comentário sobre o cálculo de quantidade multiplicada pelo preço.",
        "tags": [
          "Comentário"
        ]
      },
      "36": {
        "title": "Cálculo do Subtotal do Item",
        "desc": "Multiplica a quantidade (coluna 3) pelo preço unitário (coluna 4) da linha corrente nI.",
        "audioHint": "Calcula o subtotal multiplicando a coluna três pela coluna quatro.",
        "tags": [
          "Cálculo",
          "Subtotal"
        ]
      },
      "37": {
        "title": "Acumulação no Total Geral (+=)",
        "desc": "Adiciona o subtotal calculado ao acumulador global nTotalGeral com o operador mais-igual.",
        "audioHint": "nTotalGeral mais igual a nSubTotal acumula o total da compra.",
        "tags": [
          "Operador +=",
          "Acumulador"
        ]
      },
      "39": {
        "title": "Comentário: Formatação de Strings",
        "desc": "Demarca a concatenação com PadR, Capital, AllTrim, StrZero e Transform.",
        "audioHint": "Comentário sobre a formatação visual e textual dos campos.",
        "tags": [
          "Comentário"
        ]
      },
      "40": {
        "title": "Código Formatado com PadR (Coluna 1)",
        "desc": "Acessa a coluna 1 do item atual e formata com largura exata de 8 posições.",
        "audioHint": "PadR alinha o código do produto em oito posições.",
        "tags": [
          "PadR",
          "Coluna 1"
        ]
      },
      "41": {
        "title": "Nome com Capital e AllTrim (Coluna 2)",
        "desc": "AllTrim remove espaços e Capital converte as iniciais para maiúsculas, alinhado em 26 posições.",
        "audioHint": "AllTrim remove espaços e Capital padroniza as iniciais maiúsculas em vinte e seis posições.",
        "tags": [
          "Capital",
          "AllTrim",
          "PadR"
        ]
      },
      "42": {
        "title": "Quantidade com Zeros à Esquerda (StrZero)",
        "desc": "Formata a quantidade com três dígitos completando com zeros à esquerda com StrZero.",
        "audioHint": "StrZero formata a quantidade com zeros à esquerda em três dígitos.",
        "tags": [
          "StrZero",
          "Coluna 3"
        ]
      },
      "43": {
        "title": "Subtotal Formatado com Transform",
        "desc": "Aplica a máscara arroba E 999,999.92 para formatar o subtotal monetário e salta a linha com CRLF.",
        "audioHint": "Transform formata o subtotal monetário com vírgula decimal e quebra a linha.",
        "tags": [
          "Transform",
          "CRLF"
        ]
      },
      "44": {
        "title": "Fechamento do Laço (Next nI)",
        "desc": "Incrementa o índice nI e avança para o próximo produto da matriz.",
        "audioHint": "Next nI incrementa o índice e finaliza o item atual do loop.",
        "tags": [
          "Next"
        ]
      },
      "46": {
        "title": "Comentário: Rodapé com Total Geral",
        "desc": "Demarca a construção do rodapé com os totalizadores consolidados do pedido.",
        "audioHint": "Comentário indicando a construção do rodapé do relatório.",
        "tags": [
          "Comentário"
        ]
      },
      "47": {
        "title": "Régua Divisória Inferior com Replicate",
        "desc": "Insere uma linha divisória de 62 traços para separar os dados do rodapé de totais.",
        "audioHint": "Replicate cria a linha divisória inferior de sessenta e dois traços.",
        "tags": [
          "Replicate"
        ]
      },
      "48": {
        "title": "Total Geral Formatado com Transform",
        "desc": "Exibe o total geral acumulado formatado como moeda brasileira no padrão R$ 999.999,92.",
        "audioHint": "Concatena o total geral acumulado formatado com Transform.",
        "tags": [
          "Transform",
          "Total Geral"
        ]
      },
      "49": {
        "title": "Total de Itens com Len e cValToChar",
        "desc": "Informa a quantidade total de itens processados obtida dinamicamente com Len(aItens).",
        "audioHint": "Informa a quantidade de itens calculada com Len e convertida com cValToChar.",
        "tags": [
          "Len",
          "cValToChar"
        ]
      },
      "51": {
        "title": "Comentário: Exibição no Protheus WebApp",
        "desc": "Demarca a apresentação final da tela informativa.",
        "audioHint": "Comentário sobre a chamada da janela modal.",
        "tags": [
          "Comentário"
        ]
      },
      "52": {
        "title": "Exibição do Relatório Completo (ApMsgInfo)",
        "desc": "Desenha a janela modal contendo todo o relatório tabulado de pedidos e itens.",
        "audioHint": "ApMsgInfo desenha a janela com o pedido de vendas completo.",
        "tags": [
          "ApMsgInfo",
          "Interface"
        ]
      },
      "54": {
        "title": "Encerramento da Função (Return Nil)",
        "desc": "Encerra a User Function Aula03 liberando a memória alocada pelo AppServer.",
        "audioHint": "Return Nil encerra a User Function com sucesso.",
        "tags": [
          "Return",
          "Nil"
        ]
      }
    }
  },
  {
    "id": "aula04",
    "module": "Nível 1: Fundamentos",
    "title": "Aula 04: Codeblocks, aSort & aScan",
    "badge": "04_Codeblocks.prw",
    "description": "Domine o recurso mais poderoso do ADVPL: blocos de código {|x| ...}, ordenação de matrizes com aSort e busca dinâmica com aScan.",
    "challenge": {
      "title": "Busca Dinâmica por Categoria com Codeblock",
      "icon": "🧩",
      "badgeName": "Ninja dos Codeblocks",
      "xp": 125,
      "difficulty": "Intermediário",
      "difficultyColor": "#eab308",
      "description": "Em vez de buscar o produto fixo com código 'PRD001', use aScan com um Codeblock flexível para encontrar o primeiro produto da categoria 'Periféricos'. Exiba o nome e o preço do item.",
      "objectives": [
        "Criar um Codeblock de busca: bBuscaCat := {|x| x[3] == 'Perifericos'}",
        "Executar nPos := aScan(aProdutos, bBuscaCat)",
        "Verificar se o produto foi encontrado (nPos > 0)",
        "Extrair e exibir o nome e o preço formatado com Transform()"
      ],
      "hint": "Codeblocks permitem passar lógica como parâmetro! aScan percorre o array e passa cada elemento para o codeblock. Quando o codeblock retornar .T., o aScan para e devolve o índice!",
      "solution": "Local bBuscaCat := {|aProd| aProd[3] == \"Perifericos\"}\nLocal nPos := aScan(aProdutos, bBuscaCat)\nIf nPos > 0\n    ApMsgInfo(\"Encontrado: \" + aProdutos[nPos][2] + \" por R$ \" + Transform(aProdutos[nPos][4], \"@E 999,999.92\"), \"Busca\")\nEndIf"
    },
    "code": "#Include \"Totvs.ch\"\n\n/*/{Protheus.doc} User Function Aula04CB\n    Aula 4 - Blocos de Codigo (Codeblocks), Algoritmos de Ordenacao (aSort) e Busca (aScan).\n    Conceitos: Sintaxe {|x| ...}, avaliacao com Eval(), ordenacao dinamica com aSort,\n    pesquisa em matrizes com aScan e exibicao formatada.\n    @type  Function\n    @author Antigravity / Pair Programming\n    @since 02/09/2026\n    @version 1.0\n/*/\nUser Function Aula04CB()\n    // Declaracao de Variaveis\n    Local aProdutos  := {}\n    Local bFiltro    := Nil\n    Local bOrdena    := Nil\n    Local nPosBusca  := 0\n    Local cRelatorio := \"\"\n    Local nI         := 0\n\n    // 1. Matriz Multidimensional de Produtos em Memoria\n    // Estrutura: { Codigo, Descricao, Categoria, Preco }\n    aAdd(aProdutos, {\"PRD003\", \"Monitor Gamer 144Hz\",      \"Informatica\", 1450.00})\n    aAdd(aProdutos, {\"PRD001\", \"Teclado Mecanico RGB Pro\",  \"Perifericos\",  320.00})\n    aAdd(aProdutos, {\"PRD004\", \"Mouse Sem Fio 16000 DPI\",   \"Perifericos\",  190.50})\n    aAdd(aProdutos, {\"PRD002\", \"Cadeira Ergonomica Mesh\",   \"Escritorio\",   890.00})\n    aAdd(aProdutos, {\"PRD005\", \"Hub USB-C 7 em 1 Alum\",     \"Acessorios\",   150.00})\n\n    // 2. Blocos de Codigo (Codeblocks) - Um dos recursos mais poderosos do ADVPL\n    // Bloco de comparacao: ordena a matriz pelo Preco (Coluna 4) em ordem decrescente\n    bOrdena := { |x, y| x[4] > y[4] }\n\n    // Aplica a ordenacao na matriz inteira usando o aSort nativo do Protheus\n    aSort(aProdutos, , , bOrdena)\n\n    // 3. Montagem do Relatorio dos Produtos Ordenados\n    cRelatorio := \"=== AULA 04: BLOCOS DE CODIGO, aSort E aScan ===\" + CRLF + CRLF\n    cRelatorio += \"--- PRODUTOS ORDENADOS POR VALOR (MAIOR P/ MENOR) ---\" + CRLF\n    cRelatorio += PadR(\"CODIGO\", 8) + \" | \" + PadR(\"DESCRICAO\", 24) + \" | \" + PadR(\"CATEGORIA\", 13) + \" | \" + \"PRECO\" + CRLF\n    cRelatorio += Replicate(\"-\", 64) + CRLF\n\n    For nI := 1 To Len(aProdutos)\n        cRelatorio += PadR(aProdutos[nI][1], 8) + \" | \"\n        cRelatorio += PadR(aProdutos[nI][2], 24) + \" | \"\n        cRelatorio += PadR(aProdutos[nI][3], 13) + \" | \"\n        cRelatorio += Transform(aProdutos[nI][4], \"@E 9,999.92\") + CRLF\n    Next nI\n\n    // 4. Busca Rapida com aScan() utilizando Bloco de Codigo como Condicao\n    // Localiza dinamicamente o item com codigo \"PRD001\"\n    bFiltro   := { |x| x[1] == \"PRD001\" }\n    nPosBusca := aScan(aProdutos, bFiltro)\n\n    cRelatorio += Replicate(\"-\", 64) + CRLF + CRLF\n    cRelatorio += \"--- BUSCA EM MEMORIA COM aScan(bBloco) ---\" + CRLF\n\n    If nPosBusca > 0\n        cRelatorio += \"Produto 'PRD001' encontrado na Linha: \" + cValToChar(nPosBusca) + CRLF\n        cRelatorio += \"Descricao : \" + aProdutos[nPosBusca][2] + CRLF\n        cRelatorio += \"Categoria : \" + aProdutos[nPosBusca][3] + CRLF\n        cRelatorio += \"Valor     : R$ \" + Transform(aProdutos[nPosBusca][4], \"@E 9,999.92\") + CRLF\n    Else\n        cRelatorio += \"Produto nao localizado na matriz.\" + CRLF\n    EndIf\n\n    // 5. Exibe a janela de resultado no Protheus WebApp\n    ApMsgInfo(cRelatorio, \"Nivel 1 - Aula 04: Codeblocks e Algoritmos de Matriz\")\n\nReturn Nil",
    "lineExplanations": {
      "1": {
        "title": "Diretiva de Inclusão de Cabeçalho (#Include)",
        "desc": "Importa as constantes e comandos fundamentais da TOTVS, como CRLF e definições visuais. É obrigatório em quase todos os fontes ADVPL.",
        "audioHint": "Include Totvs ponto c-h importa as definições essenciais da linguagem ADVPL.",
        "tags": [
          "Pré-Processador",
          "Boas Práticas"
        ]
      },
      "3": {
        "title": "Documentação ProtheusDoc da Aula 04",
        "desc": "Padrão oficial da TOTVS para documentar funções, autores, versões e parâmetros.",
        "audioHint": "ProtheusDoc oficial documentando a aula de blocos de código.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "12": {
        "title": "Ponto de Entrada (User Function Aula04CB)",
        "desc": "Declara a função de usuário executável diretamente via U_AULA04CB pelo Protheus WebApp ou SmartClient.",
        "audioHint": "User Function Aula 04 CB é a porta de entrada da rotina.",
        "tags": [
          "User Function",
          "Escopo Global"
        ]
      },
      "13": {
        "title": "Comentário: Declaração de Variáveis",
        "desc": "Demarcação do bloco de variáveis locais no topo da rotina em conformidade com o SonarQube.",
        "audioHint": "Comentário indicando a declaração das variáveis no topo.",
        "tags": [
          "Comentário"
        ]
      },
      "14": {
        "title": "Matriz de Produtos (Local aProdutos := {})",
        "desc": "Inicia um array vazio no escopo local com prefixo 'a' para receber os produtos em memória.",
        "audioHint": "Vetor local aProdutos inicializado vazio com chaves.",
        "tags": [
          "Array",
          "Local"
        ]
      },
      "15": {
        "title": "Codeblock de Busca (Local bFiltro := Nil)",
        "desc": "Variável de bloco de código local com prefixo 'b', inicializada com Nil para conter a expressão de busca.",
        "audioHint": "Variável bFiltro para bloco de código iniciada com Nil.",
        "tags": [
          "Codeblock",
          "Local"
        ]
      },
      "16": {
        "title": "Codeblock de Ordenação (Local bOrdena := Nil)",
        "desc": "Variável de bloco de código local com prefixo 'b', inicializada com Nil para a regra de comparação do aSort.",
        "audioHint": "Variável bOrdena para o critério de ordenação iniciada com Nil.",
        "tags": [
          "Codeblock",
          "Local"
        ]
      },
      "17": {
        "title": "Posição de Busca (Local nPosBusca := 0)",
        "desc": "Variável numérica que receberá o índice da linha encontrada por aScan ou zero se não encontrar.",
        "audioHint": "Variável local nPosBusca numérica inicializada com zero.",
        "tags": [
          "Numeric",
          "Local"
        ]
      },
      "18": {
        "title": "Acumulador de Relatório (Local cRelatorio := \"\")",
        "desc": "String local vazia para acumular o texto do relatório formatado com quebras CRLF.",
        "audioHint": "Variável local cRelatorio inicializada vazia para acumular o relatório.",
        "tags": [
          "Character",
          "Local"
        ]
      },
      "19": {
        "title": "Índice de Loop (Local nI := 0)",
        "desc": "Variável numérica de controle do laço For/Next, declarada no topo conforme a regra Blocker.",
        "audioHint": "Contador nI numérico inicializado com zero para controle do laço.",
        "tags": [
          "Contador",
          "Local"
        ]
      },
      "21": {
        "title": "Comentário: Tabela de Produtos em Memória",
        "desc": "Demarca a seção de criação da matriz de produtos multidimensional.",
        "audioHint": "Comentário sobre a montagem da tabela em memória.",
        "tags": [
          "Comentário"
        ]
      },
      "22": {
        "title": "Comentário: Estrutura da Matriz",
        "desc": "Documenta as 4 colunas de cada produto: Código, Descrição, Categoria e Preço.",
        "audioHint": "Comentário descrevendo as colunas da matriz.",
        "tags": [
          "Comentário"
        ]
      },
      "23": {
        "title": "Inserção de Produto: Monitor Gamer (aAdd PRD003)",
        "desc": "Insere o monitor gamer 144Hz da categoria Informática com preço 1450.",
        "audioHint": "aAdd insere o produto PRD003 na matriz.",
        "tags": [
          "aAdd"
        ]
      },
      "24": {
        "title": "Inserção de Produto: Teclado Mecânico (aAdd PRD001)",
        "desc": "Insere o teclado mecânico RGB Pro da categoria Periféricos com preço 320.",
        "audioHint": "aAdd insere o produto PRD001 na matriz.",
        "tags": [
          "aAdd"
        ]
      },
      "25": {
        "title": "Inserção de Produto: Mouse Sem Fio (aAdd PRD004)",
        "desc": "Insere o mouse sem fio 16000 DPI da categoria Periféricos com preço 190.50.",
        "audioHint": "aAdd insere o produto PRD004 na matriz.",
        "tags": [
          "aAdd"
        ]
      },
      "26": {
        "title": "Inserção de Produto: Cadeira Ergonômica (aAdd PRD002)",
        "desc": "Insere a cadeira ergonômica Mesh da categoria Escritório com preço 890.",
        "audioHint": "aAdd insere o produto PRD002 na matriz.",
        "tags": [
          "aAdd"
        ]
      },
      "27": {
        "title": "Inserção de Produto: Hub USB-C (aAdd PRD005)",
        "desc": "Insere o Hub USB-C 7 em 1 Alumínio da categoria Acessórios com preço 150.",
        "audioHint": "aAdd insere o produto PRD005 na matriz.",
        "tags": [
          "aAdd"
        ]
      },
      "29": {
        "title": "Comentário: Blocos de Código no ADVPL",
        "desc": "Explica a importância dos Codeblocks como função anônima avaliada em tempo de execução.",
        "audioHint": "Comentário destacando o poder dos Codeblocks no ADVPL.",
        "tags": [
          "Comentário"
        ]
      },
      "30": {
        "title": "Comentário: Critério de Ordenação",
        "desc": "Explica o critério de comparação de preços para ordenar em ordem decrescente.",
        "audioHint": "Comentário sobre a regra de comparação decrescente.",
        "tags": [
          "Comentário"
        ]
      },
      "31": {
        "title": "Definição do Codeblock de Ordenação (bOrdena)",
        "desc": "Atribui a bOrdena a expressão que compara o preço da coluna 4 entre dois elementos x e y (x[4] > y[4]).",
        "audioHint": "Define o bloco de código bOrdena para ordenar por preço decrescente.",
        "tags": [
          "Codeblock",
          "bOrdena"
        ]
      },
      "33": {
        "title": "Comentário: Execução do aSort",
        "desc": "Indica a execução da ordenação in-place da matriz nativa do Protheus.",
        "audioHint": "Comentário sobre a aplicação do algoritmo aSort.",
        "tags": [
          "Comentário"
        ]
      },
      "34": {
        "title": "Ordenação da Matriz com aSort()",
        "desc": "Reorganiza a matriz inteira de produtos usando o Codeblock bOrdena como critério comparador.",
        "audioHint": "aSort reordena a matriz inteira na memória com base no bloco bOrdena.",
        "tags": [
          "aSort"
        ]
      },
      "36": {
        "title": "Comentário: Montagem do Relatório",
        "desc": "Demarcação do início da formatação visual dos produtos ordenados.",
        "audioHint": "Comentário sobre a montagem do relatório formatado.",
        "tags": [
          "Comentário"
        ]
      },
      "37": {
        "title": "Título do Relatório com CRLF duplo",
        "desc": "Atribui o cabeçalho ao cRelatorio com duas quebras de linha.",
        "audioHint": "Atribui o título principal do relatório com quebras de linha.",
        "tags": [
          "CRLF",
          "Cabeçalho"
        ]
      },
      "38": {
        "title": "Subtítulo de Produtos Ordenados",
        "desc": "Concatena o subtítulo indicando que os produtos estão ordenados do maior para o menor preço.",
        "audioHint": "Concatena o subtítulo da lista ordenada.",
        "tags": [
          "Relatório"
        ]
      },
      "39": {
        "title": "Colunas Alinhadas com PadR",
        "desc": "Monta a linha de títulos de colunas alinhando Código em 8 posições, Descrição em 24 e Categoria em 13.",
        "audioHint": "PadR alinha as colunas de código, descrição, categoria e preço.",
        "tags": [
          "PadR"
        ]
      },
      "40": {
        "title": "Régua Divisória Superior com Replicate",
        "desc": "Insere uma linha divisória de 64 traços separando o cabeçalho dos itens.",
        "audioHint": "Replicate cria a régua separadora de sessenta e quatro traços.",
        "tags": [
          "Replicate"
        ]
      },
      "42": {
        "title": "Laço For: 1 To Len(aProdutos)",
        "desc": "Percorre a matriz de produtos já ordenada pelo aSort do índice 1 até o total retornado por Len.",
        "audioHint": "Laço For percorrendo todos os produtos da matriz ordenada.",
        "tags": [
          "For",
          "Len"
        ]
      },
      "43": {
        "title": "Coluna de Código Formatada (PadR)",
        "desc": "Lê a coluna 1 do produto atual e alinha em 8 posições com PadR.",
        "audioHint": "Concatena o código do produto alinhado em oito posições.",
        "tags": [
          "PadR"
        ]
      },
      "44": {
        "title": "Coluna de Descrição Formatada (PadR)",
        "desc": "Lê a coluna 2 do produto atual e alinha em 24 posições com PadR.",
        "audioHint": "Concatena a descrição do produto alinhada em vinte e quatro posições.",
        "tags": [
          "PadR"
        ]
      },
      "45": {
        "title": "Coluna de Categoria Formatada (PadR)",
        "desc": "Lê a coluna 3 do produto atual e alinha em 13 posições com PadR.",
        "audioHint": "Concatena a categoria do produto alinhada em treze posições.",
        "tags": [
          "PadR"
        ]
      },
      "46": {
        "title": "Coluna de Preço Formatada com Transform",
        "desc": "Formata o preço da coluna 4 com a máscara arroba E 9,999.92 e encerra a linha com CRLF.",
        "audioHint": "Transform formata o preço unitário em padrão monetário com quebra de linha.",
        "tags": [
          "Transform",
          "CRLF"
        ]
      },
      "47": {
        "title": "Fechamento do Laço (Next nI)",
        "desc": "Incrementa o índice nI para processar o próximo produto da lista.",
        "audioHint": "Next nI incrementa o índice para o próximo produto.",
        "tags": [
          "Next"
        ]
      },
      "49": {
        "title": "Comentário: Busca Dinâmica com aScan()",
        "desc": "Demarcação do algoritmo de busca rápida em arrays usando um Codeblock como critério.",
        "audioHint": "Comentário sobre a busca rápida com aScan e Codeblock.",
        "tags": [
          "Comentário"
        ]
      },
      "50": {
        "title": "Comentário: Filtro por Código PRD001",
        "desc": "Indica a localização dinâmica do item que possui o código específico.",
        "audioHint": "Comentário indicando a busca pelo código PRD001.",
        "tags": [
          "Comentário"
        ]
      },
      "51": {
        "title": "Definição do Codeblock de Filtro (bFiltro)",
        "desc": "Cria a expressão de teste {|x| x[1] == \"PRD001\"} que avalia cada elemento x e retorna .T. se a coluna 1 for igual.",
        "audioHint": "Atribui a bFiltro a expressão que testa se o código é igual a PRD001.",
        "tags": [
          "Codeblock",
          "bFiltro"
        ]
      },
      "52": {
        "title": "Execução da Busca com aScan()",
        "desc": "Executa aScan sobre aProdutos passando bFiltro e retorna o índice numérico da linha na matriz.",
        "audioHint": "aScan percorre a matriz e devolve a posição encontrada em nPosBusca.",
        "tags": [
          "aScan"
        ]
      },
      "54": {
        "title": "Régua Divisória da Seção de Busca",
        "desc": "Insere linha divisória e espaçamento para o bloco de resultados da busca.",
        "audioHint": "Adiciona régua divisória para os resultados de busca.",
        "tags": [
          "Replicate"
        ]
      },
      "55": {
        "title": "Subtítulo da Seção de Busca aScan",
        "desc": "Concatena o cabeçalho da demonstração da função aScan no relatório.",
        "audioHint": "Adiciona o subtítulo da busca com aScan.",
        "tags": [
          "Relatório"
        ]
      },
      "57": {
        "title": "Condicional de Validação (If nPosBusca > 0)",
        "desc": "Verifica se aScan encontrou o item. Valores maiores que zero indicam o índice onde o produto reside.",
        "audioHint": "If avalia se a posição retornada é maior que zero.",
        "tags": [
          "If"
        ]
      },
      "58": {
        "title": "Exibição da Linha Localizada",
        "desc": "Concatena a mensagem indicando em qual linha da matriz ordenada o produto foi localizado.",
        "audioHint": "Concatena a linha da matriz onde o produto foi encontrado.",
        "tags": [
          "cValToChar"
        ]
      },
      "59": {
        "title": "Exibição da Descrição do Produto",
        "desc": "Acessa a coluna 2 na linha nPosBusca para exibir a descrição do produto localizado.",
        "audioHint": "Concatena a descrição do item localizado.",
        "tags": [
          "Relatório"
        ]
      },
      "60": {
        "title": "Exibição da Categoria do Produto",
        "desc": "Acessa a coluna 3 na linha nPosBusca para exibir a categoria do produto.",
        "audioHint": "Concatena a categoria do item localizado.",
        "tags": [
          "Relatório"
        ]
      },
      "61": {
        "title": "Exibição do Valor Formatado com Transform",
        "desc": "Acessa a coluna 4 na linha nPosBusca e formata com máscara de moeda brasileira.",
        "audioHint": "Concatena o valor do produto formatado com Transform.",
        "tags": [
          "Transform"
        ]
      },
      "62": {
        "title": "Condicional Alternativa (Else)",
        "desc": "Acionada quando nPosBusca for igual a zero, indicando que o produto não existe na matriz.",
        "audioHint": "Else acionado caso o produto não seja encontrado na matriz.",
        "tags": [
          "Else"
        ]
      },
      "63": {
        "title": "Mensagem de Produto Não Localizado",
        "desc": "Informa ao usuário que o código pesquisado não foi localizado entre os produtos cadastrados.",
        "audioHint": "Concatena a mensagem de produto não localizado.",
        "tags": [
          "Relatório"
        ]
      },
      "64": {
        "title": "Fechamento Condicional (EndIf)",
        "desc": "Encerra o bloco condicional If da validação de busca.",
        "audioHint": "EndIf fecha o bloco condicional de busca.",
        "tags": [
          "EndIf"
        ]
      },
      "66": {
        "title": "Comentário: Exibição da Janela Informativa",
        "desc": "Demarca o acionamento da janela modal com todos os resultados processados.",
        "audioHint": "Comentário indicando a exibição do relatório na tela.",
        "tags": [
          "Comentário"
        ]
      },
      "67": {
        "title": "Exibição do Relatório Completo (ApMsgInfo)",
        "desc": "Desenha a janela modal do SmartClient contendo os produtos ordenados e a busca aScan.",
        "audioHint": "ApMsgInfo exibe o relatório completo na tela do usuário.",
        "tags": [
          "ApMsgInfo",
          "Interface"
        ]
      },
      "69": {
        "title": "Encerramento da Função (Return Nil)",
        "desc": "Finaliza a User Function liberando as variáveis locais da memória do AppServer.",
        "audioHint": "Return Nil finaliza a rotina com sucesso.",
        "tags": [
          "Return",
          "Nil"
        ]
      }
    }
  },
  {
    "id": "aula05",
    "module": "Nível 1: Fundamentos",
    "title": "Aula 05: Interfaces Gráficas & MSDialog",
    "badge": "05_InterfaceGrafica.prw",
    "description": "Crie janelas interativas reais no Protheus com MSDialog, campos de entrada MSGET e botões de ação TButton.",
    "challenge": {
      "title": "Calculadora Financeira com IOF na MSDialog",
      "icon": "🖥️",
      "badgeName": "Designer de Telas MSDialog",
      "xp": 150,
      "difficulty": "Avançado",
      "difficultyColor": "#f97316",
      "description": "Adicione um terceiro campo MSGET para percentual de IOF (padrão 0.38%). Implemente a Static Function CalcComIOF que aplica primeiro o desconto e depois adiciona o IOF sobre o valor final.",
      "objectives": [
        "Declarar a variável Local nTaxaIOF := 0.38 e criar o MSGET correspondente",
        "Posicionar o novo controle na MSDialog mantendo a proporção visual",
        "Implementar a Static Function CalcComIOF aplicando a cascata tributária",
        "Apresentar na tela o valor bruto, o desconto e o valor final com IOF"
      ],
      "hint": "Lembre-se de reajustar a altura da janela MSDialog para acomodar o novo controle sem sobreposição de pixels.",
      "solution": "// Controle no MSDialog:\n@ 070, 010 SAY \"Taxa IOF (%):\" PIXEL OF oDlg\n@ 068, 065 MSGET oGetIOF VAR nTaxaIOF SIZE 050, 010 PICTURE \"@E 99.99\" PIXEL OF oDlg"
    },
    "code": "#Include \"Totvs.ch\"\n\n/*/{Protheus.doc} User Function Aula05\n    Aula 5 - Interfaces Graficas no Protheus: Janelas (MSDialog),\n    Rotulos (TSay), Campos Editaveis (TGet) e Botoes de Acao (TButton).\n    @type  Function\n    @author Antigravity / Pair Programming\n    @since 02/09/2026\n    @version 1.0\n/*/\nUser Function Aula05()\n    Local oDlg        := Nil\n    Local oGetVal     := Nil\n    Local oGetDesc    := Nil\n    Local oSayTotal   := Nil\n    Local oBtnCalc    := Nil\n    Local oBtnSair    := Nil\n    Local nVlrVenda   := 1500.00\n    Local nPercDesc   := 10.00\n    Local cTotalTxt   := \"R$ 1.350,00\"\n\n    // 1. Criacao da Janela Modal (MSDialog)\n    DEFINE MSDIALOG oDlg TITLE \"Aula 05 - Calculadora Comercial Interativa\" FROM 000, 000 TO 260, 420 PIXEL\n\n    // 2. Rotulos Explicativos (TSay) e Campos de Entrada (MSGET)\n    @ 020, 020 SAY \"Valor da Venda (R$):\" SIZE 080, 012 OF oDlg PIXEL\n    @ 018, 105 MSGET oGetVal VAR nVlrVenda PICTURE \"@E 999,999.92\" SIZE 070, 011 OF oDlg PIXEL\n\n    @ 045, 020 SAY \"Desconto Comercial (%):\" SIZE 080, 012 OF oDlg PIXEL\n    @ 043, 105 MSGET oGetDesc VAR nPercDesc PICTURE \"@E 99.99\" SIZE 045, 011 OF oDlg PIXEL\n\n    // 3. Linha Divisoria Visual\n    @ 068, 020 TO 069, 190 LABEL \"\" OF oDlg PIXEL\n\n    // 4. Area de Exibicao do Total Calculado\n    @ 080, 020 SAY \"Total Liquido a Pagar:\" SIZE 080, 012 OF oDlg PIXEL\n    @ 080, 105 SAY oSayTotal PROMPT cTotalTxt SIZE 085, 012 COLOR CLR_BLUE OF oDlg PIXEL\n\n    // 5. Botoes de Acao (TButton)\n    @ 105, 040 BUTTON oBtnCalc PROMPT \"Calcular\" SIZE 055, 016 OF oDlg PIXEL ;\n        ACTION ( cTotalTxt := CalcTotal(nVlrVenda, nPercDesc), oSayTotal:SetText(cTotalTxt) )\n\n    @ 105, 115 BUTTON oBtnSair PROMPT \"Fechar\" SIZE 050, 016 OF oDlg PIXEL ;\n        ACTION ( oDlg:End() )\n\n    // 6. Ativacao e Exibicao da Janela Centralizada na tela\n    ACTIVATE MSDIALOG oDlg CENTERED\n\nReturn Nil\n\n/*/{Protheus.doc} CalcTotal\n    Funcao Estatica: Calcula o valor final aplicando o desconto comercial.\n/*/\nStatic Function CalcTotal(nVlr, nDesc)\n    Local nTotalLiquido := nVlr * (1 - (nDesc / 100))\nReturn \"R$ \" + Transform(nTotalLiquido, \"@E 999,999.92\")",
    "lineExplanations": {
      "1": {
        "title": "Diretiva #Include — Biblioteca TOTVS",
        "desc": "Importa as constantes e funções da biblioteca padrão TOTVS. Para interfaces gráficas, ela define CLR_BLUE e as constantes de cor usadas em componentes visuais.",
        "audioHint": "Include Totvs ponto c-h importa as definições visuais e constantes do Protheus.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "3": {
        "title": "ProtheusDoc — Documentação da Aula 05",
        "desc": "Documenta a função de interface gráfica com tipo, autor, data e versão no padrão oficial TOTVS.",
        "audioHint": "ProtheusDoc oficial da User Function Aula 05.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "10": {
        "title": "Ponto de Entrada (User Function Aula05)",
        "desc": "Declara a função principal executável via U_AULA05 para abrir o formulário interativo de calculadora.",
        "audioHint": "User Function Aula 05 é a porta de entrada da rotina visual.",
        "tags": [
          "User Function",
          "U_AULA05"
        ]
      },
      "11": {
        "title": "Objeto da Janela Principal (Local oDlg := Nil)",
        "desc": "Variável de objeto declarada no topo para referenciar a janela modal MSDialog.",
        "audioHint": "Variável de objeto oDlg inicializada com Nil para a janela modal.",
        "tags": [
          "Local",
          "Objeto (O)",
          "MSDialog"
        ]
      },
      "12": {
        "title": "Objeto do Campo de Valor (Local oGetVal := Nil)",
        "desc": "Receberá a referência do controle MSGET do valor da venda.",
        "audioHint": "Variável de objeto oGetVal para o campo do valor da venda.",
        "tags": [
          "Local",
          "MSGET"
        ]
      },
      "13": {
        "title": "Objeto do Campo de Desconto (Local oGetDesc := Nil)",
        "desc": "Receberá a referência do controle MSGET do percentual de desconto.",
        "audioHint": "Variável de objeto oGetDesc para o campo de desconto.",
        "tags": [
          "Local",
          "MSGET"
        ]
      },
      "14": {
        "title": "Objeto do Rótulo de Total (Local oSayTotal := Nil)",
        "desc": "Receberá a referência do componente TSay dinâmico que exibe o resultado do cálculo.",
        "audioHint": "Variável de objeto oSayTotal para o rótulo do resultado.",
        "tags": [
          "Local",
          "TSay"
        ]
      },
      "15": {
        "title": "Objeto do Botão Calcular (Local oBtnCalc := Nil)",
        "desc": "Receberá a referência do botão de ação Calcular.",
        "audioHint": "Variável de objeto oBtnCalc para o botão de cálculo.",
        "tags": [
          "Local",
          "TButton"
        ]
      },
      "16": {
        "title": "Objeto do Botão Fechar (Local oBtnSair := Nil)",
        "desc": "Receberá a referência do botão Fechar para encerramento da tela.",
        "audioHint": "Variável de objeto oBtnSair para o botão fechar.",
        "tags": [
          "Local",
          "TButton"
        ]
      },
      "17": {
        "title": "Valor Inicial da Venda (Local nVlrVenda := 1500.00)",
        "desc": "Variável numérica com o valor padrão inicial vinculado ao MSGET de venda.",
        "audioHint": "Variável local nVlrVenda com o valor inicial de mil e quinhentos reais.",
        "tags": [
          "Local",
          "Numeric"
        ]
      },
      "18": {
        "title": "Percentual de Desconto (Local nPercDesc := 10.00)",
        "desc": "Variável numérica com o percentual de desconto padrão vinculado ao MSGET.",
        "audioHint": "Variável local nPercDesc com o desconto inicial de dez por cento.",
        "tags": [
          "Local",
          "Numeric"
        ]
      },
      "19": {
        "title": "Texto Inicial do Total (Local cTotalTxt := \"R$ 1.350,00\")",
        "desc": "String com o texto formatado inicial para exibição no TSay de total.",
        "audioHint": "Variável local cTotalTxt com o texto inicial formatado.",
        "tags": [
          "Local",
          "Character"
        ]
      },
      "21": {
        "title": "Comentário: Criação da Janela Modal",
        "desc": "Demarca a definição estrutural da janela com comando DEFINE MSDIALOG.",
        "audioHint": "Comentário sobre a definição da janela modal.",
        "tags": [
          "Comentário"
        ]
      },
      "22": {
        "title": "Criação da Janela Modal (DEFINE MSDIALOG)",
        "desc": "Instancia o formulário oDlg com título e dimensões delimitadas em coordenadas PIXEL.",
        "audioHint": "DEFINE MSDIALOG cria a janela com título e dimensões em pixels.",
        "tags": [
          "MSDialog",
          "Janela Modal"
        ]
      },
      "24": {
        "title": "Comentário: Rótulos e Campos de Entrada",
        "desc": "Demarca os pares de rótulos estáticos TSay e caixas editáveis MSGET.",
        "audioHint": "Comentário sobre os rótulos e campos editáveis da tela.",
        "tags": [
          "Comentário"
        ]
      },
      "25": {
        "title": "Rótulo Fixo de Venda (TSay)",
        "desc": "Posiciona o texto estático Valor da Venda na coordenada 20,20 em pixels.",
        "audioHint": "Comando arroba SAY posiciona o rótulo do valor da venda.",
        "tags": [
          "TSay",
          "Rótulo"
        ]
      },
      "26": {
        "title": "Campo Editável do Valor da Venda (MSGET)",
        "desc": "Cria o campo de entrada vinculado à variável nVlrVenda com máscara monetária @E 999,999.92.",
        "audioHint": "Comando MSGET cria o campo editável do valor com máscara de moeda.",
        "tags": [
          "MSGET",
          "Data-binding"
        ]
      },
      "28": {
        "title": "Rótulo Fixo de Desconto (TSay)",
        "desc": "Posiciona o rótulo Desconto Comercial na coordenada 45,20 em pixels.",
        "audioHint": "Comando arroba SAY posiciona o rótulo do desconto comercial.",
        "tags": [
          "TSay"
        ]
      },
      "29": {
        "title": "Campo Editável de Desconto (MSGET)",
        "desc": "Cria o campo de entrada do percentual vinculado à variável nPercDesc com máscara @E 99.99.",
        "audioHint": "Comando MSGET cria o campo editável de desconto com máscara percentual.",
        "tags": [
          "MSGET"
        ]
      },
      "31": {
        "title": "Comentário: Linha Divisória Visual",
        "desc": "Demarca o traço gráfico horizontal de separação entre formulário e totalizadores.",
        "audioHint": "Comentário indicando a linha divisória da tela.",
        "tags": [
          "Comentário"
        ]
      },
      "32": {
        "title": "Linha Divisória Visual (LABEL vazio)",
        "desc": "Desenha uma linha horizontal em coordenadas PIXEL para divisão de seções.",
        "audioHint": "Comando desenha a linha horizontal de separação no formulário.",
        "tags": [
          "LABEL",
          "Divisória"
        ]
      },
      "34": {
        "title": "Comentário: Exibição do Total Calculado",
        "desc": "Demarca os componentes visuais que apresentam o resultado monetário calculado.",
        "audioHint": "Comentário sobre a área de exibição do total líquido.",
        "tags": [
          "Comentário"
        ]
      },
      "35": {
        "title": "Rótulo Fixo do Total Líquido (TSay)",
        "desc": "Exibe o texto fixo Total Liquido a Pagar na coordenada 80,20 em pixels.",
        "audioHint": "Comando arroba SAY posiciona o rótulo fixo de total líquido.",
        "tags": [
          "TSay"
        ]
      },
      "36": {
        "title": "Rótulo Dinâmico do Total (oSayTotal TSay)",
        "desc": "Componente dinâmico estilizado em azul que exibe cTotalTxt e permite atualização com SetText.",
        "audioHint": "Comando arroba SAY cria o controle dinâmico oSayTotal na cor azul.",
        "tags": [
          "TSay",
          "CLR_BLUE"
        ]
      },
      "38": {
        "title": "Comentário: Botões de Ação",
        "desc": "Demarca os controles interativos TButton de cálculo e fechamento da janela.",
        "audioHint": "Comentário sobre os botões de ação da interface.",
        "tags": [
          "Comentário"
        ]
      },
      "39": {
        "title": "Botão de Cálculo: Declaração (BUTTON oBtnCalc)",
        "desc": "Posiciona o botão Calcular na coordenada 105,40 em pixels com tamanho 55 por 16.",
        "audioHint": "Comando BUTTON instancia o botão Calcular na tela.",
        "tags": [
          "TButton",
          "Botão"
        ]
      },
      "40": {
        "title": "Botão de Cálculo: Ação (ACTION CalcTotal)",
        "desc": "Codeblock executado no clique que chama CalcTotal e atualiza o texto na tela com oSayTotal:SetText.",
        "audioHint": "Cláusula ACTION executa CalcTotal e atualiza o rótulo com SetText.",
        "tags": [
          "ACTION",
          "SetText"
        ]
      },
      "42": {
        "title": "Botão Fechar: Declaração (BUTTON oBtnSair)",
        "desc": "Posiciona o botão Fechar na coordenada 105,115 em pixels.",
        "audioHint": "Comando BUTTON instancia o botão Fechar na tela.",
        "tags": [
          "TButton"
        ]
      },
      "43": {
        "title": "Botão Fechar: Ação (ACTION oDlg:End())",
        "desc": "Codeblock executado no clique que chama o método End() da janela oDlg para encerrá-la.",
        "audioHint": "Cláusula ACTION chama o método End de oDlg para fechar a janela.",
        "tags": [
          "ACTION",
          "oDlg:End()"
        ]
      },
      "45": {
        "title": "Comentário: Ativação da Janela",
        "desc": "Demarcação do comando bloqueante que abre a tela para o usuário.",
        "audioHint": "Comentário sobre a ativação centralizada da janela.",
        "tags": [
          "Comentário"
        ]
      },
      "46": {
        "title": "Ativação Centralizada (ACTIVATE MSDIALOG CENTERED)",
        "desc": "Abre a janela no centro da tela e bloqueia a execução até que o diálogo seja encerrado.",
        "audioHint": "ACTIVATE MSDIALOG CENTERED exibe a janela centralizada na tela.",
        "tags": [
          "ACTIVATE",
          "CENTERED"
        ]
      },
      "48": {
        "title": "Encerramento da Função (Return Nil)",
        "desc": "Finaliza a User Function liberando os objetos da tela da memória do AppServer.",
        "audioHint": "Return Nil encerra a função liberando a memória alocada.",
        "tags": [
          "Return",
          "Nil"
        ]
      },
      "50": {
        "title": "ProtheusDoc da Função CalcTotal",
        "desc": "Documentação no padrão oficial para a Static Function CalcTotal.",
        "audioHint": "ProtheusDoc oficial da função estática CalcTotal.",
        "tags": [
          "ProtheusDoc",
          "Static Function"
        ]
      },
      "53": {
        "title": "Declaração de Static Function CalcTotal(nVlr, nDesc)",
        "desc": "Função estática auxiliar com escopo restrito a este arquivo .prw para cálculo do desconto comercial.",
        "audioHint": "Static Function CalcTotal recebe o valor e percentual de desconto.",
        "tags": [
          "Static Function",
          "Cálculo"
        ]
      },
      "54": {
        "title": "Cálculo do Total Líquido (Local nTotalLiquido)",
        "desc": "Aplica a fórmula nVlr * (1 - (nDesc / 100)) para obter o valor com desconto.",
        "audioHint": "Calcula a fórmula de desconto sobre o valor bruto.",
        "tags": [
          "Cálculo",
          "Local"
        ]
      },
      "55": {
        "title": "Retorno Formatado com Transform",
        "desc": "Retorna o total líquido formatado no padrão monetário brasileiro R$ 999.999,92.",
        "audioHint": "Retorna o valor líquido formatado com Transform.",
        "tags": [
          "Return",
          "Transform"
        ]
      }
    }
  },
  {
    "id": "aula06",
    "module": "Nível 2: Banco de Dados",
    "title": "Aula 06: Consultas SQL (TopConnect & TCQuery)",
    "badge": "06_BancoDeDados.prw",
    "description": "Consulte dados reais do Protheus com SQL nativo via TopConnect/TCQuery na tabela de Clientes (SA1), controle deleção lógica e libere áreas com DbCloseArea.",
    "challenge": {
      "title": "Filtro SQL Regional e Ordenação (TopConnect)",
      "icon": "🗄️",
      "badgeName": "Samurai do TopConnect",
      "xp": 175,
      "difficulty": "Avançado",
      "difficultyColor": "#f97316",
      "description": "Modifique a cláusula WHERE da query para filtrar clientes de um estado específico (A1_EST == 'SP') e ordene o resultado por limite de crédito (A1_LC) em ordem decrescente.",
      "objectives": [
        "Adicionar AND SA1.A1_EST = 'SP' na montagem da query SQL",
        "Preservar a verificação de deleção lógica: SA1.D_E_L_E_T_ = ' '",
        "Adicionar ORDER BY SA1.A1_LC DESC para trazer os maiores limites primeiro",
        "Garantir a liberação obrigatória da área temporária com DbCloseArea()"
      ],
      "hint": "Sempre monte queries usando RetSqlName('SA1') e passe a string final por ChangeQuery(). Isso garante que seu SQL funcione em Oracle, SQL Server e PostgreSQL sem erros!",
      "solution": "cQuery += \" WHERE SA1.D_E_L_E_T_ = ' ' \"\ncQuery += \"   AND SA1.A1_EST = 'SP' \"\ncQuery += \" ORDER BY SA1.A1_LC DESC \""
    },
    "code": "#Include \"Totvs.ch\"\n#Include \"TopConn.ch\"\n\n/*/{Protheus.doc} User Function Aula06\n    Aula 6 - Banco de Dados no Protheus: TopConnect e TCQuery.\n    Aprenda como consultar dados reais de tabelas do ERP (SA1 - Clientes),\n    ler registros com laco While e fechar a conexao com seguranca.\n    @type     Function\n    @author   Antigravity / Pair Programming\n    @since    04/09/2026\n    @version  3.0\n    @see      https://tdn.totvs.com/\n/*/\nUser Function Aula06()\n    // Declaracao de Variaveis Locais no Topo (Regra Blocker CodeAnalysis/SonarQube)\n    Local cQuery     := \"\"\n    Local cMensagem  := \"\"\n    Local nTotalLido := 0\n    Local bError     := Nil\n    Local lAmbienteOk := .F.\n\n    // 0. Verificacao do Contexto Corporativo (Empresa/Filial)\n    // NUNCA usar RpcSetEnv em rotinas interativas do SmartClient/WebApp.\n    // RpcSetEnv converte a thread para Job e encerra a camada de tela.\n    lAmbienteOk := (Select(\"SX2\") > 0 .And. Type(\"cEmpAnt\") == \"C\" .And. !Empty(cEmpAnt))\n\n    If !lAmbienteOk\n        cMensagem := \"=== AULA 06: BANCO DE DADOS PROTHEUS (TOPCONNECT) ===\" + CRLF + CRLF\n        cMensagem += \"Para ler dados reais da tabela de Clientes (SA1),\" + CRLF\n        cMensagem += \"o Protheus exige que o ambiente do ERP esteja aberto.\" + CRLF + CRLF\n        cMensagem += \"--- COMO EXECUTAR COM BANCO REAL ---\" + CRLF\n        cMensagem += \"1. Execute SIGAADV e faca o login (usuario 'admin')\" + CRLF\n        cMensagem += \"2. Confirme a Empresa e Filial (ex: Empresa 99, Filial 01)\" + CRLF\n        cMensagem += \"3. Pressione Shift+F6 (Executar Programa)\" + CRLF\n        cMensagem += \"4. Digite: U_AULA06 e clique em OK\" + CRLF + CRLF\n        cMensagem += \"--- QUERY SQL OFICIAL (TDN) ---\" + CRLF\n        cMensagem += \"SELECT A1_COD, A1_NOME, A1_MUN, A1_EST FROM SA1010 WHERE D_E_L_E_T_ = ' '\"\n        ApMsgInfo(cMensagem, \"Campus TOTVS - Aula 06: Banco de Dados\")\n        Return Nil\n    EndIf\n\n    // Tratamento de Excecao com Begin Sequence (Padrao Oficial de Integridade)\n    bError := ErrorBlock({|e| Break(e)})\n    Begin Sequence\n\n        // 1. Fecha a area de trabalho anterior caso ainda esteja aberta na memoria\n        If Select(\"QRY_CLI\") > 0\n            QRY_CLI->(DbCloseArea())\n        EndIf\n\n        // 2. Montagem da Instrucao SQL\n        // RetSqlName(\"SA1\") busca no Dicionario SX2 o nome fisico real da tabela\n        cQuery := \" SELECT A1_COD, A1_NOME, A1_MUN, A1_EST \"\n        cQuery += \" FROM \" + RetSqlName(\"SA1\") + \" \"\n        cQuery += \" WHERE D_E_L_E_T_ = ' ' \"\n        cQuery += \" ORDER BY A1_COD \"\n\n        // Adapta a query para o banco em uso (Oracle, SQL Server, Postgres)\n        cQuery := ChangeQuery(cQuery)\n\n        // 3. Executa a Query e cria cursor temporario com Alias QRY_CLI\n        TCQuery cQuery New Alias \"QRY_CLI\"\n\n        // 4. Verifica se a consulta retornou registros\n        If QRY_CLI->(Eof())\n            cMensagem := \"=== AULA 06: CONSULTA SQL VIA TCQUERY ===\" + CRLF + CRLF\n            cMensagem += \"Empresa: \" + cEmpAnt + \" / Filial: \" + cFilAnt + CRLF\n            cMensagem += \"A consulta foi executada com sucesso!\" + CRLF\n            cMensagem += \"Porem, a tabela SA1 nao possui registros nesta filial.\" + CRLF + CRLF\n            cMensagem += \"Query executada:\" + CRLF + cQuery\n        Else\n            cMensagem := \"=== AULA 06: CLIENTES RETORNADOS DO BANCO ===\" + CRLF + CRLF\n            cMensagem += \"Empresa: \" + cEmpAnt + \" | Filial: \" + cFilAnt + CRLF\n            cMensagem += PadR(\"CODIGO\", 8) + \" | \" + PadR(\"NOME DO CLIENTE\", 28) + \" | \" + PadR(\"CIDADE\", 15) + \" | UF\" + CRLF\n            cMensagem += Replicate(\"-\", 60) + CRLF\n\n            // 5. Laco While: le cada linha retornada ate o fim (Eof)\n            While !QRY_CLI->(Eof())\n                nTotalLido++\n                If nTotalLido <= 10\n                    cMensagem += PadR(QRY_CLI->A1_COD, 8) + \" | \"\n                    cMensagem += PadR(SubStr(QRY_CLI->A1_NOME, 1, 28), 28) + \" | \"\n                    cMensagem += PadR(QRY_CLI->A1_MUN, 15) + \" | \"\n                    cMensagem += QRY_CLI->A1_EST + CRLF\n                EndIf\n                QRY_CLI->(DbSkip())\n            EndDo\n\n            cMensagem += Replicate(\"-\", 60) + CRLF\n            cMensagem += \"Total de registros encontrados: \" + cValToChar(nTotalLido)\n        EndIf\n\n        // 6. REGRA DE OURO: Fechar a area para evitar memory leak no AppServer\n        QRY_CLI->(DbCloseArea())\n\n        ApMsgInfo(cMensagem, \"Campus TOTVS - Aula 06: Banco de Dados\")\n\n    Recover\n        If Select(\"QRY_CLI\") > 0\n            QRY_CLI->(DbCloseArea())\n        EndIf\n        ApMsgStop(\"Falha ao consultar a tabela SA1.\" + CRLF + ;\n                  \"Verifique se o DBAccess esta rodando.\", ;\n                  \"Campus TOTVS - Excecao de Banco\")\n    End Sequence\n    ErrorBlock(bError)\n\nReturn Nil",
    "lineExplanations": {
      "1": {
        "title": "Diretiva #Include Totvs.ch — Biblioteca Principal",
        "desc": "Importa as constantes fundamentais do Protheus. Toda função ADVPL começa com este Include para garantir que CRLF, ApMsgInfo e funções nativas estejam disponíveis.",
        "audioHint": "Include Totvs ponto c-h. Importa as constantes básicas do sistema e deve vir sempre no topo.",
        "tags": ["#Include", "Totvs.ch"]
      },
      "2": {
        "title": "Cabeçalho TopConnect (#Include 'TopConn.ch')",
        "desc": "Define os comandos essenciais como TCQuery e funções de abstração de banco de dados relacionais via DBAccess. Obrigatório para qualquer rotina que use SQL direto.",
        "audioHint": "Include TopConn ponto c-h. Habilita o comando T-C-Query para executar comandos SQL no banco de dados.",
        "tags": ["TopConnect", "TopConn.ch"]
      },
      "3": {
        "title": "Linha em Branco — Separação Estrutural",
        "desc": "Linha em branco separando as diretivas de compilação do bloco de documentação técnica ProtheusDoc.",
        "audioHint": "Linha em branco para organização visual do fonte.",
        "tags": ["Estrutura", "Clean Code"]
      },
      "4": {
        "title": "ProtheusDoc — Abertura da Documentação da Aula 06",
        "desc": "Início do bloco oficial ProtheusDoc que documenta a finalidade da rotina de consulta via TopConnect.",
        "audioHint": "Abertura do cabeçalho ProtheusDoc da Aula 06.",
        "tags": ["ProtheusDoc", "Documentação"]
      },
      "5": {
        "title": "ProtheusDoc — Título e Resumo da Aula",
        "desc": "Explica que a rotina demonstra o uso de consultas SQL em tabelas reais do ERP.",
        "audioHint": "Descrição do objetivo pedagógico da aula de banco de dados.",
        "tags": ["ProtheusDoc"]
      },
      "6": {
        "title": "ProtheusDoc — Escopo: Leitura da Tabela de Clientes",
        "desc": "Detalha que o exemplo aborda a leitura da tabela SA1 com paginação e laço While.",
        "audioHint": "Indicação do foco na tabela S-A-1 de clientes.",
        "tags": ["ProtheusDoc", "SA1"]
      },
      "7": {
        "title": "ProtheusDoc — Boas Práticas e Liberação de Áreas",
        "desc": "Destaca a importância do fechamento de cursores com DbCloseArea para evitar vazamento de conexões.",
        "audioHint": "Enfatiza a regra de fechamento de conexões.",
        "tags": ["ProtheusDoc", "DbCloseArea"]
      },
      "8": {
        "title": "ProtheusDoc — Tag @type Function",
        "desc": "Define que a rotina é do tipo função de usuário executável.",
        "audioHint": "Tag arroba type indicando Function.",
        "tags": ["@type"]
      },
      "9": {
        "title": "ProtheusDoc — Tag @author Antigravity",
        "desc": "Identifica os autores e instrutores do desenvolvimento da rotina.",
        "audioHint": "Tag de autoria do código.",
        "tags": ["@author"]
      },
      "10": {
        "title": "ProtheusDoc — Tag @since 04/09/2026",
        "desc": "Data oficial de criação e homologação do fonte no padrão Protheus 2026.",
        "audioHint": "Data de homologação da aula.",
        "tags": ["@since"]
      },
      "11": {
        "title": "ProtheusDoc — Tag @version 3.0",
        "desc": "Versão da implementação do script educacional.",
        "audioHint": "Versão três ponto zero do código.",
        "tags": ["@version"]
      },
      "12": {
        "title": "ProtheusDoc — Tag @see TDN",
        "desc": "Referência à documentação oficial da TOTVS Developer Network sobre DBAccess e TopConnect.",
        "audioHint": "Link de referência técnica na T-D-N.",
        "tags": ["@see", "TDN"]
      },
      "13": {
        "title": "ProtheusDoc — Fechamento do Bloco",
        "desc": "Encerra o comentário estruturado de documentação ProtheusDoc.",
        "audioHint": "Fechamento do bloco ProtheusDoc.",
        "tags": ["ProtheusDoc"]
      },
      "14": {
        "title": "User Function Aula06() — Assinatura da Função",
        "desc": "Ponto de entrada do usuário chamado via comando ou atalho Shift+F6 no SmartClient (U_AULA06).",
        "audioHint": "Declaração da User Function Aula 06, executável no ERP.",
        "tags": ["User Function", "EntryPoint"]
      },
      "15": {
        "title": "Comentário — Regra Blocker de Declaração no Topo",
        "desc": "Lembra que todas as variáveis locais devem ser declaradas impreterivelmente antes de qualquer instrução de lógica.",
        "audioHint": "Comentário sobre a regra inegociável de declaração de variáveis no topo.",
        "tags": ["CodeAnalysis", "SonarQube"]
      },
      "16": {
        "title": "Declaração Local cQuery — Comando SQL",
        "desc": "String que armazenará o texto da instrução SQL que será enviada ao DBAccess.",
        "audioHint": "Variável local c-Query inicializada vazia para armazenar a consulta SQL.",
        "tags": ["Local", "cQuery"]
      },
      "17": {
        "title": "Declaração Local cMensagem — Buffer do Relatório",
        "desc": "String acumuladora onde as linhas formatadas de clientes serão montadas para exibição final.",
        "audioHint": "Variável local c-Mensagem para montar o texto do relatório.",
        "tags": ["Local", "cMensagem"]
      },
      "18": {
        "title": "Declaração Local nTotalLido — Contador Numérico",
        "desc": "Numérico inicializado em zero para contabilizar o total de registros retornados pelo banco.",
        "audioHint": "Variável numérica n-TotalLido inicializada com zero.",
        "tags": ["Local", "nTotalLido"]
      },
      "19": {
        "title": "Declaração Local bError — Ponteiro de Tratamento de Exceção",
        "desc": "Variável que armazenará temporariamente o bloco de código de erro original da sessão.",
        "audioHint": "Variável b-Error para guardar o tratador de erros anterior.",
        "tags": ["Local", "bError"]
      },
      "20": {
        "title": "Declaração Local lAmbienteOk — Flag Lógica de Contexto",
        "desc": "Booleano que validará se as tabelas do dicionário e a empresa ativa estão devidamente inicializadas.",
        "audioHint": "Variável lógica l-AmbienteOk iniciada como falso.",
        "tags": ["Local", "lAmbienteOk"]
      },
      "21": {
        "title": "Linha em Branco — Separação entre Declarações e Validação",
        "desc": "Separação obrigatória entre as declarações no topo e a primeira instrução executável.",
        "audioHint": "Linha em branco separando as declarações da lógica de negócio.",
        "tags": ["Estrutura"]
      },
      "22": {
        "title": "Comentário — Verificação do Contexto Corporativo",
        "desc": "Explica a importância de checar se a empresa e filial estão carregadas no ambiente.",
        "audioHint": "Comentário sobre a validação de contexto corporativo.",
        "tags": ["Contexto", "Empresa"]
      },
      "23": {
        "title": "Comentário — Proibição de RpcSetEnv em SmartClient",
        "desc": "Alerta que RpcSetEnv não deve ser invocado em sessões interativas com tela, pois converte a thread para Job.",
        "audioHint": "Alerta crítico: R-P-C-Set-Env nunca deve ser chamado em rotinas interativas.",
        "tags": ["RpcSetEnv", "Alerta"]
      },
      "24": {
        "title": "Comentário — Encerramento de Tela por RpcSetEnv",
        "desc": "Explica que a chamada indevida de RpcSetEnv fecha a conexão visual do usuário imediatamente.",
        "audioHint": "Explicação técnica sobre a destruição da camada de tela por jobs.",
        "tags": ["SmartClient"]
      },
      "25": {
        "title": "Validação de Contexto Corporativo — Teste de SX2 e cEmpAnt",
        "desc": "Testa se a tabela SX2 está acessível, se a variável global cEmpAnt existe e se não está vazia.",
        "audioHint": "Expressão lógica que verifica se o ambiente Protheus está aberto e funcional.",
        "tags": ["Select('SX2')", "cEmpAnt"]
      },
      "26": {
        "title": "Linha em Branco — Separação de Controle de Fluxo",
        "desc": "Linha em branco organizando o teste condicional de segurança do ambiente.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "27": {
        "title": "If !lAmbienteOk — Bloqueio de Execução sem Ambiente",
        "desc": "Se o ambiente corporativo não estiver preparado, impede a rotina de continuar e exibe instruções.",
        "audioHint": "Condicional If não l-AmbienteOk: aciona a proteção caso o ERP não esteja logado.",
        "tags": ["If", "Fail-Safe"]
      },
      "28": {
        "title": "Montagem do Cabeçalho de Aviso Educacional",
        "desc": "Inicia a mensagem formatada orientando como executar a rotina dentro do SIGAADV.",
        "audioHint": "Início da mensagem informativa de ambiente não conectado.",
        "tags": ["cMensagem", "CRLF"]
      },
      "29": {
        "title": "Instrução de Requisito — Tabela de Clientes SA1",
        "desc": "Explica que para consultar a tabela SA1 é necessário que o Protheus tenha uma empresa ativa.",
        "audioHint": "Texto explicativo sobre o acesso à tabela S-A-1.",
        "tags": ["SA1"]
      },
      "30": {
        "title": "Instrução de Requisito — Ambiente Aberto",
        "desc": "Orienta que o DBAccess e o TopConnect precisam do contexto de sessão ativo.",
        "audioHint": "Aviso sobre a necessidade de login prévio no sistema.",
        "tags": ["DBAccess"]
      },
      "31": {
        "title": "Subtítulo do Guia de Execução Real",
        "desc": "Adiciona o cabeçalho 'COMO EXECUTAR COM BANCO REAL' no buffer de texto.",
        "audioHint": "Cabeçalho do passo a passo para o desenvolvedor.",
        "tags": ["Ajuda"]
      },
      "32": {
        "title": "Passo 1 — Acesso via SIGAADV",
        "desc": "Instrui a abrir o módulo SIGAADV e autenticar com usuário e senha válidos.",
        "audioHint": "Passo um: login com usuário administrador.",
        "tags": ["SIGAADV"]
      },
      "33": {
        "title": "Passo 2 — Confirmação de Empresa e Filial",
        "desc": "Instrui a selecionar a empresa de testes, como Empresa 99 e Filial 01.",
        "audioHint": "Passo dois: confirmação da filial de trabalho.",
        "tags": ["Filial"]
      },
      "34": {
        "title": "Passo 3 — Atalho Shift+F6",
        "desc": "Lembra o atalho padrão do Protheus para executar programas e User Functions avulsas.",
        "audioHint": "Passo três: acionar a tecla de atalho Shift mais F-6.",
        "tags": ["Shift+F6"]
      },
      "35": {
        "title": "Passo 4 — Digitação de U_AULA06",
        "desc": "Explica que funções de usuário devem ser precedidas pelo prefixo U_ na janela de execução.",
        "audioHint": "Passo quatro: digitar U underline Aula 06 e confirmar.",
        "tags": ["U_AULA06"]
      },
      "36": {
        "title": "Subtítulo de Query SQL Oficial",
        "desc": "Adiciona o cabeçalho demonstrando como a query é executada no banco físico.",
        "audioHint": "Título da seção técnica com a query SQL gerada.",
        "tags": ["SQL"]
      },
      "37": {
        "title": "Exemplo da Query Real — SA1010 com Deleção Lógica",
        "desc": "Exibe o comando SELECT nos campos essenciais com filtro WHERE D_E_L_E_T_ = ' '.",
        "audioHint": "Exemplo da instrução S-Q-L nativa consultando a tabela física S-A-1-0-1-0.",
        "tags": ["D_E_L_E_T_"]
      },
      "38": {
        "title": "ApMsgInfo — Exibição do Alerta de Orientação",
        "desc": "Apresenta a caixa de diálogo informativa ao usuário com o texto montado.",
        "audioHint": "Chamada da função A-P-Msg-Info para exibir o aviso na tela.",
        "tags": ["ApMsgInfo"]
      },
      "39": {
        "title": "Return Nil — Saída Prematura Segura",
        "desc": "Encerra a função imediatamente sem prosseguir para comandos SQL inválidos.",
        "audioHint": "Retorno antecipado para evitar falha de conexão com o banco.",
        "tags": ["Return", "Nil"]
      },
      "40": {
        "title": "EndIf — Fechamento do Bloqueio de Ambiente",
        "desc": "Conclui a estrutura condicional de validação de ambiente.",
        "audioHint": "Fechamento do bloco condicional If.",
        "tags": ["EndIf"]
      },
      "41": {
        "title": "Linha em Branco — Separação para o Bloco Crítico",
        "desc": "Linha em branco antes do início do tratamento estruturado de erros.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "42": {
        "title": "Comentário — Tratamento de Exceção com Begin Sequence",
        "desc": "Apresenta o padrão oficial da TOTVS para isolamento de erros de banco e rede.",
        "audioHint": "Comentário sobre proteção com Begin Sequence.",
        "tags": ["Begin Sequence", "Boas Práticas"]
      },
      "43": {
        "title": "ErrorBlock — Captura Controlada de Erros de Runtime",
        "desc": "Substitui temporariamente o tratador de erro global por um codeblock que dispara Break(e), enviando o controle para o bloco Recover.",
        "audioHint": "Instalação do bloco de erro com ErrorBlock para desviar falhas ao bloco Recover.",
        "tags": ["ErrorBlock", "Break"]
      },
      "44": {
        "title": "Begin Sequence — Abertura do Bloco Protegido",
        "desc": "Inicia a região crítica de execução. Qualquer erro no TCQuery ou DBAccess será capturado com segurança.",
        "audioHint": "Início do bloco Begin Sequence de execução protegida.",
        "tags": ["Begin Sequence"]
      },
      "45": {
        "title": "Linha em Branco — Organização da Região Crítica",
        "desc": "Linha em branco dentro do bloco Begin Sequence.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "46": {
        "title": "Comentário — Fechamento Preventivo de Alias",
        "desc": "Explica a importância de garantir que o alias QRY_CLI não esteja aberto antes de chamar TCQuery.",
        "audioHint": "Comentário sobre limpeza preventiva de cursores abertos.",
        "tags": ["Clean Code", "DbCloseArea"]
      },
      "47": {
        "title": "If Select('QRY_CLI') > 0 — Checagem de Área Aberta",
        "desc": "Verifica se a área de trabalho QRY_CLI já está registrada na tabela de áreas ativas da thread.",
        "audioHint": "Teste condicional If Select maior que zero para o alias Q-R-Y underline C-L-I.",
        "tags": ["Select()", "Alias"]
      },
      "48": {
        "title": "QRY_CLI->(DbCloseArea()) — Fechamento Preventivo",
        "desc": "Fecha a área remanescente para liberar memória e evitar o erro 'Alias already in use'.",
        "audioHint": "Execução de D-B-Close-Area no alias para descarregar o cursor anterior.",
        "tags": ["DbCloseArea"]
      },
      "49": {
        "title": "EndIf — Fechamento da Verificação Preventiva",
        "desc": "Fim do bloco de fechamento preventivo da área de trabalho.",
        "audioHint": "Fechamento do bloco condicional de verificação da área.",
        "tags": ["EndIf"]
      },
      "50": {
        "title": "Linha em Branco — Separação para Montagem da Query",
        "desc": "Linha em branco antes da concatenação da string SQL.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "51": {
        "title": "Comentário — Etapa 2: Montagem da Instrução SQL",
        "desc": "Indica o início da construção da query respeitando as boas práticas Protheus.",
        "audioHint": "Comentário sobre a montagem da instrução S-Q-L.",
        "tags": ["SQL"]
      },
      "52": {
        "title": "Comentário — Importância do RetSqlName",
        "desc": "Enfatiza que o nome físico da tabela no Protheus nunca deve ser chumbado, pois varia conforme a empresa.",
        "audioHint": "Comentário sobre o uso obrigatório de Ret-S-Q-L-Name.",
        "tags": ["RetSqlName", "SX2"]
      },
      "53": {
        "title": "cQuery := SELECT — Proibição de SELECT Asterisco",
        "desc": "Especifica nominalmente as colunas A1_COD, A1_NOME, A1_MUN e A1_EST, otimizando o tráfego de rede.",
        "audioHint": "Seleção restrita apenas aos quatro campos necessários, evitando S-E-L-E-C-T asterisco.",
        "tags": ["SELECT", "Performance"]
      },
      "54": {
        "title": "FROM RetSqlName('SA1') — Resolução Dinâmica da Tabela",
        "desc": "Chama RetSqlName para obter o nome real da tabela de clientes no banco (ex: SA1010 na empresa 01).",
        "audioHint": "Cláusula FROM utilizando Ret-S-Q-L-Name para encontrar o nome físico da tabela S-A-1.",
        "tags": ["RetSqlName", "SA1"]
      },
      "55": {
        "title": "WHERE D_E_L_E_T_ = ' ' — Filtro de Deleção Lógica",
        "desc": "Filtro mandatório no ERP TOTVS: exclui registros que foram deletados pelo usuário.",
        "audioHint": "Cláusula WHERE filtrando apenas registros ativos onde o campo D underline E underline L underline E underline T underline é vazio.",
        "tags": ["D_E_L_E_T_", "Deleção Lógica"]
      },
      "56": {
        "title": "ORDER BY A1_COD — Ordenação pelo Banco de Dados",
        "desc": "Ordena os registros por código crescente diretamente pelo motor do SGBD.",
        "audioHint": "Cláusula ORDER BY ordenando por código do cliente no banco de dados.",
        "tags": ["ORDER BY"]
      },
      "57": {
        "title": "Linha em Branco — Separação para Adaptação Multi-Banco",
        "desc": "Linha em branco separando a query da função de compatibilidade.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "58": {
        "title": "Comentário — Portabilidade Multi-Banco com ChangeQuery",
        "desc": "Explica que a função ChangeQuery converte o SQL padrão para o dialeto específico do banco instalado.",
        "audioHint": "Comentário sobre compatibilidade com Oracle, S-Q-L Server e Postgres.",
        "tags": ["ChangeQuery", "Portabilidade"]
      },
      "59": {
        "title": "ChangeQuery(cQuery) — Conversão Oficial de Dialeto",
        "desc": "Passa a query pelo conversor TopConnect para garantir que funções e datas funcionem em qualquer SGBD.",
        "audioHint": "Aplicação da função ChangeQuery para portabilidade entre diferentes bancos de dados.",
        "tags": ["ChangeQuery"]
      },
      "60": {
        "title": "Linha em Branco — Separação para Execução do Cursor",
        "desc": "Linha em branco antes da criação do cursor temporário.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "61": {
        "title": "Comentário — Etapa 3: Execução via TCQuery",
        "desc": "Indica a execução da consulta e criação da área de trabalho no AppServer.",
        "audioHint": "Comentário sobre a execução do comando T-C-Query.",
        "tags": ["TCQuery"]
      },
      "62": {
        "title": "TCQuery cQuery New Alias 'QRY_CLI' — Criação do Cursor",
        "desc": "Envia o SQL via DBAccess e abre uma tabela temporária de leitura com o alias literal QRY_CLI.",
        "audioHint": "Comando T-C-Query executando a instrução SQL e criando o alias Q-R-Y underline C-L-I.",
        "tags": ["TCQuery", "Alias"]
      },
      "63": {
        "title": "Linha em Branco — Separação para Validação de Retorno",
        "desc": "Linha em branco antes do teste de tabela vazia.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "64": {
        "title": "Comentário — Etapa 4: Checagem de Registros Retornados",
        "desc": "Explica a importância de testar se a consulta encontrou linhas ou se está em fim de arquivo.",
        "audioHint": "Comentário sobre o teste de fim de arquivo E-O-F.",
        "tags": ["Eof"]
      },
      "65": {
        "title": "If QRY_CLI->(Eof()) — Teste de Cursor Vazio",
        "desc": "Verifica se o cursor já inicia no final de arquivo, o que significa que nenhum registro atendeu aos critérios.",
        "audioHint": "Condicional If testando se o cursor temporário está no fim de arquivo, ou seja, vazio.",
        "tags": ["Eof", "Validação"]
      },
      "66": {
        "title": "Mensagem Informativa — Consulta sem Registros",
        "desc": "Inicia o texto informando que o comando executou sem erros, porém sem dados na tabela.",
        "audioHint": "Montagem da mensagem de consulta concluída sem dados.",
        "tags": ["cMensagem"]
      },
      "67": {
        "title": "Identificação de Empresa e Filial Ativas",
        "desc": "Concatena o código da empresa e filial ativas para contextualizar a ausência de registros.",
        "audioHint": "Exibição de empresa e filial ativas no relatório.",
        "tags": ["cEmpAnt", "cFilAnt"]
      },
      "68": {
        "title": "Confirmação de Sucesso na Execução SQL",
        "desc": "Deixa claro ao operador que a comunicação com o DBAccess foi bem-sucedida.",
        "audioHint": "Confirmação de que a query rodou com êxito.",
        "tags": ["Diagnóstico"]
      },
      "69": {
        "title": "Explicação Didática de Ausência de Dados",
        "desc": "Informa que a filial selecionada ainda não possui clientes cadastrados na base.",
        "audioHint": "Aviso didático de que não há clientes cadastrados nesta filial.",
        "tags": ["SA1"]
      },
      "70": {
        "title": "Exibição da Query Executada para Diagnóstico",
        "desc": "Anexa o texto da query executada para facilitar a conferência técnica por parte do desenvolvedor.",
        "audioHint": "Exibição do texto da query para apoio ao desenvolvedor.",
        "tags": ["Debug", "cQuery"]
      },
      "71": {
        "title": "Else — Ramo de Registros Encontrados",
        "desc": "Desvia o fluxo para o processamento e exibição quando há clientes no cursor.",
        "audioHint": "Cláusula Else executada quando existem clientes retornados pela consulta.",
        "tags": ["Else"]
      },
      "72": {
        "title": "Cabeçalho do Relatório de Clientes",
        "desc": "Inicia a montagem do cabeçalho da listagem de clientes retornados do banco de dados.",
        "audioHint": "Início da mensagem com a lista de clientes encontrados.",
        "tags": ["cMensagem"]
      },
      "73": {
        "title": "Exibição da Empresa e Filial no Relatório",
        "desc": "Adiciona a identificação da empresa e filial no topo da listagem de clientes.",
        "audioHint": "Identificação de empresa e filial na listagem.",
        "tags": ["cEmpAnt", "cFilAnt"]
      },
      "74": {
        "title": "Cabeçalho Tabular das Colunas",
        "desc": "Formata as colunas Código, Nome do Cliente, Cidade e Estado com PadR para alinhamento uniforme.",
        "audioHint": "Cabeçalho com títulos alinhados em colunas para cada campo.",
        "tags": ["PadR", "Colunas"]
      },
      "75": {
        "title": "Linha Divisória de 60 Caracteres",
        "desc": "Gera uma linha separadora com traços usando a função nativa Replicate.",
        "audioHint": "Linha separadora gerada pela função Replicate.",
        "tags": ["Replicate"]
      },
      "76": {
        "title": "Linha em Branco — Separação para o Laço While",
        "desc": "Linha em branco antes da iteração registro a registro.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "77": {
        "title": "Comentário — Etapa 5: Navegação no Cursor com While !Eof()",
        "desc": "Explica o mecanismo de iteração em cursores temporários do TopConnect.",
        "audioHint": "Comentário sobre a iteração registro a registro até o fim do arquivo.",
        "tags": ["While", "Eof"]
      },
      "78": {
        "title": "While !QRY_CLI->(Eof()) — Laço de Navegação",
        "desc": "Executa enquanto o ponteiro do cursor QRY_CLI não atingir o final da tabela temporária.",
        "audioHint": "Laço While enquanto não for fim de arquivo no cursor Q-R-Y underline C-L-I.",
        "tags": ["While", "Eof"]
      },
      "79": {
        "title": "nTotalLido++ — Incremento do Contador de Linhas",
        "desc": "Soma 1 ao contador de registros para contabilizar o volume total de clientes recuperados.",
        "audioHint": "Incremento de n-TotalLido somando cada linha processada.",
        "tags": ["nTotalLido", "Incremento"]
      },
      "80": {
        "title": "If nTotalLido <= 10 — Limitação Visual da Amostra",
        "desc": "Limita a exibição detalhada aos primeiros 10 clientes para evitar estouro da caixa de diálogo.",
        "audioHint": "Filtro que exibe detalhes apenas dos dez primeiros registros.",
        "tags": ["If", "Paginação"]
      },
      "81": {
        "title": "Concatenação da Coluna A1_COD",
        "desc": "Adiciona o código do cliente formatado com largura de 8 caracteres via PadR.",
        "audioHint": "Adiciona o código do cliente alinhado com PadR em oito caracteres.",
        "tags": ["A1_COD", "PadR"]
      },
      "82": {
        "title": "Concatenação da Coluna A1_NOME com SubStr",
        "desc": "Trunca o nome da empresa em até 28 posições para preservar a estética da tabela.",
        "audioHint": "Adiciona o nome truncado em vinte e oito caracteres com a função SubStr.",
        "tags": ["A1_NOME", "SubStr"]
      },
      "83": {
        "title": "Concatenação da Coluna A1_MUN",
        "desc": "Adiciona a cidade do cliente com largura padronizada de 15 caracteres.",
        "audioHint": "Adiciona o município do cliente alinhado em quinze caracteres.",
        "tags": ["A1_MUN", "PadR"]
      },
      "84": {
        "title": "Concatenação da Coluna A1_EST e Quebra de Linha",
        "desc": "Finaliza a linha do relatório com a sigla da Unidade Federativa e a constante CRLF.",
        "audioHint": "Adiciona a sigla do estado e quebra para a próxima linha.",
        "tags": ["A1_EST", "CRLF"]
      },
      "85": {
        "title": "EndIf — Fechamento da Amostra Visual",
        "desc": "Fim do bloco que restringe a montagem visual aos 10 primeiros registros.",
        "audioHint": "Fechamento do bloco If da amostra.",
        "tags": ["EndIf"]
      },
      "86": {
        "title": "QRY_CLI->(DbSkip()) — Avanço Mandatório de Ponteiro",
        "desc": "Avança o cursor para o próximo registro. OBRIGATÓRIO: sem DbSkip o sistema entra em loop infinito e trava o AppServer.",
        "audioHint": "Instrução crucial D-B-Skip no alias. Sem ela, o laço trava em loop infinito.",
        "tags": ["DbSkip", "Loop Infinito"]
      },
      "87": {
        "title": "EndDo — Fechamento do Laço de Navegação",
        "desc": "Retorna o fluxo para o teste condicional do laço While.",
        "audioHint": "Fechamento do laço While com EndDo.",
        "tags": ["EndDo"]
      },
      "88": {
        "title": "Linha em Branco — Separação para o Rodapé",
        "desc": "Linha em branco separando o laço da finalização do relatório.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "89": {
        "title": "Linha Divisória de Rodapé",
        "desc": "Adiciona nova divisória com traços para delimitar o término da listagem.",
        "audioHint": "Linha divisória inferior com Replicate.",
        "tags": ["Replicate"]
      },
      "90": {
        "title": "Exibição do Total de Registros Encontrados",
        "desc": "Imprime o total geral de clientes lidos na consulta, convertido com cValToChar.",
        "audioHint": "Totalizador geral formatado com a função c-Val-To-Char.",
        "tags": ["cValToChar"]
      },
      "91": {
        "title": "EndIf — Fechamento do Tratamento de Registros",
        "desc": "Conclui a bifurcação entre cursor vazio e cursor com registros.",
        "audioHint": "Fechamento do bloco condicional If principal.",
        "tags": ["EndIf"]
      },
      "92": {
        "title": "Linha em Branco — Separação para Liberação de Recursos",
        "desc": "Linha em branco antes da limpeza mandatória de memória.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "93": {
        "title": "Comentário — Etapa 6: REGRA DE OURO de Fechamento",
        "desc": "Alerta que não fechar áreas temporárias gera memory leak e satura conexões no DBAccess.",
        "audioHint": "Comentário destacando a regra de ouro de liberação de recursos.",
        "tags": ["Clean Code", "Memory Leak"]
      },
      "94": {
        "title": "QRY_CLI->(DbCloseArea()) — Liberação Mandatória do Cursor",
        "desc": "Fecha o cursor temporário e devolve a conexão de banco para o pool do TopConnect.",
        "audioHint": "Fechamento definitivo da área Q-R-Y underline C-L-I com D-B-Close-Area.",
        "tags": ["DbCloseArea", "Mandatório"]
      },
      "95": {
        "title": "Linha em Branco — Separação para Exibição",
        "desc": "Linha em branco antes de exibir o resultado ao operador.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "96": {
        "title": "ApMsgInfo — Apresentação do Relatório Final",
        "desc": "Apresenta ao operador a janela com todos os clientes consultados e estatísticas de execução.",
        "audioHint": "Apresentação da caixa de diálogo informativa com os dados coletados.",
        "tags": ["ApMsgInfo"]
      },
      "97": {
        "title": "Linha em Branco — Separação para Tratamento de Erros",
        "desc": "Linha em branco antes do bloco de recuperação de exceções.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "98": {
        "title": "Recover — Ponto de Captura de Falhas",
        "desc": "Seção acionada automaticamente caso ocorra queda de banco, erro no DBAccess ou sintaxe SQL inválida.",
        "audioHint": "Bloco Recover, equivalente ao catch para tratamento de falhas.",
        "tags": ["Recover", "Exceção"]
      },
      "99": {
        "title": "If Select('QRY_CLI') > 0 — Checagem de Limpeza em Falha",
        "desc": "Verifica se a área ficou aberta no momento da exceção para garantir que não fique presa na memória.",
        "audioHint": "Verificação preventiva se a área ficou aberta durante o erro.",
        "tags": ["Select()", "Limpeza"]
      },
      "100": {
        "title": "QRY_CLI->(DbCloseArea()) — Fechamento no Bloco Recover",
        "desc": "Garante a liberação da conexão mesmo em caso de falha crítica no meio da execução.",
        "audioHint": "Fechamento seguro da área de trabalho dentro do bloco de erro.",
        "tags": ["DbCloseArea", "Fail-Safe"]
      },
      "101": {
        "title": "EndIf — Conclusão da Limpeza do Recover",
        "desc": "Fim da verificação de fechamento do cursor no bloco de recuperação.",
        "audioHint": "Fechamento do condicional de limpeza do Recover.",
        "tags": ["EndIf"]
      },
      "102": {
        "title": "ApMsgStop — Mensagem de Alerta Crítico",
        "desc": "Exibe aviso modal com ícone de parada informando que houve falha na consulta à tabela SA1.",
        "audioHint": "Chamada de A-P-Msg-Stop comunicando a falha ao operador.",
        "tags": ["ApMsgStop", "Erro"]
      },
      "103": {
        "title": "Mensagem Técnica — Verificação do DBAccess",
        "desc": "Orienta a equipe de sustentação a verificar o serviço DBAccess e as credenciais de banco.",
        "audioHint": "Orientação para conferir se o serviço do D-B-Access está em execução.",
        "tags": ["DBAccess", "Diagnóstico"]
      },
      "104": {
        "title": "Título da Janela de Exceção",
        "desc": "Define o título descritivo 'Campus TOTVS - Excecao de Banco' na janela modal de erro.",
        "audioHint": "Título da notificação de erro no Protheus.",
        "tags": ["ApMsgStop"]
      },
      "105": {
        "title": "End Sequence — Término da Região Protegida",
        "desc": "Encerra a estrutura do bloco protegido Begin Sequence.",
        "audioHint": "Encerramento do bloco Begin Sequence com End Sequence.",
        "tags": ["End Sequence"]
      },
      "106": {
        "title": "ErrorBlock(bError) — Restauração do Tratador Global",
        "desc": "Restaura o tratador de erro original do Protheus, evitando efeitos colaterais em rotinas posteriores.",
        "audioHint": "Restauração obrigatória do manipulador de erros padrão do sistema.",
        "tags": ["ErrorBlock", "Restauração"]
      },
      "107": {
        "title": "Linha em Branco — Separação para Encerramento",
        "desc": "Linha em branco antes do comando final de retorno.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "108": {
        "title": "Return Nil — Encerramento da User Function Aula06",
        "desc": "Conclui a execução liberando da memória todas as variáveis locais declaradas no topo.",
        "audioHint": "Retorno Nulo finalizando a execução da função de forma limpa.",
        "tags": ["Return", "Nil"]
      }
    }
  },
  {
    "id": "aula07",
    "module": "Nível 2: Banco de Dados",
    "title": "Aula 07: Pontos de Entrada (Points of Entry)",
    "badge": "07_PontosDeEntrada.prw",
    "description": "Domine os Pontos de Entrada — os ganchos do ERP que permitem injetar lógica customizada nas rotinas padrão TOTVS sem alterar o código original.",
    "challenge": {
      "title": "Validação de Prazo no Ponto de Entrada MT410OK",
      "icon": "🛡️",
      "badgeName": "Guardião de Pontos de Entrada",
      "xp": 200,
      "difficulty": "Especialista",
      "difficultyColor": "#ef4444",
      "description": "Implemente uma validação corporativa no Ponto de Entrada MT410OK que rejeite pedidos caso a data de entrega (C5_ENTREG) seja inferior a 5 dias úteis em relação à emissão.",
      "objectives": [
        "Recuperar a data de emissão (C5_EMISSAO) e data de entrega (C5_ENTREG)",
        "Validar se a data de entrega atende ao prazo mínimo regulatório (+5 dias)",
        "Se inválido, definir lRetorno := .F. e acionar a rotina oficial de Help()",
        "Assegurar a restauração obrigatória do contexto da sessão com RestArea()"
      ],
      "hint": "O par GetArea() e RestArea() é mandatório em 100% dos Pontos de Entrada do Protheus. Um P.E. que altera o ponteiro da tabela e não restaura pode corromper pedidos de venda inteiros!",
      "solution": "If dEntrega < (dEmissao + 5)\n    lRetorno := .F.\n    Help(\"\", 1, \"PRAZOINV\",, \"Prazo de entrega minimo de 5 dias nao atendido.\", 1, 0)\nEndIf"
    },
    "code": "#Include \"Totvs.ch\"\n#Include \"FWMVCDef.ch\"\n\n/*/{Protheus.doc} User Function Aula07\n    Aula 7 - Pontos de Entrada (Points of Entry) no Protheus.\n    Os Pontos de Entrada sao ganchos (hooks) que a TOTVS disponibiliza\n    dentro das rotinas padrao do ERP, permitindo que o desenvolvedor\n    injete logica customizada sem alterar o codigo fonte original.\n    @type     Function\n    @author   Antigravity / Pair Programming\n    @since    04/09/2026\n    @version  1.0\n    @see      https://tdn.totvs.com/display/tec/Pontos+de+Entrada\n/*/\nUser Function Aula07()\n    Local cMensagem := \"\"\n    Local cTitulo   := \"Campus TOTVS - Aula 07: Pontos de Entrada\"\n\n    cMensagem := \"=== AULA 07: PONTOS DE ENTRADA (POINTS OF ENTRY) ===\" + CRLF + CRLF\n\n    cMensagem += \"O que e um Ponto de Entrada?\" + CRLF\n    cMensagem += Replicate(\"-\", 50) + CRLF\n    cMensagem += \"E um 'gancho' (hook) que a TOTVS deixa disponivel\" + CRLF\n    cMensagem += \"dentro das rotinas padrao do ERP.\" + CRLF\n    cMensagem += \"Voce cria uma User Function com o nome exato\" + CRLF\n    cMensagem += \"do PE e o Protheus a executa automaticamente\" + CRLF\n    cMensagem += \"no momento certo, sem modificar o fonte TOTVS.\" + CRLF + CRLF\n\n    cMensagem += \"Exemplo pratico - MT410OK:\" + CRLF\n    cMensagem += Replicate(\"-\", 50) + CRLF\n    cMensagem += \"Modulo : SIGAFAT (Faturamento)\" + CRLF\n    cMensagem += \"Rotina : MATA410 (Pedido de Venda)\" + CRLF\n    cMensagem += \"Momento: Ao clicar em OK/Confirmar o pedido\" + CRLF\n    cMensagem += \"Retorno: .T. = Permite gravar | .F. = Bloqueia\" + CRLF + CRLF\n\n    cMensagem += \"Regras Obrigatorias de um PE:\" + CRLF\n    cMensagem += Replicate(\"-\", 50) + CRLF\n    cMensagem += \"1. Nome exato conforme TDN (ex: MT410OK)\" + CRLF\n    cMensagem += \"2. Salvar e restaurar contexto com GetArea()/RestArea()\" + CRLF\n    cMensagem += \"3. Nunca usar ApMsgInfo em PE de validacao\" + CRLF\n    cMensagem += \"   (use Help() ou MsgStop() para nao travar o ERP)\" + CRLF\n    cMensagem += \"4. Sempre retornar o tipo esperado pelo PE\" + CRLF\n\n    ApMsgInfo(cMensagem, cTitulo)\n\nReturn Nil\n\n/*/{Protheus.doc} MT410OK\n    Ponto de Entrada: Validacao de Pedido de Venda (SIGAFAT - MATA410).\n    Executado ao confirmar um pedido de venda. Retorna .T. para\n    permitir a gravacao ou .F. para bloquear com mensagem ao usuario.\n    @type     Function\n    @author   Antigravity / Pair Programming\n    @since    04/09/2026\n    @version  1.0\n    @return   Logical, .T. permite gravar o pedido, .F. bloqueia\n    @see      https://tdn.totvs.com/display/tec/MT410OK\n/*/\nUser Function MT410OK()\n    Local aArea      := GetArea()\n    Local lRetorno   := .T.\n    Local nVlrTotal  := 0\n    Local cCodClient := \"\"\n\n    If Select(\"SC5\") > 0\n        nVlrTotal  := SC5->C5_VLRTOT\n        cCodClient := AllTrim(SC5->C5_CLIENTE)\n    EndIf\n\n    If nVlrTotal > 50000\n        lRetorno := .F.\n        Help(\"\", 1, \"MT410OK\", , ;\n             \"Pedido bloqueado por limite de valor!\" + CRLF + ;\n             \"Pedidos acima de R$ 50.000 requerem aprovacao gerencial.\" + CRLF + ;\n             \"Cliente: \" + cCodClient + \" | Valor: R$ \" + ;\n             Transform(nVlrTotal, \"@E 999,999.92\"), 1, 0)\n    EndIf\n\n    RestArea(aArea)\n\nReturn lRetorno",
    "lineExplanations": {
      "1": {
        "title": "Diretiva #Include Totvs.ch — Biblioteca Principal",
        "desc": "Importa as constantes fundamentais do Protheus. Obrigatório em qualquer fonte ADVPL, inclusive em Pontos de Entrada.",
        "audioHint": "Include Totvs ponto c-h. Importa as definições padrão do sistema no início do arquivo.",
        "tags": ["#Include", "Totvs.ch"]
      },
      "2": {
        "title": "Diretiva #Include FWMVCDef.ch — Framework MVC",
        "desc": "Importa as constantes e macros do ecossistema TOTVS. Útil para rotinas que interagem com pontos de entrada do framework MVC.",
        "audioHint": "Include F-W-M-V-C-Def ponto c-h. Importa definições para manipulação de modelos e eventos.",
        "tags": ["Include", "FWMVCDef"]
      },
      "3": {
        "title": "Linha em Branco — Separação Estrutural",
        "desc": "Linha em branco separando as diretivas de compilação da documentação da função pedagógica.",
        "audioHint": "Linha em branco para organização do código.",
        "tags": ["Estrutura"]
      },
      "4": {
        "title": "ProtheusDoc — Abertura da Documentação da Aula 07",
        "desc": "Início do bloco ProtheusDoc que documenta o propósito da rotina didática sobre Pontos de Entrada.",
        "audioHint": "Abertura do cabeçalho de documentação ProtheusDoc.",
        "tags": ["ProtheusDoc"]
      },
      "5": {
        "title": "ProtheusDoc — Título da Aula de Pontos de Entrada",
        "desc": "Identifica a aula como introdução prática a Hooks e Points of Entry no ERP.",
        "audioHint": "Título explicativo da aula sobre ganchos de customização.",
        "tags": ["ProtheusDoc"]
      },
      "6": {
        "title": "ProtheusDoc — Conceito de Ganchos (Hooks) TOTVS",
        "desc": "Explica que Pontos de Entrada são pontos oficiais disponibilizados pela TOTVS no fluxo padrão.",
        "audioHint": "Explicação do papel dos Pontos de Entrada no Protheus.",
        "tags": ["ProtheusDoc", "Conceito"]
      },
      "7": {
        "title": "ProtheusDoc — Injeção de Regra Customizada",
        "desc": "Destaca a capacidade de injetar regras de negócio específicas de cada cliente.",
        "audioHint": "Destaque sobre como adicionar regras sem modificar o padrão.",
        "tags": ["ProtheusDoc"]
      },
      "8": {
        "title": "ProtheusDoc — Preservação do Código Fonte Original",
        "desc": "Ressalta que o código original do ERP nunca é modificado, garantindo facilidade em atualizações.",
        "audioHint": "Garantia de que os fontes padrão da TOTVS permanecem intactos.",
        "tags": ["ProtheusDoc"]
      },
      "9": {
        "title": "ProtheusDoc — Tag @type Function",
        "desc": "Define que a rotina educacional é uma função de execução.",
        "audioHint": "Tag arroba type Function.",
        "tags": ["@type"]
      },
      "10": {
        "title": "ProtheusDoc — Tag @author Antigravity",
        "desc": "Identifica a autoria da documentação e tutoria do fonte.",
        "audioHint": "Tag arroba author indicando a autoria.",
        "tags": ["@author"]
      },
      "11": {
        "title": "ProtheusDoc — Tag @since 04/09/2026",
        "desc": "Data de homologação técnica do exemplo educacional.",
        "audioHint": "Data de publicação da rotina.",
        "tags": ["@since"]
      },
      "12": {
        "title": "ProtheusDoc — Tag @version 1.0",
        "desc": "Versão de entrega do módulo pedagógico de Pontos de Entrada.",
        "audioHint": "Versão um ponto zero.",
        "tags": ["@version"]
      },
      "13": {
        "title": "ProtheusDoc — Tag @see TDN Pontos de Entrada",
        "desc": "Link para a documentação de referência oficial sobre Pontos de Entrada na TOTVS Developer Network.",
        "audioHint": "Link na T-D-N com o catálogo de pontos de entrada do Protheus.",
        "tags": ["@see", "TDN"]
      },
      "14": {
        "title": "ProtheusDoc — Fechamento da Documentação Didática",
        "desc": "Encerra o bloco de comentário ProtheusDoc da User Function Aula07.",
        "audioHint": "Fechamento do bloco ProtheusDoc.",
        "tags": ["ProtheusDoc"]
      },
      "15": {
        "title": "User Function Aula07() — Função Pedagógica do Aluno",
        "desc": "Função executável via U_AULA07 que apresenta a aula teórica e orientações sobre Pontos de Entrada.",
        "audioHint": "Declaração da User Function Aula 07 para apresentação didática.",
        "tags": ["User Function"]
      },
      "16": {
        "title": "Declaração Local cMensagem — Buffer do Texto Educativo",
        "desc": "Variável local tipo texto inicializada vazia para montagem do guia informativo.",
        "audioHint": "Variável local c-Mensagem para montar o texto explicativo da aula.",
        "tags": ["Local", "cMensagem"]
      },
      "17": {
        "title": "Declaração Local cTitulo — Título da Interface",
        "desc": "Variável local tipo texto inicializada com o título da janela modal educativa.",
        "audioHint": "Variável local c-Titulo com o nome que aparecerá no diálogo.",
        "tags": ["Local", "cTitulo"]
      },
      "18": {
        "title": "Linha em Branco — Separação de Declarações no Topo",
        "desc": "Linha em branco separando as declarações obrigatórias no início da lógica executável.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "19": {
        "title": "Título do Conteúdo — Cabeçalho da Aula 07",
        "desc": "Atribui a string de cabeçalho principal à variável cMensagem com quebra de linha CRLF.",
        "audioHint": "Montagem do título da aula no buffer da mensagem.",
        "tags": ["cMensagem", "CRLF"]
      },
      "20": {
        "title": "Linha em Branco — Espaçamento Didático",
        "desc": "Linha em branco organizando os tópicos conceituais.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "21": {
        "title": "Tópico Conceitual — O Que É um Ponto de Entrada?",
        "desc": "Adiciona a pergunta retórica iniciando a explicação teórica sobre ganchos de customização.",
        "audioHint": "Texto introdutório sobre o conceito de Ponto de Entrada.",
        "tags": ["Conceito"]
      },
      "22": {
        "title": "Divisória Visual com Replicate",
        "desc": "Insere 50 caracteres traço para criar uma linha divisória estética no diálogo.",
        "audioHint": "Linha divisória criada pela função Replicate.",
        "tags": ["Replicate"]
      },
      "23": {
        "title": "Definição Técnica de Gancho (Hook)",
        "desc": "Explica que um P.E. é um gancho previsto pela engenharia da TOTVS nos fontes do ERP.",
        "audioHint": "Definição de Ponto de Entrada como um gancho oficial no fluxo de execução.",
        "tags": ["Hook"]
      },
      "24": {
        "title": "Contextualização em Rotinas Padrão",
        "desc": "Elucida que esses ganchos estão posicionados em momentos estratégicos das rotinas nativas.",
        "audioHint": "Explicação sobre a localização dos ganchos no ERP.",
        "tags": ["ERP"]
      },
      "25": {
        "title": "Associação por Nome Exato",
        "desc": "Explica que basta compilar uma User Function com o nome homologado pela TOTVS para ativá-la.",
        "audioHint": "Regra de ouro: o nome da função deve ser rigorosamente exato.",
        "tags": ["User Function", "Nome"]
      },
      "26": {
        "title": "Execução Automática pelo Protheus",
        "desc": "O kernel do Protheus verifica a existência da função no RPO e a dispara no instante programado.",
        "audioHint": "O Protheus encontra a função no repositório e a executa automaticamente.",
        "tags": ["RPO", "Automação"]
      },
      "27": {
        "title": "Preservação e Segurança da Base",
        "desc": "Conclui o conceito reforçando que nenhuma linha dos fontes oficiais da TOTVS é alterada.",
        "audioHint": "Conclusão destacando a segurança de não alterar o código original.",
        "tags": ["Integridade"]
      },
      "28": {
        "title": "Linha em Branco — Separação para Exemplo Prático",
        "desc": "Linha em branco antes do bloco de estudo de caso prático.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "29": {
        "title": "Estudo de Caso Prático — O Ponto MT410OK",
        "desc": "Apresenta o MT410OK como o exemplo mais clássico e utilizado no faturamento.",
        "audioHint": "Apresentação do caso prático com o ponto de entrada M-T-410-O-K.",
        "tags": ["MT410OK", "Caso Prático"]
      },
      "30": {
        "title": "Divisória Visual do Estudo de Caso",
        "desc": "Insere linha divisória de 50 traços com Replicate.",
        "audioHint": "Linha divisória.",
        "tags": ["Replicate"]
      },
      "31": {
        "title": "Módulo SIGAFAT (Faturamento)",
        "desc": "Informa que o Ponto de Entrada MT410OK pertence ao módulo de Faturamento do ERP.",
        "audioHint": "Identificação do módulo S-I-G-A-F-A-T.",
        "tags": ["SIGAFAT"]
      },
      "32": {
        "title": "Rotina MATA410 (Pedido de Venda)",
        "desc": "Especifica o programa padrão onde o gancho está instalado: a rotina de Pedidos de Venda.",
        "audioHint": "Identificação da rotina M-A-T-A-410 de pedidos de venda.",
        "tags": ["MATA410"]
      },
      "33": {
        "title": "Momento de Disparo — Confirmação do Pedido",
        "desc": "Explica que a validação ocorre exatamente quando o operador clica no botão OK da tela de pedido.",
        "audioHint": "Momento de disparo: ao clicar em confirmar ou salvar o pedido.",
        "tags": ["Trigger", "Momento"]
      },
      "34": {
        "title": "Contrato de Retorno — Verdadeiro ou Falso",
        "desc": "Explica que o retorno lógico determina se o ERP autoriza (.T.) ou bloqueia (.F.) a gravação.",
        "audioHint": "Contrato de retorno: verdadeiro permite gravar e falso bloqueia a gravação.",
        "tags": ["Retorno", "Lógico"]
      },
      "35": {
        "title": "Linha em Branco — Separação para Regras Obrigatórias",
        "desc": "Linha em branco antes da lista de regras obrigatórias de governança.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "36": {
        "title": "Título — Regras Obrigatórias de um Ponto de Entrada",
        "desc": "Apresenta a lista das 4 regras inegociáveis para construção de Pontos de Entrada seguros.",
        "audioHint": "Título da lista de regras obrigatórias para criar pontos de entrada.",
        "tags": ["Regras", "Governança"]
      },
      "37": {
        "title": "Divisória Visual das Regras",
        "desc": "Insere linha divisória de 50 traços.",
        "audioHint": "Linha divisória.",
        "tags": ["Replicate"]
      },
      "38": {
        "title": "Regra 1 — Nome Exato Conforme TDN",
        "desc": "O nome da User Function deve ser idêntico ao registrado na TDN, respeitando a grafia oficial.",
        "audioHint": "Regra um: usar o nome exato documentado na T-D-N.",
        "tags": ["Regra 1", "Nome"]
      },
      "39": {
        "title": "Regra 2 — Salvar e Restaurar Contexto (GetArea / RestArea)",
        "desc": "Mandatório: salvar ponteiros de tabelas e filtros antes de processar e restaurar antes do Return.",
        "audioHint": "Regra dois: salvar e restaurar o contexto com Get-Area e Rest-Area.",
        "tags": ["GetArea", "RestArea"]
      },
      "40": {
        "title": "Regra 3 — Proibição de ApMsgInfo em PE de Validação",
        "desc": "Em validações de gravação, o uso de ApMsgInfo pode quebrar o fluxo transacional do ERP.",
        "audioHint": "Regra três: nunca usar A-P-Msg-Info em validações de pontos de entrada.",
        "tags": ["Help", "Boas Práticas"]
      },
      "41": {
        "title": "Regra 3 (Cont.) — Uso Oficial de Help() ou MsgStop()",
        "desc": "Instrui a usar Help() corporativo ou MsgStop(), integrando a mensagem ao sistema de logs do ERP.",
        "audioHint": "Use a função Help ou MsgStop para não interferir na camada de tela.",
        "tags": ["Help", "MsgStop"]
      },
      "42": {
        "title": "Regra 4 — Tipagem Estrita do Valor de Retorno",
        "desc": "O retorno deve ser rigorosamente do tipo primitivo aguardado pelo ERP (Logical, Array, etc).",
        "audioHint": "Regra quatro: retornar exatamente o tipo de dado esperado pelo ERP.",
        "tags": ["Retorno", "Tipagem"]
      },
      "43": {
        "title": "Linha em Branco — Separação para Exibição do Diálogo",
        "desc": "Linha em branco antes de apresentar o diálogo informativo ao aluno.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "44": {
        "title": "ApMsgInfo — Apresentação da Aula Teórica",
        "desc": "Apresenta ao operador a janela informativa com todos os conceitos montados na variável cMensagem.",
        "audioHint": "Chamada de A-P-Msg-Info exibindo o resumo teórico da aula.",
        "tags": ["ApMsgInfo", "Interface"]
      },
      "45": {
        "title": "Linha em Branco — Separação para o Return",
        "desc": "Linha em branco antes da instrução de saída da função pedagógica.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "46": {
        "title": "Return Nil — Encerramento da Aula07 Pedagógica",
        "desc": "Finaliza a User Function Aula07 liberando as variáveis locais de memória.",
        "audioHint": "Retorno Nulo finalizando a função pedagógica.",
        "tags": ["Return", "Nil"]
      },
      "47": {
        "title": "Linha em Branco — Separação para o Ponto de Entrada Real",
        "desc": "Linha em branco entre a rotina pedagógica e a implementação do Ponto de Entrada real.",
        "audioHint": "Linha em branco separando as duas funções do fonte.",
        "tags": ["Estrutura"]
      },
      "48": {
        "title": "ProtheusDoc — Abertura da Documentação do MT410OK",
        "desc": "Início da documentação estruturada do Ponto de Entrada MT410OK.",
        "audioHint": "Abertura da documentação ProtheusDoc do Ponto de Entrada.",
        "tags": ["ProtheusDoc", "MT410OK"]
      },
      "49": {
        "title": "ProtheusDoc — Identificação do Gancho no SIGAFAT",
        "desc": "Declara a finalidade de validação do Pedido de Venda na rotina MATA410.",
        "audioHint": "Descrição funcional da validação de pedidos de venda.",
        "tags": ["ProtheusDoc", "MATA410"]
      },
      "50": {
        "title": "ProtheusDoc — Momento de Execução e Retorno",
        "desc": "Detalha que a execução ocorre na confirmação e seu retorno lógico controla o salvamento.",
        "audioHint": "Explicação sobre a execução na confirmação do pedido.",
        "tags": ["ProtheusDoc"]
      },
      "51": {
        "title": "ProtheusDoc — Feedback com Mensagem ao Usuário",
        "desc": "Informa que o bloqueio exibe justificativa clara e amigável ao operador.",
        "audioHint": "Aviso sobre o feedback exibido ao usuário.",
        "tags": ["ProtheusDoc"]
      },
      "52": {
        "title": "ProtheusDoc — Tag @type Function",
        "desc": "Especifica a tipagem do identificador como função ADVPL.",
        "audioHint": "Tag arroba type Function.",
        "tags": ["@type"]
      },
      "53": {
        "title": "ProtheusDoc — Tag @author Antigravity",
        "desc": "Identifica o autor da regra de negócio customizada.",
        "audioHint": "Tag de autoria da função.",
        "tags": ["@author"]
      },
      "54": {
        "title": "ProtheusDoc — Tag @since 04/09/2026",
        "desc": "Data de homologação do Ponto de Entrada corporativo.",
        "audioHint": "Data de homologação.",
        "tags": ["@since"]
      },
      "55": {
        "title": "ProtheusDoc — Tag @version 1.0",
        "desc": "Versão do componente de validação de pedidos de venda.",
        "audioHint": "Versão do componente.",
        "tags": ["@version"]
      },
      "56": {
        "title": "ProtheusDoc — Tag @return Logical",
        "desc": "Documenta formalmente o tipo de retorno: booleano indicando .T. para permitir ou .F. para bloquear.",
        "audioHint": "Tag arroba return documentando o retorno lógico obrigatório.",
        "tags": ["@return", "Logical"]
      },
      "57": {
        "title": "ProtheusDoc — Tag @see Link Oficial MT410OK",
        "desc": "Referência para a ficha técnica completa do Ponto de Entrada MT410OK na TDN.",
        "audioHint": "Link para a documentação técnica oficial na T-D-N.",
        "tags": ["@see", "TDN"]
      },
      "58": {
        "title": "ProtheusDoc — Fechamento do Bloco Técnico",
        "desc": "Encerra o comentário ProtheusDoc da rotina MT410OK.",
        "audioHint": "Fechamento do bloco ProtheusDoc.",
        "tags": ["ProtheusDoc"]
      },
      "59": {
        "title": "User Function MT410OK() — O Ponto de Entrada Oficial",
        "desc": "Assinatura da função procurada e chamada pelo ERP MATA410 na confirmação de pedidos.",
        "audioHint": "Declaração da User Function M-T-410-O-K, o ponto de entrada real.",
        "tags": ["User Function", "MT410OK"]
      },
      "60": {
        "title": "Declaração Local aArea := GetArea() — Snapshot de Contexto",
        "desc": "Salva o estado de todas as áreas de trabalho, ponteiros e filtros ativos antes de qualquer lógica.",
        "audioHint": "Variável local a-Area salvando o contexto completo com a função Get-Area.",
        "tags": ["GetArea", "Mandatório"]
      },
      "61": {
        "title": "Declaração Local lRetorno := .T. — Padrão Permissivo Seguro",
        "desc": "Inicializa com verdadeiro. O pedido só será rejeitado caso atenda explicitamente à regra de bloqueio.",
        "audioHint": "Variável l-Retorno iniciada com verdadeiro, adotando o princípio permissivo seguro.",
        "tags": ["Local", "lRetorno"]
      },
      "62": {
        "title": "Declaração Local nVlrTotal := 0 — Totalizador do Pedido",
        "desc": "Numérico inicializado em zero para receber o valor bruto total do pedido de venda.",
        "audioHint": "Variável numérica n-VlrTotal para armazenar o valor do pedido.",
        "tags": ["Local", "nVlrTotal"]
      },
      "63": {
        "title": "Declaração Local cCodClient := '' — Código do Cliente",
        "desc": "String inicializada vazia para armazenar o código do cliente comprador do pedido.",
        "audioHint": "Variável texto c-CodClient para armazenar o cliente faturado.",
        "tags": ["Local", "cCodClient"]
      },
      "64": {
        "title": "Linha em Branco — Separação de Declarações no Topo",
        "desc": "Linha em branco separando as declarações locais do início da leitura de tabelas.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "65": {
        "title": "If Select('SC5') > 0 — Verificação Defensiva da Tabela",
        "desc": "Verifica se a área de cabeçalho do pedido (SC5) está aberta antes de acessar seus campos com operador seta.",
        "audioHint": "Condicional If Select da tabela S-C-5 maior que zero, garantindo acesso seguro aos dados.",
        "tags": ["Select('SC5')", "Defensivo"]
      },
      "66": {
        "title": "Leitura de SC5->C5_VLRTOT — Valor Total do Pedido",
        "desc": "Lê o campo C5_VLRTOT do registro posicionado no cabeçalho do pedido pelo próprio ERP.",
        "audioHint": "Leitura do campo C-5 underline V-L-R-T-O-T da tabela S-C-5.",
        "tags": ["C5_VLRTOT", "SC5"]
      },
      "67": {
        "title": "Leitura de SC5->C5_CLIENTE com AllTrim",
        "desc": "Lê o código do cliente e remove os espaços à direita preenchidos pelo banco de dados.",
        "audioHint": "Leitura do campo C-5 underline C-L-I-E-N-T-E com a função AllTrim.",
        "tags": ["AllTrim", "C5_CLIENTE"]
      },
      "68": {
        "title": "EndIf — Fechamento da Leitura Segura",
        "desc": "Fim do bloco de captura dos dados do cabeçalho do pedido.",
        "audioHint": "Fechamento do bloco condicional If.",
        "tags": ["EndIf"]
      },
      "69": {
        "title": "Linha em Branco — Separação para Regra de Validação",
        "desc": "Linha em branco antes da aplicação da regra de limite de crédito corporativa.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "70": {
        "title": "If nVlrTotal > 50000 — Regra de Limite de Alçada",
        "desc": "Testa se o valor do pedido ultrapassa a alçada máxima permitida de 50 mil reais.",
        "audioHint": "Condicional If testando se o valor total do pedido supera cinquenta mil reais.",
        "tags": ["If", "Regra de Negócio"]
      },
      "71": {
        "title": "lRetorno := .F. — Bloqueio da Gravação",
        "desc": "Altera o retorno para falso, instruindo o ERP a abortar o processo de gravação do pedido.",
        "audioHint": "Atribuição de falso para l-Retorno, bloqueando a confirmação do pedido.",
        "tags": ["lRetorno", "Bloqueio"]
      },
      "72": {
        "title": "Chamada da Função Help() — Registro e Notificação Oficial",
        "desc": "Inicia a chamada da API oficial Help() do Protheus com o identificador 'MT410OK'.",
        "audioHint": "Chamada da função Help, padrão oficial do Protheus para mensagens em validações.",
        "tags": ["Help()"]
      },
      "73": {
        "title": "Mensagem de Motivo — Limite de Alçada Ultrapassado",
        "desc": "Primeira linha do texto de ajuda explicando a razão do bloqueio ao operador.",
        "audioHint": "Texto explicando que o pedido foi bloqueado por limite de valor.",
        "tags": ["Help", "Mensagem"]
      },
      "74": {
        "title": "Orientação Corporativa — Exigência de Aprovação",
        "desc": "Informa que pedidos com valores dessa magnitude exigem aprovação prévia da gerência comercial.",
        "audioHint": "Instrução de que valores acima da alçada requerem aprovação gerencial.",
        "tags": ["Alçada"]
      },
      "75": {
        "title": "Identificação do Cliente Comprador",
        "desc": "Concatena o código do cliente envolvido para facilitar a auditoria na tela.",
        "audioHint": "Identificação do código do cliente na notificação.",
        "tags": ["Cliente"]
      },
      "76": {
        "title": "Formatação Monetária com Transform (@E 999,999.92)",
        "desc": "Aplica a máscara monetária brasileira ao valor do pedido e define os códigos de exibição da Help.",
        "audioHint": "Formatação do valor monetário com a máscara Transform arroba E.",
        "tags": ["Transform", "Moeda"]
      },
      "77": {
        "title": "EndIf — Fechamento da Validação de Alçada",
        "desc": "Fim do bloco de teste da regra de negócio.",
        "audioHint": "Fechamento do bloco condicional If.",
        "tags": ["EndIf"]
      },
      "78": {
        "title": "Linha em Branco — Separação para Restauração de Contexto",
        "desc": "Linha em branco antes da restauração mandatória de estado.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "79": {
        "title": "RestArea(aArea) — Restauração Obrigatória de Contexto",
        "desc": "Restaura o estado exato das áreas de trabalho salvas no topo. INEGOCIÁVEL em 100% dos Pontos de Entrada.",
        "audioHint": "Instrução mandatória Rest-Area restaurando o contexto antes de sair da função.",
        "tags": ["RestArea", "Mandatório"]
      },
      "80": {
        "title": "Linha em Branco — Separação para o Retorno",
        "desc": "Linha em branco antes da entrega do resultado ao ERP.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "81": {
        "title": "Return lRetorno — Devolução do Veredito ao ERP",
        "desc": "Retorna .T. para permitir a gravação ou .F. para bloquear a operação, cumprindo o contrato do MT410OK.",
        "audioHint": "Comando Return devolvendo l-Retorno ao processo de vendas do Protheus.",
        "tags": ["Return", "lRetorno"]
      }
    }
  },
  {
    "id": "aula08",
    "module": "Nível 2: Banco de Dados",
    "title": "Aula 08: Parâmetros do Sistema (SX6 & GetMV)",
    "badge": "08_Parametros.prw",
    "description": "Aprenda a ler e configurar parâmetros do ERP com GetMV() e PutMV(). Elimine valores fixos no código e torne suas customizações configuráveis pelo usuário.",
    "challenge": {
      "title": "Integração do Parâmetro GetMV no Ponto de Entrada",
      "icon": "⚙️",
      "badgeName": "Mestre da Parametrização SX6",
      "xp": 250,
      "difficulty": "Especialista",
      "difficultyColor": "#ef4444",
      "description": "Elimine o valor fixo 50000 do If de validação da aula 07 e substitua pela leitura dinâmica de parâmetro GetMV('MV_LIMPED'). Teste com parâmetros configuráveis de 30.000 e 100.000.",
      "objectives": [
        "Localizar a linha com valor monetário fixo (hard-coded: 50000)",
        "Substituir pela função oficial de leitura do dicionário: GetMV('MV_LIMPED')",
        "Tratar valor padrão caso o parâmetro ainda não exista na base SX6",
        "Documentar o parâmetro corporativo no bloco ProtheusDoc"
      ],
      "hint": "Hard-coding de regras de negócio gera retrabalho e chamados para TI. O GetMV permite que o gestor mude regras na tela do Protheus sem precisar de um programador para recompilar fontes!",
      "solution": "// Substituição do valor fixo pela parametrização dinâmica:\nIf nVlrTotal > GetMV(\"MV_LIMPED\", .F., 50000)\n    lRetorno := .F.\n    Help(\"\", 1, \"LIMEXCED\",, \"Limite maximo por pedido ultrapassado!\", 1, 0)\nEndIf"
    },
    "code": "#Include \"Totvs.ch\"\n\n/*/{Protheus.doc} User Function Aula08\n    Aula 8 - Parametros do Sistema (Tabela SX6) no Protheus.\n    Os parametros SX6 sao variaveis de configuracao globais do ERP.\n    Aprenda a ler parametros com GetMV() e aplicar na logica de negocios,\n    eliminando valores fixos no codigo (hard-coded).\n    @type     Function\n    @author   Antigravity / Pair Programming\n    @since    05/09/2026\n    @version  1.0\n    @see      https://tdn.totvs.com/display/tec/GetMV\n/*/\nUser Function Aula08()\n    Local cRelatorio   := \"\"\n    Local nLimCred     := 0\n    Local nLimPed      := 0\n    Local cModuloAtivo := \"\"\n    Local nDescMax     := 0\n    Local lAmbienteOk  := .F.\n\n    lAmbienteOk := (Select(\"SX2\") > 0 .And. Type(\"cEmpAnt\") == \"C\" .And. !Empty(cEmpAnt))\n\n    If !lAmbienteOk\n        cRelatorio := \"=== AULA 08: PARAMETROS DO SISTEMA (SX6 - GetMV) ===\" + CRLF + CRLF\n        cRelatorio += \"Para executar com leitura real da tabela SX6, acesse:\" + CRLF\n        cRelatorio += \"1. Entre no Protheus (SIGAADV) com empresa e filial\" + CRLF\n        cRelatorio += \"2. Shift+F6 -> Digite: U_AULA08\" + CRLF + CRLF\n        cRelatorio += \"--- CONCEITO ---\" + CRLF\n        cRelatorio += \"GetMV('MV_XPARAM') le o valor de qualquer parametro SX6.\" + CRLF\n        cRelatorio += \"PutMV('MV_XPARAM', xValor) grava o valor (use com cuidado).\" + CRLF + CRLF\n        cRelatorio += \"--- VANTAGEM ---\" + CRLF\n        cRelatorio += \"Elimina valores fixos no codigo (hard-coded).\" + CRLF\n        cRelatorio += \"O usuario de negocio altera o parametro na tela\" + CRLF\n        cRelatorio += \"sem precisar de um desenvolvedor para recompilar!\"\n        ApMsgInfo(cRelatorio, \"Campus TOTVS - Aula 08: Parametros SX6\")\n        Return Nil\n    EndIf\n\n    // 1. Leitura de Parametros Nativos com GetMV()\n    nLimPed      := GetMV(\"MV_LIMPED\")\n    nDescMax     := GetMV(\"MV_PERDESC\")\n    cModuloAtivo := GetMV(\"MV_MODFAT\")\n    nLimCred     := GetMV(\"MV_LIMCRED\")\n\n    // 2. Montagem do Relatorio Educativo\n    cRelatorio := \"=== AULA 08: PARAMETROS DO SISTEMA (SX6) ===\" + CRLF + CRLF\n    cRelatorio += \"Empresa/Filial: \" + cEmpAnt + \" / \" + cFilAnt + CRLF\n    cRelatorio += Replicate(\"-\", 60) + CRLF + CRLF\n\n    cRelatorio += \"--- PARAMETROS LIDOS VIA GetMV() ---\" + CRLF\n    cRelatorio += PadR(\"Parametro\", 14) + \" | \" + PadR(\"Descricao\", 28) + \" | Valor\" + CRLF\n    cRelatorio += Replicate(\"-\", 58) + CRLF\n    cRelatorio += PadR(\"MV_LIMPED\", 14) + \" | \" + PadR(\"Limite Maximo por Pedido\", 28) + \" | R$ \" + Transform(nLimPed, \"@E 999,999.92\") + CRLF\n    cRelatorio += PadR(\"MV_PERDESC\", 14) + \" | \" + PadR(\"Desconto Maximo (%)\", 28) + \" | \" + Transform(nDescMax, \"@E 99.99\") + \"%\" + CRLF\n    cRelatorio += PadR(\"MV_LIMCRED\", 14) + \" | \" + PadR(\"Limite de Credito Padrao\", 28) + \" | R$ \" + Transform(nLimCred, \"@E 999,999.92\") + CRLF\n    cRelatorio += PadR(\"MV_MODFAT\", 14) + \" | \" + PadR(\"Modulo Faturamento Ativo\", 28) + \" | \" + cModuloAtivo + CRLF\n    cRelatorio += Replicate(\"-\", 58) + CRLF + CRLF\n\n    cRelatorio += \"--- POR QUE USAR GetMV? ---\" + CRLF\n    cRelatorio += \"ERRADO  : If nVlrTotal > 50000         (hard-coded!)\" + CRLF\n    cRelatorio += \"CORRETO : If nVlrTotal > GetMV('MV_LIMPED') (configuravel!)\"\n\n    ApMsgInfo(cRelatorio, \"Campus TOTVS - Aula 08: Parametros SX6\")\n\nReturn Nil",
    "lineExplanations": {
      "1": {
        "title": "Diretiva #Include Totvs.ch — Biblioteca Principal",
        "desc": "Importa as constantes fundamentais do Protheus. Para rotinas de parâmetros, apenas Totvs.ch é necessário, pois GetMV e PutMV são funções nativas do ERP.",
        "audioHint": "Include Totvs ponto c-h. Importa as definições padrão do sistema no início do arquivo.",
        "tags": ["#Include", "Totvs.ch"]
      },
      "2": {
        "title": "Linha em Branco — Separação Estrutural",
        "desc": "Linha em branco separando as diretivas de compilação da documentação ProtheusDoc.",
        "audioHint": "Linha em branco para organização visual.",
        "tags": ["Estrutura"]
      },
      "3": {
        "title": "ProtheusDoc — Abertura da Documentação da Aula 08",
        "desc": "Início da documentação estruturada sobre parametrização global via tabela SX6 no Protheus.",
        "audioHint": "Abertura do cabeçalho ProtheusDoc da Aula 08.",
        "tags": ["ProtheusDoc"]
      },
      "4": {
        "title": "ProtheusDoc — Título e Resumo da Aula",
        "desc": "Define que a aula aborda parâmetros de sistema gravados na tabela de dicionário SX6.",
        "audioHint": "Descrição da finalidade didática da aula de parâmetros.",
        "tags": ["ProtheusDoc", "SX6"]
      },
      "5": {
        "title": "ProtheusDoc — Conceito de Parâmetros Globais",
        "desc": "Explica que parâmetros SX6 atuam como variáveis de configuração dinâmicas do ERP.",
        "audioHint": "Conceito de parâmetros SX6 como variáveis dinâmicas de negócio.",
        "tags": ["ProtheusDoc", "Configuração"]
      },
      "6": {
        "title": "ProtheusDoc — Leitura com GetMV() e Lógica de Negócio",
        "desc": "Destaca a aplicação prática da função GetMV() em fluxos de validação corporativos.",
        "audioHint": "Destaca a aplicação de Get-M-V em regras de negócio.",
        "tags": ["ProtheusDoc", "GetMV"]
      },
      "7": {
        "title": "ProtheusDoc — Eliminação de Hard-Coding",
        "desc": "Ressalta o benefício crucial de nunca chumbar números ou regras fixas nos fontes ADVPL.",
        "audioHint": "Enfatiza a eliminação de código fixo chumbado no programa.",
        "tags": ["ProtheusDoc", "Clean Code"]
      },
      "8": {
        "title": "ProtheusDoc — Tag @type Function",
        "desc": "Define a tipagem da rotina como função executável pelo usuário.",
        "audioHint": "Tag arroba type Function.",
        "tags": ["@type"]
      },
      "9": {
        "title": "ProtheusDoc — Tag @author Antigravity",
        "desc": "Identifica a autoria do código pedagógico.",
        "audioHint": "Tag de autoria do código.",
        "tags": ["@author"]
      },
      "10": {
        "title": "ProtheusDoc — Tag @since 05/09/2026",
        "desc": "Data oficial de homologação técnica da rotina educacional.",
        "audioHint": "Data de homologação da aula.",
        "tags": ["@since"]
      },
      "11": {
        "title": "ProtheusDoc — Tag @version 1.0",
        "desc": "Versão de entrega do script didático.",
        "audioHint": "Versão um ponto zero.",
        "tags": ["@version"]
      },
      "12": {
        "title": "ProtheusDoc — Tag @see Link Oficial TDN",
        "desc": "Link de referência na TOTVS Developer Network sobre GetMV e tabela SX6.",
        "audioHint": "Link na T-D-N com a documentação oficial da função Get-M-V.",
        "tags": ["@see", "TDN"]
      },
      "13": {
        "title": "ProtheusDoc — Fechamento do Bloco Técnico",
        "desc": "Encerra o bloco de comentário estruturado ProtheusDoc.",
        "audioHint": "Fechamento do bloco ProtheusDoc.",
        "tags": ["ProtheusDoc"]
      },
      "14": {
        "title": "User Function Aula08() — Assinatura da Função",
        "desc": "Ponto de entrada chamado via atalho Shift+F6 no SmartClient (U_AULA08).",
        "audioHint": "Declaração da User Function Aula 08 executável no sistema.",
        "tags": ["User Function"]
      },
      "15": {
        "title": "Declaração Local cRelatorio — Buffer do Relatório",
        "desc": "Variável local string inicializada vazia para acumular o relatório formatado de parâmetros.",
        "audioHint": "Variável local c-Relatorio inicializada vazia para receber o texto.",
        "tags": ["Local", "cRelatorio"]
      },
      "16": {
        "title": "Declaração Local nLimCred — Limite de Crédito",
        "desc": "Numérico inicializado em zero para receber o valor do parâmetro MV_LIMCRED.",
        "audioHint": "Variável local n-LimCred para guardar o limite de crédito padrão.",
        "tags": ["Local", "nLimCred"]
      },
      "17": {
        "title": "Declaração Local nLimPed — Limite Máximo do Pedido",
        "desc": "Numérico inicializado em zero para receber o limite financeiro de MV_LIMPED.",
        "audioHint": "Variável local n-LimPed para guardar o limite de pedido.",
        "tags": ["Local", "nLimPed"]
      },
      "18": {
        "title": "Declaração Local cModuloAtivo — Flag de Módulo",
        "desc": "String inicializada vazia para receber o estado de licenciamento de MV_MODFAT.",
        "audioHint": "Variável local c-ModuloAtivo para guardar a flag do módulo.",
        "tags": ["Local", "cModuloAtivo"]
      },
      "19": {
        "title": "Declaração Local nDescMax — Percentual Máximo de Desconto",
        "desc": "Numérico inicializado em zero para receber a taxa máxima de MV_PERDESC.",
        "audioHint": "Variável local n-DescMax para guardar a taxa máxima de desconto.",
        "tags": ["Local", "nDescMax"]
      },
      "20": {
        "title": "Declaração Local lAmbienteOk — Validação de Contexto",
        "desc": "Booleano inicializado como falso para controle de segurança de sessão corporativa.",
        "audioHint": "Variável lógica l-AmbienteOk iniciada como falso.",
        "tags": ["Local", "lAmbienteOk"]
      },
      "21": {
        "title": "Linha em Branco — Separação de Declarações no Topo",
        "desc": "Linha em branco separando as declarações obrigatórias no topo da primeira instrução executável.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "22": {
        "title": "Validação de Contexto Corporativo — Teste de SX2 e cEmpAnt",
        "desc": "Verifica se a tabela SX2 está aberta e se a variável cEmpAnt contém o código da empresa logada.",
        "audioHint": "Expressão de validação testando se a empresa Protheus está ativa.",
        "tags": ["Select('SX2')", "cEmpAnt"]
      },
      "23": {
        "title": "Linha em Branco — Separação de Controle de Fluxo",
        "desc": "Linha em branco antes do desvio condicional de proteção.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "24": {
        "title": "If !lAmbienteOk — Bloqueio de Execução sem Ambiente",
        "desc": "Se o ambiente Protheus não estiver devidamente autenticado, impede a leitura de parâmetros e orienta o operador.",
        "audioHint": "Condicional If não l-AmbienteOk acionando a proteção de segurança.",
        "tags": ["If", "Fail-Safe"]
      },
      "25": {
        "title": "Título do Alerta Educacional de Execução",
        "desc": "Inicia a montagem da mensagem formatada com instruções de acesso via SIGAADV.",
        "audioHint": "Início da mensagem explicativa de ambiente não preparado.",
        "tags": ["cRelatorio", "CRLF"]
      },
      "26": {
        "title": "Instrução de Requisito — Leitura Real da SX6",
        "desc": "Explica que parâmetros SX6 são vinculados à empresa e filial selecionadas no login.",
        "audioHint": "Instrução sobre a leitura de parâmetros na tabela S-X-6.",
        "tags": ["SX6"]
      },
      "27": {
        "title": "Passo 1 — Login no SIGAADV com Empresa e Filial",
        "desc": "Instrui a iniciar a sessão oficial pelo módulo inicial do ERP.",
        "audioHint": "Passo um: login com empresa e filial no SIGAADV.",
        "tags": ["SIGAADV"]
      },
      "28": {
        "title": "Passo 2 — Execução via Shift+F6 (U_AULA08)",
        "desc": "Lembra o comando de execução direta de User Functions pelo SmartClient.",
        "audioHint": "Passo dois: acionar Shift mais F-6 e digitar U underline Aula 08.",
        "tags": ["Shift+F6", "U_AULA08"]
      },
      "29": {
        "title": "Subtítulo de Conceito dos Parâmetros",
        "desc": "Adiciona o cabeçalho 'CONCEITO' na mensagem informativa.",
        "audioHint": "Título da seção de conceitos.",
        "tags": ["Conceito"]
      },
      "30": {
        "title": "Função GetMV('MV_XPARAM') — Leitura Dinâmica",
        "desc": "Explica a sintaxe da função nativa GetMV para ler parâmetros globais da tabela SX6.",
        "audioHint": "Explicação da função Get-M-V para leitura de parâmetros.",
        "tags": ["GetMV"]
      },
      "31": {
        "title": "Função PutMV('MV_XPARAM', xValor) — Gravação Dinâmica",
        "desc": "Explica a sintaxe da função PutMV para persistência de parâmetros, com aviso de cautela.",
        "audioHint": "Explicação da função Put-M-V para gravação de parâmetros com cautela.",
        "tags": ["PutMV"]
      },
      "32": {
        "title": "Subtítulo da Vantagem Competitiva",
        "desc": "Adiciona o cabeçalho 'VANTAGEM' no diálogo explicativo.",
        "audioHint": "Título da seção destacando as vantagens do Get-M-V.",
        "tags": ["Vantagens"]
      },
      "33": {
        "title": "Eliminação Definitiva de Valores Hard-Coded",
        "desc": "Ressalta que valores fixos no código causam retrabalho e dependência constante de programadores.",
        "audioHint": "Alerta sobre como evitar valores fixos chumbados no código.",
        "tags": ["Hard-coded"]
      },
      "34": {
        "title": "Autonomia do Usuário de Negócio",
        "desc": "Mostra que o gestor pode ajustar alçadas e taxas diretamente na tela do Protheus.",
        "audioHint": "Destaca a flexibilidade do usuário de negócio alterar regras na tela.",
        "tags": ["Flexibilidade"]
      },
      "35": {
        "title": "Zero Recompilação e Manutenção Simplificada",
        "desc": "Evita recompilações, geração de patches e paradas de sistema para ajustes corriqueiros.",
        "audioHint": "Elimina a necessidade de recompilar fontes para mudar parâmetros.",
        "tags": ["Boas Práticas"]
      },
      "36": {
        "title": "ApMsgInfo — Apresentação do Guia Educacional",
        "desc": "Exibe o diálogo modal com as orientações pedagógicas da aula.",
        "audioHint": "Chamada de A-P-Msg-Info apresentando o guia na tela.",
        "tags": ["ApMsgInfo"]
      },
      "37": {
        "title": "Return Nil — Saída Prematura Segura",
        "desc": "Encerra a função sem executar o restante do código quando o ambiente não estiver pronto.",
        "audioHint": "Retorno antecipado seguro da função.",
        "tags": ["Return", "Nil"]
      },
      "38": {
        "title": "EndIf — Fechamento do Bloqueio de Ambiente",
        "desc": "Conclui o bloco condicional de proteção de sessão.",
        "audioHint": "Fechamento do bloco condicional If.",
        "tags": ["EndIf"]
      },
      "39": {
        "title": "Linha em Branco — Separação para Leitura de Parâmetros",
        "desc": "Linha em branco antes da chamada dos parâmetros nativos do ERP.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "40": {
        "title": "Comentário — Etapa 1: Leitura de Parâmetros com GetMV()",
        "desc": "Indica o início da leitura dos 4 parâmetros corporativos de demonstração.",
        "audioHint": "Comentário sobre a leitura dos parâmetros corporativos.",
        "tags": ["GetMV"]
      },
      "41": {
        "title": "GetMV('MV_LIMPED') — Leitura do Limite do Pedido",
        "desc": "Lê o limite monetário máximo por pedido cadastrado na SX6 para a filial ativa.",
        "audioHint": "Chamada da função Get-M-V lendo o parâmetro M-V underline L-I-M-P-E-D.",
        "tags": ["GetMV", "MV_LIMPED"]
      },
      "42": {
        "title": "GetMV('MV_PERDESC') — Leitura do Desconto Máximo",
        "desc": "Lê o percentual máximo autorizado de desconto comercial para faturamento.",
        "audioHint": "Chamada de Get-M-V lendo o parâmetro M-V underline P-E-R-D-E-S-C.",
        "tags": ["GetMV", "MV_PERDESC"]
      },
      "43": {
        "title": "GetMV('MV_MODFAT') — Leitura da Flag do Módulo",
        "desc": "Lê a string que sinaliza se o módulo SIGAFAT está ativo na empresa atual.",
        "audioHint": "Chamada de Get-M-V lendo o parâmetro M-V underline M-O-D-F-A-T.",
        "tags": ["GetMV", "MV_MODFAT"]
      },
      "44": {
        "title": "GetMV('MV_LIMCRED') — Leitura do Limite de Crédito Padrão",
        "desc": "Lê o valor sugerido de crédito para novos clientes na esteira financeira.",
        "audioHint": "Chamada de Get-M-V lendo o parâmetro M-V underline L-I-M-C-R-E-D.",
        "tags": ["GetMV", "MV_LIMCRED"]
      },
      "45": {
        "title": "Linha em Branco — Separação para Montagem do Relatório",
        "desc": "Linha em branco antes da montagem visual dos parâmetros lidos.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "46": {
        "title": "Comentário — Etapa 2: Montagem do Relatório Educativo",
        "desc": "Início da formatação visual das variáveis recuperadas do banco.",
        "audioHint": "Comentário sobre a montagem do relatório comparativo.",
        "tags": ["Relatório"]
      },
      "47": {
        "title": "Cabeçalho do Relatório de Parâmetros",
        "desc": "Atribui o título principal 'PARAMETROS DO SISTEMA (SX6)' ao buffer cRelatorio.",
        "audioHint": "Início da montagem do relatório formatado na variável c-Relatorio.",
        "tags": ["cRelatorio"]
      },
      "48": {
        "title": "Identificação de Empresa e Filial Ativas",
        "desc": "Exibe o contexto das variáveis globais cEmpAnt e cFilAnt.",
        "audioHint": "Concatenação de empresa e filial ativas no relatório.",
        "tags": ["cEmpAnt", "cFilAnt"]
      },
      "49": {
        "title": "Linha Divisória de 60 Caracteres",
        "desc": "Gera linha divisória com traços usando a função Replicate.",
        "audioHint": "Linha divisória com traços via Replicate.",
        "tags": ["Replicate"]
      },
      "50": {
        "title": "Linha em Branco — Espaçamento Tabular",
        "desc": "Linha em branco antes da tabela de valores.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "51": {
        "title": "Subtítulo — Parâmetros Lidos via GetMV()",
        "desc": "Adiciona o cabeçalho descritivo da tabela de parâmetros.",
        "audioHint": "Título da tabela de parâmetros lidos.",
        "tags": ["GetMV"]
      },
      "52": {
        "title": "Cabeçalho das Colunas Tabulares (PadR)",
        "desc": "Formata as colunas Parâmetro, Descrição e Valor com PadR para alinhamento profissional.",
        "audioHint": "Cabeçalho com títulos alinhados em colunas com a função PadR.",
        "tags": ["PadR", "Colunas"]
      },
      "53": {
        "title": "Divisória Tabular de 58 Caracteres",
        "desc": "Insere linha divisória delimitando o cabeçalho dos dados.",
        "audioHint": "Linha divisória com Replicate.",
        "tags": ["Replicate"]
      },
      "54": {
        "title": "Exibição de MV_LIMPED Formatado",
        "desc": "Imprime o parâmetro MV_LIMPED com máscara monetária @E 999,999.92 via Transform.",
        "audioHint": "Linha do parâmetro M-V underline L-I-M-P-E-D formatado como moeda.",
        "tags": ["MV_LIMPED", "Transform"]
      },
      "55": {
        "title": "Exibição de MV_PERDESC Formatado",
        "desc": "Imprime o percentual máximo de desconto com máscara decimal @E 99.99 e símbolo %.",
        "audioHint": "Linha do parâmetro M-V underline P-E-R-D-E-S-C formatado com percentual.",
        "tags": ["MV_PERDESC", "Transform"]
      },
      "56": {
        "title": "Exibição de MV_LIMCRED Formatado",
        "desc": "Imprime o limite padrão de crédito com máscara monetária @E 999,999.92 via Transform.",
        "audioHint": "Linha do parâmetro M-V underline L-I-M-C-R-E-D formatado como valor monetário.",
        "tags": ["MV_LIMCRED", "Transform"]
      },
      "57": {
        "title": "Exibição de MV_MODFAT (Texto)",
        "desc": "Imprime o código ou estado do módulo de faturamento ativo.",
        "audioHint": "Linha do parâmetro M-V underline M-O-D-F-A-T exibindo a flag de texto.",
        "tags": ["MV_MODFAT"]
      },
      "58": {
        "title": "Divisória Inferior da Tabela",
        "desc": "Fecha a tabela com linha divisória de 58 caracteres.",
        "audioHint": "Linha divisória inferior da tabela.",
        "tags": ["Replicate"]
      },
      "59": {
        "title": "Linha em Branco — Separação para Conclusão Didática",
        "desc": "Linha em branco antes da demonstração da melhor prática.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "60": {
        "title": "Subtítulo — Por Que Usar GetMV?",
        "desc": "Apresenta a seção didática comparando a prática incorreta contra a recomendada.",
        "audioHint": "Título da lição didática comparando código fixo versus Get-M-V.",
        "tags": ["Didática", "Boas Práticas"]
      },
      "61": {
        "title": "Exemplo Incorreto — Hard-Coded (50000)",
        "desc": "Demonstra como o código fica rígido e frágil ao utilizar valores numéricos fixos no fonte.",
        "audioHint": "Demonstração do padrão incorreto com valor cinquenta mil chumbado.",
        "tags": ["Antipattern", "Hard-coded"]
      },
      "62": {
        "title": "Exemplo Correto — GetMV('MV_LIMPED') (Configurável)",
        "desc": "Demonstra o padrão profissional e recomendado pela TOTVS: busca dinâmica de parâmetros.",
        "audioHint": "Demonstração do padrão correto e profissional com Get-M-V dinâmico.",
        "tags": ["Pattern", "GetMV"]
      },
      "63": {
        "title": "Linha em Branco — Separação para Exibição",
        "desc": "Linha em branco antes de apresentar o diálogo ao usuário.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "64": {
        "title": "ApMsgInfo — Apresentação do Relatório Completo",
        "desc": "Abre a caixa de diálogo informativa exibindo ao operador todos os parâmetros lidos e lições.",
        "audioHint": "Chamada de A-P-Msg-Info exibindo o relatório com parâmetros e orientações.",
        "tags": ["ApMsgInfo", "Interface"]
      },
      "65": {
        "title": "Linha em Branco — Separação para Encerramento",
        "desc": "Linha em branco antes da saída da função.",
        "audioHint": "Linha em branco.",
        "tags": ["Estrutura"]
      },
      "66": {
        "title": "Return Nil — Encerramento da User Function Aula08",
        "desc": "Conclui a execução liberando da memória todas as variáveis locais declaradas no topo.",
        "audioHint": "Comando Return Nulo finalizando a execução da função de forma limpa.",
        "tags": ["Return", "Nil"]
      }
    }
  },
  {
    "id": "aula09",
    "module": "Nível 3: Arquitetura Avançada",
    "title": "Aula 09: Arquitetura MVC Protheus (ModelDef, ViewDef, MenuDef)",
    "badge": "09_MVC_Basico.prw",
    "description": "Domine o padrão oficial TOTVS Model-View-Controller: MenuDef() para catálogo de ações, ModelDef() para modelo de dados (MPFormModel) e ViewDef() para interface (FWFormView).",
    "challenge": {
      "title": "Implementação do Padrão MVC Oficial TOTVS",
      "icon": "🏛️",
      "badgeName": "Mestre em MVC Protheus",
      "xp": 100,
      "difficulty": "Especialista",
      "difficultyColor": "#a855f7",
      "description": "O padrão MVC é a base do Protheus moderno. Implemente a função estática MenuDef() contendo as opções 'Pesquisar', 'Visualizar', 'Incluir' e 'Alterar'. Instancie o MPFormModel() na ModelDef() usando a estrutura FWFormStruct(1, 'SA1'), e desenhe a interface na ViewDef() com FWFormView() e FWFormStruct(2, 'SA1').",
      "objectives": [
        "Definir MenuDef() com catálogo de operações da rotina (AxPesqui e VIEWDEF)",
        "Definir ModelDef() instanciando MPFormModel com FWFormStruct(1, 'SA1')",
        "Definir ViewDef() instanciando FWFormView com FWFormStruct(2, 'SA1')",
        "Executar no Protheus Virtual e validar a inicialização da arquitetura MVC"
      ],
      "hint": "No MVC, o número 1 em FWFormStruct(1, cAlias) cria a estrutura para o Model (regras de dados) e o número 2 em FWFormStruct(2, cAlias) cria a estrutura para a View (tela).",
      "solution": "// 1. Menu de Operações:\nStatic Function MenuDef()\n    Local aRotina := {}\n    ADD OPTION aRotina TITLE 'Pesquisar' ACTION 'AxPesqui' OPERATION 1 ACCESS 0\n    ADD OPTION aRotina TITLE 'Visualizar' ACTION 'VIEWDEF.AULA09' OPERATION 2 ACCESS 0\nReturn aRotina\n\n// 2. Modelo de Dados:\nStatic Function ModelDef()\n    Local oModel := MPFormModel():New('AULA09M')\n    Local oStruSA1 := FWFormStruct(1, 'SA1')\n    oModel:AddFields('FORMSA1', , oStruSA1)\nReturn oModel"
    },
    "code": "#Include \"Totvs.ch\"\n#Include \"FWMVCDef.ch\"\n\n/*/{Protheus.doc} User Function Aula09\n    Aula 09 - Arquitetura MVC Protheus (Model-View-Controller).\n    @type     Function\n    @author   Campus TOTVS / Pair Programming\n    @since    07/09/2026\n    @version  1.0\n/*/\nUser Function Aula09()\n    Local oBrowse := Nil\n\n    oBrowse := FWMBrowse():New()\n    oBrowse:SetAlias(\"SA1\")\n    oBrowse:SetDescription(\"Cadastro de Clientes - Arquitetura MVC\")\n    oBrowse:Activate()\nReturn Nil\n\n/*/{Protheus.doc} MenuDef\n    Catalogo de operacoes da rotina MVC.\n/*/\nStatic Function MenuDef()\n    Local aRotina := {}\n\n    ADD OPTION aRotina TITLE \"Pesquisar\"  ACTION \"AxPesqui\"       OPERATION 1 ACCESS 0\n    ADD OPTION aRotina TITLE \"Visualizar\" ACTION \"VIEWDEF.AULA09\" OPERATION 2 ACCESS 0\n    ADD OPTION aRotina TITLE \"Incluir\"    ACTION \"VIEWDEF.AULA09\" OPERATION 3 ACCESS 0\n    ADD OPTION aRotina TITLE \"Alterar\"    ACTION \"VIEWDEF.AULA09\" OPERATION 4 ACCESS 0\n    ADD OPTION aRotina TITLE \"Excluir\"    ACTION \"VIEWDEF.AULA09\" OPERATION 5 ACCESS 0\nReturn aRotina\n\n/*/{Protheus.doc} ModelDef\n    Definicao do Modelo de Dados.\n/*/\nStatic Function ModelDef()\n    Local oModel   := MPFormModel():New(\"AULA09M\")\n    Local oStruSA1 := FWFormStruct(1, \"SA1\")\n\n    oModel:AddFields(\"FORMSA1\", , oStruSA1)\n    oModel:SetDescription(\"Modelo de Dados de Clientes - MVC\")\n    oModel:GetModel(\"FORMSA1\"):SetDescription(\"Formulario de Dados do Cliente\")\nReturn oModel\n\n/*/{Protheus.doc} ViewDef\n    Definicao da Interface Visual.\n/*/\nStatic Function ViewDef()\n    Local oModel   := FWLoadModel(\"AULA09\")\n    Local oView    := FWFormView():New()\n    Local oStruSA1 := FWFormStruct(2, \"SA1\")\n\n    oView:SetModel(oModel)\n    oView:AddField(\"VIEW_SA1\", oStruSA1, \"FORMSA1\")\n    oView:CreateHorizontalBox(\"EMCIMA\", 100)\n    oView:SetOwnerView(\"VIEW_SA1\", \"EMCIMA\")\nReturn oView",
    "lineExplanations": {
      "1": {
        "title": "Diretiva #Include \"Totvs.ch\"",
        "desc": "Importa a biblioteca base do Protheus com tipos primitivos, constantes visuais e rotinas nativas do ERP.",
        "audioHint": "Totvs ponto c-h é o cabeçalho base do Protheus. Traz constantes como CRLF e funções do sistema.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "2": {
        "title": "Diretiva #Include \"FWMVCDef.ch\"",
        "desc": "Importa as macros e constantes oficiais do framework MVC Protheus, como ADD OPTION e constantes de operações.",
        "audioHint": "F-W-M-V-C-Def ponto c-h define as constantes operacionais de inclusão, alteração e exclusão do padrão MVC.",
        "tags": [
          "#Include",
          "FWMVCDef",
          "MVC"
        ]
      },
      "4": {
        "title": "Documentação ProtheusDoc da User Function",
        "desc": "Padrão oficial TOTVS documentando a porta de entrada da rotina MVC, autor, data de criação e versão.",
        "audioHint": "ProtheusDoc oficial no padrão TOTVS. O linter da IDE utiliza esse bloco para validação e tooltips.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "10": {
        "title": "Ponto de Entrada (User Function Aula09)",
        "desc": "Porta de entrada executável externamente pelo SmartClient via U_AULA09, responsável por iniciar o browse MVC.",
        "audioHint": "User Function Aula 09 é a rotina executada pelo operador para abrir a tela de clientes em MVC.",
        "tags": [
          "User Function",
          "MVC"
        ]
      },
      "11": {
        "title": "Declaração da Instância do Browse (Local oBrowse)",
        "desc": "Declara no topo a variável que receberá o objeto de navegação em grade da tela (FWMBrowse), seguindo a regra Blocker do SonarQube.",
        "audioHint": "oBrowse recebe a referência da grade de dados na tela. Variáveis no topo evitam blocker de governança.",
        "tags": [
          "Local",
          "FWMBrowse",
          "SonarQube"
        ]
      },
      "13": {
        "title": "Instanciação do Browse (FWMBrowse():New())",
        "desc": "Cria o componente visual de navegação em grade padrão da TOTVS com suporte a paginação, busca e ordenação.",
        "audioHint": "F-W-M-Browse é o componente moderno de grade de dados do Protheus. Substitui a antiga m-Browse.",
        "tags": [
          "FWMBrowse",
          "New"
        ]
      },
      "14": {
        "title": "Vínculo com a Tabela SA1 (SetAlias)",
        "desc": "Define que a grade exibirá os registros da tabela SA1 (Cadastro de Clientes). O browse lê os índices da SX2 automaticamente.",
        "audioHint": "SetAlias define a tabela fonte. O Protheus lê o dicionário e monta as colunas conforme a SX3.",
        "tags": [
          "SetAlias",
          "SA1",
          "Clientes"
        ]
      },
      "15": {
        "title": "Título da Tela (SetDescription)",
        "desc": "Configura o texto descritivo exibido na barra superior da janela do SmartClient.",
        "audioHint": "SetDescription define o título que o usuário enxerga na parte superior da janela.",
        "tags": [
          "SetDescription",
          "Interface"
        ]
      },
      "16": {
        "title": "Ativação do Browse na Tela (Activate)",
        "desc": "Dispara a renderização da tela interativa para o operador e conecta o catálogo de botões do MenuDef.",
        "audioHint": "Activate coloca o browse no ar e aguarda as ações do operador.",
        "tags": [
          "Activate",
          "Interface"
        ]
      },
      "17": {
        "title": "Encerramento da User Function (Return Nil)",
        "desc": "Finaliza a rotina principal retornando Nulo após o fechamento da tela pelo operador.",
        "audioHint": "Return Nil encerra o programa liberando o contexto de tela.",
        "tags": [
          "Return",
          "Nil"
        ]
      },
      "22": {
        "title": "Catálogo de Operações (Static Function MenuDef)",
        "desc": "Função estática oficial do padrão MVC que retorna o array aRotina com todas as opções de menu disponíveis para o usuário.",
        "audioHint": "MenuDef é o primeiro pilar do MVC. Ela define quais operações o operador tem acesso na tela.",
        "tags": [
          "MenuDef",
          "Pilar 1 MVC"
        ]
      },
      "23": {
        "title": "Inicialização do Catálogo aRotina",
        "desc": "Cria o vetor que acumulará as opções do menu corporativo através das macros ADD OPTION.",
        "audioHint": "aRotina é a matriz que receberá cada botão de ação da barra de ferramentas do Protheus.",
        "tags": [
          "aRotina",
          "Array"
        ]
      },
      "25": {
        "title": "Operação Pesquisar (ADD OPTION Pesquisar)",
        "desc": "Registra a operação de busca padrão do ERP com a função nativa AxPesqui e código de operação 1.",
        "audioHint": "Operação 1 chama AxPesqui para pesquisar por código, CNPJ ou nome do cliente.",
        "tags": [
          "ADD OPTION",
          "AxPesqui",
          "Operação 1"
        ]
      },
      "26": {
        "title": "Operação Visualizar (VIEWDEF.AULA09)",
        "desc": "Registra a visualização do registro posicionado usando o renderizador padrão de tela do MVC na operação 2.",
        "audioHint": "Operação 2 abre a interface visual do ViewDef apenas em modo de leitura.",
        "tags": [
          "VIEWDEF",
          "Visualizar",
          "Operação 2"
        ]
      },
      "27": {
        "title": "Operação Incluir (VIEWDEF.AULA09)",
        "desc": "Registra a inserção de um novo cliente no modelo MVC na operação 3 com formulário em branco.",
        "audioHint": "Operação 3 ativa o formulário do ViewDef no modo de inclusão com validações do ModelDef.",
        "tags": [
          "VIEWDEF",
          "Incluir",
          "Operação 3"
        ]
      },
      "28": {
        "title": "Operação Alterar (VIEWDEF.AULA09)",
        "desc": "Registra a modificação dos dados do registro posicionado na operação 4 com persistência controlada pelo modelo.",
        "audioHint": "Operação 4 permite ao operador editar os campos do cliente selecionado.",
        "tags": [
          "VIEWDEF",
          "Alterar",
          "Operação 4"
        ]
      },
      "29": {
        "title": "Operação Excluir (VIEWDEF.AULA09)",
        "desc": "Registra a remoção de registro na operação 5 com verificação automática de integridade referencial.",
        "audioHint": "Operação 5 trata a exclusão física ou deleção lógica do registro no banco de dados.",
        "tags": [
          "VIEWDEF",
          "Excluir",
          "Operação 5"
        ]
      },
      "30": {
        "title": "Retorno do Menu de Ações (Return aRotina)",
        "desc": "Devolve o catálogo completo de ações configuradas para o framework MVC construir a barra de botões.",
        "audioHint": "Return aRotina entrega a lista de opções para o FWMBrowse desenhar os botões na tela.",
        "tags": [
          "Return",
          "aRotina"
        ]
      },
      "35": {
        "title": "Modelo de Dados (Static Function ModelDef)",
        "desc": "Segundo pilar do MVC: define a integridade referencial, regras de negócio, campos e validações de persistência.",
        "audioHint": "ModelDef é o coração do MVC. Nela residem todas as regras de negócio independentes da tela.",
        "tags": [
          "ModelDef",
          "Pilar 2 MVC"
        ]
      },
      "36": {
        "title": "Instanciação do Modelo (MPFormModel():New())",
        "desc": "Cria a instância do MPFormModel com o identificador único do modelo AULA09M.",
        "audioHint": "M-P-Form-Model é a classe que gerencia estados de gravação, rollback e transações no MVC.",
        "tags": [
          "MPFormModel",
          "New"
        ]
      },
      "37": {
        "title": "Estrutura do Dicionário de Dados (FWFormStruct(1, 'SA1'))",
        "desc": "Gera a estrutura de regras (parâmetro 1) a partir do Dicionário de Dados SX3 da tabela SA1.",
        "audioHint": "O número 1 em FWFormStruct extrai validações, obrigatoriedades e tipos de campos do banco.",
        "tags": [
          "FWFormStruct",
          "Model Struct",
          "SX3"
        ]
      },
      "39": {
        "title": "Adição de Campos ao Modelo (AddFields)",
        "desc": "Acopla o formulário FORMSA1 ao modelo de dados utilizando a estrutura de campos recém-carregada.",
        "audioHint": "AddFields adiciona o conjunto de campos de cabeçalho no modelo de dados ativo.",
        "tags": [
          "AddFields",
          "FORMSA1"
        ]
      },
      "40": {
        "title": "Descrição do Modelo (SetDescription)",
        "desc": "Define o texto descritivo oficial do modelo para auditoria e logs do ERP.",
        "audioHint": "SetDescription documenta o objetivo do modelo dentro do repositório de metadados.",
        "tags": [
          "SetDescription"
        ]
      },
      "41": {
        "title": "Descrição do Submodelo (GetModel():SetDescription)",
        "desc": "Define o nome amigável do formulário interno de clientes.",
        "audioHint": "Identifica a seção de campos para facilitar a navegação em telas complexas.",
        "tags": [
          "GetModel",
          "SetDescription"
        ]
      },
      "42": {
        "title": "Retorno da Instância do Modelo (Return oModel)",
        "desc": "Devolve o modelo de dados pronto para consumo pela interface e pelo motor de validação da TOTVS.",
        "audioHint": "Return oModel entrega o modelo configurado para o framework MVC Protheus.",
        "tags": [
          "Return",
          "oModel"
        ]
      },
      "47": {
        "title": "Interface Visual (Static Function ViewDef)",
        "desc": "Terceiro pilar do MVC: define como os campos e painéis são desenhados na tela do SmartClient ou WebApp.",
        "audioHint": "ViewDef define exclusivamente a parte visual. Não contém regras de negócio nem validações de gravação.",
        "tags": [
          "ViewDef",
          "Pilar 3 MVC"
        ]
      },
      "48": {
        "title": "Carga do Modelo Associado (FWLoadModel)",
        "desc": "Carrega o modelo de dados correspondente para garantir que a View desenhe os campos do Model correto.",
        "audioHint": "FWLoadModel conecta a interface visual ao modelo de dados correspondente.",
        "tags": [
          "FWLoadModel"
        ]
      },
      "49": {
        "title": "Instanciação da View (FWFormView():New())",
        "desc": "Cria o objeto da interface visual que organizará caixas, formulários, abas e grids na tela.",
        "audioHint": "F-W-Form-View gerencia o layout e o posicionamento gráfico dos componentes na tela.",
        "tags": [
          "FWFormView",
          "New"
        ]
      },
      "50": {
        "title": "Estrutura Visual de Campos (FWFormStruct(2, 'SA1'))",
        "desc": "Gera a estrutura de interface (parâmetro 2) a partir da SX3, com títulos, máscaras e ordem dos campos.",
        "audioHint": "O número 2 em FWFormStruct extrai elementos visuais como rótulos, tamanhos e máscaras de exibição.",
        "tags": [
          "FWFormStruct",
          "View Struct"
        ]
      },
      "52": {
        "title": "Associação View e Model (SetModel)",
        "desc": "Vincula formalmente o objeto de tela ao modelo de dados, habilitando a sincronização automática de dados.",
        "audioHint": "SetModel garante que as alterações feitas na tela sejam enviadas diretamente para o modelo.",
        "tags": [
          "SetModel"
        ]
      },
      "53": {
        "title": "Criação do Componente de Campos (AddField)",
        "desc": "Cria o formulário visual VIEW_SA1 vinculado à estrutura de campos e associado ao FORMSA1 do modelo.",
        "audioHint": "AddField cria a área de campos editáveis na tela do operador.",
        "tags": [
          "AddField",
          "VIEW_SA1"
        ]
      },
      "54": {
        "title": "Criação de Container de Layout (CreateHorizontalBox)",
        "desc": "Divide a janela criando uma caixa horizontal chamada EMCIMA ocupando 100% da altura da janela.",
        "audioHint": "CreateHorizontalBox organiza a tela em seções horizontais proporcionais em porcentagem.",
        "tags": [
          "CreateHorizontalBox",
          "Layout"
        ]
      },
      "55": {
        "title": "Posicionamento do Formulário (SetOwnerView)",
        "desc": "Encaixa o formulário VIEW_SA1 dentro do container EMCIMA para preenchimento de toda a tela.",
        "audioHint": "SetOwnerView coloca os campos dentro do container visual que criamos.",
        "tags": [
          "SetOwnerView"
        ]
      },
      "56": {
        "title": "Retorno da Interface (Return oView)",
        "desc": "Devolve a interface visual pronta para renderização pelo SmartClient ou WebApp.",
        "audioHint": "Return oView finaliza a construção visual do padrão MVC oficial TOTVS.",
        "tags": [
          "Return",
          "oView"
        ]
      }
    }
  }
];

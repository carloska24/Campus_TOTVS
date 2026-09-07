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
        "desc": "Importa constantes e macros fundamentais de interface, mensagens e formatação do ecossistema Protheus.",
        "audioHint": "Totvs ponto c-h é a biblioteca base. Ela disponibiliza variáveis globais e comandos de tela.",
        "tags": [
          "Pré-Processador",
          "Include"
        ]
      },
      "10": {
        "title": "Declaração de User Function Aula00",
        "desc": "Ponto de entrada customizado no repositório RPO executável via SmartClient ou chamada direta U_Aula00.",
        "audioHint": "User Function é a função de usuário aberta para o operador ou outros programas.",
        "tags": [
          "User Function",
          "Escopo"
        ]
      },
      "12": {
        "title": "Declaração Estrita de Variáveis Locais",
        "desc": "Regra Blocker do SonarQube e TOTVS CodeAnalysis: todas as variáveis devem ser declaradas no topo.",
        "audioHint": "Declare todas as variáveis locais no início antes de qualquer instrução de lógica.",
        "tags": [
          "SonarQube",
          "Local"
        ]
      },
      "19": {
        "title": "Inicialização Defensiva de Sessão (RpcSetEnv)",
        "desc": "Garante que o ambiente esteja preparado com a Empresa 99 e Filial 01, abrindo os dicionários de dados SX.",
        "audioHint": "RpcSetEnv prepara os dicionários de dados e tabelas corporativas para execução segura.",
        "tags": [
          "RpcSetEnv",
          "Ambiente"
        ]
      },
      "26": {
        "title": "Variáveis Globais de Sessão (cEmpAnt e cFilAnt)",
        "desc": "cEmpAnt identifica a empresa ativa no login e cFilAnt identifica a filial atual da thread de execução.",
        "audioHint": "cEmpAnt e cFilAnt são variáveis de sistema mantidas em memória pelo AppServer durante toda a sessão.",
        "tags": [
          "cEmpAnt",
          "cFilAnt",
          "Sessão"
        ]
      },
      "29": {
        "title": "Função xFilial('SA1')",
        "desc": "Retorna o código da filial a ser gravado ou pesquisado, respeitando se o cadastro é exclusivo ou compartilhado entre filiais.",
        "audioHint": "X-Filial é vital. Se a empresa compartilha clientes entre todas as filiais, ela retorna vazio. Se for exclusiva, retorna o código da filial.",
        "tags": [
          "xFilial",
          "Compartilhamento"
        ]
      },
      "32": {
        "title": "Montagem do Relatório de Auditoria",
        "desc": "Concatena os parâmetros operacionais do ERP para validação do desenvolvedor.",
        "audioHint": "Aqui formatamos o relatório que comprova que a arquitetura em 3 camadas está operacional.",
        "tags": [
          "Auditoria",
          "Clean Code"
        ]
      },
      "40": {
        "title": "Exibição na Interface com ApMsgInfo",
        "desc": "Dispara a caixa de diálogo modal informativa na camada SmartClient.",
        "audioHint": "ApMsgInfo projeta na tela do operador os dados auditados do servidor.",
        "tags": [
          "ApMsgInfo",
          "SmartClient"
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
        "audioHint": "Pense nela como uma importação de biblioteca. Sem ela, o compilador não reconhece constantes como CRLF ou funções de interface como ApMsgInfo.",
        "tags": [
          "Pré-Processador",
          "Boas Práticas"
        ]
      },
      "3": {
        "title": "Bloco de Documentação ProtheusDoc",
        "desc": "Padrão oficial da TOTVS para documentar funções. Informa tipo, autor, data de criação e versão. A extensão ADVPL do VS Code lê este bloco para exibir tooltips de ajuda.",
        "audioHint": "É obrigatório em projetos de produção. A TOTVS usa esse padrão para gerar a documentação da TDN automaticamente. O bloco começa com barra asterisco barra e fecha com barra asterisco barra.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "10": {
        "title": "Declaração da Função de Usuário (User Function)",
        "desc": "Declara a porta de entrada da rotina customizada. No Protheus, ela é executada externamente com o prefixo U_ — por exemplo: U_AULA01.",
        "audioHint": "User Function é o tipo mais comum de função customizada. Qualquer operador pode chamar ela pelo Shift+F6 digitando U_AULA01.",
        "tags": [
          "Escopo Global",
          "User Function"
        ]
      },
      "12": {
        "title": "Variável Tipo Character (Local cNome)",
        "desc": "Cria uma variável de texto no escopo Local. O escopo Local garante que ela só existirá enquanto a função estiver executando, liberando memória ao final automaticamente.",
        "audioHint": "A letra c antes do nome é obrigatória pela notação húngara do Protheus. Indica ao compilador e ao desenvolvedor que é um texto.",
        "tags": [
          "Local",
          "Tipo Character (C)"
        ]
      },
      "13": {
        "title": "Variável Tipo Numérico (Local nSalario)",
        "desc": "Armazena números inteiros ou decimais. O operador dois-pontos-igual é a atribuição em ADVPL — equivale ao igual simples de outras linguagens.",
        "audioHint": "A letra n no prefixo indica tipo numérico. O ADVPL não diferencia inteiro de decimal — ambos são Numeric.",
        "tags": [
          "Local",
          "Tipo Numeric (N)"
        ]
      },
      "14": {
        "title": "Variável Tipo Data (Local dAdmissao)",
        "desc": "A função Date() retorna a data corrente do servidor. Variáveis de data têm o prefixo d e não podem ser concatenadas diretamente com texto — é preciso convertê-las com dToC primeiro.",
        "audioHint": "Data é um tipo nativo no ADVPL. Isso facilita operações de soma de dias ou diferença entre datas diretamente com operadores matemáticos.",
        "tags": [
          "Local",
          "Tipo Date (D)"
        ]
      },
      "15": {
        "title": "Variável Tipo Lógico / Booleano (Local lAtivo)",
        "desc": "Em ADVPL, os valores booleanos são ponto T ponto para verdadeiro e ponto F ponto para falso. O prefixo l indica Logical.",
        "audioHint": "Diferente de outras linguagens que usam true e false, o ADVPL usa ponto T ponto e ponto F ponto com os pontos literalmente no código.",
        "tags": [
          "Local",
          "Tipo Logical (L)"
        ]
      },
      "16": {
        "title": "Array Dinâmico (Local aCursos)",
        "desc": "Cria um vetor com 3 elementos de texto dentro das chaves. Em ADVPL, arrays começam no índice 1, diferente de linguagens como JavaScript e Python que começam em zero.",
        "audioHint": "O prefixo a indica Array. As chaves dentro do código montam o array literal com seus elementos separados por vírgulas.",
        "tags": [
          "Local",
          "Tipo Array (A)"
        ]
      },
      "17": {
        "title": "Variável Acumuladora (Local cResumo)",
        "desc": "Inicializa uma string vazia que será usada como acumulador de texto. A cada linha processada, o conteúdo será concatenado nela usando o operador mais-igual.",
        "audioHint": "Inicializar com string vazia é essencial. Se não inicializar, a variável seria Nil e o operador de concatenação causaria um erro de tipo em tempo de execução.",
        "tags": [
          "Local",
          "Acumulador de Texto"
        ]
      },
      "18": {
        "title": "Contador de Loop (Local nI)",
        "desc": "Variável numérica usada como índice de controle do laço For/Next. Deve ser declarada no topo da função, antes de qualquer instrução executável.",
        "audioHint": "O n-I é o nome mais comum para contadores de loop no ADVPL, seguindo a convenção n para numérico e I de índice. Sempre inicialize contadores com zero.",
        "tags": [
          "Local",
          "Contador",
          "Loop"
        ]
      },
      "21": {
        "title": "Quebra de Linha (CRLF) na Montagem do Relatório",
        "desc": "CRLF é uma constante que insere uma nova linha no texto, equivalente a pressionar Enter. É definida pelo Include da TOTVS e aparece na maioria dos relatórios.",
        "audioHint": "C-R-L-F vem de Carriage Return, Line Feed. Você verá esta constante em praticamente todo relatório ou mensagem montada no ADVPL.",
        "tags": [
          "Constante CRLF",
          "String"
        ]
      },
      "22": {
        "title": "Linha de Nome com Concatenação (+)",
        "desc": "O operador de adição (+) concatena strings em ADVPL. Aqui junta o rótulo fixo com o valor da variável cNome para formar a linha do relatório.",
        "audioHint": "O operador de concatenação em ADVPL é o mesmo sinal de adição. Para juntar strings em múltiplas linhas, use o ponto-e-vírgula no final da linha como caractere de continuação.",
        "tags": [
          "Concatenação",
          "String"
        ]
      },
      "23": {
        "title": "Formatação Monetária com Transform()",
        "desc": "A função Transform com a máscara arroba E 999,999.92 formata o número no padrão brasileiro, com vírgula decimal e ponto de milhar.",
        "audioHint": "A máscara arroba E inverte os separadores para o padrão europeu-brasileiro. Sem ela, o Protheus usaria o padrão americano com ponto decimal.",
        "tags": [
          "Transform",
          "Máscaras"
        ]
      },
      "24": {
        "title": "Conversão de Data para Texto (dToC)",
        "desc": "D-to-C converte uma variável do tipo Data para Character no formato Dia, Mês e Ano. É necessário para concatenar datas em strings de texto.",
        "audioHint": "Sem a conversão D-to-C, o compilador geraria um erro de tipo incompatível ao tentar juntar uma data com um texto usando o operador de adição.",
        "tags": [
          "Conversão de Tipos",
          "dToC"
        ]
      },
      "25": {
        "title": "Operador Condicional Ternário (Iif)",
        "desc": "I-I-F avalia uma condição e retorna o segundo argumento se verdadeiro ou o terceiro se falso — tudo em uma única linha, sem precisar de um bloco If completo.",
        "audioHint": "Ideal para atribuições simples. Use com moderação: para lógicas complexas, o bloco If convencional é mais legível e fácil de manter.",
        "tags": [
          "Iif",
          "Lógica Inline"
        ]
      },
      "27": {
        "title": "Cabeçalho da Seção de Cursos",
        "desc": "Adiciona uma linha de subtítulo no relatório mostrando o total de cursos entre parênteses. Len retorna a quantidade de elementos no array aCursos.",
        "audioHint": "Len avalia o tamanho atual do array em tempo de execução. cValToChar converte o número para texto para que possa ser concatenado na string.",
        "tags": [
          "Len",
          "cValToChar"
        ]
      },
      "28": {
        "title": "Laço de Repetição For...To...Next",
        "desc": "Itera o contador nI de 1 até o total de cursos, acessando cada posição do vetor através de aCursos de nI. O Next incrementa automaticamente o contador.",
        "audioHint": "O For-Next é o loop mais usado para percorrer arrays no ADVPL. O índice começa em 1, diferente de JavaScript e Python que começam em 0.",
        "tags": [
          "Loop",
          "For/Next"
        ]
      },
      "29": {
        "title": "Acesso a Elemento do Array por Índice",
        "desc": "A sintaxe aCursos de nI acessa o elemento na posição nI do array. Na primeira iteração nI vale 1, na segunda vale 2, e assim por diante.",
        "audioHint": "Os colchetes com o índice são a forma de acessar elementos individuais do array. aCursos colchete 1 retorna o primeiro elemento, que é ADVPL Basico.",
        "tags": [
          "Array",
          "Indexação"
        ]
      },
      "33": {
        "title": "Caixa de Diálogo Informativa (ApMsgInfo)",
        "desc": "Desenha a janela modal padrão do Protheus WebApp com ícone azul informativo e o botão OK. É a função mais simples de interface para exibir mensagens ao operador.",
        "audioHint": "A-P-Msg-Info é segura para rotinas interativas no SmartClient e WebApp. O primeiro parâmetro é o texto e o segundo é o título da janela.",
        "tags": [
          "Interface Gráfica",
          "ApMsgInfo"
        ]
      },
      "35": {
        "title": "Retorno da Função (Return Nil)",
        "desc": "Encerra a execução da rotina retornando Nulo, liberando todas as variáveis locais da memória do AppServer automaticamente.",
        "audioHint": "Toda função ADVPL deve terminar com Return. O Nil indica que não há valor de retorno significativo — é o equivalente ao void de outras linguagens.",
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
        "audioHint": "Sem essa linha, constantes como CRLF e funções de interface como A-P-Msg-Info não seriam reconhecidas pelo compilador.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "3": {
        "title": "Documentação ProtheusDoc da Função",
        "desc": "Documenta a User Function com tipo, autor, data e versão no padrão oficial TOTVS. É obrigatório em fontes de produção e gerado automaticamente na TDN.",
        "audioHint": "Essa documentação é indexada pelo VS Code com a extensão ADVPL e pela ferramenta de CodeAnalysis da TOTVS para verificação de qualidade.",
        "tags": [
          "ProtheusDoc"
        ]
      },
      "10": {
        "title": "Ponto de Entrada (User Function Aula02)",
        "desc": "Declara a função principal executável externamente via U_AULA02 pelo Protheus. O prefixo U_ é adicionado automaticamente pelo runtime ao chamar uma User Function.",
        "audioHint": "Para chamar esta função no SmartClient ou WebApp, pressione Shift F6 e digite U_AULA02.",
        "tags": [
          "User Function",
          "Escopo Global"
        ]
      },
      "12": {
        "title": "Variável Numérica nNota — Nota do Avaliado",
        "desc": "Cria a variável numérica local inicializada com 8.5. Este valor será avaliado pelas estruturas de decisão If/ElseIf para determinar o status.",
        "audioHint": "Experimente alterar este valor para 9.5, 6.0 ou 3.0 e compile novamente — observe como as diferentes faixas do If e ElseIf respondem.",
        "tags": [
          "Local",
          "Tipo Numeric (N)"
        ]
      },
      "13": {
        "title": "Variável Character cStatus — Resultado da Avaliação",
        "desc": "Receberá o texto descritivo do resultado da avaliação de nota. Inicializada como string vazia para evitar erro de tipo na concatenação.",
        "audioHint": "Sempre inicialize strings com aspas duplas vazias. Se a variável for Nil quando tentar concatenar, o runtime gera um erro de tipo incompatível.",
        "tags": [
          "Local",
          "Tipo Character (C)"
        ]
      },
      "14": {
        "title": "Variável Character cFaixa — Nível de Senioridade",
        "desc": "Receberá o resultado da Static Function CalcSenioridade, que classifica a nota em faixas de nível usando Do Case.",
        "audioHint": "Esta variável é preenchida por uma função externa — CalcSenioridade. A separação em Static Function mantém a lógica de classificação reutilizável.",
        "tags": [
          "Local",
          "Modularização"
        ]
      },
      "15": {
        "title": "Array Dinâmico aRelatorio — Linhas do Relatório",
        "desc": "Cria um vetor dinâmico vazio pronto para receber novos registros durante a execução através da função A-Add.",
        "audioHint": "As chaves vazias criam um array sem elementos. O array crescerá dinamicamente à medida que A-Add for chamado ao longo da função.",
        "tags": [
          "Array Dinâmico",
          "Memória"
        ]
      },
      "19": {
        "title": "Estrutura de Decisão If / ElseIf / Else",
        "desc": "Avalia a nota sequencialmente do maior para o menor limite. A ordem importa: se inverter as condições, a lógica quebra e notas altas entrariam na faixa errada.",
        "audioHint": "Sempre avalie do caso mais restrito para o mais permissivo. Se você colocar maior-igual a 5 antes do maior-igual a 9, todos os aprovados com louvor cairiam na faixa errada.",
        "tags": [
          "Controle de Fluxo",
          "If/ElseIf/Else"
        ]
      },
      "20": {
        "title": "Condição maior-igual a 9.0 (Aprovado com Louvor)",
        "desc": "Primeira condição avaliada. Se a nota for maior ou igual a 9.0, a variável cStatus recebe o texto de aprovação com louvor e o bloco EndIf é atingido.",
        "audioHint": "O operador maior-igual em ADVPL é o mesmo do que em outras linguagens. O bloco EndIf encerra a estrutura inteira — garanta que ele esteja presente.",
        "tags": [
          "If",
          "Operador Relacional"
        ]
      },
      "21": {
        "title": "ElseIf — Segunda Faixa (7.0 a 8.9)",
        "desc": "Avaliado apenas se a condição anterior foi falsa. Se a nota for pelo menos 7.0 (mas menor que 9.0), o aluno é Aprovado com Sucesso.",
        "audioHint": "O ElseIf encadeia condições sem precisar fechar o bloco If. Isso é mais eficiente do que usar múltiplos If independentes.",
        "tags": [
          "ElseIf",
          "Encadeamento"
        ]
      },
      "22": {
        "title": "ElseIf — Terceira Faixa (5.0 a 6.9)",
        "desc": "Avaliado se as duas condições anteriores foram falsas. Nota entre 5.0 e 6.9 coloca o aluno em Recuperação.",
        "audioHint": "Cada ElseIf cobre uma faixa específica. Como a avaliação é de cima para baixo, ao chegar aqui já sabemos que a nota é menor que 7.0.",
        "tags": [
          "ElseIf",
          "Faixa de Valores"
        ]
      },
      "24": {
        "title": "Else — Caso Padrão (abaixo de 5.0)",
        "desc": "Executado quando nenhuma condição anterior foi verdadeira. Notas abaixo de 5.0 resultam em Reprovado. O Else não tem condição — é sempre o último recurso.",
        "audioHint": "O Else é opcional mas recomendado. Sem ele, se nenhuma condição for verdadeira, a variável cStatus permaneceria vazia.",
        "tags": [
          "Else",
          "Caso Padrão"
        ]
      },
      "30": {
        "title": "Chamada de Static Function (CalcSenioridade)",
        "desc": "Chama a função estática local passando a nota como parâmetro e recebe o nível de senioridade calculado como retorno Character.",
        "audioHint": "Static Functions ficam no mesmo arquivo PRW. Elas são invisíveis para outros fontes no RPO, evitando conflitos de nome entre diferentes arquivos compilados.",
        "tags": [
          "Chamada de Função",
          "Modularização"
        ]
      },
      "33": {
        "title": "Inserção do Cabeçalho do Relatório (aAdd)",
        "desc": "A-Add insere o texto do cabeçalho como o primeiro elemento do array. Cada chamada a A-Add adiciona uma nova linha ao final do vetor.",
        "audioHint": "A-Add é equivalente ao push de arrays em JavaScript ou ao append de listas em Python. O array cresce automaticamente sem precisar redimensionar.",
        "tags": [
          "aAdd",
          "Manipulação de Arrays"
        ]
      },
      "35": {
        "title": "Linha de Nota Formatada com Transform",
        "desc": "Insere no array a linha com a nota formatada pela máscara arroba E 99.9 no padrão brasileiro com vírgula decimal.",
        "audioHint": "Transform com a máscara arroba E sempre formata no padrão europeu-brasileiro. A máscara 99.9 admite no máximo dois dígitos inteiros e um decimal.",
        "tags": [
          "aAdd",
          "Transform",
          "Máscara"
        ]
      },
      "38": {
        "title": "Contagem Dinâmica com Len() no Array",
        "desc": "Lên retorna a quantidade de linhas inseridas até o momento no array dinâmico. Como esta é a última linha, soma 1 para refletir o total correto.",
        "audioHint": "Atenção: este Lên é chamado antes da última linha ser inserida, por isso soma 1 ao resultado para refletir o total correto incluindo esta linha.",
        "tags": [
          "Len",
          "Contagem"
        ]
      },
      "41": {
        "title": "Conversão do Vetor em Texto (VetorParaTexto)",
        "desc": "Chama a Static Function VetorParaTexto para transformar o array em uma string única com quebras de linha CRLF entre cada elemento.",
        "audioHint": "Separar a lógica de formatação em uma Static Function é uma boa prática. Ela pode ser reusada por outras funções no mesmo arquivo PRW.",
        "tags": [
          "Processamento",
          "String"
        ]
      },
      "44": {
        "title": "Exibição do Painel de Desempenho (ApMsgInfo)",
        "desc": "Desenha a janela modal do Protheus WebApp com a mensagem formatada contendo todos os dados calculados: nota, resultado e classificação.",
        "audioHint": "A-P-Msg-Info bloqueia a execução até o operador clicar em OK. Use-a para exibir relatórios e confirmações ao usuário.",
        "tags": [
          "Interface",
          "ApMsgInfo"
        ]
      },
      "46": {
        "title": "Return Nil — Encerramento da User Function",
        "desc": "Finaliza a função principal retornando Nulo. Toda memória alocada pelas variáveis Local é liberada automaticamente pelo runtime do AppServer.",
        "audioHint": "Return é obrigatório. A ausência de Return no final de uma função ADVPL pode causar comportamento imprevisível em algumas versões do compilador.",
        "tags": [
          "Return",
          "Nil"
        ]
      },
      "49": {
        "title": "Documentação ProtheusDoc da CalcSenioridade",
        "desc": "Documenta a Static Function com seu tipo, parâmetros e retorno. O campo param informa o nome, tipo e descrição de cada argumento. O campo return descreve o valor retornado.",
        "audioHint": "A diferença entre uma User Function e uma Static Function no ProtheusDoc é o campo type — Static Functions usam Static Function como valor.",
        "tags": [
          "ProtheusDoc",
          "Static Function"
        ]
      },
      "55": {
        "title": "Declaração de Static Function CalcSenioridade",
        "desc": "Uma Static Function é encapsulada e visível apenas dentro deste arquivo PRW. Recebe nPontos como parâmetro numérico e retorna o nível de senioridade como texto.",
        "audioHint": "Prefira Static Function a User Function para funções auxiliares. Se compilar dois fontes com a mesma User Function, o RPO pode ficar inconsistente.",
        "tags": [
          "Static Function",
          "Encapsulamento"
        ]
      },
      "56": {
        "title": "Variável Local da Static Function (cNivel)",
        "desc": "Variável de retorno da função, declarada no topo seguindo a regra Blocker do CodeAnalysis. Receberá o texto do nível correspondente à faixa de pontuação.",
        "audioHint": "Mesmo Static Functions devem declarar variáveis no topo. A regra SonarQube de declaração no início se aplica a todas as funções ADVPL.",
        "tags": [
          "Local",
          "Boas Práticas"
        ]
      },
      "59": {
        "title": "Estrutura de Seleção Múltipla (Do Case)",
        "desc": "Do Case avalia múltiplas alternativas exclusivas em sequência. Cada Case verifica uma condição. O Otherwise funciona como o Else — é acionado se nenhuma condição anterior for verdadeira.",
        "audioHint": "Do Case é mais legível que vários ElseIf encadeados quando há mais de 3 alternativas. Use-o para menus, classificações e tipos de registro.",
        "tags": [
          "Do Case",
          "Seleção Múltipla"
        ]
      },
      "60": {
        "title": "Case — Nível Ouro (9.0 ou mais)",
        "desc": "Primeiro Case avaliado. Pontuação maior ou igual a 9.0 classifica o desenvolvedor como Senior Specialist no nível Ouro.",
        "audioHint": "Dentro de cada Case, você pode ter múltiplas instruções. O Do Case encerra no EndCase e executa apenas o primeiro bloco Case verdadeiro.",
        "tags": [
          "Case",
          "Do Case"
        ]
      },
      "62": {
        "title": "Case — Nível Prata (7.0 a 8.9)",
        "desc": "Segundo Case avaliado apenas se o anterior foi falso. Classifica o desenvolvedor como Pleno Developer no nível Prata.",
        "audioHint": "O Do Case para de avaliar ao encontrar o primeiro Case verdadeiro. Diferente de um switch-case sem break em C ou Java, não há fall-through.",
        "tags": [
          "Case",
          "Faixa de Valores"
        ]
      },
      "64": {
        "title": "Case — Nível Bronze (5.0 a 6.9)",
        "desc": "Terceiro Case. Cobre a faixa entre 5.0 e 6.9, classificando como Junior Developer no nível Bronze.",
        "audioHint": "Esta condição só é avaliada se as duas anteriores forem falsas. A lógica de top-down é essencial para que as faixas sejam mutuamente exclusivas.",
        "tags": [
          "Case",
          "Faixa de Valores"
        ]
      },
      "66": {
        "title": "Otherwise — Nível Inicial (abaixo de 5.0)",
        "desc": "Bloco executado quando nenhum Case anterior foi verdadeiro. Classifica como Trainee qualquer pontuação abaixo de 5.0.",
        "audioHint": "Otherwise é o equivalente ao Else do If e ao Default do Switch de outras linguagens. Sempre inclua um Otherwise para cobrir casos inesperados.",
        "tags": [
          "Otherwise",
          "Caso Padrão"
        ]
      },
      "70": {
        "title": "Return cNivel — Retorno da Static Function",
        "desc": "Retorna a string de classificação para quem chamou a função. O valor é atribuído à variável cFaixa na User Function principal.",
        "audioHint": "Uma Static Function pode retornar qualquer tipo: texto, número, data, lógico ou array. O tipo de retorno deve ser declarado no ProtheusDoc para clareza.",
        "tags": [
          "Return",
          "Valor de Retorno"
        ]
      },
      "73": {
        "title": "Documentação ProtheusDoc da VetorParaTexto",
        "desc": "Documenta a terceira função do arquivo. Esta Static Function recebe um array e devolve uma string formatada com quebras de linha.",
        "audioHint": "Um único arquivo PRW pode conter múltiplas funções — uma User Function principal e várias Static Functions auxiliares para organização do código.",
        "tags": [
          "ProtheusDoc",
          "Utilitário"
        ]
      },
      "76": {
        "title": "Static Function VetorParaTexto — Iteração e Formatação",
        "desc": "Recebe um array de strings por parâmetro e itera cada elemento concatenando com CRLF para formar um texto formatado e legível.",
        "audioHint": "Esta função recebe o array por valor no ADVPL. Ela não modifica o array original — apenas lê e constrói um texto de retorno.",
        "tags": [
          "Iteração",
          "VetorParaTexto"
        ]
      },
      "80": {
        "title": "Loop For/Next Percorrendo o Array aVetor",
        "desc": "Itera de 1 até o tamanho do array, acessando aVetor de nI em cada iteração e concatenando o elemento com CRLF na variável acumuladora cTexto.",
        "audioHint": "O parâmetro aVetor recebe o array passado pela função chamadora. Len avalia dinamicamente o tamanho, então a função funciona para arrays de qualquer tamanho.",
        "tags": [
          "For/Next",
          "Len()",
          "Iteração"
        ]
      },
      "83": {
        "title": "Return cTexto — Devolve o Relatório Formatado",
        "desc": "Retorna a string completa com todas as linhas do array unidas por CRLF, pronta para ser exibida em ApMsgInfo.",
        "audioHint": "O valor de retorno é uma string única com todas as linhas do array separadas por quebra de linha. Isso é o padrão para relatórios textuais no ADVPL.",
        "tags": [
          "Return",
          "String Formatada"
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
        "audioHint": "Esta linha deve ser sempre a primeira do arquivo. O compilador precisa dela para resolver todas as constantes usadas no código.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "3": {
        "title": "ProtheusDoc — Documentação da Aula 02B",
        "desc": "Bloco de documentação oficial que descreve o objetivo da função e o domínio dos laços de repetição. O campo since indica a data de criação.",
        "audioHint": "A documentação ProtheusDoc é automaticamente indexada pelo CodeAnalysis da TOTVS e pela extensão ADVPL do VS Code para exibir tooltips.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "14": {
        "title": "User Function Aula02B — Declaração de Variáveis",
        "desc": "Todas as variáveis são declaradas no topo, antes de qualquer instrução executável. Isso é uma regra Blocker no CodeAnalysis da TOTVS.",
        "audioHint": "Se você declarar uma variável após um comando executável, o SonarQube da TOTVS vai bloquear o código. Sempre declare todas no início.",
        "tags": [
          "Local",
          "Declaração no Topo",
          "SonarQube"
        ]
      },
      "15": {
        "title": "Acumulador de Texto (cRelatorio)",
        "desc": "String vazia que acumula todo o conteúdo do relatório. Cada seção de código adiciona texto nela com o operador mais-igual.",
        "audioHint": "O operador mais-igual concatena e reatribui na mesma operação. É equivalente a escrever cRelatorio igual a cRelatorio mais o novo texto.",
        "tags": [
          "Local",
          "Acumulador",
          "Character"
        ]
      },
      "16": {
        "title": "Contador de Iteração (nContador := 0)",
        "desc": "Variável numérica usada como contador nos laços While. Inicializada com zero e reatribuída antes de cada bloco While ao longo da função.",
        "audioHint": "Inicializar nContador com zero no topo é uma boa prática. Se esquecer de reatribuir antes do loop, ele pode começar de um valor residual.",
        "tags": [
          "Local",
          "Contador",
          "While"
        ]
      },
      "17": {
        "title": "Acumulador Fatorial (nFatorial := 1)",
        "desc": "Variável que acumulará o produto do fatorial. Deve começar em 1, não em 0, pois multiplicar por 0 zeraria o resultado desde o início.",
        "audioHint": "O fatorial é calculado multiplicando números decrescentes. Começar em 1 garante que o produto inicial seja neutro sem alterar o primeiro fator.",
        "tags": [
          "Local",
          "Fatorial",
          "Acumulador"
        ]
      },
      "18": {
        "title": "Número Base do Fatorial (nNum := 7)",
        "desc": "Define o número cujo fatorial será calculado. O valor 7 foi escolhido por ser pequeno o suficiente para caber em um número inteiro ADVPL.",
        "audioHint": "Experimente alterar para 10 ou 12. Fatoriais crescem exponencialmente. Acima de 20, o resultado ultrapassa o limite numérico do ADVPL.",
        "tags": [
          "Local",
          "Fatorial",
          "Numeric"
        ]
      },
      "19": {
        "title": "Acumulador de Soma (nSoma := 0)",
        "desc": "Variável que acumulará a soma progressiva no exemplo do Do While. Inicializada com zero para garantir que a soma comece corretamente.",
        "audioHint": "Sempre inicialize acumuladores de soma com zero antes do loop. Valores residuais de execuções anteriores corromperiam o resultado.",
        "tags": [
          "Local",
          "Soma",
          "Acumulador"
        ]
      },
      "20": {
        "title": "Índice de Loop For/Next (nI := 0)",
        "desc": "Variável de controle dos laços For/Next. Inicializada com zero no topo e reatribuída automaticamente em cada iteração pelo comando Next.",
        "audioHint": "O n-I é o nome mais comum para contadores de loop no ADVPL. Declare sempre no topo porque o SonarQube bloqueia declarações após comandos executáveis.",
        "tags": [
          "Local",
          "Índice",
          "For/Next"
        ]
      },
      "22": {
        "title": "Cabeçalho do Relatório com CRLF duplo",
        "desc": "Inicia a variável cRelatorio com o título principal. O CRLF duplo no final cria uma linha em branco de separação antes do primeiro bloco de conteúdo.",
        "audioHint": "CRLF simples quebra uma linha. CRLF duplo cria uma linha em branco visível. É um padrão visual usado em praticamente todos os relatórios ADVPL.",
        "tags": [
          "CRLF",
          "Cabeçalho",
          "Formatação"
        ]
      },
      "24": {
        "title": "While / EndDo — Laço Pré-Condicional",
        "desc": "O While avalia a condição ANTES de executar o bloco. Se a condição já for falsa no início, o bloco nunca executa. Sem o incremento nContador++, seria um loop infinito.",
        "audioHint": "A principal armadilha do While é esquecer de incrementar o contador. O programa travaria o AppServer sem mensagem de erro — um bug difícil de encontrar.",
        "tags": [
          "While",
          "EndDo",
          "Loop"
        ]
      },
      "25": {
        "title": "Corpo do While — Impressão da Iteração",
        "desc": "A cada iteração, adiciona uma linha com o valor atual do contador. O nContador++ incrementa após a impressão, antes do próximo teste da condição.",
        "audioHint": "O operador mais-mais em ADVPL é o incremento unitário, equivalente a nContador igual a nContador mais 1. Use-o para manter o código limpo.",
        "tags": [
          "While",
          "Incremento",
          "nContador++"
        ]
      },
      "29": {
        "title": "Seção 2 — For / Next de 1 a 10 com Exit",
        "desc": "Inicia o laço For de 1 a 10 com uma condição de saída antecipada usando Exit. Demonstra como interromper um loop quando um critério específico é atingido.",
        "audioHint": "O For-Next garante que nI começa em 1 e vai até 10 automaticamente. O If interno verifica se é o momento de sair antes do fim natural do loop.",
        "tags": [
          "For/Next",
          "Exit",
          "Break"
        ]
      },
      "30": {
        "title": "Condição Combinada com .And. e Módulo",
        "desc": "O operador ponto And ponto combina duas condições: nI maior que 5 E nI ser múltiplo de 3. Quando ambas são verdadeiras, o Exit encerra o loop imediatamente.",
        "audioHint": "O operador módulo percentual retorna o resto da divisão. nI módulo 3 igual a zero significa que nI é divisível por 3 sem resto.",
        "tags": [
          "Exit",
          "Operador .And.",
          "Módulo"
        ]
      },
      "32": {
        "title": "Exit — Saída Imediata do For/Next",
        "desc": "Encerra o laço For imediatamente quando o critério de parada é atendido. A execução salta para a linha imediatamente após o Next correspondente.",
        "audioHint": "Use Exit para interromper um processamento quando uma condição de parada é encontrada, como um produto não encontrado ou um limite atingido.",
        "tags": [
          "For/Next",
          "Exit",
          "Break"
        ]
      },
      "37": {
        "title": "Seção 3 — For / Next com Loop (Continue)",
        "desc": "Demonstra como pular iterações específicas usando Loop. O loop itera de 1 a 10 e exibe apenas os números ímpares ignorando os pares.",
        "audioHint": "Loop é o continue do ADVPL. Quando executado, vai direto para o Next sem processar o restante do bloco da iteração atual.",
        "tags": [
          "For/Next",
          "Loop",
          "Continue"
        ]
      },
      "40": {
        "title": "Loop — Pulo da Iteração Par",
        "desc": "Se nI for par, o resto da divisão por 2 é zero e o Loop salta para o Next sem imprimir. Apenas números ímpares chegam à linha de concatenação.",
        "audioHint": "Loop é equivalente ao continue de linguagens como Python e JavaScript. Ele não encerra o loop, apenas pula o restante do bloco desta iteração.",
        "tags": [
          "Loop",
          "Continue",
          "Filtro"
        ]
      },
      "46": {
        "title": "Seção 4 — Cálculo de Fatorial com While",
        "desc": "Implementa o cálculo de fatorial com padrão acumulador. O contador decresce de nNum até 1 multiplicando o acumulador a cada passo.",
        "audioHint": "O fatorial de N é o produto de todos os inteiros de 1 até N. A forma de implementar é multiplicar N vezes N-1 vezes N-2, até chegar a 1.",
        "tags": [
          "Fatorial",
          "While",
          "Acumulador"
        ]
      },
      "47": {
        "title": "Reinicialização das Variáveis de Fatorial",
        "desc": "nFatorial é reinicializado para 1 e nContador recebe nNum antes do loop. Fundamental porque as variáveis já foram usadas nas seções anteriores da função.",
        "audioHint": "Cuidado com variáveis reusadas em múltiplos loops. Sem reinicializar, o cálculo usaria valores residuais e geraria resultados incorretos.",
        "tags": [
          "Reinicialização",
          "Fatorial",
          "While"
        ]
      },
      "49": {
        "title": "Multiplicação Acumulada (*=) e Decremento (--)",
        "desc": "O operador estrela-igual multiplica nFatorial pelo valor atual de nContador e reatribui. O traço-traço decrementa o contador para a próxima iteração.",
        "audioHint": "O operador estrela-igual é equivalente a nFatorial igual a nFatorial vezes nContador. O operador traço-traço é equivalente a nContador igual a nContador menos 1.",
        "tags": [
          "*=",
          "--",
          "Acumulador"
        ]
      },
      "53": {
        "title": "Exibição do Resultado do Fatorial",
        "desc": "Adiciona ao relatório a linha com o resultado: por exemplo, 7 fatorial igual a 5040. cValToChar converte os valores numéricos para texto antes da concatenação.",
        "audioHint": "O ponto de exclamação no texto é apenas visual para representar o símbolo matemático do fatorial. O cálculo foi feito pelo While acima.",
        "tags": [
          "Fatorial",
          "cValToChar",
          "Relatório"
        ]
      },
      "57": {
        "title": "Seção 5 — Do While Pós-Condicional",
        "desc": "Reinicializa nSoma e nContador e inicia o Do While. A condição é avaliada APÓS cada execução, garantindo pelo menos uma iteração mesmo que já falsa.",
        "audioHint": "A diferença prática do Do While: se nContador já valesse 6 no início, o bloco executaria uma vez mesmo assim. Com While comum, não executaria nenhuma.",
        "tags": [
          "Do While",
          "Pós-Condicional"
        ]
      },
      "61": {
        "title": "Soma Acumulada com Operador +=",
        "desc": "O operador mais-igual adiciona nContador a nSoma a cada iteração. O resultado cumulativo é exibido em cada linha para mostrar o progresso da soma.",
        "audioHint": "O operador mais-igual é equivalente a nSoma igual a nSoma mais nContador. Ao final das 5 iterações, nSoma conterá 1+2+3+4+5 que é igual a 15.",
        "tags": [
          "+=",
          "Soma",
          "Acumulador"
        ]
      },
      "65": {
        "title": "Exibição Final com ApMsgInfo",
        "desc": "Exibe a janela modal com todo o relatório das 5 seções de loops. O operador verá cada tipo de laço demonstrado com seu resultado.",
        "audioHint": "ApMsgInfo recebe dois parâmetros: o corpo do texto e o título da janela. O título aparece na barra azul superior da janela modal.",
        "tags": [
          "ApMsgInfo",
          "Interface",
          "Relatório"
        ]
      },
      "67": {
        "title": "Return Nil — Encerramento da Função",
        "desc": "Finaliza a função retornando Nulo e libera todas as variáveis locais da memória do AppServer automaticamente.",
        "audioHint": "Return Nil é a forma padrão de encerrar funções sem valor de retorno no ADVPL. É equivalente ao void return de linguagens como C e Java.",
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
        "audioHint": "Esta linha deve ser sempre a primeira do arquivo. O compilador precisa dela para resolver todas as constantes e funções nativas usadas no código.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "3": {
        "title": "ProtheusDoc — Documentação da Aula 03",
        "desc": "Bloco de documentação oficial que descreve o objetivo da função: manipulação de matrizes multidimensionais e strings no ADVPL.",
        "audioHint": "A documentação ProtheusDoc é indexada pelo CodeAnalysis da TOTVS para auditoria de qualidade. Sempre inclua o bloco em fontes de produção.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "10": {
        "title": "Ponto de Entrada (User Function Aula03)",
        "desc": "Declara a rotina principal executável via U_AULA03. Toda a lógica de construção da tabela em memória e geração do relatório está encapsulada aqui.",
        "audioHint": "Esta função não precisa de parâmetros porque toda a estrutura de dados é construída internamente em memória com aAdd.",
        "tags": [
          "User Function",
          "Aula03"
        ]
      },
      "12": {
        "title": "Matriz de Itens (aItens := {})",
        "desc": "Cria o array bidimensional vazio que representará a tabela de produtos em memória. Cada elemento será um sub-array com 4 colunas: Código, Descrição, Quantidade e Preço.",
        "audioHint": "O prefixo a indica Array pela notação húngara. As chaves vazias iniciam o array sem elementos. Ele crescerá com cada chamada a aAdd abaixo.",
        "tags": [
          "Local",
          "Matriz Bidimensional",
          "Array (A)"
        ]
      },
      "13": {
        "title": "Acumulador de Texto do Relatório (cRelatorio)",
        "desc": "String vazia que acumulará o texto completo do relatório formatado. Cada linha processada no loop adiciona conteúdo com o operador mais-igual.",
        "audioHint": "Inicializar com string vazia é obrigatório. Se cRelatorio for Nil quando o operador mais-igual for usado, o runtime gera erro de tipo incompatível.",
        "tags": [
          "Local",
          "Acumulador",
          "Character"
        ]
      },
      "14": {
        "title": "Acumulador Numérico de Total (nTotalGeral := 0)",
        "desc": "Variável que somará os subtotais de todos os itens do pedido. Inicializada com zero para que o primeiro item seja somado corretamente.",
        "audioHint": "Sempre inicialize acumuladores numéricos com zero. Um valor residual de execução anterior corromperia o total calculado.",
        "tags": [
          "Local",
          "Acumulador",
          "Numeric (N)"
        ]
      },
      "15": {
        "title": "Índice de Controle do Loop (nI := 0)",
        "desc": "Variável numérica de controle do laço For/Next que percorrerá cada linha da matriz. Inicializada no topo seguindo a regra Blocker do CodeAnalysis.",
        "audioHint": "Declare sempre contadores no topo da função. O SonarQube da TOTVS bloqueia qualquer declaração de variável após um comando executável.",
        "tags": [
          "Local",
          "Índice",
          "For/Next"
        ]
      },
      "16": {
        "title": "Subtotal por Item (nSubTotal := 0)",
        "desc": "Variável que receberá o produto de Quantidade vezes Preço Unitário para cada item. Reiniciada implicitamente a cada iteração do loop.",
        "audioHint": "nSubTotal é calculado dentro do loop para cada item individualmente. O acumulador nTotalGeral soma todos os subtotais ao final.",
        "tags": [
          "Local",
          "Subtotal",
          "Cálculo"
        ]
      },
      "20": {
        "title": "Montagem da Matriz com aAdd — Primeiro Item",
        "desc": "Insere o primeiro sub-array na matriz aItens. O sub-array tem 4 elementos: código PRD001, descrição do produto em minúsculo, quantidade 2 e preço unitário 250.",
        "audioHint": "Note que a descrição está propositalmente em minúsculas. Mais abaixo, o Capital e AllTrim irão normalizar o texto para exibição formatada.",
        "tags": [
          "aAdd",
          "Sub-Array",
          "Matriz"
        ]
      },
      "21": {
        "title": "aAdd — Segundo Item da Matriz (PRD002)",
        "desc": "Insere o segundo produto: mouse sem fio ergonômico, quantidade 3, preço 120.50. Os espaços no final da string de descrição serão removidos pelo AllTrim.",
        "audioHint": "A-Add sempre insere ao final do array. Após quatro chamadas, aItens terá 4 linhas. Len de aItens retornará 4.",
        "tags": [
          "aAdd",
          "Matriz Bidimensional"
        ]
      },
      "22": {
        "title": "aAdd — Terceiro Item da Matriz (PRD003)",
        "desc": "Insere o monitor ultrawide de 29 polegadas com quantidade 1 e preço 1450. É o item mais caro — afetará o total geral significativamente.",
        "audioHint": "Perceba que todos os produtos têm strings de tamanho ligeiramente diferente. O PadR na impressão vai alinhar tudo na mesma largura.",
        "tags": [
          "aAdd",
          "Matriz Bidimensional"
        ]
      },
      "23": {
        "title": "aAdd — Quarto Item da Matriz (PRD004)",
        "desc": "Insere o headset gamer surround com quantidade 2 e preço 320. Com 4 itens inseridos, a matriz está completa para processamento.",
        "audioHint": "Arrays em ADVPL podem ter quantos elementos você quiser. Não há limite fixo de tamanho — eles crescem dinamicamente na memória do AppServer.",
        "tags": [
          "aAdd",
          "Matriz Completa"
        ]
      },
      "26": {
        "title": "Cabeçalho do Relatório com PadR",
        "desc": "Monta a linha de cabeçalho com as colunas alinhadas. PadR de CODIGO com 8 garante que o texto CODIGO ocupe exatamente 8 caracteres, preenchendo com espaços.",
        "audioHint": "PadR é essencial para relatórios monoespaçados. Se o texto tiver menos caracteres que a largura, ele é preenchido com espaços à direita.",
        "tags": [
          "PadR",
          "Cabeçalho",
          "Alinhamento"
        ]
      },
      "31": {
        "title": "Linha Divisória com Replicate",
        "desc": "A função Replicate repete o caractere traço 62 vezes para criar uma linha divisória visual entre o cabeçalho e os dados do relatório.",
        "audioHint": "Replicate é muito usado em relatórios ADVPL. O primeiro parâmetro é o caractere a repetir e o segundo é quantas vezes repetir.",
        "tags": [
          "Replicate",
          "Formatação Visual"
        ]
      },
      "34": {
        "title": "Loop For / Next Percorrendo a Matriz de Itens",
        "desc": "Itera de 1 até o número de itens na matriz. Em cada iteração, nI representa o índice da linha atual — o primeiro elemento é aItens de 1.",
        "audioHint": "Len de aItens retorna 4 neste exemplo. O For vai de 1 até 4, acessando cada produto. Se adicionar mais produtos, o loop automaticamente os processa.",
        "tags": [
          "For/Next",
          "Len()",
          "Loop"
        ]
      },
      "36": {
        "title": "Cálculo do Subtotal por Linha",
        "desc": "aItens de nI de 3 acessa a coluna 3 que é a Quantidade. aItens de nI de 4 acessa a coluna 4 que é o Preço Unitário. O produto é o Subtotal do item.",
        "audioHint": "Para acessar uma matriz bidimensional use dois colchetes: o primeiro seleciona a linha e o segundo seleciona a coluna dentro daquela linha.",
        "tags": [
          "Acesso por Índice",
          "Cálculos",
          "Bidimensional"
        ]
      },
      "37": {
        "title": "Acumulação do Total Geral (+=)",
        "desc": "O operador mais-igual adiciona o subtotal do item atual ao acumulador nTotalGeral. Ao final do loop, nTotalGeral conterá a soma de todos os subtotais.",
        "audioHint": "O operador mais-igual é equivalente a nTotalGeral igual a nTotalGeral mais nSubTotal. É o padrão de acumulador mais comum no ADVPL.",
        "tags": [
          "+=",
          "Acumulador",
          "Total"
        ]
      },
      "40": {
        "title": "Código do Produto com PadR (Coluna 1)",
        "desc": "Acessa aItens de nI de 1, que é o código do produto. PadR garante que o código ocupe exatamente 8 caracteres para alinhar a coluna.",
        "audioHint": "O primeiro índice seleciona a linha atual e o segundo índice seleciona a coluna. Coluna 1 é sempre o código do produto nesta estrutura.",
        "tags": [
          "PadR",
          "Acesso Bidimensional",
          "Código"
        ]
      },
      "41": {
        "title": "Formatação do Nome com Capital e AllTrim",
        "desc": "All-Trim remove todos os espaços excedentes à esquerda e à direita. Capital transforma a primeira letra de cada palavra em maiúscula. PadR alinha o resultado em 26 caracteres.",
        "audioHint": "Combine All-Trim com Capital para normalizar textos que vêm de banco de dados em caixa baixa ou com espaços. Esta é a combinação mais comum em relatórios.",
        "tags": [
          "Capital",
          "AllTrim",
          "PadR",
          "Formatação"
        ]
      },
      "42": {
        "title": "Quantidade Formatada com StrZero",
        "desc": "StrZero converte o número para texto com zeros à esquerda. StrZero de 2 com largura 3 produz 002. Mantém o alinhamento das colunas numéricas.",
        "audioHint": "StrZero é diferente de cValToChar. StrZero sempre produz uma string de largura fixa com zeros à esquerda. Use-o para códigos e quantidades em relatórios.",
        "tags": [
          "StrZero",
          "Zeros à Esquerda",
          "Alinhamento"
        ]
      },
      "43": {
        "title": "Subtotal Formatado com Transform (@E 999,999.92)",
        "desc": "A máscara arroba E 999,999.92 formata o subtotal calculado no padrão monetário brasileiro, com vírgula como separador de milhar e ponto decimal.",
        "audioHint": "A máscara arroba E inverte os separadores para o padrão europeu-brasileiro. 999,999.92 suporta valores até noventa e nove mil com dois decimais.",
        "tags": [
          "Transform",
          "Máscara Monetária",
          "Formatação"
        ]
      },
      "47": {
        "title": "Linha Divisória do Rodapé",
        "desc": "Adiciona a linha de traços que separa visualmente os dados do rodapé. Replicate de 62 traços mantém a consistência com a linha do cabeçalho.",
        "audioHint": "Usar o mesmo número de caracteres no cabeçalho e no rodapé garante que as linhas divisórias fiquem alinhadas no relatório monoespaçado.",
        "tags": [
          "Replicate",
          "Rodapé",
          "Visual"
        ]
      },
      "48": {
        "title": "Total Geral Formatado com Transform",
        "desc": "Exibe a soma acumulada de todos os subtotais formatada como moeda brasileira. Demonstra como o padrão acumulador com += funciona em conjunto com loop.",
        "audioHint": "O acumulador nTotalGeral foi incrementado em cada iteração do loop com o operador mais-igual. Ao chegar aqui, contém a soma de todos os subtotais.",
        "tags": [
          "Transform",
          "Totalizador",
          "Resultado"
        ]
      },
      "49": {
        "title": "Quantidade de Itens com Len e cValToChar",
        "desc": "Len de aItens retorna 4 que é o número de produtos inseridos. cValToChar converte o número para texto para concatenação na string do relatório.",
        "audioHint": "Sempre use Len para contar elementos de um array dinamicamente. Nunca escreva o número fixo — se adicionar produtos, o relatório automaticamente mostrará o total correto.",
        "tags": [
          "Len",
          "cValToChar",
          "Rodapé"
        ]
      },
      "52": {
        "title": "Exibição do Relatório Final (ApMsgInfo)",
        "desc": "Exibe a janela modal do Protheus WebApp com o relatório completo formatado: cabeçalho, 4 linhas de produtos e rodapé com total.",
        "audioHint": "A-P-Msg-Info é a função de diálogo mais simples do ADVPL. Ela bloqueia a execução até o operador clicar em OK.",
        "tags": [
          "ApMsgInfo",
          "Interface",
          "Relatório"
        ]
      },
      "54": {
        "title": "Return Nil — Liberação de Memória",
        "desc": "Finaliza a função retornando Nulo. O runtime do AppServer libera automaticamente toda memória alocada para as variáveis Local declaradas no início.",
        "audioHint": "Return Nil encerra a função sem valor de retorno. Todas as variáveis Local — incluindo o array aItens e a string cRelatorio — são liberadas da memória.",
        "tags": [
          "Return",
          "Nil",
          "Memória"
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
        "audioHint": "Pense nela como uma importação de biblioteca. Sem ela, o compilador não reconhece constantes como CRLF ou funções de interface.",
        "tags": [
          "Pré-Processador",
          "Boas Práticas"
        ]
      },
      "3": {
        "title": "Documentação ProtheusDoc",
        "desc": "Padrão oficial da TOTVS para documentar funções, autores, versões e parâmetros. Gera documentação automática e auxilia o linter do VS Code.",
        "audioHint": "É obrigatório em projetos de produção. A TOTVS usa esse padrão para gerar a documentação da TDN automaticamente. O bloco começa com barra, asterisco, barra e fecha com barra, asterisco, barra.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "12": {
        "title": "Ponto de Entrada (User Function Aula04CB)",
        "desc": "Declara a função de usuário executável diretamente via U_AULA04CB pelo Protheus WebApp ou SmartClient. O sufixo 'CB' no nome indica que é a aula de Codeblocks.",
        "audioHint": "Esta aula não precisa de banco de dados — toda a matriz de produtos é construída em memória. Você pode testar sem nenhuma configuração de ambiente.",
        "tags": [
          "User Function",
          "Escopo Global"
        ]
      },
      "14": {
        "title": "Declaração da Matriz de Produtos (aProdutos)",
        "desc": "Inicia um array vazio com chaves vazias. O prefixo 'a' indica Array pela notação húngara do Protheus. Receberá os sub-arrays de produtos logo abaixo.",
        "audioHint": "Arrays em ADVPL são dinâmicos: começam vazios e crescem com a-Add. Diferente de linguagens estáticas, você não precisa declarar o tamanho inicial.",
        "tags": [
          "Array",
          "Notação Húngara (A)"
        ]
      },
      "15": {
        "title": "Variáveis de Codeblock (bFiltro e bOrdena)",
        "desc": "Inicializadas como Nil porque o bloco de código será definido apenas nas linhas onde ele é necessário. O prefixo 'b' é obrigatório pela notação húngara para Codeblocks.",
        "audioHint": "Codeblocks são um tipo primitivo no ADVPL — podem ser atribuídos a variáveis, passados como parâmetros e avaliados com Eval. São como funções anônimas do JavaScript ou lambdas do Python.",
        "tags": [
          "Codeblock (B)",
          "Notação Húngara"
        ]
      },
      "16": {
        "title": "Variável de Posição (nPosBusca)",
        "desc": "Armazenará o índice retornado por aScan. Quando aScan encontra o item, retorna o número da linha na matriz — se não encontrar, retorna zero.",
        "audioHint": "Sempre inicialize variáveis numéricas com zero. O valor zero aqui funciona como o equivalente a 'não encontrado' — uma convenção importante do ADVPL.",
        "tags": [
          "Numeric (N)",
          "aScan"
        ]
      },
      "23": {
        "title": "Construção da Matriz de Produtos com aAdd",
        "desc": "Cada chamada a-Add insere um sub-array de 4 colunas: Código, Descrição, Categoria e Preço. O resultado é uma tabela bidimensional totalmente em memória.",
        "audioHint": "Note que a ordem de inserção está propositalmente fora de sequência — PRD003, PRD001, PRD004. O aSort que aplicaremos a seguir vai reorganizar tudo pelo preço.",
        "tags": [
          "aAdd",
          "Matriz Bidimensional"
        ]
      },
      "31": {
        "title": "Definição do Codeblock de Ordenação ({ |x, y| x[4] > y[4] })",
        "desc": "O Codeblock bOrdena recebe dois elementos da matriz — x e y — e retorna verdadeiro se o preço de x for maior que o de y. Isso define a ordem decrescente.",
        "audioHint": "A sintaxe completa é: chave abre, barra vertical, lista de parâmetros, barra vertical, expressão, chave fecha. Este bloco é chamado repetidamente pelo aSort para comparar pares de elementos.",
        "tags": [
          "Codeblock",
          "Ordenação Decrescente"
        ]
      },
      "34": {
        "title": "Ordenação In-Place da Matriz (aSort)",
        "desc": "A-Sort reorganiza os 5 produtos da matriz usando o Codeblock bOrdena como critério de comparação. Após esta linha, a matriz está ordenada do produto mais caro para o mais barato.",
        "audioHint": "A-Sort modifica o array original diretamente na memória — é uma operação in-place. Os quatro parâmetros são: array, início, fim e Codeblock de comparação. Os dois do meio ficam vazios para ordenar o array inteiro.",
        "tags": [
          "aSort",
          "In-place",
          "Alta Performance"
        ]
      },
      "42": {
        "title": "Loop de Impressão do Relatório (For / Next)",
        "desc": "Percorre cada linha da matriz já ordenada, de 1 até o tamanho total. Em cada iteração, formata e concatena os dados do produto na string do relatório.",
        "audioHint": "A função Len retorna o tamanho atual do array. Como o array tem 5 produtos, o loop executará 5 vezes, gerando uma linha de texto formatado por produto.",
        "tags": [
          "For/Next",
          "Len()",
          "Loop"
        ]
      },
      "46": {
        "title": "Formatação Monetária com Transform na Matriz",
        "desc": "A máscara arroba E 9,999.92 formata o preço do produto no padrão brasileiro. O acesso aProdutos de N-I de 4 lê a quarta coluna — o preço — da linha atual.",
        "audioHint": "O índice duplo de colchetes é o acesso bidimensional: o primeiro colchete seleciona a linha e o segundo seleciona a coluna dentro daquela linha.",
        "tags": [
          "Transform",
          "Acesso Bidimensional"
        ]
      },
      "51": {
        "title": "Codeblock de Filtro para aScan ({ |x| x[1] == 'PRD001' })",
        "desc": "Define o critério de busca: avalia cada linha da matriz e retorna verdadeiro quando o código na coluna 1 for exatamente 'PRD001'. O operador de duplo igual é comparação estrita.",
        "audioHint": "Note a diferença: bOrdena recebe dois parâmetros x e y para comparação entre pares. O bFiltro recebe apenas um parâmetro x para avaliar cada elemento individualmente.",
        "tags": [
          "Codeblock",
          "Filtro",
          "aScan"
        ]
      },
      "52": {
        "title": "Execução da Busca (aScan com Codeblock)",
        "desc": "A-Scan percorre a matriz avaliando bFiltro em cada linha até encontrar a condição verdadeira. Retorna o índice da linha encontrada ou zero se nenhuma satisfazer a condição.",
        "audioHint": "A-Scan é eficiente para buscas simples em arrays de tamanho moderado. Para arrays muito grandes ou buscas frequentes, considere usar uma chave de hash ou tabela de banco de dados.",
        "tags": [
          "aScan",
          "Busca em Memória"
        ]
      },
      "57": {
        "title": "Validação do Resultado da Busca (If nPosBusca > 0)",
        "desc": "Se a-Scan retornou um índice maior que zero, o produto foi encontrado. O índice é usado diretamente para acessar os campos da linha na matriz já ordenada.",
        "audioHint": "Atenção importante: como a-Sort reorganizou o array, a posição retornada por a-Scan refere-se à posição atual na matriz ORDENADA — não à posição original de inserção.",
        "tags": [
          "If/Else",
          "Validação",
          "Índice"
        ]
      },
      "67": {
        "title": "Exibição do Relatório Final (ApMsgInfo)",
        "desc": "Exibe a janela modal com o relatório completo: produtos ordenados por preço e o resultado da busca por código. Toda a lógica foi executada em memória, sem nenhuma query SQL.",
        "audioHint": "Matrizes em memória são mais rápidas que consultas SQL para volumes pequenos de dados. Para centenas de milhares de registros, prefira sempre o SQL com TCQuery.",
        "tags": [
          "Interface Gráfica",
          "ApMsgInfo"
        ]
      },
      "69": {
        "title": "Retorno da Função (Return Nil)",
        "desc": "Encerra a execução da rotina retornando Nulo. Toda variável Local declarada no início é automaticamente liberada da memória do AppServer.",
        "audioHint": "Return Nil é o encerramento padrão de funções que não precisam retornar valor. Após esta linha, o AppServer libera o stack frame da função e os recursos de memória associados.",
        "tags": [
          "Return",
          "Nil",
          "Liberação de Memória"
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
        "audioHint": "Sem o Include, constantes como CLR_BLUE e funções como A-P-Msg-Info não são reconhecidas. Em fontes com interface gráfica, o Include é ainda mais crítico.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "3": {
        "title": "ProtheusDoc — Documentação da Aula 05",
        "desc": "Documenta a função de interface gráfica com tipo, autor, data e versão. O objetivo é criar uma janela de calculadora comercial interativa com campos editáveis e botões.",
        "audioHint": "A documentação ProtheusDoc é indexada pelo CodeAnalysis da TOTVS e pela extensão ADVPL do VS Code para exibir tooltips durante o desenvolvimento.",
        "tags": [
          "ProtheusDoc",
          "Clean Code"
        ]
      },
      "10": {
        "title": "Ponto de Entrada (User Function Aula05)",
        "desc": "Declara a função principal executável via U_AULA05. Esta função cria uma janela de formulário real que o operador pode interagir com campos editáveis e botões.",
        "audioHint": "Esta função cria uma janela de formulário real — não é apenas uma mensagem. O operador pode digitar valores e clicar nos botões.",
        "tags": [
          "User Function",
          "U_AULA05"
        ]
      },
      "11": {
        "title": "Objeto da Janela Principal (oDlg := Nil)",
        "desc": "Variável de objeto que receberá a referência da janela MSDialog. O prefixo o indica Object pela notação húngara. Inicializada com Nil antes do DEFINE.",
        "audioHint": "Em ADVPL orientado a objetos, o prefixo o indica uma instância de classe. oDlg será o objeto da janela — você pode chamar métodos nele como oDlg dois pontos End.",
        "tags": [
          "Local",
          "Objeto (O)",
          "MSDialog"
        ]
      },
      "12": {
        "title": "Objeto do Campo de Valor (oGetVal := Nil)",
        "desc": "Receberá a referência do campo MSGET vinculado ao valor da venda. Necessário para acessar o campo programaticamente após criá-lo na tela.",
        "audioHint": "Manter referência ao objeto do campo permite ler ou alterar seu valor posteriormente no código, como ao atualizar a tela após um cálculo.",
        "tags": [
          "Local",
          "Objeto MSGET",
          "Referência"
        ]
      },
      "13": {
        "title": "Objeto do Campo de Desconto (oGetDesc := Nil)",
        "desc": "Receberá a referência do campo MSGET vinculado ao percentual de desconto. Permite acesso programático ao campo de desconto após criação na tela.",
        "audioHint": "Cada componente visual criado com BUTTON, MSGET ou SAY pode ter sua referência armazenada numa variável de objeto para manipulação posterior.",
        "tags": [
          "Local",
          "Objeto MSGET",
          "Desconto"
        ]
      },
      "14": {
        "title": "Objeto do Label de Total (oSayTotal := Nil)",
        "desc": "Receberá a referência do TSay que exibirá o total calculado. Ao clicar em Calcular, o código chamará oSayTotal dois pontos SetText para atualizar o texto na tela.",
        "audioHint": "Este é o componente que será atualizado dinamicamente. SetText é o método que muda o texto exibido num TSay sem fechar e reabrir a janela.",
        "tags": [
          "Local",
          "Objeto TSay",
          "SetText"
        ]
      },
      "15": {
        "title": "Objeto do Botão Calcular (oBtnCalc := Nil)",
        "desc": "Receberá a referência do botão Calcular. Armazenar a referência permite habilitar ou desabilitar o botão programaticamente durante a execução.",
        "audioHint": "Embora neste exemplo não manipulemos o botão após criá-lo, guardar a referência é uma boa prática para validações futuras como oBtnCalc dois pontos Disable.",
        "tags": [
          "Local",
          "Objeto TButton",
          "Referência"
        ]
      },
      "16": {
        "title": "Objeto do Botão Fechar (oBtnSair := Nil)",
        "desc": "Receberá a referência do botão Fechar. Ao ser clicado, executará oDlg dois pontos End que fecha a janela e libera o contexto.",
        "audioHint": "Sempre forneça ao operador um caminho claro para fechar a janela. Uma janela sem botão de fechar força o operador a usar Alt+F4, o que pode gerar comportamento inesperado.",
        "tags": [
          "Local",
          "Objeto TButton",
          "Fechar"
        ]
      },
      "17": {
        "title": "Valor Inicial da Venda (nVlrVenda := 1500.00)",
        "desc": "Define o valor padrão exibido no campo de venda ao abrir a janela. O operador pode alterar este valor antes de calcular.",
        "audioHint": "Valores padrão bem escolhidos facilitam o uso do formulário. O operador vê um exemplo real e pode ajustá-lo rapidamente.",
        "tags": [
          "Local",
          "Numeric (N)",
          "Valor Padrão"
        ]
      },
      "18": {
        "title": "Percentual de Desconto Inicial (nPercDesc := 10.00)",
        "desc": "Define 10% como desconto padrão no campo de desconto. O campo MSGET vinculado a esta variável exibirá 10,00 quando a janela abrir.",
        "audioHint": "Dados de um campo MSGET são vinculados bidirecionalmente: o operador edita o campo e a variável é atualizada. A variável muda e o campo reflete.",
        "tags": [
          "Local",
          "Numeric (N)",
          "Desconto"
        ]
      },
      "19": {
        "title": "Texto Inicial do Total (cTotalTxt)",
        "desc": "Inicializa a string que exibirá o total calculado. O valor pré-calculado de R$ 1.350,00 representa 1500 menos 10% de desconto.",
        "audioHint": "Este texto inicial é exibido quando a janela abre, antes de qualquer clique no botão Calcular. É um valor ilustrativo para mostrar o formato esperado.",
        "tags": [
          "Local",
          "Character (C)",
          "Total"
        ]
      },
      "22": {
        "title": "Criação da Janela Modal (DEFINE MSDIALOG)",
        "desc": "Define a janela flutuante com título e dimensões em PIXEL. FROM 000,000 é o canto superior esquerdo e TO 260,420 é o canto inferior direito.",
        "audioHint": "A janela M-S-Dialog é modal — bloqueia o restante da tela enquanto está aberta. O operador deve fechar ela antes de continuar usando o ERP.",
        "tags": [
          "MSDialog",
          "Janela Modal",
          "Pixel"
        ]
      },
      "25": {
        "title": "Rótulo Fixo do Campo de Valor (TSay)",
        "desc": "O comando arroba linha, coluna, SAY posiciona o texto Valor da Venda na coordenada 20,20 em pixels. É um label estático não editável.",
        "audioHint": "T-Say é um label estático. Use sempre coordenadas em PIXEL para precisão. As coordenadas são Linha, Coluna — diferente do que muitos esperam.",
        "tags": [
          "TSay",
          "Rótulo",
          "Label"
        ]
      },
      "26": {
        "title": "Campo Editável do Valor da Venda (MSGET)",
        "desc": "Cria a caixa de texto vinculada à variável nVlrVenda com máscara monetária. O operador digita o valor e o MSGET converte automaticamente conforme a máscara.",
        "audioHint": "M-S-Get faz data-binding bidirecional: quando o operador altera o campo, a variável nVlrVenda é atualizada. É o campo editável mais usado em formulários ADVPL.",
        "tags": [
          "MSGET",
          "Data-binding",
          "Máscara"
        ]
      },
      "28": {
        "title": "Rótulo do Campo de Desconto (TSay)",
        "desc": "Posiciona o rótulo Desconto Comercial na coordenada 45,20. Alinhado verticalmente com o campo MSGET do desconto que aparece na linha 43.",
        "audioHint": "Coordenadas ligeiramente diferentes entre o SAY e o MSGET causam o alinhamento vertical adequado. Experimente ajustar os valores para ver o efeito visual.",
        "tags": [
          "TSay",
          "Rótulo",
          "Alinhamento"
        ]
      },
      "29": {
        "title": "Campo Editável do Percentual de Desconto (MSGET)",
        "desc": "Cria o campo de percentual com máscara arroba E 99.99 que admite até dois dígitos inteiros e dois decimais. Vinculado à variável nPercDesc.",
        "audioHint": "A máscara arroba E 99.99 formata o número com vírgula decimal no padrão brasileiro. O operador pode digitar de 0 a 99.99 por cento.",
        "tags": [
          "MSGET",
          "Máscara",
          "Percentual"
        ]
      },
      "32": {
        "title": "Linha Divisória Visual (LABEL vazio)",
        "desc": "Cria uma linha de separação visual horizontal entre a seção de entrada e a seção de exibição do resultado. Ocupa uma faixa de 1 pixel de altura.",
        "audioHint": "O LABEL vazio com coordenadas TO cria uma linha divisória. É um truque visual simples para organizar visualmente as seções do formulário.",
        "tags": [
          "LABEL",
          "Separador Visual"
        ]
      },
      "35": {
        "title": "Rótulo do Total Líquido (TSay fixo)",
        "desc": "Exibe o texto fixo Total Liquido a Pagar na posição 80,20. Este rótulo não muda durante a execução.",
        "audioHint": "Use SAY sem referência quando o texto é fixo e nunca precisa ser alterado. Use SAY com referência quando precisar chamar SetText para atualizar o texto.",
        "tags": [
          "TSay",
          "Rótulo Fixo"
        ]
      },
      "36": {
        "title": "TSay Dinâmico para o Resultado (oSayTotal)",
        "desc": "Cria o label colorido em azul que exibirá o total calculado. A referência oSayTotal permite atualizar o texto ao clicar em Calcular com SetText.",
        "audioHint": "Este SAY tem referência oSayTotal e recebe PROMPT cTotalTxt. Quando o botão Calcular for clicado, o código chamará oSayTotal dois pontos SetText com o novo valor.",
        "tags": [
          "TSay Dinâmico",
          "SetText",
          "CLR_BLUE"
        ]
      },
      "39": {
        "title": "Botão Calcular com ACTION (TButton)",
        "desc": "Cria o botão Calcular na posição 105,40 e associa um Codeblock de ação. Ao clicar, CalcTotal calcula o desconto e SetText atualiza o label na tela.",
        "audioHint": "O bloco ACTION é um Codeblock executado ao clicar. As ações separadas por vírgula executam sequencialmente: primeiro calcula, depois atualiza o label.",
        "tags": [
          "TButton",
          "ACTION",
          "Eventos"
        ]
      },
      "42": {
        "title": "Botão Fechar com oDlg:End() (TButton)",
        "desc": "Cria o botão Fechar que, ao ser clicado, chama o método End do objeto da janela oDlg. End encerra o ACTIVATE MSDIALOG e retorna o fluxo ao Return Nil.",
        "audioHint": "O método dois pontos End é o equivalente ao Close de outras linguagens. Ele fecha a janela graciosamente sem forçar encerramento.",
        "tags": [
          "TButton",
          "oDlg:End()",
          "Fechar"
        ]
      },
      "46": {
        "title": "Ativação e Exibição da Janela (ACTIVATE MSDIALOG CENTERED)",
        "desc": "Abre a janela no centro exato da tela do usuário. A execução fica bloqueada aqui até o operador clicar em Fechar ou o oDlg:End() ser chamado.",
        "audioHint": "O CENTERED é opcional mas muito recomendado. Sem ele, a janela aparece na posição FROM definida no DEFINE, que costuma ser 0,0 — canto superior esquerdo.",
        "tags": [
          "Activate",
          "Centered",
          "Bloqueante"
        ]
      },
      "48": {
        "title": "Return Nil da User Function",
        "desc": "Executado após o operador fechar a janela. Libera todas as variáveis de objeto e locais da memória do AppServer.",
        "audioHint": "Após o oDlg dois pontos End ser chamado, o ACTIVATE MSDIALOG retorna e a execução chega ao Return Nil. Os objetos são liberados automaticamente.",
        "tags": [
          "Return",
          "Nil",
          "Liberação"
        ]
      },
      "50": {
        "title": "ProtheusDoc da CalcTotal",
        "desc": "Documenta a Static Function de cálculo. Recebe o valor e o percentual de desconto e retorna a string formatada do total líquido.",
        "audioHint": "Uma Static Function só é visível dentro do mesmo arquivo PRW. Isso evita conflitos de nome com outras funções CalcTotal em outros arquivos do RPO.",
        "tags": [
          "ProtheusDoc",
          "Static Function"
        ]
      },
      "53": {
        "title": "Static Function CalcTotal — Cálculo do Desconto",
        "desc": "Recebe nVlr e nDesc, calcula o total líquido com a fórmula nVlr vezes 1 menos nDesc dividido por 100, e retorna a string formatada.",
        "audioHint": "A fórmula 1 menos percentual dividido por 100 é o fator de desconto. Para 10%, o fator é 0.9, multiplicando por 1500 resulta em 1350.",
        "tags": [
          "Static Function",
          "Cálculo",
          "Desconto"
        ]
      },
      "54": {
        "title": "Cálculo e Formatação do Total Líquido",
        "desc": "Calcula nTotalLiquido numa única linha e já retorna o resultado formatado como string monetária. Combina eficiência e clareza.",
        "audioHint": "A máscara arroba E 999,999.92 formata o resultado no padrão brasileiro. A concatenação com R$ garante que o texto final seja legível para o operador.",
        "tags": [
          "Transform",
          "Cálculo Inline",
          "Return"
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
        "audioHint": "Este include deve vir sempre antes do TopConn. A ordem importa: o compilador processa as diretivas de cima para baixo.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "2": {
        "title": "Cabeçalho TopConnect (#Include 'TopConn.ch')",
        "desc": "Define os comandos essenciais como TCQuery e funções de abstração de banco de dados relacionais. Obrigatório para qualquer rotina que use SQL direto.",
        "audioHint": "TopConn.ch é diferente do Totvs.ch. O Include do TopConn define o comando T-C-Query que você usará para executar SQL no banco do Protheus.",
        "tags": [
          "TopConnect",
          "TopConn.ch"
        ]
      },
      "4": {
        "title": "ProtheusDoc — Documentação da Aula 06",
        "desc": "Documenta a função de banco de dados com tipo, autor, versão e link de referência para a TDN. O campo @see aponta para a documentação oficial do TCQuery.",
        "audioHint": "O campo @see no ProtheusDoc cria um link para a documentação. A extensão ADVPL do VS Code usa esse campo para fornecer acesso rápido à TDN.",
        "tags": [
          "ProtheusDoc",
          "TDN",
          "@see"
        ]
      },
      "14": {
        "title": "User Function Aula06 — Declaração de Variáveis",
        "desc": "Todas as variáveis são declaradas no início da função seguindo a regra Blocker do CodeAnalysis. Inclui variáveis para query, contexto, controle e mensagem.",
        "audioHint": "A regra de declaração no topo é Blocker no SonarQube TOTVS. Se você declarar uma variável após um comando executável, o código não passa na auditoria de qualidade.",
        "tags": [
          "Local",
          "Declaração no Topo",
          "SonarQube"
        ]
      },
      "21": {
        "title": "Verificação de Contexto (lAmbienteOk)",
        "desc": "Verifica se a empresa e filial já estão carregadas no contexto antes de tentar acessar o banco. Usar RpcSetEnv em rotina interativa destruiria a sessão do operador.",
        "audioHint": "Esta verificação é a diferença entre uma rotina robusta e uma que quebra o ERP. Nunca chame R-P-C-Set-Env em rotinas de SmartClient ou WebApp interativo.",
        "tags": [
          "RpcSetEnv",
          "Ambiente",
          "SmartClient"
        ]
      },
      "24": {
        "title": "Verificação de Ambiente Carregado",
        "desc": "Se lAmbienteOk for falso, o ambiente não está pronto. A mensagem de erro explica ao operador o porquê sem tentar acessar o banco, o que evitaria um crash.",
        "audioHint": "Fail fast é um princípio de engenharia: detectar o problema cedo, informar claramente e encerrar sem danos é melhor do que continuar e corromper dados.",
        "tags": [
          "Validação",
          "Fail Fast",
          "Ambiente"
        ]
      },
      "27": {
        "title": "Begin Sequence — Proteção de Código Crítico",
        "desc": "Inicia um bloco de código protegido. Se qualquer instrução dentro causar exceção, o fluxo salta para o bloco Recover, evitando crash do AppServer.",
        "audioHint": "Begin Sequence e Recover funcionam como o try-catch de outras linguagens. O AppServer ADVPL pode lançar exceções ao tentar conectar no DBAccess ou executar SQL inválido.",
        "tags": [
          "Begin Sequence",
          "Tratamento de Exceção"
        ]
      },
      "28": {
        "title": "ErrorBlock — Captura de Erros em Runtime",
        "desc": "Define um bloco de código que será chamado em caso de erro de runtime, substituindo o ErrorBlock padrão do Protheus temporariamente.",
        "audioHint": "O ErrorBlock deve ser restaurado ao final com ErrorBlock passando o bError original. Sem restaurar, erros subsequentes na sessão teriam comportamento inesperado.",
        "tags": [
          "ErrorBlock",
          "Exceção",
          "Runtime"
        ]
      },
      "31": {
        "title": "Fechamento Preventivo de Área (DbCloseArea)",
        "desc": "Se a área QRY_CLI já estiver aberta de uma execução anterior, ela é fechada para evitar conflito de alias no TopConnect.",
        "audioHint": "Um alias duplicado causaria erro de execução. O fechamento preventivo garante que a área esteja limpa antes de uma nova query.",
        "tags": [
          "DbCloseArea",
          "Boas Práticas",
          "Alias"
        ]
      },
      "35": {
        "title": "SELECT Seguro — Sem SELECT *",
        "desc": "A query seleciona apenas os campos necessários: código, nome, município e estado. Evitar SELECT * reduz o tráfego de rede entre AppServer e DBAccess.",
        "audioHint": "A TOTVS proíbe SELECT estrela em produção. Selecionar apenas os campos necessários é obrigatório para auditoria de qualidade e performance.",
        "tags": [
          "SELECT",
          "Performance",
          "Boas Práticas"
        ]
      },
      "37": {
        "title": "Resolução de Tabela Física (RetSqlName)",
        "desc": "O Protheus armazena tabelas com o código da empresa concatenado, como S-A-1-0-1-0. Ret-S-Q-L-Name consulta o dicionário S-X-2 e retorna o nome real dinamicamente.",
        "audioHint": "NUNCA escreva SA1010 diretamente na query. O nome físico muda com a empresa. Ret-S-Q-L-Name garante que a query funcione em qualquer empresa.",
        "tags": [
          "RetSqlName",
          "SX2",
          "Dicionário"
        ]
      },
      "38": {
        "title": "Filtro de Deleção Lógica (D_E_L_E_T_)",
        "desc": "No Protheus, registros excluídos permanecem no banco marcados com asterisco. Apenas registros com espaço em branco na coluna D_E_L_E_T_ são considerados ativos.",
        "audioHint": "Se você esquecer o filtro de deleção lógica, sua query retornará registros apagados junto com os ativos — um bug grave em produção.",
        "tags": [
          "D_E_L_E_T_",
          "Deleção Lógica"
        ]
      },
      "39": {
        "title": "ORDER BY — Ordenação dos Resultados",
        "desc": "Ordena o resultado pelo código do cliente em ordem crescente. Ordenar no banco é sempre mais eficiente do que ordenar no AppServer com aSort.",
        "audioHint": "Prefira ORDER BY no SQL a usar aSort no ADVPL quando trabalhar com TCQuery. O banco de dados é otimizado para ordenação — muito mais rápido para grandes volumes.",
        "tags": [
          "ORDER BY",
          "SQL",
          "Performance"
        ]
      },
      "42": {
        "title": "Padronização Multi-Banco (ChangeQuery)",
        "desc": "Traduz instruções SQL padrão ANSI para as peculiaridades do banco em uso — Oracle, SQL Server ou PostgreSQL — tratando datas, funções e concatenações.",
        "audioHint": "Change-Query é obrigatório para portabilidade. Um cliente pode mudar de SQL Server para Oracle. Sem Change-Query, a query quebraria.",
        "tags": [
          "ChangeQuery",
          "Portabilidade"
        ]
      },
      "45": {
        "title": "Execução da Query (TCQuery New Alias)",
        "desc": "Executa a instrução SQL no banco via DBAccess e monta um cursor temporário na memória do AppServer sob o alias QRY_CLI especificado.",
        "audioHint": "T-C-Query é diferente de um Select direto. Ele cria uma área de trabalho navegável, igual a uma tabela ISAM, onde você usa D-B-Skip e Eof para navegar.",
        "tags": [
          "TCQuery",
          "Cursor",
          "SQL"
        ]
      },
      "49": {
        "title": "Teste de Fim de Arquivo (Eof) — Tabela Vazia",
        "desc": "Se E-O-F for verdadeiro imediatamente após abrir a área, a tabela está vazia ou nenhum registro atendeu à cláusula WHERE. Exibe mensagem específica.",
        "audioHint": "Sempre teste Eof antes de entrar no loop. Se pular esta verificação e a tabela estiver vazia, o loop While nunca executaria mas seria um código frágil.",
        "tags": [
          "Eof()",
          "Tratamento",
          "Tabela Vazia"
        ]
      },
      "52": {
        "title": "Mensagem de Tabela Vazia com Query Exibida",
        "desc": "Quando a tabela está vazia, exibe a empresa, filial e o SQL executado. Isso auxilia no diagnóstico: o operador pode copiar a query e executar manualmente no banco.",
        "audioHint": "Exibir a query na mensagem de erro é uma boa prática de diagnóstico. Em produção, você pode registrar isso no log em vez de exibir ao operador.",
        "tags": [
          "Diagnóstico",
          "Mensagem",
          "Depuração"
        ]
      },
      "61": {
        "title": "Navegação em Loop com While !Eof()",
        "desc": "Percorre linha por linha do resultado enquanto não atingir o final do cursor. O nTotalLido conta todos os registros, mesmo os não exibidos.",
        "audioHint": "O exclamação antes do E-O-F é a negação lógica: While o arquivo não chegou ao fim, processe. Sem o D-B-Skip dentro, seria um loop infinito.",
        "tags": [
          "While",
          "Cursor",
          "Navegação"
        ]
      },
      "63": {
        "title": "Leitura de Campo com Alias Direto (->)",
        "desc": "O operador seta acessa o campo do cursor pelo alias. QRY_CLI seta A1_COD lê o campo A1_COD da linha atual do cursor QRY_CLI.",
        "audioHint": "Em cursores criados por TCQuery, o alias é estático — você definiu como Q-R-Y-underscore-C-L-I. Acesse campos com esse alias usando o operador seta.",
        "tags": [
          "Alias",
          "->",
          "TCQuery"
        ]
      },
      "64": {
        "title": "SubStr — Truncagem do Nome do Cliente",
        "desc": "SubStr corta a string a partir do caractere 1 até o máximo de 28 caracteres. Evita que nomes longos quebrem a formatação tabular do relatório.",
        "audioHint": "SubStr recebe três parâmetros: a string, o início e o comprimento máximo. Aqui garante que nenhum nome de cliente ultrapasse 28 caracteres na coluna.",
        "tags": [
          "SubStr",
          "Truncagem",
          "Formatação"
        ]
      },
      "73": {
        "title": "Avanço de Registro (DbSkip) — Obrigatório!",
        "desc": "Move o ponteiro do cursor para o próximo registro retornado. Sem D-B-Skip, o programa entraria em loop infinito lendo sempre o primeiro registro.",
        "audioHint": "D-B-Skip é obrigatório dentro do While. Esquecer ele é o erro mais comum de iniciantes em ADVPL com banco de dados e causa travamento do AppServer.",
        "tags": [
          "DbSkip",
          "Ponteiro",
          "Loop"
        ]
      },
      "78": {
        "title": "Total de Registros com cValToChar",
        "desc": "Adiciona ao rodapé o total de registros lidos, convertendo o número para texto com cValToChar. Inclui todos os registros, não apenas os 10 exibidos.",
        "audioHint": "cValToChar converte qualquer tipo para texto. Para números, é equivalente ao Str mas sem formatação fixa de largura.",
        "tags": [
          "cValToChar",
          "Rodapé",
          "Totalizador"
        ]
      },
      "81": {
        "title": "Fechamento Obrigatório da Área de Trabalho",
        "desc": "Regra de ouro do Protheus: sempre fechar áreas de TCQuery após o uso. Cada área aberta consome uma conexão no DBAccess. Não fechar causa memory leak.",
        "audioHint": "Cada área aberta consome conexão no DBAccess. Se não fechar, o servidor eventualmente fica sem conexões disponíveis e começa a negar acesso a outros usuários.",
        "tags": [
          "Clean Code",
          "DbCloseArea",
          "Memory Leak"
        ]
      },
      "83": {
        "title": "ApMsgInfo — Exibição do Relatório de Clientes",
        "desc": "Exibe a janela modal com o relatório completo de clientes. O segundo parâmetro é o título que aparece na barra azul da janela.",
        "audioHint": "A-P-Msg-Info é segura para rotinas interativas. O operador verá o relatório formatado com cabeçalho, dados e rodapé com o total de registros.",
        "tags": [
          "ApMsgInfo",
          "Interface",
          "Relatório"
        ]
      },
      "86": {
        "title": "Bloco Recover — Tratamento de Falha no Banco",
        "desc": "Executado quando qualquer instrução dentro do Begin Sequence lançar uma exceção. Fecha a área QRY_CLI se estiver aberta e exibe mensagem de erro.",
        "audioHint": "O Recover funciona como o catch. Se o TCQuery falhar por problema de conexão com o DBAccess, o Recover garante que a área seja fechada e o operador seja informado.",
        "tags": [
          "Recover",
          "Exceção",
          "Tratamento de Erro"
        ]
      },
      "90": {
        "title": "ApMsgStop — Mensagem de Erro Bloqueante",
        "desc": "Exibe uma janela modal com ícone de erro e botão OK para erros críticos. É a versão vermelha do ApMsgInfo, usada para situações de falha.",
        "audioHint": "Use A-P-Msg-Stop para erros que impedem a continuação. Diferente de A-P-Msg-Info que tem ícone azul informativo, A-P-Msg-Stop tem ícone vermelho de erro.",
        "tags": [
          "ApMsgStop",
          "Erro",
          "Interface"
        ]
      },
      "93": {
        "title": "Restauração do ErrorBlock Original",
        "desc": "Restaura o ErrorBlock padrão do Protheus que foi substituído no início. Sempre restaure o ErrorBlock ao final para não alterar o comportamento global da sessão.",
        "audioHint": "O ErrorBlock é global na sessão ADVPL. Se você substituir e não restaurar, todos os erros posteriores na sessão teriam o comportamento do seu ErrorBlock.",
        "tags": [
          "ErrorBlock",
          "Restauração",
          "Sessão"
        ]
      },
      "95": {
        "title": "Return Nil — Encerramento da Aula 06",
        "desc": "Finaliza a função retornando Nulo. Todas as variáveis locais são liberadas da memória do AppServer automaticamente.",
        "audioHint": "Return Nil encerra a função sem valor de retorno. A área QRY_CLI já foi fechada antes — o Return Nil é a última instrução de limpeza.",
        "tags": [
          "Return",
          "Nil",
          "Encerramento"
        ]
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
        "title": "Diretiva #Include Totvs.ch",
        "desc": "Importa as constantes fundamentais do Protheus. Obrigatório em qualquer fonte ADVPL, mesmo em Pontos de Entrada que não usam interface gráfica.",
        "audioHint": "O Totvs.ch deve vir sempre antes do FWMVCDef. A ordem dos Includes importa — o compilador processa de cima para baixo.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "2": {
        "title": "#Include FWMVCDef.ch — Framework MVC",
        "desc": "Cabeçalho necessário para rotinas que interagem com pontos de entrada do framework MVC do Protheus. Define constantes e macros do modelo MVC.",
        "audioHint": "F-W-M-V-C-Def define constantes e macros do framework de MVC da TOTVS. Muitos Pontos de Entrada modernos precisam deste include para interagir com o MVC.",
        "tags": [
          "Include",
          "FWMVCDef",
          "Framework"
        ]
      },
      "4": {
        "title": "ProtheusDoc — Documentação da Aula 07",
        "desc": "Documenta a função educacional sobre Pontos de Entrada com tipo, autor, data e link para a TDN. O campo @see aponta para a documentação oficial de Pontos de Entrada.",
        "audioHint": "O campo @see é especialmente útil em Pontos de Entrada porque a TDN documenta cada PE com seus parâmetros, retorno e momento de execução.",
        "tags": [
          "ProtheusDoc",
          "Pontos de Entrada",
          "@see"
        ]
      },
      "17": {
        "title": "User Function Aula07 — Função de Demonstração",
        "desc": "Função educacional executável via U_AULA07. Explica o conceito de Pontos de Entrada exibindo uma janela informativa dentro do SmartClient.",
        "audioHint": "Esta função é apenas para aprendizado. O Ponto de Entrada real é a função M-T-410-OK, que vem logo abaixo neste mesmo arquivo.",
        "tags": [
          "User Function",
          "Pedagógico"
        ]
      },
      "18": {
        "title": "Variáveis da Função Educacional",
        "desc": "cMensagem acumulará o texto explicativo e cTitulo define o título da janela. Ambas declaradas no topo seguindo a regra Blocker do CodeAnalysis.",
        "audioHint": "Mesmo funções educacionais simples devem seguir as regras. Declare todas as variáveis no topo antes de qualquer instrução executável.",
        "tags": [
          "Local",
          "Declaração no Topo"
        ]
      },
      "22": {
        "title": "Montagem do Texto Educacional sobre Pontos de Entrada",
        "desc": "Constrói o texto explicativo usando o padrão acumulador com o operador mais-igual. Explica o conceito de hook, o formato do nome e as regras obrigatórias.",
        "audioHint": "Esta seção é pura montagem de texto para ensinar o conceito. Na prática, o Ponto de Entrada MT410OK abaixo é que demonstra a implementação real.",
        "tags": [
          "Acumulador",
          "Texto Educacional"
        ]
      },
      "41": {
        "title": "Exibição da Janela Educacional (ApMsgInfo)",
        "desc": "Exibe o texto completo sobre Pontos de Entrada em uma janela modal. Esta chamada está na função educacional, não no PE de validação — é segura aqui.",
        "audioHint": "A-P-Msg-Info é segura NESTA função porque é uma User Function comum, não um PE de validação. No MT410OK abaixo, usa-se Help em vez de ApMsgInfo.",
        "tags": [
          "ApMsgInfo",
          "Interface",
          "Educacional"
        ]
      },
      "43": {
        "title": "Return Nil da Função Educacional",
        "desc": "Encerra a User Function Aula07 retornando Nulo. As variáveis cMensagem e cTitulo são liberadas da memória do AppServer.",
        "audioHint": "Return Nil encerra a função sem valor de retorno. A função educacional não precisa retornar nada — apenas exibiu informações ao aluno.",
        "tags": [
          "Return",
          "Nil"
        ]
      },
      "45": {
        "title": "ProtheusDoc do Ponto de Entrada MT410OK",
        "desc": "Documenta o Ponto de Entrada com tipo Function, seu momento de execução, o módulo SIGAFAT, e o retorno lógico. O campo @return é essencial aqui.",
        "audioHint": "O campo @return documenta o que o ERP espera: Logical, .T. permite gravar o pedido, .F. bloqueia. Isso ajuda a equipe a entender o contrato do PE.",
        "tags": [
          "ProtheusDoc",
          "Points of Entry",
          "@return"
        ]
      },
      "55": {
        "title": "User Function MT410OK — O Ponto de Entrada Real",
        "desc": "Nome exato que o Protheus procura ao confirmar um pedido de venda no M-A-T-A-410. Se existir no RPO, é executado automaticamente pelo ERP.",
        "audioHint": "O nome M-T-410-OK deve ser exatamente este. Um caractere errado e o ERP ignora sua função silenciosamente. Consulte sempre a TDN para confirmar o nome.",
        "tags": [
          "Points of Entry",
          "MT410OK",
          "SIGAFAT"
        ]
      },
      "56": {
        "title": "Declaração de Variáveis do MT410OK",
        "desc": "aArea salva o contexto, lRetorno é inicializado com verdadeiro, nVlrTotal e cCodClient leem os dados do pedido. Todas declaradas no topo conforme regra Blocker.",
        "audioHint": "lRetorno iniciado com .T. segue o princípio de permitir por padrão. A regra de negócio muda para .F. apenas quando o pedido ultrapassa o limite.",
        "tags": [
          "Local",
          "Declaração no Topo",
          "Padrão Permissivo"
        ]
      },
      "62": {
        "title": "GetArea() — Preservação Obrigatória de Contexto",
        "desc": "Salva o estado atual de todas as áreas de trabalho abertas. Em um Ponto de Entrada, o ERP pode estar posicionado em qualquer tabela com qualquer filtro ativo.",
        "audioHint": "Get-Area captura um snapshot de todas as tabelas abertas e suas posições. Sem ela, sua lógica poderia mover o ponteiro do pedido e corromper o fluxo do ERP.",
        "tags": [
          "GetArea",
          "Contexto",
          "Boas Práticas"
        ]
      },
      "63": {
        "title": "lRetorno := .T. — Padrão Permissivo",
        "desc": "A variável de retorno é inicializada com verdadeiro. A lógica só muda para falso se uma condição de bloqueio for atendida. Este padrão é mais seguro.",
        "audioHint": "Inicializar com verdadeiro e mudar para falso apenas quando necessário garante que um erro inesperado não bloqueie o operador — o pedido passa como se não houvesse PE.",
        "tags": [
          "Lógico .T.",
          "Padrão Seguro"
        ]
      },
      "66": {
        "title": "Leitura Segura de SC5 com Select() > 0",
        "desc": "Antes de ler qualquer campo, verifica se a área S-C-5 está aberta com Select maior que zero. Isso evita erros se o PE for chamado fora do contexto correto.",
        "audioHint": "S-C-5 é a tabela de cabeçalho do pedido de venda no SIGAFAT. O campo C5 underscore VLRTOT contém o valor total do pedido.",
        "tags": [
          "SC5",
          "Select()",
          "Segurança"
        ]
      },
      "67": {
        "title": "Leitura do Valor Total (SC5->C5_VLRTOT)",
        "desc": "Acessa o campo C5_VLRTOT da tabela SC5 (cabeçalho do pedido) usando o operador seta. O valor já está calculado pelo ERP neste momento da execução.",
        "audioHint": "O operador seta lê o campo da tabela posicionada pelo ERP. Neste ponto, o Protheus já posicionou o SC5 no pedido que o operador está confirmando.",
        "tags": [
          "SC5",
          "->",
          "Campo do ERP"
        ]
      },
      "68": {
        "title": "Leitura do Código do Cliente (AllTrim + ->)",
        "desc": "AllTrim remove espaços da direita do código do cliente. Campos character no Protheus são sempre preenchidos com espaços até a largura máxima definida no SX3.",
        "audioHint": "Sempre use AllTrim ao ler campos character do banco de dados do Protheus. Os campos têm largura fixa e são preenchidos com espaços à direita.",
        "tags": [
          "AllTrim",
          "SC5",
          "C5_CLIENTE"
        ]
      },
      "72": {
        "title": "Regra de Negócio — Limite de Valor do Pedido",
        "desc": "Bloqueia pedidos acima de R$50.000 para aprovação gerencial. Em produção, este valor viria de um parâmetro GetMV da tabela S-X-6 como MV_LIMPED.",
        "audioHint": "Em produção, substitua o 50000 fixo por GetMV de M-V-LIMPED. Assim o limite pode ser ajustado pelo usuário de negócio sem recompilar o código.",
        "tags": [
          "Regra de Negócio",
          "Validação",
          "Hard-coded"
        ]
      },
      "73": {
        "title": "lRetorno := .F. — Bloqueio do Pedido",
        "desc": "Muda o retorno para falso quando o valor ultrapassa o limite. O ERP lerá este valor no Return e impedirá a gravação do pedido.",
        "audioHint": "Um PE de validação que retorna .F. não grava o pedido. O ERP exibe a mensagem de bloqueio e retorna o operador para edição do pedido.",
        "tags": [
          "Lógico .F.",
          "Bloqueio",
          "Validação"
        ]
      },
      "74": {
        "title": "Help() — Mensagem Oficial de Bloqueio",
        "desc": "Em Pontos de Entrada de validação, NUNCA use ApMsgInfo. Use Help() ou MsgStop(). O ApMsgInfo pode interferir no fluxo modal do ERP em versões mais antigas.",
        "audioHint": "A função Help registra o aviso no histórico de alertas do ERP, além de exibir ao usuário. A-P-Msg-Info não faz isso e pode travar o fluxo modal.",
        "tags": [
          "Help()",
          "MsgStop",
          "Boas Práticas PE"
        ]
      },
      "82": {
        "title": "RestArea() — Restauração Obrigatória de Contexto",
        "desc": "Restaura o contexto salvo com Get-Area. SEMPRE deve ser a última instrução antes do Return. O par Get-Area e Rest-Area é inegociável em Pontos de Entrada.",
        "audioHint": "Rest-Area deve vir antes do Return em TODOS os caminhos de execução, inclusive dentro de blocos If. Um caminho sem Rest-Area pode corromper a sessão do ERP.",
        "tags": [
          "RestArea",
          "Contexto",
          "Clean Code"
        ]
      },
      "84": {
        "title": "Return lRetorno — O Retorno Define o Destino",
        "desc": "Ponto T permite a gravação do pedido. Ponto F aborta a operação e o ERP exibe a mensagem definida dentro do Help. Este é o contrato do PE MT410OK.",
        "audioHint": "O tipo do retorno deve corresponder exatamente ao que o ERP espera. Se um PE de validação retornar algo diferente de lógico, o comportamento é imprevisível.",
        "tags": [
          "Return",
          "Lógico",
          "Controle de Fluxo"
        ]
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
        "title": "Diretiva #Include — Apenas Totvs.ch Necessário",
        "desc": "Importa as constantes fundamentais do Protheus. Para aulas de parâmetros, apenas o Totvs.ch é necessário — GetMV é uma função nativa que não exige include adicional.",
        "audioHint": "Diferente da aula de banco de dados, aqui não precisamos do TopConn.ch. Get-M-V é uma função nativa do ADVPL que não exige include adicional.",
        "tags": [
          "#Include",
          "Totvs.ch"
        ]
      },
      "3": {
        "title": "ProtheusDoc — Documentação da Aula 08",
        "desc": "Documenta a função com seu objetivo: ensinar a ler parâmetros do ERP com GetMV e eliminar valores fixos hard-coded. O campo @see aponta para a documentação oficial.",
        "audioHint": "O campo @see no ProtheusDoc de GetMV é especialmente valioso porque a TDN documenta todos os parâmetros nativos disponíveis por módulo do ERP.",
        "tags": [
          "ProtheusDoc",
          "GetMV",
          "@see"
        ]
      },
      "12": {
        "title": "User Function Aula08 — Declaração das Variáveis",
        "desc": "Todas as variáveis são declaradas no topo seguindo a regra Blocker do CodeAnalysis. Os prefixos indicam o tipo de retorno esperado de cada GetMV.",
        "audioHint": "Atenção ao tipo de retorno de Get-M-V. Se o parâmetro for numérico, retorna número. Se for texto, retorna texto. Declare a variável com o tipo correto.",
        "tags": [
          "Local",
          "GetMV",
          "Tipagem"
        ]
      },
      "13": {
        "title": "Variável nLimCred — Limite de Crédito",
        "desc": "Numérica inicializada com zero. Receberá o valor lido do parâmetro MV_LIMCRED via GetMV. O tipo N indica que o parâmetro é numérico no SX6.",
        "audioHint": "Sempre inicialize variáveis numéricas com zero. Se GetMV falhar por ambiente incorreto, a variável permanecerá zero em vez de Nil — mais seguro para cálculos.",
        "tags": [
          "Local",
          "Numeric (N)",
          "MV_LIMCRED"
        ]
      },
      "14": {
        "title": "Variável nLimPed — Limite por Pedido",
        "desc": "Numérica que receberá o limite máximo de valor por pedido de venda. MV_LIMPED é um parâmetro nativo do SIGAFAT configurável por empresa e filial.",
        "audioHint": "M-V-LIMPED é um dos parâmetros mais usados em customizações de SIGAFAT. Ele controla o valor máximo que um pedido pode ter sem aprovação especial.",
        "tags": [
          "Local",
          "Numeric (N)",
          "MV_LIMPED"
        ]
      },
      "15": {
        "title": "Variável cModuloAtivo — Módulo de Faturamento",
        "desc": "Character que receberá o valor do parâmetro MV_MODFAT. Parâmetros de configuração de módulo geralmente retornam texto como S para Sim ou N para Não.",
        "audioHint": "O tipo c indica que MV_MODFAT retorna um Character. Se declarar como número e o parâmetro retornar texto, o ADVPL gerará erro de tipo em tempo de execução.",
        "tags": [
          "Local",
          "Character (C)",
          "MV_MODFAT"
        ]
      },
      "16": {
        "title": "Variável nDescMax — Desconto Máximo",
        "desc": "Numérica que receberá o percentual máximo de desconto configurado em MV_PERDESC. Usado em validações de pedido para impedir descontos acima do autorizado.",
        "audioHint": "M-V-PERDESC é comumente lido em rotinas de pedido de venda para validar descontos aplicados pelo operador antes de gravar.",
        "tags": [
          "Local",
          "Numeric (N)",
          "MV_PERDESC"
        ]
      },
      "17": {
        "title": "Flag de Controle de Ambiente (lAmbienteOk)",
        "desc": "Booleano que indica se o ambiente ERP está corretamente configurado com empresa e filial ativas antes de tentar ler parâmetros.",
        "audioHint": "Inicializar com .F. e confirmar com .T. apenas quando tudo estiver correto é o padrão de fail-safe. Se algo falhar na verificação, a flag permanece falsa.",
        "tags": [
          "Local",
          "Logical (L)",
          "Validação de Ambiente"
        ]
      },
      "20": {
        "title": "Verificação Completa do Contexto ERP",
        "desc": "Verifica três condições: SX2 aberto, cEmpAnt do tipo Character, e cEmpAnt não vazio. Todas devem ser verdadeiras para garantir que empresa e filial estão carregadas.",
        "audioHint": "Get-M-V sem empresa carregada ainda funciona, mas retorna o valor padrão global, não o da filial. Com empresa e filial, retorna o valor configurado especificamente.",
        "tags": [
          "Contexto",
          "SX2",
          "Ambiente"
        ]
      },
      "22": {
        "title": "Verificação de Contexto Corporativo",
        "desc": "Se lAmbienteOk for falso, exibe mensagem orientando o operador a executar pela Rotina Protheus, não diretamente. Em seguida, encerra a função.",
        "audioHint": "Este If de saída antecipada é um exemplo de Fail Fast: detectar o problema antes de tentar qualquer acesso ao banco e informar claramente.",
        "tags": [
          "Fail Fast",
          "Validação",
          "Ambiente"
        ]
      },
      "30": {
        "title": "Cabeçalho do Relatório — Empresa e Filial",
        "desc": "Inicia o relatório com informações do contexto ativo: empresa e filial. Essas informações mostram que GetMV está lendo da empresa correta.",
        "audioHint": "cEmpAnt e cFilAnt são variáveis globais do runtime do Protheus que contêm a empresa e filial ativas. Elas são preenchidas pelo RpcSetEnv ou pelo login do operador.",
        "tags": [
          "cEmpAnt",
          "cFilAnt",
          "Contexto"
        ]
      },
      "36": {
        "title": "GetMV('MV_LIMPED') — Leitura do Limite de Pedido",
        "desc": "Get-M-V busca o valor atual de MV_LIMPED na tabela S-X-6 considerando a empresa e filial ativas. O nome do parâmetro é case-insensitive.",
        "audioHint": "M-V-LIMPED é um parâmetro nativo do SIGAFAT. Você pode criar seus próprios parâmetros pelo módulo de Configurações e lê-los da mesma forma com GetMV.",
        "tags": [
          "GetMV",
          "MV_LIMPED",
          "SX6"
        ]
      },
      "37": {
        "title": "GetMV('MV_PERDESC') — Percentual Máximo de Desconto",
        "desc": "Lê o percentual máximo de desconto permitido para o módulo de faturamento. Em produção, o vendedor não pode superar este limite ao aplicar desconto no pedido.",
        "audioHint": "M-V-PERDESC é comumente lido em rotinas de pedido de venda para validar descontos aplicados pelo operador antes de gravar o pedido.",
        "tags": [
          "GetMV",
          "MV_PERDESC",
          "Desconto"
        ]
      },
      "38": {
        "title": "GetMV('MV_LIMCRED') — Limite de Crédito Padrão",
        "desc": "Lê o limite de crédito padrão configurado para novos clientes. É usado na criação de cadastro de clientes para definir o limite inicial automaticamente.",
        "audioHint": "M-V-LIMCRED é utilizado no módulo de Financeiro e Faturamento para definir limites de crédito. Cada empresa pode ter um valor diferente.",
        "tags": [
          "GetMV",
          "MV_LIMCRED",
          "Crédito"
        ]
      },
      "39": {
        "title": "GetMV('MV_MODFAT') — Status do Módulo de Faturamento",
        "desc": "Lê se o módulo de faturamento está ativo. Parâmetros de flag geralmente retornam S para Sim e N para Não, armazenados como texto no SX6.",
        "audioHint": "M-V-MODFAT indica se o SIGAFAT está licenciado e ativo neste ambiente. Customizações de faturamento devem verificar este parâmetro antes de executar.",
        "tags": [
          "GetMV",
          "MV_MODFAT",
          "Módulo"
        ]
      },
      "43": {
        "title": "Relatório de Parâmetros com PadR e Transform",
        "desc": "Formata cada parâmetro lido em colunas alinhadas usando PadR para os textos e Transform com máscara monetária para os valores numéricos.",
        "audioHint": "O mesmo padrão de PadR e Transform da Aula 03 é aplicado aqui. A consistência de formatação em relatórios é essencial para a legibilidade.",
        "tags": [
          "PadR",
          "Transform",
          "Relatório"
        ]
      },
      "44": {
        "title": "Linha MV_LIMPED no Relatório Formatado",
        "desc": "Exibe o valor do limite máximo por pedido lido via GetMV. PadR alinha o nome e descrição. Transform formata o valor como moeda brasileira.",
        "audioHint": "A máscara arroba E 999,999.92 formata o valor lido de MV_LIMPED. Se o parâmetro retornar 50000, será exibido como 50.000,00 no padrão brasileiro.",
        "tags": [
          "MV_LIMPED",
          "PadR",
          "Transform"
        ]
      },
      "45": {
        "title": "Linha MV_PERDESC no Relatório Formatado",
        "desc": "Exibe o percentual máximo de desconto formatado com máscara 99.99 e o símbolo percentual no final. Mostra que parâmetros decimais também são lidos corretamente.",
        "audioHint": "A máscara 99.99 formata o percentual com até dois dígitos inteiros e dois decimais. O símbolo de percentual é concatenado como texto no final.",
        "tags": [
          "MV_PERDESC",
          "Transform",
          "Percentual"
        ]
      },
      "49": {
        "title": "Hard-coded vs GetMV — A Lição Principal da Aula",
        "desc": "Compara as duas abordagens: valor fixo 50000 no código versus GetMV que lê do banco. O GetMV transforma regras de negócio em configurações ajustáveis sem recompilar.",
        "audioHint": "Em produção, quando o diretor muda o limite de pedido de 50.000 para 80.000, você quer alterar um parâmetro em 2 cliques — não recompilar, subir patch e pedir manutenção.",
        "tags": [
          "Boas Práticas",
          "Hard-coded",
          "GetMV"
        ]
      },
      "53": {
        "title": "Exibição do Relatório de Parâmetros (ApMsgInfo)",
        "desc": "Exibe a janela modal com todos os parâmetros lidos, seus valores e o comparativo de boas práticas. O título deixa claro o módulo e o assunto da aula.",
        "audioHint": "A-P-Msg-Info com o relatório de parâmetros permite ao aluno visualizar valores reais do ambiente configurado, tornando o aprendizado concreto.",
        "tags": [
          "ApMsgInfo",
          "Interface",
          "Relatório"
        ]
      },
      "55": {
        "title": "Return Nil — Encerramento da Aula 08",
        "desc": "Finaliza a função retornando Nulo. Todas as variáveis locais são liberadas automaticamente. Os parâmetros lidos com GetMV não precisam ser fechados — são apenas leituras.",
        "audioHint": "GetMV não abre áreas de trabalho. Diferente do TCQuery da Aula 06, aqui não há DbCloseArea para fazer. O Return Nil é suficiente para limpeza.",
        "tags": [
          "Return",
          "Nil",
          "Encerramento"
        ]
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
        "title": "Includes Totvs.ch e FWMVCDef.ch",
        "desc": "Importa as constantes fundamentais e comandos MVC oficiais como ADD OPTION e constantes de operações.",
        "audioHint": "FWMVCDef ponto c-h traz as macros e constantes do framework MVC, essenciais para o compilador.",
        "tags": [
          "FWMVCDef",
          "Include"
        ]
      },
      "10": {
        "title": "Função Principal e FWMBrowse",
        "desc": "Instancia o browse padrão para exibir a listagem em grade dos registros cadastrados.",
        "audioHint": "O FWMBrowse renderiza a tabela na tela e gerencia filtros, buscas e a barra de ferramentas.",
        "tags": [
          "FWMBrowse",
          "Browse"
        ]
      },
      "21": {
        "title": "Função MenuDef()",
        "desc": "Define as operações permitidas no menu e associa cada ação a sua função ou operação VIEWDEF.",
        "audioHint": "MenuDef é o catálogo de ações. Nela você define quem pode incluir, alterar ou apenas visualizar.",
        "tags": [
          "MenuDef",
          "Catálogo"
        ]
      },
      "33": {
        "title": "Função ModelDef()",
        "desc": "Cria a instância do MPFormModel e adiciona as regras de negócio e campos com FWFormStruct(1, alias).",
        "audioHint": "ModelDef contém a alma do sistema: regras de validação, integridade referencial e gravação.",
        "tags": [
          "ModelDef",
          "MPFormModel"
        ]
      },
      "46": {
        "title": "Função ViewDef()",
        "desc": "Cria a interface gráfica com FWFormView vinculada ao modelo e campos com FWFormStruct(2, alias).",
        "audioHint": "ViewDef define exclusivamente como os campos serão distribuídos na tela do usuário.",
        "tags": [
          "ViewDef",
          "FWFormView"
        ]
      }
    }
  }
];

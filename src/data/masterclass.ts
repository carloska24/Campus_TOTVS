import type { IMasterclassTrack } from '../types/masterclass';

export const MASTERCLASS_TRACKS: IMasterclassTrack[] = [
  {
    id: "imersao-erp",
    name: "Trilha 0: Imersão ERP",
    icon: "🏢",
    description: "Introdução a ERPs, arquitetura em 3 camadas, empresas, filiais e dicionários.",
    chapters: [
      {
        id: "cap00a",
        title: "Capítulo 00A: O que é um ERP & O Papel do Desenvolvedor Protheus",
        badge: "00_ConceitoERP.md",
        duration: "15 min",
        level: "Iniciante",
        category: "Arquitetura",
        description: "Compreenda o propósito de um Enterprise Resource Planning (ERP): unificação de processos de faturamento, compras, contabilidade, estoque e folha em uma única base de dados relacional. Entenda onde o desenvolvedor ADVPL/TLPP atua customizando regras de negócio sem quebrar o padrão do fabricante.",
        snippetCode: `/*
* PAPEL DO DESENVOLVEDOR TOTVS PROTHEUS:
* 1. Preservar o padrão do sistema (RPO Padrão)
* 2. Estender funcionalidades com Pontos de Entrada e MVC
* 3. Integrar com ecossistemas externos via TLPP REST/WebServices
* 4. Garantir performance e integridade transacional ACID
*/`,
        keyPoints: [
          "Um ERP elimina ilhas de informação conectando Compras (SIGACOM), Faturamento (SIGAFAT), Financeiro (SIGAFIN) e Estoque (SIGAEST)",
          "O código fonte padrão da TOTVS é compilado no repositório RPO; customizações são adicionadas como User Functions e Pontos de Entrada",
          "O desenvolvedor Protheus é o guardião das regras tributárias, operacionais e financeiras da empresa"
        ]
      },
      {
        id: "cap00b",
        title: "Capítulo 00B: Arquitetura em 3 Camadas (SmartClient, AppServer/RPO, DBAccess)",
        badge: "00_Arquitetura.md",
        duration: "20 min",
        level: "Iniciante",
        category: "Arquitetura",
        description: "O ecossistema Protheus é dividido em 3 camadas essenciais: Camada 1 (SmartClient / WebApp no frontend), Camada 2 (AppServer executando bytecode ADVPL/TLPP a partir do RPO) e Camada 3 (DBAccess / TopConnect traduzindo comandos ISAM para o SGBD relacional Oracle, SQL Server ou PostgreSQL).",
        snippetCode: `// FLUXO DE EXECUÇÃO EM 3 CAMADAS:
// [1. SmartClient Desktop / WebApp] (Renderização de Telas e Coleta de Eventos)
//                 ↕ (Protocolo TCP/IP Criptografado)
// [2. AppServer + RPO] (Execução de Threads ADVPL, Cache de Dicionários SX e Memória)
//                 ↕ (Comunicação Binária TopConnect)
// [3. DBAccess + SGBD] (Tradução SQL ANSI para PostgreSQL / SQL Server / Oracle)`,
        keyPoints: [
          "SmartClient é um cliente leve que apenas desenha elementos da tela; todo o processamento reside no AppServer",
          "O RPO (Repository of Objects) armazena os bytecodes compilados de todos os programas padrão e customizados",
          "DBAccess unifica o acesso a múltiplos bancos de dados sem necessidade de reescrever queries para cada SGBD"
        ]
      },
      {
        id: "cap00c",
        title: "Capítulo 00C: Contexto Corporativo: Empresa, Filial e Variáveis Globais",
        badge: "00_IntroducaoERP.prw",
        duration: "25 min",
        level: "Iniciante",
        category: "Fundamentos",
        description: "Como o Protheus sabe em qual filial você está trabalhando? Aprenda sobre as variáveis cEmpAnt (empresa ativa), cFilAnt (filial ativa), dDataBase (data de trabalho) e a inicialização de ambiente com RpcSetEnv.",
        lessonId: "aula00",
        snippetCode: `// Inicialização e Leitura do Contexto Corporativo
If Select("SX2") == 0 .Or. Type("cEmpAnt") == "U" .Or. Empty(cEmpAnt)
    RpcSetEnv("99", "01") // Inicializa Empresa 99 (Matriz), Filial 01
EndIf

ConOut("Empresa Corrente: " + cEmpAnt)
ConOut("Filial Corrente : " + cFilAnt)
ConOut("Data de Trabalho: " + dToC(dDataBase))`,
        keyPoints: [
          "cEmpAnt guarda o código da empresa ativa (ex: '01' ou '99') e cFilAnt a filial ativa (ex: '0101')",
          "xFilial('TABELA') retorna a filial correta considerando o compartilhamento de tabelas (exclusiva ou compartilhada)",
          "Nunca execute RpcSetType(3) ou RpcClearEnv() em rotinas de interface SmartClient"
        ]
      },
      {
        id: "cap00d",
        title: "Capítulo 00D: O Segredo das Tabelas do Protheus (Regra das 3 Letras & SX)",
        badge: "00_Dicionarios.md",
        duration: "20 min",
        level: "Iniciante",
        category: "Banco de Dados",
        description: "Desvende a regra das 3 letras de todas as tabelas Protheus (S + Módulo + Sequencial: SA1=Clientes, SA2=Fornecedores, SB1=Produtos, SC5=Pedidos) e os Dicionários SX (SX2=Tabelas, SX3=Campos, SX6=Parâmetros, SX1=Perguntas).",
        snippetCode: `// Mapeamento e Consulta com RetSqlName e Dicionário
Local cTabSA1 := RetSqlName("SA1") // Retorna 'SA1010' ou conforme empresa ativa
Local cCampo  := "A1_NOME"

// Regra de Prefixo de Campos:
// Sempre 2 caracteres da tabela + '_' + nome do campo (A1_NOME, B1_DESC, C5_NUM)`,
        keyPoints: [
          "Tabelas de negócio começam com 'S': SA1 (Clientes), SB1 (Produtos), SC5 (Cabeçalho de Pedidos), SC6 (Itens)",
          "Dicionários do Sistema começam com 'SX': SX2 (Tabelas), SX3 (Campos), SX6 (Parâmetros), SX1 (Perguntas)",
          "Campos sempre possuem prefixo de 2 letras identificando a tabela de origem (ex: A1_ para SA1, B1_ para SB1)"
        ]
      }
    ]
  },
  {
    id: "fundamentos",
    name: "Trilha 1: Fundamentos",
    icon: "🌱",
    description: "Tipos de dados, condicionais, laços de repetição e matrizes.",
    chapters: [
      {
        id: "cap01",
        title: "Capítulo 01: Variáveis e Tipos Primitivos",
        badge: "01_Variaveis.prw",
        duration: "15 min",
        level: "Iniciante",
        category: "Fundamentos",
        lessonId: "aula01",
        description: "Declaração estrita no início da função (regra Blocker SonarQube), tipos C, N, D, L, A e notação húngara oficial TOTVS.",
        snippetCode: `// Declaração Oficial TOTVS no Topo
Local cNome     := "Maria Oliveira"
Local nSalario  := 8500.50
Local dAdmissao := Date()
Local lAtivo    := .T.
Local aCursos   := {"ADVPL", "TLPP", "MVC"}`,
        keyPoints: [
          "Toda variável deve ser declarada no início antes de instruções executáveis",
          "Notação Húngara obrigatória (c=Character, n=Numeric, d=Date, l=Logical, a=Array)",
          "Escopo Local como padrão para 100% das rotinas corporativas"
        ]
      },
      {
        id: "cap02",
        title: "Capítulo 02: Condicionais e Static Functions",
        badge: "02_Logica.prw",
        duration: "20 min",
        level: "Iniciante",
        category: "Fundamentos",
        lessonId: "aula02",
        description: "Estruturas de decisão If/ElseIf/Else, operador ternário Iif(), e modularização segura com Static Function.",
        snippetCode: `If nPontos >= 90
    cStatus := "Aprovado com Louvor"
ElseIf nPontos >= 70
    cStatus := "Aprovado"
Else
    cStatus := "Recuperacao"
EndIf`,
        keyPoints: [
          "Static Functions isolam a lógica dentro do fonte atual, evitando conflitos no RPO",
          "Iif(cond, expTrue, expFalse) substitui blocos simples com alta performance",
          "Evite encadeamento excessivo de Ifs: prefira matrizes de decisão com laços"
        ]
      },
      {
        id: "cap02b",
        title: "Capítulo 02B: Loops (While, For/Next, Exit, Loop)",
        badge: "02B_Loops.prw",
        duration: "25 min",
        level: "Iniciante",
        category: "Fundamentos",
        lessonId: "aula02b",
        description: "Laços While com acumuladores, For...Next com salto Loop (continue) e interrupção Exit (break).",
        snippetCode: `Static Function Fatorial(nNum)
    Local nResultado := 1
    If nNum > 12
        ApMsgStop("Numero muito alto para calculo!", "Trava de Seguranca")
        Return 0
    EndIf
    While nNum > 1
        nResultado *= nNum
        nNum--
    EndDo
Return nResultado`,
        keyPoints: [
          "While pré-condicional exige atualização explícita da variável de controle",
          "Exit interrompe imediatamente o laço; Loop avança para a próxima iteração",
          "Trava de segurança: limite iterações com laços While para evitar travar a thread do AppServer"
        ]
      },
      {
        id: "cap03",
        title: "Capítulo 03: Matrizes Multidimensionais e Strings",
        badge: "03_MatrizesEStrings.prw",
        duration: "25 min",
        level: "Intermediário",
        category: "Fundamentos",
        lessonId: "aula03",
        description: "Construção de vetores com aAdd, manipulação de strings com AllTrim, PadR, SubStr e formatação monetária.",
        snippetCode: `Local aItens := {}
aAdd(aItens, {"PRD001", "Notebook Pro", 1, 4500.00})
aAdd(aItens, {"PRD002", "Monitor 4K",   2, 1800.00})

// Formatação com PadR e Transform
cLinha := PadR(aItens[1][2], 25) + " | R$ " + Transform(aItens[1][4], "@E 999,999.92")`,
        keyPoints: [
          "Arrays em ADVPL são base-1 (o primeiro índice é 1, não 0)",
          "aAdd insere itens dinamicamente sem necessidade de redimensionamento prévio",
          "Transform com máscara '@E 999,999.92' garante o padrão monetário brasileiro"
        ]
      },
      {
        id: "cap04",
        title: "Capítulo 04: Codeblocks, aSort e aScan",
        badge: "04_Codeblocks.prw",
        duration: "30 min",
        level: "Intermediário",
        category: "Fundamentos",
        lessonId: "aula04",
        description: "Funções de primeira classe no ADVPL. Ordenação in-place com aSort e buscas em matrizes com predicados lambdas.",
        snippetCode: `// Codeblock de comparação decrescente de preço:
Local bOrdena := { |x, y| x[4] > y[4] }
aSort(aProdutos, , , bOrdena)

// Codeblock de busca por categoria:
Local bBuscaCat := { |x| x[3] == "Perifericos" }
Local nPos := aScan(aProdutos, bBuscaCat)`,
        keyPoints: [
          "Codeblocks são expressões encapsuladas delimitadas por chaves {|param| expressao}",
          "aSort modifica o array original na memória (operação in-place)",
          "aScan retorna o índice do primeiro elemento correspondente ou 0 se não encontrado"
        ]
      },
      {
        id: "cap05",
        title: "Capítulo 05: Telas Interativas com MSDialog",
        badge: "05_InterfaceGrafica.prw",
        duration: "35 min",
        level: "Avançado",
        category: "Fundamentos",
        lessonId: "aula05",
        description: "Criação de janelas modais nativas com MSDialog, rótulos TSay, campos de entrada MSGET e botões com blocos ACTION.",
        snippetCode: `DEFINE MSDIALOG oDlg TITLE "Calculadora Financeira" FROM 000, 000 TO 260, 420 PIXEL
@ 020, 020 SAY "Valor (R$):" SIZE 080, 012 OF oDlg PIXEL
@ 018, 105 MSGET oGetVal VAR nVlr PICTURE "@E 999,999.92" SIZE 070, 011 OF oDlg PIXEL
@ 105, 040 BUTTON oBtnCalc PROMPT "Calcular" SIZE 055, 016 OF oDlg PIXEL ACTION ( Calcular() )
ACTIVATE MSDIALOG oDlg CENTERED`,
        keyPoints: [
          "MSDialog é modal e bloqueia a thread até o fechamento com oDlg:End()",
          "Coordenadas são sempre em Linha, Coluna com a cláusula PIXEL",
          "Data-binding bidirecional automático entre variáveis locais e campos MSGET"
        ]
      }
    ]
  },
  {
    id: "banco-de-dados",
    name: "Trilha 2: Banco de Dados",
    icon: "🗄️",
    description: "TopConnect, TCQuery, deleção lógica e Pontos de Entrada.",
    chapters: [
      {
        id: "cap06",
        title: "Capítulo 06: Consultas SQL (TopConnect & TCQuery)",
        badge: "06_BancoDeDados.prw",
        duration: "35 min",
        level: "Avançado",
        category: "Banco de Dados",
        lessonId: "aula06",
        description: "Acesso a tabelas corporativas (SA1, SB1) via DBAccess, resolução física com RetSqlName e prevenção de memory leak com DbCloseArea.",
        snippetCode: `cQuery := " SELECT A1_COD, A1_NOME, A1_EST, A1_LC "
cQuery += " FROM " + RetSqlName("SA1") + " SA1 "
cQuery += " WHERE SA1.D_E_L_E_T_ = ' ' "
cQuery += "   AND SA1.A1_EST = 'SP' "
cQuery += " ORDER BY SA1.A1_LC DESC "

cQuery := ChangeQuery(cQuery)
TCQuery cQuery New Alias "QRY_CLI"

While !QRY_CLI->(Eof())
    // Processamento do registro...
    QRY_CLI->(DbSkip())
EndDo
QRY_CLI->(DbCloseArea()) // OBRIGATÓRIO`,
        keyPoints: [
          "NUNCA use 'SELECT *': requisite apenas as colunas estritamente necessárias",
          "RetSqlName('SA1') resolve dinamicamente a tabela física da empresa ativa (ex: SA1010)",
          "ChangeQuery() traduz dialetos SQL para Oracle, SQL Server e PostgreSQL"
        ]
      },
      {
        id: "cap07",
        title: "Capítulo 07: Pontos de Entrada & Hooks (MT410OK)",
        badge: "07_PontosDeEntrada.prw",
        duration: "40 min",
        level: "Avançado",
        category: "Banco de Dados",
        lessonId: "aula07",
        description: "Customização sem alterar fontes padrão TOTVS. Leitura de áreas posicionadas e preservação sagrada de contexto com GetArea/RestArea.",
        snippetCode: `User Function MT410OK()
    Local aArea    := GetArea()
    Local lRetorno := .T.

    If SC5->C5_VLRTOT > 50000
        lRetorno := .F.
        Help("", 1, "ALCADA", , "Pedido requer liberacao gerencial!", 1, 0)
    EndIf

    RestArea(aArea) // OBRIGATÓRIO antes do Return
Return lRetorno`,
        keyPoints: [
          "Pontos de Entrada são funções de gancho executadas automaticamente pelo ERP",
          "GetArea() e RestArea() evitam desposicionar ponteiros ativos do Protheus",
          "Em PEs de validação, use Help() ou MsgStop() em vez de ApMsgInfo"
        ]
      },
      {
        id: "cap08",
        title: "Capítulo 08: Parâmetros SX6 (GetMV & PutMV)",
        badge: "08_Parametros.prw",
        duration: "30 min",
        level: "Especialista",
        category: "Banco de Dados",
        lessonId: "aula08",
        description: "Eliminação de valores fixos (hard-coded) na lógica de negócios com parametrização dinâmica via tabela SX6.",
        snippetCode: `// Leitura segura com fallback defensivo:
Local nLimite := GetMV("MV_LIMPED", .F., 50000)

If SC5->C5_VLRTOT > nLimite
    lRetorno := .F.
    Help("", 1, "LIMEXCED", , "Limite maximo por pedido ultrapassado!", 1, 0)
EndIf`,
        keyPoints: [
          "GetMV lê parâmetros do dicionário com cache otimizado no AppServer",
          "Fallback (.F., valorPadrao) impede falhas caso o parâmetro ainda não exista",
          "Elimina a necessidade de recompilar fontes quando limites de negócio mudam"
        ]
      }
    ]
  },
  {
    id: "arquitetura",
    name: "Trilha 3: Arquitetura Avançada",
    icon: "🏛️",
    description: "MVC Protheus COMP011 e Microsserviços REST em TLPP.",
    chapters: [
      {
        id: "cap-mvc",
        title: "Capítulo 09: Arquitetura MVC (ModelDef, ViewDef e MenuDef)",
        badge: "09_MVC_Basico.prw",
        duration: "50 min",
        level: "Especialista",
        category: "Arquitetura",
        lessonId: "aula09",
        description: "Desenvolvimento corporativo desacoplado seguindo o padrão oficial MVC Protheus (Model-View-Controller).",
        snippetCode: `// 1. Menu de Operações
Static Function MenuDef()
    Local aRotina := {}
    ADD OPTION aRotina TITLE "Pesquisar" ACTION "AxPesqui" OPERATION 1 ACCESS 0
    ADD OPTION aRotina TITLE "Visualizar" ACTION "VIEWDEF.COMP011" OPERATION 2 ACCESS 0
    ADD OPTION aRotina TITLE "Incluir"    ACTION "VIEWDEF.COMP011" OPERATION 3 ACCESS 0
    ADD OPTION aRotina TITLE "Alterar"    ACTION "VIEWDEF.COMP011" OPERATION 4 ACCESS 0
Return aRotina

// 2. Modelo de Dados (Regras de Negócio e Validações)
Static Function ModelDef()
    Local oModel := MPFormModel():New("COMP011M")
    Local oStruSA1 := FWFormStruct(1, "SA1")
    oModel:AddFields("FORMSA1", , oStruSA1)
    oModel:SetDescription("Modelo de Clientes MVC")
Return oModel

// 3. Interface Visual (Campos, Grids e Agrupamentos)
Static Function ViewDef()
    Local oModel := FWLoadModel("COMP011")
    Local oView  := FWFormView():New()
    Local oStruSA1 := FWFormStruct(2, "SA1")
    oView:SetModel(oModel)
    oView:AddField("VIEW_SA1", oStruSA1, "FORMSA1")
Return oView`,
        keyPoints: [
          "ModelDef contém regras de validação, integridade e persistência",
          "ViewDef define exclusivamente como os dados são desenhados na tela",
          "MenuDef define o catálogo de operações e privilégios de acesso"
        ]
      },
      {
        id: "cap-rest",
        title: "Capítulo REST: APIs Modernas em TLPP",
        badge: "API_Clientes.tlpp",
        duration: "45 min",
        level: "Especialista",
        category: "Arquitetura",
        description: "Construção de microsserviços REST nativos com TLPP utilizando decorators @Get, @Post e tipagem forte.",
        snippetCode: `#include "tlpp-core.th"
#include "tlpp-rest.th"

@Get("/api/v1/clientes")
User Function GetClientes()
    Local jResponse := JsonObject():New()
    Local aClientes := {}
    
    // Consulta banco e monta JSON
    jResponse["status"] := 200
    jResponse["data"] := aClientes
    
    oRest:SetResponse(jResponse:ToJson())
Return .T.`,
        keyPoints: [
          "TLPP permite tipagem estática e decorators modernos @Get e @Post",
          "Manipulação nativa de objetos JSON com JsonObject() de alta performance",
          "Dispensa o uso de WebServices SOAP legados, adotando JSON e OpenAPI"
        ]
      }
    ]
  },
  {
    id: "arsenal",
    name: "Trilha 4: Arsenal & Boas Práticas",
    icon: "⚡",
    description: "Guia de consulta rápida, padrões oficiais TDN e auditoria.",
    chapters: [
      {
        id: "cap-guia",
        title: "Diretrizes de Ouro de Engenharia TOTVS",
        badge: "DIRETRIZES_ENG.md",
        duration: "20 min",
        level: "Intermediário",
        category: "Governança",
        description: "Compilação de regras inegociáveis do SonarQube, CodeAnalysis e boas práticas do TDN.",
        snippetCode: `// 1. Ordem de Variáveis: Blocker SonarQube
User Function Exemplo()
    Local cCod := ""
    Local nTot := 0 // CORRETO: Declaradas no topo!
    nTot := 10      // Instruções somente após
Return Nil`,
        keyPoints: [
          "Nunca declare variáveis após comandos executáveis",
          "Nunca utilize RpcSetType(3) ou RpcClearEnv() em rotinas SmartClient/WebApp",
          "Sempre utilize RetSqlName() e ChangeQuery() para portabilidade entre SGBDs"
        ]
      }
    ]
  }
];

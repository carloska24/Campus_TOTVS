/**
 * Campus TOTVS - Features de Alto Nível
 * Arquiteto Sênior & Professor Titular de Backoffice Protheus
 * 
 * Contém:
 * 1. Banco de Metadados do Configurador Virtual (Tabelas SX)
 * 2. Banco de Códigos Práticos para Módulos ERP (SIGA) e Masterclasses
 * 3. Matriz Interativa de Competências e Calculadora de Senioridade
 * 4. Funções de Interação e Injeção de Código no Monaco Editor
 */

// =========================================================================
// 1. BANCO DE METADADOS OFICIAL DO PROTHEUS (DICIONÁRIO SX VIRTUAL)
// =========================================================================
const TOTVS_DICTIONARY_DB = {
  "SA1": {
    name: "Clientes",
    description: "Cadastro geral de clientes e parceiros comerciais de venda (SIGAFAT).",
    module: "SIGAFAT",
    indices: [
      { order: 1, key: "A1_FILIAL + A1_COD + A1_LOJA", desc: "Código + Loja (Chave Primária)" },
      { order: 2, key: "A1_FILIAL + A1_NOME", desc: "Razão Social" },
      { order: 3, key: "A1_FILIAL + A1_CGC", desc: "CNPJ / CPF" }
    ],
    fields: [
      { field: "A1_COD", type: "C", size: 6, dec: 0, desc: "Código do Cliente", valid: "ExistChav('SA1')", relac: "GetSX8Num('SA1','A1_COD')", picture: "@!" },
      { field: "A1_LOJA", type: "C", size: 2, dec: 0, desc: "Loja do Cliente", valid: "", relac: "'01'", picture: "@!" },
      { field: "A1_NOME", type: "C", size: 40, dec: 0, desc: "Razão Social", valid: "Texto()", relac: "", picture: "@!" },
      { field: "A1_NREDUZ", type: "C", size: 20, dec: 0, desc: "Nome Fantasia", valid: "", relac: "", picture: "@!" },
      { field: "A1_TIPO", type: "C", size: 1, dec: 0, desc: "Tipo (F=Fis / J=Jur)", valid: "Pertence('F/J/X/R')", relac: "'J'", picture: "@!" },
      { field: "A1_CGC", type: "C", size: 14, dec: 0, desc: "CNPJ ou CPF", valid: "CGC(M->A1_CGC)", relac: "", picture: "@R 99.999.999/9999-99" },
      { field: "A1_EST", type: "C", size: 2, dec: 0, desc: "Estado (UF)", valid: "ExistCpo('SX5','12'+M->A1_EST)", relac: "'SP'", picture: "@!" },
      { field: "A1_MUN", type: "C", size: 30, dec: 0, desc: "Município", valid: "", relac: "", picture: "@!" },
      { field: "A1_EMAIL", type: "C", size: 60, dec: 0, desc: "E-mail de Contato", valid: "", relac: "", picture: "" }
    ]
  },
  "SB1": {
    name: "Produtos & Serviços",
    description: "Cadastro mestre de itens, matérias-primas e serviços (SIGAEST/COM/FAT).",
    module: "SIGAEST",
    indices: [
      { order: 1, key: "B1_FILIAL + B1_COD", desc: "Código do Produto (Chave Primária)" },
      { order: 2, key: "B1_FILIAL + B1_DESC", desc: "Descrição do Produto" },
      { order: 3, key: "B1_FILIAL + B1_TIPO", desc: "Tipo do Produto" }
    ],
    fields: [
      { field: "B1_COD", type: "C", size: 15, dec: 0, desc: "Código do Produto", valid: "ExistChav('SB1')", relac: "", picture: "@!" },
      { field: "B1_DESC", type: "C", size: 30, dec: 0, desc: "Descrição do Produto", valid: "Texto()", relac: "", picture: "@!" },
      { field: "B1_TIPO", type: "C", size: 2, dec: 0, desc: "Tipo (PA, MP, PI, SV)", valid: "ExistCpo('SX5','02'+M->B1_TIPO)", relac: "'PA'", picture: "@!" },
      { field: "B1_UM", type: "C", size: 2, dec: 0, desc: "Unidade de Medida", valid: "ExistCpo('SAH')", relac: "'UN'", picture: "@!" },
      { field: "B1_LOCPAD", type: "C", size: 2, dec: 0, desc: "Almoxarifado Padrão", valid: "ExistCpo('NNR')", relac: "'01'", picture: "@!" },
      { field: "B1_POSIPI", type: "C", size: 10, dec: 0, desc: "NCM / Classif. Fiscal", valid: "ExistCpo('SYD')", relac: "", picture: "@R 9999.99.99" },
      { field: "B1_PESO", type: "N", size: 9, dec: 4, desc: "Peso Líquido", valid: "Positivo()", relac: "0", picture: "@E 9,999.9999" }
    ]
  },
  "SC5": {
    name: "Cabeçalho do Pedido de Venda",
    description: "Cabeçalho das negociações comerciais e pedidos de clientes (SIGAFAT).",
    module: "SIGAFAT",
    indices: [
      { order: 1, key: "C5_FILIAL + C5_NUM", desc: "Número do Pedido (Chave Primária)" },
      { order: 2, key: "C5_FILIAL + C5_CLIENTE + C5_LOJACLI", desc: "Cliente + Loja" },
      { order: 3, key: "C5_FILIAL + C5_EMISSAO", desc: "Data de Emissão" }
    ],
    fields: [
      { field: "C5_NUM", type: "C", size: 6, dec: 0, desc: "Número do Pedido", valid: "ExistChav('SC5')", relac: "GetSX8Num('SC5','C5_NUM')", picture: "@!" },
      { field: "C5_TIPO", type: "C", size: 1, dec: 0, desc: "Tipo do Pedido (N=Normal/B=Benef)", valid: "Pertence('N/B/D/C/P/I')", relac: "'N'", picture: "@!" },
      { field: "C5_CLIENTE", type: "C", size: 6, dec: 0, desc: "Código do Cliente", valid: "ExistCpo('SA1',M->C5_CLIENTE)", relac: "", picture: "@!" },
      { field: "C5_LOJACLI", type: "C", size: 2, dec: 0, desc: "Loja do Cliente", valid: "ExistCpo('SA1',M->C5_CLIENTE+M->C5_LOJACLI)", relac: "'01'", picture: "@!" },
      { field: "C5_EMISSAO", type: "D", size: 8, dec: 0, desc: "Data de Emissão", valid: "NaoVazio()", relac: "dDataBase", picture: "" },
      { field: "C5_CONDPAG", type: "C", size: 3, dec: 0, desc: "Condição de Pagamento", valid: "ExistCpo('SE4')", relac: "", picture: "@!" },
      { field: "C5_VEND1", type: "C", size: 6, dec: 0, desc: "Vendedor Principal", valid: "ExistCpo('SA3')", relac: "", picture: "@!" }
    ]
  },
  "SC6": {
    name: "Itens do Pedido de Venda",
    description: "Produtos, quantidades, preços e TES de cada item do pedido (SIGAFAT).",
    module: "SIGAFAT",
    indices: [
      { order: 1, key: "C6_FILIAL + C6_NUM + C6_ITEM", desc: "Pedido + Item" },
      { order: 2, key: "C6_FILIAL + C6_PRODUTO", desc: "Produto" }
    ],
    fields: [
      { field: "C6_NUM", type: "C", size: 6, dec: 0, desc: "Número do Pedido", valid: "", relac: "M->C5_NUM", picture: "@!" },
      { field: "C6_ITEM", type: "C", size: 2, dec: 0, desc: "Item Sequencial", valid: "", relac: "", picture: "@!" },
      { field: "C6_PRODUTO", type: "C", size: 15, dec: 0, desc: "Código do Produto", valid: "ExistCpo('SB1')", relac: "", picture: "@!" },
      { field: "C6_DESCRI", type: "C", size: 30, dec: 0, desc: "Descrição do Item", valid: "", relac: "Posicione('SB1',1,xFilial('SB1')+M->C6_PRODUTO,'B1_DESC')", picture: "@!" },
      { field: "C6_QTDVEN", type: "N", size: 12, dec: 2, desc: "Quantidade Vendida", valid: "Positivo()", relac: "1", picture: "@E 999,999.99" },
      { field: "C6_PRCVEN", type: "N", size: 14, dec: 2, desc: "Preço Unitário", valid: "Positivo()", relac: "", picture: "@E 999,999.99" },
      { field: "C6_VALOR", type: "N", size: 14, dec: 2, desc: "Valor Total do Item", valid: "", relac: "M->C6_QTDVEN * M->C6_PRCVEN", picture: "@E 999,999.99" },
      { field: "C6_TES", type: "C", size: 3, dec: 0, desc: "Tipo de Entrada/Saída", valid: "ExistCpo('SF4')", relac: "", picture: "@!" }
    ]
  },
  "SE1": {
    name: "Contas a Receber",
    description: "Títulos financeiros gerados por vendas ou faturamento manual (SIGAFIN).",
    module: "SIGAFIN",
    indices: [
      { order: 1, key: "E1_FILIAL + E1_PREFIXO + E1_NUM + E1_PARCELA + E1_TIPO", desc: "Chave do Título (Primária)" },
      { order: 2, key: "E1_FILIAL + E1_CLIENTE + E1_LOJA", desc: "Cliente + Loja" },
      { order: 3, key: "E1_FILIAL + E1_VENCTO", desc: "Data de Vencimento" }
    ],
    fields: [
      { field: "E1_PREFIXO", type: "C", size: 3, dec: 0, desc: "Prefixo do Título", valid: "", relac: "'FAT'", picture: "@!" },
      { field: "E1_NUM", type: "C", size: 9, dec: 0, desc: "Número do Título", valid: "", relac: "", picture: "@!" },
      { field: "E1_PARCELA", type: "C", size: 2, dec: 0, desc: "Parcela do Título", valid: "", relac: "'A'", picture: "@!" },
      { field: "E1_TIPO", type: "C", size: 3, dec: 0, desc: "Tipo (NF, DP, BOL)", valid: "ExistCpo('05')", relac: "'NF'", picture: "@!" },
      { field: "E1_CLIENTE", type: "C", size: 6, dec: 0, desc: "Código do Cliente", valid: "ExistCpo('SA1')", relac: "", picture: "@!" },
      { field: "E1_LOJA", type: "C", size: 2, dec: 0, desc: "Loja do Cliente", valid: "", relac: "'01'", picture: "@!" },
      { field: "E1_EMISSAO", type: "D", size: 8, dec: 0, desc: "Data de Emissão", valid: "", relac: "dDataBase", picture: "" },
      { field: "E1_VENCTO", type: "D", size: 8, dec: 0, desc: "Data de Vencimento", valid: "M->E1_VENCTO >= M->E1_EMISSAO", relac: "", picture: "" },
      { field: "E1_VALOR", type: "N", size: 16, dec: 2, desc: "Valor do Título", valid: "Positivo()", relac: "", picture: "@E 999,999,999.92" },
      { field: "E1_SALDO", type: "N", size: 16, dec: 2, desc: "Saldo em Aberto", valid: "", relac: "M->E1_VALOR", picture: "@E 999,999,999.92" }
    ]
  },
  "SE2": {
    name: "Contas a Pagar",
    description: "Títulos financeiros devidos a fornecedores e tributos (SIGAFIN).",
    module: "SIGAFIN",
    indices: [
      { order: 1, key: "E2_FILIAL + E2_PREFIXO + E2_NUM + E2_PARCELA + E2_TIPO", desc: "Chave do Título a Pagar" },
      { order: 2, key: "E2_FILIAL + E2_FORNECE + E2_LOJA", desc: "Fornecedor + Loja" },
      { order: 3, key: "E2_FILIAL + E2_VENCTO", desc: "Data de Vencimento" }
    ],
    fields: [
      { field: "E2_PREFIXO", type: "C", size: 3, dec: 0, desc: "Prefixo do Título", valid: "", relac: "'COM'", picture: "@!" },
      { field: "E2_NUM", type: "C", size: 9, dec: 0, desc: "Número do Título", valid: "", relac: "", picture: "@!" },
      { field: "E2_PARCELA", type: "C", size: 2, dec: 0, desc: "Parcela do Título", valid: "", relac: "'A'", picture: "@!" },
      { field: "E2_TIPO", type: "C", size: 3, dec: 0, desc: "Tipo do Título", valid: "", relac: "'NF'", picture: "@!" },
      { field: "E2_FORNECE", type: "C", size: 6, dec: 0, desc: "Código do Fornecedor", valid: "ExistCpo('SA2')", relac: "", picture: "@!" },
      { field: "E2_LOJA", type: "C", size: 2, dec: 0, desc: "Loja do Fornecedor", valid: "", relac: "'01'", picture: "@!" },
      { field: "E2_VALOR", type: "N", size: 16, dec: 2, desc: "Valor a Pagar", valid: "Positivo()", relac: "", picture: "@E 999,999,999.92" },
      { field: "E2_SALDO", type: "N", size: 16, dec: 2, desc: "Saldo em Aberto", valid: "", relac: "M->E2_VALOR", picture: "@E 999,999,999.92" }
    ]
  }
};

// =========================================================================
// 2. BANCO DE CÓDIGOS OFICIAIS PARA INJEÇÃO NO LABORATÓRIO (MÓDULOS & MASTER)
// =========================================================================
const TOTVS_CODE_SNIPPETS = {
  // Ponto de Entrada de Validação de Pedido de Venda (SIGAFAT)
  "pe_mata410": {
    filename: "M410LIOK.prw",
    title: "Ponto de Entrada: M410LIOK (Validação de Linha do Pedido)",
    code: `#Include "Totvs.ch"

/*/{Protheus.doc} M410LIOK
Ponto de Entrada oficial do SIGAFAT executado na validacao da linha de itens do Pedido de Venda (MATA410).
Retorna .T. para permitir prosseguir ou .F. para bloquear o item.
@author Arquiteto Campus TOTVS
@since 06/09/2026
@version 1.0
/*/
User Function M410LIOK()
    Local aArea     := GetArea()
    Local lRetorno  := .T.
    Local cProduto  := ""
    Local nQtd      := 0
    Local nPreco    := 0
    Local nPosProd  := aScan(aHeader, {|x| AllTrim(x[2]) == "C6_PRODUTO"})
    Local nPosQtd   := aScan(aHeader, {|x| AllTrim(x[2]) == "C6_QTDVEN"})
    Local nPosPrc   := aScan(aHeader, {|x| AllTrim(x[2]) == "C6_PRCVEN"})

    // Leitura das colunas atuais da linha posicionada no grid
    If nPosProd > 0 .And. nPosQtd > 0 .And. nPosPrc > 0
        cProduto := aCols[n, nPosProd]
        nQtd     := aCols[n, nPosQtd]
        nPreco   := aCols[n, nPosPrc]

        // Regra de Negocio: Bloqueia item se quantidade for zero ou preco abaixo do minimo
        If nQtd <= 0
            Help("", 1, "M410LIOK", , "Quantidade informada invalida! Deve ser maior que zero.", 1, 0)
            lRetorno := .F.
        ElseIf nPreco < 5.00
            Help("", 1, "M410LIOK", , "Preco unitario abaixo da tabela minima permitida (R$ 5,00)!", 1, 0)
            lRetorno := .F.
        EndIf
    EndIf

    // Exibicao de log de auditoria no Protheus Virtual
    ApMsgInfo("Validacao M410LIOK executada com sucesso!" + CRLF + ;
              "Produto: " + cProduto + CRLF + ;
              "Resultado: " + Iif(lRetorno, "Linha APROVADA", "Linha BLOQUEADA"), ;
              "Auditoria SIGAFAT - Ponto de Entrada")

    RestArea(aArea)
Return lRetorno`
  },

  // Masterclass 02: Cadastro Completo em MVC Oficial
  "masterclass_mvc": {
    filename: "COMP011_MVC.prw",
    title: "Masterclass 02: Cadastro de Clientes em MVC Oficial",
    code: `#Include "Totvs.ch"
#Include "FWMVCDef.ch"

/*/{Protheus.doc} COMP011
Exemplo oficial de Modelo de Dados e Interface em MVC (Model-View-Controller).
Atende a todas as diretrizes de governanca da Engenharia TOTVS.
@author Arquiteto Campus TOTVS
@since 06/09/2026
@version 1.0
/*/
User Function COMP011()
    Local oBrowse := FWMBrowse():New()
    oBrowse:SetAlias("SA1")
    oBrowse:SetDescription("Gestao Avancada de Clientes (Padrao MVC)")
    oBrowse:Activate()
Return Nil

// 1. MenuDef: Botoes de Acao do Browse
Static Function MenuDef()
    Local aRotina := {}
    ADD OPTION aRotina TITLE "Visualizar" ACTION "VIEWDEF.COMP011" OPERATION 2 ACCESS 0
    ADD OPTION aRotina TITLE "Incluir"    ACTION "VIEWDEF.COMP011" OPERATION 3 ACCESS 0
    ADD OPTION aRotina TITLE "Alterar"    ACTION "VIEWDEF.COMP011" OPERATION 4 ACCESS 0
    ADD OPTION aRotina TITLE "Excluir"    ACTION "VIEWDEF.COMP011" OPERATION 5 ACCESS 0
Return aRotina

// 2. ModelDef: Regras de Negocio e Estrutura de Dados
Static Function ModelDef()
    Local oStruct := FWFormStruct(1, "SA1")
    Local oModel  := MPFormModel():New("COMP011M", /*bPre*/, /*bPos*/, /*bCommit*/)

    oModel:AddFields("SA1MASTER", /*cOwner*/, oStruct)
    oModel:SetDescription("Modelo de Dados de Clientes - MVC")
    oModel:GetModel("SA1MASTER"):SetDescription("Dados Cadastrais do Cliente")
Return oModel

// 3. ViewDef: Interface Grafica (Camada de Apresentacao)
Static Function ViewDef()
    Local oModel  := FWLoadModel("COMP011")
    Local oStruct := FWFormStruct(2, "SA1")
    Local oView   := FWFormView():New()

    oView:SetModel(oModel)
    oView:AddField("VIEW_SA1", oStruct, "SA1MASTER")
    oView:CreateHorizontalBox("BOX_SUPERIOR", 100)
    oView:SetOwnerView("VIEW_SA1", "BOX_SUPERIOR")
Return oView`
  },

  // Masterclass 04: Consulta SQL de Alta Performance com DBAccess
  "masterclass_sql": {
    filename: "TCQuery_Perf.prw",
    title: "Masterclass 04: TCQuery e Arquitetura de Alta Performance",
    code: `#Include "Totvs.ch"
#Include "TopConn.ch"

/*/{Protheus.doc} U_ConsultaTop
Consulta SQL otimizada seguindo rigorosamente as regras de governanca DBAccess:
- NUNCA faz SELECT *
- Utiliza RetSqlName e delecao logica D_E_L_E_T_
- Converte dialeto com ChangeQuery()
- Fecha preventivamente e obrigatoriamente as areas de trabalho
@author Arquiteto Campus TOTVS
/*/
User Function U_ConsultaTop()
    Local cQuery    := ""
    Local cAliasQry := "QRY_CLI"
    Local nTotal    := 0
    Local cRelat    := ""

    // 1. Fechamento preventivo obrigatorio para evitar memory leak
    If Select(cAliasQry) > 0
        (cAliasQry)->(DbCloseArea())
    EndIf

    // 2. Montagem de query apenas com os campos estritamente necessarios
    cQuery := " SELECT A1_COD, A1_LOJA, A1_NOME, A1_EST, A1_MUN "
    cQuery += " FROM " + RetSqlName("SA1") + " SA1 "
    cQuery += " WHERE SA1.A1_FILIAL = '" + xFilial("SA1") + "' "
    cQuery += "   AND SA1.D_E_L_E_T_ = ' ' "
    cQuery += " ORDER BY SA1.A1_NOME "

    // 3. Conversao para dialeto do banco ativo (Oracle, SQL Server, Postgres)
    cQuery := ChangeQuery(cQuery)
    TCQuery cQuery New Alias (cAliasQry)

    cRelat := "=== CONSULTA DBACCESS DE ALTA PERFORMANCE ===" + CRLF + CRLF
    While !(cAliasQry)->(Eof())
        nTotal++
        cRelat += (cAliasQry)->A1_COD + "/" + (cAliasQry)->A1_LOJA + " - " + ;
                  PadR((cAliasQry)->A1_NOME, 28) + " | " + (cAliasQry)->A1_EST + CRLF

        (cAliasQry)->(DbSkip()) // OBRIGATORIO para evitar loop infinito
    EndDo

    // 4. Liberacao obrigatoria de recursos e conexao do DBAccess
    (cAliasQry)->(DbCloseArea())

    cRelat += CRLF + "Total de Clientes Carregados: " + cValToChar(nTotal)
    ApMsgInfo(cRelat, "DBAccess Performance TopConnect")
Return Nil`
  },

  // Masterclass 05: Web Service REST Moderno em TLPP
  "masterclass_rest": {
    filename: "ClienteAPI.tlpp",
    title: "Masterclass 05: API REST Moderna em TLPP com Decorators",
    code: `#Include "Totvs.ch"
#Include "TLPP-CORE.th"
#Include "TLPP-REST.th"

Namespace campus.totvs.apis

/*/{Protheus.doc} ClienteRest
Exemplo de API REST moderna construida em TLPP com decorators @Get e @Post.
Retorna dados estruturados em JSON para integracao corporativa.
@author Arquiteto Campus TOTVS
/*/
Class ClienteRest
    Public Method New() Constructor

    @Get(endpoint="/api/v1/clientes")
    Public Method ListarClientes() as Logical

    @Post(endpoint="/api/v1/clientes")
    Public Method CriarCliente() as Logical
EndClass

Method New() Class ClienteRest
Return Self

Method ListarClientes() as Logical Class ClienteRest
    Local jResponse := JsonObject():New()
    Local jItens    := {}
    Local jItem     := Nil

    // Montagem de payload JSON estruturado
    jResponse["status"]    := 200
    jResponse["mensagem"]  := "Clientes consultados com sucesso"
    jResponse["timestamp"] := DtoS(Date()) + " " + Time()

    jItem := JsonObject():New()
    jItem["codigo"] := "000001"
    jItem["loja"]   := "01"
    jItem["nome"]   := "TOTVS SA MATRIZ"
    jItem["cgc"]    := "53.113.791/0001-22"
    aAdd(jItens, jItem)

    jResponse["clientes"] := jItens

    // Serializacao de retorno HTTP 200 OK
    oRest:SetResponse(jResponse:ToJson())
    oRest:SetStatusCode(200)
    oRest:SetKeyHeaderResponse("Content-Type", "application/json; charset=utf-8")
Return .T.`
  }
};

// =========================================================================
// 3. MATRIZ DE SENIORIDADE E CALCULADORA DE COMPETÊNCIAS
// =========================================================================
const CAREER_SKILLS_MATRIX = [
  // Júnior
  { id: "sk_hungara", level: "junior", title: "Notação Húngara e Escopo de Variáveis", desc: "Uso correto de prefixos c, n, d, l, a, b e escopo estrito Local." },
  { id: "sk_types", level: "junior", title: "Manipulação de Tipos e Datas", desc: "Conversões com dToC, cValToChar, Val, SubStr e formatação com Transform." },
  { id: "sk_arrays", level: "junior", title: "Matrizes Multidimensionais e aAdd", desc: "Criação, busca dinâmica com aScan e ordenação com aSort." },
  { id: "sk_dialogs", level: "junior", title: "Janelas e Diálogos com MSDialog", desc: "Criação de telas visuais interativas com ApMsgInfo e botões." },
  
  // Pleno
  { id: "sk_sx", level: "pleno", title: "Dicionário de Dados SX", desc: "Domínio de SX1 (Perguntas/F12), SX2, SX3 (X3_VALID) e SIX (Índices)." },
  { id: "sk_topconn", level: "pleno", title: "TCQuery, ChangeQuery e DBAccess", desc: "Consultas SQL de alta performance, deleção lógica e fechamento de áreas." },
  { id: "sk_pe", level: "pleno", title: "Pontos de Entrada Clássicos e MVC", desc: "Customização sem alterar fontes padrão, uso estrito de GetArea/RestArea." },
  { id: "sk_mvc", level: "pleno", title: "Padrão Oficial MVC (Model-View-Controller)", desc: "Construção de rotinas com ModelDef, ViewDef, MenuDef e validações." },
  { id: "sk_fatcom", level: "pleno", title: "Processos de Faturamento e Compras", desc: "Relacionamentos entre SC5/SC6 ➔ SF2/SD2 e SC7 ➔ SF1/SD1." },
  
  // Sênior
  { id: "sk_tlpp", level: "senior", title: "TLPP Avançado, Classes e Namespaces", desc: "Orientação a objetos nativa, tipagem estática e herança no Protheus." },
  { id: "sk_rest", level: "senior", title: "Criação de APIs REST Corporativas", desc: "Endpoints @Get/@Post em TLPP com payloads JsonObject e tokens JWT." },
  { id: "sk_locks", level: "senior", title: "Transações e Concorrência (Locks)", desc: "Uso de RecLock, MsUnlock e transações seguras Begin Transaction/End Transaction." },
  { id: "sk_tunning", level: "senior", title: "Auditoria de Performance e Memory Leaks", desc: "Monitoramento de consumo de memória no AppServer e tunning de query." },
  
  // Arquiteto
  { id: "sk_rpo", level: "arquiteto", title: "Governança de RPO e Build Contínuo", desc: "Pipeline CI/CD com TOTVS CodeAnalysis, SonarQube e merge seguro." },
  { id: "sk_cluster", level: "arquiteto", title: "Alta Disponibilidade e Balanceamento", desc: "Arquitetura com múltiplos slaves, Broker e banco de dados distribuído." }
];

// =========================================================================
// 4. FUNÇÕES INTERATIVAS: CONFIGURADOR VIRTUAL SX
// =========================================================================
window.initDictionaryExplorer = function() {
  const inputSearch = document.getElementById('dictSearchInput');
  const tableContainer = document.getElementById('dictResultsContainer');
  if (!tableContainer) return;

  window.renderDictionaryTable = function(tableKey) {
    const data = TOTVS_DICTIONARY_DB[tableKey];
    if (!data) return;

    // Atualiza botões ativos
    document.querySelectorAll('.dict-quick-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-table') === tableKey);
    });

    let html = `
      <div class="dict-explorer-card">
        <div class="dict-card-top">
          <div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
              <span class="table-chip">${tableKey}</span>
              <span class="module-chip">${data.module}</span>
              <h3 style="margin: 0; font-size: 18px; color: var(--text-main); font-weight: 800;">${data.name}</h3>
            </div>
            <p style="margin: 0; font-size: 12.5px; color: var(--text-muted);">${data.description}</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="copyTableQuery('${tableKey}')" title="Copiar query DBAccess pronta desta tabela">
            📋 Copiar TCQuery Otimizada
          </button>
        </div>

        <!-- Índices SIX da Tabela -->
        <div style="margin-top: 14px; margin-bottom: 14px; background: rgba(0, 120, 255, 0.06); border: 1px solid rgba(0, 120, 255, 0.2); border-radius: 8px; padding: 10px 14px;">
          <div style="font-size: 11px; font-weight: 800; color: var(--totvs-blue); text-transform: uppercase; margin-bottom: 6px;">
            🔍 Índices Oficiais da Tabela (Tabela SIX):
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${data.indices.map(idx => `
              <div style="font-size: 11.5px; background: rgba(255,255,255,0.04); padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.08);">
                <strong style="color: var(--totvs-cyan);">Ordem ${idx.order}:</strong> <code>${idx.key}</code> <span style="color: var(--text-muted);">(${idx.desc})</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Tabela SX3 de Campos -->
        <div style="overflow-x: auto; border-radius: 8px; border: 1px solid var(--border-color);">
          <table class="dict-grid-table">
            <thead>
              <tr>
                <th>Campo (SX3)</th>
                <th>Tipo</th>
                <th>Tam.</th>
                <th>Descrição do Dicionário</th>
                <th>Validação de Usuário (X3_VALID)</th>
                <th>Inicializador Padrão (X3_RELACAO)</th>
                <th>Máscara (Picture)</th>
              </tr>
            </thead>
            <tbody>
              ${data.fields.map(f => `
                <tr>
                  <td><code style="color: var(--totvs-cyan); font-weight: 700;">${f.field}</code></td>
                  <td><span class="type-pill type-${f.type}">${f.type}</span></td>
                  <td>${f.size}${f.dec > 0 ? ',' + f.dec : ''}</td>
                  <td><strong>${f.desc}</strong></td>
                  <td>${f.valid ? `<code>${f.valid}</code>` : '<span style="color:var(--text-dim);">-</span>'}</td>
                  <td>${f.relac ? `<code>${f.relac}</code>` : '<span style="color:var(--text-dim);">-</span>'}</td>
                  <td><code>${f.picture || '-'}</code></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    tableContainer.innerHTML = html;
  };

  if (inputSearch) {
    inputSearch.addEventListener('input', (e) => {
      const q = e.target.value.trim().toUpperCase();
      if (!q) {
        renderDictionaryTable('SA1');
        return;
      }
      const matchKey = Object.keys(TOTVS_DICTIONARY_DB).find(k => k.includes(q) || TOTVS_DICTIONARY_DB[k].name.toUpperCase().includes(q));
      if (matchKey) {
        renderDictionaryTable(matchKey);
      }
    });
  }

  // Render inicial padrão com SA1
  renderDictionaryTable('SA1');
};

// =========================================================================
// 5. INJEÇÃO DE CÓDIGO NO MONACO EDITOR COM NAVEGAÇÃO IMEDIATA
// =========================================================================
window.loadCodeIntoEditor = function(snippetKey) {
  const snippet = TOTVS_CODE_SNIPPETS[snippetKey];
  if (!snippet) return;

  if (typeof switchMainSection === 'function') {
    switchMainSection('editor');
  }

  if (window.monacoEditorInstance) {
    window.monacoEditorInstance.setValue(snippet.code);
    window.monacoEditorInstance.setPosition({ lineNumber: 1, column: 1 });
  }

  const fileNameEl = document.getElementById('currentFileName');
  if (fileNameEl) {
    fileNameEl.innerText = snippet.filename;
  }

  if (typeof updateModifiedState === 'function') {
    updateModifiedState(true);
  }

  showToastNotification(`Código de "${snippet.title}" carregado no Laboratório! Pressione F5 para executar.`, '🚀');
};

window.copyTableQuery = function(tableKey) {
  const data = TOTVS_DICTIONARY_DB[tableKey];
  if (!data) return;

  const fieldList = data.fields.map(f => f.field).join(', ');
  const sql = `// Query Otimizada para ${tableKey} (${data.name})
Local cQuery := ""
Local cAlias := "QRY_${tableKey}"

If Select(cAlias) > 0
    (cAlias)->(DbCloseArea())
EndIf

cQuery := " SELECT ${fieldList} "
cQuery += " FROM " + RetSqlName("${tableKey}") + " ${tableKey} "
cQuery += " WHERE ${tableKey}.${data.fields[0].field.substring(0,2)}_FILIAL = '" + xFilial("${tableKey}") + "' "
cQuery += "   AND ${tableKey}.D_E_L_E_T_ = ' ' "
cQuery += " ORDER BY ${data.indices[0].key} "

cQuery := ChangeQuery(cQuery)
TCQuery cQuery New Alias (cAlias)

While !(cAlias)->(Eof())
    // Processamento seguro...
    (cAlias)->(DbSkip())
EndDo

(cAlias)->(DbCloseArea())`;

  navigator.clipboard.writeText(sql).then(() => {
    showToastNotification(`Query DBAccess para ${tableKey} copiada para a área de transferência!`, '📋');
  });
};

// =========================================================================
// 6. CALCULADORA DE SENIORIDADE E PROGRESSO DE CARREIRA
// =========================================================================
window.initCareerCalculator = function() {
  const container = document.getElementById('careerSkillsContainer');
  if (!container) return;

  const savedSkills = JSON.parse(localStorage.getItem('totvs_career_skills_checked') || '{}');

  function renderSkills() {
    let total = CAREER_SKILLS_MATRIX.length;
    let checkedCount = 0;

    let html = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 14px;">
    `;

    CAREER_SKILLS_MATRIX.forEach(sk => {
      const isChecked = !!savedSkills[sk.id];
      if (isChecked) checkedCount++;

      let badgeColor = '#3b82f6';
      let badgeLabel = 'Pleno';
      if (sk.level === 'junior') { badgeColor = '#10b981'; badgeLabel = 'Júnior'; }
      else if (sk.level === 'senior') { badgeColor = '#f59e0b'; badgeLabel = 'Sênior'; }
      else if (sk.level === 'arquiteto') { badgeColor = '#9333ea'; badgeLabel = 'Arquiteto'; }

      html += `
        <div class="skill-check-card ${isChecked ? 'checked' : ''}" onclick="toggleCareerSkill('${sk.id}')">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: 800; background: ${badgeColor}22; color: ${badgeColor}; border: 1px solid ${badgeColor}55; padding: 2px 7px; border-radius: 6px; text-transform: uppercase;">
              ${badgeLabel}
            </span>
            <input type="checkbox" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleCareerSkill('${sk.id}')" style="cursor: pointer; accent-color: var(--totvs-cyan);">
          </div>
          <strong style="font-size: 12.5px; color: var(--text-main); display: block; margin-bottom: 4px;">${sk.title}</strong>
          <span style="font-size: 11px; color: var(--text-muted); line-height: 1.4; display: block;">${sk.desc}</span>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // Atualiza barra de progresso e nível calculado
    const pct = Math.round((checkedCount / total) * 100);
    const progressBar = document.getElementById('careerProgressBar');
    const scoreVal = document.getElementById('careerScoreValue');
    const rankTitle = document.getElementById('careerRankTitle');

    if (progressBar) progressBar.style.width = pct + '%';
    if (scoreVal) scoreVal.innerText = `${pct}% de Prontidão (${checkedCount}/${total} Habilidades)`;

    if (rankTitle) {
      if (pct < 30) rankTitle.innerText = '🌱 Desenvolvedor Trainee / Júnior';
      else if (pct < 70) rankTitle.innerText = '⚡ Desenvolvedor Pleno';
      else if (pct < 90) rankTitle.innerText = '🔥 Desenvolvedor Sênior';
      else rankTitle.innerText = '👑 Arquiteto de Software Especialista TOTVS';
    }
  }

  window.toggleCareerSkill = function(skillId) {
    savedSkills[skillId] = !savedSkills[skillId];
    localStorage.setItem('totvs_career_skills_checked', JSON.stringify(savedSkills));
    renderSkills();
  };

  renderSkills();
};

// =========================================================================
// 7. TOAST NOTIFICATION COMPONENT
// =========================================================================
function showToastNotification(msg, icon = 'ℹ️') {
  let toast = document.getElementById('campusToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'campusToast';
    toast.className = 'campus-toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
  toast.classList.add('visible');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 4000);
}

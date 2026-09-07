#Include "Totvs.ch"
#Include "FWMVCDef.ch"

/*/{Protheus.doc} User Function Aula09
    Aula 09 - Arquitetura MVC Protheus (Model-View-Controller).
    Exemplo oficial de desacoplamento completo entre Modelo de Dados (ModelDef),
    Interface Visual (ViewDef) e Catalogo de Operacoes (MenuDef).
    @type     Function
    @author   Campus TOTVS / Pair Programming
    @since    07/09/2026
    @version  1.0
    @see      https://tdn.totvs.com/display/framework/FWFormModel
/*/
User Function Aula09()
    Local oBrowse := Nil

    // Instanciação do FWMBrowse padrao para navegacao MVC
    oBrowse := FWMBrowse():New()
    oBrowse:SetAlias("SA1")
    oBrowse:SetDescription("Cadastro de Clientes - Arquitetura MVC")
    oBrowse:Activate()

Return Nil

/*/{Protheus.doc} MenuDef
    Catalogo de operacoes da rotina MVC.
    @type     Static Function
    @return   Array, Matriz com as opcoes de menu do AxCadastro / MVC
/*/
Static Function MenuDef()
    Local aRotina := {}

    ADD OPTION aRotina TITLE "Pesquisar"  ACTION "AxPesqui"       OPERATION 1 ACCESS 0
    ADD OPTION aRotina TITLE "Visualizar" ACTION "VIEWDEF.AULA09" OPERATION 2 ACCESS 0
    ADD OPTION aRotina TITLE "Incluir"    ACTION "VIEWDEF.AULA09" OPERATION 3 ACCESS 0
    ADD OPTION aRotina TITLE "Alterar"    ACTION "VIEWDEF.AULA09" OPERATION 4 ACCESS 0
    ADD OPTION aRotina TITLE "Excluir"    ACTION "VIEWDEF.AULA09" OPERATION 5 ACCESS 0

Return aRotina

/*/{Protheus.doc} ModelDef
    Definicao do Modelo de Dados (Regras de negocio, validacoes e estrutura).
    @type     Static Function
    @return   Object, Instancia do MPFormModel
/*/
Static Function ModelDef()
    Local oModel   := MPFormModel():New("AULA09M")
    Local oStruSA1 := FWFormStruct(1, "SA1")

    // Adiciona os campos da tabela SA1 ao FormModel
    oModel:AddFields("FORMSA1", /*cOwner*/, oStruSA1)
    oModel:SetDescription("Modelo de Dados de Clientes - MVC")
    oModel:GetModel("FORMSA1"):SetDescription("Formulario de Dados do Cliente")

Return oModel

/*/{Protheus.doc} ViewDef
    Definicao da Interface Visual (Disposicao grafica dos campos e paineis).
    @type     Static Function
    @return   Object, Instancia do FWFormView
/*/
Static Function ViewDef()
    Local oModel   := FWLoadModel("AULA09")
    Local oView    := FWFormView():New()
    Local oStruSA1 := FWFormStruct(2, "SA1")

    oView:SetModel(oModel)
    oView:AddField("VIEW_SA1", oStruSA1, "FORMSA1")
    oView:CreateHorizontalBox("EMCIMA", 100)
    oView:SetOwnerView("VIEW_SA1", "EMCIMA")

Return oView

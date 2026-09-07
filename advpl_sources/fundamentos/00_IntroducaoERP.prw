#Include "Totvs.ch"

/*/{Protheus.doc} User Function Aula00
    Aula 00 - Introducao a Arquitetura ERP e Contexto Corporativo TOTVS Protheus.
    Demonstra a inicializacao de ambiente, identificacao de empresa/filial,
    tabelas do sistema (SX2) e o uso de xFilial.
    @type     Function
    @author   Campus TOTVS / Pair Programming
    @since    07/09/2026
    @version  1.0
    @see      https://tdn.totvs.com/
/*/
User Function Aula00()
    // ========================================================================
    // DECLARACAO DE VARIAVEIS (Regra Blocker SonarQube: Todas no inicio estrito)
    // ========================================================================
    Local cEmpresa  := ""
    Local cFilial   := ""
    Local cFilSA1   := ""
    Local lAmbOk    := .F.
    Local cRelat    := ""

    // ========================================================================
    // INICIALIZACAO DEFENSIVA DO AMBIENTE (Se executado fora do SmartClient padrao)
    // ========================================================================
    If Select("SX2") == 0 .Or. Type("cEmpAnt") == "U" .Or. Empty(cEmpAnt)
        If !RpcSetEnv("99", "01")
            RpcSetEnv("01", "01")
        EndIf
    EndIf

    // Leitura das Variaveis Globais de Sessao do Protheus
    cEmpresa := cEmpAnt
    cFilial  := cFilAnt
    lAmbOk   := (Select("SX2") > 0)
    cFilSA1  := xFilial("SA1") // Retorna a filial conforme compartilhamento da tabela

    // Montagem do Relatorio de Auditoria do Ambiente
    cRelat := "================================================" + CRLF
    cRelat += "   CAMPUS TOTVS - AUDITORIA DE AMBIENTE ERP    " + CRLF
    cRelat += "================================================" + CRLF + CRLF
    cRelat += "Status do Ambiente : " + Iif(lAmbOk, "CONECTADO COM SUCESSO", "FALHA DE AMBIENTE") + CRLF
    cRelat += "Empresa Ativa      : " + cEmpresa + " (Matriz)" + CRLF
    cRelat += "Filial Ativa       : " + cFilial + " (Filial Operacional)" + CRLF
    cRelat += "Filial Clientes SA1: " + Iif(Empty(cFilSA1), "[TABELA COMPARTILHADA]", cFilSA1) + CRLF
    cRelat += "Data Base Protheus : " + dToC(dDataBase) + CRLF + CRLF
    cRelat += "Dicionario de Dados: SX2 Ativo (" + cValToChar(Select("SX2")) + " areas alocadas)" + CRLF
    cRelat += "Camada Arquitetura : SmartClient -> AppServer -> DBAccess" + CRLF

    // Registro nos Logs do Servidor (FWLogMsg / ConOut)
    FWLogMsg("INFO", /*cTransaction*/, "CAMPUS_TOTVS", "AULA00", /*cStep*/, /*cMsgId*/, "Ambiente inicializado: Emp " + cEmpresa + " Fil " + cFilial, 0, 0, {})

    // Exibicao da Interface ao Usuario
    ApMsgInfo(cRelat, "Campus TOTVS - Aula 00: Arquitetura ERP")

Return Nil

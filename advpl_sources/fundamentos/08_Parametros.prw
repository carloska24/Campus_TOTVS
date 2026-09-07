#Include "Totvs.ch"

/*/{Protheus.doc} User Function Aula08
    Aula 8 - Parametros do Sistema (Tabela SX6) no Protheus.
    Os parametros SX6 sao variaveis de configuracao globais do ERP.
    Aprenda a ler parametros com GetMV(), criar parametros customizados
    e aplicar valores de configuracao na logica de negocios real,
    eliminando valores fixos no codigo (hard-coded).
    @type     Function
    @author   Antigravity / Pair Programming
    @since    05/09/2026
    @version  1.0
    @see      https://tdn.totvs.com/display/tec/GetMV
/*/
User Function Aula08()
    // Declaracao de Variaveis Locais no Topo (Regra Blocker CodeAnalysis/SonarQube)
    Local cRelatorio   := ""
    Local nLimCred     := 0
    Local nLimPed      := 0
    Local cModuloAtivo := ""
    Local nDescMax     := 0
    Local lAmbienteOk  := .F.

    // Verificacao do contexto corporativo (empresa/filial carregados)
    lAmbienteOk := (Select("SX2") > 0 .And. Type("cEmpAnt") == "C" .And. !Empty(cEmpAnt))

    If !lAmbienteOk
        cRelatorio := "=== AULA 08: PARAMETROS DO SISTEMA (SX6 - GetMV) ===" + CRLF + CRLF
        cRelatorio += "Esta aula demonstra o uso de parametros corporativos." + CRLF + CRLF
        cRelatorio += "Para executar com leitura real da tabela SX6, acesse:" + CRLF
        cRelatorio += "1. Entre no Protheus (SIGAADV) com empresa e filial" + CRLF
        cRelatorio += "2. Shift+F6 -> digite: U_AULA08" + CRLF + CRLF
        cRelatorio += "--- CONCEITO ---" + CRLF
        cRelatorio += "GetMV('MV_XPARAM') le o valor de qualquer parametro SX6." + CRLF
        cRelatorio += "PutMV('MV_XPARAM', xValor) grava o valor (use com cuidado!)." + CRLF + CRLF
        cRelatorio += "--- VANTAGEM ---" + CRLF
        cRelatorio += "Elimina valores fixos no codigo (hard-coded)." + CRLF
        cRelatorio += "O usuario de negocio altera o parametro pela tela" + CRLF
        cRelatorio += "sem precisar de um desenvolvedor para recompilar!"
        ApMsgInfo(cRelatorio, "Campus TOTVS - Aula 08: Parametros SX6")
        Return Nil
    EndIf

    // =======================================================================
    // 1. Leitura de Parametros Nativos do Protheus com GetMV()
    //    GetMV("MV_XPARAM") busca o valor atual na tabela SX6 da empresa/filial
    // =======================================================================
    nLimPed      := GetMV("MV_LIMPED")    // Limite maximo de valor por pedido de venda
    nDescMax     := GetMV("MV_PERDESC")   // Percentual maximo de desconto
    cModuloAtivo := GetMV("MV_MODFAT")    // Modulo de faturamento ativo

    // =======================================================================
    // 2. Aplicacao Pratica: Regra de Negocio baseada no parametro
    //    Em vez de "If nValor > 50000" (hard-coded), usamos o parametro!
    // =======================================================================
    nLimCred := GetMV("MV_LIMCRED")  // Limite de credito geral para novos clientes

    // =======================================================================
    // 3. Montagem do Relatorio Educativo
    // =======================================================================
    cRelatorio := "=== AULA 08: PARAMETROS DO SISTEMA (SX6) ===" + CRLF + CRLF
    cRelatorio += "Empresa/Filial: " + cEmpAnt + " / " + cFilAnt + CRLF
    cRelatorio += Replicate("-", 50) + CRLF + CRLF

    cRelatorio += "--- PARAMETROS LIDOS VIA GetMV() ---" + CRLF
    cRelatorio += PadR("Parametro", 14) + " | " + PadR("Descricao", 30) + " | Valor" + CRLF
    cRelatorio += Replicate("-", 60) + CRLF
    cRelatorio += PadR("MV_LIMPED", 14) + " | " + PadR("Limite Maximo por Pedido", 30) + " | R$ " + Transform(nLimPed, "@E 999,999.92") + CRLF
    cRelatorio += PadR("MV_PERDESC", 14) + " | " + PadR("Desconto Maximo (%)", 30) + " | " + Transform(nDescMax, "@E 99.99") + "%" + CRLF
    cRelatorio += PadR("MV_LIMCRED", 14) + " | " + PadR("Limite de Credito Padrao", 30) + " | R$ " + Transform(nLimCred, "@E 999,999.92") + CRLF
    cRelatorio += PadR("MV_MODFAT", 14) + " | " + PadR("Modulo Faturamento Ativo", 30) + " | " + cModuloAtivo + CRLF
    cRelatorio += Replicate("-", 60) + CRLF + CRLF

    cRelatorio += "--- VANTAGEM: ELIMINAR VALORES HARD-CODED ---" + CRLF
    cRelatorio += "ERRADO  : If nVlrTotal > 50000  (valor fixo no codigo!)" + CRLF
    cRelatorio += "CORRETO : If nVlrTotal > GetMV('MV_LIMPED') (configuravel!)" + CRLF + CRLF

    cRelatorio += "--- SINTAXE COMPLETA ---" + CRLF
    cRelatorio += "Leitura : xValor := GetMV('MV_PARAM')" + CRLF
    cRelatorio += "Gravacao: PutMV('MV_PARAM', xNovoValor)" + CRLF
    cRelatorio += "Consulta: Tabela SX6 > Campo X6_VAR + X6_CONTEUD"

    ApMsgInfo(cRelatorio, "Campus TOTVS - Aula 08: Parametros SX6")

Return Nil

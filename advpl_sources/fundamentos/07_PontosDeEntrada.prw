#Include "Totvs.ch"
#Include "FWMVCDef.ch"

/*/{Protheus.doc} User Function Aula07
    Aula 7 - Pontos de Entrada (Points of Entry) no Protheus.
    Os Pontos de Entrada sao ganchos (hooks) que a TOTVS disponibiliza
    dentro das rotinas padrao do ERP, permitindo que o desenvolvedor
    injete logica customizada sem alterar o codigo fonte original.
    Este exemplo demonstra o padrao de implementacao de um PE real
    e simula o comportamento do ponto de entrada MT410OK (validacao
    de pedido de venda no SIGAFAT).
    @type     Function
    @author   Antigravity / Pair Programming
    @since    04/09/2026
    @version  1.0
    @see      https://tdn.totvs.com/display/tec/Pontos+de+Entrada
/*/
User Function Aula07()
    // Declaracao de Variaveis Locais no Topo (Regra Blocker CodeAnalysis/SonarQube)
    Local cMensagem := ""
    Local cTitulo   := "Campus TOTVS - Aula 07: Pontos de Entrada"

    // Corpo educativo: explicacao completa do conceito
    cMensagem := "=== AULA 07: PONTOS DE ENTRADA (POINTS OF ENTRY) ===" + CRLF + CRLF

    cMensagem += "O que e um Ponto de Entrada?" + CRLF
    cMensagem += Replicate("-", 50) + CRLF
    cMensagem += "E um 'gancho' (hook) que a TOTVS deixa disponivel" + CRLF
    cMensagem += "dentro das rotinas padrao do ERP." + CRLF
    cMensagem += "Voce cria uma User Function com o nome exato" + CRLF
    cMensagem += "do PE e o Protheus a executa automaticamente" + CRLF
    cMensagem += "no momento certo, sem modificar o fonte TOTVS." + CRLF + CRLF

    cMensagem += "Exemplo pratico - MT410OK:" + CRLF
    cMensagem += Replicate("-", 50) + CRLF
    cMensagem += "Modulo : SIGAFAT (Faturamento)" + CRLF
    cMensagem += "Rotina : MATA410 (Pedido de Venda)" + CRLF
    cMensagem += "Momento: Ao clicar em OK/Confirmar o pedido" + CRLF
    cMensagem += "Retorno: .T. = Permite gravar | .F. = Bloqueia" + CRLF + CRLF

    cMensagem += "Regras Obrigatorias de um PE:" + CRLF
    cMensagem += Replicate("-", 50) + CRLF
    cMensagem += "1. Nome exato conforme TDN (ex: MT410OK)" + CRLF
    cMensagem += "2. Salvar e restaurar o contexto com GetArea()/RestArea()" + CRLF
    cMensagem += "3. Nunca chamar ApMsgInfo em PE de validacao" + CRLF
    cMensagem += "   (use Help() ou MsgStop() para nao travar o ERP)" + CRLF
    cMensagem += "4. Sempre retornar o tipo esperado pelo PE" + CRLF + CRLF

    cMensagem += "Consulte o codigo comentado abaixo para ver" + CRLF
    cMensagem += "a estrutura real de implementacao no Campus TOTVS!"

    ApMsgInfo(cMensagem, cTitulo)

Return Nil

/*/{Protheus.doc} MT410OK
    Ponto de Entrada: Validacao de Pedido de Venda (SIGAFAT - MATA410).
    Executado ao confirmar um pedido de venda. Retorna .T. para
    permitir a gravacao ou .F. para bloquear com mensagem ao usuario.
    @type     Function
    @author   Antigravity / Pair Programming
    @since    04/09/2026
    @version  1.0
    @return   Logical, .T. permite gravar o pedido, .F. bloqueia
    @see      https://tdn.totvs.com/display/tec/MT410OK
/*/
User Function MT410OK()
    // 1. Declaracao de Variaveis no Topo (Obrigatorio CodeAnalysis)
    Local aArea      := GetArea()    // Salva contexto de todas as areas de trabalho
    Local lRetorno   := .T.          // Por padrao, permite a gravacao
    Local nVlrTotal  := 0
    Local cCodClient := ""

    // 2. Leitura dos dados do pedido em andamento
    // As variaveis de contexto do SIGAFAT estao disponíveis no escopo Private
    // SC5 = Tabela de Cabecalho do Pedido de Venda
    If Select("SC5") > 0
        nVlrTotal  := SC5->C5_VLRTOT
        cCodClient := AllTrim(SC5->C5_CLIENTE)
    EndIf

    // 3. Regra de negocio customizada:
    //    Pedidos acima de R$ 50.000,00 requerem aprovacao (bloqueio didatico)
    If nVlrTotal > 50000
        lRetorno := .F.
        // Em PEs de validacao, usar Help() ou MsgStop() em vez de ApMsgInfo
        // para exibir mensagem de bloqueio ao operador
        Help("", 1, "MT410OK", , ;
             "Pedido bloqueado por limite de valor!" + CRLF + ;
             "Pedidos acima de R$ 50.000 requerem aprovacao gerencial." + CRLF + ;
             "Cliente: " + cCodClient + " | Valor: R$ " + ;
             Transform(nVlrTotal, "@E 999,999.92"), 1, 0)
    EndIf

    // 4. OBRIGATORIO: Restaurar o contexto original antes de retornar
    RestArea(aArea)

Return lRetorno

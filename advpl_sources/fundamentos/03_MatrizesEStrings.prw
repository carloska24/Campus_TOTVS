#Include "Totvs.ch"

/*/{Protheus.doc} User Function Aula03
    Aula 3 - Matrizes Multidimensionais, Manipulacao de Strings e Calculos em Loop.
    @type  Function
    @author Antigravity / Pair Programming
    @since 01/09/2026
    @version 1.0
/*/
User Function Aula03()
    // Declaracao de Variaveis
    Local aItens     := {}
    Local cRelatorio := ""
    Local nTotalGeral:= 0
    Local nI         := 0
    Local nSubTotal  := 0

    // 1. Montagem de Matriz Multidimensional (Tabela em Memoria)
    // Estrutura: { Codigo, Descricao, Quantidade, Valor Unitario }
    aAdd(aItens, {"PRD001", "teclado mecanico rgb pro", 2, 250.00})
    aAdd(aItens, {"PRD002", "mouse sem fio ergonomico ", 3, 120.50})
    aAdd(aItens, {"PRD003", "monitor ultrawide 29 pol ", 1, 1450.00})
    aAdd(aItens, {"PRD004", "headset gamer surround   ", 2, 320.00})

    // 2. Cabecalho do Relatorio Formatado
    cRelatorio := "=== PEDIDO DE VENDAS - LISTA DE ITENS ===" + CRLF + CRLF
    cRelatorio += PadR("CODIGO", 8) + " | " 
    cRelatorio += PadR("DESCRICAO", 26) + " | " 
    cRelatorio += "QTD | " 
    cRelatorio += "VLR TOTAL" + CRLF
    cRelatorio += Replicate("-", 62) + CRLF

    // 3. Processamento e Calculos em Loop (For...Next)
    For nI := 1 To Len(aItens)
        // Calcula o subtotal do item (Quantidade * Preco)
        nSubTotal := aItens[nI][3] * aItens[nI][4]
        nTotalGeral += nSubTotal

        // Monta a linha com funcoes de formatacao de texto
        cRelatorio += PadR(aItens[nI][1], 8) + " | "
        cRelatorio += PadR(Capital(AllTrim(aItens[nI][2])), 26) + " | "
        cRelatorio += StrZero(aItens[nI][3], 3) + " | "
        cRelatorio += Transform(nSubTotal, "@E 999,999.92") + CRLF
    Next nI

    // 4. Rodape com o Total Geral Formatado
    cRelatorio += Replicate("-", 62) + CRLF
    cRelatorio += "TOTAL GERAL DO PEDIDO: R$ " + Transform(nTotalGeral, "@E 999,999.92") + CRLF
    cRelatorio += "QUANTIDADE DE ITENS  : " + cValToChar(Len(aItens)) + " PRODUTOS"

    // 5. Exibe a tela de resultado no Protheus WebApp
    ApMsgInfo(cRelatorio, "Nivel 1 - Aula 03: Matrizes e Manipulacao de Strings")

Return Nil

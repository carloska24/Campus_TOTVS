#Include "Totvs.ch"

/*/{Protheus.doc} User Function Aula04CB
    Aula 4 - Blocos de Codigo (Codeblocks), Algoritmos de Ordenacao (aSort) e Busca (aScan).
    Conceitos: Sintaxe {|x| ...}, avaliacao com Eval(), ordenacao dinamica com aSort,
    pesquisa em matrizes com aScan e exibicao formatada.
    @type  Function
    @author Antigravity / Pair Programming
    @since 02/09/2026
    @version 1.0
/*/
User Function Aula04CB()
    // Declaracao de Variaveis
    Local aProdutos  := {}
    Local bFiltro    := Nil
    Local bOrdena    := Nil
    Local nPosBusca  := 0
    Local cRelatorio := ""
    Local nI         := 0

    // 1. Matriz Multidimensional de Produtos em Memoria
    // Estrutura: { Codigo, Descricao, Categoria, Preco }
    aAdd(aProdutos, {"PRD003", "Monitor Gamer 144Hz",      "Informatica", 1450.00})
    aAdd(aProdutos, {"PRD001", "Teclado Mecanico RGB Pro",  "Perifericos",  320.00})
    aAdd(aProdutos, {"PRD004", "Mouse Sem Fio 16000 DPI",   "Perifericos",  190.50})
    aAdd(aProdutos, {"PRD002", "Cadeira Ergonomica Mesh",   "Escritorio",   890.00})
    aAdd(aProdutos, {"PRD005", "Hub USB-C 7 em 1 Alum",     "Acessorios",   150.00})

    // 2. Blocos de Codigo (Codeblocks) - Um dos recursos mais poderosos do ADVPL
    // Bloco de comparacao: ordena a matriz pelo Preco (Coluna 4) em ordem decrescente
    bOrdena := { |x, y| x[4] > y[4] }

    // Aplica a ordenacao na matriz inteira usando o aSort nativo do Protheus
    aSort(aProdutos, , , bOrdena)

    // 3. Montagem do Relatorio dos Produtos Ordenados
    cRelatorio := "=== AULA 04: BLOCOS DE CODIGO, aSort E aScan ===" + CRLF + CRLF
    cRelatorio += "--- PRODUTOS ORDENADOS POR VALOR (MAIOR P/ MENOR) ---" + CRLF
    cRelatorio += PadR("CODIGO", 8) + " | " + PadR("DESCRICAO", 24) + " | " + PadR("CATEGORIA", 13) + " | " + "PRECO" + CRLF
    cRelatorio += Replicate("-", 64) + CRLF

    For nI := 1 To Len(aProdutos)
        cRelatorio += PadR(aProdutos[nI][1], 8) + " | "
        cRelatorio += PadR(aProdutos[nI][2], 24) + " | "
        cRelatorio += PadR(aProdutos[nI][3], 13) + " | "
        cRelatorio += Transform(aProdutos[nI][4], "@E 9,999.92") + CRLF
    Next nI

    // 4. Busca Rapida com aScan() utilizando Bloco de Codigo como Condicao
    // Localiza dinamicamente o item com codigo "PRD001"
    bFiltro   := { |x| x[1] == "PRD001" }
    nPosBusca := aScan(aProdutos, bFiltro)

    cRelatorio += Replicate("-", 64) + CRLF + CRLF
    cRelatorio += "--- BUSCA EM MEMORIA COM aScan(bBloco) ---" + CRLF

    If nPosBusca > 0
        cRelatorio += "Produto 'PRD001' encontrado na Linha: " + cValToChar(nPosBusca) + CRLF
        cRelatorio += "Descricao : " + aProdutos[nPosBusca][2] + CRLF
        cRelatorio += "Categoria : " + aProdutos[nPosBusca][3] + CRLF
        cRelatorio += "Valor     : R$ " + Transform(aProdutos[nPosBusca][4], "@E 9,999.92") + CRLF
    Else
        cRelatorio += "Produto nao localizado na matriz." + CRLF
    EndIf

    // 5. Exibe a janela de resultado no Protheus WebApp (100% de estabilidade)
    ApMsgInfo(cRelatorio, "Nivel 1 - Aula 04: Codeblocks e Algoritmos de Matriz")

Return Nil

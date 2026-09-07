#Include "Totvs.ch"

/*/{Protheus.doc} User Function Aula02B
    Aula 2B - Estruturas de Repeticao (Loops) no ADVPL.
    Dominio completo dos lacos de repeticao: While/EndDo,
    For/Next com Exit e Loop (equivalentes a break e continue),
    e diferenca pratica entre While pre-condicional e Do While pos-condicional.
    @type     Function
    @author   Antigravity / Pair Programming
    @since    05/09/2026
    @version  1.0
    @see      https://tdn.totvs.com/
/*/
User Function Aula02B()
    // Declaracao de Variaveis Locais no Topo (Regra Blocker CodeAnalysis/SonarQube)
    Local cRelatorio  := ""
    Local nContador   := 0
    Local nFatorial   := 1
    Local nNum        := 7
    Local nSoma       := 0
    Local nI          := 0

    cRelatorio := "=== AULA 02B: ESTRUTURAS DE REPETICAO (LOOPS) ===" + CRLF + CRLF

    // =======================================================================
    // 1. While / EndDo — Laco Pre-Condicional
    //    Executa enquanto a condicao for verdadeira.
    //    ATENCAO: se a condicao nunca for falsa, gera loop infinito!
    // =======================================================================
    cRelatorio += "--- 1. WHILE / ENDDO (Pre-Condicional) ---" + CRLF
    nContador  := 1
    While nContador <= 5
        cRelatorio += "  Iteracao While: " + cValToChar(nContador) + CRLF
        nContador++
    EndDo
    cRelatorio += CRLF

    // =======================================================================
    // 2. For / Next com EXIT — Equivalente ao "break" de outras linguagens
    //    Exit encerra o laco imediatamente ao ser atingido
    // =======================================================================
    cRelatorio += "--- 2. FOR / NEXT COM EXIT (Break) ---" + CRLF
    For nI := 1 To 10
        // Interrompe o laco quando encontrar o multiplo de 3 acima de 5
        If nI > 5 .And. (nI % 3 == 0)
            cRelatorio += "  Exit ativado em nI = " + cValToChar(nI) + " (multiplo de 3 > 5)" + CRLF
            Exit
        EndIf
        cRelatorio += "  Processando nI = " + cValToChar(nI) + CRLF
    Next nI
    cRelatorio += CRLF

    // =======================================================================
    // 3. For / Next com LOOP — Equivalente ao "continue" de outras linguagens
    //    Loop pula o restante da iteracao atual e vai para a proxima
    // =======================================================================
    cRelatorio += "--- 3. FOR / NEXT COM LOOP (Continue) ---" + CRLF
    cRelatorio += "  Numeros IMPARES de 1 a 10:" + CRLF
    For nI := 1 To 10
        // Pula os numeros pares
        If nI % 2 == 0
            Loop
        EndIf
        cRelatorio += "  " + cValToChar(nI) + " "
    Next nI
    cRelatorio += CRLF + CRLF

    // =======================================================================
    // 4. Calculo de Fatorial com While — Exemplo classico de acumulador
    //    Fatorial de 7 = 7 * 6 * 5 * 4 * 3 * 2 * 1 = 5040
    // =======================================================================
    cRelatorio += "--- 4. FATORIAL COM WHILE (Acumulador) ---" + CRLF
    nFatorial  := 1
    nContador  := nNum  // Inicia no proprio numero (7)
    While nContador > 0
        nFatorial *= nContador
        nContador--
    EndDo
    cRelatorio += "  " + cValToChar(nNum) + "! (Fatorial) = " + cValToChar(nFatorial) + CRLF + CRLF

    // =======================================================================
    // 5. Do While / EndDo — Laco Pos-Condicional
    //    Diferenca do While: executa o bloco PELO MENOS UMA VEZ,
    //    mesmo que a condicao ja seja falsa no inicio.
    // =======================================================================
    cRelatorio += "--- 5. DO WHILE (Pos-Condicional) ---" + CRLF
    nSoma     := 0
    nContador := 1
    Do While nContador <= 5
        nSoma += nContador
        cRelatorio += "  Soma acumulada: " + cValToChar(nSoma) + CRLF
        nContador++
    EndDo
    cRelatorio += "  Total acumulado: " + cValToChar(nSoma) + CRLF

    ApMsgInfo(cRelatorio, "Nivel 1 - Aula 02B: Estruturas de Repeticao (Loops)")

Return Nil

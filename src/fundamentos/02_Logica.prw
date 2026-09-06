#Include "Totvs.ch"

/*/{Protheus.doc} User Function Aula02
    Aula 2 - Estruturas Condicionais, Arrays Dinamicos e Funcoes Estaticas Locais.
    @type  Function
    @author Antigravity / Pair Programming
    @since 01/09/2026
    @version 1.0
/*/
User Function Aula02()
    // Declaracao de Variaveis
    Local nNota       := 8.5
    Local cStatus     := ""
    Local cFaixa      := ""
    Local aRelatorio  := {}
    Local cMensagem   := ""

    // 1. Estrutura Condicional If / ElseIf / Else
    If nNota >= 9.0
        cStatus := "Aprovado com Louvor (Top Performance)"
    ElseIf nNota >= 7.0
        cStatus := "Aprovado com Sucesso"
    ElseIf nNota >= 5.0
        cStatus := "Em Recuperacao"
    Else
        cStatus := "Reprovado"
    EndIf

    // 2. Chamada de Funcao Local (Static Function)
    cFaixa := CalcSenioridade(nNota)

    // 3. Montagem de Array Dinamico com aAdd()
    aAdd(aRelatorio, "=== PAINEL DE DESEMPENHO DO DESENVOLVEDOR ===")
    aAdd(aRelatorio, "")
    aAdd(aRelatorio, "Nota da Avaliacao : " + Transform(nNota, "@E 99.9"))
    aAdd(aRelatorio, "Resultado Final   : " + cStatus)
    aAdd(aRelatorio, "Classificacao     : " + cFaixa)
    aAdd(aRelatorio, "Total de Registros: " + cValToChar(Len(aRelatorio) + 1))

    // 4. Converte o array para texto formatado
    cMensagem := VetorParaTexto(aRelatorio)

    // 5. Exibe a tela de resultado no Protheus
    ApMsgInfo(cMensagem, "Nivel 1 - Aula 02: Condicionais e Static Functions")

Return Nil

/*/{Protheus.doc} CalcSenioridade
    Static Function: Visivel apenas dentro deste arquivo .prw.
    Utiliza Do Case para avaliar faixas de pontuacao.
    @type  Static Function
    @param nPontos, Numerico, Nota do aluno
    @return cNivel, Caractere, Nivel correspondente
/*/
Static Function CalcSenioridade(nPontos)
    Local cNivel := ""

    // Estrutura de Selecao Multipla Do Case
    Do Case
        Case nPontos >= 9.0
            cNivel := "Nivel Ouro (Senior Specialist)"
        Case nPontos >= 7.0
            cNivel := "Nivel Prata (Pleno Developer)"
        Case nPontos >= 5.0
            cNivel := "Nivel Bronze (Junior Developer)"
        Otherwise
            cNivel := "Nivel Inicial (Trainee)"
    EndCase

Return cNivel

/*/{Protheus.doc} VetorParaTexto
    Static Function para iterar o array e transformar em string com quebras CRLF.
/*/
Static Function VetorParaTexto(aVetor)
    Local cTexto := ""
    Local nI     := 0

    For nI := 1 To Len(aVetor)
        cTexto += aVetor[nI] + CRLF
    Next nI

Return cTexto

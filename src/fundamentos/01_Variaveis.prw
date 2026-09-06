#Include "Totvs.ch"

/*/{Protheus.doc} User Function Aula01
    Aula 1 - Fundamentos: Tipos de Dados, Variaveis, Escopos e Manipulacao.
    @type  Function
    @author Antigravity / Pair Programming
    @since 01/09/2026
    @version 1.0
/*/
User Function Aula01()
    // Declaracao de Variaveis Locais (Boa Pratica)
    Local cNome     := "Joao Silva"
    Local nSalario  := 4500.75
    Local dAdmissao := Date()
    Local lAtivo    := .T.
    Local aCursos   := {"ADVPL Basico", "MVC Avancado", "APIs REST em TLPP"}
    Local cResumo   := ""
    Local nI        := 0

    // Formatando e montando o texto de apresentacao
    cResumo := "=== DADOS DO COLABORADOR ===" + CRLF + CRLF
    cResumo += "Nome: " + cNome + CRLF
    cResumo += "Salario: R$ " + Transform(nSalario, "@E 999,999.92") + CRLF
    cResumo += "Data de Admissao: " + dToC(dAdmissao) + CRLF
    cResumo += "Status Ativo: " + Iif(lAtivo, "SIM", "NAO") + CRLF + CRLF
    
    cResumo += "--- Cursos Matriculados (" + cValToChar(Len(aCursos)) + ") ---" + CRLF
    For nI := 1 To Len(aCursos)
        cResumo += cValToChar(nI) + ". " + aCursos[nI] + CRLF
    Next nI

    // Exibindo a janela com os dados processados
    ApMsgInfo(cResumo, "Nivel 1 - Aula 01: Variaveis e Tipos de Dados")

Return Nil

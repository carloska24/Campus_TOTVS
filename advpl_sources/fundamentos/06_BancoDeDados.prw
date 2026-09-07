#Include "Totvs.ch"
#Include "TopConn.ch"

/*/{Protheus.doc} User Function Aula06
    Aula 6 - Banco de Dados no Protheus: TopConnect e TCQuery.
    Aprenda como consultar dados reais de tabelas do ERP (SA1 - Clientes),
    ler registros com laco While e fechar a conexao com seguranca.
    @type     Function
    @author   Antigravity / Pair Programming
    @since    04/09/2026
    @version  3.0
    @see      https://tdn.totvs.com/
/*/
User Function Aula06()
    // Declaracao de Variaveis Locais no Topo (Regra Blocker CodeAnalysis/SonarQube)
    Local cQuery     := ""
    Local cMensagem  := ""
    Local nTotalLido := 0
    Local bError     := Nil
    Local lAmbienteOk := .F.

    // 0. Verificacao do Contexto Corporativo (Empresa/Filial)
    // Conforme TDN: RpcSetEnv NAO deve ser chamado em SmartClient interativo,
    // pois ele converte a thread para Job e encerra a camada de tela do WebApp.
    lAmbienteOk := (Select("SX2") > 0 .And. Type("cEmpAnt") == "C" .And. !Empty(cEmpAnt))

    // Se o operador executou diretamente no Programa Inicial sem login prévio no ERP
    If !lAmbienteOk
        cMensagem := "=== AULA 06: BANCO DE DADOS PROTHEUS (TOPCONNECT) ===" + CRLF + CRLF
        cMensagem += "A rotina U_AULA06 foi inicializada com sucesso na interface grafica!" + CRLF + CRLF
        cMensagem += "Para ler dados reais da tabela de Clientes (SA1), o Protheus exige que o ambiente "
        cMensagem += "do ERP esteja aberto com Empresa e Filial selecionadas." + CRLF + CRLF
        cMensagem += "--- COMO CONSULTAR O BANCO REAL ---" + CRLF
        cMensagem += "1. No Programa Inicial do Webapp, execute: SIGAADV" + CRLF
        cMensagem += "2. Faca o login (ex: usuario 'admin') e confirme a Empresa 99 ou 01" + CRLF
        cMensagem += "3. Pressione a tecla de atalho [ Shift + F6 ] (Executar Programa)" + CRLF
        cMensagem += "4. Digite: U_AULA06 e clique em OK" + CRLF + CRLF
        cMensagem += "--- QUERY SQL OFICIAL (TDN) QUE SERA EXECUTADA ---" + CRLF
        cMensagem += "SELECT A1_COD, A1_NOME, A1_MUN, A1_EST FROM SA1010 WHERE D_E_L_E_T_ = ' '"

        ApMsgInfo(cMensagem, "Campus TOTVS - Aula 06: Banco de Dados")
        Return Nil
    EndIf

    // Tratamento de Excecao com Begin Sequence (Padrão Oficial de Integridade)
    bError := ErrorBlock({|e| Break(e)})
    Begin Sequence

        // 1. Fecha a area de trabalho anterior caso ainda esteja aberta na memoria
        If Select("QRY_CLI") > 0
            QRY_CLI->(DbCloseArea())
        EndIf

        // 2. Montagem da Instrucao SQL
        // A funcao RetSqlName("SA1") busca no Dicionario SX2 o nome fisico real da tabela no banco (ex: SA1010)
        cQuery := " SELECT A1_COD, A1_NOME, A1_MUN, A1_EST "
        cQuery += " FROM " + RetSqlName("SA1") + " "
        cQuery += " WHERE D_E_L_E_T_ = ' ' " // No Protheus, registros ativos possuem espaco em branco no campo de delecao logica
        cQuery += " ORDER BY A1_COD "

        // Adapta a query para a sintaxe do banco de dados em uso (Oracle, SQL Server, Postgres)
        cQuery := ChangeQuery(cQuery)

        // 3. Executa a Query via TopConnect e cria a tabela temporaria na memoria com o Alias QRY_CLI
        TCQuery cQuery New Alias "QRY_CLI"

        // 4. Verifica se a consulta retornou registros
        // Eof() significa "End of File" (Fim do Arquivo). Se for verdadeiro logo no inicio, a tabela esta vazia.
        If QRY_CLI->(Eof())
            cMensagem := "=== AULA 06: CONSULTA SQL VIA TCQUERY ===" + CRLF + CRLF
            cMensagem += "Empresa Conectada: " + cEmpAnt + " / Filial: " + cFilAnt + CRLF
            cMensagem += "A consulta SQL foi executada com sucesso no banco de dados!" + CRLF
            cMensagem += "Porem, a tabela de Clientes (SA1) ainda nao possui registros gravados nesta filial." + CRLF + CRLF
            cMensagem += "Query executada com sucesso:" + CRLF
            cMensagem += cQuery
        Else
            cMensagem := "=== AULA 06: CLIENTES RETORNADOS DO BANCO DE DADOS ===" + CRLF + CRLF
            cMensagem += "Empresa: " + cEmpAnt + " | Filial: " + cFilAnt + CRLF
            cMensagem += PadR("CODIGO", 8) + " | " + PadR("NOME DO CLIENTE", 28) + " | " + PadR("CIDADE", 15) + " | UF" + CRLF
            cMensagem += Replicate("-", 60) + CRLF

            // 5. Laco de Repeticao: Le cada linha retornada ate chegar ao fim (Eof)
            While !QRY_CLI->(Eof())
                nTotalLido++

                // Limitamos a exibicao dos primeiros 10 clientes para nao estourar a tela
                If nTotalLido <= 10
                    cMensagem += PadR(QRY_CLI->A1_COD, 8) + " | "
                    cMensagem += PadR(SubStr(QRY_CLI->A1_NOME, 1, 28), 28) + " | "
                    cMensagem += PadR(QRY_CLI->A1_MUN, 15) + " | "
                    cMensagem += QRY_CLI->A1_EST + CRLF
                EndIf

                // Pula para o proximo registro do banco
                QRY_CLI->(DbSkip())
            EndDo

            cMensagem += Replicate("-", 60) + CRLF
            cMensagem += "Total de registros encontrados no banco: " + cValToChar(nTotalLido)
        EndIf

        // 6. REGRA DE OURO: Sempre fechar a area de trabalho temporaria para liberar a memoria do servidor
        QRY_CLI->(DbCloseArea())

        // 7. Exibe a janela com os resultados da consulta
        ApMsgInfo(cMensagem, "Campus TOTVS - Aula 06: Banco de Dados")

    Recover
        // Em caso de falha no banco de dados ou TopConnect, garante liberacao de area e mensagem amigavel
        If Select("QRY_CLI") > 0
            QRY_CLI->(DbCloseArea())
        EndIf

        ApMsgStop("Falha ao consultar a tabela SA1 no banco de dados." + CRLF + ;
                  "Verifique se o serviço DBAccess está rodando e a tabela de clientes existe.", ;
                  "Campus TOTVS - Exceção de Banco")
    End Sequence
    ErrorBlock(bError)

Return Nil

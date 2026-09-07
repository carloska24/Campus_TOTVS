#Include "Totvs.ch"

/*/{Protheus.doc} User Function Aula05
    Aula 5 - Interfaces Graficas no Protheus: Janelas (MSDialog),
    Rotulos (TSay), Campos Editaveis (TGet) e Botoes de Acao (TButton).
    Conceitos: Coordenadas em PIXEL, dimensionamento de dialogs, data-binding
    de variaveis em campos editaveis e eventos de clique em botoes.
    @type  Function
    @author Antigravity / Pair Programming
    @since 02/09/2026
    @version 1.0
/*/
User Function Aula05()
    // Declaracao de Variaveis
    Local oDlg        := Nil
    Local oGetVal     := Nil
    Local oGetDesc    := Nil
    Local oSayTotal   := Nil
    Local oBtnCalc    := Nil
    Local oBtnSair    := Nil
    Local nVlrVenda   := 1500.00
    Local nPercDesc   := 10.00
    Local cTotalTxt   := "R$ 1.350,00"

    // 1. Criacao da Janela Modal (MSDialog)
    // Sintaxe em PIXEL: FROM LinhaInicial, ColunaInicial TO LinhaFinal, ColunaFinal
    DEFINE MSDIALOG oDlg TITLE "Aula 05 - Calculadora Comercial Interativa" FROM 000, 000 TO 260, 420 PIXEL

    // 2. Rotulos Explicativos (TSay) e Campos de Entrada (MSGET)
    @ 020, 020 SAY "Valor da Venda (R$):" SIZE 080, 012 OF oDlg PIXEL
    @ 018, 105 MSGET oGetVal VAR nVlrVenda PICTURE "@E 999,999.92" SIZE 070, 011 OF oDlg PIXEL

    @ 045, 020 SAY "Desconto Comercial (%):" SIZE 080, 012 OF oDlg PIXEL
    @ 043, 105 MSGET oGetDesc VAR nPercDesc PICTURE "@E 99.99" SIZE 045, 011 OF oDlg PIXEL

    // 3. Linha Divisoria Visual
    @ 068, 020 TO 069, 190 LABEL "" OF oDlg PIXEL

    // 4. Area de Exibicao do Total Calculado
    @ 080, 020 SAY "Total Liquido a Pagar:" SIZE 080, 012 OF oDlg PIXEL
    @ 080, 105 SAY oSayTotal PROMPT cTotalTxt SIZE 085, 012 COLOR CLR_BLUE OF oDlg PIXEL

    // 5. Botoes de Acao (TButton)
    // Botao Calcular: processa a regra matematica e atualiza o texto na tela
    @ 105, 040 BUTTON oBtnCalc PROMPT "Calcular" SIZE 055, 016 OF oDlg PIXEL ;
        ACTION ( cTotalTxt := CalcTotal(nVlrVenda, nPercDesc), oSayTotal:SetText(cTotalTxt) )

    // Botao Fechar: encerra a janela modal liberando os recursos
    @ 105, 115 BUTTON oBtnSair PROMPT "Fechar" SIZE 050, 016 OF oDlg PIXEL ;
        ACTION ( oDlg:End() )

    // 6. Ativacao e Exibicao da Janela Centralizada na tela do WebApp
    ACTIVATE MSDIALOG oDlg CENTERED

Return Nil

/*/{Protheus.doc} CalcTotal
    Funcao Estatica: Calcula o valor final aplicando o desconto comercial.
    @type  Static Function
    @param nVlr, Numerico, Valor bruto da venda
    @param nDesc, Numerico, Percentual de desconto
    @return cRet, Caractere, Valor formatado em moeda nacional
/*/
Static Function CalcTotal(nVlr, nDesc)
    Local nTotalLiquido := 0

    // Regra de calculo: Valor * (1 - (% Desconto / 100))
    nTotalLiquido := nVlr * (1 - (nDesc / 100))

Return "R$ " + Transform(nTotalLiquido, "@E 999,999.92")

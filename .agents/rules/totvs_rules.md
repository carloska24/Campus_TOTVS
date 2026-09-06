# Diretrizes e Regras de Qualidade TOTVS Protheus (ADVPL / TLPP)
# Fonte: TDN (TOTVS Developer Network), Engenharia Protheus & TOTVS CodeAnalysis

## 1. Regras de Compilação e Sintaxe
- Declaração de variáveis (`Local`, `Private`, `Static`) sempre no topo da função, antes de qualquer código executável.
- Notação Húngara obrigatória em todas as variáveis (`c`, `n`, `d`, `l`, `a`, `b`, `o`, `x`).
- Proibição absoluta de variáveis com escopo `Public`.
- Nunca usar alias dinâmico direto `(cAlias)->CAMPO`. Usar `(cAlias)->(FieldGet(FieldPos("CAMPO")))` ou alias fixo literal.

## 2. Banco de Dados e DBAccess
- Sempre usar `RetSqlName("TAB")` para obter nomes de tabelas físicas no banco.
- Sempre filtrar deleção lógica com `D_E_L_E_T_ = ' '`.
- Sempre aplicar `ChangeQuery(cQuery)` para portabilidade multi-banco (PostgreSQL/Oracle/MSSQL).
- Nunca usar `SELECT *`. Sempre listar campos explicitamente.
- Todo `TCQuery` deve fechar seu alias temporário com `(cAlias)->(DbCloseArea())`.
- Todo loop `While !(cAlias)->(Eof())` deve ter `(cAlias)->(DbSkip())`.
- Todo `RecLock()` deve ser pareado com `MsUnlock()`.

## 3. Ambiente e SmartClient
- NUNCA usar `RpcSetType(3)` em execuções de SmartClient ou WebApp.
- NUNCA usar `RpcClearEnv()` ao final de rotinas interativas do SmartClient.
- Para inicializar empresa/filial em execuções diretas de User Function no SmartClient:
  ```advpl
  If Select("SX2") == 0 .Or. Type("cEmpAnt") == "U" .Or. Empty(cEmpAnt)
      If !RpcSetEnv("99", "01")
          RpcSetEnv("01", "01")
      EndIf
  EndIf
  ```

## 4. Preservação de Área
- Preservar contexto de tabelas com `GetArea()` e `RestArea()`.

## 5. ProtheusDoc
- Todo fonte e toda função deve conter cabeçalho no formato ProtheusDoc (`/*/{Protheus.doc} ... /*/`).

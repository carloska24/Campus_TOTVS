# Regras Oficiais de Engenharia e Desenvolvimento TOTVS Protheus (ADVPL & TLPP)
# Versão: Atualizada 2026 | Conformidade: TDN (TOTVS Developer Network) & TOTVS CodeAnalysis

Este documento consolida as diretrizes obrigatórias de desenvolvimento, padrões de codificação, arquitetura e qualidade de código para o ecossistema TOTVS Protheus, baseado nas fontes oficiais da TOTVS (TDN, Engenharia Backoffice Protheus e regras de governança SonarQube/CodeAnalysis).

---

## 1. Regras de Ouro e Diretrizes Inegociáveis (Core Directives)

### 1.1. Ordem de Declaração de Variáveis (SonarQube Blocker)
- **TODAS** as variáveis (`Local`, `Private`, `Static`) **DEVEM** ser declaradas no início imediato da função, antes de **QUALQUER** instrução executável ou atribuição de lógica.
- Nunca declare variáveis dentro de blocos de controle (`If`, `While`, `For`) ou após comandos executáveis.

```advpl
// CORRETO (Padrão Oficial TOTVS):
User Function Exemplo()
    Local cCodigo   := ""
    Local nTotal    := 0
    Local aItens    := {}
    Local lContinua := .T.

    // Instruções executáveis somente após todas as declarações
    If lContinua
        nTotal := 10
    EndIf
Return Nil

// ERRADO (Gera Blocker no CodeAnalysis):
User Function ExemploErrado()
    Local cCodigo := ""
    cCodigo := "001"
    Local nTotal := 0 // ERRO: Declaração após comando executável!
Return Nil
```

### 1.2. Controle de Sessão e Interface Gráfica (SmartClient / WebApp)
- **NUNCA** utilize `RpcSetType(3)` em rotinas executadas pelo SmartClient ou WebApp. O tipo `3` é reservado exclusivamente para processos batch em segundo plano (*Non-UI Threads / Jobs*). Seu uso em SmartClient encerra sumariamente a camada de tela.
- **NUNCA** invoque `RpcClearEnv()` no encerramento de rotinas interativas do SmartClient, pois isso destrói o contexto de sessão do usuário e reseta a conexão para a tela de login inicial.
- Em rotinas executadas diretamente como programa inicial sem tela de login prévia, utilize exclusivamente:
  ```advpl
  If Select("SX2") == 0 .Or. Type("cEmpAnt") == "U" .Or. Empty(cEmpAnt)
      If !RpcSetEnv("99", "01")
          RpcSetEnv("01", "01")
      EndIf
  EndIf
  ```

### 1.3. Acesso a Campos por Alias Dinâmico
- **NUNCA** use a sintaxe `(cAlias)->CAMPO` em tempo de compilação quando `cAlias` for uma variável contendo o nome da área. O operador `->` do compilador ADVPL exige um identificador literal estático (ex: `QRY->CAMPO`).
- Para leitura dinâmica de campos quando o alias for uma variável, utilize:
  ```advpl
  // Leitura com alias dinâmico seguro:
  xValor := (cAlias)->(FieldGet(FieldPos("A1_NOME")))
  
  // Ou defina um alias literal na query:
  TCQuery cQuery New Alias "QRY_TRB"
  cNome := QRY_TRB->A1_NOME
  ```

---

## 2. Padrões de Banco de Dados e TopConnect (DBAccess)

### 2.1. Uso Obrigatório de `RetSqlName` e Dicionário de Dados
- **NUNCA** escreva o nome físico de tabelas de forma fixa (ex: `FROM SA1010`).
- Sempre utilize a função `RetSqlName("TABELA")`, que consulta o Dicionário de Tabelas (`SX2`) e retorna o nome real conforme a empresa ativa:
  ```advpl
  cQuery += " FROM " + RetSqlName("SA1") + " SA1 "
  ```

### 2.2. Deleção Lógica Obrigatória (`D_E_L_E_T_`)
- O Protheus utiliza deleção lógica em todas as tabelas do banco de dados.
- Toda instrução SQL direta **DEVE** incluir a cláusula de filtro de deleção lógica:
  ```advpl
  cQuery += " WHERE SA1.D_E_L_E_T_ = ' ' "
  ```

### 2.3. Portabilidade Multi-Banco com `ChangeQuery`
- Toda query montada em string **DEVE** passar pela função `ChangeQuery(cQuery)` antes de ser enviada ao `TCQuery`. Isso garante a conversão de dialetos ANSI para o SGBD em uso (Oracle, Microsoft SQL Server, PostgreSQL).

### 2.4. Fechamento Obrigatório de Áreas (`DbCloseArea`)
- O esquecimento de fechamento de áreas de trabalho abertas por `TCQuery` causa vazamento de conexões e memória (*Memory Leak*) no AppServer e DBAccess.
- Regra: Fechar preventivamente antes de abrir e fechar obrigatoriamente após consumir:
  ```advpl
  If Select("QRY_TMP") > 0
      QRY_TMP->(DbCloseArea())
  EndIf

  TCQuery cQuery New Alias "QRY_TMP"

  While !QRY_TMP->(Eof())
      // Processamento...
      QRY_TMP->(DbSkip()) // OBRIGATÓRIO para evitar loop infinito
  EndDo

  QRY_TMP->(DbCloseArea()) // LIBERAÇÃO OBRIGATÓRIA DE RECURSOS
  ```

### 2.5. Proibição de `SELECT *`
- Queries devem requisitar **apenas** os campos necessários para a operação. O tráfego desnecessário de campos afeta severamente a latência e o consumo de rede entre AppServer e DBAccess.

### 2.6. Gravação Segura com `RecLock` e `MsUnlock`
- Toda alteração ou inclusão direta em tabelas ISAM/DBAccess deve seguir o encapsulamento estrito:
  ```advpl
  RecLock("SA1", .F.) // .T. = Inclusao, .F. = Alteracao
      SA1->A1_NOME := cNovoNome
  SA1->(MsUnlock())
  ```

---

## 3. Padrão de Nomenclatura e Escopo de Variáveis (Notação Húngara)

Todo identificador deve indicar seu tipo primitivo pelo prefixo obrigatório:

| Prefixo | Tipo Primitivo | Exemplo |
| :--- | :--- | :--- |
| `c` | Character (Texto) | `cDescricao`, `cQuery` |
| `n` | Numeric (Numérico) | `nValorTotal`, `nContador` |
| `d` | Date (Data) | `dEmissao`, `dVencto` |
| `l` | Logical (Booleano) | `lSucesso`, `lProcessado` |
| `a` | Array (Vetor / Matriz) | `aClientes`, `aHeader` |
| `b` | Code Block (Bloco de Código) | `bAcao`, `bFiltro` |
| `o` | Object (Instância de Classe) | `oModel`, `oDlg` |
| `x` | Indefinido / Genérico | `xRetorno` |

### Regras de Escopo:
1. **`Local`**: O escopo padrão para 100% das variáveis internas de rotinas.
2. **`Static`**: Para variáveis persistentes restritas ao fonte atual ou funções auxiliares restritas ao arquivo (`Static Function`).
3. **`Private`**: Permitido apenas quando exigido por compatibilidade legada com padrões do ERP (como `aRotina`, `cCadastro`, `dData`).
4. **`Public`**: **TERMINANTEMENTE PROIBIDO**. Gera alerta crítico (*Blocker*) em auditorias de qualidade TOTVS.

---

## 4. Preservação de Contexto e Ponteiros (`GetArea` / `RestArea`)

Em pontos de entrada, gatilhos, validações de campo (`X3_VALID`) ou funções utilitárias que alteram a tabela corrente ou o registro posicionado, é obrigatório salvar e restaurar o contexto:

```advpl
User Function MinhaUtil()
    Local aArea   := GetArea()
    Local aAreaA1 := SA1->(GetArea())

    // Operações que mudam tabelas ou ponteiros...
    DbSelectArea("SB1")
    DbSeek(xFilial("SB1") + "PROD001")

    // Restauração obrigatória do estado anterior
    RestArea(aAreaA1)
    RestArea(aArea)
Return Nil
```

---

## 5. Padrão ProtheusDoc (Documentação Oficial)

Todos os arquivos e funções (User Functions, Static Functions, Classes) devem ser precedidos pelo bloco de documentação estruturado no padrão ProtheusDoc:

```advpl
/*/{Protheus.doc} NomeDaFuncao
    Descrição detalhada e clara da finalidade do processamento.
    @type     Function
    @author   Nome do Desenvolvedor
    @since    04/09/2026
    @version  1.0
    @param    cCodigo, Character, Código identificador do registro
    @return   Logical, Retorna .T. se processado com sucesso ou .F. em caso de erro
    @see      https://tdn.totvs.com/
/*/
```

---

## 6. Diretrizes para TLPP (TOTVS Language Plus Plus)

1. **Classes e Métodos**:
   - Atributos e protótipos de métodos devem ser definidos exclusivamente dentro do bloco `class ... endclass`.
   - A implementação dos métodos deve ocorrer **fora** do bloco `class ... endclass`.
   - **NUNCA** utilize modificadores de acesso (`public`, `private`, `protected`) na assinatura de implementação do método fora da classe.

2. **Tipagem Estática**:
   - Em fontes `.tlpp`, declare tipos estáticos nos parâmetros e retornos para validação em tempo de compilação:
     ```tlpp
     User Function CalculaImposto(nValor as Numeric, cTipo as Character) as Numeric
     ```

---

## 7. Mensageria, Logs e Tratamento de Exceções

1. **Substituição de `ConOut` por Logs Estruturados**:
   - Evite o uso desordenado de `ConOut`. Em projetos modernos, utilize a API oficial de auditoria e log: `FWLogMsg()`.
2. **Tratamento Seguro de Sequência**:
   - Rotinas críticas de integração ou banco devem utilizar blocos protegidos:
     ```advpl
     Local bError := ErrorBlock({|e| Break(e)})
     Begin Sequence
         // Código crítico...
     Recover
         // Tratamento de falha com elegância...
     End Sequence
     ErrorBlock(bError)
     ```

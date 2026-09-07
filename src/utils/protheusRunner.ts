// Simulador de Runtime Protheus Virtual
export interface IRunnerResult {
  title: string;
  output: string;
  success: boolean;
}

export function runProtheusCode(code: string, lessonId: string): IRunnerResult {
  // Verificação de sintaxe básica
  if (!code.includes("User Function") && !code.includes("Static Function")) {
    return {
      title: "Erro de Sintaxe ADVPL",
      output: "ERRO DE COMPILAÇÃO: Nenhuma porta de entrada (User Function) encontrada no fonte.",
      success: false
    };
  }

  // Simulação pedagógica por aula
  switch (lessonId) {
    case "aula00": {
      const hasRpc = /RpcSetEnv/i.test(code);
      const hasFilial = /xFilial/i.test(code);
      const hasSX2 = /SX2/i.test(code);

      let msg = "=== CAMPUS TOTVS - AUDITORIA DE AMBIENTE ERP ===\n\n";
      msg += "Status da Conexao  : CONECTADO COM SUCESSO\n";
      msg += "Empresa Ativa      : 99 (Empresa Matriz Fiscal)\n";
      msg += "Filial Ativa       : 01 (Filial Principal SP)\n";
      msg += `Filial SA1 Clientes: ${hasFilial ? "01 (xFilial ativa)" : "[COMPARTILHADA]"}\n`;
      msg += "Data Base Protheus : 07/09/2026\n\n";
      msg += `Dicionario SX2     : ${hasSX2 ? "Ativo (Tabelas do ERP carregadas no AppServer)" : "Ativo"}\n`;
      msg += `Inicializacao Rpc  : ${hasRpc ? "RpcSetEnv('99', '01') validado defensivamente" : "Sessao SmartClient Padrao"}\n`;
      msg += "Camada Arquitetura : SmartClient Desktop -> AppServer (RPO) -> DBAccess (PostgreSQL)";

      return {
        title: "Campus TOTVS - Aula 00: Arquitetura ERP",
        output: msg,
        success: true
      };
    }

    case "aula01": {
      const nomeMatch = code.match(/cNome\s*:=\s*["']([^"']+)["']/i);
      const cargoMatch = code.match(/cCargo\s*:=\s*["']([^"']+)["']/i);
      const nome = nomeMatch ? nomeMatch[1] : "Joao Silva";
      const cargo = cargoMatch ? cargoMatch[1] : null;

      let msg = "=== DADOS DO COLABORADOR ===\n\n";
      msg += `Nome: ${nome}\n`;
      if (cargo) {
        msg += `Cargo: ${cargo.padStart(30, ' ')}\n`;
      }
      msg += "Salario: R$ 4.500,75\n";
      msg += "Data de Admissao: 01/09/2026\n";
      msg += "Status Ativo: SIM\n\n";
      msg += "--- Cursos Matriculados (3) ---\n";
      msg += "1. ADVPL Basico\n2. MVC Avancado\n3. APIs REST em TLPP";

      return {
        title: "Nivel 1 - Aula 01: Variaveis e Tipos de Dados",
        output: msg,
        success: true
      };
    }

    case "aula02": {
      const hasRegras = /aRegras\s*:=/i.test(code);
      let status = "Aprovado";
      if (hasRegras) {
        status = "Master ADVPL (Top Performance)";
      }

      return {
        title: "Nivel 1 - Aula 02: Logica e Tomada de Decisao",
        output: `=== PAINEL DE APROVACAO CORPORATIVA ===\n\nAluno : Carlos Eduardo\nNota 1: 9.50\nNota 2: 8.50\nMedia Final: 9.00\n\nStatus: ${status}\n\nValidado com sucesso no Protheus Virtual!`,
        success: true
      };
    }

    case "aula02b": {
      const hasFat = /Static\s+Function\s+Fatorial/i.test(code);
      let msg = "=== AULA 02B: ESTRUTURAS DE REPETICAO (LOOPS) ===\n\n";
      msg += "--- 1. WHILE / ENDDO (Pre-Condicional) ---\n  Iteracao 1 a 5 concluida com sucesso.\n\n";
      msg += "--- 2. FOR / NEXT COM EXIT (Break) ---\n  Exit executado em nI = 6.\n\n";
      msg += "--- 3. FOR / NEXT COM LOOP (Continue) ---\n  Numeros IMPARES: 1 3 5 7 9\n\n";
      msg += "--- 4. FATORIAL COM WHILE (Acumulador) ---\n";
      msg += hasFat ? "  Static Function Fatorial(7) = 5040\n" : "  7! = 5040\n";
      msg += "\nApMsgInfo executada perfeitamente na thread interativa!";

      return {
        title: "Nivel 1 - Aula 02B: Estruturas de Repeticao",
        output: msg,
        success: true
      };
    }

    case "aula03": {
      const hasPRD5 = /PRD005/i.test(code);
      let total = 4250.00;
      if (hasPRD5) total += 280.00;

      let msg = "=== RELATORIO DE ITENS DO PEDIDO ===\n\n";
      msg += "CODIGO   | DESCRICAO                 | QTD | VALOR TOTAL\n";
      msg += "--------------------------------------------------------\n";
      msg += "PRD001   | Teclado Mecanico RGB      |   2 | R$   500,00\n";
      msg += "PRD002   | Mouse Optico Gamer        |   1 | R$   150,00\n";
      msg += "PRD003   | Monitor UltraWide 29      |   1 | R$ 1.800,00\n";
      msg += "PRD004   | Cadeira Ergonomica        |   2 | R$ 1.800,00\n";
      if (hasPRD5) {
        msg += "PRD005   | Webcam Full HD 1080p      |   1 | R$   280,00\n";
      }
      msg += "--------------------------------------------------------\n";
      msg += `TOTAL GERAL DO PEDIDO: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
      msg += `Quantidade de Produtos: ${hasPRD5 ? 5 : 4}`;

      return {
        title: "Nivel 1 - Aula 03: Matrizes e Manipulacao de Strings",
        output: msg,
        success: true
      };
    }

    case "aula04": {
      const hasBuscaCat = /bBuscaCat\s*:=/i.test(code) || /Perifericos/i.test(code);
      let msg = "=== AULA 04: BLOCOS DE CODIGO, aSort E aScan ===\n\n";
      msg += "--- PRODUTOS ORDENADOS POR VALOR (MAIOR P/ MENOR) ---\n";
      msg += "PRD003   | Monitor Gamer 144Hz      | Informatica   | R$ 1.450,00\n";
      msg += "PRD002   | Cadeira Ergonomica Mesh  | Escritorio    | R$   890,00\n";
      msg += "PRD001   | Teclado Mecanico RGB Pro | Perifericos   | R$   320,00\n";
      msg += "PRD004   | Mouse Sem Fio 16000 DPI  | Perifericos   | R$   190,50\n";
      msg += "PRD005   | Hub USB-C 7 em 1 Alum    | Acessorios    | R$   150,00\n\n";
      msg += "--- BUSCA EM MEMORIA COM aScan(bBloco) ---\n";
      if (hasBuscaCat && /bBuscaCat/i.test(code)) {
        msg += "Primeiro produto da categoria 'Perifericos' encontrado:\n";
        msg += "Descricao : Teclado Mecanico RGB Pro\n";
        msg += "Categoria : Perifericos\n";
        msg += "Valor     : R$ 320,00";
      } else {
        msg += "Produto 'PRD001' encontrado na Linha: 3\n";
        msg += "Descricao : Teclado Mecanico RGB Pro\n";
        msg += "Categoria : Perifericos\n";
        msg += "Valor     : R$ 320,00";
      }

      return {
        title: "Nivel 1 - Aula 04: Codeblocks e Algoritmos de Matriz",
        output: msg,
        success: true
      };
    }

    case "aula05": {
      const hasIOF = /nTaxaIOF/i.test(code) || /CalcComIOF/i.test(code);
      let msg = "=== SIMULACAO INTERATIVA: CALCULADORA COMERCIAL ===\n\n";
      msg += "Valor Bruto da Venda: R$ 1.500,00\n";
      msg += "Desconto Comercial  : 10.00% (- R$ 150,00)\n";
      msg += "Subtotal Liquido    : R$ 1.350,00\n";
      if (hasIOF) {
        msg += "Aliquota de IOF     : 0.38%\n";
        msg += "Valor Final com IOF : R$ 1.355,13\n\n";
        msg += "Interface MSDialog com cascata tributária renderizada com sucesso!";
      } else {
        msg += "Total Liquido       : R$ 1.350,00";
      }

      return {
        title: "Aula 05 - Calculadora Comercial Interativa (MSDialog)",
        output: msg,
        success: true
      };
    }

    case "aula06": {
      const hasFilterSP = /A1_EST\s*=\s*['"]SP['"]/i.test(code);
      const hasOrderLC = /A1_LC/i.test(code);

      let msg = "=== AULA 06: CLIENTES RETORNADOS DO BANCO (TCQUERY) ===\n\n";
      msg += "Empresa: 99 | Filial: 01\n";
      msg += "CODIGO   | NOME DO CLIENTE              | CIDADE          | UF\n";
      msg += "------------------------------------------------------------\n";
      if (hasFilterSP && hasOrderLC) {
        msg += "CLI001   | INDUSTRIA PAULISTA DE PECAS  | SAO PAULO       | SP\n";
        msg += "CLI004   | METALURGICA CAMPINAS LTDA    | CAMPINAS        | SP\n";
        msg += "CLI007   | DISTRIBUIDORA SANTOS & CIA   | SANTOS          | SP\n";
        msg += "------------------------------------------------------------\n";
        msg += "Total de clientes do estado 'SP' ordenados por LC: 3";
      } else {
        msg += "CLI001   | COMERCIAL SILVA LTDA         | SAO PAULO       | SP\n";
        msg += "CLI002   | MINAS ACO E PECAS S/A        | BELO HORIZONTE  | MG\n";
        msg += "CLI003   | SUL LOGISTICA INTEGRADA      | CURITIBA        | PR\n";
        msg += "------------------------------------------------------------\n";
        msg += "Total de registros encontrados: 3";
      }

      return {
        title: "Campus TOTVS - Aula 06: Banco de Dados",
        output: msg,
        success: true
      };
    }

    case "aula07": {
      const hasEntregaCheck = /C5_ENTREG/i.test(code) && (/<.*C5_EMISSAO\s*\+\s*5/i.test(code) || /C5_ENTREG.*-.*C5_EMISSAO/i.test(code));
      let msg = "=== VALIDACAO DE PEDIDO DE VENDA (MATA410) ===\n\n";
      msg += "Ponto de Entrada MT410OK executado no SIGAFAT!\n";
      msg += "Ponteiros e contexto de tabelas preservados com GetArea() e RestArea().\n\n";
      if (hasEntregaCheck) {
        msg += "--- TRAVA DE NEGOCIO ADICIONADA ---\n";
        msg += "Validacao de Prazo de Entrega: C5_ENTREG < C5_EMISSAO + 5\n";
        msg += "Pedido com prazo inferior a 5 dias bloqueado com Help() ou MsgStop()!\n";
        msg += "Retorno: .F. quando prazo for violado / .T. quando conforme.";
      } else {
        msg += "Retorno: .T. (Permissao de Gravacao Concedida).";
      }

      return {
        title: "Ponto de Entrada MT410OK - SIGAFAT",
        output: msg,
        success: true
      };
    }

    case "aula08": {
      const hasDynamicCheck = /GetMV\s*\(\s*["']MV_LIMPED["']/i.test(code) && /If\s+/i.test(code);

      let msg = "=== AULA 08: PARAMETROS DO SISTEMA (SX6 - GetMV) ===\n\n";
      msg += "Empresa/Filial: 99 / 01\n";
      msg += "------------------------------------------------------------\n";
      msg += "--- PARAMETROS LIDOS VIA GetMV() ---\n";
      msg += "Parametro      | Descricao                    | Valor\n";
      msg += "----------------------------------------------------------\n";
      msg += "MV_LIMPED      | Limite Maximo por Pedido     | R$  50.000,00\n";
      msg += "MV_PERDESC     | Desconto Maximo (%)          | 15.00%\n";
      msg += "MV_LIMCRED     | Limite de Credito Padrao     | R$  20.000,00\n";
      msg += "MV_MODFAT      | Modulo Faturamento Ativo     | S\n";
      msg += "----------------------------------------------------------\n\n";
      if (hasDynamicCheck) {
        msg += "--- VALIDACAO DINAMICA ATIVA ---\n";
        msg += "Pedido de R$ 75.000,00 comparado com GetMV('MV_LIMPED')\n";
        msg += "AVISO: Limite maximo por pedido ultrapassado! Bloqueado com Help().";
      } else {
        msg += "--- VANTAGEM ---\n";
        msg += "Elimina valores fixos no codigo (hard-coded).\n";
        msg += "O usuario de negocio altera o parametro na tela sem recompilar!";
      }

      return {
        title: "Campus TOTVS - Aula 08: Parametros SX6",
        output: msg,
        success: true
      };
    }

    case "aula09": {
      const hasMenu = /MenuDef/i.test(code);
      const hasModel = /ModelDef/i.test(code) && /MPFormModel/i.test(code);
      const hasView = /ViewDef/i.test(code) && /FWFormView/i.test(code);

      let msg = "=== AMBIENTE MVC PROTHEUS INICIALIZADO ===\n\n";
      msg += "Rotina: AULA09 (Cadastro de Clientes MVC)\n";
      msg += "Tabela Base: SA1 (Clientes)\n";
      msg += "------------------------------------------------------------\n";
      msg += `1. MenuDef : ${hasMenu ? "Operacoes AxPesqui e VIEWDEF registradas" : "Nao configurado"}\n`;
      msg += `2. ModelDef: ${hasModel ? "MPFormModel com estrutura SA1 e validacoes ativas" : "Nao configurado"}\n`;
      msg += `3. ViewDef : ${hasView ? "FWFormView desacoplada desenhada na tela" : "Nao configurado"}\n`;
      msg += "------------------------------------------------------------\n\n";
      msg += "FWMBrowse ativo e pronto para navegacao e manutencao de registros!";

      return {
        title: "Campus TOTVS - Aula 09: Arquitetura MVC",
        output: msg,
        success: true
      };
    }

    default: {
      return {
        title: "Execução Protheus Virtual",
        output: "Rotina executada com sucesso no ambiente Protheus Virtual!\nNenhum erro de sintaxe detectado.",
        success: true
      };
    }
  }
}

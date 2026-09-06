/**
 * Campus TOTVS - Features de Alto Nível
 * Arquiteto Sênior & Professor Titular de Backoffice Protheus
 * 
 * Contém:
 * 1. Banco de Metadados do Configurador Virtual (Tabelas SX)
 * 2. Banco de Códigos Práticos para Módulos ERP (SIGA) e Masterclasses
 * 3. Matriz Interativa de Competências e Calculadora de Senioridade
 * 4. Funções de Interação e Injeção de Código no Monaco Editor
 */

// =========================================================================
// 1. BANCO DE METADADOS OFICIAL DO PROTHEUS (DICIONÁRIO SX VIRTUAL)
// =========================================================================
const TOTVS_DICTIONARY_DB = {
  "SA1": {
    name: "Clientes",
    description: "Cadastro geral de clientes e parceiros comerciais de venda (SIGAFAT).",
    module: "SIGAFAT",
    indices: [
      { order: 1, key: "A1_FILIAL + A1_COD + A1_LOJA", desc: "Código + Loja (Chave Primária)" },
      { order: 2, key: "A1_FILIAL + A1_NOME", desc: "Razão Social" },
      { order: 3, key: "A1_FILIAL + A1_CGC", desc: "CNPJ / CPF" }
    ],
    fields: [
      { field: "A1_COD", type: "C", size: 6, dec: 0, desc: "Código do Cliente", valid: "ExistChav('SA1')", relac: "GetSX8Num('SA1','A1_COD')", picture: "@!" },
      { field: "A1_LOJA", type: "C", size: 2, dec: 0, desc: "Loja do Cliente", valid: "", relac: "'01'", picture: "@!" },
      { field: "A1_NOME", type: "C", size: 40, dec: 0, desc: "Razão Social", valid: "Texto()", relac: "", picture: "@!" },
      { field: "A1_NREDUZ", type: "C", size: 20, dec: 0, desc: "Nome Fantasia", valid: "", relac: "", picture: "@!" },
      { field: "A1_TIPO", type: "C", size: 1, dec: 0, desc: "Tipo (F=Fis / J=Jur)", valid: "Pertence('F/J/X/R')", relac: "'J'", picture: "@!" },
      { field: "A1_CGC", type: "C", size: 14, dec: 0, desc: "CNPJ ou CPF", valid: "CGC(M->A1_CGC)", relac: "", picture: "@R 99.999.999/9999-99" },
      { field: "A1_EST", type: "C", size: 2, dec: 0, desc: "Estado (UF)", valid: "ExistCpo('SX5','12'+M->A1_EST)", relac: "'SP'", picture: "@!" },
      { field: "A1_MUN", type: "C", size: 30, dec: 0, desc: "Município", valid: "", relac: "", picture: "@!" },
      { field: "A1_EMAIL", type: "C", size: 60, dec: 0, desc: "E-mail de Contato", valid: "", relac: "", picture: "" }
    ]
  },
  "SA2": {
    name: "Fornecedores",
    description: "Cadastro de fornecedores, credores e parceiros de compra (SIGACOM/FIN).",
    module: "SIGACOM",
    indices: [
      { order: 1, key: "A2_FILIAL + A2_COD + A2_LOJA", desc: "Código + Loja (Chave Primária)" },
      { order: 2, key: "A2_FILIAL + A2_NOME", desc: "Razão Social do Fornecedor" },
      { order: 3, key: "A2_FILIAL + A2_CGC", desc: "CNPJ ou CPF do Fornecedor" }
    ],
    fields: [
      { field: "A2_COD", type: "C", size: 6, dec: 0, desc: "Código do Fornecedor", valid: "ExistChav('SA2')", relac: "GetSX8Num('SA2','A2_COD')", picture: "@!" },
      { field: "A2_LOJA", type: "C", size: 2, dec: 0, desc: "Loja do Fornecedor", valid: "", relac: "'01'", picture: "@!" },
      { field: "A2_NOME", type: "C", size: 40, dec: 0, desc: "Razão Social", valid: "Texto()", relac: "", picture: "@!" },
      { field: "A2_NREDUZ", type: "C", size: 20, dec: 0, desc: "Nome Fantasia", valid: "", relac: "", picture: "@!" },
      { field: "A2_TIPO", type: "C", size: 1, dec: 0, desc: "Tipo (F=Fis / J=Jur)", valid: "Pertence('F/J/X/R')", relac: "'J'", picture: "@!" },
      { field: "A2_CGC", type: "C", size: 14, dec: 0, desc: "CNPJ ou CPF", valid: "CGC(M->A2_CGC)", relac: "", picture: "@R 99.999.999/9999-99" },
      { field: "A2_EST", type: "C", size: 2, dec: 0, desc: "Estado (UF)", valid: "ExistCpo('SX5','12'+M->A2_EST)", relac: "'SP'", picture: "@!" },
      { field: "A2_MUN", type: "C", size: 30, dec: 0, desc: "Município", valid: "", relac: "", picture: "@!" },
      { field: "A2_BANCO", type: "C", size: 3, dec: 0, desc: "Banco Padrão", valid: "ExistCpo('SA6')", relac: "", picture: "@!" }
    ]
  },
  "SA3": {
    name: "Vendedores & Representantes",
    description: "Cadastro de vendedores internos e representantes externos (SIGAFAT).",
    module: "SIGAFAT",
    indices: [
      { order: 1, key: "A3_FILIAL + A3_COD", desc: "Código do Vendedor (Chave Primária)" },
      { order: 2, key: "A3_FILIAL + A3_NOME", desc: "Nome do Vendedor" }
    ],
    fields: [
      { field: "A3_COD", type: "C", size: 6, dec: 0, desc: "Código do Vendedor", valid: "ExistChav('SA3')", relac: "GetSX8Num('SA3','A3_COD')", picture: "@!" },
      { field: "A3_NOME", type: "C", size: 40, dec: 0, desc: "Nome Completo", valid: "Texto()", relac: "", picture: "@!" },
      { field: "A3_NREDUZ", type: "C", size: 20, dec: 0, desc: "Nome Reduzido", valid: "", relac: "", picture: "@!" },
      { field: "A3_COMIS", type: "N", size: 5, dec: 2, desc: "% Comissão Padrão", valid: "Positivo()", relac: "0", picture: "@E 99.99" },
      { field: "A3_EMAIL", type: "C", size: 60, dec: 0, desc: "E-mail de Contato", valid: "", relac: "", picture: "" }
    ]
  },
  "SB1": {
    name: "Produtos & Serviços",
    description: "Cadastro mestre de itens, matérias-primas e serviços (SIGAEST/COM/FAT).",
    module: "SIGAEST",
    indices: [
      { order: 1, key: "B1_FILIAL + B1_COD", desc: "Código do Produto (Chave Primária)" },
      { order: 2, key: "B1_FILIAL + B1_DESC", desc: "Descrição do Produto" },
      { order: 3, key: "B1_FILIAL + B1_TIPO", desc: "Tipo do Produto" }
    ],
    fields: [
      { field: "B1_COD", type: "C", size: 15, dec: 0, desc: "Código do Produto", valid: "ExistChav('SB1')", relac: "", picture: "@!" },
      { field: "B1_DESC", type: "C", size: 30, dec: 0, desc: "Descrição do Produto", valid: "Texto()", relac: "", picture: "@!" },
      { field: "B1_TIPO", type: "C", size: 2, dec: 0, desc: "Tipo (PA, MP, PI, SV)", valid: "ExistCpo('SX5','02'+M->B1_TIPO)", relac: "'PA'", picture: "@!" },
      { field: "B1_UM", type: "C", size: 2, dec: 0, desc: "Unidade de Medida", valid: "ExistCpo('SAH')", relac: "'UN'", picture: "@!" },
      { field: "B1_LOCPAD", type: "C", size: 2, dec: 0, desc: "Almoxarifado Padrão", valid: "ExistCpo('NNR')", relac: "'01'", picture: "@!" },
      { field: "B1_POSIPI", type: "C", size: 10, dec: 0, desc: "NCM / Classif. Fiscal", valid: "ExistCpo('SYD')", relac: "", picture: "@R 9999.99.99" },
      { field: "B1_PESO", type: "N", size: 9, dec: 4, desc: "Peso Líquido", valid: "Positivo()", relac: "0", picture: "@E 9,999.9999" }
    ]
  },
  "SB2": {
    name: "Saldos Físico e Financeiro",
    description: "Controle de saldos em estoque, custo médio e empenhos por armazém (SIGAEST).",
    module: "SIGAEST",
    indices: [
      { order: 1, key: "B2_FILIAL + B2_COD + B2_LOCAL", desc: "Produto + Local (Chave Primária)" },
      { order: 2, key: "B2_FILIAL + B2_LOCAL + B2_COD", desc: "Local + Produto" }
    ],
    fields: [
      { field: "B2_COD", type: "C", size: 15, dec: 0, desc: "Código do Produto", valid: "ExistCpo('SB1')", relac: "", picture: "@!" },
      { field: "B2_LOCAL", type: "C", size: 2, dec: 0, desc: "Almoxarifado / Armazém", valid: "ExistCpo('NNR')", relac: "'01'", picture: "@!" },
      { field: "B2_QATU", type: "N", size: 12, dec: 2, desc: "Quantidade Atual em Estoque", valid: "", relac: "0", picture: "@E 999,999.99" },
      { field: "B2_RESERVA", type: "N", size: 12, dec: 2, desc: "Quantidade Reservada/Empenhada", valid: "", relac: "0", picture: "@E 999,999.99" },
      { field: "B2_QPEDVEN", type: "N", size: 12, dec: 2, desc: "Quantidade em Pedidos de Venda", valid: "", relac: "0", picture: "@E 999,999.99" },
      { field: "B2_CM1", type: "N", size: 14, dec: 4, desc: "Custo Médio Unitário (Moeda 1)", valid: "Positivo()", relac: "0", picture: "@E 999,999.9999" },
      { field: "B2_VATU1", type: "N", size: 16, dec: 2, desc: "Valor Total Atual em Estoque", valid: "", relac: "0", picture: "@E 999,999,999.92" }
    ]
  },
  "SD3": {
    name: "Movimentações Internas de Estoque",
    description: "Requisições, devoluções, transferências e apontamentos de produção (SIGAEST).",
    module: "SIGAEST",
    indices: [
      { order: 1, key: "D3_FILIAL + D3_DOC + D3_EMISSAO", desc: "Documento + Emissão" },
      { order: 2, key: "D3_FILIAL + D3_COD + D3_LOCAL", desc: "Produto + Almoxarifado" }
    ],
    fields: [
      { field: "D3_DOC", type: "C", size: 9, dec: 0, desc: "Número do Documento", valid: "", relac: "", picture: "@!" },
      { field: "D3_TM", type: "C", size: 3, dec: 0, desc: "Tipo de Movimento (SF5)", valid: "ExistCpo('SF5')", relac: "'501'", picture: "@!" },
      { field: "D3_COD", type: "C", size: 15, dec: 0, desc: "Código do Produto", valid: "ExistCpo('SB1')", relac: "", picture: "@!" },
      { field: "D3_UM", type: "C", size: 2, dec: 0, desc: "Unidade de Medida", valid: "", relac: "Posicione('SB1',1,xFilial('SB1')+M->D3_COD,'B1_UM')", picture: "@!" },
      { field: "D3_QUANT", type: "N", size: 12, dec: 2, desc: "Quantidade Movimentada", valid: "Positivo()", relac: "1", picture: "@E 999,999.99" },
      { field: "D3_LOCAL", type: "C", size: 2, dec: 0, desc: "Almoxarifado", valid: "ExistCpo('NNR')", relac: "'01'", picture: "@!" },
      { field: "D3_EMISSAO", type: "D", size: 8, dec: 0, desc: "Data da Movimentação", valid: "NaoVazio()", relac: "dDataBase", picture: "" },
      { field: "D3_CUSTO1", type: "N", size: 14, dec: 2, desc: "Custo Total do Movimento", valid: "", relac: "", picture: "@E 999,999.99" }
    ]
  },
  "SC1": {
    name: "Solicitações de Compras",
    description: "Necessidades internas de compra emitidas pelos setores ou MRP (SIGACOM).",
    module: "SIGACOM",
    indices: [
      { order: 1, key: "C1_FILIAL + C1_NUM + C1_ITEM", desc: "Número + Item (Chave Primária)" },
      { order: 2, key: "C1_FILIAL + C1_PRODUTO", desc: "Código do Produto" }
    ],
    fields: [
      { field: "C1_NUM", type: "C", size: 6, dec: 0, desc: "Número da Solicitação", valid: "ExistChav('SC1')", relac: "GetSX8Num('SC1','C1_NUM')", picture: "@!" },
      { field: "C1_ITEM", type: "C", size: 4, dec: 0, desc: "Item Sequencial", valid: "", relac: "'0001'", picture: "@!" },
      { field: "C1_PRODUTO", type: "C", size: 15, dec: 0, desc: "Código do Produto", valid: "ExistCpo('SB1')", relac: "", picture: "@!" },
      { field: "C1_DESCRI", type: "C", size: 30, dec: 0, desc: "Descrição do Item", valid: "", relac: "", picture: "@!" },
      { field: "C1_QUANT", type: "N", size: 12, dec: 2, desc: "Quantidade Solicitada", valid: "Positivo()", relac: "1", picture: "@E 999,999.99" },
      { field: "C1_DATPRF", type: "D", size: 8, dec: 0, desc: "Data de Necessidade", valid: "", relac: "dDataBase + 7", picture: "" },
      { field: "C1_SOLICIT", type: "C", size: 25, dec: 0, desc: "Nome do Solicitante", valid: "", relac: "cUserName", picture: "@!" }
    ]
  },
  "SC5": {
    name: "Cabeçalho do Pedido de Venda",
    description: "Cabeçalho das negociações comerciais e pedidos de clientes (SIGAFAT).",
    module: "SIGAFAT",
    indices: [
      { order: 1, key: "C5_FILIAL + C5_NUM", desc: "Número do Pedido (Chave Primária)" },
      { order: 2, key: "C5_FILIAL + C5_CLIENTE + C5_LOJACLI", desc: "Cliente + Loja" },
      { order: 3, key: "C5_FILIAL + C5_EMISSAO", desc: "Data de Emissão" }
    ],
    fields: [
      { field: "C5_NUM", type: "C", size: 6, dec: 0, desc: "Número do Pedido", valid: "ExistChav('SC5')", relac: "GetSX8Num('SC5','C5_NUM')", picture: "@!" },
      { field: "C5_TIPO", type: "C", size: 1, dec: 0, desc: "Tipo do Pedido (N=Normal/B=Benef)", valid: "Pertence('N/B/D/C/P/I')", relac: "'N'", picture: "@!" },
      { field: "C5_CLIENTE", type: "C", size: 6, dec: 0, desc: "Código do Cliente", valid: "ExistCpo('SA1',M->C5_CLIENTE)", relac: "", picture: "@!" },
      { field: "C5_LOJACLI", type: "C", size: 2, dec: 0, desc: "Loja do Cliente", valid: "ExistCpo('SA1',M->C5_CLIENTE+M->C5_LOJACLI)", relac: "'01'", picture: "@!" },
      { field: "C5_EMISSAO", type: "D", size: 8, dec: 0, desc: "Data de Emissão", valid: "NaoVazio()", relac: "dDataBase", picture: "" },
      { field: "C5_CONDPAG", type: "C", size: 3, dec: 0, desc: "Condição de Pagamento", valid: "ExistCpo('SE4')", relac: "", picture: "@!" },
      { field: "C5_VEND1", type: "C", size: 6, dec: 0, desc: "Vendedor Principal", valid: "ExistCpo('SA3')", relac: "", picture: "@!" }
    ]
  },
  "SC6": {
    name: "Itens do Pedido de Venda",
    description: "Produtos, quantidades, preços e TES de cada item do pedido (SIGAFAT).",
    module: "SIGAFAT",
    indices: [
      { order: 1, key: "C6_FILIAL + C6_NUM + C6_ITEM", desc: "Pedido + Item" },
      { order: 2, key: "C6_FILIAL + C6_PRODUTO", desc: "Produto" }
    ],
    fields: [
      { field: "C6_NUM", type: "C", size: 6, dec: 0, desc: "Número do Pedido", valid: "", relac: "M->C5_NUM", picture: "@!" },
      { field: "C6_ITEM", type: "C", size: 2, dec: 0, desc: "Item Sequencial", valid: "", relac: "", picture: "@!" },
      { field: "C6_PRODUTO", type: "C", size: 15, dec: 0, desc: "Código do Produto", valid: "ExistCpo('SB1')", relac: "", picture: "@!" },
      { field: "C6_DESCRI", type: "C", size: 30, dec: 0, desc: "Descrição do Item", valid: "", relac: "Posicione('SB1',1,xFilial('SB1')+M->C6_PRODUTO,'B1_DESC')", picture: "@!" },
      { field: "C6_QTDVEN", type: "N", size: 12, dec: 2, desc: "Quantidade Vendida", valid: "Positivo()", relac: "1", picture: "@E 999,999.99" },
      { field: "C6_PRCVEN", type: "N", size: 14, dec: 2, desc: "Preço Unitário", valid: "Positivo()", relac: "", picture: "@E 999,999.99" },
      { field: "C6_VALOR", type: "N", size: 14, dec: 2, desc: "Valor Total do Item", valid: "", relac: "M->C6_QTDVEN * M->C6_PRCVEN", picture: "@E 999,999.99" },
      { field: "C6_TES", type: "C", size: 3, dec: 0, desc: "Tipo de Entrada/Saída", valid: "ExistCpo('SF4')", relac: "", picture: "@!" }
    ]
  },
  "SC7": {
    name: "Pedidos de Compras",
    description: "Pedidos formalizados enviados aos fornecedores com prazos e valores (SIGACOM).",
    module: "SIGACOM",
    indices: [
      { order: 1, key: "C7_FILIAL + C7_NUM + C7_ITEM", desc: "Pedido + Item (Chave Primária)" },
      { order: 2, key: "C7_FILIAL + C7_FORNECE + C7_LOJA", desc: "Fornecedor + Loja" },
      { order: 3, key: "C7_FILIAL + C7_PRODUTO", desc: "Produto" }
    ],
    fields: [
      { field: "C7_NUM", type: "C", size: 6, dec: 0, desc: "Número do Pedido de Compra", valid: "ExistChav('SC7')", relac: "GetSX8Num('SC7','C7_NUM')", picture: "@!" },
      { field: "C7_ITEM", type: "C", size: 4, dec: 0, desc: "Item do Pedido", valid: "", relac: "'0001'", picture: "@!" },
      { field: "C7_PRODUTO", type: "C", size: 15, dec: 0, desc: "Código do Produto", valid: "ExistCpo('SB1')", relac: "", picture: "@!" },
      { field: "C7_FORNECE", type: "C", size: 6, dec: 0, desc: "Código do Fornecedor", valid: "ExistCpo('SA2')", relac: "", picture: "@!" },
      { field: "C7_LOJA", type: "C", size: 2, dec: 0, desc: "Loja do Fornecedor", valid: "", relac: "'01'", picture: "@!" },
      { field: "C7_QUANT", type: "N", size: 12, dec: 2, desc: "Quantidade Pedida", valid: "Positivo()", relac: "1", picture: "@E 999,999.99" },
      { field: "C7_PRECO", type: "N", size: 14, dec: 4, desc: "Preço Unitário", valid: "Positivo()", relac: "", picture: "@E 999,999.9999" },
      { field: "C7_TOTAL", type: "N", size: 14, dec: 2, desc: "Total do Item", valid: "", relac: "M->C7_QUANT * M->C7_PRECO", picture: "@E 999,999.99" },
      { field: "C7_EMISSAO", type: "D", size: 8, dec: 0, desc: "Data de Emissão", valid: "NaoVazio()", relac: "dDataBase", picture: "" }
    ]
  },
  "SF1": {
    name: "Cabeçalho NF de Entrada",
    description: "Notas fiscais de entrada de mercadorias, devoluções e fretes (SIGACOM/FIS).",
    module: "SIGACOM",
    indices: [
      { order: 1, key: "F1_FILIAL + F1_DOC + F1_SERIE + F1_FORNECE + F1_LOJA + F1_TIPO", desc: "NF + Série + Fornecedor + Loja" },
      { order: 2, key: "F1_FILIAL + F1_FORNECE + F1_LOJA", desc: "Fornecedor + Loja" },
      { order: 3, key: "F1_FILIAL + F1_EMISSAO", desc: "Data de Emissão" }
    ],
    fields: [
      { field: "F1_DOC", type: "C", size: 9, dec: 0, desc: "Número da NF", valid: "NaoVazio()", relac: "", picture: "@!" },
      { field: "F1_SERIE", type: "C", size: 3, dec: 0, desc: "Série da Nota Fiscal", valid: "", relac: "'1  '", picture: "@!" },
      { field: "F1_FORNECE", type: "C", size: 6, dec: 0, desc: "Código do Fornecedor", valid: "ExistCpo('SA2')", relac: "", picture: "@!" },
      { field: "F1_LOJA", type: "C", size: 2, dec: 0, desc: "Loja do Fornecedor", valid: "", relac: "'01'", picture: "@!" },
      { field: "F1_EMISSAO", type: "D", size: 8, dec: 0, desc: "Data de Emissão", valid: "NaoVazio()", relac: "dDataBase", picture: "" },
      { field: "F1_DTDIGIT", type: "D", size: 8, dec: 0, desc: "Data de Digitação", valid: "", relac: "dDataBase", picture: "" },
      { field: "F1_VALBRUT", type: "N", size: 16, dec: 2, desc: "Valor Bruto da NF", valid: "Positivo()", relac: "", picture: "@E 999,999,999.92" },
      { field: "F1_ESPECIE", type: "C", size: 5, dec: 0, desc: "Espécie (SPED, NFE)", valid: "", relac: "'SPED'", picture: "@!" }
    ]
  },
  "SD1": {
    name: "Itens da NF de Entrada",
    description: "Itens recebidos, impostos creditados, TES e amarração com pedidos (SIGACOM/FIS).",
    module: "SIGACOM",
    indices: [
      { order: 1, key: "D1_FILIAL + D1_DOC + D1_SERIE + D1_FORNECE + D1_LOJA + D1_ITEM", desc: "Documento + Série + Fornecedor + Item" },
      { order: 2, key: "D1_FILIAL + D1_COD", desc: "Produto" }
    ],
    fields: [
      { field: "D1_DOC", type: "C", size: 9, dec: 0, desc: "Número da NF", valid: "", relac: "M->F1_DOC", picture: "@!" },
      { field: "D1_SERIE", type: "C", size: 3, dec: 0, desc: "Série da NF", valid: "", relac: "M->F1_SERIE", picture: "@!" },
      { field: "D1_ITEM", type: "C", size: 4, dec: 0, desc: "Item da Nota", valid: "", relac: "'0001'", picture: "@!" },
      { field: "D1_COD", type: "C", size: 15, dec: 0, desc: "Código do Produto", valid: "ExistCpo('SB1')", relac: "", picture: "@!" },
      { field: "D1_QUANT", type: "N", size: 12, dec: 2, desc: "Quantidade Recebida", valid: "Positivo()", relac: "1", picture: "@E 999,999.99" },
      { field: "D1_VUNIT", type: "N", size: 14, dec: 4, desc: "Valor Unitário", valid: "Positivo()", relac: "", picture: "@E 999,999.9999" },
      { field: "D1_TOTAL", type: "N", size: 16, dec: 2, desc: "Total do Item", valid: "", relac: "M->D1_QUANT * M->D1_VUNIT", picture: "@E 999,999,999.92" },
      { field: "D1_TES", type: "C", size: 3, dec: 0, desc: "Tipo de Entrada (TES)", valid: "ExistCpo('SF4')", relac: "", picture: "@!" }
    ]
  },
  "SF2": {
    name: "Cabeçalho NF de Saída",
    description: "Notas fiscais de venda emitidas, DANFE, chave da NF-e e totais (SIGAFAT/FIS).",
    module: "SIGAFAT",
    indices: [
      { order: 1, key: "F2_FILIAL + F2_DOC + F2_SERIE + F2_CLIENTE + F2_LOJA", desc: "NF + Série + Cliente + Loja" },
      { order: 2, key: "F2_FILIAL + F2_CLIENTE + F2_LOJA", desc: "Cliente + Loja" },
      { order: 3, key: "F2_FILIAL + F2_EMISSAO", desc: "Data de Emissão" }
    ],
    fields: [
      { field: "F2_DOC", type: "C", size: 9, dec: 0, desc: "Número da NF", valid: "ExistChav('SF2')", relac: "GetSX8Num('SF2','F2_DOC')", picture: "@!" },
      { field: "F2_SERIE", type: "C", size: 3, dec: 0, desc: "Série da Nota Fiscal", valid: "", relac: "'1  '", picture: "@!" },
      { field: "F2_CLIENTE", type: "C", size: 6, dec: 0, desc: "Código do Cliente", valid: "ExistCpo('SA1')", relac: "", picture: "@!" },
      { field: "F2_LOJA", type: "C", size: 2, dec: 0, desc: "Loja do Cliente", valid: "", relac: "'01'", picture: "@!" },
      { field: "F2_EMISSAO", type: "D", size: 8, dec: 0, desc: "Data de Emissão", valid: "", relac: "dDataBase", picture: "" },
      { field: "F2_VALBRUT", type: "N", size: 16, dec: 2, desc: "Valor Total da Nota", valid: "Positivo()", relac: "", picture: "@E 999,999,999.92" },
      { field: "F2_CHVNFE", type: "C", size: 44, dec: 0, desc: "Chave da NF-e (44 Dígitos)", valid: "", relac: "", picture: "@!" }
    ]
  },
  "SD2": {
    name: "Itens da NF de Saída",
    description: "Itens faturados, impostos destacados (ICMS, IPI, PIS, COFINS) e TES (SIGAFAT/FIS).",
    module: "SIGAFAT",
    indices: [
      { order: 1, key: "D2_FILIAL + D2_DOC + D2_SERIE + D2_CLIENTE + D2_LOJA + D2_ITEM", desc: "Documento + Série + Cliente + Item" },
      { order: 2, key: "D2_FILIAL + D2_COD", desc: "Produto" }
    ],
    fields: [
      { field: "D2_DOC", type: "C", size: 9, dec: 0, desc: "Número da NF", valid: "", relac: "M->F2_DOC", picture: "@!" },
      { field: "D2_SERIE", type: "C", size: 3, dec: 0, desc: "Série da NF", valid: "", relac: "M->F2_SERIE", picture: "@!" },
      { field: "D2_ITEM", type: "C", size: 2, dec: 0, desc: "Item da Nota", valid: "", relac: "'01'", picture: "@!" },
      { field: "D2_COD", type: "C", size: 15, dec: 0, desc: "Código do Produto", valid: "ExistCpo('SB1')", relac: "", picture: "@!" },
      { field: "D2_QUANT", type: "N", size: 12, dec: 2, desc: "Quantidade Faturada", valid: "Positivo()", relac: "1", picture: "@E 999,999.99" },
      { field: "D2_PRCVEN", type: "N", size: 14, dec: 2, desc: "Preço de Venda", valid: "Positivo()", relac: "", picture: "@E 999,999.99" },
      { field: "D2_TOTAL", type: "N", size: 16, dec: 2, desc: "Total do Item", valid: "", relac: "M->D2_QUANT * M->D2_PRCVEN", picture: "@E 999,999,999.92" },
      { field: "D2_TES", type: "C", size: 3, dec: 0, desc: "Tipo de Saída (TES)", valid: "ExistCpo('SF4')", relac: "", picture: "@!" }
    ]
  },
  "SF4": {
    name: "Tipos de Entrada e Saída (TES)",
    description: "Regras fiscais mestras: gera duplicata, movimenta estoque, calcula impostos (SIGAFIS).",
    module: "SIGAFIS",
    indices: [
      { order: 1, key: "F4_FILIAL + F4_CODIGO", desc: "Código da TES (Chave Primária)" },
      { order: 2, key: "F4_FILIAL + F4_TEXTO", desc: "Descrição da Operação" }
    ],
    fields: [
      { field: "F4_CODIGO", type: "C", size: 3, dec: 0, desc: "Código da TES (001 a 999)", valid: "ExistChav('SF4')", relac: "", picture: "@!" },
      { field: "F4_TIPO", type: "C", size: 1, dec: 0, desc: "Tipo (E=Entrada / S=Saída)", valid: "Pertence('E/S')", relac: "'S'", picture: "@!" },
      { field: "F4_TEXTO", type: "C", size: 20, dec: 0, desc: "Descrição Resumida", valid: "", relac: "", picture: "@!" },
      { field: "F4_ESTOQUE", type: "C", size: 1, dec: 0, desc: "Movimenta Estoque? (S/N)", valid: "Pertence('S/N')", relac: "'S'", picture: "@!" },
      { field: "F4_DUPLIC", type: "C", size: 1, dec: 0, desc: "Gera Financeiro? (S/N)", valid: "Pertence('S/N')", relac: "'S'", picture: "@!" },
      { field: "F4_ICM", type: "C", size: 1, dec: 0, desc: "Calcula ICMS? (S/N)", valid: "Pertence('S/N')", relac: "'S'", picture: "@!" },
      { field: "F4_IPI", type: "C", size: 1, dec: 0, desc: "Calcula IPI? (S/N)", valid: "Pertence('S/N')", relac: "'N'", picture: "@!" },
      { field: "F4_PISCOF", type: "C", size: 1, dec: 0, desc: "Calcula PIS/COFINS? (1/2/3/4)", valid: "", relac: "'1'", picture: "@!" }
    ]
  },
  "SE1": {
    name: "Contas a Receber",
    description: "Títulos financeiros gerados por vendas ou faturamento manual (SIGAFIN).",
    module: "SIGAFIN",
    indices: [
      { order: 1, key: "E1_FILIAL + E1_PREFIXO + E1_NUM + E1_PARCELA + E1_TIPO", desc: "Chave do Título (Primária)" },
      { order: 2, key: "E1_FILIAL + E1_CLIENTE + E1_LOJA", desc: "Cliente + Loja" },
      { order: 3, key: "E1_FILIAL + E1_VENCTO", desc: "Data de Vencimento" }
    ],
    fields: [
      { field: "E1_PREFIXO", type: "C", size: 3, dec: 0, desc: "Prefixo do Título", valid: "", relac: "'FAT'", picture: "@!" },
      { field: "E1_NUM", type: "C", size: 9, dec: 0, desc: "Número do Título", valid: "", relac: "", picture: "@!" },
      { field: "E1_PARCELA", type: "C", size: 2, dec: 0, desc: "Parcela do Título", valid: "", relac: "'A'", picture: "@!" },
      { field: "E1_TIPO", type: "C", size: 3, dec: 0, desc: "Tipo (NF, DP, BOL)", valid: "ExistCpo('05')", relac: "'NF'", picture: "@!" },
      { field: "E1_CLIENTE", type: "C", size: 6, dec: 0, desc: "Código do Cliente", valid: "ExistCpo('SA1')", relac: "", picture: "@!" },
      { field: "E1_LOJA", type: "C", size: 2, dec: 0, desc: "Loja do Cliente", valid: "", relac: "'01'", picture: "@!" },
      { field: "E1_EMISSAO", type: "D", size: 8, dec: 0, desc: "Data de Emissão", valid: "", relac: "dDataBase", picture: "" },
      { field: "E1_VENCTO", type: "D", size: 8, dec: 0, desc: "Data de Vencimento", valid: "M->E1_VENCTO >= M->E1_EMISSAO", relac: "", picture: "" },
      { field: "E1_VALOR", type: "N", size: 16, dec: 2, desc: "Valor do Título", valid: "Positivo()", relac: "", picture: "@E 999,999,999.92" },
      { field: "E1_SALDO", type: "N", size: 16, dec: 2, desc: "Saldo em Aberto", valid: "", relac: "M->E1_VALOR", picture: "@E 999,999,999.92" }
    ]
  },
  "SE2": {
    name: "Contas a Pagar",
    description: "Títulos financeiros devidos a fornecedores e tributos (SIGAFIN).",
    module: "SIGAFIN",
    indices: [
      { order: 1, key: "E2_FILIAL + E2_PREFIXO + E2_NUM + E2_PARCELA + E2_TIPO", desc: "Chave do Título a Pagar" },
      { order: 2, key: "E2_FILIAL + E2_FORNECE + E2_LOJA", desc: "Fornecedor + Loja" },
      { order: 3, key: "E2_FILIAL + E2_VENCTO", desc: "Data de Vencimento" }
    ],
    fields: [
      { field: "E2_PREFIXO", type: "C", size: 3, dec: 0, desc: "Prefixo do Título", valid: "", relac: "'COM'", picture: "@!" },
      { field: "E2_NUM", type: "C", size: 9, dec: 0, desc: "Número do Título", valid: "", relac: "", picture: "@!" },
      { field: "E2_PARCELA", type: "C", size: 2, dec: 0, desc: "Parcela do Título", valid: "", relac: "'A'", picture: "@!" },
      { field: "E2_TIPO", type: "C", size: 3, dec: 0, desc: "Tipo do Título", valid: "", relac: "'NF'", picture: "@!" },
      { field: "E2_FORNECE", type: "C", size: 6, dec: 0, desc: "Código do Fornecedor", valid: "ExistCpo('SA2')", relac: "", picture: "@!" },
      { field: "E2_LOJA", type: "C", size: 2, dec: 0, desc: "Loja do Fornecedor", valid: "", relac: "'01'", picture: "@!" },
      { field: "E2_VALOR", type: "N", size: 16, dec: 2, desc: "Valor a Pagar", valid: "Positivo()", relac: "", picture: "@E 999,999,999.92" },
      { field: "E2_SALDO", type: "N", size: 16, dec: 2, desc: "Saldo em Aberto", valid: "", relac: "M->E2_VALOR", picture: "@E 999,999,999.92" }
    ]
  },
  "SE5": {
    name: "Movimentação Bancária",
    description: "Baixas a receber/pagar, cheques, conciliação e fluxo financeiro (SIGAFIN).",
    module: "SIGAFIN",
    indices: [
      { order: 1, key: "E5_FILIAL + DTOS(E5_DATA) + E5_BANCO + E5_AGENCIA + E5_CONTA", desc: "Data + Banco + Agência + Conta" },
      { order: 2, key: "E5_FILIAL + E5_PREFIXO + E5_NUMERO + E5_PARCELA + E5_TIPO", desc: "Amarração com Título Financeiro" }
    ],
    fields: [
      { field: "E5_DATA", type: "D", size: 8, dec: 0, desc: "Data do Movimento", valid: "NaoVazio()", relac: "dDataBase", picture: "" },
      { field: "E5_VALOR", type: "N", size: 16, dec: 2, desc: "Valor da Movimentação", valid: "Positivo()", relac: "", picture: "@E 999,999,999.92" },
      { field: "E5_BANCO", type: "C", size: 3, dec: 0, desc: "Código do Banco", valid: "ExistCpo('SA6')", relac: "", picture: "@!" },
      { field: "E5_AGENCIA", type: "C", size: 5, dec: 0, desc: "Agência Bancária", valid: "", relac: "", picture: "@!" },
      { field: "E5_CONTA", type: "C", size: 10, dec: 0, desc: "Conta Corrente", valid: "", relac: "", picture: "@!" },
      { field: "E5_DOCUMEN", type: "C", size: 9, dec: 0, desc: "Número do Documento", valid: "", relac: "", picture: "@!" },
      { field: "E5_MOTBX", type: "C", size: 3, dec: 0, desc: "Motivo da Baixa (NOR, DAC, etc)", valid: "", relac: "'NOR'", picture: "@!" },
      { field: "E5_HISTOR", type: "C", size: 40, dec: 0, desc: "Histórico da Movimentação", valid: "", relac: "", picture: "@!" }
    ]
  },
  "CT2": {
    name: "Lançamentos Contábeis",
    description: "Partidas dobradas, débitos, créditos e histórico da contabilidade (SIGACTB).",
    module: "SIGACTB",
    indices: [
      { order: 1, key: "CT2_FILIAL + DTOS(CT2_DATA) + CT2_LOTE + CT2_SBLOTE + CT2_DOC + CT2_LINHA", desc: "Data + Lote + Doc + Linha (Primária)" },
      { order: 2, key: "CT2_FILIAL + CT2_DEBITO + DTOS(CT2_DATA)", desc: "Conta Débito + Data" },
      { order: 3, key: "CT2_FILIAL + CT2_CREDIT + DTOS(CT2_DATA)", desc: "Conta Crédito + Data" }
    ],
    fields: [
      { field: "CT2_DATA", type: "D", size: 8, dec: 0, desc: "Data do Lançamento", valid: "NaoVazio()", relac: "dDataBase", picture: "" },
      { field: "CT2_LOTE", type: "C", size: 6, dec: 0, desc: "Número do Lote", valid: "", relac: "'000001'", picture: "@!" },
      { field: "CT2_DOC", type: "C", size: 6, dec: 0, desc: "Documento Contábil", valid: "", relac: "'000001'", picture: "@!" },
      { field: "CT2_LINHA", type: "C", size: 3, dec: 0, desc: "Linha Sequencial", valid: "", relac: "'001'", picture: "@!" },
      { field: "CT2_DEBITO", type: "C", size: 20, dec: 0, desc: "Conta Contábil Débito", valid: "ExistCpo('CT1')", relac: "", picture: "@!" },
      { field: "CT2_CREDIT", type: "C", size: 20, dec: 0, desc: "Conta Contábil Crédito", valid: "ExistCpo('CT1')", relac: "", picture: "@!" },
      { field: "CT2_VALOR", type: "N", size: 16, dec: 2, desc: "Valor do Lançamento", valid: "Positivo()", relac: "", picture: "@E 999,999,999.92" },
      { field: "CT2_HIST", type: "C", size: 40, dec: 0, desc: "Histórico Contábil", valid: "", relac: "", picture: "@!" }
    ]
  },
  "SX1": {
    name: "Perguntas do ERP (Pergunte)",
    description: "Dicionário de filtros de relatórios, rotinas e grupos de perguntas (SIGACFG).",
    module: "SIGACFG",
    indices: [
      { order: 1, key: "X1_GRUPO + X1_ORDEM", desc: "Grupo + Ordem (Chave Primária)" }
    ],
    fields: [
      { field: "X1_GRUPO", type: "C", size: 10, dec: 0, desc: "Grupo da Pergunta", valid: "NaoVazio()", relac: "", picture: "@!" },
      { field: "X1_ORDEM", type: "C", size: 2, dec: 0, desc: "Ordem / Sequência", valid: "", relac: "'01'", picture: "@!" },
      { field: "X1_PERGUNT", type: "C", size: 30, dec: 0, desc: "Texto da Pergunta", valid: "", relac: "", picture: "" },
      { field: "X1_VARIAVL", type: "C", size: 6, dec: 0, desc: "Variável Criada (mv_ch1)", valid: "", relac: "'mv_ch1'", picture: "@!" },
      { field: "X1_TIPO", type: "C", size: 1, dec: 0, desc: "Tipo do Dado (C, N, D)", valid: "Pertence('C/N/D')", relac: "'C'", picture: "@!" },
      { field: "X1_TAMANHO", type: "N", size: 3, dec: 0, desc: "Tamanho do Campo", valid: "Positivo()", relac: "10", picture: "999" },
      { field: "X1_GSC", type: "C", size: 1, dec: 0, desc: "Tipo Interface (G=Get/C=Combo)", valid: "Pertence('G/C/R')", relac: "'G'", picture: "@!" }
    ]
  },
  "SX2": {
    name: "Dicionário de Tabelas do ERP",
    description: "Catálogo mestre de todas as tabelas lógicas e físicas do banco de dados (SIGACFG).",
    module: "SIGACFG",
    indices: [
      { order: 1, key: "X2_CHAVE", desc: "Alias da Tabela (Chave Primária)" }
    ],
    fields: [
      { field: "X2_CHAVE", type: "C", size: 3, dec: 0, desc: "Alias da Tabela (ex: SA1)", valid: "ExistChav('SX2')", relac: "", picture: "@!" },
      { field: "X2_NOME", type: "C", size: 30, dec: 0, desc: "Nome da Tabela", valid: "", relac: "", picture: "" },
      { field: "X2_ARQUIVO", type: "C", size: 8, dec: 0, desc: "Nome Físico no DBAccess", valid: "", relac: "", picture: "@!" },
      { field: "X2_MODO", type: "C", size: 1, dec: 0, desc: "Compartilhamento (E=Excl/C=Comp)", valid: "Pertence('E/C')", relac: "'E'", picture: "@!" },
      { field: "X2_ROTINA", type: "C", size: 15, dec: 0, desc: "Rotina Padrão do Menu", valid: "", relac: "", picture: "@!" }
    ]
  },
  "SX3": {
    name: "Dicionário de Campos e Validações",
    description: "Coração das regras de negócio: tipos, tamanhos, validações e inicializadores (SIGACFG).",
    module: "SIGACFG",
    indices: [
      { order: 1, key: "X3_ARQUIVO + X3_ORDEM", desc: "Tabela + Ordem do Campo" },
      { order: 2, key: "X3_CAMPO", desc: "Nome do Campo (ex: A1_NOME)" }
    ],
    fields: [
      { field: "X3_ARQUIVO", type: "C", size: 3, dec: 0, desc: "Alias da Tabela", valid: "ExistCpo('SX2')", relac: "", picture: "@!" },
      { field: "X3_ORDEM", type: "C", size: 2, dec: 0, desc: "Ordem Visual em Tela", valid: "", relac: "", picture: "@!" },
      { field: "X3_CAMPO", type: "C", size: 10, dec: 0, desc: "Nome do Campo Protheus", valid: "ExistChav('SX3',M->X3_CAMPO)", relac: "", picture: "@!" },
      { field: "X3_TIPO", type: "C", size: 1, dec: 0, desc: "Tipo (C=Carac, N=Num, D=Data)", valid: "Pertence('C/N/D/M/L')", relac: "'C'", picture: "@!" },
      { field: "X3_TAMANHO", type: "N", size: 3, dec: 0, desc: "Tamanho em Caracteres", valid: "Positivo()", relac: "10", picture: "999" },
      { field: "X3_TITULO", type: "C", size: 18, dec: 0, desc: "Título / Cabeçalho", valid: "", relac: "", picture: "" },
      { field: "X3_VALID", type: "C", size: 80, dec: 0, desc: "Validação ADVPL (X3_VALID)", valid: "", relac: "", picture: "" },
      { field: "X3_RELACAO", type: "C", size: 80, dec: 0, desc: "Inicializador Padrão", valid: "", relac: "", picture: "" },
      { field: "X3_PICTURE", type: "C", size: 20, dec: 0, desc: "Máscara de Formatação", valid: "", relac: "", picture: "" }
    ]
  },
  "SIX": {
    name: "Dicionário de Índices do Protheus",
    description: "Chaves de ordenação física criadas no DBAccess para alta performance (SIGACFG).",
    module: "SIGACFG",
    indices: [
      { order: 1, key: "INDICE + ORDEM", desc: "Tabela + Ordem do Índice" }
    ],
    fields: [
      { field: "INDICE", type: "C", size: 3, dec: 0, desc: "Alias da Tabela", valid: "ExistCpo('SX2')", relac: "", picture: "@!" },
      { field: "ORDEM", type: "C", size: 2, dec: 0, desc: "Número da Ordem (1, 2...)", valid: "", relac: "'1'", picture: "@!" },
      { field: "CHAVE", type: "C", size: 100, dec: 0, desc: "Expressão ADVPL do Índice", valid: "", relac: "", picture: "" },
      { field: "DESCRICAO", type: "C", size: 40, dec: 0, desc: "Descrição Funcional", valid: "", relac: "", picture: "" },
      { field: "PROPRI", type: "C", size: 1, dec: 0, desc: "Proprietário (S=Sistema/U=User)", valid: "Pertence('S/U')", relac: "'S'", picture: "@!" }
    ]
  },
  "SX6": {
    name: "Parâmetros Globais do ERP",
    description: "Configurações gerais do sistema recuperadas via função GetMv() (SIGACFG).",
    module: "SIGACFG",
    indices: [
      { order: 1, key: "X6_FIL + X6_VAR", desc: "Filial + Nome do Parâmetro (Primária)" }
    ],
    fields: [
      { field: "X6_VAR", type: "C", size: 10, dec: 0, desc: "Nome do Parâmetro (ex: MV_ESTNEG)", valid: "ExistChav('SX6')", relac: "", picture: "@!" },
      { field: "X6_TIPO", type: "C", size: 1, dec: 0, desc: "Tipo do Conteúdo (C/N/L/D)", valid: "Pertence('C/N/L/D')", relac: "'C'", picture: "@!" },
      { field: "X6_DESCRIC", type: "C", size: 50, dec: 0, desc: "Descrição Funcional", valid: "", relac: "", picture: "" },
      { field: "X6_CONTEUD", type: "C", size: 80, dec: 0, desc: "Conteúdo / Valor do Parâmetro", valid: "", relac: "", picture: "" },
      { field: "X6_PROPRI", type: "C", size: 1, dec: 0, desc: "Proprietário (S=Padrão/U=Custom)", valid: "", relac: "'S'", picture: "@!" }
    ]
  },
  "SF4": {
    name: "Tipos de Entrada e Saída (TES)",
    description: "Coração fiscal do Protheus: tributação ICMS, IPI, PIS, COFINS, estoque e financeiro (SIGAFIS).",
    module: "SIGAFIS",
    indices: [
      { order: 1, key: "F4_FILIAL + F4_CODIGO", desc: "Código do TES (Chave Primária)" },
      { order: 2, key: "F4_FILIAL + F4_CF", desc: "CFOP Padrão da Operação" }
    ],
    fields: [
      { field: "F4_CODIGO", type: "C", size: 3, dec: 0, desc: "Código do TES", valid: "ExistChav('SF4')", relac: "", picture: "@!" },
      { field: "F4_TIPO", type: "C", size: 1, dec: 0, desc: "Tipo (E=Entrada/S=Saída)", valid: "Pertence('E/S')", relac: "'S'", picture: "@!" },
      { field: "F4_CF", type: "C", size: 5, dec: 0, desc: "CFOP Oficial", valid: "ExistCpo('13')", relac: "", picture: "@!" },
      { field: "F4_DUPLIC", type: "C", size: 1, dec: 0, desc: "Gera Financeiro (S/N)", valid: "Pertence('S/N')", relac: "'S'", picture: "@!" },
      { field: "F4_ESTOQUE", type: "C", size: 1, dec: 0, desc: "Atualiza Estoque (S/N)", valid: "Pertence('S/N')", relac: "'S'", picture: "@!" },
      { field: "F4_ICM", type: "C", size: 1, dec: 0, desc: "Calcula ICMS (S/N)", valid: "Pertence('S/N')", relac: "'S'", picture: "@!" },
      { field: "F4_IPI", type: "C", size: 1, dec: 0, desc: "Calcula IPI (R/B/N)", valid: "Pertence('R/B/N/S')", relac: "'N'", picture: "@!" },
      { field: "F4_PISCOF", type: "C", size: 1, dec: 0, desc: "Crédito PIS/COFINS (1..4)", valid: "", relac: "'1'", picture: "@!" },
      { field: "F4_TEXTO", type: "C", size: 20, dec: 0, desc: "Descrição do TES", valid: "", relac: "", picture: "" }
    ]
  }
};

// =========================================================================
// 2. BANCO DE CÓDIGOS OFICIAIS PARA INJEÇÃO NO LABORATÓRIO (MÓDULOS & MASTER)
// =========================================================================
const TOTVS_CODE_SNIPPETS = {
  // Ponto de Entrada de Validação de Pedido de Venda (SIGAFAT)
  "pe_mata410": {
    filename: "M410LIOK.prw",
    title: "Ponto de Entrada: M410LIOK (Validação de Linha do Pedido)",
    code: `#Include "Totvs.ch"

/*/{Protheus.doc} M410LIOK
Ponto de Entrada oficial do SIGAFAT executado na validacao da linha de itens do Pedido de Venda (MATA410).
Retorna .T. para permitir prosseguir ou .F. para bloquear o item.
@author Arquiteto Campus TOTVS
@since 06/09/2026
@version 1.0
/*/
User Function M410LIOK()
    Local aArea     := GetArea()
    Local lRetorno  := .T.
    Local cProduto  := ""
    Local nQtd      := 0
    Local nPreco    := 0
    Local nPosProd  := aScan(aHeader, {|x| AllTrim(x[2]) == "C6_PRODUTO"})
    Local nPosQtd   := aScan(aHeader, {|x| AllTrim(x[2]) == "C6_QTDVEN"})
    Local nPosPrc   := aScan(aHeader, {|x| AllTrim(x[2]) == "C6_PRCVEN"})

    // Leitura das colunas atuais da linha posicionada no grid
    If nPosProd > 0 .And. nPosQtd > 0 .And. nPosPrc > 0
        cProduto := aCols[n, nPosProd]
        nQtd     := aCols[n, nPosQtd]
        nPreco   := aCols[n, nPosPrc]

        // Regra de Negocio: Bloqueia item se quantidade for zero ou preco abaixo do minimo
        If nQtd <= 0
            Help("", 1, "M410LIOK", , "Quantidade informada invalida! Deve ser maior que zero.", 1, 0)
            lRetorno := .F.
        ElseIf nPreco < 5.00
            Help("", 1, "M410LIOK", , "Preco unitario abaixo da tabela minima permitida (R$ 5,00)!", 1, 0)
            lRetorno := .F.
        EndIf
    EndIf

    // Exibicao de log de auditoria no Protheus Virtual
    ApMsgInfo("Validacao M410LIOK executada com sucesso!" + CRLF + ;
              "Produto: " + cProduto + CRLF + ;
              "Resultado: " + Iif(lRetorno, "Linha APROVADA", "Linha BLOQUEADA"), ;
              "Auditoria SIGAFAT - Ponto de Entrada")

    RestArea(aArea)
Return lRetorno`
  },

  // Masterclass 02: Cadastro Completo em MVC Oficial
  "masterclass_mvc": {
    filename: "COMP011_MVC.prw",
    title: "Masterclass 02: Cadastro de Clientes em MVC Oficial",
    code: `#Include "Totvs.ch"
#Include "FWMVCDef.ch"

/*/{Protheus.doc} COMP011
Exemplo oficial de Modelo de Dados e Interface em MVC (Model-View-Controller).
Atende a todas as diretrizes de governanca da Engenharia TOTVS.
@author Arquiteto Campus TOTVS
@since 06/09/2026
@version 1.0
/*/
User Function COMP011()
    Local oBrowse := FWMBrowse():New()
    oBrowse:SetAlias("SA1")
    oBrowse:SetDescription("Gestao Avancada de Clientes (Padrao MVC)")
    oBrowse:Activate()
Return Nil

// 1. MenuDef: Botoes de Acao do Browse
Static Function MenuDef()
    Local aRotina := {}
    ADD OPTION aRotina TITLE "Visualizar" ACTION "VIEWDEF.COMP011" OPERATION 2 ACCESS 0
    ADD OPTION aRotina TITLE "Incluir"    ACTION "VIEWDEF.COMP011" OPERATION 3 ACCESS 0
    ADD OPTION aRotina TITLE "Alterar"    ACTION "VIEWDEF.COMP011" OPERATION 4 ACCESS 0
    ADD OPTION aRotina TITLE "Excluir"    ACTION "VIEWDEF.COMP011" OPERATION 5 ACCESS 0
Return aRotina

// 2. ModelDef: Regras de Negocio e Estrutura de Dados
Static Function ModelDef()
    Local oStruct := FWFormStruct(1, "SA1")
    Local oModel  := MPFormModel():New("COMP011M", /*bPre*/, /*bPos*/, /*bCommit*/)

    oModel:AddFields("SA1MASTER", /*cOwner*/, oStruct)
    oModel:SetDescription("Modelo de Dados de Clientes - MVC")
    oModel:GetModel("SA1MASTER"):SetDescription("Dados Cadastrais do Cliente")
Return oModel

// 3. ViewDef: Interface Grafica (Camada de Apresentacao)
Static Function ViewDef()
    Local oModel  := FWLoadModel("COMP011")
    Local oStruct := FWFormStruct(2, "SA1")
    Local oView   := FWFormView():New()

    oView:SetModel(oModel)
    oView:AddField("VIEW_SA1", oStruct, "SA1MASTER")
    oView:CreateHorizontalBox("BOX_SUPERIOR", 100)
    oView:SetOwnerView("VIEW_SA1", "BOX_SUPERIOR")
Return oView`
  },

  // Masterclass 04: Consulta SQL de Alta Performance com DBAccess
  "masterclass_sql": {
    filename: "TCQuery_Perf.prw",
    title: "Masterclass 04: TCQuery e Arquitetura de Alta Performance",
    code: `#Include "Totvs.ch"
#Include "TopConn.ch"

/*/{Protheus.doc} U_ConsultaTop
Consulta SQL otimizada seguindo rigorosamente as regras de governanca DBAccess:
- NUNCA faz SELECT *
- Utiliza RetSqlName e delecao logica D_E_L_E_T_
- Converte dialeto com ChangeQuery()
- Fecha preventivamente e obrigatoriamente as areas de trabalho
@author Arquiteto Campus TOTVS
/*/
User Function U_ConsultaTop()
    Local cQuery    := ""
    Local cAliasQry := "QRY_CLI"
    Local nTotal    := 0
    Local cRelat    := ""

    // 1. Fechamento preventivo obrigatorio para evitar memory leak
    If Select(cAliasQry) > 0
        (cAliasQry)->(DbCloseArea())
    EndIf

    // 2. Montagem de query apenas com os campos estritamente necessarios
    cQuery := " SELECT A1_COD, A1_LOJA, A1_NOME, A1_EST, A1_MUN "
    cQuery += " FROM " + RetSqlName("SA1") + " SA1 "
    cQuery += " WHERE SA1.A1_FILIAL = '" + xFilial("SA1") + "' "
    cQuery += "   AND SA1.D_E_L_E_T_ = ' ' "
    cQuery += " ORDER BY SA1.A1_NOME "

    // 3. Conversao para dialeto do banco ativo (Oracle, SQL Server, Postgres)
    cQuery := ChangeQuery(cQuery)
    TCQuery cQuery New Alias (cAliasQry)

    cRelat := "=== CONSULTA DBACCESS DE ALTA PERFORMANCE ===" + CRLF + CRLF
    While !(cAliasQry)->(Eof())
        nTotal++
        cRelat += (cAliasQry)->A1_COD + "/" + (cAliasQry)->A1_LOJA + " - " + ;
                  PadR((cAliasQry)->A1_NOME, 28) + " | " + (cAliasQry)->A1_EST + CRLF

        (cAliasQry)->(DbSkip()) // OBRIGATORIO para evitar loop infinito
    EndDo

    // 4. Liberacao obrigatoria de recursos e conexao do DBAccess
    (cAliasQry)->(DbCloseArea())

    cRelat += CRLF + "Total de Clientes Carregados: " + cValToChar(nTotal)
    ApMsgInfo(cRelat, "DBAccess Performance TopConnect")
Return Nil`
  },

  // Masterclass 05: Web Service REST Moderno em TLPP
  "masterclass_rest": {
    filename: "ClienteAPI.tlpp",
    title: "Masterclass 05: API REST Moderna em TLPP com Decorators",
    code: `#Include "Totvs.ch"
#Include "TLPP-CORE.th"
#Include "TLPP-REST.th"

Namespace campus.totvs.apis

/*/{Protheus.doc} ClienteRest
Exemplo de API REST moderna construida em TLPP com decorators @Get e @Post.
Retorna dados estruturados em JSON para integracao corporativa.
@author Arquiteto Campus TOTVS
/*/
Class ClienteRest
    Public Method New() Constructor

    @Get(endpoint="/api/v1/clientes")
    Public Method ListarClientes() as Logical

    @Post(endpoint="/api/v1/clientes")
    Public Method CriarCliente() as Logical
EndClass

Method New() Class ClienteRest
Return Self

Method ListarClientes() as Logical Class ClienteRest
    Local jResponse := JsonObject():New()
    Local jItens    := {}
    Local jItem     := Nil

    // Montagem de payload JSON estruturado
    jResponse["status"]    := 200
    jResponse["mensagem"]  := "Clientes consultados com sucesso"
    jResponse["timestamp"] := DtoS(Date()) + " " + Time()

    jItem := JsonObject():New()
    jItem["codigo"] := "000001"
    jItem["loja"]   := "01"
    jItem["nome"]   := "TOTVS SA MATRIZ"
    jItem["cgc"]    := "53.113.791/0001-22"
    aAdd(jItens, jItem)

    jResponse["clientes"] := jItens

    // Serializacao de retorno HTTP 200 OK
    oRest:SetResponse(jResponse:ToJson())
    oRest:SetStatusCode(200)
    oRest:SetKeyHeaderResponse("Content-Type", "application/json; charset=utf-8")
Return .T.`
  },

  // Masterclass 02B: Loops e Estruturas de Repetição
  "masterclass_loops": {
    filename: "02B_Loops.prw",
    title: "Masterclass 02B: Estruturas de Repetição & Prevenção de Loops Infinitos",
    code: `#Include "Totvs.ch"

/*/{Protheus.doc} U_LoopsDemo
Demonstração dos laços de repetição While e For...Next com controle de fluxo (Loop e Exit).
@author Arquiteto Campus TOTVS
/*/
User Function U_LoopsDemo()
    Local nI         := 0
    Local nTotal     := 0
    Local cRelatorio := "=== AULA 02B: ESTRUTURAS DE REPETIÇÃO ===" + CRLF + CRLF

    // 1. Laço While pré-condicional com incremento obrigatório
    cRelatorio += "--- 1. Varredura com While ---" + CRLF
    While nI < 5
        nI++
        nTotal += (nI * 10)
        cRelatorio += "Iteração " + cValToChar(nI) + " | Subtotal: R$ " + cValToChar(nTotal) + CRLF
    EndDo

    // 2. Laço For...Next com Exit (break antecipado)
    cRelatorio += CRLF + "--- 2. Varredura com For e Exit condicional ---" + CRLF
    For nI := 1 To 10
        If nI == 4
            cRelatorio += "-> Alvo encontrado em nI = 4! Disparando Exit..." + CRLF
            Exit
        EndIf
        cRelatorio += "Passo For: " + cValToChar(nI) + CRLF
    Next nI

    ApMsgInfo(cRelatorio, "Campus TOTVS - Loops e Performance")
Return Nil`
  },

  // Masterclass 08: Parâmetros SX6 e Função GetMv
  "masterclass_params": {
    filename: "08_Parametros.prw",
    title: "Masterclass 08: Leitura Dinâmica de Parâmetros SX6 com GetMv()",
    code: `#Include "Totvs.ch"

/*/{Protheus.doc} U_ParamsDemo
Leitura segura de parâmetros do dicionário SX6 sem codificação de regras fixas (hardcode).
@author Arquiteto Campus TOTVS
/*/
User Function U_ParamsDemo()
    Local cMsg       := "=== PARÂMETROS DO SISTEMA (SX6) ===" + CRLF + CRLF
    Local nLimPed    := 0
    Local cMoedaPad  := ""
    Local lGeraDup   := .T.

    // 1. Leitura com valor padrão caso o parâmetro ainda não exista no SX6
    nLimPed   := GetMv("MV_LIMPED", .F., 50000.00)
    cMoedaPad := GetMv("MV_MOEDA1", .F., "REAL")
    lGeraDup  := GetMv("MV_GERADUP", .F., .T.)

    cMsg += "1. Limite Máximo por Pedido (MV_LIMPED) : R$ " + Transform(nLimPed, "@E 999,999.92") + CRLF
    cMsg += "2. Moeda Padrão do ERP (MV_MOEDA1)      : " + cMoedaPad + CRLF
    cMsg += "3. Gera Duplicata Automática? (MV_GERADUP): " + Iif(lGeraDup, "SIM", "NÃO") + CRLF + CRLF
    cMsg += "Dica Sênior: NUNCA coloque regras de limite fixas no fonte! Use sempre GetMv()."

    ApMsgInfo(cMsg, "Governança SX6 Protheus")
Return Nil`
  },

  // Módulo SIGACTB: Contabilidade Gerencial
  "modulos_ctb": {
    filename: "CTB_Lancamento.prw",
    title: "SIGACTB: Lançamento Contábil Padronizado com Partidas Dobradas",
    code: `#Include "Totvs.ch"
#Include "TopConn.ch"

/*/{Protheus.doc} U_CtbDemo
Simulação de integridade de lançamentos contábeis na tabela CT2 (SIGACTB).
Demonstra o princípio inegociável de partidas dobradas (Débito = Crédito).
@author Arquiteto Campus TOTVS
/*/
User Function U_CtbDemo()
    Local cQuery     := ""
    Local cAliasQry  := "QRY_CT2"
    Local nTotalDeb  := 0
    Local nTotalCrd  := 0
    Local cRelat     := "=== AUDITORIA CONTÁBIL SIGACTB (PARTIDAS DOBRADAS) ===" + CRLF + CRLF

    If Select(cAliasQry) > 0
        (cAliasQry)->(DbCloseArea())
    EndIf

    // Consulta de lançamentos contábeis (CT2) do dia ativo
    cQuery := " SELECT CT2_DATA, CT2_LOTE, CT2_DOC, CT2_DEBITO, CT2_CREDIT, CT2_VALOR "
    cQuery += " FROM " + RetSqlName("CT2") + " CT2 "
    cQuery += " WHERE CT2.CT2_FILIAL = '" + xFilial("CT2") + "' "
    cQuery += "   AND CT2.D_E_L_E_T_ = ' ' "
    cQuery += " ORDER BY CT2.CT2_DOC, CT2.CT2_LINHA "

    cQuery := ChangeQuery(cQuery)
    TCQuery cQuery New Alias (cAliasQry)

    While !(cAliasQry)->(Eof())
        If !Empty((cAliasQry)->CT2_DEBITO)
            nTotalDeb += (cAliasQry)->CT2_VALOR
        EndIf
        If !Empty((cAliasQry)->CT2_CREDIT)
            nTotalCrd += (cAliasQry)->CT2_VALOR
        EndIf
        (cAliasQry)->(DbSkip())
    EndDo
    (cAliasQry)->(DbCloseArea())

    cRelat += "Total Débitos  : R$ " + Transform(nTotalDeb, "@E 999,999,999.92") + CRLF
    cRelat += "Total Créditos : R$ " + Transform(nTotalCrd, "@E 999,999,999.92") + CRLF
    cRelat += "Diferença      : R$ " + Transform(nTotalDeb - nTotalCrd, "@E 999,999,999.92") + CRLF + CRLF
    cRelat += Iif(nTotalDeb == nTotalCrd, "✅ LOTE BALANCEADO COM SUCESSO!", "❌ ALERTA: LOTE DESBALANCEADO!")

    ApMsgInfo(cRelat, "SIGACTB - Auditoria Contábil")
Return Nil`
  },

  // Módulo SIGAFIS: Livros Fiscais e Regras de TES
  "modulos_fis": {
    filename: "FIS_ApuracaoTES.prw",
    title: "SIGAFIS: Leitura e Auditoria de Regras Fiscais da TES (SF4)",
    code: `#Include "Totvs.ch"
#Include "TopConn.ch"

/*/{Protheus.doc} U_FisDemo
Auditoria de Regras Tributárias configuradas no Tipo de Entrada/Saída (SF4).
Verifica incidência de ICMS, IPI e movimentação de estoque/duplicata.
@author Arquiteto Campus TOTVS
/*/
User Function U_FisDemo()
    Local cQuery    := ""
    Local cAliasTes := "QRY_TES"
    Local cRelat    := "=== AUDITORIA DE REGRAS FISCAIS (TES - SF4) ===" + CRLF + CRLF
    Local nCont     := 0

    If Select(cAliasTes) > 0
        (cAliasTes)->(DbCloseArea())
    EndIf

    cQuery := " SELECT F4_CODIGO, F4_TIPO, F4_TEXTO, F4_ESTOQUE, F4_DUPLIC, F4_ICM, F4_IPI "
    cQuery += " FROM " + RetSqlName("SF4") + " SF4 "
    cQuery += " WHERE SF4.F4_FILIAL = '" + xFilial("SF4") + "' "
    cQuery += "   AND SF4.D_E_L_E_T_ = ' ' "
    cQuery += " ORDER BY SF4.F4_CODIGO "

    cQuery := ChangeQuery(cQuery)
    TCQuery cQuery New Alias (cAliasTes)

    While !(cAliasTes)->(Eof())
        nCont++
        cRelat += "TES " + (cAliasTes)->F4_CODIGO + " [" + (cAliasTes)->F4_TIPO + "] - " + PadR((cAliasTes)->F4_TEXTO, 20)
        cRelat += " | Estq: " + (cAliasTes)->F4_ESTOQUE + " | Dup: " + (cAliasTes)->F4_DUPLIC
        cRelat += " | ICMS: " + (cAliasTes)->F4_ICM + " | IPI: " + (cAliasTes)->F4_IPI + CRLF
        (cAliasTes)->(DbSkip())
    EndDo
    (cAliasTes)->(DbCloseArea())

    cRelat += CRLF + "Total de Tipos de Entrada/Saída Analisados: " + cValToChar(nCont)
    ApMsgInfo(cRelat, "SIGAFIS - Engenharia Tributária")
Return Nil`
  }
};

// =========================================================================
// 3. MATRIZ DE SENIORIDADE E CALCULADORA DE COMPETÊNCIAS
// =========================================================================
const CAREER_SKILLS_MATRIX = [
  // Júnior
  { id: "sk_hungara", level: "junior", title: "Notação Húngara e Escopo de Variáveis", desc: "Uso correto de prefixos c, n, d, l, a, b e escopo estrito Local." },
  { id: "sk_types", level: "junior", title: "Manipulação de Tipos e Datas", desc: "Conversões com dToC, cValToChar, Val, SubStr e formatação com Transform." },
  { id: "sk_arrays", level: "junior", title: "Matrizes Multidimensionais e aAdd", desc: "Criação, busca dinâmica com aScan e ordenação com aSort." },
  { id: "sk_dialogs", level: "junior", title: "Janelas e Diálogos com MSDialog", desc: "Criação de telas visuais interativas com ApMsgInfo e botões." },
  
  // Pleno
  { id: "sk_sx", level: "pleno", title: "Dicionário de Dados SX", desc: "Domínio de SX1 (Perguntas/F12), SX2, SX3 (X3_VALID) e SIX (Índices)." },
  { id: "sk_topconn", level: "pleno", title: "TCQuery, ChangeQuery e DBAccess", desc: "Consultas SQL de alta performance, deleção lógica e fechamento de áreas." },
  { id: "sk_pe", level: "pleno", title: "Pontos de Entrada Clássicos e MVC", desc: "Customização sem alterar fontes padrão, uso estrito de GetArea/RestArea." },
  { id: "sk_mvc", level: "pleno", title: "Padrão Oficial MVC (Model-View-Controller)", desc: "Construção de rotinas com ModelDef, ViewDef, MenuDef e validações." },
  { id: "sk_fatcom", level: "pleno", title: "Processos de Faturamento e Compras", desc: "Relacionamentos entre SC5/SC6 ➔ SF2/SD2 e SC7 ➔ SF1/SD1." },
  
  // Sênior
  { id: "sk_tlpp", level: "senior", title: "TLPP Avançado, Classes e Namespaces", desc: "Orientação a objetos nativa, tipagem estática e herança no Protheus." },
  { id: "sk_rest", level: "senior", title: "Criação de APIs REST Corporativas", desc: "Endpoints @Get/@Post em TLPP com payloads JsonObject e tokens JWT." },
  { id: "sk_locks", level: "senior", title: "Transações e Concorrência (Locks)", desc: "Uso de RecLock, MsUnlock e transações seguras Begin Transaction/End Transaction." },
  { id: "sk_tunning", level: "senior", title: "Auditoria de Performance e Memory Leaks", desc: "Monitoramento de consumo de memória no AppServer e tunning de query." },
  
  // Arquiteto
  { id: "sk_rpo", level: "arquiteto", title: "Governança de RPO e Build Contínuo", desc: "Pipeline CI/CD com TOTVS CodeAnalysis, SonarQube e merge seguro." },
  { id: "sk_cluster", level: "arquiteto", title: "Alta Disponibilidade e Balanceamento", desc: "Arquitetura com múltiplos slaves, Broker e banco de dados distribuído." }
];

// =========================================================================
// 4. FUNÇÕES INTERATIVAS: CONFIGURADOR VIRTUAL SX
// =========================================================================
window.initDictionaryExplorer = function() {
  const inputSearch = document.getElementById('dictSearchInput');
  const clearBtn = document.getElementById('dictSearchClearBtn');
  const tableContainer = document.getElementById('dictResultsContainer');
  if (!tableContainer) return;

  let currentSearchQuery = '';
  let currentSearchResults = [];
  let currentActiveTable = 'SA1';

  function normalizeStr(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toUpperCase();
  }

  function escapeHtml(text) {
    return (text || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }

  // Executa busca avançada multi-nível no dicionário
  window.searchDictionary = function(query) {
    const qNorm = normalizeStr(query);
    if (!qNorm) {
      return [{ key: 'SA1', score: 100, matchedFields: [] }];
    }

    const results = [];

    Object.keys(TOTVS_DICTIONARY_DB).forEach(key => {
      const item = TOTVS_DICTIONARY_DB[key];
      let score = 0;
      const matchedFields = [];

      // 1. Alias da tabela
      if (key === qNorm) {
        score += 150;
      } else if (key.startsWith(qNorm)) {
        score += 80;
      } else if (key.includes(qNorm)) {
        score += 50;
      }

      // 2. Nome da tabela
      const nameNorm = normalizeStr(item.name);
      if (nameNorm === qNorm) {
        score += 120;
      } else if (nameNorm.includes(qNorm)) {
        score += 70;
      }

      // 3. Módulo (SIGAFAT, SIGAEST, FAT, EST, etc.)
      const modNorm = normalizeStr(item.module);
      if (modNorm === qNorm || modNorm.replace('SIGA', '') === qNorm) {
        score += 60;
      } else if (modNorm.includes(qNorm)) {
        score += 35;
      }

      // 4. Descrição da tabela
      const descNorm = normalizeStr(item.description);
      if (descNorm.includes(qNorm)) {
        score += 30;
      }

      // 5. Índices SIX
      if (item.indices && item.indices.some(idx => normalizeStr(idx.key).includes(qNorm) || normalizeStr(idx.desc).includes(qNorm))) {
        score += 40;
      }

      // 6. Campos SX3 e Validações
      if (item.fields && Array.isArray(item.fields)) {
        item.fields.forEach(f => {
          const fieldNorm = normalizeStr(f.field);
          const fDescNorm = normalizeStr(f.desc);
          const fValidNorm = normalizeStr(f.valid);

          let isFieldMatch = false;
          if (fieldNorm === qNorm) {
            score += 100;
            isFieldMatch = true;
          } else if (fieldNorm.includes(qNorm)) {
            score += 55;
            isFieldMatch = true;
          } else if (fDescNorm.includes(qNorm)) {
            score += 45;
            isFieldMatch = true;
          } else if (fValidNorm.includes(qNorm)) {
            score += 25;
            isFieldMatch = true;
          }

          if (isFieldMatch) {
            matchedFields.push(f.field);
          }
        });
      }

      if (score > 0) {
        results.push({ key, score, matchedFields });
      }
    });

    results.sort((a, b) => b.score - a.score);
    return results;
  };

  // Renderiza a estrutura da tabela e seus metadados
  window.renderDictionaryTable = function(tableKey, searchFilter = '') {
    const data = TOTVS_DICTIONARY_DB[tableKey];
    if (!data) return;

    currentActiveTable = tableKey;

    // Atualiza pills de atalhos rápidos
    document.querySelectorAll('.dict-quick-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-table') === tableKey);
    });

    // Se temos mais de um resultado da busca, monta a barra de sugestões de tabelas
    let searchChipsHtml = '';
    if (currentSearchResults.length > 1 && searchFilter) {
      searchChipsHtml = `
        <div class="dict-search-results-bar">
          <span style="font-size: 11px; font-weight: 800; color: var(--totvs-cyan); text-transform: uppercase;">
            🎯 ${currentSearchResults.length} tabelas encontradas:
          </span>
          ${currentSearchResults.map(res => {
            const tData = TOTVS_DICTIONARY_DB[res.key];
            const isActive = res.key === tableKey;
            return `
              <button type="button" class="dict-search-chip ${isActive ? 'active' : ''}" onclick="renderDictionaryTable('${res.key}', '${escapeHtml(searchFilter)}')">
                <span style="font-weight: 900;">${res.key}</span>
                <span>${tData ? tData.name : ''}</span>
                ${res.matchedFields.length > 0 ? `<span style="font-size: 9px; opacity: 0.8; background: rgba(0,0,0,0.25); padding: 1px 4px; border-radius: 4px;">${res.matchedFields.length} campo(s)</span>` : ''}
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    const filterNorm = normalizeStr(searchFilter);

    let html = `
      ${searchChipsHtml}

      <div class="dict-explorer-card">
        <div class="dict-card-top">
          <div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px; flex-wrap: wrap;">
              <span class="table-chip">${tableKey}</span>
              <span class="module-chip">${data.module}</span>
              <h3 style="margin: 0; font-size: 18px; color: var(--text-main); font-weight: 800;">${data.name}</h3>
            </div>
            <p style="margin: 0; font-size: 12.5px; color: var(--text-muted);">${data.description}</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="copyTableQuery('${tableKey}')" title="Copiar query DBAccess pronta desta tabela">
            📋 Copiar TCQuery Otimizada
          </button>
        </div>

        <!-- Índices SIX da Tabela -->
        <div style="margin-top: 14px; margin-bottom: 14px; background: rgba(0, 120, 255, 0.06); border: 1px solid rgba(0, 120, 255, 0.2); border-radius: 8px; padding: 10px 14px;">
          <div style="font-size: 11px; font-weight: 800; color: var(--totvs-blue); text-transform: uppercase; margin-bottom: 6px;">
            🔍 Índices Oficiais da Tabela (Tabela SIX):
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${data.indices.map(idx => {
              const isIdxMatch = filterNorm && (normalizeStr(idx.key).includes(filterNorm) || normalizeStr(idx.desc).includes(filterNorm));
              return `
                <div style="font-size: 11.5px; background: ${isIdxMatch ? 'rgba(0, 210, 211, 0.15)' : 'rgba(255,255,255,0.04)'}; padding: 4px 8px; border-radius: 4px; border: 1px solid ${isIdxMatch ? 'var(--totvs-cyan)' : 'rgba(255,255,255,0.08)'};">
                  <strong style="color: var(--totvs-cyan);">Ordem ${idx.order}:</strong> <code>${idx.key}</code> <span style="color: var(--text-muted);">(${idx.desc})</span>
                  ${isIdxMatch ? ' <span style="color: var(--totvs-cyan); font-weight: 800;">(Match)</span>' : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Tabela SX3 de Campos -->
        <div style="overflow-x: auto; border-radius: 8px; border: 1px solid var(--border-color);">
          <table class="dict-grid-table">
            <thead>
              <tr>
                <th>Campo (SX3)</th>
                <th>Tipo</th>
                <th>Tam.</th>
                <th>Descrição do Dicionário</th>
                <th>Validação de Usuário (X3_VALID)</th>
                <th>Inicializador Padrão (X3_RELACAO)</th>
                <th>Máscara (Picture)</th>
              </tr>
            </thead>
            <tbody>
              ${data.fields.map(f => {
                const isMatch = filterNorm && (
                  normalizeStr(f.field).includes(filterNorm) || 
                  normalizeStr(f.desc).includes(filterNorm) || 
                  normalizeStr(f.valid).includes(filterNorm)
                );
                return `
                  <tr class="${isMatch ? 'dict-field-match' : ''}">
                    <td>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <code style="color: var(--totvs-cyan); font-weight: 700;">${f.field}</code>
                        ${isMatch ? '<span style="font-size: 9px; font-weight: 800; background: var(--totvs-cyan); color: #000; padding: 1px 4px; border-radius: 3px;">Match</span>' : ''}
                      </div>
                    </td>
                    <td><span class="type-pill type-${f.type}">${f.type}</span></td>
                    <td>${f.size}${f.dec > 0 ? ',' + f.dec : ''}</td>
                    <td><strong>${f.desc}</strong></td>
                    <td>${f.valid ? `<code>${f.valid}</code>` : '<span style="color:var(--text-dim);">-</span>'}</td>
                    <td>${f.relac ? `<code>${f.relac}</code>` : '<span style="color:var(--text-dim);">-</span>'}</td>
                    <td><code>${f.picture || '-'}</code></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    tableContainer.innerHTML = html;
  };

  // Renderiza Empty State amigável quando nada for encontrado
  function renderEmptyState(query) {
    tableContainer.innerHTML = `
      <div class="dict-empty-card">
        <div style="font-size: 40px; margin-bottom: 10px;">🔍</div>
        <h3 style="margin: 0 0 6px; color: var(--text-main); font-size: 17px; font-weight: 800;">Nenhuma tabela ou campo encontrado</h3>
        <p style="margin: 0 auto 16px; max-width: 500px; font-size: 13px; color: var(--text-muted); line-height: 1.5;">
          Não encontramos resultados para "<strong>${escapeHtml(query)}</strong>". Você pode pesquisar por código da tabela (ex: <code>SA1</code>, <code>SA2</code>, <code>SB1</code>, <code>SF2</code>, <code>CT2</code>), campos (ex: <code>A1_NOME</code>, <code>CGC</code>, <code>EMISSAO</code>) ou módulo (ex: <code>FAT</code>, <code>EST</code>, <code>FIN</code>).
        </p>
        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="selectQuickDictTable('SA1')">Clientes (SA1)</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="selectQuickDictTable('SA2')">Fornecedores (SA2)</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="selectQuickDictTable('SB1')">Produtos (SB1)</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="selectQuickDictTable('SC5')">Pedidos (SC5)</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="selectQuickDictTable('SF2')">Notas Fiscais (SF2)</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="clearDictionarySearch()">Limpar Pesquisa</button>
        </div>
      </div>
    `;
  }

  // Atalhos rápidos dos botões
  window.selectQuickDictTable = function(tableKey) {
    if (inputSearch) {
      inputSearch.value = '';
    }
    if (clearBtn) {
      clearBtn.style.display = 'none';
    }
    currentSearchQuery = '';
    currentSearchResults = [];
    renderDictionaryTable(tableKey);
  };

  // Limpa campo de busca
  window.clearDictionarySearch = function() {
    if (inputSearch) {
      inputSearch.value = '';
      inputSearch.focus();
    }
    if (clearBtn) {
      clearBtn.style.display = 'none';
    }
    currentSearchQuery = '';
    currentSearchResults = [];
    renderDictionaryTable('SA1');
  };

  // Eventos do input de busca
  if (inputSearch) {
    const handleSearch = () => {
      const q = inputSearch.value.trim();
      currentSearchQuery = q;

      if (clearBtn) {
        clearBtn.style.display = q ? 'block' : 'none';
      }

      if (!q) {
        currentSearchResults = [];
        renderDictionaryTable('SA1');
        return;
      }

      currentSearchResults = searchDictionary(q);

      if (currentSearchResults.length > 0) {
        renderDictionaryTable(currentSearchResults[0].key, q);
      } else {
        renderEmptyState(q);
      }
    };

    inputSearch.addEventListener('input', handleSearch);
    inputSearch.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        clearDictionarySearch();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', clearDictionarySearch);
  }

  // Render inicial padrão
  renderDictionaryTable('SA1');
};

// =========================================================================
// 5. INJEÇÃO DE CÓDIGO NO MONACO EDITOR COM NAVEGAÇÃO IMEDIATA
// =========================================================================
window.loadCodeIntoEditor = function(snippetKey) {
  const snippet = TOTVS_CODE_SNIPPETS[snippetKey];
  if (!snippet) return;

  if (typeof switchMainSection === 'function') {
    switchMainSection('editor');
  }

  if (window.monacoEditorInstance) {
    window.monacoEditorInstance.setValue(snippet.code);
    window.monacoEditorInstance.setPosition({ lineNumber: 1, column: 1 });
  }

  const fileNameEl = document.getElementById('currentFileName');
  if (fileNameEl) {
    fileNameEl.innerText = snippet.filename;
  }

  if (typeof updateModifiedState === 'function') {
    updateModifiedState(true);
  }

  showToastNotification(`Código de "${snippet.title}" carregado no Laboratório! Pressione F5 para executar.`, '🚀');
};

window.copyTableQuery = function(tableKey) {
  const data = TOTVS_DICTIONARY_DB[tableKey];
  if (!data) return;

  const fieldList = data.fields.map(f => f.field).join(', ');
  const sql = `// Query Otimizada para ${tableKey} (${data.name})
Local cQuery := ""
Local cAlias := "QRY_${tableKey}"

If Select(cAlias) > 0
    (cAlias)->(DbCloseArea())
EndIf

cQuery := " SELECT ${fieldList} "
cQuery += " FROM " + RetSqlName("${tableKey}") + " ${tableKey} "
cQuery += " WHERE ${tableKey}.${data.fields[0].field.substring(0,2)}_FILIAL = '" + xFilial("${tableKey}") + "' "
cQuery += "   AND ${tableKey}.D_E_L_E_T_ = ' ' "
cQuery += " ORDER BY ${data.indices[0].key} "

cQuery := ChangeQuery(cQuery)
TCQuery cQuery New Alias (cAlias)

While !(cAlias)->(Eof())
    // Processamento seguro...
    (cAlias)->(DbSkip())
EndDo

(cAlias)->(DbCloseArea())`;

  navigator.clipboard.writeText(sql).then(() => {
    showToastNotification(`Query DBAccess para ${tableKey} copiada para a área de transferência!`, '📋');
  });
};

// =========================================================================
// 6. CALCULADORA DE SENIORIDADE E PROGRESSO DE CARREIRA
// =========================================================================
window.initCareerCalculator = function() {
  const container = document.getElementById('careerSkillsContainer');
  if (!container) return;

  const savedSkills = JSON.parse(localStorage.getItem('totvs_career_skills_checked') || '{}');

  function renderSkills() {
    let total = CAREER_SKILLS_MATRIX.length;
    let checkedCount = 0;

    let html = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-top: 14px;">
    `;

    CAREER_SKILLS_MATRIX.forEach(sk => {
      const isChecked = !!savedSkills[sk.id];
      if (isChecked) checkedCount++;

      let badgeColor = '#3b82f6';
      let badgeLabel = 'Pleno';
      if (sk.level === 'junior') { badgeColor = '#10b981'; badgeLabel = 'Júnior'; }
      else if (sk.level === 'senior') { badgeColor = '#f59e0b'; badgeLabel = 'Sênior'; }
      else if (sk.level === 'arquiteto') { badgeColor = '#9333ea'; badgeLabel = 'Arquiteto'; }

      html += `
        <div class="skill-check-card ${isChecked ? 'checked' : ''}" onclick="toggleCareerSkill('${sk.id}')">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <span style="font-size: 10px; font-weight: 800; background: ${badgeColor}22; color: ${badgeColor}; border: 1px solid ${badgeColor}55; padding: 2px 7px; border-radius: 6px; text-transform: uppercase;">
              ${badgeLabel}
            </span>
            <input type="checkbox" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleCareerSkill('${sk.id}')" style="cursor: pointer; accent-color: var(--totvs-cyan);">
          </div>
          <strong style="font-size: 12.5px; color: var(--text-main); display: block; margin-bottom: 4px;">${sk.title}</strong>
          <span style="font-size: 11px; color: var(--text-muted); line-height: 1.4; display: block;">${sk.desc}</span>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // Atualiza barra de progresso e nível calculado
    const pct = Math.round((checkedCount / total) * 100);
    const progressBar = document.getElementById('careerProgressBar');
    const scoreVal = document.getElementById('careerScoreValue');
    const rankTitle = document.getElementById('careerRankTitle');

    if (progressBar) progressBar.style.width = pct + '%';
    if (scoreVal) scoreVal.innerText = `${pct}% de Prontidão (${checkedCount}/${total} Habilidades)`;

    if (rankTitle) {
      if (pct < 30) rankTitle.innerText = '🌱 Desenvolvedor Trainee / Júnior';
      else if (pct < 70) rankTitle.innerText = '⚡ Desenvolvedor Pleno';
      else if (pct < 90) rankTitle.innerText = '🔥 Desenvolvedor Sênior';
      else rankTitle.innerText = '👑 Arquiteto de Software Especialista TOTVS';
    }
  }

  window.toggleCareerSkill = function(skillId) {
    savedSkills[skillId] = !savedSkills[skillId];
    localStorage.setItem('totvs_career_skills_checked', JSON.stringify(savedSkills));
    renderSkills();
  };

  renderSkills();
};

// =========================================================================
// 7. TOAST NOTIFICATION COMPONENT
// =========================================================================
function showToastNotification(msg, icon = 'ℹ️') {
  let toast = document.getElementById('campusToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'campusToast';
    toast.className = 'campus-toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
  toast.classList.add('visible');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 4000);
}

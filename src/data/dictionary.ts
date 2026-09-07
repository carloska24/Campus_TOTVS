export interface ISXIndex {
  order: number;
  key: string;
  desc: string;
}

export interface ISXFieldDetail {
  field: string;
  type: string;
  size: number;
  dec: number;
  desc: string;
  valid: string;
  relac: string;
  picture: string;
}

export interface ISXTableDetail {
  name: string;
  description: string;
  module: string;
  indices: ISXIndex[];
  fields: ISXFieldDetail[];
}

export const TOTVS_DICTIONARY_DB: Record<string, ISXTableDetail> = {
  "SA1": {
    "name": "Clientes",
    "description": "Cadastro geral de clientes e parceiros comerciais de venda (SIGAFAT).",
    "module": "SIGAFAT",
    "indices": [
      {
        "order": 1,
        "key": "A1_FILIAL + A1_COD + A1_LOJA",
        "desc": "Código + Loja (Chave Primária)"
      },
      {
        "order": 2,
        "key": "A1_FILIAL + A1_NOME",
        "desc": "Razão Social"
      },
      {
        "order": 3,
        "key": "A1_FILIAL + A1_CGC",
        "desc": "CNPJ / CPF"
      }
    ],
    "fields": [
      {
        "field": "A1_COD",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Código do Cliente",
        "valid": "ExistChav('SA1')",
        "relac": "GetSX8Num('SA1','A1_COD')",
        "picture": "@!"
      },
      {
        "field": "A1_LOJA",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Loja do Cliente",
        "valid": "",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "A1_NOME",
        "type": "C",
        "size": 40,
        "dec": 0,
        "desc": "Razão Social",
        "valid": "Texto()",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "A1_NREDUZ",
        "type": "C",
        "size": 20,
        "dec": 0,
        "desc": "Nome Fantasia",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "A1_TIPO",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Tipo (F=Fis / J=Jur)",
        "valid": "Pertence('F/J/X/R')",
        "relac": "'J'",
        "picture": "@!"
      },
      {
        "field": "A1_CGC",
        "type": "C",
        "size": 14,
        "dec": 0,
        "desc": "CNPJ ou CPF",
        "valid": "CGC(M->A1_CGC)",
        "relac": "",
        "picture": "@R 99.999.999/9999-99"
      },
      {
        "field": "A1_EST",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Estado (UF)",
        "valid": "ExistCpo('SX5','12'+M->A1_EST)",
        "relac": "'SP'",
        "picture": "@!"
      },
      {
        "field": "A1_MUN",
        "type": "C",
        "size": 30,
        "dec": 0,
        "desc": "Município",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "A1_EMAIL",
        "type": "C",
        "size": 60,
        "dec": 0,
        "desc": "E-mail de Contato",
        "valid": "",
        "relac": "",
        "picture": ""
      }
    ]
  },
  "SA2": {
    "name": "Fornecedores",
    "description": "Cadastro de fornecedores, credores e parceiros de compra (SIGACOM/FIN).",
    "module": "SIGACOM",
    "indices": [
      {
        "order": 1,
        "key": "A2_FILIAL + A2_COD + A2_LOJA",
        "desc": "Código + Loja (Chave Primária)"
      },
      {
        "order": 2,
        "key": "A2_FILIAL + A2_NOME",
        "desc": "Razão Social do Fornecedor"
      },
      {
        "order": 3,
        "key": "A2_FILIAL + A2_CGC",
        "desc": "CNPJ ou CPF do Fornecedor"
      }
    ],
    "fields": [
      {
        "field": "A2_COD",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Código do Fornecedor",
        "valid": "ExistChav('SA2')",
        "relac": "GetSX8Num('SA2','A2_COD')",
        "picture": "@!"
      },
      {
        "field": "A2_LOJA",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Loja do Fornecedor",
        "valid": "",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "A2_NOME",
        "type": "C",
        "size": 40,
        "dec": 0,
        "desc": "Razão Social",
        "valid": "Texto()",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "A2_NREDUZ",
        "type": "C",
        "size": 20,
        "dec": 0,
        "desc": "Nome Fantasia",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "A2_TIPO",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Tipo (F=Fis / J=Jur)",
        "valid": "Pertence('F/J/X/R')",
        "relac": "'J'",
        "picture": "@!"
      },
      {
        "field": "A2_CGC",
        "type": "C",
        "size": 14,
        "dec": 0,
        "desc": "CNPJ ou CPF",
        "valid": "CGC(M->A2_CGC)",
        "relac": "",
        "picture": "@R 99.999.999/9999-99"
      },
      {
        "field": "A2_EST",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Estado (UF)",
        "valid": "ExistCpo('SX5','12'+M->A2_EST)",
        "relac": "'SP'",
        "picture": "@!"
      },
      {
        "field": "A2_MUN",
        "type": "C",
        "size": 30,
        "dec": 0,
        "desc": "Município",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "A2_BANCO",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Banco Padrão",
        "valid": "ExistCpo('SA6')",
        "relac": "",
        "picture": "@!"
      }
    ]
  },
  "SA3": {
    "name": "Vendedores & Representantes",
    "description": "Cadastro de vendedores internos e representantes externos (SIGAFAT).",
    "module": "SIGAFAT",
    "indices": [
      {
        "order": 1,
        "key": "A3_FILIAL + A3_COD",
        "desc": "Código do Vendedor (Chave Primária)"
      },
      {
        "order": 2,
        "key": "A3_FILIAL + A3_NOME",
        "desc": "Nome do Vendedor"
      }
    ],
    "fields": [
      {
        "field": "A3_COD",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Código do Vendedor",
        "valid": "ExistChav('SA3')",
        "relac": "GetSX8Num('SA3','A3_COD')",
        "picture": "@!"
      },
      {
        "field": "A3_NOME",
        "type": "C",
        "size": 40,
        "dec": 0,
        "desc": "Nome Completo",
        "valid": "Texto()",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "A3_NREDUZ",
        "type": "C",
        "size": 20,
        "dec": 0,
        "desc": "Nome Reduzido",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "A3_COMIS",
        "type": "N",
        "size": 5,
        "dec": 2,
        "desc": "% Comissão Padrão",
        "valid": "Positivo()",
        "relac": "0",
        "picture": "@E 99.99"
      },
      {
        "field": "A3_EMAIL",
        "type": "C",
        "size": 60,
        "dec": 0,
        "desc": "E-mail de Contato",
        "valid": "",
        "relac": "",
        "picture": ""
      }
    ]
  },
  "SB1": {
    "name": "Produtos & Serviços",
    "description": "Cadastro mestre de itens, matérias-primas e serviços (SIGAEST/COM/FAT).",
    "module": "SIGAEST",
    "indices": [
      {
        "order": 1,
        "key": "B1_FILIAL + B1_COD",
        "desc": "Código do Produto (Chave Primária)"
      },
      {
        "order": 2,
        "key": "B1_FILIAL + B1_DESC",
        "desc": "Descrição do Produto"
      },
      {
        "order": 3,
        "key": "B1_FILIAL + B1_TIPO",
        "desc": "Tipo do Produto"
      }
    ],
    "fields": [
      {
        "field": "B1_COD",
        "type": "C",
        "size": 15,
        "dec": 0,
        "desc": "Código do Produto",
        "valid": "ExistChav('SB1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "B1_DESC",
        "type": "C",
        "size": 30,
        "dec": 0,
        "desc": "Descrição do Produto",
        "valid": "Texto()",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "B1_TIPO",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Tipo (PA, MP, PI, SV)",
        "valid": "ExistCpo('SX5','02'+M->B1_TIPO)",
        "relac": "'PA'",
        "picture": "@!"
      },
      {
        "field": "B1_UM",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Unidade de Medida",
        "valid": "ExistCpo('SAH')",
        "relac": "'UN'",
        "picture": "@!"
      },
      {
        "field": "B1_LOCPAD",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Almoxarifado Padrão",
        "valid": "ExistCpo('NNR')",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "B1_POSIPI",
        "type": "C",
        "size": 10,
        "dec": 0,
        "desc": "NCM / Classif. Fiscal",
        "valid": "ExistCpo('SYD')",
        "relac": "",
        "picture": "@R 9999.99.99"
      },
      {
        "field": "B1_PESO",
        "type": "N",
        "size": 9,
        "dec": 4,
        "desc": "Peso Líquido",
        "valid": "Positivo()",
        "relac": "0",
        "picture": "@E 9,999.9999"
      }
    ]
  },
  "SB2": {
    "name": "Saldos Físico e Financeiro",
    "description": "Controle de saldos em estoque, custo médio e empenhos por armazém (SIGAEST).",
    "module": "SIGAEST",
    "indices": [
      {
        "order": 1,
        "key": "B2_FILIAL + B2_COD + B2_LOCAL",
        "desc": "Produto + Local (Chave Primária)"
      },
      {
        "order": 2,
        "key": "B2_FILIAL + B2_LOCAL + B2_COD",
        "desc": "Local + Produto"
      }
    ],
    "fields": [
      {
        "field": "B2_COD",
        "type": "C",
        "size": 15,
        "dec": 0,
        "desc": "Código do Produto",
        "valid": "ExistCpo('SB1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "B2_LOCAL",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Almoxarifado / Armazém",
        "valid": "ExistCpo('NNR')",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "B2_QATU",
        "type": "N",
        "size": 12,
        "dec": 2,
        "desc": "Quantidade Atual em Estoque",
        "valid": "",
        "relac": "0",
        "picture": "@E 999,999.99"
      },
      {
        "field": "B2_RESERVA",
        "type": "N",
        "size": 12,
        "dec": 2,
        "desc": "Quantidade Reservada/Empenhada",
        "valid": "",
        "relac": "0",
        "picture": "@E 999,999.99"
      },
      {
        "field": "B2_QPEDVEN",
        "type": "N",
        "size": 12,
        "dec": 2,
        "desc": "Quantidade em Pedidos de Venda",
        "valid": "",
        "relac": "0",
        "picture": "@E 999,999.99"
      },
      {
        "field": "B2_CM1",
        "type": "N",
        "size": 14,
        "dec": 4,
        "desc": "Custo Médio Unitário (Moeda 1)",
        "valid": "Positivo()",
        "relac": "0",
        "picture": "@E 999,999.9999"
      },
      {
        "field": "B2_VATU1",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Valor Total Atual em Estoque",
        "valid": "",
        "relac": "0",
        "picture": "@E 999,999,999.92"
      }
    ]
  },
  "SD3": {
    "name": "Movimentações Internas de Estoque",
    "description": "Requisições, devoluções, transferências e apontamentos de produção (SIGAEST).",
    "module": "SIGAEST",
    "indices": [
      {
        "order": 1,
        "key": "D3_FILIAL + D3_DOC + D3_EMISSAO",
        "desc": "Documento + Emissão"
      },
      {
        "order": 2,
        "key": "D3_FILIAL + D3_COD + D3_LOCAL",
        "desc": "Produto + Almoxarifado"
      }
    ],
    "fields": [
      {
        "field": "D3_DOC",
        "type": "C",
        "size": 9,
        "dec": 0,
        "desc": "Número do Documento",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "D3_TM",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Tipo de Movimento (SF5)",
        "valid": "ExistCpo('SF5')",
        "relac": "'501'",
        "picture": "@!"
      },
      {
        "field": "D3_COD",
        "type": "C",
        "size": 15,
        "dec": 0,
        "desc": "Código do Produto",
        "valid": "ExistCpo('SB1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "D3_UM",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Unidade de Medida",
        "valid": "",
        "relac": "Posicione('SB1',1,xFilial('SB1')+M->D3_COD,'B1_UM')",
        "picture": "@!"
      },
      {
        "field": "D3_QUANT",
        "type": "N",
        "size": 12,
        "dec": 2,
        "desc": "Quantidade Movimentada",
        "valid": "Positivo()",
        "relac": "1",
        "picture": "@E 999,999.99"
      },
      {
        "field": "D3_LOCAL",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Almoxarifado",
        "valid": "ExistCpo('NNR')",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "D3_EMISSAO",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data da Movimentação",
        "valid": "NaoVazio()",
        "relac": "dDataBase",
        "picture": ""
      },
      {
        "field": "D3_CUSTO1",
        "type": "N",
        "size": 14,
        "dec": 2,
        "desc": "Custo Total do Movimento",
        "valid": "",
        "relac": "",
        "picture": "@E 999,999.99"
      }
    ]
  },
  "SC1": {
    "name": "Solicitações de Compras",
    "description": "Necessidades internas de compra emitidas pelos setores ou MRP (SIGACOM).",
    "module": "SIGACOM",
    "indices": [
      {
        "order": 1,
        "key": "C1_FILIAL + C1_NUM + C1_ITEM",
        "desc": "Número + Item (Chave Primária)"
      },
      {
        "order": 2,
        "key": "C1_FILIAL + C1_PRODUTO",
        "desc": "Código do Produto"
      }
    ],
    "fields": [
      {
        "field": "C1_NUM",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Número da Solicitação",
        "valid": "ExistChav('SC1')",
        "relac": "GetSX8Num('SC1','C1_NUM')",
        "picture": "@!"
      },
      {
        "field": "C1_ITEM",
        "type": "C",
        "size": 4,
        "dec": 0,
        "desc": "Item Sequencial",
        "valid": "",
        "relac": "'0001'",
        "picture": "@!"
      },
      {
        "field": "C1_PRODUTO",
        "type": "C",
        "size": 15,
        "dec": 0,
        "desc": "Código do Produto",
        "valid": "ExistCpo('SB1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "C1_DESCRI",
        "type": "C",
        "size": 30,
        "dec": 0,
        "desc": "Descrição do Item",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "C1_QUANT",
        "type": "N",
        "size": 12,
        "dec": 2,
        "desc": "Quantidade Solicitada",
        "valid": "Positivo()",
        "relac": "1",
        "picture": "@E 999,999.99"
      },
      {
        "field": "C1_DATPRF",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data de Necessidade",
        "valid": "",
        "relac": "dDataBase + 7",
        "picture": ""
      },
      {
        "field": "C1_SOLICIT",
        "type": "C",
        "size": 25,
        "dec": 0,
        "desc": "Nome do Solicitante",
        "valid": "",
        "relac": "cUserName",
        "picture": "@!"
      }
    ]
  },
  "SC5": {
    "name": "Cabeçalho do Pedido de Venda",
    "description": "Cabeçalho das negociações comerciais e pedidos de clientes (SIGAFAT).",
    "module": "SIGAFAT",
    "indices": [
      {
        "order": 1,
        "key": "C5_FILIAL + C5_NUM",
        "desc": "Número do Pedido (Chave Primária)"
      },
      {
        "order": 2,
        "key": "C5_FILIAL + C5_CLIENTE + C5_LOJACLI",
        "desc": "Cliente + Loja"
      },
      {
        "order": 3,
        "key": "C5_FILIAL + C5_EMISSAO",
        "desc": "Data de Emissão"
      }
    ],
    "fields": [
      {
        "field": "C5_NUM",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Número do Pedido",
        "valid": "ExistChav('SC5')",
        "relac": "GetSX8Num('SC5','C5_NUM')",
        "picture": "@!"
      },
      {
        "field": "C5_TIPO",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Tipo do Pedido (N=Normal/B=Benef)",
        "valid": "Pertence('N/B/D/C/P/I')",
        "relac": "'N'",
        "picture": "@!"
      },
      {
        "field": "C5_CLIENTE",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Código do Cliente",
        "valid": "ExistCpo('SA1',M->C5_CLIENTE)",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "C5_LOJACLI",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Loja do Cliente",
        "valid": "ExistCpo('SA1',M->C5_CLIENTE+M->C5_LOJACLI)",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "C5_EMISSAO",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data de Emissão",
        "valid": "NaoVazio()",
        "relac": "dDataBase",
        "picture": ""
      },
      {
        "field": "C5_CONDPAG",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Condição de Pagamento",
        "valid": "ExistCpo('SE4')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "C5_VEND1",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Vendedor Principal",
        "valid": "ExistCpo('SA3')",
        "relac": "",
        "picture": "@!"
      }
    ]
  },
  "SC6": {
    "name": "Itens do Pedido de Venda",
    "description": "Produtos, quantidades, preços e TES de cada item do pedido (SIGAFAT).",
    "module": "SIGAFAT",
    "indices": [
      {
        "order": 1,
        "key": "C6_FILIAL + C6_NUM + C6_ITEM",
        "desc": "Pedido + Item"
      },
      {
        "order": 2,
        "key": "C6_FILIAL + C6_PRODUTO",
        "desc": "Produto"
      }
    ],
    "fields": [
      {
        "field": "C6_NUM",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Número do Pedido",
        "valid": "",
        "relac": "M->C5_NUM",
        "picture": "@!"
      },
      {
        "field": "C6_ITEM",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Item Sequencial",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "C6_PRODUTO",
        "type": "C",
        "size": 15,
        "dec": 0,
        "desc": "Código do Produto",
        "valid": "ExistCpo('SB1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "C6_DESCRI",
        "type": "C",
        "size": 30,
        "dec": 0,
        "desc": "Descrição do Item",
        "valid": "",
        "relac": "Posicione('SB1',1,xFilial('SB1')+M->C6_PRODUTO,'B1_DESC')",
        "picture": "@!"
      },
      {
        "field": "C6_QTDVEN",
        "type": "N",
        "size": 12,
        "dec": 2,
        "desc": "Quantidade Vendida",
        "valid": "Positivo()",
        "relac": "1",
        "picture": "@E 999,999.99"
      },
      {
        "field": "C6_PRCVEN",
        "type": "N",
        "size": 14,
        "dec": 2,
        "desc": "Preço Unitário",
        "valid": "Positivo()",
        "relac": "",
        "picture": "@E 999,999.99"
      },
      {
        "field": "C6_VALOR",
        "type": "N",
        "size": 14,
        "dec": 2,
        "desc": "Valor Total do Item",
        "valid": "",
        "relac": "M->C6_QTDVEN * M->C6_PRCVEN",
        "picture": "@E 999,999.99"
      },
      {
        "field": "C6_TES",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Tipo de Entrada/Saída",
        "valid": "ExistCpo('SF4')",
        "relac": "",
        "picture": "@!"
      }
    ]
  },
  "SC7": {
    "name": "Pedidos de Compras",
    "description": "Pedidos formalizados enviados aos fornecedores com prazos e valores (SIGACOM).",
    "module": "SIGACOM",
    "indices": [
      {
        "order": 1,
        "key": "C7_FILIAL + C7_NUM + C7_ITEM",
        "desc": "Pedido + Item (Chave Primária)"
      },
      {
        "order": 2,
        "key": "C7_FILIAL + C7_FORNECE + C7_LOJA",
        "desc": "Fornecedor + Loja"
      },
      {
        "order": 3,
        "key": "C7_FILIAL + C7_PRODUTO",
        "desc": "Produto"
      }
    ],
    "fields": [
      {
        "field": "C7_NUM",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Número do Pedido de Compra",
        "valid": "ExistChav('SC7')",
        "relac": "GetSX8Num('SC7','C7_NUM')",
        "picture": "@!"
      },
      {
        "field": "C7_ITEM",
        "type": "C",
        "size": 4,
        "dec": 0,
        "desc": "Item do Pedido",
        "valid": "",
        "relac": "'0001'",
        "picture": "@!"
      },
      {
        "field": "C7_PRODUTO",
        "type": "C",
        "size": 15,
        "dec": 0,
        "desc": "Código do Produto",
        "valid": "ExistCpo('SB1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "C7_FORNECE",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Código do Fornecedor",
        "valid": "ExistCpo('SA2')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "C7_LOJA",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Loja do Fornecedor",
        "valid": "",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "C7_QUANT",
        "type": "N",
        "size": 12,
        "dec": 2,
        "desc": "Quantidade Pedida",
        "valid": "Positivo()",
        "relac": "1",
        "picture": "@E 999,999.99"
      },
      {
        "field": "C7_PRECO",
        "type": "N",
        "size": 14,
        "dec": 4,
        "desc": "Preço Unitário",
        "valid": "Positivo()",
        "relac": "",
        "picture": "@E 999,999.9999"
      },
      {
        "field": "C7_TOTAL",
        "type": "N",
        "size": 14,
        "dec": 2,
        "desc": "Total do Item",
        "valid": "",
        "relac": "M->C7_QUANT * M->C7_PRECO",
        "picture": "@E 999,999.99"
      },
      {
        "field": "C7_EMISSAO",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data de Emissão",
        "valid": "NaoVazio()",
        "relac": "dDataBase",
        "picture": ""
      }
    ]
  },
  "SF1": {
    "name": "Cabeçalho NF de Entrada",
    "description": "Notas fiscais de entrada de mercadorias, devoluções e fretes (SIGACOM/FIS).",
    "module": "SIGACOM",
    "indices": [
      {
        "order": 1,
        "key": "F1_FILIAL + F1_DOC + F1_SERIE + F1_FORNECE + F1_LOJA + F1_TIPO",
        "desc": "NF + Série + Fornecedor + Loja"
      },
      {
        "order": 2,
        "key": "F1_FILIAL + F1_FORNECE + F1_LOJA",
        "desc": "Fornecedor + Loja"
      },
      {
        "order": 3,
        "key": "F1_FILIAL + F1_EMISSAO",
        "desc": "Data de Emissão"
      }
    ],
    "fields": [
      {
        "field": "F1_DOC",
        "type": "C",
        "size": 9,
        "dec": 0,
        "desc": "Número da NF",
        "valid": "NaoVazio()",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "F1_SERIE",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Série da Nota Fiscal",
        "valid": "",
        "relac": "'1  '",
        "picture": "@!"
      },
      {
        "field": "F1_FORNECE",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Código do Fornecedor",
        "valid": "ExistCpo('SA2')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "F1_LOJA",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Loja do Fornecedor",
        "valid": "",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "F1_EMISSAO",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data de Emissão",
        "valid": "NaoVazio()",
        "relac": "dDataBase",
        "picture": ""
      },
      {
        "field": "F1_DTDIGIT",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data de Digitação",
        "valid": "",
        "relac": "dDataBase",
        "picture": ""
      },
      {
        "field": "F1_VALBRUT",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Valor Bruto da NF",
        "valid": "Positivo()",
        "relac": "",
        "picture": "@E 999,999,999.92"
      },
      {
        "field": "F1_ESPECIE",
        "type": "C",
        "size": 5,
        "dec": 0,
        "desc": "Espécie (SPED, NFE)",
        "valid": "",
        "relac": "'SPED'",
        "picture": "@!"
      }
    ]
  },
  "SD1": {
    "name": "Itens da NF de Entrada",
    "description": "Itens recebidos, impostos creditados, TES e amarração com pedidos (SIGACOM/FIS).",
    "module": "SIGACOM",
    "indices": [
      {
        "order": 1,
        "key": "D1_FILIAL + D1_DOC + D1_SERIE + D1_FORNECE + D1_LOJA + D1_ITEM",
        "desc": "Documento + Série + Fornecedor + Item"
      },
      {
        "order": 2,
        "key": "D1_FILIAL + D1_COD",
        "desc": "Produto"
      }
    ],
    "fields": [
      {
        "field": "D1_DOC",
        "type": "C",
        "size": 9,
        "dec": 0,
        "desc": "Número da NF",
        "valid": "",
        "relac": "M->F1_DOC",
        "picture": "@!"
      },
      {
        "field": "D1_SERIE",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Série da NF",
        "valid": "",
        "relac": "M->F1_SERIE",
        "picture": "@!"
      },
      {
        "field": "D1_ITEM",
        "type": "C",
        "size": 4,
        "dec": 0,
        "desc": "Item da Nota",
        "valid": "",
        "relac": "'0001'",
        "picture": "@!"
      },
      {
        "field": "D1_COD",
        "type": "C",
        "size": 15,
        "dec": 0,
        "desc": "Código do Produto",
        "valid": "ExistCpo('SB1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "D1_QUANT",
        "type": "N",
        "size": 12,
        "dec": 2,
        "desc": "Quantidade Recebida",
        "valid": "Positivo()",
        "relac": "1",
        "picture": "@E 999,999.99"
      },
      {
        "field": "D1_VUNIT",
        "type": "N",
        "size": 14,
        "dec": 4,
        "desc": "Valor Unitário",
        "valid": "Positivo()",
        "relac": "",
        "picture": "@E 999,999.9999"
      },
      {
        "field": "D1_TOTAL",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Total do Item",
        "valid": "",
        "relac": "M->D1_QUANT * M->D1_VUNIT",
        "picture": "@E 999,999,999.92"
      },
      {
        "field": "D1_TES",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Tipo de Entrada (TES)",
        "valid": "ExistCpo('SF4')",
        "relac": "",
        "picture": "@!"
      }
    ]
  },
  "SF2": {
    "name": "Cabeçalho NF de Saída",
    "description": "Notas fiscais de venda emitidas, DANFE, chave da NF-e e totais (SIGAFAT/FIS).",
    "module": "SIGAFAT",
    "indices": [
      {
        "order": 1,
        "key": "F2_FILIAL + F2_DOC + F2_SERIE + F2_CLIENTE + F2_LOJA",
        "desc": "NF + Série + Cliente + Loja"
      },
      {
        "order": 2,
        "key": "F2_FILIAL + F2_CLIENTE + F2_LOJA",
        "desc": "Cliente + Loja"
      },
      {
        "order": 3,
        "key": "F2_FILIAL + F2_EMISSAO",
        "desc": "Data de Emissão"
      }
    ],
    "fields": [
      {
        "field": "F2_DOC",
        "type": "C",
        "size": 9,
        "dec": 0,
        "desc": "Número da NF",
        "valid": "ExistChav('SF2')",
        "relac": "GetSX8Num('SF2','F2_DOC')",
        "picture": "@!"
      },
      {
        "field": "F2_SERIE",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Série da Nota Fiscal",
        "valid": "",
        "relac": "'1  '",
        "picture": "@!"
      },
      {
        "field": "F2_CLIENTE",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Código do Cliente",
        "valid": "ExistCpo('SA1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "F2_LOJA",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Loja do Cliente",
        "valid": "",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "F2_EMISSAO",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data de Emissão",
        "valid": "",
        "relac": "dDataBase",
        "picture": ""
      },
      {
        "field": "F2_VALBRUT",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Valor Total da Nota",
        "valid": "Positivo()",
        "relac": "",
        "picture": "@E 999,999,999.92"
      },
      {
        "field": "F2_CHVNFE",
        "type": "C",
        "size": 44,
        "dec": 0,
        "desc": "Chave da NF-e (44 Dígitos)",
        "valid": "",
        "relac": "",
        "picture": "@!"
      }
    ]
  },
  "SD2": {
    "name": "Itens da NF de Saída",
    "description": "Itens faturados, impostos destacados (ICMS, IPI, PIS, COFINS) e TES (SIGAFAT/FIS).",
    "module": "SIGAFAT",
    "indices": [
      {
        "order": 1,
        "key": "D2_FILIAL + D2_DOC + D2_SERIE + D2_CLIENTE + D2_LOJA + D2_ITEM",
        "desc": "Documento + Série + Cliente + Item"
      },
      {
        "order": 2,
        "key": "D2_FILIAL + D2_COD",
        "desc": "Produto"
      }
    ],
    "fields": [
      {
        "field": "D2_DOC",
        "type": "C",
        "size": 9,
        "dec": 0,
        "desc": "Número da NF",
        "valid": "",
        "relac": "M->F2_DOC",
        "picture": "@!"
      },
      {
        "field": "D2_SERIE",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Série da NF",
        "valid": "",
        "relac": "M->F2_SERIE",
        "picture": "@!"
      },
      {
        "field": "D2_ITEM",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Item da Nota",
        "valid": "",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "D2_COD",
        "type": "C",
        "size": 15,
        "dec": 0,
        "desc": "Código do Produto",
        "valid": "ExistCpo('SB1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "D2_QUANT",
        "type": "N",
        "size": 12,
        "dec": 2,
        "desc": "Quantidade Faturada",
        "valid": "Positivo()",
        "relac": "1",
        "picture": "@E 999,999.99"
      },
      {
        "field": "D2_PRCVEN",
        "type": "N",
        "size": 14,
        "dec": 2,
        "desc": "Preço de Venda",
        "valid": "Positivo()",
        "relac": "",
        "picture": "@E 999,999.99"
      },
      {
        "field": "D2_TOTAL",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Total do Item",
        "valid": "",
        "relac": "M->D2_QUANT * M->D2_PRCVEN",
        "picture": "@E 999,999,999.92"
      },
      {
        "field": "D2_TES",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Tipo de Saída (TES)",
        "valid": "ExistCpo('SF4')",
        "relac": "",
        "picture": "@!"
      }
    ]
  },
  "SF4": {
    "name": "Tipos de Entrada e Saída (TES)",
    "description": "Coração fiscal do Protheus: tributação ICMS, IPI, PIS, COFINS, estoque e financeiro (SIGAFIS).",
    "module": "SIGAFIS",
    "indices": [
      {
        "order": 1,
        "key": "F4_FILIAL + F4_CODIGO",
        "desc": "Código do TES (Chave Primária)"
      },
      {
        "order": 2,
        "key": "F4_FILIAL + F4_CF",
        "desc": "CFOP Padrão da Operação"
      }
    ],
    "fields": [
      {
        "field": "F4_CODIGO",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Código do TES",
        "valid": "ExistChav('SF4')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "F4_TIPO",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Tipo (E=Entrada/S=Saída)",
        "valid": "Pertence('E/S')",
        "relac": "'S'",
        "picture": "@!"
      },
      {
        "field": "F4_CF",
        "type": "C",
        "size": 5,
        "dec": 0,
        "desc": "CFOP Oficial",
        "valid": "ExistCpo('13')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "F4_DUPLIC",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Gera Financeiro (S/N)",
        "valid": "Pertence('S/N')",
        "relac": "'S'",
        "picture": "@!"
      },
      {
        "field": "F4_ESTOQUE",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Atualiza Estoque (S/N)",
        "valid": "Pertence('S/N')",
        "relac": "'S'",
        "picture": "@!"
      },
      {
        "field": "F4_ICM",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Calcula ICMS (S/N)",
        "valid": "Pertence('S/N')",
        "relac": "'S'",
        "picture": "@!"
      },
      {
        "field": "F4_IPI",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Calcula IPI (R/B/N)",
        "valid": "Pertence('R/B/N/S')",
        "relac": "'N'",
        "picture": "@!"
      },
      {
        "field": "F4_PISCOF",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Crédito PIS/COFINS (1..4)",
        "valid": "",
        "relac": "'1'",
        "picture": "@!"
      },
      {
        "field": "F4_TEXTO",
        "type": "C",
        "size": 20,
        "dec": 0,
        "desc": "Descrição do TES",
        "valid": "",
        "relac": "",
        "picture": ""
      }
    ]
  },
  "SE1": {
    "name": "Contas a Receber",
    "description": "Títulos financeiros gerados por vendas ou faturamento manual (SIGAFIN).",
    "module": "SIGAFIN",
    "indices": [
      {
        "order": 1,
        "key": "E1_FILIAL + E1_PREFIXO + E1_NUM + E1_PARCELA + E1_TIPO",
        "desc": "Chave do Título (Primária)"
      },
      {
        "order": 2,
        "key": "E1_FILIAL + E1_CLIENTE + E1_LOJA",
        "desc": "Cliente + Loja"
      },
      {
        "order": 3,
        "key": "E1_FILIAL + E1_VENCTO",
        "desc": "Data de Vencimento"
      }
    ],
    "fields": [
      {
        "field": "E1_PREFIXO",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Prefixo do Título",
        "valid": "",
        "relac": "'FAT'",
        "picture": "@!"
      },
      {
        "field": "E1_NUM",
        "type": "C",
        "size": 9,
        "dec": 0,
        "desc": "Número do Título",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "E1_PARCELA",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Parcela do Título",
        "valid": "",
        "relac": "'A'",
        "picture": "@!"
      },
      {
        "field": "E1_TIPO",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Tipo (NF, DP, BOL)",
        "valid": "ExistCpo('05')",
        "relac": "'NF'",
        "picture": "@!"
      },
      {
        "field": "E1_CLIENTE",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Código do Cliente",
        "valid": "ExistCpo('SA1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "E1_LOJA",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Loja do Cliente",
        "valid": "",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "E1_EMISSAO",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data de Emissão",
        "valid": "",
        "relac": "dDataBase",
        "picture": ""
      },
      {
        "field": "E1_VENCTO",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data de Vencimento",
        "valid": "M->E1_VENCTO >= M->E1_EMISSAO",
        "relac": "",
        "picture": ""
      },
      {
        "field": "E1_VALOR",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Valor do Título",
        "valid": "Positivo()",
        "relac": "",
        "picture": "@E 999,999,999.92"
      },
      {
        "field": "E1_SALDO",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Saldo em Aberto",
        "valid": "",
        "relac": "M->E1_VALOR",
        "picture": "@E 999,999,999.92"
      }
    ]
  },
  "SE2": {
    "name": "Contas a Pagar",
    "description": "Títulos financeiros devidos a fornecedores e tributos (SIGAFIN).",
    "module": "SIGAFIN",
    "indices": [
      {
        "order": 1,
        "key": "E2_FILIAL + E2_PREFIXO + E2_NUM + E2_PARCELA + E2_TIPO",
        "desc": "Chave do Título a Pagar"
      },
      {
        "order": 2,
        "key": "E2_FILIAL + E2_FORNECE + E2_LOJA",
        "desc": "Fornecedor + Loja"
      },
      {
        "order": 3,
        "key": "E2_FILIAL + E2_VENCTO",
        "desc": "Data de Vencimento"
      }
    ],
    "fields": [
      {
        "field": "E2_PREFIXO",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Prefixo do Título",
        "valid": "",
        "relac": "'COM'",
        "picture": "@!"
      },
      {
        "field": "E2_NUM",
        "type": "C",
        "size": 9,
        "dec": 0,
        "desc": "Número do Título",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "E2_PARCELA",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Parcela do Título",
        "valid": "",
        "relac": "'A'",
        "picture": "@!"
      },
      {
        "field": "E2_TIPO",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Tipo do Título",
        "valid": "",
        "relac": "'NF'",
        "picture": "@!"
      },
      {
        "field": "E2_FORNECE",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Código do Fornecedor",
        "valid": "ExistCpo('SA2')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "E2_LOJA",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Loja do Fornecedor",
        "valid": "",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "E2_VALOR",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Valor a Pagar",
        "valid": "Positivo()",
        "relac": "",
        "picture": "@E 999,999,999.92"
      },
      {
        "field": "E2_SALDO",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Saldo em Aberto",
        "valid": "",
        "relac": "M->E2_VALOR",
        "picture": "@E 999,999,999.92"
      }
    ]
  },
  "SE5": {
    "name": "Movimentação Bancária",
    "description": "Baixas a receber/pagar, cheques, conciliação e fluxo financeiro (SIGAFIN).",
    "module": "SIGAFIN",
    "indices": [
      {
        "order": 1,
        "key": "E5_FILIAL + DTOS(E5_DATA) + E5_BANCO + E5_AGENCIA + E5_CONTA",
        "desc": "Data + Banco + Agência + Conta"
      },
      {
        "order": 2,
        "key": "E5_FILIAL + E5_PREFIXO + E5_NUMERO + E5_PARCELA + E5_TIPO",
        "desc": "Amarração com Título Financeiro"
      }
    ],
    "fields": [
      {
        "field": "E5_DATA",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data do Movimento",
        "valid": "NaoVazio()",
        "relac": "dDataBase",
        "picture": ""
      },
      {
        "field": "E5_VALOR",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Valor da Movimentação",
        "valid": "Positivo()",
        "relac": "",
        "picture": "@E 999,999,999.92"
      },
      {
        "field": "E5_BANCO",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Código do Banco",
        "valid": "ExistCpo('SA6')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "E5_AGENCIA",
        "type": "C",
        "size": 5,
        "dec": 0,
        "desc": "Agência Bancária",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "E5_CONTA",
        "type": "C",
        "size": 10,
        "dec": 0,
        "desc": "Conta Corrente",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "E5_DOCUMEN",
        "type": "C",
        "size": 9,
        "dec": 0,
        "desc": "Número do Documento",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "E5_MOTBX",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Motivo da Baixa (NOR, DAC, etc)",
        "valid": "",
        "relac": "'NOR'",
        "picture": "@!"
      },
      {
        "field": "E5_HISTOR",
        "type": "C",
        "size": 40,
        "dec": 0,
        "desc": "Histórico da Movimentação",
        "valid": "",
        "relac": "",
        "picture": "@!"
      }
    ]
  },
  "CT2": {
    "name": "Lançamentos Contábeis",
    "description": "Partidas dobradas, débitos, créditos e histórico da contabilidade (SIGACTB).",
    "module": "SIGACTB",
    "indices": [
      {
        "order": 1,
        "key": "CT2_FILIAL + DTOS(CT2_DATA) + CT2_LOTE + CT2_SBLOTE + CT2_DOC + CT2_LINHA",
        "desc": "Data + Lote + Doc + Linha (Primária)"
      },
      {
        "order": 2,
        "key": "CT2_FILIAL + CT2_DEBITO + DTOS(CT2_DATA)",
        "desc": "Conta Débito + Data"
      },
      {
        "order": 3,
        "key": "CT2_FILIAL + CT2_CREDIT + DTOS(CT2_DATA)",
        "desc": "Conta Crédito + Data"
      }
    ],
    "fields": [
      {
        "field": "CT2_DATA",
        "type": "D",
        "size": 8,
        "dec": 0,
        "desc": "Data do Lançamento",
        "valid": "NaoVazio()",
        "relac": "dDataBase",
        "picture": ""
      },
      {
        "field": "CT2_LOTE",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Número do Lote",
        "valid": "",
        "relac": "'000001'",
        "picture": "@!"
      },
      {
        "field": "CT2_DOC",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Documento Contábil",
        "valid": "",
        "relac": "'000001'",
        "picture": "@!"
      },
      {
        "field": "CT2_LINHA",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Linha Sequencial",
        "valid": "",
        "relac": "'001'",
        "picture": "@!"
      },
      {
        "field": "CT2_DEBITO",
        "type": "C",
        "size": 20,
        "dec": 0,
        "desc": "Conta Contábil Débito",
        "valid": "ExistCpo('CT1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "CT2_CREDIT",
        "type": "C",
        "size": 20,
        "dec": 0,
        "desc": "Conta Contábil Crédito",
        "valid": "ExistCpo('CT1')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "CT2_VALOR",
        "type": "N",
        "size": 16,
        "dec": 2,
        "desc": "Valor do Lançamento",
        "valid": "Positivo()",
        "relac": "",
        "picture": "@E 999,999,999.92"
      },
      {
        "field": "CT2_HIST",
        "type": "C",
        "size": 40,
        "dec": 0,
        "desc": "Histórico Contábil",
        "valid": "",
        "relac": "",
        "picture": "@!"
      }
    ]
  },
  "SX1": {
    "name": "Perguntas do ERP (Pergunte)",
    "description": "Dicionário de filtros de relatórios, rotinas e grupos de perguntas (SIGACFG).",
    "module": "SIGACFG",
    "indices": [
      {
        "order": 1,
        "key": "X1_GRUPO + X1_ORDEM",
        "desc": "Grupo + Ordem (Chave Primária)"
      }
    ],
    "fields": [
      {
        "field": "X1_GRUPO",
        "type": "C",
        "size": 10,
        "dec": 0,
        "desc": "Grupo da Pergunta",
        "valid": "NaoVazio()",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "X1_ORDEM",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Ordem / Sequência",
        "valid": "",
        "relac": "'01'",
        "picture": "@!"
      },
      {
        "field": "X1_PERGUNT",
        "type": "C",
        "size": 30,
        "dec": 0,
        "desc": "Texto da Pergunta",
        "valid": "",
        "relac": "",
        "picture": ""
      },
      {
        "field": "X1_VARIAVL",
        "type": "C",
        "size": 6,
        "dec": 0,
        "desc": "Variável Criada (mv_ch1)",
        "valid": "",
        "relac": "'mv_ch1'",
        "picture": "@!"
      },
      {
        "field": "X1_TIPO",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Tipo do Dado (C, N, D)",
        "valid": "Pertence('C/N/D')",
        "relac": "'C'",
        "picture": "@!"
      },
      {
        "field": "X1_TAMANHO",
        "type": "N",
        "size": 3,
        "dec": 0,
        "desc": "Tamanho do Campo",
        "valid": "Positivo()",
        "relac": "10",
        "picture": "999"
      },
      {
        "field": "X1_GSC",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Tipo Interface (G=Get/C=Combo)",
        "valid": "Pertence('G/C/R')",
        "relac": "'G'",
        "picture": "@!"
      }
    ]
  },
  "SX2": {
    "name": "Dicionário de Tabelas do ERP",
    "description": "Catálogo mestre de todas as tabelas lógicas e físicas do banco de dados (SIGACFG).",
    "module": "SIGACFG",
    "indices": [
      {
        "order": 1,
        "key": "X2_CHAVE",
        "desc": "Alias da Tabela (Chave Primária)"
      }
    ],
    "fields": [
      {
        "field": "X2_CHAVE",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Alias da Tabela (ex: SA1)",
        "valid": "ExistChav('SX2')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "X2_NOME",
        "type": "C",
        "size": 30,
        "dec": 0,
        "desc": "Nome da Tabela",
        "valid": "",
        "relac": "",
        "picture": ""
      },
      {
        "field": "X2_ARQUIVO",
        "type": "C",
        "size": 8,
        "dec": 0,
        "desc": "Nome Físico no DBAccess",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "X2_MODO",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Compartilhamento (E=Excl/C=Comp)",
        "valid": "Pertence('E/C')",
        "relac": "'E'",
        "picture": "@!"
      },
      {
        "field": "X2_ROTINA",
        "type": "C",
        "size": 15,
        "dec": 0,
        "desc": "Rotina Padrão do Menu",
        "valid": "",
        "relac": "",
        "picture": "@!"
      }
    ]
  },
  "SX3": {
    "name": "Dicionário de Campos e Validações",
    "description": "Coração das regras de negócio: tipos, tamanhos, validações e inicializadores (SIGACFG).",
    "module": "SIGACFG",
    "indices": [
      {
        "order": 1,
        "key": "X3_ARQUIVO + X3_ORDEM",
        "desc": "Tabela + Ordem do Campo"
      },
      {
        "order": 2,
        "key": "X3_CAMPO",
        "desc": "Nome do Campo (ex: A1_NOME)"
      }
    ],
    "fields": [
      {
        "field": "X3_ARQUIVO",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Alias da Tabela",
        "valid": "ExistCpo('SX2')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "X3_ORDEM",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Ordem Visual em Tela",
        "valid": "",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "X3_CAMPO",
        "type": "C",
        "size": 10,
        "dec": 0,
        "desc": "Nome do Campo Protheus",
        "valid": "ExistChav('SX3',M->X3_CAMPO)",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "X3_TIPO",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Tipo (C=Carac, N=Num, D=Data)",
        "valid": "Pertence('C/N/D/M/L')",
        "relac": "'C'",
        "picture": "@!"
      },
      {
        "field": "X3_TAMANHO",
        "type": "N",
        "size": 3,
        "dec": 0,
        "desc": "Tamanho em Caracteres",
        "valid": "Positivo()",
        "relac": "10",
        "picture": "999"
      },
      {
        "field": "X3_TITULO",
        "type": "C",
        "size": 18,
        "dec": 0,
        "desc": "Título / Cabeçalho",
        "valid": "",
        "relac": "",
        "picture": ""
      },
      {
        "field": "X3_VALID",
        "type": "C",
        "size": 80,
        "dec": 0,
        "desc": "Validação ADVPL (X3_VALID)",
        "valid": "",
        "relac": "",
        "picture": ""
      },
      {
        "field": "X3_RELACAO",
        "type": "C",
        "size": 80,
        "dec": 0,
        "desc": "Inicializador Padrão",
        "valid": "",
        "relac": "",
        "picture": ""
      },
      {
        "field": "X3_PICTURE",
        "type": "C",
        "size": 20,
        "dec": 0,
        "desc": "Máscara de Formatação",
        "valid": "",
        "relac": "",
        "picture": ""
      }
    ]
  },
  "SIX": {
    "name": "Dicionário de Índices do Protheus",
    "description": "Chaves de ordenação física criadas no DBAccess para alta performance (SIGACFG).",
    "module": "SIGACFG",
    "indices": [
      {
        "order": 1,
        "key": "INDICE + ORDEM",
        "desc": "Tabela + Ordem do Índice"
      }
    ],
    "fields": [
      {
        "field": "INDICE",
        "type": "C",
        "size": 3,
        "dec": 0,
        "desc": "Alias da Tabela",
        "valid": "ExistCpo('SX2')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "ORDEM",
        "type": "C",
        "size": 2,
        "dec": 0,
        "desc": "Número da Ordem (1, 2...)",
        "valid": "",
        "relac": "'1'",
        "picture": "@!"
      },
      {
        "field": "CHAVE",
        "type": "C",
        "size": 100,
        "dec": 0,
        "desc": "Expressão ADVPL do Índice",
        "valid": "",
        "relac": "",
        "picture": ""
      },
      {
        "field": "DESCRICAO",
        "type": "C",
        "size": 40,
        "dec": 0,
        "desc": "Descrição Funcional",
        "valid": "",
        "relac": "",
        "picture": ""
      },
      {
        "field": "PROPRI",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Proprietário (S=Sistema/U=User)",
        "valid": "Pertence('S/U')",
        "relac": "'S'",
        "picture": "@!"
      }
    ]
  },
  "SX6": {
    "name": "Parâmetros Globais do ERP",
    "description": "Configurações gerais do sistema recuperadas via função GetMv() (SIGACFG).",
    "module": "SIGACFG",
    "indices": [
      {
        "order": 1,
        "key": "X6_FIL + X6_VAR",
        "desc": "Filial + Nome do Parâmetro (Primária)"
      }
    ],
    "fields": [
      {
        "field": "X6_VAR",
        "type": "C",
        "size": 10,
        "dec": 0,
        "desc": "Nome do Parâmetro (ex: MV_ESTNEG)",
        "valid": "ExistChav('SX6')",
        "relac": "",
        "picture": "@!"
      },
      {
        "field": "X6_TIPO",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Tipo do Conteúdo (C/N/L/D)",
        "valid": "Pertence('C/N/L/D')",
        "relac": "'C'",
        "picture": "@!"
      },
      {
        "field": "X6_DESCRIC",
        "type": "C",
        "size": 50,
        "dec": 0,
        "desc": "Descrição Funcional",
        "valid": "",
        "relac": "",
        "picture": ""
      },
      {
        "field": "X6_CONTEUD",
        "type": "C",
        "size": 80,
        "dec": 0,
        "desc": "Conteúdo / Valor do Parâmetro",
        "valid": "",
        "relac": "",
        "picture": ""
      },
      {
        "field": "X6_PROPRI",
        "type": "C",
        "size": 1,
        "dec": 0,
        "desc": "Proprietário (S=Padrão/U=Custom)",
        "valid": "",
        "relac": "'S'",
        "picture": "@!"
      }
    ]
  }
};

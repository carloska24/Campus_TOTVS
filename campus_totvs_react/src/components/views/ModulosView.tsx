import React, { useState } from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { Layers, ArrowRight, Table, Code, CheckCircle2 } from 'lucide-react';

interface IModuloItem {
  id: string;
  name: string;
  code: string;
  desc: string;
  tables: string[];
  snippet: string;
}

const MODULOS_LIST: IModuloItem[] = [
  {
    id: 'sigafat',
    name: 'Faturamento & Vendas (SIGAFAT)',
    code: '05',
    desc: 'Gestão comercial, emissão de notas fiscais, controle de alçadas e Pontos de Entrada no MATA410.',
    tables: ['SC5 - Cabeçalho do Pedido', 'SC6 - Itens do Pedido', 'SF2 - Cabeçalho de NF Saída', 'SD2 - Itens de NF Saída'],
    snippet: `// Leitura e Validação de Pedido de Venda no SIGAFAT (P.E. MT410OK)
User Function MT410OK()
    Local aArea := GetArea()
    Local lRet  := .T.
    
    If SC5->C5_VLRTOT > GetMV("MV_LIMPED", .F., 50000)
        lRet := .F.
        Help("", 1, "ALCADA", , "Pedido excede o limite autorizado!", 1, 0)
    EndIf
    
    RestArea(aArea)
Return lRet`
  },
  {
    id: 'sigacom',
    name: 'Compras & Suprimentos (SIGACOM)',
    code: '02',
    desc: 'Solicitações de compra, cotações, pedidos de compra e recebimento de notas fiscais de entrada.',
    tables: ['SC1 - Solicitações de Compra', 'SC7 - Pedidos de Compra', 'SF1 - Cabeçalho NF Entrada', 'SD1 - Itens NF Entrada'],
    snippet: `// Ponto de Entrada MT120FIM na Gravação do Pedido de Compra
User Function MT120FIM()
    Local aArea := GetArea()
    // Notifica o gestor ou grava log de aprovação
    FWLogMsg("INFO", "COMPRAS", "PEDIDO", "Pedido de Compra gerado com sucesso!")
    RestArea(aArea)
Return Nil`
  },
  {
    id: 'sigaest',
    name: 'Estoque & Custos (SIGAEST)',
    code: '04',
    desc: 'Controle de saldos em estoque, recálculo do custo médio ponderado, movimentações internas e Kardex.',
    tables: ['SB1 - Produtos', 'SB2 - Saldos em Estoque', 'SD3 - Movimentações Internas', 'SB9 - Saldos Iniciais'],
    snippet: `// Consulta de Saldo em Estoque (SB2)
Local nSaldo := 0
DbSelectArea("SB2")
DbSetOrder(1) // B2_FILIAL + B2_COD + B2_LOCAL
If DbSeek(xFilial("SB2") + "PRD001" + "01")
    nSaldo := SB2->B2_QATU
    ApMsgInfo("Saldo atual: " + cValToChar(nSaldo), "Estoque")
EndIf`
  },
  {
    id: 'sigafin',
    name: 'Financeiro & Tesouraria (SIGAFIN)',
    code: '06',
    desc: 'Contas a pagar e receber, fluxo de caixa, conciliação bancária e integração com CNAB.',
    tables: ['SE1 - Contas a Receber', 'SE2 - Contas a Pagar', 'SE5 - Movimentação Bancária', 'SA6 - Bancos'],
    snippet: `// Consulta de Títulos a Receber Vencidos (SE1)
Local cQuery := " SELECT E1_NUM, E1_VALOR, E1_VENCREA FROM " + RetSqlName("SE1")
cQuery += " WHERE D_E_L_E_T_ = ' ' AND E1_SALDO > 0 AND E1_VENCREA < '" + DtoS(Date()) + "' "
TCQuery ChangeQuery(cQuery) New Alias "QRY_TIT"`
  },
  {
    id: 'sigactb',
    name: 'Contabilidade Gerencial (SIGACTB)',
    code: '34',
    desc: 'Plano de contas gerencial, lançamentos contábeis em partidas dobradas e apuração do DRE/Balanço.',
    tables: ['CT1 - Plano de Contas', 'CT2 - Lançamentos Contábeis', 'CT5 - Lançamentos Padrões (LP)', 'CTT - Centro de Custos'],
    snippet: `// Validação de Conta Contábil Ativa (CT1)
DbSelectArea("CT1")
DbSetOrder(1) // CT1_FILIAL + CT1_CONTA
If DbSeek(xFilial("CT1") + "110101") .And. CT1->CT1_BLOQ == "2"
    ApMsgInfo("Conta ativa para lancamento!", "Contabilidade")
EndIf`
  },
  {
    id: 'sigafis',
    name: 'Livros Fiscais & SPED (SIGAFIS)',
    code: '09',
    desc: 'Motor de cálculo de tributos (ICMS, IPI, PIS, COFINS, ISS), parametrização do TES e obrigações SPED.',
    tables: ['SF4 - Tipos de Entrada e Saída (TES)', 'SFT - Livro Fiscal Eletrônico', 'SF3 - Livros Fiscais', 'SF7 - Exceções Fiscais'],
    snippet: `// Consulta de Regra do TES (SF4)
DbSelectArea("SF4")
DbSetOrder(1) // F4_FILIAL + F4_CODIGO
If DbSeek(xFilial("SF4") + "501")
    ApMsgInfo("Credita ICMS: " + SF4->F4_CREDICM, "Motor Fiscal TES")
EndIf`
  }
];

export const ModulosView: React.FC = () => {
  const [selectedId, setSelectedId] = useState('sigafat');
  const { setUserCode, setActiveTab, activeLessonId } = useCampusStore();

  const selectedModulo = MODULOS_LIST.find((m) => m.id === selectedId) || MODULOS_LIST[0];

  const handleLoadInEditor = (snippet: string) => {
    soundFx.playSuccess();
    setUserCode(activeLessonId, snippet);
    setActiveTab('lab');
  };

  return (
    <div className="flex-1 h-[calc(100vh-3.5rem)] bg-[#0d1117] flex overflow-hidden">
      {/* Lista de Módulos (Esquerda) */}
      <div className="w-80 border-r border-[#30363d] bg-[#161b22] p-3 overflow-y-auto space-y-2 shrink-0">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Módulos ERP Protheus</span>
        </div>

        {MODULOS_LIST.map((mod) => {
          const isSelected = mod.id === selectedId;
          return (
            <button
              key={mod.id}
              onClick={() => {
                soundFx.playTick();
                setSelectedId(mod.id);
              }}
              className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1c2128] border-cyan-500/50 text-white shadow-md'
                  : 'bg-[#0d1117] border-[#30363d] text-gray-400 hover:border-gray-500 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-cyan-400 font-mono">
                  Módulo {mod.code}
                </span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
              </div>
              <h4 className="text-xs font-semibold text-white leading-tight mb-1">
                {mod.name}
              </h4>
              <p className="text-[11px] text-gray-400 line-clamp-2">
                {mod.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detalhes do Módulo (Direita) */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono font-bold text-xs border border-cyan-800/40">
              Módulo {selectedModulo.code}
            </span>
            <h2 className="text-lg font-bold text-white">
              {selectedModulo.name}
            </h2>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
            {selectedModulo.desc}
          </p>
        </div>

        {/* Tabelas Principais */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Table className="w-4 h-4 text-cyan-400" />
            <span>Principais Tabelas Corporativas do Dicionário (SX2)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedModulo.tables.map((tbl, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-mono text-cyan-300 flex items-center gap-2"
              >
                <span>🗄️</span>
                <span>{tbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Snippet Prático */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-cyan-400" />
              <span>Código Prático e Ponto de Entrada Oficial</span>
            </h3>

            <button
              onClick={() => handleLoadInEditor(selectedModulo.snippet)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <span>Carregar no Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-[#0a0d13] border border-[#30363d] text-xs font-mono text-cyan-200 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
            {selectedModulo.snippet}
          </pre>
        </div>
      </div>
    </div>
  );
};

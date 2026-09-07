import React, { useState } from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { 
  Layers, 
  ArrowRight, 
  Workflow, 
  Table, 
  Code, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface IFlowStep {
  step: string;
  routine: string;
  tables: string;
  desc: string;
}

interface IModuloItem {
  id: string;
  name: string;
  code: string;
  category: string;
  routines: string;
  desc: string;
  flowTitle: string;
  flowSteps: IFlowStep[];
  tables: { code: string; name: string; desc: string }[];
  snippet: string;
}

const MODULOS_LIST: IModuloItem[] = [
  {
    id: 'sigafat',
    name: 'SIGAFAT: Faturamento & Vendas',
    code: '05',
    category: 'Módulo de Receita',
    routines: 'MATA410 • MATA460A',
    desc: 'O SIGAFAT é o coração gerador de receita do ERP. Ele controla desde a digitação do pedido de venda até o cálculo automático de impostos (ICMS, IPI, PIS, COFINS, ISS), validação de regras de crédito, reserva física no estoque e transmissão do XML da Nota Fiscal Eletrônica à SEFAZ.',
    flowTitle: 'Fluxo Operacional Oficial do Faturamento',
    flowSteps: [
      { step: '1. Pedido de Venda', routine: 'MATA410 (SC5/SC6)', tables: 'SC5 / SC6', desc: 'Digitação dos itens e preços' },
      { step: '2. Liberação Comercial', routine: 'MATA440 / MaLib', tables: 'SC9 / SA1', desc: 'Checagem de crédito e saldo' },
      { step: '3. Emissão de NF-e', routine: 'MATA460A (SF2/SD2)', tables: 'SF2 / SD2', desc: 'Geração fiscal e SEFAZ' },
      { step: '4. Contas a Receber', routine: 'FINA040 (SE1)', tables: 'SE1', desc: 'Geração de títulos financeiros' }
    ],
    tables: [
      { code: 'SC5', name: 'Cabeçalho de Pedidos de Venda', desc: 'Armazena cliente, condição de pagamento e totais.' },
      { code: 'SC6', name: 'Itens de Pedidos de Venda', desc: 'Produtos, quantidades, preços unitários e TES aplicada.' },
      { code: 'SF2', name: 'Cabeçalho das Notas Fiscais de Saída', desc: 'Dados do documento fiscal gerado e chave SEFAZ.' },
      { code: 'SD2', name: 'Itens de Venda da NF (Movimento)', desc: 'Espelho fiscal dos itens faturados para estoque e tributos.' }
    ],
    snippet: `// Leitura e Validação de Pedido de Venda no SIGAFAT (Ponto de Entrada MT410OK)
User Function MT410OK()
    Local aArea := GetArea()
    Local lRet  := .T.
    
    // Regra Corporativa: Pedidos acima do teto exigem autorização do comitê
    If SC5->C5_VLRTOT > GetMV("MV_LIMPED", .F., 50000)
        lRet := .F.
        Help("", 1, "ALCADA", , "Pedido excede o limite máximo autorizado de alçada!", 1, 0)
    EndIf
    
    RestArea(aArea)
Return lRet`
  },
  {
    id: 'sigacom',
    name: 'SIGACOM: Compras & Suprimentos',
    code: '02',
    category: 'Módulo de Suprimentos',
    routines: 'MATA110 • MATA120 • MATA103',
    desc: 'O SIGACOM gerencia toda a cadeia de aquisição de bens e insumos, partindo das solicitações de compras dos departamentos, passando pela cotação de preços com múltiplos fornecedores até a emissão de pedidos e o recebimento das notas fiscais de entrada (com classificação fiscal no TES).',
    flowTitle: 'Fluxo Operacional Oficial de Compras',
    flowSteps: [
      { step: '1. Solicitação de Compras', routine: 'MATA110 (SC1)', tables: 'SC1', desc: 'Requisição interna de insumos' },
      { step: '2. Cotação de Preços', routine: 'MATA150 (SC8)', tables: 'SC8', desc: 'Tomada de propostas e mapa' },
      { step: '3. Pedido de Compras', routine: 'MATA120 (SC7)', tables: 'SC7', desc: 'Autorização e envio ao fornecedor' },
      { step: '4. Documento de Entrada', routine: 'MATA103 (SF1/SD1)', tables: 'SF1 / SD1', desc: 'Classificação de NF e estoque' }
    ],
    tables: [
      { code: 'SC1', name: 'Solicitações de Compras', desc: 'Demandas dos setores da empresa por produtos.' },
      { code: 'SC7', name: 'Pedidos de Compras', desc: 'Contratos firmados com fornecedores.' },
      { code: 'SF1', name: 'Cabeçalho NF de Entrada', desc: 'Registro da nota fiscal do fornecedor.' },
      { code: 'SD1', name: 'Itens das Notas Fiscais de Entrada', desc: 'Alimentação física do almoxarifado.' }
    ],
    snippet: `// Ponto de Entrada MT120FIM na Gravação do Pedido de Compra (SIGACOM)
User Function MT120FIM()
    Local aArea := GetArea()
    
    // Notifica o gestor ou grava log de auditoria oficial
    FWLogMsg("INFO", "COMPRAS", "PEDIDO", "Pedido de Compra " + SC7->C7_NUM + " gerado com sucesso!")
    
    RestArea(aArea)
Return Nil`
  },
  {
    id: 'sigaest',
    name: 'SIGAEST: Estoque & Custos',
    code: '04',
    category: 'Módulo de Almoxarifado',
    routines: 'MATA240 • MATA330',
    desc: 'O SIGAEST é responsável pela acuracidade física e contábil dos almoxarifados. Controla saldos por armazém e lote, calcula o Custo Médio Ponderado das mercadorias, executa inventários cíclicos e gera os lançamentos de absorção de custos para a contabilidade.',
    flowTitle: 'Fluxo Operacional Oficial de Estoque',
    flowSteps: [
      { step: '1. Entrada de Materiais', routine: 'MATA103 / MATA240', tables: 'SD1 / SD3', desc: 'Alimentação do saldo por armazém' },
      { step: '2. Movimentação Interna', routine: 'MATA240 (SD3)', tables: 'SD3', desc: 'Requisição e transferência' },
      { step: '3. Custo Médio Ponderado', routine: 'MATA330 (Custo)', tables: 'SB2', desc: 'Recálculo e valorização do Kardex' },
      { step: '4. Fechamento Mensal', routine: 'MATA280 (SB9)', tables: 'SB9', desc: 'Geração de saldos iniciais do mês' }
    ],
    tables: [
      { code: 'SB1', name: 'Descrição Genérica do Produto', desc: 'Cadastro mestre de itens, unidades e tipos.' },
      { code: 'SB2', name: 'Saldos Físico e Financeiro', desc: 'Saldo atual e custo médio por armazém.' },
      { code: 'SD3', name: 'Movimentações Internas', desc: 'Histórico de requisições, devoluções e produção.' },
      { code: 'SB9', name: 'Saldos Iniciais do Mês', desc: 'Fotografia de fechamento do estoque contábil.' }
    ],
    snippet: `// Consulta Otimizada de Saldo em Estoque (SB2)
Local nSaldo := 0
DbSelectArea("SB2")
DbSetOrder(1) // B2_FILIAL + B2_COD + B2_LOCAL

If DbSeek(xFilial("SB2") + "PRD001" + "01")
    nSaldo := SB2->B2_QATU
    ApMsgInfo("Saldo atual do item PRD001 no Almoxarifado 01: " + cValToChar(nSaldo), "Almoxarifado")
EndIf`
  },
  {
    id: 'sigafin',
    name: 'SIGAFIN: Financeiro & Tesouraria',
    code: '06',
    category: 'Módulo de Tesouraria',
    routines: 'FINA040 • FINA050 • FINA100',
    desc: 'O SIGAFIN administra a liquidez e a tesouraria corporativa. Realiza a gestão de Contas a Receber, Contas a Pagar, transferências entre bancos, conciliação bancária automática via arquivos CNAB (Cobrança e Pagamento Escritural) e projeções de fluxo de caixa.',
    flowTitle: 'Fluxo Operacional Oficial Financeiro',
    flowSteps: [
      { step: '1. Entrada de Títulos', routine: 'FINA040 / FINA050', tables: 'SE1 / SE2', desc: 'Títulos gerados por Compras ou Vendas' },
      { step: '2. Borderô Bancário', routine: 'FINA060 / FINA240', tables: 'SE1 / SEA', desc: 'Remessa de boletos e CNAB bancário' },
      { step: '3. Baixa & Liquidação', routine: 'FINA070 / FINA080', tables: 'SE5', desc: 'Recebimento e pagamento com juros/desconto' },
      { step: '4. Conciliação Bancária', routine: 'FINA380 (Extrato)', tables: 'SE5 / SA6', desc: 'Cruzamento com extrato bancário oficial' }
    ],
    tables: [
      { code: 'SE1', name: 'Contas a Receber', desc: 'Duplicatas e títulos emitidos contra clientes.' },
      { code: 'SE2', name: 'Contas a Pagar', desc: 'Obrigações e notas a pagar a fornecedores.' },
      { code: 'SE5', name: 'Movimentação Bancária', desc: 'Lançamentos de extrato, baixas e transferências.' },
      { code: 'SA6', name: 'Bancos e Contas Correntes', desc: 'Instituições bancárias e agências da empresa.' }
    ],
    snippet: `// Consulta Segura de Títulos a Receber Vencidos (SE1 via TopConnect)
Local cQuery := " SELECT E1_NUM, E1_VALOR, E1_VENCREA FROM " + RetSqlName("SE1")
cQuery += " WHERE D_E_L_E_T_ = ' ' AND E1_SALDO > 0 AND E1_VENCREA < '" + DtoS(Date()) + "' "

If Select("QRY_TIT") > 0
    QRY_TIT->(DbCloseArea())
EndIf

TCQuery ChangeQuery(cQuery) New Alias "QRY_TIT"`
  },
  {
    id: 'sigactb',
    name: 'SIGACTB: Contabilidade Gerencial',
    code: '34',
    category: 'Módulo Contábil',
    routines: 'CTBA102 • CTBA500',
    desc: 'O SIGACTB consolida todas as operações financeiras e patrimoniais da empresa em partidas dobradas. Executa lançamentos padrões automáticos integrados aos outros módulos, apura o balanço patrimonial, Demonstração do Resultado do Exercício (DRE) e Escrituração Contábil Digital (ECD/SPED).',
    flowTitle: 'Fluxo Operacional Oficial da Contabilidade',
    flowSteps: [
      { step: '1. Lançamento Padrão', routine: 'CT5 (Regra LP)', tables: 'CT5', desc: 'Parametrização do débito e crédito' },
      { step: '2. Contabilização Off-line', routine: 'CTBA500 (Batch)', tables: 'CT2', desc: 'Processamento em lote dos módulos' },
      { step: '3. Validação do Lote', routine: 'CTBA102 (Lotes)', tables: 'CT2', desc: 'Checagem de igualdade Débito = Crédito' },
      { step: '4. DRE & Balancete', routine: 'CTBR040 / CTBR500', tables: 'CT1 / CT2', desc: 'Emissão das demonstrações financeiras' }
    ],
    tables: [
      { code: 'CT1', name: 'Plano de Contas', desc: 'Estrutura sintética e analítica das contas contábeis.' },
      { code: 'CT2', name: 'Lançamentos Contábeis', desc: 'Partidas dobradas diárias (débito, crédito e valor).' },
      { code: 'CT5', name: 'Lançamentos Padrões (LP)', desc: 'Regras de automação contábil para o ERP.' },
      { code: 'CTT', name: 'Centro de Custos', desc: 'Unidades de negócio e departamentos para rateio.' }
    ],
    snippet: `// Validação de Conta Contábil Analítica Ativa (CT1)
DbSelectArea("CT1")
DbSetOrder(1) // CT1_FILIAL + CT1_CONTA

If DbSeek(xFilial("CT1") + "110101") .And. CT1->CT1_BLOQ == "2"
    ApMsgInfo("Conta analítica 110101 está ativa para lançamentos!", "Contabilidade")
EndIf`
  },
  {
    id: 'sigafis',
    name: 'SIGAFIS: Livros Fiscais & SPED',
    code: '09',
    category: 'Módulo Tributário',
    routines: 'MATA080 • MATA953',
    desc: 'O SIGAFIS gerencia a apuração de impostos diretos e indiretos (ICMS, IPI, PIS, COFINS, ISS, ICMS-ST e DIFAL). O coração do sistema fiscal do Protheus é a tabela de Tipos de Entrada e Saída (SF4 - TES), que dita se a operação gera crédito, gera duplicata ou movimenta estoque.',
    flowTitle: 'Fluxo Operacional Oficial Fiscal',
    flowSteps: [
      { step: '1. Cadastro de TES', routine: 'MATA080 (SF4)', tables: 'SF4', desc: 'Regras de tributação, crédito e CFOP' },
      { step: '2. Apuração de Tributos', routine: 'MATA953 (Apuração)', tables: 'SFT / SF3', desc: 'Cálculo mensal de saldo credor ou devedor' },
      { step: '3. Guias de Recolhimento', routine: 'MATA960 (GNRE)', tables: 'SF6', desc: 'Geração de guias DARE e GNRE' },
      { step: '4. SPED Fiscal & EFD', routine: 'SPEDFISCAL', tables: 'SFT', desc: 'Transmissão do arquivo magnético à RFB' }
    ],
    tables: [
      { code: 'SF4', name: 'Tipos de Entrada e Saída (TES)', desc: 'Governa a inteligência tributária do Protheus.' },
      { code: 'SFT', name: 'Livro Fiscal Eletrônico', desc: 'Memória de cálculo fiscal de cada item movimentado.' },
      { code: 'SF3', name: 'Livros Fiscais de Entrada e Saída', desc: 'Resumo por alíquota e CFOP.' },
      { code: 'SF7', name: 'Exceções Fiscais por Estado', desc: 'Diferimento, redução de base de cálculo e MVA.' }
    ],
    snippet: `// Consulta da Regra do Motor Fiscal no TES (SF4)
DbSelectArea("SF4")
DbSetOrder(1) // F4_FILIAL + F4_CODIGO

If DbSeek(xFilial("SF4") + "501")
    ApMsgInfo("CFOP: " + SF4->F4_CFOP + " | Gera Duplicata: " + SF4->F4_DUPLIC + " | Credita ICMS: " + SF4->F4_CREDICM, "Motor Fiscal TES")
EndIf`
  }
];

export const ModulosView: React.FC = () => {
  const [selectedId, setSelectedId] = useState('sigafat');
  const { setUserCode, setActiveTab, activeLessonId, theme } = useCampusStore();

  const isDark = theme === 'dark';
  const selectedModulo = MODULOS_LIST.find((m) => m.id === selectedId) || MODULOS_LIST[0];

  const handleLoadInEditor = (snippet: string) => {
    soundFx.playSuccess();
    setUserCode(activeLessonId, snippet);
    setActiveTab('lab');
  };

  return (
    <div 
      className={`flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto transition-colors duration-200 ${
        isDark ? 'bg-[#0d1117] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* CABEÇALHO EDITORIAL (SEM CARDS ISOLADOS) */}
        <div className="space-y-3 border-b pb-6 border-gray-800/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Arquitetura de Negócio & Engenharia TOTVS</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Módulos Oficiais do Backoffice Protheus (Padrão TDN)
          </h1>

          <p className={`text-xs md:text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            Compreenda a lógica operacional, tabelas mestre e pontos de customização dos 6 pilares corporativos essenciais do ERP.
          </p>

          {/* Faixa Integrada de Métricas (Inline Stats - Sem caixas individuais) */}
          <div className={`flex flex-wrap items-center gap-6 pt-2 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Cobertura de Vagas: <strong className={isDark ? 'text-white' : 'text-slate-900'}>90% do Mercado</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>Documentação: <strong className={isDark ? 'text-white' : 'text-slate-900'}>TOTVS TDN Oficial</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span>Módulos Abordados: <strong className={isDark ? 'text-white' : 'text-slate-900'}>FAT • COM • EST • FIN • CTB • FIS</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Rigor Técnico: <strong className={isDark ? 'text-white' : 'text-slate-900'}>Consultoria Sênior</strong></span>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO DOS MÓDULOS (ABAS LINEARES SEM CARDS) */}
        <div className="flex items-center gap-1 border-b border-gray-800/30 overflow-x-auto pb-0.5">
          {MODULOS_LIST.map((mod) => {
            const isSelected = mod.id === selectedId;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  soundFx.playTick();
                  setSelectedId(mod.id);
                }}
                className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'border-cyan-400 text-cyan-400 font-bold'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <span>{mod.name.split(':')[0]}</span>
                <span className="text-[10px] ml-1.5 opacity-60">({mod.code})</span>
              </button>
            );
          })}
        </div>

        {/* SEÇÃO PRINCIPAL DO MÓDULO (ESTILO EDITORIAL TÉCNICO) */}
        <div className="space-y-8">
          {/* Cabeçalho do Módulo + Ação */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                  isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                }`}>
                  {selectedModulo.category}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  Rotinas: <strong className="font-mono text-cyan-400">{selectedModulo.routines}</strong>
                </span>
              </div>

              <h2 className="text-xl font-bold">
                {selectedModulo.name}
              </h2>

              <p className={`text-xs md:text-sm leading-relaxed pt-1 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                {selectedModulo.desc}
              </p>
            </div>

            <button
              onClick={() => handleLoadInEditor(selectedModulo.snippet)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
            >
              <span>Abrir Fonte no Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* FLUXOGRAMA DE PROCESSO EM PIPELINE CONTÍNUO (SEM CAIXAS DENTRO DE CAIXAS) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Workflow className="w-4 h-4" />
              <span>{selectedModulo.flowTitle}</span>
            </div>

            {/* Pipeline Horizontal Contínuo */}
            <div className={`grid grid-cols-1 md:grid-cols-4 border-t border-b ${isDark ? 'border-gray-800/50' : 'border-slate-200'}`}>
              {selectedModulo.flowSteps.map((fs, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 relative flex flex-col justify-between ${
                    idx !== 3 ? (isDark ? 'md:border-r md:border-gray-800/50' : 'md:border-r md:border-slate-200') : ''
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-cyan-400 flex items-center justify-between">
                      <span>{fs.step}</span>
                      {idx < 3 && <ChevronRight className="w-3.5 h-3.5 opacity-40 hidden md:block" />}
                    </div>
                    <div className="text-[11px] font-mono font-semibold text-amber-400">
                      {fs.routine}
                    </div>
                    <p className={`text-[11px] leading-relaxed pt-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {fs.desc}
                    </p>
                  </div>

                  <div className="pt-3 text-[10px] flex items-center gap-1.5">
                    <span className="opacity-50">Tabelas:</span>
                    <span className="font-mono text-cyan-300 font-semibold">{fs.tables}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TABELAS MESTRE COMO LISTA ESTRUTURADA DE METADADOS (SEM CARDS EM GRID) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              <Table className="w-4 h-4 text-cyan-400" />
              <span>Tabelas Mestre do Dicionário ({selectedModulo.name.split(':')[0]})</span>
            </div>

            <div className={`divide-y border rounded-xl overflow-hidden ${isDark ? 'border-gray-800/60 divide-gray-800/40 bg-[#161b22]/40' : 'border-slate-200 divide-slate-100 bg-white shadow-sm'}`}>
              {selectedModulo.tables.map((tbl, i) => (
                <div key={i} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-cyan-400 text-xs bg-cyan-950/40 border border-cyan-800/30">
                      {tbl.code}
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {tbl.name}
                    </span>
                  </div>
                  <span className={`text-[11px] sm:max-w-md ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {tbl.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CÓDIGO FONTE OFICIAL (CONTAINER FOCADO) */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Ponto de Entrada e Código Corporativo Oficial:
              </span>
              <span className="text-[10px] font-mono text-cyan-400">ADVPL Padrão TDN</span>
            </div>

            <pre 
              className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed ${
                isDark 
                  ? 'bg-[#090d16] border-[#30363d] text-cyan-200' 
                  : 'bg-[#f1f5f9] border-[#cbd5e1] text-slate-800'
              }`}
            >
              {selectedModulo.snippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

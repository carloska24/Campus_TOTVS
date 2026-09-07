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
  ChevronRight,
  BarChart3,
  FileCheck2,
  Briefcase,
  GraduationCap
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
  icon: string;
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
    icon: '📦',
    desc: 'O SIGAFAT é o coração gerador de receita do ERP. Ele controla desde a digitação do pedido de venda até o cálculo automático de impostos (ICMS, IPI, PIS, COFINS, ISS), validação de regras de crédito, reserva física no estoque e transmissão do XML da Nota Fiscal Eletrônica à SEFAZ.',
    flowTitle: 'Fluxo Operacional Oficial do Faturamento',
    flowSteps: [
      { step: '1. Pedido de Venda', routine: 'MATA410 (SC5/SC6)', tables: 'SC5 / SC6', desc: 'Digitação dos itens, preços e regras comerciais' },
      { step: '2. Liberação Comercial', routine: 'MATA440 / MaLib', tables: 'SC9 / SA1', desc: 'Checagem de crédito, limite e saldo em armazém' },
      { step: '3. Emissão de NF-e', routine: 'MATA460A (SF2/SD2)', tables: 'SF2 / SD2', desc: 'Geração do documento fiscal e autorização SEFAZ' },
      { step: '4. Contas a Receber', routine: 'FINA040 (SE1)', tables: 'SE1', desc: 'Geração automática de títulos e integração financeira' }
    ],
    tables: [
      { code: 'SC5', name: 'Cabeçalho de Pedidos de Venda', desc: 'Armazena cliente, condição de pagamento, frete e totais.' },
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
    icon: '🛒',
    desc: 'O SIGACOM gerencia toda a cadeia de aquisição de bens e insumos, partindo das solicitações de compras dos departamentos, passando pela cotação de preços com múltiplos fornecedores até a emissão de pedidos e o recebimento das notas fiscais de entrada (com classificação fiscal no TES).',
    flowTitle: 'Fluxo Operacional Oficial de Compras',
    flowSteps: [
      { step: '1. Solicitação de Compras', routine: 'MATA110 (SC1)', tables: 'SC1', desc: 'Requisição interna de insumos e matérias-primas' },
      { step: '2. Cotação de Preços', routine: 'MATA150 (SC8)', tables: 'SC8', desc: 'Tomada de propostas e mapa comparativo' },
      { step: '3. Pedido de Compras', routine: 'MATA120 (SC7)', tables: 'SC7', desc: 'Autorização e envio oficial ao fornecedor' },
      { step: '4. Documento de Entrada', routine: 'MATA103 (SF1/SD1)', tables: 'SF1 / SD1', desc: 'Classificação de NF, alimentação do estoque e contas a pagar' }
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
    icon: '📊',
    desc: 'O SIGAEST é responsável pela acuracidade física e contábil dos almoxarifados. Controla saldos por armazém e lote, calcula o Custo Médio Ponderado das mercadorias, executa inventários cíclicos e gera os lançamentos de absorção de custos para a contabilidade.',
    flowTitle: 'Fluxo Operacional Oficial de Estoque',
    flowSteps: [
      { step: '1. Entrada de Materiais', routine: 'MATA103 / MATA240', tables: 'SD1 / SD3', desc: 'Alimentação do saldo físico por armazém' },
      { step: '2. Movimentação Interna', routine: 'MATA240 (SD3)', tables: 'SD3', desc: 'Requisição para centros de custo e transferências' },
      { step: '3. Custo Médio Ponderado', routine: 'MATA330 (Custo)', tables: 'SB2', desc: 'Recálculo e valorização do Kardex' },
      { step: '4. Fechamento Mensal', routine: 'MATA280 (SB9)', tables: 'SB9', desc: 'Fotografia contábil dos saldos iniciais do mês' }
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
    icon: '💰',
    desc: 'O SIGAFIN administra a liquidez e a tesouraria corporativa. Realiza a gestão de Contas a Receber, Contas a Pagar, transferências entre bancos, conciliação bancária automática via arquivos CNAB (Cobrança e Pagamento Escritural) e projeções de fluxo de caixa.',
    flowTitle: 'Fluxo Operacional Oficial Financeiro',
    flowSteps: [
      { step: '1. Entrada de Títulos', routine: 'FINA040 / FINA050', tables: 'SE1 / SE2', desc: 'Títulos gerados por Compras ou Vendas' },
      { step: '2. Borderô Bancário', routine: 'FINA060 / FINA240', tables: 'SE1 / SEA', desc: 'Remessa de boletos e CNAB bancário' },
      { step: '3. Baixa de Títulos', routine: 'FINA070 / FINA080', tables: 'SE5', desc: 'Liquidação de recebimentos e pagamentos' },
      { step: '4. Conciliação Bancária', routine: 'FINA370', tables: 'SE8', desc: 'Confronto com extratos bancários' }
    ],
    tables: [
      { code: 'SE1', name: 'Contas a Receber', desc: 'Duplicatas, notas de débito e recebíveis de clientes.' },
      { code: 'SE2', name: 'Contas a Pagar', desc: 'Obrigações financeiras com fornecedores e tributos.' },
      { code: 'SE5', name: 'Movimentação Bancária', desc: 'Kardex financeiro: entradas e saídas de caixa/bancos.' },
      { code: 'SA6', name: 'Cadastro de Bancos e Agências', desc: 'Contas correntes e parâmetros de arquivos CNAB.' }
    ],
    snippet: `// Baixa Manual de Título no Contas a Receber (SE1)
Local aArea := GetArea()
DbSelectArea("SE1")
DbSetOrder(1) // E1_FILIAL + E1_PREFIXO + E1_NUM + E1_PARCELA + E1_TIPO

If DbSeek(xFilial("SE1") + "NF " + "000100" + "A" + "NF")
    RecLock("SE1", .F.)
        SE1->E1_STATUS := "B" // Baixado
        SE1->E1_BAIXA  := Date()
    SE1->(MsUnlock())
EndIf
RestArea(aArea)`
  },
  {
    id: 'sigactb',
    name: 'SIGACTB: Contabilidade Gerencial',
    code: '34',
    category: 'Módulo Contábil',
    routines: 'CTBA101 • CTBA102 • CTBA020',
    icon: '📑',
    desc: 'O SIGACTB consolida a vida patrimonial e de resultados da empresa. Através de Lançamentos Padronizados (CT5), todos os módulos operacionais (FAT, COM, EST, FIN) geram partidas dobradas automáticas em tempo real ou batch, alimentando o Razão, Balancete e DRE.',
    flowTitle: 'Fluxo Operacional Oficial Contábil',
    flowSteps: [
      { step: '1. Plano de Contas', routine: 'CTBA020 (CT1)', tables: 'CT1', desc: 'Estruturação contábil analítica e sintética' },
      { step: '2. Lançamento Padrão', routine: 'CTBA080 (CT5)', tables: 'CT5', desc: 'Regras de contabilização por evento do ERP' },
      { step: '3. Lançamento Contábil', routine: 'CTBA102 (CT2)', tables: 'CT2', desc: 'Partidas dobradas gravadas (Débito e Crédito)' },
      { step: '4. Fechamento e DRE', routine: 'CTBA210 / CTBA040', tables: 'CQD', desc: 'Geração de Balanço, Razão e ECD/ECF' }
    ],
    tables: [
      { code: 'CT1', name: 'Plano de Contas', desc: 'Contas contábeis patrimoniais e de resultado.' },
      { code: 'CT2', name: 'Lançamentos Contábeis', desc: 'Linhas de débito e crédito de cada movimentação.' },
      { code: 'CT5', name: 'Lançamentos Padronizados', desc: 'Fórmulas ADVPL para integração automática.' },
      { code: 'CTH', name: 'Centros de Custo', desc: 'Apropriação gerencial de receitas e despesas.' }
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
    icon: '⚖️',
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
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-7">
        
        {/* CABEÇALHO EDITORIAL COM IDENTIDADE DA ENGENHARIA */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Arquitetura de Negócio & Engenharia TOTVS</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Módulos Oficiais do Backoffice Protheus (Padrão TDN)
          </h1>

          <p className={`text-xs md:text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            Compreenda a lógica operacional, tabelas mestre e pontos de customização dos 6 pilares corporativos essenciais do ERP.
          </p>

          {/* FAIXA INTEGRADA DE MÉTRICAS (SEM 4 CARDS FLUTUANTES ISOLADOS) */}
          <div 
            className={`mt-4 rounded-xl border flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x overflow-hidden shadow-xs transition-colors ${
              isDark 
                ? 'bg-[#161b22]/70 border-[#30363d] divide-[#30363d]/60' 
                : 'bg-white border-slate-200 divide-slate-200'
            }`}
          >
            {/* Métrica 1 */}
            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Cobertura de Vagas
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  90% do Mercado
                </span>
              </div>
            </div>

            {/* Métrica 2 */}
            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Documentação
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  TOTVS TDN Oficial
                </span>
              </div>
            </div>

            {/* Métrica 3 */}
            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Módulos Abordados
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  FAT • COM • EST • FIN • CTB • FIS
                </span>
              </div>
            </div>

            {/* Métrica 4 */}
            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Nível de Rigor
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Consultoria Sênior
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLES DE ABAS DOS MÓDULOS (SUPERFÍCIE E ESTADO ATIVO DEFINIDOS) */}
        <div 
          className={`p-1.5 rounded-xl border flex items-center gap-1.5 overflow-x-auto shadow-xs transition-colors ${
            isDark ? 'bg-[#161b22]/50 border-[#30363d]' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {MODULOS_LIST.map((mod) => {
            const isSelected = mod.id === selectedId;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  soundFx.playTick();
                  setSelectedId(mod.id);
                }}
                className={`py-2 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? isDark
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-xs font-bold'
                      : 'bg-white text-cyan-800 border border-cyan-300 shadow-xs font-bold'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                }`}
              >
                <span className="text-sm">{mod.icon}</span>
                <span>{mod.name.split(':')[0]}</span>
                <span className={`text-[10px] px-1 rounded font-mono ${
                  isSelected 
                    ? isDark ? 'bg-cyan-900/40 text-cyan-200' : 'bg-cyan-50 text-cyan-800'
                    : isDark ? 'bg-gray-800 text-gray-400' : 'bg-slate-200 text-slate-600'
                }`}>
                  {mod.code}
                </span>
              </button>
            );
          })}
        </div>

        {/* CONTAINER MACRO PRINCIPAL DO MÓDULO SELECIONADO (NÍVEL 1) */}
        <div 
          className={`rounded-2xl border p-6 space-y-7 shadow-xs transition-colors ${
            isDark ? 'bg-[#161b22]/40 border-[#30363d]' : 'bg-white border-slate-200'
          }`}
        >
          {/* Cabeçalho do Módulo + Ação de Carregar no Editor */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-5 border-gray-800/30">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                  isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                }`}>
                  {selectedModulo.category}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  Rotinas Principais: <strong className="font-mono text-cyan-400">{selectedModulo.routines}</strong>
                </span>
              </div>

              <h2 className="text-xl font-bold flex items-center gap-2">
                <span>{selectedModulo.icon}</span>
                <span>{selectedModulo.name}</span>
              </h2>

              <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                {selectedModulo.desc}
              </p>
            </div>

            <button
              onClick={() => handleLoadInEditor(selectedModulo.snippet)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <span>Abrir Fonte no Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* FLUXO OPERACIONAL: STEPPER HORIZONTAL ENTERPRISE */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Workflow className="w-4 h-4" />
              <span>{selectedModulo.flowTitle}</span>
            </div>

            {/* Stepper Responsivo Conectado */}
            <div className="flex flex-col md:flex-row items-stretch gap-2.5">
              {selectedModulo.flowSteps.map((fs, idx) => (
                <React.Fragment key={idx}>
                  {/* Etapa do Stepper (Superfície Leve) */}
                  <div 
                    className={`flex-1 rounded-xl p-4 flex flex-col justify-between border transition-all ${
                      isDark 
                        ? 'bg-[#0d1117]/60 border-gray-800 hover:border-cyan-500/30' 
                        : 'bg-slate-50 border-slate-200 hover:border-cyan-300'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {fs.step.replace(/^\d+\.\s*/, '')}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono font-semibold text-amber-400 pt-0.5">
                        {fs.routine}
                      </div>

                      <p className={`text-[11px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        {fs.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-800/30 text-[10px] flex items-center justify-between">
                      <span className="text-gray-400 font-medium">Tabelas:</span>
                      <span className="font-mono text-cyan-300 font-semibold">{fs.tables}</span>
                    </div>
                  </div>

                  {/* Seta Conectora de Fluxo (Desktop) */}
                  {idx < selectedModulo.flowSteps.length - 1 && (
                    <div className="hidden md:flex items-center justify-center text-cyan-400/50 px-0.5">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* TABELAS MESTRE DO MÓDULO (APRESENTAÇÃO TABULAR CORPORATIVA) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              <Table className="w-4 h-4 text-cyan-400" />
              <span>Tabelas Mestre do Dicionário ({selectedModulo.name.split(':')[0]})</span>
            </div>

            <div className={`border rounded-xl overflow-hidden shadow-xs ${isDark ? 'border-gray-800' : 'border-slate-200'}`}>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={`border-b ${isDark ? 'bg-[#0d1117] border-gray-800 text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                    <th className="py-2.5 px-4 font-bold text-[10px] uppercase tracking-wider w-24">Tabela</th>
                    <th className="py-2.5 px-4 font-bold text-[10px] uppercase tracking-wider">Nome da Entidade</th>
                    <th className="py-2.5 px-4 font-bold text-[10px] uppercase tracking-wider">Papel no Negócio</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-800/60 bg-[#161b22]/30' : 'divide-slate-100 bg-white'}`}>
                  {selectedModulo.tables.map((tbl, i) => (
                    <tr key={i} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                      <td className="py-3 px-4 font-mono font-bold text-cyan-400">
                        <span className={`px-2 py-0.5 rounded text-[11px] border ${
                          isDark ? 'bg-cyan-950/40 border-cyan-800/30' : 'bg-cyan-50 border-cyan-200 text-cyan-800'
                        }`}>
                          {tbl.code}
                        </span>
                      </td>
                      <td className={`py-3 px-4 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {tbl.name}
                      </td>
                      <td className={`py-3 px-4 text-[11px] leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        {tbl.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CÓDIGO FONTE OFICIAL (CONTAINER FOCADO COM AÇÃO) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Ponto de Entrada e Código Corporativo Oficial:
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold">ADVPL Padrão TDN</span>
            </div>

            <pre 
              className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed shadow-xs ${
                isDark 
                  ? 'bg-[#090d16] border-gray-800 text-cyan-200' 
                  : 'bg-slate-100 border-slate-200 text-slate-800'
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

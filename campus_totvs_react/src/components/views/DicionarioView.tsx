import React, { useState } from 'react';
import { TOTVS_DICTIONARY_DB, type ISXTableDetail } from '../../data/dictionary';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { 
  MagnifyingGlass, 
  Database, 
  CheckCircle,
  ArrowRight,
  ShieldWarning,
  Lightbulb,
  Cpu,
  Stack,
  TreeStructure,
  Copy,
  Check,
  HardDrives
} from '@phosphor-icons/react';

type DictTab = 'sx1' | 'sx2' | 'sx3' | 'sx6' | 'six' | 'explorer';

export const DicionarioView: React.FC = () => {
  const { theme, setUserCode, setActiveTab, activeLessonId } = useCampusStore();
  const isDark = theme === 'dark';

  const [activeSubtab, setActiveSubtab] = useState<DictTab>('sx1');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTableKey, setSelectedTableKey] = useState<string>('SA1');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const tableKeys = Object.keys(TOTVS_DICTIONARY_DB);

  // Filtro inteligente de busca no explorador virtual
  const filteredKeys = tableKeys.filter((key) => {
    const tbl = TOTVS_DICTIONARY_DB[key];
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      key.toLowerCase().includes(term) ||
      tbl.name.toLowerCase().includes(term) ||
      tbl.description.toLowerCase().includes(term) ||
      tbl.module.toLowerCase().includes(term) ||
      tbl.fields.some((f) => f.field.toLowerCase().includes(term) || f.desc.toLowerCase().includes(term))
    );
  });

  const selectedTable: ISXTableDetail = TOTVS_DICTIONARY_DB[selectedTableKey] || TOTVS_DICTIONARY_DB['SA1'];

  const handleLoadInEditor = (snippet: string) => {
    soundFx.playSuccess();
    setUserCode(activeLessonId, snippet);
    setActiveTab('lab');
  };

  const handleCopyCode = (snippet: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(snippet);
      setCopiedSnippet(id);
      soundFx.playSuccess();
      setTimeout(() => setCopiedSnippet(null), 2000);
    }
  };

  return (
    <div 
      className={`flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto transition-colors duration-200 ${
        isDark ? 'bg-[#0d1117] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-7">
        
        {/* CABEÇALHO COM IDENTIDADE ARQUITETURAL */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Database size={18} weight="duotone" />
            <span>O Motor do Protheus • Dicionário SX</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Dicionário de Dados do Protheus: O Coração da Arquitetura TOTVS
          </h1>

          <p className={`text-xs md:text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            Diferente de sistemas comuns onde o banco de dados define as regras, no Protheus o <strong>Dicionário de Dados</strong> governa tabelas, campos, máscaras, validações de tela, índices e parâmetros do ERP.
          </p>

          {/* FAIXA INTEGRADA DE MÉTRICAS DO DICIONÁRIO (SEM CARDS FLUTUANTES) */}
          <div 
            className={`mt-4 rounded-xl border flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x overflow-hidden shadow-xs transition-colors ${
              isDark 
                ? 'bg-[#161b22]/70 border-[#30363d] divide-[#30363d]/60' 
                : 'bg-white border-slate-200 divide-slate-200'
            }`}
          >
            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                <HardDrives size={18} weight="duotone" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Abstração de Banco
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  DBAccess / TopConnect
                </span>
              </div>
            </div>

            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <ShieldWarning size={18} weight="duotone" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Governança
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  100% via Dicionário
                </span>
              </div>
            </div>

            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Stack size={18} weight="duotone" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Tabelas Mestres
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  SX1 • SX2 • SX3 • SX6
                </span>
              </div>
            </div>

            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Cpu size={18} weight="duotone" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Execução do ERP
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  RPO + Dicionário
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLES DE ABAS TÁTEIS (SUPERFÍCIE E ESTADO ATIVO) */}
        <div 
          className={`p-1.5 rounded-xl border flex items-center gap-1.5 overflow-x-auto shadow-xs transition-colors ${
            isDark ? 'bg-[#161b22]/50 border-[#30363d]' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {[
            { id: 'sx1', label: 'SX1 (Perguntas & F12)', code: 'SX1' },
            { id: 'sx2', label: 'SX2 (Tabelas do ERP)', code: 'SX2' },
            { id: 'sx3', label: 'SX3 (Campos & Validações)', code: 'SX3' },
            { id: 'sx6', label: 'SX6 (Parâmetros Globais)', code: 'SX6' },
            { id: 'six', label: 'SIX (Índices & Busca)', code: 'SIX' },
            { id: 'explorer', label: 'Configurador Virtual', code: 'SX3 Explorer', hasSearchIcon: true }
          ].map((tab) => {
            const isSelected = activeSubtab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playTick();
                  setActiveSubtab(tab.id as DictTab);
                }}
                className={`py-2 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? isDark
                      ? tab.id === 'explorer' 
                        ? 'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/40 shadow-xs font-bold'
                        : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-xs font-bold'
                      : tab.id === 'explorer'
                        ? 'bg-white text-fuchsia-700 border-fuchsia-300 shadow-xs font-bold'
                        : 'bg-white text-cyan-800 border-cyan-300 shadow-xs font-bold'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                }`}
              >
                {tab.hasSearchIcon && <MagnifyingGlass size={15} weight="duotone" className="shrink-0" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CONTAINER MACRO DE CONTEÚDO (NÍVEL 1) */}
        <div 
          className={`rounded-2xl border p-6 space-y-6 shadow-xs transition-colors ${
            isDark ? 'bg-[#161b22]/40 border-[#30363d]' : 'bg-white border-slate-200'
          }`}
        >
          {/* ========================================================= */}
          {/* SX1: GRUPOS DE PERGUNTAS                                  */}
          {/* ========================================================= */}
          {activeSubtab === 'sx1' && (
            <div className="space-y-6">
              {/* Categoria 1: Informação Técnica */}
              <div className="space-y-2 border-b pb-5 border-gray-800/30">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                }`}>
                  Interface & Parâmetros • SX1 • MV_PAR
                </span>
                <h2 className="text-xl font-bold">
                  SX1: Grupos de Perguntas (A Tecla F12 das Telas)
                </h2>
                <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  O <strong>SX1</strong> armazena os parâmetros de filtro que o usuário preenche antes de rodar relatórios ou rotinas de processamento. Quando o usuário clica em <em>Outras Ações -&gt; Parâmetros</em> (ou pressiona <strong>F12</strong>), o Protheus lê a tabela SX1 e desenha a tela de perguntas dinamicamente.
                </p>
              </div>

              {/* Categoria 2: Dica do Especialista */}
              <div className={`p-4 rounded-xl border-l-4 border-cyan-500 border transition-all ${
                isDark ? 'bg-cyan-950/15 border-gray-800/60 text-cyan-100' : 'bg-cyan-50/60 border-slate-200 text-cyan-950'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                  <Lightbulb size={18} weight="duotone" />
                  <span>Leitura de Variáveis no Código ADVPL</span>
                </div>
                <p className={`text-xs leading-relaxed mt-1.5 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  O sistema instancia variáveis públicas automáticas chamadas <code className="text-amber-400 font-mono font-semibold">MV_PAR01</code>, <code className="text-amber-400 font-mono font-semibold">MV_PAR02</code>, etc., seguindo rigorosamente a ordem das perguntas cadastradas no grupo.
                </p>
              </div>

              {/* Categoria 3: Dica Técnica Adicional */}
              <div className={`p-4 rounded-xl border-l-4 border-blue-500 border transition-all ${
                isDark ? 'bg-blue-950/15 border-gray-800/60 text-blue-100' : 'bg-blue-50/60 border-slate-200 text-blue-950'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                  <Cpu size={18} weight="duotone" />
                  <span>Função Nativa de Carregamento</span>
                </div>
                <p className={`text-xs leading-relaxed mt-1.5 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  Utiliza-se a função oficial <code className="text-cyan-400 font-mono font-semibold">Pergunte("NOME_GRUPO", .T.)</code> para forçar a abertura da janela modal de parâmetros antes da execução do relatório ou processo.
                </p>
              </div>

              {/* Categoria 4: Exemplo de Código com Cópia e Execução */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-400">Exemplo Oficial ADVPL (Leitura de Perguntas):</span>
                  <button
                    onClick={() => handleCopyCode(`// Exemplo de uso de SX1 corporativo:\nIf Pergunte("MTA410", .T.)\n    cClienteDe  := MV_PAR01\n    cClienteAte := MV_PAR02\n    dDataDe     := MV_PAR03\nEndIf`, 'sx1')}
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSnippet === 'sx1' ? <Check size={14} weight="bold" className="text-emerald-400" /> : <Copy size={14} weight="bold" />}
                    <span>{copiedSnippet === 'sx1' ? 'Copiado!' : 'Copiar Exemplo'}</span>
                  </button>
                </div>

                <pre 
                  className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed shadow-xs ${
                    isDark ? 'bg-[#090d16] border-gray-800 text-cyan-200' : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
{`// Exemplo de uso de SX1 corporativo:
If Pergunte("MTA410", .T.) // .T. abre a janela para o operador preencher
    cClienteDe  := MV_PAR01 // Pergunta 01: Do Cliente?
    cClienteAte := MV_PAR02 // Pergunta 02: Até o Cliente?
    dDataDe     := MV_PAR03 // Pergunta 03: Da Data de Emissão?
EndIf`}
                </pre>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SX2: CATÁLOGO GERAL DE TABELAS                            */}
          {/* ========================================================= */}
          {activeSubtab === 'sx2' && (
            <div className="space-y-6">
              {/* Informação Técnica */}
              <div className="space-y-2 border-b pb-5 border-gray-800/30">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                }`}>
                  Catálogo de Tabelas • SX2 • X2_ARQUIVO
                </span>
                <h2 className="text-xl font-bold">
                  SX2: O Catálogo Geral de Arquivos e Tabelas do ERP
                </h2>
                <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  O <strong>SX2</strong> cadastra todas as tabelas do Protheus (ex: SA1, SB1, SC5). Define o modo de compartilhamento da tabela (exclusiva por filial ou compartilhada entre empresas), o caminho no DBAccess e o nome físico do arquivo no banco de dados.
                </p>
              </div>

              {/* Alerta de Governança e Regra Mandatória */}
              <div className={`p-4 rounded-xl border-l-4 border-amber-500 border transition-all ${
                isDark ? 'bg-amber-950/20 border-gray-800/60 text-amber-100' : 'bg-amber-50/70 border-slate-200 text-amber-950'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <ShieldWarning size={18} weight="duotone" />
                  <span>Regra de Ouro Oficial TOTVS: RetSqlName</span>
                </div>
                <p className={`text-xs leading-relaxed mt-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  <strong>NUNCA</strong> escreva o nome físico fixo de uma tabela no SQL (ex: <code>SA1010</code>). Utilize sempre a função nativa <code className="text-cyan-400 font-mono font-bold">RetSqlName("SA1")</code>, pois ela consulta o SX2 e resolve o nome real no banco conforme a empresa ativa e o modo de compartilhamento.
                </p>
              </div>

              {/* Exemplo de Código */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-400">Montagem Segura e Portável de Query via SX2:</span>
                  <button
                    onClick={() => handleCopyCode(`Local cQuery := " SELECT A1_COD, A1_NOME FROM " + RetSqlName("SA1") + " SA1 "\ncQuery += " WHERE SA1.D_E_L_E_T_ = ' ' AND SA1.A1_FILIAL = '" + xFilial("SA1") + "' "\nTCQuery ChangeQuery(cQuery) New Alias "QRY_CLI"`, 'sx2')}
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSnippet === 'sx2' ? <Check size={14} weight="bold" className="text-emerald-400" /> : <Copy size={14} weight="bold" />}
                    <span>{copiedSnippet === 'sx2' ? 'Copiado!' : 'Copiar Query'}</span>
                  </button>
                </div>

                <pre 
                  className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed shadow-xs ${
                    isDark ? 'bg-[#090d16] border-gray-800 text-cyan-200' : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
{`// Montagem segura e portável de Query SQL via SX2:
Local cQuery := " SELECT A1_COD, A1_NOME FROM " + RetSqlName("SA1") + " SA1 "
cQuery += " WHERE SA1.D_E_L_E_T_ = ' ' AND SA1.A1_FILIAL = '" + xFilial("SA1") + "' "
TCQuery ChangeQuery(cQuery) New Alias "QRY_CLI"`}
                </pre>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SX3: DICIONÁRIO DE CAMPOS E VALIDAÇÕES                    */}
          {/* ========================================================= */}
          {activeSubtab === 'sx3' && (
            <div className="space-y-6">
              {/* Informação Técnica */}
              <div className="space-y-2 border-b pb-5 border-gray-800/30">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                }`}>
                  Metadados de Campos • SX3 • Validações
                </span>
                <h2 className="text-xl font-bold">
                  SX3: Dicionário de Campos, Máscaras e Validações de Tela
                </h2>
                <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  O <strong>SX3</strong> é a tabela mais detalhada do ERP. Cada linha representa um campo (ex: A1_NOME, B1_COD). Dita o tipo de dado (C, N, D, M), tamanho, decimais, máscara de tela (Picture), texto de Help e validações automáticas.
                </p>
              </div>

              {/* Relacionamento e Atributos Chave do SX3 */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <TreeStructure size={18} weight="duotone" className="text-cyan-400" />
                  <span>Trindade de Validação e Inicialização no SX3:</span>
                </div>

                <div className={`border rounded-xl divide-y overflow-hidden shadow-xs ${
                  isDark ? 'border-gray-800 divide-gray-800/60 bg-[#0d1117]/40' : 'border-slate-200 divide-slate-100 bg-slate-50'
                }`}>
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="px-2.5 py-1 rounded font-mono font-bold text-xs bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 shrink-0 w-32 text-center">
                      X3_VALID
                    </span>
                    <div>
                      <span className={`font-semibold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>Validação Padrão TOTVS</span>
                      <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        Executada ao sair do campo na interface gráfica. Exemplos nativos: <code>ExistCpo("SA1")</code>, <code>Positivo()</code>, <code>NaoVazio()</code>.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="px-2.5 py-1 rounded font-mono font-bold text-xs bg-amber-950/60 text-amber-400 border border-amber-800/40 shrink-0 w-32 text-center">
                      X3_VLDUSER
                    </span>
                    <div>
                      <span className={`font-semibold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>Validação de Usuário (Customizações)</span>
                      <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        Ponto onde o desenvolvedor insere chamadas para rotinas customizadas: <code>U_ValidaCNPJ()</code> ou regras corporativas de alçada.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="px-2.5 py-1 rounded font-mono font-bold text-xs bg-purple-950/60 text-purple-400 border border-purple-800/40 shrink-0 w-32 text-center">
                      X3_RELACAO
                    </span>
                    <div>
                      <span className={`font-semibold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>Inicializador Padrão (Default Value)</span>
                      <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        Fórmula ADVPL avaliada na inclusão do registro (ex: <code>dDataBase</code> para data atual, <code>"01"</code> para armazém padrão).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SX6: PARÂMETROS GLOBAIS                                   */}
          {/* ========================================================= */}
          {activeSubtab === 'sx6' && (
            <div className="space-y-6">
              {/* Informação Técnica */}
              <div className="space-y-2 border-b pb-5 border-gray-800/30">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                }`}>
                  Configurações Globais • SX6 • GetMV
                </span>
                <h2 className="text-xl font-bold">
                  SX6: Tabela de Parâmetros Globais do Sistema (MV_*)
                </h2>
                <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  O <strong>SX6</strong> armazena parâmetros globais prefixados por <code className="text-amber-400 font-mono font-bold">MV_</code>. Permite ligar ou desligar recursos em tempo de execução por empresa e filial, sem recompilar o RPO.
                </p>
              </div>

              {/* Dica de Boas Práticas */}
              <div className={`p-4 rounded-xl border-l-4 border-emerald-500 border transition-all ${
                isDark ? 'bg-emerald-950/15 border-gray-800/60 text-emerald-100' : 'bg-emerald-50/60 border-slate-200 text-emerald-950'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle size={18} weight="fill" />
                  <span>Sintaxe Recomendada: GetMV com Fallback</span>
                </div>
                <p className={`text-xs leading-relaxed mt-1.5 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  Sempre passe o terceiro parâmetro de <em>fallback</em> no <code>GetMV("MV_NOME", .F., xValorPadrao)</code> para evitar parada emergencial do sistema caso o parâmetro não esteja cadastrado na filial.
                </p>
              </div>

              {/* Exemplo de Código */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-400">Leitura Segura de Parâmetros no SX6:</span>
                  <button
                    onClick={() => handleCopyCode(`Local lPermiteEstoqueNegativo := GetMV("MV_ESTNEG", .F., .F.)\nLocal nLimiteCreditoPadrao    := GetMV("MV_LIMCRED", .F., 10000.00)\n\nIf !lPermiteEstoqueNegativo .And. nSaldo < nQtdVenda\n    ApMsgAlert("Parâmetro MV_ESTNEG não autoriza estoque negativo!", "Regra SX6")\nEndIf`, 'sx6')}
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSnippet === 'sx6' ? <Check size={14} weight="bold" className="text-emerald-400" /> : <Copy size={14} weight="bold" />}
                    <span>{copiedSnippet === 'sx6' ? 'Copiado!' : 'Copiar Código'}</span>
                  </button>
                </div>

                <pre 
                  className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed shadow-xs ${
                    isDark ? 'bg-[#090d16] border-gray-800 text-cyan-200' : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
{`// Leitura segura de parâmetros no SX6:
Local lPermiteEstoqueNegativo := GetMV("MV_ESTNEG", .F., .F.)
Local nLimiteCreditoPadrao    := GetMV("MV_LIMCRED", .F., 10000.00)

If !lPermiteEstoqueNegativo .And. nSaldo < nQtdVenda
    ApMsgAlert("Parâmetro MV_ESTNEG não autoriza estoque negativo!", "Regra SX6")
EndIf`}
                </pre>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SIX: ÍNDICES E PERFORMANCE                                */}
          {/* ========================================================= */}
          {activeSubtab === 'six' && (
            <div className="space-y-6">
              {/* Informação Técnica */}
              <div className="space-y-2 border-b pb-5 border-gray-800/30">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                }`}>
                  Performance & Índices • SIX • DbSetOrder
                </span>
                <h2 className="text-xl font-bold">
                  SIX: Dicionário de Índices e Chaves de Busca Rápida
                </h2>
                <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  O <strong>SIX</strong> cataloga os índices criados no banco de dados para cada tabela do ERP. Orienta o comando <code className="text-cyan-400 font-mono">DbSetOrder(n)</code> e permite que funções como <code className="text-cyan-400 font-mono">DbSeek()</code> localizem registros em milissegundos.
                </p>
              </div>

              {/* Alerta de Chave de Filial */}
              <div className={`p-4 rounded-xl border-l-4 border-cyan-500 border transition-all ${
                isDark ? 'bg-cyan-950/15 border-gray-800/60 text-cyan-100' : 'bg-cyan-50/60 border-slate-200 text-cyan-950'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                  <ShieldWarning size={18} weight="duotone" />
                  <span>Respeitar Obrigatoriamente a Chave de Filial (xFilial)</span>
                </div>
                <p className={`text-xs leading-relaxed mt-1.5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  Quase todos os índices iniciam com o campo de filial da tabela (<code className="text-amber-400 font-mono font-bold">xFilial("TABELA")</code>). Esquecer de concatenar a filial antes do código faz a busca falhar ou posicionar indevidamente no registro de outra filial.
                </p>
              </div>

              {/* Exemplo de Código */}
              <div className="space-y-2 pt-2">
                <pre 
                  className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed shadow-xs ${
                    isDark ? 'bg-[#090d16] border-gray-800 text-cyan-200' : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
{`// Busca otimizada usando a ordem 1 cadastrada no SIX:
DbSelectArea("SA1")
DbSetOrder(1) // A1_FILIAL + A1_COD + A1_LOJA

If DbSeek(xFilial("SA1") + "CLI001" + "01")
    ApMsgInfo("Cliente posicionado: " + SA1->A1_NOME, "Busca SIX")
EndIf`}
                </pre>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* CATEGORIA: CONSULTA & RESULTADO (CONFIGURADOR VIRTUAL)   */}
          {/* ========================================================= */}
          {activeSubtab === 'explorer' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Painel Esquerdo: Busca e Lista de Tabelas */}
              <div className="lg:col-span-4 space-y-3">
                <div className="relative">
                  <MagnifyingGlass size={15} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar tabela ou campo..."
                    className={`w-full pl-8 pr-3 py-2.5 rounded-xl text-xs focus:outline-none focus:border-cyan-500 border transition-all ${
                      isDark ? 'bg-[#090d16] border-gray-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1 max-h-[520px] overflow-y-auto pr-1">
                  {filteredKeys.map((key) => {
                    const tbl = TOTVS_DICTIONARY_DB[key];
                    const isSelected = key === selectedTableKey;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          soundFx.playTick();
                          setSelectedTableKey(key);
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer text-xs border ${
                          isSelected
                            ? isDark 
                              ? 'bg-cyan-500/10 border-cyan-500/40 text-white font-bold shadow-xs' 
                              : 'bg-white border-cyan-300 text-slate-900 font-bold shadow-xs'
                            : isDark 
                              ? 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5' 
                              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-cyan-400 text-xs">{key}</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                              isDark ? 'bg-gray-800 text-gray-300' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {tbl.module}
                            </span>
                          </div>
                          <div className="truncate text-[11px] text-gray-400 mt-0.5 font-normal">{tbl.name}</div>
                        </div>
                        {isSelected && <CheckCircle size={15} weight="fill" className="text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Painel Direito: Resultado e Tabela Estruturada dos Campos SX3 */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-gray-800/30">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-mono font-extrabold text-cyan-400">{selectedTableKey}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold font-mono ${isDark ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'}`}>
                        {selectedTable.module}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-200 mt-0.5">{selectedTable.name}</h3>
                  </div>

                  <button
                    onClick={() => handleLoadInEditor(`Local cQuery := " SELECT * FROM " + RetSqlName("${selectedTableKey}") + " "\nTCQuery ChangeQuery(cQuery) New Alias "QRY_${selectedTableKey}"`)}
                    className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Usar em Query</span>
                    <ArrowRight size={14} weight="bold" />
                  </button>
                </div>

                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  {selectedTable.description}
                </p>

                {/* Tabela Tabular dos Campos SX3 */}
                <div className={`border rounded-xl overflow-hidden shadow-xs ${isDark ? 'border-gray-800' : 'border-slate-200'}`}>
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className={`border-b text-[10px] font-bold uppercase tracking-wider ${isDark ? 'border-gray-800 text-gray-400 bg-[#0d1117]' : 'border-slate-200 text-slate-500 bg-slate-50'}`}>
                        <th className="py-2.5 px-3">Campo</th>
                        <th className="py-2.5 px-3">Tipo</th>
                        <th className="py-2.5 px-3">Tamanho</th>
                        <th className="py-2.5 px-3">Descrição TDN</th>
                        <th className="py-2.5 px-3">Máscara (Picture)</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-gray-800/60 bg-[#161b22]/30' : 'divide-slate-100 bg-white'}`}>
                      {selectedTable.fields.map((f, i) => (
                        <tr key={i} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                          <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">
                            {f.field}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-[11px]">{f.type}</td>
                          <td className="py-2.5 px-3 font-mono text-[11px]">{f.size}</td>
                          <td className={`py-2.5 px-3 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{f.desc}</td>
                          <td className={`py-2.5 px-3 font-mono text-[10px] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                            {f.picture || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

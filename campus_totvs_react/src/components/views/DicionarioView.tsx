import React, { useState } from 'react';
import { TOTVS_DICTIONARY_DB, type ISXTableDetail } from '../../data/dictionary';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { 
  Search, 
  Database, 
  CheckCircle2, 
  Terminal, 
  Code,
  ArrowRight
} from 'lucide-react';

type DictTab = 'sx1' | 'sx2' | 'sx3' | 'sx6' | 'six' | 'explorer';

export const DicionarioView: React.FC = () => {
  const { theme, setUserCode, setActiveTab, activeLessonId } = useCampusStore();
  const isDark = theme === 'dark';

  const [activeSubtab, setActiveSubtab] = useState<DictTab>('sx1');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTableKey, setSelectedTableKey] = useState<string>('SA1');

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

  return (
    <div 
      className={`flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto transition-colors duration-200 ${
        isDark ? 'bg-[#0d1117] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* CABEÇALHO EDITORIAL DO DICIONÁRIO (SEM CARDS ISOLADOS) */}
        <div className="space-y-3 border-b pb-6 border-gray-800/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>O Motor do Protheus • Dicionário SX</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Dicionário de Dados do Protheus: O Coração da Arquitetura TOTVS
          </h1>

          <p className={`text-xs md:text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            Diferente de sistemas comuns onde o banco de dados define as regras, no Protheus o <strong>Dicionário de Dados</strong> governa tabelas, campos, máscaras, validações de tela, índices e parâmetros do ERP.
          </p>

          {/* Faixa Integrada de Métricas (Inline Stats) */}
          <div className={`flex flex-wrap items-center gap-6 pt-2 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Abstração de Banco: <strong className={isDark ? 'text-white' : 'text-slate-900'}>DBAccess / TopConnect</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>Integridade: <strong className={isDark ? 'text-white' : 'text-slate-900'}>100% via Dicionário</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span>Principais Tabelas: <strong className={isDark ? 'text-white' : 'text-slate-900'}>SX1 • SX2 • SX3 • SX6</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Execução: <strong className={isDark ? 'text-white' : 'text-slate-900'}>RPO + Dicionário</strong></span>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS LINEARES */}
        <div className="flex items-center gap-1 border-b border-gray-800/30 overflow-x-auto pb-0.5">
          <button
            onClick={() => { soundFx.playTick(); setActiveSubtab('sx1'); }}
            className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeSubtab === 'sx1' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>SX1 (Perguntas & F12)</span>
          </button>

          <button
            onClick={() => { soundFx.playTick(); setActiveSubtab('sx2'); }}
            className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeSubtab === 'sx2' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>SX2 (Tabelas do ERP)</span>
          </button>

          <button
            onClick={() => { soundFx.playTick(); setActiveSubtab('sx3'); }}
            className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeSubtab === 'sx3' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>SX3 (Campos & Validações)</span>
          </button>

          <button
            onClick={() => { soundFx.playTick(); setActiveSubtab('sx6'); }}
            className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeSubtab === 'sx6' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>SX6 (Parâmetros Globais)</span>
          </button>

          <button
            onClick={() => { soundFx.playTick(); setActiveSubtab('six'); }}
            className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeSubtab === 'six' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>SIX (Índices & Performance)</span>
          </button>

          <button
            onClick={() => { soundFx.playTick(); setActiveSubtab('explorer'); }}
            className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeSubtab === 'explorer' ? 'border-fuchsia-400 text-fuchsia-400 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>🔎 Configurador Virtual (Explorador SX)</span>
          </button>
        </div>

        {/* CONTEÚDO EDITORIAL DAS SEÇÕES TÉCNICAS (SEM CAIXAS DENTRO DE CAIXAS) */}

        {/* SX1 */}
        {activeSubtab === 'sx1' && (
          <div className="space-y-6">
            <div className="space-y-2">
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

            {/* Definições Técnicas em Callouts Limpos */}
            <div className="space-y-3">
              <div className="border-l-2 border-cyan-500 pl-4 py-1">
                <h4 className="text-xs font-bold text-cyan-400">Leitura de Variáveis no Código ADVPL</h4>
                <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  O sistema instancia variáveis públicas automáticas chamadas <code className="text-amber-400 font-mono">MV_PAR01</code>, <code className="text-amber-400 font-mono">MV_PAR02</code>, etc., seguindo rigorosamente a ordem das perguntas cadastradas.
                </p>
              </div>

              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <h4 className="text-xs font-bold text-blue-400">Função de Carregamento</h4>
                <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  Utiliza-se a função nativa <code className="text-cyan-400 font-mono">Pergunte("NOME_GRUPO", .T.)</code> para forçar a abertura da janela modal antes da execução.
                </p>
              </div>
            </div>

            {/* Código Fonte (Container Focado) */}
            <pre 
              className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed ${
                isDark 
                  ? 'bg-[#090d16] border-[#30363d] text-cyan-200' 
                  : 'bg-[#f1f5f9] border-[#cbd5e1] text-slate-800'
              }`}
            >
{`// Exemplo de uso de SX1 corporativo:
If Pergunte("MTA410", .T.) // .T. abre a janela para o operador preencher
    cClienteDe := MV_PAR01 // Pergunta 01: Do Cliente?
    cClienteAte := MV_PAR02 // Pergunta 02: Até o Cliente?
    dDataDe    := MV_PAR03 // Pergunta 03: Da Data de Emissão?
EndIf`}
            </pre>
          </div>
        )}

        {/* SX2 */}
        {activeSubtab === 'sx2' && (
          <div className="space-y-6">
            <div className="space-y-2">
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

            <div className="border-l-2 border-amber-500 pl-4 py-1">
              <h4 className="text-xs font-bold text-amber-400">Regra de Ouro Oficial TOTVS: RetSqlName</h4>
              <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                NUNCA escreva o nome físico fixo de uma tabela no SQL (ex: SA1010). Utilize sempre a função nativa <code className="text-cyan-400 font-mono">RetSqlName("SA1")</code>, pois ela consulta o SX2 e resolve o nome real no banco conforme a empresa ativa e o modo de compartilhamento.
              </p>
            </div>

            <pre 
              className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed ${
                isDark 
                  ? 'bg-[#090d16] border-[#30363d] text-cyan-200' 
                  : 'bg-[#f1f5f9] border-[#cbd5e1] text-slate-800'
              }`}
            >
{`// Montagem segura e portável de Query SQL via SX2:
Local cQuery := " SELECT A1_COD, A1_NOME FROM " + RetSqlName("SA1") + " SA1 "
cQuery += " WHERE SA1.D_E_L_E_T_ = ' ' AND SA1.A1_FILIAL = '" + xFilial("SA1") + "' "
TCQuery ChangeQuery(cQuery) New Alias "QRY_CLI"`}
            </pre>
          </div>
        )}

        {/* SX3 */}
        {activeSubtab === 'sx3' && (
          <div className="space-y-6">
            <div className="space-y-2">
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

            <div className={`divide-y border rounded-xl overflow-hidden ${isDark ? 'border-gray-800/60 divide-gray-800/40 bg-[#161b22]/40' : 'border-slate-200 divide-slate-100 bg-white'}`}>
              <div className="p-3.5 flex items-start gap-4">
                <span className="font-mono text-cyan-400 font-bold text-xs shrink-0 w-28">X3_VALID</span>
                <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Validação padrão da TOTVS (ex: ExistCpo("SA1"), Positivo(), NaoVazio()).</span>
              </div>
              <div className="p-3.5 flex items-start gap-4">
                <span className="font-mono text-amber-400 font-bold text-xs shrink-0 w-28">X3_VLDUSER</span>
                <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Validação customizada do cliente (onde o desenvolvedor insere U_MinhaFuncao()).</span>
              </div>
              <div className="p-3.5 flex items-start gap-4">
                <span className="font-mono text-purple-400 font-bold text-xs shrink-0 w-28">X3_RELACAO</span>
                <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Inicializador padrão do campo ao abrir a tela de inclusão de registros.</span>
              </div>
            </div>
          </div>
        )}

        {/* SX6 */}
        {activeSubtab === 'sx6' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
              }`}>
                Configurações Globais • SX6 • GetMV
              </span>
              <h2 className="text-xl font-bold">
                SX6: Tabela de Parâmetros Globais do Sistema (MV_*)
              </h2>
              <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                O <strong>SX6</strong> armazena parâmetros globais prefixados por <code className="text-amber-400 font-mono">MV_</code>. Permite ligar ou desligar recursos em tempo de execução sem recompilar o RPO.
              </p>
            </div>

            <pre 
              className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed ${
                isDark 
                  ? 'bg-[#090d16] border-[#30363d] text-cyan-200' 
                  : 'bg-[#f1f5f9] border-[#cbd5e1] text-slate-800'
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
        )}

        {/* SIX */}
        {activeSubtab === 'six' && (
          <div className="space-y-6">
            <div className="space-y-2">
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

            <div className="border-l-2 border-cyan-500 pl-4 py-1">
              <h4 className="text-xs font-bold text-cyan-400">Respeitar a Chave de Filial (xFilial)</h4>
              <p className={`text-xs leading-relaxed mt-0.5 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                Quase todos os índices iniciam com o campo de filial da tabela (<code className="text-amber-400 font-mono">xFilial("TABELA")</code>). Esquecer de concatenar a filial antes do código faz o ponteiro falhar ou posicionar no registro de outra filial.
              </p>
            </div>
          </div>
        )}

        {/* EXPLORADOR SX VIRTUAL (CONFIGURADOR) */}
        {activeSubtab === 'explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lista de Tabelas */}
            <div className="lg:col-span-4 space-y-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar tabela ou campo..."
                  className={`w-full pl-8 pr-3 py-2 rounded-lg text-xs focus:outline-none focus:border-cyan-500 border ${
                    isDark ? 'bg-[#161b22] border-[#30363d] text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                  }`}
                />
              </div>

              <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
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
                      className={`w-full text-left p-2.5 rounded-lg transition-all flex items-center justify-between cursor-pointer text-xs ${
                        isSelected
                          ? isDark ? 'bg-[#161b22] text-white font-semibold border-l-2 border-cyan-400' : 'bg-white text-slate-900 font-bold border-l-2 border-cyan-500 shadow-sm'
                          : isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-[#161b22]/40' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-cyan-400">{key}</span>
                          <span className="text-[10px] opacity-70">({tbl.module})</span>
                        </div>
                        <div className="truncate text-[11px] text-gray-400 mt-0.5">{tbl.name}</div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detalhes da Tabela e Tabela de Campos */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 border-gray-800/40">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-mono font-extrabold text-cyan-400">{selectedTableKey}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${isDark ? 'bg-cyan-950 text-cyan-300' : 'bg-cyan-50 text-cyan-700'}`}>
                      {selectedTable.module}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-200 mt-0.5">{selectedTable.name}</h3>
                </div>

                <button
                  onClick={() => handleLoadInEditor(`Local cQuery := " SELECT * FROM " + RetSqlName("${selectedTableKey}") + " "
TCQuery ChangeQuery(cQuery) New Alias "QRY_${selectedTableKey}"`)}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer shadow-sm"
                >
                  Usar em Query
                </button>
              </div>

              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{selectedTable.description}</p>

              {/* Tabela de Dados Real dos Campos */}
              <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-gray-800/60 bg-[#161b22]/30' : 'border-slate-200 bg-white shadow-sm'}`}>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className={`border-b text-[10px] font-bold uppercase tracking-wider ${isDark ? 'border-gray-800/80 text-gray-400 bg-[#161b22]/70' : 'border-slate-200 text-slate-500 bg-slate-50'}`}>
                      <th className="py-2.5 px-3">Campo</th>
                      <th className="py-2.5 px-3">Tipo</th>
                      <th className="py-2.5 px-3">Tamanho</th>
                      <th className="py-2.5 px-3">Descrição</th>
                      <th className="py-2.5 px-3">Máscara (Picture)</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-gray-800/40' : 'divide-slate-100'}`}>
                    {selectedTable.fields.map((f, i) => (
                      <tr key={i} className={isDark ? 'hover:bg-[#161b22]/50' : 'hover:bg-slate-50'}>
                        <td className="py-2 px-3 font-mono font-bold text-cyan-400">{f.field}</td>
                        <td className="py-2 px-3 font-mono">{f.type}</td>
                        <td className="py-2 px-3 font-mono">{f.size}</td>
                        <td className="py-2 px-3">{f.desc}</td>
                        <td className={`py-2 px-3 font-mono text-[10px] ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{f.picture || '-'}</td>
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
  );
};

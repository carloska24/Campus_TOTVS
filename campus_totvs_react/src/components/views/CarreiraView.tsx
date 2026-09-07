import React, { useState } from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { 
  Trophy, 
  CheckCircle2, 
  TrendingUp, 
  Compass, 
  HelpCircle, 
  Briefcase,
  CheckCircle
} from 'lucide-react';

interface ISkillItem {
  id: string;
  name: string;
  category: string;
  points: number;
}

const SKILLS_LIST: ISkillItem[] = [
  { id: 's1', name: 'Declaração e escopos de variáveis no topo (Local/Static - SonarQube)', category: 'Fundamentos', points: 10 },
  { id: 's2', name: 'Lógica condicional (If, ElseIf, Iif) e laços (While, For/Next)', category: 'Fundamentos', points: 15 },
  { id: 's3', name: 'Manipulação de Matrizes e Strings (aAdd, aScan, PadR, Transform)', category: 'Fundamentos', points: 20 },
  { id: 's4', name: 'Codeblocks, lambdas e ordenação com aSort', category: 'Fundamentos', points: 25 },
  { id: 's5', name: 'Interfaces Gráficas interativas com MSDialog e MSGET', category: 'Fundamentos', points: 30 },
  { id: 's6', name: 'Consultas SQL com TCQuery, RetSqlName e ChangeQuery', category: 'Banco de Dados', points: 35 },
  { id: 's7', name: 'Deleção lógica (D_E_L_E_T_) e fechamento com DbCloseArea', category: 'Banco de Dados', points: 30 },
  { id: 's8', name: 'Pontos de Entrada com GetArea() e RestArea() (ex: MT410OK)', category: 'Customizações', points: 40 },
  { id: 's9', name: 'Parametrização dinâmica com SX6 (GetMV / PutMV)', category: 'Customizações', points: 35 },
  { id: 's10', name: 'Arquitetura MVC Protheus (ModelDef, ViewDef, MenuDef)', category: 'Arquitetura', points: 50 },
  { id: 's11', name: 'Microsserviços REST em TLPP com Decorators e JSON', category: 'Arquitetura', points: 50 },
  { id: 's12', name: 'Auditoria de Governança TOTVS CodeAnalysis e SonarQube', category: 'Governança', points: 40 }
];

type CarreiraTab = 'niveis' | 'entrevistas' | 'casos' | 'calculadora';

export const CarreiraView: React.FC = () => {
  const { theme } = useCampusStore();
  const isDark = theme === 'dark';

  const [activeSubtab, setActiveSubtab] = useState<CarreiraTab>('niveis');
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>({
    s1: true,
    s2: true,
    s3: true
  });

  const toggleSkill = (id: string) => {
    soundFx.playTick();
    setCheckedSkills((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalScore = SKILLS_LIST.reduce((acc, skill) => {
    return acc + (checkedSkills[skill.id] ? skill.points : 0);
  }, 0);

  const maxScore = SKILLS_LIST.reduce((acc, skill) => acc + skill.points, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getSeniorityLevel = (score: number) => {
    if (score >= 320) return { title: 'Arquiteto / Especialista TOTVS', badge: 'Especialista Sênior', color: '#10b981', desc: 'Domínio pleno de MVC, TLPP, APIs REST, performance de banco de dados e governança de software corporativo.' };
    if (score >= 220) return { title: 'Desenvolvedor ADVPL Sênior', badge: 'Sênior', color: '#38bdf8', desc: 'Expertise em consultas SQL complexas, Pontos de Entrada críticos, integridade transacional e arquitetura MVC.' };
    if (score >= 120) return { title: 'Desenvolvedor ADVPL Pleno', badge: 'Pleno', color: '#f59e0b', desc: 'Autonomia em customizações de média complexidade, TopConnect, parâmetros SX6 e telas MSDialog.' };
    return { title: 'Desenvolvedor ADVPL Júnior / Iniciante', badge: 'Júnior', color: '#94a3b8', desc: 'Domínio das estruturas sintáticas fundamentais, variáveis, matrizes e lógica básica da linguagem.' };
  };

  const levelInfo = getSeniorityLevel(totalScore);

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
            <Compass className="w-4 h-4" />
            <span>Trilha de Carreira • Empregabilidade</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Trilha de Carreira: Do Júnior ao Especialista TOTVS Protheus
          </h1>

          <p className={`text-xs md:text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            Roadmap técnico de competências, pegadinhas frequentes de entrevistas e evolução de maturidade profissional no ecossistema Protheus.
          </p>

          {/* Faixa Integrada de Métricas (Inline Stats) */}
          <div className={`flex flex-wrap items-center gap-6 pt-2 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Mercado no Brasil: <strong className={isDark ? 'text-white' : 'text-slate-900'}>+50.000 Empresas</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>Demanda: <strong className={isDark ? 'text-white' : 'text-slate-900'}>Alta / Aquecida</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span>Stack: <strong className={isDark ? 'text-white' : 'text-slate-900'}>TLPP • PO-UI • REST</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Seu Progresso: <strong className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>Nível 1 Concluído!</strong></span>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO EM ABAS LINEARES */}
        <div className="flex items-center gap-1 border-b border-gray-800/30 overflow-x-auto pb-0.5">
          <button
            onClick={() => { soundFx.playTick(); setActiveSubtab('niveis'); }}
            className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeSubtab === 'niveis' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>Roadmap dos 5 Níveis</span>
          </button>

          <button
            onClick={() => { soundFx.playTick(); setActiveSubtab('entrevistas'); }}
            className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeSubtab === 'entrevistas' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>Guia de Entrevistas Técnicas</span>
          </button>

          <button
            onClick={() => { soundFx.playTick(); setActiveSubtab('casos'); }}
            className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeSubtab === 'casos' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>Casos Reais de Consultoria</span>
          </button>

          <button
            onClick={() => { soundFx.playTick(); setActiveSubtab('calculadora'); }}
            className={`pb-3 px-4 text-xs font-semibold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeSubtab === 'calculadora' ? 'border-cyan-400 text-cyan-400 font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>Calculadora de Senioridade</span>
          </button>
        </div>

        {/* SUB-ABA 1: ROADMAP VERTICAL CONTÍNUO (SEM CARDS EMPILHADOS) */}
        {activeSubtab === 'niveis' && (
          <div className="space-y-6">
            <div className="text-xs text-gray-400">
              Trajetória oficial de maturação técnica e posições no mercado:
            </div>

            {/* Timeline Vertical Contínua */}
            <div className="relative pl-6 border-l-2 border-gray-800 space-y-8">
              {/* Nível 1 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#0d1117]"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-emerald-400">NÍVEL 1: FUNDAMENTOS & MEMÓRIA RAM</span>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      ✓ Concluído
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Sintaxe ADVPL, Notação Húngara, variáveis locais, modularização com Static Functions, matrizes multidimensionais, ordenação nativa com aSort e telas MSDialog.
                  </p>
                </div>
              </div>

              {/* Nível 2 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#0d1117]"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-cyan-400">NÍVEL 2: BANCO DE DADOS & DICIONÁRIOS (SX)</span>
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-400/30">
                      Próxima Etapa
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Manipulação de tabelas (SA1, SA2, SB1, SC5, SE1), consultas otimizadas com TCQuery, ChangeQuery, perguntas dinâmicas no SX1 e parâmetros globais no SX6.
                  </p>
                </div>
              </div>

              {/* Nível 3 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-gray-600 border-4 border-[#0d1117]"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-300">NÍVEL 3: PONTOS DE ENTRADA (PEs) & CUSTOMIZAÇÕES NÃO-INVASIVAS</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Interceptação de rotinas padrões (MATA410, MATA120, MATA010) para aplicar regras customizadas de negócio sem perda de compatibilidade em viradas de release.
                  </p>
                </div>
              </div>

              {/* Nível 4 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-gray-600 border-4 border-[#0d1117]"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-300">NÍVEL 4: ARQUITETURA MVC (MODEL-VIEW-CONTROLLER) & TLPP</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    CRUDs corporativos desacoplados utilizando ModelDef, ViewDef e MenuDef com validações estruturadas via FwFormModel e tipagem estática TLPP.
                  </p>
                </div>
              </div>

              {/* Nível 5 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-gray-600 border-4 border-[#0d1117]"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-300">NÍVEL 5: MICROSSERVIÇOS REST & GOVERNANÇA SÊNIOR</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Endpoints REST nativos em TLPP com JSON, autenticação Bearer/Basic, mensageria e arquitetura limpa com 100% de conformidade no TOTVS CodeAnalysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-ABA 2: GUIA DE ENTREVISTAS (LISTA EDITORIAL COM DIVISÓRIAS) */}
        {activeSubtab === 'entrevistas' && (
          <div className="space-y-6">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Perguntas Mais Frequentes em Entrevistas Técnicas Protheus
            </div>

            <div className={`divide-y border-t border-b ${isDark ? 'divide-gray-800/60 border-gray-800/60' : 'divide-slate-200 border-slate-200'}`}>
              <div className="py-4 space-y-1">
                <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  1. Qual a diferença entre variável Local e Static no ADVPL?
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  <strong>Resposta recomendada:</strong> A variável <code className="text-cyan-400 font-mono">Local</code> existe apenas durante a execução da função onde foi criada e é liberada da memória no Return. A <code className="text-cyan-400 font-mono">Static</code> mantém seu valor entre chamadas sucessivas durante toda a thread, visível exclusivamente para as funções daquele mesmo arquivo .prw.
                </p>
              </div>

              <div className="py-4 space-y-1">
                <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  2. Por que nunca se deve usar SELECT * no Protheus?
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  <strong>Resposta recomendada:</strong> Tabelas do ERP contêm centenas de campos. O tráfego desnecessário de dados entre AppServer e DBAccess gera lentidão de rede e estouro de memória no servidor. Deve-se requisitar somente os campos utilizados.
                </p>
              </div>

              <div className="py-4 space-y-1">
                <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  3. O que acontece se esquecer de fechar uma área de TCQuery com DbCloseArea()?
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  <strong>Resposta recomendada:</strong> Ocorre vazamento de conexão e memória (Memory Leak) no DBAccess e no AppServer. Com o esgotamento dos cursores do banco de dados, o ambiente do cliente cai.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUB-ABA 3: CASOS REAIS DE CONSULTORIA */}
        {activeSubtab === 'casos' && (
          <div className="space-y-6">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Cenários Reais de Consultoria e Implantação
            </div>

            <div className="space-y-4">
              <div className="border-l-2 border-amber-500 pl-4 py-1 space-y-1">
                <h4 className="font-bold text-xs text-amber-400">Cenário 1: Trava de Liberação de Crédito no MATA410</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  Um cliente atacadista precisava impedir que pedidos de venda acima de R$ 50.000 fossem emitidos sem aprovação financeira. A regra foi implementada através do Ponto de Entrada MT410OK consultando o parâmetro MV_LIMPED no SX6.
                </p>
              </div>

              <div className="border-l-2 border-cyan-500 pl-4 py-1 space-y-1">
                <h4 className="font-bold text-xs text-cyan-400">Cenário 2: Otimização de Relatório Financeiro Lento</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  Um relatório de títulos demorava 25 minutos para gerar via DbSeek. A consultoria reescreveu a rotina utilizando TCQuery com ChangeQuery e RetSqlName("SE1"), reduzindo o tempo de resposta para 1,8 segundos.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SUB-ABA 4: CALCULADORA DE SENIORIDADE */}
        {activeSubtab === 'calculadora' && (
          <div className="space-y-6">
            {/* Header da Calculadora com Gauge Integrado */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b pb-6 border-gray-800/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs font-bold px-2 py-0.5 rounded border"
                    style={{ color: levelInfo.color, borderColor: `${levelInfo.color}55`, backgroundColor: `${levelInfo.color}15` }}
                  >
                    {levelInfo.badge}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Score: {totalScore} / {maxScore} pts ({percentage}%)
                  </span>
                </div>
                <h2 className="text-xl font-bold">
                  {levelInfo.title}
                </h2>
                <p className={`text-xs max-w-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  {levelInfo.desc}
                </p>
              </div>

              {/* Medidor Circular */}
              <div className={`w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center shrink-0 ${
                isDark ? 'border-cyan-500/30 bg-[#161b22]' : 'border-cyan-500/40 bg-white shadow-sm'
              }`}>
                <span className="text-lg font-black font-mono text-cyan-400">{percentage}%</span>
                <span className="text-[9px] text-gray-400 uppercase tracking-wide">Score</span>
              </div>
            </div>

            {/* Checklist de Competências em Tabela/Lista Limpa */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Matriz de Competências Oficiais do Mercado Protheus
              </div>

              <div className={`divide-y border rounded-xl overflow-hidden ${isDark ? 'border-gray-800/60 divide-gray-800/40 bg-[#161b22]/30' : 'border-slate-200 divide-slate-100 bg-white'}`}>
                {SKILLS_LIST.map((skill) => {
                  const isChecked = !!checkedSkills[skill.id];
                  return (
                    <div
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={`p-3 flex items-center justify-between gap-4 cursor-pointer text-xs transition-colors ${
                        isDark ? 'hover:bg-[#161b22]/60' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                          isChecked 
                            ? 'bg-cyan-600 border-cyan-500 text-white font-bold' 
                            : isDark ? 'border-gray-600' : 'border-slate-300'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </div>
                        <span className={isChecked ? (isDark ? 'text-white font-medium' : 'text-slate-900 font-medium') : 'text-gray-400'}>
                          {skill.name}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-cyan-400 font-bold shrink-0">
                        +{skill.points} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

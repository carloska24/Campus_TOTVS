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
  CheckCircle,
  Building2,
  Flame,
  Code2,
  Award,
  ChevronRight,
  ShieldCheck,
  Check
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
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-7">
        
        {/* CABEÇALHO EDITORIAL COM IDENTIDADE DE CARREIRA */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Trilha de Carreira • Empregabilidade</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Trilha de Carreira: Do Júnior ao Especialista TOTVS Protheus
          </h1>

          <p className={`text-xs md:text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            Roadmap técnico de competências, pegadinhas frequentes de entrevistas e evolução de maturidade profissional no ecossistema Protheus.
          </p>

          {/* FAIXA INTEGRADA DE MÉTRICAS DE CARREIRA */}
          <div 
            className={`mt-4 rounded-xl border flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x overflow-hidden shadow-xs transition-colors ${
              isDark 
                ? 'bg-[#161b22]/70 border-[#30363d] divide-[#30363d]/60' 
                : 'bg-white border-slate-200 divide-slate-200'
            }`}
          >
            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Mercado no Brasil
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  +50.000 Empresas
                </span>
              </div>
            </div>

            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Demanda por Consultores
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Alta / Aquecida
                </span>
              </div>
            </div>

            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Stack Tecnológica
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  TLPP • PO-UI • REST
                </span>
              </div>
            </div>

            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Seu Progresso no Campus
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  Nível 1 Concluído!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLES DE SUB-ABAS (TÁTEIS CORPORATIVOS) */}
        <div 
          className={`p-1.5 rounded-xl border flex items-center gap-1.5 overflow-x-auto shadow-xs transition-colors ${
            isDark ? 'bg-[#161b22]/50 border-[#30363d]' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {[
            { id: 'niveis', label: 'Roadmap dos 5 Níveis' },
            { id: 'entrevistas', label: 'Guia de Entrevistas Técnicas' },
            { id: 'casos', label: 'Casos Reais de Consultoria' },
            { id: 'calculadora', label: '🎯 Calculadora de Senioridade' }
          ].map((tab) => {
            const isSelected = activeSubtab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playTick();
                  setActiveSubtab(tab.id as CarreiraTab);
                }}
                className={`py-2 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? isDark
                      ? tab.id === 'calculadora'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-xs font-bold'
                        : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-xs font-bold'
                      : tab.id === 'calculadora'
                        ? 'bg-white text-amber-800 border-amber-300 shadow-xs font-bold'
                        : 'bg-white text-cyan-800 border-cyan-300 shadow-xs font-bold'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                }`}
              >
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
          {/* SUB-ABA 1: ROADMAP DOS 5 NÍVEIS COM MARCOS DE MATURIDADE   */}
          {/* ========================================================= */}
          {activeSubtab === 'niveis' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Trajetória Oficial de Maturação Técnica & Mercado
                </span>
                <span className="text-[10px] text-gray-400 font-mono">5 Estágios de Carreira</span>
              </div>

              {/* Lista de Marcos com Superfícies Leves */}
              <div className="space-y-3.5">
                {[
                  {
                    num: '1',
                    title: 'NÍVEL 1: FUNDAMENTOS & MEMÓRIA RAM',
                    badge: '✓ Concluído',
                    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                    dotColor: 'bg-emerald-400',
                    desc: 'Sintaxe ADVPL, Notação Húngara, variáveis locais, modularização com Static Functions, matrizes multidimensionais, ordenação nativa com aSort e telas MSDialog.'
                  },
                  {
                    num: '2',
                    title: 'NÍVEL 2: BANCO DE DADOS & DICIONÁRIOS (SX)',
                    badge: 'Próxima Etapa',
                    badgeClass: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
                    dotColor: 'bg-cyan-400',
                    desc: 'Manipulação de tabelas (SA1, SA2, SB1, SC5, SE1), consultas otimizadas com TCQuery, ChangeQuery, perguntas dinâmicas no SX1 e parâmetros globais no SX6.'
                  },
                  {
                    num: '3',
                    title: 'NÍVEL 3: PONTOS DE ENTRADA (PEs) & CUSTOMIZAÇÕES NÃO-INVASIVAS',
                    badge: 'Intermediário',
                    badgeClass: 'bg-gray-800 text-gray-400 border-gray-700',
                    dotColor: 'bg-gray-500',
                    desc: 'Interceptação de rotinas padrões (MATA410, MATA120, MATA010) para aplicar regras customizadas de negócio sem perda de compatibilidade em viradas de release.'
                  },
                  {
                    num: '4',
                    title: 'NÍVEL 4: ARQUITETURA MVC (MODEL-VIEW-CONTROLLER) & TLPP',
                    badge: 'Avançado',
                    badgeClass: 'bg-gray-800 text-gray-400 border-gray-700',
                    dotColor: 'bg-gray-500',
                    desc: 'CRUDs corporativos desacoplados utilizando ModelDef, ViewDef e MenuDef com validações estruturadas via FwFormModel e tipagem estática TLPP.'
                  },
                  {
                    num: '5',
                    title: 'NÍVEL 5: MICROSSERVIÇOS REST & GOVERNANÇA SÊNIOR',
                    badge: 'Especialista',
                    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                    dotColor: 'bg-purple-400',
                    desc: 'Endpoints REST nativos em TLPP com JSON, autenticação Bearer/Basic, mensageria e arquitetura limpa com 100% de conformidade no TOTVS CodeAnalysis.'
                  }
                ].map((step, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                      isDark ? 'bg-[#0d1117]/50 border-gray-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {step.num}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {step.title}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${step.badgeClass}`}>
                          {step.badge}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SUB-ABA 2: GUIA DE ENTREVISTAS                            */}
          {/* ========================================================= */}
          {activeSubtab === 'entrevistas' && (
            <div className="space-y-5">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Perguntas Frequentes & Respostas Oficiais de Entrevistas Técnicas
              </div>

              <div className={`divide-y border rounded-xl overflow-hidden shadow-xs ${
                isDark ? 'border-gray-800 divide-gray-800/60 bg-[#0d1117]/40' : 'border-slate-200 divide-slate-100 bg-slate-50'
              }`}>
                {[
                  {
                    q: '1. Qual a diferença entre variável Local e Static no ADVPL?',
                    a: 'A variável Local existe apenas durante a execução da função onde foi criada e é liberada da memória no Return. A Static mantém seu valor entre chamadas sucessivas durante toda a thread, visível exclusivamente para as funções daquele mesmo arquivo .prw.'
                  },
                  {
                    q: '2. Por que nunca se deve usar SELECT * no Protheus?',
                    a: 'Tabelas do ERP contêm centenas de campos. O tráfego desnecessário de dados entre AppServer e DBAccess gera latência de rede severa e estouro de memória no servidor. Deve-se requisitar exclusivamente os campos utilizados na rotina.'
                  },
                  {
                    q: '3. O que acontece se esquecer de fechar uma área de TCQuery com DbCloseArea()?',
                    a: 'Ocorre vazamento de conexão e memória (Memory Leak) no DBAccess e no AppServer. Com o esgotamento dos cursores do banco de dados, todo o ambiente do cliente é paralisado.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 space-y-1.5">
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.q}
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      <strong className="text-cyan-400">Resposta oficial recomendada:</strong> {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SUB-ABA 3: CASOS REAIS DE CONSULTORIA                     */}
          {/* ========================================================= */}
          {activeSubtab === 'casos' && (
            <div className="space-y-5">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Cenários Reais de Consultoria e Implantação Corporativa
              </div>

              <div className="space-y-3.5">
                <div className={`p-4 rounded-xl border-l-4 border-amber-500 border space-y-1.5 ${
                  isDark ? 'bg-amber-950/15 border-gray-800' : 'bg-amber-50/60 border-slate-200'
                }`}>
                  <h4 className="font-bold text-xs text-amber-400">
                    Cenário 1: Trava de Liberação de Crédito no MATA410
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Um cliente atacadista precisava impedir que pedidos de venda acima de R$ 50.000 fossem emitidos sem aprovação financeira. A regra foi implementada através do Ponto de Entrada MT410OK consultando o parâmetro MV_LIMPED no SX6 com tratamento elegante de Help.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border-l-4 border-cyan-500 border space-y-1.5 ${
                  isDark ? 'bg-cyan-950/15 border-gray-800' : 'bg-cyan-50/60 border-slate-200'
                }`}>
                  <h4 className="font-bold text-xs text-cyan-400">
                    Cenário 2: Otimização de Relatório Financeiro Lento
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Um relatório de títulos demorava 25 minutos para gerar via DbSeek. A consultoria reescreveu a rotina utilizando TCQuery com ChangeQuery e RetSqlName("SE1"), reduzindo o tempo de resposta para 1,8 segundos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SUB-ABA 4: CALCULADORA DE SENIORIDADE INTERATIVA (NÍVEL 3)*/}
          {/* ========================================================= */}
          {activeSubtab === 'calculadora' && (
            <div className="space-y-6">
              {/* Painel do Nível com Medidor e Barra de Progresso */}
              <div 
                className={`p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs ${
                  isDark ? 'bg-[#0d1117] border-gray-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs font-bold px-2 py-0.5 rounded border"
                      style={{ color: levelInfo.color, borderColor: `${levelInfo.color}55`, backgroundColor: `${levelInfo.color}15` }}
                    >
                      {levelInfo.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      Pontuação: <strong>{totalScore}</strong> / {maxScore} pts ({percentage}%)
                    </span>
                  </div>

                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {levelInfo.title}
                  </h2>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    {levelInfo.desc}
                  </p>

                  {/* Barra de Progresso Visual */}
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Medidor Circular */}
                <div className={`w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center shrink-0 shadow-xs ${
                  isDark ? 'border-cyan-500/30 bg-[#161b22]' : 'border-cyan-500/40 bg-white'
                }`}>
                  <span className="text-xl font-black font-mono text-cyan-400">{percentage}%</span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">Senioridade</span>
                </div>
              </div>

              {/* Matriz de Competências Interativa */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                  <span>Matriz de Competências Oficiais do Mercado Protheus</span>
                  <span className="text-[10px] text-cyan-400 font-mono font-normal">Clique para marcar/desmarcar</span>
                </div>

                <div className={`divide-y border rounded-xl overflow-hidden shadow-xs ${
                  isDark ? 'border-gray-800/80 divide-gray-800/60 bg-[#0d1117]/30' : 'border-slate-200 divide-slate-100 bg-white'
                }`}>
                  {SKILLS_LIST.map((skill) => {
                    const isChecked = !!checkedSkills[skill.id];
                    return (
                      <div
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`p-3 flex items-center justify-between gap-4 cursor-pointer text-xs transition-colors ${
                          isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 transition-colors ${
                            isChecked 
                              ? 'bg-cyan-600 border-cyan-500 text-white font-bold' 
                              : isDark ? 'border-gray-600 bg-transparent' : 'border-slate-300 bg-white'
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
    </div>
  );
};

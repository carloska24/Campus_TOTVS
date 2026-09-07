import React, { useState } from 'react';
import { soundFx } from '../../utils/audio';
import { Trophy, CheckCircle2, TrendingUp } from 'lucide-react';

interface ISkillItem {
  id: string;
  name: string;
  category: string;
  points: number;
}

const SKILLS_LIST: ISkillItem[] = [
  // Fundamentos
  { id: 's1', name: 'Declaração e escopos de variáveis no topo (Local/Static)', category: 'Fundamentos', points: 10 },
  { id: 's2', name: 'Lógica condicional (If, ElseIf, Iif) e laços (While, For/Next)', category: 'Fundamentos', points: 15 },
  { id: 's3', name: 'Manipulação de Matrizes e Strings (aAdd, aScan, PadR, Transform)', category: 'Fundamentos', points: 20 },
  { id: 's4', name: 'Codeblocks, lambdas e ordenação com aSort', category: 'Fundamentos', points: 25 },
  { id: 's5', name: 'Interfaces Gráficas interativas com MSDialog e MSGET', category: 'Fundamentos', points: 30 },

  // Banco de Dados & ERP
  { id: 's6', name: 'Consultas SQL com TCQuery, RetSqlName e ChangeQuery', category: 'Banco de Dados', points: 35 },
  { id: 's7', name: 'Deleção lógica (D_E_L_E_T_) e fechamento com DbCloseArea', category: 'Banco de Dados', points: 30 },
  { id: 's8', name: 'Pontos de Entrada com GetArea() e RestArea() (ex: MT410OK)', category: 'Customizações', points: 40 },
  { id: 's9', name: 'Parametrização dinâmica com SX6 (GetMV / PutMV)', category: 'Customizações', points: 35 },

  // Avançado
  { id: 's10', name: 'Arquitetura MVC Protheus (ModelDef, ViewDef, MenuDef)', category: 'Arquitetura', points: 50 },
  { id: 's11', name: 'Microsserviços REST em TLPP com Decorators e JSON', category: 'Arquitetura', points: 50 },
  { id: 's12', name: 'Auditoria de Governança TOTVS CodeAnalysis e SonarQube', category: 'Governança', points: 40 }
];

export const CarreiraView: React.FC = () => {
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
    <div className="flex-1 h-[calc(100vh-3.5rem)] bg-[#0d1117] p-6 overflow-y-auto space-y-6">
      {/* Banner de Senioridade */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#161b22] to-[#1c2128] border border-[#30363d] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span 
              className="text-xs font-bold px-2.5 py-0.5 rounded border"
              style={{ color: levelInfo.color, borderColor: `${levelInfo.color}55`, backgroundColor: `${levelInfo.color}15` }}
            >
              {levelInfo.badge}
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Score: {totalScore} / {maxScore} pts ({percentage}%)
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            {levelInfo.title}
          </h2>
          <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
            {levelInfo.desc}
          </p>
        </div>

        {/* Barra de Progresso Circular / Gauge */}
        <div className="w-32 h-32 rounded-full border-4 border-[#21262d] flex flex-col items-center justify-center shrink-0 shadow-inner relative bg-[#0d1117]">
          <Trophy className="w-6 h-6 text-amber-400 mb-1" />
          <span className="text-xl font-black text-white font-mono">{percentage}%</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-wide">Competência</span>
        </div>
      </div>

      {/* Matriz de Competências Interativa */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Matriz de Competências Oficiais do Mercado Protheus</span>
          </h3>
          <span className="text-xs text-cyan-400">
            Marque as habilidades que você já domina:
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SKILLS_LIST.map((skill) => {
            const isChecked = !!checkedSkills[skill.id];
            return (
              <div
                key={skill.id}
                onClick={() => toggleSkill(skill.id)}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-cyan-950/20 border-cyan-500/40 text-white shadow-sm'
                    : 'bg-[#161b22] border-[#30363d] text-gray-400 hover:border-gray-500 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <CheckCircle2
                      className={`w-5 h-5 transition-colors ${
                        isChecked ? 'text-cyan-400 fill-cyan-950/50' : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold leading-snug">{skill.name}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{skill.category}</div>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-amber-400 shrink-0 px-2 py-0.5 rounded bg-[#21262d] border border-amber-500/20">
                  +{skill.points} pts
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

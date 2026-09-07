import React, { useState } from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { 
  Trophy, 
  HelpCircle, 
  Code2, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  AlertTriangle,
  PlaySquare,
  Sparkles
} from 'lucide-react';

interface ChallengeCardProps {
  onGradeCode: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ onGradeCode }) => {
  const { 
    getCurrentLesson, 
    completedChallenges, 
    questTasks, 
    toggleTask,
    isCurrentCodeModified 
  } = useCampusStore();

  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);

  const lesson = getCurrentLesson();
  if (!lesson || !lesson.challenge) {
    return (
      <aside className="w-80 h-[calc(100vh-3.5rem)] bg-[#161b22] border-l border-[#30363d] p-4 text-gray-400 text-xs flex items-center justify-center">
        Selecione uma aula com desafio prático.
      </aside>
    );
  }

  const ch = lesson.challenge;
  const isCompleted = !!completedChallenges[lesson.id];
  const lessonTasks = questTasks[lesson.id] || {};
  const isModified = isCurrentCodeModified();

  const objectives = ch.objectives || [];
  const completedCount = objectives.filter((_, idx) => !!lessonTasks[idx]).length;

  return (
    <aside className="w-84 h-[calc(100vh-3.5rem)] bg-[#161b22] border-l border-[#30363d] flex flex-col shrink-0 select-none overflow-y-auto">
      {/* Header do Desafio */}
      <div className="p-3.5 border-b border-[#30363d] bg-gradient-to-b from-[#1c2128] to-[#161b22]">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{ch.icon || '🎯'}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              Missão Prática
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span 
              className="text-[10px] font-semibold px-2 py-0.5 rounded border"
              style={{ color: ch.difficultyColor, borderColor: `${ch.difficultyColor}55`, backgroundColor: `${ch.difficultyColor}15` }}
            >
              {ch.difficulty}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              +{ch.xp} XP
            </span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-white leading-snug">
          {ch.title}
        </h3>

        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-amber-300 font-medium">
          <Trophy className="w-3.5 h-3.5" />
          <span>{ch.badgeName}</span>
        </div>
      </div>

      <div className="p-3.5 space-y-4 flex-1">
        {/* Enunciado */}
        <div className="text-xs text-gray-300 leading-relaxed bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
          {ch.description}
        </div>

        {/* Status de Código Editado */}
        {isModified && (
          <div className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-[11px] text-amber-300">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Código customizado no editor. Valide para conferir seus acertos!</span>
          </div>
        )}

        {/* Checklist de Objetivos */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-2">
            <span>Objetivos da Missão</span>
            <span className="text-cyan-400 font-mono">
              ({completedCount}/{objectives.length})
            </span>
          </div>

          <ul className="space-y-1.5">
            {objectives.map((taskDesc, idx) => {
              const isTaskDone = !!lessonTasks[idx];
              return (
                <li
                  key={idx}
                  onClick={() => {
                    soundFx.playTick();
                    toggleTask(lesson.id, idx);
                  }}
                  className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition-all cursor-pointer ${
                    isTaskDone
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-gray-200'
                      : 'bg-[#0d1117] border-[#30363d] text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isTaskDone ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500/70" />
                    )}
                  </div>
                  <span className={`leading-snug ${isTaskDone ? 'line-through text-gray-400' : ''}`}>
                    {taskDesc}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Dica do Mentor */}
        <div className="border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117]">
          <button
            onClick={() => setIsHintOpen(!isHintOpen)}
            className="w-full p-2.5 flex items-center justify-between text-xs font-medium text-amber-300 hover:bg-[#161b22] transition-colors"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Dica do Mentor ADVPL</span>
            </div>
            {isHintOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
          {isHintOpen && (
            <div className="p-3 text-xs text-gray-300 bg-[#161b22] border-t border-[#30363d] leading-relaxed">
              {ch.hint}
            </div>
          )}
        </div>

        {/* Solução Oficial */}
        <div className="border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117]">
          <button
            onClick={() => setIsSolutionOpen(!isSolutionOpen)}
            className="w-full p-2.5 flex items-center justify-between text-xs font-medium text-cyan-300 hover:bg-[#161b22] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ver Código da Solução</span>
            </div>
            {isSolutionOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
          {isSolutionOpen && (
            <div className="p-3 bg-[#161b22] border-t border-[#30363d]">
              <pre className="text-[11px] font-mono text-cyan-200 bg-[#0d1117] p-2.5 rounded overflow-x-auto whitespace-pre-wrap leading-snug border border-cyan-900/40">
                {ch.solution}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Footer com Botão de Avaliação */}
      <div className="p-3 border-t border-[#30363d] bg-[#0d1117]">
        {isCompleted ? (
          <div className="w-full p-2.5 rounded-lg bg-emerald-900/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center gap-2 text-xs font-bold">
            <CheckCircle className="w-4 h-4" />
            <span>Missão Cumprida! (+{ch.xp} XP)</span>
          </div>
        ) : (
          <button
            onClick={() => {
              soundFx.playTick();
              onGradeCode();
            }}
            className="w-full p-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <PlaySquare className="w-4 h-4" />
            <span>Avaliar & Corrigir Código</span>
          </button>
        )}
      </div>
    </aside>
  );
};

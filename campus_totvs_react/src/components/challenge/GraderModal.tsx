import React from 'react';
import confetti from 'canvas-confetti';
import { useCampusStore } from '../../store/useCampusStore';
import type { IGradeResult } from '../../types/lesson';
import { soundFx } from '../../utils/audio';
import { 
  X, 
  Trophy, 
  WarningCircle, 
  CheckCircle, 
  ArrowCounterClockwise, 
  ClipboardText, 
  Sparkle,
  CaretRight
} from '@phosphor-icons/react';

interface GraderModalProps {
  gradeResult: IGradeResult | null;
  onApplySolution: () => void;
}

export const GraderModal: React.FC<GraderModalProps> = ({ gradeResult, onApplySolution }) => {
  const { 
    isGraderModalOpen, 
    openGraderModal, 
    getCurrentLesson, 
    resetCurrentLesson, 
    resetAllChallenges,
    setChallengeCompleted,
    theme 
  } = useCampusStore();

  const isDark = theme === 'dark';

  if (!isGraderModalOpen || !gradeResult) return null;

  const lesson = getCurrentLesson();
  const { score, total, passed, criteria } = gradeResult;
  const progressPercent = total > 0 ? Math.round((score / total) * 100) : 0;

  const handleComplete = () => {
    if (lesson && lesson.challenge) {
      setChallengeCompleted(lesson.id, lesson.challenge.xp);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      soundFx.playSuccess();
    }
    openGraderModal(false);
  };

  const handleResetCurrent = () => {
    soundFx.playTick();
    resetCurrentLesson();
    openGraderModal(false);
  };

  const handleResetAll = () => {
    if (confirm('Deseja resetar todos os desafios para NÃO FEITOS para praticar do zero?')) {
      soundFx.playTick();
      resetAllChallenges();
      openGraderModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className={`border rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-all ${
          isDark 
            ? 'bg-[#161b22] border-[#30363d]' 
            : 'bg-white border-slate-200'
        }`}
      >
        {/* Header Integrado */}
        <div 
          className={`p-4 border-b flex items-center justify-between transition-colors ${
            isDark ? 'border-[#30363d] bg-[#1c2128]' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div 
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-extrabold text-xs border shadow-xs ${
                passed
                  ? isDark 
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' 
                    : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : isDark 
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-400' 
                    : 'bg-amber-50 border-amber-300 text-amber-700'
              }`}
            >
              {score}/{total}
            </div>
            <div>
              <h2 className={`text-sm font-extrabold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span>Auditoria de Código:</span>
                <span className="font-mono text-cyan-400 font-bold">{lesson?.badge}</span>
              </h2>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Diretrizes Oficiais TOTVS CodeAnalysis & Conformidade ADVPL
              </p>
            </div>
          </div>

          <button
            onClick={() => openGraderModal(false)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-[#30363d]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Banner de Status Principal */}
          {passed ? (
            <div 
              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                isDark 
                  ? 'bg-gradient-to-r from-emerald-950/40 to-green-950/20 border-emerald-500/40 text-gray-200 shadow-xs' 
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 border border-emerald-500/30">
                <Trophy size={22} weight="fill" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className={`text-sm font-extrabold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                    Parabéns! Código 100% Aprovado!
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    +{lesson?.challenge?.xp || 50} XP
                  </span>
                </div>
                <p className="mt-1 leading-relaxed text-[11px] opacity-90">
                  Sua solução cumpriu com excelência todos os requisitos de compilação, sintaxe oficial e regras de negócio da TOTVS.
                </p>
                {/* Barra de Progresso 100% */}
                <div className="w-full h-1.5 rounded-full bg-emerald-950/80 overflow-hidden mt-2.5 border border-emerald-500/20">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          ) : (
            <div 
              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                isDark 
                  ? 'bg-gradient-to-r from-amber-950/30 to-orange-950/20 border-amber-500/30 text-gray-200 shadow-xs' 
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 border border-amber-500/30">
                <WarningCircle size={22} weight="fill" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className={`text-sm font-extrabold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                    Desafio Incompleto ({score} de {total} critérios atendidos)
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {progressPercent}% concluído
                  </span>
                </div>
                <p className="mt-1 leading-relaxed text-[11px] opacity-90">
                  Revise a lista de critérios abaixo. O Grader automático analisa variáveis, chamadas de funções e lógica no código.
                </p>
                {/* Barra de Progresso Parcial */}
                <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden mt-2.5 border border-amber-500/20">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Checklist de Critérios do Grader */}
          <div className="space-y-2.5 pt-1">
            <h4 className={`font-bold uppercase tracking-wider text-[10px] flex items-center justify-between ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              <div className="flex items-center gap-1.5">
                <ClipboardText size={15} weight="duotone" className="text-cyan-400" />
                <span>Critérios de Avaliação Automática</span>
              </div>
              <span className="font-mono text-[10px]">{score}/{total} validados</span>
            </h4>

            <div className="space-y-2">
              {criteria.map((c, i) => (
                <div
                  key={c.id ?? i}
                  className={`p-3.5 rounded-xl border flex items-start gap-3.5 transition-all ${
                    c.pass
                      ? isDark 
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-gray-200' 
                        : 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : isDark 
                        ? 'bg-[#1c2128] border-rose-500/30 text-gray-300 hover:border-rose-500/50' 
                        : 'bg-rose-50/50 border-rose-200 text-rose-950 hover:border-rose-300'
                  }`}
                >
                  <div className="mt-0.5">
                    {c.pass ? (
                      <CheckCircle size={18} weight="fill" className="text-emerald-400 shrink-0" />
                    ) : (
                      <WarningCircle size={18} weight="fill" className="text-rose-400 shrink-0" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className={`font-bold text-xs ${c.pass ? (isDark ? 'text-white' : 'text-emerald-950') : (isDark ? 'text-gray-100' : 'text-slate-900')}`}>
                        {c.title}
                      </div>
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.2 rounded-full border shrink-0 ${
                        c.pass 
                          ? isDark ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : isDark ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : 'bg-rose-100 text-rose-800 border-rose-300'
                      }`}>
                        {c.pass ? 'Concluído' : 'Pendente'}
                      </span>
                    </div>
                    
                    <div className={`text-[11px] mt-1 leading-relaxed ${c.pass ? (isDark ? 'text-emerald-400/80' : 'text-emerald-700') : (isDark ? 'text-gray-400' : 'text-slate-600')}`}>
                      {c.tip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div 
          className={`p-3.5 border-t flex flex-wrap items-center justify-between gap-2.5 transition-colors ${
            isDark ? 'bg-[#1c2128] border-[#30363d]' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetCurrent}
              title="Restaura o código original desta aula para tentar novamente"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-[#21262d] hover:bg-[#30363d] text-gray-300 hover:text-white border-[#30363d]' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <ArrowCounterClockwise size={14} weight="bold" />
              <span>Resetar Aula</span>
            </button>

            <button
              onClick={handleResetAll}
              title="Reseta todos os desafios concluídos para praticar tudo do zero"
              className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors cursor-pointer"
            >
              Resetar Tudo
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!passed && (
              <button
                onClick={() => {
                  onApplySolution();
                  openGraderModal(false);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
              >
                <Sparkle size={14} weight="fill" />
                <span>Aplicar Gabarito</span>
              </button>
            )}

            {passed ? (
              <button
                onClick={handleComplete}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-xs shadow-md shadow-emerald-900/40 transition-all cursor-pointer"
              >
                <Trophy size={15} weight="fill" />
                <span>Concluir Missão (+{lesson?.challenge?.xp || 50} XP)</span>
              </button>
            ) : (
              <button
                onClick={() => openGraderModal(false)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Continuar Praticando</span>
                <CaretRight size={14} weight="bold" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

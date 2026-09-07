import React from 'react';
import confetti from 'canvas-confetti';
import { useCampusStore } from '../../store/useCampusStore';
import type { IGradeResult } from '../../types/lesson';
import { soundFx } from '../../utils/audio';
import { 
  X, 
  Trophy, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  ClipboardCheck, 
  Sparkles 
} from 'lucide-react';

interface GraderModalProps {
  gradeResult: IGradeResult | null;
  onApplySolution: () => void;
}

export const GraderModal: React.FC<GraderModalProps> = ({ gradeResult, onApplySolution }) => {
  const { 
    isGraderModalOpen, 
    openGraderModal, 
    getCurrentLesson, 
    isCurrentCodeModified, 
    resetCurrentLesson, 
    resetAllChallenges,
    setChallengeCompleted,
    theme 
  } = useCampusStore();

  const isDark = theme === 'dark';

  if (!isGraderModalOpen || !gradeResult) return null;

  const lesson = getCurrentLesson();
  const isModified = isCurrentCodeModified();
  const { score, total, passed, criteria } = gradeResult;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
      <div 
        className={`border rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-colors ${
          isDark 
            ? 'bg-[#161b22] border-[#30363d]' 
            : 'bg-white border-[#cbd5e1]'
        }`}
      >
        {/* Header */}
        <div 
          className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'border-[#30363d] bg-[#1c2128]' : 'border-[#e2e8f0] bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border ${
                isDark 
                  ? 'bg-cyan-950 border-cyan-800/40 text-cyan-400' 
                  : 'bg-cyan-50 border-cyan-200 text-cyan-700'
              }`}
            >
              {score}/{total}
            </div>
            <div>
              <h2 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Auditoria de Código: {lesson?.badge}
              </h2>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Critérios técnicos e diretrizes oficiais TOTVS CodeAnalysis
              </p>
            </div>
          </div>

          <button
            onClick={() => openGraderModal(false)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-[#30363d]' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Score Banner */}
          {passed ? (
            <div 
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                isDark 
                  ? 'bg-gradient-to-r from-emerald-950/40 to-green-950/30 border-emerald-500/40 text-gray-200' 
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}
            >
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-sm font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                  Parabéns! Código 100% Aprovado!
                </h3>
                <p className="mt-1 leading-relaxed text-[11px]">
                  Sua solução cumpre todos os requisitos de compilação, integridade transacional e conformidade de sintaxe do Protheus.
                </p>
              </div>
            </div>
          ) : (
            <div 
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                isDark 
                  ? 'bg-gradient-to-r from-amber-950/40 to-orange-950/30 border-amber-500/40 text-gray-200' 
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}
            >
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-sm font-bold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                  Desafio Incompleto ({score} de {total} critérios atendidos)
                </h3>
                <p className="mt-1 leading-relaxed text-[11px]">
                  Revise a lista de critérios abaixo. O Grader automático analisa variáveis, chamadas de funções e lógica no código.
                </p>
              </div>
            </div>
          )}

          {/* Checklist de Critérios do Grader */}
          <div className="space-y-2">
            <h4 className={`font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              <ClipboardCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Critérios de Avaliação Automática</span>
            </h4>

            <div className="space-y-1.5">
              {criteria.map((c, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                    c.passed
                      ? isDark 
                        ? 'bg-emerald-950/15 border-emerald-500/30 text-gray-200' 
                        : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : isDark 
                        ? 'bg-[#1c2128] border-red-500/30 text-gray-300' 
                        : 'bg-rose-50/60 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="mt-0.5">
                    {c.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs">{c.name}</div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div 
          className={`p-3.5 border-t flex flex-wrap items-center justify-between gap-2.5 ${
            isDark ? 'bg-[#1c2128] border-[#30363d]' : 'bg-slate-50 border-[#e2e8f0]'
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
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar Aula</span>
            </button>

            <button
              onClick={handleResetAll}
              title="Reseta todos os desafios concluídos para praticar tudo do zero"
              className="px-3 py-1.5 rounded-lg text-[11px] font-medium text-rose-500 hover:bg-rose-500/10 border border-rose-500/30 transition-colors cursor-pointer"
            >
              Resetar Tudo para Não Feito
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!passed && (
              <button
                onClick={() => {
                  onApplySolution();
                  openGraderModal(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Aplicar Solução
              </button>
            )}

            {passed ? (
              <button
                onClick={handleComplete}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Salvar Conquista (+XP)</span>
              </button>
            ) : (
              <button
                onClick={() => openGraderModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Continuar Praticando
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

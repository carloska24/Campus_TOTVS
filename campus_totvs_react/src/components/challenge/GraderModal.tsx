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
    setChallengeCompleted 
  } = useCampusStore();

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
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#30363d] flex items-center justify-between bg-[#1c2128]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/40 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
              {score}/{total}
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                Auditoria de Código: {lesson?.badge}
              </h2>
              <p className="text-xs text-gray-400">
                Critérios técnicos e diretrizes oficiais TOTVS CodeAnalysis
              </p>
            </div>
          </div>

          <button
            onClick={() => openGraderModal(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#30363d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Score Banner */}
          {passed ? (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-green-950/30 border border-emerald-500/40 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-400">
                  Missão 100% Cumprida com Excelência! 🏆
                </h3>
                <p className="text-gray-300 mt-0.5">
                  Parabéns! Seu código atendeu a todos os {total} critérios técnicos oficiais do Protheus.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-yellow-950/30 border border-amber-500/40 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-400">
                  Atenção: {score} de {total} critérios atendidos
                </h3>
                <p className="text-gray-300 mt-0.5">
                  Veja abaixo os itens que ainda precisam de ajuste no seu código para liberar a aprovação total.
                </p>
              </div>
            </div>
          )}

          {/* Criteria Cards */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Checklist Detalhado de Validação
            </h4>

            {criteria.map((crit, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border flex flex-col gap-1 transition-all ${
                  crit.pass 
                    ? 'bg-emerald-950/15 border-emerald-500/30 text-gray-200' 
                    : 'bg-[#0d1117] border-[#30363d] text-gray-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <span>{crit.pass ? '✅' : '🟡'}</span>
                    <span className={crit.pass ? 'text-white' : 'text-amber-300'}>
                      Passo {idx + 1}: {crit.title}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      crit.pass 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {crit.pass ? 'Aprovado' : 'Pendente'}
                  </span>
                </div>
                <div className="text-[11px] text-gray-400 pl-6 leading-relaxed">
                  {crit.tip}
                </div>
              </div>
            ))}
          </div>

          {/* Comparativo: Código Base Original vs Submetido */}
          <div className="p-3 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-300 uppercase text-[11px]">
                  Código Inicial da Aula (Sem Edições):
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                  isModified 
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}>
                  {isModified ? '✏️ Código Editado' : '✨ Código Limpo'}
                </span>
              </div>

              <button
                onClick={handleResetCurrent}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-gray-300 hover:text-white text-xs border border-[#30363d] transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar Código Inicial</span>
              </button>
            </div>

            <pre className="text-[11px] font-mono text-gray-400 bg-[#161b22] p-2.5 rounded max-h-24 overflow-y-auto whitespace-pre-wrap border border-[#30363d]">
              {lesson?.code}
            </pre>
          </div>

          {/* Gabarito Oficial */}
          {lesson?.challenge?.solution && (
            <div className="p-3 rounded-lg bg-[#0d1117] border border-cyan-900/30 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-cyan-400 uppercase text-[11px] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Gabarito / Solução Oficial Esperada:
                </span>

                <button
                  onClick={() => {
                    onApplySolution();
                    openGraderModal(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 hover:text-white text-xs border border-cyan-700/50 transition-all font-medium"
                >
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  <span>Aplicar Solução no Editor</span>
                </button>
              </div>

              <pre className="text-[11px] font-mono text-cyan-200 bg-[#161b22] p-2.5 rounded max-h-28 overflow-y-auto whitespace-pre-wrap border border-cyan-900/40">
                {lesson.challenge.solution}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#30363d] bg-[#1c2128] flex items-center justify-between gap-2">
          <button
            onClick={handleResetAll}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-amber-300 text-xs font-medium border border-amber-500/30 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar Todos os Desafios</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openGraderModal(false)}
              className="px-3.5 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-gray-300 text-xs font-medium border border-[#30363d] transition-all"
            >
              Fechar
            </button>

            {passed && (
              <button
                onClick={handleComplete}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-bold shadow-md shadow-emerald-950/50 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Concluir Missão (+{lesson?.challenge?.xp} XP)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

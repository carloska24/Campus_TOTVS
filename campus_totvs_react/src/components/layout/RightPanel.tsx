import React, { useState, useEffect } from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Terminal, 
  BookOpen, 
  Trophy, 
  HelpCircle, 
  Code2, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Lightbulb,
  Cpu
} from 'lucide-react';

interface RightPanelProps {
  currentLine: number;
  onGradeCode: () => void;
  onRunCode: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ currentLine, onGradeCode, onRunCode }) => {
  const { 
    getCurrentLesson, 
    getCurrentCode, 
    setUserCode, 
    completedChallenges, 
    questTasks, 
    toggleTask, 
    isCurrentCodeModified,
    resetCurrentLesson,
    theme 
  } = useCampusStore();

  const [activeRightTab, setActiveRightTab] = useState<'inspector' | 'challenge'>('inspector');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);

  const lesson = getCurrentLesson();
  const explanations = lesson?.lineExplanations || {};

  // Encontra a explicação mais próxima da linha atual ou a primeira
  const lineKeys = Object.keys(explanations).map(Number).sort((a, b) => a - b);
  let activeKey = lineKeys.find((k) => k === currentLine);
  if (!activeKey) {
    const prevKeys = lineKeys.filter((k) => k <= currentLine);
    activeKey = prevKeys.length > 0 ? prevKeys[prevKeys.length - 1] : lineKeys[0];
  }

  const exp = activeKey !== undefined ? explanations[activeKey.toString()] : null;

  // Extrai o snippet de código da linha ativa do código atual
  const codeLines = (getCurrentCode() || '').split('\n');
  const activeLineSnippet = codeLines[currentLine - 1] || (exp ? `#Include "Totvs.ch"` : '// Código ADVPL');

  // Controle de Áudio com Web SpeechSynthesis (Português do Brasil)
  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!exp) return;

    window.speechSynthesis.cancel();
    const textToSpeak = `${exp.title}. ${exp.desc}. ${exp.audioHint ? 'Dica prática: ' + exp.audioHint : ''}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.02;

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt_BR') || v.lang.includes('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lesson?.id]);

  const ch = lesson?.challenge;
  const isCompleted = ch && !!completedChallenges[lesson.id];
  const lessonTasks = questTasks[lesson?.id || ''] || {};
  const isModified = isCurrentCodeModified();
  const objectives = ch?.objectives || [];
  const completedCount = objectives.filter((_, idx) => !!lessonTasks[idx]).length;

  const isDark = theme === 'dark';

  return (
    <aside 
      className={`w-96 h-[calc(100vh-3.5rem)] flex flex-col shrink-0 select-none overflow-hidden border-l transition-colors duration-200 ${
        isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-[#ffffff] border-[#e2e8f0]'
      }`}
    >
      {/* Abas Superiores Integradas (Sem molduras duplas) */}
      <div 
        className={`flex items-center border-b shrink-0 ${
          isDark ? 'bg-[#0d1117] border-gray-800/80' : 'bg-[#f8fafc] border-slate-200'
        }`}
      >
        <button
          onClick={() => {
            soundFx.playTick();
            setActiveRightTab('inspector');
          }}
          className={`flex-1 py-3 px-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeRightTab === 'inspector'
              ? 'border-cyan-400 text-cyan-400 font-bold bg-transparent'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Inspetor & Tutor IA</span>
          <span 
            className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
            }`}
          >
            L.{currentLine}
          </span>
        </button>

        <button
          onClick={() => {
            soundFx.playTick();
            setActiveRightTab('challenge');
          }}
          className={`flex-1 py-3 px-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeRightTab === 'challenge'
              ? 'border-amber-400 text-amber-400 font-bold bg-transparent'
              : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}
        >
          <span>🎯</span>
          <span>Missão Prática</span>
          {ch && (
            <span 
              className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                isCompleted 
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' 
                  : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
              }`}
            >
              +{ch.xp} XP
            </span>
          )}
        </button>
      </div>

      {/* CONTEÚDO DA ABA 1: INSPETOR & TUTOR IA (SUPERFÍCIE EDITORIAL LIMPA) */}
      {activeRightTab === 'inspector' && (
        <div className="flex-1 p-5 overflow-y-auto space-y-5">
          {/* Header da Linha Inspecionada */}
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Cpu className="w-3 h-3" />
                <span>Análise Semântica</span>
              </span>
              <span className={`text-[10px] font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Linha {activeKey || currentLine}
              </span>
            </div>

            <h3 className={`text-sm font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {exp ? exp.title : `Linha ${currentLine}: Instrução ADVPL`}
            </h3>
          </div>

          {/* BOTÃO HERÓI DE ÁUDIO DA IA */}
          <div className="space-y-2">
            <button
              onClick={handleToggleSpeech}
              title={isSpeaking ? 'Pausar narração de voz' : 'Ouvir explicação técnica narrada pelo Tutor IA'}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
                isSpeaking
                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-rose-900/30 animate-pulse'
                  : 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white shadow-[0_4px_16px_rgba(192,38,211,0.25)]'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Pausar Narração IA</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Ouvir Explicação da IA (Áudio)</span>
                </>
              )}
            </button>

            {/* Visualizador de Onda Sonora Sincronizado */}
            {isSpeaking && (
              <div 
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border ${
                  isDark 
                    ? 'bg-purple-950/20 border-purple-500/30' 
                    : 'bg-purple-50 border-purple-200'
                }`}
              >
                <span className="text-[11px] font-bold text-fuchsia-400 tracking-wide">
                  Tutor IA Falando:
                </span>
                <div className="flex items-center gap-1 h-5">
                  <div className="voice-wave-bar"></div>
                  <div className="voice-wave-bar"></div>
                  <div className="voice-wave-bar"></div>
                  <div className="voice-wave-bar"></div>
                  <div className="voice-wave-bar"></div>
                  <div className="voice-wave-bar"></div>
                </div>
              </div>
            )}
          </div>

          {/* PREVIEW DO CÓDIGO DA LINHA EM TERMINAL (CONTAINER FOCADO) */}
          <div 
            className={`rounded-xl border overflow-hidden ${
              isDark ? 'bg-[#090d16] border-gray-800/80' : 'bg-[#f1f5f9] border-slate-200'
            }`}
          >
            <div 
              className={`px-3 py-1 flex items-center justify-between text-[10px] font-mono border-b ${
                isDark ? 'border-gray-800/80 text-gray-500' : 'border-slate-200 text-slate-500 bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span className="ml-1 text-cyan-400 font-semibold">preview.prw</span>
              </div>
              <span>Linha {currentLine}</span>
            </div>

            <div className="p-3 font-mono text-xs overflow-x-auto whitespace-pre">
              <span className={isDark ? 'text-cyan-300' : 'text-cyan-700 font-semibold'}>
                {activeLineSnippet.trim() || '// Linha em branco ou comentário'}
              </span>
            </div>
          </div>

          {/* EXPLICAÇÃO TÉCNICA EM FLUXO DE PROSA (SEM CAIXAS DENTRO DE CAIXAS) */}
          <div className="space-y-3 pt-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Conceito & Diretriz TDN</span>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
              {exp ? exp.desc : 'Clique em qualquer linha do editor de código para ver a explicação técnica detalhada, regras do SonarQube e ouvir o tutor da IA.'}
            </p>

            {/* Dica Prática como Callout Lateral Discreto */}
            {exp?.audioHint && (
              <div className="border-l-2 border-cyan-500 pl-3 py-1 space-y-0.5">
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  Dica do Consultor Sênior:
                </div>
                <div className={`text-[11px] leading-relaxed ${isDark ? 'text-cyan-200/90' : 'text-cyan-900'}`}>
                  {exp.audioHint}
                </div>
              </div>
            )}

            {/* Tags como Metadados Sutis */}
            {exp?.tags && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      isDark 
                        ? 'bg-[#21262d] text-gray-300 border-[#30363d]' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Atalho Discreto de Simulação */}
          <div 
            onClick={onRunCode}
            className={`pt-3 border-t flex items-center justify-between text-xs transition-colors cursor-pointer ${
              isDark ? 'border-gray-800/60 text-gray-400 hover:text-cyan-400' : 'border-slate-200 text-slate-500 hover:text-cyan-600'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px]">
              <span>🚀</span>
              <span>Executar no Protheus Virtual</span>
            </div>
            <kbd className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-950/40 text-cyan-400 border border-cyan-800/40">
              F5
            </kbd>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 2: MISSÃO PRÁTICA GAMIFICADA */}
      {activeRightTab === 'challenge' && (
        <div className="flex-1 p-5 overflow-y-auto space-y-5">
          {!ch ? (
            <div className={`text-center py-12 text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Esta aula não possui desafio prático ativo.
            </div>
          ) : (
            <div className="space-y-5">
              {/* Header da Missão */}
              <div className="space-y-1.5 border-b pb-4 border-gray-800/40">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{ch.icon || '🎯'}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
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
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/30">
                      +{ch.xp} XP
                    </span>
                  </div>
                </div>

                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {ch.title}
                </h3>

                <div className="flex items-center gap-1.5 text-[11px] text-amber-500 font-medium">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Conquista: {ch.badgeName}</span>
                </div>
              </div>

              {/* Enunciado da Missão */}
              <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                {ch.description}
              </p>

              {/* Status de Código Modificado */}
              {isModified && (
                <div className="border-l-2 border-amber-500 pl-3 py-1 text-[11px] text-amber-400 leading-tight">
                  Código customizado no editor. Pressione F9 para validar!
                </div>
              )}

              {/* Checklist de Objetivos */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className={isDark ? 'text-gray-300' : 'text-slate-700'}>Objetivos</span>
                  <span className="text-cyan-400 font-mono text-[11px]">
                    ({completedCount}/{objectives.length})
                  </span>
                </div>

                <div className={`divide-y border rounded-xl overflow-hidden ${isDark ? 'border-gray-800/60 divide-gray-800/40 bg-[#0d1117]/50' : 'border-slate-200 divide-slate-100 bg-slate-50'}`}>
                  {objectives.map((taskDesc, idx) => {
                    const isTaskDone = !!lessonTasks[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          soundFx.playTick();
                          toggleTask(lesson.id, idx);
                        }}
                        className={`p-3 flex items-start gap-2.5 transition-colors cursor-pointer text-xs ${
                          isDark ? 'hover:bg-gray-800/20' : 'hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                          isTaskDone 
                            ? 'bg-emerald-600 border-emerald-500 text-white font-bold' 
                            : isDark ? 'border-gray-600' : 'border-slate-300'
                        }`}>
                          {isTaskDone ? '✓' : ''}
                        </span>
                        <span className={`flex-1 leading-snug ${isTaskDone ? 'line-through opacity-70' : (isDark ? 'text-gray-300' : 'text-slate-700')}`}>
                          {taskDesc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dica e Solução */}
              <div className="space-y-2 pt-1">
                {ch.hints && ch.hints.length > 0 && (
                  <div className="border-b pb-2 border-gray-800/30">
                    <button
                      onClick={() => setIsHintOpen(!isHintOpen)}
                      className={`w-full py-1.5 flex items-center justify-between text-xs font-semibold cursor-pointer ${
                        isDark ? 'text-gray-400 hover:text-gray-200' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Ver Dica Prática</span>
                      </div>
                      {isHintOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                    {isHintOpen && (
                      <ul className="list-disc pl-4 space-y-1 text-xs text-gray-400 pt-1">
                        {ch.hints.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {ch.solution && (
                  <div>
                    <button
                      onClick={() => setIsSolutionOpen(!isSolutionOpen)}
                      className={`w-full py-1.5 flex items-center justify-between text-xs font-semibold cursor-pointer ${
                        isDark ? 'text-gray-400 hover:text-gray-200' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Revelar Solução Oficial</span>
                      </div>
                      {isSolutionOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                    {isSolutionOpen && (
                      <div className="space-y-2 pt-2">
                        <pre className={`p-3 rounded-lg text-[11px] font-mono overflow-x-auto ${
                          isDark ? 'bg-[#0d1117] text-amber-200 border border-gray-800' : 'bg-slate-100 text-slate-800 border border-slate-200'
                        }`}>
                          {ch.solution}
                        </pre>
                        <button
                          onClick={() => {
                            soundFx.playSuccess();
                            setUserCode(lesson.id, lesson.code + '\n\n// --- SOLUÇÃO OFICIAL ---\n' + ch.solution);
                          }}
                          className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          Aplicar Solução no Editor
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Botão de Validar Desafio (F9) */}
              <button
                onClick={() => {
                  soundFx.playTick();
                  onGradeCode();
                }}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-md shadow-emerald-900/20 transition-all cursor-pointer mt-2"
              >
                <span>Validar Desafio da Aula (F9)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

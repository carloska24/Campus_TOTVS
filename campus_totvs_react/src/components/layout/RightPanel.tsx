import React, { useState, useEffect } from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { 
  Sparkle, 
  SpeakerHigh, 
  SpeakerSlash, 
  Trophy, 
  Question, 
  Code, 
  CaretDown, 
  CaretRight, 
  CheckCircle, 
  Cpu, 
  Play, 
  ArrowCounterClockwise, 
  Check, 
  Copy, 
  Lightning, 
  PencilSimple, 
  ShieldCheck 
} from '@phosphor-icons/react';

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
    setChallengeCompleted,
    resetAllChallenges,
    isCurrentCodeModified,
    resetCurrentLesson,
    theme 
  } = useCampusStore();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  const handleCopySolution = (code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
      soundFx.playSuccess();
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const isDark = theme === 'dark';

  return (
    <aside 
      className={`w-96 h-[calc(100vh-3.5rem)] flex flex-col shrink-0 select-none border-l transition-colors duration-200 ${
        isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-[#f8fafc] border-[#e2e8f0]'
      }`}
    >
      {/* CABEÇALHO ESTRUTURAL DO PAINEL DIREITO */}
      <div 
        className={`px-4 py-3 flex items-center justify-between border-b shrink-0 ${
          isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <Sparkle weight="duotone" className="w-4 h-4 text-cyan-400" />
          <span className={`text-xs font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Inspetor & Tutor IA
          </span>
          <span 
            className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
              isDark ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
            }`}
          >
            L.{currentLine}
          </span>
        </div>

        {ch && (
          <div className="flex items-center gap-1.5 text-[10px] font-semibold">
            {isCompleted ? (
              <span className="flex items-center gap-1 text-emerald-500 font-bold">
                <CheckCircle weight="fill" className="w-3 h-3" />
                <span>Concluído</span>
              </span>
            ) : (
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/30 font-mono font-bold flex items-center gap-1">
                <Lightning weight="fill" className="w-3 h-3 text-amber-400" />
                <span>+{ch.xp} XP</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* ÁREA DE CONTEÚDO ROLÁVEL COM 3 SUPERFÍCIES INDEPENDENTES */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5">
        
        {/* ========================================================= */}
        {/* SUPERFÍCIE 1: INSPETOR & TUTOR IA (SÓBRIO - NÍVEL 1/2)     */}
        {/* ========================================================= */}
        <div 
          className={`rounded-xl border p-4 space-y-3 shadow-xs transition-colors ${
            isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-slate-200'
          }`}
        >
          {/* Header da Análise Semântica */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Cpu weight="duotone" className="w-3.5 h-3.5" />
                <span>Análise Semântica</span>
              </span>
              <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Linha {activeKey || currentLine}
              </span>
            </div>

            <h3 className={`text-xs font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {exp ? exp.title : `Linha ${currentLine}: Instrução ADVPL`}
            </h3>
          </div>

          {/* Botão Herói de Voz da IA */}
          <div className="space-y-1.5">
            <button
              onClick={handleToggleSpeech}
              title={isSpeaking ? 'Pausar narração de voz' : 'Ouvir explicação técnica narrada pelo Tutor IA'}
              className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                isSpeaking
                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-rose-900/30'
                  : 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 hover:opacity-95 text-white'
              }`}
            >
              {isSpeaking ? (
                <>
                  <SpeakerSlash weight="bold" className="w-3.5 h-3.5" />
                  <span>Pausar Narração IA</span>
                </>
              ) : (
                <>
                  <SpeakerHigh weight="bold" className="w-3.5 h-3.5" />
                  <span>Ouvir Explicação da IA (Áudio)</span>
                </>
              )}
            </button>

            {/* Equalizador de Ondas Sonoras (Visível apenas durante a fala) */}
            {isSpeaking && (
              <div 
                className={`flex items-center justify-center gap-2 py-1.5 px-3 rounded-md border ${
                  isDark 
                    ? 'bg-purple-950/20 border-purple-500/30' 
                    : 'bg-purple-50 border-purple-200'
                }`}
              >
                <span className="text-[10px] font-bold text-fuchsia-400">
                  Tutor IA Falando:
                </span>
                <div className="flex items-center gap-1 h-4">
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

          {/* Preview da Linha Inspecionada (Mini-Terminal) */}
          <div 
            className={`rounded-lg border overflow-hidden ${
              isDark ? 'bg-[#090d16] border-gray-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <div 
              className={`px-2.5 py-1 flex items-center justify-between text-[9px] font-mono border-b ${
                isDark ? 'border-gray-800 text-gray-500' : 'border-slate-200 text-slate-500 bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="ml-1 text-cyan-400 font-semibold">preview.prw</span>
              </div>
              <span>Linha {currentLine}</span>
            </div>

            <div className="p-2.5 font-mono text-[11px] overflow-x-auto whitespace-pre">
              <span className={isDark ? 'text-cyan-300' : 'text-cyan-800 font-semibold'}>
                {activeLineSnippet.trim() || '// Linha em branco ou comentário'}
              </span>
            </div>
          </div>

          {/* Explicação Técnica e Diretriz TDN */}
          <div className="space-y-2 pt-0.5">
            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              {exp ? exp.desc : 'Clique em qualquer linha do editor de código para ver a explicação técnica detalhada, regras do SonarQube e ouvir o tutor da IA.'}
            </p>

            {/* Dica do Consultor (Callout Lateral Elegante) */}
            {exp?.audioHint && (
              <div className="border-l-2 border-cyan-500 pl-2.5 py-0.5 space-y-0.5">
                <div className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider">
                  Dica do Consultor Sênior:
                </div>
                <div className={`text-[11px] leading-relaxed ${isDark ? 'text-cyan-200/90' : 'text-cyan-900'}`}>
                  {exp.audioHint}
                </div>
              </div>
            )}

            {/* Tags Semânticas */}
            {exp?.tags && (
              <div className="flex flex-wrap gap-1 pt-1">
                {exp.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${
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
        </div>

        {/* ========================================================= */}
        {/* SUPERFÍCIE 2: SIMULAÇÃO INTERATIVA (DESTAQUE INTERMEDIÁRIO) */}
        {/* ========================================================= */}
        <div 
          className={`rounded-xl border p-3.5 space-y-2.5 shadow-xs transition-colors ${
            isDark 
              ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-100' 
              : 'bg-cyan-50/70 border-cyan-200 text-cyan-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
              <Play weight="fill" className="w-3.5 h-3.5" />
              <span>Simulação Interativa</span>
            </div>
            <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
              isDark ? 'bg-cyan-900/40 text-cyan-300 border border-cyan-700/40' : 'bg-white text-cyan-800 border border-cyan-200'
            }`}>
              F5
            </kbd>
          </div>

          <p className={`text-[11px] leading-relaxed ${isDark ? 'text-cyan-200/80' : 'text-cyan-900/80'}`}>
            Clique para abrir a tela simulada do Protheus e validar a saída visual da sua rotina em tempo real.
          </p>

          <button
            onClick={() => {
              soundFx.playTick();
              onRunCode();
            }}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Executar no Protheus Virtual</span>
            <span className="opacity-70 text-[10px]">(F5)</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* SUPERFÍCIE 3: MISSÃO PRÁTICA (MAIOR DESTAQUE - NÍVEL 3)    */}
        {/* ========================================================= */}
        {ch ? (
          <div 
            className={`rounded-xl border relative overflow-hidden shadow-xs transition-colors ${
              isDark 
                ? 'bg-[#161b22] border-amber-500/35' 
                : 'bg-white border-amber-400/50'
            }`}
          >
            {/* Acento Dourado Refinado no Topo (2px) */}
            <div className="h-0.5 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600"></div>

            <div className="p-4 space-y-3.5">
              {/* Barra de Metadados: Tag, Dificuldade e Recompensa */}
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span className="font-bold uppercase tracking-wider text-amber-400">
                    Missão Prática
                  </span>
                  <span 
                    className="font-semibold px-1.5 py-0.2 rounded border text-[9px]"
                    style={{ 
                      color: ch.difficultyColor, 
                      borderColor: `${ch.difficultyColor}44`, 
                      backgroundColor: `${ch.difficultyColor}12` 
                    }}
                  >
                    {ch.difficulty}
                  </span>
                </div>

                <div 
                  className={`px-2 py-0.5 rounded font-bold font-mono text-[10px] flex items-center gap-1 ${
                    isCompleted 
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' 
                      : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                  }`}
                >
                  <Lightning weight="fill" className="w-3 h-3 text-amber-400" />
                  <span>+{ch.xp} XP</span>
                </div>
              </div>

              {/* Título da Missão e Conquista */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-amber-500 font-semibold">
                  <Trophy weight="duotone" className="w-3.5 h-3.5" />
                  <span>Conquista: {ch.badgeName}</span>
                </div>

                <h3 className={`text-xs font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {ch.title}
                </h3>
              </div>

              {/* Banner de Código Customizado no Editor */}
              {isModified && (
                <div 
                  className={`p-2 rounded-lg border text-[10px] flex items-start gap-2 ${
                    isDark 
                      ? 'bg-amber-950/20 border-amber-500/30 text-amber-300' 
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <PencilSimple weight="duotone" className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold">Código Customizado no Editor:</span>
                    <p className="opacity-80 leading-tight pt-0.5">Suas alterações serão executadas e avaliadas pelo validador do Campus.</p>
                  </div>
                </div>
              )}

              {/* Enunciado do Desafio */}
              <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                {ch.description}
              </p>

              {/* Checklist Agrupado de Objetivos */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className={`text-[11px] ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Objetivos da Missão
                  </span>
                  <span className="text-cyan-400 font-mono text-[10px]">
                    ({completedCount}/{objectives.length})
                  </span>
                </div>

                <div 
                  className={`divide-y border rounded-lg overflow-hidden ${
                    isDark ? 'border-gray-800 divide-gray-800/60 bg-[#0d1117]/50' : 'border-slate-200 divide-slate-100 bg-slate-50'
                  }`}
                >
                  {objectives.map((taskDesc, idx) => {
                    const isTaskDone = !!lessonTasks[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          soundFx.playTick();
                          toggleTask(lesson.id, idx);
                        }}
                        className={`p-2.5 flex items-start gap-2.5 transition-colors cursor-pointer text-xs ${
                          isDark ? 'hover:bg-gray-800/30' : 'hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 mt-0.5 text-[9px] ${
                          isTaskDone 
                            ? 'bg-emerald-600 border-emerald-500 text-white font-bold' 
                            : isDark ? 'border-gray-600' : 'border-slate-300'
                        }`}>
                          {isTaskDone ? '✓' : ''}
                        </span>
                        <span className={`flex-1 text-[11px] leading-snug ${
                          isTaskDone ? 'line-through opacity-60' : (isDark ? 'text-gray-300' : 'text-slate-700')
                        }`}>
                          {taskDesc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Acordeão: Dica do Mentor ADVPL */}
              {ch.hint && (
                <div className={`border rounded-lg overflow-hidden ${isDark ? 'border-gray-800' : 'border-slate-200'}`}>
                  <button
                    onClick={() => setIsHintOpen(!isHintOpen)}
                    className={`w-full p-2 flex items-center justify-between text-xs font-semibold cursor-pointer transition-colors ${
                      isDark ? 'hover:bg-gray-800/30 text-gray-300' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Question weight="bold" className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Dica do Mentor ADVPL</span>
                    </div>
                    {isHintOpen ? <CaretDown weight="bold" className="w-3.5 h-3.5 text-gray-400" /> : <CaretRight weight="bold" className="w-3.5 h-3.5 text-gray-400" />}
                  </button>

                  {isHintOpen && (
                    <div className={`p-2.5 border-t text-xs space-y-1.5 ${
                      isDark ? 'bg-[#0d1117]/40 border-gray-800 text-gray-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <p className="text-[11px] leading-relaxed">{ch.hint}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Acordeão: Código da Solução Oficial */}
              {ch.solution && (
                <div className={`border rounded-lg overflow-hidden ${isDark ? 'border-gray-800' : 'border-slate-200'}`}>
                  <button
                    onClick={() => setIsSolutionOpen(!isSolutionOpen)}
                    className={`w-full p-2 flex items-center justify-between text-xs font-semibold cursor-pointer transition-colors ${
                      isDark ? 'hover:bg-gray-800/30 text-gray-300' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Code weight="bold" className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ver Código da Solução</span>
                    </div>
                    {isSolutionOpen ? <CaretDown weight="bold" className="w-3.5 h-3.5 text-gray-400" /> : <CaretRight weight="bold" className="w-3.5 h-3.5 text-gray-400" />}
                  </button>

                  {isSolutionOpen && (
                    <div className={`p-2.5 border-t space-y-2 ${
                      isDark ? 'bg-[#0d1117] border-gray-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <pre className={`p-2 rounded text-[10px] font-mono overflow-x-auto leading-relaxed ${
                        isDark ? 'bg-black/50 text-amber-200 border border-gray-800' : 'bg-white text-slate-800 border border-slate-200'
                      }`}>
                        {ch.solution}
                      </pre>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopySolution(ch.solution)}
                          className={`flex-1 py-1 px-2 rounded text-[10px] font-semibold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                            isDark 
                              ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700' 
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {isCopied ? <Check weight="bold" className="w-3 h-3 text-emerald-400" /> : <Copy weight="bold" className="w-3 h-3" />}
                          <span>{isCopied ? 'Copiado!' : 'Copiar Código'}</span>
                        </button>

                        <button
                          onClick={() => {
                            soundFx.playSuccess();
                            setUserCode(lesson.id, lesson.code + '\n\n// --- SOLUÇÃO OFICIAL ---\n' + ch.solution);
                          }}
                          className="flex-1 py-1 px-2 rounded text-[10px] font-bold bg-amber-600 hover:bg-amber-500 text-white transition-all cursor-pointer text-center"
                        >
                          Aplicar no Editor
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Ações da Missão: Avaliar e Concluir */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    soundFx.playTick();
                    onGradeCode();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck weight="bold" className="w-4 h-4" />
                  <span>Avaliar & Corrigir Código (F9)</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playSuccess();
                    setChallengeCompleted(lesson.id, ch.xp);
                  }}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isCompleted
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                      : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-xs'
                  }`}
                >
                  <CheckCircle weight="fill" className="w-4 h-4" />
                  <span>{isCompleted ? 'Missão Concluída (Refazer)' : `Concluir Missão (+${ch.xp} XP)`}</span>
                </button>

                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <button
                    onClick={() => {
                      if (confirm('Deseja restaurar o código original desta aula?')) {
                        soundFx.playTick();
                        resetCurrentLesson();
                      }
                    }}
                    className={`hover:underline cursor-pointer flex items-center gap-1 ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <ArrowCounterClockwise weight="bold" className="w-2.5 h-2.5" />
                    <span>Restaurar Código da Aula</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Deseja resetar o progresso de todos os desafios para praticar novamente do início?')) {
                        soundFx.playTick();
                        resetAllChallenges();
                      }
                    }}
                    className={`hover:underline cursor-pointer opacity-75 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-slate-400 hover:text-slate-700'}`}
                  >
                    Resetar Desafios
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`text-center py-6 text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
            Esta aula não possui missão prática ativa.
          </div>
        )}
      </div>
    </aside>
  );
};

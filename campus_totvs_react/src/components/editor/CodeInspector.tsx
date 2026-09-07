import React, { useState } from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { Volume2, VolumeX, Sparkles, BookOpen } from 'lucide-react';

interface CodeInspectorProps {
  currentLine: number;
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({ currentLine }) => {
  const { getCurrentLesson } = useCampusStore();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const lesson = getCurrentLesson();
  const explanations = lesson?.lineExplanations || {};

  // Encontra a explicação mais próxima da linha atual ou a primeira
  const lineKeys = Object.keys(explanations).map(Number).sort((a, b) => a - b);
  let activeKey = lineKeys.find((k) => k === currentLine);
  if (!activeKey) {
    // Procura a chave imediatamente anterior
    const prevKeys = lineKeys.filter((k) => k <= currentLine);
    activeKey = prevKeys.length > 0 ? prevKeys[prevKeys.length - 1] : lineKeys[0];
  }

  const exp = activeKey !== undefined ? explanations[activeKey.toString()] : null;

  const handleSpeak = () => {
    if (!exp) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${exp.title}. ${exp.desc}. ${exp.audioHint || ''}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="h-44 bg-[#161b22] border-t border-[#30363d] p-3 flex flex-col justify-between shrink-0 select-none">
      {/* Header do Inspetor */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inspetor & Tutor IA da Linha {activeKey || currentLine}</span>
          </div>
          {exp?.tags && (
            <div className="flex gap-1">
              {exp.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] px-1.5 py-0.2 rounded bg-[#21262d] text-gray-400 border border-[#30363d]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSpeak}
          title={isSpeaking ? 'Parar leitura' : 'Ouvir explicação com áudio do tutor'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-all cursor-pointer ${
            isSpeaking
              ? 'bg-cyan-950 text-cyan-300 border-cyan-700/60 animate-pulse'
              : 'bg-[#21262d] text-gray-300 hover:text-white border-[#30363d] hover:bg-[#30363d]'
          }`}
        >
          {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{isSpeaking ? 'Pausar Voz' : 'Ouvir Tutor'}</span>
        </button>
      </div>

      {/* Conteúdo da Explicação */}
      <div className="my-1.5 overflow-y-auto max-h-24 pr-1">
        {exp ? (
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <BookOpen className="w-3 h-3 text-cyan-400" />
              <span>{exp.title}</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              {exp.desc}
            </p>
            {exp.audioHint && (
              <p className="text-[11px] text-cyan-300/90 italic bg-cyan-950/20 p-1.5 rounded border border-cyan-800/30">
                💡 Dica Prática: {exp.audioHint}
              </p>
            )}
          </div>
        ) : (
          <div className="text-xs text-gray-500 italic">
            Clique em qualquer linha do código no editor acima para ver a explicação técnica e ouvir o tutor.
          </div>
        )}
      </div>

      <div className="text-[10px] text-gray-500">
        Dica: O inspetor analisa o código linha por linha com as diretrizes do TDN e SonarQube TOTVS.
      </div>
    </div>
  );
};

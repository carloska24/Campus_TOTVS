import React, { useState } from 'react';
import { MASTERCLASS_TRACKS } from '../../data/masterclass';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { GraduationCap, ArrowRight, BookMarked, CheckCircle2, Clock, Code } from 'lucide-react';

export const MasterclassView: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState('fundamentos');
  const [selectedChapterId, setSelectedChapterId] = useState('cap01');

  const { setUserCode, setActiveTab, activeLessonId } = useCampusStore();

  const currentTrack = MASTERCLASS_TRACKS.find((t) => t.id === activeTrackId) || MASTERCLASS_TRACKS[0];
  const currentChapter = currentTrack.chapters.find((c) => c.id === selectedChapterId) || currentTrack.chapters[0];

  const handleLoadSnippet = (snippet: string) => {
    soundFx.playSuccess();
    setUserCode(activeLessonId, snippet);
    setActiveTab('lab');
  };

  return (
    <div className="flex-1 h-[calc(100vh-3.5rem)] bg-[#0d1117] flex flex-col overflow-hidden">
      {/* Seletor Superior de Trilhas */}
      <div className="h-12 bg-[#161b22] border-b border-[#30363d] px-4 flex items-center gap-2 overflow-x-auto shrink-0 select-none">
        {MASTERCLASS_TRACKS.map((track) => {
          const isActive = track.id === activeTrackId;
          return (
            <button
              key={track.id}
              onClick={() => {
                soundFx.playTick();
                setActiveTrackId(track.id);
                setSelectedChapterId(track.chapters[0].id);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/50 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#21262d]'
              }`}
            >
              <span>{track.icon}</span>
              <span>{track.name}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Lista de Capítulos da Trilha (Esquerda) */}
        <div className="w-80 border-r border-[#30363d] bg-[#161b22] p-3 overflow-y-auto space-y-2 shrink-0">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5 text-cyan-400" />
            <span>Capítulos da Trilha</span>
          </div>

          {currentTrack.chapters.map((ch) => {
            const isSelected = ch.id === selectedChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  soundFx.playTick();
                  setSelectedChapterId(ch.id);
                }}
                className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1c2128] border-cyan-500/50 text-white shadow-sm'
                    : 'bg-[#0d1117] border-[#30363d] text-gray-400 hover:border-gray-500 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-800/40">
                    {ch.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{ch.duration}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-white leading-tight">
                  {ch.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Detalhes do Capítulo (Direita) */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono font-bold border border-cyan-800/40">
                {currentChapter.badge}
              </span>
              <h2 className="text-base font-bold text-white">
                {currentChapter.title}
              </h2>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
              {currentChapter.description}
            </p>
          </div>

          {/* Pontos-Chave */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>Diretrizes e Conceitos Inegociáveis</span>
            </h3>

            <div className="space-y-2">
              {currentChapter.keyPoints.map((point, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-gray-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Snippet Oficial */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-cyan-400" />
                <span>Exemplo Prático Oficial de Código</span>
              </h3>

              <button
                onClick={() => handleLoadSnippet(currentChapter.snippetCode)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <span>Carregar no Editor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#0a0d13] border border-[#30363d] text-xs font-mono text-cyan-200 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
              {currentChapter.snippetCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

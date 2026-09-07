import React, { useState } from 'react';
import { MASTERCLASS_TRACKS } from '../../data/masterclass';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { 
  GraduationCap, 
  ArrowRight, 
  Clock, 
  Code, 
  CheckCircle2, 
  FileCode, 
  Layers, 
  Sparkles, 
  ChevronRight,
  BookOpen,
  Copy,
  Check,
  Award,
  Terminal
} from 'lucide-react';

export const MasterclassView: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState('fundamentos');
  const [selectedChapterId, setSelectedChapterId] = useState('cap01');
  const [isCopied, setIsCopied] = useState(false);

  const { setUserCode, setActiveTab, activeLessonId, theme } = useCampusStore();
  const isDark = theme === 'dark';

  const currentTrack = MASTERCLASS_TRACKS.find((t) => t.id === activeTrackId) || MASTERCLASS_TRACKS[0];
  const chapters = currentTrack?.chapters || [];
  const currentChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0] || {
    id: 'cap01',
    title: 'Capítulo 01',
    badge: '01_Variaveis.prw',
    duration: '15 min',
    level: 'Iniciante',
    category: 'Fundamentos',
    description: '',
    snippetCode: '',
    keyPoints: []
  };

  const handleLoadSnippet = (snippet: string) => {
    soundFx.playSuccess();
    setUserCode(activeLessonId, snippet);
    setActiveTab('lab');
  };

  const handleCopyCode = (snippet: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(snippet);
      setIsCopied(true);
      soundFx.playSuccess();
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div 
      className={`flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto transition-colors duration-200 ${
        isDark ? 'bg-[#0d1117] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-7">
        
        {/* CABEÇALHO EDITORIAL INTEGRADO */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Formação Oficial de Engenharia TOTVS</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Masterclass: Engenharia & Arquitetura ADVPL / TLPP
          </h1>

          <p className={`text-xs md:text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            Formação completa e estruturada da Engenharia de Software TOTVS Protheus. Navegue pelos módulos organizados por nível de maturidade e consulte o arsenal prático de código.
          </p>

          {/* FAIXA INTEGRADA DE MÉTRICAS DA MASTERCLASS */}
          <div 
            className={`mt-4 rounded-xl border flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x overflow-hidden shadow-xs transition-colors ${
              isDark 
                ? 'bg-[#161b22]/70 border-[#30363d] divide-[#30363d]/60' 
                : 'bg-white border-slate-200 divide-slate-200'
            }`}
          >
            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Trilha Prática
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  9 Aulas Completas
                </span>
              </div>
            </div>

            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Avançado
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  MVC & APIs REST
                </span>
              </div>
            </div>

            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Arquitetura
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  RAM, DBAccess & PEs
                </span>
              </div>
            </div>

            <div className="flex-1 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Governança
                </span>
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  100% CodeAnalysis
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLES DE TRILHAS (ABAS TÁTEIS) */}
        <div 
          className={`p-1.5 rounded-xl border flex items-center gap-1.5 overflow-x-auto shadow-xs transition-colors ${
            isDark ? 'bg-[#161b22]/50 border-[#30363d]' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {MASTERCLASS_TRACKS.map((track) => {
            const isActive = track.id === activeTrackId;
            return (
              <button
                key={track.id}
                onClick={() => {
                  soundFx.playTick();
                  setActiveTrackId(track.id);
                  if (track.chapters && track.chapters.length > 0) {
                    setSelectedChapterId(track.chapters[0].id);
                  }
                }}
                className={`py-2 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? isDark
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-xs font-bold'
                      : 'bg-white text-cyan-800 border border-cyan-300 shadow-xs font-bold'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                }`}
              >
                <span>{track.icon}</span>
                <span>{track.name}</span>
              </button>
            );
          })}
        </div>

        {/* ESTRUTURA MASTER-DETAIL: SUMÁRIO DE CAPÍTULOS + ÁREA DE ESTUDO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Coluna Esquerda: Sumário de Capítulos */}
          <div className="lg:col-span-4 space-y-2">
            <div className={`text-[10px] font-bold uppercase tracking-wider px-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Sumário de Capítulos
            </div>

            <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
              {chapters.map((ch, idx) => {
                const isSelected = ch.id === selectedChapterId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      soundFx.playTick();
                      setSelectedChapterId(ch.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-3 text-xs cursor-pointer border ${
                      isSelected
                        ? isDark 
                          ? 'bg-cyan-500/10 border-cyan-500/40 text-white font-bold shadow-xs' 
                          : 'bg-white border-cyan-300 text-slate-900 font-bold shadow-xs'
                        : isDark 
                          ? 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5' 
                          : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-cyan-400' : 'text-gray-500'}`}>
                          Cap. {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                          isDark ? 'bg-gray-800 text-gray-300' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {ch.duration}
                        </span>
                      </div>
                      <div className="truncate text-xs font-semibold">
                        {ch.title.split(':')[1]?.trim() || ch.title}
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-gray-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coluna Direita: Área de Estudo do Capítulo (Superfície Nível 1) */}
          <div 
            className={`lg:col-span-8 rounded-2xl border p-6 space-y-6 shadow-xs transition-colors ${
              isDark ? 'bg-[#161b22]/40 border-[#30363d]' : 'bg-white border-slate-200'
            }`}
          >
            {/* Cabeçalho do Capítulo */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-5 border-gray-800/30">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                  }`}>
                    {currentChapter.badge}
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentChapter.duration} de estudo imersivo</span>
                  </span>
                </div>

                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {currentChapter.title}
                </h2>
              </div>

              {currentChapter.snippetCode && (
                <button
                  onClick={() => handleLoadSnippet(currentChapter.snippetCode)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
                >
                  <span>Abrir Fonte no Editor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Descrição em Prosa de Consultoria */}
            <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              {currentChapter.description}
            </p>

            {/* Pontos-Chave e Diretrizes do TDN */}
            {currentChapter.keyPoints && currentChapter.keyPoints.length > 0 && (
              <div className="space-y-3 pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Diretrizes e Boas Práticas Oficiais (TDN)</span>
                </div>

                <div className="space-y-2.5">
                  {currentChapter.keyPoints.map((point, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                        isDark ? 'bg-[#0d1117]/50 border-gray-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/20">
                        {i + 1}
                      </span>
                      <span className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Código Fonte de Referência com Cópia Rápida */}
            {currentChapter.snippetCode && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Implementação Oficial de Referência:
                  </span>
                  
                  <button
                    onClick={() => handleCopyCode(currentChapter.snippetCode)}
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Copiado!' : 'Copiar Código'}</span>
                  </button>
                </div>

                <pre 
                  className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed shadow-xs ${
                    isDark 
                      ? 'bg-[#090d16] border-gray-800 text-cyan-200' 
                      : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  {currentChapter.snippetCode}
                </pre>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

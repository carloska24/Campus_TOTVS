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
  ChevronRight
} from 'lucide-react';

export const MasterclassView: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState('fundamentos');
  const [selectedChapterId, setSelectedChapterId] = useState('cap01');

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

  return (
    <div 
      className={`flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto transition-colors duration-200 ${
        isDark ? 'bg-[#0d1117] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* CABEÇALHO EDITORIAL INTEGRADO (SEM CARDS ISOLADOS) */}
        <div className="space-y-4 border-b pb-6 border-gray-800/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Formação Oficial de Engenharia TOTVS</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Masterclass: Engenharia & Arquitetura ADVPL / TLPP
          </h1>

          <p className={`text-xs md:text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            Formação completa e estruturada da Engenharia de Software TOTVS Protheus. Navegue pelos módulos organizados por nível de maturidade e consulte o arsenal prático de código.
          </p>

          {/* Faixa Integrada de Métricas (Inline Stats - Sem caixas individuais) */}
          <div className={`flex flex-wrap items-center gap-6 pt-2 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Trilha Completa: <strong className={isDark ? 'text-white' : 'text-slate-900'}>9 Aulas Práticas</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>Formações Avançadas: <strong className={isDark ? 'text-white' : 'text-slate-900'}>MVC & APIs REST</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span>Arquitetura: <strong className={isDark ? 'text-white' : 'text-slate-900'}>RAM, DBAccess & PEs</strong></span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Governança: <strong className={isDark ? 'text-white' : 'text-slate-900'}>100% CodeAnalysis</strong></span>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO DE TRILHAS (SELEÇÃO EM ABAS LIMPAS) */}
        <div className="flex items-center gap-1 border-b border-gray-800/30 overflow-x-auto pb-0.5">
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
                className={`pb-3 px-4 text-xs font-semibold flex items-center gap-2 transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-cyan-400 text-cyan-400 font-bold'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <span>{track.icon}</span>
                <span>{track.name}</span>
              </button>
            );
          })}
        </div>

        {/* ESTRUTURA MASTER-DETAIL: SUMÁRIO DE CAPÍTULOS + ÁREA DE ESTUDO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna Esquerda: Lista de Capítulos (Menu Estruturado) */}
          <div className="lg:col-span-4 space-y-1">
            <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
              Sumário de Capítulos
            </div>

            <div className="space-y-1">
              {chapters.map((ch, idx) => {
                const isSelected = ch.id === selectedChapterId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      soundFx.playTick();
                      setSelectedChapterId(ch.id);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between gap-3 text-xs cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-[#161b22] text-white font-semibold border-l-2 border-cyan-400'
                          : 'bg-white text-slate-900 font-bold border-l-2 border-cyan-500 shadow-sm'
                        : isDark
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-[#161b22]/50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[10px] font-mono ${isSelected ? 'text-cyan-400' : 'text-gray-500'}`}>
                          Cap. {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] opacity-70">
                          {ch.duration}
                        </span>
                      </div>
                      <div className="truncate text-xs">
                        {ch.title.split(':')[1]?.trim() || ch.title}
                      </div>
                    </div>

                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-gray-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coluna Direita: Conteúdo do Capítulo (Composição de Leitura Contínua) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Cabeçalho do Capítulo */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-4 border-gray-800/30">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isDark ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                  }`}>
                    {currentChapter.badge}
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentChapter.duration} de estudo</span>
                  </span>
                </div>

                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {currentChapter.title}
                </h2>
              </div>

              {currentChapter.snippetCode && (
                <button
                  onClick={() => handleLoadSnippet(currentChapter.snippetCode)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span>Abrir Fonte no Editor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Descrição em Prosa Fluida */}
            <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
              {currentChapter.description}
            </p>

            {/* Pontos-Chave (Lista Estruturada com Marcadores Limpos, Não Caixas) */}
            {currentChapter.keyPoints && currentChapter.keyPoints.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Diretrizes e Boas Práticas do TDN</span>
                </h3>

                <div className="space-y-2.5">
                  {currentChapter.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
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

            {/* Código Fonte (Container Focado com Syntax) */}
            {currentChapter.snippetCode && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Implementação de Referência:
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">Padrão TOTVS CodeAnalysis</span>
                </div>

                <pre 
                  className={`p-4 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed ${
                    isDark 
                      ? 'bg-[#090d16] border-[#30363d] text-cyan-200' 
                      : 'bg-[#f1f5f9] border-[#cbd5e1] text-slate-800'
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

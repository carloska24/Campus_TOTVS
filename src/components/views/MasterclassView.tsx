import React, { useState } from 'react';
import { MASTERCLASS_TRACKS } from '../../data/masterclass';
import { useCampusStore } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { 
  GraduationCap, 
  ArrowRight, 
  Clock,
  Sparkle, 
  CaretRight,
  BookOpen,
  Copy,
  Check,
  TerminalWindow,
  Database,
  TreeStructure,
  Lightning,
  ShieldCheck,
  Cpu,
  type IconWeight
} from '@phosphor-icons/react';

const getTrackIcon = (id: string, size = 18, weight: IconWeight = 'duotone') => {
  switch (id) {
    case 'fundamentos': return <BookOpen size={size} weight={weight} className="text-cyan-400 shrink-0" />;
    case 'banco-de-dados': return <Database size={size} weight={weight} className="text-blue-400 shrink-0" />;
    case 'arquitetura': return <TreeStructure size={size} weight={weight} className="text-purple-400 shrink-0" />;
    case 'arsenal': return <Lightning size={size} weight={weight} className="text-amber-400 shrink-0" />;
    default: return <GraduationCap size={size} weight={weight} className="text-cyan-400 shrink-0" />;
  }
};

const getLevelBadgeColor = (level: string, isDark: boolean) => {
  switch (level?.toLowerCase()) {
    case 'iniciante':
      return isDark ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'intermediário':
    case 'intermediario':
      return isDark ? 'bg-blue-950/60 text-blue-400 border-blue-800/40' : 'bg-blue-50 text-blue-700 border-blue-200';
    case 'avançado':
    case 'avancado':
      return isDark ? 'bg-purple-950/60 text-purple-400 border-purple-800/40' : 'bg-purple-50 text-purple-700 border-purple-200';
    case 'especialista':
      return isDark ? 'bg-amber-950/60 text-amber-400 border-amber-800/40' : 'bg-amber-50 text-amber-700 border-amber-200';
    default:
      return isDark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const MasterclassView: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState('fundamentos');
  const [selectedChapterId, setSelectedChapterId] = useState('cap01');
  const [isCopied, setIsCopied] = useState(false);

  const { setUserCode, setActiveTab, activeLessonId, theme } = useCampusStore();
  const isDark = theme === 'dark';

  const currentTrack = MASTERCLASS_TRACKS.find((t) => t.id === activeTrackId) || MASTERCLASS_TRACKS[0];
  const chapters = currentTrack?.chapters || [];
  const totalMinutes = chapters.reduce((acc, curr) => acc + (parseInt(curr.duration || '0') || 0), 0);
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
            <GraduationCap size={18} weight="duotone" />
            <span>Formação Oficial de Engenharia TOTVS</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Masterclass: Engenharia & Arquitetura ADVPL / TLPP
          </h1>

          <p className={`text-xs md:text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            Formação completa e estruturada da Engenharia de Software TOTVS Protheus. Navegue pelas trilhas organizadas por nível de maturidade e consulte o arsenal prático de código.
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
                <BookOpen size={18} weight="duotone" />
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
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                <TreeStructure size={18} weight="duotone" />
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
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Cpu size={18} weight="duotone" />
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
                <ShieldCheck size={18} weight="duotone" />
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
                className={`py-2 px-3.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? isDark
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-xs font-bold'
                      : 'bg-white text-cyan-800 border border-cyan-300 shadow-xs font-bold'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 border border-transparent'
                }`}
              >
                {getTrackIcon(track.id, 16)}
                <span>{track.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive 
                    ? isDark ? 'bg-cyan-900/40 text-cyan-200' : 'bg-cyan-50 text-cyan-800'
                    : isDark ? 'bg-gray-800 text-gray-400' : 'bg-slate-200 text-slate-600'
                }`}>
                  {track.chapters?.length || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* ESTRUTURA MASTER-DETAIL: SUMÁRIO DE CAPÍTULOS + ÁREA DE ESTUDO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Coluna Esquerda: Painel Unificado do Sumário de Capítulos (Superfície Nível 1) */}
          <div 
            className={`lg:col-span-4 rounded-2xl border overflow-hidden shadow-xs transition-colors flex flex-col ${
              isDark ? 'bg-[#161b22]/40 border-[#30363d]' : 'bg-white border-slate-200'
            }`}
          >
            {/* Cabeçalho do Painel do Sumário */}
            <div className={`p-4 border-b flex items-center justify-between transition-colors ${
              isDark ? 'border-[#30363d]/60 bg-black/15' : 'border-slate-100 bg-slate-50/60'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isDark ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                }`}>
                  <BookOpen size={15} weight="duotone" />
                </div>
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Sumário de Aulas
                  </h3>
                  <span className={`text-[10px] block ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {currentTrack?.name.split(':')[1]?.trim() || currentTrack?.name || 'Trilha Ativa'}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                isDark ? 'bg-cyan-950 text-cyan-400 border-cyan-800/50' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
              }`}>
                {chapters.length} {chapters.length === 1 ? 'aula' : 'aulas'}
              </span>
            </div>

            {/* Lista Rolável de Capítulos */}
            <div className="p-2 space-y-1 overflow-y-auto max-h-[520px] custom-scrollbar">
              {chapters.map((ch, idx) => {
                const isSelected = ch.id === selectedChapterId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      soundFx.playTick();
                      setSelectedChapterId(ch.id);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 text-xs cursor-pointer border group relative ${
                      isSelected
                        ? isDark 
                          ? 'bg-cyan-500/12 border-cyan-500/40 text-white shadow-xs font-bold' 
                          : 'bg-cyan-50/80 border-cyan-300 text-cyan-950 shadow-xs font-bold'
                        : isDark 
                          ? 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]' 
                          : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {/* Badge Numérico / Ícone de Estado */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/40 scale-105'
                        : isDark
                          ? 'bg-[#1c2128] text-gray-400 border border-gray-700/50 group-hover:border-gray-600 group-hover:text-gray-300'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-slate-300 group-hover:text-slate-800'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    {/* Metadados e Título */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className={`text-[10px] font-mono flex items-center gap-1 ${
                          isSelected ? (isDark ? 'text-cyan-300 font-semibold' : 'text-cyan-700 font-semibold') : 'text-gray-400'
                        }`}>
                          <Clock size={11} weight="bold" />
                          <span>{ch.duration}</span>
                        </span>

                        {ch.level && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold border ${getLevelBadgeColor(ch.level, isDark)}`}>
                            {ch.level}
                          </span>
                        )}

                        {ch.badge && (
                          <span className={`text-[9px] font-mono px-1 rounded opacity-70 hidden sm:inline-block ${
                            isDark ? 'text-gray-400' : 'text-slate-500'
                          }`}>
                            {ch.badge}
                          </span>
                        )}
                      </div>

                      <div className={`text-xs truncate transition-colors ${
                        isSelected 
                          ? isDark ? 'text-white' : 'text-slate-900' 
                          : isDark ? 'text-gray-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'
                      }`}>
                        {ch.title.split(':')[1]?.trim() || ch.title}
                      </div>
                    </div>

                    {/* Indicador de Seleção à Direita */}
                    <div className="shrink-0 flex items-center">
                      <CaretRight 
                        size={15} 
                        weight="bold" 
                        className={`transition-transform duration-200 ${
                          isSelected 
                            ? 'text-cyan-400 translate-x-0.5' 
                            : 'text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5'
                        }`} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Rodapé Informativo da Trilha */}
            <div className={`p-3.5 border-t mt-auto flex items-center justify-between text-[11px] transition-colors ${
              isDark ? 'border-[#30363d]/60 bg-black/10' : 'border-slate-100 bg-slate-50/50'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkle size={14} weight="duotone" className="text-cyan-400 shrink-0" />
                <span className={`text-[10px] font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {totalMinutes} min de imersão prática
                </span>
              </div>
              <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                ADVPL / TLPP
              </span>
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
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isDark ? 'bg-cyan-950 text-cyan-400 border-cyan-800/40' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                  }`}>
                    {currentChapter.badge}
                  </span>
                  <span className={`text-xs flex items-center gap-1 font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    <Clock size={13} weight="bold" />
                    <span>{currentChapter.duration} de imersão</span>
                  </span>
                  {currentChapter.level && (
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold border ${getLevelBadgeColor(currentChapter.level, isDark)}`}>
                      {currentChapter.level}
                    </span>
                  )}
                </div>

                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {currentChapter.title}
                </h2>
              </div>

              {currentChapter.snippetCode && (
                <button
                  onClick={() => handleLoadSnippet(currentChapter.snippetCode)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
                >
                  <span>Abrir Fonte no Editor</span>
                  <ArrowRight size={14} weight="bold" />
                </button>
              )}
            </div>

            {/* Descrição em Prosa de Consultoria */}
            <div className="space-y-1">
              <h3 className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Visão Geral & Fundamentação
              </h3>
              <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                {currentChapter.description}
              </p>
            </div>

            {/* Pontos-Chave e Diretrizes do TDN */}
            {currentChapter.keyPoints && currentChapter.keyPoints.length > 0 && (
              <div className="space-y-3 pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Sparkle size={16} weight="fill" />
                  <span>Diretrizes e Boas Práticas Oficiais (TDN & CodeAnalysis)</span>
                </div>

                <div className="space-y-2">
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
                  <div className="flex items-center gap-2">
                    <TerminalWindow size={15} weight="bold" className="text-cyan-400" />
                    <span className={`font-semibold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      Implementação Oficial de Referência:
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleCopyCode(currentChapter.snippetCode)}
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    {isCopied ? <Check size={14} weight="bold" className="text-emerald-400" /> : <Copy size={14} weight="bold" />}
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

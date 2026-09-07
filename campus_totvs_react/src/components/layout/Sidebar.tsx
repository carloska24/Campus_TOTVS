import React from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { LESSONS_DATABASE } from '../../data/lessons';
import { soundFx } from '../../utils/audio';
import { BookOpen, Trophy, PencilSimple } from '@phosphor-icons/react';

export const Sidebar: React.FC = () => {
  const { 
    activeLessonId, 
    setActiveLessonId, 
    completedChallenges, 
    userCodes,
    theme 
  } = useCampusStore();

  const isDark = theme === 'dark';

  // Agrupamento por módulo
  const moduleGroups = React.useMemo(() => {
    const groups: Record<string, typeof LESSONS_DATABASE> = {};
    LESSONS_DATABASE.forEach((lesson) => {
      if (!groups[lesson.module]) groups[lesson.module] = [];
      groups[lesson.module].push(lesson);
    });
    return groups;
  }, []);

  return (
    <aside 
      className={`w-72 h-[calc(100vh-3.5rem)] border-r flex flex-col shrink-0 select-none overflow-y-auto transition-colors duration-200 ${
        isDark 
          ? 'bg-[#0d1117] border-[#30363d]' 
          : 'bg-[#f8fafc] border-[#e2e8f0]'
      }`}
    >
      <div 
        className={`p-3 border-b flex items-center justify-between ${
          isDark ? 'border-[#30363d] bg-[#161b22]' : 'border-[#e2e8f0] bg-white'
        }`}
      >
        <div className="text-[11px] font-bold tracking-wider text-cyan-500 uppercase flex items-center gap-1.5">
          <BookOpen weight="duotone" className="w-3.5 h-3.5" />
          <span>Trilha de Aprendizado</span>
        </div>
        <span 
          className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
            isDark 
              ? 'bg-[#21262d] text-cyan-400 border border-cyan-800/30' 
              : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
          }`}
        >
          {LESSONS_DATABASE.length} Aulas
        </span>
      </div>

      <div className="p-2 space-y-4">
        {Object.entries(moduleGroups).map(([moduleName, lessons]) => (
          <div key={moduleName} className="space-y-1">
            <div 
              className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                isDark ? 'text-gray-400' : 'text-slate-500'
              }`}
            >
              <span>▪</span>
              <span>{moduleName}</span>
            </div>

            <div className="space-y-0.5">
              {lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                const isCompleted = !!completedChallenges[lesson.id];
                
                const savedCode = userCodes[lesson.id] !== undefined 
                  ? userCodes[lesson.id] 
                  : (typeof window !== 'undefined' ? localStorage.getItem('totvs_user_code_' + lesson.id) : null);
                
                const isModified = savedCode !== null && savedCode !== undefined && savedCode !== lesson.code;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      soundFx.playTick();
                      setActiveLessonId(lesson.id);
                    }}
                    className={`w-full text-left p-2 rounded-lg transition-all flex items-center justify-between gap-2 text-xs group cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-[#1f2937] text-white font-semibold border border-cyan-500/40 shadow-sm'
                          : 'bg-white text-cyan-800 font-bold border border-cyan-400 shadow-sm'
                        : isDark 
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-[#161b22]' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span 
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 transition-colors ${
                          isActive
                            ? 'bg-cyan-600 text-white font-bold'
                            : isDark 
                              ? 'bg-[#21262d] text-cyan-300 group-hover:bg-[#30363d]' 
                              : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                        }`}
                      >
                        {lesson.badge}
                      </span>
                      <span className="truncate text-xs">
                        {lesson.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isModified && (
                        <span title="Código com edições salvas">
                          <PencilSimple weight="bold" className="w-3.5 h-3.5 text-amber-400" />
                        </span>
                      )}
                      {isCompleted && (
                        <span title="Missão prática concluída!">
                          <Trophy weight="fill" className="w-3.5 h-3.5 text-emerald-400" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

import React from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { LESSONS_DATABASE } from '../../data/lessons';
import { soundFx } from '../../utils/audio';
import { BookOpen, Award, Edit3 } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeLessonId, 
    setActiveLessonId, 
    completedChallenges, 
    userCodes 
  } = useCampusStore();

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
    <aside className="w-72 h-[calc(100vh-3.5rem)] bg-[#0d1117] border-r border-[#30363d] flex flex-col shrink-0 select-none overflow-y-auto">
      <div className="p-3 border-b border-[#30363d] flex items-center justify-between">
        <div className="text-[11px] font-bold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Trilha de Aprendizado</span>
        </div>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262d] text-cyan-400 font-mono">
          {LESSONS_DATABASE.length} Aulas
        </span>
      </div>

      <div className="p-2 space-y-4">
        {Object.entries(moduleGroups).map(([moduleName, lessons]) => (
          <div key={moduleName} className="space-y-1">
            <div className="px-2 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
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
                    className={`w-full text-left p-2 rounded-md transition-all flex items-center justify-between gap-2 text-xs group cursor-pointer ${
                      isActive
                        ? 'bg-[#1f2937] text-white font-medium border border-cyan-500/40 shadow-sm'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#161b22]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-1.5 py-0.5 rounded bg-[#21262d] group-hover:bg-[#30363d] text-[10px] font-mono text-cyan-300 shrink-0">
                        {lesson.badge}
                      </span>
                      <span className="truncate text-xs">
                        {lesson.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isModified && (
                        <span title="Código com edições salvas">
                          <Edit3 className="w-3 h-3 text-amber-400" />
                        </span>
                      )}
                      {isCompleted && (
                        <span title="Missão prática concluída!">
                          <Award className="w-3.5 h-3.5 text-emerald-400" />
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

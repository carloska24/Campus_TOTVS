import React from 'react';
import { useCampusStore, type CampusTab } from '../../store/useCampusStore';
import { soundFx } from '../../utils/audio';
import { 
  FlaskConical, 
  Layers, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  Sun, 
  Moon 
} from 'lucide-react';

interface HeaderNavProps {
  onRunCode: () => void;
  onGradeCode: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onRunCode, onGradeCode }) => {
  const { 
    activeTab, 
    setActiveTab, 
    userXp, 
    theme, 
    toggleTheme, 
    resetCurrentLesson 
  } = useCampusStore();

  const navItems: { id: CampusTab; label: string; icon: React.ReactNode }[] = [
    { id: 'lab', label: 'Laboratório', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'modulos', label: 'Módulos ERP (SIGA)', icon: <Layers className="w-4 h-4" /> },
    { id: 'dicionario', label: 'Dicionário SX', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'masterclass', label: 'Masterclass (01 a 08)', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'carreira', label: 'Trilha de Carreira', icon: <Trophy className="w-4 h-4" /> }
  ];

  const handleReset = () => {
    soundFx.playTick();
    resetCurrentLesson();
  };

  return (
    <header className="h-14 bg-[#161b22] border-b border-[#30363d] px-4 flex items-center justify-between select-none z-30">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0284c7] to-[#06b6d4] flex items-center justify-center font-bold text-white shadow-md shadow-cyan-900/30">
          T
        </div>
        <div>
          <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
            Campus TOTVS
            <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
              Protheus 2026
            </span>
          </div>
          <div className="text-[10px] text-gray-400 -mt-0.5 tracking-wide">
            PLATAFORMA OFICIAL DE CAPACITAÇÃO
          </div>
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex items-center gap-1 bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundFx.playTick();
                setActiveTab(item.id);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#21262d] text-cyan-400 shadow-sm border border-[#38bdf8]/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#1c2128]'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Quick Actions & Profile */}
      <div className="flex items-center gap-2.5">
        {/* XP Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#21262d] border border-amber-500/30 text-xs font-semibold text-amber-400 shadow-inner">
          <span>⚡</span>
          <span>{userXp} XP</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
          className="p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-[#21262d] border border-transparent hover:border-[#30363d] transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Reset Lesson Code Button */}
        {activeTab === 'lab' && (
          <button
            onClick={handleReset}
            title="Restaura o código original limpo da aula ativa e reseta o desafio"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-gray-300 hover:text-white text-xs font-medium border border-[#30363d] transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
            <span>Resetar Aula</span>
          </button>
        )}

        {/* Execute Run Button */}
        <button
          onClick={() => {
            soundFx.playTick();
            onRunCode();
          }}
          title="Executar código no simulador Protheus (F5)"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-900/30 transition-all cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Executar</span>
        </button>

        {/* Grade Challenge Button */}
        <button
          onClick={() => {
            soundFx.playTick();
            onGradeCode();
          }}
          title="Auditar código e validar objetivos da missão (F9)"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-semibold shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Validar Desafio</span>
        </button>
      </div>
    </header>
  );
};

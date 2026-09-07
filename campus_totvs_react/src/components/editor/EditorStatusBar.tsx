import React from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { TerminalWindow, Sparkle } from '@phosphor-icons/react';

interface EditorStatusBarProps {
  currentLine: number;
}

export const EditorStatusBar: React.FC<EditorStatusBarProps> = ({ currentLine }) => {
  const { theme } = useCampusStore();
  const isDark = theme === 'dark';

  return (
    <div 
      className={`h-7 px-3 border-t flex items-center justify-between text-[11px] select-none font-mono shrink-0 transition-colors ${
        isDark 
          ? 'bg-[#161b22] border-[#30363d] text-gray-400' 
          : 'bg-[#f8fafc] border-[#e2e8f0] text-slate-500'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
          <TerminalWindow size={13} weight="bold" />
          <span>ADVPL / TLPP 2026</span>
        </div>

        <span className="opacity-40">|</span>

        <span className={isDark ? 'text-gray-300' : 'text-slate-700'}>
          Ln {currentLine}, Col 1
        </span>

        <span className="opacity-40">|</span>

        <span>Espaços: 4</span>

        <span className="opacity-40">|</span>

        <span>UTF-8</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-[10px] text-fuchsia-400">
          <Sparkle size={13} weight="fill" />
          <span>Tutor IA Ativo</span>
        </div>
      </div>
    </div>
  );
};

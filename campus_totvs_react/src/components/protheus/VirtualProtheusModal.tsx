import React from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { X, CheckCircle2, AlertTriangle, Monitor } from 'lucide-react';

export const VirtualProtheusModal: React.FC = () => {
  const { isProtheusModalOpen, openProtheusModal, protheusOutput, theme } = useCampusStore();
  const isDark = theme === 'dark';

  if (!isProtheusModalOpen || !protheusOutput) return null;

  const { title, message, isError } = protheusOutput;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
      {/* SmartClient Simulated Window */}
      <div 
        className={`border rounded-xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col font-sans transition-colors ${
          isDark 
            ? 'bg-[#1e293b] border-[#475569]' 
            : 'bg-white border-[#cbd5e1]'
        }`}
      >
        {/* Protheus Window Titlebar */}
        <div 
          className={`h-9 border-b px-3 flex items-center justify-between select-none ${
            isDark 
              ? 'bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-[#334155] text-gray-200' 
              : 'bg-gradient-to-r from-slate-100 to-slate-200 border-slate-300 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold">
            <Monitor className="w-3.5 h-3.5 text-cyan-500" />
            <span className="truncate">{title || 'TOTVS Protheus - SmartClient'}</span>
          </div>
          <button
            onClick={() => openProtheusModal(false)}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-0.5 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Protheus Dialog Body */}
        <div className={`p-5 text-xs flex gap-4 items-start ${isDark ? 'bg-[#0f172a] text-gray-200' : 'bg-slate-50 text-slate-800'}`}>
          <div className="mt-0.5 shrink-0">
            {isError ? (
              <AlertTriangle className="w-7 h-7 text-rose-500" />
            ) : (
              <CheckCircle2 className="w-7 h-7 text-cyan-500" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <pre 
              className={`font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto p-3.5 rounded-lg border shadow-inner ${
                isDark 
                  ? 'bg-[#090d16] border-[#1e293b] text-gray-200' 
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {message}
            </pre>
          </div>
        </div>

        {/* Protheus Dialog Footer */}
        <div 
          className={`p-3 border-t flex justify-end ${
            isDark ? 'bg-[#1e293b] border-[#334155]' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            onClick={() => openProtheusModal(false)}
            className="px-6 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

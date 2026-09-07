import React from 'react';
import { useCampusStore } from '../../store/useCampusStore';
import { X, CheckCircle2, AlertTriangle, Monitor } from 'lucide-react';

export const VirtualProtheusModal: React.FC = () => {
  const { isProtheusModalOpen, openProtheusModal, protheusOutput } = useCampusStore();

  if (!isProtheusModalOpen || !protheusOutput) return null;

  const { title, message, isError } = protheusOutput;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
      {/* SmartClient Simulated Window */}
      <div className="bg-[#1e293b] border border-[#475569] rounded-lg w-full max-w-xl shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Protheus Window Titlebar */}
        <div className="h-8 bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-b border-[#334155] px-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-200">
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate">{title || 'TOTVS Protheus - SmartClient'}</span>
          </div>
          <button
            onClick={() => openProtheusModal(false)}
            className="text-gray-400 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Protheus Dialog Body */}
        <div className="p-5 bg-[#0f172a] text-gray-200 text-xs flex gap-4 items-start">
          <div className="mt-0.5 shrink-0">
            {isError ? (
              <AlertTriangle className="w-7 h-7 text-red-400" />
            ) : (
              <CheckCircle2 className="w-7 h-7 text-cyan-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <pre className="font-mono text-[11.5px] leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto p-3 bg-[#090d16] rounded border border-[#1e293b] text-gray-200">
              {message}
            </pre>
          </div>
        </div>

        {/* Protheus Dialog Footer */}
        <div className="p-2.5 bg-[#1e293b] border-t border-[#334155] flex justify-end">
          <button
            onClick={() => openProtheusModal(false)}
            className="px-5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

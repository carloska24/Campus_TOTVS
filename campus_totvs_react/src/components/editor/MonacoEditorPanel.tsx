import React, { useRef } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useCampusStore } from '../../store/useCampusStore';
import { setupMonacoAdvpl } from '../../utils/monacoConfig';
import { soundFx } from '../../utils/audio';
import { RotateCcw, FileCode, CheckCircle2, AlertCircle } from 'lucide-react';

interface MonacoEditorPanelProps {
  onSelectLine?: (lineNumber: number) => void;
}

export const MonacoEditorPanel: React.FC<MonacoEditorPanelProps> = ({ onSelectLine }) => {
  const { 
    getCurrentLesson, 
    getCurrentCode, 
    setUserCode, 
    isCurrentCodeModified, 
    resetCurrentLesson, 
    theme 
  } = useCampusStore();

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const lesson = getCurrentLesson();
  const currentCode = getCurrentCode();
  const isModified = isCurrentCodeModified();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    setupMonacoAdvpl(monaco);

    // Evento de alteração de posição do cursor para atualizar o tutor/inspetor
    editor.onDidChangeCursorPosition((e) => {
      if (onSelectLine) {
        onSelectLine(e.position.lineNumber);
      }
    });
  };

  const handleReset = () => {
    soundFx.playTick();
    resetCurrentLesson();
    if (editorRef.current && lesson) {
      editorRef.current.setValue(lesson.code);
      editorRef.current.setPosition({ lineNumber: 1, column: 1 });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] bg-[#0d1117] overflow-hidden border-r border-[#30363d]">
      {/* Tab bar / Toolbar */}
      <div className="h-10 bg-[#161b22] border-b border-[#30363d] px-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#21262d] text-cyan-300 text-xs font-mono border border-cyan-800/40">
            <FileCode className="w-3.5 h-3.5" />
            <span>{lesson ? lesson.badge : 'Editor'}</span>
          </div>

          {isModified ? (
            <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <AlertCircle className="w-3 h-3" />
              <span>Modificado</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              <span>Original Limpo</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-[11px] text-gray-400 hidden sm:flex items-center gap-1">
            <span>💡</span>
            <span>Atalhos: <kbd className="px-1 py-0.5 rounded bg-[#21262d] text-gray-300 font-mono">F5</kbd> Executar | <kbd className="px-1 py-0.5 rounded bg-[#21262d] text-gray-300 font-mono">F9</kbd> Validar</span>
          </div>

          {isModified && (
            <button
              onClick={handleReset}
              title="Restaurar o código original limpo desta aula e zerar o checklist"
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-amber-300 hover:text-white text-xs font-medium border border-amber-500/30 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restaurar Código</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 w-full h-full relative">
        <Editor
          height="100%"
          language="advpl"
          value={currentCode}
          theme={theme === 'light' ? 'totvs-light-plus' : 'totvs-dark-plus'}
          onMount={handleEditorDidMount}
          onChange={(value) => {
            if (lesson && value !== undefined) {
              setUserCode(lesson.id, value);
            }
          }}
          options={{
            fontSize: 13.5,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            lineHeight: 22,
            minimap: { enabled: false },
            bracketPairColorization: { enabled: true },
            renderWhitespace: 'selection',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true
          }}
        />
      </div>
    </div>
  );
};

import React, { useRef, useState } from 'react';
import Editor, { type OnMount, type BeforeMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useCampusStore } from '../../store/useCampusStore';
import { setupMonacoAdvpl } from '../../utils/monacoConfig';
import { soundFx } from '../../utils/audio';
import { EditorStatusBar } from './EditorStatusBar';
import { ArrowCounterClockwise, FileCode, CheckCircle, WarningCircle, Lightbulb } from '@phosphor-icons/react';

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

  const [activeLine, setActiveLine] = useState(1);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const lesson = getCurrentLesson();
  const currentCode = getCurrentCode();
  const isModified = isCurrentCodeModified();
  const isDark = theme === 'dark';

  // Configuração pré-montagem: garante que o tema e gramática ADVPL existam ANTES da criação da instância
  const handleEditorWillMount: BeforeMount = (monaco) => {
    setupMonacoAdvpl(monaco);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    setupMonacoAdvpl(monaco);
    monaco.editor.setTheme(isDark ? 'totvs-dark-plus' : 'totvs-light-plus');

    // Evento de alteração de posição do cursor para atualizar o tutor/inspetor
    editor.onDidChangeCursorPosition((e) => {
      const line = e.position.lineNumber;
      setActiveLine(line);
      if (onSelectLine) {
        onSelectLine(line);
      }
    });
  };

  const handleReset = () => {
    soundFx.playTick();
    resetCurrentLesson();
    if (editorRef.current && lesson) {
      editorRef.current.setValue(lesson.code);
      editorRef.current.setPosition({ lineNumber: 1, column: 1 });
      setActiveLine(1);
      if (onSelectLine) onSelectLine(1);
    }
  };

  return (
    <div 
      className={`flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden border-r transition-colors duration-200 ${
        isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-[#ffffff] border-[#e2e8f0]'
      }`}
    >
      {/* Tab bar / Toolbar */}
      <div 
        className={`h-10 border-b px-3 flex items-center justify-between select-none shrink-0 ${
          isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-[#f8fafc] border-[#e2e8f0]'
        }`}
      >
        <div className="flex items-center gap-2">
          <div 
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border font-semibold ${
              isDark 
                ? 'bg-[#21262d] text-cyan-300 border-cyan-800/40' 
                : 'bg-white text-cyan-700 border-slate-200 shadow-sm'
            }`}
          >
            <FileCode weight="duotone" className="w-3.5 h-3.5" />
            <span>{lesson ? lesson.badge : 'Editor'}</span>
          </div>

          {isModified ? (
            <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/30">
              <WarningCircle weight="bold" className="w-3 h-3" />
              <span>Modificado</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
              <CheckCircle weight="fill" className="w-3 h-3" />
              <span>Original Limpo</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className={`text-[11px] hidden sm:flex items-center gap-1.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            <Lightbulb weight="duotone" className="w-3.5 h-3.5 text-amber-400" />
            <span>Clique em qualquer linha para inspecionar & ouvir a IA</span>
          </div>

          {isModified && (
            <button
              onClick={handleReset}
              title="Restaurar o código original limpo desta aula e zerar o checklist"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-[#21262d] hover:bg-[#30363d] text-amber-300 hover:text-white border-amber-500/30' 
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
              }`}
            >
              <ArrowCounterClockwise weight="bold" className="w-3 h-3" />
              <span>Restaurar Código</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Container */}
      <div className={`flex-1 w-full h-full relative ${isDark ? 'bg-[#161b22]' : 'bg-[#ffffff]'}`}>
        <Editor
          height="100%"
          language="advpl"
          value={currentCode}
          theme={isDark ? 'totvs-dark-plus' : 'totvs-light-plus'}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          loading={
            <div className={`h-full w-full flex items-center justify-center font-mono text-xs ${
              isDark ? 'bg-[#161b22] text-gray-500' : 'bg-white text-gray-400'
            }`}>
              Carregando editor ADVPL...
            </div>
          }
          onChange={(value) => {
            if (lesson && value !== undefined) {
              setUserCode(lesson.id, value);
            }
          }}
          options={{
            fontSize: 13.5,
            fontFamily: "var(--font-mono)",
            fontLigatures: false, // Desativado para fins educacionais ADVPL
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

      {/* Status Bar Inferior */}
      <EditorStatusBar currentLine={activeLine} />
    </div>
  );
};

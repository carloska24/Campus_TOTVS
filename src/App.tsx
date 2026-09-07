import React, { useState, useEffect, useCallback } from 'react';
import { useCampusStore } from './store/useCampusStore';
import { HeaderNav } from './components/layout/HeaderNav';
import { Sidebar } from './components/layout/Sidebar';
import { MonacoEditorPanel } from './components/editor/MonacoEditorPanel';
import { RightPanel } from './components/layout/RightPanel';
import { GraderModal } from './components/challenge/GraderModal';
import { VirtualProtheusModal } from './components/protheus/VirtualProtheusModal';
import { ModulosView } from './components/views/ModulosView';
import { DicionarioView } from './components/views/DicionarioView';
import { MasterclassView } from './components/views/MasterclassView';
import { CarreiraView } from './components/views/CarreiraView';
import { gradeLessonChallenge } from './utils/grader';
import { runProtheusCode } from './utils/protheusRunner';
import { soundFx } from './utils/audio';
import type { IGradeResult } from './types/lesson';

export const App: React.FC = () => {
  const { 
    activeTab, 
    getCurrentLesson, 
    getCurrentCode, 
    setUserCode, 
    openGraderModal, 
    openProtheusModal 
  } = useCampusStore();

  const [currentLine, setCurrentLine] = useState(1);
  const [gradeResult, setGradeResult] = useState<IGradeResult | null>(null);

  const handleRunCode = useCallback(() => {
    const lesson = getCurrentLesson();
    const code = getCurrentCode();
    if (!lesson) return;

    const result = runProtheusCode(code, lesson.id);
    if (result.success) {
      soundFx.playSuccess();
    } else {
      soundFx.playError();
    }
    openProtheusModal(true, {
      title: result.title,
      message: result.output,
      isError: !result.success
    });
  }, [getCurrentLesson, getCurrentCode, openProtheusModal]);

  const handleGradeCode = useCallback(() => {
    const lesson = getCurrentLesson();
    const code = getCurrentCode();
    if (!lesson) return;

    // Simula execução preliminar para validar critérios baseados em output
    const runResult = runProtheusCode(code, lesson.id);
    const result = gradeLessonChallenge(lesson, code, runResult.success, runResult.output);

    setGradeResult(result);
    openGraderModal(true);

    if (result.passed) {
      soundFx.playSuccess();
    } else {
      soundFx.playTick();
    }
  }, [getCurrentLesson, getCurrentCode, openGraderModal]);

  const handleApplySolution = () => {
    const lesson = getCurrentLesson();
    if (!lesson || !lesson.challenge || !lesson.challenge.solution) return;
    
    soundFx.playSuccess();
    const solvedCode = lesson.code + '\n\n// --- SOLUÇÃO OFICIAL DO DESAFIO ---\n' + lesson.challenge.solution;
    setUserCode(lesson.id, solvedCode);
  };

  // Atalhos de Teclado Globais (F5 = Executar, F9 = Validar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F5') {
        e.preventDefault();
        handleRunCode();
      } else if (e.key === 'F9') {
        e.preventDefault();
        handleGradeCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode, handleGradeCode]);

  return (
    <div 
      className="w-screen h-screen flex flex-col font-sans overflow-hidden select-none transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-main)' }}
    >
      {/* Barra de Navegação Superior */}
      <HeaderNav onRunCode={handleRunCode} onGradeCode={handleGradeCode} />

      {/* Conteúdo Central Alternável por Aba */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'lab' && (
          <>
            {/* Barra Lateral de Aulas */}
            <Sidebar />

            {/* Painel Central do Monaco Editor */}
            <div className="flex-1 flex flex-col h-full min-w-0">
              <MonacoEditorPanel onSelectLine={(line) => setCurrentLine(line)} />
            </div>

            {/* Painel Lateral Direito: Inspetor & Tutor IA (Áudio + Equalizador) + Missão Prática */}
            <RightPanel 
              currentLine={currentLine} 
              onGradeCode={handleGradeCode} 
              onRunCode={handleRunCode} 
            />
          </>
        )}

        {activeTab === 'modulos' && <ModulosView />}
        {activeTab === 'dicionario' && <DicionarioView />}
        {activeTab === 'masterclass' && <MasterclassView />}
        {activeTab === 'carreira' && <CarreiraView />}
      </main>

      {/* Modal de Auditoria e Correção */}
      <GraderModal 
        gradeResult={gradeResult} 
        onApplySolution={handleApplySolution} 
      />

      {/* Modal de Simulação Protheus Virtual */}
      <VirtualProtheusModal />
    </div>
  );
};

export default App;

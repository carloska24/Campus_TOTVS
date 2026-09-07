import { create } from 'zustand';
import { LESSONS_DATABASE } from '../data/lessons';
import type { ILesson } from '../types/lesson';

export type CampusTab = 'lab' | 'modulos' | 'dicionario' | 'masterclass' | 'carreira';

interface CampusState {
  activeTab: CampusTab;
  activeLessonId: string;
  userCodes: Record<string, string>;
  completedChallenges: Record<string, boolean>;
  questTasks: Record<string, Record<number, boolean>>;
  userXp: number;
  theme: 'dark' | 'light';
  
  isGraderModalOpen: boolean;
  isProtheusModalOpen: boolean;
  protheusOutput: { title: string; message: string; isError?: boolean } | null;
  
  // Getters
  getCurrentLesson: () => ILesson;
  getCurrentCode: () => string;
  isCurrentCodeModified: () => boolean;
  
  // Actions
  setActiveTab: (tab: CampusTab) => void;
  setActiveLessonId: (id: string) => void;
  setUserCode: (lessonId: string, code: string) => void;
  resetCurrentLesson: () => void;
  resetAllChallenges: () => void;
  toggleTask: (lessonId: string, taskIdx: number) => void;
  setChallengeCompleted: (lessonId: string, xp: number) => void;
  openGraderModal: (open: boolean) => void;
  openProtheusModal: (open: boolean, output?: { title: string; message: string; isError?: boolean }) => void;
  toggleTheme: () => void;
}

const STORAGE_CODES_PREFIX = 'totvs_user_code_';
const STORAGE_COMPLETED = 'totvs_campus_completed_challenges';
const STORAGE_TASKS_PREFIX = 'totvs_quest_tasks_';
const STORAGE_XP = 'totvs_campus_user_xp';
const STORAGE_THEME = 'totvs_campus_theme';

// Inicializador seguro de localStorage
const getSavedCompleted = (): Record<string, boolean> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_COMPLETED) || '{}');
  } catch {
    return {};
  }
};

const getSavedXp = (): number => {
  try {
    return parseInt(localStorage.getItem(STORAGE_XP) || '0', 10);
  } catch {
    return 0;
  }
};

const getSavedTheme = (): 'dark' | 'light' => {
  try {
    const saved = localStorage.getItem(STORAGE_THEME);
    const theme = saved === 'light' ? 'light' : 'dark';
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.classList.toggle('light', theme === 'light');
    }
    return theme;
  } catch {
    return 'dark';
  }
};

export const useCampusStore = create<CampusState>((set, get) => ({
  activeTab: 'lab',
  activeLessonId: 'aula01',
  userCodes: {},
  completedChallenges: getSavedCompleted(),
  questTasks: {},
  userXp: getSavedXp(),
  theme: getSavedTheme(),
  
  isGraderModalOpen: false,
  isProtheusModalOpen: false,
  protheusOutput: null,

  getCurrentLesson: () => {
    const { activeLessonId } = get();
    return LESSONS_DATABASE.find(l => l.id === activeLessonId) || LESSONS_DATABASE[0];
  },

  getCurrentCode: () => {
    const { activeLessonId, userCodes } = get();
    if (userCodes[activeLessonId] !== undefined) {
      return userCodes[activeLessonId];
    }
    const saved = localStorage.getItem(STORAGE_CODES_PREFIX + activeLessonId);
    if (saved !== null) {
      return saved;
    }
    const lesson = get().getCurrentLesson();
    return lesson ? lesson.code : '';
  },

  isCurrentCodeModified: () => {
    const currentCode = get().getCurrentCode();
    const lesson = get().getCurrentLesson();
    return !!lesson && currentCode !== lesson.code;
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setActiveLessonId: (id) => set({ activeLessonId: id }),

  setUserCode: (lessonId, code) => {
    localStorage.setItem(STORAGE_CODES_PREFIX + lessonId, code);
    set((state) => ({
      userCodes: { ...state.userCodes, [lessonId]: code }
    }));
  },

  resetCurrentLesson: () => {
    const { activeLessonId } = get();
    const lesson = get().getCurrentLesson();
    if (!lesson) return;

    localStorage.removeItem(STORAGE_CODES_PREFIX + activeLessonId);
    localStorage.removeItem(STORAGE_TASKS_PREFIX + activeLessonId);

    set((state) => {
      const nextCompleted = { ...state.completedChallenges };
      delete nextCompleted[activeLessonId];
      localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(nextCompleted));

      const nextCodes = { ...state.userCodes };
      delete nextCodes[activeLessonId];

      const nextTasks = { ...state.questTasks };
      delete nextTasks[activeLessonId];

      return {
        completedChallenges: nextCompleted,
        userCodes: nextCodes,
        questTasks: nextTasks
      };
    });
  },

  resetAllChallenges: () => {
    localStorage.setItem(STORAGE_COMPLETED, JSON.stringify({}));
    LESSONS_DATABASE.forEach(l => {
      localStorage.removeItem(STORAGE_TASKS_PREFIX + l.id);
    });
    set({
      completedChallenges: {},
      questTasks: {}
    });
  },

  toggleTask: (lessonId, taskIdx) => {
    set((state) => {
      const currentLessonTasks = state.questTasks[lessonId] || {};
      const updated = {
        ...currentLessonTasks,
        [taskIdx]: !currentLessonTasks[taskIdx]
      };
      localStorage.setItem(STORAGE_TASKS_PREFIX + lessonId, JSON.stringify(updated));
      return {
        questTasks: {
          ...state.questTasks,
          [lessonId]: updated
        }
      };
    });
  },

  setChallengeCompleted: (lessonId, xp) => {
    set((state) => {
      if (state.completedChallenges[lessonId]) return state;
      const nextCompleted = { ...state.completedChallenges, [lessonId]: true };
      const nextXp = state.userXp + xp;
      localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(nextCompleted));
      localStorage.setItem(STORAGE_XP, nextXp.toString());
      return {
        completedChallenges: nextCompleted,
        userXp: nextXp
      };
    });
  },

  openGraderModal: (open) => set({ isGraderModalOpen: open }),

  openProtheusModal: (open, output) => set({
    isProtheusModalOpen: open,
    protheusOutput: output !== undefined ? output : null
  }),

  toggleTheme: () => {
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_THEME, next);
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.classList.toggle('dark', next === 'dark');
        document.documentElement.classList.toggle('light', next === 'light');
      }
      return { theme: next };
    });
  }
}));

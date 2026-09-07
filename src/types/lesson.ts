export interface ICriterion {
  id: number;
  title: string;
  pass: boolean;
  tip: string;
}

export interface IGradeResult {
  lessonId: string;
  lessonTitle: string;
  score: number;
  total: number;
  passed: boolean;
  criteria: ICriterion[];
}

export interface IChallenge {
  title: string;
  icon: string;
  badgeName: string;
  xp: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista' | 'Praticante';
  difficultyColor: string;
  description: string;
  objectives: string[];
  hint: string;
  solution: string;
}

export interface ILineExplanation {
  title: string;
  desc: string;
  audioHint?: string;
  tags?: string[];
}

export interface ILesson {
  id: string;
  module: string;
  title: string;
  badge: string;
  description: string;
  code: string;
  challenge?: IChallenge;
  lineExplanations?: Record<string, ILineExplanation>;
}

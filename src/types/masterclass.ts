export interface IMasterclassChapter {
  id: string;
  title: string;
  badge: string;
  duration: string;
  level: string;
  category: string;
  description: string;
  snippetCode: string;
  keyPoints: string[];
  lessonId?: string;
}

export interface IMasterclassTrack {
  id: string;
  name: string;
  icon: string;
  description: string;
  chapters: IMasterclassChapter[];
}

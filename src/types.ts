export type Imagination = {
  expression: string;
  time: string;
  mood: string;
  rain: string;
  note: string;
  sketch: string;
};

export type LessonOneProgress = {
  step: number;
  selectedAiScenes: string[];
  imagination: Imagination;
  samePoint: string;
  differentPoint: string;
  humanBasis: string;
  aiBasis: string;
  reflection: string;
  completed: boolean;
  updatedAt: string;
};

export type Slide = {
  kicker: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  visual:
    | 'cover'
    | 'question'
    | 'memory'
    | 'ai-scenes'
    | 'activity'
    | 'prompt'
    | 'imagination'
    | 'teacher-demo'
    | 'compare'
    | 'same-different'
    | 'why'
    | 'human'
    | 'ai'
    | 'summary';
};

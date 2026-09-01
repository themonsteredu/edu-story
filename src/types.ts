export type AiFunction = '추천' | '인식' | '분류' | '자동기계';

export type LessonOneProgress = {
  step: number;
  selectedAiScenes: string[];
  functionAnswers: Record<string, AiFunction>;
  evidenceCase: string;
  evidenceReason: string;
  aiBasis: string;
  automaticBasis: string;
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
    | 'observation'
    | 'ai-scenes'
    | 'worksheet'
    | 'automatic'
    | 'ai-data'
    | 'functions'
    | 'recommendation'
    | 'recognition'
    | 'classification'
    | 'sort'
    | 'answer'
    | 'caution'
    | 'summary';
};

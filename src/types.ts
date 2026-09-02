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

export type LessonTwoStoryId = 'sun-moon' | 'heungbu-nolbu' | 'good-brothers';

export type LessonTwoScenePlan = {
  characters: string;
  place: string;
  mood: string;
  detail: string;
};

export type LessonTwoProgress = {
  version: 2;
  step: number;
  storyId: LessonTwoStoryId | null;
  selectedCharacterIds: string[];
  selectedBackgroundIds: string[];
  eventOrder: string[];
  orderAttempts: number;
  orderConfirmed: boolean;
  scenePlanByEventId: Record<string, LessonTwoScenePlan>;
  completed: boolean;
  updatedAt: string;
};

export type LessonThreeDataKind = 'text' | 'image' | 'sound';

export type LessonThreeComparisonAnswer = 'different-data' | 'different-device' | 'different-title';

export type LessonThreeProgress = {
  version: 1;
  step: number;
  classificationAnswers: Record<string, LessonThreeDataKind>;
  classificationComplete: boolean;
  exploredBundleIds: string[];
  comparisonAnswer: LessonThreeComparisonAnswer | null;
  comparisonComplete: boolean;
  storyId: LessonTwoStoryId | null;
  sceneId: string;
  textClueId: string;
  imageClueId: string;
  soundClueId: string;
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

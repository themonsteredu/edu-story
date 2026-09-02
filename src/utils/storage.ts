import type { LessonOneProgress, LessonTwoProgress, LessonTwoScenePlan } from '../types';

export const STORAGE_KEYS = {
  progress: 'eduStory:lesson1:progress',
  lessonTwoProgress: 'eduStory:lesson2:v1',
  teacherAuth: 'eduStory:teacherAuth',
} as const;

export const initialProgress: LessonOneProgress = {
  step: 0,
  selectedAiScenes: [],
  functionAnswers: {},
  evidenceCase: '',
  evidenceReason: '',
  aiBasis: '',
  automaticBasis: '',
  reflection: '',
  completed: false,
  updatedAt: new Date(0).toISOString(),
};

export const initialLessonTwoProgress: LessonTwoProgress = {
  version: 2,
  step: 0,
  storyId: null,
  selectedCharacterIds: [],
  selectedBackgroundIds: [],
  eventOrder: [],
  orderAttempts: 0,
  orderConfirmed: false,
  scenePlanByEventId: {},
  completed: false,
  updatedAt: new Date(0).toISOString(),
};

export function readProgress(): LessonOneProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.progress);
    if (!raw) return initialProgress;
    const parsed = JSON.parse(raw) as Partial<LessonOneProgress>;
    return {
      ...initialProgress,
      ...parsed,
      functionAnswers: parsed.functionAnswers || {},
    };
  } catch {
    return initialProgress;
  }
}

export function writeProgress(progress: LessonOneProgress) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.progress,
      JSON.stringify({ ...progress, updatedAt: new Date().toISOString() }),
    );
  } catch {
    // The lesson stays usable when private browsing or device policy blocks storage.
  }
}

export function readLessonTwoProgress(): LessonTwoProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.lessonTwoProgress);
    if (!raw) return initialLessonTwoProgress;
    const parsed = JSON.parse(raw) as Partial<LessonTwoProgress> & {
      version?: number;
      detailByEventId?: Record<string, unknown>;
    };
    const storyIds = ['sun-moon', 'heungbu-nolbu', 'good-brothers'];
    const storyId = parsed.storyId && storyIds.includes(parsed.storyId) ? parsed.storyId : null;
    const storedStep = storyId && Number.isInteger(parsed.step) && Number(parsed.step) >= 0 && Number(parsed.step) <= 4
      ? Number(parsed.step)
      : 0;
    const isCurrentVersion = parsed.version === 2;
    const storedPlans = isCurrentVersion && parsed.scenePlanByEventId && typeof parsed.scenePlanByEventId === 'object'
      ? parsed.scenePlanByEventId
      : {};
    const scenePlanByEventId = Object.fromEntries(
      Object.entries(storedPlans).filter((entry): entry is [string, LessonTwoScenePlan] => {
        const plan = entry[1] as Partial<LessonTwoScenePlan> | null;
        return Boolean(
          plan
          && typeof plan.characters === 'string'
          && typeof plan.place === 'string'
          && typeof plan.mood === 'string'
          && typeof plan.detail === 'string',
        );
      }),
    );
    const completePlanCount = Object.values(scenePlanByEventId).filter(
      (plan) => plan.characters && plan.place && plan.mood && plan.detail,
    ).length;
    const hasSixCompletePlans = completePlanCount >= 6;
    const step = isCurrentVersion
      ? (storedStep === 4 && !hasSixCompletePlans ? 3 : storedStep)
      : Math.min(storedStep, 3);
    return {
      version: 2,
      step,
      storyId,
      selectedCharacterIds: Array.isArray(parsed.selectedCharacterIds) ? parsed.selectedCharacterIds : [],
      selectedBackgroundIds: Array.isArray(parsed.selectedBackgroundIds) ? parsed.selectedBackgroundIds : [],
      eventOrder: Array.isArray(parsed.eventOrder) ? parsed.eventOrder : [],
      orderAttempts: Number.isInteger(parsed.orderAttempts) && Number(parsed.orderAttempts) >= 0
        ? Number(parsed.orderAttempts)
        : 0,
      orderConfirmed: Boolean(parsed.orderConfirmed),
      scenePlanByEventId,
      completed: isCurrentVersion && hasSixCompletePlans ? Boolean(parsed.completed) : false,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : initialLessonTwoProgress.updatedAt,
    };
  } catch {
    return initialLessonTwoProgress;
  }
}

export function writeLessonTwoProgress(progress: LessonTwoProgress) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.lessonTwoProgress,
      JSON.stringify(progress),
    );
  } catch {
    // The lesson stays usable when private browsing or device policy blocks storage.
  }
}

export function isTeacherAuthenticated() {
  try {
    return localStorage.getItem(STORAGE_KEYS.teacherAuth) === 'true';
  } catch {
    return false;
  }
}

import type { LessonOneProgress, LessonTwoProgress } from '../types';

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
  version: 1,
  step: 0,
  storyId: null,
  selectedCharacterIds: [],
  selectedBackgroundIds: [],
  eventOrder: [],
  orderAttempts: 0,
  orderConfirmed: false,
  detailByEventId: {},
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
  localStorage.setItem(
    STORAGE_KEYS.progress,
    JSON.stringify({ ...progress, updatedAt: new Date().toISOString() }),
  );
}

export function readLessonTwoProgress(): LessonTwoProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.lessonTwoProgress);
    if (!raw) return initialLessonTwoProgress;
    const parsed = JSON.parse(raw) as Partial<LessonTwoProgress>;
    const storyIds = ['sun-moon', 'heungbu-nolbu', 'good-brothers'];
    const storyId = parsed.storyId && storyIds.includes(parsed.storyId) ? parsed.storyId : null;
    const step = storyId && Number.isInteger(parsed.step) && Number(parsed.step) >= 0 && Number(parsed.step) <= 4
      ? Number(parsed.step)
      : 0;
    return {
      ...initialLessonTwoProgress,
      ...parsed,
      version: 1,
      step,
      storyId,
      selectedCharacterIds: Array.isArray(parsed.selectedCharacterIds) ? parsed.selectedCharacterIds : [],
      selectedBackgroundIds: Array.isArray(parsed.selectedBackgroundIds) ? parsed.selectedBackgroundIds : [],
      eventOrder: Array.isArray(parsed.eventOrder) ? parsed.eventOrder : [],
      detailByEventId: parsed.detailByEventId || {},
    };
  } catch {
    return initialLessonTwoProgress;
  }
}

export function writeLessonTwoProgress(progress: LessonTwoProgress) {
  localStorage.setItem(
    STORAGE_KEYS.lessonTwoProgress,
    JSON.stringify(progress),
  );
}

export function isTeacherAuthenticated() {
  return localStorage.getItem(STORAGE_KEYS.teacherAuth) === 'true';
}

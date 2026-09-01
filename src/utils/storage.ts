import type { LessonOneProgress } from '../types';

export const STORAGE_KEYS = {
  progress: 'eduStory:lesson1:progress',
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

export function isTeacherAuthenticated() {
  return localStorage.getItem(STORAGE_KEYS.teacherAuth) === 'true';
}

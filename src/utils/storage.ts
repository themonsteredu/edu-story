import type { LessonOneProgress } from '../types';

export const STORAGE_KEYS = {
  progress: 'eduStory:lesson1:progress',
  lessonOpen: 'eduStory:lesson1:open',
  demoImage: 'eduStory:lesson1:demoImage',
  toolUrl: 'eduStory:lesson1:toolUrl',
  teacherAuth: 'eduStory:teacherAuth',
} as const;

export const initialProgress: LessonOneProgress = {
  step: 0,
  selectedAiScenes: [],
  imagination: {
    expression: '',
    time: '',
    mood: '',
    rain: '',
    note: '',
    sketch: '',
  },
  samePoint: '',
  differentPoint: '',
  humanBasis: '',
  aiBasis: '',
  reflection: '',
  completed: false,
  updatedAt: new Date(0).toISOString(),
};

export function readProgress(): LessonOneProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.progress);
    return raw ? { ...initialProgress, ...JSON.parse(raw) } : initialProgress;
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

export function isLessonOpen() {
  const raw = localStorage.getItem(STORAGE_KEYS.lessonOpen);
  return raw === null ? true : raw === 'true';
}

export function isTeacherAuthenticated() {
  return localStorage.getItem(STORAGE_KEYS.teacherAuth) === 'true';
}

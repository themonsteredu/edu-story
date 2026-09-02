import type {
  LessonOneProgress,
  LessonThreeComparisonAnswer,
  LessonThreeDataKind,
  LessonThreeProgress,
  LessonTwoProgress,
  LessonTwoScenePlan,
} from '../types';
import {
  lessonThreeBundles,
  lessonThreeClassifyCards,
  lessonThreeImageClues,
  lessonThreeSoundClues,
} from '../data/lesson3';
import { getLessonTwoStory } from '../data/lesson2';

export const STORAGE_KEYS = {
  progress: 'eduStory:lesson1:progress',
  lessonTwoProgress: 'eduStory:lesson2:v1',
  lessonThreeProgress: 'eduStory:lesson3:v1',
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

export const initialLessonThreeProgress: LessonThreeProgress = {
  version: 1,
  step: 0,
  classificationAnswers: {},
  classificationComplete: false,
  exploredBundleIds: [],
  comparisonAnswer: null,
  comparisonComplete: false,
  storyId: null,
  sceneId: '',
  textClueId: '',
  imageClueId: '',
  soundClueId: '',
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

const lessonThreeDataKinds = new Set<LessonThreeDataKind>(['text', 'image', 'sound']);
const lessonThreeComparisonAnswers = new Set<LessonThreeComparisonAnswer>([
  'different-data',
  'different-device',
  'different-title',
]);
const lessonThreeClassificationCardIds = new Set(
  lessonThreeClassifyCards.map((card) => card.id),
);
const lessonThreeExplorationIds = new Set(
  lessonThreeBundles.flatMap((bundle) => [
    `${bundle.id}:photo`,
    `${bundle.id}:sound`,
  ]),
);
const lessonThreeImageClueIds = new Set<string>(lessonThreeImageClues.map((clue) => clue.id));
const lessonThreeSoundClueIds = new Set<string>(lessonThreeSoundClues.map((clue) => clue.id));

export function readLessonThreeProgress(): LessonThreeProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.lessonThreeProgress);
    if (!raw) return initialLessonThreeProgress;
    const parsed = JSON.parse(raw) as Partial<LessonThreeProgress>;
    if (parsed.version !== 1) return initialLessonThreeProgress;

    const classificationAnswers = Object.fromEntries(
      Object.entries(parsed.classificationAnswers || {}).filter(
        (entry): entry is [string, LessonThreeDataKind] => (
          lessonThreeClassificationCardIds.has(entry[0])
          && lessonThreeDataKinds.has(entry[1] as LessonThreeDataKind)
        ),
      ),
    );
    const storyIds = ['sun-moon', 'heungbu-nolbu', 'good-brothers'];
    const storedComparisonAnswer = parsed.comparisonAnswer
      && lessonThreeComparisonAnswers.has(parsed.comparisonAnswer)
      ? parsed.comparisonAnswer
      : null;

    const classificationComplete = Boolean(parsed.classificationComplete)
      && lessonThreeClassifyCards.every(
        (card) => classificationAnswers[card.id] === card.kind,
      );
    const exploredBundleIds = Array.isArray(parsed.exploredBundleIds)
      ? [...new Set(parsed.exploredBundleIds.filter(
        (id): id is string => typeof id === 'string' && lessonThreeExplorationIds.has(id),
      ))]
      : [];
    const bothBundlesExplored = exploredBundleIds.length === lessonThreeExplorationIds.size;
    const comparisonAnswer = bothBundlesExplored ? storedComparisonAnswer : null;
    const comparisonComplete = parsed.comparisonComplete === true
      && comparisonAnswer === 'different-data'
      && bothBundlesExplored;
    const storyId = parsed.storyId && storyIds.includes(parsed.storyId) ? parsed.storyId : null;
    const selectedStory = storyId ? getLessonTwoStory(storyId) : null;
    const sceneId = typeof parsed.sceneId === 'string'
      && selectedStory?.events.some((event) => event.id === parsed.sceneId)
      ? parsed.sceneId
      : '';
    const lessonTwoSnapshot = readLessonTwoProgress();
    const savedPlan = sceneId && lessonTwoSnapshot.storyId === storyId
      ? lessonTwoSnapshot.scenePlanByEventId[sceneId]
      : undefined;
    const allowedTextClueIds = savedPlan?.mood && savedPlan.detail
      ? new Set(['event', 'mood', 'detail'])
      : new Set(['event', 'people', 'place']);
    const textClueId = typeof parsed.textClueId === 'string'
      && allowedTextClueIds.has(parsed.textClueId)
      ? parsed.textClueId
      : '';
    const imageClueId = typeof parsed.imageClueId === 'string'
      && lessonThreeImageClueIds.has(parsed.imageClueId)
      ? parsed.imageClueId
      : '';
    const soundClueId = typeof parsed.soundClueId === 'string'
      && lessonThreeSoundClueIds.has(parsed.soundClueId)
      ? parsed.soundClueId
      : '';
    const completed = Boolean(
      parsed.completed
      && classificationComplete
      && comparisonComplete
      && sceneId
      && textClueId
      && imageClueId
      && soundClueId,
    );
    const storedStep = Number.isInteger(parsed.step) && Number(parsed.step) >= 0 && Number(parsed.step) <= 4
      ? Number(parsed.step)
      : 0;
    const step = !classificationComplete
      ? 0
      : !comparisonComplete && storedStep > 1
        ? 1
        : !sceneId && storedStep > 2
          ? 2
          : !completed && storedStep > 3
            ? 3
            : storedStep;

    return {
      version: 1,
      step,
      classificationAnswers,
      classificationComplete,
      exploredBundleIds,
      comparisonAnswer,
      comparisonComplete,
      storyId,
      sceneId,
      textClueId,
      imageClueId,
      soundClueId,
      completed,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : initialLessonThreeProgress.updatedAt,
    };
  } catch {
    return initialLessonThreeProgress;
  }
}

export function writeLessonThreeProgress(progress: LessonThreeProgress) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.lessonThreeProgress,
      JSON.stringify({ ...progress, updatedAt: new Date().toISOString() }),
    );
    return true;
  } catch {
    return false;
  }
}

export function isTeacherAuthenticated() {
  try {
    return localStorage.getItem(STORAGE_KEYS.teacherAuth) === 'true';
  } catch {
    return false;
  }
}

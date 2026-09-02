import type { LessonThreeComparisonAnswer, LessonThreeDataKind } from '../types';

export const lessonThreeKindLabels: Record<LessonThreeDataKind, string> = {
  text: '문자',
  image: '이미지',
  sound: '소리',
};

export type LessonThreeClassifyCard = {
  id: string;
  title: string;
  helper: string;
  kind: LessonThreeDataKind;
  text?: string;
  imageSrc?: string;
  imageAlt?: string;
  audioSrc?: string;
};

export const lessonThreeClassifyCards: LessonThreeClassifyCard[] = [
  {
    id: 'sentence-tiger',
    title: '이야기 문장',
    helper: '눈으로 글자를 읽어요.',
    kind: 'text',
    text: '호랑이가 산길에 나타났어요.',
  },
  {
    id: 'word-rain',
    title: '낱말 메모',
    helper: '글자로 뜻을 전해요.',
    kind: 'text',
    text: '비 · 우산 · 골목',
  },
  {
    id: 'photo-classroom',
    title: '교실 사진',
    helper: '눈에 보이는 모습을 담아요.',
    kind: 'image',
    imageSrc: '/assets/lesson-01/classroom-real.webp',
    imageAlt: '교실의 책상과 의자가 보이는 사진',
  },
  {
    id: 'photo-door',
    title: '자동문 사진',
    helper: '색과 모양을 한눈에 보여 줘요.',
    kind: 'image',
    imageSrc: '/assets/lesson-01/automatic-door-real.webp',
    imageAlt: '사람이 지나가는 자동문 사진',
  },
  {
    id: 'sound-rain',
    title: '빗소리',
    helper: '재생 버튼을 눌러 들어요.',
    kind: 'sound',
    audioSrc: '/assets/lesson-03/rain-soft.wav',
  },
  {
    id: 'sound-birds',
    title: '새소리',
    helper: '재생 버튼을 눌러 들어요.',
    kind: 'sound',
    audioSrc: '/assets/lesson-03/birds-morning.wav',
  },
];

export type LessonThreeBundle = {
  id: string;
  label: string;
  tone: string;
  textClue: string;
  imageClue: string;
  imageSrc: string;
  imageAlt: string;
  soundLabel: string;
  audioSrc: string;
};

export const lessonThreeBundles: LessonThreeBundle[] = [
  {
    id: 'warm',
    label: '밝은 장면 데이터',
    tone: 'warm',
    textClue: '밝은 낮, 함께 배우는 시간',
    imageClue: '햇빛이 드는 교실 사진',
    imageSrc: '/assets/lesson-01/classroom-real.webp',
    imageAlt: '밝은 교실에서 선생님과 어린이들이 함께 있는 사진',
    soundLabel: '새소리',
    audioSrc: '/assets/lesson-03/birds-morning.wav',
  },
  {
    id: 'tense',
    label: '무서운 장면 데이터',
    tone: 'tense',
    textClue: '어두운 밤, 조용한 교실',
    imageClue: '같은 교실 사진을 어둡게 본 모습',
    imageSrc: '/assets/lesson-01/classroom-real.webp',
    imageAlt: '어둡고 긴장되는 느낌으로 보이는 같은 교실 사진',
    soundLabel: '천둥',
    audioSrc: '/assets/lesson-03/thunder-low.wav',
  },
];

export const lessonThreeComparisonChoices: Array<{
  id: LessonThreeComparisonAnswer;
  label: string;
  correct: boolean;
}> = [
  { id: 'different-data', label: '주는 데이터가 달라서', correct: true },
  { id: 'different-device', label: '화면 크기가 달라서', correct: false },
  { id: 'different-title', label: '이야기 제목이 달라서', correct: false },
];

export const lessonThreeImageClues = [
  { id: 'warm-light', label: '따뜻한 노란빛', note: '밝고 포근하게', tone: 'warm' },
  { id: 'cool-light', label: '차가운 푸른빛', note: '조용하고 긴장되게', tone: 'cool' },
  { id: 'close-view', label: '주인공을 가까이', note: '표정이 잘 보이게', tone: 'close' },
] as const;

export const lessonThreeSoundClues = [
  { id: 'birds', label: '새소리', note: '평화로운 느낌', audioSrc: '/assets/lesson-03/birds-morning.wav' },
  { id: 'rain', label: '빗소리', note: '차분한 느낌', audioSrc: '/assets/lesson-03/rain-soft.wav' },
  { id: 'wind', label: '바람 소리', note: '긴장되는 느낌', audioSrc: '/assets/lesson-03/wind-low.wav' },
] as const;

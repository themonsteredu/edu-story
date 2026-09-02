import type { LessonTwoDetailCategory, LessonTwoStoryId } from '../types';

export type LessonTwoChoice = {
  id: string;
  label: string;
  correct: boolean;
};

export type LessonTwoEvent = {
  id: string;
  text: string;
  people: string;
  place: string;
  correctOrder: number;
};

export type LessonTwoStory = {
  id: LessonTwoStoryId;
  title: string;
  theme: string;
  summary: string;
  readingParagraphs: string[];
  sourceNote: string;
  characters: LessonTwoChoice[];
  backgrounds: LessonTwoChoice[];
  events: LessonTwoEvent[];
};

export const lessonTwoDetailCategories: LessonTwoDetailCategory[] = [
  '표정',
  '시간',
  '주변 모습',
  '중요한 물건',
  '소리',
];

export const lessonTwoStories: LessonTwoStory[] = [
  {
    id: 'sun-moon',
    title: '해와 달이 된 오누이',
    theme: '용기와 지혜',
    summary: '위험을 만난 오누이가 서로 힘을 모아 하늘의 해와 달이 되는 이야기입니다.',
    readingParagraphs: [
      '어머니가 장에 떡을 팔러 떠났어요. 집으로 돌아오는 산길에서 호랑이가 어머니를 만났어요.',
      '호랑이가 오누이의 집으로 찾아왔어요. 오누이는 호랑이를 피해 큰 나무로 올라갔어요.',
      '오누이는 하늘을 향해 도와 달라고 빌었어요. 오누이는 해와 달이 되어 하늘을 밝혔어요.',
    ],
    sourceNote: '한국민족문화대백과사전의 기본형을 바탕으로 수업용으로 순화함',
    characters: [
      { id: 'siblings', label: '오누이', correct: true },
      { id: 'mother', label: '어머니', correct: true },
      { id: 'tiger', label: '호랑이', correct: true },
      { id: 'swallow', label: '제비', correct: false },
      { id: 'king', label: '임금', correct: false },
    ],
    backgrounds: [
      { id: 'mountain-road', label: '산길', correct: true },
      { id: 'home', label: '오누이의 집', correct: true },
      { id: 'tree', label: '큰 나무', correct: true },
      { id: 'sky', label: '하늘', correct: true },
      { id: 'palace', label: '궁궐', correct: false },
      { id: 'sea-palace', label: '용궁', correct: false },
    ],
    events: [
      { id: 'mother-leaves', text: '어머니가 장에 떡을 팔러 떠나요.', people: '어머니', place: '마을과 산길', correctOrder: 1 },
      { id: 'tiger-meets', text: '산길에서 호랑이가 어머니를 만나요.', people: '어머니와 호랑이', place: '산길', correctOrder: 2 },
      { id: 'tiger-arrives', text: '호랑이가 오누이의 집으로 찾아와요.', people: '오누이와 호랑이', place: '오누이의 집', correctOrder: 3 },
      { id: 'siblings-climb', text: '오누이가 호랑이를 피해 큰 나무로 올라가요.', people: '오누이와 호랑이', place: '큰 나무', correctOrder: 4 },
      { id: 'ask-the-sky', text: '오누이가 하늘을 향해 도와 달라고 빌어요.', people: '오누이', place: '큰 나무 위', correctOrder: 5 },
      { id: 'sun-and-moon', text: '오누이는 해와 달이 되어 하늘을 밝혀요.', people: '오누이', place: '하늘', correctOrder: 6 },
    ],
  },
  {
    id: 'heungbu-nolbu',
    title: '흥부와 놀부',
    theme: '나눔과 배려',
    summary: '마음씨 착한 흥부와 욕심 많은 놀부가 박씨를 통해 서로 다른 결과를 만나는 이야기입니다.',
    readingParagraphs: [
      '흥부와 놀부는 흥부네 집과 놀부네 집에서 서로 다른 마음으로 살아갔어요. 흥부네 집의 제비집에서 다친 제비를 보고 다리를 정성껏 고쳐 주었어요.',
      '돌아온 제비가 흥부에게 박씨를 물어다 주었어요. 박이 열린 마당에서 흥부 가족은 박을 타고 큰 도움을 받았어요.',
      '놀부네 집에서도 흥부를 따라 하며 박씨를 얻으려 했어요. 놀부는 잘못을 깨닫고 형제는 사이좋게 지냈어요.',
    ],
    sourceNote: '판소리계 소설 흥부전의 공통 줄거리를 바탕으로 수업용으로 순화함',
    characters: [
      { id: 'heungbu', label: '흥부', correct: true },
      { id: 'nolbu', label: '놀부', correct: true },
      { id: 'swallow', label: '제비', correct: true },
      { id: 'heungbu-family', label: '흥부의 가족', correct: true },
      { id: 'tiger', label: '호랑이', correct: false },
      { id: 'sun-fairy', label: '선녀', correct: false },
    ],
    backgrounds: [
      { id: 'heungbu-home', label: '흥부네 집', correct: true },
      { id: 'nolbu-home', label: '놀부네 집', correct: true },
      { id: 'swallow-nest', label: '제비집', correct: true },
      { id: 'gourd-yard', label: '박이 열린 마당', correct: true },
      { id: 'sea-palace', label: '용궁', correct: false },
      { id: 'palace', label: '궁궐', correct: false },
    ],
    events: [
      { id: 'brothers-live', text: '흥부와 놀부는 서로 다른 마음으로 살아가요.', people: '흥부와 놀부', place: '두 형제의 집', correctOrder: 1 },
      { id: 'help-swallow', text: '흥부가 다친 제비의 다리를 정성껏 고쳐 줘요.', people: '흥부와 제비', place: '흥부네 집', correctOrder: 2 },
      { id: 'seed-arrives', text: '돌아온 제비가 흥부에게 박씨를 물어다 줘요.', people: '흥부와 제비', place: '흥부네 집', correctOrder: 3 },
      { id: 'heungbu-gourds', text: '흥부 가족은 박을 타고 큰 도움을 받아요.', people: '흥부의 가족', place: '박이 열린 마당', correctOrder: 4 },
      { id: 'nolbu-copies', text: '놀부도 흥부를 따라 하며 박씨를 얻으려 해요.', people: '놀부와 제비', place: '놀부네 집', correctOrder: 5 },
      { id: 'brothers-reconcile', text: '놀부는 잘못을 깨닫고 형제는 사이좋게 지내요.', people: '흥부와 놀부', place: '두 형제의 집', correctOrder: 6 },
    ],
  },
  {
    id: 'good-brothers',
    title: '의좋은 형제',
    theme: '서로 아끼는 마음',
    summary: '서로를 생각한 형과 동생이 몰래 볏단을 나누며 깊은 우애를 확인하는 이야기입니다.',
    readingParagraphs: [
      '형과 동생은 형의 집과 동생의 집 가까운 논에서 각자 농사를 지었어요. 가을걷이를 마치고 볏단을 똑같이 나누었어요.',
      '그날 밤 형은 동생의 집으로 볏단을 몰래 옮겼어요. 동생도 형의 집으로 볏단을 몰래 옮겼어요.',
      '다음 날 볏단 수가 그대로여서 두 사람은 고개를 갸웃했어요. 다시 볏단을 옮기러 나온 형제는 밤길에서 서로의 따뜻한 마음을 알게 되었어요.',
    ],
    sourceNote: '볏단을 옮기는 우애설화의 공통 줄거리를 바탕으로 수업용으로 재구성함',
    characters: [
      { id: 'older-brother', label: '형', correct: true },
      { id: 'younger-brother', label: '동생', correct: true },
      { id: 'king', label: '임금', correct: false },
      { id: 'tiger', label: '호랑이', correct: false },
      { id: 'swallow', label: '제비', correct: false },
    ],
    backgrounds: [
      { id: 'rice-field', label: '논', correct: true },
      { id: 'older-home', label: '형의 집', correct: true },
      { id: 'younger-home', label: '동생의 집', correct: true },
      { id: 'night-road', label: '밤길', correct: true },
      { id: 'palace', label: '궁궐', correct: false },
      { id: 'cave', label: '산속 동굴', correct: false },
    ],
    events: [
      { id: 'farm-together', text: '형과 동생은 각자 농사를 지으며 사이좋게 살아요.', people: '형과 동생', place: '논과 두 집', correctOrder: 1 },
      { id: 'share-rice', text: '가을이 되어 볏단을 똑같이 나누어요.', people: '형과 동생', place: '논', correctOrder: 2 },
      { id: 'older-carries', text: '형은 동생에게 더 주려고 밤에 볏단을 옮겨요.', people: '형', place: '동생의 집으로 가는 길', correctOrder: 3 },
      { id: 'younger-carries', text: '동생도 형에게 더 주려고 밤에 볏단을 옮겨요.', people: '동생', place: '형의 집으로 가는 길', correctOrder: 4 },
      { id: 'wonder-about-rice', text: '다음 날에도 볏단 수가 그대로여서 두 사람은 궁금해해요.', people: '형과 동생', place: '두 형제의 집', correctOrder: 5 },
      { id: 'meet-at-night', text: '밤길에서 만난 형제는 서로의 마음을 알고 꼭 안아요.', people: '형과 동생', place: '밤길', correctOrder: 6 },
    ],
  },
];

export function getLessonTwoStory(id: LessonTwoStoryId | null) {
  return lessonTwoStories.find((story) => story.id === id) ?? null;
}

export function shuffledEventIds(story: LessonTwoStory) {
  const ordered = [...story.events]
    .sort((a, b) => a.correctOrder - b.correctOrder)
    .map((event) => event.id);
  const shuffled = [...ordered];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }

  if (shuffled.every((id, index) => id === ordered[index])) {
    shuffled.push(shuffled.shift() as string);
  }

  return shuffled;
}

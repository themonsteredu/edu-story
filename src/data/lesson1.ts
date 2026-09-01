import type { Slide } from '../types';

export const lessonOnePrompt =
  '비 오는 날, 빨간 우산을 쓴 아이가 골목길을 걷고 있습니다.';

export const aiScenes = [
  {
    id: 'video-recommendation',
    icon: '▶',
    title: '내가 좋아할 영상을 추천해요',
    description: '전에 본 영상과 비슷한 영상을 골라 보여 줍니다.',
    usesAi: true,
    reason: '이용 기록에서 비슷한 특징을 찾아 추천하기 때문이에요.',
  },
  {
    id: 'voice-assistant',
    icon: '♪',
    title: '말로 오늘 날씨를 물어봐요',
    description: '사람의 말을 알아듣고 알맞은 정보를 찾아 줍니다.',
    usesAi: true,
    reason: '말소리의 특징을 살펴 뜻을 알아내기 때문이에요.',
  },
  {
    id: 'face-unlock',
    icon: '◎',
    title: '얼굴을 보고 휴대폰 잠금을 풀어요',
    description: '등록한 얼굴과 지금 보이는 얼굴을 비교합니다.',
    usesAi: true,
    reason: '사진 속 얼굴의 특징을 찾아 비교하기 때문이에요.',
  },
  {
    id: 'lamp-switch',
    icon: '●',
    title: '스위치를 눌러 전등을 켜요',
    description: '사람이 누른 스위치에 따라 전기가 켜집니다.',
    usesAi: false,
    reason: '정해진 스위치 동작만 수행하고 스스로 구별하거나 판단하지 않아요.',
  },
  {
    id: 'ruler',
    icon: '↔',
    title: '자로 연필의 길이를 재요',
    description: '눈금을 보고 사람이 직접 길이를 읽습니다.',
    usesAi: false,
    reason: '도구가 자료를 학습하거나 특징을 판단하지 않아요.',
  },
  {
    id: 'translation',
    icon: '가A',
    title: '한국어 문장을 다른 말로 번역해요',
    description: '문장의 뜻과 어울리는 다른 언어 표현을 제안합니다.',
    usesAi: true,
    reason: '많은 문장 자료에서 언어의 규칙과 관계를 배웠기 때문이에요.',
  },
] as const;

export const imaginationOptions = {
  expression: ['웃고 있어요', '걱정스러워 보여요', '무표정이에요'],
  time: ['낮', '해 질 무렵', '밤'],
  mood: ['밝고 따뜻해요', '조용하고 쓸쓸해요', '오래되고 좁아요'],
  rain: ['보슬비', '세찬 비', '비가 거의 그친 뒤'],
};

export const lessonOneSlides: Slide[] = [
  {
    kicker: 'AI와 함께 만드는 우리 옛이야기 그림책',
    title: '사람과 AI, 누가 더 잘 볼까?',
    subtitle: '1차시 · 창체+국어 · LOOK',
    visual: 'cover',
  },
  {
    kicker: '오늘의 핵심 질문',
    title: '같은 문장을 들어도 사람과 AI는 똑같이 이해할까요?',
    visual: 'question',
  },
  {
    kicker: '생각 열기',
    title: '오늘 하루 동안 AI를 만난 적이 있나요?',
    subtitle: '집, 길, 학교, 휴대폰 속 장면을 떠올려 봅시다.',
    visual: 'memory',
  },
  {
    kicker: '활동 1',
    title: '생활 속에서 AI가 쓰이는 장면을 찾아봅시다.',
    visual: 'ai-scenes',
  },
  {
    kicker: '학생 웹 활동',
    title: 'AI라고 생각하는 장면을 모두 선택하세요.',
    subtitle: '선택한 까닭도 함께 살펴봅니다.',
    visual: 'activity',
  },
  {
    kicker: '중간 정리',
    title: '모든 자동 기계가 AI인 것은 아닙니다.',
    subtitle: '오늘은 자료의 특징을 구별하거나, 비슷한 것을 찾아 결과를 내는 장면에 주목합니다.',
    visual: 'ai-scenes',
  },
  {
    kicker: '활동 2',
    title: '같은 문장을 함께 읽어 봅시다.',
    subtitle: lessonOnePrompt,
    visual: 'prompt',
  },
  {
    kicker: '먼저, 사람',
    title: '내 머릿속에는 어떤 장면이 떠올랐나요?',
    subtitle: '표정, 시간, 골목 분위기, 비의 모습은 사람마다 다를 수 있습니다.',
    visual: 'imagination',
  },
  {
    kicker: '이제, AI',
    title: '교사가 같은 문장을 AI 이미지 생성 도구에 입력합니다.',
    subtitle: 'AI에게 문장을 더 설명하지 않고 먼저 결과를 살펴봅니다.',
    visual: 'teacher-demo',
  },
  {
    kicker: '비교하기',
    title: '내가 상상한 그림과 AI가 만든 그림을 나란히 봅시다.',
    visual: 'compare',
  },
  {
    kicker: '관찰하기',
    title: '같았던 점과 달랐던 점은 무엇인가요?',
    subtitle: '좋다·나쁘다가 아니라, 눈에 보이는 근거로 말해 봅시다.',
    visual: 'same-different',
  },
  {
    kicker: '생각 넓히기',
    title: '왜 같은 문장에서 서로 다른 그림이 나왔을까요?',
    visual: 'why',
  },
  {
    kicker: '사람의 이해',
    title: '사람은 경험과 기억을 떠올리며 장면을 상상합니다.',
    subtitle: '예전에 본 골목, 비 오는 날의 느낌, 우산을 썼던 기억이 함께 작용합니다.',
    visual: 'human',
  },
  {
    kicker: 'AI의 이해',
    title: 'AI는 학습한 데이터에서 비슷한 특징과 관계를 찾아 결과를 만듭니다.',
    subtitle: '입력한 말이 구체적이지 않으면 AI가 채운 부분이 많아질 수 있습니다.',
    visual: 'ai',
  },
  {
    kicker: '오늘의 정리',
    title: '사람은 경험으로, AI는 데이터로 이해합니다.',
    bullets: [
      '생활 속 AI 활용 장면을 찾았습니다.',
      '같은 문장을 보고 사람과 AI의 그림을 비교했습니다.',
      '서로 다른 이해 방식이 결과에 영향을 준다는 점을 알았습니다.',
    ],
    visual: 'summary',
  },
];

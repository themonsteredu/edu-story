import type { AiFunction, Slide } from '../types';

export const aiScenes = [
  {
    id: 'video-recommendation',
    icon: '01',
    title: '시청 기록을 보고 영상을 추천해요',
    description: '전에 본 영상과 비슷한 특징의 영상을 골라 보여 줍니다.',
    image: '/assets/lesson-01/streaming-real.webp',
    usesAi: true,
    reason: '이용 기록에서 비슷한 특징을 찾아 추천하기 때문이에요.',
  },
  {
    id: 'voice-recognition',
    icon: '02',
    title: '사람의 말을 글자로 바꾸어요',
    description: '말소리의 특징을 살펴 어떤 말인지 알아봅니다.',
    image: '/assets/lesson-01/smart-speaker-real.webp',
    usesAi: true,
    reason: '학습한 말소리 자료를 바탕으로 소리를 인식하기 때문이에요.',
  },
  {
    id: 'face-recognition',
    icon: '03',
    title: '카메라가 얼굴을 찾아 표시해요',
    description: '화면에 들어온 얼굴의 위치와 특징을 찾아냅니다.',
    image: '/assets/lesson-01/face-recognition-real.webp',
    usesAi: true,
    reason: '얼굴의 여러 특징을 찾아 얼굴인지 인식하기 때문이에요.',
  },
  {
    id: 'automatic-door',
    icon: '04',
    title: '센서가 움직임을 감지하면 문이 열려요',
    description: '움직임이 감지되면 열리도록 정해진 조건대로 작동합니다.',
    image: '/assets/lesson-01/automatic-door-real.webp',
    usesAi: false,
    reason: '이 사례는 자료를 학습해 판단하지 않고 정해진 조건대로 움직여요.',
  },
  {
    id: 'ruler',
    icon: '05',
    title: '자로 연필의 길이를 재요',
    description: '눈금을 보고 사람이 직접 길이를 읽습니다.',
    image: '/assets/lesson-01/ruler-real.webp',
    usesAi: false,
    reason: '도구가 데이터를 학습하거나 특징을 판단하지 않아요.',
  },
  {
    id: 'photo-classification',
    icon: '06',
    title: '사진을 동물과 식물로 나누어요',
    description: '사진에서 보이는 특징을 찾아 알맞은 모둠으로 분류합니다.',
    image: '/assets/lesson-01/photo-classification-real.webp',
    usesAi: true,
    reason: '많은 사진에서 학습한 특징을 바탕으로 종류를 분류하기 때문이에요.',
  },
] as const;

export const functionCases: Array<{
  id: string;
  number: string;
  title: string;
  clue: string;
  category: AiFunction;
}> = [
  { id: 'watch', number: '01', title: '좋아할 영상 제안', clue: '시청 기록을 보고 다음 영상을 제안한다.', category: '추천' },
  { id: 'book', number: '02', title: '다음 책 제안', clue: '읽은 책 기록과 비슷한 책을 제안한다.', category: '추천' },
  { id: 'face', number: '03', title: '얼굴 잠금 해제', clue: '등록 얼굴과 지금 얼굴의 특징을 비교한다.', category: '인식' },
  { id: 'speech', number: '04', title: '말을 글자로 변환', clue: '말소리의 특징을 살펴 글자로 바꾼다.', category: '인식' },
  { id: 'nature', number: '05', title: '동물·식물 사진 나누기', clue: '사진의 특징을 찾아 알맞은 모둠에 넣는다.', category: '분류' },
  { id: 'spam', number: '06', title: '스팸 메일 가려내기', clue: '메일의 특징을 보고 스팸함으로 보낸다.', category: '분류' },
  { id: 'timer', number: '07', title: '10분 뒤 알람', clue: '설정한 시간이 지나면 알람이 울린다.', category: '자동기계' },
  { id: 'door', number: '08', title: '센서 자동문', clue: '움직임이 감지되면 문이 열린다.', category: '자동기계' },
];

export const functionOptions: AiFunction[] = ['추천', '인식', '분류', '자동기계'];

export const lessonOneSlides: Slide[] = [
  { kicker: 'AI와 함께 만드는 우리 옛이야기 그림책', title: '자동으로 움직이면 모두 AI일까?', subtitle: '1차시 · 창체+국어 · LOOK', visual: 'cover' },
  { kicker: '오늘의 핵심 질문', title: '자동으로 움직이는 기계는 모두 AI일까요?', subtitle: '무엇을 보고, 어떤 방법으로 결과를 내는지 관찰합니다.', visual: 'question' },
  { kicker: '오늘의 목표', title: 'AI와 자동기계를 작동 근거로 구별해 봅시다.', bullets: ['추천·인식·분류 기능 찾기', '정해진 조건과 순서 찾기', '내 선택을 근거로 설명하기'], visual: 'observation' },
  { kicker: '활동 1', title: '생활 속 장면 여섯 가지를 자세히 봅시다.', subtitle: '겉모습보다 기기가 하는 일에 주목합니다.', visual: 'ai-scenes' },
  { kicker: '학생 활동지 ①', title: '여덟 사례에 알맞은 기능 이름을 쓰세요.', subtitle: '추천 · 인식 · 분류 · 자동기계 중 하나를 고르고 까닭을 말합니다.', visual: 'worksheet' },
  { kicker: '자동기계', title: '정해진 조건이 맞으면 정해진 동작을 합니다.', subtitle: '센서 자동문과 타이머는 이 수업에서 자동기계 사례로 봅니다.', visual: 'automatic' },
  { kicker: 'AI', title: '학습된 데이터를 이용해 특징을 찾고 결과를 냅니다.', subtitle: '어떤 정보를 사용했는지 살펴보면 AI 기능을 찾기 쉽습니다.', visual: 'ai-data' },
  { kicker: 'AI의 세 기능', title: '오늘은 추천·인식·분류를 살펴봅니다.', visual: 'functions' },
  { kicker: '추천', title: '기록에서 비슷한 특징을 찾아 다음 것을 제안합니다.', subtitle: '예: 영상 추천, 책 추천', visual: 'recommendation' },
  { kicker: '인식', title: '소리나 얼굴의 특징을 찾아 무엇인지 알아봅니다.', subtitle: '예: 음성 인식, 얼굴 인식', visual: 'recognition' },
  { kicker: '분류', title: '특징이 비슷한 자료를 알맞은 모둠으로 나눕니다.', subtitle: '예: 사진 분류, 스팸 메일 분류', visual: 'classification' },
  { kicker: '모둠 활동', title: '여덟 가지 사례를 네 영역으로 나누어 봅시다.', subtitle: '추천 · 인식 · 분류 · 자동기계', visual: 'sort' },
  { kicker: '함께 확인', title: '결과보다 선택한 근거를 먼저 말해 봅시다.', subtitle: '“이 사례는 ___ 정보를 보고 ___하기 때문입니다.”', visual: 'answer' },
  { kicker: '주의할 점', title: '같은 기기도 작동 방식에 따라 답이 달라질 수 있습니다.', subtitle: '제품 이름만 보지 말고 제시된 작동 설명을 읽습니다.', visual: 'caution' },
  { kicker: '오늘의 정리', title: 'AI는 데이터로 판단하고, 자동기계는 정해진 조건과 순서로 작동합니다.', bullets: ['추천·인식·분류 기능을 찾았습니다.', '자동기계와 AI를 작동 근거로 구별했습니다.', '선택한 이유를 문장으로 설명했습니다.'], visual: 'summary' },
];

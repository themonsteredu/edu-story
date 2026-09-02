import type { LessonTwoStoryId } from '../types';

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
  planning: {
    characters: string[];
    places: string[];
    moods: string[];
    details: string[];
  };
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
      {
        id: 'mother-leaves', text: '어머니가 장에 떡을 팔러 떠나요.', people: '어머니', place: '마을과 산길', correctOrder: 1,
        planning: {
          characters: ['떡 광주리를 든 어머니', '어머니와 오누이', '집 앞의 오누이'],
          places: ['아침 마을길', '사람이 많은 장터', '산으로 이어진 길'],
          moods: ['활기차고 밝게', '조용하고 평화롭게', '조금 걱정스럽게'],
          details: ['떡이 담긴 바구니', '오누이가 손을 흔드는 모습', '멀리 보이는 산길'],
        },
      },
      {
        id: 'tiger-meets', text: '산길에서 호랑이가 어머니를 만나요.', people: '어머니와 호랑이', place: '산길', correctOrder: 2,
        planning: {
          characters: ['어머니와 호랑이', '놀란 어머니', '큰 호랑이'],
          places: ['어두운 산길', '나무가 빽빽한 숲길', '고개 위 좁은 길'],
          moods: ['무섭고 긴장되게', '조용하고 서늘하게', '깜짝 놀라게'],
          details: ['입을 벌린 호랑이', '떡 하나를 든 어머니', '나무 뒤로 드리운 호랑이 그림자'],
        },
      },
      {
        id: 'tiger-arrives', text: '호랑이가 오누이의 집으로 찾아와요.', people: '오누이와 호랑이', place: '오누이의 집', correctOrder: 3,
        planning: {
          characters: ['문 밖의 호랑이와 오누이', '문을 바라보는 오누이', '어머니 흉내를 내는 호랑이'],
          places: ['작은 초가집 안', '닫힌 문이 있는 마루', '어두운 집 앞'],
          moods: ['두렵고 조용하게', '긴장되고 급하게', '수상하고 서늘하게'],
          details: ['문틈으로 밖을 보는 오누이', '문에 올라온 호랑이 발', '문 밖의 큰 호랑이 그림자'],
        },
      },
      {
        id: 'siblings-climb', text: '오누이가 호랑이를 피해 큰 나무로 올라가요.', people: '오누이와 호랑이', place: '큰 나무', correctOrder: 4,
        planning: {
          characters: ['나무 위 오누이와 아래 호랑이', '손을 잡은 오누이', '나무를 올려다보는 호랑이'],
          places: ['높은 나무 위', '달빛 비치는 마당의 큰 나무', '잎이 무성한 큰 나무'],
          moods: ['급하고 아슬아슬하게', '무섭지만 용감하게', '긴장되고 어둡게'],
          details: ['오누이가 서로 당겨 주는 모습', '나무 아래에서 올라오는 호랑이', '하늘까지 닿을 듯한 큰 나무'],
        },
      },
      {
        id: 'ask-the-sky', text: '오누이가 하늘을 향해 도와 달라고 빌어요.', people: '오누이', place: '큰 나무 위', correctOrder: 5,
        planning: {
          characters: ['두 손을 모은 오누이', '하늘을 보는 누이', '동생을 감싸는 오빠'],
          places: ['별이 보이는 나무 위', '구름 사이로 보이는 밤하늘 아래', '바람이 부는 높은 가지'],
          moods: ['꼭 도와 달라는 마음으로', '희망을 가지고 용감하게', '조용하고 서로 걱정하는 마음으로'],
          details: ['하늘에서 내려오는 튼튼한 동아줄', '오누이 위로 비치는 밝은 빛', '바람에 흔들리는 나뭇잎'],
        },
      },
      {
        id: 'sun-and-moon', text: '오누이는 해와 달이 되어 하늘을 밝혀요.', people: '오누이', place: '하늘', correctOrder: 6,
        planning: {
          characters: ['해와 달이 된 오누이', '밝게 웃는 오누이', '서로를 바라보는 해와 달'],
          places: ['별이 가득한 하늘', '마을 위의 넓은 하늘', '밤과 낮이 만나는 하늘'],
          moods: ['희망차고 환하게', '따뜻하고 평화롭게', '놀랍고 신비롭게'],
          details: ['마을을 환하게 비추는 해와 달', '하늘에 길게 펼쳐진 빛', '작은 집들을 내려다보는 해와 달'],
        },
      },
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
      {
        id: 'brothers-live', text: '흥부와 놀부는 서로 다른 마음으로 살아가요.', people: '흥부와 놀부', place: '두 형제의 집', correctOrder: 1,
        planning: {
          characters: ['흥부와 놀부', '가족을 돕는 흥부', '욕심 난 표정의 놀부'],
          places: ['흥부네 작은 집', '놀부네 큰 집', '두 집이 보이는 마을'],
          moods: ['두 형제가 서로 다르게 보이게', '흥부네는 따뜻하게', '놀부네는 차갑게'],
          details: ['크기가 다른 두 집', '웃으며 함께하는 흥부 가족', '혼자 쌓인 곡식을 바라보는 놀부'],
        },
      },
      {
        id: 'help-swallow', text: '흥부가 다친 제비의 다리를 정성껏 고쳐 줘요.', people: '흥부와 제비', place: '흥부네 집', correctOrder: 2,
        planning: {
          characters: ['흥부와 다친 제비', '제비를 든 흥부', '궁금해하는 흥부의 아이들'],
          places: ['흥부네 마루', '제비집 아래', '햇살이 드는 작은 마당'],
          moods: ['따뜻하고 다정하게', '걱정스럽지만 조심스럽게', '평화롭고 포근하게'],
          details: ['제비 다리에 천을 감는 손', '흥부의 다정한 표정', '지붕 밑 작은 제비집'],
        },
      },
      {
        id: 'seed-arrives', text: '돌아온 제비가 흥부에게 박씨를 물어다 줘요.', people: '흥부와 제비', place: '흥부네 집', correctOrder: 3,
        planning: {
          characters: ['흥부와 날아온 제비', '박씨를 받는 흥부', '박씨를 문 제비'],
          places: ['흥부네 마당', '푸른 하늘 아래', '제비집이 보이는 처마'],
          moods: ['반갑고 설레게', '밝고 기쁘게', '신기하고 궁금하게'],
          details: ['제비 부리에 물린 박씨', '두 손으로 박씨를 받는 흥부', '하늘을 돌아 나는 제비'],
        },
      },
      {
        id: 'heungbu-gourds', text: '흥부 가족은 박을 타고 큰 도움을 받아요.', people: '흥부의 가족', place: '박이 열린 마당', correctOrder: 4,
        planning: {
          characters: ['흥부와 가족', '박을 타는 흥부', '기뻐하는 아이들'],
          places: ['큰 박이 열린 마당', '박덩굴 아래', '박이 가득한 흥부네 집'],
          moods: ['놀랍고 기쁘게', '복잡하고 신나게', '따뜻하고 희망차게'],
          details: ['톱으로 박을 타는 모습', '크게 열리는 박 속', '서로 안고 기뻐하는 가족'],
        },
      },
      {
        id: 'nolbu-copies', text: '놀부도 흥부를 따라 하며 박씨를 얻으려 해요.', people: '놀부와 제비', place: '놀부네 집', correctOrder: 5,
        planning: {
          characters: ['놀부와 제비', '박씨를 바라보는 놀부', '놀부에게서 멀어지는 제비'],
          places: ['놀부네 큰 마당', '높은 담이 있는 집', '제비집 아래'],
          moods: ['욕심나고 수상하게', '어수선하고 시끄럽게', '불편하고 차갑게'],
          details: ['박씨를 손에 든 놀부', '걱정스럽게 날아가는 제비', '박씨를 심으려고 파 놓은 땅'],
        },
      },
      {
        id: 'brothers-reconcile', text: '놀부는 잘못을 깨닫고 형제는 사이좋게 지내요.', people: '흥부와 놀부', place: '두 형제의 집', correctOrder: 6,
        planning: {
          characters: ['손을 잡은 흥부와 놀부', '미안해하는 놀부', '놀부를 용서하는 흥부'],
          places: ['형제가 만난 마루', '두 집 사이의 마을길', '함께 앉은 밥상 앞'],
          moods: ['따뜻하고 편안하게', '미안함과 용서가 느껴지게', '기쁘고 밝게'],
          details: ['두 형제가 마주 잡은 손', '놀부의 미안한 표정', '함께 밥을 나누는 가족'],
        },
      },
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
      {
        id: 'farm-together', text: '형과 동생은 각자 농사를 지으며 사이좋게 살아요.', people: '형과 동생', place: '논과 두 집', correctOrder: 1,
        planning: {
          characters: ['함께 일하는 형과 동생', '논을 갈고 있는 형', '모를 돌보는 동생'],
          places: ['푸른 논', '두 집 앞의 논길', '산 아래 넓은 논'],
          moods: ['성실하고 평화롭게', '밝고 활기차게', '따뜻하고 정겹게'],
          details: ['함께 논을 돌보는 형제', '푸른 모가 줄지어 선 모습', '멀리 나란히 보이는 두 집'],
        },
      },
      {
        id: 'share-rice', text: '가을이 되어 볏단을 똑같이 나누어요.', people: '형과 동생', place: '논', correctOrder: 2,
        planning: {
          characters: ['볏단을 나누는 형과 동생', '볏단을 세는 형', '볏단을 쌓는 동생'],
          places: ['황금빛 가을 논', '볏단이 쌓인 논두렁', '해질녘의 논'],
          moods: ['뿌듯하고 밝게', '정답고 평화롭게', '바쁘지만 기쁘게'],
          details: ['똑같이 나눈 볏단 두 무더기', '황금빛으로 구부러진 벼', '서로 도와 볏단을 쌓는 형제'],
        },
      },
      {
        id: 'older-carries', text: '형은 동생에게 더 주려고 밤에 볏단을 옮겨요.', people: '형', place: '동생의 집으로 가는 길', correctOrder: 3,
        planning: {
          characters: ['볏단을 진 형', '조심스럽게 걷는 형', '동생 집을 바라보는 형'],
          places: ['달빛이 비치는 밤길', '논 사이 좁은 길', '동생의 집 앞'],
          moods: ['조용하고 따뜻하게', '조심스럽고 비밀스럽게', '동생을 생각하며 다정하게'],
          details: ['어깨에 멘 큰 볏단', '달빛 아래 길게 진 형의 그림자', '동생 집 앞에 볏단을 놓는 손'],
        },
      },
      {
        id: 'younger-carries', text: '동생도 형에게 더 주려고 밤에 볏단을 옮겨요.', people: '동생', place: '형의 집으로 가는 길', correctOrder: 4,
        planning: {
          characters: ['볏단을 진 동생', '살금살금 걷는 동생', '형의 집을 바라보는 동생'],
          places: ['별이 보이는 밤길', '논 사이 좁은 길', '형의 집 앞'],
          moods: ['고마운 마음이 느껴지게', '조용하고 비밀스럽게', '힘들지만 따뜻하게'],
          details: ['품에 안은 큰 볏단', '형의 집 마루에 볏단을 놓는 모습', '밤하늘에 반짝이는 별'],
        },
      },
      {
        id: 'wonder-about-rice', text: '다음 날에도 볏단 수가 그대로여서 두 사람은 궁금해해요.', people: '형과 동생', place: '두 형제의 집', correctOrder: 5,
        planning: {
          characters: ['고개를 갸우뚜한 형과 동생', '볏단을 다시 세는 형', '이상한 듯 바라보는 동생'],
          places: ['아침의 형 집 마당', '동생 집의 볏단 앞', '두 집이 보이는 마을길'],
          moods: ['신기하고 궁금하게', '조금 당황스럽게', '밝지만 수수께끼 같은 느낌으로'],
          details: ['손가락으로 볏단을 세는 모습', '고개를 갸우뚜한 형제의 표정', '줄지 않은 볏단 무더기'],
        },
      },
      {
        id: 'meet-at-night', text: '밤길에서 만난 형제는 서로의 마음을 알고 꼭 안아요.', people: '형과 동생', place: '밤길', correctOrder: 6,
        planning: {
          characters: ['볏단을 든 형과 동생', '서로를 보고 놀란 형제', '꼭 안은 형과 동생'],
          places: ['달빛 비치는 밤길', '논 가운데 오솔길', '두 집 사이의 길'],
          moods: ['따뜻하고 감동적으로', '놀랍고 반갑게', '조용하고 서로 아끼는 느낌으로'],
          details: ['볏단을 내려놓고 안은 형제', '형제 뒤로 비치는 둥근 달', '서로의 짐에서 흘러내린 벼 낱알'],
        },
      },
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

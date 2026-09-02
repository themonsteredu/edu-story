export type LessonTwoSlideVisual =
  | 'cover'
  | 'question'
  | 'elements'
  | 'stories'
  | 'characters'
  | 'backgrounds'
  | 'events'
  | 'flow'
  | 'shuffle'
  | 'webapp'
  | 'six-scenes'
  | 'details'
  | 'summary';

export type LessonTwoSlide = {
  kicker: string;
  title: string;
  subtitle?: string;
  prompt?: string;
  visual: LessonTwoSlideVisual;
};

export const lessonTwoSlides: LessonTwoSlide[] = [
  {
    kicker: '2차시 · LOOK',
    title: '우리가 만들 이야기 정하기',
    subtitle: '옛이야기의 인물·사건·배경을 찾고 여섯 장면으로 나눕니다.',
    visual: 'cover',
  },
  {
    kicker: '오늘의 질문',
    title: '옛이야기는 무엇으로 이루어질까요?',
    subtitle: '이야기를 자세히 살펴보면 꼭 필요한 세 가지를 찾을 수 있습니다.',
    visual: 'question',
  },
  {
    kicker: '이야기의 세 요소',
    title: '누가, 어디에서, 어떤 일을 겪는지 찾아봅니다.',
    prompt: '인물 · 배경 · 사건',
    visual: 'elements',
  },
  {
    kicker: '활동 1 · 이야기 선택',
    title: '우리 모둠이 만들 옛이야기를 하나 고릅니다.',
    subtitle: '이야기를 고른 뒤, 교사가 검토한 고정 읽기 자료를 함께 읽습니다.',
    visual: 'stories',
  },
  {
    kicker: '활동 2 · 인물 찾기',
    title: '이야기에 누가 나오는지 골라봅니다.',
    subtitle: '주인공뿐 아니라 사건을 함께 만드는 인물도 찾습니다.',
    visual: 'characters',
  },
  {
    kicker: '활동 2 · 배경 찾기',
    title: '이야기가 펼쳐지는 곳을 골라봅니다.',
    subtitle: '장소가 달라지면 일어나는 일과 분위기도 달라집니다.',
    visual: 'backgrounds',
  },
  {
    kicker: '활동 3 · 사건 찾기',
    title: '사건은 이야기에서 실제로 일어난 일입니다.',
    subtitle: '중요한 사건 여섯 개를 찾으면 그림책의 뼈대가 생깁니다.',
    visual: 'events',
  },
  {
    kicker: '순서 읽는 법',
    title: '먼저, 그다음, 마지막을 생각합니다.',
    subtitle: '원인과 결과가 자연스럽게 이어지는지 소리 내어 읽어 보세요.',
    visual: 'flow',
  },
  {
    kicker: '사건 순서 맞추기',
    title: '섞인 사건 카드를 이야기 순서대로 옮겨봅니다.',
    subtitle: '글을 많이 쓰지 않고 카드의 자리를 바꾸어 완성합니다.',
    visual: 'shuffle',
  },
  {
    kicker: '학생 활동',
    title: '웹앱에서 우리 모둠의 사건 순서를 완성하세요.',
    subtitle: '태블릿에서는 끌어서 옮기고, 휴대폰에서는 앞·뒤 버튼으로 움직입니다.',
    visual: 'webapp',
  },
  {
    kicker: '활동 4 · 여섯 장면',
    title: '여섯 사건을 바탕으로 우리 그림책을 기획합니다.',
    subtitle: '사건 순서만 확인하고, 장면의 모습은 학생이 직접 결정합니다.',
    visual: 'six-scenes',
  },
  {
    kicker: '활동 4 · 장면 기획',
    title: '누가, 어디서, 어떤 모습인지 내가 고릅니다.',
    subtitle: '긴 문장 대신 구체적인 낱말을 골라 장면마다 다른 모습을 만듭니다.',
    visual: 'details',
  },
  {
    kicker: '오늘의 정리',
    title: '내가 고른 내용으로 여섯 장면 기획판을 완성했습니다.',
    subtitle: '친구와 다른 선택도 정답입니다. 각자 생각한 그림책 장면을 말로 소개해 봅니다.',
    visual: 'summary',
  },
];

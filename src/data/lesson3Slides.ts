export type LessonThreeSlideVisual =
  | 'cover'
  | 'baskets'
  | 'definition'
  | 'text'
  | 'image'
  | 'sound'
  | 'classify'
  | 'same-scene'
  | 'bundle-a'
  | 'bundle-b'
  | 'compare'
  | 'my-bundle'
  | 'summary';

export type LessonThreeSlide = {
  kicker: string;
  title: string;
  subtitle?: string;
  prompt?: string;
  visual: LessonThreeSlideVisual;
};

export const lessonThreeSlides: LessonThreeSlide[] = [
  {
    kicker: '3차시 · EXPLORE',
    title: 'AI가 이해하는 데이터',
    subtitle: '문자·이미지·소리를 구분하고, 한 장면에 알맞은 자료를 골라 봅니다.',
    visual: 'cover',
  },
  {
    kicker: '오늘의 활동',
    title: '자료를 세 바구니에 나눠요.',
    prompt: '문자 · 이미지 · 소리',
    visual: 'baskets',
  },
  {
    kicker: '데이터 알아보기',
    title: '데이터는 생각을 돕는 자료예요.',
    subtitle: '읽고, 보고, 들으며 알 수 있는 자료를 데이터라고 해요.',
    visual: 'definition',
  },
  {
    kicker: '문자 데이터',
    title: '글자로 읽는 것은 문자 데이터예요.',
    subtitle: '예: 사람들이 교실에 있어요.',
    visual: 'text',
  },
  {
    kicker: '이미지 데이터',
    title: '사진도 눈으로 읽는 이미지 데이터예요.',
    subtitle: '모양·색·위치를 살펴봐요.',
    visual: 'image',
  },
  {
    kicker: '소리 데이터',
    title: '소리는 귀로 듣는 데이터예요.',
    subtitle: '재생 버튼을 누르고 종류와 느낌을 골라요.',
    visual: 'sound',
  },
  {
    kicker: '활동 1 · 분류하기',
    title: '읽고, 보고, 들으며 바구니를 찾아요.',
    subtitle: '자료를 눌러 문자·이미지·소리에 놓아요.',
    visual: 'classify',
  },
  {
    kicker: '같은 장면, 다른 자료',
    title: '같은 장면도 고른 자료에 따라 느낌이 달라져요.',
    prompt: '사람들이 교실에 있어요.',
    visual: 'same-scene',
  },
  {
    kicker: '자료 묶음 A',
    title: '밝은 사진을 보고 새소리를 들어 봐요.',
    prompt: '사람들이 교실에 있어요.',
    visual: 'bundle-a',
  },
  {
    kicker: '자료 묶음 B',
    title: '어두운 사진을 보고 천둥을 들어 봐요.',
    prompt: '사람들이 교실에 있어요.',
    visual: 'bundle-b',
  },
  {
    kicker: '활동 2 · 비교하기',
    title: '자료가 달라지면 장면의 느낌도 달라져요.',
    prompt: '같은 문장 · 다른 사진 · 다른 소리',
    visual: 'compare',
  },
  {
    kicker: '활동 3 · 나의 데이터 꾸러미',
    title: '2차시에서 기획한 장면에 자료 세 가지를 골라요.',
    prompt: '문자 하나 · 이미지 하나 · 소리 하나',
    visual: 'my-bundle',
  },
  {
    kicker: '오늘의 정리',
    title: '문자·이미지·소리를 골라 장면을 또렷하게 만들어요.',
    subtitle: '생성형 AI와 외부 도구는 사용하지 않았어요.',
    visual: 'summary',
  },
];

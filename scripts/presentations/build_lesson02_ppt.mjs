import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Presentation, PresentationFile } from '@oai/artifact-tool';
import JSZip from 'jszip';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.EDU_STORY_ROOT || path.resolve(SCRIPT_DIR, '../..');
const TMP = process.env.LESSON02_PPT_TMP || path.join(ROOT, 'tmp', 'lesson02-ppt');
const FINAL = path.join(ROOT, 'public', 'resources', 'lesson-02', '01_2차시_수업PPT.pptx');

const W = 1280;
const H = 720;
const FONT = 'S-Core Dream';
const LESSON2_URL = 'https://edu-story-nine.vercel.app/lesson/2';

const C = {
  paper: '#F6F0E4',
  sheet: '#FFFDF7',
  ink: '#252722',
  forest: '#183E32',
  forestSoft: '#DEE7DE',
  charcoal: '#17231F',
  muted: '#6E6A61',
  cinnabar: '#9C3124',
  sand: '#E8DDCB',
  line: '#C8BCA9',
  warmLine: '#AD9F89',
  white: '#FFFFFF',
};

const SERIES = 'AI와 함께 만드는 우리 옛이야기 그림책 · 2차시 LOOK';
const CURRICULUM_SOURCE = 'User-provided curriculum: AI융합_옛이야기그림책_10차시_지도안_1.docx';
const ADAPTATION_SOURCE = 'Fixed classroom adaptation of traditional Korean folktales (public-domain source tradition), as authored in src/data/lesson2.ts';

const shortEvents = [
  '어머니가 장에 떡을 팔러 떠나요',
  '산길에서 호랑이를 만나요',
  '호랑이가 오누이의 집에 와요',
  '오누이가 큰 나무로 올라가요',
  '오누이가 하늘에 도움을 빌어요',
  '오누이가 해와 달이 돼요',
];

const slides = [
  {
    kicker: '2차시 · LOOK',
    title: '우리 옛이야기 기획하기',
    subtitle: '이야기를 읽고, 사건 순서를 맞춘 뒤, 여섯 장면을 우리 생각으로 만듭니다.',
    visual: 'cover',
  },
  {
    kicker: '오늘의 약속',
    title: '사건 순서는 맞히고, 장면은 내가 정해요.',
    subtitle: '순서에는 정답이 있지만, 느낌과 모습에는 여러 답이 있어요.',
    visual: 'question',
  },
  {
    kicker: '오늘의 활동',
    title: '세 단계로 그림책을 기획합니다.',
    prompt: '읽기  →  사건 순서  →  장면 기획',
    visual: 'elements',
  },
  {
    kicker: '활동 1 · 이야기 선택',
    title: '이야기 하나를 골라 끝까지 읽어요.',
    subtitle: '교사가 준비한 고정 읽기 자료만 사용합니다.',
    visual: 'stories',
  },
  {
    kicker: '활동 1 · 읽으며 찾기',
    title: '첫째, 누가 나오는지 표시해요.',
    subtitle: '이야기에 실제로 나온 사람과 동물만 골라요.',
    visual: 'characters',
  },
  {
    kicker: '활동 1 · 읽으며 찾기',
    title: '둘째, 일이 일어난 곳을 찾아요.',
    subtitle: '장소가 바뀔 때 잠깐 멈추고 표시해요.',
    visual: 'backgrounds',
  },
  {
    kicker: '활동 1 · 읽으며 찾기',
    title: '셋째, 중요한 일을 여섯 개 찾아요.',
    subtitle: '없으면 다음 이야기가 이어지지 않는 일을 고릅니다.',
    visual: 'events',
  },
  {
    kicker: '순서 읽는 법',
    title: '먼저, 그다음, 마지막을 생각합니다.',
    subtitle: '원인과 결과가 자연스럽게 이어지는지 소리 내어 읽어 보세요.',
    visual: 'flow',
  },
  {
    kicker: '활동 2 · 사건 순서',
    title: '이 단계만 이야기 순서를 확인해요.',
    subtitle: '카드에는 답이 있습니다. 이야기 흐름대로 옮겨요.',
    visual: 'shuffle',
  },
  {
    kicker: '학생 활동',
    title: '순서를 맞춘 뒤, 장면 기획으로 넘어가요.',
    subtitle: '휴대폰에서는 앞·뒤 버튼을 쓰고, 장면에서는 선택지를 눌러요.',
    visual: 'webapp',
  },
  {
    kicker: '활동 3 · 장면 기획',
    title: '한 장면마다 네 가지를 내가 정해요.',
    subtitle: '긴 글을 쓰지 않고 알맞은 말을 골라요.',
    visual: 'six-scenes',
  },
  {
    kicker: '장면 기획 연습',
    title: '고른 말은 장면이 보이도록 구체적으로 말해요.',
    subtitle: '같은 사건도 친구마다 다르게 기획할 수 있어요.',
    visual: 'details',
  },
  {
    kicker: '오늘의 정리',
    title: '순서는 확인하고, 장면은 우리 생각으로 완성해요.',
    subtitle: '학생이 고른 네 가지가 모여 우리 모둠의 그림책 기획판이 됩니다.',
    visual: 'summary',
  },
];

const deck = Presentation.create({ slideSize: { width: W, height: H } });

function addShape(slide, geometry, position, options = {}) {
  const config = {
    geometry,
    name: options.name,
    position,
    fill: options.fill ?? 'none',
    line: {
      style: 'solid',
      fill: options.lineFill ?? 'none',
      width: options.lineWidth ?? 0,
    },
  };
  if (options.shadow) config.shadow = options.shadow;
  const result = slide.shapes.add(config);
  if (options.rotation) result.rotation = options.rotation;
  return result;
}

function addText(slide, value, position, options = {}) {
  const box = addShape(slide, 'textbox', position, {
    name: options.name,
    fill: options.fill,
    lineFill: options.lineFill,
    lineWidth: options.lineWidth,
  });
  box.text = value;
  box.text.style = {
    typeface: FONT,
    fontSize: options.fontSize ?? 24,
    bold: options.bold ?? false,
    color: options.color ?? C.ink,
    alignment: options.align ?? 'left',
    verticalAlignment: options.vertical ?? 'top',
    lineSpacing: options.lineSpacing ?? 1.18,
    autoFit: options.autoFit ?? 'none',
    insets: options.insets ?? { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return box;
}

function addRect(slide, position, fill, options = {}) {
  return addShape(slide, 'rect', position, {
    name: options.name,
    fill,
    lineFill: options.lineFill ?? 'none',
    lineWidth: options.lineWidth ?? 0,
    shadow: options.shadow,
    rotation: options.rotation,
  });
}

function addRule(slide, left, top, width, color = C.line, weight = 1) {
  return addShape(slide, 'line', { left, top, width, height: 0 }, {
    fill: 'none',
    lineFill: color,
    lineWidth: weight,
  });
}

function titleSize(value) {
  const length = [...value].length;
  if (length <= 20) return 46;
  if (length <= 25) return 42;
  if (length <= 30) return 38;
  return 35;
}

function addFooter(slide, number, color = C.muted) {
  addText(slide, SERIES, { left: 72, top: 686, width: 720, height: 18 }, {
    fontSize: 11,
    color,
    vertical: 'middle',
  });
  addText(slide, String(number).padStart(2, '0'), { left: 1148, top: 686, width: 60, height: 18 }, {
    fontSize: 11,
    bold: true,
    color,
    align: 'right',
    vertical: 'middle',
  });
}

function addBase(number, item, options = {}) {
  const slide = deck.slides.add();
  slide.background.fill = options.fill ?? C.sheet;
  addText(slide, item.kicker, { left: 72, top: 36, width: 720, height: 24 }, {
    fontSize: 15,
    bold: true,
    color: options.kickerColor ?? C.cinnabar,
    vertical: 'middle',
  });
  addRule(slide, 72, 72, 1136, options.ruleColor ?? C.line, 1);
  addFooter(slide, number, options.footerColor ?? C.muted);
  return slide;
}

function addHeading(slide, item, options = {}) {
  addText(slide, item.title, {
    left: options.left ?? 72,
    top: options.top ?? 98,
    width: options.width ?? 1136,
    height: options.height ?? 66,
  }, {
    fontSize: options.fontSize ?? titleSize(item.title),
    bold: true,
    color: options.color ?? C.ink,
    vertical: 'middle',
    lineSpacing: 1.03,
  });
  if (item.subtitle) {
    addText(slide, item.subtitle, {
      left: options.left ?? 72,
      top: options.subtitleTop ?? 178,
      width: options.subtitleWidth ?? 1100,
      height: options.subtitleHeight ?? 42,
    }, {
      fontSize: options.subtitleSize ?? 24,
      color: options.subtitleColor ?? C.muted,
      vertical: 'middle',
      lineSpacing: 1.28,
    });
  }
}

function addNotes(slide, includeAdaptation = false, extra = []) {
  const lines = ['[Sources]', `- ${CURRICULUM_SOURCE}`];
  if (includeAdaptation) lines.push(`- ${ADAPTATION_SOURCE}`);
  for (const source of extra) lines.push(`- ${source}`);
  lines.push('- No external imagery used; composition consists only of editable text, rules, and paper-strip panels.');
  slide.speakerNotes.textFrame.setText(lines.join('\n'));
  slide.speakerNotes.setVisible(true);
}

function addPaperStrip(slide, options) {
  const strip = addRect(slide, {
    left: options.left,
    top: options.top,
    width: options.width,
    height: options.height,
  }, options.fill ?? C.sheet, {
    lineFill: options.lineFill ?? C.line,
    lineWidth: options.lineWidth ?? 1,
    shadow: options.shadow ? 'shadow-sm' : undefined,
    rotation: options.rotation,
  });
  if (options.number) {
    addText(slide, options.number, {
      left: options.left + 18,
      top: options.top + 14,
      width: 46,
      height: options.height - 28,
    }, {
      fontSize: options.numberSize ?? 17,
      bold: true,
      color: options.numberColor ?? C.cinnabar,
      vertical: 'middle',
      align: 'center',
    });
    addRule(slide, options.left + 72, options.top + 14, 0, options.lineFill ?? C.line, 1);
  }
  if (options.title) {
    addText(slide, options.title, {
      left: options.left + (options.number ? 90 : 24),
      top: options.top + 10,
      width: options.width - (options.number ? 110 : 48),
      height: options.detail ? Math.min(42, options.height - 20) : options.height - 20,
    }, {
      fontSize: options.titleSize ?? 25,
      bold: options.bold ?? true,
      color: options.titleColor ?? C.ink,
      vertical: 'middle',
      lineSpacing: 1.16,
    });
  }
  if (options.detail) {
    addText(slide, options.detail, {
      left: options.left + (options.number ? 90 : 24),
      top: options.top + 52,
      width: options.width - (options.number ? 110 : 48),
      height: options.height - 62,
    }, {
      fontSize: options.detailSize ?? 21,
      color: options.detailColor ?? C.muted,
      vertical: 'middle',
      lineSpacing: 1.22,
    });
  }
  return strip;
}

// 01 · Cover
{
  const item = slides[0];
  const slide = deck.slides.add();
  slide.background.fill = C.paper;
  addRect(slide, { left: 870, top: 0, width: 410, height: H }, C.forest);
  addText(slide, 'AI와 함께 만드는 우리 옛이야기 그림책', { left: 72, top: 60, width: 720, height: 28 }, {
    fontSize: 17,
    bold: true,
    color: C.forest,
  });
  addRule(slide, 72, 120, 72, C.cinnabar, 6);
  addText(slide, item.title, { left: 72, top: 176, width: 750, height: 92 }, {
    fontSize: 58,
    bold: true,
    color: C.ink,
    vertical: 'middle',
  });
  addText(slide, item.subtitle, { left: 74, top: 306, width: 720, height: 80 }, {
    fontSize: 28,
    color: C.muted,
    lineSpacing: 1.45,
  });
  addText(slide, '2차시 · 창체+국어 · LOOK', { left: 74, top: 612, width: 420, height: 30 }, {
    fontSize: 18,
    bold: true,
    color: C.cinnabar,
  });
  addText(slide, '02', { left: 928, top: 54, width: 272, height: 170 }, {
    fontSize: 154,
    bold: false,
    color: C.sand,
    align: 'right',
    vertical: 'middle',
  });
  const coverWords = ['이야기 읽기', '사건 순서', '장면 선택', '여섯 장면'];
  coverWords.forEach((word, index) => {
    addText(slide, word, { left: 926, top: 286 + index * 72, width: 230, height: 48 }, {
      fontSize: 26,
      bold: true,
      color: C.white,
      vertical: 'middle',
    });
    addRule(slide, 926, 342 + index * 72, 230, '#557066', 1);
  });
  addNotes(slide, true);
}

// 02 · Essential question
{
  const item = slides[1];
  const slide = addBase(2, item, {
    fill: C.charcoal,
    kickerColor: '#D58A7E',
    ruleColor: '#44544C',
    footerColor: '#AEB8B0',
  });
  addHeading(slide, item, {
    top: 106,
    fontSize: 44,
    color: C.white,
    subtitleTop: 192,
    subtitleColor: '#D1D7D2',
  });
  addText(slide, '사건 순서', { left: 88, top: 316, width: 440, height: 58 }, {
    fontSize: 38,
    bold: true,
    color: '#D58A7E',
    vertical: 'middle',
  });
  addRule(slide, 88, 398, 440, '#53615A', 1);
  addText(slide, '이야기대로 맞혀요.', { left: 88, top: 430, width: 440, height: 54 }, {
    fontSize: 28,
    bold: true,
    color: C.white,
  });
  addRule(slide, 628, 302, 0, '#53615A', 2);
  addText(slide, '장면 기획', { left: 704, top: 316, width: 440, height: 58 }, {
    fontSize: 38,
    bold: true,
    color: '#D58A7E',
    vertical: 'middle',
  });
  addRule(slide, 704, 398, 440, C.cinnabar, 4);
  addText(slide, '누가·어디·느낌·모습은\n내가 골라요.', { left: 704, top: 424, width: 440, height: 92 }, {
    fontSize: 28,
    bold: true,
    color: C.white,
    lineSpacing: 1.3,
  });
  addText(slide, '친구와 다른 선택도 좋아요.', { left: 88, top: 594, width: 1056, height: 34 }, {
    fontSize: 24,
    bold: true,
    color: C.forestSoft,
    align: 'center',
  });
  addNotes(slide);
}

// 03 · Three elements
{
  const item = slides[2];
  const slide = addBase(3, item, { fill: C.sheet });
  addHeading(slide, item);
  const parts = [
    ['01', '읽기', '이야기를 끝까지 읽고 누가·어디·무슨 일을 찾아요'],
    ['02', '사건 순서', '섞인 사건 카드 여섯 개를 이야기대로 옮겨요'],
    ['03', '장면 기획', '장면마다 네 가지를 우리 생각으로 골라요'],
  ];
  parts.forEach(([number, title, detail], index) => {
    const x = 72 + index * 378;
    if (index > 0) addRule(slide, x - 28, 276, 0, C.line, 1);
    addText(slide, number, { left: x, top: 280, width: 68, height: 28 }, {
      fontSize: 16,
      bold: true,
      color: C.cinnabar,
    });
    addText(slide, title, { left: x, top: 336, width: 300, height: 64 }, {
      fontSize: title.length > 4 ? 36 : 42,
      bold: true,
      color: C.forest,
    });
    addRule(slide, x, 418, 300, index === 2 ? C.cinnabar : C.warmLine, index === 2 ? 4 : 1);
    addText(slide, detail, { left: x, top: 452, width: 300, height: 92 }, {
      fontSize: 22,
      color: C.muted,
      lineSpacing: 1.38,
    });
  });
  addRect(slide, { left: 72, top: 592, width: 1136, height: 54 }, C.forestSoft);
  addText(slide, item.prompt, { left: 96, top: 600, width: 1088, height: 38 }, {
    fontSize: 28,
    bold: true,
    color: C.forest,
    align: 'center',
    vertical: 'middle',
  });
  addNotes(slide);
}

// 04 · Story selection
{
  const item = slides[3];
  const slide = addBase(4, item, { fill: C.paper });
  addHeading(slide, item);
  const stories = [
    ['용기와 지혜', '해와 달이 된 오누이', '위험을 만난 오누이가 힘을 모아 어려움을 이겨냅니다.'],
    ['나눔과 배려', '흥부와 놀부', '서로 다른 마음을 가진 두 형제가 박씨를 통해 변화를 만납니다.'],
    ['서로 아끼는 마음', '의좋은 형제', '서로를 생각한 형과 동생이 밤길에서 깊은 우애를 확인합니다.'],
  ];
  stories.forEach(([theme, title, detail], index) => {
    const y = 270 + index * 112;
    addPaperStrip(slide, {
      left: 72,
      top: y,
      width: 1136,
      height: 94,
      number: `0${index + 1}`,
      title,
      detail,
      titleSize: 28,
      detailSize: 21,
      fill: C.sheet,
      lineFill: C.line,
      lineWidth: 1,
    });
    addText(slide, theme, { left: 942, top: y + 28, width: 222, height: 32 }, {
      fontSize: 18,
      bold: true,
      color: C.cinnabar,
      align: 'right',
      vertical: 'middle',
    });
  });
  addText(slide, '고른 이야기로 마지막 장면까지 활동해요.', { left: 72, top: 616, width: 1136, height: 30 }, {
    fontSize: 22,
    bold: true,
    color: C.forest,
    align: 'center',
  });
  addNotes(slide, true);
}

// 05 · Characters
{
  const item = slides[4];
  const slide = addBase(5, item, { fill: C.sheet });
  addHeading(slide, item);
  addText(slide, '읽으면서 이렇게 해요', { left: 72, top: 282, width: 410, height: 48 }, {
    fontSize: 34,
    bold: true,
    color: C.forest,
  });
  addRule(slide, 72, 354, 420, C.cinnabar, 4);
  addText(slide, '사람이나 동물 이름이 나오면\n눈으로 한 번 더 확인해요.', { left: 72, top: 392, width: 420, height: 112 }, {
    fontSize: 27,
    color: C.muted,
    lineSpacing: 1.35,
  });
  const characterTips = [
    ['01', '사람·동물 이름을 찾아요'],
    ['02', '실제로 나온 인물만 골라요'],
    ['03', '주인공 말고 다른 인물도 봐요'],
  ];
  characterTips.forEach(([number, label], index) => {
    const y = 286 + index * 92;
    addRect(slide, { left: 586, top: y, width: 598, height: 72 }, index === 0 ? C.forestSoft : C.paper, {
      lineFill: index === 0 ? C.forest : C.line,
      lineWidth: 1,
    });
    addText(slide, number, { left: 610, top: y + 16, width: 52, height: 40 }, {
      fontSize: 15,
      bold: true,
      color: C.cinnabar,
      vertical: 'middle',
    });
    addText(slide, label, { left: 686, top: y + 12, width: 466, height: 48 }, {
      fontSize: 25,
      bold: true,
      color: C.forest,
      vertical: 'middle',
    });
  });
  addText(slide, '모르면 읽기 자료로 돌아가 다시 찾아요.', { left: 586, top: 590, width: 598, height: 38 }, {
    fontSize: 22,
    bold: true,
    color: C.cinnabar,
    align: 'center',
  });
  addNotes(slide, true);
}

// 06 · Backgrounds
{
  const item = slides[5];
  const slide = addBase(6, item, { fill: C.paper });
  addHeading(slide, item);
  const places = [
    ['01', '시작한 곳', '이야기는 어디에서 시작했나요?'],
    ['02', '큰일이 생긴 곳', '가장 중요한 일은 어디에서 생겼나요?'],
    ['03', '끝난 곳', '마지막 장면은 어디인가요?'],
  ];
  places.forEach(([number, title, detail], index) => {
    const x = 72 + index * 378;
    addText(slide, number, { left: x, top: 292, width: 54, height: 28 }, {
      fontSize: 15,
      bold: true,
      color: C.cinnabar,
    });
    addText(slide, title, { left: x, top: 346, width: 330, height: 74 }, {
      fontSize: title.length > 6 ? 32 : 38,
      bold: true,
      color: C.forest,
      vertical: 'middle',
    });
    addRule(slide, x, 444, 330, index === 2 ? C.cinnabar : C.warmLine, index === 2 ? 4 : 1);
    addText(slide, detail, { left: x, top: 472, width: 330, height: 88 }, {
      fontSize: 22,
      color: C.muted,
      lineSpacing: 1.35,
    });
    if (index < 2) addText(slide, '→', { left: x + 332, top: 374, width: 34, height: 42 }, {
      fontSize: 28,
      color: C.cinnabar,
      align: 'center',
      vertical: 'middle',
    });
  });
  addText(slide, '장소 이름은 읽기 자료에 나온 말에서 찾아요.', { left: 72, top: 600, width: 1136, height: 36 }, {
    fontSize: 25,
    bold: true,
    color: C.forest,
    align: 'center',
  });
  addNotes(slide, true);
}

// 07 · Events
{
  const item = slides[6];
  const slide = addBase(7, item, { fill: C.sheet });
  addHeading(slide, item);
  const eventChecks = [
    ['01', '이 일이 빠지면\n이야기가 달라지나요?'],
    ['02', '인물이 움직이거나\n중요한 선택을 하나요?'],
    ['03', '문제가 생기거나\n풀리는 장면인가요?'],
  ];
  eventChecks.forEach(([number, question], index) => {
    const x = 72 + index * 378;
    addText(slide, number, { left: x, top: 286, width: 58, height: 30 }, {
      fontSize: 16,
      bold: true,
      color: C.cinnabar,
    });
    addText(slide, question, { left: x, top: 346, width: 320, height: 116 }, {
      fontSize: 28,
      bold: true,
      color: C.forest,
      lineSpacing: 1.28,
    });
    addRule(slide, x, 492, 320, index === 2 ? C.cinnabar : C.warmLine, index === 2 ? 4 : 1);
  });
  addRect(slide, { left: 72, top: 548, width: 1136, height: 82 }, C.forestSoft);
  addText(slide, '중요한 일 여섯 개는 웹앱에서 사건 카드로 나와요.', { left: 96, top: 562, width: 1088, height: 54 }, {
    fontSize: 27,
    bold: true,
    color: C.forest,
    align: 'center',
    vertical: 'middle',
  });
  addNotes(slide, true);
}

// 08 · Sequence logic
{
  const item = slides[7];
  const slide = addBase(8, item, { fill: C.charcoal, kickerColor: '#D58A7E', ruleColor: '#44544C', footerColor: '#AEB8B0' });
  addHeading(slide, item, {
    color: C.white,
    subtitleColor: '#D1D7D2',
  });
  const flow = [
    ['01', '먼저', '이야기가 시작된 까닭'],
    ['02', '그다음', '이어지는 중요한 일'],
    ['03', '마지막', '사건이 끝난 모습'],
  ];
  flow.forEach(([number, title, detail], index) => {
    const x = 82 + index * 390;
    addText(slide, number, { left: x, top: 302, width: 54, height: 26 }, {
      fontSize: 15,
      bold: true,
      color: '#D58A7E',
    });
    addText(slide, title, { left: x, top: 364, width: 300, height: 64 }, {
      fontSize: 42,
      bold: true,
      color: C.white,
    });
    addRule(slide, x, 452, 302, index === 2 ? C.cinnabar : '#56645D', index === 2 ? 5 : 1);
    addText(slide, detail, { left: x, top: 486, width: 302, height: 68 }, {
      fontSize: 24,
      color: '#BFC8C2',
      lineSpacing: 1.35,
    });
    if (index < 2) addText(slide, '→', { left: x + 318, top: 374, width: 42, height: 44 }, {
      fontSize: 30,
      color: '#D58A7E',
      align: 'center',
      vertical: 'middle',
    });
  });
  addText(slide, '원인과 결과가 자연스럽게 이어지는지 소리 내어 읽어 봅니다.', { left: 82, top: 610, width: 1100, height: 34 }, {
    fontSize: 24,
    bold: true,
    color: C.forestSoft,
  });
  addNotes(slide, true);
}

// 09 · Shuffled cards
{
  const item = slides[8];
  const slide = addBase(9, item, { fill: C.paper });
  addHeading(slide, item);
  const order = [3, 0, 5, 2, 1, 4];
  order.forEach((eventIndex, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 76 + col * 574;
    const y = 276 + row * 104;
    const rotation = index % 2 === 0 ? -0.35 : 0.35;
    addPaperStrip(slide, {
      left: x,
      top: y,
      width: 548,
      height: 82,
      number: String.fromCharCode(65 + index),
      title: shortEvents[eventIndex],
      titleSize: 23,
      fill: C.sheet,
      lineFill: C.warmLine,
      shadow: true,
      rotation,
    });
  });
  addRect(slide, { left: 76, top: 602, width: 1124, height: 46 }, C.cinnabar);
  addText(slide, 'A~F 카드를 이야기 순서대로 옮겨 보세요.', { left: 100, top: 608, width: 1076, height: 34 }, {
    fontSize: 24,
    bold: true,
    color: C.white,
    align: 'center',
    vertical: 'middle',
  });
  addNotes(slide, true);
}

// 10 · Web app demo
{
  const item = slides[9];
  const slide = addBase(10, item, { fill: C.sheet });
  addHeading(slide, item, { fontSize: 40 });
  addPaperStrip(slide, {
    left: 80,
    top: 282,
    width: 450,
    height: 274,
    number: '1 / 2',
    title: '사건 순서',
    detail: '사건 카드를 옮기고\n‘순서 확인’을 눌러요.',
    titleSize: 38,
    detailSize: 24,
    fill: C.paper,
    lineFill: C.warmLine,
    lineWidth: 1,
    shadow: true,
  });
  const actions = [
    ['사건 순서', '휴대폰은 앞·뒤 버튼으로 옮겨요'],
    ['장면 기획', '선택지를 눌러 내 생각을 골라요'],
  ];
  actions.forEach(([device, action], index) => {
    const y = 292 + index * 92;
    addText(slide, device, { left: 616, top: y, width: 150, height: 42 }, {
      fontSize: 21,
      bold: true,
      color: C.cinnabar,
      vertical: 'middle',
    });
    addText(slide, action, { left: 782, top: y, width: 394, height: 52 }, {
      fontSize: 23,
      bold: true,
      color: C.forest,
      vertical: 'middle',
    });
    addRule(slide, 616, y + 66, 560, C.line, 1);
  });
  const linkBox = addShape(slide, 'textbox', { left: 616, top: 494, width: 560, height: 62 }, {
    fill: C.forest,
    lineFill: C.forest,
    lineWidth: 1,
  });
  linkBox.text = [[{
    run: '학생 웹앱 열기  ·  2차시',
    textStyle: { bold: true, color: C.white, fontSize: '24px', typeface: FONT, underline: 'sng' },
    link: { uri: LESSON2_URL, isExternal: true },
  }]];
  linkBox.text.style = {
    typeface: FONT,
    fontSize: 24,
    bold: true,
    color: C.white,
    alignment: 'center',
    verticalAlignment: 'middle',
    autoFit: 'none',
    insets: { top: 12, right: 16, bottom: 12, left: 16 },
  };
  addText(slide, LESSON2_URL, { left: 618, top: 580, width: 556, height: 30 }, {
    fontSize: 18,
    color: C.muted,
    align: 'center',
  });
  addNotes(slide, true, [`Student activity URL: ${LESSON2_URL}`]);
}

// 11 · Six scene titles
{
  const item = slides[10];
  const slide = addBase(11, item, { fill: C.paper });
  addHeading(slide, item);
  const sceneQuestions = [
    ['01', '누가 나오나요?', '이 장면에 꼭 필요한 인물'],
    ['02', '어디인가요?', '일이 일어나는 장소'],
    ['03', '어떤 느낌인가요?', '기쁨·걱정·무서움 같은 느낌'],
    ['04', '무엇을 그리고 싶나요?', '눈에 보이게 넣고 싶은 모습'],
  ];
  sceneQuestions.forEach(([number, question, hint], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 72 + col * 578;
    const y = 270 + row * 160;
    addText(slide, number, { left: x, top: y, width: 56, height: 32 }, {
      fontSize: 17,
      bold: true,
      color: C.cinnabar,
    });
    addText(slide, question, { left: x + 76, top: y - 4, width: 450, height: 46 }, {
      fontSize: 29,
      bold: true,
      color: C.forest,
      vertical: 'middle',
    });
    addRule(slide, x, y + 56, 526, index === 3 ? C.cinnabar : C.warmLine, index === 3 ? 4 : 1);
    addText(slide, hint, { left: x + 76, top: y + 76, width: 450, height: 52 }, {
      fontSize: 21,
      color: C.muted,
      vertical: 'middle',
    });
  });
  addText(slide, '한 장면씩 네 가지를 고르면 여섯 장면 기획판이 완성돼요.', { left: 72, top: 606, width: 1136, height: 40 }, {
    fontSize: 24,
    bold: true,
    color: C.forest,
    align: 'center',
  });
  addNotes(slide, true);
}

// 12 · Add one useful detail
{
  const item = slides[11];
  const slide = addBase(12, item, { fill: C.sheet });
  addHeading(slide, item, { fontSize: 38 });
  addRect(slide, { left: 72, top: 250, width: 1136, height: 58 }, C.forestSoft, {
    lineFill: C.forest,
    lineWidth: 1,
  });
  addText(slide, '사건 2  ·  산길에서 호랑이가 어머니를 만나요.', { left: 96, top: 260, width: 1088, height: 38 }, {
    fontSize: 24,
    bold: true,
    color: C.forest,
    vertical: 'middle',
  });
  const details = [
    ['누가', '어머니와 호랑이'],
    ['어디', '깜깜한 산길'],
    ['느낌', '무서워요'],
    ['그리고 싶은 모습', '입을 크게 벌린 호랑이'],
  ];
  details.forEach(([label, choice], index) => {
    const y = 334 + index * 64;
    addText(slide, String(index + 1).padStart(2, '0'), { left: 76, top: y, width: 48, height: 42 }, {
      fontSize: 14,
      bold: true,
      color: C.cinnabar,
      vertical: 'middle',
    });
    addText(slide, label, { left: 144, top: y, width: 220, height: 42 }, {
      fontSize: 23,
      bold: true,
      color: C.forest,
      vertical: 'middle',
    });
    addText(slide, choice, { left: 350, top: y, width: 300, height: 42 }, {
      fontSize: 23,
      bold: true,
      color: C.ink,
      vertical: 'middle',
    });
    addRule(slide, 144, y + 52, 506, C.line, 1);
  });
  addRect(slide, { left: 714, top: 334, width: 462, height: 256 }, C.paper, {
    lineFill: C.warmLine,
    lineWidth: 1,
  });
  addText(slide, '한 가지 예예요', { left: 754, top: 368, width: 382, height: 52 }, {
    fontSize: 32,
    bold: true,
    color: C.forest,
    align: 'center',
  });
  addRule(slide, 854, 438, 182, C.cinnabar, 4);
  addText(slide, '다른 느낌이나 모습을 골라도\n맞는 기획이에요.', { left: 754, top: 468, width: 382, height: 78 }, {
    fontSize: 23,
    bold: true,
    color: C.muted,
    lineSpacing: 1.35,
    align: 'center',
  });
  addText(slide, '장면이 눈앞에 떠오르는 말을 골라요.', { left: 72, top: 616, width: 1136, height: 30 }, {
    fontSize: 22,
    bold: true,
    color: C.cinnabar,
    align: 'center',
  });
  addNotes(slide, true);
}

// 13 · Summary
{
  const item = slides[12];
  const slide = addBase(13, item, {
    fill: C.charcoal,
    kickerColor: '#D58A7E',
    ruleColor: '#44544C',
    footerColor: '#AEB8B0',
  });
  addHeading(slide, item, {
    top: 94,
    fontSize: 35,
    color: C.white,
    subtitleTop: 164,
    subtitleColor: '#D1D7D2',
  });
  const scenes = ['01', '02', '03', '04', '05', '06'];
  scenes.forEach((number, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = 92 + col * 370;
    const y = 276 + row * 132;
    addText(slide, number, { left: x, top: y, width: 48, height: 36 }, {
      fontSize: 18,
      bold: true,
      color: '#D58A7E',
      vertical: 'middle',
    });
    addRule(slide, x, y + 50, 330, index === 5 ? C.cinnabar : '#53615A', index === 5 ? 4 : 1);
    addText(slide, '누가 · 어디 · 느낌 · 모습', { left: x, top: y + 70, width: 330, height: 34 }, {
      fontSize: 21,
      bold: true,
      color: C.white,
      vertical: 'middle',
    });
  });
  addRect(slide, { left: 330, top: 576, width: 620, height: 52 }, C.forestSoft);
  addText(slide, '여섯 장면 모두 골랐으면 2차시 완료', { left: 354, top: 584, width: 572, height: 36 }, {
    fontSize: 23,
    bold: true,
    color: C.forest,
    align: 'center',
    vertical: 'middle',
  });
  addNotes(slide, true);
}

async function writeBlob(outputPath, blob) {
  await fs.writeFile(outputPath, new Uint8Array(await blob.arrayBuffer()));
}

async function normalizePptxMetadata(outputPath) {
  const archive = await JSZip.loadAsync(await fs.readFile(outputPath));
  const timestamp = new Date().toISOString();
  archive.file('docProps/core.xml', [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">',
    '<dc:title>AI와 함께 만드는 우리 옛이야기 그림책 · 2차시</dc:title>',
    '<dc:subject>옛이야기의 인물·배경·사건과 여섯 장면 구성</dc:subject>',
    '<dc:creator>EDU STORY</dc:creator>',
    '<cp:lastModifiedBy>EDU STORY</cp:lastModifiedBy>',
    '<dc:description>초등 3~4학년용 2차시 수업 프레젠테이션</dc:description>',
    `<dcterms:created xsi:type="dcterms:W3CDTF">${timestamp}</dcterms:created>`,
    `<dcterms:modified xsi:type="dcterms:W3CDTF">${timestamp}</dcterms:modified>`,
    '</cp:coreProperties>',
  ].join(''));
  archive.file('docProps/app.xml', [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">',
    '<Application>Microsoft PowerPoint</Application>',
    '<PresentationFormat>On-screen Show (16:9)</PresentationFormat>',
    '<Company>EDU STORY</Company>',
    '<Slides>13</Slides>',
    '<Notes>13</Notes>',
    '<HiddenSlides>0</HiddenSlides>',
    '<SharedDoc>false</SharedDoc>',
    '<DocSecurity>0</DocSecurity>',
    '</Properties>',
  ].join(''));
  await Promise.all(Object.keys(archive.files)
    .filter((entryPath) => /\.(xml|rels)$/i.test(entryPath))
    .map(async (entryPath) => {
      const entry = archive.file(entryPath);
      if (!entry) return;
      const xml = await entry.async('string');
      archive.file(entryPath, xml
        .replaceAll('ChatGPT', 'EDU STORY')
        .replaceAll('Walnut Exporter', 'EDU STORY'));
    }));
  const cleaned = await archive.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
    platform: 'DOS',
  });
  await fs.writeFile(outputPath, cleaned);
}

await fs.mkdir(TMP, { recursive: true });
await fs.mkdir(path.dirname(FINAL), { recursive: true });
const renderDir = path.join(TMP, 'artifact-render');
const layoutDir = path.join(TMP, 'layouts');
await fs.rm(renderDir, { recursive: true, force: true });
await fs.rm(layoutDir, { recursive: true, force: true });
await fs.mkdir(renderDir, { recursive: true });
await fs.mkdir(layoutDir, { recursive: true });

await fs.writeFile(path.join(TMP, 'source-notes.txt'), [
  CURRICULUM_SOURCE,
  ADAPTATION_SOURCE,
  'No external imagery, SVG, generated art, or gradients are used.',
].join('\n'));

for (const [index, slide] of deck.slides.items.entries()) {
  const stem = `slide-${String(index + 1).padStart(2, '0')}`;
  await writeBlob(path.join(renderDir, `${stem}.png`), await deck.export({ slide, format: 'png', scale: 1 }));
  const layout = await slide.export({ format: 'layout' });
  await fs.writeFile(path.join(layoutDir, `${stem}.json`), await layout.text());
}

await writeBlob(path.join(TMP, 'lesson02-montage.webp'), await deck.export({ format: 'webp', montage: true, scale: 1 }));
const inspection = await deck.inspect({ kind: 'slide,textbox,shape,notes', maxChars: 90000 });
await fs.writeFile(path.join(TMP, 'presentation-inspect.ndjson'), inspection.ndjson);

const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(FINAL);
await normalizePptxMetadata(FINAL);
await fs.rm(`${FINAL}.inspect.ndjson`, { force: true });

console.log(`Exported ${deck.slides.items.length} slides to ${FINAL}`);

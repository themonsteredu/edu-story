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

const storyEvents = [
  '어머니가 장에 떡을 팔러 떠나요',
  '산길에서 호랑이가 어머니를 만나요.',
  '호랑이가 오누이의 집으로 찾아와요.',
  '오누이가 호랑이를 피해 큰 나무로 올라가요.',
  '오누이가 하늘을 향해 도와 달라고 빌어요.',
  '오누이는 해와 달이 되어 하늘을 밝혀요.',
];

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
    subtitle: '이야기를 고른 뒤, 교사가 검토해 고정한 읽기 자료를 함께 읽어요.',
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
    title: '여섯 사건이 여섯 장면의 제목이 됩니다.',
    subtitle: '한 장면에 한 가지 중요한 일이 보이도록 나눕니다.',
    visual: 'six-scenes',
  },
  {
    kicker: '더 자세히 알려주기',
    title: '처음 보는 친구가 이해하려면 무엇을 더 알려줘야 할까요?',
    subtitle: '표정, 시간, 주변 모습, 중요한 물건, 소리 중에서 각 장면마다 하나씩 골라 말해 봅니다.',
    visual: 'details',
  },
  {
    kicker: '오늘의 정리',
    title: '인물·배경·사건을 찾으면 이야기의 뼈대를 만들 수 있습니다.',
    subtitle: '우리 모둠의 옛이야기를 여섯 장면으로 완성했습니다.',
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
  if (length <= 20) return 52;
  if (length <= 25) return 46;
  if (length <= 30) return 41;
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
    fontSize: 64,
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
  const coverWords = ['인물', '배경', '사건', '여섯 장면'];
  coverWords.forEach((word, index) => {
    addText(slide, word, { left: 926, top: 286 + index * 72, width: 230, height: 48 }, {
      fontSize: index === 3 ? 26 : 30,
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
    fontSize: 54,
    color: C.white,
    subtitleTop: 192,
    subtitleColor: '#D1D7D2',
  });
  addText(slide, '?', { left: 80, top: 302, width: 220, height: 258 }, {
    fontSize: 220,
    color: C.cinnabar,
    vertical: 'middle',
  });
  addRule(slide, 346, 330, 0, '#53615A', 2);
  addText(slide, '이야기 속에서 반복해서 찾아야 할 것은 무엇일까요?', { left: 396, top: 348, width: 720, height: 122 }, {
    fontSize: 37,
    bold: true,
    color: C.white,
    lineSpacing: 1.38,
    vertical: 'middle',
  });
  addText(slide, '손을 들고 한 가지를 먼저 말해 봅시다.', { left: 398, top: 506, width: 670, height: 38 }, {
    fontSize: 24,
    color: '#BBC5BF',
  });
  addNotes(slide);
}

// 03 · Three elements
{
  const item = slides[2];
  const slide = addBase(3, item, { fill: C.sheet });
  addHeading(slide, item);
  const parts = [
    ['01', '인물', '이야기에 나오는 사람이나 동물'],
    ['02', '배경', '이야기가 펼쳐지는 때와 장소'],
    ['03', '사건', '이야기에서 실제로 일어난 일'],
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
      fontSize: 44,
      bold: true,
      color: C.forest,
    });
    addRule(slide, x, 418, 300, index === 2 ? C.cinnabar : C.warmLine, index === 2 ? 4 : 1);
    addText(slide, detail, { left: x, top: 452, width: 300, height: 92 }, {
      fontSize: 24,
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
      fill: index === 0 ? C.forestSoft : C.sheet,
      lineFill: index === 0 ? C.forest : C.line,
      lineWidth: index === 0 ? 2 : 1,
    });
    addText(slide, theme, { left: 942, top: y + 28, width: 222, height: 32 }, {
      fontSize: 18,
      bold: true,
      color: index === 0 ? C.forest : C.cinnabar,
      align: 'right',
      vertical: 'middle',
    });
  });
  addNotes(slide, true);
}

// 05 · Characters
{
  const item = slides[4];
  const slide = addBase(5, item, { fill: C.sheet });
  addHeading(slide, item);
  addText(slide, '해와 달이 된 오누이', { left: 72, top: 260, width: 300, height: 30 }, {
    fontSize: 18,
    bold: true,
    color: C.cinnabar,
  });
  addText(slide, '이야기에 실제로 나오는 인물', { left: 72, top: 314, width: 430, height: 92 }, {
    fontSize: 38,
    bold: true,
    color: C.forest,
    lineSpacing: 1.25,
  });
  addRule(slide, 72, 444, 420, C.warmLine, 1);
  addText(slide, '주인공과 사건을 함께 만드는 인물을 모두 찾습니다.', { left: 72, top: 474, width: 420, height: 78 }, {
    fontSize: 24,
    color: C.muted,
    lineSpacing: 1.4,
  });
  const characters = [
    ['오누이', true], ['어머니', true], ['호랑이', true], ['제비', false], ['임금', false],
  ];
  characters.forEach(([label, correct], index) => {
    const y = 272 + index * 66;
    addRect(slide, { left: 586, top: y, width: 598, height: 52 }, correct ? C.forest : C.paper, {
      lineFill: correct ? C.forest : C.line,
      lineWidth: 1,
    });
    addText(slide, String(index + 1).padStart(2, '0'), { left: 606, top: y + 8, width: 50, height: 36 }, {
      fontSize: 15,
      bold: true,
      color: correct ? C.sand : C.cinnabar,
      vertical: 'middle',
    });
    addText(slide, label, { left: 678, top: y + 6, width: 310, height: 40 }, {
      fontSize: 26,
      bold: true,
      color: correct ? C.white : C.muted,
      vertical: 'middle',
    });
    addText(slide, correct ? '이야기에 나와요' : '다른 이야기 인물', { left: 986, top: y + 8, width: 170, height: 36 }, {
      fontSize: 17,
      color: correct ? '#DCE7E1' : C.muted,
      align: 'right',
      vertical: 'middle',
    });
  });
  addNotes(slide, true);
}

// 06 · Backgrounds
{
  const item = slides[5];
  const slide = addBase(6, item, { fill: C.paper });
  addHeading(slide, item);
  const places = [
    ['01', '산길', '사건이 시작되는 곳'],
    ['02', '오누이의 집', '위험이 찾아오는 곳'],
    ['03', '큰 나무', '오누이가 피하는 곳'],
    ['04', '하늘', '이야기가 마무리되는 곳'],
  ];
  places.forEach(([number, title, detail], index) => {
    const x = 72 + index * 284;
    addText(slide, number, { left: x, top: 292, width: 54, height: 28 }, {
      fontSize: 15,
      bold: true,
      color: C.cinnabar,
    });
    addText(slide, title, { left: x, top: 346, width: 244, height: 74 }, {
      fontSize: title.length > 5 ? 30 : 38,
      bold: true,
      color: C.forest,
      vertical: 'middle',
    });
    addRule(slide, x, 444, 244, index === 3 ? C.cinnabar : C.warmLine, index === 3 ? 4 : 1);
    addText(slide, detail, { left: x, top: 472, width: 244, height: 76 }, {
      fontSize: 22,
      color: C.muted,
      lineSpacing: 1.35,
    });
    if (index < 3) addText(slide, '→', { left: x + 246, top: 374, width: 34, height: 42 }, {
      fontSize: 28,
      color: C.cinnabar,
      align: 'center',
      vertical: 'middle',
    });
  });
  addText(slide, '장소가 바뀌는 순서를 따라가면 사건의 흐름도 보입니다.', { left: 72, top: 600, width: 1136, height: 36 }, {
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
  storyEvents.forEach((event, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 72 + col * 578;
    const y = 270 + row * 112;
    addPaperStrip(slide, {
      left: x,
      top: y,
      width: 558,
      height: 92,
      number: String(index + 1),
      title: event,
      titleSize: 23,
      fill: row % 2 === 0 ? C.paper : C.sheet,
      lineFill: C.line,
      shadow: row === 1,
    });
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
    number: '03 / 04',
    title: '사건 순서',
    detail: '우리 모둠이 고른 이야기의 사건 카드를 순서대로 놓습니다.',
    titleSize: 42,
    detailSize: 24,
    fill: C.paper,
    lineFill: C.warmLine,
    lineWidth: 1,
    shadow: true,
  });
  const actions = [
    ['태블릿', '카드를 손가락으로 끌어서 옮겨요'],
    ['휴대폰', '앞으로·뒤로 버튼으로 움직여요'],
  ];
  actions.forEach(([device, action], index) => {
    const y = 292 + index * 92;
    addText(slide, device, { left: 616, top: y, width: 150, height: 42 }, {
      fontSize: 23,
      bold: true,
      color: C.cinnabar,
      vertical: 'middle',
    });
    addText(slide, action, { left: 782, top: y, width: 394, height: 52 }, {
      fontSize: 24,
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
  shortEvents.forEach((event, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = 72 + col * 378;
    const y = 276 + row * 160;
    addText(slide, String(index + 1).padStart(2, '0'), { left: x, top: y, width: 56, height: 38 }, {
      fontSize: 23,
      bold: true,
      color: C.cinnabar,
    });
    addRule(slide, x, y + 52, 330, index === 5 ? C.cinnabar : C.warmLine, index === 5 ? 4 : 1);
    addText(slide, event, { left: x, top: y + 72, width: 330, height: 68 }, {
      fontSize: 24,
      bold: true,
      color: C.forest,
      lineSpacing: 1.3,
    });
  });
  addText(slide, '한 장면에는 중요한 일 한 가지가 보이게 합니다.', { left: 72, top: 612, width: 1136, height: 34 }, {
    fontSize: 25,
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
  addHeading(slide, item, { fontSize: 35 });
  const details = ['표정', '시간', '주변 모습', '중요한 물건', '소리'];
  details.forEach((detail, index) => {
    const y = 266 + index * 68;
    addText(slide, String(index + 1).padStart(2, '0'), { left: 76, top: y, width: 54, height: 44 }, {
      fontSize: 15,
      bold: true,
      color: C.cinnabar,
      vertical: 'middle',
    });
    addText(slide, detail, { left: 150, top: y, width: 360, height: 44 }, {
      fontSize: 29,
      bold: true,
      color: C.forest,
      vertical: 'middle',
    });
    addRule(slide, 150, y + 54, 430, C.line, 1);
  });
  addRect(slide, { left: 676, top: 266, width: 500, height: 334 }, C.paper, {
    lineFill: C.warmLine,
    lineWidth: 1,
  });
  addText(slide, '각 장면마다 하나씩', { left: 716, top: 304, width: 420, height: 58 }, {
    fontSize: 37,
    bold: true,
    color: C.forest,
    align: 'center',
  });
  addRule(slide, 842, 390, 168, C.cinnabar, 5);
  addText(slide, '장면을 이해하는 데 꼭 필요한 추가 정보 한 가지씩을 골라요.', { left: 712, top: 424, width: 428, height: 76 }, {
    fontSize: 24,
    color: C.muted,
    lineSpacing: 1.35,
    align: 'center',
  });
  addRect(slide, { left: 708, top: 522, width: 436, height: 52 }, C.forestSoft);
  addText(slide, 'AI에게도 장면을 자세히 알려줘야 해요.', { left: 724, top: 530, width: 404, height: 36 }, {
    fontSize: 22,
    bold: true,
    color: C.forest,
    align: 'center',
    vertical: 'middle',
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
  const words = ['인물', '배경', '사건'];
  words.forEach((word, index) => {
    addText(slide, word, { left: 92 + index * 370, top: 286, width: 330, height: 54 }, {
      fontSize: 31,
      bold: true,
      color: '#D58A7E',
      align: 'center',
      vertical: 'middle',
    });
    addRule(slide, 92 + index * 370, 360, 330, '#53615A', 1);
  });
  addText(slide, '여섯 장면의 이야기 뼈대', { left: 150, top: 414, width: 980, height: 84 }, {
    fontSize: 54,
    bold: true,
    color: C.white,
    align: 'center',
    vertical: 'middle',
  });
  addRect(slide, { left: 330, top: 552, width: 620, height: 56 }, C.forestSoft);
  addText(slide, '우리 모둠 이야기판 완성', { left: 354, top: 562, width: 572, height: 36 }, {
    fontSize: 26,
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

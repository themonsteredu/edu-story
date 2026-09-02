import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Presentation, PresentationFile } from '@oai/artifact-tool';
import JSZip from 'jszip';
import sharp from 'sharp';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.EDU_STORY_ROOT || path.resolve(SCRIPT_DIR, '../..');
const TMP = process.env.LESSON03_PPT_TMP || path.join(ROOT, 'tmp', 'lesson03-ppt');
const FINAL = path.join(ROOT, 'public', 'resources', 'lesson-03', '01_3차시_수업PPT.pptx');

const W = 1280;
const H = 720;
const FONT = 'S-Core Dream';
const LESSON3_URL = 'https://edu-story-nine.vercel.app/lesson/3';
const AUDIO_URLS = {
  birds: 'https://edu-story-nine.vercel.app/assets/lesson-03/birds-morning.wav',
  rain: 'https://edu-story-nine.vercel.app/assets/lesson-03/rain-soft.wav',
  thunder: 'https://edu-story-nine.vercel.app/assets/lesson-03/thunder-low.wav',
  wind: 'https://edu-story-nine.vercel.app/assets/lesson-03/wind-low.wav',
};

const C = {
  paper: '#F6F0E4',
  sheet: '#FFFDF7',
  ink: '#252722',
  forest: '#183E32',
  forestSoft: '#DEE7DE',
  charcoal: '#17231F',
  muted: '#6E6A61',
  cinnabar: '#9C3124',
  rose: '#E8D8D1',
  sand: '#E8DDCB',
  line: '#C8BCA9',
  warmLine: '#AD9F89',
  white: '#FFFFFF',
  blue: '#264A60',
  blueSoft: '#DDE8EC',
};

const SERIES = 'AI와 함께 만드는 우리 옛이야기 그림책 · 3차시 EXPLORE';
const CURRICULUM_SOURCE = 'User-provided curriculum: AI융합_옛이야기그림책_10차시_지도안_1.docx';
const LESSON_SOURCE = 'EDU STORY lesson 3 instructional adaptation: text, image, and sound data classification and scene-data planning';
const NO_GEN_AI = 'No generative AI, generated imagery, SVG illustration, or external classroom tool is used in this lesson deck.';

const PHOTO_SOURCES = {
  classroom: 'Ahmadreza Rezaie, Unsplash: https://unsplash.com/photos/children-learning-and-creating-art-in-a-classroom-FxzoAr9QBKw',
  camera: 'Lisa Fotios, Pexels: https://www.pexels.com/photo/person-holding-black-android-smartphone-taking-photo-of-green-leaf-plant-1290515/',
  ruler: 'Tamarcus Brown, Unsplash: https://unsplash.com/photos/person-holding-ruler-and-pencil-on-spiral-notebook-eKkeKfDt1Vk',
};

const slides = [
  {
    kicker: '3차시 · EXPLORE',
    title: 'AI가 이해하는 데이터',
    subtitle: '문자·이미지·소리를 구분하고, 한 장면에 알맞은 자료를 골라 봅니다.',
  },
  {
    kicker: '오늘의 활동',
    title: '자료를 세 바구니에 나눠요.',
    subtitle: '읽는 자료, 보는 자료, 듣는 자료를 구분합니다.',
  },
  {
    kicker: '데이터 알아보기',
    title: '데이터는 생각을 돕는 자료예요.',
    subtitle: '읽고, 보고, 들으며 알 수 있는 자료를 데이터라고 해요.',
  },
  {
    kicker: '문자 데이터',
    title: '글자로 읽는 것은 문자 데이터예요.',
    subtitle: '이름, 낱말, 문장처럼 글자로 적힌 자료입니다.',
  },
  {
    kicker: '이미지 데이터',
    title: '사진도 눈으로 읽는 이미지 데이터예요.',
    subtitle: '모양·색·위치를 자세히 살펴봅니다.',
  },
  {
    kicker: '소리 데이터',
    title: '소리는 귀로 듣는 데이터예요.',
    subtitle: '재생 버튼을 누르고 소리의 종류와 느낌을 골라요.',
  },
  {
    kicker: '활동 1 · 분류하기',
    title: '읽고, 보고, 들으며 바구니를 찾아요.',
    subtitle: '자료를 눌러 문자·이미지·소리에 놓습니다.',
  },
  {
    kicker: '같은 장면, 다른 자료',
    title: '같은 장면도 고른 자료에 따라 느낌이 달라져요.',
    subtitle: '다음 두 자료 묶음을 천천히 비교해 봅시다.',
  },
  {
    kicker: '자료 묶음 A',
    title: '밝은 사진을 보고 새소리를 들어 봐요.',
    subtitle: '같은 장면 문장에 밝은 자료를 더했습니다.',
  },
  {
    kicker: '자료 묶음 B',
    title: '어두운 사진을 보고 천둥을 들어 봐요.',
    subtitle: '같은 장면 문장에 긴장되는 자료를 더했습니다.',
  },
  {
    kicker: '활동 2 · 비교하기',
    title: '자료가 달라지면 장면의 느낌도 달라져요.',
    subtitle: '어느 쪽이 더 밝고, 어느 쪽이 더 긴장되는지 골라 봅니다.',
  },
  {
    kicker: '활동 3 · 나의 데이터 꾸러미',
    title: '2차시에서 기획한 장면에 자료 세 가지를 골라요.',
    subtitle: '긴 글을 쓰지 않고 알맞은 선택지를 누릅니다.',
  },
  {
    kicker: '오늘의 정리',
    title: '문자·이미지·소리를 골라 장면을 또렷하게 만들어요.',
    subtitle: '내가 고른 자료가 장면의 모습과 느낌을 정합니다.',
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
  if (length <= 20) return 42;
  if (length <= 27) return 39;
  if (length <= 34) return 36;
  return 35;
}

function addFooter(slide, number, color = C.muted) {
  addText(slide, SERIES, { left: 72, top: 686, width: 760, height: 18 }, {
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
    height: options.height ?? 62,
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
      top: options.subtitleTop ?? 174,
      width: options.subtitleWidth ?? 1136,
      height: options.subtitleHeight ?? 44,
    }, {
      fontSize: options.subtitleSize ?? 23,
      color: options.subtitleColor ?? C.muted,
      vertical: 'middle',
      lineSpacing: 1.25,
    });
  }
}

function addNotes(slide, extra = []) {
  const lines = [
    '[Sources]',
    `- ${CURRICULUM_SOURCE}`,
    `- ${LESSON_SOURCE}`,
    ...extra.map((source) => `- ${source}`),
    `- ${NO_GEN_AI}`,
  ];
  slide.speakerNotes.textFrame.setText(lines.join('\n'));
  slide.speakerNotes.setVisible(true);
}

async function readImageBlob(relativePath) {
  const bytes = await fs.readFile(path.join(ROOT, relativePath));
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function addPhoto(slide, relativePath, position, alt) {
  const image = slide.images.add({
    blob: await readImageBlob(relativePath),
    contentType: 'image/webp',
    alt,
    fit: 'cover',
    position,
    geometry: 'rect',
  });
  addRect(slide, position, 'none', { lineFill: C.warmLine, lineWidth: 1 });
  return image;
}

async function addDarkPhoto(slide, relativePath, position, alt) {
  const sourcePath = path.join(ROOT, relativePath);
  const bytes = await sharp(sourcePath)
    .modulate({ brightness: 0.52, saturation: 0.58 })
    .tint('#617078')
    .webp({ quality: 88 })
    .toBuffer();
  const image = slide.images.add({
    blob: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    contentType: 'image/webp',
    alt,
    fit: 'cover',
    position,
    geometry: 'rect',
  });
  addRect(slide, position, 'none', { lineFill: C.warmLine, lineWidth: 1 });
  return image;
}

function addAudioLink(slide, label, uri, position, options = {}) {
  const box = addShape(slide, 'textbox', position, {
    fill: options.fill ?? C.forest,
    lineFill: options.lineFill ?? options.fill ?? C.forest,
    lineWidth: 1,
  });
  box.text = [[{
    run: `▶  ${label}`,
    textStyle: { bold: true, color: options.color ?? C.white, fontSize: `${options.fontSize ?? 20}px`, typeface: FONT, underline: 'sng' },
    link: { uri, isExternal: true },
  }]];
  box.text.style = {
    typeface: FONT,
    fontSize: options.fontSize ?? 20,
    bold: true,
    color: options.color ?? C.white,
    alignment: 'center',
    verticalAlignment: 'middle',
    autoFit: 'none',
    insets: { top: 8, right: 12, bottom: 8, left: 12 },
  };
  return box;
}

function addDataLine(slide, options) {
  addText(slide, options.number, {
    left: options.left,
    top: options.top + 4,
    width: 58,
    height: 34,
  }, {
    fontSize: 15,
    bold: true,
    color: options.accent ?? C.cinnabar,
    vertical: 'middle',
  });
  addText(slide, options.label, {
    left: options.left + 72,
    top: options.top,
    width: 168,
    height: 44,
  }, {
    fontSize: 22,
    bold: true,
    color: options.labelColor ?? C.forest,
    vertical: 'middle',
  });
  addText(slide, options.value, {
    left: options.left + 242,
    top: options.top,
    width: options.width - 242,
    height: 44,
  }, {
    fontSize: options.valueSize ?? 26,
    bold: true,
    color: options.valueColor ?? C.ink,
    vertical: 'middle',
  });
  addRule(slide, options.left + 72, options.top + 58, options.width - 72, options.ruleColor ?? C.line, options.emphasis ? 4 : 1);
}

// 01 · Cover
{
  const item = slides[0];
  const slide = deck.slides.add();
  slide.background.fill = C.paper;
  addRect(slide, { left: 884, top: 0, width: 396, height: H }, C.forest);
  addText(slide, 'AI와 함께 만드는 우리 옛이야기 그림책', { left: 72, top: 60, width: 700, height: 28 }, {
    fontSize: 17,
    bold: true,
    color: C.forest,
  });
  addRule(slide, 72, 120, 72, C.cinnabar, 6);
  addText(slide, item.title, { left: 72, top: 176, width: 760, height: 82 }, {
    fontSize: 44,
    bold: true,
    color: C.ink,
    vertical: 'middle',
  });
  addText(slide, item.subtitle, { left: 74, top: 298, width: 734, height: 82 }, {
    fontSize: 26,
    color: C.muted,
    lineSpacing: 1.42,
  });
  addText(slide, '3차시 · 국어 · EXPLORE', { left: 74, top: 612, width: 460, height: 30 }, {
    fontSize: 18,
    bold: true,
    color: C.cinnabar,
  });
  addText(slide, '03', { left: 932, top: 54, width: 268, height: 162 }, {
    fontSize: 146,
    color: C.sand,
    align: 'right',
    vertical: 'middle',
  });
  ['문자', '이미지', '소리'].forEach((word, index) => {
    addText(slide, word, { left: 936, top: 302 + index * 90, width: 210, height: 48 }, {
      fontSize: 30,
      bold: true,
      color: C.white,
      vertical: 'middle',
    });
    addRule(slide, 936, 360 + index * 90, 210, '#557066', 1);
  });
  addNotes(slide);
}

// 02 · Three baskets
{
  const item = slides[1];
  const slide = addBase(2, item, {
    fill: C.charcoal,
    kickerColor: '#D58A7E',
    ruleColor: '#44544C',
    footerColor: '#AEB8B0',
  });
  addHeading(slide, item, {
    color: C.white,
    subtitleColor: '#D1D7D2',
  });
  const groups = [
    ['01', '문자', '읽어요'],
    ['02', '이미지', '보아요'],
    ['03', '소리', '들어요'],
  ];
  groups.forEach(([number, word, action], index) => {
    const x = 72 + index * 378;
    addText(slide, number, { left: x, top: 294, width: 58, height: 28 }, {
      fontSize: 15,
      bold: true,
      color: '#D58A7E',
    });
    addText(slide, word, { left: x, top: 348, width: 330, height: 68 }, {
      fontSize: word.length > 2 ? 42 : 46,
      bold: true,
      color: C.white,
    });
    addRule(slide, x, 438, 330, index === 2 ? C.cinnabar : '#53615A', index === 2 ? 4 : 1);
    addText(slide, action, { left: x, top: 470, width: 330, height: 46 }, {
      fontSize: 25,
      bold: true,
      color: C.forestSoft,
    });
  });
  addRect(slide, { left: 72, top: 578, width: 1136, height: 54 }, C.forestSoft);
  addText(slide, '생성형 AI와 외부 도구는 사용하지 않아요.', { left: 96, top: 586, width: 1088, height: 38 }, {
    fontSize: 23,
    bold: true,
    color: C.forest,
    align: 'center',
    vertical: 'middle',
  });
  addNotes(slide);
}

// 03 · Data definition
{
  const item = slides[2];
  const slide = addBase(3, item, { fill: C.sheet });
  addHeading(slide, item);
  addText(slide, '데이터', { left: 72, top: 300, width: 390, height: 92 }, {
    fontSize: 66,
    bold: true,
    color: C.forest,
    vertical: 'middle',
  });
  addRule(slide, 72, 420, 390, C.cinnabar, 5);
  addText(slide, '무엇인지 알아보고\n비교할 때 쓰는 자료', { left: 72, top: 454, width: 390, height: 112 }, {
    fontSize: 28,
    bold: true,
    color: C.muted,
    lineSpacing: 1.35,
  });
  addRule(slide, 544, 276, 0, C.line, 1);
  const meanings = [
    ['읽기', '글자와 문장'],
    ['보기', '사진과 그림'],
    ['듣기', '목소리와 자연의 소리'],
  ];
  meanings.forEach(([action, example], index) => {
    const y = 286 + index * 100;
    addText(slide, action, { left: 624, top: y, width: 150, height: 44 }, {
      fontSize: 24,
      bold: true,
      color: C.cinnabar,
      vertical: 'middle',
    });
    addText(slide, example, { left: 804, top: y, width: 356, height: 44 }, {
      fontSize: 27,
      bold: true,
      color: C.forest,
      vertical: 'middle',
    });
    addRule(slide, 624, y + 58, 536, C.line, 1);
  });
  addText(slide, 'AI도 데이터를 바탕으로 자료를 구분해요.', { left: 624, top: 598, width: 536, height: 32 }, {
    fontSize: 22,
    bold: true,
    color: C.blue,
    align: 'center',
  });
  addNotes(slide);
}

// 04 · Text data
{
  const item = slides[3];
  const slide = addBase(4, item, { fill: C.paper });
  addHeading(slide, item);
  addRect(slide, { left: 72, top: 264, width: 1136, height: 108 }, C.sheet, {
    lineFill: C.warmLine,
    lineWidth: 1,
  });
  addText(slide, '호랑이가 산길에 나타나요.', { left: 108, top: 284, width: 1064, height: 66 }, {
    fontSize: 40,
    bold: true,
    color: C.forest,
    align: 'center',
    vertical: 'middle',
  });
  const examples = [
    ['이름', '호랑이'],
    ['낱말', '산길'],
    ['문장', '호랑이가 산길에 나타나요.'],
  ];
  examples.forEach(([label, value], index) => {
    addDataLine(slide, {
      number: `0${index + 1}`,
      label,
      value,
      left: 104,
      top: 414 + index * 68,
      width: 1040,
      valueSize: index === 2 ? 25 : 28,
      emphasis: index === 2,
    });
  });
  addNotes(slide);
}

// 05 · Image data
{
  const item = slides[4];
  const slide = addBase(5, item, { fill: C.sheet });
  addHeading(slide, item);
  const photos = [
    {
      path: 'public/assets/lesson-01/classroom-real.webp',
      source: PHOTO_SOURCES.classroom,
      alt: '교실에서 학생이 활동하는 실사 사진',
      caption: '교실의 모습',
      detail: '사람과 물건의 위치',
    },
    {
      path: 'public/assets/lesson-01/photo-classification-real.webp',
      source: PHOTO_SOURCES.camera,
      alt: '휴대전화 화면에 보이는 초록 잎 실사 사진',
      caption: '잎의 모양과 색',
      detail: '초록색과 잎의 선',
    },
    {
      path: 'public/assets/lesson-01/ruler-real.webp',
      source: PHOTO_SOURCES.ruler,
      alt: '공책 위 자와 손의 실사 사진',
      caption: '손과 자의 위치',
      detail: '크기와 놓인 방향',
    },
  ];
  for (const [index, photo] of photos.entries()) {
    const x = 72 + index * 378;
    await addPhoto(slide, photo.path, { left: x, top: 258, width: 330, height: 220 }, photo.alt);
    addText(slide, photo.caption, { left: x, top: 500, width: 330, height: 38 }, {
      fontSize: 26,
      bold: true,
      color: C.forest,
    });
    addRule(slide, x, 550, 330, index === 2 ? C.cinnabar : C.warmLine, index === 2 ? 4 : 1);
    addText(slide, photo.detail, { left: x, top: 570, width: 330, height: 32 }, {
      fontSize: 20,
      color: C.muted,
    });
  }
  addNotes(slide, [
    PHOTO_SOURCES.classroom,
    PHOTO_SOURCES.camera,
    PHOTO_SOURCES.ruler,
    'Unsplash License: https://unsplash.com/license',
    'Pexels License: https://www.pexels.com/license/',
  ]);
}

// 06 · Sound data
{
  const item = slides[5];
  const slide = addBase(6, item, { fill: C.paper });
  addHeading(slide, item);
  const sounds = [
    ['짹짹', '새소리', '밝고 가벼운 느낌', AUDIO_URLS.birds],
    ['우르릉', '천둥', '크고 긴장되는 느낌', AUDIO_URLS.thunder],
    ['쉬이익', '바람 소리', '조용하고 긴장되는 느낌', AUDIO_URLS.wind],
  ];
  sounds.forEach(([sound, name, feeling, uri], index) => {
    const x = 72 + index * 378;
    addText(slide, sound, { left: x, top: 292, width: 330, height: 80 }, {
      fontSize: sound.length > 3 ? 40 : 48,
      bold: true,
      color: index === 1 ? C.cinnabar : C.forest,
      align: 'center',
      vertical: 'middle',
    });
    addRule(slide, x, 396, 330, index === 1 ? C.cinnabar : C.warmLine, index === 1 ? 4 : 1);
    addText(slide, name, { left: x, top: 424, width: 330, height: 42 }, {
      fontSize: 25,
      bold: true,
      color: C.ink,
      align: 'center',
    });
    addText(slide, feeling, { left: x, top: 480, width: 330, height: 44 }, {
      fontSize: 20,
      color: C.muted,
      align: 'center',
      lineSpacing: 1.3,
    });
    addAudioLink(slide, `${name} 듣기`, uri, { left: x + 54, top: 540, width: 222, height: 48 }, {
      fill: index === 1 ? C.cinnabar : C.forest,
      lineFill: index === 1 ? C.cinnabar : C.forest,
      fontSize: 18,
    });
  });
  addText(slide, '버튼을 눌러 준비된 WAV 음원을 직접 들어요.', { left: 96, top: 610, width: 1088, height: 26 }, {
    fontSize: 18,
    bold: true,
    color: C.blue,
    align: 'center',
    vertical: 'middle',
  });
  addNotes(slide, [
    `WAV playback: ${AUDIO_URLS.birds}`,
    `WAV playback: ${AUDIO_URLS.thunder}`,
    `WAV playback: ${AUDIO_URLS.wind}`,
  ]);
}

// 07 · Classification activity
{
  const item = slides[6];
  const slide = addBase(7, item, { fill: C.sheet });
  addHeading(slide, item);
  const baskets = [
    ['문자', '글자로 읽어요', '호랑이가 산길에 나타났어요.\n비 · 우산 · 골목'],
    ['이미지', '눈으로 보아요', '교실 사진\n자동문 사진'],
    ['소리', '귀로 들어요', '빗소리\n새소리'],
  ];
  baskets.forEach(([label, action, examples], index) => {
    const x = 72 + index * 378;
    addText(slide, `0${index + 1}`, { left: x, top: 270, width: 54, height: 28 }, {
      fontSize: 15,
      bold: true,
      color: C.cinnabar,
    });
    addText(slide, label, { left: x, top: 322, width: 330, height: 56 }, {
      fontSize: label.length > 2 ? 38 : 42,
      bold: true,
      color: C.forest,
    });
    addText(slide, action, { left: x, top: 398, width: 330, height: 38 }, {
      fontSize: 22,
      bold: true,
      color: C.cinnabar,
    });
    addRule(slide, x, 454, 330, index === 2 ? C.cinnabar : C.warmLine, index === 2 ? 4 : 1);
    addText(slide, examples, { left: x, top: 480, width: 330, height: 68 }, {
      fontSize: 21,
      color: C.muted,
      lineSpacing: 1.35,
    });
  });
  addAudioLink(slide, '① 빗소리', AUDIO_URLS.rain, { left: 72, top: 582, width: 238, height: 52 }, {
    fill: C.blue,
    lineFill: C.blue,
    fontSize: 18,
  });
  addAudioLink(slide, '② 새소리', AUDIO_URLS.birds, { left: 326, top: 582, width: 238, height: 52 }, {
    fill: C.forest,
    lineFill: C.forest,
    fontSize: 18,
  });
  const linkBox = addShape(slide, 'textbox', { left: 596, top: 582, width: 612, height: 52 }, {
    fill: C.forest,
    lineFill: C.forest,
    lineWidth: 1,
  });
  linkBox.text = [[{
    run: '학생 웹앱 열기  ·  3차시',
    textStyle: { bold: true, color: C.white, fontSize: '22px', typeface: FONT, underline: 'sng' },
    link: { uri: LESSON3_URL, isExternal: true },
  }]];
  linkBox.text.style = {
    typeface: FONT,
    fontSize: 22,
    bold: true,
    color: C.white,
    alignment: 'center',
    verticalAlignment: 'middle',
    autoFit: 'none',
    insets: { top: 10, right: 16, bottom: 10, left: 16 },
  };
  addNotes(slide, [
    `Classification WAV 1: ${AUDIO_URLS.rain}`,
    `Classification WAV 2: ${AUDIO_URLS.birds}`,
    `Student activity URL: ${LESSON3_URL}`,
  ]);
}

// 08 · Same scene
{
  const item = slides[7];
  const slide = addBase(8, item, { fill: C.paper });
  addHeading(slide, item, { fontSize: 35 });
  addRect(slide, { left: 72, top: 260, width: 1136, height: 144 }, C.forest, {
    lineFill: C.forest,
    lineWidth: 1,
  });
  addText(slide, '사람들이 교실에 있어요.', { left: 112, top: 290, width: 1056, height: 84 }, {
    fontSize: 42,
    bold: true,
    color: C.white,
    align: 'center',
    vertical: 'middle',
  });
  addText(slide, 'A', { left: 102, top: 458, width: 110, height: 78 }, {
    fontSize: 54,
    bold: true,
    color: C.cinnabar,
    vertical: 'middle',
  });
  addText(slide, '밝은 자료 묶음', { left: 202, top: 470, width: 350, height: 54 }, {
    fontSize: 30,
    bold: true,
    color: C.forest,
    vertical: 'middle',
  });
  addRule(slide, 102, 552, 450, C.warmLine, 1);
  addText(slide, 'B', { left: 678, top: 458, width: 110, height: 78 }, {
    fontSize: 54,
    bold: true,
    color: C.blue,
    vertical: 'middle',
  });
  addText(slide, '긴장되는 자료 묶음', { left: 778, top: 470, width: 390, height: 54 }, {
    fontSize: 30,
    bold: true,
    color: C.forest,
    vertical: 'middle',
  });
  addRule(slide, 678, 552, 490, C.cinnabar, 4);
  addText(slide, '사건 문장은 같아요. 고른 자료만 달라요.', { left: 72, top: 602, width: 1136, height: 32 }, {
    fontSize: 23,
    bold: true,
    color: C.muted,
    align: 'center',
  });
  addNotes(slide);
}

// 09 · Bundle A
{
  const item = slides[8];
  const slide = addBase(9, item, { fill: C.sheet });
  addHeading(slide, item, { fontSize: 35 });
  await addPhoto(slide, 'public/assets/lesson-01/classroom-real.webp', { left: 72, top: 258, width: 486, height: 304 }, '밝은 교실에서 선생님과 어린이들이 함께 있는 실사 사진');
  addRect(slide, { left: 72, top: 506, width: 486, height: 56 }, C.forest);
  addText(slide, '이미지 데이터 · 햇빛이 드는 교실', { left: 92, top: 516, width: 446, height: 36 }, {
    fontSize: 20,
    bold: true,
    color: C.white,
    vertical: 'middle',
  });
  addRect(slide, { left: 610, top: 258, width: 598, height: 64 }, C.forestSoft);
  addText(slide, '사람들이 교실에 있어요.', { left: 630, top: 270, width: 558, height: 40 }, {
    fontSize: 25,
    bold: true,
    color: C.forest,
    align: 'center',
    vertical: 'middle',
  });
  const rows = [['01', '문자', '밝은 낮, 함께 배우는 시간'], ['02', '이미지', '햇빛이 드는 교실'], ['03', '소리', '새소리']];
  rows.forEach(([number, label, value], index) => {
    addDataLine(slide, {
      number,
      label,
      value,
      left: 624,
      top: 344 + index * 66,
      width: 566,
      valueSize: index === 0 ? 20 : 25,
      emphasis: index === 2,
      accent: C.cinnabar,
    });
  });
  addAudioLink(slide, '새소리 듣기', AUDIO_URLS.birds, { left: 624, top: 566, width: 252, height: 48 }, { fill: C.forest, fontSize: 19 });
  addText(slide, '밝고 편안해요.', { left: 902, top: 568, width: 286, height: 44 }, {
    fontSize: 26,
    bold: true,
    color: C.forest,
    align: 'right',
    vertical: 'middle',
  });
  addNotes(slide, [PHOTO_SOURCES.classroom, `WAV playback: ${AUDIO_URLS.birds}`, 'Unsplash License: https://unsplash.com/license']);
}

// 10 · Bundle B
{
  const item = slides[9];
  const slide = addBase(10, item, {
    fill: C.charcoal,
    kickerColor: '#D58A7E',
    ruleColor: '#44544C',
    footerColor: '#AEB8B0',
  });
  addHeading(slide, item, {
    fontSize: 35,
    color: C.white,
    subtitleColor: '#D1D7D2',
  });
  await addDarkPhoto(slide, 'public/assets/lesson-01/classroom-real.webp', { left: 72, top: 258, width: 486, height: 304 }, '어둡고 긴장되는 느낌으로 보이는 같은 교실 실사 사진');
  addRect(slide, { left: 72, top: 506, width: 486, height: 56 }, C.blue);
  addText(slide, '이미지 데이터 · 같은 교실을 어둡게', { left: 92, top: 516, width: 446, height: 36 }, {
    fontSize: 20,
    bold: true,
    color: C.white,
    vertical: 'middle',
  });
  addRect(slide, { left: 610, top: 258, width: 598, height: 64 }, '#2B3E38');
  addText(slide, '사람들이 교실에 있어요.', { left: 630, top: 270, width: 558, height: 40 }, {
    fontSize: 25,
    bold: true,
    color: C.white,
    align: 'center',
    vertical: 'middle',
  });
  const rows = [['01', '문자', '어두운 밤, 조용한 교실'], ['02', '이미지', '같은 교실을 어둡게'], ['03', '소리', '천둥']];
  rows.forEach(([number, label, value], index) => {
    addDataLine(slide, {
      number,
      label,
      value,
      left: 624,
      top: 344 + index * 66,
      width: 566,
      valueSize: index === 0 ? 20 : 25,
      emphasis: index === 2,
      accent: '#D58A7E',
      labelColor: '#D1D7D2',
      valueColor: C.white,
      ruleColor: index === 2 ? C.cinnabar : '#53615A',
    });
  });
  addAudioLink(slide, '천둥 듣기', AUDIO_URLS.thunder, { left: 624, top: 566, width: 252, height: 48 }, { fill: C.cinnabar, lineFill: C.cinnabar, fontSize: 19 });
  addText(slide, '어둡고 긴장돼요.', { left: 902, top: 568, width: 286, height: 44 }, {
    fontSize: 26,
    bold: true,
    color: C.rose,
    align: 'right',
    vertical: 'middle',
  });
  addNotes(slide, [PHOTO_SOURCES.classroom, `WAV playback: ${AUDIO_URLS.thunder}`, 'Unsplash License: https://unsplash.com/license']);
}

// 11 · Compare
{
  const item = slides[10];
  const slide = addBase(11, item, { fill: C.paper });
  addHeading(slide, item);
  addRect(slide, { left: 72, top: 238, width: 1136, height: 54 }, C.sheet, { lineFill: C.warmLine, lineWidth: 1 });
  addText(slide, '같은 문장  ·  사람들이 교실에 있어요.', { left: 96, top: 246, width: 1088, height: 38 }, {
    fontSize: 24,
    bold: true,
    color: C.forest,
    align: 'center',
    vertical: 'middle',
  });
  addText(slide, 'A · 밝은 자료', { left: 92, top: 310, width: 450, height: 32 }, {
    fontSize: 19,
    bold: true,
    color: C.cinnabar,
  });
  await addPhoto(slide, 'public/assets/lesson-01/classroom-real.webp', { left: 92, top: 350, width: 450, height: 174 }, '밝은 교실에서 선생님과 어린이들이 함께 있는 실사 사진');
  addText(slide, '밝고 편안해요', { left: 92, top: 542, width: 260, height: 36 }, { fontSize: 26, bold: true, color: C.forest });
  addText(slide, '밝은 낮 · 햇빛 드는 교실', { left: 92, top: 584, width: 260, height: 28 }, { fontSize: 17, color: C.muted });
  addAudioLink(slide, '새소리', AUDIO_URLS.birds, { left: 366, top: 548, width: 176, height: 52 }, { fill: C.forest, fontSize: 18 });
  addRule(slide, 92, 624, 450, C.warmLine, 1);
  addRule(slide, 640, 270, 0, C.line, 1);
  addText(slide, 'B · 긴장되는 자료', { left: 714, top: 310, width: 474, height: 32 }, {
    fontSize: 19,
    bold: true,
    color: C.cinnabar,
  });
  await addDarkPhoto(slide, 'public/assets/lesson-01/classroom-real.webp', { left: 714, top: 350, width: 474, height: 174 }, '어둡고 긴장되는 느낌으로 보이는 같은 교실 실사 사진');
  addText(slide, '어둡고 긴장돼요', { left: 714, top: 542, width: 280, height: 36 }, { fontSize: 26, bold: true, color: C.blue });
  addText(slide, '어두운 밤 · 같은 교실', { left: 714, top: 584, width: 280, height: 28 }, { fontSize: 17, color: C.muted });
  addAudioLink(slide, '천둥', AUDIO_URLS.thunder, { left: 1012, top: 548, width: 176, height: 52 }, { fill: C.cinnabar, lineFill: C.cinnabar, fontSize: 18 });
  addRule(slide, 714, 624, 474, C.cinnabar, 4);
  addNotes(slide, [
    PHOTO_SOURCES.classroom,
    `WAV playback: ${AUDIO_URLS.birds}`,
    `WAV playback: ${AUDIO_URLS.thunder}`,
    'Unsplash License: https://unsplash.com/license',
  ]);
}

// 12 · Build a data bundle
{
  const item = slides[11];
  const slide = addBase(12, item, { fill: C.sheet });
  addHeading(slide, item, { fontSize: 35 });
  const steps = [
    ['01', '문자 하나', '장면을 말로 또렷하게'],
    ['02', '이미지 하나', '모습·색·위치를 고르기'],
    ['03', '소리 하나', '장면의 분위기를 고르기'],
  ];
  steps.forEach(([number, title, detail], index) => {
    const x = 72 + index * 378;
    addText(slide, number, { left: x, top: 270, width: 54, height: 28 }, {
      fontSize: 15,
      bold: true,
      color: C.cinnabar,
    });
    addText(slide, title, { left: x, top: 326, width: 330, height: 56 }, {
      fontSize: 34,
      bold: true,
      color: C.forest,
    });
    addRule(slide, x, 410, 330, index === 2 ? C.cinnabar : C.warmLine, index === 2 ? 4 : 1);
    addText(slide, detail, { left: x, top: 444, width: 330, height: 68 }, {
      fontSize: 22,
      color: C.muted,
      lineSpacing: 1.35,
    });
  });
  addRect(slide, { left: 72, top: 554, width: 1136, height: 52 }, C.blueSoft);
  addText(slide, '2차시에서 내가 기획한 장면 하나를 먼저 고릅니다.', { left: 96, top: 561, width: 1088, height: 38 }, {
    fontSize: 23,
    bold: true,
    color: C.blue,
    align: 'center',
    vertical: 'middle',
  });
  addText(slide, LESSON3_URL, { left: 72, top: 620, width: 1136, height: 24 }, {
    fontSize: 16,
    color: C.muted,
    align: 'center',
  });
  addNotes(slide, [`Student activity URL: ${LESSON3_URL}`]);
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
    fontSize: 35,
    color: C.white,
    subtitleColor: '#D1D7D2',
  });
  const summary = [
    ['문자', '장면을 말로 알려 줘요'],
    ['이미지', '모습·색·위치를 보여 줘요'],
    ['소리', '장면의 분위기를 들려줘요'],
  ];
  summary.forEach(([label, detail], index) => {
    const y = 280 + index * 88;
    addText(slide, `0${index + 1}`, { left: 100, top: y + 4, width: 54, height: 34 }, {
      fontSize: 15,
      bold: true,
      color: '#D58A7E',
      vertical: 'middle',
    });
    addText(slide, label, { left: 182, top: y, width: 190, height: 44 }, {
      fontSize: 27,
      bold: true,
      color: C.white,
      vertical: 'middle',
    });
    addText(slide, detail, { left: 406, top: y, width: 722, height: 44 }, {
      fontSize: 25,
      bold: true,
      color: C.forestSoft,
      vertical: 'middle',
    });
    addRule(slide, 182, y + 58, 946, index === 2 ? C.cinnabar : '#53615A', index === 2 ? 4 : 1);
  });
  addRect(slide, { left: 264, top: 568, width: 752, height: 58 }, C.forestSoft);
  addText(slide, '생성형 AI와 외부 도구 없이, 준비된 자료로 활동했어요.', { left: 288, top: 577, width: 704, height: 40 }, {
    fontSize: 23,
    bold: true,
    color: C.forest,
    align: 'center',
    vertical: 'middle',
  });
  addNotes(slide);
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
    '<dc:title>AI와 함께 만드는 우리 옛이야기 그림책 · 3차시</dc:title>',
    '<dc:subject>문자·이미지·소리 데이터 분류와 장면 데이터 꾸러미</dc:subject>',
    '<dc:creator>EDU STORY</dc:creator>',
    '<cp:lastModifiedBy>EDU STORY</cp:lastModifiedBy>',
    '<dc:description>초등 3~4학년용 3차시 수업 프레젠테이션</dc:description>',
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
  LESSON_SOURCE,
  ...Object.values(PHOTO_SOURCES),
  NO_GEN_AI,
].join('\n'));

for (const [index, slide] of deck.slides.items.entries()) {
  const stem = `slide-${String(index + 1).padStart(2, '0')}`;
  await writeBlob(path.join(renderDir, `${stem}.png`), await deck.export({ slide, format: 'png', scale: 1 }));
  const layout = await slide.export({ format: 'layout' });
  await fs.writeFile(path.join(layoutDir, `${stem}.json`), await layout.text());
}

await writeBlob(path.join(TMP, 'lesson03-montage.webp'), await deck.export({ format: 'webp', montage: true, scale: 1 }));
const inspection = await deck.inspect({ kind: 'slide,textbox,shape,image,notes', maxChars: 100000 });
await fs.writeFile(path.join(TMP, 'presentation-inspect.ndjson'), inspection.ndjson);

const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(FINAL);
await normalizePptxMetadata(FINAL);
await fs.rm(`${FINAL}.inspect.ndjson`, { force: true });

console.log(`Exported ${deck.slides.items.length} slides to ${FINAL}`);

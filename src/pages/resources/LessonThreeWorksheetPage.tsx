import PrintToolbar from '../../components/PrintToolbar';

const dataSamples = [
  { label: 'A', type: 'text', text: '호랑이가 산길에 나타났어요.' },
  { label: 'B', type: 'text', text: '비 · 우산 · 골목' },
  { label: 'C', type: 'image', src: '/assets/lesson-01/classroom-real.webp', alt: '교실에서 그림을 그리는 어린이 사진' },
  { label: 'D', type: 'image', src: '/assets/lesson-01/automatic-door-real.webp', alt: '회색 건물 입구의 자동문 사진' },
  { label: 'E', type: 'sound', text: '① 빗소리' },
  { label: 'F', type: 'sound', text: '② 새소리' },
];

const planChoices = [
  ['주인공', '사람　·　동물　·　신기한 존재'],
  ['장소', '집　·　길 · 숲　·　마을 · 궁궐'],
  ['시간', '낮　·　밤　·　비 오는 때'],
  ['표정', '기뻐요　·　놀라요　·　걱정해요'],
  ['빛 · 색', '따뜻한 밝은빛　·　차가운 어두운빛　·　싱그러운 초록빛'],
  ['소리', '② 새소리　·　① 빗소리　·　④ 바람소리'],
];

const comparisonBundles = [
  {
    label: 'A 꾸러미',
    text: '밝은 낮, 함께 배우는 시간',
    imageAlt: '밝은 교실에서 선생님과 어린이들이 함께 있는 사진',
    sound: '② 새소리',
    dark: false,
  },
  {
    label: 'B 꾸러미',
    text: '어두운 밤, 조용한 교실',
    imageAlt: '같은 교실 사진을 어둡게 처리한 모습',
    sound: '③ 천둥소리',
    dark: true,
  },
];

export default function LessonThreeWorksheetPage() {
  return (
    <main className="print-page-wrap lesson-two-print-wrap">
      <PrintToolbar title="3차시 학생 활동지" />
      <article className="print-sheet lesson-two-print-sheet lesson-two-worksheet">
        <header>
          <div>
            <span>AI와 함께 만드는 우리 옛이야기 그림책</span>
            <h1>3차시 · AI가 이해하는 데이터</h1>
            <p>읽고, 보고, 들은 자료를 나누고 내 장면을 직접 기획해요.</p>
          </div>
          <div><span>학년·반 ________</span><span>모둠 ________</span><span>이름 ____________</span></div>
        </header>

        <section className="lesson-two-paper-events">
          <h2><b>1</b> 카드마다 알맞은 데이터에 ○표하세요.</h2>
          <div className="lesson-two-paper-event-grid">
            {dataSamples.map((card) => (
              <div key={card.label}>
                <span>{card.label}</span>
                <div style={{ display: 'grid', gap: '1.5mm', alignItems: 'center' }}>
                  {card.type === 'image' ? (
                    <img
                      src={card.src}
                      alt={card.alt}
                      style={{ width: '100%', height: '18mm', objectFit: 'cover', borderRadius: '1mm' }}
                    />
                  ) : <strong>{card.text}</strong>}
                  {card.type === 'sound' && <small>선생님이 번호 음원을 틀면 들어요.</small>}
                  <small>○ 문자　 ○ 이미지　 ○ 소리</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lesson-two-paper-plan">
          <h2><b>2</b> 같은 문장도 문자·이미지·소리가 바뀌면 느낌이 달라질까요?</h2>
          <div className="lesson-two-paper-plan-fields">
            {comparisonBundles.map((bundle) => (
              <div key={bundle.label}>
                <strong>{bundle.label}</strong>
                <div style={{ display: 'grid', gap: '1.2mm' }}>
                  <span><b>문자</b>　{bundle.text}</span>
                  <img
                    src="/assets/lesson-01/classroom-real.webp"
                    alt={bundle.imageAlt}
                    style={{ width: '100%', height: '20mm', objectFit: 'cover', filter: bundle.dark ? 'brightness(0.34) saturate(0.65)' : undefined }}
                  />
                  <span><b>소리</b>　{bundle.sound}　　○ 편안해요　○ 신나요　○ 무서워요</span>
                </div>
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}><strong>같은 문장</strong><span>사람들이 교실에 있어요.</span></div>
          </div>
        </section>

        <section className="lesson-two-paper-plan">
          <h2><b>3</b> 2차시에 정한 내 이야기에서 한 장면을 떠올리고, 하나씩 ○표하세요.</h2>
          <div className="lesson-two-paper-plan-fields">
            {planChoices.map(([label, choices]) => (
              <div key={label}><strong>{label}</strong><span>{choices}</span></div>
            ))}
          </div>
        </section>

        <footer><span>EXPLORE · 여러 가지 데이터</span><span>3 / 10 · 더몬스터학원 EDU STORY</span></footer>
      </article>
    </main>
  );
}

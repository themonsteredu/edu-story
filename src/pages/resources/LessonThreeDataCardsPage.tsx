import PrintToolbar from '../../components/PrintToolbar';

const classifyCards = [
  { label: 'A', type: 'text', title: '호랑이가 산길에 나타났어요.', note: '눈으로 읽어요.' },
  { label: 'B', type: 'text', title: '비 · 우산 · 골목', note: '눈으로 읽어요.' },
  { label: 'C', type: 'image', src: '/assets/lesson-01/classroom-real.webp', alt: '교실에서 그림을 그리는 어린이 사진' },
  { label: 'D', type: 'image', src: '/assets/lesson-01/automatic-door-real.webp', alt: '회색 건물 입구의 자동문 사진' },
  { label: 'E', type: 'sound', title: '① 빗소리', note: '선생님이 ①번 음원을 재생하면 들어요.' },
  { label: 'F', type: 'sound', title: '② 새소리', note: '선생님이 ②번 음원을 재생하면 들어요.' },
];

const planningRows = [
  ['주인공', ['사람', '동물', '신기한 존재']],
  ['장소', ['집', '길 · 숲', '마을 · 궁궐']],
  ['시간', ['낮', '밤', '비 오는 때']],
  ['표정', ['기뻐요', '놀라요', '걱정해요']],
  ['빛 · 색', ['따뜻한 밝은빛', '차가운 어두운빛', '싱그러운 초록빛']],
  ['소리', ['② 새소리', '① 빗소리', '④ 바람소리']],
];

const photoChoices = [
  { src: '/assets/lesson-01/classroom-real.webp', alt: '교실에서 그림을 그리는 어린이 사진' },
  { src: '/assets/lesson-01/automatic-door-real.webp', alt: '회색 건물 입구의 자동문 사진' },
  { src: '/assets/lesson-01/photo-classification-real.webp', alt: '휴대전화 화면에 보이는 초록 잎 사진' },
];

export default function LessonThreeDataCardsPage() {
  return (
    <main className="print-page-wrap lesson-two-print-wrap">
      <PrintToolbar title="3차시 데이터 카드" />
      <article className="print-sheet lesson-two-print-sheet lesson-two-worksheet">
        <header>
          <div>
            <span>오려 쓰는 고정 자료 · 생성형 AI 미사용</span>
            <h1>문자·이미지·소리 데이터 카드</h1>
            <p>카드 1 / 2 · 실제로 읽고, 보고, 들은 방법에 따라 나누세요.</p>
          </div>
          <div><span>문자 A·B</span><span>이미지 C·D</span><span>소리 E·F</span></div>
        </header>

        <section className="lesson-two-paper-events">
          <h2><b>1</b> 점선을 따라 오리고 세 데이터 모둠으로 분류하세요.</h2>
          <div className="lesson-two-paper-event-grid">
            {classifyCards.map((card) => (
              <div key={card.label}>
                <span>{card.label}</span>
                <div style={{ display: 'grid', gap: '1.5mm', alignItems: 'center' }}>
                  {card.type === 'image' ? (
                    <img src={card.src} alt={card.alt} style={{ width: '100%', height: '31mm', objectFit: 'cover', borderRadius: '1mm' }} />
                  ) : <strong>{card.title}</strong>}
                  <small>{card.type === 'image' ? '실제 사진을 눈으로 살펴봐요.' : card.note}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="teacher-caution"><h2>교사 준비</h2><p>E는 <b>① 빗소리 rain-soft.wav</b>, F는 <b>② 새소리 birds-morning.wav</b>를 번호에 맞춰 직접 재생해 주세요.</p></section>
        <footer><span>EXPLORE · 여러 가지 데이터</span><span>1 / 2 · 더몬스터학원 EDU STORY</span></footer>
      </article>

      <article className="print-sheet lesson-two-print-sheet lesson-two-worksheet">
        <header>
          <div>
            <span>3차시 · 학생이 직접 기획하는 한 장면</span>
            <h1>내 이야기에서 하나씩 고르기</h1>
            <p>카드 2 / 2 · 2차시에 정한 이야기의 한 장면을 떠올리세요.</p>
          </div>
          <div><span>보기 6줄</span><span>한 줄에서 1장</span><span>정답은 여러 가지</span></div>
        </header>

        <section className="lesson-two-paper-events">
          <h2><b>2</b> 각 줄에서 한 장씩 골라 내 장면 계획을 만드세요.</h2>
          <div className="lesson-two-paper-event-grid">
            {planningRows.flatMap(([kind, values], rowIndex) => (
              (values as string[]).map((value, colIndex) => (
                <div key={`${kind}-${value}`} style={{ minHeight: kind === '빛 · 색' ? '29mm' : '19mm' }}>
                  <span style={{ fontSize: '9pt' }}>{kind}</span>
                  <div style={{ display: 'grid', gap: '1mm', alignItems: 'center' }}>
                    {kind === '빛 · 색' && (
                      <img src={photoChoices[colIndex].src} alt={photoChoices[colIndex].alt} style={{ width: '100%', height: '16mm', objectFit: 'cover', borderRadius: '1mm' }} />
                    )}
                    <strong>{value}</strong>
                    {kind === '소리' && <small>선생님이 번호 음원을 재생해요.</small>}
                  </div>
                </div>
              ))
            ))}
          </div>
        </section>

        <section className="lesson-two-board-note"><h2>계획 확인</h2><div><span>주인공</span><strong>+</strong><span>장소·시간</span><strong>+</strong><span>표정·빛</span><strong>+</strong><b>소리</b></div></section>
        <footer><span>고른 카드를 가리키며 짧게 말해도 충분해요.</span><span>2 / 2 · 더몬스터학원 EDU STORY</span></footer>
      </article>
    </main>
  );
}

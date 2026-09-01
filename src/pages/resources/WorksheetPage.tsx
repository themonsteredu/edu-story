import PrintToolbar from '../../components/PrintToolbar';

export default function WorksheetPage() {
  return (
    <main className="print-page-wrap">
      <PrintToolbar title="1차시 학생 활동지" />
      <article className="print-sheet worksheet-sheet">
        <header className="sheet-header">
          <div>
            <span>AI+교과 융합 교육과정</span>
            <h1>사람과 AI, 누가 더 잘 볼까?</h1>
            <p>AI와 함께 만드는 우리 옛이야기 그림책 · 1차시</p>
          </div>
          <div className="student-fields">
            <span>학년·반 ________</span><span>번호 ________</span><span>이름 ____________</span>
          </div>
        </header>
        <section className="worksheet-block compact-block">
          <h2><b>1</b> 생활 속 AI를 찾아 ○표 하세요.</h2>
          <div className="worksheet-ai-grid">
            {['좋아할 영상 추천', '음성으로 날씨 묻기', '얼굴 인식 잠금', '전등 스위치', '자로 길이 재기', '자동 번역'].map((item) => (
              <span key={item}>○ {item}</span>
            ))}
          </div>
        </section>
        <section className="worksheet-block">
          <h2><b>2</b> 문장을 읽고 내가 상상한 장면을 그려 보세요.</h2>
          <blockquote>“비 오는 날, 빨간 우산을 쓴 아이가 골목길을 걷고 있습니다.”</blockquote>
          <div className="drawing-box"><span>그림을 그리는 곳</span></div>
        </section>
        <section className="worksheet-block compare-block">
          <h2><b>3</b> 내가 상상한 그림과 AI 그림을 비교해 쓰세요.</h2>
          <div className="line-answer"><strong>같았던 점</strong><span /></div>
          <div className="line-answer"><strong>달랐던 점</strong><span /></div>
        </section>
        <section className="worksheet-block fill-block">
          <h2><b>4</b> 오늘 배운 내용을 완성하세요.</h2>
          <p>사람은 <span className="blank wide" />을 바탕으로 생각하고, AI는 <span className="blank wide" />을 바탕으로 결과를 만듭니다.</p>
        </section>
        <section className="worksheet-block reflection-block">
          <h2><b>5</b> 오늘 새롭게 알게 된 점을 한 문장으로 쓰세요.</h2>
          <div className="double-line" />
        </section>
        <footer className="sheet-footer"><span>LOOK · 보고 비교하며 이해하기</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

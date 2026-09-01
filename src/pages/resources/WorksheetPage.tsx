import PrintToolbar from '../../components/PrintToolbar';

export default function WorksheetPage() {
  return (
    <main className="print-page-wrap">
      <PrintToolbar title="1차시 학생 활동지" />
      <article className="print-sheet worksheet-sheet">
        <header className="sheet-header">
          <div>
            <span>AI+교과 융합 교육과정</span>
            <h1>자동으로 움직이면 모두 AI일까?</h1>
            <p>AI와 함께 만드는 우리 옛이야기 그림책 · 1차시</p>
          </div>
          <div className="student-fields">
            <span>학년·반 ________</span><span>번호 ________</span><span>이름 ____________</span>
          </div>
        </header>
        <section className="worksheet-block">
          <h2><b>1</b> 각 사례를 보고 알맞은 기능을 써 보세요.</h2>
          <blockquote>보기　추천 · 인식 · 분류 · 자동 기계</blockquote>
          <table className="flow-table worksheet-case-table">
            <thead><tr><th>번호</th><th>사례</th><th>기능</th></tr></thead>
            <tbody>
              {[
                '좋아할 영상 골라 주기',
                '다음에 읽을 책 골라 주기',
                '얼굴을 알아보고 잠금 풀기',
                '말소리를 글자로 바꾸기',
                '사진을 동물·식물로 나누기',
                '스팸 메일 가려내기',
                '10분 뒤 알람 울리기',
                '센서 자동문 열기',
              ].map((item, index) => <tr key={item}><td>{index + 1}</td><td>{item}</td><td>________________</td></tr>)}
            </tbody>
          </table>
        </section>
        <section className="worksheet-block compare-block">
          <h2><b>2</b> AI와 자동 기계를 구별한 까닭을 한 가지씩 쓰세요.</h2>
          <div className="line-answer"><strong>AI 장면</strong><span /></div>
          <div className="line-answer"><strong>자동 기계 장면</strong><span /></div>
        </section>
        <section className="worksheet-block fill-block">
          <h2><b>3</b> 오늘 배운 내용을 완성하세요.</h2>
          <p>자동 기계는 <span className="blank wide" />에 따라 움직이고, AI는 데이터에서 <span className="blank wide" />을 찾아 추천·인식·분류합니다.</p>
        </section>
        <section className="worksheet-block reflection-block">
          <h2><b>4</b> 오늘 새롭게 알게 된 점을 한 문장으로 쓰세요.</h2>
          <div className="double-line" />
        </section>
        <footer className="sheet-footer"><span>LOOK · 구별하고 근거 말하기</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

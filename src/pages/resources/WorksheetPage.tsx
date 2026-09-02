import PrintToolbar from '../../components/PrintToolbar';

const cases = [
  '좋아할 영상 골라 주기',
  '다음에 읽을 책 골라 주기',
  '얼굴을 알아보고 잠금 풀기',
  '말소리를 글자로 바꾸기',
  '사진을 동물·식물로 나누기',
  '스팸 메일 가려내기',
  '10분 뒤 알람 울리기',
  '센서 자동문 열기',
];

const functionLabels = ['추천', '인식', '분류', '자동기계'];

export default function WorksheetPage() {
  return (
    <main className="print-page-wrap">
      <PrintToolbar title="1차시 학생 활동지" />
      <article className="print-sheet worksheet-sheet low-writing-sheet">
        <header className="sheet-header">
          <div>
            <span>AI+교과 융합 교육과정</span>
            <h1>자동으로 움직이면 모두 AI일까?</h1>
            <p>우리 생활 속 AI를 찾아보는 1차시</p>
          </div>
          <div className="student-fields">
            <span>학년·반 ________</span><span>번호 ________</span><span>이름 ____________</span>
          </div>
        </header>

        <section className="worksheet-block choice-table-block">
          <h2><b>1</b> 알맞은 칸에 ○표하세요.</h2>
          <table className="worksheet-choice-table">
            <colgroup>
              <col className="number-column" />
              <col className="case-column" />
              {functionLabels.map((label) => <col className="choice-column" key={label} />)}
            </colgroup>
            <thead>
              <tr><th>번호</th><th>무엇을 하나요?</th>{functionLabels.map((label) => <th key={label}>{label}</th>)}</tr>
            </thead>
            <tbody>
              {cases.map((item, index) => (
                <tr key={item}>
                  <td>{index + 1}</td><td>{item}</td>
                  {functionLabels.map((label) => <td key={label} aria-label={`${item} ${label} 선택 칸`} />)}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="worksheet-block word-choice-block">
          <h2><b>2</b> 알맞은 말에 ○표하세요.</h2>
          <div className="word-choice-row"><strong>AI가 결과를 정할 때 살펴보는 것</strong><span>데이터</span><i>/</i><span>정해진 시간</span></div>
          <div className="word-choice-row"><strong>자동 기계가 움직이는 기준</strong><span>정해진 조건</span><i>/</i><span>내 마음</span></div>
        </section>

        <section className="worksheet-block scene-choice-block">
          <h2><b>3</b> 두 장면을 보고 알맞은 답에 ○표하세요.</h2>
          <div className="scene-choice-grid">
            <article>
              <strong>내가 본 영상을 보고 다음 영상을 골라 줘요.</strong>
              <p>AI　/　자동 기계</p>
              <small>기록에서 특징을 찾아요　/　시간이 지나면 움직여요</small>
            </article>
            <article>
              <strong>10분이 지나면 알람이 울려요.</strong>
              <p>AI　/　자동 기계</p>
              <small>기록에서 특징을 찾아요　/　정해진 시간이 지나면 움직여요</small>
            </article>
          </div>
        </section>

        <section className="worksheet-block self-check-block">
          <h2><b>4</b> 오늘 나는 어땠나요? 하나에 ○표하세요.</h2>
          <div><span>잘 알겠어요</span><span>조금 헷갈려요</span><span>더 알아볼래요</span></div>
        </section>

        <footer className="sheet-footer"><span>LOOK · 살펴보고 고르기</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

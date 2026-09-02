import PrintToolbar from '../../components/PrintToolbar';

const flow = [
  ['도입', '5분', '옛이야기를 그림책으로 만들 때 먼저 무엇을 찾아야 할지 질문한다.', '인물·사건·배경을 떠올려 말한다.', 'PPT 1~3', '정답을 바로 설명하기보다 알고 있는 이야기 경험을 꺼내게 한다.'],
  ['활동 1', '7분', '세 가지 고정 옛이야기를 제시하고 선택한 이야기를 함께 읽는다.', '모둠에서 만들 이야기 하나를 고르고 고정 읽기 자료를 읽는다.', 'PPT 4, 읽기 자료', '긴 토론보다 까닭을 한 번씩 말하고 선택하게 한다.'],
  ['활동 2', '8분', '선택한 이야기에 나오는 인물과 배경 낱말을 안내한다.', '알맞은 인물·배경 낱말을 누르거나 ○표한다.', 'PPT 5~6, 활동지', '글쓰기 없이 선택 결과와 말하기로 이해를 확인한다.'],
  ['활동 3', '13분', '섞인 사건 여섯 개를 읽고 원인과 결과를 살피도록 돕는다.', '사건 카드를 먼저 일어난 일부터 옮기고 순서를 확인한다.', 'PPT 7~10, 웹앱', '드래그가 어려우면 앞·뒤 버튼을 사용하게 한다. 점수와 시간 제한을 두지 않는다.'],
  ['활동 4', '5분', 'AI가 장면을 이해하려면 필요한 추가 정보의 예를 제시한다.', '각 장면에서 더 알려줄 정보 하나를 고르고 짝에게 말한다.', 'PPT 11~12, 웹앱', '생성형 AI는 실행하지 않고 사람과 AI의 인식 방식 차이만 토의한다.'],
  ['정리', '2분', '이야기의 뼈대와 AI에게 자세히 알려줄 정보의 필요성을 정리한다.', '완성된 모둠 이야기판을 함께 확인한다.', 'PPT 13', '결과보다 사건이 자연스럽게 이어지는지 확인한다.'],
];

export default function LessonTwoLessonPlanPage() {
  return (
    <main className="print-page-wrap lesson-two-print-wrap">
      <PrintToolbar title="2차시 교수·학습 과정안" />
      <article className="print-sheet lesson-two-plan-sheet">
        <header className="official-header">
          <span>AI+교과 내용 융합 교수·학습 과정안</span>
          <h1>2차시 · 우리가 만들 이야기 정하기</h1>
        </header>
        <table className="meta-table">
          <tbody>
            <tr><th>프로그램명</th><td colSpan={3}>AI와 함께 만드는 우리 옛이야기 그림책</td><th>대상</th><td>초등 3~4학년</td></tr>
            <tr><th>중심 교과</th><td>창체·국어</td><th>차시</th><td>2/10</td><th>수업 시간</th><td>40분</td></tr>
            <tr><th>성취기준</th><td colSpan={5}>[4국05-02] 인물, 사건, 배경에 주목하며 작품을 이해한다.</td></tr>
            <tr><th>AI 영역</th><td>인공지능의 이해</td><th>세부 영역</th><td>인공지능과 사회</td><th>LEAP</th><td>Look</td></tr>
            <tr><th>내용 요소</th><td colSpan={5}>인공지능과의 첫 만남 - 사람과 AI의 인식 방식 차이</td></tr>
          </tbody>
        </table>
        <section className="plan-goal-box">
          <h2>학습 목표</h2>
          <ol>
            <li>옛이야기에 나오는 인물과 배경을 찾을 수 있다.</li>
            <li>중요한 사건 여섯 개를 이야기 순서대로 배열할 수 있다.</li>
            <li>AI가 장면을 이해하는 데 더 필요한 정보를 고르고 말할 수 있다.</li>
          </ol>
        </section>
        <table className="flow-table">
          <thead><tr><th>단계</th><th>시간</th><th>교수 활동</th><th>학생 활동</th><th>자료</th><th>유의점</th></tr></thead>
          <tbody>{flow.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
        </table>
        <section className="assessment-grid">
          <div><h2>관찰 평가</h2><p>인물·배경을 알맞게 고르는가?</p><p>여섯 사건의 흐름을 배열하는가?</p><p>AI에게 필요한 추가 정보를 골라 말하는가?</p></div>
          <div><h2>준비물</h2><p>교사용 PPT, 교사가 검토한 고정 이야기 읽기 자료, 태블릿 또는 활동지, 필기구</p></div>
          <div><h2>수업 원칙</h2><p>생성형 AI를 실행하거나 개인정보를 입력하지 않고, 고정 자료로 인식 방식만 토의한다.</p></div>
        </section>
        <footer className="sheet-footer"><span>성취기준 번호는 운영 학교 교육과정과 대조 후 확정</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

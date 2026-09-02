import PrintToolbar from '../../components/PrintToolbar';

const flow = [
  ['도입', '5분', '자동문과 영상 추천 장면을 보여 주고 “자동으로 움직이면 모두 AI일까?”라는 질문을 제시한다.', '두 장면의 공통점과 차이점을 예상하여 말한다.', 'PPT 1~3', '자동이라는 말만으로 AI 여부를 정하지 않도록 한다.'],
  ['활동 1', '10분', '생활 속 사례 8개를 제시하고 각 기능을 예상하도록 안내한다.', '추천·인식·분류·자동 기계 중 알맞은 칸에 ○표한다.', 'PPT 3~6, 활동지', '센서와 알람처럼 정해진 조건에 반응하는 사례를 함께 비교한다.'],
  ['활동 2', '15분', '추천·인식·분류의 뜻과 자동 기계의 특징을 쉬운 말로 설명한다.', '8개 사례를 네 기능으로 나누고 짝과 선택한 까닭을 말한다.', 'PPT 7~11, 활동지', '글로 쓰기보다 먼저 말로 설명하게 하고 기능 이름 암기를 강요하지 않는다.'],
  ['활동 3', '7분', 'AI와 자동 기계가 결과를 정하는 방식을 비교하고 선택 문제를 안내한다.', '데이터와 정해진 조건 중 알맞은 말을 고르고 두 장면에 ○표한다.', 'PPT 12~14, 활동지', '모든 첨단 기기나 인터넷 연결 기기가 AI인 것은 아님을 강조한다.'],
  ['정리', '3분', '핵심 질문에 다시 답하고 이해 정도를 스스로 확인하게 한다.', 'AI와 자동 기계의 차이를 말하고 자기 확인 칸 하나에 ○표한다.', 'PPT 15, 활동지', '글쓰기 부담 없이 구두 응답과 선택 결과로 이해를 확인한다.'],
];

export default function LessonPlanPage() {
  return (
    <main className="print-page-wrap">
      <PrintToolbar title="1차시 교수·학습 과정안" />
      <article className="print-sheet lesson-plan-sheet">
        <header className="official-header">
          <span>AI+교과 내용 융합 교수·학습 과정안</span>
          <h1>1차시 · 자동으로 움직이면 모두 AI일까?</h1>
        </header>
        <table className="meta-table">
          <tbody>
            <tr><th>프로그램명</th><td colSpan={3}>AI와 함께 만드는 우리 옛이야기 그림책</td><th>대상</th><td>초등 3~4학년</td></tr>
            <tr><th>중심 교과</th><td>창체·국어</td><th>차시</th><td>1/10</td><th>수업 시간</th><td>40분</td></tr>
            <tr><th>성취기준</th><td colSpan={5}>[4국05-02] 인물, 사건, 배경에 주목하며 작품을 이해한다.</td></tr>
            <tr><th>AI 영역</th><td>인공지능의 이해</td><th>세부 영역</th><td>인공지능과 사회</td><th>LEAP</th><td>Look</td></tr>
            <tr><th>AI 내용 요소</th><td colSpan={5}>생활 속 AI 구별 - 추천·인식·분류와 자동 기계의 차이</td></tr>
          </tbody>
        </table>
        <section className="plan-goal-box">
          <h2>학습 목표</h2>
          <ol>
            <li>생활 속 장면을 AI와 자동 기계로 구별하고 근거를 말할 수 있다.</li>
            <li>추천·인식·분류 기능을 알맞은 사례와 연결할 수 있다.</li>
            <li>자동 기계는 정해진 조건과 규칙에 따라 움직이고, AI는 데이터의 특징을 이용한다는 차이를 설명할 수 있다.</li>
          </ol>
        </section>
        <table className="flow-table">
          <thead><tr><th>단계</th><th>시간</th><th>교수 활동</th><th>학생 활동</th><th>자료</th><th>유의점</th></tr></thead>
          <tbody>
            {flow.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}
          </tbody>
        </table>
        <section className="assessment-grid">
          <div><h2>평가 관점</h2><p>AI와 자동 기계를 구별하는가?</p><p>추천·인식·분류를 사례와 연결하는가?</p><p>선택한 까닭을 말로 설명하는가?</p></div>
          <div><h2>준비물</h2><p>교사용 PPT, A4 활동지, 필기구, 화면 공유 장치</p></div>
          <div><h2>수업 전 설정</h2><p>교사 설정 로그인 → 활동지 인쇄 → 발표 화면 전체화면 실행</p></div>
        </section>
        <footer className="sheet-footer"><span>운영 학교의 해당 학년 교육과정과 대조 후 성취기준 번호 확정</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

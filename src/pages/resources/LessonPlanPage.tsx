import PrintToolbar from '../../components/PrintToolbar';

const flow = [
  ['도입', '5분', '생활 속에서 AI를 만난 경험을 질문하고 오늘의 핵심 질문을 제시한다.', '자신의 경험을 떠올려 발표하고, 같은 문장을 사람과 AI가 어떻게 이해할지 예상한다.', 'PPT 1~3', '정답을 먼저 설명하지 않고 학생 경험을 충분히 듣는다.'],
  ['활동 1', '10분', '생활 속 장면 6가지를 제시하고 AI가 쓰인 장면을 선택하도록 안내한다. 선택 이유를 함께 확인한다.', '웹앱에서 AI 장면을 선택하고 카드의 설명을 읽으며 선택을 수정한다.', '학생 웹앱', '모든 자동 기계가 AI인 것은 아님을 구체적 사례로 구분한다.'],
  ['활동 2', '15분', '같은 문장을 제시하고 학생이 상상한 장면을 먼저 표현하게 한다. 이후 같은 문장을 AI 이미지 생성 도구에 입력하여 결과를 시연한다.', '표정·시간·분위기·비의 모습을 선택하고 장면을 그린 뒤 AI 결과와 비교한다.', '활동지, AI 이미지 생성 도구', '외부 AI 도구는 교사가 시연하며 개인정보를 입력하지 않는다.'],
  ['활동 3', '7분', '같았던 점과 달랐던 점을 관찰 근거로 말하게 하고 사람과 AI의 이해 방식을 연결한다.', '두 그림의 같은 점과 다른 점을 쓰고 사람은 경험과 기억, AI는 학습한 데이터를 바탕으로 한다는 문장을 완성한다.', '웹앱, 활동지', '그림의 우열보다 이해 방식의 차이에 초점을 둔다.'],
  ['정리', '3분', '오늘의 핵심 문장을 함께 읽고 새롭게 알게 된 점을 한 문장으로 정리하게 한다.', '“사람은 경험으로, AI는 데이터로 이해한다.”를 말하고 성찰 문장을 작성한다.', 'PPT 15', '학생의 표현을 존중하고 다음 차시의 옛이야기 선정 활동을 예고한다.'],
];

export default function LessonPlanPage() {
  return (
    <main className="print-page-wrap">
      <PrintToolbar title="1차시 교수·학습 과정안" />
      <article className="print-sheet lesson-plan-sheet">
        <header className="official-header">
          <span>AI+교과 내용 융합 교수·학습 과정안</span>
          <h1>1차시 · 사람과 AI, 누가 더 잘 볼까?</h1>
        </header>
        <table className="meta-table">
          <tbody>
            <tr><th>프로그램명</th><td colSpan={3}>AI와 함께 만드는 우리 옛이야기 그림책</td><th>대상</th><td>초등 3~4학년</td></tr>
            <tr><th>중심 교과</th><td>창체·국어</td><th>차시</th><td>1/10</td><th>수업 시간</th><td>40분</td></tr>
            <tr><th>성취기준</th><td colSpan={5}>[4국05-02] 인물, 사건, 배경에 주목하며 작품을 이해한다.</td></tr>
            <tr><th>AI 영역</th><td>인공지능의 이해</td><th>세부 영역</th><td>인공지능과 사회</td><th>LEAP</th><td>Look</td></tr>
            <tr><th>AI 내용 요소</th><td colSpan={5}>인공지능과의 첫 만남 - 사람과 AI의 인식 방식 차이</td></tr>
          </tbody>
        </table>
        <section className="plan-goal-box">
          <h2>학습 목표</h2>
          <ol>
            <li>생활 속에서 AI가 활용되는 장면을 찾아 설명할 수 있다.</li>
            <li>같은 문장을 보고 자신이 상상한 그림과 AI가 만든 그림의 같은 점과 다른 점을 찾을 수 있다.</li>
            <li>사람은 경험과 기억을, AI는 학습한 데이터를 바탕으로 이해한다는 차이를 말할 수 있다.</li>
          </ol>
        </section>
        <table className="flow-table">
          <thead><tr><th>단계</th><th>시간</th><th>교수 활동</th><th>학생 활동</th><th>자료</th><th>유의점</th></tr></thead>
          <tbody>
            {flow.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}
          </tbody>
        </table>
        <section className="assessment-grid">
          <div><h2>평가 관점</h2><p>생활 속 AI 사례를 근거와 함께 구분하는가?</p><p>그림의 같은 점과 다른 점을 관찰하여 설명하는가?</p><p>사람과 AI의 이해 방식 차이를 핵심 낱말로 말하는가?</p></div>
          <div><h2>준비물</h2><p>교사용 PPT, 학생용 웹앱 또는 태블릿, A4 활동지, AI 이미지 생성 도구, 화면 공유 장치</p></div>
          <div><h2>수업 전 설정</h2><p>교사 설정 로그인 → AI 시연 이미지 준비 → 학생 활동 공개 → 발표 화면 전체화면 실행</p></div>
        </section>
        <footer className="sheet-footer"><span>운영 학교의 해당 학년 교육과정과 대조 후 성취기준 번호 확정</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

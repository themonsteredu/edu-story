import PrintToolbar from '../../components/PrintToolbar';

const flow = [
  ['도입', '5분', '글·실제 사진·번호 음원을 보여 주며 AI가 살펴볼 수 있는 자료인지 묻는다.', '눈으로 보거나 귀로 들은 차이를 말하고 오늘의 질문을 확인한다.', 'PPT 1~3', '어려운 원리보다 실제 자료의 차이에 집중한다.'],
  ['설명', '5분', '문자·이미지·소리 데이터의 쉬운 뜻을 실제 매체로 설명한다.', '읽어요·보여요·들려요 가운데 알맞은 말을 고른다.', 'PPT 4~6', '사진이라고 적힌 글이 아니라 실제 사진을 보여 주고 번호 음원을 재생한다.'],
  ['활동 1', '8분', '고정 카드 A~F를 제시하고 소리 ①·② WAV를 번호에 맞춰 재생한다.', '카드 6개를 문자·이미지·소리로 분류한다.', 'PPT 7, 활동지·카드', '카드의 뜻보다 실제 제시 방식이 읽기·보기·듣기 중 무엇인지 살핀다.'],
  ['활동 2', '9분', '‘사람들이 교실에 있어요.’에 A와 B 자료를 붙여 문자·같은 사진의 밝기·소리를 비교한다.', 'A와 B에서 느껴지는 마음에 ○표하고, 달라진 문자·이미지·소리를 말하거나 가리킨다.', 'PPT 8~11, 웹앱·활동지', 'A는 밝은 교실 실사와 ② 새소리, B는 같은 사진을 어둡게 처리한 모습과 ③ 천둥소리로 제시한다.'],
  ['활동 3', '10분', '주인공·장소·시간·표정·빛과 색·소리에서 하나씩 고르는 방법을 시범 보인다.', '2차시에 정한 자기 이야기에서 한 장면을 떠올려 여섯 항목을 직접 고른다.', 'PPT 12, 웹앱·활동지', '특정 이야기나 교사 예시를 따라 하지 않게 한다. 긴 글 대신 가리키기와 말하기를 허용한다.'],
  ['정리', '3분', '세 가지 데이터가 함께 장면의 느낌을 만든다는 핵심을 정리한다.', '내 꾸러미에서 문자·이미지·소리 데이터를 하나씩 가리키며 소개한다.', 'PPT 13', '분류가 어려운 학생은 “읽어요·보여요·들어요” 말틀로 돕는다.'],
];

export default function LessonThreeLessonPlanPage() {
  return (
    <main className="print-page-wrap lesson-two-print-wrap">
      <PrintToolbar title="3차시 교수·학습 과정안" />
      <article className="print-sheet lesson-plan-sheet">
        <header className="official-header">
          <span>AI+교과 내용 융합 교수·학습 과정안</span>
          <h1>3차시 · AI가 이해하는 데이터</h1>
        </header>
        <table className="meta-table">
          <tbody>
            <tr><th>프로그램명</th><td colSpan={3}>AI와 함께 만드는 우리 옛이야기 그림책</td><th>대상</th><td>초등 3~4학년</td></tr>
            <tr><th>중심 교과</th><td>국어</td><th>차시</th><td>3/10</td><th>수업 시간</th><td>40분</td></tr>
            <tr><th>성취기준</th><td colSpan={5}>[4국05-02] 인물, 사건, 배경에 주목하며 작품을 이해한다.　[4국05-03] 이야기의 흐름을 파악하여 이어질 내용을 상상하고 표현한다.</td></tr>
            <tr><th>AI 영역</th><td>인공지능의 원리와 활용</td><th>세부 영역</th><td>데이터</td><th>LEAP</th><td>Explore</td></tr>
            <tr><th>내용 요소</th><td colSpan={5}>여러 가지 데이터(문자·이미지·소리)와 장면을 이루는 데이터 찾기</td></tr>
          </tbody>
        </table>
        <section className="plan-goal-box">
          <h2>학습 목표</h2>
          <ol>
            <li>문자·이미지·소리 데이터를 자료의 모습에 따라 구분할 수 있다.</li>
            <li>같은 문장도 문자·이미지·소리 자료에 따라 느낌이 달라짐을 알 수 있다.</li>
            <li>내 이야기에 필요한 주인공·장소·시간·표정·빛·소리를 직접 고를 수 있다.</li>
          </ol>
        </section>
        <table className="flow-table">
          <thead><tr><th>단계</th><th>시간</th><th>교수 활동</th><th>학생 활동</th><th>자료</th><th>유의점</th></tr></thead>
          <tbody>{flow.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
        </table>
        <section className="assessment-grid">
          <div><h2>관찰 평가</h2><p>세 가지 데이터 유형을 구분하는가?</p><p>데이터가 달라지면 느낌도 달라짐을 말하는가?</p><p>자기 이야기의 여섯 항목을 스스로 고르는가?</p></div>
          <div><h2>준비물</h2><p>교사용 PPT, 2차시 장면 기획 결과, 학생 웹앱 또는 활동지, 실사 사진 카드, 소리 ①~④ WAV</p></div>
          <div><h2>수업 원칙</h2><p>생성형 AI를 실행하지 않는다. 학생이 자료를 분류하고 직접 선택하는 활동에 집중한다.</p></div>
        </section>
        <footer className="sheet-footer"><span>성취기준 번호는 운영 학교 교육과정과 대조 후 확정</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

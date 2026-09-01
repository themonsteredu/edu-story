import PrintToolbar from '../../components/PrintToolbar';

export default function AnswerKeyPage() {
  return (
    <main className="print-page-wrap">
      <PrintToolbar title="1차시 교사용 답안" />
      <article className="print-sheet answer-sheet">
        <header className="sheet-header answer-header">
          <div><span>교사용 자료</span><h1>1차시 활동지 답안 및 발문</h1><p>사람과 AI, 누가 더 잘 볼까?</p></div>
          <strong>TEACHER</strong>
        </header>
        <section className="answer-section">
          <h2><b>1</b> 생활 속 AI 찾기</h2>
          <table><thead><tr><th>장면</th><th>정답</th><th>교사용 설명</th></tr></thead><tbody>
            <tr><td>좋아할 영상 추천</td><td>AI</td><td>이용 기록에서 비슷한 특징을 찾아 추천한다.</td></tr>
            <tr><td>음성으로 날씨 묻기</td><td>AI</td><td>말소리의 특징을 살펴 뜻을 알아내고 정보를 찾는다.</td></tr>
            <tr><td>얼굴 인식 잠금</td><td>AI</td><td>등록 얼굴과 현재 얼굴의 특징을 비교한다.</td></tr>
            <tr><td>전등 스위치</td><td>AI 아님</td><td>사람이 누른 정해진 동작을 수행한다.</td></tr>
            <tr><td>자로 길이 재기</td><td>AI 아님</td><td>사람이 도구의 눈금을 직접 읽는다.</td></tr>
            <tr><td>자동 번역</td><td>AI</td><td>많은 문장 자료에서 언어 관계를 학습해 표현을 제안한다.</td></tr>
          </tbody></table>
        </section>
        <section className="answer-section two-column-answer">
          <div><h2><b>2</b> 상상 그림</h2><p><strong>정답 없음.</strong> 같은 문장을 읽어도 학생의 경험과 기억에 따라 표정, 시간, 분위기, 비의 모습이 달라질 수 있다.</p><p className="teacher-question">추가 발문: “왜 그 시간과 표정을 떠올렸나요?”</p></div>
          <div><h2><b>3</b> 그림 비교</h2><p><strong>예시</strong> 같은 점: 빨간 우산, 아이, 비, 골목길. 다른 점: 시간대, 아이의 표정, 골목의 색감, 비의 세기, 소품.</p><p className="teacher-question">추가 발문: “그 차이는 그림의 어느 부분에서 찾았나요?”</p></div>
        </section>
        <section className="answer-section concept-answer">
          <h2><b>4</b> 핵심 개념</h2>
          <div className="answer-sentence">사람은 <strong>경험과 기억</strong>을 바탕으로 생각하고, AI는 <strong>학습한 데이터</strong>를 바탕으로 결과를 만든다.</div>
          <p>학생이 ‘경험’, ‘기억’, ‘데이터’ 중 핵심 의미가 드러나는 말로 썼다면 인정한다. AI가 사람처럼 감정을 느껴 그림을 만들었다고 오해하지 않도록 설명한다.</p>
        </section>
        <section className="answer-section">
          <h2><b>5</b> 성찰 문장 예시</h2>
          <ul>
            <li>같은 문장을 읽어도 사람마다 다른 장면을 떠올릴 수 있다는 것을 알았다.</li>
            <li>AI는 내가 적지 않은 부분을 학습한 데이터에서 찾아 채울 수 있다는 것을 알았다.</li>
            <li>AI에게 원하는 장면을 만들게 하려면 더 구체적으로 알려줘야 한다.</li>
          </ul>
        </section>
        <section className="teacher-caution">
          <h2>지도 유의점</h2>
          <p>AI 결과를 정답으로 제시하지 않는다. 학생이 관찰 근거를 말하도록 돕고, 외부 AI 도구에는 학생 이름·사진·개인정보를 입력하지 않는다.</p>
        </section>
        <footer className="sheet-footer"><span>정답보다 관찰 근거와 설명 과정을 평가</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

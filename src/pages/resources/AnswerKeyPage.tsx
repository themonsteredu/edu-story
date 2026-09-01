import PrintToolbar from '../../components/PrintToolbar';

export default function AnswerKeyPage() {
  return (
    <main className="print-page-wrap">
      <PrintToolbar title="1차시 교사용 답안" />
      <article className="print-sheet answer-sheet">
        <header className="sheet-header answer-header">
          <div><span>교사용 자료</span><h1>1차시 활동지 답안 및 발문</h1><p>자동으로 움직이면 모두 AI일까?</p></div>
          <strong>TEACHER</strong>
        </header>
        <section className="answer-section">
          <h2><b>1</b> 8개 사례 기능표</h2>
          <table><thead><tr><th>사례</th><th>기능</th><th>판단 근거</th></tr></thead><tbody>
            <tr><td>좋아할 영상 골라 주기</td><td>추천</td><td>시청 기록과 반응에서 비슷한 특징을 찾아 고른다.</td></tr>
            <tr><td>다음에 읽을 책 골라 주기</td><td>추천</td><td>읽은 책과 관심 주제의 관계를 살펴 알맞은 책을 고른다.</td></tr>
            <tr><td>얼굴을 알아보고 잠금 풀기</td><td>인식</td><td>등록된 얼굴과 현재 얼굴의 특징을 비교해 알아본다.</td></tr>
            <tr><td>말소리를 글자로 바꾸기</td><td>인식</td><td>말소리의 특징을 알아보고 알맞은 글자로 바꾼다.</td></tr>
            <tr><td>사진을 동물·식물로 나누기</td><td>분류</td><td>사진의 특징을 찾아 알맞은 모둠으로 나눈다.</td></tr>
            <tr><td>스팸 메일 가려내기</td><td>분류</td><td>메일의 낱말과 보낸 사람 등의 특징을 살펴 나눈다.</td></tr>
            <tr><td>10분 뒤 알람 울리기</td><td>자동 기계</td><td>정해 둔 시간이 지나면 알람을 울리는 동작을 한다.</td></tr>
            <tr><td>센서 자동문 열기</td><td>자동 기계</td><td>센서가 사람을 감지하면 문을 여는 정해진 동작을 한다.</td></tr>
          </tbody></table>
        </section>
        <section className="answer-section">
          <h2><b>2</b> 구별한 까닭</h2>
          <p><strong>예시</strong> 영상 추천은 시청 기록에서 비슷한 특징을 찾아 고른다. 자동문은 센서가 사람을 감지하면 문을 여는 정해진 동작을 한다.</p>
          <p className="teacher-question">추가 발문: “결과가 달라지려면 데이터가 달라져야 할까요, 정해진 조건이 달라져야 할까요?”</p>
        </section>
        <section className="answer-section concept-answer">
          <h2><b>3</b> 핵심 개념</h2>
          <div className="answer-sentence">자동 기계는 <strong>정해진 조건과 규칙</strong>에 따라 움직이고, AI는 데이터에서 <strong>특징과 관계</strong>를 찾아 추천·인식·분류한다.</div>
          <p>‘정해진 조건(규칙)’과 ‘데이터의 특징(관계)’이라는 차이가 드러나면 인정한다. 센서나 인터넷이 있다는 이유만으로 AI라고 판단하지 않도록 설명한다.</p>
        </section>
        <section className="answer-section">
          <h2><b>4</b> 성찰 문장 예시</h2>
          <ul>
            <li>자동으로 움직인다고 해서 모두 AI인 것은 아니라는 것을 알았다.</li>
            <li>AI는 데이터의 특징을 찾아 추천하거나 인식하거나 분류할 수 있다.</li>
            <li>자동문은 정해진 조건에 따라 움직이므로 AI와 다르다.</li>
          </ul>
        </section>
        <section className="teacher-caution">
          <h2>지도 유의점</h2>
          <p>제품 이름이나 겉모습만으로 판단하지 않는다. 실제 기기에는 여러 기능이 함께 들어갈 수 있으므로, 이 수업에서는 제시된 기능이 결과를 정하는 방식에 초점을 둔다.</p>
        </section>
        <footer className="sheet-footer"><span>정답과 함께 구별 근거를 평가</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

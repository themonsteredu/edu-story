import PrintToolbar from '../../components/PrintToolbar';

export default function LessonThreeAnswerKeyPage() {
  return (
    <main className="print-page-wrap lesson-two-print-wrap">
      <PrintToolbar title="3차시 교사용 답안" />
      <article className="print-sheet answer-sheet">
        <header className="sheet-header answer-header">
          <div><span>교사용 자료</span><h1>3차시 활동지 답안 및 발문</h1><p>AI가 이해하는 데이터</p></div>
          <strong>03</strong>
        </header>

        <section className="answer-section">
          <h2><b>1</b> 문자·이미지·소리 데이터 분류</h2>
          <table>
            <thead><tr><th>종류</th><th>정답</th><th>확인할 점</th></tr></thead>
            <tbody>
              <tr><th>문자 데이터</th><td>A · B</td><td>글자로 읽는 자료인지 살핀다.</td></tr>
              <tr><th>이미지 데이터</th><td>C · D</td><td>카드에 실제로 인쇄된 사진을 눈으로 본다.</td></tr>
              <tr><th>소리 데이터</th><td>E · F</td><td>E는 ① 빗소리, F는 ② 새소리 WAV를 교사가 재생한다.</td></tr>
            </tbody>
          </table>
          <p className="teacher-question"><strong>발문</strong> “이 자료는 읽나요, 보나요, 듣나요?” “같은 내용을 글·그림·소리로 각각 나타낼 수도 있을까요?”</p>
        </section>

        <section className="answer-section two-column-answer">
          <div>
            <h2><b>2</b> 같은 문장, 다른 데이터</h2>
            <p><strong>A 꾸러미</strong> “밝은 낮, 함께 배우는 시간” · 밝은 교실 실사 · ② 새소리</p>
            <img src="/assets/lesson-01/classroom-real.webp" alt="밝은 교실에서 선생님과 어린이들이 함께 있는 사진" style={{ width: '100%', height: '10mm', objectFit: 'cover' }} />
            <p><strong>B 꾸러미</strong> “어두운 밤, 조용한 교실” · 같은 교실 실사를 어둡게 처리 · ③ 천둥소리</p>
            <img src="/assets/lesson-01/classroom-real.webp" alt="같은 교실 사진을 어둡게 처리한 모습" style={{ width: '100%', height: '10mm', objectFit: 'cover', filter: 'brightness(0.34) saturate(0.65)' }} />
            <p><strong>달라진 데이터</strong> 문자·이미지·소리</p>
            <p><strong>같은 문장</strong> 사람들이 교실에 있어요.</p>
          </div>
          <div>
            <h2><b>3</b> 내 이야기의 한 장면</h2>
            <p>주인공·장소·시간·표정·빛과 색·소리에서 하나씩 골랐다면 모두 인정합니다.</p>
            <p>해와 달이 된 오누이처럼 정해진 이야기를 따라 쓰게 하지 않습니다. 2차시에 정한 자기 이야기와 이어지면 됩니다.</p>
            <p>그림의 완성도나 쓰기 양은 평가하지 않습니다.</p>
          </div>
        </section>

        <section className="answer-section">
          <h2><b>4</b> 수업 중 짧은 추가 발문</h2>
          <table>
            <thead><tr><th>상황</th><th>교사 발문</th><th>학생 응답 예</th></tr></thead>
            <tbody>
              <tr><th>분류가 어려울 때</th><td>“이 자료를 사용할 때 눈으로 읽니, 그림으로 보니, 귀로 듣니?”</td><td>읽어요 / 보여요 / 들려요</td></tr>
              <tr><th>A·B를 비교할 때</th><td>“기본 문장은 같은데 어떤 자료가 바뀌었니?”</td><td>문자 설명, 같은 교실 사진의 밝기, ② 새소리가 ③ 천둥소리로 바뀌었어요.</td></tr>
              <tr><th>한 장면을 고를 때</th><td>“누가, 어디에서, 언제 무엇을 느끼니? 어떤 소리가 어울리니?”</td><td>동물 / 숲 / 밤 / 놀란 얼굴 / ④ 바람소리</td></tr>
            </tbody>
          </table>
        </section>

        <section className="teacher-caution">
          <h2>지도 유의점</h2>
          <p>이 차시는 생성형 AI 결과를 만드는 시간이 아닙니다. 실제 사진과 교사가 재생하는 고정 WAV를 구분하고, 학생이 자기 이야기 장면에 필요한 데이터를 직접 고르는 경험에 집중합니다.</p>
        </section>
        <footer className="sheet-footer"><span>쓰기 점수 없이 분류·선택·말하기로 관찰 평가</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

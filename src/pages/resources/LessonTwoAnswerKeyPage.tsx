import PrintToolbar from '../../components/PrintToolbar';
import { lessonTwoStories } from '../../data/lesson2';

const displayOrder = [3, 0, 5, 2, 1, 4];

export default function LessonTwoAnswerKeyPage() {
  return (
    <main className="print-page-wrap lesson-two-print-wrap">
      <PrintToolbar title="2차시 교사용 답안" />
      <article className="print-sheet lesson-two-answer-sheet">
        <header>
          <div><span>교사용 자료</span><h1>2차시 활동지 답안 및 발문</h1><p>우리가 만들 이야기 정하기</p></div>
          <strong>TEACHER · 02</strong>
        </header>
        <div className="lesson-two-answer-grid">
          {lessonTwoStories.map((story) => {
            const labelsByEvent = new Map(displayOrder.map((eventIndex, labelIndex) => [story.events[eventIndex].id, String.fromCharCode(65 + labelIndex)]));
            const sequence = [...story.events].sort((a, b) => a.correctOrder - b.correctOrder).map((event) => labelsByEvent.get(event.id)).join(' → ');
            return (
              <section key={story.id}>
                <span>{story.theme}</span>
                <h2>{story.title}</h2>
                <dl>
                  <div><dt>인물</dt><dd>{story.characters.filter((item) => item.correct).map((item) => item.label).join(' · ')}</dd></div>
                  <div><dt>배경</dt><dd>{story.backgrounds.filter((item) => item.correct).map((item) => item.label).join(' · ')}</dd></div>
                  <div><dt>사건 순서</dt><dd><strong>{sequence}</strong></dd></div>
                </dl>
                <ol>{[...story.events].sort((a, b) => a.correctOrder - b.correctOrder).map((event) => <li key={event.id}>{event.text}</li>)}</ol>
              </section>
            );
          })}
        </div>
        <section className="lesson-two-teacher-guidance">
          <div><h2>정답과 기획 구분</h2><p>인물·배경·사건 순서는 읽기 이해를 확인합니다. 장면의 느낌과 모습은 학생이 직접 기획하므로 하나의 정답을 두지 않습니다.</p></div>
          <div><h2>추가 발문</h2><p>“이 사건이 앞에 와야 하는 까닭은 무엇일까?”, “이 장면을 어떤 모습으로 그리고 싶니?”, “친구와 다르게 고른 점은 무엇이니?”</p></div>
          <div><h2>지도 유의점</h2><p>전래 이야기에는 여러 판본이 있습니다. 수업에서는 제공된 고정 사건 카드의 흐름을 기준으로 하되 다른 판본을 틀렸다고 단정하지 않습니다.</p></div>
        </section>
        <footer><span>쓰기 점수 없이 선택·배열·말하기로 관찰 평가</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

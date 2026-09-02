import PrintToolbar from '../../components/PrintToolbar';
import { lessonTwoDetailCategories, lessonTwoStories } from '../../data/lesson2';

const displayOrder = [3, 0, 5, 2, 1, 4];

export default function LessonTwoWorksheetPage() {
  return (
    <main className="print-page-wrap lesson-two-print-wrap">
      <PrintToolbar title="2차시 학생 활동지 3종" />
      {lessonTwoStories.map((story, storyIndex) => {
        const shuffled = displayOrder.map((index, labelIndex) => ({
          ...story.events[index],
          label: String.fromCharCode(65 + labelIndex),
        }));
        return (
          <article className="print-sheet lesson-two-print-sheet lesson-two-worksheet" key={story.id}>
            <header>
              <div>
                <span>AI와 함께 만드는 우리 옛이야기 그림책</span>
                <h1>2차시 · 우리가 만들 이야기 정하기</h1>
                <p>{story.title} 활동지</p>
              </div>
              <div><span>학년·반 ________</span><span>모둠 ________</span><span>이름 ____________</span></div>
            </header>

            <section className="lesson-two-paper-elements">
              <h2><b>1</b> 이야기를 읽고, 알맞은 낱말에 ○표하세요.</h2>
              <div>
                <strong>인물</strong>
                <p>{story.characters.map((item) => item.label).join('　·　')}</p>
              </div>
              <div>
                <strong>배경</strong>
                <p>{story.backgrounds.map((item) => item.label).join('　·　')}</p>
              </div>
            </section>

            <section className="lesson-two-paper-events">
              <h2><b>2</b> 사건 카드를 읽고, 먼저 일어난 일부터 순서를 적으세요.</h2>
              <div className="lesson-two-paper-event-grid">
                {shuffled.map((event) => (
                  <div key={event.id}><span>{event.label}</span><strong>{event.text}</strong></div>
                ))}
              </div>
              <div className="lesson-two-paper-sequence" aria-label="사건 순서 적는 칸">
                <span /><i>→</i><span /><i>→</i><span /><i>→</i><span /><i>→</i><span /><i>→</i><span />
              </div>
            </section>

            <section className="lesson-two-paper-detail">
              <h2><b>3</b> 각 장면에서 더 자세히 알려주고 싶은 것 하나씩 ○표하세요.</h2>
              <table aria-label="장면별로 더 알려줄 정보 고르기">
                <thead><tr><th>장면</th>{lessonTwoDetailCategories.map((item) => <th key={item}>{item}</th>)}</tr></thead>
                <tbody>{story.events.map((event, index) => (
                  <tr key={event.id}><th>{index + 1}</th>{lessonTwoDetailCategories.map((item) => <td key={item}>{item}</td>)}</tr>
                ))}</tbody>
              </table>
              <p>글을 쓰지 않아도 됩니다. 고른 내용을 짝에게 말해 보세요.</p>
            </section>

            <footer><span>LOOK · 인물·사건·배경 찾기</span><span>{storyIndex + 1} / {lessonTwoStories.length} · 더몬스터학원 EDU STORY</span></footer>
          </article>
        );
      })}
    </main>
  );
}

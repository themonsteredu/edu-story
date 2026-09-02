import PrintToolbar from '../../components/PrintToolbar';
import { lessonTwoStories } from '../../data/lesson2';

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

            <section className="lesson-two-paper-plan">
              <h2><b>3</b> 내가 맡은 장면 하나를 직접 기획해 보세요.</h2>
              <div className="lesson-two-paper-plan-picker">
                <strong>내 장면</strong>
                {[1, 2, 3, 4, 5, 6].map((number) => <span key={number}>{number}</span>)}
                <small>모둠원이 서로 다른 장면을 고르면 여섯 장면이 완성돼요.</small>
              </div>
              <div className="lesson-two-paper-plan-fields">
                <div><strong>누가 나오나요?</strong><span>________________</span></div>
                <div><strong>어디인가요?</strong><span>________________</span></div>
                <div><strong>어떤 느낌인가요?</strong><span>밝게　·　무섭게　·　따뜻하게　·　신나게</span></div>
                <div><strong>무엇을 크게 그릴까요?</strong><span>________________</span></div>
              </div>
              <div className="lesson-two-paper-sketch"><span>내가 그리고 싶은 장면을 간단히 그려 보세요.</span></div>
            </section>

            <footer><span>LOOK · 이야기 이해와 장면 기획</span><span>{storyIndex + 1} / {lessonTwoStories.length} · 더몬스터학원 EDU STORY</span></footer>
          </article>
        );
      })}
    </main>
  );
}

import PrintToolbar from '../../components/PrintToolbar';
import { lessonTwoStories } from '../../data/lesson2';

export default function LessonTwoReadingPage() {
  return (
    <main className="print-page-wrap lesson-two-print-wrap">
      <PrintToolbar title="2차시 고정 이야기 읽기 자료" />
      {lessonTwoStories.map((story, storyIndex) => (
        <article className="print-sheet lesson-two-print-sheet lesson-two-reading-sheet" key={story.id}>
          <header>
            <div>
              <span>교사가 검토한 고정 이야기 · 생성형 AI 미사용</span>
              <h1>{story.title}</h1>
              <p>{story.theme}</p>
            </div>
            <div><span>2차시 읽기 자료</span><span>이야기 {storyIndex + 1} / {lessonTwoStories.length}</span></div>
          </header>

          <section className="lesson-two-reading-body">
            <span>함께 읽어요</span>
            {story.readingParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          <section className="lesson-two-reading-talk">
            <strong>읽고 말해 보세요</strong>
            <p>누가 나오나요?</p>
            <p>어디에서 일이 일어나나요?</p>
            <p>가장 중요한 사건은 무엇인가요?</p>
          </section>

          <footer><span>여러 판본의 공통 흐름을 초등 3~4학년 수업용으로 순화·재구성함</span><span>더몬스터학원 EDU STORY</span></footer>
        </article>
      ))}
    </main>
  );
}

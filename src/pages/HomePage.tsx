import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

const lessons = [
  ['1', '사람과 AI, 누가 더 잘 볼까?', '생활 속 AI와 사람·AI의 이해 방식 비교', 'Look'],
  ['2', '우리가 만들 이야기 정하기', '옛이야기의 인물·사건·배경과 6장면 구성', 'Look'],
  ['3', 'AI가 이해하는 데이터', '문자·이미지·소리 데이터 구분', 'Explore'],
  ['4', '이야기를 데이터로 바꾸기', '장면 데이터 표와 프롬프트 문장', 'Explore'],
  ['5', '이야기 감정 그래프 만들기', '감정을 수치로 바꾸고 그래프로 표현', 'Explore'],
  ['6', '장면에 어울리는 소리 넣기', '감정 흐름에 맞는 음악과 효과음', 'Explore'],
  ['7', '캔바로 그림책 한 컷 만들기', '데이터를 바탕으로 이미지 생성·수정', 'Act'],
  ['8', '책장이 넘어가는 우리 그림책', '6장면과 소리를 이어 플립북 완성', 'Act'],
  ['9', 'AI가 만든 그림책, 무엇을 조심할까', '저작권·초상권·개인정보 점검', 'Practice'],
  ['10', '그림책 발표회와 우리 반 AI 약속', '작품 감상과 바른 AI 활용 약속', 'Practice'],
];

export default function HomePage() {
  return (
    <AppShell>
      <main>
        <section className="home-hero">
          <div className="hero-copy">
            <span className="eyebrow">초등 3~4학년 · AI+교과 융합 교육과정</span>
            <h1>AI와 함께 만드는 우리 옛이야기 그림책</h1>
            <p>
              사람과 AI의 이해 방식 차이를 살펴보고, 이야기를 데이터로 정리한 뒤
              그림·소리·플립북으로 완성하는 10차시 프로젝트입니다.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/lesson/1">1차시 시작하기</Link>
              <Link className="button secondary" to="/teacher">교사 설정</Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="book-stack">
              <span className="book-page page-one">사람의 상상</span>
              <span className="book-page page-two">AI의 데이터</span>
              <span className="book-page page-three">우리의 이야기</span>
            </div>
          </div>
        </section>

        <section className="program-strip" aria-label="프로그램 개요">
          <div><strong>10차시</strong><span>프로젝트 수업</span></div>
          <div><strong>초등 3~4학년</strong><span>권장 대상</span></div>
          <div><strong>국어·창체·수학·음악·미술·도덕</strong><span>교과 융합</span></div>
          <div><strong>플립북 영상</strong><span>최종 결과물</span></div>
        </section>

        <section className="lesson-roadmap section-wrap">
          <div className="section-heading">
            <span className="eyebrow">10차시 로드맵</span>
            <h2>한 차시씩 완성해 가는 그림책 프로젝트</h2>
            <p>현재는 1차시가 열려 있으며, 다음 차시는 순차적으로 연결합니다.</p>
          </div>
          <div className="roadmap-list">
            {lessons.map(([number, title, description, phase], index) => (
              <article key={number} className={index === 0 ? 'roadmap-item active' : 'roadmap-item locked'}>
                <div className="lesson-number">{number.padStart(2, '0')}</div>
                <div className="lesson-info">
                  <span className={`phase-tag ${phase.toLowerCase()}`}>{phase}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                {index === 0 ? (
                  <Link className="lesson-link" to="/lesson/1">수업 열기 →</Link>
                ) : (
                  <span className="lesson-link muted">순차 제작</span>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}

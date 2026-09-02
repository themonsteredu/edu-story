import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';

const lessons = [
  ['1', '자동으로 움직이면 모두 AI일까?', '추천·인식·분류와 자동기계 구별', 'Look'],
  ['2', '우리가 만들 이야기 정하기', '옛이야기의 인물·사건·배경과 6장면 구성', 'Look'],
  ['3', 'AI가 이해하는 데이터', '문자·이미지·소리 데이터 구분', 'Explore'],
  ['4', '이야기를 데이터로 바꾸기', '장면 데이터 표와 구체적인 설명문', 'Explore'],
  ['5', '이야기 감정 그래프 만들기', '감정을 수치로 바꾸고 그래프로 표현', 'Explore'],
  ['6', '장면에 어울리는 소리 넣기', '공개 음원과 효과음 고르기', 'Explore'],
  ['7', '우리 손으로 그림책 한 컷 만들기', '손그림과 디지털 편집으로 장면 구성', 'Act'],
  ['8', '책장이 넘어가는 우리 그림책', '6장면과 소리를 이어 플립북 완성', 'Act'],
  ['9', '디지털 그림책, 무엇을 조심할까', '저작권·초상권·개인정보 점검', 'Practice'],
  ['10', '그림책 발표회와 우리 반 AI 약속', '작품 감상과 바른 AI 활용 약속', 'Practice'],
];

export default function HomePage() {
  return (
    <AppShell>
      <main>
        <section className="home-hero">
          <div className="hero-copy">
            <span className="eyebrow">AI+교과 융합 프로젝트 · 초등 3~4학년</span>
            <h1>AI와 함께 만드는 우리 옛이야기 그림책</h1>
            <p>
              생활 속 AI를 바르게 이해하고, 이야기를 데이터로 정리한 뒤
              직접 만든 그림·소리·플립북으로 완성하는 10차시 프로젝트입니다.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/present/1">수업용 PPT</Link>
              <Link className="button secondary" to="/lesson/1">학생용 웹앱 <small>선택</small></Link>
            </div>
            <span className="hero-edition">LESSON 01 · LOOK</span>
          </div>
          <figure className="hero-visual">
            <img src="/assets/lesson-01/classroom-real.webp" alt="교실에서 학생들이 종이 활동을 하는 실제 사진" />
            <figcaption>생활 속 AI의 작동 방식을 실제 사례로 관찰합니다.</figcaption>
          </figure>
        </section>

        <section className="home-launch section-wrap" aria-labelledby="lesson-one-launch">
          <div className="launch-heading">
            <span className="eyebrow">1차시 기본 운영</span>
            <h2 id="lesson-one-launch">자동으로 움직이면 모두 AI일까?</h2>
            <p>교사는 PPT를 진행하고, 학생은 종이 활동지에 ○표하며 생각을 말합니다.</p>
          </div>
          <div className="launch-options">
            <article className="launch-option primary-option">
              <span className="launch-number">01</span>
              <div>
                <small>교사용</small>
                <h3>수업용 PPT</h3>
                <p>추천·인식·분류와 자동기계를 실제 사례로 구별하는 수업을 진행합니다.</p>
              </div>
              <Link className="button primary" to="/present/1">PPT 시작하기</Link>
            </article>
            <article className="launch-option">
              <span className="launch-number">02</span>
              <div>
                <small>학생 활동</small>
                <h3>활동지로 기록하기</h3>
                <p>학생은 여덟 가지 사례에 ○표하고 선택한 까닭은 짝과 말로 나눕니다.</p>
              </div>
              <Link className="button secondary" to="/teacher">활동지·교사자료</Link>
            </article>
          </div>
          <p className="optional-webapp-note">
            활동지·지도안·교사용 답안은 <Link to="/teacher">교사 설정(3035)</Link>에 있습니다.
            태블릿을 쓰는 수업에서만 <Link to="/lesson/1">학생용 웹앱</Link>을 선택해 주세요.
          </p>
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
                  <Link className="lesson-link" to="/present/1">수업 PPT →</Link>
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

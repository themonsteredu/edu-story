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
    <AppShell lessonNumber={3}>
      <main className="lesson-two-home">
        <section className="lesson-two-home-hero">
          <div className="lesson-two-home-intro">
            <span>AI+교과 융합 프로젝트 · 초등 3~4학년</span>
            <h1>AI와 함께 만드는 우리 옛이야기 그림책</h1>
            <p>
              내가 기획한 장면에 필요한 문자·이미지·소리 자료를 구분하고, 우리 장면의 데이터 꾸러미를 직접 만듭니다.
            </p>
            <dl>
              <div><dt>수업</dt><dd>총 10차시</dd></div>
              <div><dt>현재</dt><dd>3차시</dd></div>
              <div><dt>단계</dt><dd>EXPLORE</dd></div>
            </dl>
          </div>

          <div className="lesson-two-home-current">
            <span>LESSON 03</span>
            <strong>AI가 이해하는 데이터</strong>
            <p>글·사진·고정 음원만 사용해, 장면을 또렷하게 만드는 자료를 살펴봅니다.</p>
            <div>
              <Link to="/present/3">수업용 PPT</Link>
              <Link to="/lesson/3">학생용 웹앱</Link>
            </div>
            <small>학생은 긴 글 대신 분류하기·듣기·고르기로 참여합니다. 생성형 AI는 사용하지 않습니다.</small>
          </div>
        </section>

        <section className="lesson-two-launch section-wrap" aria-labelledby="ready-lessons-title">
          <header>
            <span>수업 바로가기</span>
            <h2 id="ready-lessons-title">완성된 차시를 선택하세요.</h2>
          </header>

          <div className="lesson-two-launch-list">
            <article>
              <span>01</span>
              <div><small>LOOK</small><h3>자동으로 움직이면 모두 AI일까?</h3><p>PPT와 종이 활동지를 기본으로 진행합니다.</p></div>
              <nav aria-label="1차시 실행">
                <Link to="/present/1">수업용 PPT</Link>
                <Link to="/lesson/1">학생 웹앱 · 선택</Link>
              </nav>
            </article>
            <article>
              <span>02</span>
              <div><small>LOOK</small><h3>우리가 만들 이야기 정하기</h3><p>사건 카드의 순서를 맞추고 여섯 장면의 인물·장소·느낌·모습을 직접 고릅니다.</p></div>
              <nav aria-label="2차시 실행">
                <Link to="/present/2">수업용 PPT</Link>
                <Link to="/lesson/2">학생용 웹앱</Link>
              </nav>
            </article>
            <article className="current">
              <span>03</span>
              <div><small>현재 수업 · EXPLORE</small><h3>AI가 이해하는 데이터</h3><p>문자·이미지·소리를 분류하고, 내가 고른 장면의 데이터 꾸러미를 완성합니다.</p></div>
              <nav aria-label="3차시 실행">
                <Link to="/present/3">수업용 PPT</Link>
                <Link to="/lesson/3">학생용 웹앱</Link>
              </nav>
            </article>
          </div>

          <p className="lesson-two-teacher-note">
            학생 활동지·수업지도안·교사용 답안은 <Link to="/teacher">교사 설정</Link>에서 확인합니다.
          </p>
        </section>

        <section className="lesson-roadmap section-wrap">
          <div className="section-heading">
            <span className="eyebrow">10차시 로드맵</span>
            <h2>한 차시씩 완성해 가는 그림책 프로젝트</h2>
            <p>1~3차시가 열려 있으며, 다음 차시는 순서대로 연결합니다.</p>
          </div>
          <div className="roadmap-list">
            {lessons.map(([number, title, description, phase], index) => (
              <article key={number} className={index < 3 ? 'roadmap-item active' : 'roadmap-item locked'}>
                <div className="lesson-number">{number.padStart(2, '0')}</div>
                <div className="lesson-info">
                  <span className={`phase-tag ${phase.toLowerCase()}`}>{phase}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                {index < 3 ? (
                  <Link className="lesson-link" to={`/present/${index + 1}`}>수업 PPT →</Link>
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

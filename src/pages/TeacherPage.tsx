import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { initialProgress, isTeacherAuthenticated, STORAGE_KEYS } from '../utils/storage';
import lessonPlanUrl from '../assets/teacher/03_1차시_교수학습과정안.docx?url';
import answerKeyUrl from '../assets/teacher/04_1차시_교사용답안.docx?url';

const downloads = [
  { type: 'PPTX', title: '1차시 수업 PPT', description: '15장 관찰·분류 수업 프레젠테이션', href: '/resources/lesson-01/01_1차시_수업PPT.pptx' },
  { type: 'DOCX', title: '학생 활동지', description: 'A4 1장 분류·근거 기록지', href: '/resources/lesson-01/02_1차시_학생활동지.docx' },
  { type: 'DOCX', title: '교수·학습 과정안', description: '학교 제출용 본시 지도안', href: lessonPlanUrl },
  { type: 'DOCX', title: '교사용 답안', description: '분류 답안·발문·지도 유의점', href: answerKeyUrl },
];

export default function TeacherPage() {
  const [authenticated, setAuthenticated] = useState(() => isTeacherAuthenticated());
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(''), 2200);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === '3035') {
      localStorage.setItem(STORAGE_KEYS.teacherAuth, 'true');
      setAuthenticated(true);
      setError('');
      return;
    }
    setError('비밀번호를 다시 확인해 주세요.');
  };

  const resetStudent = () => {
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(initialProgress));
    setSaved('현재 기기의 학생 웹 활동 기록을 초기화했습니다.');
  };

  if (!authenticated) {
    return (
      <AppShell>
        <main className="teacher-login-page">
          <form className="teacher-login-card" onSubmit={login}>
            <span className="lock-symbol">교사</span>
            <span className="eyebrow">TEACHER SETTING</span>
            <h1>교사 설정</h1>
            <p>수업자료와 1차시 운영 안내는 교사 비밀번호로 보호됩니다.</p>
            <label className="text-field">
              <span>비밀번호</span>
              <input type="password" inputMode="numeric" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="비밀번호 입력" aria-invalid={Boolean(error)} aria-describedby={error ? 'teacher-login-error' : undefined} autoFocus />
            </label>
            {error && <div className="form-error" id="teacher-login-error" role="alert">{error}</div>}
            <button className="button primary large" type="submit">교사 설정 입장</button>
          </form>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="teacher-dashboard section-wrap">
        <section className="teacher-heading">
          <div>
            <span className="eyebrow">AI와 함께 만드는 우리 옛이야기 그림책</span>
            <h1>1차시 교사 설정</h1>
            <p>자동으로 움직이면 모두 AI일까? · 창체+국어 · LOOK</p>
          </div>
          <button className="text-button" onClick={() => { localStorage.removeItem(STORAGE_KEYS.teacherAuth); setAuthenticated(false); }}>로그아웃</button>
        </section>

        {saved && <div className="save-toast" role="status">{saved}</div>}

        <section className="teacher-grid">
          <article className="teacher-panel live-panel">
            <div className="panel-heading"><div><span className="panel-index">01</span><h2>수업 실행</h2></div></div>
            <p>1차시는 수업용 PPT와 종이 활동지를 기본으로 진행합니다.</p>
            <div className="panel-actions primary-class-actions">
              <Link className="button primary" to="/present/1" target="_blank">수업 PPT 열기</Link>
              <Link className="button secondary" to="/teacher/resources/lesson-1/worksheet" target="_blank">학생 활동지 열기</Link>
            </div>
            <div className="optional-webapp-row">
              <div><strong>태블릿 웹 활동 · 선택</strong><small>같은 분류 활동을 기기에서 할 때만 사용합니다.</small></div>
              <Link className="text-link optional-preview-link" to="/lesson/1" target="_blank">웹앱 열기</Link>
            </div>
          </article>

          <article className="teacher-panel nongenerative-panel">
            <div className="panel-heading"><div><span className="panel-index">02</span><h2>관찰 중심 수업 기준</h2></div></div>
            <p>외부 서비스에 접속하거나 새 이미지·음악을 만드는 활동 없이, 미리 정한 사례의 작동 방식을 관찰하고 분류합니다.</p>
            <dl className="function-definition-list">
              <div><dt>추천</dt><dd>기록에서 비슷한 특징을 찾아 다음 것을 제안</dd></div>
              <div><dt>인식</dt><dd>말소리·얼굴의 특징을 찾아 무엇인지 확인</dd></div>
              <div><dt>분류</dt><dd>특징이 비슷한 자료를 알맞은 모둠으로 구분</dd></div>
              <div><dt>자동기계</dt><dd>정해진 조건이 맞으면 정해진 순서대로 작동</dd></div>
            </dl>
            <p className="source-note">수업 사진은 사용 허가가 확인된 실사 자료입니다.</p>
          </article>
        </section>

        <section className="resource-section">
          <div className="section-heading horizontal">
            <div><span className="eyebrow">수업자료</span><h2>학교 수업·제출용 1차시 자료</h2></div>
            <span className="font-note">S-Core Dream 기준</span>
          </div>
          <div className="resource-grid">
            {downloads.map((item) => (
              <a className="resource-card" href={item.href} key={item.title} download>
                <span>{item.type}</span><strong>{item.title}</strong><small>{item.description}</small><b>다운로드 ↓</b>
              </a>
            ))}
          </div>
          <div className="web-resource-links">
            <Link to="/teacher/resources/lesson-1/worksheet" target="_blank">활동지 웹 인쇄본</Link>
            <Link to="/teacher/resources/lesson-1/lesson-plan" target="_blank">지도안 웹 인쇄본</Link>
            <Link to="/teacher/resources/lesson-1/answer-key" target="_blank">교사용 답안 웹 인쇄본</Link>
            <Link to="/teacher/resources/lesson-1/prep" target="_blank">수업 준비 체크리스트</Link>
          </div>
        </section>

        <section className="teacher-grid bottom-grid">
          <article className="teacher-panel lesson-flow-panel">
            <div className="panel-heading"><div><span className="panel-index">03</span><h2>40분 수업 흐름</h2></div></div>
            <ol className="flow-list">
              <li><span>5분</span><strong>도입</strong><p>자동문과 영상 추천 장면 비교</p></li>
              <li><span>10분</span><strong>활동 1</strong><p>생활 속 장면을 AI와 자동기계로 구별</p></li>
              <li><span>15분</span><strong>활동 2</strong><p>추천·인식·분류 기능 연결</p></li>
              <li><span>7분</span><strong>활동 3</strong><p>조건·규칙과 데이터의 특징 비교</p></li>
              <li><span>3분</span><strong>정리</strong><p>근거 발표와 핵심 문장 완성</p></li>
            </ol>
          </article>
          <article className="teacher-panel caution-panel">
            <div className="panel-heading"><div><span className="panel-index">04</span><h2>운영 메모</h2></div></div>
            <ul className="teacher-notes">
              <li>제품 이름만 보고 판단하지 말고, 사례에 적힌 작동 설명을 근거로 분류하게 합니다.</li>
              <li>센서 자동문은 이 수업에서 ‘움직임 감지 → 문 열림’이라는 정해진 조건의 자동기계로 다룹니다.</li>
              <li>추천·인식·분류 결과가 언제나 맞는 것은 아니며, 사람이 결과를 확인해야 함을 설명합니다.</li>
              <li>외부 서비스에 학생 이름·사진·개인정보를 입력하지 않습니다.</li>
            </ul>
            <button className="button ghost" onClick={resetStudent}>현재 기기 웹 활동 기록 초기화</button>
          </article>
        </section>
      </main>
    </AppShell>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { initialLessonTwoProgress, initialProgress, isTeacherAuthenticated, STORAGE_KEYS } from '../utils/storage';

const rawResourceBase = 'https://raw.githubusercontent.com/themonsteredu/edu-story/main/public/resources';
const rawTeacherAssetBase = 'https://raw.githubusercontent.com/themonsteredu/edu-story/main/src/assets/teacher';

const lessonTwoDownloads = [
  { type: 'PPTX', title: '2차시 수업 PPT', description: '13장 학생 주도 6장면 기획 수업', href: `${rawResourceBase}/lesson-02/01_2차시_수업PPT.pptx` },
  { type: 'DOCX', title: '학생 활동지 3종', description: '이야기별 A4 한 장 · 사건 배열과 장면 기획', href: `${rawResourceBase}/lesson-02/02_2차시_학생활동지_3종.docx` },
  { type: 'DOCX', title: '교수·학습 과정안', description: '학교 제출용 40분 본시 지도안', href: `${rawResourceBase}/lesson-02/03_2차시_교수학습과정안.docx` },
  { type: 'DOCX', title: '교사용 답안', description: '이야기 3종 정답·발문·지도 유의점', href: `${rawResourceBase}/lesson-02/04_2차시_교사용답안.docx` },
  { type: 'DOCX', title: '고정 이야기 읽기 자료', description: '생성형 AI 없이 사용하는 이야기별 A4 읽기 자료', href: `${rawResourceBase}/lesson-02/05_2차시_고정이야기읽기자료.docx` },
];

const lessonOneDownloads = [
  { type: 'PPTX', title: '1차시 수업 PPT', description: '15장 관찰·분류 수업 프레젠테이션', href: `${rawResourceBase}/lesson-01/01_1차시_수업PPT.pptx` },
  { type: 'DOCX', title: '1차시 학생 활동지', description: 'A4 한 장 ○표·선택형 활동지', href: `${rawResourceBase}/lesson-01/02_1차시_학생활동지.docx` },
  { type: 'DOCX', title: '1차시 교수·학습 과정안', description: '학교 제출용 본시 지도안', href: `${rawTeacherAssetBase}/03_1차시_교수학습과정안.docx` },
  { type: 'DOCX', title: '1차시 교사용 답안', description: '분류 답안·발문·지도 유의점', href: `${rawTeacherAssetBase}/04_1차시_교사용답안.docx` },
];

export default function TeacherPage() {
  const [authenticated, setAuthenticated] = useState(() => isTeacherAuthenticated());
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(''), 2400);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === '3035') {
      try {
        localStorage.setItem(STORAGE_KEYS.teacherAuth, 'true');
      } catch {
        // The current session can still open even if device policy blocks storage.
      }
      setAuthenticated(true);
      setError('');
      return;
    }
    setError('비밀번호를 다시 확인해 주세요.');
  };

  const resetLesson = (lesson: 1 | 2) => {
    try {
      if (lesson === 1) {
        localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(initialProgress));
      } else {
        localStorage.setItem(STORAGE_KEYS.lessonTwoProgress, JSON.stringify({
          ...initialLessonTwoProgress,
          updatedAt: new Date().toISOString(),
        }));
      }
    } catch {
      setSaved('이 기기에서는 활동 기록 저장이 차단되어 있습니다.');
      return;
    }
    setSaved(`${lesson}차시의 현재 기기 학생 활동 기록을 초기화했습니다.`);
  };

  if (!authenticated) {
    return (
      <AppShell lessonNumber={2}>
        <main className="teacher-login-page">
          <form className="teacher-login-card" onSubmit={login}>
            <span className="lock-symbol">교사</span>
            <span className="eyebrow">TEACHER SETTING</span>
            <h1>교사 설정</h1>
            <p>1·2차시 수업자료와 운영 안내를 확인합니다.</p>
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
    <AppShell lessonNumber={2}>
      <main className="teacher-dashboard lesson-two-teacher-dashboard section-wrap">
        <section className="lesson-two-teacher-heading">
          <div>
            <span>AI와 함께 만드는 우리 옛이야기 그림책</span>
            <h1>교사 수업실</h1>
            <p>현재 완성된 1·2차시의 수업 실행과 제출 자료를 한곳에서 관리합니다.</p>
          </div>
          <button onClick={() => {
            try {
              localStorage.removeItem(STORAGE_KEYS.teacherAuth);
            } catch {
              // The visible session can still close when storage access is blocked.
            }
            setAuthenticated(false);
          }}>로그아웃</button>
        </section>

        {saved && <div className="save-toast" role="status">{saved}</div>}

        <section className="lesson-two-teacher-current">
          <div className="lesson-two-teacher-index"><span>현재 수업</span><strong>02</strong><small>LOOK</small></div>
          <div className="lesson-two-teacher-copy">
            <span>창체·국어 · 초등 3~4학년</span>
            <h2>우리가 만들 이야기 정하기</h2>
            <p>교사가 검토한 옛이야기의 사건 순서를 확인한 뒤, 학생이 여섯 장면의 인물·장소·느낌·그릴 모습을 직접 기획합니다.</p>
            <div>
              <Link to="/present/2" target="_blank">수업용 PPT 열기</Link>
              <Link to="/lesson/2" target="_blank">학생용 웹앱 열기</Link>
              <Link to="/teacher/resources/lesson-2/worksheet" target="_blank">활동지 인쇄본</Link>
            </div>
          </div>
          <aside>
            <strong>생성형 AI 미사용</strong>
            <p>외부 AI 서비스·프롬프트·생성 이미지를 사용하지 않습니다.</p>
            <button onClick={() => resetLesson(2)}>2차시 기록 초기화</button>
          </aside>
        </section>

        <section className="lesson-two-teacher-flow">
          <header><span>40분 수업 흐름</span><h2>읽기에서 학생의 그림책 기획까지</h2></header>
          <ol>
            <li><span>5분</span><strong>도입</strong><p>인물·사건·배경 떠올리기</p></li>
            <li><span>5분</span><strong>이야기 선택</strong><p>모둠이 만들 옛이야기 고르기</p></li>
            <li><span>5분</span><strong>인물·배경</strong><p>알맞은 낱말 선택하기</p></li>
            <li><span>10분</span><strong>사건 순서</strong><p>여섯 사건 카드 옮기기</p></li>
            <li><span>12분</span><strong>장면 기획</strong><p>인물·장소·느낌·모습 고르기</p></li>
            <li><span>3분</span><strong>정리</strong><p>내가 기획한 장면 소개하기</p></li>
          </ol>
        </section>

        <section className="lesson-two-teacher-resources">
          <header><div><span>2차시 수업자료</span><h2>학교 수업·제출용 파일</h2></div><small>S-Core Dream 기준</small></header>
          <div>
            {lessonTwoDownloads.map((item) => (
              <a href={item.href} key={item.title} download>
                <span>{item.type}</span><strong>{item.title}</strong><small>{item.description}</small><b>다운로드</b>
              </a>
            ))}
          </div>
          <nav aria-label="2차시 웹 인쇄 자료">
            <Link to="/teacher/resources/lesson-2/worksheet" target="_blank">활동지 3종 웹 인쇄본</Link>
            <Link to="/teacher/resources/lesson-2/lesson-plan" target="_blank">교수·학습 과정안 웹 인쇄본</Link>
            <Link to="/teacher/resources/lesson-2/answer-key" target="_blank">교사용 답안 웹 인쇄본</Link>
            <Link to="/teacher/resources/lesson-2/prep" target="_blank">수업 준비 체크리스트</Link>
            <Link to="/teacher/resources/lesson-2/reading" target="_blank">고정 이야기 웹 인쇄본</Link>
          </nav>
        </section>

        <section className="lesson-two-teacher-previous">
          <header><span>이전 수업</span><h2>1차시 · 자동으로 움직이면 모두 AI일까?</h2><p>PPT와 종이 활동지를 기본으로 진행하며 학생 웹앱은 선택 사항입니다.</p></header>
          <div>
            <Link to="/present/1" target="_blank">수업용 PPT</Link>
            <Link to="/lesson/1" target="_blank">학생 웹앱 · 선택</Link>
            <Link to="/teacher/resources/lesson-1/worksheet" target="_blank">활동지 웹 인쇄본</Link>
            <button onClick={() => resetLesson(1)}>1차시 기록 초기화</button>
          </div>
          <details>
            <summary>1차시 다운로드 파일</summary>
            <div>{lessonOneDownloads.map((item) => <a href={item.href} key={item.title} download><span>{item.type}</span><strong>{item.title}</strong><small>{item.description}</small></a>)}</div>
          </details>
        </section>
      </main>
    </AppShell>
  );
}

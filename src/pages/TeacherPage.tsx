import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import {
  initialLessonThreeProgress,
  initialLessonTwoProgress,
  initialProgress,
  isTeacherAuthenticated,
  STORAGE_KEYS,
} from '../utils/storage';

const rawResourceBase = 'https://raw.githubusercontent.com/themonsteredu/edu-story/main/public/resources';
const rawTeacherAssetBase = 'https://raw.githubusercontent.com/themonsteredu/edu-story/main/src/assets/teacher';

const lessonTwoDownloads = [
  { type: 'PPTX', title: '2차시 수업 PPT', description: '13장 학생 주도 6장면 기획 수업', href: `${rawResourceBase}/lesson-02/01_2차시_수업PPT.pptx` },
  { type: 'DOCX', title: '학생 활동지 3종', description: '이야기별 A4 한 장 · 사건 배열과 장면 기획', href: `${rawResourceBase}/lesson-02/02_2차시_학생활동지_3종.docx` },
  { type: 'DOCX', title: '교수·학습 과정안', description: '학교 제출용 40분 본시 지도안', href: `${rawResourceBase}/lesson-02/03_2차시_교수학습과정안.docx` },
  { type: 'DOCX', title: '교사용 답안', description: '이야기 3종 정답·발문·지도 유의점', href: `${rawResourceBase}/lesson-02/04_2차시_교사용답안.docx` },
  { type: 'DOCX', title: '고정 이야기 읽기 자료', description: '생성형 AI 없이 사용하는 이야기별 A4 읽기 자료', href: `${rawResourceBase}/lesson-02/05_2차시_고정이야기읽기자료.docx` },
];

const lessonThreeDownloads = [
  { type: 'PPTX', title: '3차시 수업 PPT', description: '13장 문자·이미지·소리 데이터 탐색 수업', href: `${rawResourceBase}/lesson-03/01_3차시_수업PPT.pptx` },
  { type: 'DOCX', title: '3차시 학생 활동지', description: 'A4 한 장 · 분류·비교·선택 중심', href: `${rawResourceBase}/lesson-03/02_3차시_학생활동지.docx` },
  { type: 'DOCX', title: '교수·학습 과정안', description: '학교 제출용 40분 본시 지도안', href: `${rawResourceBase}/lesson-03/03_3차시_교수학습과정안.docx` },
  { type: 'DOCX', title: '교사용 답안', description: '분류 답안·비교 발문·선택 지도 기준', href: `${rawResourceBase}/lesson-03/04_3차시_교사용답안.docx` },
  { type: 'DOCX', title: '수업용 데이터 카드', description: '오려 쓰는 문자·이미지·소리 카드', href: `${rawResourceBase}/lesson-03/05_3차시_데이터카드.docx` },
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

  const resetLesson = (lesson: 1 | 2 | 3) => {
    try {
      if (lesson === 1) {
        localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(initialProgress));
      } else if (lesson === 2) {
        localStorage.setItem(STORAGE_KEYS.lessonTwoProgress, JSON.stringify({
          ...initialLessonTwoProgress,
          updatedAt: new Date().toISOString(),
        }));
      } else {
        localStorage.setItem(STORAGE_KEYS.lessonThreeProgress, JSON.stringify({
          ...initialLessonThreeProgress,
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
      <AppShell lessonNumber={3}>
        <main className="teacher-login-page">
          <form className="teacher-login-card" onSubmit={login}>
            <span className="lock-symbol">교사</span>
            <span className="eyebrow">TEACHER SETTING</span>
            <h1>교사 설정</h1>
            <p>1~3차시 수업자료와 운영 안내를 확인합니다.</p>
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
    <AppShell lessonNumber={3}>
      <main className="teacher-dashboard lesson-two-teacher-dashboard section-wrap">
        <section className="lesson-two-teacher-heading">
          <div>
            <span>AI와 함께 만드는 우리 옛이야기 그림책</span>
            <h1>교사 수업실</h1>
            <p>현재 완성된 1~3차시의 수업 실행과 제출 자료를 한곳에서 관리합니다.</p>
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
          <div className="lesson-two-teacher-index"><span>현재 수업</span><strong>03</strong><small>EXPLORE</small></div>
          <div className="lesson-two-teacher-copy">
            <span>국어 · 초등 3~4학년</span>
            <h2>AI가 이해하는 데이터</h2>
            <p>학생이 문자·이미지·소리 자료를 직접 분류하고, 2차시에서 기획한 장면에 필요한 데이터 꾸러미를 만듭니다.</p>
            <div>
              <Link to="/present/3" target="_blank">수업용 PPT 열기</Link>
              <Link to="/lesson/3" target="_blank">학생용 웹앱 열기</Link>
              <Link to="/teacher/resources/lesson-3/worksheet" target="_blank">활동지 인쇄본</Link>
            </div>
          </div>
          <aside>
            <strong>생성형 AI 미사용</strong>
            <p>실사 사진·고정 음원·학생 선택만 사용합니다. 외부 가입이나 생성 기능이 없습니다.</p>
            <button onClick={() => resetLesson(3)}>3차시 기록 초기화</button>
          </aside>
        </section>

        <section className="lesson-two-teacher-flow">
          <header><span>40분 수업 흐름</span><h2>데이터 분류에서 우리 장면 꾸러미까지</h2></header>
          <ol>
            <li><span>5분</span><strong>도입</strong><p>데이터 뜻과 세 종류 만나기</p></li>
            <li><span>10분</span><strong>분류</strong><p>문자·이미지·소리 카드 나누기</p></li>
            <li><span>10분</span><strong>비교</strong><p>같은 장면의 두 자료 묶음 살피기</p></li>
            <li><span>12분</span><strong>꾸러미</strong><p>내 장면의 세 데이터 고르기</p></li>
            <li><span>3분</span><strong>정리</strong><p>선택한 자료와 느낌 말하기</p></li>
          </ol>
        </section>

        <section className="lesson-two-teacher-resources">
          <header><div><span>3차시 수업자료</span><h2>학교 수업·제출용 파일</h2></div><small>S-Core Dream 기준</small></header>
          <div>
            {lessonThreeDownloads.map((item) => (
              <a href={item.href} key={item.title} download>
                <span>{item.type}</span><strong>{item.title}</strong><small>{item.description}</small><b>다운로드</b>
              </a>
            ))}
          </div>
          <nav aria-label="3차시 웹 인쇄 자료">
            <Link to="/teacher/resources/lesson-3/worksheet" target="_blank">학생 활동지 웹 인쇄본</Link>
            <Link to="/teacher/resources/lesson-3/lesson-plan" target="_blank">교수·학습 과정안 웹 인쇄본</Link>
            <Link to="/teacher/resources/lesson-3/answer-key" target="_blank">교사용 답안 웹 인쇄본</Link>
            <Link to="/teacher/resources/lesson-3/prep" target="_blank">수업 준비 체크리스트</Link>
            <Link to="/teacher/resources/lesson-3/data-cards" target="_blank">수업용 데이터 카드</Link>
          </nav>
        </section>

        <section className="lesson-two-teacher-previous">
          <header><span>이전 수업</span><h2>2차시 · 우리가 만들 이야기 정하기</h2><p>여섯 사건의 순서를 확인하고 학생이 장면의 인물·장소·느낌·모습을 직접 기획합니다.</p></header>
          <div>
            <Link to="/present/2" target="_blank">수업용 PPT</Link>
            <Link to="/lesson/2" target="_blank">학생용 웹앱</Link>
            <Link to="/teacher/resources/lesson-2/worksheet" target="_blank">활동지 웹 인쇄본</Link>
            <button onClick={() => resetLesson(2)}>2차시 기록 초기화</button>
          </div>
          <details>
            <summary>2차시 다운로드 파일</summary>
            <div>{lessonTwoDownloads.map((item) => <a href={item.href} key={item.title} download><span>{item.type}</span><strong>{item.title}</strong><small>{item.description}</small></a>)}</div>
          </details>
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

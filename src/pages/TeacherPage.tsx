import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import RainyAlleyIllustration from '../components/RainyAlleyIllustration';
import { initialProgress, isLessonOpen, isTeacherAuthenticated, STORAGE_KEYS } from '../utils/storage';
import lessonPlanUrl from '../assets/teacher/03_1차시_교수학습과정안.docx?url';
import answerKeyUrl from '../assets/teacher/04_1차시_교사용답안.docx?url';

const downloads = [
  {
    type: 'PPTX',
    title: '1차시 수업 PPT',
    description: '15장 수업용 프레젠테이션',
    href: '/resources/lesson-01/01_1차시_수업PPT.pptx',
  },
  {
    type: 'DOCX',
    title: '학생 활동지',
    description: 'A4 1장 학교 수업용 양식',
    href: '/resources/lesson-01/02_1차시_학생활동지.docx',
  },
  {
    type: 'DOCX',
    title: '교수·학습 과정안',
    description: '학교 제출용 본시 지도안',
    href: lessonPlanUrl,
  },
  {
    type: 'DOCX',
    title: '교사용 답안',
    description: '예상 답안·발문·지도 유의점',
    href: answerKeyUrl,
  },
];

export default function TeacherPage() {
  const [authenticated, setAuthenticated] = useState(() => isTeacherAuthenticated());
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(() => isLessonOpen());
  const [toolUrl, setToolUrl] = useState(() => localStorage.getItem(STORAGE_KEYS.toolUrl) || 'https://chatgpt.com/');
  const [demoImage, setDemoImage] = useState(() => localStorage.getItem(STORAGE_KEYS.demoImage) || '');
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

  const setLessonState = (next: boolean) => {
    setOpen(next);
    localStorage.setItem(STORAGE_KEYS.lessonOpen, String(next));
    setSaved(next ? '학생 활동을 열었습니다.' : '학생 활동을 닫았습니다.');
  };

  const saveToolUrl = () => {
    localStorage.setItem(STORAGE_KEYS.toolUrl, toolUrl.trim());
    setSaved('외부 도구 주소를 저장했습니다.');
  };

  const uploadImage = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setSaved('이미지 파일만 등록할 수 있습니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result || '');
      localStorage.setItem(STORAGE_KEYS.demoImage, value);
      setDemoImage(value);
      setSaved('AI 시연 이미지를 등록했습니다.');
    };
    reader.readAsDataURL(file);
  };

  const resetImage = () => {
    localStorage.removeItem(STORAGE_KEYS.demoImage);
    setDemoImage('');
    setSaved('기본 비교 이미지로 되돌렸습니다.');
  };

  const resetStudent = () => {
    localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(initialProgress));
    setSaved('현재 기기의 학생 활동 기록을 초기화했습니다.');
  };

  if (!authenticated) {
    return (
      <AppShell>
        <main className="teacher-login-page">
          <form className="teacher-login-card" onSubmit={login}>
            <span className="lock-symbol">교사</span>
            <span className="eyebrow">TEACHER SETTING</span>
            <h1>교사 설정</h1>
            <p>수업자료와 1차시 운영 설정은 교사 비밀번호로 보호됩니다.</p>
            <label className="text-field">
              <span>비밀번호</span>
              <input
                type="password"
                inputMode="numeric"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호 입력"
                autoFocus
              />
            </label>
            {error && <div className="form-error">{error}</div>}
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
            <p>사람과 AI, 누가 더 잘 볼까? · 창체+국어 · LOOK</p>
          </div>
          <button
            className="text-button"
            onClick={() => {
              localStorage.removeItem(STORAGE_KEYS.teacherAuth);
              setAuthenticated(false);
            }}
          >
            로그아웃
          </button>
        </section>

        {saved && <div className="save-toast" role="status">{saved}</div>}

        <section className="teacher-grid">
          <article className="teacher-panel live-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-index">01</span>
                <h2>수업 실행</h2>
              </div>
              <span className={open ? 'status open' : 'status closed'}>{open ? '활동 열림' : '활동 닫힘'}</span>
            </div>
            <p>학생 활동 공개 상태를 정하고 수업 화면과 발표 화면을 실행합니다.</p>
            <div className="toggle-row">
              <div><strong>학생 활동 공개</strong><small>현재 기기의 학생 화면에 적용됩니다.</small></div>
              <button
                type="button"
                className={open ? 'toggle on' : 'toggle'}
                aria-pressed={open}
                aria-label={`학생 활동 공개 ${open ? '끄기' : '켜기'}`}
                onClick={() => setLessonState(!open)}
              >
                <span />
              </button>
            </div>
            <div className="panel-actions">
              <Link className="button primary" to="/present/1" target="_blank">수업 PPT 열기</Link>
              <Link className="button secondary" to="/lesson/1" target="_blank">학생 화면 미리보기</Link>
            </div>
          </article>

          <article className="teacher-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-index">02</span>
                <h2>AI 이미지 교사 시연</h2>
              </div>
            </div>
            <p>같은 문장을 외부 AI 이미지 생성 도구에 넣고 결과 이미지를 학생 비교 화면에 등록합니다.</p>
            <blockquote className="teacher-prompt">비 오는 날, 빨간 우산을 쓴 아이가 골목길을 걷고 있습니다.</blockquote>
            <label className="text-field compact-field">
              <span>외부 도구 주소</span>
              <input value={toolUrl} onChange={(event) => setToolUrl(event.target.value)} />
            </label>
            <div className="panel-actions">
              <button className="button secondary" onClick={saveToolUrl}>주소 저장</button>
              <a className="button primary" href={toolUrl || 'https://chatgpt.com/'} target="_blank" rel="noreferrer">외부 도구 열기</a>
            </div>
            <div className="image-register">
              <div className="registered-image">
                {demoImage ? <img src={demoImage} alt="등록된 AI 시연 이미지" /> : <RainyAlleyIllustration compact />}
              </div>
              <div>
                <strong>결과 이미지 등록</strong>
                <p>AI에서 만든 이미지를 내려받은 뒤 이곳에 올리세요.</p>
                <label className="button ghost upload-button">
                  이미지 선택
                  <input type="file" accept="image/*" onChange={(event) => uploadImage(event.target.files?.[0])} />
                </label>
                {demoImage && <button className="text-button danger" onClick={resetImage}>기본 이미지로 되돌리기</button>}
              </div>
            </div>
          </article>
        </section>

        <section className="resource-section">
          <div className="section-heading horizontal">
            <div>
              <span className="eyebrow">수업자료</span>
              <h2>학교 수업·제출용 1차시 자료</h2>
            </div>
            <span className="font-note">S-Core Dream 기준</span>
          </div>
          <div className="resource-grid">
            {downloads.map((item) => (
              <a className="resource-card" href={item.href} key={item.title} download>
                <span>{item.type}</span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
                <b>다운로드 ↓</b>
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
            <div className="panel-heading">
              <div><span className="panel-index">03</span><h2>40분 수업 흐름</h2></div>
            </div>
            <ol className="flow-list">
              <li><span>5분</span><strong>도입</strong><p>생활 속 AI 경험과 핵심 질문</p></li>
              <li><span>10분</span><strong>활동 1</strong><p>생활 속 AI 장면 찾기</p></li>
              <li><span>15분</span><strong>활동 2</strong><p>같은 문장으로 사람의 상상과 AI 이미지 비교</p></li>
              <li><span>7분</span><strong>활동 3</strong><p>같은 점·다른 점과 이해 방식 정리</p></li>
              <li><span>3분</span><strong>정리</strong><p>사람은 경험, AI는 데이터</p></li>
            </ol>
          </article>
          <article className="teacher-panel caution-panel">
            <div className="panel-heading">
              <div><span className="panel-index">04</span><h2>운영 메모</h2></div>
            </div>
            <ul className="teacher-notes">
              <li>AI 그림을 잘 그렸는지 평가하지 말고, 관찰한 차이를 근거로 말하게 합니다.</li>
              <li>학생의 상상에는 정답이 없으며, 같은 문장도 경험에 따라 다르게 떠올릴 수 있음을 강조합니다.</li>
              <li>외부 AI 도구 사용은 교사가 시연하고, 개인 정보가 들어간 문장이나 사진을 입력하지 않습니다.</li>
              <li>현재 버전의 활동 기록과 교사 설정은 브라우저 기기별 저장입니다. 다기기 실시간 제어는 후속 연결 항목입니다.</li>
            </ul>
            <button className="button ghost" onClick={resetStudent}>현재 기기 학생 기록 초기화</button>
          </article>
        </section>
      </main>
    </AppShell>
  );
}

import PrintToolbar from '../../components/PrintToolbar';

const sections = [
  ['수업 전날', ['교사용 PPT와 웹앱 화면 확인', '교사 설정 비밀번호 3035 접속 확인', '외부 AI 이미지 생성 도구 로그인 상태 확인', '제시 문장으로 AI 이미지 1장 사전 생성', '학생 수만큼 A4 활동지 인쇄']],
  ['수업 10분 전', ['빔프로젝터·전자칠판 화면 비율 확인', '발표 화면 /present/1 전체화면 준비', '교사 설정에서 AI 시연 이미지 등록', '학생 활동 공개 상태 ON', '태블릿 또는 컴퓨터의 학생 주소 접속 확인']],
  ['수업 중', ['학생이 먼저 상상한 뒤 AI 그림 공개', '그림의 우열이 아닌 같은 점·다른 점 관찰', '외부 AI 도구는 교사가 시연', '개인정보·학생 사진 입력 금지', '정리 문장: 사람은 경험, AI는 데이터']],
  ['수업 후', ['학생 활동지 회수 또는 결과 인쇄', '현재 기기 학생 기록 초기화', '학생 반응과 어려웠던 낱말 기록', '2차시 옛이야기 자료 준비']],
];

export default function PrepChecklistPage() {
  return (
    <main className="print-page-wrap">
      <PrintToolbar title="1차시 수업 준비 체크리스트" />
      <article className="print-sheet prep-sheet">
        <header className="official-header"><span>교사용 운영 자료</span><h1>1차시 수업 준비 체크리스트</h1><p>사람과 AI, 누가 더 잘 볼까? · 40분 수업</p></header>
        <div className="checklist-grid">
          {sections.map(([title, items]) => (
            <section key={title as string}>
              <h2>{title as string}</h2>
              {(items as string[]).map((item) => <p key={item}><span>□</span>{item}</p>)}
            </section>
          ))}
        </div>
        <section className="board-note"><h2>판서 핵심</h2><div><span>사람</span><strong>경험 + 기억</strong><b>↔</b><span>AI</span><strong>학습한 데이터</strong></div></section>
        <section className="memo-lines"><h2>수업 후 메모</h2><span /><span /><span /></section>
        <footer className="sheet-footer"><span>교사 설정 비밀번호 3035</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

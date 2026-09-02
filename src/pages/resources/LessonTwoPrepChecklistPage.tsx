import PrintToolbar from '../../components/PrintToolbar';

const sections = [
  ['수업 전날', ['세 가지 이야기 중 수업에 사용할 범위 정하기', '이야기 읽기 자료와 사건 순서 확인', '교사용 PPT와 학생 웹앱 열어 보기', '태블릿 미사용 시 선택한 이야기 활동지 인쇄']],
  ['수업 10분 전', ['화면 공유와 전체화면 확인', '학생 기기에서 /lesson/2 접속 확인', '모둠별 기기 또는 활동지 배부', '교사 설정 비밀번호 3035 확인']],
  ['수업 중', ['선택한 고정 이야기를 먼저 함께 읽기', '인물·배경은 낱말 선택으로 확인', '사건 순서만 정답 확인하기', '각 장면의 인물·장소·느낌·그릴 모습은 학생이 직접 선택하기']],
  ['수업 후', ['학생이 기획한 여섯 장면 함께 보기', '서로 다르게 고른 장면 이야기하기', '다음 차시 데이터 활동과 연결', '공용 기기라면 2차시 기록 초기화']],
];

export default function LessonTwoPrepChecklistPage() {
  return (
    <main className="print-page-wrap lesson-two-print-wrap">
      <PrintToolbar title="2차시 수업 준비 체크리스트" />
      <article className="print-sheet prep-sheet lesson-two-prep-sheet">
        <header className="official-header"><span>교사용 운영 자료</span><h1>2차시 수업 준비 체크리스트</h1><p>우리가 만들 이야기 정하기 · 40분 수업</p></header>
        <div className="checklist-grid">
          {sections.map(([title, items]) => (
            <section key={title as string}><h2>{title as string}</h2>{(items as string[]).map((item) => <p key={item}><span>□</span>{item}</p>)}</section>
          ))}
        </div>
        <section className="lesson-two-board-note"><h2>판서 핵심</h2><div><span>사건 순서</span><strong>→</strong><span>학생 선택</span><strong>→</strong><b>나의 여섯 장면</b></div></section>
        <section className="teacher-caution"><h2>생성형 AI 미사용</h2><p>교사가 검토한 고정 이야기와 사건 카드만 사용합니다. 사건 순서 외의 장면 기획에는 하나의 정답을 두지 않습니다.</p></section>
        <section className="memo-lines"><h2>수업 후 메모</h2><span /><span /><span /></section>
        <footer className="sheet-footer"><span>교사 설정에서 2차시 수업자료 확인</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

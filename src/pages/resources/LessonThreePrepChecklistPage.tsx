import PrintToolbar from '../../components/PrintToolbar';

const sections = [
  ['수업 전날', ['2차시에서 학생이 만든 장면 기획 결과 확인', '실제 사진이 포함된 데이터 카드 인쇄 및 오리기', '교사용 PPT와 3차시 학생 웹앱 열어 보기', '생성형 AI 링크와 기능이 수업 화면에 없는지 확인']],
  ['수업 10분 전', ['① 빗소리·② 새소리·③ 천둥소리·④ 바람소리 WAV 재생 테스트', '학생 기기에서 /lesson/3 접속 확인', '모둠별 데이터 카드 또는 활동지 배부', '교사 설정 비밀번호 3035 확인']],
  ['수업 중', ['실제 자료를 “읽어요·보여요·들려요”로 먼저 구분하기', 'A와 B 꾸러미에서 사건은 같음을 확인하기', '데이터가 바뀌면 느낌도 달라짐을 말로 나누기', '주인공·장소·시간·표정·빛·소리를 학생이 직접 고르게 하기']],
  ['수업 후', ['학생이 고른 한 장면 계획 또는 활동지 모으기', '여섯 항목을 학생이 스스로 골랐는지 확인', '4차시 장면 데이터 표 활동과 연결할 자료 정리', '공용 기기라면 3차시 기록 초기화']],
];

export default function LessonThreePrepChecklistPage() {
  return (
    <main className="print-page-wrap lesson-two-print-wrap">
      <PrintToolbar title="3차시 수업 준비 체크리스트" />
      <article className="print-sheet prep-sheet lesson-two-prep-sheet">
        <header className="official-header"><span>교사용 운영 자료</span><h1>3차시 수업 준비 체크리스트</h1><p>AI가 이해하는 데이터 · 40분 수업</p></header>
        <div className="checklist-grid">
          {sections.map(([title, items]) => (
            <section key={title as string}><h2>{title as string}</h2>{(items as string[]).map((item) => <p key={item}><span>□</span>{item}</p>)}</section>
          ))}
        </div>
        <section className="lesson-two-board-note"><h2>판서 핵심</h2><div><span>문자</span><strong>·</strong><span>이미지</span><strong>·</strong><span>소리</span><strong>→</strong><b>장면의 느낌</b></div></section>
        <section className="teacher-caution"><h2>생성형 AI 미사용</h2><p>이 차시는 준비된 문장·실사 사진·고정 WAV를 분류하고, 자기 이야기 장면에 필요한 항목을 고르는 수업입니다. 새로운 이미지나 음악을 생성하지 않습니다.</p></section>
        <section className="memo-lines"><h2>수업 후 메모</h2><span /><span /><span /></section>
        <footer className="sheet-footer"><span>교사 설정에서 3차시 수업자료 확인</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

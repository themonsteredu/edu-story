import PrintToolbar from '../../components/PrintToolbar';

const sections = [
  ['수업 전날', ['교사용 PPT 화면과 순서 확인', '교사 설정 로그인 확인', '학생 수만큼 A4 활동지 인쇄', '8개 사례표의 정답과 근거 확인', '추천·인식·분류의 쉬운 설명 준비']],
  ['수업 10분 전', ['빔프로젝터·전자칠판 화면 비율 확인', '발표 화면 /present/1 전체화면 준비', '학생 활동지와 필기구 배부 준비', '판서 영역을 AI와 자동 기계로 나누기', '기본 운영은 PPT와 종이 활동지로 진행']],
  ['수업 중', ['활동지 사례표를 PPT와 같은 순서로 진행', '추천·인식·분류 사례에서 데이터의 특징 찾기', '알람·센서 자동문의 정해진 조건과 비교하기', '쓰게 하기보다 ○표한 까닭을 말하게 하기', '핵심 낱말: 정해진 조건과 데이터']],
  ['수업 후', ['학생 활동지 회수', '학생이 헷갈린 장면과 근거 기록', '추천·인식·분류 이해 정도 확인', '다음 수업에서 보완할 설명 메모', '2차시 옛이야기 자료 준비']],
];

export default function PrepChecklistPage() {
  return (
    <main className="print-page-wrap">
      <PrintToolbar title="1차시 수업 준비 체크리스트" />
      <article className="print-sheet prep-sheet">
        <header className="official-header"><span>교사용 운영 자료</span><h1>1차시 수업 준비 체크리스트</h1><p>자동으로 움직이면 모두 AI일까? · 40분 수업</p></header>
        <div className="checklist-grid">
          {sections.map(([title, items]) => (
            <section key={title as string}>
              <h2>{title as string}</h2>
              {(items as string[]).map((item) => <p key={item}><span>□</span>{item}</p>)}
            </section>
          ))}
        </div>
        <section className="board-note"><h2>판서 핵심</h2><div><span>자동 기계</span><strong>정해진 조건 + 규칙</strong><b>↔</b><span>AI</span><strong>데이터의 특징 → 추천·인식·분류</strong></div></section>
        <section className="memo-lines"><h2>수업 후 메모</h2><span /><span /><span /></section>
        <footer className="sheet-footer"><span>교사 설정에서 수업자료 확인</span><span>더몬스터학원 · EDU STORY</span></footer>
      </article>
    </main>
  );
}

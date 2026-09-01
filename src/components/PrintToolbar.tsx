import { Link } from 'react-router-dom';

export default function PrintToolbar({ title }: { title: string }) {
  return (
    <div className="print-toolbar no-print">
      <div>
        <span className="eyebrow">교사용 수업자료</span>
        <strong>{title}</strong>
      </div>
      <div className="toolbar-actions">
        <button type="button" className="button secondary" onClick={() => window.print()}>
          인쇄·PDF 저장
        </button>
        <Link className="button ghost" to="/teacher">교사 설정으로</Link>
      </div>
    </div>
  );
}

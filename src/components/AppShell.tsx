import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: ReactNode;
  compact?: boolean;
  lessonNumber?: 1 | 2;
};

export default function AppShell({ children, compact = false, lessonNumber = 2 }: Props) {
  const shellClassName = [
    'app-shell',
    compact ? 'compact-shell' : '',
    lessonNumber === 2 ? 'lesson-two-shell' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={shellClassName}>
      <header className="site-header no-print">
        <Link to="/" className="brand" aria-label="홈으로 이동">
          <span className="brand-mark">{String(lessonNumber).padStart(2, '0')}</span>
          <span>
            <strong>우리 옛이야기 그림책</strong>
            <small>AI+교과 융합 수업</small>
          </span>
        </Link>
        <nav aria-label="주요 메뉴">
          <Link to={`/present/${lessonNumber}`}>수업용 PPT</Link>
          <Link to={`/lesson/${lessonNumber}`}>학생용 웹앱</Link>
          <Link to="/teacher">교사 설정</Link>
        </nav>
      </header>
      {children}
      <footer className="site-footer no-print">
        <span>AI와 함께 만드는 우리 옛이야기 그림책</span>
        <span>초등 3~4학년 · 총 10차시</span>
      </footer>
    </div>
  );
}

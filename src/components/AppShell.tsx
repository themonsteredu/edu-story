import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: ReactNode;
  compact?: boolean;
};

export default function AppShell({ children, compact = false }: Props) {
  return (
    <div className={compact ? 'app-shell compact-shell' : 'app-shell'}>
      <header className="site-header no-print">
        <Link to="/" className="brand" aria-label="홈으로 이동">
          <span className="brand-mark">책</span>
          <span>
            <strong>EDU STORY</strong>
            <small>AI+교과 융합수업</small>
          </span>
        </Link>
        <nav aria-label="주요 메뉴">
          <Link to="/lesson/1">1차시 학생활동</Link>
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

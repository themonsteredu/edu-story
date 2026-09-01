import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import RainyAlleyIllustration from '../components/RainyAlleyIllustration';
import { aiScenes, lessonOneSlides } from '../data/lesson1';

function SlideVisual({ visual }: { visual: (typeof lessonOneSlides)[number]['visual'] }) {
  if (visual === 'cover') {
    return <div className="slide-book"><span>상상</span><span>문장</span><span>AI</span></div>;
  }
  if (visual === 'question') {
    return <div className="giant-question">?</div>;
  }
  if (visual === 'memory') {
    return <div className="memory-clouds"><span>영상 추천</span><span>음성 비서</span><span>얼굴 인식</span><span>번역</span></div>;
  }
  if (visual === 'ai-scenes' || visual === 'activity') {
    return (
      <div className="slide-scene-grid">
        {aiScenes.map((scene) => <span key={scene.id}><b>{scene.icon}</b>{scene.title}</span>)}
      </div>
    );
  }
  if (visual === 'prompt') {
    return <blockquote className="slide-prompt">비 오는 날, 빨간 우산을 쓴 아이가 골목길을 걷고 있습니다.</blockquote>;
  }
  if (visual === 'imagination') {
    return <div className="imagination-map"><span>표정</span><span>시간</span><span>분위기</span><span>비</span><strong>나의 경험</strong></div>;
  }
  if (visual === 'teacher-demo') {
    return <div className="tool-demo"><span>같은 문장</span><strong>AI 이미지 생성 도구</strong><span>결과 관찰</span></div>;
  }
  if (visual === 'compare') {
    return <div className="slide-compare"><div><span>사람</span><strong>내 상상</strong></div><div><RainyAlleyIllustration compact /></div></div>;
  }
  if (visual === 'same-different') {
    return <div className="venn"><span>같은 점</span><span>다른 점</span></div>;
  }
  if (visual === 'why') {
    return <div className="why-flow"><span>같은 문장</span><b>→</b><span>서로 다른 바탕</span><b>→</b><span>서로 다른 결과</span></div>;
  }
  if (visual === 'human') {
    return <div className="concept-visual human-visual"><span>경험</span><span>기억</span><span>느낌</span><strong>사람의 상상</strong></div>;
  }
  if (visual === 'ai') {
    return <div className="concept-visual ai-visual"><span>문자</span><span>이미지</span><span>패턴</span><strong>AI의 결과</strong></div>;
  }
  return <div className="summary-stamp">LOOK<br /><small>보고 · 비교하고 · 설명하기</small></div>;
}

export default function PresentationPage() {
  const [index, setIndex] = useState(0);
  const slide = lessonOneSlides[index];
  const progress = useMemo(() => ((index + 1) / lessonOneSlides.length) * 100, [index]);

  const move = (delta: number) => {
    setIndex((current) => Math.min(lessonOneSlides.length - 1, Math.max(0, current + delta)));
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) move(1);
      if (['ArrowLeft', 'PageUp'].includes(event.key)) move(-1);
      if (event.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.();
      if (event.key === 'Escape' && document.fullscreenElement) document.exitFullscreen?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main className="presentation-page">
      <div className="presentation-progress" style={{ width: `${progress}%` }} />
      <header className="presentation-header no-print">
        <Link to="/teacher">교사 설정</Link>
        <span>← → 이동 · F 전체화면</span>
        <strong>{index + 1} / {lessonOneSlides.length}</strong>
      </header>
      <section className={`web-slide visual-${slide.visual}`}>
        <div className="slide-copy">
          <span className="slide-kicker">{slide.kicker}</span>
          <h1>{slide.title}</h1>
          {slide.subtitle && <p>{slide.subtitle}</p>}
          {slide.bullets && (
            <ul>{slide.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          )}
          {index === 4 && <Link className="button primary slide-launch" to="/lesson/1" target="_blank">학생 활동 열기</Link>}
          {index === 8 && <Link className="button secondary slide-launch" to="/teacher" target="_blank">AI 시연 도구 열기</Link>}
        </div>
        <div className="slide-visual"><SlideVisual visual={slide.visual} /></div>
      </section>
      <div className="presentation-controls no-print">
        <button onClick={() => move(-1)} disabled={index === 0}>← 이전</button>
        <button onClick={() => move(1)} disabled={index === lessonOneSlides.length - 1}>다음 →</button>
      </div>
    </main>
  );
}

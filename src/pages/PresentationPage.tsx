import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { aiScenes, lessonOneSlides } from '../data/lesson1';

function SlideVisual({ visual }: { visual: (typeof lessonOneSlides)[number]['visual'] }) {
  if (visual === 'cover') {
    return (
      <figure className="presentation-cover-art">
        <img src="/assets/lesson-01/cover-human-ai.png" alt="한 문장을 읽고 상상한 장면과 AI 결과를 비교하는 학생" />
        <figcaption>사람의 상상 × AI의 결과</figcaption>
      </figure>
    );
  }
  if (visual === 'question') {
    return <div className="question-board"><span>사람</span><b>?</b><span>AI</span><small>같은 문장 · 다른 바탕</small></div>;
  }
  if (visual === 'memory') {
    return <div className="memory-list"><span><b>01</b>추천</span><span><b>02</b>음성</span><span><b>03</b>인식</span><span><b>04</b>번역</span></div>;
  }
  if (visual === 'ai-scenes' || visual === 'activity') {
    return (
      <div className="slide-scene-grid">
        {aiScenes.map((scene) => <span key={scene.id}><b>{scene.icon}</b>{scene.title}</span>)}
      </div>
    );
  }
  if (visual === 'prompt') {
    return <figure className="prompt-picture"><img src="/assets/lesson-01/rainy-alley.png" alt="비 오는 골목길에서 빨간 우산을 쓴 아이" /><figcaption>그림에 있지만 문장에는 없는 것은?</figcaption></figure>;
  }
  if (visual === 'imagination') {
    return <div className="imagination-sheet"><strong>내가 떠올린 장면</strong><span>표정</span><span>시간</span><span>분위기</span><span>비의 모습</span><small>그림이나 메모로 표현해 봅시다.</small></div>;
  }
  if (visual === 'teacher-demo') {
    return <div className="tool-demo"><span>같은 문장</span><strong>AI 이미지 생성 도구</strong><span>결과 관찰</span></div>;
  }
  if (visual === 'compare') {
    return <div className="slide-compare"><div className="student-sketch"><span>사람</span><strong>내 상상</strong><i /></div><figure><img src="/assets/lesson-01/rainy-alley.png" alt="교사가 실제 AI 결과로 교체할 비교용 예시" /><figcaption>AI 결과 예시 · 수업 전 교체</figcaption></figure></div>;
  }
  if (visual === 'same-different') {
    return <div className="observation-chart"><section><strong>같았던 점</strong><span>두 그림에 모두 보이는 것은?</span></section><section><strong>달랐던 점</strong><span>표정·시간·분위기는?</span></section><small>“그림의 ○○ 부분을 보면…”</small></div>;
  }
  if (visual === 'why') {
    return <div className="why-flow"><span>같은 문장</span><b>→</b><span>서로 다른 바탕</span><b>→</b><span>서로 다른 결과</span></div>;
  }
  if (visual === 'human') {
    return <div className="concept-notes human-notes"><span><b>경험</b>예전에 본 골목</span><span><b>기억</b>우산을 썼던 날</span><span><b>느낌</b>비 오는 날의 마음</span></div>;
  }
  if (visual === 'ai') {
    return <div className="concept-notes ai-notes"><span><b>자료</b>많은 문장과 이미지</span><span><b>특징</b>비슷한 관계 찾기</span><span><b>결과</b>새 장면 만들기</span></div>;
  }
  return <div className="summary-board"><strong>오늘의 한 문장</strong><span>사람은 경험으로,</span><span>AI는 데이터로 이해합니다.</span><small>보고 · 비교하고 · 근거로 설명하기</small></div>;
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
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, select, [contenteditable="true"]')) return;
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

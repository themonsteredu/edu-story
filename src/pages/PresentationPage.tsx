import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { aiScenes, functionCases, lessonOneSlides } from '../data/lesson1';

function PhotoPair({
  left,
  leftLabel,
  right,
  rightLabel,
}: {
  left: string;
  leftLabel: string;
  right: string;
  rightLabel: string;
}) {
  return (
    <div className="editorial-compare">
      <figure><img src={left} alt="" /><figcaption>{leftLabel}</figcaption></figure>
      <figure><img src={right} alt="" /><figcaption>{rightLabel}</figcaption></figure>
    </div>
  );
}

function SlideVisual({ visual }: { visual: (typeof lessonOneSlides)[number]['visual'] }) {
  if (visual === 'cover') {
    return (
      <figure className="presentation-cover-art">
        <img src="/assets/lesson-01/classroom-real.webp" alt="교실에서 종이 활동을 하는 학생들의 실제 사진" />
        <figcaption>관찰 기록 01 · 겉모습보다 작동 방식을 봅니다.</figcaption>
      </figure>
    );
  }
  if (visual === 'question') {
    return (
      <div className="editorial-question">
        <span>데이터에서 특징 찾기</span>
        <strong>AI일까?</strong>
        <span>정해진 조건대로 움직이기</span>
        <small>자동으로 움직인다는 사실만으로는 구별할 수 없습니다.</small>
      </div>
    );
  }
  if (visual === 'observation') {
    return (
      <div className="record-sheet">
        <span><b>01</b>AI 기능 찾기</span>
        <span><b>02</b>자동기계의 규칙 찾기</span>
        <span><b>03</b>근거로 설명하기</span>
        <small>추천 · 인식 · 분류 · 조건 · 순서</small>
      </div>
    );
  }
  if (visual === 'ai-scenes') {
    return (
      <div className="presentation-scene-contact">
        {aiScenes.map((scene) => (
          <figure key={scene.id}><img src={scene.image} alt="" /><figcaption>{scene.icon} · {scene.title}</figcaption></figure>
        ))}
      </div>
    );
  }
  if (visual === 'worksheet') {
    return (
      <div className="worksheet-directions">
        <span><b>01</b>작동 설명에 밑줄 긋기</span>
        <span><b>02</b>네 기능 중 하나 쓰기</span>
        <span><b>03</b>짝에게 판단 근거 말하기</span>
      </div>
    );
  }
  if (visual === 'automatic') {
    return <PhotoPair left="/assets/lesson-01/automatic-door-real.webp" leftLabel="움직임 감지 → 문 열림" right="/assets/lesson-01/ruler-real.webp" rightLabel="눈금 확인 → 사람이 길이 읽기" />;
  }
  if (visual === 'ai-data') {
    return <PhotoPair left="/assets/lesson-01/photo-classification-real.webp" leftLabel="사진의 특징을 비교" right="/assets/lesson-01/smart-speaker-real.webp" rightLabel="말소리의 특징을 인식" />;
  }
  if (visual === 'functions') {
    return (
      <div className="function-triad">
        <section><small>01</small><strong>추천</strong><span>다음 것을 제안</span></section>
        <section><small>02</small><strong>인식</strong><span>무엇인지 확인</span></section>
        <section><small>03</small><strong>분류</strong><span>알맞은 모둠으로 구분</span></section>
      </div>
    );
  }
  if (visual === 'recommendation') {
    return (
      <div className="classification-record">
        <figure><img src="/assets/lesson-01/streaming-real.webp" alt="리모컨으로 영상 서비스를 이용하는 실제 사진" /></figure>
        <div><span>시청 기록</span><b>→</b><span>비슷한 특징 찾기</span><b>→</b><strong>다음 영상 제안</strong></div>
      </div>
    );
  }
  if (visual === 'recognition') {
    return <PhotoPair left="/assets/lesson-01/smart-speaker-real.webp" leftLabel="말소리 특징" right="/assets/lesson-01/face-recognition-real.webp" rightLabel="얼굴의 위치와 특징" />;
  }
  if (visual === 'classification') {
    return (
      <div className="classification-record">
        <figure><img src="/assets/lesson-01/photo-classification-real.webp" alt="휴대전화로 식물 사진을 촬영하는 실제 사진" /></figure>
        <div><span>특징 찾기</span><b>→</b><span>비슷한 자료 모으기</span><b>→</b><strong>알맞은 이름 붙이기</strong></div>
      </div>
    );
  }
  if (visual === 'sort') {
    return (
      <div className="sort-board">
        {(['추천', '인식', '분류', '자동기계'] as const).map((category) => (
          <section key={category}>
            <strong>{category}</strong>
            {functionCases.filter((item) => item.category === category).map((item) => <span key={item.id}>{item.number} · {item.title}</span>)}
          </section>
        ))}
      </div>
    );
  }
  if (visual === 'answer') {
    return (
      <blockquote className="evidence-sentence-slide">
        <small>근거 문장</small>
        <strong>이 사례는 <u>어떤 정보</u>를 보고<br /><u>어떤 결과</u>를 내기 때문에<br />_____입니다.</strong>
      </blockquote>
    );
  }
  if (visual === 'caution') {
    return (
      <div className="caution-comparison">
        <section><small>사례 A</small><strong>움직임이 감지되면 문이 열린다.</strong><span>정해진 조건과 동작</span></section>
        <section><small>사례 B</small><strong>사람을 구별해 허가된 사람에게만 문이 열린다.</strong><span>학습된 특징으로 인식</span></section>
      </div>
    );
  }
  return (
    <div className="editorial-summary">
      <small>오늘의 한 문장</small>
      <strong>AI는 데이터로 판단하고,<br />자동기계는 정해진 조건과 순서로 작동합니다.</strong>
      <span>제품 이름보다 작동 설명을 근거로 판단하기</span>
    </div>
  );
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
          {slide.bullets && <ul>{slide.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          {index === 4 && <Link className="button primary slide-launch" to="/teacher/resources/lesson-1/worksheet" target="_blank">활동지 열기</Link>}
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

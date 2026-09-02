import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { lessonTwoSlides, type LessonTwoSlideVisual } from '../data/lesson2Slides';

const sampleEvents = [
  '어머니가 장에 떡을 팔러 떠나요',
  '산길에서 호랑이를 만나요',
  '호랑이가 오누이의 집으로 가요',
  '오누이가 큰 나무 위로 피해요',
  '하늘에 동아줄을 내려 달라고 빌어요',
  '오누이가 해와 달이 돼요',
];

function SlideVisual({ visual }: { visual: LessonTwoSlideVisual }) {
  if (visual === 'cover') {
    return (
      <div className="lesson-two-slide-cover">
        <strong>02</strong>
        <span>이야기를 고르고</span>
        <span>여섯 장면으로</span>
        <small>우리 옛이야기 그림책 · LOOK</small>
      </div>
    );
  }

  if (visual === 'question') {
    return (
      <div className="lesson-two-slide-question">
        <strong>?</strong>
        <p>이야기 속에서 반복해서 찾아야 할 것은 무엇일까요?</p>
      </div>
    );
  }

  if (visual === 'elements') {
    return (
      <div className="lesson-two-slide-elements">
        <section><span>01</span><strong>인물</strong><p>이야기에 나오는 사람이나 동물</p></section>
        <section><span>02</span><strong>배경</strong><p>이야기가 펼쳐지는 때와 장소</p></section>
        <section><span>03</span><strong>사건</strong><p>이야기에서 실제로 일어난 일</p></section>
      </div>
    );
  }

  if (visual === 'stories') {
    return (
      <div className="lesson-two-slide-stories">
        <section><span>용기와 지혜</span><strong>해와 달이 된 오누이</strong></section>
        <section><span>나눔과 배려</span><strong>흥부와 놀부</strong></section>
        <section><span>서로 아끼는 마음</span><strong>의좋은 형제</strong></section>
      </div>
    );
  }

  if (visual === 'characters') {
    return (
      <div className="lesson-two-slide-word-study">
        <small>해와 달이 된 오누이</small>
        <p>이야기에 실제로 나오는 인물을 찾아요.</p>
        <div><strong>오누이</strong><strong>어머니</strong><strong>호랑이</strong><span>제비</span><span>임금</span></div>
      </div>
    );
  }

  if (visual === 'backgrounds') {
    return (
      <div className="lesson-two-slide-word-study">
        <small>장소가 바뀌는 순서도 살펴봐요.</small>
        <p>산길에서 시작한 사건은 집과 큰 나무를 지나 하늘로 이어집니다.</p>
        <div><strong>산길</strong><strong>집</strong><strong>큰 나무</strong><strong>하늘</strong></div>
      </div>
    );
  }

  if (visual === 'events') {
    return (
      <div className="lesson-two-slide-event-list">
        {sampleEvents.map((event, index) => <span key={event}><b>{index + 1}</b>{event}</span>)}
      </div>
    );
  }

  if (visual === 'flow') {
    return (
      <div className="lesson-two-slide-flow">
        <section><small>01</small><strong>먼저</strong><p>이야기가 시작된 까닭</p></section>
        <i aria-hidden="true" />
        <section><small>02</small><strong>그다음</strong><p>이어지는 중요한 일</p></section>
        <i aria-hidden="true" />
        <section><small>03</small><strong>마지막</strong><p>사건이 끝난 모습</p></section>
      </div>
    );
  }

  if (visual === 'shuffle') {
    const shuffled = [sampleEvents[3], sampleEvents[0], sampleEvents[5], sampleEvents[2], sampleEvents[1], sampleEvents[4]];
    return (
      <div className="lesson-two-slide-shuffle">
        {shuffled.map((event, index) => <span key={event}><b>{String.fromCharCode(65 + index)}</b>{event}</span>)}
      </div>
    );
  }

  if (visual === 'webapp') {
    return (
      <div className="lesson-two-slide-webapp">
        <span>03 / 04</span>
        <strong>사건 순서</strong>
        <p>끌어서 옮기기</p>
        <p>앞으로 · 뒤로</p>
        <Link to="/lesson/2">학생 웹앱 열기</Link>
      </div>
    );
  }

  if (visual === 'six-scenes') {
    return (
      <div className="lesson-two-slide-scenes">
        {sampleEvents.map((event, index) => (
          <section key={event}>
            <span>{index + 1}</span>
            <strong>{event}</strong>
            <small>{index === 0 ? '여기서부터 내가 기획해요' : '장면 모습은 아직 비어 있어요'}</small>
          </section>
        ))}
      </div>
    );
  }

  if (visual === 'details') {
    return (
      <div className="lesson-two-slide-details">
        <small>2장면 · 산길에서 호랑이가 어머니를 만나요</small>
        {[
          ['누가', '어머니와 호랑이'],
          ['어디', '어두운 산길'],
          ['느낌', '무서워요'],
          ['어떤 모습', '큰 입을 벌린 호랑이'],
        ].map(([label, choice], index) => (
          <section key={label}>
            <span>{String(index + 1).padStart(2, '0')} · {label}</span>
            <strong>{choice}</strong>
          </section>
        ))}
        <p>사건은 같아도 장면의 모습은 내가 다르게 고를 수 있어요.</p>
      </div>
    );
  }

  return (
    <div className="lesson-two-slide-summary">
      <span>사건 순서</span><span>장면 선택</span><span>나의 생각</span>
      <strong>내가 기획한 여섯 장면</strong>
      <small>정답표가 아니라 나의 그림책 계획입니다.</small>
    </div>
  );
}

export default function LessonTwoPresentationPage() {
  const [index, setIndex] = useState(0);
  const slide = lessonTwoSlides[index];
  const progress = useMemo(() => ((index + 1) / lessonTwoSlides.length) * 100, [index]);

  const move = (delta: number) => {
    setIndex((current) => Math.min(lessonTwoSlides.length - 1, Math.max(0, current + delta)));
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, select, [contenteditable="true"]')) return;
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        move(1);
      }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        move(-1);
      }
      if (event.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.();
      if (event.key === 'Escape' && document.fullscreenElement) document.exitFullscreen?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main className="lesson-two-presentation">
      <div
        className="lesson-two-presentation-progress"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-label="수업용 PPT 진행률"
        aria-valuemin={1}
        aria-valuemax={lessonTwoSlides.length}
        aria-valuenow={index + 1}
      />
      <p className="lesson-two-sr-only" aria-live="polite">슬라이드 {index + 1}. {slide.title}</p>
      <header className="lesson-two-presentation-header no-print">
        <Link to="/teacher">교사 설정</Link>
        <span>← → 이동 · F 전체화면</span>
        <strong>{index + 1} / {lessonTwoSlides.length}</strong>
      </header>

      <section className={`lesson-two-web-slide lesson-two-visual-${slide.visual}`}>
        <div className="lesson-two-slide-copy">
          <span>{slide.kicker}</span>
          <h1>{slide.title}</h1>
          {slide.subtitle && <p>{slide.subtitle}</p>}
          {slide.prompt && <strong className="lesson-two-slide-prompt">{slide.prompt}</strong>}
        </div>
        <div className="lesson-two-slide-visual"><SlideVisual visual={slide.visual} /></div>
      </section>

      <div className="lesson-two-presentation-controls no-print">
        <button onClick={() => move(-1)} disabled={index === 0}>이전</button>
        <button onClick={() => move(1)} disabled={index === lessonTwoSlides.length - 1}>다음</button>
      </div>
    </main>
  );
}

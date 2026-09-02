import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { lessonThreeSlides, type LessonThreeSlideVisual } from '../data/lesson3Slides';

type SoundKind = 'birds' | 'rain' | 'thunder';

const SOUND_FILES: Record<SoundKind, string> = {
  birds: '/assets/lesson-03/birds-morning.wav',
  rain: '/assets/lesson-03/rain-soft.wav',
  thunder: '/assets/lesson-03/thunder-low.wav',
};

const DATA_TYPES = [
  ['01', '문자', '글자로 읽어요'],
  ['02', '이미지', '눈으로 살펴봐요'],
  ['03', '소리', '귀로 들어요'],
] as const;

const CLASSIFY_ITEMS = [
  ['호랑이가 산길에 나타났어요.', '문자'],
  ['비 · 우산 · 골목', '문자'],
  ['교실 사진', '이미지'],
  ['자동문 사진', '이미지'],
  ['빗소리', '소리'],
  ['새소리', '소리'],
] as const;

function SoundButton({ kind, label, onPlay, playing }: { kind: SoundKind; label: string; onPlay: (kind: SoundKind) => void; playing: boolean }) {
  return (
    <button type="button" onClick={() => onPlay(kind)} aria-label={`${label} 재생`} className={playing ? 'is-playing' : ''}>
      {playing ? `${label} 재생 중` : `▶ ${label} 듣기`}
    </button>
  );
}

function BundleTable({ tone, onPlay, playingSound }: { tone: 'a' | 'b'; onPlay: (kind: SoundKind) => void; playingSound: SoundKind | null }) {
  const isA = tone === 'a';
  const soundKind: SoundKind = isA ? 'birds' : 'thunder';
  const photo = '/assets/lesson-01/classroom-real.webp';
  const photoAlt = isA ? '밝은 교실에서 함께 배우는 실사 사진' : '어둡고 긴장되는 느낌으로 보이는 같은 교실 실사 사진';

  return (
    <div className={`lesson-three-bundle-table lesson-three-bundle-${tone}`}>
      <div className="lesson-three-bundle-heading">
        <span>자료 묶음 {tone.toUpperCase()}</span>
        <strong>{isA ? '밝고 편안한 느낌' : '어둡고 긴장되는 느낌'}</strong>
      </div>
      <figure className="lesson-three-bundle-photo">
        <img src={photo} alt={photoAlt} />
        <figcaption><span>02 · 이미지</span><strong>{isA ? '햇빛이 드는 교실' : '같은 교실을 어둡게'}</strong></figcaption>
      </figure>
      <div className="lesson-three-bundle-facts">
        <section><small>01 · 문자</small><strong>{isA ? '밝은 낮, 함께 배우는 시간' : '어두운 밤, 조용한 교실'}</strong></section>
        <section>
          <small>03 · 소리</small>
          <strong>{isA ? '새소리' : '천둥'}</strong>
          <SoundButton kind={soundKind} label={isA ? '새소리' : '천둥'} onPlay={onPlay} playing={playingSound === soundKind} />
        </section>
      </div>
    </div>
  );
}

function SlideVisual({ visual, onPlaySound, playingSound }: { visual: LessonThreeSlideVisual; onPlaySound: (kind: SoundKind) => void; playingSound: SoundKind | null }) {
  if (visual === 'cover') {
    return (
      <div className="lesson-three-slide-cover">
        <strong aria-hidden="true">03</strong>
        <div><span>읽고</span><span>보고</span><span>들으며</span></div>
        <small>우리 옛이야기 그림책 · EXPLORE</small>
      </div>
    );
  }

  if (visual === 'baskets') {
    return (
      <div className="lesson-three-slide-baskets">
        {DATA_TYPES.map(([number, type, action]) => (
          <section key={type}><small>{number}</small><strong>{type}</strong><span>{action}</span></section>
        ))}
      </div>
    );
  }

  if (visual === 'definition') {
    return (
      <div className="lesson-three-slide-definition">
        <p><span>데이터</span><strong>생각을 돕는 자료</strong></p>
        {DATA_TYPES.map(([number, type, action]) => (
          <section key={type}><small>{number}</small><strong>{action}</strong><span>{type} 데이터</span></section>
        ))}
      </div>
    );
  }

  if (visual === 'text') {
    return (
      <div className="lesson-three-slide-text-data">
        <small>문자 데이터 · 01</small>
        <blockquote>사람들이 교실에 있어요.</blockquote>
        <dl>
          <div><dt>누가</dt><dd>사람들</dd></div>
          <div><dt>어디에</dt><dd>교실</dd></div>
          <div><dt>어떤 모습인가요</dt><dd>함께 있어요</dd></div>
        </dl>
      </div>
    );
  }

  if (visual === 'image') {
    return (
      <figure className="lesson-three-slide-photo">
        <img src="/assets/lesson-01/photo-classification-real.webp" alt="휴대전화로 초록 잎을 촬영하는 모습" />
        <figcaption><span>이미지 데이터 · 02</span><strong>모양 · 색 · 위치</strong></figcaption>
      </figure>
    );
  }

  if (visual === 'sound') {
    return (
      <div className="lesson-three-slide-sounds">
        <p>소리를 듣고 알맞은 말을 골라 보세요.</p>
        <section><span>01</span><strong>새소리</strong><SoundButton kind="birds" label="새소리" onPlay={onPlaySound} playing={playingSound === 'birds'} /></section>
        <section><span>02</span><strong>천둥</strong><SoundButton kind="thunder" label="천둥" onPlay={onPlaySound} playing={playingSound === 'thunder'} /></section>
        <small>준비된 실제 WAV 학습 음원을 재생합니다.</small>
      </div>
    );
  }

  if (visual === 'classify') {
    return (
      <div className="lesson-three-slide-classify">
        <div className="lesson-three-classify-items">
          {CLASSIFY_ITEMS.map(([item]) => <span key={item}>{item}</span>)}
        </div>
        <div className="lesson-three-classify-rule" aria-hidden="true" />
        <div className="lesson-three-classify-baskets">
          {DATA_TYPES.map(([, type]) => <strong key={type}>{type}</strong>)}
        </div>
        <div className="lesson-three-classify-audio" aria-label="분류할 소리 듣기">
          <SoundButton kind="rain" label="① 빗소리" onPlay={onPlaySound} playing={playingSound === 'rain'} />
          <SoundButton kind="birds" label="② 새소리" onPlay={onPlaySound} playing={playingSound === 'birds'} />
        </div>
      </div>
    );
  }

  if (visual === 'same-scene') {
    return (
      <div className="lesson-three-slide-same-scene">
        <small>기준 장면</small>
        <strong>사람들이 교실에 있어요.</strong>
        <div>
          <section><span>A</span><p>밝은 낮<br />햇빛 드는 교실<br />새소리</p></section>
          <section><span>B</span><p>어두운 밤<br />같은 교실<br />천둥</p></section>
        </div>
      </div>
    );
  }

  if (visual === 'bundle-a') return <BundleTable tone="a" onPlay={onPlaySound} playingSound={playingSound} />;
  if (visual === 'bundle-b') return <BundleTable tone="b" onPlay={onPlaySound} playingSound={playingSound} />;

  if (visual === 'compare') {
    return (
      <div className="lesson-three-slide-compare">
        <section>
          <small>A 묶음</small>
          <img src="/assets/lesson-01/classroom-real.webp" alt="밝은 교실에서 함께 배우는 실사 사진" />
          <strong>밝고 편안해요</strong>
          <p>밝은 낮 · 햇빛 드는 교실 · 새소리</p>
          <SoundButton kind="birds" label="새소리" onPlay={onPlaySound} playing={playingSound === 'birds'} />
        </section>
        <section>
          <small>B 묶음</small>
          <img src="/assets/lesson-01/classroom-real.webp" alt="어둡고 긴장되는 느낌으로 보이는 같은 교실 실사 사진" />
          <strong>어둡고 긴장돼요</strong>
          <p>어두운 밤 · 같은 교실 · 천둥</p>
          <SoundButton kind="thunder" label="천둥" onPlay={onPlaySound} playing={playingSound === 'thunder'} />
        </section>
      </div>
    );
  }

  if (visual === 'my-bundle') {
    return (
      <div className="lesson-three-slide-my-bundle">
        <header><span>2차시에서 고른 장면</span><strong>나의 장면 데이터 꾸러미</strong></header>
        {DATA_TYPES.map(([number, type, action]) => (
          <section key={type}><small>{number}</small><strong>{type} 하나</strong><span>{action}</span></section>
        ))}
        <Link to="/lesson/3">학생 웹앱 열기</Link>
      </div>
    );
  }

  return (
    <div className="lesson-three-slide-summary">
      <div>{DATA_TYPES.map(([, type]) => <span key={type}>{type}</span>)}</div>
      <strong>장면을 또렷하게 만드는<br />세 가지 데이터</strong>
      <p>내가 직접 고르고 비교했습니다.</p>
      <small>생성형 AI · 외부 도구 사용 없음</small>
    </div>
  );
}

export default function LessonThreePresentationPage() {
  const [index, setIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingSound, setPlayingSound] = useState<SoundKind | null>(null);
  const slide = lessonThreeSlides[index];
  const progress = useMemo(() => ((index + 1) / lessonThreeSlides.length) * 100, [index]);

  const move = useCallback((delta: number) => {
    setIndex((current) => Math.min(lessonThreeSlides.length - 1, Math.max(0, current + delta)));
  }, []);

  const stopSounds = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setPlayingSound(null);
  }, []);

  const playSound = useCallback(async (kind: SoundKind) => {
    stopSounds();
    const audio = new Audio(SOUND_FILES[kind]);
    audio.preload = 'auto';
    audioRef.current = audio;
    setPlayingSound(kind);
    audio.addEventListener('ended', () => {
      if (audioRef.current === audio) audioRef.current = null;
      setPlayingSound(null);
    }, { once: true });
    try {
      await audio.play();
    } catch {
      if (audioRef.current === audio) audioRef.current = null;
      setPlayingSound(null);
    }
  }, [stopSounds]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as Element | null;
      if (target?.closest('button, a, input, textarea, select, [contenteditable="true"]')) return;
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        move(1);
      }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        move(-1);
      }
      if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        if (document.fullscreenElement) void document.exitFullscreen?.();
        else void document.documentElement.requestFullscreen?.();
      }
      if (event.key === 'Escape' && document.fullscreenElement) void document.exitFullscreen?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move]);

  useEffect(() => {
    return () => {
      stopSounds();
    };
  }, [stopSounds]);

  useEffect(() => stopSounds(), [index, stopSounds]);

  return (
    <main className="lesson-three-presentation">
      <div
        className="lesson-three-presentation-progress"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-label="3차시 수업용 PPT 진행률"
        aria-valuemin={1}
        aria-valuemax={lessonThreeSlides.length}
        aria-valuenow={index + 1}
      />
      <p className="lesson-three-sr-only" aria-live="polite">슬라이드 {index + 1}. {slide.title}</p>
      <header className="lesson-three-presentation-header no-print">
        <Link to="/teacher">교사 설정</Link>
        <span>← → 이동 · F 전체화면</span>
        <strong>{index + 1} / {lessonThreeSlides.length}</strong>
      </header>

      <section className={`lesson-three-web-slide lesson-three-visual-${slide.visual}`}>
        <div className="lesson-three-slide-copy">
          <span>{slide.kicker}</span>
          <h1>{slide.title}</h1>
          {slide.subtitle ? <p>{slide.subtitle}</p> : null}
          {slide.prompt ? <strong className="lesson-three-slide-prompt">{slide.prompt}</strong> : null}
        </div>
        <div className="lesson-three-slide-visual"><SlideVisual visual={slide.visual} onPlaySound={playSound} playingSound={playingSound} /></div>
      </section>

      <div className="lesson-three-presentation-controls no-print">
        <button type="button" onClick={() => move(-1)} disabled={index === 0}>이전</button>
        <button type="button" onClick={() => move(1)} disabled={index === lessonThreeSlides.length - 1}>다음</button>
      </div>
    </main>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import {
  lessonThreeBundles,
  lessonThreeClassifyCards,
  lessonThreeComparisonChoices,
  lessonThreeImageClues,
  lessonThreeKindLabels,
  lessonThreeSoundClues,
} from '../data/lesson3';
import { getLessonTwoStory } from '../data/lesson2';
import type { LessonTwoEvent } from '../data/lesson2';
import type {
  LessonThreeDataKind,
  LessonThreeProgress,
} from '../types';
import {
  initialLessonThreeProgress,
  readLessonThreeProgress,
  readLessonTwoProgress,
  writeLessonThreeProgress,
} from '../utils/storage';

const stepLabels = ['데이터 나누기', '느낌 비교', '장면 고르기', '데이터 주머니', '완성'];
const dataKinds: LessonThreeDataKind[] = ['text', 'image', 'sound'];

type AudioButtonProps = {
  id: string;
  label: string;
  playingId: string;
  onPlay: (id: string) => void;
};

const bundlePhotoToken = (bundleId: string) => `${bundleId}:photo`;
const bundleSoundToken = (bundleId: string) => `${bundleId}:sound`;

function AudioButton({ id, label, playingId, onPlay }: AudioButtonProps) {
  const playing = playingId === id;
  return (
    <button
      type="button"
      className={playing ? 'lesson-three-audio is-playing' : 'lesson-three-audio'}
      aria-label={`${label} ${playing ? '재생 중' : '듣기'}`}
      onClick={() => onPlay(id)}
    >
      <span aria-hidden="true">{playing ? '■' : '▶'}</span>
      {playing ? '듣는 중' : '소리 듣기'}
    </button>
  );
}

function orderedEvents(events: LessonTwoEvent[], savedOrder: string[]) {
  const eventMap = new Map(events.map((event) => [event.id, event]));
  const fromSavedOrder = savedOrder
    .map((id) => eventMap.get(id))
    .filter((event): event is LessonTwoEvent => Boolean(event));

  return fromSavedOrder.length === events.length
    ? fromSavedOrder
    : [...events].sort((a, b) => a.correctOrder - b.correctOrder);
}

export default function LessonThreePage() {
  const [lessonTwoSnapshot] = useState(() => readLessonTwoProgress());
  const [progress, setProgress] = useState<LessonThreeProgress>(() => {
    const stored = readLessonThreeProgress();
    const storyId = lessonTwoSnapshot.storyId ?? stored.storyId ?? 'sun-moon';
    const story = getLessonTwoStory(storyId);
    const sceneExists = story?.events.some((event) => event.id === stored.sceneId) ?? false;
    return {
      ...stored,
      storyId,
      sceneId: sceneExists ? stored.sceneId : '',
      textClueId: sceneExists ? stored.textClueId : '',
      imageClueId: sceneExists ? stored.imageClueId : '',
      soundClueId: sceneExists ? stored.soundClueId : '',
      completed: sceneExists ? stored.completed : false,
      step: !sceneExists && stored.step > 2 ? 2 : stored.step,
    };
  });
  const [classificationChecked, setClassificationChecked] = useState(false);
  const [comparisonChecked, setComparisonChecked] = useState(false);
  const [playingId, setPlayingId] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [storageWarning, setStorageWarning] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const story = useMemo(
    () => getLessonTwoStory(progress.storyId) ?? getLessonTwoStory('sun-moon'),
    [progress.storyId],
  );
  const scenes = useMemo(
    () => story
      ? orderedEvents(
        story.events,
        lessonTwoSnapshot.storyId === story.id ? lessonTwoSnapshot.eventOrder : [],
      )
      : [],
    [lessonTwoSnapshot.eventOrder, lessonTwoSnapshot.storyId, story],
  );
  const selectedScene = scenes.find((scene) => scene.id === progress.sceneId) ?? null;
  const selectedSceneNumber = selectedScene
    ? scenes.findIndex((scene) => scene.id === selectedScene.id) + 1
    : 0;
  const classificationCorrect = lessonThreeClassifyCards.every(
    (card) => progress.classificationAnswers[card.id] === card.kind,
  );
  const allCardsClassified = lessonThreeClassifyCards.every(
    (card) => Boolean(progress.classificationAnswers[card.id]),
  );
  const comparisonCorrect = progress.comparisonAnswer === 'different-data';
  const bothBundlesExplored = lessonThreeBundles.every(
    (bundle) => progress.exploredBundleIds.includes(bundlePhotoToken(bundle.id))
      && progress.exploredBundleIds.includes(bundleSoundToken(bundle.id)),
  );
  const pocketReady = Boolean(
    progress.textClueId && progress.imageClueId && progress.soundClueId,
  );
  const selectedScenePlan = selectedScene
    ? lessonTwoSnapshot.scenePlanByEventId[selectedScene.id]
    : undefined;
  const textClues = selectedScene
    ? selectedScenePlan?.mood && selectedScenePlan.detail
      ? [
        { id: 'event', label: '사건 문장', value: selectedScene.text },
        { id: 'mood', label: '내가 고른 느낌', value: selectedScenePlan.mood },
        { id: 'detail', label: '내가 고른 모습', value: selectedScenePlan.detail },
      ]
      : [
        { id: 'event', label: '무슨 일', value: selectedScene.text },
        { id: 'people', label: '누가', value: selectedScene.people },
        { id: 'place', label: '어디', value: selectedScene.place },
      ]
    : [];
  const selectedTextClue = textClues.find((clue) => clue.id === progress.textClueId);
  const selectedImageClue = lessonThreeImageClues.find((clue) => clue.id === progress.imageClueId);
  const selectedSoundClue = lessonThreeSoundClues.find((clue) => clue.id === progress.soundClueId);
  const savedFromLessonTwo = Boolean(lessonTwoSnapshot.storyId);

  useEffect(() => {
    const stored = writeLessonThreeProgress(progress);
    setStorageWarning(!stored);
  }, [progress]);

  useEffect(() => () => {
    audioRef.current?.pause();
  }, []);

  const update = (patch: Partial<LessonThreeProgress>) => {
    setProgress((current) => ({
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    }));
  };

  const setStep = (step: number) => {
    audioRef.current?.pause();
    setPlayingId('');
    update({ step });
    setAnnouncement(`${stepLabels[step]} 단계입니다.`);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    window.requestAnimationFrame(() => {
      const heading = stageRef.current?.querySelector<HTMLElement>('#lesson-three-stage-title');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    });
  };

  const playAudio = async (
    id: string,
    src: string,
    label: string,
    onEnded?: () => void,
  ) => {
    if (playingId === id) {
      audioRef.current?.pause();
      audioRef.current = null;
      setPlayingId('');
      setAnnouncement(`${label} 재생을 멈췄어요.`);
      return;
    }

    audioRef.current?.pause();
    const audio = new Audio(src);
    audio.preload = 'auto';
    audioRef.current = audio;
    setPlayingId(id);
    audio.addEventListener('ended', () => {
      setPlayingId('');
      audioRef.current = null;
      onEnded?.();
    }, { once: true });

    try {
      await audio.play();
      setAnnouncement(`${label} 재생 중입니다.`);
    } catch {
      setPlayingId('');
      audioRef.current = null;
      setAnnouncement('소리를 재생하지 못했어요. 기기의 음량을 확인해 주세요.');
    }
  };

  const chooseKind = (cardId: string, kind: LessonThreeDataKind) => {
    setClassificationChecked(false);
    update({
      classificationAnswers: {
        ...progress.classificationAnswers,
        [cardId]: kind,
      },
      classificationComplete: false,
    });
  };

  const checkClassification = () => {
    setClassificationChecked(true);
    update({ classificationComplete: classificationCorrect });
    setAnnouncement(
      classificationCorrect
        ? '여섯 카드를 문자, 이미지, 소리로 모두 잘 나누었어요.'
        : '표시된 카드를 한 번 더 살펴보세요.',
    );
  };

  const markBundleExploration = (token: string, message: string) => {
    setProgress((current) => current.exploredBundleIds.includes(token)
      ? current
      : {
        ...current,
        exploredBundleIds: [...current.exploredBundleIds, token],
        comparisonAnswer: null,
        comparisonComplete: false,
        updatedAt: new Date().toISOString(),
      });
    setComparisonChecked(false);
    setAnnouncement(message);
  };

  const exploredPartCount = lessonThreeBundles.reduce((count, bundle) => count + [
    bundlePhotoToken(bundle.id),
    bundleSoundToken(bundle.id),
  ].filter((token) => progress.exploredBundleIds.includes(token)).length, 0);

  const chooseScene = (sceneId: string) => {
    const changed = progress.sceneId !== sceneId;
    update({
      storyId: story?.id ?? 'sun-moon',
      sceneId,
      textClueId: changed ? '' : progress.textClueId,
      imageClueId: changed ? '' : progress.imageClueId,
      soundClueId: changed ? '' : progress.soundClueId,
      completed: false,
    });
    setAnnouncement(`${scenes.findIndex((scene) => scene.id === sceneId) + 1}번 장면을 골랐어요.`);
  };

  const completePocket = () => {
    if (!pocketReady) return;
    update({ completed: true });
    setStep(4);
  };

  const reset = () => {
    const storyId = lessonTwoSnapshot.storyId ?? 'sun-moon';
    setProgress({
      ...initialLessonThreeProgress,
      storyId,
      updatedAt: new Date().toISOString(),
    });
    setClassificationChecked(false);
    setComparisonChecked(false);
    setPlayingId('');
    setAnnouncement('3차시 활동을 처음으로 되돌렸어요.');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <AppShell compact lessonNumber={3}>
      <main className="lesson-three-page">
        <header className="lesson-three-topbar">
          <div>
            <span className="lesson-three-kicker">3차시 · EXPLORE · 데이터</span>
            <h1>AI가 이해하는 데이터</h1>
          </div>
          <Link className="lesson-three-home-link no-print" to="/">10차시 목록</Link>
        </header>

        {storageWarning && (
          <p className="lesson-three-storage-warning no-print" role="status">
            이 기기에서는 활동 기록이 저장되지 않아요. 지금 화면에서는 계속 활동할 수 있어요.
          </p>
        )}

        <div className="lesson-three-workspace">
          <aside className="lesson-three-progress no-print" aria-label="3차시 활동 단계">
            <span className="lesson-three-progress-mobile">
              {progress.step + 1} / 5 · {stepLabels[progress.step]}
            </span>
            <ol>
              {stepLabels.map((label, index) => (
                <li
                  key={label}
                  className={index < progress.step ? 'is-done' : ''}
                  aria-current={index === progress.step ? 'step' : undefined}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{label}</strong>
                </li>
              ))}
            </ol>
            <div className="lesson-three-data-key">
              <small>오늘 모을 데이터</small>
              <span><i className="is-text" />문자</span>
              <span><i className="is-image" />이미지</span>
              <span><i className="is-sound" />소리</span>
            </div>
          </aside>

          <section ref={stageRef} className="lesson-three-stage" aria-labelledby="lesson-three-stage-title">
            <p className="lesson-three-sr-only" aria-live="polite">{announcement}</p>

            {progress.step === 0 && (
              <>
                <div className="lesson-three-heading">
                  <span>활동 1 · 데이터 나누기</span>
                  <h2 id="lesson-three-stage-title">카드를 보고 데이터의 종류를 골라 보세요.</h2>
                  <p>문자는 읽고, 이미지는 보고, 소리는 들어요.</p>
                </div>

                <div className="lesson-three-classify-grid">
                  {lessonThreeClassifyCards.map((card, index) => {
                    const answer = progress.classificationAnswers[card.id];
                    const needsReview = classificationChecked && answer !== card.kind;
                    return (
                      <article
                        key={card.id}
                        className={needsReview ? 'lesson-three-data-card needs-review' : 'lesson-three-data-card'}
                      >
                        <header>
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <strong>{card.title}</strong>
                        </header>
                        <div className={`lesson-three-card-sample is-${card.kind}`}>
                          {card.text ? <p>{card.text}</p> : null}
                          {card.imageSrc ? <img src={card.imageSrc} alt={card.imageAlt} /> : null}
                          {card.audioSrc ? (
                            <AudioButton
                              id={`classify-${card.id}`}
                              label={card.title}
                              playingId={playingId}
                              onPlay={() => playAudio(`classify-${card.id}`, card.audioSrc as string, card.title)}
                            />
                          ) : null}
                        </div>
                        <small>{card.helper}</small>
                        <div className="lesson-three-kind-buttons" role="group" aria-label={`${card.title} 데이터 종류 선택`}>
                          {dataKinds.map((kind) => (
                            <button
                              type="button"
                              key={kind}
                              className={answer === kind ? 'is-selected' : ''}
                              aria-pressed={answer === kind}
                              onClick={() => chooseKind(card.id, kind)}
                            >
                              {lessonThreeKindLabels[kind]}
                            </button>
                          ))}
                        </div>
                        {needsReview ? <em>다시 살펴봐요</em> : null}
                      </article>
                    );
                  })}
                </div>

                {classificationChecked && (
                  <div
                    className={classificationCorrect ? 'lesson-three-feedback is-success' : 'lesson-three-feedback is-review'}
                    role="status"
                  >
                    <strong>{classificationCorrect ? '세 가지 데이터로 잘 나누었어요.' : '표시된 카드를 다시 골라 보세요.'}</strong>
                    <span>AI는 문자·이미지·소리를 데이터로 받을 수 있어요.</span>
                  </div>
                )}

                <div className="lesson-three-actions no-print">
                  <Link className="lesson-three-button is-quiet" to="/">이전</Link>
                  {!progress.classificationComplete ? (
                    <button
                      type="button"
                      className="lesson-three-button is-primary"
                      disabled={!allCardsClassified}
                      onClick={checkClassification}
                    >
                      나눈 결과 확인
                    </button>
                  ) : (
                    <button type="button" className="lesson-three-button is-primary" onClick={() => setStep(1)}>
                      두 느낌 비교하기
                    </button>
                  )}
                </div>
              </>
            )}

            {progress.step === 1 && (
              <>
                <div className="lesson-three-heading">
                  <span>활동 2 · 느낌 비교</span>
                  <h2 id="lesson-three-stage-title">같은 장면에 다른 데이터를 주면 느낌이 어떻게 달라질까요?</h2>
                  <p>두 묶음의 실제 사진을 보고, 소리를 끝까지 들어 보세요.</p>
                </div>

                <div className="lesson-three-base-scene">
                  <small>두 묶음의 같은 짧은 장면</small>
                  <strong>사람들이 교실에 있어요.</strong>
                </div>

                <div className="lesson-three-bundle-grid">
                  {lessonThreeBundles.map((bundle, index) => {
                    const photoToken = bundlePhotoToken(bundle.id);
                    const soundToken = bundleSoundToken(bundle.id);
                    const photoObserved = progress.exploredBundleIds.includes(photoToken);
                    const soundHeard = progress.exploredBundleIds.includes(soundToken);
                    const explored = photoObserved && soundHeard;
                    return (
                      <article key={bundle.id} className={`lesson-three-bundle is-${bundle.tone} ${explored ? 'is-explored' : ''}`}>
                        <header className="lesson-three-bundle-open">
                          <span>묶음 {index === 0 ? 'A' : 'B'}</span>
                          <strong>{bundle.label}</strong>
                          <small>{explored ? '사진과 소리 살펴봄 ✓' : '사진과 소리를 하나씩 살펴봐요'}</small>
                        </header>
                        <figure className={photoObserved ? 'lesson-three-bundle-photo is-open' : 'lesson-three-bundle-photo'}>
                          {photoObserved ? (
                            <img src={bundle.imageSrc} alt={bundle.imageAlt} />
                          ) : (
                            <div aria-hidden="true"><span>PHOTO</span><strong>사진을 열어 보세요</strong></div>
                          )}
                          <figcaption>{bundle.imageClue}</figcaption>
                          <button
                            type="button"
                            onClick={() => markBundleExploration(photoToken, `${bundle.label}의 사진을 살펴봤어요.`)}
                          >
                            {photoObserved ? '사진 살펴봄 ✓' : '사진 보기'}
                          </button>
                        </figure>
                        <dl>
                          <div><dt>문자</dt><dd>{bundle.textClue}</dd></div>
                          <div>
                            <dt>소리</dt>
                            <dd>
                              <span>{bundle.soundLabel}</span>
                              <AudioButton
                                id={`bundle-${bundle.id}`}
                                label={bundle.soundLabel}
                                playingId={playingId}
                                onPlay={() => playAudio(
                                  `bundle-${bundle.id}`,
                                  bundle.audioSrc,
                                  bundle.soundLabel,
                                  () => markBundleExploration(soundToken, `${bundle.soundLabel}를 끝까지 들었어요.`),
                                )}
                              />
                              <small>{soundHeard ? '끝까지 들었어요 ✓' : '끝까지 들으면 확인돼요'}</small>
                            </dd>
                          </div>
                        </dl>
                      </article>
                    );
                  })}
                </div>

                {bothBundlesExplored ? (
                  <fieldset className="lesson-three-comparison-question">
                    <legend>두 묶음의 느낌은 왜 달라졌을까요?</legend>
                    <div>
                      {lessonThreeComparisonChoices.map((choice) => (
                        <button
                          type="button"
                          key={choice.id}
                          className={progress.comparisonAnswer === choice.id ? 'is-selected' : ''}
                          aria-pressed={progress.comparisonAnswer === choice.id}
                          onClick={() => {
                            setComparisonChecked(false);
                            update({ comparisonAnswer: choice.id, comparisonComplete: false });
                          }}
                        >
                          {choice.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ) : (
                  <p className="lesson-three-explore-prompt" role="status">
                    살펴본 데이터 {exploredPartCount} / 4 · 두 사진을 열고, 두 소리를 끝까지 들어 보세요.
                  </p>
                )}

                {comparisonChecked && (
                  <div
                    className={comparisonCorrect ? 'lesson-three-feedback is-success' : 'lesson-three-feedback is-review'}
                    role="status"
                  >
                    <strong>{comparisonCorrect ? '맞아요. 주는 데이터가 다르면 느낌도 달라져요.' : '화면이 아니라, 묶음 안의 단서를 비교해 보세요.'}</strong>
                  </div>
                )}

                <div className="lesson-three-actions no-print">
                  <button type="button" className="lesson-three-button is-quiet" onClick={() => setStep(0)}>이전</button>
                  {!progress.comparisonComplete ? (
                    <button
                      type="button"
                      className="lesson-three-button is-primary"
                      disabled={!bothBundlesExplored || !progress.comparisonAnswer}
                      onClick={() => {
                        setComparisonChecked(true);
                        update({ comparisonComplete: comparisonCorrect });
                        setAnnouncement(comparisonCorrect ? '주는 데이터가 다르면 느낌도 달라져요.' : '다시 생각해 보세요.');
                      }}
                    >
                      내 생각 확인
                    </button>
                  ) : (
                    <button type="button" className="lesson-three-button is-primary" onClick={() => setStep(2)}>
                      우리 장면 고르기
                    </button>
                  )}
                </div>
              </>
            )}

            {progress.step === 2 && story && (
              <>
                <div className="lesson-three-heading">
                  <span>활동 3 · 그림책 장면</span>
                  <h2 id="lesson-three-stage-title">데이터를 모을 장면 하나를 고르세요.</h2>
                  <p>{savedFromLessonTwo ? '2차시에서 고른 이야기와 여섯 장면을 가져왔어요.' : '2차시 기록이 없어 예시 이야기를 준비했어요.'}</p>
                </div>

                <div className="lesson-three-story-strip">
                  <small>{savedFromLessonTwo ? '2차시에서 고른 이야기' : '오늘의 예시 이야기'}</small>
                  <strong>{story.title}</strong>
                  <span>{story.theme}</span>
                </div>

                <div className="lesson-three-scene-grid" role="group" aria-label="데이터를 모을 장면 선택">
                  {scenes.map((scene, index) => {
                    const selected = progress.sceneId === scene.id;
                    const savedPlan = lessonTwoSnapshot.scenePlanByEventId[scene.id];
                    return (
                      <button
                        type="button"
                        key={scene.id}
                        className={selected ? 'lesson-three-scene-card is-selected' : 'lesson-three-scene-card'}
                        aria-pressed={selected}
                        onClick={() => chooseScene(scene.id)}
                      >
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <strong>{scene.text}</strong>
                        <small>{savedPlan?.mood || `${scene.people} · ${scene.place}`}</small>
                      </button>
                    );
                  })}
                </div>

                <div className="lesson-three-actions no-print">
                  <button type="button" className="lesson-three-button is-quiet" onClick={() => setStep(1)}>이전</button>
                  <button
                    type="button"
                    className="lesson-three-button is-primary"
                    disabled={!selectedScene}
                    onClick={() => setStep(3)}
                  >
                    데이터 모으기
                  </button>
                </div>
              </>
            )}

            {progress.step === 3 && story && selectedScene && (
              <>
                <div className="lesson-three-heading">
                  <span>활동 4 · 데이터 주머니</span>
                  <h2 id="lesson-three-stage-title">우리 장면에 필요한 데이터를 하나씩 담아 보세요.</h2>
                  <p>정답은 없어요. 우리 모둠이 만들고 싶은 느낌으로 골라요.</p>
                </div>

                <article className="lesson-three-selected-scene">
                  <span>{story.title} · 장면 {selectedSceneNumber}</span>
                  <strong>{selectedScene.text}</strong>
                </article>

                <div className="lesson-three-pocket-builder">
                  <fieldset className="is-text">
                    <legend><span>01</span> 어떤 문자 단서를 담을까요?</legend>
                    <div>
                      {textClues.map((clue) => (
                        <button
                          type="button"
                          key={clue.id}
                          className={progress.textClueId === clue.id ? 'is-selected' : ''}
                          aria-pressed={progress.textClueId === clue.id}
                          onClick={() => update({ textClueId: clue.id, completed: false })}
                        >
                          <small>{clue.label}</small>
                          <strong>{clue.value}</strong>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="is-image">
                    <legend><span>02</span> 어떤 이미지 단서를 담을까요?</legend>
                    <div>
                      {lessonThreeImageClues.map((clue) => (
                        <button
                          type="button"
                          key={clue.id}
                          className={progress.imageClueId === clue.id ? 'is-selected' : ''}
                          aria-pressed={progress.imageClueId === clue.id}
                          onClick={() => update({ imageClueId: clue.id, completed: false })}
                        >
                          <i className={`lesson-three-image-sample is-${clue.tone}`} aria-hidden="true" />
                          <span><strong>{clue.label}</strong><small>{clue.note}</small></span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="is-sound">
                    <legend><span>03</span> 어떤 소리 단서를 담을까요?</legend>
                    <div>
                      {lessonThreeSoundClues.map((clue) => (
                        <article key={clue.id} className={progress.soundClueId === clue.id ? 'is-selected' : ''}>
                          <button
                            type="button"
                            className="lesson-three-sound-choice"
                            aria-pressed={progress.soundClueId === clue.id}
                            onClick={() => update({ soundClueId: clue.id, completed: false })}
                          >
                            <strong>{clue.label}</strong>
                            <small>{clue.note}</small>
                          </button>
                          <AudioButton
                            id={`pocket-${clue.id}`}
                            label={clue.label}
                            playingId={playingId}
                            onPlay={() => playAudio(`pocket-${clue.id}`, clue.audioSrc, clue.label)}
                          />
                        </article>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="lesson-three-pocket-status" role="status">
                  <strong>{[progress.textClueId, progress.imageClueId, progress.soundClueId].filter(Boolean).length} / 3</strong>
                  <span>{pocketReady ? '데이터를 모두 담았어요.' : '문자·이미지·소리를 하나씩 골라요.'}</span>
                </div>

                <div className="lesson-three-actions no-print">
                  <button type="button" className="lesson-three-button is-quiet" onClick={() => setStep(2)}>장면 다시 고르기</button>
                  <button type="button" className="lesson-three-button is-primary" disabled={!pocketReady} onClick={completePocket}>
                    데이터 주머니 완성
                  </button>
                </div>
              </>
            )}

            {progress.step === 4 && story && selectedScene && (
              <>
                <div className="lesson-three-completion-heading">
                  <span>3차시 완료</span>
                  <strong aria-hidden="true">03</strong>
                  <h2 id="lesson-three-stage-title">우리 장면의 데이터 주머니를 완성했어요.</h2>
                  <p>AI가 장면을 알아볼 수 있도록 문자·이미지·소리 단서를 모았어요.</p>
                </div>

                <article className="lesson-three-final-pocket">
                  <header>
                    <span>{story.title} · 장면 {selectedSceneNumber}</span>
                    <h3>{selectedScene.text}</h3>
                  </header>
                  <dl>
                    <div className="is-text">
                      <dt>문자 데이터</dt>
                      <dd>{selectedTextClue?.value}</dd>
                    </div>
                    <div className="is-image">
                      <dt>이미지 데이터</dt>
                      <dd>{selectedImageClue?.label}<small>{selectedImageClue?.note}</small></dd>
                    </div>
                    <div className="is-sound">
                      <dt>소리 데이터</dt>
                      <dd>{selectedSoundClue?.label}<small>{selectedSoundClue?.note}</small></dd>
                    </div>
                  </dl>
                </article>

                <blockquote className="lesson-three-concept">
                  <strong>오늘의 발견</strong>
                  <p>AI는 문자·이미지·소리 데이터를 살펴봐요.</p>
                  <small>같은 장면도 어떤 데이터를 주는지에 따라 알아내는 단서가 달라져요.</small>
                </blockquote>

                <div className="lesson-three-actions lesson-three-completion-actions no-print">
                  <button type="button" className="lesson-three-button is-quiet" onClick={() => window.print()}>결과 인쇄하기</button>
                  <Link className="lesson-three-button is-primary" to="/">차시 목록으로</Link>
                  <button type="button" className="lesson-three-reset" onClick={reset}>처음부터 다시 하기</button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </AppShell>
  );
}

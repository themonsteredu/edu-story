import { useEffect, useMemo, useRef, useState } from 'react';
import type { DragEvent, KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import {
  getLessonTwoStory,
  lessonTwoStories,
  shuffledEventIds,
} from '../data/lesson2';
import type { LessonTwoChoice, LessonTwoEvent } from '../data/lesson2';
import type {
  LessonTwoProgress,
  LessonTwoScenePlan,
  LessonTwoStoryId,
} from '../types';
import {
  initialLessonTwoProgress,
  readLessonTwoProgress,
  STORAGE_KEYS,
  writeLessonTwoProgress,
} from '../utils/storage';

const stepLabels = ['이야기 선택', '인물과 배경', '사건 순서', '여섯 장면', '완성'];

function sameSelection(selected: string[], choices: LessonTwoChoice[]) {
  const correct = choices.filter((choice) => choice.correct).map((choice) => choice.id);
  return selected.length === correct.length && correct.every((id) => selected.includes(id));
}

function findEvent(events: LessonTwoEvent[], id: string) {
  return events.find((event) => event.id === id);
}

export default function LessonTwoPage() {
  const [progress, setProgress] = useState<LessonTwoProgress>(() => readLessonTwoProgress());
  const [elementsChecked, setElementsChecked] = useState(false);
  const [orderChecked, setOrderChecked] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragTargetId, setDragTargetId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeFinalSceneIndex, setActiveFinalSceneIndex] = useState(0);
  const stageRef = useRef<HTMLElement>(null);
  const scenePlannerRef = useRef<HTMLElement>(null);

  const story = useMemo(() => getLessonTwoStory(progress.storyId), [progress.storyId]);
  const orderedEvents = useMemo(
    () => story
      ? progress.eventOrder
        .map((id) => findEvent(story.events, id))
        .filter((event): event is LessonTwoEvent => Boolean(event))
      : [],
    [progress.eventOrder, story],
  );

  const charactersCorrect = story
    ? sameSelection(progress.selectedCharacterIds, story.characters)
    : false;
  const backgroundsCorrect = story
    ? sameSelection(progress.selectedBackgroundIds, story.backgrounds)
    : false;
  const elementAnswersCorrect = charactersCorrect && backgroundsCorrect;
  const correctEventIds = story
    ? [...story.events]
      .sort((a, b) => a.correctOrder - b.correctOrder)
      .map((event) => event.id)
    : [];
  const eventOrderCorrect = correctEventIds.length === 6
    && correctEventIds.every((id, index) => progress.eventOrder[index] === id);
  const scenesReady = story
    ? story.events.every((event) => {
      const plan = progress.scenePlanByEventId[event.id];
      return Boolean(plan?.characters && plan.place && plan.mood && plan.detail);
    })
    : false;
  const completedSceneCount = story
    ? story.events.filter((event) => {
      const plan = progress.scenePlanByEventId[event.id];
      return Boolean(plan?.characters && plan.place && plan.mood && plan.detail);
    }).length
    : 0;
  const activeScene = orderedEvents[activeSceneIndex] ?? null;
  const activeScenePlan = activeScene
    ? progress.scenePlanByEventId[activeScene.id]
    : undefined;
  const activeSceneReady = Boolean(
    activeScenePlan?.characters
    && activeScenePlan.place
    && activeScenePlan.mood
    && activeScenePlan.detail,
  );

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    writeLessonTwoProgress(progress);
  }, [progress]);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEYS.lessonTwoProgress) return;
      setProgress(readLessonTwoProgress());
      setElementsChecked(false);
      setOrderChecked(false);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const update = (patch: Partial<LessonTwoProgress>) => {
    setProgress((current) => ({
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    }));
  };

  const setStep = (step: number) => {
    if (step === 3) setActiveSceneIndex(0);
    if (step === 4) setActiveFinalSceneIndex(0);
    update({ step });
    setAnnouncement(`${stepLabels[step]} 단계입니다.`);
    scrollToTop();
    window.requestAnimationFrame(() => {
      const heading = stageRef.current?.querySelector<HTMLElement>('#lesson-two-stage-title');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    });
  };

  const selectStory = (storyId: LessonTwoStoryId) => {
    if (progress.storyId === storyId) return;
    const nextStory = getLessonTwoStory(storyId);
    if (!nextStory) return;
    setElementsChecked(false);
    setOrderChecked(false);
    setProgress({
      ...initialLessonTwoProgress,
      storyId,
      eventOrder: shuffledEventIds(nextStory),
      updatedAt: new Date().toISOString(),
    });
  };

  const toggleElement = (kind: 'character' | 'background', id: string) => {
    setElementsChecked(false);
    const key = kind === 'character' ? 'selectedCharacterIds' : 'selectedBackgroundIds';
    const selected = progress[key];
    update({
      [key]: selected.includes(id)
        ? selected.filter((item) => item !== id)
        : [...selected, id],
    } as Pick<LessonTwoProgress, typeof key>);
  };

  const reorderEvent = (sourceId: string, targetId: string) => {
    const sourceIndex = progress.eventOrder.indexOf(sourceId);
    const targetIndex = progress.eventOrder.indexOf(targetId);
    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return;

    const nextOrder = [...progress.eventOrder];
    const [moved] = nextOrder.splice(sourceIndex, 1);
    nextOrder.splice(targetIndex, 0, moved);
    update({ eventOrder: nextOrder, orderConfirmed: false });
    setOrderChecked(false);
    setAnnouncement(`${sourceIndex + 1}번 사건을 ${targetIndex + 1}번 자리로 옮겼어요.`);
  };

  const moveEvent = (id: string, direction: -1 | 1) => {
    const sourceIndex = progress.eventOrder.indexOf(id);
    const targetIndex = sourceIndex + direction;
    if (sourceIndex < 0 || targetIndex < 0 || targetIndex >= progress.eventOrder.length) return;
    reorderEvent(id, progress.eventOrder[targetIndex]);
  };

  const handleDragStart = (event: DragEvent<HTMLElement>, id: string) => {
    setDraggedId(id);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (event: DragEvent<HTMLElement>, targetId: string) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData('text/plain') || draggedId;
    if (sourceId) reorderEvent(sourceId, targetId);
    setDraggedId(null);
    setDragTargetId(null);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>, id: string) => {
    if (event.pointerType === 'mouse') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggedId(id);
    setDragTargetId(id);
    setAnnouncement('카드를 움직인 뒤 원하는 자리에서 손을 떼세요.');
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!draggedId || event.pointerType === 'mouse') return;
    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>('[data-event-id]');
    if (target?.dataset.eventId) setDragTargetId(target.dataset.eventId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!draggedId || event.pointerType === 'mouse') return;
    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>('[data-event-id]');
    const targetId = target?.dataset.eventId || dragTargetId;
    if (targetId) reorderEvent(draggedId, targetId);
    setDraggedId(null);
    setDragTargetId(null);
  };

  const handleReorderKeyDown = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      moveEvent(id, -1);
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveEvent(id, 1);
    }
  };

  const checkOrder = () => {
    const nextAttempts = progress.orderAttempts + (eventOrderCorrect ? 0 : 1);
    update({ orderAttempts: nextAttempts, orderConfirmed: eventOrderCorrect });
    setOrderChecked(true);
    setAnnouncement(
      eventOrderCorrect
        ? '사건 여섯 개를 이야기 순서대로 모두 놓았어요.'
        : '주황색으로 표시된 사건의 앞뒤를 다시 생각해 보세요.',
    );
  };

  const chooseSceneOption = (
    eventId: string,
    field: keyof LessonTwoScenePlan,
    value: string,
  ) => {
    const currentPlan = progress.scenePlanByEventId[eventId] || {
      characters: '',
      place: '',
      mood: '',
      detail: '',
    };
    update({
      scenePlanByEventId: {
        ...progress.scenePlanByEventId,
        [eventId]: { ...currentPlan, [field]: value },
      },
    });
  };

  const goToScene = (index: number) => {
    const nextIndex = Math.max(0, Math.min(orderedEvents.length - 1, index));
    setActiveSceneIndex(nextIndex);
    setAnnouncement(`장면 ${nextIndex + 1} 기획입니다.`);
    window.setTimeout(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      scenePlannerRef.current?.scrollIntoView({
        block: 'start',
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    }, 0);
  };

  const reset = () => {
    setProgress({ ...initialLessonTwoProgress, updatedAt: new Date().toISOString() });
    setElementsChecked(false);
    setOrderChecked(false);
    setAnnouncement('2차시 활동을 처음으로 되돌렸어요.');
    scrollToTop();
  };

  return (
    <AppShell compact>
      <main className="lesson-two-page">
        <header className="lesson-two-topbar">
          <div>
            <span className="lesson-two-kicker">2차시 · LOOK · 이야기의 구조</span>
            <h1>우리가 만들 이야기 정하기</h1>
          </div>
          <Link className="lesson-two-home-link no-print" to="/">10차시 목록</Link>
        </header>

        <div className="lesson-two-workspace">
          <aside className="lesson-two-progress no-print" aria-label="2차시 활동 단계">
            <span className="lesson-two-progress-mobile">{progress.step + 1} / 5 · {stepLabels[progress.step]}</span>
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
            {story && (
              <div className="lesson-two-current-story">
                <small>선택한 이야기</small>
                <strong>{story.title}</strong>
                <span>{story.theme}</span>
              </div>
            )}
          </aside>

          <section ref={stageRef} className="lesson-two-stage" aria-labelledby="lesson-two-stage-title">
            <p className="lesson-two-sr-only" aria-live="polite">{announcement}</p>

            {progress.step === 0 && (
              <>
                <div className="lesson-two-heading">
                  <span>활동 1 · 이야기 선택</span>
                  <h2 id="lesson-two-stage-title">우리 모둠이 만들 옛이야기를 골라 보세요.</h2>
                  <p>세 이야기 가운데 하나를 누르면 인물과 사건을 살펴볼 수 있어요.</p>
                </div>
                <div className="lesson-two-story-list" role="group" aria-label="옛이야기 선택">
                  {lessonTwoStories.map((item, index) => {
                    const selected = progress.storyId === item.id;
                    return (
                      <button
                        type="button"
                        className={selected ? 'lesson-two-story-option is-selected' : 'lesson-two-story-option'}
                        key={item.id}
                        onClick={() => selectStory(item.id)}
                        aria-pressed={selected}
                      >
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <small>{item.theme}</small>
                        <strong>{item.title}</strong>
                        <span className="lesson-two-story-summary">{item.summary}</span>
                        <em>{selected ? '이 이야기로 선택함' : '이야기 선택하기'}</em>
                      </button>
                    );
                  })}
                </div>
                {story && (
                  <article className="lesson-two-reading" aria-labelledby="lesson-two-reading-title">
                    <header>
                      <span>선택한 이야기 · 함께 읽기</span>
                      <h3 id="lesson-two-reading-title">{story.title}</h3>
                    </header>
                    <div>
                      {story.readingParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <footer>{story.sourceNote}</footer>
                  </article>
                )}
                <div className="lesson-two-note">
                  <strong>알아두기</strong>
                  <p>여러 판본 가운데 수업용으로 순화한 고정 이야기를 사용합니다.</p>
                </div>
                <div className="lesson-two-actions no-print">
                  <Link className="lesson-two-button is-quiet" to="/">이전</Link>
                  <button
                    type="button"
                    className="lesson-two-button is-primary"
                    disabled={!story}
                    onClick={() => setStep(1)}
                  >
                    인물과 배경 찾기
                  </button>
                </div>
              </>
            )}

            {progress.step === 1 && story && (
              <>
                <div className="lesson-two-heading">
                  <span>활동 2 · 인물과 배경</span>
                  <h2 id="lesson-two-stage-title">이야기에 나오는 인물과 장소를 모두 찾아보세요.</h2>
                  <p>낱말을 눌러 고른 뒤 선택을 확인하세요.</p>
                </div>
                <div className="lesson-two-element-groups">
                  <fieldset>
                    <legend><span>01</span> 누가 나오나요?</legend>
                    <div className="lesson-two-chip-list">
                      {story.characters.map((choice) => {
                        const selected = progress.selectedCharacterIds.includes(choice.id);
                        const review = elementsChecked && selected && !choice.correct;
                        return (
                          <button
                            type="button"
                            key={choice.id}
                            className={`${selected ? 'is-selected' : ''} ${review ? 'needs-review' : ''}`}
                            aria-pressed={selected}
                            onClick={() => toggleElement('character', choice.id)}
                          >
                            {choice.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend><span>02</span> 어디에서 일어나나요?</legend>
                    <div className="lesson-two-chip-list">
                      {story.backgrounds.map((choice) => {
                        const selected = progress.selectedBackgroundIds.includes(choice.id);
                        const review = elementsChecked && selected && !choice.correct;
                        return (
                          <button
                            type="button"
                            key={choice.id}
                            className={`${selected ? 'is-selected' : ''} ${review ? 'needs-review' : ''}`}
                            aria-pressed={selected}
                            onClick={() => toggleElement('background', choice.id)}
                          >
                            {choice.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
                {elementsChecked && (
                  <div
                    className={elementAnswersCorrect ? 'lesson-two-feedback is-success' : 'lesson-two-feedback is-review'}
                    role="status"
                  >
                    <strong>{elementAnswersCorrect ? '인물과 배경을 모두 찾았어요.' : '이야기에 실제로 나왔는지 다시 생각해 보세요.'}</strong>
                    {!elementAnswersCorrect && (
                      <span>
                        인물 {story.characters.filter((item) => item.correct).length}개와 장소 {story.backgrounds.filter((item) => item.correct).length}개를 찾아요.
                      </span>
                    )}
                  </div>
                )}
                <div className="lesson-two-actions no-print">
                  <button type="button" className="lesson-two-button is-quiet" onClick={() => setStep(0)}>이전</button>
                  {!elementsChecked || !elementAnswersCorrect ? (
                    <button
                      type="button"
                      className="lesson-two-button is-primary"
                      disabled={progress.selectedCharacterIds.length === 0 || progress.selectedBackgroundIds.length === 0}
                      onClick={() => setElementsChecked(true)}
                    >
                      선택 확인하기
                    </button>
                  ) : (
                    <button type="button" className="lesson-two-button is-primary" onClick={() => setStep(2)}>사건 순서 놓기</button>
                  )}
                </div>
              </>
            )}

            {progress.step === 2 && story && (
              <>
                <div className="lesson-two-heading">
                  <span>활동 3 · 사건 순서</span>
                  <h2 id="lesson-two-stage-title">먼저 일어난 일부터 차례대로 놓아 보세요.</h2>
                  <p>카드를 끌거나 앞·뒤 버튼을 눌러 순서를 바꿀 수 있어요.</p>
                </div>
                <div className="lesson-two-event-grid" aria-label="사건 카드 순서">
                  {orderedEvents.map((item, index) => {
                    const correctHere = item.id === correctEventIds[index];
                    const statusClass = orderChecked
                      ? (correctHere ? 'is-correct' : 'needs-review')
                      : '';
                    return (
                      <article
                        className={`lesson-two-event-card ${statusClass} ${draggedId === item.id ? 'is-dragging' : ''} ${dragTargetId === item.id ? 'is-drag-target' : ''}`}
                        key={item.id}
                        data-event-id={item.id}
                        onDragEnter={() => setDragTargetId(item.id)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => handleDrop(event, item.id)}
                      >
                        <div className="lesson-two-event-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                        <p>{item.text}</p>
                        <div className="lesson-two-reorder-controls no-print">
                          <button
                            type="button"
                            className="lesson-two-drag-handle"
                            draggable
                            aria-label={`${item.text} 카드를 끌어서 순서 이동`}
                            onDragStart={(event) => handleDragStart(event, item.id)}
                            onDragEnd={() => { setDraggedId(null); setDragTargetId(null); }}
                            onClick={() => setAnnouncement('방향키나 앞·뒤 버튼으로도 카드를 옮길 수 있어요.')}
                            onKeyDown={(event) => handleReorderKeyDown(event, item.id)}
                            onPointerDown={(event) => handlePointerDown(event, item.id)}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={() => { setDraggedId(null); setDragTargetId(null); }}
                          >
                            끌어서 이동
                          </button>
                          <button
                            type="button"
                            disabled={index === 0}
                            aria-label={`${item.text} 카드를 한 칸 앞으로 이동`}
                            onClick={() => moveEvent(item.id, -1)}
                          >
                            한 칸 앞
                          </button>
                          <button
                            type="button"
                            disabled={index === orderedEvents.length - 1}
                            aria-label={`${item.text} 카드를 한 칸 뒤로 이동`}
                            onClick={() => moveEvent(item.id, 1)}
                          >
                            한 칸 뒤
                          </button>
                        </div>
                        {orderChecked && (
                          <small>{correctHere ? '잘 놓았어요' : '앞뒤를 다시 생각해요'}</small>
                        )}
                      </article>
                    );
                  })}
                </div>
                {orderChecked && (
                  <div
                    className={eventOrderCorrect ? 'lesson-two-feedback is-success' : 'lesson-two-feedback is-review'}
                    role="status"
                  >
                    <strong>{eventOrderCorrect ? '사건 여섯 개를 순서대로 모두 놓았어요.' : '주황색 사건의 앞뒤를 다시 살펴보세요.'}</strong>
                    {!eventOrderCorrect && progress.orderAttempts >= 1 && <span>첫 장면: {story.events.find((event) => event.correctOrder === 1)?.text}</span>}
                    {!eventOrderCorrect && progress.orderAttempts >= 2 && <span>마지막 장면: {story.events.find((event) => event.correctOrder === 6)?.text}</span>}
                  </div>
                )}
                <div className="lesson-two-actions no-print">
                  <button type="button" className="lesson-two-button is-quiet" onClick={() => setStep(1)}>이전</button>
                  {!eventOrderCorrect || !progress.orderConfirmed ? (
                    <button type="button" className="lesson-two-button is-primary" disabled={orderedEvents.length !== 6} onClick={checkOrder}>순서 확인하기</button>
                  ) : (
                    <button type="button" className="lesson-two-button is-primary" onClick={() => setStep(3)}>여섯 장면 만들기</button>
                  )}
                </div>
              </>
            )}

            {progress.step === 3 && story && activeScene && (
              <>
                <div className="lesson-two-heading">
                  <span>활동 4 · 우리 그림책 기획</span>
                  <h2 id="lesson-two-stage-title">장면을 하나씩 그림책처럼 계획해 보세요.</h2>
                  <p>정답은 없어요. 우리 모둠이 그리고 싶은 모습을 고르면 돼요.</p>
                </div>

                <nav className="lesson-two-scene-tabs no-print" aria-label="기획할 장면 선택">
                  {orderedEvents.map((item, index) => {
                    const plan = progress.scenePlanByEventId[item.id];
                    const complete = Boolean(plan?.characters && plan.place && plan.mood && plan.detail);
                    return (
                      <button
                        type="button"
                        key={item.id}
                        className={`${activeSceneIndex === index ? 'is-active' : ''} ${complete ? 'is-complete' : ''}`}
                        aria-current={activeSceneIndex === index ? 'step' : undefined}
                        aria-label={`장면 ${index + 1}${complete ? ', 기획 완료' : ''}`}
                        onClick={() => goToScene(index)}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                  <span>{completedSceneCount} / 6 장면 완성</span>
                </nav>

                <article ref={scenePlannerRef} className="lesson-two-scene-planner" aria-labelledby={`scene-${activeScene.id}-title`}>
                  <header>
                    <span>{String(activeSceneIndex + 1).padStart(2, '0')} / 06</span>
                    <div>
                      <small>이 장면의 사건</small>
                      <h3 id={`scene-${activeScene.id}-title`}>{activeScene.text}</h3>
                    </div>
                  </header>

                  <div className="lesson-two-planning-groups">
                    {([
                      { field: 'characters' as const, label: '누가 보이나요?', options: activeScene.planning.characters },
                      { field: 'place' as const, label: '어디에서 일어나요?', options: activeScene.planning.places },
                      { field: 'mood' as const, label: '어떤 느낌으로 그릴까요?', options: activeScene.planning.moods },
                      { field: 'detail' as const, label: '무엇을 크게 보여 줄까요?', options: activeScene.planning.details },
                    ]).map((group, groupIndex) => (
                      <fieldset key={group.field}>
                        <legend><span>{groupIndex + 1}</span>{group.label}</legend>
                        <div>
                          {group.options.map((option) => {
                            const selected = activeScenePlan?.[group.field] === option;
                            return (
                              <button
                                type="button"
                                key={option}
                                className={selected ? 'is-selected' : ''}
                                aria-pressed={selected}
                                onClick={() => chooseSceneOption(activeScene.id, group.field, option)}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                    ))}
                  </div>

                  <footer className="lesson-two-scene-navigation no-print">
                    <button
                      type="button"
                      disabled={activeSceneIndex === 0}
                      onClick={() => goToScene(activeSceneIndex - 1)}
                    >
                      이전 장면
                    </button>
                    {activeSceneIndex < orderedEvents.length - 1 ? (
                      <button
                        type="button"
                        className="is-primary"
                        disabled={!activeSceneReady}
                        onClick={() => goToScene(activeSceneIndex + 1)}
                      >
                        다음 장면
                      </button>
                    ) : (
                      <span>{activeSceneReady ? '여섯 장면을 다 확인했어요.' : '네 가지를 모두 골라 보세요.'}</span>
                    )}
                  </footer>
                </article>

                <div className="lesson-two-actions no-print">
                  <button type="button" className="lesson-two-button is-quiet" onClick={() => setStep(2)}>사건 순서로</button>
                  <button
                    type="button"
                    className="lesson-two-button is-primary"
                    disabled={!scenesReady}
                    onClick={() => {
                      update({ completed: true });
                      setStep(4);
                    }}
                  >
                    우리 그림책 기획판 보기
                  </button>
                </div>
              </>
            )}

            {progress.step === 4 && story && (
              <>
                <div className="lesson-two-completion-heading">
                  <span>2차시 완료</span>
                  <strong aria-hidden="true">02</strong>
                  <h2 id="lesson-two-stage-title">{story.title} 그림책 기획판을 완성했어요.</h2>
                  <p>우리 모둠이 고른 인물, 장소, 느낌, 그릴 모습이 여섯 장면에 담겼어요.</p>
                </div>

                <nav className="lesson-two-final-tabs no-print" aria-label="완성한 장면 보기">
                  {orderedEvents.map((item, index) => (
                    <button
                      type="button"
                      key={item.id}
                      className={activeFinalSceneIndex === index ? 'is-active' : ''}
                      aria-current={activeFinalSceneIndex === index ? 'step' : undefined}
                      onClick={() => setActiveFinalSceneIndex(index)}
                    >
                      장면 {index + 1}
                    </button>
                  ))}
                </nav>

                <ol className="lesson-two-final-board">
                  {orderedEvents.map((item, index) => {
                    const plan = progress.scenePlanByEventId[item.id];
                    return (
                      <li
                        key={item.id}
                        className={activeFinalSceneIndex === index ? 'is-active' : ''}
                        aria-labelledby={`final-scene-${item.id}`}
                      >
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <p id={`final-scene-${item.id}`}>{item.text}</p>
                        <dl>
                          <div><dt>누가</dt><dd>{plan?.characters}</dd></div>
                          <div><dt>어디</dt><dd>{plan?.place}</dd></div>
                          <div><dt>느낌</dt><dd>{plan?.mood}</dd></div>
                          <div><dt>그릴 모습</dt><dd>{plan?.detail}</dd></div>
                        </dl>
                      </li>
                    );
                  })}
                </ol>
                <blockquote className="lesson-two-concept">
                  <strong>오늘의 발견</strong>
                  <p>같은 이야기도 누가·어디서·어떤 모습인지 다르게 고르면 우리만의 그림책이 돼요.</p>
                  <small>오늘 만든 기획판은 다음 수업에서 그림책 장면을 만들 때 사용해요.</small>
                </blockquote>
                <div className="lesson-two-actions lesson-two-completion-actions no-print">
                  <button type="button" className="lesson-two-button is-quiet" onClick={() => window.print()}>기획판 인쇄하기</button>
                  <Link className="lesson-two-button is-primary" to="/">차시 목록으로</Link>
                  <button type="button" className="lesson-two-reset" onClick={reset}>처음부터 다시 하기</button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </AppShell>
  );
}

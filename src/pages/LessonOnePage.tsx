import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import ProgressRail from '../components/ProgressRail';
import RainyAlleyIllustration from '../components/RainyAlleyIllustration';
import SketchPad from '../components/SketchPad';
import { aiScenes, imaginationOptions, lessonOnePrompt } from '../data/lesson1';
import type { LessonOneProgress } from '../types';
import { initialProgress, isLessonOpen, readProgress, STORAGE_KEYS, writeProgress } from '../utils/storage';

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <fieldset className="choice-fieldset">
      <legend>{label}</legend>
      <div className="choice-pills">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={value === option ? 'choice-pill selected' : 'choice-pill'}
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function LessonOnePage() {
  const [progress, setProgress] = useState<LessonOneProgress>(() => readProgress());
  const [checkedAi, setCheckedAi] = useState(false);
  const [conceptChecked, setConceptChecked] = useState(false);
  const [lessonOpen, setLessonOpen] = useState(() => isLessonOpen());
  const [demoImage, setDemoImage] = useState(() => localStorage.getItem(STORAGE_KEYS.demoImage) || '');

  useEffect(() => {
    writeProgress(progress);
  }, [progress]);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.progress) {
        setProgress(readProgress());
        setCheckedAi(false);
        setConceptChecked(false);
      }
      if (event.key === STORAGE_KEYS.lessonOpen) setLessonOpen(isLessonOpen());
      if (event.key === STORAGE_KEYS.demoImage) {
        setDemoImage(localStorage.getItem(STORAGE_KEYS.demoImage) || '');
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const aiResult = useMemo(() => {
    const correctIds = aiScenes.filter((scene) => scene.usesAi).map((scene) => scene.id);
    const selected = progress.selectedAiScenes;
    const correctSelected = selected.filter((id) => correctIds.includes(id as (typeof correctIds)[number])).length;
    const incorrectSelected = selected.filter((id) => !correctIds.includes(id as (typeof correctIds)[number])).length;
    return {
      correct: correctSelected === correctIds.length && incorrectSelected === 0,
      count: correctSelected,
      total: correctIds.length,
    };
  }, [progress.selectedAiScenes]);

  const update = (patch: Partial<LessonOneProgress>) => {
    setProgress((current) => ({ ...current, ...patch }));
  };

  const setStep = (step: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    update({ step });
  };

  const toggleScene = (id: string) => {
    setCheckedAi(false);
    const next = progress.selectedAiScenes.includes(id)
      ? progress.selectedAiScenes.filter((item) => item !== id)
      : [...progress.selectedAiScenes, id];
    update({ selectedAiScenes: next });
  };

  const imaginationReady = Boolean(
    progress.imagination.expression &&
      progress.imagination.time &&
      progress.imagination.mood &&
      progress.imagination.rain,
  );

  const comparisonReady = progress.samePoint.trim().length > 1 && progress.differentPoint.trim().length > 1;
  const conceptCorrect = progress.humanBasis === '경험과 기억' && progress.aiBasis === '학습한 데이터';

  const reset = () => {
    setProgress({ ...initialProgress, updatedAt: new Date().toISOString() });
    setCheckedAi(false);
    setConceptChecked(false);
  };

  if (!lessonOpen) {
    return (
      <AppShell>
        <main className="center-page">
          <div className="waiting-panel">
            <span className="eyebrow">1차시 수업 대기</span>
            <h1>선생님이 활동을 준비하고 있어요.</h1>
            <p>화면이 열리면 새로고침한 뒤 시작해 주세요.</p>
            <button className="button primary" onClick={() => setLessonOpen(isLessonOpen())}>다시 확인하기</button>
          </div>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell compact>
      <main className="lesson-page">
        <section className="lesson-topbar">
          <div>
            <span className="eyebrow">1차시 · LOOK</span>
            <h1>사람과 AI, 누가 더 잘 볼까?</h1>
          </div>
          <Link className="text-link no-print" to="/">10차시 목록</Link>
        </section>

        <ProgressRail current={progress.step - 1} />

        {progress.step === 0 && (
          <section className="activity-stage intro-stage">
            <div className="intro-copy">
              <span className="stage-label">오늘의 질문</span>
              <h2>같은 문장을 들어도 사람과 AI는 똑같이 이해할까요?</h2>
              <p>
                생활 속 AI를 찾아보고, 내가 상상한 그림과 AI가 만든 그림을 비교하면서
                사람과 AI가 정보를 이해하는 방식의 차이를 알아봅니다.
              </p>
              <div className="goal-list">
                <div><span>01</span><strong>생활 속 AI 활용 장면 찾기</strong></div>
                <div><span>02</span><strong>사람의 상상과 AI 결과 비교하기</strong></div>
                <div><span>03</span><strong>경험과 데이터의 차이 설명하기</strong></div>
              </div>
              <button className="button primary large" onClick={() => setStep(1)}>활동 시작하기</button>
            </div>
            <div className="intro-symbol" aria-hidden="true">
              <div className="human-bubble">내 경험</div>
              <div className="question-orbit">?</div>
              <div className="ai-bubble">학습 데이터</div>
            </div>
          </section>
        )}

        {progress.step === 1 && (
          <section className="activity-stage">
            <div className="stage-heading">
              <span className="stage-label">활동 1 · AI 찾기</span>
              <h2>AI가 쓰이는 장면이라고 생각하는 것을 모두 선택하세요.</h2>
              <p>자동으로 움직인다고 해서 모두 AI는 아닙니다. 무엇을 구별하거나 판단하는지 생각해 보세요.</p>
            </div>
            <div className="scene-grid">
              {aiScenes.map((scene) => {
                const selected = progress.selectedAiScenes.includes(scene.id);
                const status = checkedAi
                  ? scene.usesAi === selected
                    ? 'correct'
                    : 'wrong'
                  : '';
                return (
                  <button
                    type="button"
                    className={`scene-card ${selected ? 'selected' : ''} ${status}`}
                    key={scene.id}
                    onClick={() => toggleScene(scene.id)}
                    aria-pressed={selected}
                  >
                    <span className="scene-icon">{scene.icon}</span>
                    <strong>{scene.title}</strong>
                    <small>{scene.description}</small>
                    <span className="check-mark">{selected ? '선택됨' : '선택하기'}</span>
                    {checkedAi && <em>{scene.reason}</em>}
                  </button>
                );
              })}
            </div>
            {checkedAi && (
              <div className={aiResult.correct ? 'feedback success' : 'feedback notice'} role="status" aria-live="polite">
                <strong>{aiResult.correct ? '모두 잘 찾았습니다!' : `${aiResult.total}개 중 ${aiResult.count}개의 AI 장면을 찾았어요.`}</strong>
                <span>카드 아래 설명을 읽고 선택을 다시 살펴봐도 좋습니다.</span>
              </div>
            )}
            <div className="stage-actions">
              <button className="button ghost" onClick={() => setStep(0)}>이전</button>
              {!checkedAi ? (
                <button
                  className="button primary"
                  disabled={progress.selectedAiScenes.length === 0}
                  onClick={() => setCheckedAi(true)}
                >
                  선택 확인하기
                </button>
              ) : (
                <button className="button primary" onClick={() => setStep(2)}>다음 활동</button>
              )}
            </div>
          </section>
        )}

        {progress.step === 2 && (
          <section className="activity-stage">
            <div className="stage-heading">
              <span className="stage-label">활동 2 · 내 상상</span>
              <h2>문장을 읽고 머릿속에 떠오른 장면을 표현하세요.</h2>
            </div>
            <blockquote className="prompt-card">“{lessonOnePrompt}”</blockquote>
            <div className="imagination-layout">
              <div className="option-panel">
                <ChoiceGroup
                  label="아이의 표정"
                  options={imaginationOptions.expression}
                  value={progress.imagination.expression}
                  onChange={(expression) => update({ imagination: { ...progress.imagination, expression } })}
                />
                <ChoiceGroup
                  label="시간"
                  options={imaginationOptions.time}
                  value={progress.imagination.time}
                  onChange={(time) => update({ imagination: { ...progress.imagination, time } })}
                />
                <ChoiceGroup
                  label="골목의 분위기"
                  options={imaginationOptions.mood}
                  value={progress.imagination.mood}
                  onChange={(mood) => update({ imagination: { ...progress.imagination, mood } })}
                />
                <ChoiceGroup
                  label="비의 모습"
                  options={imaginationOptions.rain}
                  value={progress.imagination.rain}
                  onChange={(rain) => update({ imagination: { ...progress.imagination, rain } })}
                />
                <label className="text-field">
                  <span>내가 더 떠올린 것</span>
                  <textarea
                    value={progress.imagination.note}
                    onChange={(event) => update({ imagination: { ...progress.imagination, note: event.target.value } })}
                    placeholder="골목에 있던 물건, 들릴 것 같은 소리, 아이의 마음 등을 자유롭게 적어 보세요."
                    maxLength={160}
                  />
                </label>
              </div>
              <SketchPad
                value={progress.imagination.sketch}
                onChange={(sketch) => update({ imagination: { ...progress.imagination, sketch } })}
              />
            </div>
            <div className="stage-actions">
              <button className="button ghost" onClick={() => setStep(1)}>이전</button>
              <button className="button primary" disabled={!imaginationReady} onClick={() => setStep(3)}>
                AI 그림과 비교하기
              </button>
            </div>
          </section>
        )}

        {progress.step === 3 && (
          <section className="activity-stage">
            <div className="stage-heading">
              <span className="stage-label">활동 3 · 그림 비교</span>
              <h2>내가 상상한 장면과 AI가 만든 장면을 나란히 살펴보세요.</h2>
              <p>어느 그림이 더 좋은지 고르는 것이 아니라, 눈에 보이는 같은 점과 다른 점을 찾는 활동입니다.</p>
            </div>
            <div className="compare-grid">
              <article className="compare-panel">
                <div className="compare-title"><span>사람</span><strong>내가 상상한 그림</strong></div>
                {progress.imagination.sketch ? (
                  <img src={progress.imagination.sketch} alt="학생이 그린 상상 장면" />
                ) : (
                  <div className="text-imagination">
                    <strong>{progress.imagination.time}, {progress.imagination.rain}</strong>
                    <p>{progress.imagination.expression} · {progress.imagination.mood}</p>
                    <small>{progress.imagination.note || '추가 메모 없음'}</small>
                  </div>
                )}
              </article>
              <article className="compare-panel">
                <div className="compare-title"><span>AI</span><strong>{demoImage ? 'AI가 만든 그림' : '비교용 예시 이미지'}</strong></div>
                {demoImage ? (
                  <img src={demoImage} alt="교사가 등록한 AI 생성 이미지" />
                ) : (
                  <RainyAlleyIllustration compact />
                )}
              </article>
            </div>
            <div className="compare-writing">
              <label className="text-field">
                <span>같았던 점</span>
                <textarea
                  value={progress.samePoint}
                  onChange={(event) => update({ samePoint: event.target.value })}
                  placeholder="예: 두 그림 모두 빨간 우산과 골목길이 있어요."
                  maxLength={180}
                />
              </label>
              <label className="text-field">
                <span>달랐던 점</span>
                <textarea
                  value={progress.differentPoint}
                  onChange={(event) => update({ differentPoint: event.target.value })}
                  placeholder="예: 나는 낮을 떠올렸지만 AI 그림은 저녁처럼 어두워요."
                  maxLength={180}
                />
              </label>
            </div>
            <div className="stage-actions">
              <button className="button ghost" onClick={() => setStep(2)}>이전</button>
              <button className="button primary" disabled={!comparisonReady} onClick={() => setStep(4)}>
                왜 달랐는지 알아보기
              </button>
            </div>
          </section>
        )}

        {progress.step === 4 && (
          <section className="activity-stage concept-stage">
            <div className="stage-heading">
              <span className="stage-label">활동 4 · 이해 방식</span>
              <h2>사람과 AI가 장면을 이해할 때 바탕이 되는 것을 골라 보세요.</h2>
            </div>
            <div className="concept-columns">
              <article className="concept-card human-card">
                <span className="concept-icon">사람</span>
                <h3>사람은 무엇을 떠올리며 생각할까요?</h3>
                {['경험과 기억', '학습한 데이터', '정해진 스위치'].map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={progress.humanBasis === option ? 'concept-choice selected' : 'concept-choice'}
                    aria-pressed={progress.humanBasis === option}
                    onClick={() => {
                      setConceptChecked(false);
                      update({ humanBasis: option });
                    }}
                  >
                    {option}
                  </button>
                ))}
              </article>
              <article className="concept-card ai-card">
                <span className="concept-icon">AI</span>
                <h3>AI는 무엇에서 비슷한 특징을 찾을까요?</h3>
                {['내 기분', '학습한 데이터', '우연한 선택'].map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={progress.aiBasis === option ? 'concept-choice selected' : 'concept-choice'}
                    aria-pressed={progress.aiBasis === option}
                    onClick={() => {
                      setConceptChecked(false);
                      update({ aiBasis: option });
                    }}
                  >
                    {option}
                  </button>
                ))}
              </article>
            </div>
            {conceptChecked && (
              <div className={conceptCorrect ? 'feedback success' : 'feedback notice'} role="status" aria-live="polite">
                <strong>{conceptCorrect ? '핵심을 정확히 찾았습니다.' : '두 그림을 만들 때 무엇을 바탕으로 했는지 다시 생각해 보세요.'}</strong>
                <span>사람은 경험과 기억을 떠올리고, AI는 학습한 데이터에서 비슷한 특징을 찾습니다.</span>
              </div>
            )}
            <label className="text-field reflection-field">
              <span>오늘 새롭게 알게 된 점</span>
              <textarea
                value={progress.reflection}
                onChange={(event) => update({ reflection: event.target.value })}
                placeholder="한 문장으로 정리해 보세요."
                maxLength={180}
              />
            </label>
            <div className="stage-actions">
              <button className="button ghost" onClick={() => setStep(3)}>이전</button>
              {!conceptChecked || !conceptCorrect ? (
                <button
                  className="button primary"
                  disabled={!progress.humanBasis || !progress.aiBasis}
                  onClick={() => setConceptChecked(true)}
                >
                  선택 확인하기
                </button>
              ) : (
                <button
                  className="button primary"
                  disabled={progress.reflection.trim().length < 2}
                  onClick={() => {
                    update({ completed: true });
                    setStep(5);
                  }}
                >
                  1차시 마무리
                </button>
              )}
            </div>
          </section>
        )}

        {progress.step === 5 && (
          <section className="activity-stage completion-stage">
            <span className="completion-mark">✓</span>
            <span className="eyebrow">1차시 완료</span>
            <h2>사람은 경험으로, AI는 데이터로 이해합니다.</h2>
            <div className="completion-summary">
              <div>
                <span>생활 속 AI</span>
                <strong>{progress.selectedAiScenes.length}개 장면을 살펴봄</strong>
              </div>
              <div>
                <span>같았던 점</span>
                <strong>{progress.samePoint}</strong>
              </div>
              <div>
                <span>달랐던 점</span>
                <strong>{progress.differentPoint}</strong>
              </div>
              <div>
                <span>나의 한 문장</span>
                <strong>{progress.reflection}</strong>
              </div>
            </div>
            <div className="completion-actions no-print">
              <button className="button secondary" onClick={() => window.print()}>내 활동 인쇄하기</button>
              <Link className="button primary" to="/">차시 목록으로</Link>
              <button className="text-button danger" onClick={reset}>처음부터 다시 하기</button>
            </div>
          </section>
        )}
      </main>
    </AppShell>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import ProgressRail from '../components/ProgressRail';
import { aiScenes, functionCases, functionOptions } from '../data/lesson1';
import type { AiFunction, LessonOneProgress } from '../types';
import { initialProgress, readProgress, STORAGE_KEYS, writeProgress } from '../utils/storage';

export default function LessonOnePage() {
  const [progress, setProgress] = useState<LessonOneProgress>(() => readProgress());
  const [checkedAi, setCheckedAi] = useState(false);
  const [checkedFunctions, setCheckedFunctions] = useState(false);
  const [conceptChecked, setConceptChecked] = useState(false);

  useEffect(() => {
    writeProgress(progress);
  }, [progress]);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEYS.progress) return;
      setProgress(readProgress());
      setCheckedAi(false);
      setCheckedFunctions(false);
      setConceptChecked(false);
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

  const functionResult = useMemo(
    () => functionCases.filter((item) => progress.functionAnswers[item.id] === item.category).length,
    [progress.functionAnswers],
  );

  const selectedEvidenceCase = functionCases.find((item) => item.id === progress.evidenceCase);
  const functionReady = functionCases.every((item) => Boolean(progress.functionAnswers[item.id]));
  const conceptCorrect =
    progress.aiBasis === '학습된 데이터의 특징' && progress.automaticBasis === '정해진 조건과 순서';

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

  const setFunctionAnswer = (id: string, category: AiFunction) => {
    setCheckedFunctions(false);
    update({ functionAnswers: { ...progress.functionAnswers, [id]: category } });
  };

  const reset = () => {
    setProgress({ ...initialProgress, updatedAt: new Date().toISOString() });
    setCheckedAi(false);
    setCheckedFunctions(false);
    setConceptChecked(false);
  };

  return (
    <AppShell compact>
      <main className="lesson-page">
        <section className="lesson-topbar">
          <div>
            <span className="eyebrow">1차시 · LOOK · AI 기초</span>
            <h1>자동으로 움직이면 모두 AI일까?</h1>
          </div>
          <Link className="text-link no-print" to="/">10차시 목록</Link>
        </section>

        <ProgressRail current={progress.step - 1} />

        {progress.step === 0 && (
          <section className="activity-stage intro-stage">
            <div className="intro-copy">
              <span className="stage-label">오늘의 질문</span>
              <h2>자동으로 움직이는 기계는 모두 AI일까요?</h2>
              <p>
                생활 속 사례가 어떤 정보를 보고 어떻게 결과를 내는지 관찰하며,
                AI와 정해진 규칙대로 움직이는 자동기계를 구별합니다.
              </p>
              <div className="goal-list">
                <div><span>01</span><strong>생활 속 AI 활용 장면 찾기</strong></div>
                <div><span>02</span><strong>추천·인식·분류 기능 구별하기</strong></div>
                <div><span>03</span><strong>작동 근거를 문장으로 설명하기</strong></div>
              </div>
              <button className="button primary large" onClick={() => setStep(1)}>활동 시작하기</button>
            </div>
            <figure className="intro-photo">
              <img src="/assets/lesson-01/classroom-real.webp" alt="교실에서 학생들이 종이 활동을 하는 실제 사진" />
              <figcaption>기기의 이름보다 실제로 하는 일을 관찰합니다.</figcaption>
            </figure>
          </section>
        )}

        {progress.step === 1 && (
          <section className="activity-stage">
            <div className="stage-heading">
              <span className="stage-label">활동 1 · AI 찾기</span>
              <h2>AI가 쓰이는 장면이라고 생각하는 것을 모두 선택하세요.</h2>
              <p>자동으로 움직이는지만 보지 말고, 데이터를 바탕으로 특징을 찾는지 살펴보세요.</p>
            </div>
            <div className="scene-grid photo-scene-grid">
              {aiScenes.map((scene) => {
                const selected = progress.selectedAiScenes.includes(scene.id);
                const status = checkedAi ? (scene.usesAi === selected ? 'correct' : 'wrong') : '';
                return (
                  <button
                    type="button"
                    className={`scene-card photo-scene-card ${selected ? 'selected' : ''} ${status}`}
                    key={scene.id}
                    onClick={() => toggleScene(scene.id)}
                    aria-pressed={selected}
                  >
                    <img src={scene.image} alt="" />
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
                <strong>{aiResult.correct ? '작동 근거까지 정확히 찾았습니다.' : `${aiResult.total}개 중 ${aiResult.count}개의 AI 장면을 찾았어요.`}</strong>
                <span>각 장면 아래 설명을 읽고 선택을 다시 살펴봐도 좋습니다.</span>
              </div>
            )}
            <div className="stage-actions">
              <button className="button ghost" onClick={() => setStep(0)}>이전</button>
              {!checkedAi ? (
                <button className="button primary" disabled={progress.selectedAiScenes.length === 0} onClick={() => setCheckedAi(true)}>선택 확인하기</button>
              ) : (
                <button className="button primary" onClick={() => setStep(2)}>기능 분류하기</button>
              )}
            </div>
          </section>
        )}

        {progress.step === 2 && (
          <section className="activity-stage">
            <div className="stage-heading">
              <span className="stage-label">활동 2 · 기능 분류</span>
              <h2>사례가 하는 일을 추천·인식·분류·자동기계로 나누세요.</h2>
              <p>문장 속에서 사용한 정보와 만든 결과를 찾으면 분류하기 쉬워집니다.</p>
            </div>
            <div className="function-case-list">
              {functionCases.map((item) => (
                <article className="function-case" key={item.id}>
                  <span>{item.number}</span>
                  <div><strong>{item.title}</strong><small>{item.clue}</small></div>
                  <div className="function-options" role="group" aria-label={`${item.title} 분류`}>
                    {functionOptions.map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={progress.functionAnswers[item.id] === option ? 'selected' : ''}
                        aria-pressed={progress.functionAnswers[item.id] === option}
                        onClick={() => setFunctionAnswer(item.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {checkedFunctions && (
                    <em className={progress.functionAnswers[item.id] === item.category ? 'correct-text' : 'wrong-text'}>
                      정답: {item.category}
                    </em>
                  )}
                </article>
              ))}
            </div>
            {checkedFunctions && (
              <div className={functionResult === functionCases.length ? 'feedback success' : 'feedback notice'} role="status">
                <strong>{functionCases.length}개 중 {functionResult}개를 근거에 맞게 분류했습니다.</strong>
                <span>틀린 사례는 제품 이름 대신 작동 설명을 다시 읽어 보세요.</span>
              </div>
            )}
            <div className="stage-actions">
              <button className="button ghost" onClick={() => setStep(1)}>이전</button>
              {!checkedFunctions ? (
                <button className="button primary" disabled={!functionReady} onClick={() => setCheckedFunctions(true)}>분류 확인하기</button>
              ) : (
                <button className="button primary" onClick={() => setStep(3)}>근거 문장 쓰기</button>
              )}
            </div>
          </section>
        )}

        {progress.step === 3 && (
          <section className="activity-stage evidence-stage">
            <div className="stage-heading">
              <span className="stage-label">활동 3 · 근거 쓰기</span>
              <h2>한 사례를 골라 내가 분류한 까닭을 문장으로 설명하세요.</h2>
            </div>
            <div className="evidence-layout">
              <label className="text-field">
                <span>설명할 사례</span>
                <select value={progress.evidenceCase} onChange={(event) => update({ evidenceCase: event.target.value })}>
                  <option value="">사례를 선택하세요</option>
                  {functionCases.map((item) => <option key={item.id} value={item.id}>{item.number} · {item.title}</option>)}
                </select>
              </label>
              {selectedEvidenceCase && (
                <blockquote className="evidence-card">
                  <small>{selectedEvidenceCase.category}</small>
                  <strong>{selectedEvidenceCase.title}</strong>
                  <span>{selectedEvidenceCase.clue}</span>
                </blockquote>
              )}
              <label className="text-field evidence-writing">
                <span>나의 근거</span>
                <textarea
                  value={progress.evidenceReason}
                  onChange={(event) => update({ evidenceReason: event.target.value })}
                  placeholder="예: 이 사례는 시청 기록을 보고 비슷한 영상을 제안하기 때문에 추천입니다."
                  maxLength={220}
                />
              </label>
              <p className="sentence-guide">“이 사례는 <b>어떤 정보</b>를 보고 <b>어떤 결과</b>를 내기 때문에 ___입니다.”</p>
            </div>
            <div className="stage-actions">
              <button className="button ghost" onClick={() => setStep(2)}>이전</button>
              <button className="button primary" disabled={!progress.evidenceCase || progress.evidenceReason.trim().length < 8} onClick={() => setStep(4)}>개념 정리하기</button>
            </div>
          </section>
        )}

        {progress.step === 4 && (
          <section className="activity-stage concept-stage">
            <div className="stage-heading">
              <span className="stage-label">활동 4 · 개념 정리</span>
              <h2>AI와 자동기계가 결과를 내는 바탕을 각각 고르세요.</h2>
            </div>
            <div className="concept-columns">
              <article className="concept-card ai-card">
                <span className="concept-icon">AI</span>
                <h3>AI는 무엇을 바탕으로 특징을 찾을까요?</h3>
                {['학습된 데이터의 특징', '정해진 시간만', '무작위 선택'].map((option) => (
                  <button type="button" key={option} className={progress.aiBasis === option ? 'concept-choice selected' : 'concept-choice'} aria-pressed={progress.aiBasis === option} onClick={() => { setConceptChecked(false); update({ aiBasis: option }); }}>{option}</button>
                ))}
              </article>
              <article className="concept-card automatic-card">
                <span className="concept-icon">자동기계</span>
                <h3>자동기계는 무엇에 따라 움직일까요?</h3>
                {['정해진 조건과 순서', '학습된 데이터', '사람의 기분'].map((option) => (
                  <button type="button" key={option} className={progress.automaticBasis === option ? 'concept-choice selected' : 'concept-choice'} aria-pressed={progress.automaticBasis === option} onClick={() => { setConceptChecked(false); update({ automaticBasis: option }); }}>{option}</button>
                ))}
              </article>
            </div>
            {conceptChecked && (
              <div className={conceptCorrect ? 'feedback success' : 'feedback notice'} role="status" aria-live="polite">
                <strong>{conceptCorrect ? '두 작동 방식의 차이를 정확히 찾았습니다.' : '데이터의 특징을 찾는 경우와 정해진 규칙을 따르는 경우를 다시 구별해 보세요.'}</strong>
                <span>AI는 학습된 데이터의 특징을 찾고, 자동기계는 정해진 조건과 순서에 따라 움직입니다.</span>
              </div>
            )}
            <label className="text-field reflection-field">
              <span>오늘 새롭게 알게 된 점</span>
              <textarea value={progress.reflection} onChange={(event) => update({ reflection: event.target.value })} placeholder="한 문장으로 정리해 보세요." maxLength={180} />
            </label>
            <div className="stage-actions">
              <button className="button ghost" onClick={() => setStep(3)}>이전</button>
              {!conceptChecked || !conceptCorrect ? (
                <button className="button primary" disabled={!progress.aiBasis || !progress.automaticBasis} onClick={() => setConceptChecked(true)}>선택 확인하기</button>
              ) : (
                <button className="button primary" disabled={progress.reflection.trim().length < 2} onClick={() => { update({ completed: true }); setStep(5); }}>1차시 마무리</button>
              )}
            </div>
          </section>
        )}

        {progress.step === 5 && (
          <section className="activity-stage completion-stage">
            <span className="completion-mark">01</span>
            <span className="eyebrow">1차시 완료</span>
            <h2>AI는 데이터로 판단하고,<br />자동기계는 정해진 조건과 순서로 작동합니다.</h2>
            <div className="completion-summary">
              <div><span>생활 속 AI</span><strong>{aiResult.count}개 장면의 작동 근거를 확인함</strong></div>
              <div><span>기능 분류</span><strong>{functionCases.length}개 중 {functionResult}개 분류</strong></div>
              <div><span>나의 근거</span><strong>{progress.evidenceReason}</strong></div>
              <div><span>나의 한 문장</span><strong>{progress.reflection}</strong></div>
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

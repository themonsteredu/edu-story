const steps = ['AI 찾기', '기능 분류', '근거 쓰기', '개념 정리', '마무리'];

export default function ProgressRail({ current }: { current: number }) {
  return (
    <ol className="progress-rail" aria-label="1차시 진행 단계">
      {steps.map((label, index) => (
        <li
          key={label}
          className={`${index === current ? 'current' : ''} ${index < current ? 'done' : ''}`}
          aria-current={index === current ? 'step' : undefined}
        >
          <span>{index < current ? '✓' : index + 1}</span>
          <strong>{label}</strong>
        </li>
      ))}
    </ol>
  );
}

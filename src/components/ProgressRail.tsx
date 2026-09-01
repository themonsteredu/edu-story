const steps = ['AI 찾기', '내 상상', '그림 비교', '이해 방식', '정리'];

export default function ProgressRail({ current }: { current: number }) {
  return (
    <ol className="progress-rail" aria-label="1차시 진행 단계">
      {steps.map((label, index) => (
        <li
          key={label}
          className={`${index === current ? 'current' : ''} ${index < current ? 'done' : ''}`}
        >
          <span>{index < current ? '✓' : index + 1}</span>
          <strong>{label}</strong>
        </li>
      ))}
    </ol>
  );
}

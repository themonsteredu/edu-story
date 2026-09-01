export default function RainyAlleyIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'rain-illustration compact' : 'rain-illustration'} role="img" aria-label="비 오는 골목길에서 빨간 우산을 쓴 아이가 걷는 장면">
      <svg viewBox="0 0 800 500" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#d8e2e7" />
            <stop offset="1" stopColor="#f2eee2" />
          </linearGradient>
          <linearGradient id="road" x1="0" x2="1">
            <stop offset="0" stopColor="#75868c" />
            <stop offset="0.5" stopColor="#93a2a4" />
            <stop offset="1" stopColor="#6f8087" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#sky)" />
        <polygon points="0,125 230,175 210,430 0,500" fill="#c9b999" />
        <polygon points="800,105 565,165 590,430 800,500" fill="#b5c4be" />
        <rect x="35" y="185" width="95" height="115" rx="5" fill="#8a6f57" />
        <rect x="670" y="170" width="85" height="128" rx="5" fill="#647d78" />
        <polygon points="210,430 590,430 800,500 0,500" fill="url(#road)" />
        <ellipse cx="400" cy="453" rx="165" ry="15" fill="#d8e5e6" opacity="0.5" />
        <path d="M325 275 Q400 205 475 275 Z" fill="#c63b3f" />
        <path d="M325 275 Q345 300 363 275 Q382 300 400 275 Q418 300 437 275 Q455 300 475 275" fill="#a9232f" />
        <line x1="400" y1="275" x2="400" y2="405" stroke="#5a4640" strokeWidth="7" />
        <circle cx="408" cy="316" r="25" fill="#e8bf94" />
        <path d="M383 330 Q410 316 435 332 L445 407 L375 407 Z" fill="#274f69" />
        <line x1="390" y1="405" x2="377" y2="454" stroke="#344a55" strokeWidth="13" strokeLinecap="round" />
        <line x1="427" y1="405" x2="444" y2="454" stroke="#344a55" strokeWidth="13" strokeLinecap="round" />
        {Array.from({ length: 38 }).map((_, index) => {
          const x = (index * 83) % 780;
          const y = 25 + ((index * 47) % 365);
          return <line key={index} x1={x} y1={y} x2={x - 10} y2={y + 24} stroke="#7ca0ad" strokeWidth="3" opacity="0.72" />;
        })}
      </svg>
      <span className="illustration-label">교사 시연용 기본 비교 이미지</span>
    </div>
  );
}

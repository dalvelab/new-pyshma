import type { Pattern } from '@/lib/types';

/* ───────── Illustrated placeholders ─────────
   Каждый «kind» = SVG-сцена в духе wireframe-макетов:
   плоская графика, заводские трубы, силуэты, листья, лица.
   Используется поверх цветных паттернов как декоративный коллаж. */

export type Illustration =
  | 'city'
  | 'park'
  | 'pond'
  | 'stage'
  | 'crowd'
  | 'portrait'
  | 'building'
  | 'sport'
  | 'leaf'
  | 'sun'
  | 'abstract';

export const ALL_ILLUSTRATIONS: Illustration[] = [
  'city',
  'park',
  'pond',
  'stage',
  'crowd',
  'portrait',
  'building',
  'sport',
  'leaf',
  'sun',
  'abstract',
];

interface Props {
  className?: string;
  pattern?: Pattern;
  illustration?: Illustration;
  label?: string;
  dark?: boolean;
  rounded?: boolean;
}

const INK = 'currentColor';
const ACCENT = 'rgb(250 80 35)';

function Scene({ kind }: { kind: Illustration }) {
  switch (kind) {
    case 'city':
      return (
        <>
          <rect x="20" y="120" width="60" height="80" fill={INK} />
          <rect x="85" y="80" width="45" height="120" fill={INK} />
          <rect x="135" y="100" width="80" height="100" fill={INK} />
          <rect x="220" y="60" width="35" height="140" fill={INK} />
          <rect x="260" y="110" width="50" height="90" fill={INK} />
          <circle cx="240" cy="50" r="22" fill={ACCENT} />
          <rect x="40" y="135" width="8" height="10" fill={ACCENT} />
          <rect x="95" y="100" width="6" height="8" fill={ACCENT} />
          <rect x="155" y="120" width="6" height="8" fill={ACCENT} />
          <rect x="180" y="140" width="6" height="8" fill={ACCENT} />
        </>
      );
    case 'park':
      return (
        <>
          <rect x="0" y="170" width="320" height="40" fill={INK} />
          <circle cx="60" cy="140" r="38" fill={INK} />
          <rect x="56" y="160" width="8" height="20" fill={INK} />
          <circle cx="160" cy="120" r="50" fill={ACCENT} />
          <rect x="156" y="155" width="8" height="25" fill={INK} />
          <circle cx="250" cy="150" r="32" fill={INK} />
          <rect x="246" y="170" width="8" height="14" fill={INK} />
          <circle cx="280" cy="50" r="20" fill={ACCENT} />
        </>
      );
    case 'pond':
      return (
        <>
          <circle cx="270" cy="55" r="22" fill={ACCENT} />
          <path
            d="M 0 130 Q 80 110 160 130 T 320 130 L 320 210 L 0 210 Z"
            fill={INK}
            opacity="0.85"
          />
          <path
            d="M 0 145 Q 80 125 160 145 T 320 145"
            stroke={ACCENT}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 0 165 Q 80 150 160 165 T 320 165"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
            fill="none"
          />
          <rect x="40" y="80" width="14" height="50" fill={INK} />
          <rect x="36" y="76" width="22" height="6" fill={INK} />
          <rect x="260" y="90" width="14" height="40" fill={INK} />
        </>
      );
    case 'stage':
      return (
        <>
          <rect x="20" y="50" width="280" height="120" fill={INK} />
          <rect x="40" y="70" width="240" height="80" fill={ACCENT} />
          <circle cx="80" cy="110" r="14" fill={INK} />
          <circle cx="160" cy="110" r="18" fill={INK} />
          <circle cx="240" cy="110" r="14" fill={INK} />
          <rect x="0" y="170" width="320" height="40" fill={INK} />
          <path
            d="M 30 170 L 50 200 M 80 170 L 100 200 M 130 170 L 150 200 M 180 170 L 200 200 M 230 170 L 250 200 M 280 170 L 300 200"
            stroke={ACCENT}
            strokeWidth="2"
          />
        </>
      );
    case 'crowd':
      return (
        <>
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 20 + (i % 7) * 42 + Math.floor(i / 7) * 20;
            const y = 100 + Math.floor(i / 7) * 50;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="11" fill={i % 3 === 0 ? ACCENT : INK} />
                <rect
                  x={x - 14}
                  y={y + 8}
                  width="28"
                  height="38"
                  fill={i % 3 === 0 ? ACCENT : INK}
                  rx="3"
                />
              </g>
            );
          })}
        </>
      );
    case 'portrait':
      return (
        <>
          <circle cx="160" cy="95" r="48" fill={INK} />
          <path d="M 80 200 Q 80 140 160 140 Q 240 140 240 200 Z" fill={INK} />
          <circle cx="148" cy="90" r="3" fill={ACCENT} />
          <circle cx="172" cy="90" r="3" fill={ACCENT} />
          <path d="M 145 110 Q 160 120 175 110" stroke={ACCENT} strokeWidth="2" fill="none" />
        </>
      );
    case 'building':
      return (
        <>
          <rect x="60" y="40" width="200" height="170" fill={INK} />
          <rect x="80" y="60" width="30" height="40" fill={ACCENT} />
          <rect x="125" y="60" width="30" height="40" fill={ACCENT} />
          <rect x="170" y="60" width="30" height="40" fill={ACCENT} />
          <rect x="215" y="60" width="30" height="40" fill={ACCENT} />
          <rect x="80" y="115" width="30" height="40" fill={ACCENT} />
          <rect x="125" y="115" width="30" height="40" fill={ACCENT} />
          <rect x="170" y="115" width="30" height="40" fill={ACCENT} />
          <rect x="215" y="115" width="30" height="40" fill={ACCENT} />
          <rect x="148" y="170" width="24" height="40" fill={ACCENT} />
        </>
      );
    case 'sport':
      return (
        <>
          <circle cx="160" cy="120" r="60" fill={INK} />
          <path
            d="M 100 120 L 220 120 M 160 60 L 160 180 M 115 75 L 205 165 M 115 165 L 205 75"
            stroke={ACCENT}
            strokeWidth="3"
          />
          <circle cx="160" cy="120" r="20" fill={ACCENT} />
          <rect x="0" y="195" width="320" height="15" fill={INK} />
        </>
      );
    case 'leaf':
      return (
        <>
          <path d="M 60 180 Q 100 60 220 80 Q 200 200 60 180 Z" fill={INK} />
          <path d="M 60 180 Q 140 140 220 80" stroke={ACCENT} strokeWidth="2.5" fill="none" />
          <path
            d="M 100 160 L 130 130 M 130 170 L 160 130 M 160 175 L 190 130"
            stroke={ACCENT}
            strokeWidth="2"
          />
          <circle cx="240" cy="50" r="12" fill={ACCENT} />
        </>
      );
    case 'sun':
      return (
        <>
          <circle cx="160" cy="120" r="56" fill={ACCENT} />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            const x1 = 160 + Math.cos(a) * 70;
            const y1 = 120 + Math.sin(a) * 70;
            const x2 = 160 + Math.cos(a) * 95;
            const y2 = 120 + Math.sin(a) * 95;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="3" />;
          })}
          <rect x="0" y="190" width="320" height="20" fill={INK} />
        </>
      );
    case 'abstract':
    default:
      return (
        <>
          <circle cx="80" cy="90" r="50" fill={ACCENT} />
          <rect x="140" y="50" width="140" height="80" fill={INK} />
          <rect x="40" y="150" width="120" height="50" fill={INK} />
          <circle cx="240" cy="170" r="30" fill={ACCENT} />
          <path d="M 200 130 L 240 130 L 220 100 Z" fill={ACCENT} />
        </>
      );
  }
}

/** Декоративный плейсхолдер вместо реального фото.
    Совмещает CSS-паттерн фона с SVG-сценой. */
export function PatternBox({
  className = 'h-40',
  pattern = 'diag',
  illustration,
  label,
  dark,
  rounded = true,
}: Props) {
  // Если illustration не передан, подбираем по паттерну (стабильно, без рандома).
  const fallbackByPattern: Record<Pattern, Illustration> = {
    diag: 'abstract',
    dots: 'crowd',
    cross: 'building',
    warm: 'park',
    block: 'stage',
    sun: 'sun',
    zigzag: 'sport',
  };
  const kind = illustration ?? fallbackByPattern[pattern];
  const textColor = dark ? '#fbf8f0' : '#181412';

  return (
    <div
      role="img"
      aria-label={label ?? 'placeholder'}
      className={`relative w-full overflow-hidden border-1.5 border-ink pattern-${pattern} ${rounded ? 'rounded-[10px]' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 320 210"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ color: textColor }}
      >
        <Scene kind={kind} />
      </svg>
      {label && (
        <span
          className={`absolute left-3 bottom-2.5 px-2 py-1 rounded text-[11px] font-medium tracking-wider lowercase z-10 ${dark ? 'bg-ink text-cream' : 'bg-cream text-ink'}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}

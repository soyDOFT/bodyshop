type LogoProps = {
  size?: number;
  /** Namespace the gradient and clip ids, since the mark renders more than once per page. */
  idPrefix: string;
  className?: string;
};

const NAVY = '#16304f';

const SHIELD_PATH = 'M32 2.5 57 11.2v18.9c0 13.9-10.2 24.4-25 31.4C17.2 54.5 7 44 7 30.1V11.2z';
const SHIELD_INNER_PATH = 'M32 5.6 54 13.3v16.8c0 12.4-9 21.7-22 28-13-6.3-22-15.6-22-28V13.3z';
const CAR_BODY_PATH =
  'M13.6 41.4c0-2.4 1.5-3.9 4.4-4.6l6.8-5.3c2-1.5 4.1-2.3 6.7-2.3h4.6c3.2 0 5.8.9 8.2 2.8l4.5 3.6c3.1.7 4.6 2.2 4.6 4.6v1.8c0 .9-.7 1.6-1.6 1.6H15.2c-.9 0-1.6-.7-1.6-1.6z';
const CAR_WINDOW_FRONT_PATH = 'M29.9 30.9h-2.8c-1.9 0-3.4.5-5 1.6l-4.2 3.3h12z';
const CAR_WINDOW_REAR_PATH = 'M32.5 30.9h2.6c2.5 0 4.4.7 6.2 2.1l3.4 2.8h-12.2z';
const STAR_PATH = 'M46.2 13.6l1.2 2.6 2.6 1.2-2.6 1.2-1.2 2.6-1.2-2.6-2.6-1.2 2.6-1.2z';

const WHEELS = [
  { cx: 22, cy: 43.2 },
  { cx: 42.6, cy: 43.2 },
];

/** Draw the shield mark inline so it costs no request and stays crisp at every size. */
export function Logo({ size = 48, idPrefix, className }: LogoProps) {
  const steelId = `${idPrefix}-steel`;
  const clipId = `${idPrefix}-inner`;
  const steel = `url(#${steelId})`;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Exclusive Body Shop"
    >
      <defs>
        <linearGradient id={steelId} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#f4f8fb" />
          <stop offset="0.5" stopColor="#c6d3e0" />
          <stop offset="1" stopColor="#8ca0b6" />
        </linearGradient>
        {/* Inset from the outline so the car tucks inside the steel rim. */}
        <clipPath id={clipId}>
          <path d={SHIELD_INNER_PATH} />
        </clipPath>
      </defs>

      <path d={SHIELD_PATH} fill={NAVY} />
      <path d={SHIELD_PATH} fill="none" stroke={steel} strokeWidth="3" strokeLinejoin="round" />

      <g clipPath={`url(#${clipId})`}>
        {/* Keep the car one solid silhouette so it holds together at favicon size. */}
        <path d={CAR_BODY_PATH} fill={steel} />
        <path d={CAR_WINDOW_FRONT_PATH} fill={NAVY} />
        <path d={CAR_WINDOW_REAR_PATH} fill={NAVY} />

        <path d="M8 34.4h7l-2 2.1H8z" fill={steel} opacity="0.7" />
        <path d="M8 38.5h4.6l-1.4 2.1H8z" fill={steel} opacity="0.4" />

        {WHEELS.map((wheel) => (
          <g key={wheel.cx}>
            <circle cx={wheel.cx} cy={wheel.cy} r="4.8" fill={NAVY} />
            <circle cx={wheel.cx} cy={wheel.cy} r="3" fill={steel} />
          </g>
        ))}

        <path d={STAR_PATH} fill={steel} />
      </g>
    </svg>
  );
}

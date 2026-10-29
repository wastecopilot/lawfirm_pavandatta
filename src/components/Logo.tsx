import { siteConfig } from "@/config/site";

type LogoMarkProps = {
  className?: string;
  /** Unique prefix for gradient ids when the mark appears more than once. */
  id?: string;
  /** Use a white shield fill and lighter strokes on coloured backgrounds. */
  inverted?: boolean;
};

const LEAVES = [
  { cx: 10.6, cy: 50.2, r: -58 },
  { cx: 7.2, cy: 44.4, r: -38 },
  { cx: 5.5, cy: 38, r: -18 },
  { cx: 5.6, cy: 31.6, r: 0 },
  { cx: 7.4, cy: 25.6, r: 18 },
];

const INNER_LEAVES = [
  { cx: 13.4, cy: 46.4, r: -18 },
  { cx: 10.6, cy: 40.4, r: 6 },
  { cx: 9.6, cy: 34.2, r: 24 },
];

/** Shield holding balance scales, framed by laurel branches. */
export function LogoMark({ className = "size-11", id = "logo", inverted = false }: LogoMarkProps) {
  const blue = `${id}-blue`;
  const gold = `${id}-gold`;
  const stroke = inverted ? "#FFFFFF" : `url(#${blue})`;

  const branch = (
    <>
      <path d="M17 55.5C9.6 50.8 5.4 41.6 7.6 24" fill="none" stroke={`url(#${gold})`} strokeWidth="1.5" strokeLinecap="round" />
      {LEAVES.map((leaf) => (
        <ellipse key={`o${leaf.cy}`} cx={leaf.cx} cy={leaf.cy} rx="1.55" ry="3.3" transform={`rotate(${leaf.r} ${leaf.cx} ${leaf.cy})`} />
      ))}
      {INNER_LEAVES.map((leaf) => (
        <ellipse key={`i${leaf.cy}`} cx={leaf.cx} cy={leaf.cy} rx="1.3" ry="2.8" transform={`rotate(${leaf.r} ${leaf.cx} ${leaf.cy})`} />
      ))}
    </>
  );

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={blue} x1="16" y1="7" x2="48" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2347F5" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="20" x2="0" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB41F" />
          <stop offset="1" stopColor="#FF9F1C" />
        </linearGradient>
      </defs>

      <g fill={`url(#${gold})`}>{branch}</g>
      <g fill={`url(#${gold})`} transform="translate(64 0) scale(-1 1)">
        {branch}
      </g>

      <path
        d="M32 7.5L47.5 13V29.5C47.5 41 41 49.6 32 54C23 49.6 16.5 41 16.5 29.5V13L32 7.5Z"
        fill={inverted ? "rgba(255,255,255,0.12)" : "#FFFFFF"}
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />

      <g stroke={stroke} strokeWidth="1.7" strokeLinecap="round" fill="none">
        <path d="M32 18.5V43" />
        <path d="M23 21.5H41" />
        <path d="M27.5 44H36.5" />
        <path d="M23 21.5L19.6 31.5M23 21.5L26.4 31.5" strokeWidth="1.1" />
        <path d="M41 21.5L37.6 31.5M41 21.5L44.4 31.5" strokeWidth="1.1" />
      </g>
      <g fill={`url(#${gold})`}>
        <circle cx="32" cy="16.6" r="1.9" />
        <path d="M19 31.5A4 4 0 0 0 27 31.5Z" />
        <path d="M37 31.5A4 4 0 0 0 45 31.5Z" />
      </g>
    </svg>
  );
}

type LogoProps = {
  inverted?: boolean;
  id?: string;
  className?: string;
  /** Hide the tagline below the md breakpoint (the header, where space is tight). */
  compact?: boolean;
};

/** Logomark paired with the wordmark and tagline from site config. */
export default function Logo({ inverted = false, id = "logo", className = "", compact = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 min-[400px]:gap-3 ${className}`}>
      <LogoMark id={id} inverted={inverted} className="size-10 shrink-0 min-[400px]:size-11 sm:size-12" />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-lg font-bold tracking-tight min-[400px]:text-xl sm:text-[1.35rem] ${inverted ? "text-white" : "text-navy"}`}>
          {siteConfig.name}
        </span>
        <span
          className={`mt-1 text-[11px] leading-snug font-semibold tracking-[0.12em] uppercase min-[400px]:leading-none min-[400px]:whitespace-nowrap ${compact ? "max-md:hidden" : ""} ${inverted ? "text-white/80" : "text-body"}`}
        >
          {siteConfig.tagline}
        </span>
      </span>
    </span>
  );
}

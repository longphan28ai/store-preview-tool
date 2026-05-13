// ASO Studio logo — letter "A" with 3 ascending bar-chart bars inside,
// rendered on an emerald → teal gradient rounded square.
// Designed to read cleanly from 16px (favicon) up to 512px (app icon).
export default function Logo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ASO Studio"
    >
      <defs>
        <linearGradient id="aso-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="aso-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background rounded square */}
      <rect width="100" height="100" rx="22" fill="url(#aso-bg)" />
      {/* Subtle top highlight */}
      <rect width="100" height="100" rx="22" fill="url(#aso-shine)" />

      {/* Letter A — clean strokes */}
      <g
        stroke="white"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Left leg */}
        <line x1="22" y1="82" x2="50" y2="22" />
        {/* Right leg */}
        <line x1="50" y1="22" x2="78" y2="82" />
        {/* Crossbar */}
        <line x1="33" y1="60" x2="67" y2="60" />
      </g>

      {/* Ascending bar chart inside the A's lower trapezoid — ASO growth */}
      <g fill="white">
        <rect x="33" y="72" width="7" height="6" rx="1.5" />
        <rect x="46.5" y="68" width="7" height="10" rx="1.5" />
        <rect x="60" y="64" width="7" height="14" rx="1.5" />
      </g>
    </svg>
  );
}

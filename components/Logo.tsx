export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background rounded square */}
      <rect width="40" height="40" rx="10" fill="url(#emeraldGrad)" />

      {/* Play triangle */}
      <path
        d="M14 10.5C14 9.4 15.2 8.7 16.1 9.3L28.5 17.3C29.3 17.8 29.3 19 28.5 19.5L16.1 27.5C15.2 28.1 14 27.4 14 26.3V10.5Z"
        fill="white"
        opacity="0.9"
      />

      {/* Magnifying glass circle */}
      <circle
        cx="26"
        cy="27"
        r="7"
        stroke="white"
        strokeWidth="2.5"
        fill="rgba(255,255,255,0.15)"
      />

      {/* Magnifying glass handle */}
      <line
        x1="31"
        y1="32"
        x2="36"
        y2="37"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient id="emeraldGrad" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#0D9488" />
        </linearGradient>
      </defs>
    </svg>
  );
}

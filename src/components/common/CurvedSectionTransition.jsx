/**
 * Organic hero → cream transition.
 * Left third stays gentle; long dip toward center-right; rises at the right edge.
 */
const CURVE_PATH =
  'M0,44 C160,46 320,48 480,50 C640,52 780,68 900,86 C980,98 1040,112 1120,108 C1220,102 1340,68 1440,40 L1440,140 L0,140 Z';

export default function CurvedSectionTransition({
  fill = '#F8F5F2',
  className = '',
}) {
  return (
    <div
      className={`pointer-events-none absolute bottom-0 left-0 z-20 w-full leading-[0] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="block h-[clamp(4.5rem,11vw,9rem)] w-full"
        role="presentation"
      >
        <path d={CURVE_PATH} fill={fill} />
      </svg>
    </div>
  );
}

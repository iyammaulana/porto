// Line-drawn browser window, drawn to match the robot mark: square corners,
// one stroke weight, current text colour.
export default function WebIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={`web-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="4" y="8" width="40" height="32" />
      <line x1="4" y1="17" x2="44" y2="17" />
      <rect x="8" y="11" width="3" height="3" fill="currentColor" stroke="none" />
      <rect x="14" y="11" width="3" height="3" fill="currentColor" stroke="none" />
      <line x1="10" y1="24" x2="24" y2="24" />
      <line x1="10" y1="30" x2="38" y2="30" />
      <line x1="10" y1="35" x2="32" y2="35" />
    </svg>
  );
}

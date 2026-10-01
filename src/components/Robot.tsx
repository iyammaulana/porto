"use client";

import { useEffect, useRef } from "react";

// The site's one robot: a line-drawn head that blinks now and then.
// With `track`, its eyes follow the cursor a couple of pixels. Nothing more.
export default function Robot({
  size = 48,
  track = false,
  className = "",
}: {
  size?: number;
  track?: boolean;
  className?: string;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const eyes = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = svg.current?.getBoundingClientRect();
        if (!box || !eyes.current) return;
        const dx = e.clientX - (box.left + box.width / 2);
        const dy = e.clientY - (box.top + box.height / 2);
        const len = Math.hypot(dx, dy) || 1;
        const reach = 2.5;
        eyes.current.style.transform = `translate(${(dx / len) * reach}px, ${(dy / len) * reach}px)`;
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [track]);

  return (
    <svg
      ref={svg}
      className={`robot ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="24" y1="5" x2="24" y2="10" />
      <rect x="22" y="1" width="4" height="4" fill="currentColor" stroke="none" />
      <rect x="7" y="10" width="34" height="28" />
      <rect x="3" y="19" width="4" height="10" />
      <rect x="41" y="19" width="4" height="10" />
      <g ref={eyes} className="robot-eyes">
        <rect className="robot-eye" x="15" y="19" width="6" height="7" fill="currentColor" stroke="none" />
        <rect className="robot-eye" x="27" y="19" width="6" height="7" fill="currentColor" stroke="none" />
      </g>
      <line x1="18" y1="31" x2="30" y2="31" />
    </svg>
  );
}

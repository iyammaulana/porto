"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// A process drawn as a chain of stages, left to right, the way it appears in a
// solution design document. Stages light up in order once, when they scroll in.
export default function Pipeline({ title, stages }: { title?: string; stages: string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".pipe-stage",
          { opacity: 0.25 },
          {
            opacity: 1,
            duration: 0.35,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="pipe">
      {title && <p className="pipe-title mono">{title}</p>}
      <ol className="pipe-stages">
        {stages.map((stage, i) => (
          <li key={stage} className="pipe-stage">
            <span className="pipe-num mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="pipe-label">{stage}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

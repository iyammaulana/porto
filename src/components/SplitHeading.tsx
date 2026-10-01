"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Heading that rises in line by line. `split="chars"` is reserved for the name.
export default function SplitHeading({
  as: Tag = "h2",
  className,
  split = "lines",
  immediate = false,
  children,
}: {
  as?: "h1" | "h2";
  className?: string;
  split?: "lines" | "chars";
  immediate?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = ref.current;
        if (!el) return;
        const split2 = SplitText.create(el, {
          type: split === "chars" ? "words, chars" : "lines",
          mask: split === "chars" ? "words" : "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(split === "chars" ? self.chars : self.lines, {
              yPercent: 110,
              duration: split === "chars" ? 0.9 : 0.8,
              ease: "expo.out",
              stagger: split === "chars" ? 0.025 : 0.08,
              scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
              // The line masks clip anything below a tight line box (underlines,
              // descenders). Once the text has risen in, put the original markup back.
              onComplete: () => self.revert(),
            });
          },
        });
        return () => split2.revert();
      });
    },
    { scope: ref },
  );

  return Tag === "h1" ? (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  ) : (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { staffing } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const totalManual = staffing.reduce((s, c) => s + c.manual, 0);
const totalAuto = staffing.reduce((s, c) => s + c.auto, 0);

// One square per person. Squares for people no longer needed empty out once,
// on time, when the section comes into view. Server markup is the end state.
export default function Staffing() {
  const root = useRef<HTMLElement>(null);
  const total = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { n: totalManual };
        if (total.current) total.current.textContent = String(totalManual);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
        });
        tl.fromTo(".unit-drop .unit-fill", { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power2.out", stagger: 0.04 }, 0.2);
        tl.fromTo(".staff-auto", { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.06 }, 0.9);
        tl.to(
          counter,
          {
            n: totalAuto,
            duration: 1.6,
            ease: "power3.inOut",
            onUpdate: () => {
              if (total.current) total.current.textContent = String(Math.round(counter.n));
            },
          },
          0,
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="compress staff" aria-labelledby="staff-title">
      <div className="page">
        <div className="compress-head">
          <p className="eyebrow mono">People per project, manual → automated</p>
          <h2 id="staff-title" className="display-m">
            <span ref={total} className="mono-num">
              {totalAuto}
            </span>{" "}
            people
          </h2>
          <p className="compress-note">
            People running the processes below by hand. Before: {totalManual}. Where the count is 0, nobody runs the
            process anymore and the team only monitors it in the app.
          </p>
        </div>

        <ol className="compress-list">
          {staffing.map((s) => (
            <li key={s.label} className="compress-row">
              <Link href={`/projects/${s.slug}`} className="compress-label">
                {s.label}
              </Link>
              <div className="units" aria-hidden="true">
                {Array.from({ length: s.manual }, (_, i) => (
                  <span key={i} className={`unit ${i < s.auto ? "unit-keep" : "unit-drop"}`}>
                    <span className="unit-fill" style={i < s.auto ? undefined : { opacity: 0 }} />
                  </span>
                ))}
              </div>
              <p className="compress-values mono">
                <span className="before">{s.manualLabel}</span>
                <span className="staff-auto after">
                  {" "}
                  → {s.autoLabel} <span className="muted">{s.note}</span>
                </span>
              </p>
            </li>
          ))}
        </ol>
        <p className="compress-scale mono">One square per person. Outline: no longer needed. Solid: still working on it.</p>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { compression } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FULL = 60; // minutes that fill the whole track
const totalManual = compression.reduce((s, c) => s + c.manual, 0);
const totalAuto = compression.reduce((s, c) => s + c.auto, 0);

// Each bar shrinks from its manual duration to its automated one. The animation
// plays once, on time rather than on scroll position, so it always finishes and
// never leaves a half-way number on screen. Server markup is the end state.
export default function Compression() {
  const root = useRef<HTMLElement>(null);
  const total = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { m: totalManual };
        if (total.current) total.current.textContent = String(totalManual);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
        });
        tl.fromTo(
          ".compress-fill",
          { scaleX: 1 },
          {
            scaleX: (_i: number, el: HTMLElement) => Number(el.dataset.ratio),
            duration: 1.2,
            ease: "power3.inOut",
            stagger: 0.06,
          },
          0,
        );
        tl.fromTo(".compress-auto", { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.06 }, 0.9);
        tl.to(
          counter,
          {
            m: totalAuto,
            duration: 1.6,
            ease: "power3.inOut",
            onUpdate: () => {
              if (total.current) total.current.textContent = String(Math.round(counter.m));
            },
          },
          0,
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="compress" aria-labelledby="compress-title">
      <div className="page">
        <div className="compress-head">
          <p className="eyebrow mono">Manual → automated</p>
          <h2 id="compress-title" className="display-m">
            <span ref={total} className="mono-num">
              {totalAuto}
            </span>{" "}
            min
          </h2>
          <p className="compress-note">
            One run of each process below, using the upper end of every range. By hand: {totalManual} minutes.
          </p>
        </div>

        <ol className="compress-list">
          {compression.map((c) => (
            <li key={c.label} className="compress-row">
              <Link href={`/projects/${c.slug}`} className="compress-label">
                {c.label}
              </Link>
              <div className="compress-track" aria-hidden="true">
                <div className="compress-ghost" style={{ width: `${(c.manual / FULL) * 100}%` }}>
                  <div
                    className="compress-fill"
                    data-ratio={c.auto / c.manual}
                    style={{ transform: `scaleX(${c.auto / c.manual})` }}
                  />
                </div>
              </div>
              <p className="compress-values mono">
                <span className="before">{c.manualLabel}</span>
                <span className="compress-auto after"> → {c.autoLabel}</span>
              </p>
            </li>
          ))}
        </ol>
        <p className="compress-scale mono">
          Dashed outline: manual time. Solid bar: automated time. Full width = 60 minutes.
        </p>
      </div>
    </section>
  );
}

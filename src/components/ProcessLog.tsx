"use client";

import { useRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/data/site";
import Robot from "./Robot";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Log = Project["logs"][number];

// Steps light up in execution order as they scroll past, with a progress line
// filling alongside them.
function LogSteps({ log }: { log: Log }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".log-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true },
          },
        );
        root.current?.querySelectorAll<HTMLElement>(".log-step").forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0.2 },
            { opacity: 1, ease: "none", scrollTrigger: { trigger: row, start: "top 78%", end: "top 62%", scrub: true } },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="log">
      <span className="log-rail" aria-hidden="true">
        <span className="log-progress" />
      </span>
      <ol className="log-steps mono">
        {log.steps.map((s, i) => (
          <li key={i} className={`log-step actor-${s.actor.toLowerCase()}`}>
            <span className="log-actor">
              {s.actor === "ROBOT" && <Robot size={14} className="log-robot" />}
              {s.actor}
            </span>
            <span>
              {s.branch && <b className="log-branch">[{s.branch}]</b>}
              {s.text}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ProcessLog({ logs }: { logs: Log[] }) {
  if (logs.length === 1) return <LogSteps log={logs[0]} />;

  return (
    <Tabs.Root defaultValue="0" className="tabs">
      <Tabs.List className="tabs-list" aria-label="Process flows">
        {logs.map((l, i) => (
          <Tabs.Trigger key={i} value={String(i)} className="tabs-trigger">
            {l.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {logs.map((l, i) => (
        <Tabs.Content key={i} value={String(i)}>
          <LogSteps log={l} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

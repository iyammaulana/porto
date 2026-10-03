"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/data/site";
import SplitHeading from "./SplitHeading";
import ThemeToggle from "./ThemeToggle";

const SECTIONS = [
  { id: "processes", label: "Processes" },
  { id: "uipath", label: "UiPath" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

// Left column of the home page on wide screens: who, the headline, section
// links that follow the scroll, and contact. On narrow screens it sits on top
// and the section links fold away (the top bar takes over).
export default function Sidebar() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <aside className="side">
      <div className="side-top">
        <h1 className="side-name">
          <Link href="/">{profile.name}</Link>
        </h1>
        <p className="side-role">{profile.role}</p>
        <p className="side-spec mono">{[...profile.specialties, `${profile.company}, Jakarta`].join(" · ")}</p>

        <SplitHeading className="side-headline" immediate>
          <span className="hero-line">
            I turn <s>hours</s> of banking
          </span>{" "}
          <span className="hero-line">
            operations into <em>minutes</em>.
          </span>
        </SplitHeading>

        <nav className="side-nav" aria-label="Sections">
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={active === s.id ? "on" : undefined}>
                  <span className="side-nav-line" aria-hidden="true" />
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="side-foot mono">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href="/cv" target="_blank" rel="noreferrer">
          CV ↓
        </a>
        <ThemeToggle />
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { profile } from "@/data/site";
import { jakartaTime, useNow } from "@/lib/time";

export default function Nav() {
  const now = useNow();

  return (
    <header className="topbar">
      <div className="page topbar-inner">
        <Link href="/" className="topbar-name">
          {profile.name}
        </Link>
        <nav className="topbar-links" aria-label="Sections">
          <Link href="/#processes">Processes</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#contact">Contact</Link>
          <a href="/cv" target="_blank" rel="noreferrer">
            CV ↗
          </a>
        </nav>
        <span className="topbar-clock mono" aria-label="Time in Jakarta">
          JKT {now ? jakartaTime(now, true) : "--:--:--"}
        </span>
      </div>
    </header>
  );
}

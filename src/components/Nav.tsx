import Link from "next/link";
import { profile } from "@/data/site";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand">
          {profile.initials}
          <span className="brand-blink">_</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/#work">Work</Link>
          <Link href="/#stack">Stack</Link>
          <Link href="/#journey">Journey</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <a className="btn btn-ghost btn-sm" href="/cv" target="_blank" rel="noreferrer">
          CV ↗
        </a>
      </div>
    </header>
  );
}

import Link from "next/link";
import { profile } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

// Name on the left; section links, CV, and the theme switch on the right.
// On small screens the section links fold away and the theme switch stays.
export default function Nav() {
  return (
    <header className="topbar">
      <div className="page topbar-inner">
        <Link href="/" className="topbar-name">
          {profile.name}
        </Link>
        <div className="topbar-right">
          <nav className="topbar-links" aria-label="Sections">
            <Link href="/#processes">Processes</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#contact">Contact</Link>
            <a href="/cv" target="_blank" rel="noreferrer">
              CV ↓
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

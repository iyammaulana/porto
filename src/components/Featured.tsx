import Link from "next/link";
import type { Project } from "@/data/site";

// The lead processes on the home page. Left: what it is. Right: my role, the
// outcome, and two results.
export default function Featured({ projects }: { projects: Project[] }) {
  return (
    <ol className="feats">
      {projects.map((p, i) => (
        <li key={p.slug} className="feat">
          <span className="feat-idx mono">{String(i + 1).padStart(2, "0")}</span>

          <div className="feat-main">
            <p className="feat-meta mono">
              <span>{p.kind}</span>
              {p.since && <span>since {p.since}</span>}
              <span className={`status-${p.status.toLowerCase()}`}>{p.status}</span>
            </p>
            <h3 className="feat-title">
              <Link href={`/projects/${p.slug}`}>{p.title}</Link>
            </h3>
            <p className="feat-summary">{p.summary}</p>
            <Link className="feat-link" href={`/projects/${p.slug}`}>
              Open the process →
            </Link>
          </div>

          <div className="feat-side">
            <dl className="feat-facts">
              <dt>My role</dt>
              <dd>{p.role}</dd>
              {p.outcome && (
                <>
                  <dt>Outcome</dt>
                  <dd>{p.outcome}</dd>
                </>
              )}
            </dl>

            <ul className="feat-results">
              {p.results.slice(0, 2).map((r) => (
                <li key={r.measure}>
                  <span className="feat-value">
                    {r.before && <span className="feat-before">{r.before} → </span>}
                    {r.after}
                  </span>
                  <span className="feat-label">{r.measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Flow from "@/components/Flow";
import { projects } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="wrap case">
      <Link className="link-arrow back" href="/#work">
        <span aria-hidden="true">←</span> All work
      </Link>

      <header className="case-head">
        <p className="feature-meta">
          <span className="mono">{String(index + 1).padStart(2, "0")}</span>
          <span className="tag">{project.category}</span>
        </p>
        <h1>{project.title}</h1>
        <p className="lede">{project.summary}</p>
      </header>

      <dl className="case-facts">
        {project.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>

      <dl className="case-metrics">
        {project.metrics.map((m) => (
          <div key={m.label} className="metric">
            <dt className="metric-value">{m.value}</dt>
            <dd className="metric-label">{m.label}</dd>
          </div>
        ))}
      </dl>

      <div className="case-body">
        <section>
          <p className="kicker">Context</p>
          <p className="case-context">{project.context}</p>
        </section>

        {project.robots && (
          <section className="case-wide">
            <p className="kicker">What the robots do</p>
            <div className="robots">
              {project.robots.map((r) => (
                <article key={r.name} className="robot">
                  <h2>{r.name}</h2>
                  <p>{r.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {project.flows ? (
          <section className="case-wide">
            <p className="kicker">How a case moves</p>
            <div className="flows">
              {project.flows.map((f) => (
                <div key={f.title} className="feature-panel">
                  <p className="panel-label mono">{f.title}</p>
                  <Flow steps={f.steps} />
                </div>
              ))}
            </div>
            <p className="flow-legend mono">
              <span className="legend-dot auto" /> automated
              <span className="legend-dot human" /> human approval
            </p>
            {project.flowNote && <p className="flow-note">{project.flowNote}</p>}
          </section>
        ) : (
          <section className="feature-panel">
            <p className="panel-label mono">flow</p>
            <Flow steps={project.flow} />
          </section>
        )}

        <section>
          <p className="kicker">What I built</p>
          <ul className="case-list">
            {project.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        <section>
          <p className="kicker">Challenges &amp; decisions</p>
          <div className="decisions">
            {project.decisions.map((d) => (
              <article key={d.title} className="decision">
                <h2>{d.title}</h2>
                <p>{d.body}</p>
              </article>
            ))}
          </div>
        </section>

        {project.note && <p className="case-note">{project.note}</p>}

        <section>
          <p className="kicker">Stack</p>
          <ul className="pill-list">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      </div>

      <Link className="case-next" href={`/projects/${next.slug}`}>
        <span className="kicker">Next</span>
        <span className="case-next-title">
          {next.title} <span aria-hidden="true">→</span>
        </span>
      </Link>
    </main>
  );
}

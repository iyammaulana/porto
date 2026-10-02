import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProcessLog from "@/components/ProcessLog";
import { DocSection } from "@/components/Section";
import SplitHeading from "@/components/SplitHeading";
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

  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="page">
      <header className="doc-head">
        <p className="eyebrow mono doc-meta">
          <Link href="/#processes">← All processes</Link>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{p.kind}</span>
          {p.since && <span>Since {p.since}</span>}
          <span className={`status-${p.status.toLowerCase()}`}>{p.status}</span>
        </p>
        <SplitHeading as="h1" className="display-l doc-title" immediate>
          {p.title}
        </SplitHeading>
        <p className="doc-summary">{p.summary}</p>
      </header>

      <ol className="results">
        {p.results.map((r) => (
          <li key={r.measure} className="result">
            <p className="result-measure">{r.measure}</p>
            <p className="result-values">
              {r.before && <span className="result-before mono">{r.before}</span>}
              <span className="result-after">{r.after}</span>
            </p>
          </li>
        ))}
      </ol>
      {p.resultsNote && <p className="results-note">{p.resultsNote}</p>}

      <DocSection label="Specification" wide>
        <table className="table spec">
          <tbody>
            <tr>
              <th scope="row">Role</th>
              <td>{p.role}</td>
            </tr>
            {p.spec.map((s) => (
              <tr key={s.label}>
                <th scope="row">{s.label}</th>
                <td>{s.value}</td>
              </tr>
            ))}
            {p.statusNote && (
              <tr>
                <th scope="row">Status</th>
                <td>{p.statusNote}</td>
              </tr>
            )}
          </tbody>
        </table>
      </DocSection>

      <DocSection label="Context">
        <p>{p.context}</p>
      </DocSection>

      <DocSection label="What I built">
        <ul className="list">
          {p.built.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </DocSection>

      {p.robots && (
        <DocSection label="Robots" wide>
          <table className="table spec">
            <tbody>
              {p.robots.map((r) => (
                <tr key={r.name}>
                  <th scope="row">{r.name}</th>
                  <td>{r.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DocSection>
      )}

      <DocSection label="Process log" wide>
        <ProcessLog logs={p.logs} />
        {p.logNote && <p className="muted log-note">{p.logNote}</p>}
      </DocSection>

      {p.exceptions && (
        <DocSection label="Exception handling" wide>
          <div className="scroll">
            <table className="table exceptions">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>When</th>
                  <th>What happens</th>
                </tr>
              </thead>
              <tbody>
                {p.exceptions.map((e) => (
                  <tr key={e.when}>
                    <td className="mono">{e.type}</td>
                    <td>{e.when}</td>
                    <td>{e.then}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>
      )}

      {p.decisions && (
        <DocSection label="Decisions">
          {p.decisions.map((d, i) => (
            <div key={d.title} className="decision">
              <span className="decision-idx mono">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            </div>
          ))}
        </DocSection>
      )}

      {p.note && (
        <DocSection label="Scope">
          <p>{p.note}</p>
        </DocSection>
      )}

      <DocSection label="Stack">
        <p className="stack mono">{p.stack.join(" · ")}</p>
      </DocSection>

      <Link className="next" href={`/projects/${next.slug}`}>
        <span className="eyebrow mono">Next process</span>
        <span className="display-m next-title">{next.title} →</span>
      </Link>
    </main>
  );
}

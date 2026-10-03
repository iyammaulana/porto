import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Pipeline from "@/components/Pipeline";
import ProcessLog from "@/components/ProcessLog";
import Robot from "@/components/Robot";
import WebIcon from "@/components/WebIcon";
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

  const robotsTable = p.robots && (
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
  );

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

      {/* Story format: problem, what I built, one flow, hard parts, role. Projects
          without a story still use the longer document format below. */}
      {p.story ? (
        <>
          <DocSection label="The problem">
            <p>{p.story.problem}</p>
          </DocSection>

          <DocSection label="What I built">
            {p.story.built.map((b) => (
              <div key={b.title} className="story-block">
                <h3>
                  {b.icon === "robot" && <Robot size={20} />}
                  {b.icon === "web" && <WebIcon size={20} />}
                  {b.title}
                </h3>
                <p>{b.body}</p>
                {b.rows && (
                  <table className="table part-table">
                    <tbody>
                      {b.rows.map(([left, right]) => (
                        <tr key={left}>
                          <td>{left}</td>
                          <td className="mono">{right}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </DocSection>

          {p.story.pipeline && (
            <DocSection label="How it works" wide>
              <Pipeline title={p.story.pipeline.title} stages={p.story.pipeline.stages} />
            </DocSection>
          )}

          {p.story.flow && (
            <DocSection label="How it works" wide>
              <ProcessLog logs={[{ steps: p.story.flow }]} />
            </DocSection>
          )}

          {p.decisions && (
            <DocSection label="Hard parts">
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

          <DocSection label="My role">
            <p>{p.role}</p>
          </DocSection>
        </>
      ) : (
        <>
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

      {p.lanes && (
        <DocSection label="Lanes" wide>
          <div className="scroll">
            <table className="table lanes">
              <thead>
                <tr>
                  <th>Lane</th>
                  <th>Counterpart</th>
                  <th>Released</th>
                </tr>
              </thead>
              <tbody>
                {p.lanes.map((l) => (
                  <tr key={l.lane}>
                    <th scope="row">{l.lane}</th>
                    <td>{l.counterpart}</td>
                    <td className="mono">{l.released}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>
      )}

      {p.built && (
        <DocSection label="What I built">
          <ul className="list">
            {p.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </DocSection>
      )}

      {/* With a logLabel, robots and log form one named part of the system. */}
      {p.logLabel ? (
        <DocSection label={p.logLabel} wide>
          {p.logIntro && <p className="part-intro">{p.logIntro}</p>}
          {robotsTable}
          <div className="part-log">
            <ProcessLog logs={p.logs} />
            {p.logNote && <p className="muted log-note">{p.logNote}</p>}
          </div>
        </DocSection>
      ) : (
        <>
          {robotsTable && (
            <DocSection label="Robots" wide>
              {robotsTable}
            </DocSection>
          )}
          <DocSection label="Process log" wide>
            <ProcessLog logs={p.logs} />
            {p.logNote && <p className="muted log-note">{p.logNote}</p>}
          </DocSection>
        </>
      )}

      {p.part && (
        <DocSection label={p.part.title} wide>
          <p className="part-intro">{p.part.intro}</p>
          {p.part.blocks?.map((b) => (
            <div key={b.title} className="part-block">
              <h3>{b.title}</h3>
              {b.body && <p>{b.body}</p>}
              {b.rows && (
                <table className="table part-table">
                  <tbody>
                    {b.rows.map(([left, right]) => (
                      <tr key={left}>
                        <td>{left}</td>
                        <td>{right}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </DocSection>
      )}

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

        </>
      )}

      {p.stackGroups ? (
        <DocSection label="Stack" wide>
          <table className="table stack-table">
            <tbody>
              {p.stackGroups.map((g) => (
                <tr key={g.group}>
                  <th scope="row">{g.group}</th>
                  <td>{g.items.join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DocSection>
      ) : (
        <DocSection label="Stack">
          <p className="stack mono">{p.stack.join(" · ")}</p>
        </DocSection>
      )}

      <Link className="next" href={`/projects/${next.slug}`}>
        <span className="eyebrow mono">Next process</span>
        <span className="display-m next-title">{next.title} →</span>
      </Link>
    </main>
  );
}

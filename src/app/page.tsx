import Link from "next/link";
import Reveal from "@/components/Reveal";
import RunLog from "@/components/RunLog";
import Flow from "@/components/Flow";
import Credentials from "@/components/Credentials";
import { journey, metrics, principles, profile, projects, stack } from "@/data/site";

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="pulse" /> {profile.role} · {profile.location}
            </p>
            <h1>
              I turn <em>hours</em> of banking operations into <em>minutes</em>.
            </h1>
            <p className="lede">{profile.summary}</p>
            <div className="cta">
              <Link className="btn btn-primary" href="#work">
                See the work
              </Link>
              <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
                Get in touch
              </a>
            </div>
          </div>
          <RunLog />
        </div>
      </section>

      {/* Metrics */}
      <section className="wrap metrics">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 80} className="metric">
            <span className="metric-value">{m.value}</span>
            <span className="metric-label">{m.label}</span>
          </Reveal>
        ))}
      </section>

      {/* Before / after */}
      <section className="wrap">
        <Reveal className="compare">
          <p className="kicker">Average processing time, per process</p>
          <div className="compare-row">
            <span className="compare-name">Manual</span>
            <div className="bar bar-before">
              <span>1–2 hours</span>
            </div>
          </div>
          <div className="compare-row">
            <span className="compare-name">Automated</span>
            <div className="bar bar-after">
              <span>3–10 minutes</span>
            </div>
          </div>
          <p className="compare-note">Across 100+ production robots, at 100% process accuracy.</p>
        </Reveal>
      </section>

      {/* Work */}
      <section id="work" className="wrap section">
        <Reveal>
          <p className="kicker">01 — Selected work</p>
          <h2>Systems that close the loop, not just report on it.</h2>
        </Reveal>

        <div className="features">
          {featured.map((p, i) => (
            <Reveal key={p.slug}>
              <article className="feature">
                <div className="feature-copy">
                  <p className="feature-meta">
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="tag">{p.category}</span>
                  </p>
                  <h3>
                    <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="feature-summary">{p.summary}</p>
                  <dl className="chips">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="chip">
                        <dt>{m.value}</dt>
                        <dd>{m.label}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link className="link-arrow" href={`/projects/${p.slug}`}>
                    Read the case study <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <div className="feature-panel">
                  <p className="panel-label mono">flow</p>
                  <Flow steps={p.flow} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="subhead">More from production</h3>
          <ul className="ledger">
            {others.map((p, i) => (
              <li key={p.slug}>
                <Link className="ledger-row" href={`/projects/${p.slug}`}>
                  <span className="mono ledger-idx">{String(featured.length + i + 1).padStart(2, "0")}</span>
                  <span className="ledger-title">{p.title}</span>
                  <span className="ledger-summary">{p.summary}</span>
                  <span className="ledger-result mono">{p.metrics[0].value}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Principles */}
      <section id="principles" className="wrap section">
        <Reveal>
          <p className="kicker">02 — Principles</p>
          <h2>What years of production taught me.</h2>
        </Reveal>
        <div className="principles">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 60} className="principle">
              <span className="mono principle-idx">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <Link className="link-arrow" href={`/projects/${p.slug}`}>
                See it in practice <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="wrap section">
        <Reveal>
          <p className="kicker">03 — Stack</p>
          <h2>From the robot to the server it runs on.</h2>
        </Reveal>
        <div className="stack">
          {stack.map((g, i) => (
            <Reveal key={g.group} delay={i * 60} className="stack-group">
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="wrap section">
        <Reveal>
          <p className="kicker">04 — Journey</p>
          <h2>Started with a hackathon robot. Still shipping them.</h2>
        </Reveal>
        <ol className="timeline">
          {journey.map((j) => (
            <li key={j.title}>
              <Reveal className="timeline-item">
                <span className="timeline-when mono">{j.when}</span>
                <div>
                  <h3>{j.title}</h3>
                  <p className="timeline-org">{j.org}</p>
                  <p className="timeline-body">{j.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal>
          <Credentials />
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="wrap section contact">
        <Reveal>
          <p className="kicker">05 — Contact</p>
          <h2>Have a process that still takes hours?</h2>
          <p className="lede">Let’s talk about automating it.</p>
          <div className="cta">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a className="btn btn-ghost" href="/cv" target="_blank" rel="noreferrer">
              Download CV ↗
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

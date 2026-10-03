import Link from "next/link";
import Compression from "@/components/Compression";
import Credentials from "@/components/Credentials";
import Featured from "@/components/Featured";
import Registry from "@/components/Registry";
import Portrait from "@/components/Portrait";
import { Section } from "@/components/Section";
import SplitHeading from "@/components/SplitHeading";
import Staffing from "@/components/Staffing";
import { certifications, depth, education, experience, profile, projects, skills } from "@/data/site";

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

export default function Home() {
  return (
    <main>
      <header className="hero page">
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-role">
          {profile.role} at {profile.company} · {profile.location}
        </p>

        {/* Two fixed lines on tablet and up. */}
        <SplitHeading className="hero-headline" immediate>
          <span className="hero-line">
            I turn <s>hours</s> of banking
          </span>{" "}
          <span className="hero-line">
            operations into <em>minutes</em>.
          </span>
        </SplitHeading>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-desc">{profile.description}</p>

            <p className="hero-contact">
              <a href="#processes">See the processes</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a href="/cv" target="_blank" rel="noreferrer">
                CV (PDF) ↗
              </a>
            </p>
          </div>
          <Portrait />
        </div>
      </header>

      <div className="page">
        <dl className="facts" aria-label="Track record">
          {profile.facts.map((f) => (
            <div key={f.label} className="fact">
              <dt className="fact-value">{f.value}</dt>
              <dd className="fact-label">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Compression />
      <Staffing />

      <Section id="processes" index="01" title="Processes I built">
        <Featured projects={featured} />
        <h3 className="sec-sub">More processes</h3>
        <Registry projects={others} start={featured.length} />
      </Section>

      <Section id="uipath" index="02" title="UiPath in depth">
        <p className="sec-lead">
          Six years on UiPath, starting with a hackathon robot in 2020. These are the kinds of automation I have
          shipped, each with the process where it runs in production.
        </p>
        <table className="table depth">
          <tbody>
            {depth.map((d) => (
              <tr key={d.capability}>
                <th scope="row">{d.capability}</th>
                <td>{d.detail}</td>
                <td className="depth-link">
                  <Link href={`/projects/${d.slug}`}>
                    {projects.find((p) => p.slug === d.slug)?.title} →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section id="experience" index="03" title="Experience">
        {experience.map((e) => (
          <div key={e.title} className="entry">
            <p className="entry-when mono">{e.when}</p>
            <div>
              <h3 className="entry-title">{e.title}</h3>
              <p className="entry-org">{e.org}</p>
              <p className="entry-body">{e.body}</p>
              {e.count && <p className="entry-body">{e.count}</p>}
              {e.timeline && (
                <table className="table entry-timeline">
                  <tbody>
                    {e.timeline.map((t) => (
                      <tr key={t.year}>
                        <td className="mono date">{t.year}</td>
                        <td>{t.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}
        <div className="entry">
          <p className="entry-when mono">{education.when}</p>
          <div>
            <h3 className="entry-title">{education.title}</h3>
            <p className="entry-org">{education.org}</p>
            <p className="entry-body">{education.body}</p>
          </div>
        </div>
      </Section>

      <Section id="skills" index="04" title="Skills">
        <table className="table skills">
          <tbody>
            {skills.map((g) => (
              <tr key={g.group}>
                <th scope="row">{g.group}</th>
                <td>{g.items.join(" · ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section id="certifications" index="05" title="Certifications">
        <table className="table">
          <tbody>
            {certifications.map((c) => (
              <tr key={c.title}>
                <td className="mono date">{c.when}</td>
                <td>{c.title}</td>
                <td className="muted">{c.org}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Credentials />
      </Section>

      <section id="contact" className="contact page">
        <p className="eyebrow mono">06 · Contact</p>
        <p className="contact-note">{profile.contactNote}</p>
        <a className="contact-mail display-m" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <p className="hero-links mono">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            {profile.linkedinLabel} ↗
          </a>
          <a href="/cv" target="_blank" rel="noreferrer">
            CV (PDF) ↗
          </a>
        </p>
      </section>
    </main>
  );
}

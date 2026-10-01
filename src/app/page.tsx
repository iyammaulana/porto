import Compression from "@/components/Compression";
import Credentials from "@/components/Credentials";
import Registry from "@/components/Registry";
import Portrait from "@/components/Portrait";
import { Section } from "@/components/Section";
import SplitHeading from "@/components/SplitHeading";
import Staffing from "@/components/Staffing";
import { certifications, education, experience, profile, projects, skills } from "@/data/site";

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

      <Compression />
      <Staffing />

      <Section id="processes" index="01" title="Processes I built">
        <Registry projects={projects} />
      </Section>

      <Section id="experience" index="02" title="Experience">
        {experience.map((e) => (
          <div key={e.title} className="entry">
            <p className="entry-when mono">{e.when}</p>
            <div>
              <h3 className="entry-title">{e.title}</h3>
              <p className="entry-org">{e.org}</p>
              <p className="entry-body">{e.body}</p>
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

      <Section id="skills" index="03" title="Skills">
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

      <Section id="certifications" index="04" title="Certifications">
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
        <p className="eyebrow mono">05 · Contact</p>
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

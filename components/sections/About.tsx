import { about } from "@/lib/content";
import { Highlight } from "../Highlight";

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <div className="about__grid">
          <div className="reveal">
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 id="about-title" className="h2"><Highlight text={about.title} words={2} /></h2>
            <div className="body-copy">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="vm">
            {[about.vision, about.mission].map((c) => (
              <article key={c.title} className="paper vm__card tape lift reveal">
                <h3 className="h3 vm__k">{c.title}</h3>
                <p>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="values reveal">
          <h3 className="h2"><Highlight text={about.valuesTitle} words={2} /></h3>
          <ul className="values__list">
            {about.values.map((v) => (
              <li key={v.title} className="paper lift">
                <h4 className="h3">{v.title}</h4>
                <p>{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

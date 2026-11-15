import { home } from "@/lib/content";
import { featureIcons, ArrowRight } from "../Icons";
import { Highlight } from "../Highlight";

export function Bring() {
  return (
    <section className="section" aria-labelledby="bring-title">
      <div className="container">
        <div className="section-head reveal">
          <h2 id="bring-title" className="h2"><Highlight text={home.bringTitle} words={2} /></h2>
        </div>
        <div className="grid3">
          {home.bring.map((f) => {
            const Icon = featureIcons[f.icon];
            return (
              <article key={f.title} className="paper feature lift reveal">
                <div className="feature__icon"><Icon /></div>
                <h3 className="h3">{f.title}</h3>
                <p>{f.body}</p>
              </article>
            );
          })}
        </div>
        <a className="link-arrow" href={home.bringCta.href}>
          {home.bringCta.label}
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}

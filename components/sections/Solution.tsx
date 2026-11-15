import { solution } from "@/lib/content";
import { HowItWorks } from "./HowItWorks";
import { ArrowRight } from "../Icons";
import { Highlight } from "../Highlight";

export function Solution() {
  return (
    <section id="solution" className="section" aria-labelledby="solution-title">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{solution.eyebrow}</span>
          <h2 id="solution-title" className="h2"><Highlight text={solution.title} words={2} /></h2>
          <p className="lede">{solution.intro}</p>
        </div>
        <HowItWorks title={solution.stepsTitle} steps={solution.steps} />
        <div className="objective paper reveal">
          <h3 className="h3">{solution.objectiveTitle}</h3>
          <div>
            <p>{solution.objective}</p>
            <a className="link-arrow" href={solution.cta.href} style={{ background: "var(--paper-hi)" }}>
              {solution.cta.label}
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

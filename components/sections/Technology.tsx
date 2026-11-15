import { technology } from "@/lib/content";
import { ArrowUpRight } from "../Icons";
import { Highlight } from "../Highlight";

export function Technology() {
  return (
    <section id="technology" className="tech block-ink torn" aria-labelledby="tech-title">
      <div className="radar" aria-hidden="true">
        <div className="radar__rings" />
        <div className="radar__sweep" />
      </div>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{technology.eyebrow}</span>
          <h2 id="tech-title" className="h2"><Highlight text={technology.title} words={3} /></h2>
          <p className="lede">{technology.intro}</p>
        </div>

        <div className="tech__grid">
          <figure className="stack" aria-label="The three parts of the checkout: the tag, the gate and the bill">
            {technology.pieces.map((piece, i) => (
              <div
                key={piece.label}
                className="stack__plane"
                style={{ "--i": technology.pieces.length - 1 - i, zIndex: technology.pieces.length - i } as React.CSSProperties}
              >
                <div className="stack__label">
                  <span>{piece.label}</span>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="stack__parts">
                  {piece.chips.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </figure>

          <div>
            {technology.pieces.map((piece) => (
              <div key={piece.title} className="comp reveal">
                <h3 className="h3">{piece.title}</h3>
                <p>{piece.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="approach">
          <h3 className="h2 reveal"><span className="hl">{technology.approachTitle}</span></h3>
          <div className="grid3">
            {technology.approach.map((a) => (
              <div key={a.title} className="paper lift reveal">
                <h4 className="h3">{a.title}</h4>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="proto paper tape reveal">
          <h3 className="h3">{technology.prototypeTitle}</h3>
          {technology.prototype.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

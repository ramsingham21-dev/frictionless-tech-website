import { home } from "@/lib/content";
import { HeroStage } from "../three/HeroStage";
import { ButtonLink } from "../Button";

export function Hero() {
  const [first, ...rest] = home.headline.split(/(?<=\.)\s+/);
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy is-in">
          <span className="eyebrow">{home.eyebrow}</span>
          <h1 id="hero-title" className="h1">
            {first} <span className="hl">{rest.join(" ")}</span>
          </h1>
          <p className="lede">{home.subhead}</p>
          <div className="hero__actions">
            <ButtonLink href={home.primaryCta.href} label={home.primaryCta.label} />
            <ButtonLink href={home.secondaryCta.href} label={home.secondaryCta.label} variant="ghost" />
          </div>
          <p className="hero__micro">{home.microcopy}</p>
        </div>
        <HeroStage label={home.visualLabel} />
      </div>
    </section>
  );
}

import { team } from "@/lib/content";
import ProfileCard from "../reactbits/ProfileCard";
import "../reactbits/ProfileCard.css";
import { Fill } from "../Fill";
import { ArrowRight } from "../Icons";

export function Team() {
  return (
    <section id="team" className="section" aria-labelledby="team-title">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{team.eyebrow}</span>
          <h2 id="team-title" className="h2">
            The people behind <span className="hl">Frictionless Tech.</span>
          </h2>
          <p className="lede">{team.intro}</p>
        </div>

        <ul className="players">
          {team.founders.map((f) => (
            <li key={f.name} className="player tape reveal">
              <ProfileCard
                theme="paper"
                className="profile-card--paper"
                avatarUrl={f.photo ?? ""}
                photoAlt={`${f.name}, ${f.role} at Frictionless Tech`}
                name={f.name}
                title={f.role}
                bio={f.bio}
                handle=""
                status=""
                contactText=""
                holo={0.35}
                glare={0.4}
                tiltStrength={10}
                intro={false}
              />
            </li>
          ))}
        </ul>

        <div className="groups">
          {team.groups.map((g) => (
            <div key={g.title} className="paper lift reveal">
              <h3 className="h3">{g.title}</h3>
              <p><Fill text={g.body} /></p>
            </div>
          ))}
        </div>

        <a className="link-arrow" href={team.cta.href}>
          {team.cta.label}
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}

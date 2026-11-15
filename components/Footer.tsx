import { footer, site } from "@/lib/content";
import { LogoFull } from "./Logo";
import { Fill, isFilled } from "./Fill";

export function Footer() {
  return (
    <footer className="ftr block-ink torn">
      <div className="container">
        <div className="ftr__top">
          <p className="ftr__mark" aria-hidden="true">
            Frictionless<em>Tech</em>
          </p>
          <a href="/#home" aria-label={`${site.name} home`}>
            <LogoFull className="ftr__logo" />
          </a>
        </div>
        <div className="ftr__grid">
          <p className="ftr__tag">{site.tagline}</p>
          <div>
            <h2>Quick links</h2>
            <ul>
              {footer.quickLinks.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Connect with us</h2>
            <ul>
              {isFilled(site.linkedin) ? (
                <li><a href={site.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
              ) : null}
              <li>
                {isFilled(site.email) ? (
                  <a href={`mailto:${site.email}`}>Email</a>
                ) : (
                  <span className="ftr__value">Email <Fill text={site.email} /></span>
                )}
              </li>
            </ul>
          </div>
          <div>
            <h2>Legal</h2>
            <ul>
              {footer.legal.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ftr__base">
          <span>{footer.copyright}</span>
          <span>{site.descriptor}</span>
        </div>
      </div>
    </footer>
  );
}

import { contact, site } from "@/lib/content";
import { Fill, isFilled } from "../Fill";
import { ContactForm } from "./ContactForm";
import { Highlight } from "../Highlight";

export function Contact() {
  const rows: { k: string; v: string; href?: string }[] = [
    { k: "Company", v: site.name },
    { k: "Email", v: site.email, href: isFilled(site.email) ? `mailto:${site.email}` : undefined },
    { k: "Phone", v: site.phone, href: isFilled(site.phone) ? `tel:${site.phone.replace(/\s/g, "")}` : undefined },
    { k: "Location", v: site.location },
    ...(site.linkedin ? [{ k: "LinkedIn", v: site.linkedin, href: site.linkedin }] : []),
  ];
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__grid">
        <div className="reveal">
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2 id="contact-title" className="h2"><Highlight text={contact.title} words={3} /></h2>
          <p className="lede">{contact.intro}</p>
          <ul className="details">
            {rows.map((r) => (
              <li key={r.k}>
                <span>{r.k}</span>
                <span>{r.href ? <a href={r.href}>{r.v}</a> : <Fill text={r.v} />}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

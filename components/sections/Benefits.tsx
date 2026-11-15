"use client";

import { useRef, useState } from "react";
import { benefits } from "@/lib/content";
import { ArrowRight, Check } from "../Icons";
import { Highlight } from "../Highlight";

export function Benefits() {
  const [tab, setTab] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const groups = benefits.groups;

  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (tab + dir + groups.length) % groups.length;
    setTab(next);
    tabs.current[next]?.focus();
  };

  const g = groups[tab];

  return (
    <section id="benefits" className="section" aria-labelledby="benefits-title">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{benefits.eyebrow}</span>
          <h2 id="benefits-title" className="h2"><Highlight text={benefits.title} words={4} /></h2>
          <p className="lede">{benefits.intro}</p>
        </div>

        <div className="tabs__list reveal" role="tablist" aria-label="Benefits by audience" onKeyDown={onKey}>
          {groups.map((x, i) => (
            <button
              key={x.id}
              ref={(el) => { tabs.current[i] = el; }}
              id={`tab-${x.id}`}
              className="tabs__tab"
              role="tab"
              type="button"
              aria-selected={i === tab}
              aria-controls={`panel-${x.id}`}
              tabIndex={i === tab ? 0 : -1}
              onClick={() => setTab(i)}
            >
              {x.title}
            </button>
          ))}
        </div>

        <div id={`panel-${g.id}`} role="tabpanel" aria-labelledby={`tab-${g.id}`} className="tabs__panel" tabIndex={0}>
          {"points" in g && g.points ? (
            <ul className="ticks">
              {g.points.map((p) => (
                <li key={p} className="paper lift">
                  <Check />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          ) : (
            <aside className="tabs__aside paper">
              <div className="dotfield" aria-hidden="true" />
              <h3 className="h2">{g.title}</h3>
              <p>{"paragraph" in g ? g.paragraph : null}</p>
            </aside>
          )}
        </div>

        <a className="link-arrow" href={benefits.cta.href}>
          {benefits.cta.label}
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}

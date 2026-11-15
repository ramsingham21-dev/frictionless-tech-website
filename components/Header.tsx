"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import { LogoFull, LogoMark } from "./Logo";
import { Button, ButtonLink } from "./Button";
import { Close, Menu } from "./Icons";

const SHRINK_DISTANCE = 180; // px of scroll over which the logo shrinks

export function Header({ home = true }: { home?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  // Large logo at the top of the page that shrinks smoothly as you scroll.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / SHRINK_DISTANCE));
      ref.current?.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (!home) return;
    const sections = nav.map((n) => document.querySelector(n.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [home]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (h: string) => (home ? h : `/${h}`);
  const links = nav.slice(1, -1); // About ... Our Team
  const left = links.slice(0, 3);
  const right = links.slice(3);
  const link = (n: (typeof nav)[number]) => (
    <a key={n.href} className="nav-link" href={href(n.href)} aria-current={home && active === n.href ? "true" : undefined}>
      {n.label}
    </a>
  );

  return (
    <>
      <header ref={ref} className={`hdr${open ? " is-open" : ""}`}>
        <div className="container hdr__in">
          <nav className="hdr__side" aria-label="Main">{left.map(link)}</nav>
          <a className="hdr__logo" href={href("#home")} aria-label={`${site.name} home`}>
            <LogoFull className="logo-full" />
            <LogoMark className="logo-mini" />
          </a>
          <div className="hdr__side hdr__side--right">
            {right.map(link)}
            <ButtonLink className="hdr__cta" href={href("#contact")} label="Contact Us" size="sm" />
            <Button
              className="menu-btn"
              size="sm"
              variant={open ? "primary" : "ghost"}
              label={open ? "Close" : "Menu"}
              icon={open ? <Close /> : <Menu />}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            />
          </div>
        </div>
      </header>
      {open && (
        <nav id="mobile-menu" className="drawer" aria-label="Mobile">
          {nav.map((n) => (
            <a key={n.href} href={href(n.href)} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}

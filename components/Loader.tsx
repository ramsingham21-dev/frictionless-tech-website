"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "./Logo";

export const LOADING_TEXT = "Loading your 21st‑century shopping experience.";

const MIN_MS = 2200; // long enough to read the line and see the scan finish
const MAX_MS = 6000; // never hold the visitor longer than this

/**
 * Loading page, shown on every page load until the site is ready.
 * A sheet of black paper: the logo is scanned into view line by line while the
 * counter climbs, then the sheet tears across the middle and opens onto the site.
 * The markup is rendered on the server so it covers the page from the first paint.
 */
export function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = el.querySelector<HTMLElement>(".loader__count");
    const started = performance.now();
    let ready = false;
    let shown = 0;
    let raf = 0;
    let last = started;
    let closing = false;

    const close = () => {
      if (closing) return;
      closing = true;
      el.classList.add("is-done");
      window.setTimeout(() => el.classList.add("is-gone"), reduce ? 50 : 1100);
    };

    const tick = (now: number) => {
      const elapsed = now - started;
      // Climb steadily toward 90% while loading, then run to 100% once ready.
      const target = ready && elapsed >= MIN_MS ? 1 : Math.min(0.9, elapsed / MIN_MS) * (ready ? 1 : 0.95);
      // Time-based easing, so the loader finishes on time even when the browser
      // delivers few frames (low-power mode, background tabs, slow phones).
      const dt = Math.min(1000, now - last);
      last = now;
      shown += (target - shown) * (reduce ? 1 : 1 - Math.pow(0.92, dt / 16.7));
      if (target === 1 && 1 - shown < 0.004) shown = 1;
      el.style.setProperty("--progress", shown.toFixed(4));
      el.style.setProperty("--scan-top", `${(100 - shown * 100).toFixed(2)}%`);
      el.style.setProperty("--scan-on", shown >= 1 ? "0" : "1");
      if (count) count.textContent = `${String(Math.round(shown * 100)).padStart(3, "0")}%`;
      if (shown >= 1) {
        window.setTimeout(close, 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ]).then(() => { ready = true; });
    const cap = window.setTimeout(() => { ready = true; }, MAX_MS - MIN_MS);
    // Hard stop: open the page by MAX_MS plus a beat, whatever the frame rate.
    const hardStop = window.setTimeout(close, MAX_MS + 600);

    document.documentElement.style.overflow = "hidden";
    raf = requestAnimationFrame(tick);
    const release = window.setInterval(() => {
      if (closing) {
        document.documentElement.style.overflow = "";
        window.clearInterval(release);
      }
    }, 100);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(cap);
      window.clearTimeout(hardStop);
      window.clearInterval(release);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const [lead, ...rest] = LOADING_TEXT.split("21st‑century");
  return (
    <div ref={ref} className="loader" role="status" aria-live="polite">
      <div className="loader__half loader__half--top" aria-hidden="true" />
      <div className="loader__half loader__half--bottom" aria-hidden="true" />
      <div className="loader__content">
        <div className="loader__inner">
          <div className="loader__mark" aria-hidden="true">
            <LogoMark className="loader__ghost" />
            <LogoMark className="loader__ink" />
            <span className="loader__scan" />
          </div>
          <p className="loader__text">
            {lead}
            <span className="hl sweep">21st&#8209;century</span>
            {rest.join("21st‑century")}
          </p>
          <div className="loader__meta" aria-hidden="true">
            <span>Frictionless Tech</span>
            <span className="loader__track"><i /></span>
            <span className="loader__count">000%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

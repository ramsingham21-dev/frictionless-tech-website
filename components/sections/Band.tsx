"use client";

import { useEffect, useRef, useState } from "react";

/** "Walk through. Get billed. Keep moving." lights up phrase by phrase as it scrolls into view. */
export function Band({ text }: { text: string }) {
  const phrases = text.split(/(?<=\.)\s+/);
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return setLit(phrases.length);
    let timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        timers = phrases.map((_, i) => window.setTimeout(() => setLit(i + 1), 250 + i * 450));
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [phrases.length]);

  return (
    <div className="band block-yellow torn">
      <div className="container">
        <p ref={ref} className="band__line">
          {phrases.map((p, i) => (
            <span key={p} className={i < lit ? "on" : undefined}>
              {p}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

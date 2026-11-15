"use client";

import { useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { ScanStory } from "@/remotion/ScanStory";
import { DURATION, FPS, HEIGHT, STEP, STEPS, WIDTH } from "@/remotion/constants";

type Step = { title: string; body: string };

/**
 * Scroll-linked walkthrough. The Remotion composition never plays on its own:
 * the page's scroll position picks the frame, so scrolling scrubs the scan
 * forwards and backwards through each step.
 */
export function HowItWorks({ title, steps }: { title: string; steps: Step[] }) {
  const player = useRef<PlayerRef>(null);
  const list = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [ambient, setAmbient] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let target = 0;
    let raf = 0;
    let lastActive = -1;
    let lastAmbient = 0;
    const start = performance.now();
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "200px 0px" });
    if (list.current) io.observe(list.current);

    const measure = () => {
      const items = list.current?.querySelectorAll<HTMLElement>(".how__step");
      if (!items?.length) return;
      const first = items[0].getBoundingClientRect();
      const last = items[items.length - 1].getBoundingClientRect();
      // Focus line: middle of the viewport on desktop; on narrow screens, the space below the sticky stage.
      const stage = list.current?.parentElement?.querySelector(".how__stage")?.getBoundingClientRect();
      const below = stage && stage.left < first.left + 10 ? stage.bottom + (window.innerHeight - stage.bottom) * 0.4 : 0;
      const focus = Math.max(window.innerHeight * 0.55, below);
      // first step's top reaching the focus line = frame 0; last step's centre = final frame
      const from = first.top;
      const to = last.top + last.height / 2;
      const p = Math.min(1, Math.max(0, (focus - from) / Math.max(1, to - from)));
      target = p * (DURATION - 1);
      if (reduce) {
        // jump straight to the finished state of each step
        const s = Math.min(STEPS - 1, Math.floor(target / STEP));
        target = s * STEP + STEP - 8;
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      measure();
      current = reduce ? target : current + (target - current) * 0.16;
      if (Math.abs(target - current) < 0.05) current = target;
      const frame = Math.round(current);
      player.current?.seekTo(frame);
      if (bar.current) bar.current.style.transform = `scaleX(${current / (DURATION - 1)})`;
      const s = Math.min(STEPS - 1, Math.floor(frame / STEP));
      if (s !== lastActive) {
        lastActive = s;
        setActive(s);
      }
      // keep the signal rings and status light alive while the page is still (about 30fps)
      if (!reduce && now - lastAmbient > 33) {
        lastAmbient = now;
        setAmbient((now - start) / 1000);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div id="how-it-works">
      <h3 className="h2 how__title reveal">
        <span className="hl">{title}</span>
      </h3>
      <div className="how">
        <ol className="how__steps" ref={list}>
          {steps.map((s, i) => (
            <li key={s.title} className={`how__step${i === active ? " is-active" : ""}`} aria-current={i === active ? "step" : undefined}>
              <span className="how__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h4 className="h3">{s.title}</h4>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="how__stage paper" aria-hidden="true">
          <div className="how__player">
            <Player
              ref={player}
              component={ScanStory}
              inputProps={{ ambient }}
              durationInFrames={DURATION}
              fps={FPS}
              compositionWidth={WIDTH}
              compositionHeight={HEIGHT}
              controls={false}
              clickToPlay={false}
              doubleClickToFullscreen={false}
              spaceKeyToPlayOrPause={false}
              moveToBeginningWhenEnded={false}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="how__bar"><span ref={bar} /></div>
          <div className="how__caption">
            <span>Step {active + 1} of {steps.length}</span>
            <span>{steps[active].title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

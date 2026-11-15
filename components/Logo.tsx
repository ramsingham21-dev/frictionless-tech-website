import { dot, mark, sub, word1, word2 } from "./logoPaths";

/**
 * Official Frictionless Tech logo, traced to vector from the original artwork.
 * Linework and lettering use currentColor; the signal dot uses --logo-dot.
 * Each part keeps its position from the original 1408x768 artwork, so the
 * viewBoxes below crop the same drawing into different lockups.
 */
type Part = { d: string; x: number; y: number };
const P = ({ part, fill = "currentColor" }: { part: Part; fill?: string }) => (
  <path d={part.d} transform={`translate(${part.x} ${part.y})`} fill={fill} fillRule="evenodd" />
);
const DOT = "var(--logo-dot, #C62828)";

type Props = { className?: string; title?: string };
const a11y = (title?: string) =>
  title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };

/** Stacked: mark, FRICTIONLESS TECH, SMART RETAIL SOLUTIONS. */
export function LogoFull({ className, title }: Props) {
  return (
    <svg viewBox="418 124 573 544" className={className} {...a11y(title)}>
      <P part={mark} />
      <P part={dot} fill={DOT} />
      <P part={word1} />
      <P part={word2} />
      <P part={sub} />
    </svg>
  );
}

/** Wordmark only: FRICTIONLESS over TECH. */
export function LogoWord({ className, title }: Props) {
  return (
    <svg viewBox="419 491 571 138" className={className} {...a11y(title)}>
      <P part={word1} />
      <P part={word2} />
    </svg>
  );
}

/** Mark only: cart, signal and dot. */
export function LogoMark({ className, title }: Props) {
  return (
    <svg viewBox="485 124 432 352" className={className} {...a11y(title)}>
      <P part={mark} />
      <P part={dot} fill={DOT} />
    </svg>
  );
}

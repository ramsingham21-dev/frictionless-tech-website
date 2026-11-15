type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const ArrowRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Check = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="12" cy="12" r="9" opacity=".35" /><path d="m8 12.5 2.6 2.5L16 9.5" /></svg>
);
export const Menu = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 8h16M4 16h16" /></svg>
);
export const Close = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Person = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.1}><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 21c1.4-4 4.3-6.2 7.5-6.2s6.1 2.2 7.5 6.2" /></svg>
);
/** RFID tag: inlay with an antenna coil. */
export const TagIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3" y="6" width="18" height="12" rx="2.5" /><rect x="6.5" y="9" width="11" height="6" rx="1.2" /><rect x="10" y="11" width="4" height="2" rx=".5" /></svg>
);
/** Walk-through gate with signal arcs. */
export const GateIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 21V5M19 21V5" /><path d="M9 10a4 4 0 0 1 6 0M7.5 7.5a7 7 0 0 1 9 0" /><circle cx="12" cy="13" r="1" fill="currentColor" /></svg>
);
/** Shelf with a rising stock line. */
export const StockIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M3 20h18" /><path d="M5 16l4-4 3 3 6-7" /><path d="M15 8h3v3" /></svg>
);

export const featureIcons = { tag: TagIcon, gate: GateIcon, stock: StockIcon } as const;

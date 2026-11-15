import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, STEP, at } from "./constants";

/**
 * The checkout scan, told in five steps:
 * tag the products, carry them through the gate while it scans,
 * match every tag, build the bill, pay and leave.
 *
 * On the website the frame is driven by scroll position (see HowItWorks.tsx).
 * `ambient` keeps the signal rings breathing while the page sits still;
 * when rendered as a video it falls back to the timeline clock.
 */
export type ScanStoryProps = { ambient?: number };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const out = Easing.bezier(0.16, 1, 0.3, 1);
const pop = Easing.spring({ damping: 12, mass: 0.6 });

const DISPLAY = "var(--font-head-face), 'Archivo', 'Arial Narrow', sans-serif";
const SANS = "var(--font-head-face), 'Archivo', 'Helvetica Neue', Arial, sans-serif";

// Gate geometry
const GATE_L = 452;
const GATE_R = 718;
const GATE_TOP = 250;
const GATE_BOTTOM = 790;
const GATE_CX = (GATE_L + GATE_R) / 2 + 15;

// Products in the basket: [x, y, w, h, kind], relative to basket centre
const PRODUCTS = [
  { x: -78, y: -112, w: 58, h: 92, kind: "box" },
  { x: -10, y: -96, w: 42, h: 76, kind: "can" },
  { x: 44, y: -70, w: 56, h: 50, kind: "box" },
] as const;
const TAG_TIMES = [at(0, 10), at(0, 20), at(0, 30)];
const READ_TIMES = [at(1, 38), at(1, 44), at(1, 50)];
const MATCH_TIMES = [at(2, 8), at(2, 20), at(2, 32)];

export const ScanStory = ({ ambient }: ScanStoryProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = ambient ?? frame / fps;
  const step = Math.min(4, Math.floor(frame / STEP));

  // Basket travel: waits on the left, glides into the gate, then exits right after payment.
  const basketX = interpolate(frame, [0, at(1, 6), at(1, 34), at(4, 22), at(4, 52)], [250, 250, GATE_CX, GATE_CX, 1010], { ...clamp, easing: out });
  const basketY = 690;
  const inGate = frame >= at(1, 30) && frame < at(4, 24);

  // Scan beam sweeps the reading plane while the basket is inside.
  const beamOn = interpolate(frame, [at(1, 22), at(1, 30), at(2, 50), at(3, 0)], [0, 1, 1, 0], clamp);
  const beamY = GATE_TOP + 40 + ((Math.sin(t * 3.2) + 1) / 2) * (GATE_BOTTOM - GATE_TOP - 80);

  const ringsOn = interpolate(frame, [at(1, 26), at(1, 34), at(3, 0), at(3, 12)], [0, 1, 1, 0], clamp);
  const readCount = READ_TIMES.filter((rt) => frame >= rt).length;
  const paid = frame >= at(4, 6);

  return (
    <AbsoluteFill style={{ backgroundColor: C.burgundy, fontFamily: SANS, color: C.cream }}>
      {/* Step numeral */}
      <div style={{ position: "absolute", left: 56, top: 40, display: "flex", alignItems: "baseline", gap: 18 }}>
        <span style={{ fontFamily: DISPLAY, fontVariationSettings: '"wdth" 72', fontWeight: 800, fontSize: 150, lineHeight: 0.9, color: C.yellow }}>
          {String(step + 1).padStart(2, "0")}
        </span>
        <span style={{ fontSize: 22, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.75 }}>/ 05</span>
      </div>

      <svg viewBox="0 0 1200 960" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="beam" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={C.blue} stopOpacity="0" />
            <stop offset="0.5" stopColor={C.blue} stopOpacity="0.55" />
            <stop offset="1" stopColor={C.blue} stopOpacity="0" />
          </linearGradient>
          <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill={C.cream} fillOpacity="0.12" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="1200" height="960" fill="url(#dots)" />

        {/* floor */}
        <ellipse cx={GATE_CX} cy={GATE_BOTTOM + 8} rx="430" ry="56" fill="none" stroke={C.cream} strokeOpacity="0.25" strokeWidth="2" />
        <ellipse cx={GATE_CX} cy={GATE_BOTTOM + 8} rx="250" ry="32" fill={C.deep} />

        {/* signal rings radiating from the reading plane */}
        {[0, 1, 2].map((i) => {
          const k = ((t * 0.7 + i / 3) % 1);
          return (
            <ellipse
              key={i}
              cx={GATE_CX}
              cy={(GATE_TOP + GATE_BOTTOM) / 2}
              rx={70 + k * 260}
              ry={110 + k * 300}
              fill="none"
              stroke={C.blue}
              strokeWidth={3}
              opacity={(1 - k) * 0.8 * ringsOn}
            />
          );
        })}

        {/* back pillar */}
        <Pillar x={GATE_R} led={false} paid={paid} active={inGate} />

        {/* scan beam */}
        <rect x={GATE_L + 18} y={beamY - 46} width={GATE_R - GATE_L} height={92} fill="url(#beam)" opacity={beamOn} />
        <line x1={GATE_L + 18} x2={GATE_R + 18} y1={beamY} y2={beamY} stroke={C.blue} strokeWidth="4" opacity={beamOn} />

        {/* basket */}
        <g transform={`translate(${basketX} ${basketY})`}>
          {PRODUCTS.map((p, i) => {
            const tagScale = interpolate(frame, [TAG_TIMES[i], TAG_TIMES[i] + 10], [0, 1], { ...clamp, easing: pop });
            const read = frame >= READ_TIMES[i];
            const flash = interpolate(frame, [READ_TIMES[i], READ_TIMES[i] + 4, READ_TIMES[i] + 14], [0, 1, 0], clamp);
            const tx = p.x + p.w / 2 - 15;
            const ty = p.y + p.h * 0.42;
            return (
              <g key={i}>
                {p.kind === "box" ? (
                  <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="6" fill={C.peach} stroke={C.deep} strokeWidth="3" />
                ) : (
                  <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={p.w / 2.4} fill={C.cream} stroke={C.deep} strokeWidth="3" />
                )}
                <g transform={`translate(${tx + 15} ${ty + 9}) scale(${tagScale}) translate(${-15} ${-9})`}>
                  <rect width="30" height="18" rx="3" fill={read ? C.blue : C.cream} stroke={C.deep} strokeWidth="2.5" />
                  <rect x="8" y="5" width="14" height="8" rx="1.5" fill="none" stroke={read ? C.cream : C.burgundy} strokeWidth="2" />
                </g>
                <circle cx={tx + 15} cy={ty + 9} r={14 + flash * 30} fill="none" stroke={C.blue} strokeWidth="3" opacity={flash} />
              </g>
            );
          })}
          {/* basket body */}
          <path d="M-128 -28 L128 -28 L104 86 L-104 86 Z" fill={C.deep} stroke={C.cream} strokeWidth="4" strokeLinejoin="round" />
          {[-80, -40, 0, 40, 80].map((x) => (
            <line key={x} x1={x} y1={-28} x2={x * 0.81} y2={86} stroke={C.cream} strokeOpacity="0.45" strokeWidth="3" />
          ))}
          <path d="M-88 -28 C-88 -118 88 -118 88 -28" fill="none" stroke={C.cream} strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* front pillar with status LED */}
        <Pillar x={GATE_L} led paid={paid} active={inGate} t={t} />

        {/* step 1: tag ID callout */}
        <g opacity={interpolate(frame, [at(0, 14), at(0, 24), at(1, 4), at(1, 14)], [0, 1, 1, 0], clamp)}>
          <line x1={250 - 40} y1={590} x2={140} y2={470} stroke={C.cream} strokeWidth="2" strokeDasharray="6 6" />
          <rect x="60" y="388" width="300" height="84" rx="14" fill={C.cream} />
          <text x="82" y="420" fill={C.burgundy} fontSize="16" fontWeight="700" letterSpacing="2">UNIQUE TAG ID</text>
          <text x="82" y="452" fill={C.blue} fontSize="24" fontFamily="ui-monospace, Menlo, monospace">
            {"3034 F2A1 0001 2A7C".slice(0, Math.max(0, Math.round(interpolate(frame, [at(0, 18), at(0, 46)], [0, 19], clamp))))}
          </text>
        </g>

        {/* step 2: read counter */}
        <g opacity={interpolate(frame, [at(1, 26), at(1, 34), at(2, 0), at(2, 10)], [0, 1, 1, 0], clamp)}>
          <rect x="826" y="300" width="300" height="120" rx="16" fill={C.cream} />
          <text x="850" y="340" fill={C.burgundy} fontSize="16" fontWeight="700" letterSpacing="2">TAGS READ</text>
          <text x="850" y="398" fill={C.blue} fontSize="58" fontWeight="800" fontFamily={DISPLAY}>{readCount} / 3</text>
        </g>

        {/* step 3: tags matched against the product database */}
        <g opacity={interpolate(frame, [at(2, 0), at(2, 8), at(3, 0), at(3, 10)], [0, 1, 1, 0], clamp)}>
          <rect x="826" y="270" width="320" height="250" rx="16" fill={C.cream} />
          <text x="850" y="310" fill={C.burgundy} fontSize="16" fontWeight="700" letterSpacing="2">PRODUCT DATABASE</text>
          {MATCH_TIMES.map((mt, i) => {
            const k = interpolate(frame, [mt, mt + 10], [0, 1], { ...clamp, easing: out });
            return (
              <g key={i} opacity={k} transform={`translate(${(1 - k) * 24} 0)`}>
                <line x1="850" x2="1122" y1={338 + i * 58} y2={338 + i * 58} stroke={C.burgundy} strokeOpacity="0.2" strokeWidth="2" />
                <text x="850" y={376 + i * 58} fill={C.burgundy} fontSize="24" fontWeight="600">Tag 0{i + 1}</text>
                <rect x="1000" y={354 + i * 58} width="110" height="32" rx="16" fill={C.yellow} stroke={C.burgundy} strokeWidth="2" />
                <text x="1055" y={376 + i * 58} fill={C.burgundy} fontSize="15" fontWeight="700" letterSpacing="1.5" textAnchor="middle">MATCHED</text>
              </g>
            );
          })}
        </g>

        {/* step 4: draft bill unrolls on the POS screen */}
        {(() => {
          const unroll = interpolate(frame, [at(3, 0), at(3, 22)], [0, 1], { ...clamp, easing: out });
          const vis = interpolate(frame, [at(3, 0), at(3, 4), at(4, 4), at(4, 14)], [0, 1, 1, 0], clamp);
          const h = 330 * unroll;
          return (
            <g opacity={vis}>
              <rect x="836" y="250" width="290" height={Math.max(8, h)} rx="14" fill={C.cream} />
              <g opacity={interpolate(frame, [at(3, 14), at(3, 22)], [0, 1], clamp)}>
                <text x="860" y="292" fill={C.burgundy} fontSize="16" fontWeight="700" letterSpacing="2">DRAFT BILL</text>
                {[0, 1, 2].map((i) => (
                  <g key={i}>
                    <rect x="860" y={316 + i * 40} width={[150, 120, 136][i]} height="12" rx="6" fill={C.burgundy} opacity="0.75" />
                    <rect x="1052" y={316 + i * 40} width="50" height="12" rx="6" fill={C.burgundy} opacity="0.4" />
                  </g>
                ))}
                <line x1="860" x2="1102" y1="450" y2="450" stroke={C.burgundy} strokeWidth="2" strokeDasharray="6 6" />
                <text x="860" y="500" fill={C.burgundy} fontSize="18" fontWeight="700" letterSpacing="2">TOTAL</text>
                <rect x="980" y="480" width={122 * interpolate(frame, [at(3, 26), at(3, 46)], [0, 1], { ...clamp, easing: out })} height="28" rx="14" fill={C.yellow} stroke={C.burgundy} strokeWidth="2" />
              </g>
            </g>
          );
        })()}

        {/* step 5: paid stamp and exit */}
        {(() => {
          const s = interpolate(frame, [at(4, 6), at(4, 18)], [0, 1], { ...clamp, easing: pop });
          return (
            <g transform={`translate(980 390) rotate(${-10 + (1 - s) * -20}) scale(${s})`} opacity={s > 0 ? 1 : 0}>
              <circle r="118" fill={C.red} />
              <circle r="100" fill="none" stroke={C.cream} strokeWidth="3" strokeDasharray="4 7" />
              <text y="-8" textAnchor="middle" fill={C.cream} fontSize="58" fontWeight="800" fontFamily={DISPLAY}>PAID</text>
              <text y="34" textAnchor="middle" fill={C.cream} fontSize="16" fontWeight="700" letterSpacing="3">EXIT VERIFIED</text>
            </g>
          );
        })()}
      </svg>
    </AbsoluteFill>
  );
};

function Pillar({ x, led, paid, active, t = 0 }: { x: number; led: boolean; paid: boolean; active: boolean; t?: number }) {
  return (
    <g>
      <rect x={x} y={GATE_TOP} width="36" height={GATE_BOTTOM - GATE_TOP} rx="18" fill={C.deep} stroke={C.cream} strokeWidth="4" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={x + 13}
          y={GATE_TOP + 90 + i * 140}
          width="10"
          height="80"
          rx="5"
          fill={active ? C.yellow : C.cream}
          opacity={active ? 1 : 0.35}
        />
      ))}
      {led && (
        <circle cx={x + 18} cy={GATE_TOP - 26} r="11" fill={paid ? C.yellow : C.red} opacity={paid ? 1 : 0.55 + 0.45 * Math.round((Math.sin(t * 5) + 1) / 2)} />
      )}
    </g>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Phase } from "./GateScene";

function StageFallback() {
  return (
    <div className="stage-fallback" aria-hidden="true">
      {[30, 52, 74, 96].map((s) => (
        <span key={s} style={{ width: `${s}%`, height: `${s}%` }} />
      ))}
    </div>
  );
}

const GateScene = dynamic(() => import("./GateScene"), { ssr: false, loading: StageFallback });

const readout: Record<Phase, { status: string; items: string; bill: string }> = {
  approach: { status: "Waiting for basket", items: "0", bill: "Empty" },
  reading: { status: "Reading tags", items: "3", bill: "Building" },
  billed: { status: "Bill ready", items: "3", bill: "Ready to pay" },
};

export function HeroStage({ label }: { label: string }) {
  const [phase, setPhase] = useState<Phase>("approach");
  const r = readout[phase];
  return (
    <div className="hero__stage" role="img" aria-label="Animated concept of a shopping basket passing through an RFID checkout gate">
      <GateScene onPhase={setPhase} />
      <div className="hero__readout" aria-hidden="true">
        <span className="live">{r.status}</span>
        <span>Items detected <b>{r.items}</b></span>
        <span>Bill <b>{r.bill}</b></span>
      </div>
      <span className="hero__label">{label}</span>
    </div>
  );
}

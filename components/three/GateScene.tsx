"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Edges, Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Hero scene: a frosted checkout gate. A basket of tagged products glides through,
 * signal rings pulse as it crosses the reading plane, and the tags light up.
 * Everything is procedural, so there are no model files to download.
 */

const ICE = new THREE.Color("#FF8F00"); // the scan: orange
const ELECTRIC = new THREE.Color("#161616"); // ink
const YELLOW = new THREE.Color("#FBC02D"); // tags: amber
const RED = new THREE.Color("#C62828");
const LOOP = 7.5; // seconds per pass
const TRAVEL = 3.4; // basket travels from +z to -z

export type Phase = "approach" | "reading" | "billed";

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function Pillar({ x, children }: { x: number; children?: React.ReactNode }) {
  return (
    <group position={[x, 1.3, 0]}>
      <RoundedBox args={[0.26, 2.6, 0.62]} radius={0.12} smoothness={6}>
        <meshPhysicalMaterial
          color="#FCFCEE"
          roughness={0.2}
          metalness={0.05}
          transparent
          opacity={0.82}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={1.4}
          depthWrite={false}
        />
      </RoundedBox>
      {/* antenna strips on the inner face */}
      {[-0.7, 0, 0.7].map((y) => (
        <mesh key={y} position={[x > 0 ? -0.135 : 0.135, y, 0]}>
          <boxGeometry args={[0.012, 0.42, 0.36]} />
          <meshBasicMaterial color={ICE} toneMapped={false} transparent opacity={0.85} />
        </mesh>
      ))}
      {children}
    </group>
  );
}

function StatusLed() {
  const ref = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.opacity = 0.45 + 0.55 * (Math.sin(clock.elapsedTime * 3) > 0 ? 1 : 0.2);
  });
  return (
    <mesh position={[0, 1.36, 0]}>
      <sphereGeometry args={[0.045, 24, 24]} />
      <meshBasicMaterial ref={ref} color={RED} toneMapped={false} transparent />
    </mesh>
  );
}

function PosScreen({ phase }: { phase: Phase }) {
  const lines = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!lines.current) return;
    lines.current.children.forEach((c, i) => {
      const m = c as THREE.Mesh;
      const target = phase === "approach" ? 0 : phase === "reading" ? (i < 2 ? 1 : 0) : 1;
      m.scale.x = THREE.MathUtils.damp(m.scale.x, Math.max(0.001, target), 6, dt);
    });
  });
  return (
    <group position={[-0.2, 0.15, 0.2]} rotation={[0, -0.5, 0]}>
      <RoundedBox args={[0.5, 0.36, 0.03]} radius={0.02}>
        <meshStandardMaterial color="#161616" roughness={0.5} metalness={0.1} />
      </RoundedBox>
      <group ref={lines} position={[-0.17, 0.08, 0.017]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, -i * 0.065, 0]}>
            <planeGeometry args={[0.3, 0.022]} />
            <meshBasicMaterial color={i === 2 ? "#FBC02D" : "#FCFCEE"} toneMapped={false} transparent opacity={0.95} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Product({ position, size, kind }: { position: [number, number, number]; size: [number, number, number]; kind: "box" | "can" }) {
  return (
    <group position={position}>
      {kind === "box" ? (
        <mesh>
          <boxGeometry args={size} />
          <meshStandardMaterial color="#FBC02D" roughness={0.7} metalness={0} />
          <Edges color="#161616" />
        </mesh>
      ) : (
        <mesh>
          <cylinderGeometry args={[size[0] / 2, size[0] / 2, size[1], 32]} />
          <meshStandardMaterial color="#C62828" roughness={0.35} metalness={0.3} />
        </mesh>
      )}
    </group>
  );
}

function Basket({ tagMat }: { tagMat: THREE.MeshBasicMaterial }) {
  const shape = useMemo(() => {
    // Tapered open basket: bottom and four walls as a thin wire frame.
    const top = { w: 0.86, d: 0.56, y: 0.42 };
    const bot = { w: 0.7, d: 0.44, y: 0 };
    const c = (w: number, d: number, y: number) => [
      new THREE.Vector3(-w / 2, y, -d / 2),
      new THREE.Vector3(w / 2, y, -d / 2),
      new THREE.Vector3(w / 2, y, d / 2),
      new THREE.Vector3(-w / 2, y, d / 2),
    ];
    const T = c(top.w, top.d, top.y);
    const B = c(bot.w, bot.d, bot.y);
    const segs: THREE.Vector3[] = [];
    for (let i = 0; i < 4; i++) {
      segs.push(T[i], T[(i + 1) % 4], B[i], B[(i + 1) % 4], T[i], B[i]);
    }
    // vertical slats
    for (let k = 1; k < 6; k++) {
      const f = k / 6;
      [0, 2].forEach((i) => {
        const a = T[i].clone().lerp(T[(i + 1) % 4], f);
        const b = B[i].clone().lerp(B[(i + 1) % 4], f);
        segs.push(a, b);
      });
    }
    return new THREE.BufferGeometry().setFromPoints(segs);
  }, []);

  return (
    <group>
      <lineSegments geometry={shape}>
        <lineBasicMaterial color={ELECTRIC} transparent opacity={1} />
      </lineSegments>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.7, 0.44]} />
        <meshStandardMaterial color="#161616" transparent opacity={0.85} />
      </mesh>
      {/* handle */}
      <mesh position={[0, 0.62, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.24, 0.012, 8, 48, Math.PI]} />
        <meshStandardMaterial color="#161616" metalness={0.2} roughness={0.4} />
      </mesh>
      <Product position={[-0.18, 0.17, -0.05]} size={[0.24, 0.32, 0.16]} kind="box" />
      <Product position={[0.12, 0.13, 0.06]} size={[0.14, 0.26, 0.14]} kind="can" />
      <Product position={[0.2, 0.09, -0.1]} size={[0.2, 0.16, 0.12]} kind="box" />
      {/* RFID tags on the products */}
      {[
        [-0.18, 0.2, 0.031],
        [0.12, 0.14, 0.131],
        [0.2, 0.1, -0.039],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} material={tagMat}>
          <planeGeometry args={[0.09, 0.05]} />
        </mesh>
      ))}
    </group>
  );
}

function Rings({ strength }: { strength: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const offsets = [0, 0.33, 0.66];
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const m = child as THREE.Mesh;
      const t = (clock.elapsedTime * 0.7 + offsets[i]) % 1;
      const s = 0.3 + t * 1.6;
      m.scale.setScalar(s);
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.65 * strength.current;
    });
  });
  return (
    <group ref={group} position={[0, 1.15, 0]}>
      {offsets.map((o) => (
        <mesh key={o}>
          <torusGeometry args={[1, 0.006, 8, 96]} />
          <meshBasicMaterial color={ICE} transparent opacity={0} toneMapped={false} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingTags() {
  const tags = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        pos: [
          (i % 2 ? 1 : -1) * (1.9 + (i * 0.37) % 1.1),
          0.6 + ((i * 0.83) % 2.4),
          -1.6 + ((i * 1.31) % 2.2),
        ] as [number, number, number],
        rot: [i * 0.7, i * 1.3, i * 0.4] as [number, number, number],
        speed: 0.8 + (i % 3) * 0.35,
      })),
    [],
  );
  return (
    <>
      {tags.map((t, i) => (
        <Float key={i} speed={t.speed} rotationIntensity={0.8} floatIntensity={0.8}>
          <group position={t.pos} rotation={t.rot}>
            <RoundedBox args={[0.34, 0.2, 0.012]} radius={0.02}>
              <meshPhysicalMaterial color="#FBC02D" transparent opacity={0.9} roughness={0.6} />
            </RoundedBox>
            <mesh position={[0, 0, 0.008]}>
              <ringGeometry args={[0.045, 0.06, 4, 1, Math.PI / 4]} />
              <meshBasicMaterial color={ICE} toneMapped={false} transparent opacity={0.8} />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  );
}

function Rig({ still, onPhase }: { still: boolean; onPhase?: (p: Phase) => void }) {
  const basket = useRef<THREE.Group>(null);
  const ringStrength = useRef(still ? 1 : 0);
  const [phase, setPhase] = useState<Phase>(still ? "billed" : "approach");
  const tagMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: YELLOW.clone(), toneMapped: false, transparent: true, opacity: 0.35 }),
    [],
  );
  const lastPhase = useRef<Phase>(phase);

  useFrame(({ clock, camera, pointer }, dt) => {
    const t = still ? 0.5 : (clock.elapsedTime % LOOP) / LOOP;
    const z = THREE.MathUtils.lerp(TRAVEL, -TRAVEL, easeInOut(t));
    if (basket.current) {
      basket.current.position.z = z;
      basket.current.position.y = 0.55 + Math.sin(clock.elapsedTime * 1.6) * (still ? 0 : 0.015);
    }
    const near = Math.abs(z) < 0.9;
    const next: Phase = z > 0.9 ? "approach" : near ? "reading" : "billed";
    ringStrength.current = THREE.MathUtils.damp(ringStrength.current, near || still ? 1 : 0, 5, dt);
    const glow = near || still ? 1 : next === "billed" ? 0.75 : 0.3;
    tagMat.opacity = THREE.MathUtils.damp(tagMat.opacity, glow, 6, dt);
    tagMat.color.lerpColors(YELLOW, ICE, near ? 1 : 0);

    if (next !== lastPhase.current) {
      lastPhase.current = next;
      setPhase(next);
      onPhase?.(next);
    }

    if (!still) {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, 4.3 + pointer.x * 0.7, 2.5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 2.8 + pointer.y * 0.4, 2.5, dt);
      camera.lookAt(0, 1.15, 0);
    }
  });

  return (
    <>
      <Pillar x={-1.1}>
        <StatusLed />
      </Pillar>
      <Pillar x={1.1}>
        <PosScreen phase={phase} />
      </Pillar>
      <Rings strength={ringStrength} />
      <group ref={basket} position={[0, 0.55, TRAVEL]}>
        <Basket tagMat={tagMat} />
      </group>
    </>
  );
}

export default function GateScene({ onPhase }: { onPhase?: (p: Phase) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const onChange = () => setStill(mq.matches);
    mq.addEventListener("change", onChange);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    if (wrap.current) io.observe(wrap.current);
    return () => {
      mq.removeEventListener("change", onChange);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        frameloop={still ? "demand" : visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [4.3, 2.8, 6.6], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ camera }) => camera.lookAt(0, 1.15, 0)}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 3]} intensity={1.3} color="#fff4ea" />
        <pointLight position={[0, 1.4, 0.6]} intensity={3} distance={4} color="#FF8F00" />
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={2} color="#FCFCEE" position={[0, 4, -3]} scale={[8, 2, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#FBC02D" position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
          <Lightformer form="ring" intensity={1.2} color="#ffffff" position={[4, 2, 4]} scale={2} />
        </Environment>

        <Rig still={still} onPhase={onPhase} />
        <FloatingTags />

        {/* floor glow and grounding */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
          <ringGeometry args={[1.4, 1.42, 96]} />
          <meshBasicMaterial color={ELECTRIC} transparent opacity={0.5} toneMapped={false} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
          <ringGeometry args={[2.3, 2.315, 96]} />
          <meshBasicMaterial color={ELECTRIC} transparent opacity={0.22} toneMapped={false} />
        </mesh>
        <ContactShadows position={[0, 0, 0]} opacity={0.35} scale={8} blur={2.6} far={3} color="#161616" />
      </Canvas>
    </div>
  );
}

"use client";

import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, OrbitControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { ArrowLeft, Settings, ChevronDown, ChevronUp, Copy, RotateCcw, Check } from "lucide-react";

// --- Config Types ---

type RibProfile = "sine" | "prism" | "blaze";

type GlassConfig = {
  transmission: number;
  thickness: number;
  roughness: number;
  chromaticAberration: number;
  anisotropy: number;
  distortion: number;
  ior: number;
  color: string;
  attenuationColor: string;
  attenuationDistance: number;
  ribFrequency: number;
  ribIntensity: number;
  ribRotation: number;
  ribSharpness: number;
  ribProfile: RibProfile;
  samples: number;
};

type CubeConfig = {
  speed: number;
  color: string;
  positionZ: number;
  axisX: number;
  axisY: number;
  axisZ: number;
};

// --- Defaults (tuned to Raycast hero look) ---

const DEFAULT_GLASS: GlassConfig = {
  transmission: 1,
  thickness: 3.3,
  roughness: 0,        // User requested no white light/specular
  chromaticAberration: 0.22,
  anisotropy: 2.5,
  distortion: 0.2,
  ior: 1.2,
  color: "#ffffff",
  attenuationColor: "#ffffff",
  attenuationDistance: 0.5,
  ribFrequency: 20,
  ribIntensity: 0.5,
  ribRotation: 139,
  ribSharpness: 4,
  ribProfile: "sine",    // HeroArtifact uses Math.cos, which is sine-like
  samples: 16,
};

const DEFAULT_CUBE: CubeConfig = {
  speed: 0.3,
  color: "#ff0040",
  positionZ: -0.7,
  axisX: 0.9,
  axisY: 1.1,
  axisZ: 1.4,
};

// --- Static geometries ---

const cubeBoxGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const edgesBoxGeo = new THREE.BoxGeometry(1.51, 1.51, 1.51);
const glassPlaneGeo = new THREE.PlaneGeometry(6, 6);

// --- Rib wave functions ---
// All return a value in [-1, 1] for a given phase [0, 1]

function applySharpness(raw: number, sharpness: number): number {
  return Math.sign(raw) * Math.pow(Math.abs(raw), 1 / sharpness);
}

function sineWave(phase: number, sharpness: number): number {
  // Smooth cosine — soft cylindrical lenses
  return applySharpness(Math.cos(phase * Math.PI * 2), sharpness);
}

function prismWave(phase: number, sharpness: number): number {
  // Triangle wave — symmetric V-groove ribs (lenticular/Raycast look)
  const tri = phase < 0.5 ? phase * 4 - 1 : 3 - phase * 4;
  return applySharpness(tri, sharpness);
}

function blazeWave(phase: number, sharpness: number): number {
  // Sawtooth — all ribs tilt same direction (blaze grating)
  const saw = phase * 2 - 1;
  return applySharpness(saw, sharpness);
}

// --- Scene Components ---

function RotatingCube({ config }: { config: CubeConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * config.speed * config.axisX;
    meshRef.current.rotation.y += delta * config.speed * config.axisY;
    meshRef.current.rotation.z += delta * config.speed * config.axisZ;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, config.positionZ]} geometry={cubeBoxGeo}>
      <meshStandardMaterial color={config.color} emissive={config.color} emissiveIntensity={0.5} />
      <lineSegments>
        <edgesGeometry args={[edgesBoxGeo]} />
        <lineBasicMaterial color="white" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  );
}

function FrostedGlass({ config }: { config: GlassConfig }) {
  const normalMap = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    const size = 1024;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const freq = config.ribFrequency;
    const rad = (config.ribRotation * Math.PI) / 180;
    const cosR = Math.cos(rad);
    const sinR = Math.sin(rad);

    const waveFn =
      config.ribProfile === "prism" ? prismWave :
      config.ribProfile === "blaze" ? blazeWave :
      sineWave;

    const imgData = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;
        const projected = (x / size) * cosR + (y / size) * sinR;
        // phase: wrap into [0,1] per rib period
        const phase = ((projected * freq) % 1 + 1) % 1;
        const val = waveFn(phase, config.ribSharpness);
        imgData.data[idx]     = (val * cosR * 0.5 + 0.5) * 255;
        imgData.data[idx + 1] = (val * sinR * 0.5 + 0.5) * 255;
        imgData.data[idx + 2] = 255;
        imgData.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [config.ribFrequency, config.ribRotation, config.ribIntensity, config.ribSharpness, config.ribProfile]);

  useEffect(() => {
    return () => { normalMap?.dispose(); };
  }, [normalMap]);

  const normalScale = useMemo(
    () => new THREE.Vector2(config.ribIntensity, config.ribIntensity),
    [config.ribIntensity]
  );

  return (
    <mesh position={[0, 0, 1]} geometry={glassPlaneGeo}>
      <MeshTransmissionMaterial
        backside={true}
        transmission={config.transmission}
        thickness={config.thickness}
        roughness={config.roughness}
        chromaticAberration={config.chromaticAberration}
        anisotropy={config.anisotropy}
        distortion={config.distortion}
        ior={config.ior}
        color={config.color}
        attenuationColor={config.attenuationColor}
        attenuationDistance={config.attenuationDistance}
        normalMap={normalMap || undefined}
        normalScale={normalScale}
        temporalDistortion={0}
        samples={config.samples}
        resolution={1024}
      />
    </mesh>
  );
}

// --- Controls UI ---

function Slider({
  label, value, min, max, step, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
}) {
  const decimals = step < 0.1 ? 2 : step < 1 ? 1 : 0;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs">
        <span className="text-white/40">{label}</span>
        <span className="text-white/70 font-mono tabular-nums">{value.toFixed(decimals)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-[3px] appearance-none bg-white/10 rounded-full cursor-pointer accent-white"
      />
    </div>
  );
}

function ColorRow({
  label, value, onChange,
}: {
  label: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/40">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/70 font-mono">{value}</span>
        <input
          type="color" value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-6 h-6 rounded-md cursor-pointer border border-white/20 bg-transparent"
        />
      </div>
    </div>
  );
}

function ProfilePicker({
  value, onChange,
}: {
  value: RibProfile; onChange: (v: RibProfile) => void;
}) {
  const options: { id: RibProfile; label: string; hint: string }[] = [
    { id: "sine",  label: "Sine",  hint: "Soft cylindrical lens" },
    { id: "prism", label: "Prism", hint: "V-groove, Raycast look" },
    { id: "blaze", label: "Blaze", hint: "Sawtooth, one direction" },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-white/40">Profile</span>
      <div className="flex gap-1">
        {options.map((o) => (
          <button
            key={o.id}
            title={o.hint}
            onClick={() => onChange(o.id)}
            className={`flex-1 py-1 text-[11px] rounded-lg border transition-all ${
              value === o.id
                ? "border-white/40 bg-white/10 text-white"
                : "border-white/10 bg-white/5 text-white/40 hover:text-white/60"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Section({
  title, children, defaultOpen = true,
}: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-[10px] font-semibold uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors"
      >
        {title}
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {open && <div className="flex flex-col gap-3 pb-3 border-b border-white/5">{children}</div>}
      {!open && <div className="border-b border-white/5" />}
    </div>
  );
}

// --- WebGL check ---

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch { return false; }
}

// --- Page ---

export default function Playground() {
  const [mounted, setMounted] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [glass, setGlass] = useState<GlassConfig>(DEFAULT_GLASS);
  const [cube, setCube] = useState<CubeConfig>(DEFAULT_CUBE);
  const [panelOpen, setPanelOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setWebglAvailable(isWebGLAvailable());
    // Load saved config from localStorage
    try {
      const saved = localStorage.getItem("playground-config");
      if (saved) {
        const { glass: g, cube: c } = JSON.parse(saved);
        if (g) setGlass((prev) => ({ ...prev, ...g }));
        if (c) setCube((prev) => ({ ...prev, ...c }));
      }
    } catch {}
    setMounted(true);
  }, []);

  // Auto-save config to localStorage whenever it changes
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("playground-config", JSON.stringify({ glass, cube }));
  }, [glass, cube, mounted]);

  const copyConfig = useCallback(() => {
    const snippet =
      `const GLASS_CONFIG = ${JSON.stringify(glass, null, 2)};\n\n` +
      `const CUBE_CONFIG = ${JSON.stringify(cube, null, 2)};`;
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [glass, cube]);

  const resetConfig = useCallback(() => {
    setGlass(DEFAULT_GLASS);
    setCube(DEFAULT_CUBE);
  }, []);

  const setG = useCallback(<K extends keyof GlassConfig>(key: K, val: GlassConfig[K]) => {
    setGlass((prev) => ({ ...prev, [key]: val }));
  }, []);

  const setC = useCallback(<K extends keyof CubeConfig>(key: K, val: CubeConfig[K]) => {
    setCube((prev) => ({ ...prev, [key]: val }));
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#07080a" }}>
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <button
        onClick={() => setPanelOpen((v) => !v)}
        className="absolute top-6 right-6 z-10 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
      >
        <Settings className="w-4 h-4" />
        {panelOpen ? "Hide" : "Controls"}
      </button>

      {panelOpen && (
        <div className="absolute top-[72px] right-6 z-10 w-64 max-h-[calc(100vh-96px)] overflow-y-auto rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl p-4 flex flex-col gap-1">
          {/* Toolbar */}
          <div className="flex gap-2 pb-3 border-b border-white/5">
            <button
              onClick={copyConfig}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy config"}
            </button>
            <button
              onClick={resetConfig}
              title="Reset to defaults"
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <Section title="Ribs">
            <ProfilePicker value={glass.ribProfile} onChange={(v) => setG("ribProfile", v)} />
            <Slider label="Frequency"  value={glass.ribFrequency} min={1}   max={80}  step={1}    onChange={(v) => setG("ribFrequency", v)} />
            <Slider label="Intensity"  value={glass.ribIntensity} min={0}   max={4}   step={0.05} onChange={(v) => setG("ribIntensity", v)} />
            <Slider label="Sharpness"  value={glass.ribSharpness} min={0.1} max={10}  step={0.1}  onChange={(v) => setG("ribSharpness", v)} />
            <Slider label="Rotation °" value={glass.ribRotation}  min={0}   max={360} step={1}    onChange={(v) => setG("ribRotation", v)} />
          </Section>

          <Section title="Transmission">
            <Slider label="Roughness"            value={glass.roughness}           min={0}    max={1}   step={0.01} onChange={(v) => setG("roughness", v)} />
            <Slider label="IOR"                  value={glass.ior}                 min={1}    max={2.5} step={0.01} onChange={(v) => setG("ior", v)} />
            <Slider label="Thickness"            value={glass.thickness}           min={0}    max={10}  step={0.1}  onChange={(v) => setG("thickness", v)} />
            <Slider label="Transmission"         value={glass.transmission}        min={0}    max={1}   step={0.01} onChange={(v) => setG("transmission", v)} />
            <Slider label="Attenuation Distance" value={glass.attenuationDistance} min={0.01} max={5}   step={0.01} onChange={(v) => setG("attenuationDistance", v)} />
          </Section>

          <Section title="Optics">
            <Slider label="Chromatic Aberration" value={glass.chromaticAberration} min={0} max={5}  step={0.05} onChange={(v) => setG("chromaticAberration", v)} />
            <Slider label="Anisotropy"           value={glass.anisotropy}          min={0} max={10} step={0.1}  onChange={(v) => setG("anisotropy", v)} />
            <Slider label="Distortion"           value={glass.distortion}          min={0} max={2}  step={0.01} onChange={(v) => setG("distortion", v)} />
          </Section>

          <Section title="Color">
            <ColorRow label="Glass Tint"  value={glass.color}           onChange={(v) => setG("color", v)} />
            <ColorRow label="Attenuation" value={glass.attenuationColor} onChange={(v) => setG("attenuationColor", v)} />
          </Section>

          <Section title="Quality">
            <Slider label="Samples" value={glass.samples} min={1} max={32} step={1} onChange={(v) => setG("samples", v)} />
          </Section>

          <Section title="Cube" defaultOpen={false}>
            <ColorRow label="Color" value={cube.color} onChange={(v) => setC("color", v)} />
            <Slider label="Speed"  value={cube.speed}     min={0}  max={3}  step={0.01} onChange={(v) => setC("speed", v)} />
            <Slider label="Axis X" value={cube.axisX}     min={0}  max={3}  step={0.1}  onChange={(v) => setC("axisX", v)} />
            <Slider label="Axis Y" value={cube.axisY}     min={0}  max={3}  step={0.1}  onChange={(v) => setC("axisY", v)} />
            <Slider label="Axis Z" value={cube.axisZ}     min={0}  max={3}  step={0.1}  onChange={(v) => setC("axisZ", v)} />
            <Slider label="Depth"  value={cube.positionZ} min={-3} max={0}  step={0.1}  onChange={(v) => setC("positionZ", v)} />
          </Section>
        </div>
      )}

      {mounted && webglAvailable && (
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ alpha: false, failIfMajorPerformanceCaveat: false }}
          >
            <color attach="background" args={["#07080a"]} />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <RotatingCube config={cube} />
            </Float>

            <FrostedGlass config={glass} />

            <OrbitControls enableZoom={true} enablePan={false} makeDefault />
          </Canvas>
        </div>
      )}

      {mounted && !webglAvailable && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/30 text-sm">WebGL is not available in this environment.</p>
        </div>
      )}
    </main>
  );
}

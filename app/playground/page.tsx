"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, OrbitControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { Sliders, RefreshCw, Box, Layers, MousePointer2, ArrowLeft, Waves, Move, Rotate3d, Save, Check, Compass } from "lucide-react";
import Link from "next/link";

// --- Types ---

interface GlassConfig {
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
}

interface CubeConfig {
  speed: number;
  color: string;
  positionZ: number;
  axisX: number;
  axisY: number;
  axisZ: number;
}

// --- Scene Components ---

function RotatingCube({ config }: { config: CubeConfig }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * config.speed * config.axisX;
    meshRef.current.rotation.y += delta * config.speed * config.axisY;
    meshRef.current.rotation.z += delta * config.speed * config.axisZ;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, config.positionZ]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={config.color} emissive={config.color} emissiveIntensity={0.5} />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.51, 1.51, 1.51)]} />
        <lineBasicMaterial color="white" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  );
}

function FrostedGlass({ config }: { config: GlassConfig }) {
  const normalMap = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const size = 512;
    const freq = config.ribFrequency;
    const rad = (config.ribRotation * Math.PI) / 180;
    const cosR = Math.cos(rad);
    const sinR = Math.sin(rad);

    const imgData = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;
        
        // Project current pixel onto the rib normal direction
        const projected = (x / size) * cosR + (y / size) * sinR;
        const angle = projected * Math.PI * 2 * freq;
        
        // The normal perturbation (derivative of the sine wave)
        const val = Math.cos(angle); 
        
        // Normal X and Y components based on rotation
        imgData.data[idx] = (val * cosR * 0.5 + 0.5) * 255;
        imgData.data[idx + 1] = (val * sinR * 0.5 + 0.5) * 255;
        imgData.data[idx + 2] = 255; // Blue (Z) is constant
        imgData.data[idx + 3] = 255; // Alpha
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [config.ribFrequency, config.ribRotation]);

  return (
    <mesh position={[0, 0, 1]}>
      <planeGeometry args={[6, 6]} />
      <MeshTransmissionMaterial
        backside={true}
        {...config}
        normalMap={normalMap || undefined}
        normalScale={new THREE.Vector2(config.ribIntensity, config.ribIntensity)}
        distortion={0.5}
        temporalDistortion={0.1}
      />
    </mesh>
  );
}

// --- Constants ---

const FINAL_CONFIG = {
  glass: {
    transmission: 1,
    thickness: 1.1,
    roughness: 0.42,
    chromaticAberration: 0.51,
    anisotropy: 1.4,
    distortion: 0.2,
    ior: 1.2,
    color: "#ffffff",
    attenuationColor: "#ffffff",
    attenuationDistance: 0.5,
    ribFrequency: 20,
    ribIntensity: 0.5,
    ribRotation: 139,
  },
  cube: {
    speed: 0.3,
    color: "#ff0040",
    positionZ: -0.7,
    axisX: 0.9,
    axisY: 1.1,
    axisZ: 1.4,
  }
};

// --- Main Playground Page ---

export default function Playground() {
  const [config, setConfig] = useState<GlassConfig>(FINAL_CONFIG.glass);
  const [cubeConfig, setCubeConfig] = useState<CubeConfig>(FINAL_CONFIG.cube);

  const [viewMode, setViewMode] = useState<"standard" | "behind">("standard");
  const [copied, setCopied] = useState(false);

  const saveView = () => {
    const fullConfig = { glass: config, cube: cubeConfig };
    navigator.clipboard.writeText(JSON.stringify(fullConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetToFinal = () => {
    setConfig(FINAL_CONFIG.glass);
    setCubeConfig(FINAL_CONFIG.cube);
  };

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden font-sans text-white">
      {/* Back Button */}
      <Link 
        href="/"
        className="absolute top-8 right-8 z-10 px-4 py-2 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-xl flex items-center gap-2 hover:bg-zinc-800 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={["#050505"]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} color="#ff00ff" />
          <Environment preset="city" />

          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <RotatingCube config={cubeConfig} />
          </Float>

          {viewMode === "standard" && <FrostedGlass config={config} />}

          <OrbitControls enableZoom={true} enablePan={false} makeDefault />
        </Canvas>
      </div>

      {/* UI Controls Overlay */}
      <div className="absolute top-8 left-8 z-10 w-80 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-semibold tracking-tight">Pro Playground</h1>
          </div>
          <button 
            onClick={saveView}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors group relative"
            title="Save View Config"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4 text-zinc-400 group-hover:text-white" />}
          </button>
        </div>

        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
          {/* Ribbed Effect */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Waves className="w-3 h-3" /> Ribbed Texture
            </h2>
            
            <ControlItem label="Rotation Angle" value={config.ribRotation} min={0} max={360} step={1} 
              onChange={(v) => setConfig({ ...config, ribRotation: v })} />

            <ControlItem label="Frequency" value={config.ribFrequency} min={0} max={100} step={1} 
              onChange={(v) => setConfig({ ...config, ribFrequency: v })} />
            
            <ControlItem label="Intensity" value={config.ribIntensity} min={0} max={2} step={0.01} 
              onChange={(v) => setConfig({ ...config, ribIntensity: v })} />
          </section>

          {/* Cube Transformation */}
          <section className="space-y-3 pt-2 border-t border-white/5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Move className="w-3 h-3" /> Cube Transform
            </h2>
            
            <ControlItem label="Distance (Z)" value={cubeConfig.positionZ} min={-10} max={0.5} step={0.1} 
              onChange={(v) => setCubeConfig({ ...cubeConfig, positionZ: v })} />

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-zinc-400"><Rotate3d className="w-3 h-3" /> Axis Weights</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-500 font-mono">X</span>
                  <input type="range" min={0} max={2} step={0.1} value={cubeConfig.axisX} 
                    onChange={(e) => setCubeConfig({...cubeConfig, axisX: parseFloat(e.target.value)})}
                    className="w-full h-1 bg-zinc-800 accent-purple-500 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-500 font-mono">Y</span>
                  <input type="range" min={0} max={2} step={0.1} value={cubeConfig.axisY} 
                    onChange={(e) => setCubeConfig({...cubeConfig, axisY: parseFloat(e.target.value)})}
                    className="w-full h-1 bg-zinc-800 accent-purple-500 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-500 font-mono">Z</span>
                  <input type="range" min={0} max={2} step={0.1} value={cubeConfig.axisZ} 
                    onChange={(e) => setCubeConfig({...cubeConfig, axisZ: parseFloat(e.target.value)})}
                    className="w-full h-1 bg-zinc-800 accent-purple-500 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
            </div>
            
            <ControlItem label="Rotation Speed" value={cubeConfig.speed} min={0} max={5} step={0.1} 
              onChange={(v) => setCubeConfig({ ...cubeConfig, speed: v })} />
            
            <div className="flex items-center justify-between py-1 border-t border-white/5 mt-2">
              <span className="text-sm text-zinc-300">Cube Color</span>
              <input 
                type="color" 
                value={cubeConfig.color} 
                onChange={(e) => setCubeConfig({ ...cubeConfig, color: e.target.value })}
                className="w-12 h-6 bg-transparent rounded cursor-pointer border-none"
              />
            </div>
          </section>

          {/* Glass Material */}
          <section className="space-y-3 pt-2 border-t border-white/5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Layers className="w-3 h-3" /> Glass Material
            </h2>
            
            <ControlItem label="Anisotropy" value={config.anisotropy} min={0} max={10} step={0.1} 
              onChange={(v) => setConfig({ ...config, anisotropy: v })} />

            <ControlItem label="Chroma Ab" value={config.chromaticAberration} min={0} max={2} step={0.01} 
              onChange={(v) => setConfig({ ...config, chromaticAberration: v })} />

            <ControlItem label="Roughness" value={config.roughness} min={0} max={1} step={0.01} 
              onChange={(v) => setConfig({ ...config, roughness: v })} />
            
            <ControlItem label="Thickness" value={config.thickness} min={0} max={5} step={0.1} 
              onChange={(v) => setConfig({ ...config, thickness: v })} />
          </section>
        </div>

        <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
          <button 
            onClick={() => setViewMode(viewMode === "standard" ? "behind" : "standard")}
            className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all rounded-lg text-sm font-medium flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${viewMode === "behind" ? "rotate-180" : ""}`} />
            {viewMode === "standard" ? "Remove Glass" : "Add Glass"}
          </button>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </main>
  );
}

function ControlItem({ label, value, min, max, step, onChange }: { label: string, value: number, min: number, max: number, step: number, onChange: (v: number) => void }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="text-sm text-zinc-300">{label}</label>
        <span className="text-xs font-mono text-zinc-500">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
      />
    </div>
  );
}

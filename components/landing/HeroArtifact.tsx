"use client";

import React, { useRef, useMemo, useEffect, useState, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Final Config (Applied from user settings)
// ---------------------------------------------------------------------------

const CONFIG = {
  glass: {
    transmission: 0.51,
    thickness: 0.7,
    roughness: 0.62,
    chromaticAberration: 2.75,
    anisotropy: 0,
    distortion: 0.7,
    ior: 1.26,
    color: "#ffffff",
    attenuationColor: "#ffffff",
    attenuationDistance: 5,
    ribFrequency: 17,
    ribIntensity: 0.85,
    ribRotation: 139,
    ribSharpness: 1.4,
    ribProfile: "blaze" as "sine" | "prism" | "blaze",
    samples: 6,
  },
  cube: {
    speed: 0.2,
    color: "#ff0040",
    positionX: 0,
    positionY: -0.2,
    positionZ: -2.4,
    axisX: 0.9,
    axisY: 1.1,
    axisZ: 1.4,
    glowIntensity: 3.8,
    pulseSpeed: 0.2,
  },
  noiseOpacity: 0.4,
};

// ---------------------------------------------------------------------------
// Wave Functions
// ---------------------------------------------------------------------------

function applySharpness(raw: number, sharpness: number): number {
  return Math.sign(raw) * Math.pow(Math.abs(raw), 1 / sharpness);
}

const waveFunctions = {
  sine: (phase: number, sharpness: number) => applySharpness(Math.cos(phase * Math.PI * 2), sharpness),
  prism: (phase: number, sharpness: number) => {
    const tri = phase < 0.5 ? phase * 4 - 1 : 3 - phase * 4;
    return applySharpness(tri, sharpness);
  },
  blaze: (phase: number, sharpness: number) => {
    const saw = phase * 2 - 1;
    return applySharpness(saw, sharpness);
  },
};

// ---------------------------------------------------------------------------
// Static allocations
// ---------------------------------------------------------------------------

const cubeBoxGeo = new THREE.BoxGeometry(2.25, 2.25, 2.25);
const edgesBoxGeo = new THREE.BoxGeometry(2.26, 2.26, 2.26);

// ---------------------------------------------------------------------------
// Scene components
// ---------------------------------------------------------------------------

function RotatingCube({ config }: { config: typeof CONFIG.cube }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * config.speed * config.axisX;
    meshRef.current.rotation.y += delta * config.speed * config.axisY;
    meshRef.current.rotation.z += delta * config.speed * config.axisZ;

    // Pulse effect
    const pulse = (Math.sin(state.clock.elapsedTime * config.pulseSpeed) * 0.5 + 0.5) * config.glowIntensity;
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.emissiveIntensity = pulse;
    }
    if (lightRef.current) lightRef.current.intensity = pulse * 2;
  });

  return (
    <mesh ref={meshRef} position={[config.positionX, config.positionY, config.positionZ]} geometry={cubeBoxGeo}>
      <meshStandardMaterial
        color={config.color}
        emissive={config.color}
        emissiveIntensity={config.glowIntensity}
      />
      <pointLight ref={lightRef} color={config.color} distance={10} decay={2} />
      <lineSegments>
        <edgesGeometry args={[edgesBoxGeo]} />
        <lineBasicMaterial color="white" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  );
}

function FrostedGlass({ config }: { config: typeof CONFIG.glass }) {
  const { gl } = useThree();
  const normalMap = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    const canvasSize = 512;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const freq = config.ribFrequency;
    const rad = (config.ribRotation * Math.PI) / 180;
    const cosR = Math.cos(rad);
    const sinR = Math.sin(rad);
    const waveFn = waveFunctions[config.ribProfile] || waveFunctions.sine;

    const imgData = ctx.createImageData(canvasSize, canvasSize);
    for (let y = 0; y < canvasSize; y++) {
      for (let x = 0; x < canvasSize; x++) {
        const idx = (y * canvasSize + x) * 4;
        const projected = (x / canvasSize) * cosR + (y / canvasSize) * sinR;
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
    texture.repeat.set(30 / 6, 30 / 6);
    texture.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(), 4);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    return texture;
  }, [config.ribFrequency, config.ribRotation, config.ribProfile, config.ribSharpness, gl]);

  useEffect(() => () => { normalMap?.dispose(); }, [normalMap]);

  return (
    <mesh position={[0, 0, 1]}>
      <planeGeometry args={[30, 30]} />
      <MeshTransmissionMaterial
        backside={true}
        {...config}
        normalMap={normalMap || undefined}
        normalScale={new THREE.Vector2(config.ribIntensity, config.ribIntensity)}
        temporalDistortion={0}
        resolution={512}
        transparent={true}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// WebGL detection & Error Boundary
// ---------------------------------------------------------------------------

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch { return false; }
}

class CanvasErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const containerStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: -1,
  pointerEvents: "none",
  height: "100%",
  width: "100%",
  overflow: "hidden",
};

function FallbackGlow() {
  return (
    <div style={{ ...containerStyle, backgroundColor: "#07080a" }}>
      <div className="ray-noise" />
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,0,64,0.15) 0%, rgba(128,0,255,0.08) 50%, transparent 70%)",
        filter: "blur(60px)",
      }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export default function HeroArtifact() {
  const [mounted, setMounted] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(isWebGLAvailable());
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ position: "absolute", inset: 0, zIndex: -2, backgroundColor: "#07080a" }} />;
  if (!webglAvailable) return <FallbackGlow />;

  return (
    <CanvasErrorBoundary fallback={<FallbackGlow />}>
      {/* 1. Background Layer (Bottom) */}
      <div style={{ position: "absolute", inset: 0, zIndex: -2, backgroundColor: "#07080a" }} />

      {/* 2. Animation Layer (Behind Text) */}
      <div style={{ ...containerStyle, backgroundColor: "transparent" }}>
        <div className="ray-noise" style={{ zIndex: 2, opacity: CONFIG.noiseOpacity }} />
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: false, antialias: false, powerPreference: "default" }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          style={{ zIndex: 1 }}
        >
          <color attach="background" args={["#07080a"]} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <RotatingCube config={CONFIG.cube} />
          </Float>
          <FrostedGlass config={CONFIG.glass} />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}

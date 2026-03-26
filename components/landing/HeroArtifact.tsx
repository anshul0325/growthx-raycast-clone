"use client";

import React, { useRef, useMemo, useEffect, useState, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const CONFIG = {
  glass: {
    transmission: 1,
    thickness: 3.3,
    roughness: 0.5,
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
  },
  cube: {
    speed: 0.3,
    color: "#ff0040",
    positionZ: -0.7,
    axisX: 0.9,
    axisY: 1.1,
    axisZ: 1.4,
  },
};

// ---------------------------------------------------------------------------
// Static allocations (module-level to avoid per-render GC pressure)
// ---------------------------------------------------------------------------

const cubeBoxGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const edgesBoxGeo = new THREE.BoxGeometry(1.51, 1.51, 1.51);
const normalScaleVec = new THREE.Vector2(CONFIG.glass.ribIntensity, CONFIG.glass.ribIntensity);

// ---------------------------------------------------------------------------
// Scene components
// ---------------------------------------------------------------------------

function RotatingCube({ config }: { config: typeof CONFIG.cube }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * config.speed * config.axisX;
    meshRef.current.rotation.y += delta * config.speed * config.axisY;
    meshRef.current.rotation.z += delta * config.speed * config.axisZ;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, config.positionZ]} geometry={cubeBoxGeo}>
      <meshStandardMaterial
        color={config.color}
        emissive={config.color}
        emissiveIntensity={0.5}
      />
      <lineSegments>
        <edgesGeometry args={[edgesBoxGeo]} />
        <lineBasicMaterial color="white" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  );
}

function FrostedGlass({ config }: { config: typeof CONFIG.glass }) {
  const { viewport } = useThree();
  const size = Math.max(viewport.width, viewport.height) * 2;

  const normalMap = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const canvasSize = 512;
    const freq = config.ribFrequency;
    const rad = (config.ribRotation * Math.PI) / 180;
    const cosR = Math.cos(rad);
    const sinR = Math.sin(rad);

    const imgData = ctx.createImageData(canvasSize, canvasSize);
    for (let y = 0; y < canvasSize; y++) {
      for (let x = 0; x < canvasSize; x++) {
        const idx = (y * canvasSize + x) * 4;
        const projected = (x / canvasSize) * cosR + (y / canvasSize) * sinR;
        const angle = projected * Math.PI * 2 * freq;
        const val = Math.cos(angle);
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
  }, [config.ribFrequency, config.ribRotation]);

  useEffect(() => () => { normalMap?.dispose(); }, [normalMap]);

  return (
    <mesh position={[0, 0, 1]}>
      <planeGeometry args={[size, size]} />
      <MeshTransmissionMaterial
        backside={true}
        {...config}
        normalMap={normalMap || undefined}
        normalScale={normalScaleVec}
        distortion={0.5}
        temporalDistortion={0}
        samples={4}        // 8→4: halves transmission cost; ribbed distortion masks difference
        resolution={512}
        transparent={true}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// WebGL detection
// ---------------------------------------------------------------------------

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Error boundary — catches runtime WebGL failures (context loss, shader errors)
// ---------------------------------------------------------------------------

class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const containerStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 1,
  pointerEvents: "none",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  backgroundColor: "#07080a",
};

function FallbackGlow() {
  return (
    <div style={containerStyle}>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
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

  if (!mounted) return <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundColor: "#07080a" }} />;
  if (!webglAvailable) return <FallbackGlow />;

  return (
    <CanvasErrorBoundary fallback={<FallbackGlow />}>
      <div style={containerStyle}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{
            alpha: true,
            antialias: false,          // no visible edges through frosted glass → skip MSAA cost
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            premultipliedAlpha: false,
            failIfMajorPerformanceCaveat: false,  // allow software renderer
          }}
          dpr={[1, 1.5]}               // was [1,2]; saves ~44% pixels on HiDPI with no visible diff
          performance={{ min: 0.5 }}   // auto-reduce DPR if FPS drops below target
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2.5} />
          <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={2} />
          <directionalLight position={[0, 5, 5]} intensity={1} />
          <Environment preset="city" />

          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <RotatingCube config={CONFIG.cube} />
          </Float>

          <FrostedGlass config={CONFIG.glass} />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}

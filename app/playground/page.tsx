"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, OrbitControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// --- Config ---

const GLASS_CONFIG = {
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
};

const CUBE_CONFIG = {
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

// --- Scene Components ---

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * CUBE_CONFIG.speed * CUBE_CONFIG.axisX;
    meshRef.current.rotation.y += delta * CUBE_CONFIG.speed * CUBE_CONFIG.axisY;
    meshRef.current.rotation.z += delta * CUBE_CONFIG.speed * CUBE_CONFIG.axisZ;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, CUBE_CONFIG.positionZ]} geometry={cubeBoxGeo}>
      <meshStandardMaterial
        color={CUBE_CONFIG.color}
        emissive={CUBE_CONFIG.color}
        emissiveIntensity={0.5}
      />
      <lineSegments>
        <edgesGeometry args={[edgesBoxGeo]} />
        <lineBasicMaterial color="white" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  );
}

function FrostedGlass() {
  const normalMap = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const size = 512;
    const freq = GLASS_CONFIG.ribFrequency;
    const rad = (GLASS_CONFIG.ribRotation * Math.PI) / 180;
    const cosR = Math.cos(rad);
    const sinR = Math.sin(rad);

    const imgData = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;
        const projected = (x / size) * cosR + (y / size) * sinR;
        const angle = projected * Math.PI * 2 * freq;
        const val = Math.cos(angle);
        imgData.data[idx] = (val * cosR * 0.5 + 0.5) * 255;
        imgData.data[idx + 1] = (val * sinR * 0.5 + 0.5) * 255;
        imgData.data[idx + 2] = 255;
        imgData.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  useEffect(() => {
    return () => {
      normalMap?.dispose();
    };
  }, [normalMap]);

  const normalScale = useMemo(
    () => new THREE.Vector2(GLASS_CONFIG.ribIntensity, GLASS_CONFIG.ribIntensity),
    []
  );

  return (
    <mesh position={[0, 0, 1]} geometry={glassPlaneGeo}>
      <MeshTransmissionMaterial
        backside={true}
        transmission={GLASS_CONFIG.transmission}
        thickness={GLASS_CONFIG.thickness}
        roughness={GLASS_CONFIG.roughness}
        chromaticAberration={GLASS_CONFIG.chromaticAberration}
        anisotropy={GLASS_CONFIG.anisotropy}
        distortion={0.5}
        ior={GLASS_CONFIG.ior}
        color={GLASS_CONFIG.color}
        attenuationColor={GLASS_CONFIG.attenuationColor}
        attenuationDistance={GLASS_CONFIG.attenuationDistance}
        normalMap={normalMap || undefined}
        normalScale={normalScale}
        temporalDistortion={0}
        samples={8}
        resolution={512}
      />
    </mesh>
  );
}

// --- Page ---

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

export default function Playground() {
  const [mounted, setMounted] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(isWebGLAvailable());
    setMounted(true);
  }, []);

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {mounted && webglAvailable && (
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ failIfMajorPerformanceCaveat: false }}
          >
            <color attach="background" args={["#050505"]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} color="#ff00ff" />
            <Environment preset="city" />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <RotatingCube />
            </Float>

            <FrostedGlass />

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

"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

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
  }
};

// Static geometries and vectors to avoid re-creation
const cubeBoxGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const edgesBoxGeo = new THREE.BoxGeometry(1.51, 1.51, 1.51);
const glassPlaneGeo = new THREE.PlaneGeometry(6, 6);
const normalScaleVec = new THREE.Vector2(CONFIG.glass.ribIntensity, CONFIG.glass.ribIntensity);

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
      <meshStandardMaterial color={config.color} emissive={config.color} emissiveIntensity={0.5} />
      <lineSegments>
        <edgesGeometry args={[edgesBoxGeo]} />
        <lineBasicMaterial color="white" transparent opacity={0.3} />
      </lineSegments>
    </mesh>
  );
}

function FrostedGlass({ config }: { config: typeof CONFIG.glass }) {
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
  }, [config.ribFrequency, config.ribRotation]);

  // Ensure texture disposal to prevent RAM/GPU memory leaks
  useEffect(() => {
    return () => {
      normalMap?.dispose();
    };
  }, [normalMap]);

  return (
    <mesh position={[0, 0, 1]} geometry={glassPlaneGeo}>
      <MeshTransmissionMaterial
        backside={true}
        {...config}
        normalMap={normalMap || undefined}
        normalScale={normalScaleVec}
        distortion={0.5}
        temporalDistortion={0} // Set to 0 to avoid unnecessary constant re-renders
        samples={8} // Lower samples for better performance
        resolution={512} // Fixed resolution for buffer
      />
    </mesh>
  );
}

export default function HeroArtifact() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        gl={{ 
          alpha: true, 
          antialias: false, // Disabling antialias can save a lot of performance
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.5]} // Limit DPR to 1.5 for better performance on high-res screens
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#ff00ff" />
        <Environment preset="city" background={false} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <RotatingCube config={CONFIG.cube} />
        </Float>

        <FrostedGlass config={CONFIG.glass} />
      </Canvas>
    </div>
  );
}


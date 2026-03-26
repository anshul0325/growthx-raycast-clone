"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

const CONFIG = {
  glass: {
    color: "#ffffff",
    opacity: 0.1,
    roughness: 0.1,
    metalness: 0.1,
  },
  cube: {
    speed: 0.3,
    color: "#ff0040",
    positionZ: -1,
    axisX: 0.9,
    axisY: 1.1,
    axisZ: 1.4,
  }
};

const cubeBoxGeo = new THREE.BoxGeometry(2, 2, 2);
const edgesBoxGeo = new THREE.BoxGeometry(2.01, 2.01, 2.01);

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
        emissiveIntensity={1} 
      />
      <lineSegments>
        <edgesGeometry args={[edgesBoxGeo]} />
        <lineBasicMaterial color="white" transparent opacity={0.4} />
      </lineSegments>
    </mesh>
  );
}

function SimpleGlass() {
  const { viewport } = useThree();
  const size = Math.max(viewport.width, viewport.height) * 2;

  return (
    <mesh position={[0, 0, 0.5]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial 
        color="white" 
        transparent 
        opacity={0.05} 
        roughness={0}
        metalness={0.5}
      />
    </mesh>
  );
}

export default function HeroArtifact() {
  return (
    <div style={{ 
      position: "absolute", 
      inset: 0, 
      zIndex: 5, // Increased z-index
      pointerEvents: "none",
      height: "100vh",
      width: "100%"
    }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} // Moved camera back
        gl={{ 
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={2} />
        <Environment preset="city" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <RotatingCube config={CONFIG.cube} />
        </Float>

        <SimpleGlass />
      </Canvas>
    </div>
  );
}




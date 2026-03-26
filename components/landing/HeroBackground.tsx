"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// Use the finalized configuration as constants
const CONFIG = {
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

// Static geometries and vectors
const cubeBoxGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const edgesBoxGeo = new THREE.BoxGeometry(1.51, 1.51, 1.51);
const glassPlaneGeo = new THREE.PlaneGeometry(10, 10);
const normalScaleVec = new THREE.Vector2(CONFIG.glass.ribIntensity, CONFIG.glass.ribIntensity);

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { speed, axisX, axisY, axisZ, color, positionZ } = CONFIG.cube;

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * speed * axisX;
    meshRef.current.rotation.y += delta * speed * axisY;
    meshRef.current.rotation.z += delta * speed * axisZ;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, positionZ]} geometry={cubeBoxGeo}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      <lineSegments>
        <edgesGeometry args={[edgesBoxGeo]} />
        <lineBasicMaterial color="white" transparent opacity={0.2} />
      </lineSegments>
    </mesh>
  );
}

function RibbedGlass() {
  const { ribFrequency, ribRotation, ribIntensity, ...rest } = CONFIG.glass;

  const normalMap = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const size = 512;
    const rad = (ribRotation * Math.PI) / 180;
    const cosR = Math.cos(rad);
    const sinR = Math.sin(rad);

    const imgData = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;
        const projected = (x / size) * cosR + (y / size) * sinR;
        const angle = projected * Math.PI * 2 * ribFrequency;
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
  }, [ribFrequency, ribRotation]);

  useEffect(() => {
    return () => {
      normalMap?.dispose();
    };
  }, [normalMap]);

  return (
    <mesh position={[0, 0, 1]} geometry={glassPlaneGeo}>
      <MeshTransmissionMaterial
        backside={true}
        {...rest}
        normalMap={normalMap || undefined}
        normalScale={normalScaleVec}
        temporalDistortion={0}
        samples={8}
        resolution={512}
      />
    </mesh>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden opacity-40">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: true,
          stencil: false
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <RotatingCube />
        </Float>
        
        <RibbedGlass />
      </Canvas>
      {/* Vignette for seamless blending */}
      <div className="absolute inset-0 bg-radial-[at_center_center,transparent_0%,black_90%]" />
    </div>
  );
}


'use client'

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// â”€â”€â”€ ParticleGalaxy â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ParticleGalaxy({ count = 3000, mouseNorm }) {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#6C63FF'),
      new THREE.Color('#00D9FF'),
      new THREE.Color('#7C3AED'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const branch = Math.floor(Math.random() * 3);
      const angle = (branch / 3) * Math.PI * 2;
      const radius = Math.pow(Math.random(), 1.5) * 6;
      const spin = radius * 0.5;
      const spread = (Math.random() - 0.5) * (radius * 0.4);

      positions[i3 + 0] = Math.cos(angle + spin) * radius + spread;
      positions[i3 + 1] = (Math.random() - 0.5) * 1.5;
      positions[i3 + 2] = Math.sin(angle + spin) * radius + spread;

      const col = palette[Math.floor(Math.random() * palette.length)].clone();
      col.lerp(new THREE.Color('#ffffff'), Math.random() * 0.3);
      colors[i3 + 0] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      if (mouseNorm) {
        ref.current.rotation.x = THREE.MathUtils.lerp(
          ref.current.rotation.x,
          mouseNorm.y * 0.15,
          0.05
        );
      }
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// â”€â”€â”€ FloatingCubes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CUBE_DATA = [
  { pos: [3.5, 1.2, -1], size: 0.55, speed: 0.4, color: '#6C63FF' },
  { pos: [-3.2, 0.8, -2], size: 0.38, speed: 0.6, color: '#00D9FF' },
  { pos: [2.8, -1.5, -0.5], size: 0.72, speed: 0.3, color: '#7C3AED' },
  { pos: [-2.6, -0.9, 0], size: 0.42, speed: 0.5, color: '#6C63FF' },
];

function GlassCube({ position, size, speed, color }) {
  const meshRef = useRef();
  const edgesRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.7;
      meshRef.current.rotation.y = t;
      meshRef.current.rotation.z = t * 0.4;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = t * 0.7;
      edgesRef.current.rotation.y = t;
      edgesRef.current.rotation.z = t * 0.4;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.4}>
      <group position={position}>
        <mesh ref={meshRef}>
          <boxGeometry args={[size, size, size]} />
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.12}
            roughness={0}
            metalness={0.1}
            transmission={0.9}
            thickness={0.5}
            reflectivity={1}
          />
        </mesh>
        <lineSegments ref={edgesRef}>
          <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
          <lineBasicMaterial color={color} transparent opacity={0.7} />
        </lineSegments>
      </group>
    </Float>
  );
}

function FloatingCubes() {
  return (
    <>
      {CUBE_DATA.map((cube, i) => (
        <GlassCube key={i} position={cube.pos} size={cube.size} speed={cube.speed} color={cube.color} />
      ))}
    </>
  );
}

// â”€â”€â”€ HolographicRings â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function HolographicRings() {
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  useFrame((_, delta) => {
    if (r1.current) r1.current.rotation.x += delta * 0.3;
    if (r2.current) {
      r2.current.rotation.y += delta * 0.2;
      r2.current.rotation.z += delta * 0.15;
    }
    if (r3.current) {
      r3.current.rotation.x -= delta * 0.25;
      r3.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <mesh ref={r1}>
        <torusGeometry args={[2.2, 0.012, 16, 120]} />
        <meshStandardMaterial
          color="#6C63FF"
          emissive="#6C63FF"
          emissiveIntensity={2.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[1.6, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={2.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[2.8, 0.008, 16, 140]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </>
  );
}

// â”€â”€â”€ FloatingOrb â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FloatingOrb() {
  const orbRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orbRef.current) {
      const s = 1 + Math.sin(t * 1.2) * 0.06;
      orbRef.current.scale.setScalar(s);
    }
    if (innerRef.current) {
      const s = 1 + Math.sin(t * 1.8 + 1) * 0.08;
      innerRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* outer shell */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial
          color="#6C63FF"
          emissive="#6C63FF"
          emissiveIntensity={1.2}
          transparent
          opacity={0.25}
          roughness={0}
          metalness={0.5}
          transmission={0.7}
        />
      </mesh>
      {/* inner core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* point light to cast local glow */}
      <pointLight color="#6C63FF" intensity={4} distance={4} />
    </group>
  );
}

// â”€â”€â”€ GridFloor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function GridFloor({ scrollY }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.elapsedTime * 0.4) % 1;
    }
  });

  return (
    <group position={[0, -3, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh ref={ref}>
        <planeGeometry args={[20, 20, 16, 16]} />
        <meshBasicMaterial
          color="#6C63FF"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

// â”€â”€â”€ CodeStream â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CHARS = '01ã‚¢ã‚¤ã‚¦ã‚¨ã‚ªã‚«ã‚­ã‚¯ã‚±ã‚³</>{}[]#@!';

function useCodeStreamGeometry(streamCount = 8, charsPerStream = 14) {
  return useMemo(() => {
    const positions = [];
    const cols = [];
    const speeds = [];

    for (let s = 0; s < streamCount; s++) {
      const x = (Math.random() - 0.5) * 14;
      const baseZ = -2 - Math.random() * 3;
      const speed = 0.5 + Math.random() * 1.5;

      for (let c = 0; c < charsPerStream; c++) {
        positions.push(x, 4 - c * 0.4, baseZ);
        const t = c / charsPerStream;
        cols.push(0, t * 0.9 + 0.1, t * 0.5 + 0.5); // cyan-ish fade
        speeds.push(speed);
      }
    }

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(cols),
      speeds,
    };
  }, [streamCount, charsPerStream]);
}

function CodeStream() {
  const ref = useRef();
  const { positions, colors } = useCodeStreamGeometry(8, 14);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, pos.getY(i) - delta * (0.6 + (i % 3) * 0.25));
      if (pos.getY(i) < -5) {
        pos.setY(i, 5 + Math.random() * 2);
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// â”€â”€â”€ CameraRig (mouse parallax) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CameraRig({ mouseNorm }) {
  useFrame((state) => {
    if (!mouseNorm) return;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouseNorm.x * 0.8,
      0.04
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouseNorm.y * 0.5,
      0.04
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// â”€â”€â”€ Scene root â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Scene({ mouseNorm, scrollY, isMobile }) {
  const particleCount = isMobile ? 800 : 1600;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#6C63FF" intensity={3} distance={20} />
      <pointLight position={[-5, 3, -3]} color="#00D9FF" intensity={2.5} distance={18} />

      {/* 3D objects */}
      <ParticleGalaxy count={particleCount} mouseNorm={mouseNorm} />
      <FloatingCubes />
      <HolographicRings />
      <FloatingOrb />
      <GridFloor scrollY={scrollY} />
      <CodeStream />

      {/* Camera controller */}
      <CameraRig mouseNorm={mouseNorm} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={1.5}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// â”€â”€â”€ Exported Canvas wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function HeroScene({ mouseNorm, scrollY }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      dpr={[1, isMobile ? 1 : 1.5]}
      style={{ background: 'transparent' }}
    >
      <Scene mouseNorm={mouseNorm} scrollY={scrollY} isMobile={isMobile} />
    </Canvas>
  );
}

'use client'

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Torus, Sphere, Box } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { Vector2 } from 'three';
import * as THREE from 'three';

/* â”€â”€â”€ Central Core Sphere â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CoreSphere() {
  const ref = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.15;
      ref.current.rotation.z = Math.sin(t * 0.4) * 0.1;
    }
    if (innerRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.06;
      innerRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Outer distorted shell */}
      <Sphere ref={ref} args={[1.05, 48, 48]}>
        <MeshDistortMaterial
          color="#6C63FF"
          emissive="#4C44CC"
          emissiveIntensity={0.6}
          distort={0.28}
          speed={2.5}
          roughness={0.0}
          metalness={0.3}
          transparent
          opacity={0.22}
        />
      </Sphere>

      {/* Inner glowing core */}
      <Sphere ref={innerRef} args={[0.62, 40, 40]}>
        <meshPhysicalMaterial
          color="#7C3AED"
          emissive="#6C63FF"
          emissiveIntensity={2.2}
          roughness={0}
          metalness={0.5}
          transparent
          opacity={0.85}
          transmission={0.3}
        />
      </Sphere>

      {/* Core glow light */}
      <pointLight color="#6C63FF" intensity={6} distance={5} />
    </group>
  );
}

/* â”€â”€â”€ Orbit Ring â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function OrbitRing({ radius, color, speed, tiltX = 0, tiltZ = 0, opacity = 0.6 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return (
    <group rotation={[tiltX, 0, tiltZ]} ref={ref}>
      <Torus args={[radius, 0.008, 12, 96]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
          transparent
          opacity={opacity}
        />
      </Torus>
    </group>
  );
}

/* â”€â”€â”€ Orbiting Tech Node â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function OrbitNode({ orbitRadius, speed, color, size = 0.14, offset = 0, tiltX = 0, tiltZ = 0, icon }) {
  const ref = useRef();
  const trailRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * orbitRadius;
      ref.current.position.z = Math.sin(t) * orbitRadius;
      ref.current.position.y = Math.sin(t * 0.5) * 0.2;
      ref.current.rotation.y += 0.04;
    }
  });

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <group ref={ref}>
        {/* Glow halo */}
        <Sphere args={[size * 1.6, 16, 16]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.2}
            transparent
            opacity={0.12}
          />
        </Sphere>
        {/* Main node */}
        <Sphere args={[size, 20, 20]}>
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.5}
            roughness={0.0}
            metalness={0.4}
            transparent
            opacity={0.95}
          />
        </Sphere>
      </group>
    </group>
  );
}

/* â”€â”€â”€ Floating Code Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CodePanel({ position, color, width = 0.6, height = 0.4 }) {
  const ref = useRef();
  const edgeRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      ref.current.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.12;
    }
  });

  return (
    <Float floatIntensity={0.3} speed={1.5} rotationIntensity={0.1}>
      <group position={position} ref={ref}>
        {/* Panel face */}
        <Box args={[width, height, 0.02]}>
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.18}
          />
        </Box>
        {/* Panel frame */}
        <Box ref={edgeRef} args={[width + 0.01, height + 0.01, 0.015]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            wireframe
            transparent
            opacity={0.6}
          />
        </Box>
      </group>
    </Float>
  );
}

/* â”€â”€â”€ Particle Stream â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ParticleField() {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#6C63FF'),
      new THREE.Color('#00D9FF'),
      new THREE.Color('#7C3AED'),
      new THREE.Color('#00E676'),
    ];

    for (let i = 0; i < count; i++) {
      const r = 0.8 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)].clone();
      c.lerp(new THREE.Color('#ffffff'), Math.random() * 0.4);
      col[i * 3 + 0] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* â”€â”€â”€ Mouse Reactive Camera â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CameraRig({ mouseNorm }) {
  useFrame((state) => {
    if (!mouseNorm) return;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouseNorm.x * 0.6,
      0.04
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouseNorm.y * 0.4,
      0.04
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/* â”€â”€â”€ Full Scene â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ModelScene({ mouseNorm }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} color="#6C63FF" intensity={3} distance={15} />
      <pointLight position={[-4, 2, -3]} color="#00D9FF" intensity={2.5} distance={12} />
      <pointLight position={[0, -4, 4]} color="#7C3AED" intensity={2} distance={10} />

      {/* Core */}
      <CoreSphere />

      {/* Orbit rings at different tilts */}
      <OrbitRing radius={1.72} color="#6C63FF" speed={0.35} tiltX={0.4}    opacity={0.65} />
      <OrbitRing radius={2.05} color="#00D9FF" speed={0.22} tiltX={-0.6} tiltZ={0.3} opacity={0.5} />
      <OrbitRing radius={2.45} color="#7C3AED" speed={0.18} tiltX={0.2}  tiltZ={-0.5} opacity={0.4} />

      {/* Orbiting tech nodes */}
      <OrbitNode orbitRadius={1.72} speed={0.55}  color="#00D9FF" size={0.13} offset={0}              tiltX={0.4}  />
      <OrbitNode orbitRadius={1.72} speed={0.55}  color="#00E676" size={0.11} offset={Math.PI}        tiltX={0.4}  />
      <OrbitNode orbitRadius={2.05} speed={0.38}  color="#6C63FF" size={0.15} offset={0}              tiltX={-0.6} tiltZ={0.3} />
      <OrbitNode orbitRadius={2.05} speed={0.38}  color="#FF6B6B" size={0.12} offset={Math.PI * 0.66} tiltX={-0.6} tiltZ={0.3} />
      <OrbitNode orbitRadius={2.05} speed={0.38}  color="#FFD93D" size={0.1}  offset={Math.PI * 1.33} tiltX={-0.6} tiltZ={0.3} />
      <OrbitNode orbitRadius={2.45} speed={0.25}  color="#7C3AED" size={0.16} offset={0}              tiltX={0.2}  tiltZ={-0.5} />
      <OrbitNode orbitRadius={2.45} speed={0.25}  color="#00D9FF" size={0.11} offset={Math.PI * 1.0}  tiltX={0.2}  tiltZ={-0.5} />

      {/* Floating code panels around the model */}
      <CodePanel position={[ 2.8,  1.2, -0.5]} color="#00D9FF" width={0.55} height={0.35} />
      <CodePanel position={[-2.6,  0.8,  0.3]} color="#6C63FF" width={0.45} height={0.3}  />
      <CodePanel position={[ 2.2, -1.4,  0.8]} color="#7C3AED" width={0.5}  height={0.32} />
      <CodePanel position={[-1.8, -1.6, -0.6]} color="#00E676" width={0.4}  height={0.28} />

      {/* Particle cloud */}
      <ParticleField />

      {/* Mouse-reactive camera */}
      <CameraRig mouseNorm={mouseNorm} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.85}
          intensity={2.2}
          mipmapBlur
        />
        <ChromaticAberration offset={new Vector2(0.0005, 0.0005)} />
      </EffectComposer>
    </>
  );
}

/* â”€â”€â”€ Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function Hero3DModel({ mouseNorm }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 52 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ModelScene mouseNorm={mouseNorm} />
    </Canvas>
  );
}

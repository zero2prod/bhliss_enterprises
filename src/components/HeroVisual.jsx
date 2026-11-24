import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';

function HeroScene() {
  const group = useRef(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const smoothing = Math.min(1, delta * 2);
    group.current.rotation.y += (state.pointer.x * 0.22 - group.current.rotation.y) * smoothing;
    group.current.rotation.x += (state.pointer.y * 0.12 - group.current.rotation.x) * smoothing;
  });

  return (
    <group ref={group}>
      <Float speed={1.25} rotationIntensity={0.16} floatIntensity={0.28}>
        <mesh castShadow receiveShadow>
          <torusKnotGeometry args={[1.05, 0.28, 180, 24, 2, 3]} />
          <MeshDistortMaterial
            color="#f97316"
            roughness={0.24}
            metalness={0.72}
            distort={0.22}
            speed={1.5}
          />
        </mesh>
        <mesh position={[0, 0, -0.35]} scale={1.42}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial color="#6b747a" metalness={0.85} roughness={0.32} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Interactive 3D BHLISS brand sculpture">
      <Canvas
        camera={{ position: [0, 0, 4.7], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        fallback={<div className="hero-3d-fallback" aria-hidden="true" />}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 5]} intensity={2.2} />
        <pointLight position={[-3, -2, 2]} color="#f97316" intensity={3} />
        <HeroScene />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.28} scale={5} blur={2.6} />
      </Canvas>
      <span className="visual-orbit orbit-one" />
      <span className="visual-orbit orbit-two" />
      <div className="visual-caption"><i /> ENGINEERED TO MOVE</div>
    </div>
  );
}

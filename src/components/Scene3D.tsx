import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeo() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphere1Ref = useRef<THREE.Mesh>(null);
  const sphere2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12;
      meshRef.current.rotation.y = t * 0.18;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.08;
      torusRef.current.rotation.z = t * 0.12;
    }
    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.sin(t * 0.5) * 3;
      sphere1Ref.current.position.y = Math.cos(t * 0.3) * 1.5;
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.cos(t * 0.4) * 2.5;
      sphere2Ref.current.position.y = Math.sin(t * 0.6) * 2;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
        <Icosahedron ref={meshRef} args={[1.8, 4]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#1a7a8a"
            roughness={0.15}
            metalness={0.6}
            distort={0.25}
            speed={1.5}
            transparent
            opacity={0.35}
          />
        </Icosahedron>
      </Float>

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
        <Torus ref={torusRef} args={[2.5, 0.05, 16, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#b87a4a" metalness={0.8} roughness={0.15} transparent opacity={0.5} />
        </Torus>
      </Float>

      <Sphere ref={sphere1Ref} args={[0.3, 32, 32]} position={[3, 0, -1]}>
        <meshStandardMaterial color="#1a7a8a" metalness={0.5} roughness={0.3} transparent opacity={0.4} />
      </Sphere>

      <Sphere ref={sphere2Ref} args={[0.2, 32, 32]} position={[-2.5, 1.5, 0]}>
        <meshStandardMaterial color="#b87a4a" metalness={0.6} roughness={0.2} transparent opacity={0.35} />
      </Sphere>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
        <Torus args={[1.5, 0.03, 16, 80]} position={[0, 0, -1]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color="#1a7a8a" metalness={0.7} roughness={0.2} transparent opacity={0.2} />
        </Torus>
      </Float>
    </>
  );
}

function Particles() {
  const count = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#1a7a8a" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#1a7a8a" />
        <pointLight position={[-5, -3, 3]} intensity={0.3} color="#b87a4a" />
        <directionalLight position={[0, 10, 5]} intensity={0.4} color="#ffffff" />
        <FloatingGeo />
        <Particles />
      </Canvas>
    </div>
  );
}

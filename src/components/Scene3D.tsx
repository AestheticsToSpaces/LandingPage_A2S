import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeo() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.1;
      torusRef.current.rotation.z = t * 0.15;
    }
    if (boxRef.current) {
      boxRef.current.rotation.y = t * 0.12;
      boxRef.current.rotation.z = t * 0.08;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <Icosahedron ref={meshRef} args={[1.5, 4]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#2a8a9e"
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.7}
          />
        </Icosahedron>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
        <Torus ref={torusRef} args={[2.2, 0.08, 16, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#c08a5a" metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>

      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.8}>
        <Box ref={boxRef} args={[0.6, 0.6, 0.6]} position={[2.5, 1, -1]}>
          <meshStandardMaterial color="#c08a5a" metalness={0.8} roughness={0.2} transparent opacity={0.5} />
        </Box>
      </Float>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
        <Icosahedron args={[0.4, 2]} position={[-2.5, -1, 0.5]}>
          <meshStandardMaterial color="#2a8a9e" metalness={0.7} roughness={0.3} transparent opacity={0.4} />
        </Icosahedron>
      </Float>
    </>
  );
}

function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
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
      <pointsMaterial size={0.03} color="#4db8cc" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#2a8a9e" />
        <pointLight position={[-5, -3, 3]} intensity={0.5} color="#c08a5a" />
        <spotLight position={[0, 8, 4]} intensity={0.6} color="#ffffff" angle={0.3} penumbra={1} />
        <FloatingGeo />
        <Particles />
      </Canvas>
    </div>
  );
}

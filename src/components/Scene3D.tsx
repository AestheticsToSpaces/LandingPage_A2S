import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// A simple house shape using basic geometry
function HouseModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.2}>
        {/* House body */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[2, 1.6, 1.8]} />
          <meshStandardMaterial color="#e8e0d6" metalness={0.1} roughness={0.7} />
        </mesh>
        {/* Roof - pyramid */}
        <mesh position={[0, 0.95, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.7, 1, 4]} />
          <meshStandardMaterial color="#1a7a8a" metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Door */}
        <mesh position={[0, -0.55, 0.91]}>
          <boxGeometry args={[0.45, 0.7, 0.05]} />
          <meshStandardMaterial color="#b87a4a" metalness={0.4} roughness={0.4} />
        </mesh>
        {/* Window left */}
        <mesh position={[-0.55, 0, 0.91]}>
          <boxGeometry args={[0.35, 0.35, 0.05]} />
          <meshStandardMaterial color="#a8d8e0" metalness={0.2} roughness={0.3} transparent opacity={0.7} />
        </mesh>
        {/* Window right */}
        <mesh position={[0.55, 0, 0.91]}>
          <boxGeometry args={[0.35, 0.35, 0.05]} />
          <meshStandardMaterial color="#a8d8e0" metalness={0.2} roughness={0.3} transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  );
}

// Floating furniture pieces
function FurniturePieces() {
  const sofaRef = useRef<THREE.Mesh>(null);
  const tableRef = useRef<THREE.Mesh>(null);
  const lampRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sofaRef.current) {
      sofaRef.current.position.x = -3 + Math.sin(t * 0.3) * 0.3;
      sofaRef.current.position.y = -1 + Math.sin(t * 0.5) * 0.2;
      sofaRef.current.rotation.y = t * 0.1;
    }
    if (tableRef.current) {
      tableRef.current.position.x = 3 + Math.cos(t * 0.4) * 0.2;
      tableRef.current.position.y = 0.5 + Math.sin(t * 0.6) * 0.15;
      tableRef.current.rotation.y = -t * 0.08;
    }
    if (lampRef.current) {
      lampRef.current.position.y = -0.5 + Math.sin(t * 0.4 + 1) * 0.2;
    }
  });

  return (
    <>
      {/* Floating sofa shape */}
      <mesh ref={sofaRef} position={[-3, -1, -1]}>
        <boxGeometry args={[0.8, 0.3, 0.4]} />
        <meshStandardMaterial color="#1a7a8a" metalness={0.2} roughness={0.6} transparent opacity={0.5} />
      </mesh>

      {/* Floating table */}
      <mesh ref={tableRef} position={[3, 0.5, -0.5]}>
        <cylinderGeometry args={[0.3, 0.3, 0.08, 16]} />
        <meshStandardMaterial color="#b87a4a" metalness={0.5} roughness={0.3} transparent opacity={0.5} />
      </mesh>

      {/* Floating lamp */}
      <group ref={lampRef} position={[2.5, -0.5, 1]}>
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color="#b87a4a" metalness={0.6} roughness={0.3} transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <coneGeometry args={[0.15, 0.15, 8]} />
          <meshStandardMaterial color="#daa520" metalness={0.4} roughness={0.3} transparent opacity={0.4} />
        </mesh>
      </group>
    </>
  );
}

function Particles() {
  const count = 50;
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
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#1a7a8a" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.9} />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#1a7a8a" />
        <pointLight position={[-5, -3, 3]} intensity={0.3} color="#b87a4a" />
        <directionalLight position={[0, 10, 5]} intensity={0.5} color="#ffffff" />
        <HouseModel />
        <FurniturePieces />
        <Particles />
      </Canvas>
    </div>
  );
}

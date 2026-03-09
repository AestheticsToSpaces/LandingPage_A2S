import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

// Wireframe room structure — architectural, premium
function WireframeRoom() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;
    }
  });

  const edgeColor = '#1a7a8a';
  const accentColor = '#b87a4a';

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.4} position={[0.3, -0.3, 0]}>
        {/* Floor */}
        <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 3.5]} />
          <meshBasicMaterial transparent opacity={0.02} />
          <Edges color={edgeColor} threshold={15} lineWidth={1} />
        </mesh>

        {/* Back wall */}
        <mesh position={[0, 0.05, -1.75]}>
          <planeGeometry args={[4, 2.5]} />
          <meshBasicMaterial transparent opacity={0.02} />
          <Edges color={edgeColor} threshold={15} lineWidth={1} />
        </mesh>

        {/* Left wall */}
        <mesh position={[-2, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[3.5, 2.5]} />
          <meshBasicMaterial transparent opacity={0.02} />
          <Edges color={edgeColor} threshold={15} lineWidth={1} />
        </mesh>

        {/* Sofa wireframe */}
        <group position={[-0.8, -0.75, -1]}>
          <mesh>
            <boxGeometry args={[1.6, 0.5, 0.7]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges color={accentColor} threshold={15} lineWidth={1} />
          </mesh>
          {/* Sofa back */}
          <mesh position={[0, 0.35, -0.25]}>
            <boxGeometry args={[1.6, 0.4, 0.2]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges color={accentColor} threshold={15} lineWidth={1} />
          </mesh>
          {/* Left arm */}
          <mesh position={[-0.7, 0.15, 0]}>
            <boxGeometry args={[0.15, 0.25, 0.7]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges color={accentColor} threshold={15} lineWidth={1} />
          </mesh>
          {/* Right arm */}
          <mesh position={[0.7, 0.15, 0]}>
            <boxGeometry args={[0.15, 0.25, 0.7]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges color={accentColor} threshold={15} lineWidth={1} />
          </mesh>
        </group>

        {/* Coffee table */}
        <group position={[-0.8, -1, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.8, 0.05, 0.5]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges color={edgeColor} threshold={15} lineWidth={1} />
          </mesh>
          {/* Legs */}
          {[[-0.35, -0.1, -0.2], [0.35, -0.1, -0.2], [-0.35, -0.1, 0.2], [0.35, -0.1, 0.2]].map((pos, i) => (
            <mesh key={i} position={pos as [number, number, number]}>
              <cylinderGeometry args={[0.015, 0.015, 0.18, 6]} />
              <meshBasicMaterial transparent opacity={0} />
              <Edges color={edgeColor} threshold={15} lineWidth={1} />
            </mesh>
          ))}
        </group>

        {/* Floor lamp */}
        <group position={[1.3, -0.5, -1.2]}>
          <mesh position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.02, 12]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges color={accentColor} threshold={15} lineWidth={1} />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 1.3, 6]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges color={accentColor} threshold={15} lineWidth={1} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <coneGeometry args={[0.2, 0.3, 8, 1, true]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges color={accentColor} threshold={15} lineWidth={1} />
          </mesh>
        </group>

        {/* Shelf unit on left wall */}
        <group position={[-1.9, 0, -0.5]} rotation={[0, Math.PI / 2, 0]}>
          {[0, 0.45, 0.9].map((y, i) => (
            <mesh key={i} position={[0, y - 0.4, 0]}>
              <boxGeometry args={[0.8, 0.04, 0.25]} />
              <meshBasicMaterial transparent opacity={0} />
              <Edges color={edgeColor} threshold={15} lineWidth={1} />
            </mesh>
          ))}
          {/* Shelf sides */}
          {[-0.38, 0.38].map((x, i) => (
            <mesh key={i} position={[x, 0.05, 0]}>
              <boxGeometry args={[0.04, 1, 0.25]} />
              <meshBasicMaterial transparent opacity={0} />
              <Edges color={edgeColor} threshold={15} lineWidth={1} />
            </mesh>
          ))}
        </group>

        {/* Window on back wall */}
        <group position={[1, 0.2, -1.74]}>
          <mesh>
            <boxGeometry args={[0.9, 0.7, 0.02]} />
            <meshBasicMaterial transparent opacity={0.03} color="#a8d8e0" />
            <Edges color={edgeColor} threshold={15} lineWidth={1} />
          </mesh>
          {/* Window cross */}
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.9, 0.015, 0.01]} />
            <meshBasicMaterial color={edgeColor} transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.015, 0.7, 0.01]} />
            <meshBasicMaterial color={edgeColor} transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Rug (circle on floor) */}
        <mesh position={[-0.8, -1.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.6, 24]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges color={accentColor} threshold={15} lineWidth={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

// Floating data points / grid lines
function DataGrid() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.02;
    }
  });

  const lines = useMemo(() => {
    const arr: { start: [number, number, number]; end: [number, number, number] }[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const r = 4.5;
      arr.push({
        start: [Math.cos(angle) * r, -2, Math.sin(angle) * r],
        end: [Math.cos(angle) * r, 2, Math.sin(angle) * r],
      });
    }
    return arr;
  }, []);

  const geometries = useMemo(() => {
    return lines.map((line) => {
      const points = [new THREE.Vector3(...line.start), new THREE.Vector3(...line.end)];
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, [lines]);

  return (
    <group ref={ref}>
      {geometries.map((geo, i) => (
        <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: '#1a7a8a', transparent: true, opacity: 0.06 }))} />
      ))}
    </group>
  );
}

function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * 4;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = Math.sin(angle) * r;
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
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#1a7a8a" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 hidden md:block" style={{ minHeight: '100vh', contain: 'layout' }}>
      <Canvas camera={{ position: [3.5, 1.8, 5.5], fov: 42 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.2} color="#1a7a8a" />
        <pointLight position={[-5, -3, 3]} intensity={0.15} color="#b87a4a" />
        <WireframeRoom />
        <DataGrid />
        <Particles />
      </Canvas>
    </div>
  );
}

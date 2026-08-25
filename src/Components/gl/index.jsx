import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ hovering }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const values = new Float32Array(1800 * 3);

    for (let i = 0; i < values.length; i += 3) {
      const radius = 2.8 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      values[i] = radius * Math.sin(phi) * Math.cos(theta);
      values[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[i + 2] = radius * Math.cos(phi);
    }

    return values;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * (hovering ? 0.3 : 0.08);
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;

    const scale = hovering ? 1.12 : 1;
    pointsRef.current.scale.lerp(
      new THREE.Vector3(scale, scale, scale),
      0.05
    );
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#d7ff4f"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export function GL({ hovering = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Particles hovering={hovering} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const PARTICLE_COUNT = 18;

function OptimizedTrails() {
  const meshRef = useRef(null);

  
  const packetSpecs = useMemo(() => {
    const specs = [];
    const colorInstance = new THREE.Color();
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      
      const radius = 1.8 + i * 0.08;
      const speed = 0.7 + i * 0.025;
      const offset = i * 0.6;
      
     
      let colorHex = "#ffffff";
      if (i % 3 === 0) colorHex = "#22d3ee"; // Cyan
      else if (i % 3 === 1) colorHex = "#a855f7"; // Purple

      specs.push({
        radius,
        speed,
        offset,
        color: colorInstance.set(colorHex).clone()
      });
    }
    return specs;
  }, []);


  useFrame(({ clock }) => {
    
    if (!meshRef.current) return;

    const elapsedTime = clock.getElapsedTime();
    const tempObject = new THREE.Object3D();

    packetSpecs.forEach((packet, index) => {
      const time = elapsedTime * packet.speed + packet.offset;

  
      const x = Math.cos(time) * packet.radius;
      const y = Math.sin(time * 1.3) * 1.2;
      const z = Math.sin(time) * packet.radius;

    
      tempObject.position.set(x, y, z);
      tempObject.updateMatrix();

      
      meshRef.current.setMatrixAt(index, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  
  const onMeshInit = (mesh) => {
    if (!mesh) return;
    meshRef.current = mesh;
    
    packetSpecs.forEach((packet, index) => {
      mesh.setColorAt(index, packet.color);
    });
    mesh.instanceColor.needsUpdate = true;
  };

  return (
    <group>
  
      <instancedMesh 
        ref={onMeshInit} 
        args={[null, null, PARTICLE_COUNT]}
        castShadow
      >
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          roughness={0.1}
          metalness={0.1}
          emissive="#ffffff"
          emissiveIntensity={2.5}
        />
      </instancedMesh>

     
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.6, 0.015, 12, 140]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.8}
        />
      </mesh>
    </group>
  );
}

export default function ParticleTrails3D() {
  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 font-mono select-none">
      <h2 className="text-4xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 tracking-tight">
        QUANTUM PARTICLE TRAIL ENGINE
      </h2>

      <p className="text-center text-gray-500 text-xs md:text-sm uppercase tracking-widest mt-3 mb-12">
        Animated cryptographic particles simulating live blockchain data transfer.
      </p>

      <div className="h-[620px] rounded-[38px] overflow-hidden border border-cyan-500/10 bg-[#02050a] shadow-2xl relative">
        
        <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        <Canvas
          camera={{ position: [0, 2, 7], fof: 55 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
          }}
        >
          <ambientLight intensity={0.3} />

          <pointLight
            position={[5, 5, 5]}
            intensity={1.5}
            color="#22d3ee"
          />

          <pointLight
            position={[-5, -5, -5]}
            intensity={1.0}
            color="#a855f7"
          />

          <Stars
            radius={60}
            depth={30}
            count={600}
            factor={3}
            saturation={0}
            fade
            speed={0.6}
          />

          <OptimizedTrails />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
          />

          
          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.8}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
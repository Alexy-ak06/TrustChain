import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Custom Holographic Scanline Shader Material
const HolographicShaderMaterial = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      // Fresnel Effect: Dark center, intensely glowing neon edges
      float fresnel = powerPreference = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
      
      // Moving cyber scanline calculation
      float scanline = sin(vPosition.y * 12.0 + uTime * 4.0) * 0.25 + 0.75;
      
      // Combine glow effects
      vec3 finalGlow = uColor * (fresnel * 1.8 + 0.1) * scanline;
      
      gl_FragColor = vec4(finalGlow, fresnel * 0.6 + 0.1);
    }
  `
};

function NeuralCoreEngine() {
  const coreRef = useRef();
  const ringOne = useRef();
  const ringTwo = useRef();
  const pointCloudRef = useRef();

  // Create clean uniform references to mutate in the frame loop without garbage collection
  const customsUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#a855f7") }
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Defensive Guard: Check if references exist before updating to stop page unmount crashes
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.15;
      // Pulse scale slightly using a sine wave to simulate a breathing system
      const pulse = 1.0 + Math.sin(time * 2.0) * 0.03;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    
    if (pointCloudRef.current) {
      pointCloudRef.current.rotation.y = -time * 0.08;
    }
    
    if (ringOne.current) {
      ringOne.current.rotation.x = time * 0.4;
      ringOne.current.rotation.y = time * 0.2;
    }
    
    if (ringTwo.current) {
      ringTwo.current.rotation.y = -time * 0.5;
      ringTwo.current.rotation.z = time * 0.2;
    }

    // Update time uniform for our custom shader scanlines
    if (coreRef.current?.material?.uniforms) {
      coreRef.current.material.uniforms.uTime.value = time;
    }
  });

  return (
    <group>
      {/* CENTRAL CORE: Wireframe with holographic scanline shader */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.7, 40, 40]} />
        <shaderMaterial
          attach="material"
          vertexShader={HolographicShaderMaterial.vertexShader}
          fragmentShader={HolographicShaderMaterial.fragmentShader}
          uniforms={customsUniforms}
          transparent={true}
          wireframe={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* INNER LAYER: Shimmering neural point cloud matrix */}
      <points ref={pointCloudRef}>
        <sphereGeometry args={[1.65, 30, 30]} />
        <pointsMaterial
          color="#c084fc"
          size={0.025}
          sizeAttenuation={true}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* INNER CYAN RING */}
      <mesh ref={ringOne}>
        <torusGeometry args={[2.4, 0.015, 8, 100]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* OUTER PINK RING */}
      <mesh ref={ringTwo} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.0, 0.012, 8, 100]} />
        <meshBasicMaterial
          color="#f472b6"
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function AINeuralSphere3D() {
  return (
    <div className="mt-24 max-w-7xl mx-auto px-4">
      <h2 className="text-5xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(168,85,247,0.25)]">
        3D AI NEURAL CORE
      </h2>

      <p className="text-center text-gray-400 text-base md:text-lg mb-12 max-w-2xl mx-auto">
        Holographic neural intelligence engine powering counterfeit prediction matrices.
      </p>

      <div className="h-[600px] rounded-[36px] overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-md shadow-[0_0_60px_rgba(168,85,247,0.12)]">
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
          }}
        >
          <Stars radius={60} depth={40} count={600} factor={3} saturation={0} fade speed={1} />

          <NeuralCoreEngine />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />

          <EffectComposer>
            <Bloom
              intensity={2.0} // Cranked up bloom because we switched to clean AdditiveBlending
              luminanceThreshold={0.05}
              luminanceSmoothing={0.8}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
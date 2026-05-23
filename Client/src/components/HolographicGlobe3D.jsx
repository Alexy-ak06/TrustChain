
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { TextureLoader } from "three";
import { useRef, useEffect, Suspense } from "react";
import { speakTrustChain } from "./AIVoiceAssistant";

function Earth() {
  const earthRef = useRef();
  const atmosphereRef = useRef();

  const earthTexture = useLoader(
    TextureLoader,
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (earthRef.current)
      earthRef.current.rotation.y = time * 0.05;

    if (atmosphereRef.current)
      atmosphereRef.current.rotation.y = -time * 0.02;
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.3, 64, 64]} />

        <meshStandardMaterial
          map={earthTexture}
          emissive="#06b6d4"
          emissiveIntensity={0.4}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      <mesh ref={atmosphereRef} scale={1.04}>
        <sphereGeometry args={[2.3, 32, 32]} />

        <meshStandardMaterial
          color="#22d3ee"
          transparent
          opacity={0.12}
          wireframe={false}
          blending={2}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />

        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2}
        />
      </mesh>

      <mesh rotation={[Math.PI / -6, Math.PI / 4, 0]}>
        <torusGeometry args={[3.6, 0.01, 16, 100]} />

        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={1.8}
        />
      </mesh>
    </group>
  );
}

function VoiceTrigger() {
  useEffect(() => {
    const speechTimer = setTimeout(() => {
      if (typeof speakTrustChain === "function") {
        speakTrustChain(
          "Loading three-dimensional cryptographic matrix. Global ledger synchronization visualized."
        );
      }
    }, 400);

    return () => clearTimeout(speechTimer);
  }, []);

  return null;
}

export default function HolographicGlobe3D() {
  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 font-mono select-none">
      <h2 className="text-4xl md:text-6xl font-black text-center text-cyan-400 tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.15)]">
        GLOBAL BLOCKCHAIN INTELLIGENCE GRID
      </h2>

      <p className="text-center text-gray-400 text-xs md:text-base mb-12 max-w-xl mx-auto">
        Real-time decentralized ledger synchronization visualized across an active three-dimensional telemetry engine.
      </p>

      <div className="h-[500px] md:h-[650px] rounded-3xl overflow-hidden border border-cyan-500/10 bg-black/40 backdrop-blur-md relative shadow-[0_0_60px_rgba(34,211,238,0.05)]">
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 50 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <ambientLight intensity={0.8} />

          <directionalLight
            position={[5, 3, 5]}
            intensity={2.5}
            color="#22d3ee"
          />

          <directionalLight
            position={[-5, -3, -5]}
            intensity={1.5}
            color="#c084fc"
          />

          <Stars
            radius={80}
            depth={40}
            count={600}
            factor={3}
            saturation={0.5}
            fade
            speed={1}
          />

          <Suspense fallback={null}>
            <Earth />
            <VoiceTrigger />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 2.5}
          />

          <EffectComposer multisampling={4}>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.85}
            />
          </EffectComposer>
        </Canvas>

        <div className="absolute left-6 top-6 bg-black/70 border border-cyan-500/10 rounded-xl p-4 backdrop-blur-md pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />

            <p className="text-xs font-black text-cyan-300 tracking-widest">
              3D VECTOR RENDER: ACTIVE
            </p>
          </div>

          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
            Orbit navigation matrix operational
          </p>
        </div>
      </div>
    </div>
  );
}


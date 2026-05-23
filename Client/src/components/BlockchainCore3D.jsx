import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function CoreCube() {
  const cubeRef = useRef();
  const ringRef = useRef();
  const outerRingRef = useRef();


  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#22d3ee") },
  }), []);

  useFrame((state) => {
   
    const time = state.clock.getElapsedTime();

    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.003;
      cubeRef.current.rotation.y += 0.004;
      
      if (cubeRef.current.material?.uniforms) {
        cubeRef.current.material.uniforms.uTime.value = time;
      }
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.005;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += 0.002;
      outerRingRef.current.rotation.y -= 0.001;
    }
  });

  return (
    <group>
      
      <mesh ref={cubeRef}>
        <boxGeometry args={[2.3, 2.3, 2.3]} />
        <shaderMaterial
          transparent
          wireframe
          uniforms={uniforms}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          vertexShader={`
            varying vec3 vPosition;
            varying vec3 vNormal;
            void main() {
              vPosition = position;
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform vec3 uColor;
            varying vec3 vPosition;
            varying vec3 vNormal;

            void main() {
              float pulse = sin(uTime * 3.0 + vPosition.y * 4.0) * 0.5 + 0.5;
              float edgeGlow = pow(1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
              vec3 finalColor = uColor * (0.5 + pulse * 0.5 + edgeGlow * 1.2);
              gl_FragColor = vec4(finalColor, 0.7);
            }
          `}
        />
      </mesh>

      
      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.012, 6, 60]} /> {/* Reduced radial segments from 100 to 60 */}
        <meshBasicMaterial color="#22d3ee" transparent blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.01, 6, 60]} /> {/* Reduced radial segments from 100 to 60 */}
        <meshBasicMaterial color="#a855f7" transparent blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export default function BlockchainCore3D() {
  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 font-mono">
      <h2 className="text-5xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-500 tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]">
        3D BLOCKCHAIN CORE
      </h2>

      <p className="text-center text-gray-400 text-base md:text-lg mb-12 max-w-2xl mx-auto">
        Holographic blockchain engine visualizing immutable trust computation loops.
      </p>

      <div className="h-[600px] rounded-[36px] overflow-hidden border border-cyan-500/20 bg-black/40 backdrop-blur-md shadow-[0_0_60px_rgba(34,211,238,0.12)]">
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 50 }}
          dpr={1} //
          gl={{
            antialias: false,
            failIfMajorPerformanceCaveat: true,
          }}
        >
          
          <Stars radius={60} depth={40} count={400} factor={3} saturation={0} fade speed={0.5} />

          <CoreCube />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />

          <EffectComposer>
           
            <Bloom
              intensity={1.8}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.7}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let scene, camera, renderer, particleSystem;
    let animationFrameId;

    // 1. Scene & Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Create the Particle Mesh Grid (High Density)
    const particleCount = 6500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    const rows = 100;
    const cols = 65;
    const spacingX = 0.6;
    const spacingZ = 0.5;
    let index = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (index >= particleCount) break;

        // Center the grid on the 3D floor plane
        const x = (r - rows / 2) * spacingX;
        const z = (c - cols / 2) * spacingZ;
        const y = 0;

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        index++;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // 3. Premium High-End Glow Shader Material
    const material = new THREE.PointsMaterial({
      color: 0x4ecdc4, // Luxury cyan/aquamarine hue
      size: 0.18,      // Perfectly crisp particle weight
      sizeAttenuation: true, 
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending, // Forces overlapping crests to explode into white hot spots
      depthWrite: false,
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 4. Subtle Interactive Mouse Tracking
    let mouseX = 0;
    let targetMouseX = 0;

    const handleMouseMove = (event) => {
      targetMouseX = (event.clientX - window.innerWidth / 2) * 0.03;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Window resizing handle
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 5. High-fidelity Math Animation Frame
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const positionsArray = particleSystem.geometry.attributes.position.array;

      // Eased mouse rotation for a smooth fluid response
      mouseX += (targetMouseX - mouseX) * 0.05;
      particleSystem.rotation.y = elapsedTime * 0.03 + mouseX * 0.2;

      // Apply a multi-layered complex sine/cosine wave to emulate actual fluid dynamics
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positionsArray[i3];
        const z = positionsArray[i3 + 2];

        // Complex compounding frequencies create organic peaks and valleys
        const wave1 = Math.sin(x * 0.15 + elapsedTime * 1.2) * 1.2;
        const wave2 = Math.cos(z * 0.2 + elapsedTime * 0.8) * 0.8;
        const wave3 = Math.sin((x + z) * 0.08 + elapsedTime * 1.5) * 0.5;

        // Directly modify Y coordinate within the positions matrix array
        positionsArray[i3 + 1] = wave1 + wave2 + wave3;
      }

      particleSystem.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // ⚡ CLEANUP DESTRUCTOR: Completely tears down WebGL elements and global variables
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (renderer) {
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#03070d', // High-contrast premium obsidian background
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
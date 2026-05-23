
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let scene, camera, renderer, particleSystem;
    let animationFrameId;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    containerRef.current.appendChild(
      renderer.domElement
    );

    const particleCount = 6500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(
      particleCount * 3
    );

    const rows = 100;
    const cols = 65;
    const spacingX = 0.6;
    const spacingZ = 0.5;
    let index = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (index >= particleCount) break;

        const x = (r - rows / 2) * spacingX;
        const z = (c - cols / 2) * spacingZ;
        const y = 0;

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        index++;
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0x4ecdc4,
      size: 0.18,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    particleSystem = new THREE.Points(
      geometry,
      material
    );

    scene.add(particleSystem);

    let mouseX = 0;
    let targetMouseX = 0;

    const handleMouseMove = (event) => {
      targetMouseX =
        (event.clientX - window.innerWidth / 2) *
        0.03;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    const handleResize = () => {
      camera.aspect =
        window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId =
        requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      const positionsArray =
        particleSystem.geometry.attributes.position
          .array;

      mouseX += (targetMouseX - mouseX) * 0.05;

      particleSystem.rotation.y =
        elapsedTime * 0.03 + mouseX * 0.2;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positionsArray[i3];
        const z = positionsArray[i3 + 2];

        const wave1 =
          Math.sin(x * 0.15 + elapsedTime * 1.2) *
          1.2;

        const wave2 =
          Math.cos(z * 0.2 + elapsedTime * 0.8) *
          0.8;

        const wave3 =
          Math.sin(
            (x + z) * 0.08 + elapsedTime * 1.5
          ) * 0.5;

        positionsArray[i3 + 1] =
          wave1 + wave2 + wave3;
      }

      particleSystem.geometry.attributes.position.needsUpdate =
        true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      if (renderer) {
        renderer.dispose();

        if (
          containerRef.current &&
          renderer.domElement
        ) {
          containerRef.current.removeChild(
            renderer.domElement
          );
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
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#03070d",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}


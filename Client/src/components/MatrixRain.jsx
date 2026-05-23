import { useEffect, useRef } from "react";
import { speakTrustChain } from "./AIVoiceAssistant";

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const fontSize = 14;
    const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&";
    
    let columns = 0;
    let drops = [];
    let animationId = null;

    // 🛡️ RE-ENGINEERED SCALING ENGINE: Recalculates grid layouts cleanly on viewport changes
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      columns = Math.floor(canvas.width / fontSize);
      
      // Maintain old tracking lines during resize to avoid sudden matrix wipes
      const currentLength = drops.length;
      if (currentLength < columns) {
        for (let i = currentLength; i < columns; i++) {
          drops[i] = Math.random() * -20; // Stagger entrance offsets so they don't fall in a solid sheet
        }
      }
    };

    // Run layout configurations
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const draw = () => {
      // Semi-transparent overlay mask creates the smooth fading trailing particle tails
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#22d3ee";
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        // Fallback safety catch
        if (drops[i] === undefined) drops[i] = 1;

        const text = letters[Math.floor(Math.random() * letters.length)];
        
        // Render digital nodes down the viewport axis
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset tracking vector to the ceiling once it passes viewport limits
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // 🏎️ PERFORMANCE BOOST: Replaced setInterval with high-frequency requestAnimationFrame loops
    let lastTime = 0;
    const fpsInterval = 1000 / 24; // Locked at an optimal 24fps cinematic crawl rate

    const renderLoop = (timestamp) => {
      animationId = requestAnimationFrame(renderLoop);
      
      const elapsed = timestamp - lastTime;
      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);
        draw();
      }
    };

    // Start execution
    animationId = requestAnimationFrame(renderLoop);

    // Audio tracking log broadcast trigger
    const audioTimer = setTimeout(() => {
      if (typeof speakTrustChain === "function") {
        speakTrustChain("Ambient raw telemetry stream active in terminal background view.");
      }
    }, 800);

    // 🧼 FULL LEAK RECLAMATION PURGE: Complete event listener listener cleanup routine
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      clearTimeout(audioTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-[0.06] pointer-events-none bg-black"
    />
  );
}
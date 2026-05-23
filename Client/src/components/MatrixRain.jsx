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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      columns = Math.floor(canvas.width / fontSize);

      const currentLength = drops.length;

      if (currentLength < columns) {
        for (let i = currentLength; i < columns; i++) {
          drops[i] = Math.random() * -20;
        }
      }
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas, {
      passive: true,
    });

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.fillStyle = "#22d3ee";

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        if (drops[i] === undefined) {
          drops[i] = 1;
        }

        const text =
          letters[
            Math.floor(
              Math.random() * letters.length
            )
          ];

        ctx.fillText(
          text,
          i * fontSize,
          drops[i] * fontSize
        );

        if (
          drops[i] * fontSize >
            canvas.height &&
          Math.random() > 0.98
        ) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    let lastTime = 0;

    const fpsInterval = 1000 / 24;

    const renderLoop = (timestamp) => {
      animationId =
        requestAnimationFrame(renderLoop);

      const elapsed = timestamp - lastTime;

      if (elapsed > fpsInterval) {
        lastTime =
          timestamp -
          (elapsed % fpsInterval);

        draw();
      }
    };

    animationId =
      requestAnimationFrame(renderLoop);

    const audioTimer = setTimeout(() => {
      if (
        typeof speakTrustChain ===
        "function"
      ) {
        speakTrustChain(
          "Ambient raw telemetry stream active in terminal background view."
        );
      }
    }, 800);

    return () => {
      cancelAnimationFrame(animationId);

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

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
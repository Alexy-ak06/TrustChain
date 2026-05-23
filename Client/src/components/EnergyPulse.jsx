import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function EnergyPulse() {
  const [aiIsSpeaking, setAiIsSpeaking] = useState(false);

  // Hook into our global voice state channel to make the atmosphere react to sound waves
  useEffect(() => {
    const handleVoicePulse = (e) => {
      setAiIsSpeaking(e.detail.isSpeaking);
    };

    window.addEventListener("trustchain_voice_state", handleVoicePulse);
    return () => {
      window.removeEventListener("trustchain_voice_state", handleVoicePulse);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      
      {/* ⚡ PRIMARY CYAN ENERGY MATRIX - FLARES UP WHEN AI SPEAKS */}
      <motion.div
        animate={{
          scale: aiIsSpeaking ? [1.1, 1.4, 1.1] : [1, 1.25, 1],
          opacity: aiIsSpeaking ? [0.25, 0.45, 0.25] : [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: aiIsSpeaking ? 2.5 : 6, // Moves rapid and energized when speaking
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 w-[600px] md:w-[750px] h-[600px] md:h-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/40 blur-[100px] md:blur-[130px] mix-blend-screen"
      />

      {/* 🔮 SECONDARY PURPLE NEURAL BLOOM */}
      <motion.div
        animate={{
          scale: aiIsSpeaking ? [1.3, 1.1, 1.3] : [1.2, 0.95, 1.2],
          opacity: aiIsSpeaking ? [0.15, 0.3, 0.15] : [0.06, 0.16, 0.06],
        }}
        transition={{
          duration: aiIsSpeaking ? 3.5 : 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 w-[800px] md:w-[950px] h-[800px] md:h-[950px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/30 blur-[120px] md:blur-[150px] mix-blend-screen"
      />

    </div>
  );
}
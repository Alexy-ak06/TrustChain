import { useEffect } from "react";
import { motion } from "framer-motion";
import { speakTrustChain } from "./AIVoiceAssistant";

export default function HeroSection() {
  
  // 🎙️ Dynamic systemic welcome dispatcher
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      if (typeof speakTrustChain === "function") {
        speakTrustChain("Welcome to TrustChain Intelligence Network. Cryptographic security matrix initialized.");
      }
    }, 600);
    return () => clearTimeout(welcomeTimer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    // 🛡️ FIX: Reconfigured pointer-events architecture to allow flawless interactive layout triggers
    <section className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-4 md:px-6 font-mono selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* BACKGROUND GRAPHIC HUD MATRIX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_50%)] pointer-events-none z-0" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

      {/* 🔮 BACKGROUND GLOW SPHERES - Pushed safely back behind the interaction field via z-0 */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-10 md:left-20 w-64 md:w-80 h-64 md:h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none z-0 will-change-transform"
      />

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 right-10 md:right-20 w-72 md:w-96 h-72 md:h-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none z-0 will-change-transform"
      />

      {/* FOREGROUND HERO CORE CONTROLLERS */}
      <div className="relative z-10 max-w-5xl text-center py-20">
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-cyan-400 font-black text-xs md:text-sm tracking-[0.35em] uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]"
        >
          AI-Powered Blockchain Security
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-white"
        >
          TrustChain
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Intelligence Network
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed font-sans"
        >
          Advanced blockchain counterfeiting prevention hub integrated with telemetry autonomous threat intercept systems, real-time node validation arrays, and automated ledger ledger analysis.
        </motion.p>

        {/* INTERACTIVE CALL-TO-ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection("network")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-400 text-black font-black text-xs md:text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:bg-cyan-300 hover:shadow-[0_0_45px_rgba(34,211,238,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Launch Network
          </button>

          <button
            onClick={() => scrollToSection("threats")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10 backdrop-blur-md text-cyan-400 font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-cyan-500/10 hover:border-cyan-400/40 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Explore Intelligence
          </button>
        </motion.div>

        {/* METRICS SUMMARY MATRIX OVERVIEW */}
        <div className="mt-20 grid sm:grid-cols-3 gap-4 lg:gap-6 text-left">
          {[
            { value: "99.97%", label: "Verification Accuracy" },
            { value: "14+", label: "Distributed Nodes Online" },
            { value: "24/7/365", label: "Autonomous Cyber Shield" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 + index * 0.12 }}
              className="rounded-2xl border border-cyan-500/5 bg-gradient-to-b from-cyan-950/10 to-transparent p-6 backdrop-blur-md"
            >
              <h3 className="text-3xl lg:text-4xl font-black text-cyan-400 tracking-tight">
                {stat.value}
              </h3>
              <p className="mt-2 text-xs text-gray-500 uppercase font-bold tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
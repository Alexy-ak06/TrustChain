
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { speakTrustChain } from "./AIVoiceAssistant";

export default function CyberAttackSimulation() {
  const [activeAttacks, setActiveAttacks] = useState([
    { id: 1, x: 18, y: 28, type: "QR SPOOF", risk: "CRITICAL" },
    { id: 2, x: 72, y: 35, type: "LEDGER ATTACK", risk: "HIGH" },
    { id: 3, x: 44, y: 76, type: "FAKE NODE", risk: "WARNING" },
    { id: 4, x: 82, y: 22, type: "DATA BREACH", risk: "CRITICAL" },
  ]);

  useEffect(() => {
    if (activeAttacks.length === 4) {
      const intrusionAlert = setTimeout(() => {
        if (typeof speakTrustChain === "function") {
          speakTrustChain("Warning. Multiple perimeter breaches detected. Deploying real-time cryptographic countermeasures.");
        }
      }, 1000);
      return () => clearTimeout(intrusionAlert);
    }
  }, [activeAttacks.length]);

  const handleNeutralizeNode = (id, type) => {
    setActiveAttacks((prev) => prev.filter((item) => item.id !== id));
    if (typeof speakTrustChain === "function") {
      speakTrustChain(`${type} vector neutralized.`);
    }
  };

  const resetSimulation = () => {
    setActiveAttacks([
      { id: 1, x: 18, y: 28, type: "QR SPOOF", risk: "CRITICAL" },
      { id: 2, x: 72, y: 35, type: "LEDGER ATTACK", risk: "HIGH" },
      { id: 3, x: 44, y: 76, type: "FAKE NODE", risk: "WARNING" },
      { id: 4, x: 82, y: 22, type: "DATA BREACH", risk: "CRITICAL" },
    ]);
  };

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 font-mono select-none">
      <h2 className="text-5xl md:text-6xl font-black text-center text-red-400 tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(248,113,113,0.15)]">
        CYBER ATTACK SIMULATION
      </h2>

      <p className="text-center text-gray-400 text-sm md:text-base mb-12 max-w-2xl mx-auto">
        Autonomous threat defense engine dynamically neutralizing malicious network vector profiles.
      </p>

      <div className="relative h-[600px] overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-[#0c0205] via-[#12040b] to-[#020512] shadow-[0_0_60px_rgba(248,113,113,0.1)]">
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,113,113,0.08),transparent_55%)]" />
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <AnimatePresence>
            {activeAttacks.map((attack) => (
              <motion.line
                key={`laser-${attack.id}`}
                x1="50%"
                y1="50%"
                x2={`${attack.x}%`}
                y2={`${attack.y}%`}
                stroke="#22d3ee"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                initial={{ strokeDashoffset: 0, opacity: 0 }}
                animate={{ strokeDashoffset: -100, opacity: [0.3, 0.7, 0.3] }}
                exit={{ opacity: 0 }}
                transition={{
                  strokeDashoffset: { repeat: Infinity, duration: 2, ease: "linear" },
                  opacity: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
              />
            ))}
          </AnimatePresence>
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-44 h-44 rounded-full bg-cyan-400 blur-2xl"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border border-dashed border-cyan-400/30 flex items-center justify-center p-2 bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          >
            <div className="w-full h-full rounded-full border border-cyan-500/40 animate-pulse bg-cyan-950/20" />
          </motion.div>
          <span className="text-[10px] text-cyan-400 font-bold tracking-widest mt-3 uppercase drop-shadow-[0_0_8px_#22d3ee]">
            AI Core
          </span>
        </div>

        <AnimatePresence>
          {activeAttacks.map((attack) => (
            <motion.div
              key={attack.id}
              className="absolute z-30 cursor-pointer group"
              style={{ left: `${attack.x}%`, top: `${attack.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, filter: "blur(5px)" }}
              onClick={() => handleNeutralizeNode(attack.id, attack.type)}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded-full bg-red-500 shadow-[0_0_20px_#ef4444] transition-transform duration-200 group-hover:scale-125" />

                <motion.div
                  className="absolute inset-0 rounded-full border border-red-400/60"
                  animate={{ scale: [1, 2.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />

                <div className="absolute left-7 top-1/2 -translate-y-1/2 bg-black/80 border border-red-500/30 rounded-lg px-2.5 py-1.5 opacity-80 group-hover:opacity-100 group-hover:border-cyan-400/50 transition-all duration-150 shadow-xl min-w-[110px]">
                  <p className="text-[10px] font-black text-white tracking-wider m-0 group-hover:text-cyan-400">
                    {attack.type}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-red-400 animate-ping" />
                    <span className="text-[8px] text-red-400 font-bold tracking-widest">
                      {attack.risk}
                    </span>
                  </div>
                  <p className="text-[8px] text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    Click to Counter
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {activeAttacks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 top-3/4 -translate-x-1/2 flex flex-col items-center z-40"
          >
            <p className="text-cyan-400 text-xs text-center mb-3 tracking-widest uppercase">
              Perimeter Purged. All Systems Clear.
            </p>
            <button
              onClick={resetSimulation}
              className="rounded-xl border border-cyan-400 bg-cyan-950/20 px-5 py-2.5 text-xs text-cyan-400 font-bold tracking-widest uppercase hover:bg-cyan-400 hover:text-black transition duration-200 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              Re-populate Threat Vectors
            </button>
          </motion.div>
        )}

        <div className="absolute top-6 left-6 bg-black/60 border border-cyan-500/10 rounded-xl px-4 py-3.5 backdrop-blur-md z-40">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
            <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase">
              AI DEFENSE MATRIX
            </p>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Autonomous core interception operational
          </p>
        </div>

        <div className="absolute bottom-6 right-6 bg-black/60 border border-red-500/10 rounded-xl px-4 py-3.5 backdrop-blur-md z-40">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${activeAttacks.length > 0 ? "bg-red-500 animate-ping" : "bg-gray-600"}`} />
            <p className="text-red-400 text-xs font-bold tracking-widest uppercase">
              INTELLIGENCE INTRUSION LOG
            </p>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Active Threat Counts: {activeAttacks.length} Vector Profiles
          </p>
        </div>

      </div>
    </div>
  );
}


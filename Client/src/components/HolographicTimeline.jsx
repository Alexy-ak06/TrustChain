
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { speakTrustChain } from "./AIVoiceAssistant";

export default function HolographicTimeline({ timeline = [], verified = true }) {
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    if (!timeline || timeline.length === 0) return;
    if (hasSpokenRef.current) return;

    const speechTimer = setTimeout(() => {
      if (verified) {
        speakTrustChain(
          "Supply chain trace successfully verified across five ledger layers."
        );
      } else {
        speakTrustChain(
          "Warning. Supply chain trace failed cryptographic authentication check."
        );
      }

      hasSpokenRef.current = true;
    }, 600);

    return () => clearTimeout(speechTimer);
  }, [verified, timeline.length]);

  if (!timeline || timeline.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-cyan-500/20 bg-black/40 p-10 text-center font-mono">
        <p className="text-gray-500 text-sm uppercase tracking-widest">
          Awaiting cryptographic package telemetry sequence...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-3xl border border-cyan-500/10 bg-black/40 p-6 md:p-8 backdrop-blur-md font-mono select-none shadow-[0_0_50px_rgba(34,211,238,0.02)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-cyan-500/10 pb-4">
        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
          HOLOGRAPHIC SUPPLY TRAIL
        </h3>

        <div
          className={`self-start sm:self-auto px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${
            verified
              ? "bg-cyan-950/20 border-cyan-400/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
              : "bg-red-950/20 border-red-400/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
          }`}
        >
          {verified ? "✓ LEDGER SECURED" : "⚠️ INTEGRITY BREACHED"}
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-cyan-400/40 via-blue-500/20 to-transparent pointer-events-none" />

        <div className="space-y-6">
          {timeline.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative flex gap-5 group"
            >
              <div className="relative flex items-start pt-1.5">
                <motion.div
                  animate={{
                    scale: verified ? [1, 1.3, 1] : [1, 1.5, 1],
                    opacity: verified ? [0.7, 1, 0.7] : [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: verified ? 2.5 : 1.2,
                    repeat: Infinity,
                    delay: index * 0.15,
                  }}
                  className={`h-[30px] w-[30px] rounded-full border flex items-center justify-center z-10 transition-all duration-300 ${
                    verified
                      ? "border-cyan-400 bg-black shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:bg-cyan-950"
                      : "border-red-500 bg-black shadow-[0_0_15px_rgba(239,68,68,0.3)] group-hover:bg-red-950"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      verified ? "bg-cyan-400" : "bg-red-500"
                    }`}
                  />
                </motion.div>
              </div>

              <div className="flex-1 rounded-xl border border-cyan-500/5 bg-cyan-950/5 p-4 md:p-5 backdrop-blur-xl transition-all duration-200 hover:border-cyan-500/10 hover:bg-cyan-950/10">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-black tracking-widest text-cyan-400/70">
                    CHECKPOINT 0{index + 1}
                  </p>

                  <p className="text-[9px] text-gray-500 font-bold tracking-wider">
                    {new Date().toISOString().split("T")[0]}
                  </p>
                </div>

                <p className="mt-2 text-sm font-bold text-gray-300 leading-relaxed tracking-wide">
                  {step}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


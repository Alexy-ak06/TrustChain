
import { useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { speakTrustChain } from "./AIVoiceAssistant";

export default function GlobalCommandCenter() {
  const verificationPings = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      top: `${20 + Math.random() * 60}%`,
      left: `${20 + Math.random() * 60}%`,
      delay: i * 0.25,
    }));
  }, []);

  useEffect(() => {
    const speechTimer = setTimeout(() => {
      if (typeof speakTrustChain === "function") {
        speakTrustChain("Establishing global telemetry link. Node status metrics aggregate stable across all sectors.");
      }
    }, 800);

    return () => clearTimeout(speechTimer);
  }, []);

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 font-mono select-none relative">
      <div className="relative overflow-hidden rounded-[32px] border border-cyan-500/10 bg-black/40 backdrop-blur-xl p-6 md:p-10 shadow-[0_0_60px_rgba(34,211,238,0.05)]">
        
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider">
              GLOBAL COMMAND CENTER
            </h2>

            <p className="text-gray-400 mt-3 text-xs md:text-sm tracking-wide max-w-xl mx-auto">
              Real-time worldwide ledger synchronicity and autonomous transaction routing logs.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            
            <div className="space-y-4 w-full lg:w-[32%] order-2 lg:order-1">
              {[
                { name: "Asia Supply Chain Network", status: "Active" },
                { name: "Europe Verification Blocks", status: "Stable" },
                { name: "North America Fraud Shield", status: "Armed" },
                { name: "Quantum Core Consensus", status: "Synchronized" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-center gap-4 border border-cyan-500/10 bg-cyan-950/5 rounded-xl px-5 py-4 backdrop-blur-md"
                >
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4,
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-bold truncate tracking-wide">
                      {item.name}
                    </p>

                    <p className="text-emerald-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">
                      {item.status}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative w-[340px] md:w-[400px] h-[340px] md:w-[400px] flex items-center justify-center order-1 lg:order-2">
              <motion.div
                className="absolute w-full h-full rounded-full border border-cyan-500/10 border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute w-[80%] h-[80%] rounded-full border border-cyan-500/5"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="relative w-[220px] md:w-[250px] h-[220px] md:h-[250px] rounded-full bg-gradient-to-br from-cyan-950 via-blue-950 to-black shadow-[0_0_80px_rgba(34,211,238,0.25)] border border-cyan-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-[size:16px_16px]" />

                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,#ffffff,transparent_40%)]" />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent origin-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />

                {verificationPings.map((ping) => (
                  <motion.div
                    key={ping.id}
                    className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] z-20"
                    style={{ top: ping.top, left: ping.left }}
                    animate={{
                      scale: [0.8, 1.8, 0.8],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: ping.delay,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-[32%] order-3">
              {[
                { title: "ACTIVE NODES", value: "12,847" },
                { title: "LIVE SCANS", value: "4.2M" },
                { title: "THREATS BLOCKED", value: "98.2%" },
                { title: "CONSENSUS", value: "STABLE" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-cyan-500/10 bg-cyan-950/5 rounded-2xl p-4 md:p-5 text-center backdrop-blur-md"
                >
                  <h3 className="text-2xl md:text-3xl font-black text-cyan-400 tracking-tight">
                    {stat.value}
                  </h3>

                  <p className="text-gray-400 mt-1 text-[10px] font-bold tracking-widest uppercase">
                    {stat.title}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


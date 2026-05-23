
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { speakTrustChain } from "./AIVoiceAssistant";

export default function MiningSimulation() {
  const [nonce, setNonce] = useState(284739);
  const [hashRate, setHashRate] = useState(94.2);
  const [blocks, setBlocks] = useState(1284);

  const [logs, setLogs] = useState([
    "Initializing mining core telemetry loops...",
    "Validating distributed ledger consensus...",
    "Awaiting verification matrix mapping...",
  ]);

  const lastVerifiedBlockRef = useRef(1284);

  useEffect(() => {
    if (typeof speakTrustChain === "function") {
      window.speechSynthesis.cancel();

      speakTrustChain(
        "Mining simulation node online. Initializing block validation loops."
      );
    }

    const interval = setInterval(() => {
      const nonceIncrement =
        Math.floor(Math.random() * 450) + 50;

      setNonce((prev) => prev + nonceIncrement);

      const dynamicHash = (
        92.4 +
        Math.random() * 12.8
      ).toFixed(2);

      setHashRate(parseFloat(dynamicHash));

      if (Math.random() > 0.72) {
        setBlocks((prev) => {
          const nextBlock = prev + 1;

          if (
            nextBlock >
            lastVerifiedBlockRef.current
          ) {
            if (
              typeof speakTrustChain ===
              "function"
            ) {
              window.speechSynthesis.cancel();

              speakTrustChain(
                `Block ${nextBlock} verified. Appending state ledger changes.`
              );
            }

            lastVerifiedBlockRef.current =
              nextBlock;
          }

          setLogs((prevLogs) => [
            `📦 Block #${nextBlock} mined successfully. Hash target matching verified.`,
            `AI anomaly detection scanning blocks... Integrity clear.`,
            `Consensus synchronization broadcast to 14 active nodes.`,
            ...prevLogs.slice(0, 2),
          ]);

          return nextBlock;
        });
      } else {
        const routineEvents = [
          `Hashing iteration index delta: +${nonceIncrement} variants`,
          `Node cluster integrity check... 100% operational`,
          `Synchronizing ledger data paths...`,
          `Processing cross-border tracking payload...`,
        ];

        const randomLog =
          routineEvents[
            Math.floor(
              Math.random() *
                routineEvents.length
            )
          ];

        setLogs((prevLogs) => [
          randomLog,
          ...prevLogs.slice(0, 4),
        ]);
      }
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-24 px-4 md:px-6 overflow-hidden bg-black font-mono select-none">
      <motion.div
        className="absolute top-0 left-0 w-[450px] h-[450px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none z-0"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight drop-shadow-[0_0_30px_rgba(34,211,238,0.1)]">
          BLOCKCHAIN MINING ENGINE
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-cyan-950/5 border border-cyan-500/10 rounded-2xl p-6 backdrop-blur-md">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Current Nonce
            </p>

            <h3 className="text-3xl md:text-4xl font-black text-cyan-400 mt-4 tracking-tight">
              {nonce.toLocaleString()}
            </h3>

            <div className="h-[3px] w-full bg-cyan-950 rounded-full mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400"
                animate={{
                  width: `${nonce % 100}%`,
                }}
                transition={{
                  duration: 0.3,
                }}
              />
            </div>
          </div>

          <div className="bg-emerald-950/5 border border-emerald-500/10 rounded-2xl p-6 backdrop-blur-md">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Hash Throughput
            </p>

            <h3 className="text-3xl md:text-4xl font-black text-emerald-400 mt-4 tracking-tight">
              {hashRate}

              <span className="text-xs text-emerald-600 font-normal">
                {" "}
                TH/s
              </span>
            </h3>

            <div className="h-[3px] w-full bg-emerald-950 rounded-full mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-emerald-400"
                animate={{
                  width: `${
                    ((hashRate - 92) / 13) *
                    100
                  }%`,
                }}
                transition={{
                  duration: 0.4,
                }}
              />
            </div>
          </div>

          <div className="bg-purple-950/5 border border-purple-500/10 rounded-2xl p-6 backdrop-blur-md sm:col-span-2 md:col-span-1">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Verified Blocks
            </p>

            <h3 className="text-3xl md:text-4xl font-black text-purple-400 mt-4 tracking-tight">
              {blocks}
            </h3>

            <div className="h-[3px] w-full bg-purple-950 rounded-full mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-purple-400"
                animate={{
                  width: "100%",
                }}
                key={blocks}
                initial={{
                  width: "0%",
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 bg-black/60 border border-cyan-500/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-cyan-500/10 pb-4">
            <h4 className="text-sm font-black text-white uppercase tracking-widest">
              Live Core Verification Output
            </h4>

            <div className="flex items-center gap-2 text-emerald-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="font-bold tracking-wider">
                SECURE GRID LINK
              </span>
            </div>
          </div>

          <div className="space-y-4 mt-6 text-xs min-h-[180px] overflow-hidden">
            <AnimatePresence mode="popLayout">
              {logs.map((log) => (
                <motion.div
                  key={log}
                  initial={{
                    opacity: 0,
                    y: -15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="flex items-start gap-3 text-cyan-400"
                >
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-cyan-800" />

                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}



import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductScannerConsole() {
  const [visibleLogs, setVisibleLogs] = useState([]);

  const masterScans = useMemo(
    () => [
      "QR fingerprint extracted and parsed",
      "Product ID matched with distributed MongoDB registry",
      "Cross-ledger blockchain hash recalculated successfully",
      "AI risk models evaluated macro supply-chain anomalies",
      "Decentralized ledger authenticity verified and confirmed",
    ],
    []
  );

  useEffect(() => {
    let logIndex = 0;
    let timeoutId;

    setVisibleLogs([]);

    const streamLogs = () => {
      if (logIndex < masterScans.length) {
        const nextLog = masterScans[logIndex];

        setVisibleLogs((prev) => [
          ...prev,
          {
            id: `scan-${logIndex}`,
            text: nextLog,
          },
        ]);

        logIndex++;

        timeoutId = setTimeout(streamLogs, 1200);
      }
    };

    streamLogs();

    return () => clearTimeout(timeoutId);
  }, [masterScans]);

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 font-mono select-none">
      <h2 className="text-4xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 tracking-tight">
        LIVE PRODUCT SCANNER CONSOLE
      </h2>

      <p className="text-center text-gray-500 text-xs md:text-sm uppercase tracking-widest mt-3 mb-12">
        Real-time verification pipeline for every scanned product identity.
      </p>

      <div className="rounded-[38px] border border-cyan-500/10 bg-[#02050a]/80 p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="space-y-4 min-h-[380px] flex flex-col justify-start">
          <AnimatePresence mode="popLayout">
            {visibleLogs.map((scan, index) => (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                }}
                className="flex items-center gap-4 rounded-xl border border-cyan-500/5 bg-cyan-950/10 px-5 py-4 backdrop-blur-md"
              >
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <p className="text-cyan-200 text-xs md:text-sm tracking-tight break-words">
                  <span className="text-cyan-500/50 font-bold mr-1">
                    sys_log //
                  </span>
                  {scan.text}
                </p>

                <span className="ml-auto text-emerald-400 text-xs font-black tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  OK
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {visibleLogs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="flex flex-col items-center justify-center my-auto py-20 text-center text-cyan-500/40 gap-2"
            >
              <div className="h-5 w-5 rounded-full border border-dashed border-cyan-500/40 animate-spin" />

              <p className="text-xs uppercase tracking-[0.2em]">
                Awaiting Hardware Handshake Link...
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}


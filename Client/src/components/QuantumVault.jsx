
import { useMemo } from "react";
import { motion } from "framer-motion";

export default function QuantumVault() {
  const securityDots = useMemo(() => {
    return [...Array(14)].map((_, i) => ({
      id: `dot-${i}`,
      top: `${15 + Math.random() * 70}%`,
      left: `${15 + Math.random() * 70}%`,
      delay: i * 0.15,
    }));
  }, []);

  const leftTelemetry = useMemo(
    () => [
      {
        id: "tele-1",
        label: "Encryption Strength",
        value: "4096-BIT",
      },
      {
        id: "tele-2",
        label: "Threat Resistance",
        value: "99.98%",
      },
      {
        id: "tele-3",
        label: "Consensus Integrity",
        value: "VERIFIED",
      },
    ],
    []
  );

  const rightLogs = useMemo(
    () => [
      {
        id: "log-1",
        text: "Quantum firewall initialized",
      },
      {
        id: "log-2",
        text: "AI anomaly defense active",
      },
      {
        id: "log-3",
        text: "Biometric consensus authenticated",
      },
      {
        id: "log-4",
        text: "Zero-trust verification enabled",
      },
    ],
    []
  );

  return (
    <div className="mt-32 relative overflow-hidden rounded-[38px] border border-cyan-500/20 bg-[#02050a]/60 backdrop-blur-2xl p-6 md:p-12 font-mono select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-3xl md:text-6xl font-black text-cyan-300 tracking-widest bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
            QUANTUM SECURITY VAULT
          </h1>

          <p className="text-gray-500 mt-3 text-xs md:text-sm uppercase tracking-widest">
            Military-grade decentralized blockchain protection core
          </p>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-20">
          <div className="space-y-6 w-full xl:w-[30%] order-2 xl:order-1">
            {leftTelemetry.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: -50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                className="bg-cyan-950/10 border border-cyan-500/5 rounded-2xl p-6 backdrop-blur-md"
              >
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                  {item.label}
                </p>

                <h2 className="text-2xl md:text-3xl font-black text-cyan-300 tracking-tight">
                  {item.value}
                </h2>
              </motion.div>
            ))}
          </div>

          <div className="relative flex items-center justify-center w-[320px] h-[320px] md:w-[450px] md:h-[450px] order-1 xl:order-2 my-8 xl:my-0">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-cyan-400/20"
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-[240px] h-[240px] md:w-[340px] md:h-[340px] rounded-full border border-cyan-300/15 border-t-cyan-400/40"
            />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-[180px] h-[180px] md:w-[260px] md:h-[260px] rounded-full border border-double border-cyan-200/10"
            />

            <motion.div
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[130px] h-[130px] md:w-[180px] md:h-[180px] rounded-full bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-800 shadow-[0_0_80px_rgba(34,211,238,0.35)] flex items-center justify-center"
            >
              <div className="absolute inset-4 rounded-full bg-[#02050a]/90 backdrop-blur-xl flex items-center justify-center">
                <motion.div
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-center"
                >
                  <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200 tracking-tighter">
                    98%
                  </h3>

                  <p className="text-[9px] tracking-[0.2em] text-cyan-400 font-bold mt-1">
                    SECURED
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {securityDots.map((dot) => (
              <motion.div
                key={dot.id}
                className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] pointer-events-none"
                style={{
                  top: dot.top,
                  left: dot.left,
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: dot.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="space-y-4 w-full xl:w-[30%] order-3">
            {rightLogs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.12,
                  type: "spring",
                  stiffness: 100,
                }}
                className="flex items-center gap-4 border border-cyan-500/5 bg-cyan-950/10 rounded-2xl px-5 py-4 backdrop-blur-md"
              >
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  }}
                />

                <p className="text-gray-300 text-xs md:text-sm font-medium tracking-tight">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


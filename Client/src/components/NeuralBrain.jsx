
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function NeuralBrain() {
  const [aiConfidence, setAiConfidence] = useState(97.4);

  const neurons = useMemo(
    () => [
      { id: "neu-1", x: "20%", y: "25%" },
      { id: "neu-2", x: "40%", y: "18%" },
      { id: "neu-3", x: "65%", y: "28%" },
      { id: "neu-4", x: "30%", y: "55%" },
      { id: "neu-5", x: "55%", y: "58%" },
      { id: "neu-6", x: "78%", y: "62%" },
      { id: "neu-7", x: "45%", y: "80%" },
    ],
    []
  );

  const networkLinks = useMemo(() => {
    const links = [];

    for (let i = 0; i < neurons.length; i++) {
      for (let j = i + 1; j < neurons.length; j++) {
        links.push({
          id: `link-${neurons[i].id}-${neurons[j].id}`,
          from: neurons[i],
          to: neurons[j],
          delay: (i + j) * 0.12,
        });
      }
    }

    return links;
  }, [neurons]);

  useEffect(() => {
    const metricInterval = setInterval(() => {
      const targetDrift = parseFloat(
        (96.5 + Math.random() * 2.8).toFixed(1)
      );

      setAiConfidence(targetDrift);
    }, 4000);

    return () => clearInterval(metricInterval);
  }, []);

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 font-mono select-none">
      <h2 className="text-4xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 tracking-tight">
        AI NEURAL RISK ENGINE
      </h2>

      <p className="text-center text-gray-500 text-xs md:text-sm uppercase tracking-widest mt-3 mb-12">
        Intelligent counterfeit prediction network learning from blockchain signals.
      </p>

      <div className="relative h-[600px] overflow-hidden rounded-3xl border border-purple-500/10 bg-gradient-to-br from-[#04010a] via-[#0f021f] to-[#010206] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06),transparent_50%)] pointer-events-none" />

        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {networkLinks.map((link) => (
            <motion.line
              key={link.id}
              x1={link.from.x}
              y1={link.from.y}
              x2={link.to.x}
              y2={link.to.y}
              stroke="#c084fc"
              strokeWidth="1"
              initial={{
                pathLength: 0,
                opacity: 0.1,
              }}
              animate={{
                pathLength: 1,
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: link.delay,
              }}
            />
          ))}
        </svg>

        {neurons.map((neuron, index) => (
          <motion.div
            key={neuron.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: neuron.x,
              top: neuron.y,
            }}
            animate={{
              scale: [1, 1.12, 1],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.25,
            }}
          >
            <div className="h-6 w-6 rounded-full bg-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.6)] border border-purple-300/30" />

            <motion.div
              className="absolute inset-0 rounded-full border border-purple-400/40"
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.25,
              }}
            />
          </motion.div>
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-20">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-44 w-44 rounded-full bg-purple-500/10 blur-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          <motion.h3
            key={aiConfidence}
            initial={{
              scale: 0.9,
              opacity: 0.7,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-300 tracking-tighter tabular-nums"
          >
            {aiConfidence}%
          </motion.h3>

          <p className="mt-2 text-purple-400 text-[10px] font-black tracking-[0.2em]">
            AI CONFIDENCE CORE
          </p>
        </div>

        <div className="absolute top-6 left-6 rounded-xl border border-purple-500/10 bg-black/60 px-4 py-3 backdrop-blur-md">
          <p className="font-black text-xs tracking-widest text-purple-400">
            NEURAL ENGINE ACTIVE
          </p>

          <p className="mt-0.5 text-[10px] text-gray-500">
            Real-time pattern mitigation active
          </p>
        </div>

        <div className="absolute bottom-6 right-6 rounded-xl border border-purple-500/10 bg-black/60 px-4 py-3 backdrop-blur-md">
          <p className="font-black text-xs tracking-widest text-indigo-400">
            SYNTACTIC ANALYSIS LOOP
          </p>

          <p className="mt-0.5 text-[10px] text-gray-500">
            Parsing cross-ledger hash markers
          </p>
        </div>
      </div>
    </div>
  );
}


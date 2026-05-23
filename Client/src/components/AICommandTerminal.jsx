import { motion } from "framer-motion";

export default function AICommandTerminal() {
  const commands = [
    "Initializing TrustChain AI kernel...",
    "Scanning blockchain integrity...",
    "Consensus nodes synchronized.",
    "AI counterfeit analysis running...",
    "Fraud probability matrix updated.",
    "Threat response protocols active.",
    "Global trust network secured.",
  ];

  return (
    <div className="mt-24 max-w-7xl mx-auto">
      <h2 className="text-6xl font-black text-center text-green-300 mb-4">
        AI Command Terminal
      </h2>

      <p className="text-center text-gray-400 text-lg mb-12">
        Autonomous AI operating layer controlling blockchain security intelligence.
      </p>

      <div className="relative overflow-hidden rounded-[48px] border border-green-400/30 bg-black shadow-[0_0_90px_rgba(74,222,128,0.18)]">

        
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4 bg-white/5">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>

          <p className="ml-4 text-green-300 font-mono text-sm">
            trustchain_ai_terminal
          </p>
        </div>

        
        <div className="p-8 space-y-5 font-mono text-sm md:text-base">
          {commands.map((command, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: index * 0.4,
              }}
              className="flex items-start gap-4"
            >
              <span className="text-cyan-300">{">"}</span>

              <motion.p
                className="text-green-300"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                {command}
              </motion.p>
            </motion.div>
          ))}

         
          <motion.div
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="w-4 h-6 bg-green-300 mt-4"
          />
        </div>
      </div>
    </div>
  );
}
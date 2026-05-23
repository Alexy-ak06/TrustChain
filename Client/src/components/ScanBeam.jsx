
import { motion } from "framer-motion";

export default function ScanBeam() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] z-20 select-none">
      <motion.div
        animate={{
          y: ["-120%", "120%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 top-0 w-full h-32 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent blur-xl"
      />

      <motion.div
        animate={{
          opacity: [0.12, 0.28, 0.12],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 border border-cyan-400/10"
      />
    </div>
  );
}


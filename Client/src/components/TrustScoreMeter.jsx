import { useMemo } from "react";
import { motion } from "framer-motion";

export default function TrustScoreMeter({ score = 0 }) {
 
  const status = useMemo(() => {
    if (score >= 90) return { color: "green", gradient: "from-emerald-400 to-cyan-400", label: "VERIFIED" };
    if (score >= 70) return { color: "yellow", gradient: "from-amber-300 to-orange-400", label: "MONITORED" };
    return { color: "red", gradient: "from-rose-500 to-pink-600", label: "THREAT" };
  }, [score]);

  return (
    <div className="mt-10 rounded-[32px] border border-cyan-500/10 bg-[#02050a]/60 p-8 backdrop-blur-xl shadow-2xl overflow-hidden relative">
      
      <div className="flex items-center justify-between z-10 relative">
        <div>
          <h3 className="text-3xl font-black text-cyan-100 tracking-tight">AI Trust Score</h3>
          <p className="mt-2 text-gray-500 text-sm uppercase tracking-widest font-mono">
            {status.label} : Autonomous Authenticity
          </p>
        </div>

        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={`text-5xl font-black tabular-nums ${
            status.color === "green" ? "text-emerald-400" : status.color === "yellow" ? "text-amber-400" : "text-rose-400"
          }`}
        >
          {score}<span className="text-2xl opacity-60">%</span>
        </motion.div>
      </div>

      
      <div className="mt-8 h-4 rounded-full bg-cyan-950/40 relative border border-white/5 overflow-hidden">
        
        <div className="absolute inset-0 flex justify-between px-1 items-center">
          <div className="w-[2px] h-full bg-white/10" />
          <div className="w-[2px] h-full bg-white/10" />
          <div className="w-[2px] h-full bg-white/10" />
        </div>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${status.gradient} shadow-[0_0_15px_rgba(34,211,238,0.2)]`}
        />
      </div>

      <div className="mt-4 flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
        <span>Critical Risk</span>
        <span>Neutral</span>
        <span>Trusted</span>
      </div>
    </div>
  );
}
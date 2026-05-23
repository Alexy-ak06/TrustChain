import { useMemo } from "react";
import { motion } from "framer-motion";

export default function SecurityScorePanel({ product }) {

  if (!product) return null;

  const scores = useMemo(() => {
    const hashScore = product?.hashValid ? 99 : 58;
    
    const aiScore =
      product?.aiRisk?.score !== undefined
        ? 100 - product.aiRisk.score
        : product?.riskLevel === "High Risk"
        ? 35
        : 96;

    const supplyScore = product?.timeline?.length >= 4 ? 96 : 68;
    const tamperScore = product?.hashValid ? 3 : 42;

    return [
      {
        id: "score-integrity",
        label: "Blockchain Integrity",
        value: hashScore,
        suffix: "%",
        isDangerMetric: false,
      },
      {
        id: "score-authenticity",
        label: "AI Authenticity",
        value: aiScore,
        suffix: "%",
        isDangerMetric: false,
      },
      {
        id: "score-trust",
        label: "Supply Chain Trust",
        value: supplyScore,
        suffix: "%",
        isDangerMetric: false,
      },
      {
        id: "score-tamper",
        label: "Tamper Probability",
        value: tamperScore,
        suffix: "%",
        isDangerMetric: true, 
      },
    ];
  }, [product]);

  return (
    <div className="mt-10 rounded-[28px] border border-cyan-500/10 bg-[#02050a]/60 p-6 md:p-8 backdrop-blur-xl shadow-2xl font-mono select-none">
      <h3 className="text-2xl md:text-3xl font-black text-cyan-300 tracking-tight mb-6">
        AI Security Score Matrix
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {scores.map((score, index) => {
      
          const triggerDangerState = 
            (score.isDangerMetric && score.value > 30) || 
            (!score.isDangerMetric && score.value < 60);

          return (
            <motion.div
              key={score.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="rounded-2xl border border-cyan-500/5 bg-cyan-950/5 p-5 flex flex-col justify-between"
            >
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">
                  {score.label}
                </p>

                <h4
                  className={`mt-4 text-3xl md:text-4xl font-black tracking-tighter tabular-nums ${
                    triggerDangerState ? "text-red-400" : "text-cyan-300"
                  }`}
                >
                  {score.value}
                  <span className="text-lg md:text-xl ml-0.5 opacity-70 font-medium">{score.suffix}</span>
                </h4>
              </div>

              
              <div className="mt-5 h-2 rounded-full bg-cyan-950/40 border border-white/5 overflow-hidden relative w-full">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${score.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                  className={`h-full rounded-full ${
                    triggerDangerState
                      ? "bg-gradient-to-r from-red-500 to-rose-400 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                      : "bg-gradient-to-r from-cyan-500 to-teal-400 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
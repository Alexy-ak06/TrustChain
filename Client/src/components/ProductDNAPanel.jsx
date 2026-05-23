
import { motion } from "framer-motion";

export default function ProductDNAPanel({ product, verified, hashValid }) {
  const isSecure = verified && hashValid;

  const dnaSequence = [
    "AX-44",
    "QR-11",
    "BLK-92",
    "AUTH-7",
    isSecure ? "VERIFIED" : "COMPROMISED",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative mt-10 overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-black/40 backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(34,211,238,0.12)]"
    >
      <motion.div
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 z-20 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />

      <div className="relative z-10 flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-400">
            PRODUCT DNA
          </h2>

          <p className="mt-2 text-gray-400 text-sm font-mono">
            ENCRYPTED_GENOME_SEQ_v2.4
          </p>
        </div>

        <div
          className={`h-3 w-3 rounded-full ${
            isSecure
              ? "bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
              : "bg-red-400 shadow-[0_0_15px_#f87171] animate-pulse"
          }`}
        />
      </div>

      <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
        {dnaSequence.map((gene, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 ${
              gene === "COMPROMISED" ? "text-red-300" : "text-cyan-300"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12 }}
              className={`rounded-xl border px-4 py-3 text-sm font-black tracking-[0.2em] backdrop-blur-xl ${
                gene === "COMPROMISED"
                  ? "border-red-500/20 bg-red-500/10"
                  : "border-cyan-500/20 bg-cyan-500/10"
              }`}
            >
              {gene}
            </motion.div>

            {index !== dnaSequence.length - 1 && (
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="h-[2px] w-8 bg-gradient-to-r from-cyan-400 to-purple-400"
              />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Authenticity"
          value={isSecure ? "98.94%" : "41.22%"}
          color="text-cyan-300"
          progress={isSecure ? 98 : 41}
        />

        <StatCard
          title="Mutation Risk"
          value={isSecure ? "1.8%" : "72.4%"}
          color="text-red-300"
          progress={isSecure ? 1.8 : 72.4}
        />

        <StatCard
          title="Genome State"
          value={isSecure ? "PURE" : "MUTATED"}
          color={isSecure ? "text-emerald-300" : "text-red-300"}
        />
      </div>

      <div className="relative z-10 mt-8 border-t border-cyan-500/10 pt-5 flex items-center justify-between text-xs tracking-wider text-gray-500 uppercase">
        <span>Blockchain Genome Registry Active</span>
        <span>{product?.productId || "DNA-UNKNOWN"}</span>
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, color, progress }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5">
      <p className="text-[10px] uppercase tracking-widest text-gray-500">
        {title}
      </p>

      <h3 className={`mt-2 text-3xl font-black ${color}`}>
        {value}
      </h3>

      {progress !== undefined && (
        <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 1.2 }}
            className={`h-full ${
              color.includes("red") ? "bg-red-500" : "bg-cyan-500"
            }`}
          />
        </div>
      )}
    </div>
  );
}


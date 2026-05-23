import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { speakTrustChain } from "./AIVoiceAssistant";

export default function NetworkVisualizer() {
  
  // 🛡️ MEMOIZED STRUCTURAL MAPS: Preserves deterministic coordinates across render loops
  const nodes = useMemo(() => [
    { id: "node-mfg", x: "12%", y: "68%", size: "large", label: "Manufacturer" },
    { id: "node-val", x: "24%", y: "28%", size: "small", label: "Validator" },
    { id: "node-bla", x: "36%", y: "52%", size: "large", label: "Block A" },
    { id: "node-aic", x: "48%", y: "24%", size: "medium", label: "AI Check" },
    { id: "node-rsc", x: "56%", y: "76%", size: "medium", label: "Route Sync" },
    { id: "node-blb", x: "68%", y: "44%", size: "large", label: "Block B", threat: true },
    { id: "node-sec", x: "80%", y: "20%", size: "small", label: "Security Node", threat: true },
    { id: "node-cst", x: "88%", y: "62%", size: "large", label: "Customer" },
  ], []);

  const sizeMap = { small: "14px", medium: "20px", large: "28px" };

  // Generate background telemetry noise safely once on mount
  const staticDataLines = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: `hex-${i}`,
      y: `${10 + (i * 7.5)}%`,
      text: Math.random().toString(16).substring(2, 18).toUpperCase(),
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 5
    }));
  }, []);

  // Audio security alert trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof speakTrustChain === "function") {
        speakTrustChain("Warning. Threat matrix scans indicate anomaly vectors intersecting Block B and Security Core.");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 font-mono select-none">
      
      <h2 className="text-4xl md:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
        NEURAL BLOCKCHAIN MATRIX
      </h2>

      <p className="text-center text-gray-500 text-xs md:text-sm uppercase tracking-widest mt-3 mb-12">
        Live decentralized verification network powered by AI consensus models.
      </p>

      <div className="relative h-[600px] overflow-hidden rounded-3xl border border-cyan-500/10 bg-gradient-to-br from-[#02040a] via-[#041224] to-[#010206] shadow-2xl">
        
        {/* RADIAL RADAR OVERLAYS */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* ORBITAL TELEMETRY GRAPHICS */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/5 pointer-events-none" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/5 pointer-events-none" />

        {/* ⚡ FIXED: REACTIVE GRAPH NODE CONNECTOR WEB */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node, index) => {
            if (index === nodes.length - 1) return null;
            const nextNode = nodes[index + 1];
            return (
              <line
                key={`line-${node.id}`}
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke={node.threat || nextNode.threat ? "#f87171" : "#22d3ee"}
                strokeWidth="1"
                className="opacity-20 transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* DATA NODES MAPPING VIEW */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: node.x, top: node.y }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" }}
          >
            {/* NODE STATUS DOT ELEMENT */}
            <div
              className={`rounded-full border border-black/80 transition-all duration-300 ${
                node.threat
                  ? "bg-red-500 shadow-[0_0_25px_rgba(239,68,68,0.7)]"
                  : "bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              }`}
              style={{ width: sizeMap[node.size], height: sizeMap[node.size] }}
            />

            {/* PULSE EXPANSION OVERLAY RING */}
            <motion.div
              className={`absolute inset-0 rounded-full border ${node.threat ? "border-red-400" : "border-cyan-400"}`}
              animate={{ scale: [1, 2.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.15 }}
            />

            {/* NODE TITLE STRING MARKER */}
            <p className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-widest text-cyan-200/70">
              {node.label}
            </p>
            
            {/* INLINE CONTEXT THREAT FLAG ALERTS */}
            {node.threat && (
              <div className="absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap rounded border border-red-500/20 bg-red-950/40 px-2 py-0.5 text-[8px] font-black tracking-widest text-red-400 animate-pulse">
                BREACH ATTEMPT
              </div>
            )}
          </motion.div>
        ))}

        {/* ⚡ FIXED: TELEMETRY STREAM PACKETS SYNCHRONIZED DIRECTLY TO NODE TOPOLOGY */}
        {[
          { pathX: ["12%", "24%", "36%", "68%", "88%"], pathY: ["68%", "28%", "52%", "44%", "62%"], color: "bg-white shadow-[0_0_15px_#fff]", speed: 6 },
          { pathX: ["24%", "36%", "56%", "68%", "80%"], pathY: ["28%", "52%", "76%", "44%", "20%"], color: "bg-cyan-400 shadow-[0_0_15px_#22d3ee]", speed: 7 },
          { pathX: ["88%", "80%", "68%", "48%", "12%"], pathY: ["62%", "20%", "44%", "24%", "68%"], color: "bg-red-400 shadow-[0_0_15px_#f87171]", speed: 5 }
        ].map((packet, pIdx) => (
          <motion.div
            key={`packet-${pIdx}`}
            className={`absolute w-2.5 h-2.5 rounded-full z-20 ${packet.color}`}
            animate={{ left: packet.pathX, top: packet.pathY }}
            transition={{ duration: packet.speed, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* MEMOIZED PERFORMANCE-STABLE BACKGROUND CORE MATRIX HUD STRINGS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 font-mono">
          {staticDataLines.map((line) => (
            <motion.div
              key={line.id}
              className="absolute text-[9px] text-cyan-400 whitespace-nowrap font-bold"
              style={{ top: line.y }}
              initial={{ x: -150 }}
              animate={{ x: window.innerWidth + 150 }}
              transition={{ duration: line.duration, repeat: Infinity, delay: line.delay, ease: "linear" }}
            >
              {line.text}
            </motion.div>
          ))}
        </div>

        {/* FLOATING STATUS HUD INTERFACES */}
        <div className="absolute top-6 left-6 bg-black/60 border border-cyan-500/10 rounded-xl px-4 py-3 backdrop-blur-md">
          <p className="text-cyan-400 text-xs font-black tracking-widest">NETWORK TOPOLOGY ONLINE</p>
          <p className="text-gray-500 text-[10px] mt-0.5">8 Active Consensus Instances</p>
        </div>

        <div className="absolute bottom-6 right-6 bg-black/60 border border-red-500/10 rounded-xl px-4 py-3 backdrop-blur-md">
          <p className="text-red-400 text-xs font-black tracking-widest">INTEGRITY MITIGATION ACTIVE</p>
          <p className="text-gray-500 text-[10px] mt-0.5">Isolating anomaly vectors on Node B</p>
        </div>

      </div>
    </div>
  );
}
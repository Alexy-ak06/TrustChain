
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { speakTrustChain } from "./AIVoiceAssistant";

export default function GlobalNodeIntelligence() {
  const containerRef = useRef(null);

  const [nodes, setNodes] = useState([
    { id: "usa", x: 18, y: 45, label: "USA", type: "validator" },
    { id: "eu", x: 38, y: 30, label: "EU", type: "sync" },
    { id: "india", x: 53, y: 58, label: "INDIA", type: "core" },
    { id: "asia", x: 72, y: 36, label: "ASIA", type: "validator" },
    { id: "retail", x: 84, y: 65, label: "RETAIL", type: "alert" },
  ]);

  const connections = [
    { from: "usa", to: "eu" },
    { from: "eu", to: "india" },
    { from: "india", to: "asia" },
    { from: "asia", to: "retail" },
    { from: "usa", to: "india" },
  ];

  useEffect(() => {
    const systemsTimer = setTimeout(() => {
      if (typeof speakTrustChain === "function") {
        speakTrustChain("Node intelligence grid operational. Real-time data routing vectors mapped successfully.");
      }
    }, 1000);

    return () => clearTimeout(systemsTimer);
  }, []);

  const handleNodeDrag = (id, event, info) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const newX = Math.max(
      2,
      Math.min(98, ((info.point.x - rect.left) / rect.width) * 100)
    );

    const newY = Math.max(
      2,
      Math.min(98, ((info.point.y - rect.top) / rect.height) * 100)
    );

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? { ...node, x: newX, y: newY }
          : node
      )
    );
  };

  const handleDragEnd = (label) => {
    if (typeof speakTrustChain === "function") {
      speakTrustChain(
        `Re-routing optimization pathways through ${label} node.`
      );
    }
  };

  const findNode = (id) =>
    nodes.find((n) => n.id === id);

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 font-mono select-none">
      <h2 className="text-5xl md:text-6xl font-black text-center text-cyan-400 tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.15)]">
        GLOBAL NODE INTELLIGENCE GRID
      </h2>

      <p className="text-center text-gray-400 text-sm md:text-base mb-12 max-w-2xl mx-auto">
        Live cross-border blockchain orchestration loop with drag-and-drop structural data path re-routing.
      </p>

      <div
        ref={containerRef}
        className="relative h-[650px] overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#01040f] via-[#041122] to-black shadow-[0_0_80px_rgba(34,211,238,0.15)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06),transparent_50%)] pointer-events-none" />

        <div
          className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/5 animate-spin pointer-events-none"
          style={{ animationDuration: "40s" }}
        />

        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/5 animate-spin pointer-events-none"
          style={{
            animationDuration: "60s",
            animationDirection: "reverse",
          }}
        />

        <svg className="absolute inset-0 h-full w-full pointer-events-none z-10">
          {connections.map((conn, index) => {
            const start = findNode(conn.from);
            const end = findNode(conn.to);

            if (!start || !end) return null;

            return (
              <motion.line
                key={`line-${index}`}
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke={
                  start.type === "alert" || end.type === "alert"
                    ? "#ef4444"
                    : "#22d3ee"
                }
                strokeWidth="1.5"
                strokeOpacity="0.4"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {connections.map((conn, index) => {
          const start = findNode(conn.from);
          const end = findNode(conn.to);

          if (!start || !end) return null;

          const isAlertPath =
            start.type === "alert" ||
            end.type === "alert";

          return (
            <motion.div
              key={`packet-${index}`}
              className={`absolute h-2 w-2 rounded-full pointer-events-none z-20 ${
                isAlertPath
                  ? "bg-red-400 shadow-[0_0_12px_#f87171]"
                  : "bg-cyan-300 shadow-[0_0_12px_#22d3ee]"
              }`}
              animate={{
                left: [`${start.x}%`, `${end.x}%`],
                top: [`${start.y}%`, `${end.y}%`],
                opacity: [0, 1, 0],
                scale: [0.7, 1.3, 0.7],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: index * 0.4,
                ease: "linear",
              }}
            />
          );
        })}

        {nodes.map((node, index) => {
          const isAlert = node.type === "alert";
          const isCore = node.type === "core";

          return (
            <motion.div
              key={node.id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.05}
              dragMomentum={false}
              onDrag={(e, info) =>
                handleNodeDrag(node.id, e, info)
              }
              onDragEnd={() =>
                handleDragEnd(node.label)
              }
              whileDrag={{
                scale: 1.12,
                cursor: "grabbing",
              }}
              className="absolute z-30 cursor-grab active:cursor-grabbing group select-none"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`h-6 w-6 rounded-full border border-white/20 transition-all duration-200 ${
                    isAlert
                      ? "bg-red-500 shadow-[0_0_25px_#ef4444]"
                      : isCore
                      ? "bg-purple-500 shadow-[0_0_25px_#a855f7]"
                      : "bg-cyan-400 shadow-[0_0_25px_#06b6d4]"
                  }`}
                />

                <motion.div
                  className={`absolute inset-0 rounded-full border ${
                    isAlert
                      ? "border-red-400"
                      : isCore
                      ? "border-purple-400"
                      : "border-cyan-400"
                  }`}
                  animate={{
                    scale: [1, 2.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />

                <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/80 border border-cyan-500/10 rounded-xl px-3 py-2 backdrop-blur-md min-w-[130px] shadow-2xl opacity-80 group-hover:opacity-100 group-hover:border-cyan-400/40 transition-all duration-150">
                  <p className="text-[10px] font-black text-cyan-300 tracking-wider">
                    {node.label} MONITOR
                  </p>

                  <p className="text-[8px] text-gray-400 uppercase tracking-widest mt-0.5">
                    {node.type} node
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        <div className="absolute left-6 top-6 rounded-xl border border-cyan-500/10 bg-black/60 px-4 py-3 backdrop-blur-md pointer-events-none z-40">
          <p className="text-xs font-black tracking-widest text-cyan-400 uppercase">
            GLOBAL SYNC ACTIVE
          </p>

          <p className="mt-0.5 text-[10px] text-gray-400">
            5 Regions Connected • Continuous Stream
          </p>
        </div>

        <div className="absolute bottom-6 right-6 rounded-xl border border-emerald-500/10 bg-black/60 px-4 py-3 backdrop-blur-md pointer-events-none z-40">
          <p className="text-xs font-black tracking-widest text-emerald-400 uppercase">
            LEDGER CONSENSUS VERIFIED
          </p>

          <p className="mt-0.5 text-[10px] text-gray-400">
            Cross-Border Encryption Parameters Intact
          </p>
        </div>
      </div>
    </div>
  );
}


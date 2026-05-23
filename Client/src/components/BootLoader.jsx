import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { speakTrustChain } from "./AIVoiceAssistant";

export default function BootLoader() {
  const [visible, setVisible] = useState(true);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const bootLines = [
    "Initializing TrustChain Core OS...",
    "Establishing peer-to-peer cryptographic nodes...",
    "Securing local memory blocks via quantum vault...",
    "Hydrating neural fraud vectors...",
    "Mounting 3D Blockchain Core matrix...",
    "TrustChain Intelligence Kernel Online.",
  ];

  
  useEffect(() => {
    if (!visible) return;

    if (currentLineIndex >= bootLines.length) {
      const autoExitTimer = setTimeout(() => {
        setVisible(false);
      }, 800); 
      return () => clearTimeout(autoExitTimer);
    }

    const lineDuration = currentLineIndex === bootLines.length - 1 ? 1000 : 500;
    const timer = setTimeout(() => {
      setCurrentLineIndex((prev) => prev + 1);
    }, lineDuration);

    return () => clearTimeout(timer);
  }, [currentLineIndex, visible, bootLines.length]);

  
  useEffect(() => {
    document.body.style.overflow = "hidden"; 
    
    
    const isFirstTime = !localStorage.getItem("trustchain_initialized");
    
    let speechPayload = "";
    if (isFirstTime) {
      speechPayload = " Tactical Grid operational. Cryptographic perimeter secure. New administrator profile detected. System authorization granted.";
      localStorage.setItem("trustchain_initialized", "true"); 
    } else {
      speechPayload = "Tactical Grid operational. Cryptographic perimeter secure. Welcome back, Administrator.";
    }

   
    const soundTimer = setTimeout(() => {
      if (typeof speakTrustChain === "function") {
        speakTrustChain(speechPayload);
      }
    }, 2200);

    return () => {
      clearTimeout(soundTimer);
    };
  }, []);

  const handleBypass = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = ""; }}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(15px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black font-mono select-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_50%)]" />

         
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative w-[90%] max-w-2xl rounded-2xl border border-cyan-500/20 bg-black/80 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(34,211,238,0.15)]">
            
           
            <div className="flex flex-col items-center border-b border-cyan-500/10 pb-4">
              <motion.h1 
                animate={{ textShadow: ["0 0 10px rgba(34,211,238,0.2)", "0 0 25px rgba(34,211,238,0.5)", "0 0 10px rgba(34,211,238,0.2)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl font-black text-cyan-400 tracking-wider"
              >
                TRUSTCHAIN
              </motion.h1>
              <p className="mt-1 text-[10px] tracking-[0.4em] text-cyan-500/60 uppercase">
                AI Cryptographic Security OS
              </p>
            </div>

        
            <div className="mt-6 h-48 space-y-2.5 overflow-hidden text-xs md:text-sm">
              <AnimatePresence>
                {bootLines.slice(0, currentLineIndex + 1).map((line, index) => {
                  const isLast = index === bootLines.length - 1;
                  const isPrinted = currentLineIndex > index || currentLineIndex === bootLines.length;
                  
                  if (!isPrinted && index === currentLineIndex) return null;

                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={isLast ? "text-purple-400 font-bold" : "text-cyan-200/80"}
                    >
                      <span className={isLast ? "text-purple-500" : "text-cyan-500 animate-pulse"}>
                        {isLast ? "●" : "›"}
                      </span>{" "}
                      {line}
                    </motion.p>
                  );
                })}
              </AnimatePresence>
            </div>

           
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-[10px] text-cyan-500/50 uppercase tracking-widest">
                <span>System Compilation Matrix</span>
                <span>{Math.min(Math.round((currentLineIndex / bootLines.length) * 100), 100)}%</span>
              </div>
              <div className="h-1.5 w-100 rounded-full bg-cyan-950/60 border border-cyan-500/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_12px_#22d3ee]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min((currentLineIndex / bootLines.length) * 100, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleBypass}
                className="group flex items-center gap-1.5 rounded-lg border border-cyan-500/10 bg-cyan-950/10 px-3 py-1.5 text-[10px] font-bold text-cyan-500/40 tracking-widest uppercase hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition duration-150"
              >
                Skip System Check 
                <span className="group-hover:translate-x-0.5 transition-transform duration-150">»</span>
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
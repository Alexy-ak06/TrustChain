
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * GLOBAL VOICE EVENT DISPATCHER
 */
const dispatchVoiceState = (isSpeaking) => {
  const event = new CustomEvent("trustchain_voice_state", {
    detail: { isSpeaking },
  });

  window.dispatchEvent(event);
};

/**
 * GLOBAL SPEECH LOCK
 * Prevents overlapping AI voice streams
 */
let voiceBusy = false;

/**
 * TRUSTCHAIN SPEECH ENGINE
 */
export function speakTrustChain(message, onStartCallback = null) {
  if (!window.speechSynthesis) return;

  // Prevent repeated/overlapping voice calls
  if (voiceBusy) return;

  voiceBusy = true;

  // Convert decimals safely for speech engine
  const sanitizedMessage = message.replace(
    /(\d+)\.(\d+)/g,
    "$1 point $2"
  );

  const utterance = new SpeechSynthesisUtterance(sanitizedMessage);

  const availableVoices = window.speechSynthesis.getVoices();

  /**
   * CYBERNETIC MALE VOICE PRIORITY
   */
  const targetVoice =
    availableVoices.find((v) => v.name.includes("David")) ||
    availableVoices.find((v) => v.name.includes("Male")) ||
    availableVoices.find(
      (v) =>
        v.name.includes("Great Britain") ||
        v.name.includes("UK")
    ) ||
    availableVoices.find((v) => v.lang.startsWith("en"));

  if (targetVoice) {
    utterance.voice = targetVoice;
  }

  /**
   * SYNTHETIC VOICE SETTINGS
   */
  utterance.rate = 1.0;
  utterance.pitch = 0.65;
  utterance.volume = 1;

  /**
   * SPEECH START
   */
  utterance.onstart = () => {
    dispatchVoiceState(true);

    if (onStartCallback) {
      onStartCallback();
    }
  };

  /**
   * SPEECH END
   */
  utterance.onend = () => {
    dispatchVoiceState(false);

    setTimeout(() => {
      voiceBusy = false;
    }, 500);
  };

  /**
   * SPEECH ERROR
   */
  utterance.onerror = () => {
    dispatchVoiceState(false);
    voiceBusy = false;
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * MAIN AI HUD COMPONENT
 */
export default function AIVoiceAssistant() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [systemActive, setSystemActive] = useState(false);

  /**
   * GLOBAL VOICE EVENT LISTENER
   */
  useEffect(() => {
    const handleGlobalVoiceChange = (e) => {
      setIsSpeaking(e.detail.isSpeaking);

      if (e.detail.isSpeaking) {
        setSystemActive(true);
      }
    };

    window.addEventListener(
      "trustchain_voice_state",
      handleGlobalVoiceChange
    );

    return () => {
      window.removeEventListener(
        "trustchain_voice_state",
        handleGlobalVoiceChange
      );
    };
  }, []);

  /**
   * MANUAL ACTIVATION
   */
  const handleActivationClick = () => {
    setSystemActive(true);

    speakTrustChain(
      "TrustChain artificial intelligence kernel loaded. Real-time network integrity monitoring is now active."
    );
  };

  return (
    <div className="fixed left-6 bottom-6 z-[999] flex items-center gap-4 font-mono">
      {/* MAIN BUTTON */}
      <motion.button
        onClick={handleActivationClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-3 px-5 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
          systemActive
            ? "bg-black text-cyan-400 border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            : "bg-cyan-400 text-black border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_45px_rgba(34,211,238,0.6)]"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            systemActive
              ? "bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"
              : "bg-black"
          }`}
        />

        {systemActive
          ? "AI Mainframe Online"
          : "Activate AI Voice"}
      </motion.button>

      {/* VOICE EQUALIZER */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            className="flex items-center gap-1 h-8 px-4 bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-md rounded-xl"
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scaleY: [1, 2.5, 0.8, 2.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeInOut",
                }}
                className="w-0.5 h-3 bg-cyan-400 origin-center rounded-full shadow-[0_0_4px_rgba(34,211,238,0.5)]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

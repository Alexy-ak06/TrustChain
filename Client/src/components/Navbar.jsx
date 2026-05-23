
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { speakTrustChain } from "./AIVoiceAssistant";

export default function Navbar({
  setShowScanner,
  setShowAdmin,
  adminToken,
  handleLogout,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    "Network",
    "Mining",
    "Threats",
    "Command",
    "Vault",
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(
      id.toLowerCase()
    );

    setMobileMenuOpen(false);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });

      if (
        typeof speakTrustChain ===
        "function"
      ) {
        speakTrustChain(
          `Navigating terminal mainframe focus grid to ${id} node data.`
        );
      }
    }
  };

  const triggerSystemAction = (
    actionType,
    toggleFn
  ) => {
    toggleFn((prev) => !prev);

    setMobileMenuOpen(false);

    if (
      typeof speakTrustChain ===
      "function"
    ) {
      speakTrustChain(
        `Initializing cryptographic terminal subsystem interface: ${actionType}.`
      );
    }

    setTimeout(() => {
      document
        .getElementById("verify")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 120);
  };

  const processedLogout = () => {
    if (
      typeof speakTrustChain ===
      "function"
    ) {
      speakTrustChain(
        "Administrator session ended. Clearing secure token keys from temporary storage."
      );
    }

    handleLogout();

    setMobileMenuOpen(false);
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[99999] w-[92%] max-w-7xl font-mono select-none"
    >
      <div className="backdrop-blur-xl bg-black/50 border border-cyan-500/10 rounded-2xl px-6 py-4 flex items-center justify-between shadow-[0_0_50px_rgba(34,211,238,0.04)]">
        <motion.h1
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-xl md:text-2xl font-black tracking-[0.2em] cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });

            if (
              typeof speakTrustChain ===
              "function"
            ) {
              speakTrustChain(
                "Returning console viewport index to primary anchor zero coordinates."
              );
            }
          }}
        >
          <span className="text-white">
            TRUST
          </span>

          <span className="text-cyan-400">
            CHAIN
          </span>
        </motion.h1>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-widest">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() =>
                scrollToSection(item)
              }
              className="text-gray-400 hover:text-cyan-400 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              {item}
            </button>
          ))}

          <button
            onClick={() =>
              triggerSystemAction(
                "QR Matrix Scanner",
                setShowScanner
              )
            }
            className="text-gray-400 hover:text-cyan-400 transition-all duration-200 cursor-pointer"
          >
            Scan QR
          </button>

          <button
            onClick={() =>
              triggerSystemAction(
                "Administrative Entryway Node",
                setShowAdmin
              )
            }
            className="text-gray-400 hover:text-cyan-400 transition-all duration-200 cursor-pointer"
          >
            Admin
          </button>

          {adminToken && (
            <button
              onClick={processedLogout}
              className="text-red-400 hover:text-red-300 border border-red-500/10 bg-red-950/10 rounded-lg px-3 py-1 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-2.5 bg-cyan-950/20 border border-cyan-400/20 rounded-full px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />

          <p className="text-cyan-400 text-[10px] font-black tracking-widest">
            GRID RUNNING
          </p>
        </div>

        <div className="flex md:hidden items-center">
          <button
            onClick={() =>
              setMobileMenuOpen(
                (prev) => !prev
              )
            }
            className="text-gray-400 hover:text-cyan-400 active:scale-90 transition-all duration-200 p-1 cursor-pointer"
            aria-label="Toggle Navigation Terminal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.25,
            }}
            className="absolute top-[105%] left-0 right-0 bg-black/95 border border-cyan-500/10 rounded-2xl p-5 backdrop-blur-xl shadow-2xl md:hidden flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-left"
          >
            {navItems.map((item) => (
              <button
                key={`mobile-${item}`}
                onClick={() =>
                  scrollToSection(item)
                }
                className="w-full text-gray-400 hover:text-cyan-400 py-2 border-b border-white/5 transition-colors text-left"
              >
                {item}
              </button>
            ))}

            <button
              onClick={() =>
                triggerSystemAction(
                  "QR Matrix Scanner",
                  setShowScanner
                )
              }
              className="w-full text-gray-400 hover:text-cyan-400 py-2 border-b border-white/5 transition-colors text-left"
            >
              Scan QR Telemetry
            </button>

            <button
              onClick={() =>
                triggerSystemAction(
                  "Administrative Entryway Node",
                  setShowAdmin
                )
              }
              className="w-full text-gray-400 hover:text-cyan-400 py-2 border-b border-white/5 transition-colors text-left"
            >
              Admin Override
            </button>

            {adminToken && (
              <button
                onClick={processedLogout}
                className="w-full text-red-400 border border-red-500/10 bg-red-950/10 rounded-xl p-3 text-center transition-colors mt-2"
              >
                Terminate Session Token
                (Logout)
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


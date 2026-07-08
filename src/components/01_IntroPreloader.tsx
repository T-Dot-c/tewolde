import { motion, AnimatePresence } from "framer-motion";

interface IntroPreloaderProps {
  showIntro: boolean;
  introStep: number;
}

export default function IntroPreloader({ showIntro, introStep }: IntroPreloaderProps) {
  return (
    <AnimatePresence mode="wait">
      {showIntro && (
        <motion.div
          key="intro-curtain"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 bg-[#050507] z-50 flex flex-col items-center justify-center text-white"
        >
          <div className="text-center space-y-6 max-w-md px-6">
            <div className="h-14 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {introStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 font-semibold"
                  >
                    01 / SYSTEM DESIGN
                  </motion.div>
                )}
                {introStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 font-semibold"
                  >
                    02 / SECURE ARCHITECTURE
                  </motion.div>
                )}
                {introStep >= 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-1"
                  >
                    <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
                      Tewolde.
                    </h2>
                    <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                      SYSTEMS & DESIGN
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Minimalist progress bar */}
            <div className="w-48 h-[1px] bg-zinc-800 mx-auto overflow-hidden rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="h-full bg-white"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

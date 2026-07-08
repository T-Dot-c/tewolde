import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  text: string;
  type: "success" | "info";
}

interface ToastProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export default function Toast({ toasts, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-start gap-3 glass-card border border-zinc-200 shadow-lg rounded-xl p-4"
          >
            <div className="shrink-0">
              {toast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-black" />
              ) : (
                <Info className="w-5 h-5 text-zinc-500" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-body-md text-sm text-[#050507] font-medium leading-tight">
                {toast.text}
              </p>
            </div>
            <button
              onClick={() => onClose(toast.id)}
              className="text-zinc-500 hover:text-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

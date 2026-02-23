"use client";

import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/lib/constants";

interface LoadingScreenProps {
  onFirstInteraction?: () => void;
}

export const LoadingScreen = ({ onFirstInteraction }: LoadingScreenProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onFirstInteraction}
      onKeyDown={(e) => e.key === "Enter" && onFirstInteraction?.()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 cursor-pointer"
      aria-label="Tap to continue"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-champagne-500/20 blur-2xl" />
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="h-24 w-24 rounded-full border-4 border-champagne-500/30 border-t-champagne-400"
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-calligraphy text-4xl text-champagne-300"
        >
          {WEDDING_CONFIG.coupleNames.firstName[0]}
          <span className="mx-2 text-champagne-500/50">&</span>
          {WEDDING_CONFIG.coupleNames.secondName[0]}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 font-serif text-sm text-champagne-400/70"
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
};


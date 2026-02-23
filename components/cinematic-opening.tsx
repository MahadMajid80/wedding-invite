"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CinematicOpeningProps {
  onOpenInvitation: () => void;
}

export const CinematicOpening = ({ onOpenInvitation }: CinematicOpeningProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    const steps = [
      { delay: 1000, step: 1 },
      { delay: 3000, step: 2 },
      { delay: 5000, step: 3 },
    ];

    steps.forEach(({ delay, step }) => {
      const timer = setTimeout(() => {
        setCurrentStep(step);
      }, delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleOpenInvitation = () => {
    console.log("Opening invitation...");
    setIsOpening(true);
    setTimeout(() => {
      onOpenInvitation();
    }, 1600);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <div className="absolute inset-0 paper-texture opacity-10 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isOpening ? (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center px-6 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.6, 
                duration: 1.4, 
                ease: [0.16, 1, 0.3, 1]
              }}
              className="mb-12"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 animate-pulse-glow rounded-full bg-champagne-500/30 blur-3xl" />
                <div className="relative w-32 h-32 mx-auto rounded-full border-4 border-champagne-400/50 bg-gradient-to-br from-champagne-500/20 to-champagne-600/20 flex items-center justify-center luxury-shadow">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="text-6xl font-calligraphy text-champagne-300"
                  >
                    ✉
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {currentStep >= 1 && (
                <motion.p
                  key="step1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-serif text-xl md:text-2xl text-champagne-200 mb-8"
                >
                  Together with their families...
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {currentStep >= 2 && (
                <motion.p
                  key="step2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="font-serif text-xl md:text-2xl text-champagne-200 mb-12"
                >
                  We invite you to celebrate the union of...
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {currentStep >= 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-12 relative z-20"
                >
                  <h1 className="font-calligraphy text-5xl md:text-7xl lg:text-8xl text-gradient mb-8">
                    {WEDDING_CONFIG.coupleNames.firstName}
                    <span className="mx-4 text-champagne-500/50">&</span>
                    {WEDDING_CONFIG.coupleNames.secondName}
                  </h1>

                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleOpenInvitation();
                    }}
                    type="button"
                    className={cn(
                      "group relative px-16 py-5 rounded-full",
                      "font-serif text-lg font-medium tracking-wide",
                      "bg-gradient-to-r from-champagne-400/90 via-champagne-500/95 to-champagne-400/90",
                      "backdrop-blur-sm",
                      "text-navy-900",
                      "border border-champagne-300/60",
                      "shadow-[0_8px_32px_rgba(236,168,67,0.25),0_0_0_1px_rgba(236,168,67,0.1)_inset]",
                      "hover:shadow-[0_12px_40px_rgba(236,168,67,0.35),0_0_0_1px_rgba(236,168,67,0.2)_inset]",
                      "hover:border-champagne-200/80",
                      "hover:scale-[1.02]",
                      "active:scale-[0.98]",
                      "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "cursor-pointer relative z-30",
                      "overflow-hidden"
                    )}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    
                    {/* Content */}
                    <span className="relative flex items-center gap-3">
                      <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                      <span className="font-calligraphy">Open The Invitation</span>
                      <Sparkles className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                    </span>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-champagne-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="unfolding"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.div 
              className="font-calligraphy text-4xl text-champagne-300"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Opening...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none" />
    </div>
  );
};


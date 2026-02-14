"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CinematicOpeningProps {
  onOpenInvitation: () => void;
}

export const CinematicOpening = ({ onOpenInvitation }: CinematicOpeningProps) => {
  const [isMuted, setIsMuted] = useState(false);
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
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <div className="absolute inset-0 paper-texture opacity-10 pointer-events-none" />
      
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-8 right-8 z-50 p-3 rounded-full bg-champagne-500/10 backdrop-blur-sm border border-champagne-500/20 hover:bg-champagne-500/20 transition-all duration-300"
        aria-label="Toggle music"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-champagne-300" />
        ) : (
          <Volume2 className="w-5 h-5 text-champagne-300" />
        )}
      </button>

      <AnimatePresence mode="wait">
        {!isOpening ? (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="text-center px-6 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="mb-12"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 animate-pulse-glow rounded-full bg-champagne-500/30 blur-3xl" />
                <div className="relative w-32 h-32 mx-auto rounded-full border-4 border-champagne-400/50 bg-gradient-to-br from-champagne-500/20 to-champagne-600/20 flex items-center justify-center luxury-shadow">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1, type: "spring" }}
                  className="mb-12 relative z-20"
                >
                  <h1 className="font-calligraphy text-5xl md:text-7xl lg:text-8xl text-gradient mb-8">
                    {WEDDING_CONFIG.coupleNames.firstName}
                    <span className="mx-4 text-champagne-500/50">&</span>
                    {WEDDING_CONFIG.coupleNames.secondName}
                  </h1>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleOpenInvitation();
                    }}
                    type="button"
                    className={cn(
                      "px-12 py-4 rounded-lg font-serif text-lg",
                      "bg-gradient-to-r from-champagne-500 to-champagne-600",
                      "text-navy-900 font-semibold",
                      "elegant-shadow hover:scale-105",
                      "transition-all duration-300",
                      "border-2 border-champagne-400/50",
                      "hover:border-champagne-300",
                      "cursor-pointer relative z-30",
                      "active:scale-95"
                    )}
                  >
                    Open The Invitation
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="unfolding"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center"
          >
            <div className="font-calligraphy text-4xl text-champagne-300 animate-pulse">
              Opening...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none" />
    </div>
  );
};


"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";
import { CountdownTimer } from "./countdown-timer";
import { WEDDING_CONFIG } from "@/lib/constants";

export const GrandClosing = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-32 px-6 bg-transparent flex items-center justify-center"
    >
      <div className="absolute inset-0 paper-texture opacity-5" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={inView ? { opacity: [0.3, 0.6, 0.3], y: -100 } : {}}
            transition={{
              delay: i * 0.2,
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
            }}
          >
            <Sparkles className="w-4 h-4 text-champagne-400/50" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <h2 className="font-calligraphy text-5xl md:text-7xl text-gradient mb-6">
            We cannot wait to celebrate with you.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <CountdownTimer targetDate={WEDDING_CONFIG.weddingDate} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <button className="px-12 py-4 rounded-lg font-serif text-lg font-semibold bg-gradient-to-r from-champagne-500 to-champagne-600 text-navy-900 elegant-shadow hover:scale-105 transition-all duration-300 flex items-center gap-3 border-2 border-champagne-400/50 hover:border-champagne-300">
            <Calendar className="w-5 h-5" />
            Save The Date
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 font-calligraphy text-2xl text-champagne-300/70"
        >
          {WEDDING_CONFIG.coupleNames.firstName} & {WEDDING_CONFIG.coupleNames.secondName}
        </motion.div>
      </div>
    </section>
  );
};


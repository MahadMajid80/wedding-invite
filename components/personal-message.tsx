"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/constants";

const messageText = `Your presence means the world to us. As we embark on this beautiful journey together, we are filled with gratitude for the love and support that surrounds us. We cannot wait to share this special day with you and create memories that will last a lifetime.`;

export const PersonalMessage = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const words = messageText.split(" ");

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-32 px-6 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center"
    >
      <div className="absolute inset-0 paper-texture opacity-5" />
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <Heart className="w-16 h-16 text-champagne-400 mx-auto mb-6 animate-pulse-glow" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-navy-800/30 backdrop-blur-sm rounded-2xl p-12 md:p-16 luxury-shadow border border-champagne-500/20"
        >
          <h2 className="font-calligraphy text-4xl md:text-5xl text-champagne-300 mb-8">
            A Personal Message
          </h2>
          
          <div className="font-serif text-xl md:text-2xl text-champagne-200/90 leading-relaxed space-y-4">
            {inView &&
              words.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3,
                  }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: words.length * 0.05 + 0.5, duration: 0.8 }}
            className="mt-12 font-calligraphy text-3xl text-champagne-300"
          >
            With Love,
            <br />
            <span className="text-gradient">
              {WEDDING_CONFIG.coupleNames.firstName} & {WEDDING_CONFIG.coupleNames.secondName}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


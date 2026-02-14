"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/constants";

const storyChapters = [
  {
    title: "The First Chapter",
    text: "Our story began with a simple hello...",
    emoji: "✨",
  },
  {
    title: "Falling in Love",
    text: "What started as a conversation became forever.",
    emoji: "💕",
  },
  {
    title: "The Proposal",
    text: "With a promise of always...",
    emoji: "💍",
  },
  {
    title: "The Wedding Day",
    text: "And now, we invite you to witness our forever.",
    emoji: "👰‍♀️🤵",
  },
];

export const CoupleStory = () => {
  return (
    <section className="relative min-h-screen py-32 px-6 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900">
      <div className="absolute inset-0 paper-texture opacity-5" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-gradient mb-4">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto" />
        </motion.div>

        <div className="space-y-32">
          {storyChapters.map((chapter, index) => (
            <StoryChapter
              key={index}
              chapter={chapter}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StoryChapterProps {
  chapter: typeof storyChapters[0];
  index: number;
  isEven: boolean;
}

const StoryChapter = ({ chapter, index, isEven }: StoryChapterProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col md:flex-row items-center gap-12 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1 relative">
        <div className="relative h-96 rounded-2xl overflow-hidden luxury-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-champagne-500/20 via-emerald-500/20 to-blush-500/20 blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-navy-900/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-8xl opacity-30"
            >
              {chapter.emoji}
            </motion.div>
          </div>
        </div>
        
        {inView && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-4 -right-4"
          >
            <Sparkles className="w-8 h-8 text-champagne-400 animate-sparkle" />
          </motion.div>
        )}
      </div>

      <div className="flex-1 text-center md:text-left">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-serif text-3xl md:text-4xl text-champagne-300 mb-4"
        >
          {chapter.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="font-serif text-xl md:text-2xl text-champagne-200/80 leading-relaxed"
        >
          {chapter.text}
        </motion.p>
      </div>
    </motion.div>
  );
};


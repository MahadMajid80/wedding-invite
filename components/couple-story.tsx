"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { WEDDING_CONFIG } from "@/lib/constants";

const storyChapters = [
  {
    title: "Baat pakki",
    text: "Our story began with a simple hello...",
    emoji: "✨",
    image: "/Remove_the_rest_202602151607.jpeg",
  },
  {
    title: "Engagement",
    text: "What started as a conversation became forever.",
    emoji: "💕",
    image: "/Create_image_of_202602151547.jpeg",
  },
  {
    title: "The Wedding Day",
    text: "And now, we invite you to witness our forever.",
    emoji: "👰‍♀️🤵",
    image: "/Create_a_image_202602151544.jpeg",
  },
];

export const CoupleStory = () => {
  return (
    <section className="relative min-h-screen py-16 md:py-32 px-4 md:px-6 bg-transparent">
      <div className="absolute inset-0 paper-texture opacity-5" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-gradient mb-4">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto" />
        </motion.div>

        <div className="space-y-16 md:space-y-32">
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
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1 relative w-full">
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden luxury-shadow">
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-transparent" />
        </div>
        
        {inView && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-4 -right-4 z-10"
          >
            <Sparkles className="w-8 h-8 text-champagne-400 animate-sparkle" />
          </motion.div>
        )}
      </div>

      <div className="flex-1 text-center md:text-left">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-serif text-2xl md:text-3xl lg:text-4xl text-champagne-300 mb-4"
        >
          {chapter.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-serif text-lg md:text-xl lg:text-2xl text-champagne-200/80 leading-relaxed"
        >
          {chapter.text}
        </motion.p>
      </div>
    </motion.div>
  );
};


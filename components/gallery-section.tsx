"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const galleryImages = [
  {
    id: 1,
    src: "/Remove_the_rest_202602151607.jpeg",
    alt: "Desi couple pre-wedding moment",
    caption: "Our first photo together",
  },
  {
    id: 2,
    src: "/Create_image_of_202602151547.jpeg",
    alt: "Desi couple engagement",
    caption: "Sunset engagement",
  },
  {
    id: 3,
    src: "/Create_a_image_202602151544.jpeg",
    alt: "Desi couple celebrating",
    caption: "Celebrating love",
  },
  {
    id: 4,
    src: "/Create_some_dancing_202602151614.jpeg",
    alt: "Desi couple dancing",
    caption: "Dancing together",
  },
];

export const GallerySection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-32 px-6 bg-transparent"
    >
      <div className="absolute inset-0 paper-texture opacity-5" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-gradient mb-4">
            Pre-Wedding Moments
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedImage(index)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group luxury-shadow border border-champagne-500/20"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-champagne-100 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <p className="font-serif text-sm">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={cn(
              "px-6 py-3 rounded-lg font-serif",
              "bg-navy-800/50 backdrop-blur-sm border border-champagne-500/20",
              "text-champagne-300 hover:bg-champagne-500/10",
              "transition-all flex items-center gap-2"
            )}
          >
            {isAutoplay ? (
              <>
                <Pause className="w-4 h-4" />
                Pause Slideshow
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play Slideshow
              </>
            )}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox
            images={galleryImages}
            initialIndex={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

interface LightboxProps {
  images: typeof galleryImages;
  initialIndex: number;
  onClose: () => void;
}

const Lightbox = ({ images, initialIndex, onClose }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-navy-900/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-navy-800/50 text-champagne-300 hover:bg-navy-700 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative aspect-video rounded-xl overflow-hidden luxury-shadow">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-navy-900/90 to-transparent">
            <p className="font-serif text-xl text-champagne-100">
              {images[currentIndex].caption}
            </p>
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-navy-800/50 backdrop-blur-sm text-champagne-300 hover:bg-navy-700 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-navy-800/50 backdrop-blur-sm text-champagne-300 hover:bg-navy-700 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </motion.div>
    </motion.div>
  );
};


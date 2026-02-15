"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, Sparkles } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/constants";
import { format } from "date-fns";
import { CountdownTimer } from "./countdown-timer";
import { VenueMap } from "./venue-map";

export const WeddingDetails = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-32 px-6 bg-transparent"
    >
      <div className="absolute inset-0 paper-texture opacity-5" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-gradient mb-4">
            Wedding Details
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <CountdownTimer targetDate={WEDDING_CONFIG.weddingDate} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-navy-800/50 backdrop-blur-sm rounded-2xl p-8 luxury-shadow border border-champagne-500/20 mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-blush-500/20">
              <Users className="w-6 h-6 text-blush-400" />
            </div>
            <h3 className="font-serif text-2xl text-champagne-300">Dress Code</h3>
          </div>
          <p className="font-serif text-xl text-champagne-200">
            {WEDDING_CONFIG.dressCode}
          </p>
        </motion.div>

        <div className="space-y-24">
          {WEDDING_CONFIG.events.map((event, index) => (
            <EventSection
              key={index}
              event={event}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface EventSectionProps {
  event: {
    name: string;
    date: Date;
    time: string;
    description: string;
    venue: {
      name: string;
      address: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  };
  index: number;
  inView: boolean;
}

const EventSection = ({ event, index, inView }: EventSectionProps) => {
  const { ref } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const getEventColor = (eventName: string) => {
    if (eventName.toLowerCase().includes("baraat")) {
      return {
        bg: "bg-champagne-500/20",
        icon: "text-champagne-400",
        border: "border-champagne-500/30",
        accent: "champagne",
      };
    }
    if (eventName.toLowerCase().includes("nikah")) {
      return {
        bg: "bg-emerald-500/20",
        icon: "text-emerald-400",
        border: "border-emerald-500/30",
        accent: "emerald",
      };
    }
    return {
      bg: "bg-blush-500/20",
      icon: "text-blush-400",
      border: "border-blush-500/30",
      accent: "blush",
    };
  };

  const colors = getEventColor(event.name);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
      className="relative"
    >
      <div className="absolute -top-12 left-1/2 -translate-x-1/2">
        <Sparkles className={`w-8 h-8 ${colors.icon} animate-sparkle`} />
      </div>

      <div
        className={`bg-navy-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 luxury-shadow border-2 ${colors.border}`}
      >
        <div className="text-center mb-8">
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
            className="font-calligraphy text-4xl md:text-5xl text-gradient mb-4"
          >
            {event.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
            className="font-serif text-lg text-champagne-200/80"
          >
            {event.description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
            className="bg-navy-900/50 rounded-xl p-6 border border-champagne-500/10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${colors.bg}`}>
                <Calendar className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <h4 className="font-serif text-xl text-champagne-300">Date</h4>
            </div>
            <p className="font-serif text-lg text-champagne-200 mb-2">
              {format(event.date, "EEEE, MMMM d, yyyy")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
            className="bg-navy-900/50 rounded-xl p-6 border border-champagne-500/10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${colors.bg}`}>
                <Clock className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <h4 className="font-serif text-xl text-champagne-300">Time</h4>
            </div>
            <p className="font-serif text-lg text-champagne-200">
              {event.time}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
          className="bg-navy-900/50 rounded-xl p-6 border border-champagne-500/10 mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-full ${colors.bg}`}>
              <MapPin className={`w-5 h-5 ${colors.icon}`} />
            </div>
            <h4 className="font-serif text-xl text-champagne-300">Venue</h4>
          </div>
          <p className="font-serif text-lg text-champagne-200 mb-2">
            {event.venue.name}
          </p>
          <p className="text-champagne-300/70">{event.venue.address}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6 + index * 0.2, duration: 0.6 }}
        >
          <VenueMap
            lat={event.venue.coordinates.lat}
            lng={event.venue.coordinates.lng}
            venueName={event.venue.name}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

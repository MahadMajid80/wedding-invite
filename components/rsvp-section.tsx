"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Send } from "lucide-react";
import Confetti from "react-confetti";
import { cn } from "@/lib/utils";

interface RSVPFormData {
  name: string;
  guestCount: number;
  attendance: "accept" | "decline" | null;
  message: string;
}

export const RSVPSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    guestCount: 1,
    attendance: null,
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.attendance) {
      setIsSubmitted(true);
      if (formData.attendance === "accept") {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-32 px-6 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center"
    >
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 0}
          height={typeof window !== "undefined" ? window.innerHeight : 0}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="absolute inset-0 paper-texture opacity-5" />
      
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-gradient mb-4">
            RSVP
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto" />
          <p className="font-serif text-xl text-champagne-200/80 mt-6">
            Please let us know if you can join us
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="bg-navy-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 luxury-shadow border border-champagne-500/20"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block font-serif text-lg text-champagne-300 mb-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-navy-900/50 border border-champagne-500/30 text-champagne-100 focus:outline-none focus:border-champagne-400 focus:ring-2 focus:ring-champagne-500/20 transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block font-serif text-lg text-champagne-300 mb-3">
                    Number of Guests
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) =>
                      setFormData({ ...formData, guestCount: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-navy-900/50 border border-champagne-500/30 text-champagne-100 focus:outline-none focus:border-champagne-400 focus:ring-2 focus:ring-champagne-500/20 transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-serif text-lg text-champagne-300 mb-4">
                    Will you be attending?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, attendance: "accept" })
                      }
                      className={cn(
                        "p-6 rounded-xl border-2 transition-all",
                        "flex items-center justify-center gap-3",
                        formData.attendance === "accept"
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                          : "border-champagne-500/30 bg-navy-900/50 text-champagne-200 hover:border-champagne-400"
                      )}
                    >
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="font-serif text-lg">Joyfully Accept</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, attendance: "decline" })
                      }
                      className={cn(
                        "p-6 rounded-xl border-2 transition-all",
                        "flex items-center justify-center gap-3",
                        formData.attendance === "decline"
                          ? "border-blush-400 bg-blush-500/20 text-blush-300"
                          : "border-champagne-500/30 bg-navy-900/50 text-champagne-200 hover:border-champagne-400"
                      )}
                    >
                      <XCircle className="w-6 h-6" />
                      <span className="font-serif text-lg">Regretfully Decline</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-serif text-lg text-champagne-300 mb-3">
                    Special Message (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-navy-900/50 border border-champagne-500/30 text-champagne-100 focus:outline-none focus:border-champagne-400 focus:ring-2 focus:ring-champagne-500/20 transition-all resize-none"
                    placeholder="Share a message with us..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!formData.name || !formData.attendance}
                  className={cn(
                    "w-full py-4 rounded-lg font-serif text-lg font-semibold",
                    "bg-gradient-to-r from-champagne-500 to-champagne-600",
                    "text-navy-900 elegant-shadow",
                    "hover:scale-105 transition-all duration-300",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <Send className="w-5 h-5" />
                  Send RSVP
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="bg-navy-800/50 backdrop-blur-sm rounded-2xl p-12 luxury-shadow border border-champagne-500/20 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-6"
              >
                <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto" />
              </motion.div>
              <h3 className="font-serif text-3xl text-champagne-300 mb-4">
                Thank You!
              </h3>
              <p className="font-serif text-xl text-champagne-200/80">
                {formData.attendance === "accept"
                  ? "We're thrilled you'll be joining us!"
                  : "We're sorry you can't make it, but thank you for letting us know."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};


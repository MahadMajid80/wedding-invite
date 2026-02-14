"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordProtectionProps {
  onUnlock: () => void;
  password?: string;
}

export const PasswordProtection = ({
  onUnlock,
  password = "wedding2024",
}: PasswordProtectionProps) => {
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === password) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-navy-800/50 backdrop-blur-sm rounded-2xl p-12 luxury-shadow border border-champagne-500/20 max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block mb-4"
          >
            <Lock className="w-16 h-16 text-champagne-400" />
          </motion.div>
          <h2 className="font-serif text-3xl text-champagne-300 mb-2">
            Private Invitation
          </h2>
          <p className="text-champagne-200/70">
            Please enter the password to view the invitation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => {
              setInputPassword(e.target.value);
              setError(false);
            }}
            className={cn(
              "w-full px-4 py-3 rounded-lg bg-navy-900/50 border text-champagne-100",
              "focus:outline-none focus:ring-2 transition-all",
              error
                ? "border-blush-500 focus:border-blush-400 focus:ring-blush-500/20"
                : "border-champagne-500/30 focus:border-champagne-400 focus:ring-champagne-500/20"
            )}
            placeholder="Enter password"
            autoFocus
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-blush-400 text-sm text-center"
            >
              Incorrect password. Please try again.
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-serif text-lg font-semibold bg-gradient-to-r from-champagne-500 to-champagne-600 text-navy-900 elegant-shadow hover:scale-105 transition-all duration-300"
          >
            Unlock Invitation
          </button>
        </form>
      </motion.div>
    </div>
  );
};


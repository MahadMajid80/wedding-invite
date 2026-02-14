"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

interface LanguageSelectorProps {
  onLanguageChange?: (language: string) => void;
}

export const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code);
    setIsOpen(false);
    onLanguageChange?.(code);
  };

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg",
          "bg-navy-800/50 backdrop-blur-sm border border-champagne-500/20",
          "text-champagne-300 hover:bg-champagne-500/10",
          "transition-all"
        )}
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLang.flag}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 bg-navy-800/90 backdrop-blur-sm rounded-lg border border-champagne-500/20 overflow-hidden min-w-[150px] z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "w-full px-4 py-3 text-left flex items-center gap-3",
                  "hover:bg-champagne-500/10 transition-colors",
                  "text-champagne-200",
                  currentLanguage === lang.code && "bg-champagne-500/20"
                )}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-serif">{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


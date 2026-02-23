"use client";

import { CinematicOpening } from "@/components/cinematic-opening";
import { CoupleStory } from "@/components/couple-story";
import { WeddingDetails } from "@/components/wedding-details";
import { GallerySection } from "@/components/gallery-section";
import { PersonalMessage } from "@/components/personal-message";
import { GrandClosing } from "@/components/grand-closing";
import { LoadingScreen } from "@/components/loading-screen";
import { PasswordProtection } from "@/components/password-protection";
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOpenedInvitation, setHasOpenedInvitation] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordProtection] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted until user clicks (required for browser autoplay policy)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio("/liosound_Cinematic_main.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    audioRef.current.muted = true; // Start muted

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleMusicToggle = () => {
    // First user interaction: start playing (browsers require a user gesture for audio)
    if (!hasPlayedRef.current && audioRef.current) {
      hasPlayedRef.current = true;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn("Audio play failed:", err));
      }
    }
    setIsMuted((prev) => !prev);
  };

  const startMusicIfNeeded = () => {
    if (!hasPlayedRef.current && audioRef.current) {
      hasPlayedRef.current = true;
      audioRef.current.play().catch(() => {});
      setIsMuted(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showPasswordProtection && !isUnlocked) {
    return <PasswordProtection onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <main className="min-h-screen overflow-x-hidden relative">
      {/* Music control button - persistent throughout */}
      <button
        onClick={handleMusicToggle}
        className="fixed top-8 right-8 z-50 p-3 rounded-full bg-champagne-500/10 backdrop-blur-sm border border-champagne-500/20 hover:bg-champagne-500/20 transition-all duration-300"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-champagne-300" />
        ) : (
          <Volume2 className="w-5 h-5 text-champagne-300" />
        )}
      </button>

      {hasOpenedInvitation && (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url('/Remove_the_rest_202602151607.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            filter: "blur(5px)",
          }}
        >
          <div className="absolute inset-0 bg-navy-900/75" />
        </div>
      )}

      {!hasOpenedInvitation ? (
        <CinematicOpening
          onOpenInvitation={() => {
            startMusicIfNeeded();
            setHasOpenedInvitation(true);
          }}
        />
      ) : (
        <div className="relative z-10">
          <CoupleStory />
          <WeddingDetails />
          <GallerySection />
          <PersonalMessage />
          <GrandClosing />
        </div>
      )}
    </main>
  );
}

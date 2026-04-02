"use client";

import { CinematicOpening } from "@/components/cinematic-opening";
import { HeroBackgroundLayer } from "@/components/hero-background-layer";
import { WeddingDetails } from "@/components/wedding-details";
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
    audioRef.current = new Audio("/wedding-music.mp3");
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

  // Global deterrents: block context menu & common copy/inspect shortcuts
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isMeta = event.metaKey || event.ctrlKey;

      // Block common save / inspect / view-source shortcuts
      const blockedCombos =
        (isMeta && ["s", "p", "u", "c", "i", "j"].includes(key)) ||
        key === "f12";

      if (blockedCombos) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "IMG" ||
          target.tagName === "PICTURE" ||
          target.tagName === "CANVAS" ||
          target.tagName === "VIDEO")
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

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
    return <LoadingScreen onFirstInteraction={startMusicIfNeeded} />;
  }

  if (showPasswordProtection && !isUnlocked) {
    return <PasswordProtection onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <main
      className="min-h-screen overflow-x-hidden relative"
      onClickCapture={startMusicIfNeeded}
    >
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
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden
        >
          <HeroBackgroundLayer />
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
          <WeddingDetails />
          <PersonalMessage />
          <GrandClosing />
        </div>
      )}
    </main>
  );
}

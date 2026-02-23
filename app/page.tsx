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
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/liosound_Cinematic_main.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Set volume to 50%

    // Play audio when component mounts (after loading)
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Start playing music after loading screen
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Audio play failed:", error);
          });
        }
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      // Cleanup audio on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Control mute/unmute
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

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
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-8 right-8 z-50 p-3 rounded-full bg-champagne-500/10 backdrop-blur-sm border border-champagne-500/20 hover:bg-champagne-500/20 transition-all duration-300"
        aria-label="Toggle music"
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
        <CinematicOpening onOpenInvitation={() => setHasOpenedInvitation(true)} />
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

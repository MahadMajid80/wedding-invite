"use client";

import { CinematicOpening } from "@/components/cinematic-opening";
import { CoupleStory } from "@/components/couple-story";
import { WeddingDetails } from "@/components/wedding-details";
import { GallerySection } from "@/components/gallery-section";
import { PersonalMessage } from "@/components/personal-message";
import { GrandClosing } from "@/components/grand-closing";
import { LoadingScreen } from "@/components/loading-screen";
import { PasswordProtection } from "@/components/password-protection";
import { LanguageSelector } from "@/components/language-selector";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOpenedInvitation, setHasOpenedInvitation] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordProtection] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
      {hasOpenedInvitation && (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url('/Remove_the_rest_202602151607.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-navy-900/75" />
        </div>
      )}
      
      <div className="fixed top-8 right-8 z-40">
        <LanguageSelector />
      </div>

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

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
      <div className="fixed top-8 right-8 z-40">
        <LanguageSelector />
      </div>

      {!hasOpenedInvitation ? (
        <CinematicOpening onOpenInvitation={() => setHasOpenedInvitation(true)} />
      ) : (
        <>
          <CoupleStory />
          <WeddingDetails />
          <GallerySection />
          <PersonalMessage />
          <GrandClosing />
        </>
      )}
    </main>
  );
}

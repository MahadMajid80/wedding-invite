"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const HERO_BACKGROUND_SRC = "/hero-background.jpeg";

export interface HeroBackgroundLayerProps {
  /** Use on first paint (opening hero) for faster LCP */
  priority?: boolean;
  className?: string;
}

export const HeroBackgroundLayer = ({
  priority = false,
  className,
}: HeroBackgroundLayerProps) => (
  <div className={cn("absolute inset-0 bg-navy-900", className)}>
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={HERO_BACKGROUND_SRC}
        alt=""
        fill
        className="scale-110 object-cover object-[44%_36%] blur-sm"
        priority={priority}
        sizes="100vw"
      />
    </div>
    <div
      className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/70 to-navy-950/85"
      aria-hidden
    />
    <div className="pointer-events-none absolute inset-0 opacity-10 paper-texture" />
  </div>
);

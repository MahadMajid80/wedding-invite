import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nabeen Azan & Bisharat - Wedding Invitation",
  description:
    "Together with their families, we invite you to celebrate our union",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${dancing.variable} font-sans antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          {/* Subtle watermark overlay - deterrent only */}
          <div className="pointer-events-none select-none fixed inset-0 z-0 flex items-center justify-center opacity-[0.04]">
            <div className="font-calligraphy text-6xl md:text-8xl text-champagne-200 whitespace-nowrap">
              Nabeen Azan &amp; Bisharat
            </div>
          </div>

          <div className="relative z-10 flex-1">{children}</div>

          <footer className="relative z-10 mt-auto border-t border-champagne-500/10 bg-gradient-to-t from-navy-900/80 to-transparent px-4 py-10 text-center">
            <div className="mx-auto flex max-w-md flex-col items-center gap-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-champagne-500/60 to-transparent" />
              <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-champagne-400/55">
                Created by
              </p>
              <p className="font-calligraphy text-2xl text-gradient md:text-3xl">
                The Aura Invites
              </p>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-champagne-500/40 to-transparent" />
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

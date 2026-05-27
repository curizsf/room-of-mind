"use client";

import { getQuote } from "@/lib/quotes";
import { normalizeLanguage, type Language, uiCopy } from "@/lib/i18n";
import { type RoomResult } from "@/lib/roomMap";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { QuoteCard } from "./QuoteCard";
import { LanguageToggle } from "./LanguageToggle";

type RoomDisplayProps = {
  result: RoomResult;
  language: Language;
};

export function RoomDisplay({ result, language: initialLanguage }: RoomDisplayProps) {
  const router = useRouter();
  const language = normalizeLanguage(initialLanguage);
  const quote = getQuote(result.roomType, language);

  function generateAgain() {
    window.localStorage.removeItem("room-of-mind-prompt");
    window.sessionStorage.removeItem("room-of-mind-prompt");
    window.localStorage.setItem("room-of-mind-language", language);
    const target = language === "en" ? "/" : `/?lang=${language}`;
    router.push(target);
  }

  function handleLanguageChange(nextLanguage: Language) {
    window.localStorage.setItem("room-of-mind-language", nextLanguage);
    const params = new URLSearchParams(window.location.search);
    const textParam = params.get("text");
    const target = textParam
      ? `/result?text=${encodeURIComponent(textParam)}&lang=${nextLanguage}`
      : `/result?lang=${nextLanguage}`;
    router.replace(target);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute right-5 top-5 z-20 sm:right-8 sm:top-8">
        <LanguageToggle language={language} onChange={handleLanguageChange} />
      </div>

      {/* Background image — no Ken Burns, just a slow fade-in */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${result.image})`,
          filter: 'saturate(0.78) brightness(0.82)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      {/* Gradient — heavier at bottom for quote legibility, lighter at top */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(5,4,4,0.88) 0%, rgba(5,4,4,0.3) 42%, rgba(5,4,4,0.12) 70%, transparent 100%)',
      }} />

      {/* Quote — pinned to bottom */}
      <section className="absolute inset-x-0 z-10" style={{
        bottom: 'clamp(4rem, 8vh, 7rem)',
        padding: '0 clamp(1.25rem, 5vw, 3rem)',
      }}>
        <QuoteCard quote={quote} />
      </section>

      {/* Return button — text only, bottom left */}
      <motion.button
        type="button"
        onClick={generateAgain}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ color: 'var(--accent)' }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.25rem, 3vw, 2rem)',
          left: 'clamp(1.25rem, 3vw, 2rem)',
          zIndex: 20,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontSize: '0.6875rem',
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(245,242,238,0.38)',
          transition: 'color 400ms ease',
          padding: 0,
        }}
      >
        {uiCopy[language].generateAgain}
      </motion.button>
    </main>
  );
}

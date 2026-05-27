"use client";

import { normalizeLanguage, type Language, uiCopy } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageToggle } from "./LanguageToggle";

type LoadingSequenceProps = {
  initialLanguage?: string;
};

export function LoadingSequence({ initialLanguage }: LoadingSequenceProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>(
    normalizeLanguage(initialLanguage),
  );
  const [index, setIndex] = useState(0);
  const messages = uiCopy[language].loading;

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setIndex((current) => Math.min(current + 1, messages.length - 1));
    }, 1400);

    const params = new URLSearchParams(window.location.search);
    const textParam = params.get("text") || "";
    const currentLanguage = normalizeLanguage(params.get("lang") ?? language);
    const routeTimer = window.setTimeout(() => {
      window.localStorage.setItem("room-of-mind-language", currentLanguage);
      const target = textParam
        ? `/result?text=${encodeURIComponent(textParam)}&lang=${currentLanguage}`
        : `/result?lang=${currentLanguage}`;
      router.push(target);
    }, 4000);

    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(routeTimer);
    };
  }, [language, messages.length, router]);

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("room-of-mind-language", nextLanguage);
    const params = new URLSearchParams(window.location.search);
    const textParam = params.get("text");
    const target = textParam
      ? `/loading?text=${encodeURIComponent(textParam)}&lang=${nextLanguage}`
      : `/loading?lang=${nextLanguage}`;
    router.replace(target);
  }

  return (
    <main style={{
      display: 'flex',
      minHeight: '100dvh',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: 'var(--background)',
      gap: '3rem',
    }}>
      <div className="absolute right-6 top-6 z-20">
        <LanguageToggle language={language} onChange={handleLanguageChange} />
      </div>

      {/* Breathing line indicator */}
      <motion.div
        animate={{ scaleY: [0.7, 1, 0.7], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '1px',
          height: '3.5rem',
          background: 'linear-gradient(to bottom, transparent, var(--accent-dim), transparent)',
          transformOrigin: 'center',
        }}
      />

      {/* Phrase — swap with soft blur-fade */}
      <div style={{ minHeight: '2.5rem', display: 'flex', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={messages[index]}
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '0.02em',
              color: 'rgba(245,242,238,0.6)',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </main>
  );
}

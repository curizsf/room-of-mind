"use client";

import { normalizeLanguage, type Language, uiCopy } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useState } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { FloatingParticles } from "./FloatingParticles";
import { PromptInput } from "./PromptInput";

type HeroProps = {
  initialLanguage?: string;
};

export function Hero({ initialLanguage }: HeroProps) {
  const [language, setLanguage] = useState<Language>(
    normalizeLanguage(initialLanguage),
  );

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("room-of-mind-language", nextLanguage);
    const target = nextLanguage === "en" ? "/" : `/?lang=${nextLanguage}`;
    window.history.replaceState(null, "", target);
  }

  const copy = uiCopy[language];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080806] px-6">
      <FloatingParticles />

      {/* Subtle warm radial — only at top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,184,154,0.07),transparent_52%)]" />

      <div className="absolute right-6 top-6 z-20">
        <LanguageToggle language={language} onChange={handleLanguageChange} />
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative z-10 w-full text-center"
        style={{ maxWidth: '680px', margin: '0 auto' }}
      >
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,242,238,0.32)',
            marginBottom: '2.5rem',
          }}
        >
          room of mind
        </motion.p>

        {/* Main title — display serif, light weight */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 9vw, 6rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: 'var(--foreground)',
            marginBottom: 'clamp(1.25rem, 3vw, 2rem)',
          }}
        >
          {copy.title}
        </motion.h1>

        {/* Subtitle — italic, softer */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '0.01em',
            lineHeight: 1.65,
            color: 'rgba(245,242,238,0.44)',
            maxWidth: '38ch',
            margin: '0 auto',
          }}
        >
          {copy.subtitle}
        </motion.p>

        {/* Vertical breath line */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '1px',
            height: '2.75rem',
            margin: '2.75rem auto',
            background: 'linear-gradient(to bottom, transparent, rgba(245,242,238,0.16), transparent)',
            transformOrigin: 'top',
          }}
        />

        <PromptInput language={language} />
      </motion.section>
    </main>
  );
}

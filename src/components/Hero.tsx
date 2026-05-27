"use client";

import { normalizeLanguage, type Language, uiCopy } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useState } from "react";
import { LanguageToggle } from "./LanguageToggle";
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0907] px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(124,96,68,0.18),transparent_28%),radial-gradient(circle_at_50%_38%,rgba(54,42,31,0.08),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]" />
      <div className="absolute right-8 top-8 z-20 sm:right-10 sm:top-10">
        <LanguageToggle language={language} onChange={handleLanguageChange} />
      </div>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.15, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl text-center"
      >
        <h1
          className="text-[4.4rem] font-light leading-none text-[var(--hero-title)] sm:text-[6.8rem] md:text-[8.5rem]"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "0.01em",
            textShadow: "0 1px 18px rgba(10,8,7,0.24)",
          }}
        >
          {copy.title}
        </h1>
        <div className="mx-auto mt-7 flex items-center justify-center gap-4 text-[rgba(199,182,155,0.7)]">
          <span className="h-px w-18 bg-[rgba(199,182,155,0.22)] sm:w-24" />
          <span className="text-sm">&#x2726;</span>
          <span className="h-px w-18 bg-[rgba(199,182,155,0.22)] sm:w-24" />
        </div>
        <p
          className="mx-auto mt-7 max-w-2xl text-[1.02rem] font-light leading-7 text-[rgba(214,195,174,0.82)] tracking-[0.06em] sm:text-[1.45rem] sm:leading-8 sm:tracking-[0.18em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {copy.subtitle}
        </p>
        <PromptInput language={language} />
      </motion.section>
    </main>
  );
}

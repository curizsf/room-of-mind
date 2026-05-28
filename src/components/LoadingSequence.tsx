"use client";

import { normalizeLanguage, type Language, uiCopy } from "@/lib/i18n";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageToggle } from "./LanguageToggle";

const MESSAGE_STEP_MS = 1600;
const ROUTE_DELAY_MS = 5600;

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
  const isChinese = language === "zh";
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setIndex((current) => Math.min(current + 1, messages.length - 1));
    }, MESSAGE_STEP_MS);

    const params = new URLSearchParams(window.location.search);
    const textParam = params.get("text") || "";
    const currentLanguage = normalizeLanguage(params.get("lang") ?? language);
    const routeTimer = window.setTimeout(() => {
      window.localStorage.setItem("room-of-mind-language", currentLanguage);
      const target = textParam
        ? `/result?text=${encodeURIComponent(textParam)}&lang=${currentLanguage}`
        : `/result?lang=${currentLanguage}`;
      router.push(target);
    }, ROUTE_DELAY_MS);

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(186,160,128,0.14),transparent_24%),radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.36)_58%,rgba(0,0,0,0.86)_100%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0.32, scale: 1 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.4 }
            : { opacity: [0.3, 0.52, 0.34], scale: [1, 1.06, 1.01] }
        }
        transition={{
          duration: 9,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute left-1/2 top-[46%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(192,169,140,0.1)] blur-3xl" />
        <div className="absolute left-1/2 top-[56%] h-56 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(111,92,72,0.12)] blur-[110px]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(220,200,174,0.08)]"
        initial={{ opacity: 0.18, scale: 0.94 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.18 }
            : { opacity: [0.12, 0.24, 0.12], scale: [0.94, 1.01, 0.97] }
        }
        transition={{
          duration: 7.5,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/45 to-transparent" />
      <div className="absolute right-6 top-6 z-20">
        <LanguageToggle language={language} onChange={handleLanguageChange} />
      </div>
      <div className="relative z-10 flex min-h-[10rem] w-full max-w-2xl flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={`${language}-${messages[index]}`}
            initial={{ opacity: 0, y: 10, filter: "blur(10px)", scale: 0.985 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, y: -8, filter: "blur(7px)", scale: 1.01 }}
            transition={{ duration: prefersReducedMotion ? 0.4 : 1.35, ease: "easeInOut" }}
            className="px-6 text-center font-light text-[rgba(234,225,212,0.82)]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isChinese ? "clamp(1.05rem, 2vw, 1.35rem)" : "clamp(1rem, 1.8vw, 1.3rem)",
              letterSpacing: isChinese ? "0.08em" : "0.16em",
              lineHeight: 1.75,
              textShadow: "0 0 24px rgba(227, 205, 176, 0.12)",
            }}
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
        <div className="mt-8 h-px w-full max-w-[16rem] overflow-hidden bg-[rgba(229,212,188,0.12)]">
          <motion.div
            className="h-full origin-left bg-[linear-gradient(90deg,rgba(231,214,190,0.12)_0%,rgba(231,214,190,0.82)_48%,rgba(231,214,190,0.2)_100%)]"
            initial={{ scaleX: 0.18 }}
            animate={{ scaleX: (index + 1) / messages.length }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 1.1, ease: "easeInOut" }}
          />
        </div>
      </div>
    </main>
  );
}

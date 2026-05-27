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
    }, 1000);

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
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="absolute right-6 top-6 z-20">
        <LanguageToggle language={language} onChange={handleLanguageChange} />
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={messages[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-center text-xl font-light tracking-[0.18em] text-stone-300/80 sm:text-2xl"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </main>
  );
}

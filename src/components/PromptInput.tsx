"use client";

import { type Language, uiCopy } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

type PromptInputProps = {
  language: Language;
};

export function PromptInput({ language }: PromptInputProps) {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const copy = uiCopy[language];
  const [hintIndex, setHintIndex] = useState(() =>
    Math.floor(Math.random() * copy.rotatingHints.length),
  );
  const dustParticles = useMemo(
    () => [
      { left: "19%", top: "16%", size: 3, delay: 0 },
      { left: "34%", top: "68%", size: 2, delay: 1.2 },
      { left: "52%", top: "28%", size: 2.5, delay: 0.8 },
      { left: "63%", top: "74%", size: 3, delay: 1.6 },
      { left: "78%", top: "38%", size: 2, delay: 0.5 },
    ],
    [],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHintIndex((current) => (current + 1) % copy.rotatingHints.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [copy.rotatingHints.length]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = prompt.trim();

    if (!trimmed) {
      return;
    }

    window.localStorage.setItem("room-of-mind-prompt", trimmed);
    window.localStorage.setItem("room-of-mind-language", language);
    router.push(
      `/loading?text=${encodeURIComponent(trimmed)}&lang=${language}`,
    );
  }

  return (
    <div className="mx-auto mt-18 w-full max-w-4xl">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:gap-6"
      >
        <div className="flex-1 text-left">
          <p
            className="mb-4 text-[1.02rem] font-light tracking-[0.07em] text-[rgba(214,195,174,0.78)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {copy.inputLabel}
          </p>
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={copy.placeholder}
            className="min-h-12 w-full border-b border-[rgba(199,182,155,0.28)] bg-transparent pb-3 text-[1.02rem] text-[rgba(233,226,214,0.92)] outline-none transition duration-500 placeholder:text-[rgba(214,195,174,0.34)] focus:border-[rgba(214,195,174,0.5)]"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ x: 2, opacity: 0.96 }}
          whileTap={{ scale: 0.995 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="border-b border-[rgba(199,182,155,0.28)] pb-3 text-left text-[1rem] font-light tracking-[0.08em] text-[rgba(214,195,174,0.78)] transition duration-500 hover:border-[rgba(214,195,174,0.48)] hover:text-[rgba(241,237,228,0.94)] sm:min-w-[9rem]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="inline-flex items-center gap-2">
            <span>{copy.submit}</span>
            <span aria-hidden="true" className="translate-y-[1px] text-[0.9em]">
              &#8594;
            </span>
          </span>
        </motion.button>
      </form>
      <div className="relative mx-auto mt-4 w-full max-w-xl overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-0">
          {dustParticles.map((particle, index) => (
            <motion.span
              key={index}
              className="absolute rounded-full bg-[rgba(199,182,155,0.18)] blur-[1px]"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                opacity: [0.04, 0.16, 0.04],
                y: [0, -5, 0],
                x: [0, 1.5, 0],
              }}
              transition={{
                duration: 5.6,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <p className="mb-1 text-center text-[0.82rem] tracking-[0.08em] text-[rgba(214,195,174,0.4)]">
          {copy.inputHint}
        </p>
        <div className="relative min-h-[1.6rem]">
          <AnimatePresence mode="wait">
            <motion.button
              key={`${language}-${hintIndex}-${copy.rotatingHints[hintIndex]}`}
              type="button"
              onClick={() => setPrompt(copy.rotatingHints[hintIndex])}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.68, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="mx-auto block max-w-[85vw] text-center text-[0.82rem] leading-snug tracking-[0.02em] text-[rgba(214,195,174,0.58)] transition duration-500 hover:text-[rgba(241,237,228,0.86)] sm:max-w-none sm:text-[0.94rem] sm:tracking-[0.03em]"
            >
              {copy.rotatingHints[hintIndex]}
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

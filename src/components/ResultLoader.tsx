"use client";

import { normalizeLanguage, type Language, uiCopy } from "@/lib/i18n";
import { RoomDisplay } from "@/components/RoomDisplay";
import { type RoomResult } from "@/lib/roomMap";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const PROMPT_KEY = "room-of-mind-prompt";
const LANGUAGE_KEY = "room-of-mind-language";
const LAST_INPUT_KEY = "room-of-mind-last-input";
const LAST_ROOM_KEY = "room-of-mind-last-room-type";

type ResultLoaderProps = {
  initialText?: string;
  initialLanguage?: string;
};

const fallback: RoomResult = {
  roomType: "tired",
  image: "/rooms/rainy-office.png",
  quote:
    "You are not afraid of resting.\nYou are afraid no one will wait when you stop.",
};

function preloadImage(src: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Failed to preload image"));
    image.src = src;
  });
}

export function ResultLoader({
  initialText,
  initialLanguage,
}: ResultLoaderProps) {
  const [result, setResult] = useState<RoomResult | null>(null);
  const language: Language = normalizeLanguage(initialLanguage);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const text =
      initialText ??
      window.localStorage.getItem(PROMPT_KEY) ??
      window.sessionStorage.getItem(PROMPT_KEY) ??
      "";
    const previousInput = window.localStorage.getItem(LAST_INPUT_KEY) ?? undefined;
    const previousRoomType = window.localStorage.getItem(LAST_ROOM_KEY) ?? undefined;

    window.localStorage.setItem(LANGUAGE_KEY, language);

    fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, previousInput, previousRoomType }),
    })
      .then((response) => response.json() as Promise<RoomResult>)
      .then(async (nextResult) => {
        await preloadImage(nextResult.image);
        if (cancelled) {
          return;
        }
        window.localStorage.setItem(LAST_INPUT_KEY, text);
        window.localStorage.setItem(LAST_ROOM_KEY, nextResult.roomType);
        setResult(nextResult);
      })
      .catch(() => {
        if (!cancelled) {
          setResult(fallback);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [initialText, language]);

  if (!result) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(186,160,128,0.12),transparent_20%),radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.34)_56%,rgba(0,0,0,0.84)_100%)]" />
        <motion.div
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.86, y: 0, filter: "blur(0px)" }
              : {
                  opacity: [0.5, 0.92, 0.56],
                  y: [6, 0, 2],
                  filter: ["blur(8px)", "blur(0px)", "blur(0px)"],
                }
          }
          transition={{
            duration: prefersReducedMotion ? 0.4 : 3.2,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="px-6 text-center font-light text-[rgba(214,195,174,0.68)]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize:
              language === "zh"
                ? "clamp(1rem, 1.8vw, 1.18rem)"
                : "clamp(0.96rem, 1.6vw, 1.12rem)",
            letterSpacing: language === "zh" ? "0.08em" : "0.15em",
            lineHeight: 1.7,
            textShadow: "0 0 24px rgba(227, 205, 176, 0.12)",
          }}
        >
          {uiCopy[language].loading[2]}
        </motion.div>
      </main>
    );
  }

  return <RoomDisplay result={result} language={language} />;
}

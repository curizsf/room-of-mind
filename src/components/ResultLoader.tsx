"use client";

import { normalizeLanguage, type Language, uiCopy } from "@/lib/i18n";
import { RoomDisplay } from "@/components/RoomDisplay";
import { type RoomResult } from "@/lib/roomMap";
import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center text-[0.92rem] font-light tracking-[0.16em] text-[rgba(214,195,174,0.62)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {uiCopy[language].loading[2]}
        </motion.div>
      </main>
    );
  }

  return <RoomDisplay result={result} language={language} />;
}

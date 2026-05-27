"use client";

import { normalizeLanguage, type Language } from "@/lib/i18n";
import { RoomDisplay } from "@/components/RoomDisplay";
import { type RoomResult } from "@/lib/roomMap";
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

export function ResultLoader({
  initialText,
  initialLanguage,
}: ResultLoaderProps) {
  const [result, setResult] = useState<RoomResult | null>(null);
  const language: Language = normalizeLanguage(initialLanguage);

  useEffect(() => {
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
      .then((nextResult) => {
        window.localStorage.setItem(LAST_INPUT_KEY, text);
        window.localStorage.setItem(LAST_ROOM_KEY, nextResult.roomType);
        setResult(nextResult);
      })
      .catch(() => setResult(fallback));
  }, [initialText, language]);

  return <RoomDisplay result={result ?? fallback} language={language} />;
}

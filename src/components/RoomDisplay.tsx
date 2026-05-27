"use client";

import { getQuote } from "@/lib/quotes";
import { normalizeLanguage, type Language, uiCopy } from "@/lib/i18n";
import { type RoomResult } from "@/lib/roomMap";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { QuoteCard } from "./QuoteCard";
import { LanguageToggle } from "./LanguageToggle";

type RoomDisplayProps = {
  result: RoomResult;
  language: Language;
};

const roomAudioMap: Partial<Record<RoomResult["roomType"], string>> = {
  tired: "/audio/rainy window room.mp3",
  healing: "/audio/ocean-waves.mp3",
  escape: "/audio/capaholiczsfx-forest-soundscape-night-time-403609.mp3",
  winter: "/audio/snow.mp3",
};

export function RoomDisplay({ result, language: initialLanguage }: RoomDisplayProps) {
  const router = useRouter();
  const language = normalizeLanguage(initialLanguage);
  const quote = getQuote(result.roomType, language);
  const audioPath = roomAudioMap[result.roomType];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);
  const audioUnavailable = !audioPath || audioFailed;

  useEffect(() => {
    if (!audioPath) {
      audioRef.current = null;
      return;
    }

    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    function handleEnded() {
      setIsPlaying(false);
    }

    function handleError() {
      setAudioFailed(true);
      setIsPlaying(false);
    }

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setAudioFailed(false);
      })
      .catch(() => {
        setIsPlaying(false);
      });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, [audioPath]);

  function generateAgain() {
    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
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

  async function toggleAudio() {
    const audio = audioRef.current;

    if (!audio || audioUnavailable) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute right-5 top-5 z-20 sm:right-8 sm:top-8">
        <LanguageToggle language={language} onChange={handleLanguageChange} />
      </div>
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${result.image})`,
          filter: "saturate(0.84) brightness(0.86)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.45 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.22) 46%, rgba(0,0,0,0.44) 100%), radial-gradient(circle at 19% 84%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.36) 36%, rgba(0,0,0,0.02) 68%)",
        }}
      />
      <section className="absolute bottom-[4rem] left-6 z-10 pr-14 sm:bottom-[5.6rem] sm:left-12 sm:pr-12">
        <QuoteCard quote={quote} />
      </section>
      <motion.button
        type="button"
        onClick={toggleAudio}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        disabled={audioUnavailable}
        className="absolute bottom-6 left-6 z-20 text-[0.72rem] font-light tracking-[0.06em] text-[rgba(214,195,174,0.36)] transition duration-500 hover:text-[rgba(241,237,228,0.76)] disabled:cursor-default disabled:text-[rgba(214,195,174,0.18)] sm:bottom-9 sm:left-10 sm:text-[0.82rem] sm:tracking-[0.08em] sm:text-[rgba(214,195,174,0.52)] sm:disabled:text-[rgba(214,195,174,0.2)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {audioUnavailable
          ? uiCopy[language].soundUnavailable
          : isPlaying
            ? uiCopy[language].soundOff
            : uiCopy[language].soundOn}
      </motion.button>
      <motion.button
        type="button"
        onClick={generateAgain}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.62, ease: "easeOut" }}
        className="absolute bottom-6 right-6 z-20 text-[0.72rem] font-light tracking-[0.06em] text-[rgba(214,195,174,0.36)] transition duration-500 hover:text-[rgba(241,237,228,0.76)] sm:bottom-9 sm:right-10 sm:text-[0.82rem] sm:tracking-[0.08em] sm:text-[rgba(214,195,174,0.52)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {uiCopy[language].generateAgain}
      </motion.button>
    </main>
  );
}

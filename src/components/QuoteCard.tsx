"use client";

import { motion } from "framer-motion";

type QuoteCardProps = {
  quote: string;
};

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
      className="max-w-[36rem] text-left"
    >
      <div
        aria-hidden="true"
        className="mb-5 h-px w-7 bg-[rgba(199,182,155,0.42)]"
      />
      <p
        className="whitespace-pre-line text-[1.12rem] font-light leading-[1.78] text-[var(--paper)] sm:text-[1.38rem] sm:leading-[1.92] md:text-[1.7rem] md:leading-[1.96]"
        style={{
          fontFamily: "var(--font-display)",
          textShadow: "0 1px 18px var(--quote-shadow)",
          letterSpacing: "0.01em",
        }}
      >
        {quote}
      </p>
      <div
        aria-hidden="true"
        className="mt-6 h-px w-7 bg-[rgba(199,182,155,0.24)]"
      />
    </motion.div>
  );
}

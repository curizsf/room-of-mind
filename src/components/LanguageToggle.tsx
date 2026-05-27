"use client";

import { motion } from "framer-motion";
import { type Language } from "@/lib/i18n";

type LanguageToggleProps = {
  language: Language;
  onChange: (language: Language) => void;
  className?: string;
};

export function LanguageToggle({
  language,
  onChange,
  className = "",
}: LanguageToggleProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      {(["en", "zh"] as const).map((value) => {
        const active = value === language;

        return (
          <motion.button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            whileTap={{ scale: 0.98 }}
            className={`text-[0.92rem] tracking-[0.08em] transition duration-300 ${
              active
                ? "text-[var(--paper)]"
                : "text-[rgba(214,195,174,0.62)] hover:text-[rgba(214,195,174,0.92)]"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {value === "en" ? "EN" : "\u4e2d\u6587"}
          </motion.button>
        );
      })}
    </div>
  );
}

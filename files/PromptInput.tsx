"use client";

import { type Language, uiCopy } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type PromptInputProps = {
  language: Language;
};

export function PromptInput({ language }: PromptInputProps) {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [focused, setFocused] = useState(false);
  const copy = uiCopy[language];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed) return;
    window.localStorage.setItem("room-of-mind-prompt", trimmed);
    window.localStorage.setItem("room-of-mind-language", language);
    router.push(`/loading?text=${encodeURIComponent(trimmed)}&lang=${language}`);
  }

  const canSubmit = prompt.trim().length > 0;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: '520px', margin: '0 auto', width: '100%' }}
    >
      {/* Input — borderless except bottom line */}
      <div style={{
        position: 'relative',
        borderBottom: `1px solid ${focused ? 'rgba(245,242,238,0.28)' : 'rgba(245,242,238,0.1)'}`,
        transition: 'border-color 500ms ease',
        paddingBottom: '1rem',
      }}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={copy.placeholder}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.05rem, 2.4vw, 1.3rem)',
            fontWeight: 300,
            fontStyle: prompt.length > 0 ? 'italic' : 'normal',
            color: 'var(--foreground)',
            letterSpacing: '0.01em',
            caretColor: 'var(--accent)',
            transition: 'font-style 300ms ease',
          }}
        />
        <style>{`
          input::placeholder {
            color: rgba(245, 242, 238, 0.2);
            font-style: italic;
          }
        `}</style>
      </div>

      {/* Footer row */}
      <div style={{
        marginTop: '1.1rem',
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <motion.button
          type="submit"
          whileHover={canSubmit ? { color: 'var(--accent)' } : {}}
          transition={{ duration: 0.25 }}
          style={{
            background: 'none',
            border: 'none',
            cursor: canSubmit ? 'pointer' : 'default',
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: canSubmit ? 'rgba(245,242,238,0.7)' : 'rgba(245,242,238,0.2)',
            transition: 'color 400ms ease',
            padding: '0.25rem 0',
          }}
        >
          {copy.submit}
        </motion.button>
      </div>
    </motion.form>
  );
}

"use client";

import { motion } from "framer-motion";

type QuoteCardProps = {
  quote: string;
};

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 clamp(1.25rem, 4vw, 0rem)',
        textAlign: 'center',
      }}
    >
      {/* Short rule above */}
      <div style={{
        width: '1.75rem',
        height: '1px',
        background: 'rgba(200,184,154,0.35)',
        margin: '0 auto 2rem',
      }} />

      {/* Opening quote mark — decorative, not structural */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '4.5rem',
          lineHeight: 0.6,
          color: 'rgba(200,184,154,0.14)',
          marginBottom: '1.25rem',
          fontWeight: 300,
          userSelect: 'none',
        }}
      >
        &#8220;
      </div>

      {/* Quote body */}
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.15rem, 2.8vw, 1.5rem)',
        fontWeight: 300,
        fontStyle: 'italic',
        lineHeight: 1.8,
        letterSpacing: '0.01em',
        color: 'rgba(245,242,238,0.88)',
        whiteSpace: 'pre-line',
      }}>
        {quote}
      </p>

      {/* Short rule below */}
      <div style={{
        width: '1.75rem',
        height: '1px',
        background: 'rgba(200,184,154,0.2)',
        margin: '2rem auto 0',
      }} />
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 47) % 84)}%`,
  top: `${10 + ((index * 31) % 78)}%`,
  size: 2 + (index % 4),
  delay: index * 0.36,
  duration: 8 + (index % 6),
}));

export function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-stone-200/20 blur-[1px]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0.08, 0.28, 0.08],
            y: [0, -28, 0],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

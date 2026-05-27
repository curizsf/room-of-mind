"use client";

/**
 * FloatingParticles — API preserved, implementation replaced.
 * Two static radial glows instead of 18 animated canvas dots.
 * Creates atmospheric depth without visual noise.
 */
export function FloatingParticles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Warm glow — top, centered */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'clamp(360px, 60vw, 700px)',
        height: 'clamp(360px, 60vw, 700px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,184,154,0.06) 0%, transparent 68%)',
      }} />

      {/* Cool-dim glow — bottom right */}
      <div style={{
        position: 'absolute',
        bottom: '-12%',
        right: '-6%',
        width: 'clamp(240px, 40vw, 480px)',
        height: 'clamp(240px, 40vw, 480px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,175,168,0.04) 0%, transparent 70%)',
      }} />
    </div>
  );
}

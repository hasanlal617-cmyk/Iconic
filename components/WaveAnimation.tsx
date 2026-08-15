"use client";

/** Animated wave layers for the hero background */
export default function WaveAnimation() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 overflow-hidden sm:h-64">
      {/* Wave layer 1 */}
      <svg
        className="absolute bottom-0 w-[200%] animate-wave-slow text-ocean-200/40"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
        />
      </svg>

      {/* Wave layer 2 */}
      <svg
        className="absolute bottom-0 w-[200%] animate-wave-medium text-ocean-300/30"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,80 C200,20 500,100 800,50 C1000,20 1100,90 1200,70 L1200,120 L0,120 Z"
        />
      </svg>

      {/* Wave layer 3 — foreground */}
      <svg
        className="absolute bottom-0 w-full text-white"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,90 C400,60 800,100 1200,80 L1200,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

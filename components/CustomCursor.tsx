"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const dotConfig = { damping: 35, stiffness: 450, mass: 0.2 };
  const dotX = useSpring(-100, dotConfig);
  const dotY = useSpring(-100, dotConfig);

  useEffect(() => {
    // Only enable on pointer devices (desktop)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.dataset.interactive
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer ambient glow halo */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40 bg-cyan-400/10 backdrop-blur-[1px] transition-[width,height,opacity] duration-200 ease-out"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? 64 : 36,
          height: isHovered ? 64 : 36,
          boxShadow: isHovered
            ? "0 0 25px rgba(34, 211, 238, 0.5), inset 0 0 15px rgba(34, 211, 238, 0.2)"
            : "0 0 12px rgba(34, 211, 238, 0.25)",
        }}
      />

      {/* Center pinpoint droplet */}
      <motion.div
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-white to-cyan-200 shadow-[0_0_8px_#22d3ee]"
        style={{
          x: dotX,
          y: dotY,
          scale: isHovered ? 0.5 : 1,
        }}
      />
    </div>
  );
}

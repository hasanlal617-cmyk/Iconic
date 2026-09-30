"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  pulsePhase: number;
  color: string;
}

const MAX_PARTICLES = 14;

export default function WaterParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let particles: Particle[] = [];
    const colors = [
      "rgba(34, 211, 238, ",  // cyan
      "rgba(14, 165, 233, ",  // ocean blue
      "rgba(255, 255, 255, ", // white
    ];

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 60000), MAX_PARTICLES);

      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2.2 + 1.2;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -Math.random() * 0.35 - 0.1,
          alpha: Math.random() * 0.35 + 0.15,
          pulsePhase: Math.random() * Math.PI * 2,
          color: colors[i % colors.length],
        });
      }
    };

    initParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        const dynamicAlpha = p.alpha * (0.85 + 0.15 * Math.sin(time + p.pulsePhase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${dynamicAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50 transform-gpu"
      aria-hidden="true"
    />
  );
}

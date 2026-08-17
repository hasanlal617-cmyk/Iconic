"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import { images } from "@/lib/images";
import Hero3DWater from "./Hero3DWater";

/** 
 * HeroBottle features a studio-grade photorealistic product shot
 * with a high-performance 3D mouse parallax system, WebGL liquid background,
 * and masked specular light reflection overlay.
 */
export default function HeroBottle() {
  const [mounted, setMounted] = useState(false);

  // Track mouse coordinates normalized between -0.5 and 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Set up smooth spring physics for high-end organic movement
  const springConfig = { damping: 30, stiffness: 100, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse positions to 3D rotation angles (degrees)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]); // Tilts up/down
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]); // Tilts left/right

  // Map mouse positions to horizontal/vertical translation of light glare highlight
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["-60%", "60%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["-20%", "20%"]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize values from -0.5 to 0.5
      mouseX.set((event.clientX / innerWidth) - 0.5);
      mouseY.set((event.clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Server-side fallback / Static initial paint for optimal LCP & SEO
  if (!mounted) {
    return (
      <div className="relative mx-auto flex h-[480px] w-full max-w-lg items-center justify-center sm:h-[550px] md:h-[600px] lg:h-[650px]">
        <div className="relative aspect-[3/4] w-full max-w-[280px] sm:max-w-[320px] overflow-hidden rounded-3xl shadow-bottle">
          <OptimizedImage
            src={images.hero.bottle}
            alt="Iconic premium mineral water bottle"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 320px"
            className="object-cover object-center"
            wrapperClassName="h-full w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex h-[480px] w-full max-w-lg items-center justify-center sm:h-[550px] md:h-[600px] lg:h-[650px]">
      {/* 3D WebGL Liquid Backdrop containing morphing fluid orbs */}
      <Hero3DWater />

      {/* Main 3D Card wrapper (tilts on mouse move) */}
      <motion.div
        className="relative z-10 flex h-full w-full max-w-[280px] flex-col items-center justify-center sm:max-w-[320px]"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
      >
        {/* Glow behind the bottle image */}
        <div 
          className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-cyan-accent/20 blur-3xl"
          style={{ transform: "translateZ(-50px)" }}
        />

        {/* Photorealistic bottle element */}
        <div 
          className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-bottle"
          style={{ transform: "translateZ(30px)" }}
        >
          <OptimizedImage
            src={images.hero.bottle}
            alt="Iconic premium mineral water bottle"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 320px"
            className="object-cover object-center"
            wrapperClassName="h-full w-full"
          />

          {/* Masked light glare highlight overlay (only overlays the transparent PNG bottle) */}
          <div
            className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay overflow-hidden rounded-3xl"
            style={{
              maskImage: `url(${images.hero.bottle})`,
              maskSize: "100% 100%",
              maskPosition: "center",
              WebkitMaskImage: `url(${images.hero.bottle})`,
              WebkitMaskSize: "100% 100%",
              WebkitMaskPosition: "center",
            }}
          >
            <motion.div
              className="absolute -inset-y-1/2 -left-1/4 w-[150%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
              style={{
                x: glareX,
                y: glareY,
                rotate: 22,
              }}
            />
          </div>

          {/* Subtle light edge border ring */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20" />
        </div>

        {/* Ambient floor shadow */}
        <div 
          className="pointer-events-none absolute bottom-4 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-ocean-950/25 blur-xl -z-10"
          style={{ transform: "translateZ(-40px)" }}
        />

        {/* Studio-like mirror reflection */}
        <div
          className="pointer-events-none relative mt-4 h-16 w-2/3 overflow-hidden opacity-30"
          style={{
            transform: "translateZ(15px) rotateX(180deg)",
            transformOrigin: "top center",
          }}
        >
          <OptimizedImage
            src={images.hero.bottle}
            alt=""
            fill
            aria-hidden
            className="object-cover object-top blur-[3px]"
            wrapperClassName="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        </div>
      </motion.div>
    </div>
  );
}

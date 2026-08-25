"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Droplets, ShieldCheck, Compass, Award } from "lucide-react";
import WaterParticlesCanvas from "./WaterParticlesCanvas";
import OptimizedImage from "./OptimizedImage";
import { images } from "@/lib/images";

export default function ScrollIntro() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  // Track scroll progression through the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll spring for ultra-fluid interpolation
  // Tuned for buttery-smooth 60fps scroll interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 100,
    mass: 0.8,
    restDelta: 0.001,
  });

  // Update active chapter based on scroll progress
  useEffect(() => {
    setMounted(true);
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) setActiveChapter(0);
      else if (latest < 0.55) setActiveChapter(1);
      else if (latest < 0.82) setActiveChapter(2);
      else setActiveChapter(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Mouse tilt parallax for the central 3D element
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // ------------------ STAGE TRANSFORMATIONS ------------------
  // Bottle transforms across stages
  const bottleX = useTransform(smoothProgress, [0, 0.25, 0.55, 0.8, 1], ["24%", "0%", "-24%", "0%", "0%"]);
  const bottleY = useTransform(smoothProgress, [0, 0.25, 0.55, 0.8, 1], [40, 0, -10, 0, -20]);
  const bottleScale = useTransform(smoothProgress, [0, 0.25, 0.55, 0.8, 1], [0.85, 1, 1.08, 1.15, 1.02]);
  const bottleRotateY = useTransform(smoothProgress, [0, 0.3, 0.6, 0.85, 1], [-15, 0, 12, -8, 0]);
  const bottleRotateZ = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [-2, 0, 3, 0]);

  // Background shifts
  const bgScale = useTransform(smoothProgress, [0, 1], [1.15, 1.0]);
  const bgBrightness = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.55, 0.45, 0.5, 0.65]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.3, 0.6, 0.9], [0.4, 0.75, 0.6, 0.85]);

  // Chapter 1 Animations (Glacial Origin)
  const ch1Opacity = useTransform(smoothProgress, [0, 0.18, 0.26], [1, 1, 0]);
  const ch1Y = useTransform(smoothProgress, [0, 0.18, 0.26], [0, 0, -40]);
  const ch1Scale = useTransform(smoothProgress, [0, 0.18, 0.26], [1, 1, 0.95]);

  // Chapter 2 Animations (15-Year Filtration & Minerals)
  const ch2Opacity = useTransform(smoothProgress, [0.26, 0.34, 0.5, 0.58], [0, 1, 1, 0]);
  const ch2Y = useTransform(smoothProgress, [0.26, 0.34, 0.5, 0.58], [40, 0, 0, -40]);
  const mineralCardsScale = useTransform(smoothProgress, [0.28, 0.38, 0.5, 0.56], [0.7, 1, 1, 0.8]);

  // Chapter 3 Animations (Purity & Craft)
  const ch3Opacity = useTransform(smoothProgress, [0.58, 0.66, 0.78, 0.84], [0, 1, 1, 0]);
  const ch3Y = useTransform(smoothProgress, [0.58, 0.66, 0.78, 0.84], [40, 0, 0, -40]);

  // Chapter 4 Animations (Final CTA / Climax)
  const ch4Opacity = useTransform(smoothProgress, [0.82, 0.9, 1], [0, 1, 1]);
  const ch4Y = useTransform(smoothProgress, [0.82, 0.9, 1], [50, 0, 0]);

  // Chapter Depth Labels
  const chapterDepthLabels = [
    "3,000m Peak Glacial Source",
    "15-Year Aquifer Filtration",
    "pH 7.4 Optimal Mineral Equilibrium",
    "Crafted & Bottled at Origin",
  ];

  const jumpToChapter = (chapterIndex: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const stepRatio = [0.05, 0.38, 0.68, 0.95][chapterIndex];
    const targetScroll = containerTop + containerHeight * stepRatio;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const skipIntro = () => {
    if (!containerRef.current) return;
    const nextSection = document.getElementById("about") || document.getElementById("products");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: containerRef.current.offsetTop + containerRef.current.offsetHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="intro"
      className="relative h-[400vh] w-full bg-navy"
      onMouseMove={handleMouseMove}
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy text-white flex items-center justify-center" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        
        {/* Background Alpine Image with Dynamic Parallax & Filters */}
        <motion.div
          className="absolute inset-0 -z-30 h-full w-full"
          style={{ scale: bgScale }}
        >
          <OptimizedImage
            src={images.hero.background}
            alt="Alpine spring source"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            wrapperClassName="h-full w-full"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/70 to-navy/95" />
          <motion.div
            className="absolute inset-0 bg-navy/60 backdrop-blur-[1px]"
            style={{ opacity: bgBrightness }}
          />
        </motion.div>

        {/* Ambient Canvas with Floating Water Bubbles & Caustic Refractions */}
        <WaterParticlesCanvas />

        {/* Dynamic Glowing Ambient Light Orbs */}
        <motion.div
          className="pointer-events-none absolute -left-20 top-1/4 h-[550px] w-[550px] rounded-full bg-ocean-500/25 blur-[120px]"
          style={{ opacity: glowOpacity }}
        />
        <motion.div
          className="pointer-events-none absolute -right-20 bottom-1/4 h-[600px] w-[600px] rounded-full bg-cyan-accent/20 blur-[140px]"
          style={{ opacity: glowOpacity }}
        />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-ocean-400/15 blur-[90px]" />

        {/* TOP STATUS BAR / NAVIGATION ACCENT */}
        <div className="absolute top-6 left-0 right-0 z-40 px-6 md:px-12 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-cyan-accent">
              <span className="h-2.5 w-2.5 animate-ping rounded-full bg-cyan-accent opacity-75" />
            </span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-ocean-200">
              Interactive Story
            </span>
          </div>

          {/* Quick Skip Intro Pill */}
          <button
            onClick={skipIntro}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-md transition-all hover:border-cyan-accent/50 hover:bg-white/20 hover:text-white"
          >
            <span>Skip to Collection</span>
            <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 text-cyan-accent" />
          </button>
        </div>

        {/* MAIN STAGE CONTENT GRID */}
        <div className="relative mx-auto w-full max-w-7xl h-full px-6 sm:px-8 lg:px-12 flex items-center justify-center">

          {/* CENTER 3D BOTTLE SHOWPIECE */}
          <motion.div
            className="absolute z-20 flex items-center justify-center pointer-events-none"
            style={{
              x: bottleX,
              y: bottleY,
              scale: bottleScale,
              rotateY: bottleRotateY,
              rotateZ: bottleRotateZ,
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
          >
            <div
              className="relative transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${-mousePos.y * 14}deg) rotateY(${mousePos.x * 14}deg)`,
              }}
            >
              {/* Outer Radiant Aura Halo */}
              <div className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-tr from-cyan-accent/25 via-ocean-500/20 to-transparent blur-2xl animate-pulse" />

              {/* Central Bottle Container */}
              <div className="relative h-[360px] w-[210px] sm:h-[460px] sm:w-[270px] md:h-[520px] md:w-[310px] lg:h-[580px] lg:w-[350px]">
                <OptimizedImage
                  src={images.hero.bottle}
                  alt="Iconic pure alpine spring water bottle"
                  fill
                  priority
                  sizes="(max-width: 768px) 270px, 350px"
                  className="object-contain drop-shadow-[0_20px_50px_rgba(14,165,233,0.45)] filter"
                  wrapperClassName="h-full w-full"
                />

                {/* Shimmering Specular Light Reflection Sweep */}
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-overlay overflow-hidden rounded-3xl"
                  style={{
                    maskImage: `url(${images.hero.bottle})`,
                    maskSize: "contain",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskImage: `url(${images.hero.bottle})`,
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                >
                  <motion.div
                    className="absolute -inset-y-1/2 -left-1/2 w-[200%] bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatDelay: 2.5,
                      duration: 2.2,
                      ease: "easeInOut",
                    }}
                    style={{ transform: "rotate(25deg)" }}
                  />
                </div>
              </div>

              {/* Water Splash & Bottom Reflection Ring */}
              <div className="pointer-events-none absolute -bottom-6 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-[100%] bg-cyan-accent/30 blur-md" />
            </div>
          </motion.div>

          {/* ================= CHAPTER 1: GLACIAL ORIGIN ================= */}
          <motion.div
            className="absolute inset-0 z-30 flex flex-col justify-center items-center md:items-start max-w-xl text-center md:text-left pointer-events-none"
            style={{
              opacity: ch1Opacity,
              y: ch1Y,
              scale: ch1Scale,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-950/50">
              <Compass className="h-3.5 w-3.5 text-cyan-accent" />
              Chapter 01 / Alpine Origin
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.35)' }}>
              BORN AT{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent drop-shadow-sm">
                3,000 METERS
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-ocean-100/90 leading-relaxed max-w-md font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}>
              Protected high above the clouds in pristine alpine glaciers. Untouched by industrial pollution, preserved in natural silence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-medium text-white/90 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                46.5° N, 8.4° E High Alps
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-medium text-white/90 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Naturally Pure Snowmelt
              </div>
            </div>
          </motion.div>

          {/* ================= CHAPTER 2: 15-YEAR MINERAL FILTRATION ================= */}
          <motion.div
            className="absolute inset-0 z-30 flex flex-col justify-between py-24 pointer-events-none"
            style={{
              opacity: ch2Opacity,
              y: ch2Y,
            }}
          >
            {/* Top Text Header */}
            <div className="text-center mx-auto max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-300 backdrop-blur-md">
                <Droplets className="h-3.5 w-3.5 text-cyan-accent" />
                Chapter 02 / Subterranean Journey
              </div>
              <h2 className="mt-3 text-3xl sm:text-5xl font-black text-white tracking-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.35)' }}>
                15 Years of{" "}
                <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                  Natural Filtration
                </span>
              </h2>
              <p className="mt-2 text-sm sm:text-base text-ocean-200/95 font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}>
                Filtered slowly through dense mineral-rich strata, infusing bioavailable electrolytes.
              </p>
            </div>

            {/* 4 Interactive Floating Mineral Cards Orbiting the Bottle */}
            <motion.div
              className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl mx-auto px-4"
              style={{ scale: mineralCardsScale }}
            >
              {/* Card 1: Calcium */}
              <div className="rounded-2xl border border-cyan-400/30 bg-ocean-950/60 p-4 sm:p-5 backdrop-blur-xl shadow-glass flex flex-col justify-between text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Calcium</span>
                  <span className="text-lg sm:text-2xl font-black text-white">68 <span className="text-xs font-normal text-cyan-200">mg/L</span></span>
                </div>
                <p className="mt-2 text-xs text-ocean-200/80 hidden sm:block">Essential for peak muscular stamina and bone architecture.</p>
              </div>

              {/* Card 2: Magnesium */}
              <div className="rounded-2xl border border-cyan-400/30 bg-ocean-950/60 p-4 sm:p-5 backdrop-blur-xl shadow-glass flex flex-col justify-between text-right sm:text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Magnesium</span>
                  <span className="text-lg sm:text-2xl font-black text-white">24 <span className="text-xs font-normal text-cyan-200">mg/L</span></span>
                </div>
                <p className="mt-2 text-xs text-ocean-200/80 hidden sm:block">Powers cellular energy and deep body hydration balance.</p>
              </div>

              {/* Card 3: Silica */}
              <div className="rounded-2xl border border-cyan-400/30 bg-ocean-950/60 p-4 sm:p-5 backdrop-blur-xl shadow-glass flex flex-col justify-between text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Silica</span>
                  <span className="text-lg sm:text-2xl font-black text-white">14 <span className="text-xs font-normal text-cyan-200">mg/L</span></span>
                </div>
                <p className="mt-2 text-xs text-ocean-200/80 hidden sm:block">Promotes natural skin radiance and cellular renewal.</p>
              </div>

              {/* Card 4: Balanced pH */}
              <div className="rounded-2xl border border-cyan-400/30 bg-ocean-950/60 p-4 sm:p-5 backdrop-blur-xl shadow-glass flex flex-col justify-between text-right sm:text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Balanced pH</span>
                  <span className="text-lg sm:text-2xl font-black text-white">7.4 <span className="text-xs font-normal text-cyan-200">pH</span></span>
                </div>
                <p className="mt-2 text-xs text-ocean-200/80 hidden sm:block">Matches your body's natural physiological alkalinity.</p>
              </div>
            </motion.div>

            <div />
          </motion.div>

          {/* ================= CHAPTER 3: UNCOMPROMISED PURITY ================= */}
          <motion.div
            className="absolute inset-0 z-30 flex flex-col justify-center items-center md:items-end max-w-xl ml-auto text-center md:text-right pointer-events-none"
            style={{
              opacity: ch3Opacity,
              y: ch3Y,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-300 backdrop-blur-md shadow-lg">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-300" />
              Chapter 03 / Pure Craft
            </div>

            <h2 className="mt-5 text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.35)' }}>
              THE ICONIC{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-white bg-clip-text text-transparent drop-shadow-sm">
                PURITY
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-ocean-100/90 leading-relaxed max-w-md font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}>
              Protected in 100% infinitely recyclable artisan glass. Shielded from microplastics, preserving crisp natural taste.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Zero Microplastics
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md">
                <Award className="h-4 w-4 text-cyan-300" />
                Sommelier Rated
              </div>
            </div>
          </motion.div>

          {/* ================= CHAPTER 4: CALL TO ACTION & EXPLORATION ================= */}
          <motion.div
            className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center max-w-3xl mx-auto pointer-events-auto"
            style={{
              opacity: ch4Opacity,
              y: ch4Y,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-900/60 px-5 py-2 text-xs font-bold uppercase tracking-widest text-cyan-200 backdrop-blur-md shadow-xl shadow-cyan-950/60">
              <Sparkles className="h-4 w-4 text-cyan-300 animate-spin" />
              Chapter 04 / Experience
            </div>

            <h2 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}>
              Elevate Your{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent drop-shadow-sm">
                Hydration Ritual
              </span>
            </h2>

            <p className="mt-5 text-base sm:text-xl text-ocean-100/95 max-w-xl mx-auto leading-relaxed font-medium" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.2)' }}>
              Crisp, balanced, and uncompromising. Discover our range of single-serve bottles, family packs, and premium glass editions.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-ocean-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-ocean-500"
              >
                Explore Collection
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50"
              >
                Contact & Distribution
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-white/10 pt-6 text-xs sm:text-sm text-ocean-200/70 font-medium">
              <span>✦ 100% Alpine Spring</span>
              <span>✦ pH 7.2–7.4 Balanced</span>
              <span>✦ ISO 22000 Certified</span>
              <span>✦ BPA & Chemical Free</span>
            </div>
          </motion.div>

        </div>

        {/* ================= RIGHT-SIDE CHAPTER NAVIGATOR HUD ================= */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-5 pointer-events-auto">
          {[
            { label: "Origin", sub: "3000m Peak" },
            { label: "Filtration", sub: "15 Years" },
            { label: "Purity", sub: "Eco Glass" },
            { label: "Experience", sub: "Taste" },
          ].map((item, idx) => {
            const isActive = activeChapter === idx;
            return (
              <button
                key={item.label}
                onClick={() => jumpToChapter(idx)}
                className="group flex items-center gap-3 text-right focus:outline-none"
              >
                <div className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-75 group-hover:translate-x-0"}`}>
                  <div className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-cyan-300" : "text-white/70"}`}>
                    0{idx + 1}. {item.label}
                  </div>
                  <div className="text-[10px] text-ocean-300/70">{item.sub}</div>
                </div>

                <div
                  className={`h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-cyan-accent shadow-lg shadow-cyan-400/50"
                      : "w-3 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* ================= BOTTOM METRIC DEPTH BAR & SCROLL CUE ================= */}
        <div className="absolute bottom-6 left-0 right-0 z-40 px-6 md:px-12 flex items-center justify-between pointer-events-none">
          {/* Depth / Status Indicator */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-ocean-200/90 uppercase">
              {chapterDepthLabels[activeChapter]}
            </span>
          </div>

          {/* Animated Scroll Down Indicator (visible when activeChapter < 3) */}
          {activeChapter < 3 && (
            <motion.div
              className="mx-auto sm:mx-0 flex items-center gap-2 text-xs uppercase tracking-widest text-ocean-200/80"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <span>Scroll to Journey</span>
              <ChevronDown className="h-4 w-4 text-cyan-accent" />
            </motion.div>
          )}

          {/* Scroll Progress Counter */}
          <div className="hidden sm:block text-xs font-mono text-ocean-300/70">
            {Math.round((activeChapter + 1) * 25)}% SOURCED
          </div>
        </div>

      </div>
    </section>
  );
}

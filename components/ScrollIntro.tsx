"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Droplets, ShieldCheck, Compass, Award, Mountain, Wind, CheckCircle2 } from "lucide-react";
import WaterParticlesCanvas from "./WaterParticlesCanvas";
import OptimizedImage from "./OptimizedImage";
import { images } from "@/lib/images";

export default function ScrollIntro() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  // Track scroll progression through the 350vh scrollytelling container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    setMounted(true);
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) setActiveChapter(0);
      else if (latest < 0.55) setActiveChapter(1);
      else if (latest < 0.8) setActiveChapter(2);
      else setActiveChapter(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Stage Transforms for Central Bottle
  const bottleX = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], ["24%", "0%", "-24%", "0%", "0%"]);
  const bottleY = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], [20, 0, -10, 0, -10]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], [0.95, 1.05, 1.08, 1.12, 1.0]);

  // Chapter 1 Animations (Glacial Origin)
  const ch1Opacity = useTransform(scrollYProgress, [0, 0.18, 0.26], [1, 1, 0]);
  const ch1Y = useTransform(scrollYProgress, [0, 0.18, 0.26], [0, 0, -30]);

  // Chapter 2 Animations (15-Year Rock Filtration)
  const ch2Opacity = useTransform(scrollYProgress, [0.26, 0.35, 0.48, 0.56], [0, 1, 1, 0]);
  const ch2Y = useTransform(scrollYProgress, [0.26, 0.35, 0.48, 0.56], [30, 0, 0, -30]);

  // Chapter 3 Animations (Artisan Glass Craft)
  const ch3Opacity = useTransform(scrollYProgress, [0.58, 0.66, 0.76, 0.82], [0, 1, 1, 0]);
  const ch3Y = useTransform(scrollYProgress, [0.58, 0.66, 0.76, 0.82], [30, 0, 0, -30]);

  // Chapter 4 Animations (Final CTA)
  const ch4Opacity = useTransform(scrollYProgress, [0.82, 0.9, 1], [0, 1, 1]);
  const ch4Y = useTransform(scrollYProgress, [0.82, 0.9, 1], [30, 0, 0]);

  const chapterDepthLabels = [
    "3,000m Glacial Elevation • Monte Rosa Alps",
    "15-Year Subterranean Granite Filtration",
    "pH 7.4 Perfect Natural Equilibrium",
    "Bottled Exclusively at Source in Artisan Glass",
  ];

  const jumpToChapter = (chapterIndex: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const stepRatio = [0.05, 0.38, 0.68, 0.95][chapterIndex];
    const targetScroll = containerTop + containerHeight * stepRatio;

    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetScroll, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const skipIntro = () => {
    if (!containerRef.current) return;
    const nextSection = document.getElementById("about") || document.getElementById("products");
    if (nextSection) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(nextSection, { offset: -20, duration: 1.0 });
      } else {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="intro"
      className="relative h-[360vh] w-full bg-navy overflow-hidden"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-navy text-white flex items-center justify-center">
        
        {/* Background Alpine Image */}
        <div className="absolute inset-0 -z-30 h-full w-full overflow-hidden">
          <OptimizedImage
            src={images.hero.background}
            alt="Alpine spring source high in the mountains"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.75]"
            wrapperClassName="h-full w-full"
          />
          {/* Gradients to blend seamlessly into luxury dark theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/60 to-navy" />
          <div className="absolute inset-0 bg-navy/30" />
        </div>

        {/* Ambient Canvas with Floating Water Bubbles */}
        <WaterParticlesCanvas />

        {/* Ambient Glow Lights */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full bg-ocean-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-cyan-accent/15 blur-3xl" />

        {/* TOP STATUS BAR ACCENT */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 z-40 px-6 md:px-12 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 items-center justify-center rounded-full bg-cyan-accent shadow-glow">
              <span className="h-2 w-2 animate-ping rounded-full bg-cyan-accent opacity-75" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-cyan-300">
              Glacial Origin Odyssey
            </span>
          </div>

          {/* Skip Intro Button */}
          <button
            onClick={skipIntro}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-navy-card/85 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white/90 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/15 hover:text-white"
          >
            <span>Skip To Collection</span>
            <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 text-cyan-accent" />
          </button>
        </div>

        {/* MAIN STAGE CONTENT CONTAINER */}
        <div className="relative mx-auto w-full max-w-7xl h-full px-6 sm:px-8 lg:px-12 flex items-center justify-center">

          {/* ================= CENTER BOTTLE SHOWPIECE ================= */}
          <motion.div
            className="absolute z-20 flex items-center justify-center pointer-events-none"
            style={{
              x: bottleX,
              y: bottleY,
              scale: bottleScale,
            }}
          >
            <div className="relative">
              {/* Outer Cyan Halo */}
              <div className="pointer-events-none absolute -inset-6 rounded-full bg-cyan-400/20 blur-2xl" />

              {/* Central Bottle Container */}
              <div className="relative h-[360px] w-[200px] sm:h-[460px] sm:w-[260px] md:h-[520px] md:w-[300px] lg:h-[580px] lg:w-[340px]">
                <OptimizedImage
                  src={images.hero.bottle}
                  alt="Iconic pure alpine spring water bottle"
                  fill
                  priority
                  sizes="(max-width: 768px) 260px, 340px"
                  className="object-contain drop-shadow-[0_20px_40px_rgba(14,165,233,0.45)]"
                  wrapperClassName="h-full w-full"
                />
              </div>

              {/* Floor Shadow Ring */}
              <div className="pointer-events-none absolute -bottom-4 left-1/2 h-5 w-3/4 -translate-x-1/2 rounded-[100%] bg-cyan-500/25 blur-sm" />
            </div>
          </motion.div>

          {/* ================= CHAPTER 1: GLACIAL ORIGIN ================= */}
          <motion.div
            className="absolute inset-x-6 sm:inset-x-8 lg:inset-x-12 z-30 flex flex-col justify-center items-center md:items-start max-w-xl text-center md:text-left pointer-events-none"
            style={{
              opacity: ch1Opacity,
              y: ch1Y,
            }}
          >
            <div className="glass-pill shadow-glow">
              <Mountain className="h-3.5 w-3.5 text-cyan-accent" />
              <span>Chapter 01 / Glacial Elevation</span>
            </div>

            <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
              BORN AT{" "}
              <span className="block font-serif italic font-normal text-gradient-cyan">
                3,000 Meters.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-md font-normal">
              High above the cloudline in untouched Alpine sanctuary. Preserved in eternal ice, naturally shielded from human civilization.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="glass-pill bg-white/[0.04] text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-glow" />
                46.5° N, 8.4° E High Alps
              </div>
              <div className="glass-pill bg-white/[0.04] text-slate-200">
                <Wind className="h-3.5 w-3.5 text-cyan-400" />
                Sub-Zero Purity
              </div>
            </div>
          </motion.div>

          {/* ================= CHAPTER 2: 15-YEAR MINERAL FILTRATION ================= */}
          <motion.div
            className="absolute inset-x-6 sm:inset-x-8 lg:inset-x-12 z-30 flex flex-col justify-between py-24 sm:py-28 pointer-events-none"
            style={{
              opacity: ch2Opacity,
              y: ch2Y,
            }}
          >
            {/* Top Text Header */}
            <div className="text-center mx-auto max-w-2xl">
              <div className="glass-pill shadow-glow">
                <Droplets className="h-3.5 w-3.5 text-cyan-accent" />
                <span>Chapter 02 / 15-Year Subterranean Journey</span>
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                Sculpted by Time &{" "}
                <span className="font-serif italic font-normal text-gradient-cyan">
                  Granite Strata
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
                Filtered slowly through dense mineral-rich rock layers for 15 years, naturally infusing essential electrolytes.
              </p>
            </div>

            {/* 4 Mineral Cards Orbiting the Bottle */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl mx-auto px-4">
              {/* Card 1: Calcium */}
              <div className="glass-card p-4 sm:p-6 text-left border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Calcium (Ca²⁺)</span>
                  <span className="text-lg sm:text-2xl font-black text-white">68 <span className="text-xs font-normal text-cyan-300">mg/L</span></span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-cyan-400 to-ocean-500" />
                </div>
                <p className="mt-2 text-xs text-slate-400 hidden sm:block">Essential for cellular stamina and neuromuscular equilibrium.</p>
              </div>

              {/* Card 2: Magnesium */}
              <div className="glass-card p-4 sm:p-6 text-right sm:text-left border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Magnesium (Mg²⁺)</span>
                  <span className="text-lg sm:text-2xl font-black text-white">24 <span className="text-xs font-normal text-cyan-300">mg/L</span></span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-cyan-400 to-ocean-500" />
                </div>
                <p className="mt-2 text-xs text-slate-400 hidden sm:block">Powers ATP cellular vitality and smooth muscular recovery.</p>
              </div>

              {/* Card 3: Silica */}
              <div className="glass-card p-4 sm:p-6 text-left border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Silica (SiO₂)</span>
                  <span className="text-lg sm:text-2xl font-black text-white">16 <span className="text-xs font-normal text-cyan-300">mg/L</span></span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-cyan-400 to-ocean-500" />
                </div>
                <p className="mt-2 text-xs text-slate-400 hidden sm:block">Enhances natural skin elasticity, hydration, and glow.</p>
              </div>

              {/* Card 4: Balanced pH */}
              <div className="glass-card p-4 sm:p-6 text-right sm:text-left border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Alkaline pH</span>
                  <span className="text-lg sm:text-2xl font-black text-white">7.4 <span className="text-xs font-normal text-cyan-300">pH</span></span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-cyan-400 to-teal-400" />
                </div>
                <p className="mt-2 text-xs text-slate-400 hidden sm:block">Flawlessly mirrors blood plasma physiological balance.</p>
              </div>
            </div>

            <div />
          </motion.div>

          {/* ================= CHAPTER 3: UNCOMPROMISED ARTISAN CRAFT ================= */}
          <motion.div
            className="absolute inset-x-6 sm:inset-x-8 lg:inset-x-12 z-30 flex flex-col justify-center items-center md:items-end max-w-xl ml-auto text-center md:text-right pointer-events-none"
            style={{
              opacity: ch3Opacity,
              y: ch3Y,
            }}
          >
            <div className="glass-pill shadow-glow">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
              <span>Chapter 03 / Artisan Glass Craft</span>
            </div>

            <h2 className="mt-6 font-display text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">
              ZERO PLASTIC.{" "}
              <span className="block font-serif italic font-normal text-gradient-cyan">
                Pure Glass Edition.
              </span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-md font-normal">
              Encased in 100% infinitely recyclable emerald-flint glass. Zero leaching, zero microplastics, preserving the velvety alpine mouthfeel.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
              <div className="glass-pill bg-white/[0.04] text-white">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                <span>0.00% Microplastics</span>
              </div>
              <div className="glass-pill bg-white/[0.04] text-white">
                <Award className="h-4 w-4 text-cyan-300" />
                <span>Sommelier Rated 99/100</span>
              </div>
            </div>
          </motion.div>

          {/* ================= CHAPTER 4: CALL TO ACTION ================= */}
          <motion.div
            className="absolute inset-x-6 sm:inset-x-8 lg:inset-x-12 z-30 flex flex-col justify-center items-center text-center max-w-3xl mx-auto pointer-events-auto"
            style={{
              opacity: ch4Opacity,
              y: ch4Y,
            }}
          >
            <div className="glass-pill shadow-glow">
              <Sparkles className="h-4 w-4 text-cyan-300 animate-spin-slow" />
              <span>Chapter 04 / Haute Hydration Ritual</span>
            </div>

            <h2 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              Elevate Your{" "}
              <span className="font-serif italic font-normal text-gradient-cyan">
                Daily Ritual.
              </span>
            </h2>

            <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
              Crisp, balanced, and uncompromising. Experience our private collection of single-serve, family formats, and fine dining glass editions.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <a
                href="#products"
                className="btn-primary w-full sm:w-auto"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#tasting"
                className="btn-secondary w-full sm:w-auto"
              >
                <span>Taste Sommelier Notes</span>
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-white/10 pt-6 text-xs sm:text-sm text-cyan-300/80 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> 100% Alpine Spring</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> pH 7.4 Balanced</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> Certified Carbon Neutral</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> Glass & BPA-Free</span>
            </div>
          </motion.div>

        </div>

        {/* ================= RIGHT-SIDE CHAPTER NAVIGATOR HUD ================= */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-5 pointer-events-auto">
          {[
            { label: "Origin", sub: "3,000m Peak" },
            { label: "Filtration", sub: "15 Years" },
            { label: "Artisan Glass", sub: "0 Plastic" },
            { label: "Ritual", sub: "Experience" },
          ].map((item, idx) => {
            const isActive = activeChapter === idx;
            return (
              <button
                key={item.label}
                onClick={() => jumpToChapter(idx)}
                className="group flex items-center gap-3 text-right focus:outline-none"
              >
                <div className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 group-hover:opacity-75 group-hover:translate-x-0"}`}>
                  <div className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-cyan-300" : "text-slate-400"}`}>
                    0{idx + 1}. {item.label}
                  </div>
                  <div className="text-[10px] text-cyan-400/60">{item.sub}</div>
                </div>

                <div
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-cyan-accent shadow-glow"
                      : "w-2.5 bg-white/20 group-hover:bg-white/50"
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
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-glow" />
            <span className="text-xs font-mono tracking-wider text-cyan-200 uppercase">
              {chapterDepthLabels[activeChapter]}
            </span>
          </div>

          {/* Animated Scroll Down Indicator */}
          {activeChapter < 3 && (
            <motion.div
              className="mx-auto sm:mx-0 flex items-center gap-2 text-xs uppercase tracking-widest text-slate-300"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <span>Scroll To Journey</span>
              <ChevronDown className="h-4 w-4 text-cyan-accent" />
            </motion.div>
          )}

          {/* Progress % */}
          <div className="hidden sm:block text-xs font-mono text-cyan-400/80">
            {Math.round((activeChapter + 1) * 25)}% SOURCED
          </div>
        </div>

      </div>
    </section>
  );
}

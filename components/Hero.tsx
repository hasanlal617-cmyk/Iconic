"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import WaveAnimation from "./WaveAnimation";
import HeroBottle from "./HeroBottle";
import OptimizedImage from "./OptimizedImage";
import { images } from "@/lib/images";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={images.hero.background}
          alt=""
          fill
          priority
          aria-hidden
          sizes="100vw"
          className="object-cover"
          wrapperClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-ocean-50/90" />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Background orbs */}
      <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-ocean-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-64 h-80 w-80 rounded-full bg-cyan-accent/15 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 pb-32 pt-12 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:pb-40 lg:pt-20">
        {/* Copy */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-block rounded-full border border-ocean-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ocean-700 shadow-sm backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Premium Mineral Water
          </motion.span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Pure Hydration,{" "}
            <span className="bg-gradient-to-r from-ocean-600 to-cyan-accent bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-ocean-800/80 sm:text-lg lg:mx-0">
            Sourced from protected alpine springs and crafted with uncompromising
            quality standards. Experience water the way nature intended — crisp,
            balanced, and unmistakably Iconic.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <a href="#products" className="btn-primary group">
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="btn-secondary group">
              <Phone className="h-4 w-4" />
              Contact Sales
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            {["ISO Certified", "100% Recyclable", "pH 7.2–7.4"].map((badge) => (
              <span
                key={badge}
                className="text-xs font-medium uppercase tracking-wider text-ocean-700/60"
              >
                ✦ {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bottle visual */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroBottle />
        </motion.div>
      </div>

      <WaveAnimation />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import { images } from "@/lib/images";

/** Hero product shot with studio lighting effects */
export default function HeroBottle() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-cyan-accent/25 blur-3xl" />
      <div className="absolute -bottom-8 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-ocean-600/20 blur-2xl" />

      <motion.div
        className="relative animate-float"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Product image */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-3xl shadow-bottle">
          <OptimizedImage
            src={images.hero.bottle}
            alt="Iconic premium mineral water bottle"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 320px"
            className="object-cover object-center"
            wrapperClassName="h-full w-full"
          />
          {/* Subtle edge highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/30" />
        </div>

        {/* Reflection */}
        <div className="relative mx-auto mt-2 h-16 w-2/3 overflow-hidden opacity-40">
          <OptimizedImage
            src={images.hero.bottle}
            alt=""
            fill
            aria-hidden
            className="scale-y-[-1] object-cover object-top blur-sm"
            wrapperClassName="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        </div>
      </motion.div>
    </div>
  );
}

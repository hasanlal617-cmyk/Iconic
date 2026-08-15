"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, Droplets, Mountain } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { features } from "@/lib/data";

const iconMap = {
  leaf: Leaf,
  recycle: Recycle,
  droplets: Droplets,
  mountain: Mountain,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Features() {
  return (
    <section id="why-iconic" className="relative section-padding overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 bg-navy">
        <OptimizedImage
          src="/images/mountain-sourcing.png"
          alt=""
          fill
          aria-hidden
          sizes="100vw"
          className="object-cover opacity-20"
          wrapperClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/95 to-navy" />
      </div>

      <div className="relative mx-auto max-w-7xl text-white">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-accent">
            Why Choose Iconic
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            The Iconic Difference
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ocean-200/80 sm:text-lg">
            Every bottle represents our unwavering commitment to quality, sustainability,
            and the purest hydration experience.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 shadow-glass-lg"
              >
                {/* Card background image */}
                <OptimizedImage
                  src={feature.image}
                  alt=""
                  fill
                  aria-hidden
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  wrapperClassName="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40 transition-opacity group-hover:via-navy/70" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-7">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md transition-colors group-hover:bg-cyan-accent/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ocean-200/80">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

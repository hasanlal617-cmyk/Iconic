"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, Droplets, Mountain, Sparkles, CheckCircle2 } from "lucide-react";
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
    transition: { duration: 0.6 },
  },
};

export default function Features() {
  return (
    <section id="why-iconic" className="relative section-padding overflow-hidden bg-navy">
      {/* Mountain background texture */}
      <div className="absolute inset-0 -z-10">
        <OptimizedImage
          src="/images/mountain-sourcing.png"
          alt=""
          fill
          aria-hidden
          sizes="100vw"
          className="object-cover opacity-15"
          wrapperClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-pill shadow-glow">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            <span>Pillars of Excellence</span>
          </div>
          <h2 className="section-heading mt-4">
            The Iconic{" "}
            <span className="font-serif italic font-normal text-gradient-cyan">
              Distinction.
            </span>
          </h2>
          <p className="section-subheading mx-auto">
            Every bottle is an uncompromised convergence of ancient geological purity, zero plastic footprint, and modern ecological responsibility.
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
                whileHover={{ y: -8 }}
                className="group relative min-h-[340px] overflow-hidden rounded-3xl border border-white/15 bg-navy-card/80 shadow-glass-lg backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-glow"
              >
                {/* Background image preview on hover */}
                <OptimizedImage
                  src={feature.image}
                  alt=""
                  fill
                  aria-hidden
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover opacity-20 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-35"
                  wrapperClassName="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/30" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-7 sm:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 backdrop-blur-md transition-all duration-300 group-hover:bg-cyan-400 group-hover:text-navy group-hover:scale-110 shadow-glow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{feature.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
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

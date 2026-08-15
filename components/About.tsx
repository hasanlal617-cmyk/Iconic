"use client";

import { motion } from "framer-motion";
import { Shield, Leaf, Sparkles, Award } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { aboutHighlights } from "@/lib/data";
import { images } from "@/lib/images";

const icons = [Shield, Leaf, Sparkles, Award];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — hero image with floating stats card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-glass-lg sm:aspect-[5/6]">
              <OptimizedImage
                src={images.about.source}
                alt="Pristine alpine spring water source in the mountains"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-accent">
                      Our Promise
                    </p>
                    <p className="text-xl font-bold text-white sm:text-2xl">
                      Purity in Every Drop
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-4 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/40 bg-white/90 p-5 shadow-glass-lg backdrop-blur-xl sm:-right-8"
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "7", label: "Stage Filtration" },
                  { value: "0", label: "Artificial Additives" },
                  { value: "100%", label: "Recyclable" },
                  { value: "24/7", label: "Quality Monitoring" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-ocean-50/80 p-3 text-center"
                  >
                    <p className="text-xl font-bold text-ocean-700">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-ocean-600/80 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:pt-8"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-ocean-600">
              About Us
            </p>
            <h2 className="section-heading mt-2">
              Crafted for Those Who Demand More
            </h2>
            <p className="section-subheading">
              From untouched sourcing to sustainable packaging, every detail reflects
              our commitment to premium hydration and environmental responsibility.
            </p>

            <motion.div
              className="mt-10 grid gap-6 sm:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {aboutHighlights.map((item, index) => {
                const Icon = icons[index];
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    className="group rounded-xl border border-ocean-100 bg-white p-5 transition-all hover:border-ocean-200 hover:shadow-glass"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-ocean-100 text-ocean-700 transition-colors group-hover:bg-ocean-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm text-ocean-800/70">{item.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

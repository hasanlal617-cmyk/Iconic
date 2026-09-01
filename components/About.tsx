"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Leaf, Sparkles, Award, CheckCircle2, XCircle, Droplets, ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { aboutHighlights } from "@/lib/data";
import { images } from "@/lib/images";

const icons = [Shield, Leaf, Sparkles, Award];

const comparisonData = [
  { metric: "Source Origin", iconic: "Protected High Alpine Glacier (3,000m)", standard: "Municipal Tap / Lowland Wells", tap: "Local City Reservoir" },
  { metric: "Filtration Method", iconic: "15-Year Granite Rock (Natural)", standard: "Chemical Microfiltration / RO Stripped", tap: "Chlorine & Chemical Treatment" },
  { metric: "Microplastics & Leaching", iconic: "0.00% (Glass & Artisan Packaging)", standard: "High risk from PET / heat exposure", tap: "Aging Pipe Contaminants" },
  { metric: "pH Balance", iconic: "7.4 Physiological Alkaline", standard: "5.5 - 6.5 Acidic / Stripped", tap: "Varies (6.5 - 8.5)" },
  { metric: "Bioavailable Electrolytes", iconic: "Natural Calcium, Magnesium, Silica", standard: "Synthetically Added / Nil", standardTap: "Nil", tap: "Inconsistent" },
];

export default function About() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="about" className="section-padding bg-navy relative overflow-hidden">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-ocean-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left Column: Visual with Glass Card Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-glass-lg sm:aspect-[5/6]">
              <OptimizedImage
                src={images.about.source}
                alt="Pristine alpine spring water source in the mountains"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
                wrapperClassName="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-xl shadow-glow">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                      Our Living Standard
                    </p>
                    <p className="font-display text-xl font-bold text-white sm:text-2xl">
                      Purity Without Compromise
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
              className="absolute -bottom-6 -right-4 w-[calc(100%-2rem)] max-w-sm rounded-3xl border border-white/15 bg-navy-card/90 p-5 shadow-glass-lg backdrop-blur-2xl sm:-right-8"
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "15 Yrs", label: "Rock Filtration" },
                  { value: "0.00%", label: "Microplastics" },
                  { value: "100%", label: "Artisan Glass" },
                  { value: "pH 7.4", label: "Perfect Balance" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center transition-colors hover:border-cyan-500/30 hover:bg-cyan-500/10"
                  >
                    <p className="font-display text-xl font-black text-white">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-300/80 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Narrative & Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:pt-4"
          >
            <div className="glass-pill shadow-glow">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span>Haute Alpine Provenance</span>
            </div>

            <h2 className="section-heading mt-4">
              Crafted for Those Who{" "}
              <span className="font-serif italic font-normal text-gradient-cyan">
                Demand Perfection.
              </span>
            </h2>

            <p className="section-subheading">
              Born in pristine alpine heights and preserved through 15 years of natural geological filtration. Every bottle of Iconic represents an unwavering devotion to body vitality, environmental stewardship, and the purest taste on Earth.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {aboutHighlights.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div
                    key={item.title}
                    className="glass-card-hover p-5 border-white/10 group"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/20 text-cyan-300 transition-all group-hover:scale-105 group-hover:bg-cyan-400 group-hover:text-navy">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-bold text-white text-base">{item.title}</h3>
                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Toggle Water Comparison Modal/Drawer */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowComparison(!showComparison)}
                className="btn-secondary text-xs py-2.5 px-5"
              >
                <span>{showComparison ? "Hide Comparison Matrix" : "View Pure Water Comparison Matrix"}</span>
                <ArrowRight className="h-3.5 w-3.5 text-cyan-400" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Dynamic Comparison Matrix */}
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-16 overflow-hidden rounded-3xl border border-white/15 bg-navy-card/95 p-6 sm:p-10 shadow-glass-lg backdrop-blur-2xl"
          >
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="glass-pill text-[10px] text-cyan-300">Purity Benchmark</span>
              <h3 className="font-display text-2xl font-bold text-white mt-2">
                Why Iconic Stands in a Class of Its Own
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-4 px-4">Standard</th>
                    <th className="py-4 px-4 text-cyan-300">✦ Iconic Alpine Spring</th>
                    <th className="py-4 px-4">Standard Bottled (PET)</th>
                    <th className="py-4 px-4">Municipal Tap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {comparisonData.map((row) => (
                    <tr key={row.metric} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-semibold text-white">{row.metric}</td>
                      <td className="py-4 px-4 font-bold text-cyan-300 bg-cyan-500/[0.08] rounded-xl">{row.iconic}</td>
                      <td className="py-4 px-4 text-slate-400">{row.standard}</td>
                      <td className="py-4 px-4 text-slate-400">{row.tap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Utensils, Wine, Award, Droplets, Check, Compass } from "lucide-react";

interface Pairing {
  title: string;
  category: string;
  notes: string;
  temperature: string;
  tag: string;
}

const pairings: Pairing[] = [
  {
    title: "Fine Caviar & Fresh Oysters",
    category: "Seafood & Raw Bar",
    notes: "The natural low-sodium mineral profile (180 mg/L TDS) provides an immaculate palate rinse, allowing the briny sweetness and umami of royal oscietra to peak.",
    temperature: "8°C – 10°C",
    tag: "Michelin Pairing",
  },
  {
    title: "A5 Wagyu & Prime Cuts",
    category: "High-Gastronomy Meats",
    notes: "Optimal pH 7.4 alkalinity harmonizes with rich intramuscular fats, clearing the palate between courses with zero metallic residue.",
    temperature: "10°C – 12°C",
    tag: "Gastronomy Select",
  },
  {
    title: "Artisanal Single-Origin Coffee",
    category: "Specialty Extraction",
    notes: "Balanced 68 mg/L calcium to 24 mg/L magnesium ratio unlocks pristine floral notes and sweet acidity without astringency.",
    temperature: "92°C Brew Temp",
    tag: "Barista Standard",
  },
  {
    title: "Grand Cru Burgundies & Bordeaux",
    category: "Fine Wine Companion",
    notes: "Sommeliers select Iconic as the neutral, velvet water companion that refreshes taste receptors without altering delicate tannin structures.",
    temperature: "12°C Cellar Temp",
    tag: "Sommelier Choice",
  },
];

export default function TasteProfile() {
  const [activePairing, setActivePairing] = useState(0);

  return (
    <section id="tasting" className="section-padding relative overflow-hidden bg-navy-light/60 border-y border-white/10">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 h-[500px] w-[500px] rounded-full bg-ocean-600/15 blur-[140px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-pill shadow-glow">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            <span>Haute Sommelier Profile</span>
          </div>
          <h2 className="section-heading mt-4">
            The Sensory Art of{" "}
            <span className="font-serif italic font-normal text-gradient-cyan">
              Pure Water.
            </span>
          </h2>
          <p className="section-subheading mx-auto">
            Not all water is created equal. Iconic features a delicate, velvety mouthfeel with a silky crisp finish, recognized by world-class sommeliers and Michelin-starred tables.
          </p>
        </motion.div>

        {/* Sensory Metrics Radar / Breakdown */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Sensory Tasting Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Palate Analysis
                </span>
                <span className="glass-pill bg-cyan-500/20 text-cyan-200 border-cyan-400/40 text-[10px]">
                  TDS 180 mg/L (Light Mineral)
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mt-4">
                Tasting Characteristics
              </h3>

              <div className="mt-8 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                    <span>Crispness & Brightness</span>
                    <span className="text-cyan-300">96 / 100</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-cyan-400 to-ocean-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                    <span>Velvet Mouthfeel (Texture)</span>
                    <span className="text-cyan-300">98 / 100</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-cyan-400 to-ocean-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                    <span>Mineral Neutrality</span>
                    <span className="text-cyan-300">94 / 100</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-cyan-400 to-ocean-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                    <span>Aftertaste Cleanliness</span>
                    <span className="text-cyan-300">99 / 100</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-cyan-400 to-ocean-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-cyan-400" /> International Taste Institute Grand Gold</span>
              <span className="font-mono text-cyan-300">pH 7.4</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Gastronomy & Wine Pairing Guide */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Sommelier Pairing Guide
                </span>
                <span className="text-xs font-mono text-slate-400">
                  0{activePairing + 1} / 0{pairings.length}
                </span>
              </div>

              {/* Pairing Selector Tabs */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {pairings.map((p, idx) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setActivePairing(idx)}
                    className={`rounded-2xl p-3 text-left transition-all duration-300 ${
                      activePairing === idx
                        ? "bg-cyan-500/20 border border-cyan-400/50 shadow-glow"
                        : "bg-white/[0.04] border border-white/10 hover:bg-white/[0.08]"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300/80">
                      Option 0{idx + 1}
                    </p>
                    <p className="text-xs font-bold text-white mt-1 line-clamp-1">
                      {p.category}
                    </p>
                  </button>
                ))}
              </div>

              {/* Active Pairing Card Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePairing}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="glass-pill bg-cyan-500/10 text-cyan-300 text-[10px]">
                      {pairings[activePairing].tag}
                    </span>
                    <span className="text-xs font-mono text-cyan-300">
                      Ideal Serving: {pairings[activePairing].temperature}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl font-bold text-white mt-4">
                    {pairings[activePairing].title}
                  </h4>

                  <p className="mt-3 text-slate-300 leading-relaxed text-sm sm:text-base">
                    {pairings[activePairing].notes}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-cyan-400" /> Unaltered Natural Mineral Structure</span>
                    <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-cyan-400" /> Crystal Glass Decanter Ready</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Are you a fine dining establishment or hospitality group?
              </span>
              <a
                href="#contact"
                className="btn-primary text-xs py-2.5 px-5"
              >
                <span>Request Sommelier Sample Box</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

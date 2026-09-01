"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Sparkles, Shield, Droplets, ArrowUpRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { products } from "@/lib/data";

export default function Products() {
  const [activeId, setActiveId] = useState(products[0].id);
  const activeProduct = products.find((p) => p.id === activeId) ?? products[0];

  return (
    <section id="products" className="section-padding bg-navy-light/40 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />

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
            <span>The Iconic Portfolio</span>
          </div>
          <h2 className="section-heading mt-4">
            Curated Formats for{" "}
            <span className="font-serif italic font-normal text-gradient-cyan">
              Every Occasion.
            </span>
          </h2>
          <p className="section-subheading mx-auto">
            From sleek on-the-go hydration to bespoke artisan glass for Michelin tables and executive corporate allocations.
          </p>
        </motion.div>

        {/* Product selector tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveId(product.id)}
              className={`rounded-full px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeId === product.id
                  ? "bg-gradient-to-r from-cyan-500 to-ocean-600 text-white shadow-glow border border-cyan-400/40"
                  : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-400/30 hover:bg-white/[0.08]"
              }`}
            >
              {product.name}
            </button>
          ))}
        </div>

        {/* Active product detail spotlight card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-10 max-w-5xl"
          >
            <div className="glass-card overflow-hidden border-white/15">
              <div className="grid md:grid-cols-2">
                
                {/* Product image stage */}
                <div className="relative aspect-square bg-gradient-to-br from-white/[0.03] to-cyan-500/10 md:aspect-auto md:min-h-[500px] flex items-center justify-center p-8">
                  {activeProduct.highlight && (
                    <span className="absolute left-6 top-6 z-10 glass-pill bg-cyan-500/20 text-cyan-200 border-cyan-400/40 text-[10px]">
                      {activeProduct.highlight}
                    </span>
                  )}

                  {/* Halo glow */}
                  <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />

                  <OptimizedImage
                    src={activeProduct.image}
                    alt={`${activeProduct.name} — Iconic mineral water`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-8 drop-shadow-[0_20px_40px_rgba(14,165,233,0.4)]"
                    wrapperClassName="relative h-full w-full max-w-[320px] max-h-[420px]"
                  />
                </div>

                {/* Specs & Details */}
                <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                      Alpine Specification
                    </span>
                    <h3 className="font-display text-3xl font-bold text-white mt-1">
                      {activeProduct.name}
                    </h3>
                    <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                      {activeProduct.description}
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                          Format Capacity
                        </p>
                        <p className="font-display text-xl font-bold text-white mt-0.5">
                          {activeProduct.size}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                          Alkaline pH
                        </p>
                        <p className="font-display text-xl font-bold text-white mt-0.5">
                          {activeProduct.ph} pH
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                        Electrolyte & Mineral Matrix
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {activeProduct.minerals.map((mineral) => (
                          <li
                            key={mineral}
                            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold text-cyan-200"
                          >
                            <Check className="h-3 w-3 text-cyan-400" />
                            {mineral}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10 flex items-center gap-4">
                    <a
                      href="#contact"
                      className="btn-primary group"
                    >
                      <span>Request Allocation</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 4 Product Grid Cards */}
        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.button
              key={product.id}
              type="button"
              onClick={() => setActiveId(product.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group overflow-hidden rounded-3xl border text-left transition-all duration-300 ${
                activeId === product.id
                  ? "border-cyan-400 bg-navy-card/95 shadow-glow ring-1 ring-cyan-400/40"
                  : "border-white/10 bg-navy-card/70 hover:border-cyan-500/30 hover:bg-navy-card/90"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.02] p-4 flex items-center justify-center">
                <OptimizedImage
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                  wrapperClassName="h-full w-full"
                />
                {product.highlight && (
                  <span className="absolute left-3 top-3 rounded-full bg-cyan-500/30 border border-cyan-400/40 px-2.5 py-0.5 text-[9px] font-bold text-cyan-200 uppercase tracking-wider">
                    {product.highlight}
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-bold text-white">{product.size}</p>
                <p className="mt-0.5 text-xs text-slate-400">{product.name}</p>
                <p className="mt-2 text-xs font-mono text-cyan-400">
                  pH {product.ph} • Natural Electrolytes
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

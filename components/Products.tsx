"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { products } from "@/lib/data";

export default function Products() {
  const [activeId, setActiveId] = useState(products[0].id);
  const activeProduct = products.find((p) => p.id === activeId) ?? products[0];

  return (
    <section id="products" className="section-padding bg-gradient-to-b from-ocean-50/50 to-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-ocean-600">
            Our Collection
          </p>
          <h2 className="section-heading mx-auto mt-2">Product Showcase</h2>
          <p className="section-subheading mx-auto">
            Choose the perfect size for every moment — from daily hydration to
            premium events and bulk corporate orders.
          </p>
        </motion.div>

        {/* Product selector tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveId(product.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeId === product.id
                  ? "bg-ocean-600 text-white shadow-lg shadow-ocean-600/25"
                  : "border border-ocean-200 bg-white text-ocean-700 hover:border-ocean-300"
              }`}
            >
              {product.name}
            </button>
          ))}
        </div>

        {/* Active product detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-10 max-w-5xl"
          >
            <div className="overflow-hidden rounded-3xl border border-ocean-100 bg-white shadow-glass-lg">
              <div className="grid md:grid-cols-2">
                {/* Product image */}
                <div className="relative aspect-square bg-gradient-to-br from-ocean-50 to-ocean-100/50 md:aspect-auto md:min-h-[480px]">
                  {activeProduct.highlight && (
                    <span className="absolute left-5 top-5 z-10 rounded-full bg-ocean-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                      {activeProduct.highlight}
                    </span>
                  )}
                  <OptimizedImage
                    src={activeProduct.image}
                    alt={`${activeProduct.name} — Iconic mineral water`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center p-6"
                    wrapperClassName="absolute inset-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean-900/10 via-transparent to-transparent" />
                </div>

                {/* Specs */}
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                  <h3 className="text-2xl font-bold text-navy sm:text-3xl">
                    {activeProduct.name}
                  </h3>
                  <p className="mt-3 text-ocean-800/70 leading-relaxed">
                    {activeProduct.description}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-ocean-100 bg-ocean-50/50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-ocean-600">
                        Size
                      </p>
                      <p className="mt-1 text-lg font-bold text-navy">
                        {activeProduct.size}
                      </p>
                    </div>
                    <div className="rounded-xl border border-ocean-100 bg-ocean-50/50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-ocean-600">
                        pH Level
                      </p>
                      <p className="mt-1 text-lg font-bold text-navy">
                        {activeProduct.ph}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-ocean-600">
                      Mineral Content
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {activeProduct.minerals.map((mineral) => (
                        <li
                          key={mineral}
                          className="flex items-center gap-1.5 rounded-full bg-ocean-100 px-3 py-1.5 text-sm font-medium text-ocean-800"
                        >
                          <Check className="h-3.5 w-3.5 text-ocean-600" />
                          {mineral}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a href="#contact" className="btn-primary mt-8 group inline-flex w-fit">
                    Request Quote
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Product grid cards with thumbnails */}
        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
              whileHover={{ y: -4 }}
              className={`group overflow-hidden rounded-2xl border text-left transition-all ${
                activeId === product.id
                  ? "border-ocean-400 shadow-glass-lg ring-2 ring-ocean-400/30"
                  : "border-ocean-100 bg-white hover:border-ocean-200 hover:shadow-glass"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ocean-50">
                <OptimizedImage
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  wrapperClassName="h-full w-full"
                />
                {product.highlight && (
                  <span className="absolute left-3 top-3 rounded-full bg-ocean-600 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                    {product.highlight}
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-lg font-bold text-navy">{product.size}</p>
                <p className="mt-0.5 text-sm text-ocean-700/70">{product.name}</p>
                <p className="mt-2 text-xs font-medium text-ocean-600">
                  pH {product.ph}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

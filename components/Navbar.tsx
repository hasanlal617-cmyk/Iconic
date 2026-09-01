"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Droplets, Sparkles, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Determine active section for nav highlight
      const sections = ["intro", "about", "tasting", "products", "why-iconic", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 transition-all duration-500">
      <div
        className={`mx-auto max-w-7xl rounded-full transition-all duration-500 ${
          scrolled
            ? "border border-white/15 bg-navy-card/85 shadow-glass-lg backdrop-blur-2xl px-5 py-3"
            : "border border-white/10 bg-navy/40 backdrop-blur-md px-6 py-3.5"
        }`}
      >
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-ocean-600 to-cyan-400 p-[1px] shadow-glow transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-navy-card">
                <Droplets className="h-5 w-5 text-cyan-300 transition-colors group-hover:text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-black tracking-wider text-white uppercase group-hover:text-cyan-200 transition-colors">
                Iconic
              </span>
              <span className="text-[9px] font-semibold tracking-[0.25em] text-cyan-400/80 uppercase -mt-1">
                Haute Alpine
              </span>
            </div>
          </a>

          {/* Desktop nav items */}
          <ul className="hidden items-center gap-1 lg:gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-md md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                      isActive
                        ? "text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 shadow-sm"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Action CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#tasting"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300/90 hover:text-cyan-200 transition-colors px-3 py-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Sommelier Notes
            </a>

            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-ocean-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-glow-lg hover:from-cyan-400 hover:to-ocean-500"
            >
              <span>Request Quote</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="rounded-xl border border-white/15 bg-white/[0.06] p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/10 pt-4 md:hidden"
            >
              <ul className="flex flex-col gap-2 pb-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href="#contact"
                    className="btn-primary w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Request Concierge Allocation
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

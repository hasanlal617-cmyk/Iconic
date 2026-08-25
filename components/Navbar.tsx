"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Droplets } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ocean-100/30 bg-white/85 shadow-glass backdrop-blur-xl"
          : "bg-navy/40 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-ocean-600 to-cyan-500 shadow-lg shadow-cyan-500/25 transition-transform group-hover:scale-105">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-navy" : "text-white"}`}>
            Iconic
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-ocean-900/80 hover:text-ocean-600"
                    : "text-white/80 hover:text-cyan-accent"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={`hidden md:inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-md ${
            scrolled
              ? "bg-ocean-600 text-white hover:bg-ocean-700 shadow-ocean-600/20"
              : "bg-gradient-to-r from-cyan-500 to-ocean-600 text-white hover:brightness-110 shadow-cyan-500/30"
          }`}
        >
          Get a Quote
        </a>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`rounded-lg p-2 transition-colors md:hidden ${
            scrolled ? "text-ocean-800" : "text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/20 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-ocean-800 hover:bg-ocean-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  className="btn-primary w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Get a Quote
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

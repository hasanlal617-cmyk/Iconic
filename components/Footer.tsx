"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { navLinks } from "@/lib/data";

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Facebook, label: "Facebook" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [swissTime, setSwissTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const time = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Zurich",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setSwissTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-navy border-t border-white/10 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-cyan-500/5 blur-[160px]" />

      {/* Newsletter VIP band */}
      <div className="border-b border-white/10 relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="text-center lg:text-left">
              <span className="glass-pill text-[10px] text-cyan-300">
                <Sparkles className="h-3 w-3" />
                Iconic Private Registry
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white mt-3">
                Join the Haute Hydration Circle
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-md">
                Receive private reserve allocation notifications, sommelier pairings, and seasonal vintage releases.
              </p>
            </div>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card px-6 py-4 border-cyan-400/40 text-cyan-300 flex items-center gap-3"
              >
                <Sparkles className="h-5 w-5 text-cyan-300" />
                <span className="text-sm font-bold">You are enrolled in the Iconic Private Registry.</span>
              </motion.div>
            ) : (
              <form
                onSubmit={handleNewsletter}
                className="flex w-full max-w-md gap-2"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your VIP email"
                    required
                    className="w-full rounded-full border border-white/15 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary shrink-0 py-3.5 px-6 text-xs"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-ocean-600 to-cyan-400 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-navy-card">
                  <Droplets className="h-5 w-5 text-cyan-300" />
                </div>
              </div>
              <span className="font-display text-xl font-black tracking-wider text-white uppercase">
                Iconic
              </span>
            </a>

            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
              Sourced from 3,000m glacial heights in the high Swiss Alps. 15-year granite rock filtration. Bottled at source exclusively in infinitely recyclable glass.
            </p>

            {/* Swiss Timezone Clock */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono text-cyan-300">
              <Clock className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>Alpine Source (ZRH): {swissTime || "12:00:00"}</span>
            </div>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/20 hover:text-cyan-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Provenance
            </h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Formats */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Collection
            </h4>
            <ul className="mt-4 space-y-3">
              {["500ml Alpine Classic", "1L Everyday Vitality", "750ml Artisan Glass", "Bulk Hospitality Cask"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#products"
                      className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Concierge Desk
            </h4>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-2.5 text-xs text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                <span>Via Glacier 4, 7500 St. Moritz, Switzerland</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-cyan-400" />
                <span>+41 (0)22 555 4266</span>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-cyan-400" />
                <span>concierge@iconicwater.ch</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Iconic Haute Alpine Water AG. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Allocation", "Sustainability Report"].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors hover:text-cyan-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

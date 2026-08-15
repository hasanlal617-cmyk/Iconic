"use client";

import { useState, FormEvent } from "react";
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
} from "lucide-react";
import { navLinks } from "@/lib/data";

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-navy text-white">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold">Stay Hydrated with Iconic</h3>
              <p className="mt-2 text-sm text-ocean-200/70">
                Subscribe for product updates, wellness tips, and exclusive offers.
              </p>
            </div>

            {subscribed ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium text-cyan-accent"
              >
                ✓ You&apos;re subscribed. Welcome to Iconic!
              </motion.p>
            ) : (
              <form
                onSubmit={handleNewsletter}
                className="flex w-full max-w-md gap-2"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ocean-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-ocean-400 focus:border-cyan-accent focus:outline-none focus:ring-2 focus:ring-cyan-accent/20"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-ocean-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-500"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-600">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Iconic</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ocean-200/60">
              Premium mineral water sourced with the highest quality standards.
              Pure, crisp, and sustainably crafted.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ocean-300 transition-colors hover:border-cyan-accent hover:text-cyan-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ocean-200">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ocean-200/60 transition-colors hover:text-cyan-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ocean-200">
              Products
            </h4>
            <ul className="mt-4 space-y-3">
              {["500ml Classic", "1L Everyday", "Glass Edition", "Bulk Orders"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#products"
                      className="text-sm text-ocean-200/60 transition-colors hover:text-cyan-accent"
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
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ocean-200">
              Contact
            </h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3 text-sm text-ocean-200/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ocean-400" />
                123 Alpine Springs Way, CO 80424
              </li>
              <li className="flex items-center gap-3 text-sm text-ocean-200/60">
                <Phone className="h-4 w-4 shrink-0 text-ocean-400" />
                +1 (800) 555-ICONIC
              </li>
              <li className="flex items-center gap-3 text-sm text-ocean-200/60">
                <Mail className="h-4 w-4 shrink-0 text-ocean-400" />
                hello@iconicwater.com
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-ocean-200/50">
            © {new Date().getFullYear()} Iconic Mineral Water. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-ocean-200/50 transition-colors hover:text-ocean-200"
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

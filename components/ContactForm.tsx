"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Building2, Users, Calendar, Sparkles, CheckCircle2, Shield, ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { images } from "@/lib/images";

type InquiryType = "distributor" | "corporate" | "events" | "hospitality";

const inquiryTypes: { id: InquiryType; label: string; icon: typeof Building2 }[] = [
  { id: "corporate", label: "Corporate HQ", icon: Users },
  { id: "hospitality", label: "Michelin & Luxury Hotel", icon: Sparkles },
  { id: "events", label: "Private Galas & Events", icon: Calendar },
  { id: "distributor", label: "Global Distribution", icon: Building2 },
];

export default function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("corporate");
  const [volume, setVolume] = useState("1000-5000");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-navy-light/70 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left: Info & Distribution Capabilities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="glass-pill shadow-glow">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                <span>Concierge & Private Allocation</span>
              </div>
              <h2 className="section-heading mt-4">
                Partner With{" "}
                <span className="font-serif italic font-normal text-gradient-cyan">
                  Iconic.
                </span>
              </h2>
              <p className="section-subheading">
                Whether you are curating a 5-star hospitality guest experience, stocking an executive boardroom, or orchestrating a premier private gala, our concierge desk tailors private allocations.
              </p>

              {/* Distribution visual */}
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 shadow-glass-lg">
                <OptimizedImage
                  src={images.contact.distribution}
                  alt="Iconic bulk water distribution and logistics"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  wrapperClassName="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                    White Glove Cold-Chain Logistics
                  </p>
                  <p className="font-display text-lg font-bold text-white mt-0.5">
                    Direct-From-Source Express Delivery Worldwide
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Bespoke Glass Etching & Co-Branding",
                    text: "Exclusive custom-etched glass bottles for luxury hospitality and private clubs.",
                  },
                  {
                    title: "Guaranteed Origin & Batch Authentication",
                    text: "Every consignment is numbered and tested by certified European water sommeliers.",
                  },
                  {
                    title: "Climate-Controlled Global Fulfillment",
                    text: "Temperature-regulated transit preserving crisp alpine purity without thermal shock.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5 glass-card-hover p-4 border-white/10">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-sm">{item.title}</p>
                      <p className="mt-0.5 text-xs text-slate-300">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Concierge Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card h-full p-8 sm:p-10 border-white/15">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center py-16 text-center"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-glow">
                    <Sparkles className="h-10 w-10 text-cyan-300" />
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-bold text-white">
                    Concierge Request Received
                  </h3>
                  <p className="mt-3 text-slate-300 max-w-sm text-sm">
                    Thank you. A dedicated Iconic allocation manager will review your requirements and reach out within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary mt-8 text-xs py-2 px-6"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-cyan-300">
                      Client Profile
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {inquiryTypes.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setInquiryType(id)}
                          className={`flex items-center gap-2.5 rounded-2xl border p-3 text-left transition-all duration-300 ${
                            inquiryType === id
                              ? "border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-glow"
                              : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0 text-cyan-400" />
                          <span className="text-xs font-bold leading-tight">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Lord Alexander Sterling"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Company / Establishment
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        placeholder="The Grand Alpine Resort"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Work Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="concierge@hotel.com"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                        Direct Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+41 22 555 0192"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="volume" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Estimated Monthly Volume / Allocation
                    </label>
                    <select
                      id="volume"
                      name="volume"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-navy-card px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                    >
                      <option value="500-1000" className="bg-navy-card">Sample Tasting Kit / 500 – 1,000 units</option>
                      <option value="1000-5000" className="bg-navy-card">Standard Allocation / 1,000 – 5,000 units</option>
                      <option value="5000+" className="bg-navy-card">Premier Enterprise / 5,000+ units</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Specific Requirements / Custom Branding
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Specify customized glass formats, delivery schedules, or special events..."
                      className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-colors"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full group">
                    <span>Submit Concierge Request</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

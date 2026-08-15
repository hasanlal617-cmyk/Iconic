"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Building2, Users, Calendar } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { images } from "@/lib/images";

type InquiryType = "distributor" | "corporate" | "events";

const inquiryTypes: { id: InquiryType; label: string; icon: typeof Building2 }[] = [
  { id: "distributor", label: "Distributor", icon: Building2 },
  { id: "corporate", label: "Corporate Client", icon: Users },
  { id: "events", label: "Event Planner", icon: Calendar },
];

export default function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("corporate");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-white to-ocean-50/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — info + image panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-ocean-600">
              Bulk & Distribution
            </p>
            <h2 className="section-heading mt-2">Partner With Iconic</h2>
            <p className="section-subheading">
              Whether you&apos;re a distributor, corporate buyer, or event planner,
              our team will craft a tailored quote for your hydration needs.
            </p>

            {/* Distribution image */}
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl shadow-glass-lg">
              <OptimizedImage
                src={images.contact.distribution}
                alt="Iconic bulk water distribution and logistics"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                wrapperClassName="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm font-medium text-white/90">
                  Trusted by 500+ corporate partners nationwide
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {[
                {
                  title: "Volume Discounts",
                  text: "Competitive pricing for orders of 500+ units.",
                },
                {
                  title: "Custom Branding",
                  text: "White-label and co-branded options for corporate clients.",
                },
                {
                  title: "Fast Fulfillment",
                  text: "Nationwide delivery with dedicated account support.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ocean-500" />
                  <div>
                    <p className="font-semibold text-navy">{item.title}</p>
                    <p className="mt-1 text-sm text-ocean-800/70">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card h-full p-8 sm:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ocean-100 text-ocean-600">
                    <Send className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-navy">Thank You!</h3>
                  <p className="mt-2 text-ocean-800/70">
                    Our sales team will reach out within 24 hours with your custom quote.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-navy">
                      I am a...
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {inquiryTypes.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setInquiryType(id)}
                          className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all sm:text-sm ${
                            inquiryType === id
                              ? "border-ocean-500 bg-ocean-50 text-ocean-700"
                              : "border-ocean-100 text-ocean-700/70 hover:border-ocean-200"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Smith"
                        className="w-full rounded-xl border border-ocean-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-ocean-400 focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-navy">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        placeholder="Acme Corp"
                        className="w-full rounded-xl border border-ocean-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-ocean-400 focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full rounded-xl border border-ocean-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-ocean-400 focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-ocean-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-ocean-400 focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="volume" className="mb-1.5 block text-sm font-medium text-navy">
                      Estimated Volume
                    </label>
                    <select
                      id="volume"
                      name="volume"
                      className="w-full rounded-xl border border-ocean-200 bg-white px-4 py-3 text-sm text-navy focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                    >
                      <option value="500-1000">500 – 1,000 units</option>
                      <option value="1000-5000">1,000 – 5,000 units</option>
                      <option value="5000+">5,000+ units</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="w-full resize-none rounded-xl border border-ocean-200 bg-white px-4 py-3 text-sm text-navy placeholder:text-ocean-400 focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full group">
                    Request Quote
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

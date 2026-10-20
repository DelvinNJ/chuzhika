"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Mobile App",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Listen for prefill events triggered by interactive ProjectBuilder
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; projectType?: string }>;
      if (customEvent.detail) {
        setFormData((prev) => ({
          ...prev,
          message: customEvent.detail.message || prev.message,
          projectType: customEvent.detail.projectType || prev.projectType,
        }));
      }
    };

    window.addEventListener("prefill-contact", handlePrefill);
    return () => window.removeEventListener("prefill-contact", handlePrefill);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields before transmitting.");
      return;
    }

    if (!formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      /*
        BACKEND INTEGRATION POINT:
        To connect to an API route, replace this mock promise with:
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to submit");
      */
      await new Promise((resolve) => setTimeout(resolve, 1400));

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        projectType: "Mobile App",
        message: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("Transmission failed. Please email directly at hello@chuzhika.dev");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-32 bg-[#06060c] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
          </div>
          <span className="text-xs uppercase font-mono tracking-widest text-violet-400">
            [ 06 // INITIALIZE COLLABORATION ]
          </span>
          <div className="h-[1px] w-12 bg-violet-500/30" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                Let&apos;s architect <span className="text-[#8b5cf6]">what&apos;s next</span> with{" "}
                <span className="text-[#8b5cf6]">surgical precision.</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Have a <span className="text-[#06b6d4] font-medium">mobile app to build</span> or a{" "}
                <span className="text-[#10b981] font-medium">web ecosystem to scale</span>? I partner with forward-thinking teams to engineer production-ready digital products with{" "}
                <span className="text-[#8b5cf6] font-medium">uncompromising speed</span> and{" "}
                <span className="text-[#f59e0b] font-medium">visual luxury</span>.
              </p>
            </div>

            {/* Availability Pill with Emerald Glow */}
            <div className="glass-card p-5 rounded-2xl border border-white/[0.08] flex items-center gap-4 hover:border-[#10b981]/50 transition-colors">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10b981] shadow-[0_0_10px_#10b981]" />
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#10b981] block font-semibold">
                  Status: Available for Q3/Q4
                </span>
                <span className="text-xs text-zinc-400">
                  Accepting selected client builds & contracts
                </span>
              </div>
            </div>

            {/* Direct Channel Cards */}
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-2xl glass-panel border border-white/[0.06] hover:border-[#8b5cf6]/40 flex items-center justify-between transition-colors">
                <div>
                  <span className="text-[11px] font-mono uppercase text-zinc-500 block">Direct Email</span>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                    className="text-sm font-mono text-white hover:text-[#06b6d4] transition-colors"
                    data-cursor-hover
                  >
                    {PORTFOLIO_DATA.profile.email}
                  </a>
                </div>
                <span className="text-xs font-mono text-[#f59e0b] px-2 py-0.5 rounded bg-[#f59e0b]/10 border border-[#f59e0b]/20">
                  &lt; 24h SLA
                </span>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-white/[0.06] hover:border-[#06b6d4]/40 flex items-center justify-between transition-colors">
                <div>
                  <span className="text-[11px] font-mono uppercase text-zinc-500 block">Location & Zone</span>
                  <span className="text-sm text-zinc-200">{PORTFOLIO_DATA.profile.location}</span>
                </div>
                <span className="text-xs font-mono text-[#06b6d4]">UTC / Worldwide</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-3">
                Social Networks & Code Repositories
              </span>
              <div className="flex flex-wrap gap-2.5">
                {PORTFOLIO_DATA.socials.map((social) => (
                  <MagneticButton
                    key={social.name}
                    as="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-violet-600/20 border border-white/[0.08] hover:border-violet-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                  >
                    {social.name}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-2">
                Send a Dispatch
              </h3>
              <p className="text-xs text-zinc-400 mb-8 font-mono">
                Fill in the details below. All inquiries receive an executive response within 24 hours.
              </p>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white">Transmission Delivered</h4>
                    <p className="text-sm text-zinc-400 max-w-sm">
                      Thank you for reaching out. Your project specifications have been logged and I will review them promptly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-4 px-6 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono uppercase tracking-wider text-zinc-300 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Error Banner */}
                    {status === "error" && errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-mono">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                          Your Name <span className="text-violet-400">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Vance"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-violet-500/80 focus:bg-white/[0.06] text-sm text-white placeholder-zinc-600 outline-none transition-all"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                          Email Address <span className="text-violet-400">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-violet-500/80 focus:bg-white/[0.06] text-sm text-white placeholder-zinc-600 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Project Category */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="projectType" className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Primary Scope
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#0d0d18] border border-white/[0.08] focus:border-violet-500/80 text-sm text-zinc-200 outline-none transition-all cursor-pointer"
                      >
                        <option value="Mobile App">Mobile Application (iOS / Android)</option>
                        <option value="Web App">Modern Web Application (Next.js / React)</option>
                        <option value="Full Stack">Full Stack Ecosystem (Mobile + Web + API)</option>
                        <option value="UI/UX System">Design System & Kinetic UI Engineering</option>
                        <option value="Consulting">Technical Architecture & Code Audit</option>
                      </select>
                    </div>

                    {/* Message Area */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Project Blueprint & Requirements <span className="text-violet-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your product, timeline, goals, and any technical constraints..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-violet-500/80 focus:bg-white/[0.06] text-sm text-white placeholder-zinc-600 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <MagneticButton
                      as="button"
                      onClick={() => {}}
                      className="w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all flex items-center justify-center gap-2 border border-violet-400/30"
                    >
                      {status === "submitting" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Encrypting & Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </MagneticButton>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

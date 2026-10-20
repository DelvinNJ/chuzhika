"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { PORTFOLIO_DATA, ServiceItem } from "@/data/portfolio";

function getServiceIcon(type: ServiceItem["icon"]) {
  switch (type) {
    case "mobile":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case "web":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "design":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      );
    case "backend":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      );
  }
}

const SERVICE_THEMES: Record<string, { accent: string; rgb: string; tag: string }> = {
  "01": { accent: "#8b5cf6", rgb: "139, 92, 246", tag: "NATIVE MOBILE" },
  "02": { accent: "#06b6d4", rgb: "6, 182, 212", tag: "MODERN WEB" },
  "03": { accent: "#10b981", rgb: "16, 185, 129", tag: "KINETIC UI/UX" },
  "04": { accent: "#f59e0b", rgb: "245, 158, 11", tag: "EDGE INFRA" },
};

export default function Services() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="services"
      className="relative py-32 bg-[#05050a] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background glow elements */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Tag & Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 mr-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
              </div>
              <span className="text-xs uppercase font-mono tracking-widest text-violet-400">
                [ 02 // CAPABILITIES & SERVICES ]
              </span>
              <div className="h-[1px] w-12 bg-violet-500/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              End-to-end craft from <span className="text-[#8b5cf6]">concept</span> to{" "}
              <span className="text-[#06b6d4]">production</span> <span className="text-[#10b981]">speed.</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Specialized engineering services tailored for visionary tech companies, funded startups, and brands requiring <span className="text-[#8b5cf6]">native mobile speed</span> and <span className="text-[#06b6d4]">web elegance</span>.
          </p>
        </div>

        {/* Staggered Services Grid with 4 Quad-Accent Themes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {PORTFOLIO_DATA.services.map((service) => {
            const theme = SERVICE_THEMES[service.number] || SERVICE_THEMES["01"];

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="glass-card p-8 sm:p-10 rounded-3xl border border-white/[0.08] relative group flex flex-col justify-between overflow-hidden transition-all duration-500"
                style={{
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.boxShadow = `0 0 35px rgba(${theme.rgb}, 0.2)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Corner Ambient Glow on hover */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    backgroundColor: `rgba(${theme.rgb}, 0.18)`,
                  }}
                />

                <div>
                  {/* Header with Number and Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="w-14 h-14 rounded-2xl bg-white/[0.04] border flex items-center justify-center transition-all shadow-inner"
                      style={{
                        borderColor: `rgba(${theme.rgb}, 0.3)`,
                        color: theme.accent,
                      }}
                    >
                      {getServiceIcon(service.icon)}
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                      <span className="text-[10px] px-2 py-0.5 rounded border text-zinc-400" style={{ borderColor: `rgba(${theme.rgb}, 0.3)` }}>
                        {theme.tag}
                      </span>
                      <span className="font-bold" style={{ color: theme.accent }}>
                        0{service.number}
                      </span>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-2xl font-bold text-white mb-2 transition-colors group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono mb-4" style={{ color: theme.accent }}>
                    {service.shortDesc}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables & Tech Tags */}
                <div className="pt-6 border-t border-white/[0.06] flex flex-col gap-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2.5">
                      Core Deliverables:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300 font-mono">
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: theme.accent }} />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                      Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.06] transition-colors"
                          style={{
                            boxShadow: "none",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

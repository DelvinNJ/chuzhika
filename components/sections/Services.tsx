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
              <span className="text-xs uppercase font-mono tracking-widest text-violet-400">
                [ 02 // CAPABILITIES & SERVICES ]
              </span>
              <div className="h-[1px] w-12 bg-violet-500/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              End-to-end craft from <span className="gradient-text">concept to store.</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Specialized engineering services tailored for visionary tech companies, funded startups, and brands requiring native mobile speed and web elegance.
          </p>
        </div>

        {/* Staggered Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {PORTFOLIO_DATA.services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="glass-card p-8 sm:p-10 rounded-3xl border border-white/[0.08] relative group flex flex-col justify-between overflow-hidden hover:border-violet-500/50 transition-all duration-500"
            >
              {/* Corner Ambient Glow on hover */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Header with Number and Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-violet-400 group-hover:text-cyan-300 group-hover:border-violet-500/40 group-hover:bg-violet-600/10 transition-all shadow-inner">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 group-hover:text-violet-400 transition-colors">
                    SERVICE // {service.number}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-violet-300/80 font-mono mb-4">
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
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400/80" />
                        <span>{item}</span>
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
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.06] group-hover:border-violet-500/30 group-hover:text-zinc-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

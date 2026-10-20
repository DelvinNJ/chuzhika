"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { getAssetPath } from "@/utils/paths";

function AnimatedCounter({
  target,
  suffix = "",
  accentColor = "#8b5cf6",
}: {
  target: number;
  suffix?: string;
  accentColor?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.floor(easeProgress * target);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono font-black text-4xl sm:text-5xl text-white tracking-tight">
      {count}
      <span style={{ color: accentColor }}>{suffix}</span>
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const STAT_ACCENTS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-[#06060c] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
          </div>
          <span className="text-xs uppercase font-mono tracking-widest text-violet-400">
            [ 01 // ABOUT THE ENGINEER ]
          </span>
          <div className="h-[1px] w-12 bg-violet-500/30" />
        </div>

        {/* Section Header with Colorful Spans */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Bridging <span className="text-[#8b5cf6]">high-performance native systems</span> with{" "}
              <span className="text-[#06b6d4]">interactive web luxury.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4 text-zinc-400 text-base leading-relaxed">
            <p>
              I am a specialized software engineer and digital architect focused on building{" "}
              <span className="text-[#8b5cf6] font-medium">mobile applications for iOS & Android</span> alongside immersive,{" "}
              <span className="text-[#06b6d4] font-medium">ultra-responsive web platforms</span>.
            </p>
            <p>
              My engineering philosophy revolves around{" "}
              <span className="text-[#10b981] font-medium">sub-millisecond interaction feedback</span>, deterministic typing, and{" "}
              <span className="text-[#f59e0b] font-medium">bespoke design systems</span> that feel as tactile as hardware.
            </p>
          </div>
        </div>

        {/* Parallax Image & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          {/* Parallax Image Card */}
          <div className="lg:col-span-6 relative">
            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden glass-card p-2 border border-white/10 group shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
                <Image
                  src={getAssetPath("/images/about-workspace.jpg")}
                  alt="Chuzhika developer workspace"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Glass Badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute top-6 left-6 px-4 py-2 rounded-xl glass-panel border border-violet-500/30 flex items-center gap-2.5 shadow-2xl backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_#06b6d4]" />
                <span className="text-xs font-mono text-zinc-200">
                  <span className="text-[#8b5cf6]">Mobile</span> + <span className="text-[#06b6d4]">Web</span> Architect
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-6 right-6 px-4 py-2.5 rounded-xl glass-panel border border-white/15 flex items-center gap-3 shadow-2xl backdrop-blur-md"
              >
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#8b5cf6] flex items-center justify-center text-[9px] font-bold text-white">RN</div>
                  <div className="w-5 h-5 rounded-full bg-[#06b6d4] flex items-center justify-center text-[9px] font-bold text-white">N16</div>
                  <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center text-[9px] font-bold text-white">TS</div>
                  <div className="w-5 h-5 rounded-full bg-[#f59e0b] flex items-center justify-center text-[9px] font-bold text-white">API</div>
                </div>
                <span className="text-xs font-mono text-zinc-300">Hardened Stack</span>
              </motion.div>
            </div>
          </div>

          {/* 4 Core Pillars Cycling Quad-Accent Colors */}
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-[#8b5cf6]/50 transition-colors">
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                <span className="text-[#8b5cf6] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">01</span>
                Native-Grade Mobile Fluidity
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Architecting gesture-driven mobile experiences with <span className="text-[#8b5cf6]">120Hz frame rates</span>, reactive state stores, offline synchronization, and hardware-accelerated animations.
              </p>
            </div>

            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-[#06b6d4]/50 transition-colors">
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                <span className="text-[#06b6d4] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#06b6d4]/10 border border-[#06b6d4]/20">02</span>
                Scalable Modern Web Architectures
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Leveraging <span className="text-[#06b6d4]">Next.js App Router</span>, edge functions, and kinetic GSAP orchestrations to build high-conversion, visually striking web applications.
              </p>
            </div>

            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-[#10b981]/50 transition-colors">
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                <span className="text-[#10b981] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/20">03</span>
                Design Engineering & Micro-Interactions
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Eliminating the friction between creative UI and production code. Every transition, <span className="text-[#10b981]">spring constant</span>, and hover glow is crafted with artistic devotion.
              </p>
            </div>

            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-[#f59e0b]/50 transition-colors">
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                <span className="text-[#f59e0b] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#f59e0b]/10 border border-[#f59e0b]/20">04</span>
                Sub-Zero Latency Edge Infrastructure
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Building distributed microservices with <span className="text-[#f59e0b]">sub-100ms API response pipelines</span>, strict TypeScript payloads, and high-availability cloud integrations.
              </p>
            </div>
          </div>
        </div>

        {/* Animated Metrics & Counters with Quad-Accent Colors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PORTFOLIO_DATA.stats.map((stat, idx) => {
            const accent = STAT_ACCENTS[idx % STAT_ACCENTS.length];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="glass-card p-5 sm:p-8 rounded-2xl border border-white/[0.06] flex flex-col justify-between group transition-all"
                style={{
                  boxShadow: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.boxShadow = `0 0 25px ${accent}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} accentColor={accent} />
                  <h4 className="text-sm font-semibold text-zinc-200 mt-2 mb-1">
                    {stat.label}
                  </h4>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mt-3 pt-3 border-t border-white/[0.06]">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

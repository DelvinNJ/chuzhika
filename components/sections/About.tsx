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
              Bridging <span className="text-[#8b5cf6]">multi-platform mobile systems</span> with{" "}
              <span className="text-[#8b5cf6]">enterprise web engineering.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4 text-zinc-400 text-base leading-relaxed">
            <p>
              We are specialized engineers focused on building{" "}
              <span className="text-[#8b5cf6] font-medium">mobile apps using Flutter & React Native</span> alongside robust,{" "}
              <span className="text-[#06b6d4] font-medium">enterprise .NET & PHP backends</span> and{" "}
              <span className="text-[#10b981] font-medium">reactive React Js & Angular web platforms</span>.
            </p>
            <p>
              Our engineering philosophy revolves around{" "}
              <span className="text-[#10b981] font-medium">clean architectural patterns</span>, scalable codebases, and{" "}
              <span className="text-[#f59e0b] font-medium">modern web technologies</span> delivering high performance across all screens.
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
                  <span className="text-[#8b5cf6]">Mobile</span> + <span className="text-[#06b6d4]">Full-Stack</span> Stack
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
                  <div className="w-5 h-5 rounded-full bg-[#06b6d4] flex items-center justify-center text-[8px] font-bold text-white">FL</div>
                  <div className="w-5 h-5 rounded-full bg-[#8b5cf6] flex items-center justify-center text-[8px] font-bold text-white">RN</div>
                  <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center text-[8px] font-bold text-white">.NET</div>
                  <div className="w-5 h-5 rounded-full bg-[#6366f1] flex items-center justify-center text-[8px] font-bold text-white">PHP</div>
                  <div className="w-5 h-5 rounded-full bg-[#0ea5e9] flex items-center justify-center text-[8px] font-bold text-white">REA</div>
                  <div className="w-5 h-5 rounded-full bg-[#ef4444] flex items-center justify-center text-[8px] font-bold text-white">NG</div>
                </div>
                <span className="text-xs font-mono text-zinc-300">Core Stack</span>
              </motion.div>
            </div>
          </div>

          {/* 4 Core Pillars Cycling Quad-Accent Colors */}
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-[#8b5cf6]/50 transition-colors">
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                <span className="text-[#8b5cf6] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">01</span>
                Flutter & React Native Mobile Engineering
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Building fluid iOS & Android applications with <span className="text-[#8b5cf6]">Flutter & React Native</span>, featuring responsive reactive state stores, native hardware APIs, and 120Hz gesture smoothness.
              </p>
            </div>

            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-[#06b6d4]/50 transition-colors">
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                <span className="text-[#06b6d4] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#06b6d4]/10 border border-[#06b6d4]/20">02</span>
                React Js & Angular Web Applications
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Developing responsive, enterprise-grade SPAs and web platforms using <span className="text-[#06b6d4]">React Js and Angular</span> with clean modular design, high rendering efficiency, and state governance.
              </p>
            </div>

            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-[#10b981]/50 transition-colors">
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                <span className="text-[#10b981] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/20">03</span>
                .NET & PHP Enterprise Backend Architecture
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Powering applications with high-throughput backend services in <span className="text-[#10b981]">.NET (C#) and PHP (Laravel)</span>, architected for multi-tenant scalability, resilient APIs, and enterprise databases.
              </p>
            </div>

            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/[0.08] hover:border-[#f59e0b]/50 transition-colors">
              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-3">
                <span className="text-[#f59e0b] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#f59e0b]/10 border border-[#f59e0b]/20">04</span>
                Modern Web Technologies & UI Systems
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Implementing modern <span className="text-[#f59e0b]">Web Technologies</span> with semantic markup, responsive layouts, Tailwind CSS, cross-browser compatibility, and accessible design principles.
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

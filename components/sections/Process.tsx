"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 85%",
              scrub: true,
            },
          }
        );
      }

      // Animate each milestone node
      const cards = gsap.utils.toArray<HTMLElement>(".process-node");
      cards.forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0.3, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 bg-[#05050a] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Tag & Heading */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-violet-500/30" />
            <span className="text-xs uppercase font-mono tracking-widest text-violet-400">
              [ 04 // THE EXECUTION PROTOCOL ]
            </span>
            <div className="h-[1px] w-8 bg-violet-500/30" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            From zero to <span className="gradient-text">production speed.</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            A battle-tested 4-phase methodology transforming complex product visions into high-performing mobile and web architectures.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background Track Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/[0.08] -translate-x-1/2" />

          {/* Dynamic Scroll-Drawn Glowing Line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-violet-500 via-indigo-400 to-cyan-400 -translate-x-1/2 origin-top shadow-[0_0_12px_rgba(139,92,246,0.8)]"
          />

          {/* Timeline Steps */}
          <div className="flex flex-col gap-16 md:gap-24">
            {PORTFOLIO_DATA.process.map((step, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={step.number}
                  className={`process-node relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Center Node Pin */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-2 z-20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#070710] border-2 border-violet-500 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Spacer for Desktop Alignment */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content */}
                  <div className="w-full pl-16 md:pl-0 md:w-1/2 md:px-10">
                    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/[0.08] hover:border-violet-500/40 transition-all duration-300">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="font-mono text-2xl font-black text-violet-400">
                          {step.number}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                          {step.duration}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs font-mono text-violet-300/80 mb-4">
                        {step.subtitle}
                      </p>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                        {step.description}
                      </p>

                      <div className="pt-4 border-t border-white/[0.06]">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                          Key Deliverables:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.deliverables.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] text-zinc-300 border border-white/[0.06]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

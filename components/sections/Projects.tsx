"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const scrollDistance = track.scrollWidth - window.innerWidth;

      const trigger = gsap.to(track, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-[#06060c] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-violet-600/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Desktop & Mobile Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-8 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs uppercase font-mono tracking-widest text-violet-400">
              [ 03 // SELECTED PRODUCTIONS ]
            </span>
            <div className="h-[1px] w-12 bg-violet-500/30" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineered with <span className="gradient-text">surgical intent.</span>
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <span className="hidden lg:inline-flex items-center gap-2 text-violet-400">
            <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Scroll down to navigate horizontally
          </span>
          <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            {PORTFOLIO_DATA.projects.length} Flagship Releases
          </span>
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div className="w-full overflow-x-auto lg:overflow-visible pb-24 lg:pb-32 no-scrollbar">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-10 px-6 sm:px-8 lg:px-16 w-full lg:w-max items-stretch"
        >
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <div
              key={project.id}
              className="w-full lg:w-[620px] shrink-0 glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] hover:border-violet-500/50 flex flex-col justify-between group transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Project Image Container with Hover Zoom */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-[#0a0a16]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090914] via-transparent to-transparent opacity-80" />

                {/* Category & Year Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#070710]/80 backdrop-blur-md border border-white/15 text-zinc-200">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-zinc-400 bg-[#070710]/80 backdrop-blur-md border border-white/10">
                    {project.year}
                  </span>
                </div>

                {/* Index Pill */}
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-violet-600/80 backdrop-blur-md text-white font-mono text-xs flex items-center justify-center font-bold">
                  0{index + 1}
                </div>

                {/* Metrics Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 px-3.5 py-2 rounded-xl bg-[#090914]/85 backdrop-blur-md border border-violet-500/30 text-xs font-mono text-cyan-300 flex items-center justify-between">
                  <span>{project.metrics}</span>
                  <span className="text-[10px] text-zinc-400 font-sans">{project.role}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-violet-400/90 mb-3 font-mono">
                    {project.tagline}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags and Link Actions */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <MagneticButton
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-cyan-300 transition-colors py-1"
                    >
                      <span>Explore Case Study</span>
                      <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </MagneticButton>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-zinc-400 hover:text-violet-400 transition-colors"
                      data-cursor-hover
                    >
                      Source Code ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

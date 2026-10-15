"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroCanvas from "@/components/ui/HeroCanvas";
import { getAssetPath } from "@/utils/paths";

export default function Hero() {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Cinematic Scroll Scrub for Hero Content
      if (contentRef.current && sectionRef.current) {
        gsap.to(contentRef.current, {
          y: -90,
          opacity: 0.05,
          scale: 0.94,
          filter: "blur(6px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 25%",
            scrub: 1,
          },
        });
      }

      // Parallax and zoom for background elements
      if (bgRef.current && sectionRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.15,
          y: 60,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Background Interactive Layer with Parallax Scrub */}
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden will-change-transform">
        {/* Interactive 3D Cybernetic Warp Canvas */}
        <HeroCanvas />


        {/* High-Resolution Futuristic Fallback Backdrop */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
          <Image
            src={getAssetPath("/images/hero-fallback.jpg")}
            alt="Hero abstract background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/60 to-[#05050a]/40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />
      </div>

      {/* Main Content with Scroll Scrubbing */}
      <div
        ref={contentRef}
        className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 text-center flex flex-col items-center will-change-transform"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status Badge */}
          <motion.div variants={fadeUpVariants} className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-violet-500/20 text-xs font-mono uppercase tracking-widest text-zinc-300 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500 shadow-[0_0_8px_#a78bfa]" />
              </span>
              <span>{PORTFOLIO_DATA.profile.roleTag}</span>
            </div>
          </motion.div>

          {/* Large Headline with Text-Reveal Animation */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.95] max-w-5xl mb-6">
            <span className="block overflow-hidden py-1">
              <motion.span variants={lineVariants} className="block text-white">
                {PORTFOLIO_DATA.profile.heroHeading.line1}
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span
                variants={lineVariants}
                className="block gradient-text text-glow-violet"
              >
                {PORTFOLIO_DATA.profile.heroHeading.line2}
              </motion.span>
            </span>
            <span className="block overflow-hidden py-1">
              <motion.span
                variants={lineVariants}
                className="block text-zinc-300 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-normal normal-case font-sans"
              >
                {PORTFOLIO_DATA.profile.heroHeading.line3}
              </motion.span>
            </span>
          </h1>

          {/* Subtitle Description */}
          <motion.p
            variants={fadeUpVariants}
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal mb-10"
          >
            {PORTFOLIO_DATA.profile.heroSubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-16 w-full sm:w-auto"
          >
            <MagneticButton
              as="button"
              onClick={() => scrollTo("#projects", { offset: -50 })}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 !text-white font-semibold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_45px_rgba(139,92,246,0.7)] transition-all flex items-center justify-center gap-3 border border-violet-400/30 group"
            >
              <span className="!text-white">Explore Projects</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform !text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </MagneticButton>

            <MagneticButton
              as="button"
              onClick={() => scrollTo("#contact", { offset: -50 })}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-card hover:bg-slate-100 dark:hover:bg-white/[0.08] text-zinc-800 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-white font-semibold text-sm tracking-wider uppercase border border-slate-200 dark:border-white/10 hover:border-violet-500/40 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Start Collaboration</span>
            </MagneticButton>
          </motion.div>

          {/* Floating Technology Pills */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl"
          >
            {["React Native", "iOS & Android", "Next.js 16", "TypeScript", "GSAP ScrollTrigger", "Tailwind CSS", "Node / GraphQL"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-slate-100/80 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] hover:border-violet-500/40 hover:text-violet-600 dark:hover:text-violet-300 transition-colors"
                >
                  {tech}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-auto"
      >
        <button
          type="button"
          onClick={() => scrollTo("#about", { offset: -60 })}
          className="flex flex-col items-center gap-2 group text-zinc-400 hover:text-violet-400 transition-colors"
          aria-label="Scroll to About section"
          data-cursor-hover
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-violet-400 transition-colors">
            Scroll Down
          </span>
          <div className="w-5 h-9 rounded-full border border-white/20 group-hover:border-violet-400/50 flex items-start justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-2 rounded-full bg-violet-400 shadow-[0_0_6px_#a78bfa]"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
}

"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "@/components/providers/LoadingContext";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { getAssetPath } from "@/utils/paths";
import TornadoLoaderCanvas from "@/components/ui/TornadoLoaderCanvas";

const BRAND_LETTERS = "CHUZHIKA".split("");

// Deterministic values (no Math.random) so server and client markup always match
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  size: 2 + (i % 3),
  duration: 6 + (i % 5) * 1.5,
  delay: -((i * 0.9) % 7),
  color: i % 2 === 0 ? "#22d3ee" : "#a78bfa",
}));

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function PageLoader() {
  const { isLoading, progress, setProgress, triggerReady, completeLoading } = useLoading();
  const { lenis } = useSmoothScroll();
  const [statusText, setStatusText] = useState("INITIALIZING RUNTIME ENGINE...");
  const [exitingContent, setExitingContent] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    const motionPref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(motionPref);

    // Lock page scrolling while loader is active
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (lenis) {
      lenis.stop();
    }

    if (motionPref) {
      setProgress(100);
      triggerReady();
      setTimeout(() => {
        completeLoading();
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        if (lenis) lenis.start();
      }, 400);
      return;
    }

    // Realistic non-linear progress timer
    const startTime = performance.now();
    const targetDuration = 2200; // ~2.2 seconds so the full animation sequence is visible

    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / targetDuration, 1);

      // Cybernetic multi-stage ease curve: fast start, brief breath, snappy finish
      let currentPercent = 0;
      if (rawProgress < 0.4) {
        // 0% -> 45% quickly
        currentPercent = Math.floor((rawProgress / 0.4) * 45);
      } else if (rawProgress < 0.75) {
        // 45% -> 85% steady
        currentPercent = 45 + Math.floor(((rawProgress - 0.4) / 0.35) * 40);
      } else {
        // 85% -> 100% decisive finish
        currentPercent = 85 + Math.floor(((rawProgress - 0.75) / 0.25) * 15);
      }

      currentPercent = Math.min(Math.max(currentPercent, 0), 100);
      setProgress(currentPercent);

      // Update telemetry status text based on progress milestone
      if (currentPercent < 25) {
        setStatusText("INITIALIZING RUNTIME ENGINE...");
      } else if (currentPercent < 55) {
        setStatusText("COMPILING REACTIVE INTERFACES...");
      } else if (currentPercent < 80) {
        setStatusText("MOUNTING KINETIC ARCHITECTURE...");
      } else if (currentPercent < 100) {
        setStatusText("OPTIMIZING DISPLAY PIPELINE...");
      } else {
        setStatusText("SYSTEM ONLINE // ACCESS GRANTED");
      }

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        // 100% reached
        setProgress(100);
        setStatusText("SYSTEM ONLINE // ACCESS GRANTED");
        handleFinish();
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    // Fail-safe guarantee so loader never locks indefinitely
    const safetyTimer = setTimeout(() => {
      if (!completedRef.current) {
        setProgress(100);
        handleFinish();
      }
    }, 3500);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(safetyTimer);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [lenis, setProgress, triggerReady, completeLoading]);

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;

    // Small hold at 100% so user registers completion (and sees the burst)
    setTimeout(() => {
      setExitingContent(true);

      // Trigger website fade-in as the curtain begins lifting
      triggerReady();

      // Curtain sequence lasts ~800ms
      setTimeout(() => {
        completeLoading();
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        if (lenis) {
          lenis.start();
        }
        if (typeof window !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
          ScrollTrigger.refresh();
        }
      }, 850);
    }, 380);
  };

  if (!isLoading) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div
          id="page-loader-root"
          className="fixed inset-0 z-[999999] pointer-events-auto select-none overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label="Loading Chuzhika Portfolio"
        >
          {/* Seamless Unified Backdrop Curtain */}
          <motion.div
            initial={{ y: "0%" }}
            animate={exitingContent ? { y: "-100%" } : { y: "0%" }}
            transition={{
              duration: isReducedMotion ? 0.2 : 0.85,
              ease: [0.76, 0, 0.24, 1], // Cinematic high-friction ease
            }}
            className="absolute inset-0 bg-[#05050a] z-10 overflow-hidden"
          >
            {/* Drifting aurora blobs */}
            <div
              className="absolute top-[8%] left-[18%] w-[420px] h-[420px] rounded-full bg-violet-600/20 blur-[130px] pointer-events-none"
              style={{ animation: "loaderDrift 14s ease-in-out infinite" }}
            />
            <div
              className="absolute bottom-[6%] right-[14%] w-[460px] h-[460px] rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none"
              style={{ animation: "loaderDrift 17s ease-in-out -6s infinite" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"
              style={{ animation: "loaderDrift 20s ease-in-out -11s infinite" }}
            />

            {/* Grid texture */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            {/* Rising energy particles */}
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="absolute -bottom-3 rounded-full pointer-events-none"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                  opacity: 0,
                  animation: `loaderRise ${p.duration}s linear ${p.delay}s infinite`,
                }}
              />
            ))}

            {/* Soft vignette to focus the centre */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,5,10,0.85)_100%)]" />
          </motion.div>

          {/* Center Holographic HUD & Telemetry Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              exitingContent
                ? {
                  opacity: 0,
                  scale: 1.05,
                  filter: "blur(12px)",
                  transition: { duration: 0.45, ease: "easeInOut" },
                }
                : {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: "easeOut" },
                }
            }
            className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6"
          >
            {/* Logo Emblem, Ripples & Orbits */}
            <div className="relative flex items-center justify-center mb-8">
              {/* Pulsing ambient neon aura */}
              <div
                className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl opacity-75 pointer-events-none animate-pulse"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(6,182,212,0.35) 50%, transparent 75%)",
                }}
              />

              {/* Dynamic 3D Tornado Funnel Vortex Canvas */}
              <TornadoLoaderCanvas progress={progress} />

              {/* Completion burst */}
              {progress === 100 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.9 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  transition={{ duration: 0.95, ease: "easeOut" }}
                  className="absolute w-32 h-32 rounded-full border-2 border-emerald-300/70 shadow-[0_0_30px_rgba(52,211,153,0.6)] pointer-events-none"
                />
              )}

              {/* Core Logo Card (entrance pop + floating + rotating light border) */}
              <motion.div
                initial={{ scale: 0.55, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.1 }}
              >
                <div style={{ animation: "loaderFloat 4s ease-in-out infinite" }}>
                  <div className="relative rounded-3xl p-[2px] overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.45)]">
                    {/* Rotating conic light that traces the card border */}
                    <div
                      className="absolute -inset-[70%] animate-[spin_3.5s_linear_infinite]"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0%, transparent 55%, #22d3ee 78%, #a855f7 92%, transparent 100%)",
                      }}
                    />
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-[22px] bg-[#0d0d1b] flex items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.2)] p-4">
                      <Image
                        src={getAssetPath("/images/logo-transparent.png")}
                        alt="Chuzhika Logo"
                        width={140}
                        height={140}
                        priority
                        className="w-full h-full object-contain filter drop-shadow-[0_0_18px_rgba(34,211,238,0.9)] drop-shadow-[0_0_30px_rgba(168,85,247,0.8)] scale-110"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Brand Title, Subtitle & Description */}
            <div className="flex flex-col items-center text-center space-y-2.5 mb-7 max-w-md">
              {/* Letter-by-letter reveal, then a continuous colour wave */}
              <h1
                className="flex pl-[0.35em] text-2xl sm:text-3xl font-black tracking-[0.35em] uppercase"
                aria-label="Chuzhika"
              >
                {BRAND_LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.2 + i * 0.05 }}
                    className="inline-block"
                  >
                    <span
                      className="inline-block text-zinc-100"
                      style={{ animation: `loaderLetterWave 2.6s ease-in-out ${0.8 + i * 0.12}s infinite` }}
                    >
                      {letter}
                    </span>
                  </motion.span>
                ))}
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.65 }}
                className="relative overflow-hidden inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.15)]"
              >
                {/* Diagonal shine sweeping across the badge */}
                <span
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
                  style={{ animation: "loaderShimmer 2.8s ease-in-out 1.4s infinite" }}
                />
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_6px_#06b6d4]" />
                </div>
                <span className="relative font-mono text-[11px] sm:text-xs text-zinc-100 font-semibold tracking-[0.2em] uppercase">
                  Drawn to Better.
                </span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_6px_#f59e0b]" />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.8 }}
                className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-sm px-4"
              >
                A hidden pull toward <span className="text-[#8b5cf6] font-medium">progress</span> and{" "}
                <span className="text-[#06b6d4] font-medium">better solutions</span>.
              </motion.p>
            </div>

            {/* Large Digital Telemetry Counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.5 }}
              className="font-mono font-black tabular-nums text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-violet-400 tracking-tight mb-4 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              {progress < 10 ? `0${progress}` : progress}
              <span className="text-xl sm:text-2xl text-cyan-400 font-light ml-1">%</span>
            </motion.div>

            {/* Laser Slim Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.6 }}
              className="w-64 sm:w-80 h-[3px] bg-white/[0.08] rounded-full p-[1px] relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] mb-4"
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#10b981] relative shadow-[0_0_14px_rgba(34,211,238,0.6)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              >
                {/* Shimmer running along the filled portion */}
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span
                    className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    style={{ animation: "loaderShimmer 1.2s ease-in-out infinite" }}
                  />
                </span>
                {/* Glowing leading head spark */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 blur-[2px] shadow-[0_0_10px_#22d3ee]" />
              </motion.div>
            </motion.div>

            {/* Dynamic Telemetry Status Readout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.8 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${progress === 100
                    ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                    : "bg-cyan-400 animate-ping shadow-[0_0_8px_#22d3ee]"
                  }`}
              />
              <span
                className={`font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-300 ${progress === 100 ? "text-emerald-300 font-semibold" : "text-zinc-400"
                  }`}
              >
                {statusText}
              </span>
              {/* Typing-style blinking dots while loading */}
              {progress < 100 && (
                <span className="inline-flex items-center gap-[3px]" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-[3px] h-[3px] rounded-full bg-cyan-300"
                      style={{ animation: `loaderBlink 1.1s ease-in-out ${i * 0.18}s infinite` }}
                    />
                  ))}
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

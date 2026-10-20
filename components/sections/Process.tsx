"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio";

// Station metadata and interactive telemetry specs
interface StationDetails {
  code: string;
  codename: string;
  themeColor: string;
  themeAccent: string;
  themeRgb: string;
  shortLabel: string;
  metrics: { label: string; value: string; hint: string }[];
}

const STATION_CONFIG: Record<string, StationDetails> = {
  "01": {
    code: "NODE_01",
    codename: "SPEC_MATRIX_v1",
    shortLabel: "SPEC",
    themeColor: "text-violet-400",
    themeAccent: "#8b5cf6",
    themeRgb: "139, 92, 246",
    metrics: [
      { label: "Spec Precision", value: "99.8%", hint: "Zero ambiguities" },
      { label: "Edge Cases", value: "42 Mapped", hint: "State matrix" },
      { label: "Target Latency", value: "< 80ms", hint: "p99 worldwide" },
    ],
  },
  "02": {
    code: "NODE_02",
    codename: "KINETIC_FLOW_v2",
    shortLabel: "FLOW",
    themeColor: "text-cyan-400",
    themeAccent: "#06b6d4",
    themeRgb: "6, 182, 212",
    metrics: [
      { label: "Frame Rate", value: "120 FPS", hint: "Fluid springs" },
      { label: "Damping", value: "0.82 ζ", hint: "Tactile haptics" },
      { label: "Contrast", value: "7.8:1", hint: "WCAG AAA dark" },
    ],
  },
  "03": {
    code: "NODE_03",
    codename: "STRICT_ENGINE_v3",
    shortLabel: "BUILD",
    themeColor: "text-emerald-400",
    themeAccent: "#10b981",
    themeRgb: "16, 185, 129",
    metrics: [
      { label: "Type Safety", value: "100%", hint: "Strict mode AST" },
      { label: "Test Coverage", value: "98.7%", hint: "E2E + Unit" },
      { label: "Bundle Delta", value: "-44%", hint: "Tree-shaken" },
    ],
  },
  "04": {
    code: "NODE_04",
    codename: "EDGE_ORBIT_v4",
    shortLabel: "EDGE",
    themeColor: "text-amber-400",
    themeAccent: "#f59e0b",
    themeRgb: "245, 158, 11",
    metrics: [
      { label: "Edge PoPs", value: "310 Global", hint: "Vercel / Cloudflare" },
      { label: "Cache Hit", value: "99.6%", hint: "Pre-warmed" },
      { label: "Uptime SLA", value: "99.99%", hint: "Guaranteed" },
    ],
  },
};

export default function Process() {
  const [activeStation, setActiveStation] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [mobileSubTab, setMobileSubTab] = useState<"deliverables" | "hud">("deliverables");
  const [activeSubNode, setActiveSubNode] = useState<string>("gateway");
  const [springPreset, setSpringPreset] = useState<"elastic" | "snappy" | "smooth">("snappy");
  const [activeEdgeRegion, setActiveEdgeRegion] = useState<string>("frankfurt");

  const steps = PORTFOLIO_DATA.process;
  const currentStep = steps[activeStation] || steps[0];
  const stationInfo = STATION_CONFIG[currentStep.number] || STATION_CONFIG["01"];

  // Auto-pulse cycle across nodes if enabled
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveStation((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay, steps.length]);

  const handleNext = () => {
    setActiveStation((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setActiveStation((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  return (
    <section
      id="process"
      className="relative py-20 sm:py-32 bg-[#040408] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Circuit background ambient light grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[700px] h-[340px] sm:h-[500px] rounded-full blur-[140px] sm:blur-[170px] pointer-events-none transition-all duration-700 opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(${stationInfo.themeRgb}, 0.4) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-1.5 mr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            </div>
            <span className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-violet-400 font-semibold">
              [ 04 // THE EXECUTION PROTOCOL ]
            </span>
            <div className="h-[1px] w-6 sm:w-8 bg-violet-500/30" />
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
            Autonomous engineering at <span className="text-[#8b5cf6]">circuit speed.</span>
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal px-2">
            A deterministic, closed-loop cybernetic pipeline transforming{" "}
            <span className="text-[#8b5cf6] font-medium">product intent</span> into{" "}
            <span className="text-[#06b6d4] font-medium">tactile interfaces</span>,{" "}
            <span className="text-[#10b981] font-medium">hardened engines</span>, and{" "}
            <span className="text-[#f59e0b] font-medium">global edge distribution</span>.
          </p>

          {/* Circuit Bus Status Bar & Mode Switch */}
          <div className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-2.5 text-[11px] sm:text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </span>
              <span>BUS: NOMINAL</span>
              <span className="text-zinc-600">|</span>
              <span className="text-cyan-400">4 NODES</span>
            </div>

            <button
              onClick={() => setAutoPlay((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                autoPlay
                  ? "bg-violet-600/20 border-violet-500/50 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                  : "bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${autoPlay ? "bg-violet-400 animate-pulse" : "bg-zinc-600"}`} />
              <span>{autoPlay ? "AUTO-CYCLE: ON" : "AUTO-CYCLE"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE DEDICATED TAB CONTROLLER (< lg screens)           */}
        {/* ========================================================= */}
        <div className="lg:hidden mb-5">
          {/* Compact 4-Segment Cybernetic Station Selector */}
          <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-[#090916]/90 border border-white/10 shadow-lg backdrop-blur-md">
            {steps.map((step, index) => {
              const isActive = activeStation === index;
              const isPast = activeStation > index;
              const cfg = STATION_CONFIG[step.number] || STATION_CONFIG["01"];

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStation(index)}
                  className={`relative py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all ${
                    isActive
                      ? "bg-[#14142b] text-white shadow-md border border-white/15"
                      : isPast
                      ? "bg-white/[0.03] text-zinc-300"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                  style={{
                    borderColor: isActive ? cfg.themeAccent : undefined,
                  }}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isActive ? "animate-ping" : isPast ? "bg-cyan-400/60" : "bg-zinc-600"}`}
                      style={{ backgroundColor: isActive ? cfg.themeAccent : undefined }}
                    />
                    <span className="font-mono text-xs font-black tracking-tight">
                      {step.number}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono tracking-tight font-bold truncate w-full text-center mt-0.5 ${
                      isActive ? cfg.themeColor : "text-zinc-400"
                    }`}
                  >
                    {cfg.shortLabel}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTabHighlight"
                      className="absolute -bottom-1 left-2 right-2 h-[2px] rounded-full"
                      style={{
                        backgroundColor: cfg.themeAccent,
                        boxShadow: `0 0 8px ${cfg.themeAccent}`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Phase Quick Breadcrumb Banner */}
          <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2 truncate">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: stationInfo.themeAccent }}
              />
              <span className="text-zinc-300 font-semibold truncate">
                PHASE {currentStep.number} // {currentStep.title}
              </span>
            </div>
            <span className="text-zinc-500 shrink-0 ml-2 font-mono text-[10px]">
              {currentStep.duration}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP CIRCUIT CONDUIT & STATION PODS (>= lg screens)    */}
        {/* ========================================================= */}
        <div className="hidden lg:block relative mb-12 lg:mb-16">
          {/* Main Horizontal Laser Bus Line */}
          <div className="absolute top-[68px] left-[10%] right-[10%] h-[3px] bg-white/[0.07] z-0 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-amber-400"
              initial={false}
              animate={{
                width: `${((activeStation + 0.5) / steps.length) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              style={{
                boxShadow: `0 0 16px rgba(${stationInfo.themeRgb}, 0.8)`,
              }}
            />
            <div
              className="absolute top-0 bottom-0 w-24 bg-white/70 blur-[3px]"
              style={{
                animation: "circuitLaserPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
          </div>

          {/* 4 Connected Station Pods Grid */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {steps.map((step, index) => {
              const isActive = activeStation === index;
              const isPast = activeStation > index;
              const cfg = STATION_CONFIG[step.number] || STATION_CONFIG["01"];

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStation(index)}
                  className={`group relative rounded-3xl p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "bg-[#0b0b18]/95 border-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl scale-[1.02]"
                      : "bg-[#070712]/70 border border-white/[0.07] hover:border-white/20 hover:bg-[#0a0a18]/90"
                  }`}
                  style={{
                    borderColor: isActive ? cfg.themeAccent : isPast ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
                    boxShadow: isActive ? `0 0 35px -5px rgba(${cfg.themeRgb}, 0.35)` : undefined,
                  }}
                >
                  {/* Active Indicator Top Laser Ray */}
                  {isActive && (
                    <motion.div
                      layoutId="activeLaserRay"
                      className="absolute -top-[2px] left-8 right-8 h-[3px] rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${cfg.themeAccent}, transparent)`,
                        boxShadow: `0 0 12px ${cfg.themeAccent}`,
                      }}
                    />
                  )}

                  {/* Station Node Top Socket Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-mono text-xs font-black transition-all ${
                            isActive
                              ? "text-black shadow-lg"
                              : isPast
                              ? "bg-white/10 text-white"
                              : "bg-white/[0.04] text-zinc-500"
                          }`}
                          style={{
                            backgroundColor: isActive ? cfg.themeAccent : undefined,
                            boxShadow: isActive ? `0 0 18px ${cfg.themeAccent}` : undefined,
                          }}
                        >
                          {step.number}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[10px] font-mono tracking-widest uppercase font-semibold ${isActive ? cfg.themeColor : "text-zinc-500"}`}>
                            {cfg.code}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {step.duration}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full transition-all ${
                            isActive ? "animate-ping" : isPast ? "bg-cyan-400/50" : "bg-zinc-700"
                          }`}
                          style={{
                            backgroundColor: isActive ? cfg.themeAccent : undefined,
                          }}
                        />
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">
                          {isActive ? "ACTIVE" : isPast ? "SYNCED" : "READY"}
                        </span>
                      </div>
                    </div>

                    <h3 className={`text-lg font-bold mb-1.5 transition-colors ${isActive ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500 truncate">{cfg.metrics[0]?.label}</span>
                    <span className={`font-bold ${isActive ? cfg.themeColor : "text-zinc-400"}`}>
                      {cfg.metrics[0]?.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* DEEP STATION INSPECTOR DOCK (RESPONSIVE & TOUCH-READY)    */}
        {/* ========================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-8 lg:p-12 border relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            style={{
              borderColor: `rgba(${stationInfo.themeRgb}, 0.28)`,
            }}
          >
            {/* Top Glowing Laser Connector */}
            <div
              className="absolute top-0 left-6 right-6 h-[1.5px]"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${stationInfo.themeRgb}, 0.8), transparent)`,
              }}
            />

            {/* Mobile Sub-Tab Switcher (Between Overview & Live Circuit HUD) */}
            <div className="lg:hidden flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-4">
              <button
                onClick={() => setMobileSubTab("deliverables")}
                className={`flex-1 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all ${
                  mobileSubTab === "deliverables"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                1. Overview & Specs
              </button>
              <button
                onClick={() => setMobileSubTab("hud")}
                className={`flex-1 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  mobileSubTab === "hud"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stationInfo.themeAccent }} />
                <span>2. Live Circuit HUD</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
              {/* ---------------------------------------------------- */}
              {/* COLUMN 1: MISSION SCHEMATICS & DELIVERABLES          */}
              {/* ---------------------------------------------------- */}
              <div
                className={`lg:col-span-6 flex flex-col justify-between space-y-5 ${
                  mobileSubTab === "deliverables" ? "block" : "hidden lg:flex"
                }`}
              >
                <div>
                  {/* Station Breadcrumb Tag */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-md font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `rgba(${stationInfo.themeRgb}, 0.15)`,
                        color: stationInfo.themeAccent,
                        border: `1px solid rgba(${stationInfo.themeRgb}, 0.3)`,
                      }}
                    >
                      {stationInfo.code} // {stationInfo.codename}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="font-mono text-[11px] sm:text-xs text-zinc-400">
                      Timeline: {currentStep.duration}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-1.5">
                    {currentStep.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-zinc-300 font-medium mb-3 sm:mb-4">
                    {currentStep.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-5 sm:mb-6">
                    {currentStep.description}
                  </p>

                  {/* Key Station Metrics Grid (Mobile optimized 3-col) */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6">
                    {stationInfo.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-2 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center flex flex-col justify-center"
                      >
                        <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-tight block truncate">
                          {metric.label}
                        </span>
                        <span className={`text-xs sm:text-base font-bold font-mono ${stationInfo.themeColor} my-0.5 truncate`}>
                          {metric.value}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-mono text-zinc-500 block truncate">
                          {metric.hint}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables Checklist */}
                  <div>
                    <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2.5 font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stationInfo.themeAccent }} />
                      Verified Station Deliverables
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentStep.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-zinc-200"
                        >
                          <svg
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: stationInfo.themeAccent }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stepper Navigation Footer */}
                <div className="pt-4 sm:pt-6 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="px-3 sm:px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="hidden xs:inline">Previous</span>
                      <span className="xs:hidden">Prev</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-3 sm:px-4 py-2 rounded-xl text-xs font-mono text-white transition-all shadow-md flex items-center gap-1.5"
                      style={{
                        backgroundColor: stationInfo.themeAccent,
                        boxShadow: `0 0 16px rgba(${stationInfo.themeRgb}, 0.4)`,
                      }}
                    >
                      <span>Next Node</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <span className="text-xs font-mono text-zinc-500">
                    {activeStation + 1} / {steps.length}
                  </span>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* COLUMN 2: INTERACTIVE CIRCUIT SCHEMATIC HUD          */}
              {/* ---------------------------------------------------- */}
              <div
                className={`lg:col-span-6 flex flex-col justify-between rounded-2xl bg-[#060610]/95 border border-white/10 p-4 sm:p-6 shadow-inner overflow-hidden font-mono relative ${
                  mobileSubTab === "hud" ? "flex" : "hidden lg:flex"
                }`}
              >
                {/* Circuit Grid Backdrop */}
                <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/[0.08] mb-4 relative z-10">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] sm:text-xs text-zinc-400 font-mono ml-1.5">
                      schematic_{currentStep.number}.v4
                    </span>
                  </div>

                  <span
                    className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold"
                    style={{
                      backgroundColor: `rgba(${stationInfo.themeRgb}, 0.1)`,
                      color: stationInfo.themeAccent,
                      borderColor: `rgba(${stationInfo.themeRgb}, 0.25)`,
                    }}
                  >
                    CIRCUIT ENGAGED
                  </span>
                </div>

                {/* =================================================== */}
                {/* DYNAMIC SCHEMATIC SIMULATOR PER PHASE               */}
                {/* =================================================== */}
                <div className="flex-1 my-auto relative z-10 py-2 sm:py-3">
                  {/* PHASE 01: ARCHITECTURAL MICROSERVICES TOPOLOGY */}
                  {currentStep.number === "01" && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
                        <span>SYSTEM TOPOLOGY GRAPH</span>
                        <span className="text-violet-400 font-semibold">STATUS: VERIFIED</span>
                      </div>

                      {/* Interactive Architecture Nodes */}
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                        {[
                          { id: "gateway", name: "Gateway", spec: "Cloudflare Workers", latency: "12ms" },
                          { id: "services", name: "Services", spec: "Next.js Engine", latency: "18ms" },
                          { id: "db", name: "Reactive DB", spec: "SQLite Vault", latency: "4ms" },
                        ].map((node) => (
                          <button
                            key={node.id}
                            onClick={() => setActiveSubNode(node.id)}
                            className={`p-2 sm:p-3 rounded-xl border text-left transition-all ${
                              activeSubNode === node.id
                                ? "bg-violet-950/40 border-violet-500/60 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                                : "bg-white/[0.02] border-white/[0.06] hover:border-white/20"
                            }`}
                          >
                            <span className="text-[9px] sm:text-[10px] text-zinc-500 block truncate font-mono">
                              NODE::{node.id.toUpperCase()}
                            </span>
                            <span className="text-xs font-bold text-white block truncate mt-0.5">
                              {node.name}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-violet-300 font-mono mt-0.5 block">
                              ● {node.latency}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Node Spec Readout */}
                      <div className="p-3 sm:p-4 rounded-xl bg-black/60 border border-violet-500/20 text-[11px] sm:text-xs font-mono space-y-1.5">
                        <div className="flex justify-between text-zinc-400">
                          <span>TARGET SPEC:</span>
                          <span className="text-violet-300 font-bold truncate ml-2">
                            {activeSubNode === "gateway"
                              ? "Edge Workers / Sub-15ms"
                              : activeSubNode === "services"
                              ? "Type-Safe tRPC Strict Contracts"
                              : "Local Reactive SQLite Bridge"}
                          </span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>ENCRYPTION:</span>
                          <span className="text-emerald-400">AES-GCM-256 HARDENED</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>FAILOVER:</span>
                          <span className="text-cyan-400">Multi-Region Automatic</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PHASE 02: KINETIC SPRING PHYSICS LAB */}
                  {currentStep.number === "02" && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
                        <span>GESTURE & SPRING RESONANCE</span>
                        <span className="text-cyan-400 font-semibold">120HZ ADAPTIVE</span>
                      </div>

                      {/* Physics Preset Controls */}
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        {(["snappy", "elastic", "smooth"] as const).map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setSpringPreset(preset)}
                            className={`py-1.5 px-2 sm:px-3 rounded-xl border text-xs font-mono uppercase transition-all ${
                              springPreset === preset
                                ? "bg-cyan-950/40 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                                : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white"
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>

                      {/* Live Animated Spring Element */}
                      <div className="h-28 sm:h-32 rounded-xl bg-black/60 border border-cyan-500/20 flex flex-col items-center justify-center relative overflow-hidden p-3">
                        <motion.div
                          key={springPreset}
                          initial={{ scale: 0.65, rotate: -6 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={
                            springPreset === "elastic"
                              ? { type: "spring", stiffness: 400, damping: 10, mass: 1 }
                              : springPreset === "snappy"
                              ? { type: "spring", stiffness: 500, damping: 25, mass: 0.8 }
                              : { type: "spring", stiffness: 180, damping: 30, mass: 1.2 }
                          }
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs font-bold shadow-[0_0_18px_rgba(6,182,212,0.5)] flex items-center gap-2"
                        >
                          <span>120Hz Kinetic Response</span>
                          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                            {springPreset}
                          </span>
                        </motion.div>

                        <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[9px] sm:text-[10px] text-zinc-500 font-mono">
                          <span>
                            STIFFNESS: {springPreset === "elastic" ? "400" : springPreset === "snappy" ? "500" : "180"}
                          </span>
                          <span>
                            DAMPING: {springPreset === "elastic" ? "10" : springPreset === "snappy" ? "25" : "30"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PHASE 03: HARDENED ENGINE & COMPILER GATES */}
                  {currentStep.number === "03" && (
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
                        <span>AUTOMATED QUALITY ASSURANCE</span>
                        <span className="text-emerald-400 font-semibold">ALL GATES PASSING</span>
                      </div>

                      <div className="space-y-2">
                        {[
                          { name: "TypeScript Strict AST", status: "0 Errors / 210 Modules", delta: "100%" },
                          { name: "Unit & Integration Suites", status: "48/48 Specs Passed", delta: "98.7%" },
                          { name: "Biometric Key Storage", status: "AES-256 Vault", delta: "SECURE" },
                          { name: "Bundle Tree-Shaking", status: "-44% Production Payload", delta: "OPTIMIZED" },
                        ].map((gate) => (
                          <div
                            key={gate.name}
                            className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] shrink-0" />
                              <span className="text-zinc-200 truncate">{gate.name}</span>
                            </div>
                            <span className="text-emerald-400 font-bold text-[11px] shrink-0 ml-2">
                              {gate.delta}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PHASE 04: WORLDWIDE EDGE CDN RADAR */}
                  {currentStep.number === "04" && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
                        <span>GLOBAL EDGE TOPOLOGY</span>
                        <span className="text-amber-400 font-semibold">310+ POPs ACTIVE</span>
                      </div>

                      {/* Region Ping Buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                        {[
                          { id: "frankfurt", city: "Frankfurt", ping: "14ms", pop: "EU-Central" },
                          { id: "ashburn", city: "Ashburn", ping: "11ms", pop: "US-East" },
                          { id: "tokyo", city: "Tokyo", ping: "22ms", pop: "AP-East" },
                          { id: "sao-paulo", city: "São Paulo", ping: "29ms", pop: "SA-East" },
                        ].map((hub) => (
                          <button
                            key={hub.id}
                            onClick={() => setActiveEdgeRegion(hub.id)}
                            className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all ${
                              activeEdgeRegion === hub.id
                                ? "bg-amber-950/40 border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                                : "bg-white/[0.02] border-white/[0.06] hover:border-white/20"
                            }`}
                          >
                            <span className="text-[9px] text-zinc-500 font-mono block">
                              {hub.pop}
                            </span>
                            <span className="text-xs font-bold text-white block mt-0.5 truncate">
                              {hub.city}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-amber-400 font-mono mt-0.5 block">
                              ● {hub.ping}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Global Latency Bar */}
                      <div className="p-3 sm:p-4 rounded-xl bg-black/60 border border-amber-500/20 text-[11px] sm:text-xs font-mono space-y-1.5">
                        <div className="flex justify-between text-zinc-400">
                          <span>SELECTED POP:</span>
                          <span className="text-amber-300 font-bold uppercase truncate ml-2">
                            {activeEdgeRegion} CDN NODE
                          </span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>CACHE HIT:</span>
                          <span className="text-emerald-400 font-bold">99.6% (PRE-WARMED)</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>PROPAGATION:</span>
                          <span className="text-cyan-400">Instant Edge (&lt; 20s)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terminal Bottom Circuit Pulse Meter */}
                <div className="pt-3 sm:pt-4 border-t border-white/[0.08] flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-500 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: stationInfo.themeAccent }} />
                    <span className="text-zinc-400">CYCLE:</span>
                    <span style={{ color: stationInfo.themeAccent }} className="font-bold">
                      NODE {currentStep.number} ENGAGED
                    </span>
                  </div>

                  <span className="text-zinc-500">
                    SLA: 99.99%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

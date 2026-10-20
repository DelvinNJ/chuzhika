"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";

type FilterCategory = "All" | "Mobile App" | "Web App";
type ViewMode = "spotlight" | "grid";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("spotlight");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Filter projects according to selected category
  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  // Clamp current index if filtered list changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const activeProject = filteredProjects[currentIndex] || filteredProjects[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  }, [filteredProjects.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  }, [filteredProjects.length]);

  // Keyboard navigation for carousel and modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) {
        if (e.key === "Escape") setSelectedProject(null);
        return;
      }

      if (viewMode === "spotlight") {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, viewMode, handlePrev, handleNext]);

  return (
    <section
      id="projects"
      className="relative py-28 sm:py-36 bg-[#06060c] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-violet-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 mr-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
              </div>
              <span className="text-xs uppercase font-mono tracking-widest text-violet-400">
                [ 03 // SELECTED PRODUCTIONS ]
              </span>
              <div className="h-[1px] w-12 bg-violet-500/30" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
              Engineered with <span className="text-[#8b5cf6]">surgical intent</span> and{" "}
              <span className="text-[#8b5cf6]">production speed.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
              High-throughput <span className="text-[#10b981] font-medium">cloud web platforms</span> and native{" "}
              <span className="text-[#06b6d4] font-medium">mobile architectures</span> crafted for{" "}
              <span className="text-[#8b5cf6] font-medium">sub-100ms latency</span>, fluid micro-interactions, and{" "}
              <span className="text-[#f59e0b] font-medium">visual distinction</span>.
            </p>
          </div>

          {/* Interactive Category Tabs & View Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center p-1.5 rounded-2xl bg-[#0c0c1a]/80 backdrop-blur-xl border border-white/[0.08] shadow-inner">
              {(
                [
                  { id: "All", label: "All Systems", color: "#8b5cf6" },
                  { id: "Mobile App", label: "Mobile", color: "#06b6d4" },
                  { id: "Web App", label: "Web", color: "#10b981" },
                ] as const
              ).map((cat) => {
                const isSelected = activeCategory === cat.id;
                const count =
                  cat.id === "All"
                    ? PORTFOLIO_DATA.projects.length
                    : PORTFOLIO_DATA.projects.filter((p) => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as FilterCategory)}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium tracking-wider transition-all duration-300 ${
                      isSelected ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeProjectFilter"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          backgroundColor: `${cat.color}25`,
                          border: `1px solid ${cat.color}60`,
                          boxShadow: `0 0 15px ${cat.color}35`,
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: isSelected ? cat.color : "#52525b" }}
                      />
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                          isSelected ? "bg-white/20 text-white font-bold" : "bg-white/[0.05] text-zinc-500"
                        }`}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle: Spotlight vs Grid */}
            <div className="flex items-center p-1.5 rounded-2xl bg-[#0c0c1a]/80 backdrop-blur-xl border border-white/[0.08]">
              <button
                onClick={() => setViewMode("spotlight")}
                title="Spotlight View"
                aria-label="Spotlight View"
                className={`p-2 rounded-xl text-xs transition-colors ${
                  viewMode === "spotlight"
                    ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {/* Spotlight Icon */}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                title="Grid List View"
                aria-label="Grid List View"
                className={`p-2 rounded-xl text-xs transition-colors ${
                  viewMode === "grid"
                    ? "bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {/* Grid Icon */}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODEL A: CINEMATIC SPOTLIGHT SHOWCASE                         */}
        {/* ------------------------------------------------------------- */}
        {viewMode === "spotlight" && activeProject && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-3xl lg:rounded-[32px] p-6 sm:p-10 lg:p-12 border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
              >
                {/* Ambient glow spotlight behind the card */}
                <div
                  className={`absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-colors duration-700 ${
                    activeProject.category === "Mobile App" ? "bg-cyan-500/15" : "bg-violet-600/15"
                  }`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Left: Interactive Media Stage */}
                  <div className="lg:col-span-7">
                    <div
                      className="group relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#090914] border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.7)] cursor-pointer"
                      onClick={() => setSelectedProject(activeProject)}
                    >
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 700px"
                        priority
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Vignette & Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06060e] via-[#06060e]/30 to-transparent opacity-85" />

                      {/* Category & Year HUD Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#070710]/85 backdrop-blur-xl border border-white/15 text-zinc-200 shadow-md">
                          {activeProject.category}
                        </span>
                        <span className="px-3 py-1.5 rounded-full text-xs font-mono text-zinc-400 bg-[#070710]/85 backdrop-blur-xl border border-white/10">
                          {activeProject.year}
                        </span>
                      </div>

                      {/* Flagship Index Pill */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-violet-600/80 backdrop-blur-md text-white font-mono text-xs font-bold border border-violet-400/30">
                        {currentIndex + 1} / {filteredProjects.length}
                      </div>

                      {/* Telemetry Metric Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#090914]/90 backdrop-blur-xl border border-cyan-500/30 flex items-center justify-between shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                          <span className="font-mono text-xs sm:text-sm font-semibold text-cyan-300">
                            {activeProject.metrics}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline-block">
                          {activeProject.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Technical Details & Actions */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Sub-badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                        <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
                          {activeProject.role}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                        {activeProject.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-sm font-mono text-cyan-300 font-medium mb-4">
                        {activeProject.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal mb-6">
                        {activeProject.description}
                      </p>

                      {/* Tech Stack Cloud */}
                      <div className="pt-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-3">
                          Core Architecture & Technologies
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-200 bg-white/[0.04] border border-white/[0.08] hover:border-violet-500/40 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setSelectedProject(activeProject)}
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] transition-all flex items-center gap-2 border border-violet-400/30 group"
                      >
                        <span>Explore Case Study</span>
                        <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>

                      {activeProject.githubUrl && (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-2"
                        >
                          <span>Source Code</span>
                          <span className="text-zinc-500">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/[0.06]">
              {/* Slide Navigator Pills */}
              <div className="flex items-center gap-2">
                {filteredProjects.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentIndex(i)}
                    title={`Jump to ${p.title}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === i
                        ? "w-8 bg-gradient-to-r from-violet-500 to-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Arrow Controls */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-500 mr-2">
                  Use arrow keys or click to navigate
                </span>
                <MagneticButton
                  as="button"
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full bg-white/[0.04] hover:bg-violet-600/20 border border-white/[0.1] hover:border-violet-500/40 text-white flex items-center justify-center transition-all shadow-md group"
                >
                  <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </MagneticButton>
                <MagneticButton
                  as="button"
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-white/[0.04] hover:bg-violet-600/20 border border-white/[0.1] hover:border-violet-500/40 text-white flex items-center justify-center transition-all shadow-md group"
                >
                  <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </MagneticButton>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODEL B: PRODUCTION MATRIX GRID LIST                          */}
        {/* ------------------------------------------------------------- */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] hover:border-violet-500/50 flex flex-col justify-between group transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Image Preview */}
                  <div
                    className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-[#0a0a16] cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090914] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#070710]/80 backdrop-blur-md border border-white/15 text-zinc-200">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-zinc-400 bg-[#070710]/80 backdrop-blur-md border border-white/10">
                        {project.year}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-violet-600/80 backdrop-blur-md text-white font-mono text-xs flex items-center justify-center font-bold">
                      0{idx + 1}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 px-3.5 py-2 rounded-xl bg-[#090914]/85 backdrop-blur-md border border-violet-500/30 text-xs font-mono text-cyan-300 flex items-center justify-between">
                      <span>{project.metrics}</span>
                      <span className="text-[10px] text-zinc-400 font-sans">{project.role}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-violet-400/90 mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Chips and Actions */}
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
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-cyan-300 transition-colors py-1 group/btn"
                    >
                      <span>Explore Case Study</span>
                      <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-zinc-400 hover:text-violet-400 transition-colors"
                      >
                        Source Code ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE CASE STUDY MODAL DRAWER                           */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#0b0b16] border border-white/15 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close Case Study"
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors z-20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Banner Image */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-lg">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b16] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-violet-600/90 text-white font-semibold">
                    {selectedProject.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-black/70 backdrop-blur-md border border-cyan-500/30">
                    {selectedProject.metrics}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-2">
                    <span>Role: {selectedProject.role}</span>
                    <span>•</span>
                    <span>Year: {selectedProject.year}</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm font-mono text-violet-400 font-medium mt-1">
                    {selectedProject.tagline}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold mb-2">
                    System Architecture & Engineering Impact
                  </h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-500 mb-3">
                    Applied Stack & Toolchain
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-200 bg-white/[0.06] border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-white/10">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-mono text-white transition-colors"
                    >
                      View Source Code ↗
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs tracking-wider uppercase transition-all"
                  >
                    Close Overview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FOUNDERS_DATA, Founder } from "@/data/founders";

function FounderCard({
  founder,
  index = 0,
  direction = "center",
}: {
  founder: Founder;
  index?: number;
  direction?: "left" | "right" | "center";
}) {
  const [imageError, setImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const initialX = shouldReduceMotion || direction === "center" ? 0 : direction === "left" ? -60 : 60;
  const initialY = shouldReduceMotion ? 0 : direction === "center" ? 40 : 0;

  return (
    <motion.article
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] hover:border-violet-500/50 hover:ring-2 hover:ring-violet-500/40 transition-all duration-500 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      {/* Ambient background glow on hover */}
      <div className="absolute -top-24 -right-24 w-52 h-52 bg-violet-600/15 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Square Portrait with subtle scale and gradient fallback */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-violet-950/50 via-[#0d0d1a] to-cyan-950/40 border border-white/10 group-hover:border-violet-500/40 transition-all duration-500 shadow-inner">
          {!imageError ? (
            <Image
              src={founder.image}
              alt={`Portrait of ${founder.name}, ${founder.role}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
              className="object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Gradient Fallback when image is missing or errors */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-violet-900/60 via-indigo-950/80 to-cyan-900/60 p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-violet-600/30 border border-violet-400/40 flex items-center justify-center text-violet-300 font-mono text-2xl font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] mb-3">
                {founder.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                {founder.role}
              </span>
            </div>
          )}

          {/* Role Pill Overlay */}
          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-[#070710]/85 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6]" />
            <span>{founder.role.split("&")[0].trim()} // </span>
            <span className="text-[#8b5cf6] font-bold">0{index + 1}</span>
          </div>
        </div>

        {/* Name and Role */}
        <div className="mb-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-violet-200 transition-colors">
            {founder.name}
          </h3>
          <p className="text-sm font-semibold font-mono text-[#8b5cf6] mt-1 flex items-center gap-2">
            <span>{founder.role}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-[#06b6d4] text-xs font-normal">
              {founder.id === "founder"
                ? "Flutter • React Native • .NET • PHP"
                : "React Js • Angular • .NET"}
            </span>
          </p>
        </div>

        {/* Short Bio */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
          {founder.bio}
        </p>

        {/* Skill Tags cycling 4 Quad-Accent Colors */}
        <div className="mb-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2.5">
            Core Competencies
          </span>
          <div className="flex flex-wrap gap-1.5">
            {founder.skills.map((skill, index) => {
              const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];
              const c = colors[index % colors.length];

              return (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono text-zinc-300 bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c }} />
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Social Links with Keyboard Focus */}
      <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-500">Connect</span>
        <div className="flex items-center gap-2">
          {founder.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-violet-600/20 border border-white/[0.08] hover:border-violet-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050a]"
              data-cursor-hover
            >
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Founders() {
  return (
    <section
      id="founders"
      className="relative py-32 bg-[#06060c] overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 mr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            </div>
            <span className="text-xs uppercase font-mono tracking-widest text-violet-400">
              [ 05 // LEADERSHIP & ARCHITECTS ]
            </span>
            <div className="h-[1px] w-8 bg-violet-500/30" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Meet the <span className="text-[#8b5cf6]">{FOUNDERS_DATA.length > 1 ? "Founders & Leadership." : "Founder & Architect."}</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            The engineering leadership driving <span className="text-[#8b5cf6]">cross-platform mobile apps (Flutter, React Native)</span>, <span className="text-[#06b6d4]">robust backends (.NET, PHP)</span>, and <span className="text-[#10b981]">dynamic web platforms (React Js, Angular)</span>.
          </p>
        </div>

        {/* Founders Grid */}
        <div className={`grid grid-cols-1 ${FOUNDERS_DATA.length > 1 ? "lg:grid-cols-2 gap-8 max-w-5xl" : "max-w-xl"} mx-auto`}>
          {FOUNDERS_DATA.map((founder, index) => (
            <FounderCard
              key={founder.id}
              founder={founder}
              index={index}
              direction={FOUNDERS_DATA.length > 1 ? (index === 0 ? "left" : "right") : "center"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

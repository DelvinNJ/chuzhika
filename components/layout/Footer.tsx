"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="relative bg-[#040408] border-t border-white/[0.08] overflow-hidden pt-20 pb-12">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Logo size={72} showGlow={true} />
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black tracking-wider text-white uppercase">
                  {PORTFOLIO_DATA.profile.name}
                </span>
                <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
                  Digital Engineering Studio
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Engineering cutting-edge <span className="text-[#8b5cf6] font-medium">mobile apps</span> and dynamic{" "}
              <span className="text-[#06b6d4] font-medium">web ecosystems</span> with{" "}
              <span className="text-[#10b981] font-medium">high-octane performance</span>, dark futuristic aesthetics, and{" "}
              <span className="text-[#f59e0b] font-medium">surgical precision</span>.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              {PORTFOLIO_DATA.profile.status}
            </div>
          </div>


          {/* Connect / Socials */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-violet-400 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
              Connect & Source
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {PORTFOLIO_DATA.socials.map((social) => (
                <MagneticButton
                  key={social.name}
                  as="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-violet-600/20 border border-white/[0.08] hover:border-violet-500/40 text-xs font-medium text-zinc-300 hover:text-white transition-all shadow-sm"
                >
                  {social.name}
                </MagneticButton>
              ))}
            </div>
            <div className="pt-2">
              <span className="text-xs text-zinc-500 block">Direct Inquiries:</span>
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="text-sm font-mono text-zinc-300 hover:text-cyan-400 transition-colors font-medium"
                data-cursor-hover
              >
                {PORTFOLIO_DATA.profile.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span>QUAD SPECTRUM ACTIVE</span>
            <span className="flex items-center gap-1 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

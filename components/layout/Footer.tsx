"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative bg-[#040408] border-t border-white/[0.08] overflow-hidden pt-20 pb-12">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-black text-white text-sm shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                C
              </div>
              <span className="text-xl font-bold tracking-wider text-white uppercase">
                {PORTFOLIO_DATA.profile.name}
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Engineering cutting-edge mobile apps and dynamic web ecosystems with high-octane performance, dark futuristic aesthetics, and surgical precision.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {PORTFOLIO_DATA.profile.status}
            </div>
          </div>


          {/* Connect / Socials */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-violet-600 dark:text-violet-400 font-bold">
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
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-violet-600/10 dark:bg-white/[0.03] dark:hover:bg-violet-600/20 border border-slate-200 dark:border-white/[0.08] hover:border-violet-500/40 text-xs font-medium text-zinc-700 hover:text-violet-700 dark:text-zinc-300 dark:hover:text-white transition-all shadow-sm"
                >
                  {social.name}
                </MagneticButton>
              ))}
            </div>
            <div className="pt-2">
              <span className="text-xs text-zinc-500 block">Direct Inquiries:</span>
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="text-sm font-mono text-zinc-800 hover:text-violet-600 dark:text-zinc-300 dark:hover:text-cyan-400 transition-colors font-medium"
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

          <div className="flex items-center gap-6">
            <span>Built with Next.js 16 • GSAP • Lenis • Tailwind</span>
            <MagneticButton
              as="button"
              onClick={() => scrollTo("#hero", { offset: 0 })}
              className="flex items-center gap-1.5 text-zinc-600 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-300 transition-colors"
            >
              Back to top
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

interface LogoProps {
  className?: string;
  size?: number; // width/height in px
  showGlow?: boolean;
  animated?: boolean;
}

/**
 * Chuzhika Brand Logo — Concept 4: Dual 'C' Magnetic Pull & Funnel Spindle
 */
export default function Logo({
  className = "",
  size = 38,
  showGlow = true,
  animated = false,
}: LogoProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Chuzhika Logo"
    >
      {/* Ambient magnetic neon glow */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full blur-lg opacity-70 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(6,182,212,0.4) 60%, transparent 80%)",
            transform: "scale(1.3)",
          }}
        />
      )}

      {/* Render exact high-fidelity Concept 4 rendered image */}
      <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center z-10">
        <Image
          src={getAssetPath("/images/logo-transparent.png")}
          alt="Chuzhika Logo"
          width={size * 2}
          height={size * 2}
          className={`w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] ${
            animated ? "animate-pulse" : ""
          }`}
          priority
        />
      </div>
    </div>
  );
}

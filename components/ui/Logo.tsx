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
  size = 48,
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
          className="absolute inset-0 rounded-full blur-xl opacity-80 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(6,182,212,0.45) 55%, transparent 75%)",
            transform: "scale(1.35)",
          }}
        />
      )}

      {/* Render high-fidelity transparent brand logo */}
      <div className="relative w-full h-full flex items-center justify-center z-10">
        <Image
          src={getAssetPath("/images/logo-transparent.png")}
          alt="Chuzhika Logo"
          width={size * 2}
          height={size * 2}
          className={`w-full h-full object-contain transform scale-110 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] drop-shadow-[0_0_18px_rgba(139,92,246,0.5)] ${
            animated ? "animate-pulse" : ""
          }`}
          priority
        />
      </div>
    </div>
  );
}

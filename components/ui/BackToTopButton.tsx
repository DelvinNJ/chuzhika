"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useLoading } from "@/components/providers/LoadingContext";

const SHOW_AFTER_PX = 400;
const RING_RADIUS = 21;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/**
 * Floating "back to top" button.
 * Appears after scrolling down, shows page scroll progress as a ring,
 * and scrolls smoothly to the hero section.
 */
export default function BackToTopButton() {
  const { scrollTo } = useSmoothScroll();
  const { isReady } = useLoading();
  const [isShown, setIsShown] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setIsShown(y > SHOW_AFTER_PX);
      setProgress(max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isReady && isShown && (
        <motion.button
          id="back-to-top-button"
          type="button"
          aria-label="Back to top"
          title="Back to top"
          data-cursor-hover
          onClick={() => scrollTo("#hero", { offset: 0, duration: 1.6 })}
          initial={{ opacity: 0, y: 24, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.7 }}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[90] w-12 h-12 rounded-full bg-[#0c0c1c]/85 backdrop-blur-xl border border-white/10 flex items-center justify-center text-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_34px_rgba(34,211,238,0.5)] hover:text-white transition-shadow duration-300"
        >
          {/* Scroll progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="back-to-top-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <circle
              cx="24"
              cy="24"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r={RING_RADIUS}
              fill="none"
              stroke="url(#back-to-top-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
            />
          </svg>

          {/* Arrow */}
          <svg
            className="relative w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

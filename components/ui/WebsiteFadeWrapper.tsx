"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLoading } from "@/components/providers/LoadingContext";

export default function WebsiteFadeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isReady } = useLoading();
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const motionPref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(motionPref);
  }, []);

  // Before hydration, keep layout standard
  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col w-full relative opacity-0">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, filter: "blur(12px)", scale: 0.99, y: 8 }
      }
      animate={
        isReady
          ? reducedMotion
            ? { opacity: 1 }
            : { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }
          : reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, filter: "blur(12px)", scale: 0.99, y: 8 }
      }
      transition={{
        duration: reducedMotion ? 0.3 : 1.25,
        ease: [0.16, 1, 0.3, 1], // Cinematic, silky smooth deceleration
      }}
      className="flex-1 flex flex-col w-full relative transition-colors duration-500"
    >
      {children}
    </motion.div>
  );
}

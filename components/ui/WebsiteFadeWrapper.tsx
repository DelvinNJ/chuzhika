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
      initial={{ opacity: 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      transition={{
        duration: reducedMotion ? 0.3 : 1.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex-1 flex flex-col w-full relative"
    >
      {children}
    </motion.div>
  );
}

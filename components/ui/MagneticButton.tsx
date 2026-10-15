"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.35,
  as = "button",
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const motionContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.1 }}
      className="inline-flex items-center justify-center"
      data-cursor-hover
    >
      {as === "a" ? (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={className}
        >
          {children}
        </a>
      ) : as === "button" ? (
        <button type="button" onClick={onClick} className={className}>
          {children}
        </button>
      ) : (
        <div onClick={onClick} className={className}>
          {children}
        </div>
      )}
    </motion.div>
  );

  return motionContent;
}

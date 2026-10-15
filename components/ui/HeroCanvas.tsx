"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic particle field with cybernetic nodes
    const numStars = Math.min(160, Math.max(60, Math.floor((width * height) / 12000)));

    interface Star {
      x: number;
      y: number;
      z: number;
      pz: number;
      color: string;
      size: number;
    }

    const colors = ["#8b5cf6", "#a78bfa", "#22d3ee", "#38bdf8", "#c084fc", "#e0e7ff"];
    const stars: Star[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2.2,
        y: (Math.random() - 0.5) * height * 2.2,
        z: Math.random() * width,
        pz: width,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 0.8,
      });
    }

    // Scroll tracking: acceleration + perspective shift
    let scrollProgress = 0;
    let scrollVelocity = 0;

    const scrollTrigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress = self.progress;
        scrollVelocity = Math.min(Math.abs(self.getVelocity() / 150), 18);
      },
    });

    // Interactive mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.22;
      targetMouseY = (e.clientY - height / 2) * 0.22;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Warp speed increases when scrolling
      const currentSpeed = 1.0 + scrollVelocity * 1.5 + scrollProgress * 5;
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + mouseX;
      const cy = height / 2 + mouseY;

      const fov = 300;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.pz = star.z;
        star.z -= currentSpeed;

        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 2.2;
          star.y = (Math.random() - 0.5) * height * 2.2;
        }

        const k = fov / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = fov / star.pz;
        const prevX = star.x * pk + cx;
        const prevY = star.y * pk + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthAlpha = Math.min(1, (1 - star.z / width) * 1.4);
          const fadeWithScroll = Math.max(0, 1 - scrollProgress * 0.9);
          const alpha = depthAlpha * fadeWithScroll;

          if (alpha > 0.01) {
            ctx.strokeStyle = star.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = Math.max(0.6, star.size * (1 - star.z / width) * 1.8);

            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.stroke();

            // Luminous glowing nodes on closer particles
            if (star.z < width * 0.35) {
              ctx.fillStyle = star.color;
              ctx.beginPath();
              ctx.arc(px, py, star.size * 1.4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      scrollTrigger.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2] w-full h-full mix-blend-screen opacity-80"
    />
  );
}

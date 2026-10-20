"use client";

import React, { useEffect, useRef } from "react";

interface TornadoLoaderCanvasProps {
  progress: number;
}

export default function TornadoLoaderCanvas({ progress }: TornadoLoaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const size = 380;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;

    const QUAD_COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#a78bfa", "#67e8f9"];

    const numArms = 3;
    const numParticles = 150;

    interface SwirlParticle {
      radius: number; // distance from center
      angle: number; // orbital angle
      speed: number; // angular speed
      radialSpeed: number; // inward suction speed
      color: string;
      size: number;
      arm: number;
      prevX: number;
      prevY: number;
    }

    const particles: SwirlParticle[] = [];

    for (let i = 0; i < numParticles; i++) {
      const arm = i % numArms;
      const initialRadius = Math.random() * 140 + 25;
      const armOffset = (arm * Math.PI * 2) / numArms;
      const angle = armOffset + (initialRadius / 140) * Math.PI * 1.8;

      particles.push({
        radius: initialRadius,
        angle,
        speed: (Math.random() * 0.02 + 0.025) * (Math.random() > 0.1 ? 1 : 1),
        radialSpeed: Math.random() * 0.6 + 0.4,
        color: QUAD_COLORS[i % QUAD_COLORS.length],
        size: Math.random() * 2.2 + 0.8,
        arm,
        prevX: 0,
        prevY: 0,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      const currentProgress = progressRef.current;

      // Tornado spin acceleration based on loader progress
      const progressMult = 1.0 + (currentProgress / 100) * 2.2;
      const isBursting = currentProgress >= 100;

      ctx.clearRect(0, 0, size, size);

      // Ambient Central Tornado Eye Glow
      const eyeGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 150);
      eyeGrad.addColorStop(0, "rgba(139, 92, 246, 0.22)");
      eyeGrad.addColorStop(0.35, "rgba(6, 182, 212, 0.14)");
      eyeGrad.addColorStop(0.65, "rgba(16, 185, 129, 0.06)");
      eyeGrad.addColorStop(1, "transparent");
      ctx.fillStyle = eyeGrad;
      ctx.fillRect(0, 0, size, size);

      // Render 3 Spiral Tornado Filament Arms
      ctx.lineWidth = 1;
      for (let a = 0; a < numArms; a++) {
        const armAngle = (a * Math.PI * 2) / numArms + time * 1.4 * progressMult;
        ctx.beginPath();
        for (let r = 20; r < 160; r += 6) {
          const spiralAngle = armAngle + Math.log(r * 0.1) * 2.2;
          const sx = cx + Math.cos(spiralAngle) * r;
          const sy = cy + Math.sin(spiralAngle) * r * 0.72; // 3D perspective tilt
          if (r === 20) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = a === 0 ? "rgba(139,92,246,0.18)" : a === 1 ? "rgba(6,182,212,0.18)" : "rgba(16,185,129,0.14)";
        ctx.stroke();
      }

      // Render Tornado Swirl Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Angular spin around tornado vortex (inner particles spin faster)
        const innerSpeedBoost = 120 / Math.max(30, p.radius);
        p.angle += p.speed * innerSpeedBoost * progressMult;

        if (isBursting) {
          // Centrifugal shockwave expansion on 100% completion
          p.radius += 5.5;
        } else {
          // Inward funnel suction draft: particles spiral into the center
          p.radius -= p.radialSpeed * progressMult;

          // Recycle particles to outer funnel perimeter once they reach core
          if (p.radius < 18) {
            p.radius = 160;
            const armOffset = (p.arm * Math.PI * 2) / numArms;
            p.angle = armOffset + Math.random() * 0.8;
            p.prevX = 0;
            p.prevY = 0;
          }
        }

        // 3D perspective squish (tilted tornado funnel viewing angle)
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.72;

        const distanceAlpha = Math.min(1, Math.max(0.15, (p.radius - 15) / 90));
        const alpha = isBursting ? Math.max(0, 1 - (p.radius - 100) / 80) : distanceAlpha;

        if (alpha > 0.05) {
          // Draw fast vortex velocity trail
          if (p.prevX !== 0 && p.prevY !== 0) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = alpha * 0.75;
            ctx.lineWidth = Math.max(0.6, p.size * 0.9);
            ctx.moveTo(p.prevX, p.prevY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }

          // Draw Glowing Tornado Node
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.prevX = x;
          p.prevY = y;
        } else {
          p.prevX = 0;
          p.prevY = 0;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] mix-blend-screen"
    />
  );
}

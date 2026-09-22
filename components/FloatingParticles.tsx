"use client";

import React, { useEffect, useRef } from "react";

interface FloatingParticlesProps {
  density?: number;
  speed?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  alphaSpeed: number;
  pulseOffset: number;
}

export default function FloatingParticles({
  density = 24,
  speed = 0.5,
  className = "",
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    // Limit DPI to 1.5 max to save 75% GPU memory on 3x Retina displays like iPhone 16 Pro Max
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener("resize", handleResize);

    // Pre-render a cached golden particle sprite (dramatically boosts FPS on iOS)
    const spriteSize = 32;
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteSize;
    spriteCanvas.height = spriteSize;
    const sCtx = spriteCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(
        spriteSize / 2,
        spriteSize / 2,
        0,
        spriteSize / 2,
        spriteSize / 2,
        spriteSize / 2
      );
      grad.addColorStop(0, "rgba(255, 245, 200, 1)");
      grad.addColorStop(0.3, "rgba(246, 201, 69, 0.7)");
      grad.addColorStop(0.7, "rgba(230, 160, 30, 0.2)");
      grad.addColorStop(1, "rgba(246, 201, 69, 0)");
      sCtx.fillStyle = grad;
      sCtx.beginPath();
      sCtx.arc(spriteSize / 2, spriteSize / 2, spriteSize / 2, 0, Math.PI * 2);
      sCtx.fill();
    }

    // Number of particles (optimized for mobile)
    const count = Math.min(density, 22);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * 2.5 + 1.2) * dpr,
        vx: (Math.random() - 0.5) * 0.25 * speed * dpr,
        vy: (-Math.random() * 0.45 * speed - 0.1) * dpr,
        alpha: Math.random() * 0.5,
        maxAlpha: Math.random() * 0.5 + 0.3,
        alphaSpeed: (Math.random() * 0.008 + 0.003) * speed,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.25 * dpr;
        p.y += p.vy;

        p.alpha += p.alphaSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.05) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        // Blit pre-rendered sprite using GPU
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        const drawRadius = p.size * 3;
        ctx.drawImage(
          spriteCanvas,
          p.x - drawRadius,
          p.y - drawRadius,
          drawRadius * 2,
          drawRadius * 2
        );
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-10 w-full h-full ${className}`}
      style={{ transform: "translateZ(0)" }}
    />
  );
}

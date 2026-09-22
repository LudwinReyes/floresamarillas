"use client";

import React, { useEffect, useRef } from "react";

interface FloatingParticlesProps {
  density?: number;
  speed?: number;
  glowColor?: string;
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
  density = 35,
  speed = 0.6,
  glowColor = "246, 201, 69", // Golden tulip amber RGB
  className = "",
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize particles
    const count = Math.min(density, Math.floor((width * height) / 25000));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.3 * speed,
        vy: -Math.random() * 0.45 * speed - 0.1,
        alpha: Math.random() * 0.5,
        maxAlpha: Math.random() * 0.55 + 0.25,
        alphaSpeed: (Math.random() * 0.008 + 0.003) * speed,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.25;
        p.y += p.vy;

        // Pulse alpha
        p.alpha += p.alphaSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.05) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Screen wrap
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle with soft golden glow
        ctx.save();
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3.5
        );
        gradient.addColorStop(0, `rgba(${glowColor}, ${p.alpha})`);
        gradient.addColorStop(0.4, `rgba(${glowColor}, ${p.alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${glowColor}, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Core bright center
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 250, 230, ${Math.min(1, p.alpha * 1.5)})`;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-10 ${className}`}
    />
  );
}

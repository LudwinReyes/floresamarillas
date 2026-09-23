"use client";

import React, { useEffect, useRef } from "react";

interface FloatingParticlesProps {
  density?: number;
  className?: string;
}

export default function FloatingParticles({ density = 14, className = "" }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Hard-cap DPR at 1 on mobile to minimize GPU memory pressure
    const dpr = Math.min(window.devicePixelRatio || 1, 1);
    let w = (canvas.width  = window.innerWidth  * dpr);
    let h = (canvas.height = window.innerHeight * dpr);

    const onResize = () => {
      w = canvas.width  = window.innerWidth  * dpr;
      h = canvas.height = window.innerHeight * dpr;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Pre-render sprite once — no per-frame gradient creation
    const S = 28;
    const sp = document.createElement("canvas");
    sp.width = sp.height = S;
    const sc = sp.getContext("2d")!;
    const g = sc.createRadialGradient(S/2, S/2, 0, S/2, S/2, S/2);
    g.addColorStop(0,   "rgba(255,245,200,1)");
    g.addColorStop(0.35,"rgba(246,201,69,0.7)");
    g.addColorStop(0.75,"rgba(230,160,30,0.2)");
    g.addColorStop(1,   "rgba(246,201,69,0)");
    sc.fillStyle = g;
    sc.beginPath(); sc.arc(S/2, S/2, S/2, 0, Math.PI*2); sc.fill();

    // Small fixed count — no dynamic density math
    const N = Math.min(density, 14);
    const px = new Float32Array(N), py = new Float32Array(N),
          pvx= new Float32Array(N), pvy= new Float32Array(N),
          pa = new Float32Array(N), pma= new Float32Array(N),
          pas= new Float32Array(N), ppo= new Float32Array(N),
          psz= new Float32Array(N);

    for (let i = 0; i < N; i++) {
      px[i]  = Math.random() * w;
      py[i]  = Math.random() * h;
      pvx[i] = (Math.random() - 0.5) * 0.18 * dpr;
      pvy[i] = -(Math.random() * 0.35 + 0.08) * dpr;
      pa[i]  = Math.random() * 0.45;
      pma[i] = Math.random() * 0.45 + 0.25;
      pas[i] = (Math.random() * 0.006 + 0.002);
      ppo[i] = Math.random() * Math.PI * 2;
      psz[i] = (Math.random() * 2 + 1.2) * dpr;
    }

    let t = 0, raf: number;
    const render = () => {
      t += 0.018;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < N; i++) {
        px[i] += pvx[i] + Math.sin(t + ppo[i]) * 0.2 * dpr;
        py[i] += pvy[i];
        pa[i] += pas[i];
        if (pa[i] > pma[i] || pa[i] < 0.04) pas[i] *= -1;
        if (py[i] < -12) { py[i] = h + 12; px[i] = Math.random() * w; }
        if (px[i] < -12) px[i] = w + 12;
        if (px[i] > w + 12) px[i] = -12;

        ctx.globalAlpha = Math.max(0, Math.min(1, pa[i]));
        const r = psz[i] * 2.8;
        ctx.drawImage(sp, px[i]-r, py[i]-r, r*2, r*2);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-10 w-full h-full ${className}`}
      style={{ transform: "translateZ(0)", willChange: "transform" }}
    />
  );
}

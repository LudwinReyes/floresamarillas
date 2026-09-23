"use client";

import React, { useMemo } from "react";
import Tulip from "./Tulip";

interface TulipGardenProps {
  onTulipClick?: (msg: string) => void;
  className?: string;
}

export default function TulipGarden({ onTulipClick, className = "" }: TulipGardenProps) {
  const eggs = useMemo(() => [
    "Este también es para ti.",
    "Uno más porque sí.",
    "Este me gustó especialmente.",
    "🌷",
    "Para que sonrías hoy.",
    "Nunca dejes de brillar.",
    "Hecho con mucho cariño.",
  ], []);

  // ── Keep TOTAL tulip count low for iOS perf ──
  // 4 background (blurred, non-interactive) + 5 foreground = 9 total
  const bg = useMemo(() => [
    { id: "b1", left: "10%",  scale: 0.54, height: 195, delay: 0.2, tilt: -6,  dur: 7.0 },
    { id: "b2", left: "32%",  scale: 0.52, height: 188, delay: 0.4, tilt:  4,  dur: 7.5 },
    { id: "b3", left: "62%",  scale: 0.55, height: 200, delay: 0.3, tilt: -5,  dur: 6.8 },
    { id: "b4", left: "86%",  scale: 0.50, height: 182, delay: 0.5, tilt:  7,  dur: 7.2 },
  ], []);

  const fg = useMemo(() => [
    { id: "f1", left: "5%",   scale: 0.88, height: 265, delay: 0.6, tilt: -5,  dur: 5.0, egg: eggs[0] },
    { id: "f2", left: "24%",  scale: 0.94, height: 280, delay: 0.9, tilt:  4,  dur: 4.7, egg: eggs[1] },
    { id: "f3", left: "48%",  scale: 0.96, height: 285, delay: 1.1, tilt:  1,  dur: 5.2, egg: eggs[2] },
    { id: "f4", left: "70%",  scale: 0.91, height: 270, delay: 0.8, tilt: -4,  dur: 4.9, egg: eggs[4] },
    { id: "f5", left: "92%",  scale: 0.87, height: 260, delay: 0.7, tilt:  6,  dur: 5.4, egg: eggs[3] },
  ], [eggs]);

  return (
    <div className={`relative w-full h-full overflow-visible pointer-events-none ${className}`}>
      {/* Ground mist */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#263A29]/80 via-[#3B2508]/30 to-transparent pointer-events-none" />

      {/* Background (blurred, not interactive — zero touch cost) */}
      <div className="absolute bottom-4 inset-x-0 h-full overflow-visible pointer-events-none"
           style={{ filter: "blur(1.5px)", opacity: 0.65 }}>
        {bg.map(t => (
          <div key={t.id} className="absolute bottom-0 overflow-visible"
               style={{ left: t.left, transform: "translateX(-50%)" }}>
            <Tulip id={t.id} scale={t.scale} height={t.height} delay={t.delay}
                   tilt={t.tilt} swayDuration={t.dur} interactive={false} />
          </div>
        ))}
      </div>

      {/* Foreground (sharp, interactive) */}
      <div className="absolute bottom-0 inset-x-0 h-full overflow-visible pointer-events-auto z-20">
        {fg.map(t => (
          <div key={t.id} className="absolute bottom-0 overflow-visible"
               style={{ left: t.left, transform: "translateX(-50%)" }}>
            <Tulip id={t.id} scale={t.scale} height={t.height} delay={t.delay}
                   tilt={t.tilt} swayDuration={t.dur} easterEggText={t.egg}
                   interactive={true} onClick={() => onTulipClick?.(t.egg)} />
          </div>
        ))}
      </div>

      {/* Ground base */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#152016] to-transparent z-30 pointer-events-none" />
    </div>
  );
}

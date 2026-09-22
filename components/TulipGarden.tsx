"use client";

import React, { useMemo } from "react";
import Tulip from "./Tulip";

interface TulipGardenProps {
  density?: "sparse" | "normal" | "lush" | "infinite";
  onTulipClick?: (message: string) => void;
  className?: string;
  isHeroMode?: boolean;
}

export default function TulipGarden({
  density = "normal",
  onTulipClick,
  className = "",
  isHeroMode = false,
}: TulipGardenProps) {
  // Easter egg quotes requested by the user
  const easterEggs = useMemo(
    () => [
      "Este también es para ti.",
      "Uno más porque sí.",
      "Este me gustó especialmente.",
      "🌷",
      "Para que sonrías hoy.",
      "Nunca dejes de brillar, Pancha.",
      "Hecho con mucho cariño.",
    ],
    []
  );

  // Background tulips (depth layer 1, soft focus)
  const backgroundTulips = useMemo(() => {
    return [
      { id: "bg-1", left: "6%", scale: 0.52, height: 200, delay: 0.2, tilt: -8, swayDuration: 6.8 },
      { id: "bg-2", left: "18%", scale: 0.56, height: 215, delay: 0.5, tilt: 4, swayDuration: 7.2 },
      { id: "bg-3", left: "32%", scale: 0.5, height: 195, delay: 0.3, tilt: -3, swayDuration: 6.2 },
      { id: "bg-4", left: "48%", scale: 0.58, height: 220, delay: 0.7, tilt: 6, swayDuration: 7.5 },
      { id: "bg-5", left: "64%", scale: 0.52, height: 205, delay: 0.4, tilt: -5, swayDuration: 6.5 },
      { id: "bg-6", left: "78%", scale: 0.55, height: 215, delay: 0.8, tilt: 5, swayDuration: 7.0 },
      { id: "bg-7", left: "92%", scale: 0.48, height: 190, delay: 0.3, tilt: -4, swayDuration: 6.3 },
    ];
  }, []);

  // Midground tulips (depth layer 2, body of the field)
  const midgroundTulips = useMemo(() => {
    return [
      { id: "mid-1", left: "12%", scale: 0.72, height: 235, delay: 0.6, tilt: 5, swayDuration: 5.6 },
      { id: "mid-2", left: "25%", scale: 0.76, height: 245, delay: 0.9, tilt: -6, swayDuration: 5.2 },
      { id: "mid-3", left: "40%", scale: 0.74, height: 240, delay: 0.4, tilt: 3, swayDuration: 5.8 },
      { id: "mid-4", left: "58%", scale: 0.78, height: 250, delay: 0.8, tilt: -4, swayDuration: 5.4 },
      { id: "mid-5", left: "72%", scale: 0.73, height: 238, delay: 0.5, tilt: 5, swayDuration: 5.7 },
      { id: "mid-6", left: "86%", scale: 0.75, height: 245, delay: 1.0, tilt: -4, swayDuration: 5.3 },
    ];
  }, []);

  // Foreground tulips (depth layer 3, sharp, tactile, interactive)
  const foregroundTulips = useMemo(() => {
    return [
      {
        id: "fg-1",
        left: "5%",
        scale: 0.88,
        height: 260,
        delay: 0.8,
        tilt: -5,
        swayDuration: 4.8,
        egg: easterEggs[0],
      },
      {
        id: "fg-2",
        left: "20%",
        scale: 0.94,
        height: 275,
        delay: 1.2,
        tilt: 4,
        swayDuration: 4.5,
        egg: easterEggs[1],
      },
      {
        id: "fg-3",
        left: "35%",
        scale: 0.9,
        height: 265,
        delay: 1.0,
        tilt: -3,
        swayDuration: 5.0,
        egg: easterEggs[4],
      },
      {
        id: "fg-4",
        left: "50%",
        scale: 0.96,
        height: 280,
        delay: 1.4,
        tilt: 2,
        swayDuration: 4.6,
        egg: easterEggs[2],
      },
      {
        id: "fg-5",
        left: "66%",
        scale: 0.92,
        height: 270,
        delay: 1.1,
        tilt: -4,
        swayDuration: 4.9,
        egg: easterEggs[5],
      },
      {
        id: "fg-6",
        left: "82%",
        scale: 0.95,
        height: 275,
        delay: 1.3,
        tilt: 4,
        swayDuration: 4.4,
        egg: easterEggs[3],
      },
      {
        id: "fg-7",
        left: "95%",
        scale: 0.88,
        height: 260,
        delay: 0.9,
        tilt: -3,
        swayDuration: 4.7,
        egg: easterEggs[6],
      },
    ];
  }, [easterEggs]);

  return (
    <div className={`relative w-full h-full overflow-visible pointer-events-none ${className}`}>
      {/* Warm horizon sunset glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#263A29]/90 via-[#3B2508]/40 to-transparent pointer-events-none" />

      {/* 1. Background Layer (Soft Depth of field) */}
      <div className="absolute bottom-6 inset-x-0 h-full pointer-events-auto filter blur-[1.2px] opacity-75 overflow-visible">
        {backgroundTulips.map((t) => (
          <div
            key={t.id}
            className="absolute bottom-0 -translate-x-1/2 overflow-visible"
            style={{ left: t.left }}
          >
            <Tulip
              id={t.id}
              scale={t.scale}
              height={t.height}
              delay={t.delay}
              tilt={t.tilt}
              swayDuration={t.swayDuration}
              interactive={false}
            />
          </div>
        ))}
      </div>

      {/* 2. Midground Layer (Dense, lush) */}
      <div className="absolute bottom-3 inset-x-0 h-full pointer-events-auto opacity-90 overflow-visible">
        {midgroundTulips.map((t) => (
          <div
            key={t.id}
            className="absolute bottom-0 -translate-x-1/2 overflow-visible"
            style={{ left: t.left }}
          >
            <Tulip
              id={t.id}
              scale={t.scale}
              height={t.height}
              delay={t.delay}
              tilt={t.tilt}
              swayDuration={t.swayDuration}
              interactive={true}
              onClick={() => onTulipClick?.("Uno más para tu colección 💛")}
            />
          </div>
        ))}
      </div>

      {/* 3. Foreground Layer (Sharp, luminous, interactive) */}
      <div className="absolute bottom-0 inset-x-0 h-full pointer-events-auto z-20 overflow-visible">
        {foregroundTulips.map((t) => (
          <div
            key={t.id}
            className="absolute bottom-0 -translate-x-1/2 overflow-visible"
            style={{ left: t.left }}
          >
            <Tulip
              id={t.id}
              scale={t.scale}
              height={t.height}
              delay={t.delay}
              tilt={t.tilt}
              swayDuration={t.swayDuration}
              easterEggText={t.egg}
              interactive={true}
              onClick={() => onTulipClick?.(t.egg)}
            />
          </div>
        ))}
      </div>

      {/* Earth and mist layer at the very bottom */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#152016] to-transparent z-30 pointer-events-none" />
    </div>
  );
}

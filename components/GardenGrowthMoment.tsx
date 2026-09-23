"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import TulipGarden from "./TulipGarden";
import AudioToggle from "./AudioToggle";

interface GardenGrowthMomentProps {
  onNext: () => void;
}

export default function GardenGrowthMoment({ onNext }: GardenGrowthMomentProps) {
  const [line, setLine] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setLine(1), 1600);
    const t2 = setTimeout(() => setLine(2), 4400);
    const t3 = setTimeout(() => setLine(3), 7200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="scene-fade-enter relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#1C160B] via-[#241A0E] to-[#121B13]">
      {/* Header */}
      <div className="relative z-40 flex items-center justify-between px-6 pt-safe pb-4 w-full max-w-5xl mx-auto">
        <span className="text-xs tracking-widest text-[#F6C945]/70 uppercase font-sans">
          Capítulo I · El Brote
        </span>
        <AudioToggle />
      </div>

      {/* Warm glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[440px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(246,201,69,0.16) 0%, rgba(255,233,138,0.07) 45%, transparent 70%)", filter: "blur(48px)" }} />

      {/* Poetic lines */}
      <div className="relative z-30 max-w-xl mx-auto px-6 text-center space-y-5 pt-2 sm:pt-6">
        {line >= 1 && (
          <p
            className="anim-fade-up text-lg sm:text-2xl md:text-3xl font-serif text-[#FFF8E7] leading-relaxed font-light"
            style={{ "--d": "1.4s", "--dl": "0s" } as React.CSSProperties}
          >
            Dicen que las flores amarillas significan alegría...
          </p>
        )}

        {line >= 2 && (
          <p
            className="anim-fade-up text-xl sm:text-2xl md:text-3xl font-serif text-[#FFE98A] italic leading-relaxed"
            style={{ "--d": "1.4s", "--dl": "0s" } as React.CSSProperties}
          >
            ...pero yo quería darte algo más.
          </p>
        )}

        {line >= 3 && (
          <div
            className="anim-fade-up space-y-5 pt-1"
            style={{ "--d": "1.5s", "--dl": "0s" } as React.CSSProperties}
          >
            <p className="text-2xl sm:text-3xl font-serif text-[#F6C945] font-normal tracking-wide"
               style={{ textShadow: "0 2px 18px rgba(246,201,69,0.28)" }}>
              Un pequeño pedacito de felicidad.
            </p>

            <div
              className="anim-fade-in pt-3"
              style={{ "--d": "0.8s", "--dl": "0.9s" } as React.CSSProperties}
            >
              <button
                onClick={onNext}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-sans tracking-wider text-[#FFF8E7] border border-white/20 hover:border-[#F6C945]/50 active:scale-95 cursor-pointer shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                  transition: "border-color 0.25s, transform 0.15s",
                }}
              >
                <span>Acércate más</span>
                <ChevronRight className="w-4 h-4 text-[#F6C945]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Garden */}
      <div className="relative w-full h-[46vh] sm:h-[48vh] z-20 overflow-visible">
        <TulipGarden />
      </div>
    </div>
  );
}

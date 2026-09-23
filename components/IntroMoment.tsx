"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import AudioToggle from "./AudioToggle";

interface IntroMomentProps {
  onEnter: () => void;
}

export default function IntroMoment({ onEnter }: IntroMomentProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1400);
    const t2 = setTimeout(() => setStep(2), 3200);
    const t3 = setTimeout(() => setStep(3), 4800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="scene-fade-enter relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-[#0A0D0A]">
      <div className="absolute top-safe right-6 z-50">
        <AudioToggle />
      </div>

      {/* Warm aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(58,42,8,0.22)_0%,_rgba(10,13,10,0.88)_55%,_#050605_100%)] pointer-events-none" />

      <div className="relative z-20 max-w-md w-full text-center flex flex-col items-center space-y-7">

        {/* "Pancha..." — always visible, fades in immediately */}
        <h1
          className="anim-fade-up text-4xl sm:text-5xl font-serif text-[#FFF8E7] tracking-wider font-light"
          style={{ "--d": "1.6s", "--dl": "0.1s" } as React.CSSProperties}
        >
          Pancha...
        </h1>

        {step >= 1 && (
          <p
            className="anim-fade-up text-xl sm:text-2xl text-[#FFE98A] font-serif italic tracking-wide"
            style={{ "--d": "1.3s", "--dl": "0s" } as React.CSSProperties}
          >
            Esto es para ti 💛
          </p>
        )}

        {step >= 2 && (
          <p
            className="anim-fade-in text-sm sm:text-base text-[#FFF8E7]/55 font-sans tracking-widest uppercase font-light pt-1"
            style={{ "--d": "1.1s", "--dl": "0s" } as React.CSSProperties}
          >
            Pero primero...
          </p>
        )}

        {step >= 3 && (
          <div
            className="anim-scale-in pt-4"
            style={{ "--d": "0.9s", "--dl": "0s" } as React.CSSProperties}
          >
            <button
              onClick={onEnter}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base sm:text-lg font-medium text-[#1E2319] bg-gradient-to-r from-[#F6C945] via-[#FFE98A] to-[#F6C945] shadow-[0_0_24px_rgba(246,201,69,0.35)] hover:shadow-[0_0_40px_rgba(246,201,69,0.6)] active:scale-95 shimmer-effect cursor-pointer"
              style={{ transition: "box-shadow 0.3s, transform 0.15s" }}
            >
              <Sparkles className="w-4 h-4 text-[#78540B]" />
              <span className="font-serif tracking-wide text-[#423105] font-semibold">Entra</span>
              <ArrowRight className="w-4 h-4 text-[#78540B]" />
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-safe text-center text-xs text-[#FFF8E7]/28 tracking-widest font-sans">
        DÍA DE LAS FLORES AMARILLAS
      </div>
    </div>
  );
}

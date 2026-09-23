"use client";

import React, { useEffect, useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import TulipGarden from "./TulipGarden";
import AudioToggle from "./AudioToggle";

interface FinalGardenMomentProps {
  onRestart: () => void;
}

export default function FinalGardenMoment({ onRestart }: FinalGardenMomentProps) {
  const [easterEgg, setEasterEgg] = useState<string | null>(null);
  const [eggVisible, setEggVisible] = useState(false);

  useEffect(() => {
    // Single one-shot confetti burst — no RAF loop
    confetti({
      particleCount: 60,
      angle: 90,
      spread: 90,
      origin: { x: 0.5, y: 0.6 },
      colors: ["#F6C945", "#FFE98A", "#FFF8E7", "#E5A93C"],
      shapes: ["circle"],
      scalar: 1.1,
      gravity: 0.85,
      decay: 0.93,
    });
    setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.7 },
        colors: ["#F6C945", "#FFE98A"],
        scalar: 0.9,
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.7 },
        colors: ["#F6C945", "#FFE98A"],
        scalar: 0.9,
      });
    }, 400);
  }, []);

  const handleTulipClick = (msg: string) => {
    setEasterEgg(msg);
    setEggVisible(true);
    setTimeout(() => setEggVisible(false), 3200);
  };

  return (
    <div className="scene-fade-enter relative min-h-[100dvh] w-full flex flex-col justify-between overflow-x-hidden overflow-y-auto bg-gradient-to-b from-[#1E180E] via-[#2A1F10] to-[#121B13]">
      {/* Header */}
      <div className="relative z-40 flex items-center justify-between px-6 pt-safe pb-4 w-full max-w-5xl mx-auto">
        <span className="text-xs tracking-widest text-[#F6C945]/80 uppercase font-sans flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F6C945]" />
          Tu Jardín Eterno
        </span>
        <AudioToggle />
      </div>

      {/* Warm glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[520px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(246,201,69,0.2) 0%, rgba(255,233,138,0.07) 50%, transparent 75%)", filter: "blur(48px)" }} />

      {/* Messages */}
      <div className="relative z-30 max-w-2xl mx-auto px-6 text-center space-y-4 pt-2">
        <h1
          className="anim-fade-up text-2xl sm:text-4xl md:text-5xl font-serif text-[#FFF8E7] leading-tight font-light"
          style={{ "--d": "1.4s", "--dl": "0.05s" } as React.CSSProperties}
        >
          Feliz Día de las Flores Amarillas,{" "}
          <span className="text-[#F6C945] font-normal italic" style={{ textShadow: "0 2px 22px rgba(246,201,69,0.4)" }}>
            Pancha 💛
          </span>
        </h1>

        <p
          className="anim-fade-up text-sm sm:text-lg md:text-xl text-[#FFE98A]/88 font-serif italic max-w-lg mx-auto leading-relaxed"
          style={{ "--d": "1.3s", "--dl": "0.7s" } as React.CSSProperties}
        >
          Te hice un jardín entero porque una sola flor me parecía muy poquito.
        </p>

        {/* Easter egg banner — CSS fade, no Framer */}
        <div className="h-8 flex items-center justify-center">
          {easterEgg && (
            <div
              className="anim-scale-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F6C945]/40 text-[#FFE98A] text-xs sm:text-sm font-serif shadow-lg"
              style={{
                background: "rgba(31,34,30,0.9)",
                backdropFilter: "blur(8px)",
                opacity: eggVisible ? 1 : 0,
                transition: "opacity 0.4s ease",
                "--d": "0.4s",
                "--dl": "0s",
              } as React.CSSProperties}
            >
              <span>✨</span>
              <span>{easterEgg}</span>
            </div>
          )}
        </div>

        {/* Restart */}
        <div className="anim-fade-in pt-0" style={{ "--d": "1s", "--dl": "1.6s" } as React.CSSProperties}>
          <button
            onClick={onRestart}
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-sans tracking-wider text-[#FFF8E7]/75 border border-white/15 active:scale-95 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              transition: "background 0.25s, border-color 0.25s, transform 0.15s",
            }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Volver al principio</span>
          </button>
        </div>
      </div>

      {/* Garden */}
      <div className="relative w-full h-[46vh] sm:h-[48vh] z-20 overflow-visible">
        <TulipGarden onTulipClick={handleTulipClick} />
      </div>
    </div>
  );
}

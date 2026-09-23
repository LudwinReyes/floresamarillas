"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import TulipGarden from "./TulipGarden";
import AudioToggle from "./AudioToggle";

interface FinalGardenMomentProps {
  onRestart: () => void;
}

export default function FinalGardenMoment({ onRestart }: FinalGardenMomentProps) {
  const [selectedEasterEgg, setSelectedEasterEgg] = useState<string | null>(null);

  useEffect(() => {
    // Launch a delicate burst of golden sparkles/petals upon entering the final garden
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#F6C945", "#FFE98A", "#FFF8E7", "#E5A93C"],
        shapes: ["circle"],
        scalar: 1.1,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#F6C945", "#FFE98A", "#FFF8E7", "#E5A93C"],
        shapes: ["circle"],
        scalar: 1.1,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const handleTulipEasterEgg = (message: string) => {
    setSelectedEasterEgg(message);
    setTimeout(() => {
      setSelectedEasterEgg((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-x-hidden overflow-y-auto bg-gradient-to-b from-[#1E180E] via-[#2A1F10] to-[#121B13]">
      {/* Top bar with audio control */}
      <div className="relative z-40 flex items-center justify-between px-6 pt-safe pb-4 w-full max-w-5xl mx-auto">
        <span className="text-xs tracking-widest text-[#F6C945]/80 uppercase font-sans flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F6C945]" />
          Tu Jardín Eterno
        </span>
        <AudioToggle />
      </div>

      {/* Atmospheric sunset illumination */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full bg-[radial-gradient(circle,_rgba(246,201,69,0.22)_0%,_rgba(255,233,138,0.08)_50%,_transparent_75%)] pointer-events-none blur-3xl" />

      {/* Central Emotional Message */}
      <div className="relative z-30 max-w-2xl mx-auto px-6 text-center space-y-4 pt-2">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#FFF8E7] leading-tight font-light"
        >
          Feliz Día de las Flores Amarillas,{" "}
          <span className="text-[#F6C945] font-normal italic drop-shadow-[0_2px_20px_rgba(246,201,69,0.4)]">
            Pancha 💛
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.4, ease: "easeOut" }}
          className="text-sm sm:text-lg md:text-xl text-[#FFE98A]/90 font-serif italic max-w-lg mx-auto leading-relaxed"
        >
          Te hice un jardín entero porque una sola flor me parecía muy poquito.
        </motion.p>

        {/* Easter Egg Floating Banner */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence>
            {selectedEasterEgg && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.9 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F221E]/90 border border-[#F6C945]/40 text-[#FFE98A] text-xs sm:text-sm font-serif shadow-lg backdrop-blur-md"
              >
                <span>✨</span>
                <span>{selectedEasterEgg}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Restart Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="pt-0"
        >
          <button
            onClick={onRestart}
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-sans tracking-wider text-[#FFF8E7]/80 hover:text-[#FFF8E7] bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-rotate-90" />
            <span>Volver al principio</span>
          </button>
        </motion.div>
      </div>

      {/* Lush overflowing garden with interactive tulips (Clean, zero clipping) */}
      <div className="relative w-full h-[46vh] sm:h-[48vh] z-20 overflow-visible">
        <TulipGarden onTulipClick={handleTulipEasterEgg} />
      </div>
    </div>
  );
}

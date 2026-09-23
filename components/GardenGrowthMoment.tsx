"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import TulipGarden from "./TulipGarden";
import AudioToggle from "./AudioToggle";

interface GardenGrowthMomentProps {
  onNext: () => void;
}

export default function GardenGrowthMoment({ onNext }: GardenGrowthMomentProps) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    // Line 1: "Dicen que las flores amarillas significan alegría..."
    const t1 = setTimeout(() => setLineIndex(1), 1800);
    // Line 2: "...pero yo quería darte algo más."
    const t2 = setTimeout(() => setLineIndex(2), 4800);
    // Line 3: "Un pequeño pedacito de felicidad."
    const t3 = setTimeout(() => setLineIndex(3), 7800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#1C160B] via-[#241A0E] to-[#121B13]">
      {/* Top navigation with subtle audio button */}
      <div className="relative z-40 flex items-center justify-between px-6 pt-safe pb-4 w-full max-w-5xl mx-auto">
        <span className="text-xs tracking-widest text-[#F6C945]/70 uppercase font-sans">
          Capítulo I · El Brote
        </span>
        <AudioToggle />
      </div>

      {/* Atmospheric sunset radial glow & light rays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(246,201,69,0.18)_0%,_rgba(255,233,138,0.08)_45%,_transparent_70%)] pointer-events-none blur-3xl" />

      {/* Poetic Narrative Lines with Generous Breathing Room */}
      <div className="relative z-30 max-w-xl mx-auto px-6 text-center space-y-6 pt-4 sm:pt-8">
        {lineIndex >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="text-lg sm:text-2xl md:text-3xl font-serif text-[#FFF8E7] leading-relaxed font-light"
          >
            Dicen que las flores amarillas significan alegría...
          </motion.p>
        )}

        {lineIndex >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="text-xl sm:text-2xl md:text-3xl font-serif text-[#FFE98A] italic leading-relaxed"
          >
            ...pero yo quería darte algo más.
          </motion.p>
        )}

        {lineIndex >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="space-y-6 pt-2"
          >
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F6C945] font-normal tracking-wide drop-shadow-[0_2px_15px_rgba(246,201,69,0.3)]">
              Un pequeño pedacito de felicidad.
            </p>

            {/* Transition button to step deeper into the garden */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="pt-4"
            >
              <button
                onClick={onNext}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-sans tracking-wider text-[#FFF8E7] bg-white/10 hover:bg-[#F6C945]/20 border border-white/20 hover:border-[#F6C945]/50 backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              >
                <span>Acércate más</span>
                <ChevronRight className="w-4 h-4 text-[#F6C945] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* The blooming garden rising progressively from the ground */}
      <div className="relative w-full h-[46vh] sm:h-[48vh] z-20 overflow-visible">
        <TulipGarden />
      </div>
    </div>
  );
}

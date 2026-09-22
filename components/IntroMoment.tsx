"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import AudioToggle from "./AudioToggle";

interface IntroMomentProps {
  onEnter: () => void;
}

export default function IntroMoment({ onEnter }: IntroMomentProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step 0: "Pancha..."
    const t1 = setTimeout(() => setStep(1), 1600);
    // Step 1: "Esto es para ti 💛"
    const t2 = setTimeout(() => setStep(2), 3600);
    // Step 2: "Pero primero..." & "Entra" button
    const t3 = setTimeout(() => setStep(3), 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-[#0A0D0A]">
      {/* Subtle top bar for discrete audio activation */}
      <div className="absolute top-safe right-6 z-50">
        <AudioToggle />
      </div>

      {/* Deep dark atmosphere with subtle central golden aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3A2A08]/25 via-[#0A0D0A]/85 to-[#050605] pointer-events-none" />

      {/* Main text storytelling sequence */}
      <div className="relative z-20 max-w-md w-full text-center flex flex-col items-center justify-center space-y-7">
        {/* "Pancha..." */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#FFF8E7] tracking-wider font-light"
        >
          Pancha...
        </motion.h1>

        {/* "Esto es para ti 💛" */}
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="text-xl sm:text-2xl text-[#FFE98A] font-serif italic tracking-wide"
          >
            Esto es para ti 💛
          </motion.p>
        )}

        {/* "Pero primero..." */}
        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-sm sm:text-base text-[#FFF8E7]/60 font-sans tracking-widest uppercase font-light pt-2"
          >
            Pero primero...
          </motion.p>
        )}

        {/* Elegant "Entra" button with shimmer & golden glow */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pt-6"
          >
            <button
              onClick={onEnter}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base sm:text-lg font-medium text-[#1E2319] bg-gradient-to-r from-[#F6C945] via-[#FFE98A] to-[#F6C945] shadow-[0_0_25px_rgba(246,201,69,0.35)] hover:shadow-[0_0_40px_rgba(246,201,69,0.6)] transition-all duration-500 transform hover:scale-105 active:scale-95 shimmer-effect cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#78540B] animate-pulse" />
              <span className="font-serif tracking-wide text-[#423105] font-semibold">
                Entra
              </span>
              <ArrowRight className="w-4 h-4 text-[#78540B] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Subtle bottom note */}
      <div className="absolute bottom-safe text-center text-xs text-[#FFF8E7]/30 tracking-widest font-sans">
        DÍA DE LAS FLORES AMARILLAS
      </div>
    </div>
  );
}

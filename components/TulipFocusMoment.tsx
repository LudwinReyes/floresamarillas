"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import Tulip from "./Tulip";
import AudioToggle from "./AudioToggle";

interface TulipFocusMomentProps {
  onNext: () => void;
}

export default function TulipFocusMoment({ onNext }: TulipFocusMomentProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 1: "Elegí tulipanes..."
    const t1 = setTimeout(() => setPhase(1), 1200);
    // Phase 2: "...porque tienen algo que me recuerda a ti."
    const t2 = setTimeout(() => setPhase(2), 4000);
    // Phase 3: "Son bonitos sin intentar demasiado."
    const t3 = setTimeout(() => setPhase(3), 7200);
    // Phase 4: "Simplemente lo son."
    const t4 = setTimeout(() => setPhase(4), 10400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-x-hidden overflow-y-auto bg-gradient-to-b from-[#141B12] via-[#211E10] to-[#121811]">
      {/* Subtle top indicator */}
      <div className="relative z-40 flex items-center justify-between px-6 pt-safe pb-4 w-full max-w-5xl mx-auto">
        <span className="text-xs tracking-widest text-[#F6C945]/70 uppercase font-sans">
          Capítulo II · La Esencia
        </span>
        <AudioToggle />
      </div>

      {/* Cinematic Golden Spotlight behind the hero tulip */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,_rgba(246,201,69,0.22)_0%,_rgba(255,233,138,0.06)_50%,_transparent_75%)] pointer-events-none blur-3xl animate-pulse duration-[6000ms]" />

      {/* Poetic Lines Display Area */}
      <div className="relative z-30 max-w-xl mx-auto px-6 text-center min-h-[140px] flex flex-col items-center justify-center space-y-4">
        <AnimatePresence mode="wait">
          {phase >= 1 && phase < 3 && (
            <motion.div
              key="group-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-3"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#FFF8E7] font-light">
                Elegí tulipanes...
              </h2>
              {phase >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="text-lg sm:text-2xl text-[#FFE98A] font-serif italic"
                >
                  ...porque tienen algo que me recuerda a ti.
                </motion.p>
              )}
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div
              key="group-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="space-y-4"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#FFF8E7] font-light">
                Son bonitos sin intentar demasiado.
              </p>
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  className="space-y-5 pt-1"
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F6C945] font-normal italic drop-shadow-[0_2px_20px_rgba(246,201,69,0.4)]">
                    Simplemente lo son.
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="pt-2"
                  >
                    <button
                      onClick={onNext}
                      className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-sans tracking-wider text-[#1E2319] bg-gradient-to-r from-[#F6C945] to-[#FFE98A] shadow-[0_0_25px_rgba(246,201,69,0.35)] hover:shadow-[0_0_35px_rgba(246,201,69,0.55)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#664606]" />
                      <span className="font-serif font-medium text-[#423105]">
                        Hay algo que quiero decirte
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#664606] transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hero Tulip in Center with Soft Flanking Companions (Clean, zero clipping, fully visible) */}
      <div className="relative w-full h-[46vh] sm:h-[48vh] flex items-end justify-center overflow-visible z-20 pb-0">
        {/* Left background companion (blurred) */}
        <div className="absolute bottom-2 left-[12%] sm:left-[26%] filter blur-[1.5px] opacity-45 scale-70 pointer-events-none overflow-visible">
          <Tulip id="flank-left-bg" delay={0.2} height={220} tilt={-10} interactive={false} />
        </div>

        {/* Right background companion (blurred) */}
        <div className="absolute bottom-3 right-[12%] sm:right-[26%] filter blur-[1.5px] opacity-45 scale-70 pointer-events-none overflow-visible">
          <Tulip id="flank-right-bg" delay={0.4} height={225} tilt={8} interactive={false} />
        </div>

        {/* Left midground companion */}
        <div className="absolute bottom-1 left-[22%] sm:left-[34%] opacity-80 scale-80 overflow-visible">
          <Tulip id="flank-left" delay={0.6} height={250} tilt={-5} easterEggText="Tan delicada como tú" interactive={true} />
        </div>

        {/* Right midground companion */}
        <div className="absolute bottom-2 right-[22%] sm:right-[34%] opacity-80 scale-80 overflow-visible">
          <Tulip id="flank-right" delay={0.8} height={255} tilt={4} easterEggText="Siempre luminosa" interactive={true} />
        </div>

        {/* The Radiant Hero Tulip in Center */}
        <div className="relative z-30 pb-0 overflow-visible">
          <Tulip
            id="hero-tulip"
            delay={0.3}
            scale={1.02}
            height={285}
            tilt={0}
            isHero={true}
            easterEggText="Este tulipán eres tú 💛"
            interactive={true}
          />
        </div>

        {/* Ground base shadow */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0E150F] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

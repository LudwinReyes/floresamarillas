"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ChevronRight, Mail } from "lucide-react";
import AudioToggle from "./AudioToggle";

interface LetterMomentProps {
  onNext: () => void;
}

export default function LetterMoment({ onNext }: LetterMomentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 pt-safe pb-safe overflow-y-auto bg-gradient-to-b from-[#2A2318] via-[#1E1A14] to-[#16140F]">
      {/* Top bar */}
      <div className="relative z-40 flex items-center justify-between px-4 pb-2 w-full max-w-2xl mx-auto">
        <span className="text-xs tracking-widest text-[#F6C945]/70 uppercase font-sans">
          Capítulo III · Las Palabras
        </span>
        <AudioToggle />
      </div>

      {/* Gentle warm background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(246,201,69,0.12)_0%,_transparent_70%)] pointer-events-none blur-3xl" />

      {/* Decorative tiny yellow petals floating around */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-10 w-4 h-6 rounded-full bg-[#F6C945]/30 rotate-45 blur-[0.5px]" />
        <div className="absolute top-40 right-12 w-3 h-5 rounded-full bg-[#FFE98A]/25 -rotate-12 blur-[0.5px]" />
        <div className="absolute bottom-28 left-8 w-5 h-7 rounded-full bg-[#F6C945]/20 rotate-12" />
        <div className="absolute bottom-20 right-14 w-4 h-6 rounded-full bg-[#FFE98A]/30 -rotate-45" />
      </div>

      {/* Main Container */}
      <div className="relative z-30 w-full max-w-lg mx-auto my-auto flex flex-col items-center">
        {!isOpen ? (
          /* ================= CLOSED ENVELOPE SCENE ================= */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-6 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-2xl sm:text-3xl font-serif text-[#FFF8E7] font-light"
              >
                Una última cosa...
              </motion.p>
              <p className="text-xs sm:text-sm text-[#FFE98A]/70 font-sans tracking-widest uppercase">
                Toca la carta para abrirla
              </p>
            </div>

            {/* 3D Envelope Element */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-72 sm:w-80 h-48 sm:h-52 rounded-2xl bg-gradient-to-br from-[#F5ECD7] via-[#EDE0C4] to-[#DFD0AF] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(246,201,69,0.2)] border border-[#E3D4B6] flex items-center justify-center p-6 select-none overflow-hidden"
            >
              {/* Envelope flap folds styling */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-28 border-b border-black/10 bg-[#E8DCBF]/50 [clip-path:polygon(0_0,100%_0,50%_100%)]" />

              {/* Golden Tulip Seal */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#F6C945] via-[#E5B533] to-[#B38318] shadow-[0_4px_15px_rgba(180,130,24,0.4)] flex items-center justify-center border border-[#FFE98A]/60">
                <span className="text-xl select-none">🌷</span>
              </div>

              {/* Addressee text */}
              <div className="absolute bottom-4 inset-x-0 text-center">
                <span className="font-handwriting text-lg text-[#5A4E38] tracking-wide">
                  Para Pancha 💛
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ================= OPEN LETTER SCENE ================= */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            {/* Parchment Paper Card */}
            <div className="paper-texture relative rounded-2xl p-7 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(246,201,69,0.15)] border border-[#DECDB0] text-[#2C271E] space-y-5">
              {/* Subtle vintage header flower motif */}
              <div className="flex items-center justify-between border-b border-[#DECDB0]/60 pb-3">
                <span className="text-xs uppercase tracking-widest text-[#847355] font-sans">
                  21 de Septiembre
                </span>
                <span className="text-base">🌷</span>
              </div>

              {/* Letter Salutation */}
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1F1B14] font-medium">
                Pancha,
              </h3>

              {/* Letter Body - Elegant typography with handwritten warmth */}
              <div className="space-y-3.5 text-base sm:text-lg font-handwriting leading-relaxed text-[#302B22]">
                <p>Hoy quería darte flores amarillas.</p>

                <p>
                  Pero sentí que simplemente mandarte una foto no era
                  suficiente.
                </p>

                <p className="font-semibold text-[#1F1B14]">
                  Así que hice esto.
                </p>

                <p>
                  Un pequeño lugar donde pudiera dejarte un poquito de lo que
                  siento.
                </p>

                <p>
                  Ojalá cuando veas estos tulipanes puedas imaginar que están
                  frente a ti.
                </p>

                <p className="italic text-[#755919]">
                  Todos amarillos.
                  <br />
                  Todos para ti.
                </p>

                <p>
                  Y si algún día dudas de lo bonita que eres,
                  <br />
                  <span className="underline decoration-[#F6C945] underline-offset-4 font-semibold">
                    vuelve aquí.
                  </span>
                </p>

                <p>
                  Porque este pequeño jardín siempre va a estar esperándote.
                </p>
              </div>

              {/* Letter Sign-off */}
              <div className="pt-3 border-t border-[#DECDB0]/60 flex flex-col items-end">
                <p className="text-sm font-sans text-[#7A6B53]">Con cariño,</p>
                <p className="text-2xl sm:text-3xl font-handwriting text-[#B8860B] font-bold">
                  Lud 💛
                </p>
              </div>
            </div>

            {/* Transition button to Grand Finale */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 flex justify-center"
            >
              <button
                onClick={onNext}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-medium text-[#1E2319] bg-gradient-to-r from-[#F6C945] via-[#FFE98A] to-[#F6C945] shadow-[0_0_25px_rgba(246,201,69,0.4)] hover:shadow-[0_0_40px_rgba(246,201,69,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#78540B]" />
                <span className="font-serif font-semibold text-[#423105]">
                  Mira tu jardín completo
                </span>
                <ChevronRight className="w-4 h-4 text-[#78540B] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Discreet footer */}
      <div className="relative z-30 pt-4 text-center text-xs text-[#FFF8E7]/30 tracking-widest font-sans">
        HECHO CON EL CORAZÓN
      </div>
    </div>
  );
}

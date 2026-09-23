"use client";

import React, { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import AudioToggle from "./AudioToggle";

interface LetterMomentProps {
  onNext: () => void;
}

export default function LetterMoment({ onNext }: LetterMomentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="scene-fade-enter relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 pt-safe pb-safe overflow-y-auto bg-gradient-to-b from-[#2A2318] via-[#1E1A14] to-[#16140F]">
      {/* Header */}
      <div className="relative z-40 flex items-center justify-between px-4 pb-2 w-full max-w-2xl mx-auto">
        <span className="text-xs tracking-widest text-[#F6C945]/70 uppercase font-sans">
          Capítulo III · Las Palabras
        </span>
        <AudioToggle />
      </div>

      {/* Warm glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(246,201,69,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* Decorative static petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-10 w-4 h-6 rounded-full bg-[#F6C945]/28 rotate-45" />
        <div className="absolute top-40 right-12 w-3 h-5 rounded-full bg-[#FFE98A]/22 -rotate-12" />
        <div className="absolute bottom-28 left-8 w-5 h-7 rounded-full bg-[#F6C945]/18 rotate-12" />
        <div className="absolute bottom-20 right-14 w-4 h-6 rounded-full bg-[#FFE98A]/28 -rotate-45" />
      </div>

      {/* Main content */}
      <div className="relative z-30 w-full max-w-lg mx-auto my-auto flex flex-col items-center">
        {!isOpen ? (
          /* Closed envelope */
          <div
            className="anim-fade-up flex flex-col items-center text-center space-y-6 cursor-pointer"
            style={{ "--d": "1.1s", "--dl": "0s" } as React.CSSProperties}
            onClick={() => setIsOpen(true)}
          >
            <div className="space-y-1.5">
              <p className="text-2xl sm:text-3xl font-serif text-[#FFF8E7] font-light">Una última cosa...</p>
              <p className="text-xs sm:text-sm text-[#FFE98A]/65 font-sans tracking-widest uppercase">
                Toca la carta para abrirla
              </p>
            </div>

            {/* Envelope */}
            <div
              className="relative w-72 sm:w-80 h-48 sm:h-52 rounded-2xl flex items-center justify-center p-6 select-none overflow-hidden cursor-pointer active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #F5ECD7 0%, #EDE0C4 55%, #DFD0AF 100%)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.48), 0 0 28px rgba(246,201,69,0.18)",
                border: "1px solid #E3D4B6",
                transition: "transform 0.15s",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent" />
              <div className="absolute top-0 inset-x-0 h-28 border-b border-black/10 bg-[#E8DCBF]/50"
                   style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
              {/* Seal */}
              <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center border border-[#FFE98A]/60"
                   style={{ background: "linear-gradient(135deg, #F6C945, #E5B533, #B38318)", boxShadow: "0 4px 14px rgba(180,130,24,0.4)" }}>
                <span className="text-xl select-none">🌷</span>
              </div>
              <div className="absolute bottom-4 inset-x-0 text-center">
                <span className="font-handwriting text-lg text-[#5A4E38] tracking-wide">Para Pancha 💛</span>
              </div>
            </div>
          </div>
        ) : (
          /* Open letter */
          <div className="anim-scale-in w-full" style={{ "--d": "0.7s", "--dl": "0s" } as React.CSSProperties}>
            <div className="paper-texture relative rounded-2xl p-7 sm:p-9 text-[#2C271E] space-y-5"
                 style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(246,201,69,0.12)", border: "1px solid #DECDB0" }}>
              <div className="flex items-center justify-between border-b border-[#DECDB0]/60 pb-3">
                <span className="text-xs uppercase tracking-widest text-[#847355] font-sans">21 de Septiembre</span>
                <span className="text-base">🌷</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#1F1B14] font-medium">Pancha,</h3>

              <div className="space-y-3.5 text-base sm:text-lg font-handwriting leading-relaxed text-[#302B22]">
                <p>Hoy quería darte flores amarillas.</p>
                <p>Pero sentí que simplemente mandarte una foto no era suficiente.</p>
                <p className="font-semibold text-[#1F1B14]">Así que hice esto.</p>
                <p>Un pequeño lugar donde pudiera dejarte un poquito de lo que siento.</p>
                <p>Ojalá cuando veas estos tulipanes puedas imaginar que están frente a ti.</p>
                <p className="italic text-[#755919]">
                  Todos amarillos.<br />Todos para ti.
                </p>
                <p>
                  Y si algún día dudas de lo bonita que eres,<br />
                  <span className="underline decoration-[#F6C945] underline-offset-4 font-semibold">vuelve aquí.</span>
                </p>
                <p>Porque este pequeño jardín siempre va a estar esperándote.</p>
              </div>

              <div className="pt-3 border-t border-[#DECDB0]/60 flex flex-col items-end">
                <p className="text-sm font-sans text-[#7A6B53]">Con cariño,</p>
                <p className="text-2xl sm:text-3xl font-handwriting text-[#B8860B] font-bold">Lud 💛</p>
              </div>
            </div>

            <div className="anim-fade-up mt-6 flex justify-center" style={{ "--d": "0.8s", "--dl": "0.5s" } as React.CSSProperties}>
              <button
                onClick={onNext}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-medium text-[#1E2319] active:scale-95 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #F6C945 0%, #FFE98A 50%, #F6C945 100%)",
                  boxShadow: "0 0 24px rgba(246,201,69,0.4)",
                  transition: "box-shadow 0.3s, transform 0.15s",
                }}
              >
                <Sparkles className="w-4 h-4 text-[#78540B]" />
                <span className="font-serif font-semibold text-[#423105]">Mira tu jardín completo</span>
                <ChevronRight className="w-4 h-4 text-[#78540B]" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-30 pt-4 text-center text-xs text-[#FFF8E7]/28 tracking-widest font-sans">
        HECHO CON EL CORAZÓN
      </div>
    </div>
  );
}

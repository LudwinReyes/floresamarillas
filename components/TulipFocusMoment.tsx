"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import Tulip from "./Tulip";
import AudioToggle from "./AudioToggle";

interface TulipFocusMomentProps {
  onNext: () => void;
}

export default function TulipFocusMoment({ onNext }: TulipFocusMomentProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 3600);
    const t3 = setTimeout(() => setPhase(3), 6600);
    const t4 = setTimeout(() => setPhase(4), 9400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="scene-fade-enter relative min-h-[100dvh] w-full flex flex-col justify-between overflow-x-hidden overflow-y-auto bg-gradient-to-b from-[#141B12] via-[#211E10] to-[#121811]">
      {/* Header */}
      <div className="relative z-40 flex items-center justify-between px-6 pt-safe pb-4 w-full max-w-5xl mx-auto">
        <span className="text-xs tracking-widest text-[#F6C945]/70 uppercase font-sans">
          Capítulo II · La Esencia
        </span>
        <AudioToggle />
      </div>

      {/* Spotlight glow — static, no animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(246,201,69,0.2) 0%, rgba(255,233,138,0.05) 50%, transparent 75%)", filter: "blur(40px)" }} />

      {/* Poetic text area */}
      <div className="relative z-30 max-w-xl mx-auto px-6 text-center min-h-[130px] flex flex-col items-center justify-center space-y-4">

        {/* Phase 1–2 */}
        {phase >= 1 && phase < 3 && (
          <div className="anim-fade-up space-y-3" style={{ "--d": "1.1s", "--dl": "0s" } as React.CSSProperties}>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#FFF8E7] font-light">
              Elegí tulipanes...
            </h2>
            {phase >= 2 && (
              <p
                className="anim-fade-up text-lg sm:text-2xl text-[#FFE98A] font-serif italic"
                style={{ "--d": "1.3s", "--dl": "0s" } as React.CSSProperties}
              >
                ...porque tienen algo que me recuerda a ti.
              </p>
            )}
          </div>
        )}

        {/* Phase 3–4 */}
        {phase >= 3 && (
          <div className="anim-fade-up space-y-4" style={{ "--d": "1.2s", "--dl": "0s" } as React.CSSProperties}>
            <p className="text-xl sm:text-2xl md:text-3xl font-serif text-[#FFF8E7] font-light">
              Son bonitos sin intentar demasiado.
            </p>
            {phase >= 4 && (
              <div className="anim-fade-up space-y-5 pt-1" style={{ "--d": "1.4s", "--dl": "0s" } as React.CSSProperties}>
                <p className="text-2xl sm:text-3xl font-serif text-[#F6C945] font-normal italic"
                   style={{ textShadow: "0 2px 22px rgba(246,201,69,0.38)" }}>
                  Simplemente lo son.
                </p>
                <div className="anim-fade-in pt-1" style={{ "--d": "0.8s", "--dl": "0.8s" } as React.CSSProperties}>
                  <button
                    onClick={onNext}
                    className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-sans tracking-wider text-[#1E2319] active:scale-95 cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #F6C945 0%, #FFE98A 100%)",
                      boxShadow: "0 0 24px rgba(246,201,69,0.35)",
                      transition: "box-shadow 0.3s, transform 0.15s",
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-[#664606]" />
                    <span className="font-serif font-medium text-[#423105]">Hay algo que quiero decirte</span>
                    <ChevronRight className="w-4 h-4 text-[#664606]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tulip display — only 5 SVG instances, no Framer Motion */}
      <div className="relative w-full h-[46vh] sm:h-[48vh] flex items-end justify-center overflow-visible z-20">
        {/* Far background — blurred, not interactive */}
        <div className="absolute bottom-2 left-[10%] pointer-events-none overflow-visible"
             style={{ filter: "blur(1.5px)", opacity: 0.4, transform: "scale(0.65)" }}>
          <Tulip id="fl-bg1" delay={0.2} height={215} tilt={-10} interactive={false} />
        </div>
        <div className="absolute bottom-2 right-[10%] pointer-events-none overflow-visible"
             style={{ filter: "blur(1.5px)", opacity: 0.4, transform: "scale(0.65)" }}>
          <Tulip id="fl-bg2" delay={0.5} height={220} tilt={9} interactive={false} />
        </div>

        {/* Side companions */}
        <div className="absolute bottom-1 left-[24%] overflow-visible" style={{ opacity: 0.82, transform: "scale(0.8)" }}>
          <Tulip id="fl-l" delay={0.6} height={248} tilt={-5} easterEggText="Tan delicada como tú" interactive />
        </div>
        <div className="absolute bottom-2 right-[24%] overflow-visible" style={{ opacity: 0.82, transform: "scale(0.8)" }}>
          <Tulip id="fl-r" delay={0.8} height={252} tilt={4} easterEggText="Siempre luminosa" interactive />
        </div>

        {/* Hero center */}
        <div className="relative z-30 overflow-visible">
          <Tulip id="hero" delay={0.3} scale={1.02} height={285} tilt={0} isHero easterEggText="Este tulipán eres tú 💛" interactive />
        </div>

        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0E150F] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

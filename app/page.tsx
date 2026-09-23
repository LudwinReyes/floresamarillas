"use client";

import React, { useState } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import IntroMoment from "@/components/IntroMoment";
import GardenGrowthMoment from "@/components/GardenGrowthMoment";
import TulipFocusMoment from "@/components/TulipFocusMoment";
import LetterMoment from "@/components/LetterMoment";
import FinalGardenMoment from "@/components/FinalGardenMoment";

export default function Home() {
  const [moment, setMoment] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [fade, setFade] = useState(false);

  // Lightweight CSS fade — no Framer Motion compositor cost
  const advance = (next: 1 | 2 | 3 | 4 | 5) => {
    setFade(true);
    setTimeout(() => {
      setMoment(next);
      setFade(false);
    }, 420);
  };

  return (
    <main className="relative min-h-[100dvh] w-full bg-[#0A0D0A] overflow-hidden">
      <FloatingParticles density={moment === 5 ? 14 : 10} />

      <div
        style={{
          opacity: fade ? 0 : 1,
          transition: "opacity 0.4s ease",
          willChange: "opacity",
        }}
      >
        {moment === 1 && <IntroMoment       onEnter={()  => advance(2)} />}
        {moment === 2 && <GardenGrowthMoment onNext={()  => advance(3)} />}
        {moment === 3 && <TulipFocusMoment  onNext={()  => advance(4)} />}
        {moment === 4 && <LetterMoment      onNext={()  => advance(5)} />}
        {moment === 5 && <FinalGardenMoment onRestart={() => advance(1)} />}
      </div>
    </main>
  );
}
